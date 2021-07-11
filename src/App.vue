<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <div class="col-md-10 col-12 ma-auto pa-0 mt-3">
          <router-view />
        </div>
      </v-container>
    </v-main>
    <v-bottom-navigation
      background-color="#f5f5f5"
      :input-value="isRegisteredUser"
      app
      color="indigo"
      grow
      fixed
    >
      <router-link
        value="rating"
        class="fill-height"
        :to="{ name: 'RatingPage' }"
        tag="v-btn"
      >
        <span class="mt-1">
          Рейтинг
        </span>

        <v-icon>
          stars
        </v-icon>
      </router-link>

      <router-link value="schedule" :to="{ name: 'SchedulePage' }" tag="v-btn">
        <span class="mt-1">
          Расписание
        </span>

        <v-icon>
          calendar_today
        </v-icon>
      </router-link>
      <router-link value="schedule" :to="{ name: 'Settings' }" tag="v-btn">
        <span class="mt-1">
          Настройки
        </span>

        <v-icon>
          settings
        </v-icon>
      </router-link>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',

  data: () => ({
  }),

  computed: {
    ...mapState([
      'studentLocalInfo',
    ]),

    isRegisteredUser() {
      return this.studentLocalInfo;
    },
  },
};
</script>

<style lang="scss">
  .v-bottom-navigation {
    .v-btn {
      height: 100% !important;
    }
  }
</style>
