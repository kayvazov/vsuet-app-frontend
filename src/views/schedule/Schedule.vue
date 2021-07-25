<template>
  <section>
    <h1 class="mb-5">
      Расписание на {{ scheduleDay }}
    </h1>

    <v-btn color="primary" class="mb-2" @click="settings = !settings">
      Выбрать дату
    </v-btn>

    <v-scale-transition>
      <v-card v-if="settings">
        <v-card-text>
          <v-date-picker
            v-model="date"
            @change="getScheduleByDay"
            elevation="3"
            full-width
            :first-day-of-week="1"
            locale="ru-ru"
            autocomplete="off"
          ></v-date-picker>
        </v-card-text>
      </v-card>
    </v-scale-transition>

    <div class="mt-4 mb-4">
      <div v-if="schedule && schedule.length !== 0">
        <v-list
          class="mt-4"
          v-for="(lesson, lessonIndex) in schedule"
          :key="lessonIndex"
          elevation="2"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle
                v-if="lesson.isNow"
                class="red--text font-weight-bold mb-3 d-flex align-center"
              >
                <v-icon color="red">error</v-icon>
                <span class="ml-2">
                  Занятие идёт
                </span>
              </v-list-item-subtitle>
              <v-list-item-subtitle
                v-if="lesson.isNext"
                class="text--primary font-weight-bold mb-3 d-flex align-center"
              >
                <v-icon color="primary">info</v-icon>
                <span class="ml-2">
                  Следующая пара
                </span>
              </v-list-item-subtitle>
              <v-list-item-title>{{ lesson.name }}</v-list-item-title>
              <v-list-item-subtitle
                class="mb-4"
              >
                {{ lesson.type }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <template v-if="lesson.isNow">
                  Кабинет: <strong class="text--accent-1">{{ lesson.audience }}</strong>
                </template>
                <template v-else>
                  Кабинет: {{ lesson.audience }}
                </template>
              </v-list-item-subtitle>
              <v-list-item-subtitle>Преподаватель: {{ lesson.teacher }}</v-list-item-subtitle>
              <v-list-item-subtitle>
                Время пары: {{ lesson.time.start }} - {{ lesson.time.end }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <div v-else-if="schedule && schedule.length === 0">
        <h3>
          Сегодня пар нет
        </h3>
      </div>
      <div v-else>
        <v-skeleton-loader
          v-for="skeleton in 10"
          :key="skeleton"
          type="list-item-three-line"
        />
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import { GET_SCHEDULE } from '@/store/actions.type';
import { mapState } from 'vuex';

dayjs.locale(ru);

export default {
  name: 'Index',
  data: () => ({
    date: null,
    settings: false,
  }),
  computed: {
    ...mapState({
      schedule: (state) => state.schedule.list,
      scheduleDay: (state) => state.schedule.date.format('dddd'),
    }),
  },
  methods: {
    getScheduleByDay() {
      this.$store.dispatch(GET_SCHEDULE, {
        date: this.date,
      });
    },
  },
  mounted() {
    if (!this.schedule) {
      this.$store.dispatch(GET_SCHEDULE);
    }
  },
};
</script>

<style lang="scss" scoped>
.v-list-item__title, .v-list-item__subtitle {
  text-overflow: unset;
  white-space: unset;
}
</style>
