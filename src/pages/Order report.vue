<template>
    <q-page class="q-pa-sm">
        <!-- Filter logic -->
        <div>
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
                    <q-card-section class="row" style="min-width: 300px;">
                        <q-select
                            class="col"
                            dense
                            outlined
                            label="Izaberite partnera"
                            v-model="selectedPartner"
                            :options="partnerOptions"
                            option-value="id"
                            option-label="name"
                            map-options
                            @input="partnerSelected(selectedPartner.id)"
                        />
                    </q-card-section>
                    
                    <!-- Product filter -->
                    <q-card-section
                        v-if="selectedPartner !== ''"
                        class="row"
                        style="min-width: 300px;"
                    >
                        <q-select
                            class="col"
                            dense
                            outlined
                            v-model="selectedProduct"
                            :options="productOptions"
                            option-value="code"
                            option-label="product"
                            label="Izaberite proizvod"
                            @input="prepareFilter(['code', selectedPartner.id])"
                        />
                    </q-card-section>

                    <!-- Button filter -->
                    
                    <q-card-section class="row">
                        <q-btn
                            v-if="isFiltered == true"
                            label="Restart"
                            color="negative"
                            @click="clearFilter"
                        ></q-btn>

                        <q-space />

                        <q-btn
                            v-if="filterParameters.length > 0"
                            label="Primeni"
                            color="primary"
                            @click="filterData"
                        ></q-btn>
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

        <div>
            <!-- Title of list when data not exists -->
            <banner-orange
                v-if="filteredDataSet == ''"
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
                        v-for="item in filteredDataSet"
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

    export default {
        mixins: [dbObjects, ordersTableSettings],

        data(){
            return{
                isFiltered: false,

                selectedPartner: '',
                selectedProduct: '',
                dateFrom: '',
                dateTo: '',

                filterParameters: [],
            }
        },

        beforeMount(){
            this.$store.dispatch('storeDb/prepareReportData', null, {root: true});
        },

        components:{
            'banner-orange': require('components/Shared/banner-orange').default,
            'banner-blue': require('components/Shared/banner-blue').default,
        },

        computed:{
            reportData:{
                get(){
                    return this.$store.getters['storeDb/getReportData'];
                }
            },

            partnerOptions:{
                get(){
                    return this.$store.getters['storeDb/getPartnerOptions'];
                }
            },

            productOptions:{
                get(){
                    return this.$store.getters['storeDb/getProductOptions'];
                }
            },

            filteredDataSet:{
                get(){
                    if (this.isFiltered) {
                        return this.$store.getters['storeDb/getFilteredData'];
                    }
                    else{
                        return this.$store.getters['storeDb/getReportData'];
                    };
                }
            }
        },

        methods:{
            partnerSelected(partnerId){
                this.prepareFilter(['id', partnerId]);
                this.$store.dispatch('storeDb/prepareProductOptionsByPartner', partnerId, {root: true});
            },

            prepareFilter(filterArr){
                this.filterParameters.push(filterArr);
            },

            filterData(){
                this.$store.dispatch('storeDb/prepareFilterData', this.filterParameters, {root: true});
                this.isFiltered = true;
            },

            clearFilter(){
                this.isFiltered = false;

                this.selectedPartner = '';
                this.selectedProduct = '';
                this.dateFrom = '';
                this.dateTo = '';

                this.filterParameters = [];
            },
        }
    }
</script>

<style>

</style>