import jsFunctions from '../../js-script/js-functions2';
import PartnerOrder from '../../../services/PartnerOrder';
import { Loading } from 'quasar'
//additional
import XLSX from 'xlsx'

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
    async prepareReportData({ commit }){
        Loading.show();
        commit('setReportData', await PartnerOrder.getDbData());
        commit('setReportPartners', true);
        Loading.hide();
    },

    prepareFilteredData({ commit }, filterSettup){
        commit('setFilterData', filterSettup)
    },

    prepareReportPartners({ commit }, showActiveOnly){
        commit('setReportPartners', showActiveOnly);
    },

    exportFilterResult({commit}, payload){
        var wb = XLSX.utils.book_new();
        let exportObj = payload;

        exportObj.forEach(partner => {
            partner.dataSet.forEach(dataSet => {
                delete dataSet.__index;
            });
            let dataWs = XLSX.utils.json_to_sheet(partner.dataSet);
            XLSX.utils.book_append_sheet(wb, dataWs, partner.name);
        });

        if (exportObj.length > 1) {
            XLSX.writeFile(wb, 'Izvestaj.xlsx');
        }
        else{
            XLSX.writeFile(wb, `Izvestaj ${exportObj[0].name}.xlsx`);
        }
    }
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