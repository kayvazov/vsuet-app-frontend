import Vue from 'vue';
import Vuex from 'vuex';

import rating from '@/store/rating';
import schedule from '@/store/schedule';
import student from '@/store/student';
import { SET_UPDATE_APP_SNACKBAR, SET_SETTINGS } from '@/store/mutations.type';

Vue.use(Vuex);

const state = {
  isAppUpdated: false,
  settings: JSON.parse(localStorage.getItem('settings')) || {
    ratingView: '',
    darkTheme: false,
    showOnlyControlPoints: false,
  },
};

const mutations = {
  [SET_UPDATE_APP_SNACKBAR](state) {
    state.isAppUpdated = !state.isAppUpdated;
  },
  [SET_SETTINGS](state, payload) {
    state.settings = payload;

    localStorage.setItem('settings', JSON.stringify(state.settings));
  },
};

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    rating,
    schedule,
    student,
  },
});
