const attackForm = [
  {
    accessor: 'name',
    required: true,
  }, {
    accessor: 'uses',
    defaultValue: [],
    type: 'uses',
    sm: 6,
  }, {
    accessor: 'isSpell',
    label: 'Attck is a spell',
    defaultValue: false,
    type: 'checkbox',
    sm: 6,
  }, {
    accessor: 'isSave',
    label: 'Enemy makes saving throw',
    defaultValue: false,
    type: 'checkbox',
    sm: 6,
    conditions: { isSpell: true },
  }, {
    accessor: 'proficient',
    defaultValue: false,
    type: 'checkbox',
    sm: 6,
    conditions: { isSpell: false },
  }, {
    accessor: 'modType',
    required: true,
    sm: 6,
  }, {
    accessor: 'range',
    defaultValue: '',
    sm: 6,
  }, {
    accessor: 'dmg',
    required: true,
    sm: 6,
  }, {
    accessor: 'dmgType',
    required: true,
    sm: 6,
  }, {
    accessor: 'bonusModifier',
    defaultValue: 0,
    type: 'number',
    sm: 6,
  }, {
    accessor: 'notes',
    defaultValue: '',
    type: 'multiline',
  }, 
];

export default attackForm;
