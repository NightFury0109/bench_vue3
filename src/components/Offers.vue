<template>
  <Header />
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
import Header from './Header.vue';
import Table from './Table.vue';
import { onMounted } from '@vue/runtime-core';
import * as api from '../api/api';
import { provide, ref } from 'vue';

export default {
  components: { Header, Table },
  setup() {
    const tableData = ref([]);

    const getProjects = () => {
      tableData.value = [];
      api.get(
        'offers',
        { collection: 'lookfor' },
        ({ data }) => {
          tableData.value.push(data.data);
        },
        (error) => console.log(error)
      );
    };

    onMounted(getProjects);

    const getTeams = () => {
      tableData.value = [];
      api.get(
        'offers',
        { collection: 'available' },
        ({ data }) => {
          tableData.value.push(data.data);
        },
        (error) => console.log(error)
      );
    };
    provide('offers', tableData);
    return { getProjects, getTeams, tableData };
  },
};
</script>
