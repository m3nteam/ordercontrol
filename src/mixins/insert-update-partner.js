import { mapMutations } from 'vuex'

export default{
    methods:{
        //partner store
        ...mapMutations('partnerStore', [ 'setDlgSettup' ]),

        //update partner call
        showDlgUpdate(partner){
            let payload = { type: 'update', partner: partner };
            this.setDlgSettup(payload);
        },
        
        //insert partner call
        showDlgInsert(){
            let payload = { type: 'insert', partner: this.$store.getters['dbStore/dbPartnerModel'] };
            this.setDlgSettup(payload);
        },
    }

}