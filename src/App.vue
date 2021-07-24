<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <div class="col-md-10 col-12 ma-auto pa-0 mt-3">
          <router-view />
        </div>
      </v-container>
      <v-footer class="mt-4 mb-6">
        <p class="mb-0 text-center d-block ma-auto text-body-2 font-weight-medium">
          Made with
          <v-icon color="red">favorite</v-icon>
          and
          <v-icon color="brown">coffee</v-icon>
        </p>
      </v-footer>
    </v-main>
    <v-bottom-navigation
      background-color="#f5f5f5"
      :input-value="isRegistered"
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

    <v-snackbar
      :timeout="-1"
      app
      v-model="isAppUpdated">
      Установлено обновление. Пожалуйста, перезайдите в приложение
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',

  data: () => ({}),

  computed: {
    ...mapState({
      isRegistered: (state) => Object.keys(state.student.studentLocalInfo || {}).length > 0,
      isAppUpdated: (state) => state.isAppUpdated,
    }),
  },
  methods: {
    updatePage() {
      window.location.reload();
    },
  },
  mounted() {
    if (!this.isRegistered) {
      this.$router.push({
        name: 'Settings',
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .v-bottom-navigation {
    .v-btn {
      height: 100% !important;
    }
  }

  .v-footer {
    position: relative !important;
    bottom: auto !important;
    top: auto !important;
  }
</style>
