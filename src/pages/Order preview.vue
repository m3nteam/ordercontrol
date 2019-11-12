<template>
    <q-page class="q-pa-sm">
        <!-- Title of list when data not exists -->
        <banner-orange
            class="min-component-width"
            v-if="this.dbData ==''"
        >Nema podataka za prikaz</banner-orange>

        <div v-else>
            <!-- Title of list when data exists -->
            <banner-blue
                class="min-component-width"
                title="Pregled porudžbina"
            >
            </banner-blue>

            <!-- List of data -->
            <list-custom
                class="min-component-width removeMP"
            >
                <expansion-custom
                    v-for="item in dbData"
                    :key="item.id"
                    :label="item.name"
                    :caption="item.id"
                    :item="item"
                >
                    <q-expansion-item
                        dense
                        v-for="order in item.orders"
                        :key="order.id_ord"
                        caption=""
                        :label="`Porudžbina na dan ${order.date}`"
                        group="group2"
                        popup
                    >
                        <product-table
                            dense
                            :data="order.data"
                            :columns="tblColumns"
                            :pagination.sync="tblPagination"
                            :visibleColumns="tblVisColImport"
                            rowKey="product"
                        >
                        </product-table>
                    </q-expansion-item>
                </expansion-custom>
            </list-custom>
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
            'list-custom': require('components/Shared/list').default,
            'partner-avatar': require('components/Shared/partner-avatar').default,
            'expansion-custom': require('components/Shared/expansion-partner').default,
            'product-table': require('components/Shared/product-table').default,
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