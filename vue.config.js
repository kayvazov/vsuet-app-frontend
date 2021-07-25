module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      title: 'ВГУИТ онлайн',
      version: '3.0.1',
    },
  },

  transpileDependencies: [
    'vuetify',
  ],

  productionSourceMap: false,
};
