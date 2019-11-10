import jsFunctions from '../../js-script/js-functions2';

const state = {
    allData: 
    [
        {
            "id" : "00001", 
            "name": "Kupac K", 
            "active": true, 
            "orders" : [
                { 
                    "id_ord" :"1",
                    "date" : "2019-10-01", 
                    "data" : 
                    [ 
                        { "code" : "003362", "product" : "GC Gradia A1", "total" : 1, "__index" : 0 }, 
                        { "code" : "003363", "product" : "GC Gradia A2", "total" : 2, "__index" : 1 },
                    ]
                },
                { 
                    "id_ord" :"2",
                    "date" : "2019-10-02", 
                    "data" : 
                    [ 
                        { "code" : "003362", "product" : "GC Gradia A1", "total" : 1, "__index" : 0 }, 
                        { "code" : "003363", "product" : "GC Gradia A2", "total" : 2, "__index" : 1 },
                    ]
                }
            ]
        },
        {
            "id" : "00002", 
            "name": "Kupac T", 
            "active": false, 
            "orders" : [
                { 
                    "id_ord" :"1",
                    "date" : "2019-10-01", 
                    "data" : 
                    [ 
                        { "code" : "003364", "product" : "GC Gradia A3", "total" : 2, "__index" : 0 }, 
                        { "code" : "003365", "product" : "GC Gradia A4", "total" : 3, "__index" : 1 },
                    ]
                },
                { 
                    "id_ord" :"2",
                    "date" : "2019-10-02", 
                    "data" : 
                    [ 
                        { "code" : "003364", "product" : "GC Gradia A3", "total" : 2, "__index" : 0 }, 
                        { "code" : "003365", "product" : "GC Gradia A4", "total" : 3, "__index" : 1 },
                    ]
                }
            ] 
        },
        {
            "id" : "00003", 
            "name": "Kupac 3", 
            "active": true, 
            "orders" : [] 
        }
    ],

    reportData:[],
    productOptions:[],
    filterData:[],
};

const mutations = {
    setReportData(state, result){
        state.reportData = result;
    },

    setProductOptionsByPartner(state, partnerId){
        state.productOptions = jsFunctions.productOptionsByPartner(state.allData, partnerId);
    },

    setFilteredData(state, filter){
        state.filterData = jsFunctions.filterObj(state.reportData, filter);
    }
};

const actions = {
    prepareReportData({ commit, getters }){
        let result = jsFunctions.prepareReport(getters.getDbData);
        commit('setReportData', result);
    },

    prepareProductOptionsByPartner({ commit }, partnerId){
        commit('setProductOptionsByPartner', partnerId);
    },

    async prepareFilterData({ commit, dispatch }, filter){
        await dispatch('prepareReportData');
        commit('setFilteredData', filter);
    }
};

const getters = {
    getDbData(state){
        return state.allData;
    },

    getReportData(state){
        return state.reportData.filter(data => data.dataSet.length > 0);
    },

    getPartnerOptions(state){
        let partnerList = [];
        let options = []
        partnerList = state.allData.filter(data => data.orders.length > 0);

        partnerList.forEach(data => {
            options.push({id: data.id, name: data.name})
        });
        
        return options;
    },

    getProductOptions(state){
        return state.productOptions;
    },

    getFilteredData(state){
        return state.filterData;
    }
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}