<template>
  <Header />
  <p class="h1 container pt-4">{{ $t('message.searchH') }}</p>
  <ul class="nav nav-tabs container pt-4" id="offersTabs" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active"
        id="home-tab"
        data-bs-toggle="tab"
        data-bs-target="#home"
        type="button"
        role="tab"
        aria-controls="home"
        aria-selected="true"
        @click.prevent="getProjects"
      >
        {{ $t('message.tab1') }}
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#profile"
        type="button"
        role="tab"
        aria-controls="profile"
        aria-selected="false"
        @click.prevent="getTeams"
      >
        {{ $t('message.tab2') }}
      </button>
    </li>
  </ul>
  <div class="tab-content" id="offersTabsContent">
    <div
      class="tab-pane fade show active"
      id="home"
      role="tabpanel"
      aria-labelledby="home-tab"
    >
      <Table />
      <div class="text-center py-5 my-loading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
          <InfiniteLoading
            :tableData="tableData"
            @infinite="getProjects"
            style="display: none"
          />
        </div>
      </div>
    </div>
    <div
      class="tab-pane fade"
      id="profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      <Table />
      <div class="text-center py-5 my-loading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
          <InfiniteLoading
            :tableData="tableData"
            @infinite="getTeams"
            style="display: none"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Table from '@/components/Table.vue';
import { onMounted } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
import { provide, ref } from 'vue';
// import store from '../store/index';
import { getOffersWithPagination } from '../api/offers';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

export default {
  components: { Header, Table, InfiniteLoading },
  setup() {
    const { t } = useI18n();

    const tableData = ref([]);

    provide('offers', tableData);

    let page = 1;
    const getProjects = ($state) => {
      document.title = t('message.projectsTitle') + ' | Benchkiller';
      page = 1;
      console.log('loading...');
      try {
        getOffersWithPagination('lookfor', page).then((res) => {
          if (res.data.data[0].length < 25) $state.complete();
          else {
            tableData.value.push(...res.data.data);
            $state.loaded();
          }
        });
        page++;
      } catch (error) {
        $state.error();
      }
    };

    onMounted(getProjects);

    const getTeams = ($state) => {
      page = 1;
      document.title = t('message.teamsTitle') + ' | Benchkiller';

      try {
        getOffersWithPagination('available', page).then((res) => {
          if (res.data.data[0].length < 25) $state.complete();
          else {
            tableData.value.push(...res.data.data);
            $state.loaded();
          }
        });
        page++;
      } catch (error) {
        $state.error();
      }
    };

    return { tableData, t, getProjects, getTeams };
  },
};
</script>

<style scoped>
/* .my-loading {
  margin: 0 auto;
  width: 2rem;
  height: 2rem;
  max-width: 1320px;
  margin-top: 3rem;
} */
</style>
