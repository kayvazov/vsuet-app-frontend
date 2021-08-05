<template>
  <section>
    <v-expansion-panels focusable multiple>
      <v-expansion-panel hidden>
        <v-expansion-panel-header>
          <div class="table-header">
            <h3 class="mb-0 red--text">
              Название предмета
            </h3>
            <h4 class="mt-2 mb-0">
              Тип предмета
            </h4>
            <h4 class="mt-2 mb-0">
              Итоговый рейтинг: <span class="red--text">цифра</span>
            </h4>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pt-3">
          <a
            href=""
            target="_blank"
            class="d-block mb-3 red--text"
          >
            Оригинал
          </a>

          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <div>
                  Итог по КТ 1 - <span class="green--text font-weight-bold">90</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Лекция - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Практика - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Другое - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Лабораторные - 30
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <div>
                  Итог по КТ 2 - <span class="orange--text font-weight-bold">80</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Лекция - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Практика - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Другое - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Лабораторные - 30
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <div>
                  Итог по КТ 3 - <span class="red--text font-weight-bold">50</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Лекция - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Практика - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Другое - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Лабораторные - 30
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <div>
                  Итог по КТ 4 - <span class="green--text font-weight-bold">90</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Лекция - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Практика - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Другое - 30
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      Лабораторные - 30
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel
        v-for="(rating, ratingIndex) in data"
        :key="ratingIndex"
      >
        <v-expansion-panel-header>
          <div class="table-header">
            <h3 class="mb-0 red--text">
              {{ rating.lesson.name }}
            </h3>
            <h4 class="mt-2 mb-0">
              {{ rating.lesson.type }}
            </h4>
            <h4 class="mt-2 mb-0" v-if="averageRating(rating.lesson.type)">
              Итоговый рейтинг: <span class="red--text">{{ rating.value[26] }}</span>
            </h4>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pt-3">
          <div class="d-flex justify-space-between align-center mb-6 flex-sm-row flex-column">
            <a
              :href="rating.lesson.href"
              target="_blank"
              class="d-block red--text"
            >
              Оригинал
            </a>

            <v-switch
              v-model="rating.showOnlyControlPoints"
              inset
              hide-details
              class="mt-sm-0"
              label="Только КТ"
            />
          </div>

          <v-expansion-panels v-if="rating.showOnlyControlPoints">
            <v-expansion-panel
              v-for="(upgradedRating, upgradedRatingIndex) in rating.upgradedRating"
              :key="upgradedRatingIndex"
            >
              <v-expansion-panel-header>
                <div>
                  {{ upgradedRating.total.name }} -
                  <span
                    :class="[
                        'font-weight-bold',
                        `${getColor(upgradedRating.total.score)}--text`
                      ]">
                      {{ upgradedRating.total.score }}
                    </span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list dense>
                  <v-list-item
                    v-for="(pointType, pointTypeIndex) in upgradedRating.items"
                    :key="pointTypeIndex"
                    class="pa-0">
                    <v-list-item-content>
                      <div>
                        {{ pointType.name }}({{ pointType.weight }}) -
                        <span
                          :class="[
                            'font-weight-bold',
                            `${getColor(pointType.score)}--text`
                          ]">
                            {{ pointType.score }}
                          </span>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <div
            v-else
            class="table-wrapper"
          >
            <table ref="table" class="table">
              <thead>
              <tr
                v-for="(ratingHeader, ratingHeaderIndex) in rating.lesson.header"
                :key="ratingHeaderIndex"
              >
                <td
                  v-for="(headerItem, headerItemIndex) in ratingHeader.children"
                  :key="headerItemIndex"
                  :rowspan="headerItem.rowSpan"
                  :colspan="headerItem.colSpan"
                  :hidden="!headerItem.text"
                  :class="[
                    {
                      'table-item-primary': headerItem.text.includes('Итог')
                    },

                  ]"
                >
                  {{ headerItem.text }}
                </td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td
                  v-for="(value, valueIndex) in rating.value"
                  :key="valueIndex"
                >
                  <v-chip :color="getColor(value)">
                    {{ value }}
                  </v-chip>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </section>
</template>

<script>
import getRatingColor from '@/helper/getRatingColor';
import { EXAM_NAME, SCORE_NAME } from '@/constants';
import { mapState } from 'vuex';

export default {
  name: 'Card',
  props: {
    data: {
      type: Array,
    },
  },
  methods: {
    getColor: getRatingColor,
    averageRating(type) {
      return [SCORE_NAME, EXAM_NAME].includes(type);
    },
  },
  computed: {
    ...mapState({
      settings: (state) => state.settings,
    }),
  },
};
</script>
