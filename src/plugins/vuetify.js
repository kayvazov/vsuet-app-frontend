import Vue from 'vue';
import toBoolean from 'to-boolean';
import Vuetify, {
  VBtn,
  VApp,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VBtn,
    VApp,
  },
});

const settings = JSON.parse(localStorage.getItem('settings') || '{}');

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    dark: toBoolean(settings.theme || false),
    themes: {
      light: {
        red: '#d72a2a',
      },
      dark: {
        red: '#e84e4f',
      },
    },
  },
});
