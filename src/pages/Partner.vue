<template>
    <q-page
        class="q-pa-sm">

        <!-- Title of list when partners not exists -->
        <banner-orange
            v-if="this.dbObj ==''"
        >NEMA PODATAKA</banner-orange>
        
        <div v-else>
        <!-- Title of list when partners exists -->
            <q-banner
                class="bg-primary text-white"
                rounded
                >
                Pregled kupaca
            </q-banner> 

            <!-- Lists of partners -->
            <q-list 
                bordered
                separator>
                <q-item 
                    v-for="partner in this.dbObj" 
                    :key="partner.id" 
                    class="q-pa-sm"
                    clickable
                    v-ripple
                    style="padding: 0;"
                    >
                    <q-item-section avatar>
                        <q-avatar
                            color="primary"
                            text-color="white"
                            class="text-h5 q-ml-sm">
                            {{ getInitials(partner.name) }}
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label caption lines="1">{{ partner.id }}</q-item-label>
                        <q-item-label>{{ partner.name }}</q-item-label>
                    </q-item-section>
                    
                    <!-- Checkbox  -->
                     <q-item-section side>
                        <q-checkbox
                            :value="partner.active"
                            disabled
                        ></q-checkbox>
                    </q-item-section>
                </q-item>
            </q-list>
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

            <!-- DIALOGS INSERT OR UPDATE -->
            <q-dialog
                v-model="dlgPartnerShow"
                persistent
            >
                <insert-partner
                    @insertResponse="submitDialog"
                ></insert-partner>
            </q-dialog>
        </div>
    </q-page>
</template>

<script>
    import dbObjects from '../mixin/db-objects'
    import jsFunctions from '../mixin/js-functions'

    export default {
        mixins: [dbObjects, jsFunctions],
        data() {
            return {
                dlgPartnerShow: false
            }
        },
        methods: {
            showDlgInsert() {
                this.dlgPartnerShow = true;
            },
            submitDialog(value) {
                if (value) {
                    console.log('insert partner');
                    this.dlgPartnerShow = false;
                } else {
                    this.dlgPartnerShow = false;
                };
            }
        },
        components: {
            'insert-partner': require('components/Partner/DlgInsert.vue').default,
            'banner-orange': require('components/Shared/banner-orange').default,
        },
    }
</script>

<style>

</style>