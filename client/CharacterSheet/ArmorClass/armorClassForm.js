const armorClassForm = [
  { accessor: 'base', label: 'Base AC', type: 'number', required: true },
  { accessor: 'divider1', type: 'divider' },
  {
    accessor: 'attributes',
    type: 'checkbox-select',
    title: 'Attribute Modifier(s)',
    options: [
      { label: 'Strength', value: 'str' },
      { label: 'Dexterity', value: 'dex' },
      { label: 'Contstitution', value: 'con' },
      { label: 'Intelligence', value: 'int' },
      { label: 'Wisdom', value: 'wis' },
      { label: 'Charisma', value: 'cha' }
    ],
  },
  { accessor: 'maxAttrMod', type: 'number', helperText: 'Set to -1 to disable' },
  { accessor: 'divider2', type: 'divider' },
  { accessor: 'modifiers', type: 'modifiers', title: 'Equipment/Spells/Etc.' },
  { accessor: 'divider3', type: 'divider' },
  { accessor: 'notes', type: 'multiline' },
];

export default armorClassForm;