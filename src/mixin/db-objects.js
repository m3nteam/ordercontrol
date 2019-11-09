export default{
    computed:{
        dbObj:{
            get(){
                return this.$store.getters['storeDb/getDbData'];
            }
        }
    },
};