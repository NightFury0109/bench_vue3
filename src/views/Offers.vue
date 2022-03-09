<template>
  <Header />
  <Toast v-if="auth" class="alert-success">{{
    $t('message.toastSuccess')
  }}</Toast>
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
            <Table
              v-if="currentTab == collections[i].tab"
              :collection="collections[i].param"
              :search="search.value"
              @error="serverError = true"
            />
            <div class="text-center py-5 my-loading">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <Filter @search="doSearch" />
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue';
import Table from '@/components/Table.vue';
import Toast from '@/components/Toast.vue';
import Filter from '@/components/Filter.vue';
import { computed, onMounted, reactive } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  components: { Header, Table, Toast, Filter },
  emits: ['error', 'handleClick'],
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const auth = computed(() => store.state.firstAuth);
    // Names of tabs and query params
    const collections = reactive([
      { tab: t('message.tab1'), param: 'lookfor' },
      { tab: t('message.tab2'), param: 'available' },
    ]);
    const currentTab = ref(collections[0].tab);

    const setTitle = (i) => {
      document.title = collections[i].tab + ' | Benchkiller';
    };
    onMounted(() => setTitle(0));
    // prop passed to Table.vue
    const search = reactive([]);
    const doSearch = (ob) => {
      console.log(ob);
      search.value = ob;
    };
    const serverError = ref(false);
    return {
      collections,
      t,
      currentTab,
      setTitle,
      auth,
      doSearch,
      search,
      serverError,
    };
  },
};
</script>
