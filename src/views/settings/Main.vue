<template>
  <v-list elevation="3">
    <v-list-item-group
      color="primary"
    >
      <v-list-item :to="{ name: 'SettingsUserEdit' }">
        <v-list-item-icon>
          <v-icon>
            person
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Редактировать данные</v-list-item-title>
          <v-list-item-subtitle>
            В данном разделе вы можете <br> изменить ранее введённую <br> информацию о себе
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <template v-slot:default="{ active }">
          <v-list-item-icon>
            <v-icon>
              dark_mode
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Тёмная тема</v-list-item-title>
            <v-list-item-subtitle>
              Включить тёмную тему <br> (beta-версия)
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch :input-value="active" v-model="settings.darkTheme" />
          </v-list-item-action>
        </template>
      </v-list-item>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Настройки рейтинга</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-select
            v-model="settings.ratingView"
            label="Отображать рейтинг, как"
            item-text="name"
            return-object
            :items="ratingViewTypes"
          ></v-select>
        </v-list-item>
        <v-list-item v-if="false">
          <v-switch
            v-model="settings.showOnlyControlPoints"
            label="Показывать сразу КТ"
          />
        </v-list-item>
      </v-list-group>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState } from 'vuex';
import { SET_SETTINGS } from '@/store/mutations.type';

export default {
  name: 'Main',
  data: () => ({
    ratingViewTypes: [
      {
        name: 'Таблица',
        type: 'table-simple',
      },
      {
        name: 'Карточки',
        type: 'table-card',
      },
    ],
  }),
  computed: {
    ...mapState({
      settings: (state) => state.settings,
    }),
  },
  watch: {
    settings: {
      handler() {
        this.$store.commit(SET_SETTINGS, this.settings);
        this.$vuetify.theme.dark = this.settings.darkTheme;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>

</style>
