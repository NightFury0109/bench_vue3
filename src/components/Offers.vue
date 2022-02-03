<template>
  <Header />
  <Tabs @switch-tab="switchTab">
    <Table title="Предложения"></Table>
    <Table title="Команды"></Table>
  </Tabs>
</template>

<script>
import Header from './Header.vue';
import Tabs from './Tabs.vue';
import Table from './Table.vue';
import { onMounted } from '@vue/runtime-core';
import * as api from '../api/api';
import { provide, ref } from 'vue';

export default {
  components: { Header, Tabs, Table },
  setup() {
    const tableData = ref([]);
    onMounted(() => {
      api.get(
        'offers',
        { collection: 'lookfor' },
        ({ data }) => {
          tableData.value.push(data.data);
        },
        (error) => console.log(error)
      );
    });

    function switchTab(selected) {
      tableData.value = [];
      if (selected == 'Команды') {
        api.get(
          'offers',
          { collection: 'available' },
          ({ data }) => {
            tableData.value.push(data.data);
          },
          (error) => console.log(error)
        );
      }
    }

    provide('tableData', tableData);
    return { switchTab };
  },
};
</script>
