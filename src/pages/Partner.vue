<template>
  <q-page
    class="page-padding"
    v-if="partnerList != null"
  >

    <!-- LIST TITLE (components/partner page/list title.vue) -->
    <list-title
      :chBoxVisible="true"
      :chBoxVal.sync="showPartners"
    >
      Pregled kupaca
    </list-title>
    
    <q-card
      flat
      bordered
      class="my-card bg-grey-5" 
      v-if="!partnerList.length"
    >
      <q-card-section class="text-center text-white">
        Nema podataka za prikaz
      </q-card-section>
    </q-card>

    <!-- LIST OF PARTNERS (components/partner page/list.vue) -->
    <q-list
      bordered
      separator
      dense
      v-else
    >
      <item-partner
        v-for="partner in partnerList"
        :key="partner._id"
        :partner="partner"
        @updatePartnerEmit="showDlgUpdate"
      >
      </item-partner>
    </q-list>

    <!-- sticky partner button INSERT -->
    <btn-insert-partner />
  </q-page>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import mixInsertUpdatePartner from '../mixins/insert-update-partner'

  export default {
    mixins: [ mixInsertUpdatePartner ],

    beforeCreate(){
      // initialize data set from db store
      this.$store.dispatch('dbStore/dbGetPartners');
    },

    components:{
      // get partner page components
      'list-title': require('../components/Partner page/List title').default,
      'item-partner': require('../components/Partner page/List').default,
      'dialog-form': require('../components/Partner page/Dialog form').default,
      'btn-insert-partner': require('../components/Shared/btnInsertPartner').default,
    },

    computed: {
      //partner store
      ...mapGetters('partnerStore', [ 'partnerList', 'chBoxShowPartners' , 'dlgPartnerShow']),

      //local variable get and set
      showPartners:{
        get(){
          return this.chBoxShowPartners;
        },
        set(value){
          this.setChBoxShowPartners(value);
        }
      },
    },
    
    methods:{
      //partner store
      ...mapMutations('partnerStore', [ 'setChBoxShowPartners' ]),
    }
  }
</script>
