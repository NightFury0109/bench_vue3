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
        <td>
          <p class="fw-bold mb-3">{{ team.attributes.title }}</p>
          <pre class="text-muted" style="white-space: break-spaces">{{
            team.attributes.text
          }}</pre>
        </td>
        <td>
          {{ new Date(team.attributes['created-at']).toLocaleDateString() }}
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
      // axios
      //   .get(
      //     process.env.VUE_APP_API_URL + 'offers',
      //     {
      //       params: {
      //         collection: 'available',
      //       },
      //     },
      //     {
      //       headers: {
      //         Authorization: 'Bearer ' + process.env.VUE_APP_AUTH_TOKEN,
      //       },
      //     }
      //   )
      //   .then((res) => {
      //     teams.value = res.data.data;
      //     dataReceived.value = true;
      //     console.log(res);
      //   })
      //   .catch((error) => console.log(error));
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
