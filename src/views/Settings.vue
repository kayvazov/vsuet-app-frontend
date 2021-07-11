<template>
  <section>
    <h1 class="mb-5">
      Настройки
    </h1>

    <v-card>
      <v-card-text>
        <v-form ref="regForm">
          <v-text-field
            label="Номер зачётной книжки"
            v-model="student.recordBookNum"
            :rules="[
              v => !!v || 'Данное поле не может быть пустым'
            ]"
            filled
          />

          <v-text-field
            label="Номер подгруппы"
            v-model="student.subgroup"
            :rules="[
              v => !!v || 'Данное поле не может быть пустым'
            ]"
            filled
          />

          <v-btn color="primary" @click="saveStudentInfo">
            Сохранить
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import { SET_STUDENT_LOCAL_INFO } from '@/store/mutations.type';

export default {
  name: 'Welcome',
  data: () => ({
    student: {
      recordBookNum: '',
      subgroup: '',
    },
  }),
  methods: {
    saveStudentInfo() {
      if (this.$refs.regForm.validate()) {
        this.$store.commit(SET_STUDENT_LOCAL_INFO, this.student);

        alert('Информация успешно сохранена!');

        this.$router.push({
          name: 'RatingPage',
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
