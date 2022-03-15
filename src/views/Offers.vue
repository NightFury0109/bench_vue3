<template>
  <Header />
  <Alert v-if="auth" class="alert-success">
    <template v-slot:icon
      ><svg
        class="me-2"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm7 10c0 4.52-2.98 8.69-7 9.93-4.02-1.24-7-5.41-7-9.93V6.3l7-3.11 7 3.11V11zm-11.59.59L6 13l4 4 8-8-1.41-1.42L10 14.17z"
        /></svg
    ></template>
    <template v-slot:text>
      {{ $t('message.toastSuccess') }}
    </template></Alert
  >
  <Alert v-if="serverError" class="alert-danger">
    <template v-slot:icon>
      <svg
        class="me-2"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg
    ></template>
    <template v-slot:text>
      {{ $t('message.toastServerError') }}
    </template></Alert
  >
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
              :search="search"
              @error="handleError"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <Filter
          class="sticky-top pt-3"
          @search="doSearch"
          @clean-search="cleanSearch"
        />
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue';
import Table from '@/components/Table.vue';
import Alert from '@/components/Alert.vue';
import Filter from '@/components/Filter.vue';
import { computed, onMounted, reactive } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  components: { Header, Table, Alert, Filter },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const auth = computed(() => store.state.firstAuth);

    // Names of tabs and query params
    const collections = ref([
      { tab: t('message.tab1'), param: 'lookfor' },
      { tab: t('message.tab2'), param: 'available' },
    ]);
    const currentTab = ref(collections.value[0].tab);

    const setTitle = (i) => {
      document.title = collections.value[i].tab + ' | Benchkiller';
    };
    onMounted(() => setTitle(0));
    let search = reactive({});
    const doSearch = (ob) => {
      Object.assign(search, ob);
    };
    const cleanSearch = () => {
      Object.assign(search, {});
    };
    const serverError = ref(false);
    const handleError = () => {
      serverError.value = true;
      setTimeout(() => (serverError.value = false), 10000);
    };
    return {
      collections,
      t,
      currentTab,
      setTitle,
      auth,
      doSearch,
      search,
      cleanSearch,
      serverError,
      handleError,
    };
  },
};
</script>
