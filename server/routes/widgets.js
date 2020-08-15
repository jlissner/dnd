const express = require('express');
const _ = require('lodash');
const { pg } = require('../lib');
const router = express.Router();

function createSqlFragment({
  fallback = '',
  fragment = '{{sql}}',
  sql,
}) {
  if (!sql) {
    return fallback;
  }

  return fragment.replace('{{sql}}', sql);
}

function createQuery({ queryFragments, selectFragments, fromFragments }) {
  const filteredQueryFragments = _.filter(queryFragments, Boolean);
  const filteredSelectFragments = _.filter(selectFragments, Boolean);
  const filteredFromFragments = _.filter(fromFragments, Boolean);

  if (_.isEmpty(filteredQueryFragments)) {
    return '';
  }

  return `
    with
      ${filteredQueryFragments.join(', ')}
    SELECT
      ${createSqlFragment({
        sql: filteredSelectFragments.join(', '),
        fallback: 'true as success',
      })}
      ${createSqlFragment({
        sql: filteredFromFragments.join(', '),
        fragment: 'FROM {{sql}}',
      })}
  `;
}

function createInsertQuery(table, columns, rows, params) {
  /* never tested */
  if (_.isEmpty(rows)) {
    return '';
  }

  const start = `INSERT INTO ${table} (${columns.map(col => `"${_.snakeCase(col)}"`).join(', ')}) VALUES (`;
  const middle = _.map(rows, (row) => _.map(columns, (col) => {
    const statement = `$${params.length + 1}`;

    params.push(row[col]);

    return statement;
  }).join(', ')).join('), (');
  const end = ') RETURNING * ';

  return `
    ${start}
    ${middle}
    ${end}
  `
}

function createUpdateQuery(table, { idPk, ...updates }, params) {
  if (_.isEmpty(updates)) {
    return '';
  }

  const start = `UPDATE ${table} SET`;
  const middle = _.map(updates, (val, key) => {
    const statement = `${_.snakeCase(key)} = $${params.length + 1}`;

    params.push(val);

    return statement;
  }, '').join(', ');
  const end = `WHERE id_pk = $${params.length + 1} RETURNING *`;
  
  params.push(idPk);

  return `
    ${start}
    ${middle}
    ${end}
  `
}

function createDeleteQuery(table, { idPk }, params) {
  const query = `
    DELETE FROM ${table}
    WHERE id_pk = $${params.length + 1}
  `;

  params.push(idPk);

  return query;
}

function camelCaseObject(obj) {
  return _.mapKeys(obj, (v, k) => _.camelCase(k))
}

