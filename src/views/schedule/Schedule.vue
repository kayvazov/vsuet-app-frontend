<template>
  <section>
    <h1 class="mb-5">
      Расписание на сегодня
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
      <div v-if="schedule.length > 0">
        <v-list
          class="mt-4"
          v-for="(lesson, lessonIndex) in schedule"
          :key="lessonIndex"
          elevation="2"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ lesson.name }}</v-list-item-title>
              <v-list-item-subtitle class="mb-4">{{ lesson.type }}</v-list-item-subtitle>
              <v-list-item-subtitle>Кабинет: {{ lesson.audience }}</v-list-item-subtitle>
              <v-list-item-subtitle>Преподаватель: {{ lesson.teacher }}</v-list-item-subtitle>
              <v-list-item-subtitle>
                Время пары: {{ lesson.time.start }} - {{ lesson.time.end }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <div v-else>
        <h3>
          Сегодня пар нет
        </h3>
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
    today: dayjs().format('dddd'),
    date: null,
    settings: false,
  }),
  computed: {
    ...mapState({
      schedule: (state) => state.schedule.schedule,
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
    if (this.schedule.length === 0) {
      this.$store.dispatch(GET_SCHEDULE);
    }
  },
};
</script>

<style scoped></style>
