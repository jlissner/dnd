const proficiencyForm = [
  {
    accessor: 'name',
    required: true,
  }, {
    accessor: 'type',
    required: true,
    type: 'select',
    options: [
      { label: 'Strength', value: 'str' },
      { label: 'Dexterity', value: 'dex' },
      { label: 'Constitution', value: 'con' },
      { label: 'Intelligence', value: 'int' },
      { label: 'Wisdom', value: 'wis' },
      { label: 'Charisma', value: 'cha' },
    ],
  }, {
    accessor: 'proficient',
    type: 'checkbox',
    defaultValue: false,
  }, {
    accessor: 'bonusModifier',
    type: 'number',
    defaultValue: 0,          
  }, {
    accessor: 'notes',
    type: 'multiline',
  }
];

export default proficiencyForm
