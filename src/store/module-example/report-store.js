import jsFunctions from '../../js-script/js-functions2';

const state = {
    reportData:[],
    filterData:[],
    reportPartners: [],
};

const mutations = {
    setReportData(state, result){
        state.reportData = result.filter(data => data.orders.length > 0);
        state.filterData = state.reportData;
    },

    setFilterData(state, filterSettings){
        state.filterData = jsFunctions.filterObj(state.reportData, filterSettings);
        
        state.filterData = state.filterData.filter(data => {
            let responce = false;
            state.reportPartners.forEach(partner => {
                if (partner.id == data.id) {
                    responce = true;
                };
            });
            return responce;
        });
    },

    setReportPartners(state, showActiveOnly){
        //add second parameter true to function and report will get only active partners
        state.reportPartners = jsFunctions.partnerOptions(state.reportData, showActiveOnly);
    },

};

const actions = {
    prepareReportData({ commit }){
        commit('setReportData', this.getters['storeDb/getDbData']);
        commit('setReportPartners', false);
    },

    prepareFilteredData({ commit }, filterSettup){
        commit('setFilterData', filterSettup)
    },

    prepareReportPartners({ commit }, showActiveOnly){
        commit('setReportPartners', showActiveOnly);
    },
};

const getters = {
    getFilteredReportData(state){
        return jsFunctions.prepareReportSum(state.filterData);
    },

    getFilteredData(state, getters){
        return getters.getFilteredReportData;
    },
    
    getFilterPartnerOptions(state){
        return state.reportPartners;
    },
    
    getFilterProductOptions(state){
        return jsFunctions.productOptions(state.reportData);
    },
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};