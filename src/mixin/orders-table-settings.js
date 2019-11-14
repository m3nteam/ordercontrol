export default{    
    data(){
        return{
            ///Table properties
            tblColumns:[
                {
                    name: 'product',
                    required: true,
                    label: 'Product',
                    align: 'left',
                    field: row => row.product,
                    format: val => `${val}`,
                    sortable: true
                },
                { name: 'code', align: 'center', label: 'Code', field: 'code', sortable: true },
                { name: 'total', align: 'center', label: 'Total qty', field: 'total', sortable: true }
            ],
            tblPagination: {
                //sortBy: 'code',
                //descending: false,
                rowsPerPage: 10
            },
            tblVisColImport: [ "code", "product", "total"], 
        }
    },

    methods:{
        handleUpdatePagination(val){
            this.tblPagination = val;
        }
    }
}