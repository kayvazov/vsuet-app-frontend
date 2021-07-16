<template>
  <v-list three-line>
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
            В данном разделе вы можете изменить ранее введённую информацию о себе
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
              Включить тёмную тему
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch :input-value="active" v-model="theme" />
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import toBoolean from 'to-boolean';

export default {
  name: 'Main',
  data: () => ({
    theme: toBoolean(localStorage.getItem('app-theme')) || false,
  }),
  watch: {
    theme() {
      this.$vuetify.theme.dark = this.theme;
      localStorage.setItem('app-theme', this.theme);
    },
  },
};
</script>

<style scoped>

</style>
