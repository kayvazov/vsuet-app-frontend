<template>
  <v-expansion-panels focusable popout multiple>
    <v-expansion-panel
      v-for="(rating, ratingIndex) in data"
      :key="ratingIndex"
    >
      <v-expansion-panel-header>
        <div class="table-header">
          <h3 class="mb-0">
            {{ rating.lesson.name }}
          </h3>
          <h4 class="mt-2 mb-0">
            {{ rating.lesson.type }}
          </h4>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="pt-3">
        <a :href="rating.lesson.href" target="_blank" class="d-block mb-3">Оригинал</a>

        <div class="table-wrapper">
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
</template>

<script>
export default {
  name: 'Card',
  props: {
    data: {
      type: Array,
    },
  },

  methods: {
    detectStage(rating) {
      if (Number(rating)) {
        const currentRating = Number(rating);

        if (currentRating >= 85) return 1;
        if (currentRating >= 75 && currentRating <= 84) return 2;
        if (currentRating <= 74) return 3;
      }

      if (rating === 'Отл') return 1;
      if (rating === 'Хор') return 2;
      if (rating === 'Удовл' || rating === 'Неуд') return 3;
      if (rating === 'Зачет') return 4;

      return false;
    },

    getColor(rating) {
      switch (this.detectStage(rating)) {
        case 1:
          return 'green';
        case 2:
          return 'orange';
        case 3:
          return 'red';
        case 4:
          return 'green';
        default:
          return 'white';
      }
    },
  },
};
</script>
