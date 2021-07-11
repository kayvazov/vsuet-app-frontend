import Vue from 'vue';
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
});
