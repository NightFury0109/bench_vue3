<template>
  <Header />
  <p class="h1 container pt-4">{{ t('message.searchH') }}</p>
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
        @click.prevent="titleProjects"
      >
        {{ t('message.tab1') }}
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
        @click.prevent="titleTeams"
      >
        {{ t('message.tab2') }}
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
      <InfiniteLoading :tableData="projects" @infinite="loadProjects">
        <template #spinner>
          <div class="text-center py-5 my-loading">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </template>
      </InfiniteLoading>
    </div>
    <div
      class="tab-pane fade"
      id="teams"
      role="tabpanel"
      aria-labelledby="teams-tab"
    >
      <Table :offers="teams" />
      <InfiniteLoading :tableData="teams" @infinite="loadTeams">
        <template #spinner>
          <div class="text-center py-5 my-loading">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </template>
      </InfiniteLoading>
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

    const titleProjects = () => {
      document.title = t('message.projectsTitle') + ' | Benchkiller';
    };

    // const setTitle = (tab) => {
    //   if (tab == 'projects') {
    //     document.title = t('message.projectsTitle') + ' | Benchkiller';
    //   } else if (tab == 'teams') {
    //     document.title = t('message.teamsTitle') + ' | Benchkiller';
    //   }
    // };

    onMounted(titleProjects);

    const titleTeams = () => {
      document.title = t('message.teamsTitle') + ' | Benchkiller';
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

    return {
      projects,
      teams,
      t,
      titleProjects,
      titleTeams,
      loadProjects,
      loadTeams,
    };
  },
};
</script>
