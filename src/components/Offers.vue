<template>
  <Header />
  <Tabs>
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
    const tableData = reactive([]);
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
    provide('tableData', tableData);
  },

  // типизировать значение provide (массив данных)
};
</script>
