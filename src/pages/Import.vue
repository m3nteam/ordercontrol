
<template>
   <q-page class="q-pa-sm">
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick" />
    <div v-if="excelData.results == null" class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover" @click="handleUpload">
      Prevuci excel ili pretraži na klik
      <!-- Drop excel file here or click to browse file -->
      <!-- <q-btn :loading="loading" size="mini" @click="handleUpload" color="primary">
        Browse
      </q-btn> -->
    </div>

    <div
        class="q-pa-md"
        v-if="excelData.results !== null"
    >
        <q-banner
            class="bg-primary text-white"
            rounded
        >
            <div class="row">

                <q-item class="text-white text-h5">
                    Pregled import-a
                </q-item>
            
                <q-space />
                    
                <div>
                    <q-select
                        label="Izaberite partnera"
                        class="q-pa-sm q-gutter-sm"
                        style="min-width: 300px; max-width: 400px; "
                        dark
                        outlined
                        dense
                        v-model="partnerIdLocal"
                        :options="optionsPartner"
                        option-value="_id"
                        option-label="name"
                        :options-dense="true"
                        emit-value
                        map-options
                    />
                </div>

                <q-space />

                <div>
                    <q-input
                        dark
                        class="q-pa-sm q-gutter-sm"
                        dense
                        outlined
                        v-model="importDateLocal"
                        mask="date"
                        :rules="['date']"
                    >
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="importDateLocal" minimal  @input="() => $refs.qDateProxy.hide()" />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>

            </div>
        </q-banner>

        <product-table
            :data="data"
            :columns="tblColumns"
            :pagination.sync="tblPagination"
            :visibleColumns="tblVisColImport"
            rowKey="product"
            @updatePagination="handleUpdatePagination"
        />
        
        <div class="row q-mt-sm">
            <button-cancel
                @clicked="emptyFilledTable"
            ></button-cancel>
            <q-space />
            <button-ok
                @clicked="saveDataToDb"
            ></button-ok>
        </div>
    </div>
  </q-page>
</template>

