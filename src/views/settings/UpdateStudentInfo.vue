<template>
  <section>
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
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" outlined :to="{ name: 'Settings' }">
          Назад
        </v-btn>

        <v-spacer />

        <v-btn color="primary" @click="saveStudentInfo">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
import { SET_STUDENT_LOCAL_INFO } from '@/store/mutations.type';

export default {
  name: 'UpdateStudentInfo',
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
