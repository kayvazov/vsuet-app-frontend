const { version } = require('./package.json');

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      title: 'vsuet.app',
      version,
    },
  },

  pwa: {
    name: 'vsuet.app',
    themeColor: '#34538a',
    manifestOptions: {
      start_url: '/?rel=pwa',
    },
  },

  transpileDependencies: [
    'vuetify',
  ],

  productionSourceMap: false,
};
