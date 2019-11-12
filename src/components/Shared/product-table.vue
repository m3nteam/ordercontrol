<template>
    <q-table
        dense
        :data="data"
        :columns="columns"
        :pagination="pagination"
        :visible-columns="visibleColumns"
        :row-key="rowKey"
    >
    </q-table>
</template>

<script>
export default {
    props:['data', 'columns', 'pagination', 'visibleColumns', 'rowKey']
}
</script>