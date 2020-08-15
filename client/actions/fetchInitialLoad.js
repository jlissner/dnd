import axios from 'axios';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _transform from 'lodash/transform';
import _map from 'lodash/map';
import _omit from 'lodash/omit';

async function fetchInitialLoad(idPk) {
  const query = `
    query {
      character(idPk: "${idPk}") {
        widgets {
          nodes {
            idPk
            name
            characterFk
            widgetTypeFk
            dumbValues
            smartValues {
              nodes {
                idPk
                key
                value
                min
                max
                smartValueModifiers {
                  nodes {
                    idPk
                    smartValueFk
                    type
                    smartValueRefFk
                    active
                    min
                    max
                    listOrder
                    smartValueRef {
                      idPk
                      key
                      value
                      min
                      max
                      modifiers:smartValueModifiers {
                        nodes {
                          idPk
                        }
                      }
                    }
                  }
                }
              }
            }
            pageWidgets {
              nodes {
                idPk
                pageFk
                x
                y
                h: height
                w: width
                widgetFk
                type: widget {
                  widgetType {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }

  `;
  const { data } = await axios.post('/query/graphql', { query });
  const { errors, character } = data.data;

  if (errors) {
    throw new Error(errors);
  }

  const widgets = [];
  const sv = [];
  const svm = [];
  const layouts = [];

  _forEach(_get(character, 'widgets.nodes'), ({ smartValues, pageWidgets, ...widget }) => {
    const baseValues = _pick(widget, ['idPk', 'name', 'characterFk', 'widgetTypeFk', 'dumbValues']);
    const formattedWidget = _transform(_get(smartValues, 'nodes'), (res, { key, idPk }) => {
      res[key] = idPk;
    }, baseValues);

    widgets.push(formattedWidget);

    _forEach(_get(pageWidgets, 'nodes'), ({ type, ...layout }) => {
      layouts.push({
        ...layout,
        type: _get(type, 'widgetType.name'),
      });
    });

    _forEach(_get(smartValues, 'nodes'), ({ smartValueModifiers, ...smartValue }) => {
      const modifiers = _map(_get(smartValueModifiers, 'nodes'), ({ idPk }) => idPk);

      sv.push({
        ..._omit(smartValue, ['smartValueModifiers']),
        modifiers,
      });


      _forEach(_get(smartValueModifiers, 'nodes'), ({ smartValueRef, ...smartValueModifier }) => {
        const modifiers = _map(_get(smartValueRef, 'modifiers.nodes'), ({ idPk }) => idPk);
        
        sv.push({ ...smartValueRef, modifiers });
        svm.push(smartValueModifier);
      });
    });
  });

  return {
    widgets,
    smartValues: sv,
    smartValueModifiers: svm,
    layouts,
  };
}

export default fetchInitialLoad;
