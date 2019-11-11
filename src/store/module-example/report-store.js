import jsFunctions from '../../js-script/js-functions2';

const state = {
    reportData:[],
    filterData:[],
};

const mutations = {
    setReportData(state, result){
        state.reportData = result.filter(data => data.orders.length > 0);
        state.filterData = state.reportData;
    },

    setFilterData(state, filterSettings){
        //console.log(JSON.stringify(filterSettings));
        state.filterData = jsFunctions.filterObj(state.reportData, filterSettings);
    },

};

const actions = {
    prepareReportData({ commit }){
        commit('setReportData', this.getters['storeDb/getDbData']);
    },

    prepareFilteredData({ commit }, filterSettup){
        commit('setFilterData', filterSettup)
    },
};

const getters = {
    getFilteredReportData(state){
        let reportData = [];

        reportData = jsFunctions.prepareReportSum(state.filterData);;

        return reportData;
    },

    getReportData(state, getters){
        return getters.getFilteredReportData;
    },
    
    getFilterPartnerOptions(state){
        let options = [];
        state.reportData.forEach(data => options.push({id: data.id, name: data.name}));
        
        return options;
    },
    
    getFilterProductOptions(state){
        let optionsFull = [];
        let optionsUnique = [];

        state.reportData.forEach(data => (
            data.orders.forEach(order => (
                order.data.forEach(product => (
                    optionsFull.push({code: product.code, product: product.product})
                ))
            ))
        ));

        optionsUnique = Array.from(
            new Set(optionsFull.map(prod => prod.code))
        ).map(code => {
            return {code: code, product: optionsFull.find(prod => prod.code === code).product};
        });
        
        return optionsUnique;
    },
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};