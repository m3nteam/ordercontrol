<template>
    <q-table
        dense
        :data="data"
        :columns="columns"
        :pagination.sync="localPagination"
        :visible-columns="visibleColumns"
        :row-key="rowKey"
    >
    </q-table>
</template>

<script>
export default {
    props:['data', 'columns', 'pagination', 'visibleColumns', 'rowKey'],

    computed:{
        localPagination:{
            get(){
                return this.pagination;
            },
            set(val){
                this.$emit('updatePagination', val);
            }
        }
    }

}
</script>