router.put('/widgets', async (req, res) => {
  const {
    name,
    characterId,
    widgetTypeId,
    values,
    dumbValues
  } = req.body;
  const params = [
    name,
    _.toNumber(characterId),
    _.toNumber(widgetTypeId),
    JSON.stringify(dumbValues),
  ];
  const createWidgetQuery = `
    INSERT INTO app.widgets("name", character_fk, widget_type_fk, dumb_values)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `
  const createWidgetValuesQuery = values && `
    INSERT INTO app.smart_values("key", "value", "min", "max", "widget_fk")
    VALUES ${_.map(values, ({ key, value, min, max }, i) => {
      const res = `($${params.length + 1}, $${params.length + 2}, $${params.length + 3}, $${params.length + 4}, (SELECT id_pk FROM widget))`

      params.push(key);
      params.push(value);
      params.push(min);
      params.push(max);

      return res;
    }).join(', ')}
    RETURNING *
  `

  const valuesWithModifiers = _.filter(values, ({ modifiers }) => _.get(modifiers, 'length'));

  const createWidgetValueModifiers = valuesWithModifiers.length && `
    INSERT INTO app.smart_value_modifiers(smart_value_fk, type, smart_value_ref_fk, active, list_order)
    VALUES ${_.map(valuesWithModifiers, ({ key, modifiers }) => {
      params.push(key);
      const selectValFk = `(SELECT id_pk FROM smart_values WHERE "key" = $${params.length})`;
      const modiferRowsToInsert = _.map(modifiers, ({ type, smartValueRefFk, active = true, listOrder }) => {
        const isRelativeRef = typeof smartValueRefFk === 'string';
        const refValue = isRelativeRef
          ? `(SELECT id_pk FROM smart_values WHERE "key" = $${params.length + 2})`
          : `$${params.length + 2}`;
        const rowsToInsert = `(
          ${selectValFk},
          $${params.length + 1},
          ${refValue},
          $${params.length + 3},
          $${params.length + 4}
        )`;

        params.push(type);
        params.push(smartValueRefFk);
        params.push(active);
        params.push(listOrder);

        return rowsToInsert
      }).join(', ');
      
      return modiferRowsToInsert;
    }).join(', ')}
    RETURNING *
  `;

  const query = createWidgetValuesQuery
    ? `
      with
        widget AS (${createWidgetQuery}),
        smart_values as (${createWidgetValuesQuery})
        ${createWidgetValueModifiers ? `
          , smart_value_modifiers as (${createWidgetValueModifiers})
        ` : ''}
      SELECT * FROM smart_values
    `
    : createWidgetQuery;

  try {
    const isBasicCreate = query === createWidgetQuery;
    const data = await pg.query(query, params);
    const formattedData =
      isBasicCreate
      ? camelCaseObject(data.rows[0])
      : _.transform(data.rows, (cur, { id_pk, key, widget_fk }) => {
      cur.idPk = widget_fk;
      cur[key] = id_pk;
    }, {
      name,
      characterFk: characterId,
      widgetTypeFk: widgetTypeId,
    });

    res.send(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

router.post('/widgets', async (req, res) => {
  const { body } = req;
  const { values, idPk } = body;
  const widgetUpdates = _.pick(body, ['idPk', 'name', 'dumbValues']);
  const params = [];
  
  const smartValueChanges = _.map(values, ({ idPk, modifiers, ...update }) => {
    return !_.isEmpty(update) && { idPk, ...update };
  }).filter(Boolean);
  const smartValueUpdates = _.filter(smartValueChanges, ({ idPk, remove }) => idPk && !remove);
  const smartValueRemoves = _.filter(smartValueChanges, ({ idPk, remove }) => idPk && remove);
  const smartValueCreates = _.filter(smartValueChanges, ({ idPk }) => !idPk);
  
  const smartValueModifierChanges = _.flatten(_.map(values, ({ idPk, modifiers }) => {
    return !_.isEmpty(modifiers) && modifiers;
  })).filter(Boolean);
  const smartValueModifierUpdates = _.filter(smartValueModifierChanges, ({ idPk, remove }) => idPk && !remove);
  const smartValueModifierRemoves = _.filter(smartValueModifierChanges, ({ idPk, remove }) => idPk && remove);
  const smartValueModifierCreates = _.filter(smartValueModifierChanges, ({ idPk }) => !idPk);
  
  const updateWidgetQuery = createUpdateQuery('app.widgets', widgetUpdates, params);
  const updateSmartValueQueries = _.map(smartValueUpdates, (updates) => (
    createUpdateQuery('app.smart_values', updates, params)
  ));
  const updateSmartValueModifierQueries = _.map(smartValueModifierUpdates, (updates) => (
    createUpdateQuery('app.smart_value_modifiers', updates, params)
  ));

  const deleteSmartValueQueries = _.map(smartValueRemoves, (remove) => (
    createDeleteQuery('app.smart_values', remove, params)
  ));
  const deleteSmartValueModifierQueries = _.map(smartValueModifierRemoves, (remove) => (
    createDeleteQuery('app.smart_value_modifiers', remove, params)
  ));

  const smartValueColumns = ['key', 'value', 'min', 'max', 'widget_fk'];
  const createSmartValuesQuery = createInsertQuery('app.smart_values', smartValueColumns, smartValueCreates, params);
  const smartValueModifierColumns = ['smartValueFk', 'type', 'smartValueRefFk', 'active', 'min', 'max', 'listOrder'];
  const createSmartValueModifiersQuery = createInsertQuery('app.smart_value_modifiers', smartValueModifierColumns, smartValueModifierCreates, params);

  const updateSmartValueQueryFragments = _.map(updateSmartValueQueries, (sql, i) => createSqlFragment({ sql, fragment:  `usv${i} as ({{sql}})` }));
  const updateSmartValueModifierQueryFragments = _.map(updateSmartValueModifierQueries, (sql, i) => createSqlFragment({ sql, fragment:  `usvm${i} as ({{sql}})` }));
  const deleteSmartValueQueryFragments = _.map((sql, i) => createSqlFragment(deleteSmartValueQueries, { sql, fragment:  `dsv${i} as ({{sql}})` }));
  const deleteSmartValueModifierQueryFragments = _.map((sql, i) => createSqlFragment(deleteSmartValueModifierQueries, { sql, fragment:  `dsvm${i} as ({{sql}})` }));

  const updateSmartValueSelectFragments = _.map(updateSmartValueQueries, (sql, i) => createSqlFragment({ sql, fragment:  `(SELECT jsonb_agg(usv${i}) FROM usv${i}) as updated_smart_value_${i}` }));
  const updateSmartValueModifierSelectFragments = _.map(updateSmartValueModifierQueries, (sql, i) => createSqlFragment({ sql, fragment:  `(SELECT jsonb_agg(usvm${i}) FROM usvm${i}) as updated_smart_value_modifier_${i}` }));
  const deleteSmartValueSelectFragments = _.map((sql, i) => createSqlFragment(deleteSmartValueQueries, { sql, fragment:  `(SELECT jsonb_agg(dsv${i}) FROM dsv${i}) as deleted_smart_value_${i}` }));
  const deleteSmartValueModifierSelectFragments = _.map((sql, i) => createSqlFragment(deleteSmartValueModifierQueries, { sql, fragment:  `(SELECT jsonb_agg(dsvm${i}) FROM dsvm${i}) as deleted_smart_value_modifier_${i}` }));

  const query = createQuery({
    queryFragments: [
      createSqlFragment({
        fragment: 'widget as ({{sql}})',
        sql: updateWidgetQuery,
      }),
      ...updateSmartValueQueryFragments,
      ...updateSmartValueModifierQueryFragments,
      ...deleteSmartValueQueryFragments,
      ...deleteSmartValueModifierQueryFragments,
      createSqlFragment({
        fragment: 'sv as ({{sql}})',
        sql: createSmartValuesQuery,
      }),
      createSqlFragment({
        fragment: 'svm as ({{sql}})',
        sql: createSmartValueModifiersQuery,
      }),
    ],
    selectFragments: [
      createSqlFragment({
        fragment: '(SELECT jsonb_agg(widget) FROM widget) as widget',
        sql: updateWidgetQuery,
      }),
      ...updateSmartValueSelectFragments,
      ...updateSmartValueModifierSelectFragments,
      ...deleteSmartValueSelectFragments,
      ...deleteSmartValueModifierSelectFragments,
      createSqlFragment({
        fragment: '(SELECT jsonb_agg(sv) FROM sv) as created_smart_values',
        sql: createSmartValuesQuery,
      }),
      createSqlFragment({
        fragment: '(SELECT jsonb_agg(svm) FROM svm) as created_smart_value_modifiers',
        sql: createSmartValueModifiersQuery,
      }),
    ],
  });

  try {
    if (!idPk) { throw new Error('idPk (the idPk of the widget) is required'); }

    const data = await pg.query(query, params);
    const formattedData = _.transform(data.rows[0], (cur, val, key) => {
      if (key === 'widget') {
        cur.updatedWidget = camelCaseObject(val[0]);
      } else if (key.indexOf('updated_smart_value_modifier_') > -1) {
        cur.updatedSmartValueModifiers.push(camelCaseObject(val[0]));
      } else if (key.indexOf('updated_smart_value_') > -1) {
        cur.updatedSmartValues.push(camelCaseObject(val[0]));
      } else if (key.indexOf('deleted_smart_value_modifier_') > -1) {
        cur.deletedSmartValueModifiers.push(camelCaseObject(val[0]));
      } else if (key.indexOf('deleted_smart_value_') > -1) {
        cur.deletedSmartValues.push(camelCaseObject(val[0]));
      } else {
        cur[_.camelCase(key)] = _.map(val, camelCaseObject);
      }
    }, {
      updatedWidget: {},
      createdSmartValues: [],
      createdSmartValueModifiers: [],
      updatedSmartValues: [],
      updatedSmartValueModifiers: [],
      deletedSmartValues: [],
      deletedSmartValueModifiers: [],
    });

    res.send(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

module.exports = router;
