module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      title: 'VSUET App',
    },
  },

  transpileDependencies: [
    'vuetify',
  ],

  productionSourceMap: false,
};
