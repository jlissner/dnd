const advancedTextSectionForm = [
  {
    accessor: 'name',
    required: true,
    sm: 6,
  }, {
    accessor: 'uses',
    type: 'uses',
    defaultValue: [],
    sm: 6,
  }, {
    accessor: 'shortDesc',
    defaultValue: '',
  }, {
    accessor: 'longDesc',
    defaultValue: '',
  }, {
    accessor: 'tags',
    type: 'list',
    defaultValue: [],
    helperText: 'Comma delineated'
  },
];

export default advancedTextSectionForm;
