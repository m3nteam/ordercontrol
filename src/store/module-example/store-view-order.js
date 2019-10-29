import { Loading } from 'quasar'

const state = {
    partnerData:[],
    orderData:[],
    listData:[],

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
    tblVisColImport: [ "code", "Product", "total"],
};

const mutations = {
    getPartners(state, partners){
        state.partnerData = partners;
    },
    
    getOrders(state, orders){
        state.orderData = orders;
    },
    
    setTblPagination(state, value){
        state.tblPagination = value;
    },

    setTblColumns(state, settings){
        state.tblColumns = settings;
    }
    
};

const actions = {
    async getInitData({ commit, dispatch }){
        Loading.show();
            await dispatch('dbStore/getDbData', null, {root: true})
            await commit('getPartners', this.state.dbStore.dbPartners);
            await commit('getOrders', this.state.dbStore.dbOrders);
        Loading.hide();
    },

    setTblPagination({commit}, value){
        commit('setTblPagination', value);
    },

    setTblColumns({commit}, settings){
        commit('setTblColumns', settings);
    },

    async deleteOrderStore({dispatch}, id){
        dispatch('dbStore/deleteOrderStore', id, {root: true})
    },
    
};

const getters = {

    listData: (state) => {
        let listData = [];
        let partnerOrders = [];
        
        state.partnerData.forEach(partner => {
            partnerOrders = state.orderData.filter(order => order.partnerId == partner._id);
        
            if (partnerOrders.length) {
                let partnerOrdersInOne = [];
                let partnerTotals = [];

                partnerOrders.forEach(order => {
                    order.data.forEach(row => {
                        partnerOrdersInOne.push(row);
                    });
                });
                
                let uniqueProductCode = [...new Set(partnerOrdersInOne.map(row => row.code))]

                uniqueProductCode.forEach(id => {
                    let productData = partnerOrdersInOne.filter(order => id == order.code).map(row => row.product)
                    let productTotal = partnerOrdersInOne.filter(order => id == order.code).reduce((acc, data) => +acc + +data.total, 0)
                    let row = {
                        code: id,
                        product: productData[0],
                        total: productTotal
                    }

                    partnerTotals.push(row);
                });

                listData.push( { partData: partner, orders: partnerOrders, totals: partnerTotals } );
            }
        });
        
        return listData;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};