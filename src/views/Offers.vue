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
              @click="titleTeams"
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
            v-for="(collection, i) in collections"
            :key="i"
          >
            <Table :offers="offers" />
            <InfiniteLoading :offers="offers" @infinite="loadProjects">
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
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

export default {
  components: { Header, Table, InfiniteLoading, Toast, Filter },
  setup() {
    const { t } = useI18n();

    const offers = ref([]);
    let page = 1;

    const titleProjects = () => {
      document.title = t('message.projectsTitle') + ' | Benchkiller';
    };

    onMounted(titleProjects);

    const titleTeams = () => {
      document.title = t('message.teamsTitle') + ' | Benchkiller';
    };
    const collections = {
      projects: 'lookfor',
      teams: 'available',
    };
    const serverError = ref(false);
    const loadProjects = ($state) => {
      try {
        getOffersWithPagination('lookfor', page)
          .then((res) => {
            console.log(res.data.data);

            if (res.data.data.length < 25) $state.complete();
            else if (!res.data.data) serverError.value = true;
            else {
              offers.value.push(...res.data.data);
              $state.loaded();
            }
          })
          .catch(() => (serverError.value = true));
        page++;
      } catch (error) {
        $state.error();
      }
    };

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
      titleProjects,
      titleTeams,
      loadProjects,
      serverError,
      search,
      searchHandler,
    };
  },
};
</script>
