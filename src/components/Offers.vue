<template>
  <Header />
  <Tabs @switch-tab="getTeams">
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
import { provide, reactive } from 'vue';

export default {
  components: { Header, Tabs, Table },
  setup() {
    let tableData = reactive([]);
    onMounted(() => {
      api.get(
        'offers',
        { collection: 'lookfor' },
        ({ data }) => {
          tableData.push(data.data);
        },
        (error) => console.log(error)
      );
    });

    function getTeams() {
      tableData = [];
      api.get(
        'offers',
        { collection: 'available' },
        ({ data }) => {
          tableData.push(data.data);
        },
        (error) => console.log(error)
      );
    }
    provide('tableData', tableData);
    return { getTeams };
  },
};
</script>
