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
                <q-checkbox
                    left-label
                    label="Prikaži sve"
                    dark
                    v-model="showAllPartners"
                ></q-checkbox>
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
                                        :flat="true"
                                        @clicked="deleteOrder([item._id, order.id_ord])"
                                    ></button-delete>
                                </q-item-section>
                            </q-item>

                        </template>

                        <product-table
                            :data="order.data"
                            :columns="tblColumns"
                            :pagination="tblPagination"
                            :visibleColumns="tblVisColImport"
                            rowKey="product"
                            @updatePagination="handleUpdatePagination"
                        />
                    </q-expansion-item>
                </expansion-partner-custom>
            </list-custom>
        </div>
    </q-page>
</template>

<script>
    import CustomDialogDelete from '../components/Shared/dialog'
    //mixin
    import dbObjects from '../mixin/db-objects'
    import ordersTableSettings from '../mixin/orders-table-settings'
    import buttonMixin from '../mixin/buttons-mixin'
    import bannerMixin from '../mixin/banners-mixin'
    import listMixin from '../mixin/lists-mixin'
    import partnerComponentMixin from '../mixin/partner-components-mixin'
    import productComponentMixin from '../mixin/product-components-mixin'
    //class
    import DbClass from '../../Class/Db'
    import PartnerClass from '../../Class/Partner'

    export default {
        mixins: [dbObjects, ordersTableSettings, buttonMixin, bannerMixin, listMixin, partnerComponentMixin, productComponentMixin],

        async beforeCreate(){
            await this.$store.dispatch('storeDb/getDbData', null, {root: true});
        },

        computed:{
            dbData:{
                get(){
                    return this.$store.getters['storeDb/getPreviewData'];
                }
            },

            showAllPartners: {
                get() {
                    return this.$store.getters['storeDb/showAllPartners'];
                },
                set(val) {
                    this.$store.dispatch('storeDb/setShowAllPartners', val, {root: true});
                }
            }
        },

        methods:{
            async deleteOrder(deleteObj){
                this.$q.dialog({
                    component: CustomDialogDelete,
                    parent: this,
                    title: 'Brisanje porudžbine',
                    text: 'Da li ste sigurni da želite da obrišete porudžbinu?',
                }).onOk(() => {
                    const dbDataClass = new DbClass(this.dbData)
                    let partner = new PartnerClass(dbDataClass.getPartnerById(deleteObj[0]));
                    let newOrdersValue = partner.orders.filter(order => order.id_ord !== deleteObj[1]);
                    partner.orders = newOrdersValue;
                    
                    this.$store.dispatch('storeDb/updatePartner', partner, {root: true});
                }).onCancel(() => {
                    // on cancel btn click
                })
            },
        }
    }
</script>

<style>

</style>