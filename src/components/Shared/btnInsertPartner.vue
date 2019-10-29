<template>
    <div>
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
            <dialog-form />
        </q-dialog>
    </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import mixInsertUpdatePartner from '../../mixins/insert-update-partner'

  export default {
    mixins: [ mixInsertUpdatePartner ],

    components:{
      // get partner page components
      'dialog-form': require('../Partner page/Dialog form').default,
    },

    computed: {
      //partner store
      ...mapGetters('partnerStore', [ 'dlgPartnerShow' ]),
    },
  }
</script>