<template>
  <section class="col-md-8 col-12 ma-auto">
    <div class="d-flex align-center justify-center g-main-wrapper">
      <v-form ref="form"
              @submit.prevent="finStudentRating"
              class="d-flex flex-column align-center justify-center fill-width">
        <v-text-field
          outlined
          rounded
          required
          append-icon="search"
          class="fill-width"
          @click:append="finStudentRating"
          label="Номер зачётки"
          :loading="button.loading"
          :disabled="button.loading"
          :rules="[v => !!v || 'Данное поле обязательно']"
          v-model="recordBookNum"
        />
      </v-form>
    </div>

    <v-row justify="center" class="mt-5" v-if="student && student.recordBookNum">
      <v-col md="6">
        <v-card class="mb-5">
          <v-card-title>Карточка студента</v-card-title>
          <v-card-subtitle class="mt-1">
            <p class="mb-2">Номер зачётки: {{ student.recordBookNum }}</p>
            <p class="mb-2">Факультет: {{ student.faculty.name }}</p>
            <p class="mb-2" v-if="student.groups.length >= 2">
              <v-select v-model="studentGroup"
                        :items="student.groups"
                        @change="finStudentRating"
                        return-object="true"
                        label="Выберите группу"
                        item-text="name">
                <template v-slot:prepend>
                  Группа:
                </template>
              </v-select>
            </p>
            <p class="mb-2" v-else>
              Группа: {{ student.groups[0].name }}
            </p>
            <p class="mb-2">Дата обновления: {{ parseDate(student.ratingUpdatedAt) }}</p>
            <p class="mb-0">
              Made by <a target="_blank" href="https://vk.com/kenan_aivazov">Kenan Ayvazov</a>
            </p>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="saveUserRecordNum">
              Сохранить
            </v-btn>
            <v-spacer />
            <v-btn
              color="primary"
              v-if="lsRecordBook"
              outlined
              @click="clearUserRecordNum">
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row
      justify="center"
      ref="table"
    >
      <v-col class="table-wrapper" v-if="table.length">
        <div class="d-flex justify-center mb-4">
          <v-btn
            color="primary"
            :outlined="viewName !== 'table-card'"
            class="mr-2"
            @click="changeDataView('table-card')"
            large
          >
            Карточки
          </v-btn>

          <v-btn
            color="primary"
            :outlined="viewName !== 'table-simple'"
            large
            @click="changeDataView('table-simple')"
          >
            Таблица
          </v-btn>
        </div>

        <component :is="viewName" :data="table" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Card from '@/views/rating/table/Card';
import Simple from '@/views/rating/table/Simple';
import { GET_RATING } from '@/store/actions.type';

export default {
  data: () => ({
    recordBookNum: '' || localStorage.getItem('recordBookNum'),
    lsRecordBook: localStorage.getItem('recordBookNum'),
    appVersion: process.env.VERSION,
    isVersus: false,
    button: {
      loading: false,
    },
    studentGroup: JSON.parse(localStorage.getItem('studentGroup')),
    viewName: 'table-card',
  }),

  computed: {
    ...mapState({
      table: (state) => state.rating.table,
      student: (state) => state.rating.student,
      tableHeader: (state) => state.rating.tableHeader,
    }),
  },

  components: {
    TableCard: Card,
    TableSimple: Simple,
  },

  methods: {

    saveUserRecordNum() {
      localStorage.setItem('recordBookNum', this.recordBookNum);
      localStorage.setItem('studentGroup', JSON.stringify(this.studentGroup));

      if (localStorage.getItem('recordBookNum') || localStorage.getItem('studentGroup')) {
        alert('Номер зачётки и группа успешно сохранён! Теперь при заходе на сайт вам не нужно будет вводить номер зачётки повторно');
      }
    },

    clearUserRecordNum() {
      localStorage.removeItem('recordBookNum');
      localStorage.removeItem('studentGroup');

      if (!localStorage.getItem('recordBookNum')) {
        alert('Номер зачётки успешно удалён из локального хранилища!');
      }
    },

    async finStudentRating() {
      if (this.$refs.form.validate()) {
        this.button.loading = true;

        try {
          await this.$store.dispatch(GET_RATING, {
            recordBookNum: this.recordBookNum,
            groupId: this.studentGroup?.value,
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.button.loading = false;
        }
      }
    },

    parseDate(date) {
      return (new Date(date)).toLocaleString('ru-RU');
    },

    changeDataView(component) {
      this.viewName = component;
    },
  },

  mounted() {
  },
};
</script>

<style lang="scss">
.v-application {
  a {
    color: #d72a2a !important;
  }
}

.fill-width {
  width: 100%;
}

.v-expansion-panel-content__wrap {
  overflow-y: auto;
}

.v-expansion-panels--popout>.v-expansion-panel {
  max-width: 100%;
}

.table {
  border-collapse: collapse;
  overflow: hidden;

  &-header {
    position: sticky;
    left: 0;

    h3 {
      color: #d72a2a;
    }
  }

  &-wrapper {
    overflow: auto;
  }

  thead {
    tr {
      &:nth-of-type(1) {
        td:nth-of-type(1), td:nth-of-type(2), td:nth-of-type(3) {
          display: none;
        }

        td {
          &:nth-child(20) {
            @media screen and (max-width: 600px) {
              min-width: 60px;
            }
          }
        }
      }
    }

    td {
      min-width: 60px;
      font-size: 12px;
      text-align: center;

      &:empty {
        display: none;
      }

      @media screen and (max-width: 600px) {
        min-width: 40px;
      }
    }
  }

  tr {
    td {
      &:first-of-type {
        padding: 6px 10px;
      }
    }
  }

  td {
    border: 2px solid #eeee;
    padding: 6px;
    font-size: 12px;
    text-align: center;

    .v-chip.v-size--default {
      min-width: 45px;
      text-align: center;
      font-size: 12px;

      .v-chip__content {
        width: 100%;
        justify-content: center;
      }
    }

    a {
      line-height: 1.2;
    }
  }

  &-item {
    &-primary {
      color: #fff;
      border-color: #757575 !important;
      background-color: #757575;

      @media screen and (max-width: 600px) {
        min-width: 60px !important;
      }
    }

    &-hidden {
      opacity: 0;
      border-color: transparent !important;
    }
  }
}
</style>