<script>
    import XLSX from 'xlsx'
    import { mapState, mapActions, mapGetters } from 'vuex'
    //mixin
    import ordersTableSettings from '../mixin/orders-table-settings'
    import productComponentMixin from '../mixin/product-components-mixin'
    import buttonMixin from '../mixin/buttons-mixin'
    //class
    import dbClass from '../../Class/Db'
    import partnerClass from '../../Class/Partner'

    export default {
        mixins: [ordersTableSettings, productComponentMixin, buttonMixin],
        props: {
            beforeUpload: Function, // eslint-disable-line
            onSuccess: Function// eslint-disable-line
        },
        data() {
            return {
                loading: false,
                data: [{ code: '',product: '',total: '' }]
            }
        },

        async beforeMount(){
            await this.getdbPartners();
        },

        computed:{
            ...mapState('storeImport', ['optionsPartner']),
            ...mapGetters('storeImport', ['importDate', 'excelData', 'partnerId']),

            importDateLocal:{
                get(){
                    return this.importDate;
                },
                set(value){
                    this.setImportDate(value);
                }
            },

            partnerIdLocal:{
                get(){
                    return this.partnerId;
                },
                set(value){
                    this.setPartnerId(value);
                }
            },

            dbData:{
                get(){
                    return this.$store.getters['storeImport/getDbData']
                }
            }
        },

        methods: {
            ...mapActions('storeImport', ['setInitValues', 'setImportDate', 'setExcelData', 'setPartnerId', 'getdbPartners', 'saveImportData' ]),

            isExcel(file) {
                return /\.(xlsx|xls|csv)$/.test(file.name)
            },
            handleDrop(e) {
                e.stopPropagation()
                e.preventDefault()
                if (this.loading) return
                    const files = e.dataTransfer.files
                if (files.length !== 1) {
                    this.$message.error('Only support uploading one file!')
                    return
                }
                const rawFile = files[0] // only use files[0]
                if (!this.isExcel(rawFile)) {
                    this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
                    return false
                }
                this.upload(rawFile)
                e.stopPropagation()
                e.preventDefault()
            },
            handleDragover(e) {
                e.stopPropagation()
                e.preventDefault()
                e.dataTransfer.dropEffect = 'copy'
            },
            handleUpload() {
                this.$refs['excel-upload-input'].click()
            },
            handleClick(e) {
                const files = e.target.files
                const rawFile = files[0] // only use files[0]
                if (!rawFile) return
                this.upload(rawFile)
            },
            upload(rawFile) {
                this.$refs['excel-upload-input'].value = null // fix can't select the same excel
                if (!this.beforeUpload) {
                    this.readerData(rawFile)
                    return
                }
                const before = this.beforeUpload(rawFile)
                if (before) {
                    this.readerData(rawFile)
                }
            },
            getHeaderRow(sheet) {
                const headers = []
                const range = XLSX.utils.decode_range(sheet['!ref'])
                let C
                const R = range.s.r
                /* start in the first row */
                for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
                const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
                /* find the cell in the first row */
                let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
                if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
                headers.push(hdr)
                }
                return headers
            },
            readerData(rawFile) {
                this.loading = true
                return new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onload = e => {
                        const data = e.target.result
                        const workbook = XLSX.read(data, { type: 'array' })
                        const firstSheetName = workbook.SheetNames[0]
                        const worksheet = workbook.Sheets[firstSheetName]
                        const header = this.getHeaderRow(worksheet)
                        
                        /* CODE FIXING AND RESULT PREPAREING*/
                        let excelData = XLSX.utils.sheet_to_json(worksheet);

                        let payloadData = [];
                        let payloadIndex = 0;
                        excelData.forEach(element => {
                            payloadData[payloadIndex] = {code: this.clearExcelCode(element.code), product: element.product, total: element["total qty"]};
                            payloadIndex++;
                        });

                        const results = payloadData;
                        let fixIndex = 0;

                        this.generateData({ header, results })
                        this.loading = false
                        resolve()
                    }
                    reader.readAsArrayBuffer(rawFile)
                })
            },
            generateData({ header, results }) {
                this.setExcelData({ header, results })
                this.data = results
                this.onSuccess && this.onSuccess(this.excelData)
            },
            
            emptyFilledTable(){
                this.setInitValues()
            },

            saveDataToDb() {
                if (this.partnerId == null) {
                    this.$q.notify({
                        color: 'negative',
                        textColor: 'white',
                        icon: 'error',
                        message: "Partner mora biti izabran"
                    })
                    return;
                };

                let partnerId = this.partnerId;

                let db = new dbClass(this.dbData);
                let dbPartner = db.getPartnerById(partnerId);
                let partner = new partnerClass(dbPartner)

                let newOrderId = partner.getPartnerOrdersLastId() + 1;
                let order = {
                    id_ord: newOrderId,
                    date: this.importDate,
                    data: this.excelData.results
                };

                let payload = {
                    partner: Object.assign({}, partner),
                    order: order,
                };

                this.$store.dispatch('storeImport/prepareInsertObj', payload, {root: true});
                this.$store.dispatch('storeImport/saveImportData', this.$store.getters['storeImport/getInsertObj'], {root: true});
                this.emptyFilledTable();
            },

            clearExcelCode(code){
                let testCode = code.toString();
                let justDigit = '';

                for (let index = 0; index < testCode.length; index++) {
                    let char = testCode.charAt(index)
                    if(!isNaN(char)){
                        justDigit = justDigit + char
                    }
                }

                testCode = '000000' + justDigit.toString();

                return testCode.slice(justDigit.length, testCode.length);
            }
        },

        destroyed(){
            this.setInitValues()
        }
    }
</script>

<style scoped>
    .excel-upload-input{
        display: none;
        z-index: -9999;
    }

    .drop{
        border: 2px dashed #bbb;
        /*width: 600px;
        height: 160px;*/
        height: 100%;
        line-height: 160px;
        margin: 15px;
        font-size: 24px;
        border-radius: 5px;
        text-align: center;
        color: #bbb;
        position: relative;
    }

    .customFloatLeft{
        float:left !important;
        margin: 10px !important;
    }

    .customTableTopRowDefInput{
        padding: 0px !important; 
        margin: 0 20px 0 0 !important; 
        max-width: 175px !important;
    }

    .customTableTopRowDefSelect{
        padding: 0px; 
        margin: 0px; 
        min-width: 175px; 
        max-width: 500px;
    }
</style>