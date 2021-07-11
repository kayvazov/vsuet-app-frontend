import Vue from 'vue';
import Vuex from 'vuex';

import rating from '@/store/rating';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rating,
  },
});
