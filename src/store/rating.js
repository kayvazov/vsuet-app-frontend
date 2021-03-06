import {
  SET_AVG_RATING,
  SET_RATING_HEADER,
  SET_RATING_TABLE,
  SET_STUDENT_FULL_INFO,
} from '@/store/mutations.type';
import { GET_RATING } from '@/store/actions.type';
import api from '@/service/api';
import { EXAM_NAME, SCORE_NAME } from '@/constants';

const state = {
  student: {},
  actualDate: '',
  averageRating: 0,
  table: [],
  tableHeader: [],
};

const mutations = {
  [SET_RATING_TABLE](state, table) {
    state.table = table;
  },

  [SET_AVG_RATING](state) {
    const calcAverageRating = state.table
      .reduce((acc, ratingItem) => {
        if (ratingItem.value[26]?.length > 0) {
          if ([SCORE_NAME, EXAM_NAME].includes(ratingItem.lesson.type)) {
            acc += Number(ratingItem.value[26]);
          }
        }

        return acc;
      }, 0);

    const countLessons = state.table
      .filter((ratingItem) => [SCORE_NAME, EXAM_NAME].includes(ratingItem.lesson.type))
      .length;

    state.averageRating = calcAverageRating
      ? (calcAverageRating / countLessons).toFixed(2)
      : 0;
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

      commit(SET_AVG_RATING);
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
