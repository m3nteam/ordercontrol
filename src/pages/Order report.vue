<template>
    <q-page class="q-pa-sm">
        <!-- Filter logic -->
        <div class="min-component-width">
            <q-expansion-item
                dark
                class="bg-primary text-h6"
                label="Filter"
                icon="filter_list"
                expand-separator
                :default-opened="!isFiltered"
            >
                <q-card class="q-mb-sm" bordered>
                    <!-- Partner filter -->
                    <q-card-section class="row min-component-width">
                        <q-select
                            class="col"
                            dense
                            outlined
                            clearable
                            label="Izaberite partnera"
                            v-model="selectedPartner"
                            :options="partnerOptions"
                            option-value="id"
                            option-label="name"
                            map-options
                            @input="partnerSelected"
                        />
                    </q-card-section>
                    
                    <!-- Product filter -->
                    <q-card-section
                        class="row min-component-width"
                    >
                        <q-select
                            class="col"
                            dense
                            outlined
                            clearable
                            v-model="selectedProduct"
                            :options="productOptions"
                            option-value="code"
                            option-label="product"
                            label="Izaberite proizvod"
                            @input="productSelected"
                        />
                    </q-card-section>
                    
                    <!-- Date from and to filter -->
                    <q-card-section class="row min-component-width">
                        <!-- Date from -->
                        <div class="col">
                            <q-input
                                style="float: left;"
                                class="q-mr-md"
                                dense
                                outlined
                                clearable
                                label="Datum od"
                                v-model="dateFrom"
                                mask="date"
                                @input="dateFrom !== '' ? dateSelected() : null"
                            >
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxyFrom" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="dateFrom" @input="dateSelected" />
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                            </q-input>
                            
                            <!-- Date to -->
                            <q-input
                                style="float: left;"
                                class="q-mr-md"
                                dense
                                outlined
                                clearable
                                label="Datum do"
                                v-model="dateTo"
                                mask="date"
                                @input="dateTo !== '' ? dateSelected() : null"
                            >
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxyTo" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="dateTo" @input="dateSelected" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                            </q-input>
                        </div>
                        <div class="col text-right">
                            <q-checkbox
                                v-model="showActiveOnly"
                                label="Prikazi samo aktivne partnere"
                                left-label
                                @input="showActive"
                            />
                        </div>
                    </q-card-section>

                    <!-- Button filter -->
                    <q-card-section class="row">
                        <div
                            class="col">
                            <q-btn
                                v-if="isFiltered == true"
                                label="Restart"
                                color="negative"
                                @click="clearFilter"
                            ></q-btn>
                        </div>

                        <div
                            class="col text-right">
                            <q-btn
                                label="Primeni"
                                color="primary"
                                @click="filterData"
                            ></q-btn>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </div>

        <!-- Title of list when filter is not applied -->
        <banner-orange
            v-if="!isFiltered"
        >
            Unesite parametre filtera
        </banner-orange>

        <div v-else>
            <!-- Title of list when data not exists -->
            <banner-orange
                v-if="reportData.length==0"
            >
                Nema rezultata za unete filtere
            </banner-orange>

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
            </div>
        </div>
    </q-page>
</template>

<script>
    import dbObjects from '../mixin/db-objects'
    import ordersTableSettings from '../mixin/orders-table-settings'
    import jsFunctions from '../js-script/js-functions2'

    export default {
        mixins: [dbObjects, ordersTableSettings],

        data(){
            return{
                jsFunctions: new jsFunctions(),

                isFiltered: false,
                showActiveOnly: false,

                selectedPartner: null,
                selectedProduct: null,
                dateFrom: null,
                dateTo: null,

                filterParametersObj: {
                    partner:null,
                    product:null,
                    dateRange:null,
                },
            }
        },

        beforeMount(){
            this.$store.dispatch('storeReport/prepareReportData', null, {root: true});
        },

        components:{
            'banner-orange': require('components/Shared/banner-orange').default,
            'banner-blue': require('components/Shared/banner-blue').default,
        },

        computed:{
            partnerOptions:{
                get(){
                    return this.$store.getters['storeReport/getFilterPartnerOptions'];
                }
            },

            productOptions:{
                get(){
                    return this.$store.getters['storeReport/getFilterProductOptions'];
                }
            },

            reportData:{
                get(){
                    if (this.isFiltered) {
                        return this.$store.getters['storeReport/getReportData'];
                    }
                }
            }
        },

        methods:{
            prepareFilterData(filterObj){
                this.filterParametersObj = Object.assign(this.filterParametersObj, filterObj)
            },

            partnerSelected(){
                let obj = !this.jsFunctions.isNullOrEmpty(this.selectedPartner) ? { partner: ['id', this.selectedPartner.id] } : { partner: null };
                this.prepareFilterData(obj);
            },

            productSelected(){
                let obj = !this.jsFunctions.isNullOrEmpty(this.selectedProduct) ? { product: ['code', this.selectedProduct.code] } : { product: null };
                this.prepareFilterData(obj);
            },

            dateSelected(){
                let dateF = !this.jsFunctions.isNullOrEmpty(this.dateFrom) ? this.dateFrom : null;
                let dateT = !this.jsFunctions.isNullOrEmpty(this.dateTo) ? this.dateTo : null;
                let dateArr = !this.jsFunctions.isNullOrEmpty(dateF) && !this.jsFunctions.isNullOrEmpty(dateT) ? ['date', dateF, dateT] : null;
                let obj = {dateRange: dateArr}
                
                this.prepareFilterData(obj);
                this.$refs.qDateProxyFrom.hide(obj);
                this.$refs.qDateProxyTo.hide();
            },

            showActive(){
                this.$store.dispatch('storeReport/prepareReportPartners', this.showActiveOnly, {root: true})
            },

            filterData(){
                this.isFiltered = true;
                this.$store.dispatch('storeReport/prepareFilteredData', this.filterParametersObj, {root: true});
            },

            clearFilter(){
                this.isFiltered = false;

                this.selectedPartner = null;
                this.selectedProduct = null;
                this.dateFrom = null;
                this.dateTo = null;

                this.filterParametersObj = Object.assign({}, {
                    partner: null,
                    product: null,
                    dateRange: null,
                });
            }
        }
    }
</script>

<style>

</style>