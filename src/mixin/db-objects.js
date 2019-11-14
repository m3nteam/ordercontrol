export default{
    computed:{
        dbObj:{
            get(){
                return this.$store.getters['storeDb/getDbData'];
            }
        },
        dbObjAll:{
            get(){
                return this.$store.getters['storeDb/getAllDbData'];
            }
        }
    },
};