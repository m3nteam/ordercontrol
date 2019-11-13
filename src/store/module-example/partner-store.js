import dbClass from '../../../Class/Db';

const state = {
    partner: null,
};

const mutations = {
    getPartnerById(state, id){
        let db = new dbClass(this.getters['storeDb/getDbData']);
        state.partner = db.getPartnerById(id)[0];
    }
};

const actions = {
    getPartnerById({ commit }, id){
        commit('getPartnerById', id);
    },

    insertPartnerOrder({ commit }, order){
        
    }
};

const getters = {
    getPartnerById(state){
        return state.partner;
    }
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}