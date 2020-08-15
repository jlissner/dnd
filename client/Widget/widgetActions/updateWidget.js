import axios from 'axios';

/*
  idPk: String | Number,
  name: String = name of the widget
  values: Array<{
    idPk?: String, -- if absent, create, otherwise update
    value?: String,
    min?: Int,
    max?: Int,
    remove?: bool,
    modifiers?: Array<{
      idPk?: String, -- if absent, create, otherwise update
      type: ADD | ATTR_MOD | BASE | AUGMENT,
      active: Bool,
      min: Int,
      max: Int,
      smartValueRefFk: Int
      remove?: bool,
    }>
  }> = Smart values for the widget
*/

async function createWidget(updates) {
  const res = await axios.post('/query/widgets', updates);

  return res.data;
}

export default createWidget;