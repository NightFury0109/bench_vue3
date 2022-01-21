<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">Содержание</th>
        <th scope="col">Дата</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{}}</td>
        <td>{{}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { onMounted } from 'vue';
import * as api from '../modules/api';

export default {
  setup() {
    onMounted(() => {
      api.get(
        'offers',
        {
          params: { collection: 'lookfor' },
        },
        (response) => {
          console.log(response.data.data);
        },
        (error) => console.log(error)
      );
    });
    return {};
  },
};
</script>
