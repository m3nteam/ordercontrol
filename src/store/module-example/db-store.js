import PartnerOrder from '../../../services/PartnerOrder';
import { Loading } from 'quasar';

const state = {
    allData: [],
};

const mutations = {
    getDbData(state, dbData){
        state.allData = dbData;
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
    }
};

const getters = {
    getDbData(state){
        return state.allData;
    },
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}