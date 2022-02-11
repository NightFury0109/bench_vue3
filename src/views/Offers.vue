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
    </div>
    <div
      class="tab-pane fade"
      id="profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      <Table />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Table from '@/components/Table.vue';
import { onMounted } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
import { provide, ref } from 'vue';
import { getOffers } from '../api/offers';

export default {
  components: { Header, Table },
  setup() {
    const { t } = useI18n();

    const tableData = ref([]);

    const getProjects = () => {
      document.title = t('message.projectsTitle') + ' | Benchkiller';
      getOffers('lookfor', tableData);
    };

    onMounted(getProjects);

    const getTeams = () => {
      document.title = t('message.teamsTitle') + ' | Benchkiller';
      getOffers('available', tableData);
    };

    const loadMore = () => {
      for (let i = 0; ; i++) {
        tableData.value.push();
      }
    };

    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 50
      ) {
        const new_data = loadMore();
        tableData.value = [...tableData, ...new_data];
      }
    };

    provide('offers', tableData);
    return { getProjects, getTeams, tableData, t, loadMore, handleScroll };
  },
};
</script>
