<template>
  <table v-if="dataReceived" class="container table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col" class="text-start fw-light py-4">Содержание</th>
        <th scope="col" class="text-center fw-light py-4">Дата</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="team" v-for="team in teams.value">
        <td>
          <input
            class="form-check-input mt-3"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
        </td>
        <td class="p-3">
          <p class="fw-bold mb-3">{{ team.attributes.title }}</p>
          <pre class="text-muted" style="white-space: break-spaces">{{
            team.attributes.text
          }}</pre>
        </td>
        <td>
          {{ new Date(team.attributes['created-at']).toLocaleString() }}
        </td>
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
        { collection: 'available' },
        (response) => {
          teams.value = response.data.data;
          dataReceived.value = true;
          console.log(response);
        },
        (error) => console.log(error)
      );
    });
    return { teams, dataReceived };
  },
};
</script>
