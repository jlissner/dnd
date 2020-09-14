module.exports = {
  presets: [
    'react-app'
  ],
  plugins: [
    'react-hot-loader/babel', // enable to use hmr
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ],
};
