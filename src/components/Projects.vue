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
        <th scope="row">1</th>
        <td>2</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import { onMounted } from 'vue';
import * as api from '../modules/api';

export default {
  setup() {
    let project = reactive({
      title: '',
      text: '',
    });
    onMounted(() => {
      api.get(
        'offers',
        {
          params: { collection: 'lookfor' },
        },
        (response) => console.log(response),
        (error) => console.log(error)
      );
    });
    return {
      ...toRefs(project),
    };
  },
};
</script>
