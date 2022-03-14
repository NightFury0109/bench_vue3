<template>
  <form class="ms-4">
    <h3 class="pb-3">{{ $t('filter.filterHeader') }}</h3>
    <div class="mb-3">
      <input
        type="text"
        v-model.trim="searched.search"
        class="form-control"
        :placeholder="$t('filter.inputPlaceholder')"
      />
    </div>
    <div class="select mt-2">
      <label class="form-label">{{ $t('filter.regionsLabel') }}</label>
      <select class="form-select" v-model="searched.region">
        <option v-for="(reg, i) in regions" :key="i" :value="reg.value">
          {{ reg.text }}
        </option>
      </select>
    </div>
    <div class="select mt-3">
      <label class="form-label">{{ $t('filter.timeframeLabel') }}</label>
      <select class="form-select" v-model="searched.period">
        <option v-for="(period, i) in periods" :key="i" :value="period.value">
          {{ period.text }}
        </option>
      </select>
    </div>
    <div class="buttons mt-3">
      <button
        type="button"
        class="btn btn-primary me-2"
        @click.prevent="$emit('search', searched)"
      >
        {{ $t('filter.searchBtn') }}
      </button>
      <button
        type="button"
        class="btn btn-warning"
        @click.prevent="$emit('clean-search', searched)"
      >
        {{ $t('filter.clearBtn') }}
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const regions = ref([
      {
        text: 'Все регионы',
        value: 'Все регионы',
      },
      {
        text: 'СНГ',
        value: 'СНГ',
      },
      {
        text: 'Европа',
        value: 'Европа',
      },
      {
        text: 'Азия',
        value: 'Азия',
      },
      {
        text: 'Австралия',
        value: 'Австралия',
      },
      {
        text: 'Азербайджан',
        value: 'Азербайджан',
      },
      {
        text: 'Все регионы',
        value: 'Все регионы',
      },
      {
        text: 'Америка',
        value: 'Америка',
      },
      {
        text: 'Армения',
        value: 'Армения',
      },
      {
        text: 'Беларусь',
        value: 'Беларусь',
      },
      {
        text: 'Все регионы',
        value: 'Все регионы',
      },
      {
        text: 'Великобритания',
        value: 'Великобритания',
      },
      {
        text: 'Все регионы',
        value: 'Все регионы',
      },
      {
        text: 'Германия',
        value: 'Германия',
      },
      {
        text: 'Грузия',
        value: 'Грузия',
      },
      {
        text: 'Дания',
        value: 'Дания',
      },
      {
        text: 'Израиль',
        value: 'Израиль',
      },
      {
        text: 'Казахстан',
        value: 'Казахстан',
      },
      {
        text: 'Канада',
        value: 'Канада',
      },
      {
        text: 'Норвегия',
        value: 'Норвегия',
      },
      {
        text: 'Польша',
        value: 'Польша',
      },
      {
        text: 'Россия',
        value: 'Россия',
      },
      {
        text: 'США',
        value: 'США',
      },
      {
        text: 'Таджикистан',
        value: 'Таджикистан',
      },
      {
        text: 'Узбекистан',
        value: 'Узбекистан',
      },
      {
        text: 'Украина',
        value: 'Украина',
      },
      {
        text: 'Финляндия',
        value: 'Финляндия',
      },
      {
        text: 'Швейцария',
        value: 'Швейцария',
      },
      {
        text: 'Швеция',
        value: 'Швеция',
      },
    ]);
    const periods = ref([
      {
        text: 'День',
        value: 'day',
      },
      {
        text: 'Неделя',
        value: 'week',
      },
      {
        text: 'Месяц',
        value: 'month',
      },
      {
        text: 'Квартал',
        value: 'quarter',
      },
      {
        text: 'Произвольный период',
        value: 'various_period ',
      },
    ]);

    const searched = reactive({
      search: '',
      region: 'Все регионы',
      period: 'День',
    });

    return { searched, regions, periods };
  },
};
</script>
