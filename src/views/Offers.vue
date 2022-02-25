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
              @click.prevent="titleTeams"
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
      </div>
      <div class="col-lg-3">
        <form class="ms-4">
          <h3 class="pb-3">{{ $t('filter.filterHeader') }}</h3>
          <div class="mb-3">
            <input
              type="text"
              v-model="search"
              class="form-control"
              :placeholder="$t('filter.inputPlaceholder')"
            />
          </div>
          <div class="select mt-2">
            <label class="form-label">{{ $t('filter.regionsLabel') }}</label>
            <select class="form-select" aria-label="Default select example">
              <option selected="selected" value="Все регионы">
                Все регионы
              </option>
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
            <select class="form-select">
              <option value="day">День</option>
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
              @click.prevent="searchHandler"
            >
              {{ $t('filter.searchBtn') }}
            </button>
            <button type="button" class="btn btn-warning">
              {{ $t('filter.clearBtn') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue';
import Table from '@/components/Table.vue';
import Toast from '@/components/Toast.vue';
import { computed, onMounted } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { getOffersWithPagination } from '../api/offers';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

export default {
  components: { Header, Table, InfiniteLoading, Toast },
  setup() {
    const { t } = useI18n();

    const projects = ref([]);
    const teams = ref([]);

    let page = 1;

    const titleProjects = () => {
      document.title = t('message.projectsTitle') + ' | Benchkiller';
    };

    onMounted(titleProjects);

    const titleTeams = () => {
      document.title = t('message.teamsTitle') + ' | Benchkiller';
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
              projects.value.push(...res.data.data);
              $state.loaded();
            }
          })
          .catch(() => (serverError.value = true));
        page++;
      } catch (error) {
        $state.error();
      }
    };

    const loadTeams = ($state) => {
      try {
        getOffersWithPagination('available', page)
          .then((res) => {
            if (res.data.data.length < 25) $state.complete();
            else if (!res.data.data) serverError.value = true;
            else {
              teams.value.push(...res.data.data);
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
      return projects.value.filter((elem) =>
        elem.includes.toLowerCase().includes(search.value)
      );
    });

    return {
      projects,
      teams,
      t,
      titleProjects,
      titleTeams,
      loadProjects,
      loadTeams,
      serverError,
      search,
      searchHandler,
    };
  },
};
</script>
