<template>
  <section>
    <h1 class="mb-5">
      Рейтинг
    </h1>

    <v-row justify="center">
      <v-col md="6">
        <v-card v-if="student && student.recordBookNum">
          <v-card-title>Карточка студента</v-card-title>
          <v-card-subtitle class="mt-1">
            <p class="mb-2">Номер зачётки: {{ student.recordBookNum }}</p>
            <p class="mb-2">Факультет: {{ student.faculty.name }}</p>
            <p class="mb-2" v-if="student.groups.length >= 2">
              <v-select v-model="studentGroup"
                        :items="student.groups"
                        @change="findStudentRating"
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
              Итоговый рейтинг: <strong class="">{{ averageRating }}</strong>
            </p>
          </v-card-subtitle>
        </v-card>
        <v-skeleton-loader
          v-else
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row
      justify="center"
      ref="table"
    >
      <v-col class="table-wrapper">
        <div v-if="table.length">
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
        </div>
        <div v-else>
          <div class="d-flex justify-center mb-4">
            <v-skeleton-loader
              type="button"
              class="mr-2"
            />
            <v-skeleton-loader
              type="button"
            />
          </div>

          <v-skeleton-loader
            v-for="skeleton in 10"
            :key="skeleton"
            type="list-item-avatar-two-line"
          />
        </div>
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
      tableHeader: (state) => state.rating.tableHeader,
      student: (state) => state.student.studentFullInfo,
      studentLocal: (state) => state.student.studentLocalInfo,
      settings: (state) => state.settings,
      averageRating: (state) => state.rating.averageRating,
    }),
  },

  components: {
    TableCard: Card,
    TableSimple: Simple,
  },

  methods: {
    async findStudentRating() {
      try {
        await this.$store.dispatch(GET_RATING, {
          recordBookNum: this.recordBookNum,
          groupId: this.studentGroup?.value,
        });
      } catch (e) {
        console.log(e);
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
    if (this.studentLocal && this.table.length === 0) {
      this.findStudentRating();
    }

    if (this.settings.ratingView) {
      this.viewName = this.settings.ratingView.type;
    }
  },
};
</script>

<style lang="scss">

.fill-width {
  width: 100%;
}

.v-expansion-panel-content__wrap {
  overflow-y: auto;
}

.v-expansion-panels--popout>.v-expansion-panel {
  max-width: 100%;
}

.v-application:not(.theme--dark) {
  .table {
    td {
      border-color: #eeee;
    }
  }
}

.table {
  border-collapse: collapse;
  overflow: hidden;

  &-header {
    position: sticky;
    left: 0;
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
    border: 2px solid #333232ee;
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
