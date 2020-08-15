import axios from 'axios';

/*
  name: String = name of the widget
  characterId: String|Int = Id of the character the widget belongs to
  widgetTypeId: String|Int = Id of the character the widget belongs to
  values: Array<{
    key: String,
    value: String,
    min?: Int,
    max?: Int,
    modifiers?: Array<{
      type: ADD | ATTR_MOD | BASE | AUGMENT,
      active: Bool,
      smartValueRefFk: Int | String (if String, it will look for the newly created value's key to match)
      min?: Int,
      max?: Int,
    }>
  }> = Smart values for the widget
  dumbValues: Object - Key value pairs or non-smart values of the widget
*/

async function createWidget(widget) {
  const res = await axios.put('/query/widgets', widget);

  return res.data;
}

export default createWidget;