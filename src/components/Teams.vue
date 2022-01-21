<template>
  <table v-if="dataReceived" class="container table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">Содержание</th>
        <th scope="col">Дата</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="team" v-for="team in teams.value">
        <td>{{ team.attributes.title }}{{ team.attributes.text }}</td>
        <td>{{ new Date(team.attributes['created-at']) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { ref } from 'vue';
import * as api from '../modules/api';

export default {
  setup() {
    const dataReceived = ref(false);
    const teams = {};
    onMounted(() => {
      api.get(
        'offers',
        {
          params: { collection: 'available' },
        },
        (response) => {
          teams.value = response.data.data;
          dataReceived.value = true;
        },
        (error) => console.log(error)
      );
    });
    return { teams, dataReceived };
  },
};
</script>
