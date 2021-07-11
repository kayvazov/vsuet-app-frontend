import {
  SET_RATING_HEADER,
  SET_RATING_TABLE,
  SET_STUDENT_FULL_INFO,
} from '@/store/mutations.type';
import { GET_RATING } from '@/store/actions.type';
import api from '@/service/api';

const state = {
  student: {},
  actualDate: '',
  table: [],
  tableHeader: [],
};

const mutations = {
  [SET_RATING_TABLE](state, table) {
    state.table = table;
  },

  [SET_RATING_HEADER](state, tableHeader) {
    state.tableHeader = tableHeader;
  },
};

const actions = {
  async [GET_RATING]({ commit, rootState }) {
    const { recordBookNum, groupId } = rootState.student.studentLocalInfo;

    try {
      const {
        data,
      } = await api.get('/rating/get', {
        params: {
          recordBookNum,
          groupId,
        },
      });

      commit(SET_RATING_TABLE, data.rating);

      commit(SET_STUDENT_FULL_INFO, data.student);
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
