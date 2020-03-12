const attributeForm = [
  {
    accessor: 'name',
    disabled: true,
  }, {
    accessor: 'value',
    type: 'number',
    required: true,
  }, {
    accessor: 'bonusModifier',
    type: 'number',
    defaultValue: 0,
  }, {
    accessor: 'notes',
    type: 'multiline',
    defaultValue: '',
  },
]

export default attributeForm;
