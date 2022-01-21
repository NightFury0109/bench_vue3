<template>
  <Header />
  <ul class="nav nav-tabs container pt-4" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        @click.prevent="setActive('projects')"
        :class="{ active: isActive('projects') }"
        id="projects-tab"
        data-bs-toggle="tab"
        data-bs-target="#projects"
        type="button"
        role="tab"
        aria-controls="home"
        aria-selected="true"
      >
        Предложения
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        @click.prevent="setActive('teams')"
        :class="{ active: isActive('teams') }"
        id="teams-tab"
        data-bs-toggle="tab"
        data-bs-target="#teams"
        type="button"
        role="tab"
        aria-controls="profile"
        aria-selected="false"
      >
        Команды
      </button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div
      class="tab-pane fade"
      :class="{ 'active show': isActive('projects') }"
      id="projects"
      role="tabpanel"
      aria-labelledby="projects-tab"
    >
      <Projects />
    </div>
    <div
      class="tab-pane fade"
      :class="{ 'active show': isActive('teams') }"
      id="teams"
      role="tabpanel"
      aria-labelledby="teams-tab"
    >
      <Teams v-if="getTeams" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Projects from './Projects.vue';
import Teams from './Teams.vue';
import Header from './Header.vue';

export default {
  components: { Header, Projects, Teams },
  setup() {
    const activeItem = ref('projects');
    const getTeams = ref(false);
    function isActive(menuItem) {
      return activeItem.value === menuItem;
    }
    function setActive(menuItem) {
      activeItem.value = menuItem;
      activeItem.value === 'teams'
        ? (getTeams.value = true)
        : (getTeams.value = false);
    }
    return { activeItem, setActive, isActive, getTeams };
  },
};
</script>
