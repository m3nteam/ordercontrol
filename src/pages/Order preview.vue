<template>
    <q-page class="q-pa-sm">
        <q-list bordered separator class="rounded-borders">
            <q-expansion-item
                class="bg-grey-3 text-subtitle1"
                v-for="item in dbData"
                :key="item.id"
                :label="item.name"
                :caption="item.id"
                icon="account_box"
                expand-separator
                group="group1"
            >
                <q-expansion-item
                    class="bg-grey-1 text-subtitle1"
                    v-for="order in item.orders"
                    :key="order.id_ord"
                    caption=""
                    :label="`Porudžbina na dan ${order.date}`"
                    icon="account_box"
                    expand-separator
                    group="group2"
                >
                    <q-table
                        dense
                        :data="order.data"
                        :columns="tblColumns"
                        :pagination.sync="tblPagination"
                        :visible-columns="tblVisColImport"
                        row-key="product"
                    >
                    </q-table>
                </q-expansion-item>

            </q-expansion-item>
        </q-list>
    </q-page>
</template>

<script>
    import dbObjects from '../mixin/db-objects'
    import ordersTableSettings from '../mixin/orders-table-settings'

    export default {
        mixins: [dbObjects, ordersTableSettings],
        
        computed:{
            dbData:{
                get(){
                    return this.dbObj;
                }
            }
        }
    }
</script>

<style>

</style>