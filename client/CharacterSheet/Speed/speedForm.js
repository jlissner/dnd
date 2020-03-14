const speedForm = [
  { accessor: 'base', label: 'Base Speed', type: 'number', required: true },
  { accessor: 'divider1', type: 'divider' },
  { accessor: 'modifiers', type: 'modifiers', title: 'Feats/Spells/Etc.', defaultValue: [], },
  { accessor: 'divider2', type: 'divider' },
  { accessor: 'notes', type: 'multiline' },
];

export default speedForm;