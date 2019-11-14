import { Loading } from 'quasar'

const state = {
    dbData: [],
    importDate: new Date().toJSON().slice(0, 10),
    excelData: { header: null, results: null },
    partnerId: null,
    optionsPartner: [],
}

const mutations = {
    async getdbPartners(state){
        state.dbData = this.state.storeDb.allData;
        let partners = [];

        state.dbData.forEach(partner => {
            partners.push({_id: partner._id, name:partner.name});
        });
        
        state.optionsPartner = partners;
    },

    setInitValues(state){
        state.importDate = new Date().toJSON().slice(0, 10);
        state.excelData = { header: null, results: null };
        state.partnerId = null;
    },

    setImportDate(state, value){
        state.importDate = value;
    },

    setExcelData(state, payload){
        state.excelData = payload;
    },

    setPartnerId(state, id){
        state.partnerId = id;
    },

    setOptionsPartner(state, payload){
        state.optionsPartner = payload;
    },
}

const actions = {
    async getdbPartners({commit, dispatch}){
        Loading.show();
            await dispatch('storeDb/getDbData', null, {root: true});
            commit('getdbPartners');
        Loading.hide();
    },

    setOptionsPartner({commit}, payload){
        commit('setOptionsPartner', payload)
    },

    setInitValues({commit}){
        commit('setInitValues')
    },

    setImportDate({commit}, value){
        commit('setImportDate', value)
    },

    setExcelData({commit}, payload){
        commit('setExcelData', payload)
    },

    setPartnerId({commit}, id){
        commit('setPartnerId', id)
    },

    saveImportData({ dispatch }, payload){
        console.log(payload);
        return;
        dispatch('storeDb/updatePartner', payload, {root: true});
    },
}

const getters = {
    getDbData(state){
        return state.dbData;  
    },

    importDate(state){
        return state.importDate;
    },

    excelData(state){
        return state.excelData;
    },

    partnerId(state){
        return state.partnerId;
    },

    optionsPartner(state){
        return state.optionsPartner;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}