const attackForm = [
  {
    accessor: 'name',
    required: true,
    sm: 6,
  }, {
    accessor: 'uses',
    defaultValue: [],
    type: 'uses',
    sm: 6,
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
    accessor: 'proficient',
    defaultValue: false,
    type: 'checkbox',
    sm: 6,
  }, {
    accessor: 'notes',
    defaultValue: '',
    type: 'multiline',
  }, 
];

export default attackForm;
