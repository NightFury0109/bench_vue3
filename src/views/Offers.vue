<template>
  <Header />
  <Toast class="alert-success">{{ $t('message.toastSuccess') }}</Toast>
  <Toast v-if="serverError" class="alert-danger">{{
    $t('message.toastServerError')
  }}</Toast>
  <main class="container-fluid pt-5">
    <div class="d-flex flex-row">
      <div class="col-lg-9">
        <p class="h1">{{ $t('message.searchH') }}</p>
        <ul class="nav nav-tabs pt-4" id="offersTabs" role="tablist">
          <li
            class="nav-item"
            role="presentation"
            v-for="(collection, i) in collections"
            :key="i"
          >
            <button
              @click="
                currentTab = collections[i].tab;
                setTitle(i);
              "
              class="nav-link"
              :class="{ active: currentTab == collections[i].tab }"
              id="projects-tab"
              data-bs-toggle="tab"
              data-bs-target="#offers"
              type="button"
              role="tab"
              aria-controls="offers"
              aria-selected="false"
            >
              {{ collection.tab }}
            </button>
          </li>
        </ul>
        <div class="tab-content" id="offersTabsContent">
          <div
            v-for="(collection, i) in collections"
            :key="i"
            class="tab-pane fade"
            :class="{ 'show active': currentTab == collections[i].tab }"
            id="projects"
            role="tabpanel"
            aria-labelledby="projects-tab"
          >
            {{ currentTab }}
            <Table v-if="currentTab == collections[i].tab" :offers="offers" />
            <div class="text-center py-5 my-loading">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Filter />
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue';
import Table from '@/components/Table.vue';
import Toast from '@/components/Toast.vue';
import Filter from '@/components/Filter.vue';
import { computed, onMounted } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { getOffersWithPagination } from '../api/offers';

export default {
  components: { Header, Table, Toast, Filter },
  setup() {
    const { t } = useI18n();

    const collections = [
      { tab: t('message.tab1'), param: 'lookfor' },
      { tab: t('message.tab2'), param: 'available' },
    ];

    const setTitle = (i) => {
      offers.value = [];
      document.title = collections[i].tab + ' | Benchkiller';
    };

    const currentTab = ref(collections[0].tab);
    const offers = ref([]);
    // Intersection Observer API
    let page = 1;
    const loadOffers = (collection) => {
      getOffersWithPagination(collection, page).then((res) => {
        offers.value.push(...res.data.data);
      });
    };
    onMounted(() => {
      loadOffers('lookfor');
    });

    const search = ref('');

    const searchHandler = computed(() => {
      return offers.value.filter((elem) =>
        elem.includes.toLowerCase().includes(search.value)
      );
    });

    return {
      offers,
      collections,
      t,
      currentTab,
      setTitle,
      loadOffers,
      search,
      searchHandler,
    };
  },
};
</script>
