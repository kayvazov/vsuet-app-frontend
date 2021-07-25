import { SET_SCHEDULE } from '@/store/mutations.type';
import { GET_SCHEDULE } from '@/store/actions.type';
import api from '@/service/api';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isToday);

const state = {
  list: null,
  date: dayjs(),
};

const mutations = {
  [SET_SCHEDULE](state, schedule) {
    state.list = schedule.lessons;
    state.date = schedule.date;
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

      let hasNext = false;
      let lessons;

      if (date.isToday()) {
        lessons = data.map((lesson) => {
          if (lesson.time) {
            const {
              start: startLesson,
              end: endLesson,
            } = lesson.time;

            const [startHour, startMinutes] = startLesson.split('.');
            const [endHour, endMinutes] = endLesson.split('.');

            const today = dayjs();
            const startLessonTime = dayjs()
              .hour(Number(startHour))
              .minute(Number(startMinutes))
              .second(0)
              .toDate();
            const endLessonTime = dayjs()
              .hour(Number(endHour))
              .minute(Number(endMinutes))
              .second(0)
              .toDate();

            if (today.isBetween(startLessonTime, endLessonTime, null, '[]')) {
              lesson.isNow = true;
            }

            if (!hasNext && !today.isSameOrAfter(startLessonTime)) {
              lesson.isNext = true;
              hasNext = true;
            }
          }

          return lesson;
        });
      }

      commit(SET_SCHEDULE, {
        lessons: lessons || data,
        date,
      });
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
