<template>
  <Header />
  <p class="h1 container pt-4">{{ $t('message.searchH') }}</p>
  <ul class="nav nav-tabs container pt-4" id="offersTabs" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active"
        id="projects-tab"
        data-bs-toggle="tab"
        data-bs-target="#projects"
        type="button"
        role="tab"
        aria-controls="projects"
        aria-selected="true"
        @click.prevent="getProjects"
      >
        {{ $t('message.tab1') }}
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="teams-tab"
        data-bs-toggle="tab"
        data-bs-target="#teams"
        type="button"
        role="tab"
        aria-controls="teams"
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
      id="projects"
      role="tabpanel"
      aria-labelledby="projects-tab"
    >
      <Table :offers="projects" />
      <div class="text-center py-5 my-loading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
          <InfiniteLoading
            :tableData="projects"
            @infinite="loadProjects"
            style="display: none"
          />
        </div>
      </div>
    </div>
    <div
      class="tab-pane fade"
      id="teams"
      role="tabpanel"
      aria-labelledby="teams-tab"
    >
      <Table :offers="teams" />
      <div class="text-center py-5 my-loading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
          <InfiniteLoading
            :tableData="teams"
            @infinite="loadTeams"
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
import { ref } from 'vue';
import { getOffersWithPagination } from '../api/offers';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

export default {
  components: { Header, Table, InfiniteLoading },
  setup() {
    const { t } = useI18n();

    const projects = ref([]);
    const teams = ref([]);

    let page = 1;

    const getProjects = () => {
      document.title = t('message.projectsTitle') + ' | Benchkiller';
    };

    const loadProjects = ($state) => {
      try {
        getOffersWithPagination('lookfor', page).then((res) => {
          if (res.data.data[0].length < 25) $state.complete();
          else {
            projects.value.push(...res.data.data);
            $state.loaded();
          }
        });
        page++;
      } catch (error) {
        $state.error();
      }
    };

    const loadTeams = ($state) => {
      try {
        getOffersWithPagination('available', page).then((res) => {
          if (res.data.data[0].length < 25) $state.complete();
          else {
            teams.value.push(...res.data.data);
            $state.loaded();
          }
        });
        page++;
      } catch (error) {
        $state.error();
      }
    };

    onMounted(getProjects);

    const getTeams = () => {
      document.title = t('message.teamsTitle') + ' | Benchkiller';
    };

    return {
      projects,
      teams,
      t,
      getProjects,
      getTeams,
      loadProjects,
      loadTeams,
    };
  },
};
</script>
