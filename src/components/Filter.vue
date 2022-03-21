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
        <option v-for="reg in regions" :key="reg.i" :value="reg.id">
          {{ reg.id }}
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
      <button type="button" class="btn btn-warning" @click="cleanSearch">
        {{ $t('filter.clearBtn') }}
      </button>
    </div>
  </form>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import * as api from '../api/api';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const regions = ref([]);
    const router = useRouter();
    const cleanSearch = () => {
      router.go();
    };
    onMounted(() => {
      api.get('regions').then((res) => {
        regions.value = res.data.data;
      });
    });
    const periods = ref([
      {
        text: 'За всё время',
        value: 'all_time',
      },
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

    let searched = reactive({
      search: '',
      region: 'Все регионы',
      period: 'all_time',
    });
    return { searched, regions, periods, cleanSearch };
  },
};
</script>
