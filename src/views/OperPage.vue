<template>
  <div class="_container">
    <DataTable :value="data" responsiveLayout="scroll">
      <Column header="operation date">
        <template #body="slotProps">
          {{dateformat(slotProps.data.date)}}
        </template>
      </Column>
      <Column field="place" header="place"></Column>
      <Column field="category" header="category"></Column>
      <Column field="amount" header="amount"></Column>
      <Column field="card" header="card"></Column>
      <Column field="description" header="description"></Column>
    </DataTable>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import dateformat from 'dataformat'

export default {
  components: {
    DataTable,
    Column
  },

  setup () {
    const store = useStore()
    const data = store.state.operations.data
    return {
      data,
      dateformat
    }
  }
}

</script>

<style>
</style>