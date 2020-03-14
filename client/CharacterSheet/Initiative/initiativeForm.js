const armorClassForm = [
  { accessor: 'text', type: 'static-text', text: 'Base initiative = DEX modifier', variant: 'body1' },
  { accessor: 'divider1', type: 'divider' },
  { accessor: 'modifiers', type: 'modifiers', title: 'Feats/Spells/Etc.', defaultValue: [], },
  { accessor: 'divider2', type: 'divider' },
  { accessor: 'notes', type: 'multiline' },
];

export default armorClassForm;