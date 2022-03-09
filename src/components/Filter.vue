<template>
  <form class="ms-4">
    <h3 class="pb-3">{{ $t('filter.filterHeader') }}</h3>
    <div class="mb-3">
      <input
        type="text"
        v-model="searched.search"
        class="form-control"
        :placeholder="$t('filter.inputPlaceholder')"
      />
    </div>
    <div class="select mt-2">
      <label class="form-label">{{ $t('filter.regionsLabel') }}</label>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="searched.regions"
      >
        <option value="Все регионы">Все регионы</option>
        <option value="СНГ">СНГ</option>
        <option value="Европа">Европа</option>
        <option value="Азия">Азия</option>
        <option value="Австралия">Австралия</option>
        <option value="Азербайджан">Азербайджан</option>
        <option value="Америка">Америка</option>
        <option value="Армения">Армения</option>
        <option value="Беларусь">Беларусь</option>
        <option value="Великобритания">Великобритания</option>
        <option value="Германия">Германия</option>
        <option value="Грузия">Грузия</option>
        <option value="Дания">Дания</option>
        <option value="Израиль">Израиль</option>
        <option value="Казахстан">Казахстан</option>
        <option value="Канада">Канада</option>
        <option value="Норвегия">Норвегия</option>
        <option value="Польша">Польша</option>
        <option value="Россия">Россия</option>
        <option value="США">США</option>
        <option value="Таджикистан">Таджикистан</option>
        <option value="Узбекистан">Узбекистан</option>
        <option value="Украина">Украина</option>
        <option value="Финляндия">Финляндия</option>
        <option value="Швейцария">Швейцария</option>
        <option value="Швеция">Швеция</option>
      </select>
    </div>
    <div class="select mt-3">
      <label class="form-label">{{ $t('filter.timeframeLabel') }}</label>
      <select class="form-select" v-model="searched.period">
        <option value="День">День</option>
        <option value="week">Неделя</option>
        <option value="month">Месяц</option>
        <option value="quarter">Квартал</option>
        <option value="various_period">Произвольный период</option>
      </select>
    </div>
    <div class="buttons mt-3">
      <button
        type="button"
        class="btn btn-primary me-2"
        @click="$emit('search', searched)"
      >
        {{ $t('filter.searchBtn') }}
      </button>
      <button
        type="button"
        class="btn btn-warning"
        @click="$emit('search', searched)"
      >
        {{ $t('filter.clearBtn') }}
      </button>
    </div>
  </form>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const searched = reactive({
      search: '',
      regions: 'Все регионы',
      period: 'День',
    });

    return { searched };
  },
};
</script>
