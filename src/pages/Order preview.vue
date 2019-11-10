<template>
    <q-page class="q-pa-sm">
        <!-- Title of list when data not exists -->
        <banner-orange
            v-if="this.dbData ==''"
        >Nema podataka za prikaz</banner-orange>

        <div v-else>
            <!-- Title of list when data exists -->
            <banner-blue>Pregled porudžbina</banner-blue>

            <!-- List of data -->
            <q-list
                bordered
                separator
                class="rounded-borders"
            >
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
        </div>
    </q-page>
</template>

<script>
    import dbObjects from '../mixin/db-objects'
    import ordersTableSettings from '../mixin/orders-table-settings'

    export default {
        mixins: [dbObjects, ordersTableSettings],

        components: {
            'banner-orange': require('components/Shared/banner-orange').default,
            'banner-blue': require('components/Shared/banner-blue').default,
        },

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