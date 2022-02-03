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
          @click.prevent="switchTab"
        >
          {{ title }}
        </button>
      </li>
    </ul>
    <div
      class="tab-content"
      id="myTabContent"
      @click.prevent="selectedTitle = title"
    >
      <div
        class="tab-pane fade"
        :class="{ 'active show': selectedTitle === title }"
        id="projects"
        role="tabpanel"
        aria-labelledby="data-tab"
        v-for="title in tabTitles"
        :key="title"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, provide } from 'vue';

export default {
  emits: ['switchTab'],
  setup(props, { slots, emit }) {
    const tabTitles = ref(slots.default().map((table) => table.props.title));
    const selectedTitle = ref(tabTitles.value[0]);

    const switchTab = () => {
      emit('switchTab', selectedTitle.value);
    };

    provide('selectedTitle', selectedTitle);
    return { tabTitles, selectedTitle, switchTab };
  },
};
</script>
