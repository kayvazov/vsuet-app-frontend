<template>
  <section>
    <h1 class="mb-5">
      Расписание на {{ today }}
    </h1>

    <div v-if="schedule.length > 0">
      <v-list-item v-for="(lesson, lessonIndex) in schedule" :key="lessonIndex">
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
    </div>
    <div v-else>
      <h3>
        Сегодня пар нет
      </h3>
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
  }),
  computed: {
    ...mapState({
      schedule: (state) => state.schedule.schedule,
    }),
  },
  mounted() {
    if (this.schedule.length === 0) {
      this.$store.dispatch(GET_SCHEDULE);
    }
  },
};
</script>

<style scoped></style>
