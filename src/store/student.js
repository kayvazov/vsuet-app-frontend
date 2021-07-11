import { SET_STUDENT_FULL_INFO, SET_STUDENT_LOCAL_INFO } from '@/store/mutations.type';

const state = {
  studentFullInfo: null,
  studentLocalInfo: JSON.parse(localStorage.getItem('studentLocalInfo')) || null,
};

const mutations = {
  [SET_STUDENT_FULL_INFO](state, payload) {
    state.studentFullInfo = payload;
  },
  [SET_STUDENT_LOCAL_INFO](state, payload) {
    state.studentLocalInfo = payload;

    localStorage.setItem('studentLocalInfo', JSON.stringify(state.studentLocalInfo));
  },
};

export default {
  state,
  mutations,
};
