import PartnerOrder from '../../../services/PartnerOrder';
import { Loading } from 'quasar';

const state = {
    allData: [],
    activeData: [],
    showAllPartners: false,
};

const mutations = {
    getDbData(state, dbData){
        state.allData = dbData;
        state.activeData = dbData.filter(partner => partner.active == true);
    },
    setShowAllPartners(state, val) {
        state.showAllPartners = val;
    }
};

const actions = {
    async getDbData({ commit }, payload){
        Loading.show();
        let dbData = await PartnerOrder.getDbData();
        commit('getDbData', dbData);
        Loading.hide();
    },

    async insertPartner({ commit, dispatch }, payload){
        Loading.show();
        await PartnerOrder.insertDbData(payload);
        await dispatch('getDbData');
        Loading.hide();
    },

    async updatePartner({ commit, dispatch }, payload){
        Loading.show();
        await PartnerOrder.updateDbData(payload);
        await dispatch('getDbData');
        Loading.hide();
    },

    setShowAllPartners({ commit }, val) {
        commit('setShowAllPartners', val);
    }
};

const getters = {
    getDbData(state){
        return state.showAllPartners ? state.allData : state.activeData;
    },

    showAllPartners() {
        return state.showAllPartners;
    },

    getPreviewData(state, getters){
        return getters.getDbData.filter(partner => partner.orders.length > 0);
    }
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}