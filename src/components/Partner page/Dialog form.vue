<template>
        <q-card
            style="min-width: 300px"
        >
            <q-card-section class="q-pa-md text-h5 text-center text-primary">
                    {{ this.dlgSettup.title }}
            </q-card-section>

            <q-separator color="primary" />

            <q-form
                @submit.prevent="onSubmit"
                @reset="onReset"
                @keyup.esc="onReset"
            >
                <q-card-section>
                    <q-input
                        v-if="this.partnerModelLocal._id != null"
                        disable
                        dense
                        outlined
                        v-model="partnerModelLocal.localId"
                        label="Šifra partnera"
                    />
                </q-card-section>
                
                <q-card-section style="padding-bottom: 0;">
                    <q-input
                        dense
                        outlined
                        clearable
                        v-model="partnerModelLocal.name"
                        label="Naziv partnera"
                        autofocus
                        ref="name"
                        :rules="[val => !!val || 'Naziv partnera mora biti popunjen']"
                        lazy-rules
                    />
                </q-card-section>

                <q-card-section
                    class="text-right"
                >
                    <q-checkbox
                        v-model="partnerModelLocal.active"
                        label="Status aktivnosti"
                        left-label
                    ></q-checkbox>
                </q-card-section>

                <q-card-actions class="text-primary">
                    <q-btn type="reset" label="Odustani" flat />
                    <q-space />
                    <q-btn type="submit" label="Nastavi" color="primary" />
                </q-card-actions>
            </q-form>
        </q-card>
</template>

<script>
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

    export default {
        data(){
            return{
                partnerModelLocal: {},
            }
        },

        mounted(){
            this.partnerModelLocal = Object.assign({}, this.dlgPartnerModel);
        },

        computed:{
            //partner store
            ...mapState('partnerStore', [ 'dlgPartnerModel' ]),
            ...mapGetters('partnerStore', [ 'dlgSettup']),
        },

        methods:{
            ...mapMutations('partnerStore', [ 'setDlgPartnerModel', 'setResetDlg' ]),
            ...mapActions('partnerStore', [ 'setInsertOrUpdatePartner' ]),

            onSubmit(){
                this.$refs.name.validate();
                this.saveForm();
            },

            saveForm(){
                this.setDlgPartnerModel(this.partnerModelLocal);
                this.setInsertOrUpdatePartner();
            },

            onReset(){
                this.setResetDlg();
            }
        }
    }
</script>