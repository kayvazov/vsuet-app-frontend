import Vue from 'vue';
import Vuex from 'vuex';

import rating from '@/store/rating';
import schedule from '@/store/schedule';
import student from '@/store/student';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rating,
    schedule,
    student,
  },
});
