<template>
  <Header />
  <Tabs>
    <Table title="Предложения" :tableData="tableData"></Table>
    <Table title="Команды" :tableData="tableData"></Table>
  </Tabs>
</template>

<script>
import Header from './Header.vue';
import Tabs from './Tabs.vue';
import Table from './Table.vue';
import { onMounted } from '@vue/runtime-core';
import * as api from '../api/api';
import { provide } from 'vue';

export default {
  components: { Header, Tabs, Table },
  setup() {
    const tableData = [];
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

    // if (selectedTitle.value == 'Команды') {
    //   tableData.splice(0);
    //   api.get(
    //     'offers',
    //     { collection: 'available' },
    //     ({ data }) => {
    //       tableData.push(data.data);
    //     },
    //     (error) => console.log(error)
    //   );
    // }

    provide('tableData', tableData);
    return { tableData };
  },
};
</script>
