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
                <expansion-partner-custom
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
                        group="group2"
                        popup
                    >
                        <template v-slot:header>
                            <q-item>
                                <q-item-section>
                                    <span class="text-subtitle2">{{ `Porudžbina na dan ${order.date}` }}</span>
                                </q-item-section>
                            </q-item>
                                
                            <q-space />

                            <q-item>
                                <q-item-section>
                                    <button-delete
                                        @clicked="deleteOrder(order.id_ord)"
                                    ></button-delete>
                                </q-item-section>
                            </q-item>

                        </template>

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
                </expansion-partner-custom>
            </list-custom>
        </div>
    </q-page>
</template>

<script>
    //mixin
    import dbObjects from '../mixin/db-objects'
    import ordersTableSettings from '../mixin/orders-table-settings'
    import buttonMixin from '../mixin/buttons-mixin'
    import bannerMixin from '../mixin/banners-mixin'
    import listMixin from '../mixin/lists-mixin'
    import partnerComponentMixin from '../mixin/partner-components-mixin'
    import productComponentMixin from '../mixin/product-components-mixin'

    export default {
        mixins: [dbObjects, ordersTableSettings, buttonMixin, bannerMixin, listMixin, partnerComponentMixin, productComponentMixin],

        computed:{
            dbData:{
                get(){
                    return this.dbObj;
                }
            }
        },

        methods:{
            deleteOrder(orderId){
                console.log(`delete order ${orderId}`);
                
            }
        }
    }
</script>

<style>

</style>