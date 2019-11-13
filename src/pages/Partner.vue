<template>
    <q-page
        class="q-pa-sm">

        <!-- Title of list when partners not exists -->
        <banner-orange
            v-if="this.dbObj ==''"
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
                    @click="updateClick(partner)"
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
                    @insertResponse="submitDialog"
                    :modelPartner="partnerModel"
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

    export default {
        mixins: [dbObjects, bannerMixin, listMixin, partnerComponentMixin],

        data() {
            return {
                dlgPartnerShow: false,
                dlgPartnerShowUpdate: false,
                showAllPartners: false,
                partnerClickedObj: null,
                partnerModel:{
                    _id: null,
                    id: null,
                    name: null,
                    active: null,
                    orders: []
                }
            }
        },

        methods: {
            showDlgInsert() {
                this.dlgPartnerShow = true;
            },
            submitDialog(value) {
                if (value) {
                    console.log('insert partner');
                };
                this.dlgPartnerShow = false;
            },
            submitDialogUpdate(value) {
                if (value[0]) {
                    console.log('update partner', value[1]);
                };
                this.dlgPartnerShowUpdate = false;
            },
            updateClick(partner){
                console.log('klik na partnera ', partner);
                this.partnerClickedObj = partner;
                this.dlgPartnerShowUpdate = true;
                               
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