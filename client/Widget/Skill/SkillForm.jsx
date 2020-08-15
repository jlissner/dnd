import React, { useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Grid,
  TextField,
  MenuItem,
} from '@material-ui/core';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import Radio from '../../Form/Radio';
import {
  widgetTypesState,
  characterWidgetsState,
  selectedCharacterState,
  smartValueSelector,
} from '../../state';
import { createWidget } from '../widgetActions';
import attributesSelector from '../Attribute/attributesSelector';
import statsSelector from '../Stat/statsSelector';
import WidgetFormWrapper from '../WidgetFormWrapper';
import useWidget from '../useWidget';

function SkillForm({ id }) {
  const characterId = useRecoilValue(selectedCharacterState);
  const attributes = useRecoilValue(attributesSelector);
  const stats = useRecoilValue(statsSelector);
  const types = useRecoilValue(widgetTypesState);
  const typeId = _find(types, ['name', 'Skill']).idPk;
  const [charWidgets, setCharacterWidgets] = useRecoilState(characterWidgetsState({
    characterId,
    typeId,
  }));
  const {
    attemptSaveable,
    widget,
    addToPage,
    remove,
    saving,
    update,
  } = useWidget(id);
  const skillSmartValue = useRecoilValue(smartValueSelector(_get(widget, 'value')));
  const defaultProfFk = _get(_find(stats, ({ name }) => (name.toLowerCase().indexOf('prof') > -1)), 'smartValueFk', '');
  const prof = _get(skillSmartValue, 'modifications[1]', );
  const startRef = useRef({
    name: _get(widget, 'name', ''),
    attrFk: _get(skillSmartValue, 'modifications[0].smartValueRef.idPk', ''),
    profFk: _get(prof, 'smartValueRef.idPk', defaultProfFk),
    isProf: _get(prof, 'active', false),
  })
  const [updates, setUpdates] = useState(startRef.current);

  const handleCreate = attemptSaveable(async () => {
    const createdWidget = await createWidget({
      name: updates.name,
      characterId,
      widgetTypeId: typeId,
      values: [
        {
          key: 'value',
          value: '0',
          modifiers: [{
            type: 'BASE',
            smartValueRefFk: parseInt(updates.attrFk, 10),
            listOrder: 1,
          }, {
            type: 'ADD',
            smartValueRefFk: parseInt(updates.profFk, 10),
            active: updates.isProf,
            listOrder: 2,
          }],
        },
      ],
      dumbValues: { notes: '' },
    });

    setCharacterWidgets([...charWidgets, createdWidget.idPk]);
  });

  async function handleUpdate() {
    const widgetUpdates = {};

    if (updates.name !== startRef.current.name) {
      widgetUpdates.name = updates.name;
    }

    if (updates.isProf !== startRef.current.isProf) {
      widgetUpdates.values = [{
        idPk: skillSmartValue.idPk,
        modifiers: [{
          idPk: prof.idPk,
          active: updates.isProf,
        }],
      }];
    }


    await update(widgetUpdates);

    startRef.current = updates;
  }

  return (
    <WidgetFormWrapper
      handleAddToPage={addToPage}
      handleDelete={remove}
      handleSave={id ? handleUpdate : handleCreate}
      hasChanges={!_isEqual(updates, startRef.current)}
      reset={() => setUpdates(startRef.current)}
      saving={saving}
      id={id}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Skill Name"
            onChange={(evt) => setUpdates({ ...updates, name: evt.target.value })}
            value={updates.name}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            disabled={Boolean(id)}
            label="Related Attribute"
            onChange={(evt) => setUpdates({ ...updates, attrFk: evt.target.value})}
            value={updates.attrFk}
            variant="filled"
            select
          >
            {attributes.map(({ name, attributeModifierFk }) => (
              <MenuItem key={attributeModifierFk} value={attributeModifierFk}>{name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} wrap="nowrap" alignItems="center">
            <Grid item>
              <Radio
                checked={updates.isProf}
                onClick={() => setUpdates({ ...updates, isProf: !updates.isProf })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled={Boolean(id)}
                label="Proficiency Stat"
                onChange={(evt) => setUpdates({ ...updates, profFk: evt.target.value})}
                value={updates.profFk}
                variant="filled"
                select
              >
                {stats.map(({ title, smartValueFk }) => (
                  <MenuItem key={smartValueFk} value={smartValueFk}>{title}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WidgetFormWrapper>
  )

  // return (
  //   <Form
  //     form={form}
  //     FormItemProps={{ disabled: saving }}
  //     value={skill}
  //     onSave={id ? update : create}
  //     Wrapper={WidgetFormWrapper}
  //     WrapperProps={{
  //       handleAddToPage: addToPage,
  //       handleDelete: remove,
  //       id,
  //     }}
  //   />
  // );
}

export default SkillForm;
