import jsFunctions from '../../mixin/js-functions2';

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
                        { "code" : "003364", "product" : "GC Gradia A1", "total" : 2, "__index" : 0 }, 
                        { "code" : "003365", "product" : "GC Gradia A2", "total" : 3, "__index" : 1 },
                    ]
                },
                { 
                    "id_ord" :"2",
                    "date" : "2019-10-02", 
                    "data" : 
                    [ 
                        { "code" : "003364", "product" : "GC Gradia A1", "total" : 2, "__index" : 0 }, 
                        { "code" : "003365", "product" : "GC Gradia A2", "total" : 3, "__index" : 1 },
                    ]
                }
            ] 
        }
    ],

    reportData:[],
};

const mutations = {
    setReportData(state, result){
        state.reportData = result;
    }
};

const actions = {
    prepareReportData({ commit, getters }, parameters){
        let result = jsFunctions.prepareReport(getters.getDbData);
        commit('setReportData', result);
    }
};

const getters = {
    getDbData(state){
        return state.allData;
    },

    getReportData(state){
        return state.reportData;
    }
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}