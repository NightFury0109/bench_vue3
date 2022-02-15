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
      <VueEternalLoading :load="load"> </VueEternalLoading>
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
// import { onMounted } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
import { provide, ref } from 'vue';
// import { getOffers } from '../api/offers';
import { VueEternalLoading } from '@ts-pro/vue-eternal-loading';
// import { getOffersPagination } from '../api/offers';
import store from '../store/index';

export default {
  components: { Header, Table, VueEternalLoading },
  setup() {
    const { t } = useI18n();

    const tableData = ref([]);

    // const getProjects = () => {
    //   document.title = t('message.projectsTitle') + ' | Benchkiller';
    //   getOffers('lookfor', tableData);
    // };

    // onMounted(getProjects);

    // const getTeams = () => {
    //   document.title = t('message.teamsTitle') + ' | Benchkiller';
    //   getOffers('available', tableData);
    // };

    provide('offers', tableData);

    const PAGE_SIZE = 25;
    let page = 1;

    const axios = require('axios').default;

    async function loadUsers(page) {
      await axios
        .get(
          `http://freedvs.com/benchkiller/api/offers?collection=lookfor&page=${page}`,
          {
            headers: {
              Authorization: 'Bearer ' + store.state.accessToken,
            },
          }
        )
        .then((res) => {
          tableData.value.push(res.data.data);
          console.log(tableData.value);
        });
    }

    console.log(loadUsers(page));

    async function load({ loaded }) {
      const loadedUsers = await loadUsers(page);
      tableData.value.push(loadedUsers);
      page += 1;
      loaded(loadedUsers.length, PAGE_SIZE);
    }

    return { tableData, t, load };
  },
};
</script>
