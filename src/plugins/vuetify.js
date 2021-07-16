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

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    dark: toBoolean(localStorage.getItem('app-theme') || false),
  },
});
