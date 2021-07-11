<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-layout>
          <router-view />
        </v-layout>
      </v-container>
    </v-main>

    <v-bottom-navigation app color="indigo" grow fixed>
      <router-link
        value="rating"
        class="fill-height"
        :to="{ name: 'RatingPage' }"
        tag="v-btn"
        color="white"
      >
        <span class="mt-1">
            Рейтинг
          </span>

        <v-icon>
          stars
        </v-icon>
      </router-link>

      <router-link value="schedule" :to="{ name: 'SchedulePage' }" tag="v-btn" color="white">
        <span class="mt-1">
          Расписание
        </span>

        <v-icon>
          calendar_today
        </v-icon>
      </router-link>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
  .v-bottom-navigation {
    .v-btn {
      height: 100% !important;
    }
  }
</style>
