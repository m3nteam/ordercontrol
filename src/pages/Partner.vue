<template>
    <q-page
        class="q-pa-sm">

        <!-- Title of list when partners not exists -->
        <banner-orange
            v-if="this.dbObjAll ==''"
        >NEMA PODATAKA</banner-orange>
        
        <div v-else>
        <!-- Title of list when partners exists -->
            
            <banner-blue
                title="Pregled kupaca"
            >
                <q-checkbox
                    left-label
                    label="Prikaži sve"
                    dark
                    v-model="showAllPartners"
                ></q-checkbox>
            </banner-blue>

            <!-- Lists of partners -->
            <list-custom>
                <q-item 
                    v-for="partner in this.dbObj" 
                    :key="partner.id"
                    clickable
                    v-ripple
                    @click="showDlgUpdate(partner)"
                >
                    <partner-avatar
                        :partnerId="partner.id"
                        :partnerName="partner.name"
                        size="40px"
                    />

                    <q-space />
                    
                    <!-- Checkbox  -->
                     <q-item-section side>
                        <q-checkbox
                            :value="partner.active"
                            disabled
                        ></q-checkbox>
                    </q-item-section>
                </q-item>
            </list-custom>
        </div>

        <div>
            <!-- Button for insert new partner -->
            <q-page-sticky position="bottom" class="q-mb-md">
                <q-btn
                    fab
                    icon="add"
                    color="primary"
                    @click="showDlgInsert"
                    size="50px"
                />
            </q-page-sticky>

            <!-- DIALOG INSERT -->
            <q-dialog
                v-model="dlgPartnerShow"
                persistent
            >
                <insert-partner
                    @insertResponse="submitDialogInsert"
                    :modelPartner="partnerModelInsert"
                ></insert-partner>
            </q-dialog>

            <!-- Dijalog za update partnera -->
            <q-dialog
                v-model="dlgPartnerShowUpdate"
                persistent
            >
                <update-partner
                    @updateResponse="submitDialogUpdate"
                    :partnerObj="partnerClickedObj"
                ></update-partner>
            </q-dialog>
        </div>
    </q-page>
</template>

<script>
    //mixin
    import dbObjects from '../mixin/db-objects'
    import bannerMixin from '../mixin/banners-mixin'
    import listMixin from '../mixin/lists-mixin'
    import partnerComponentMixin from '../mixin/partner-components-mixin'
    //class
    import jsFunctions from '../js-script/js-functions2'

    export default {
        mixins: [dbObjects, bannerMixin, listMixin, partnerComponentMixin],

        data() {
            return {
                jsFunctions: new jsFunctions(),
                dlgPartnerShow: false,
                dlgPartnerShowUpdate: false,
                partnerClickedObj: null,
                partnerModelInsert:{
                    id: null,
                    name: null,
                    active: true,
                    orders: []
                }
            }
        },
        computed: {
            showAllPartners: {
                get() {
                    return this.$store.getters['storeDb/showAllPartners'];
                },
                set(val) {
                    this.$store.dispatch('storeDb/setShowAllPartners', val, {root: true});
                }
            }
        },
        beforeCreate(){
            this.$store.dispatch('storeDb/getDbData', null, {root: true});
        },

        methods: {
            showDlgInsert() {
                this.dlgPartnerShow = true;
            },

            showDlgUpdate(partner){
                this.partnerClickedObj = partner;
                this.dlgPartnerShowUpdate = true;
                               
            },

            submitDialogInsert(value) {
                if (value[0]) {
                    let newId = this.jsFunctions.getNewPartnerId(this.dbObjAll);
                    value[1].id = newId;
                    this.$store.dispatch('storeDb/insertPartner', value[1], {root: true});
                };
                this.dlgPartnerShow = false;
            },

            submitDialogUpdate(value) {
                if (value[0]) {
                    this.$store.dispatch('storeDb/updatePartner', value[1], {root: true});
                };
                this.dlgPartnerShowUpdate = false;
            },

            showPartners() {
                console.log('nesto', this.showAllPartners);
                
            }
        },
        
        components: {
            'insert-partner': require('components/Partner/DlgInsert.vue').default,
            'update-partner': require('components/Partner/DlgUpdate.vue').default,
        },
    }
</script>

<style>

</style>