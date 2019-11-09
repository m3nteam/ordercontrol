<template>
    <q-page class="q-pa-sm">
        <q-list bordered separator class="rounded-borders">
            <q-expansion-item
                class="bg-grey-3 text-subtitle1"
                v-for="item in reportData"
                :key="item.id"
                :label="item.partner"
                :caption="item.id"
                icon="account_box"
                expand-separator
                group="group1"
            >
                <q-table
                    dense
                    :data="item.dataSet"
                    :columns="tblColumns"
                    :pagination.sync="tblPagination"
                    :visible-columns="tblVisColImport"
                    row-key="product"
                >
                </q-table>

            </q-expansion-item>
        </q-list>
    </q-page>
</template>

<script>
    import dbObjects from '../mixin/db-objects'
    import ordersTableSettings from '../mixin/orders-table-settings'

    export default {
        mixins: [dbObjects, ordersTableSettings],

        beforeMount(){
            this.$store.dispatch('storeDb/prepareReportData', null, {root: true});
        },

        computed:{
            reportData:{
                get(){
                    return this.$store.getters['storeDb/getReportData'];
                }
            }
        }
    }
</script>

<style>

</style>