<template>
  <div class="container">
    <ul class="nav nav-tabs pt-4" id="myTab" role="tablist">
      <li
        class="nav-item"
        role="presentation"
        v-for="title in tabTitles"
        :key="title"
        @click.prevent="selectedTitle = title"
      >
        <button
          class="nav-link"
          :class="{ active: selectedTitle === title }"
          id="projects-tab"
          data-bs-toggle="tab"
          data-bs-target="#data"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          {{ title }}
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade"
        id="projects"
        role="tabpanel"
        aria-labelledby="data-tab"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, provide } from 'vue';
export default {
  setup(props, { slots }) {
    const tabTitles = ref(slots.default().map((tab) => tab.props.title));
    const selectedTitle = ref(tabTitles.value[0]);

    provide('selectedTitle', selectedTitle);
    return { tabTitles, selectedTitle };
  },
};
</script>
