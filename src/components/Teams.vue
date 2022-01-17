<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td colspan="2">Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import * as api from '../modules/api';

export default {
  setup() {
    onMounted(() => {
      api.get(
        'offers',
        {
          params: { collection: 'available' },
        },
        (response) => console.log(response),
        (error) => console.log(error)
      );
    });
  },
};
</script>
