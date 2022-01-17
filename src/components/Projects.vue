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
        <th scope="row">{{ project.title }}</th>
        <td>{{ project.text }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import * as api from '../modules/api';

export default {
  setup() {
    let project = reactive({
      title: '',
      text: '',
    });
    api.get(
      'offers',
      {
        params: { collection: 'lookfor' },
      },
      function (response) {
        console.log(response),
          (project.title = response.data.data.attributes.title),
          (project.text = response.data.data.attributes.text);
      },
      (error) => console.log(error)
    );
    return {
      ...toRefs(project),
    };
  },
};
</script>
