<template>
  <form class="ms-4" @submit.prevent="$emit('search', searched)">
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
        <option value="all_time">{{ $t('filter.allTime') }}</option>
        <option value="day">{{ $t('filter.day') }}</option>
        <option value="week">{{ $t('filter.week') }}</option>
        <option value="month">{{ $t('filter.month') }}</option>
        <option value="quarter">{{ $t('filter.quarter') }}</option>
        <option value="various_period">
          <p>
            <a
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              {{ $t('filter.variousPeriod') }}
            </a>
          </p>
        </option>
      </select>
    </div>
    <div v-if="showDatepicker" class="d-flex justify-content-between mt-3">
      <div class="me-3">
        <Datepicker
          v-model="searched.begin_date"
          :enableTimePicker="false"
          :format="format"
          autoApply
          :closeOnAutoApply="false"
          locale="ru"
          :previewFormat="format"
        />
      </div>
      <div>
        <Datepicker
          v-model="searched.end_date"
          :enableTimePicker="false"
          autoApply
          :format="format"
          :closeOnAutoApply="false"
          locale="ru"
          :previewFormat="format"
        />
      </div>
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
import { onMounted, reactive, ref, watchEffect } from 'vue';
import * as api from '../api/api';
import { useRouter } from 'vue-router';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: { Datepicker },
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
    const showDatepicker = ref(false);

    let searched = reactive({
      search: '',
      region: 'Все регионы',
      period: 'all_time',
    });

    const format = (date) => {
      const day = date.getDate();
      const months = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
      ];
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };
    watchEffect(() => {
      if (searched.period == 'various_period') {
        showDatepicker.value = true;
        searched['begin_date'] = ref('');
        searched['end_date'] = ref('');
      } else {
        showDatepicker.value = false;
        delete searched['begin_date'];
        delete searched['end_date'];
      }
    });

    return { searched, regions, cleanSearch, showDatepicker, format };
  },
};
</script>
