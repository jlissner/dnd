const listForm = [
  { accessor: 'title', label: 'Title', required: true, md: 6 },
  { accessor: 'showTitle', label: 'Show Title', type: 'checkbox', defaultValue: true, md: 6 },
  {
    accessor: 'type',
    label: 'List Type',
    type: 'select',
    defaultValue: 'ORDERED',
    options: [
      { label: 'Ordered', value: 'ORDERED' },
      { label: 'Unordered', value: 'UNORDERED' },
      { label: 'Check List', value: 'CHECK' },
    ],
  },
];

export default listForm;
