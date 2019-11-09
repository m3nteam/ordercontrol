<template>
    <q-page>
        <q-list bordered separator class="rounded-borders">
            <q-expansion-item
                class="bg-grey-3 text-subtitle1"
                v-for="item in reportData"
                :key="item.id"
                :label="item.partner"
                :caption="item.id"
                icon="account_box"
                expand-separator
                group="group1"
            >
                <q-table
                    dense
                    :data="item.dataSet"
                    :columns="tblColumns"
                    :pagination.sync="tblPagination"
                    :visible-columns="tblVisColImport"
                    row-key="product"
                >
                </q-table>

            </q-expansion-item>
        </q-list>
    </q-page>
</template>

<script>
    import dbObjects from '../mixin/db-objects'
    import jsFunction from '../mixin/js-functions'

    export default {
        mixins: [dbObjects, jsFunction],
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
        computed:{
            reportData:{
                get(){
                    console.log(this.prepareReport(this.dbObj));
                    
                    return this.prepareReport(this.dbObj);
                }
            }
        }
    }
</script>

<style>

</style>