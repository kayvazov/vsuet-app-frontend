<template>
  <div>
    <div
      v-for="(rating, ratingIndex) in data"
      class="mt-4 table-simple-item"
      :key="ratingIndex">
      <table ref="table" class="table">
        <thead>
        <tr
          v-for="(ratingHeader, ratingHeaderIndex) in rating.lesson.header"
          :key="ratingHeaderIndex"
        >
          <td></td>
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
          <td>
            <p class="text-left mb-0">
              {{ rating.lesson.name }}
              <br>
              <b>{{ rating.lesson.type }}</b>
              <br>
              <br>
              Итоговый рейтинг:
              <span class="red--text font-weight-bold">{{ rating.value[26] }}</span>
              <br>
              <a
                :href="rating.lesson.href"
                target="_blank"
                class="d-block mt-3 red--text"
              >
                Оригинал
              </a>
            </p>
          </td>
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
  </div>
</template>

<script>
import getRatingColor from '@/helper/getRatingColor';

export default {
  name: 'Card',
  props: {
    data: {
      type: Array,
    },
  },
  methods: {
    getColor: getRatingColor,
  },
};
</script>

<style scoped lang="scss">
.table {
  position: relative;

  &-simple {
    &-item {
      overflow-y: scroll;
    }
  }

  thead {
    tr:first-of-type {
      td:nth-of-type(4) {
        opacity: 0;
      }
    }
  }

  tbody {
    td {
      &:nth-of-type(1) {
        position: sticky;
        left: 0;
        top: 0;
        z-index: 1;
        min-width: 140px;
        max-width: 140px;
      }
    }
  }
}
</style>
