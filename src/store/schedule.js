import { SET_SCHEDULE } from '@/store/mutations.type';
import { GET_SCHEDULE } from '@/store/actions.type';
import api from '@/service/api';
import dayjs from 'dayjs';

const state = {
  schedule: [],
};

const mutations = {
  [SET_SCHEDULE](state, schedule) {
    state.schedule = schedule;
  },
};

const actions = {
  async [GET_SCHEDULE]({ commit, rootState }, payload) {
    const { recordBookNum, subgroup } = rootState.student.studentLocalInfo;
    let date = dayjs();

    if (payload?.date) {
      date = dayjs(payload?.date);
    }

    try {
      const { data } = await api.post('/schedule/get', {
        recordBookNum,
        subgroup,
        date,
      });

      commit(SET_SCHEDULE, data);
    } catch (e) {
      console.log(e);

      if (e?.response?.data) {
        // eslint-disable-next-line no-alert
        alert(e?.response?.data?.message);
      }
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
