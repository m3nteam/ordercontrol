import PartnerService from '../../../services/Partner'
import OrderService from '../../../services/Order'
import { Loading } from 'quasar'

const state = {
    //PARTNER ////////////////////////////////////////////////////////////
    dbPartners: [],
    dbPartnerModel: {
        _id: null,
        localId: '',
        name: '',
        active: true,
    },

    //ORDER ////////////////////////////////////////////////////////////
    dbOrders: [],
};

const mutations = {
    //PARTNER ////////////////////////////////////////////////////////////
    dbSetPartners(state, partners){
        state.dbPartners = partners;
    },

    //ORDER ////////////////////////////////////////////////////////////
    dbSetOrders(state, orders){
        state.dbOrders = orders;
    }
};

const actions = {
    async getDbData({ dispatch }){
        Loading.show();
            await dispatch('dbGetPartners');
            await dispatch('dbGetOrders');
        Loading.hide();
    },

    //PARTNER ////////////////////////////////////////////////////////////
    async dbGetPartners({ commit }){
        Loading.show();
            commit('dbSetPartners', await PartnerService.getPartners());
        Loading.hide();
    },

    async setUpdatePartner({ commit, dispatch }, payload){
        Loading.show();
            await PartnerService.updatePartner(payload);
            await dispatch('dbGetPartners');
        Loading.hide();
    },

    async setInsertPartner({ commit, state, dispatch }, payload){
        Loading.show();
            let partnerCount = (state.dbPartners.length + 1).toString();
            let lclId = ('000000' + partnerCount).slice(partnerCount.length);

            let insertObj = {
                localId: lclId,
                name: payload.name,
                active: payload.active,
            }

            await PartnerService.insertPartner(insertObj);
            await dispatch('dbGetPartners');
        Loading.hide();
    },

    //IMPORT ////////////////////////////////////////////////////////////
    async saveImportData({commit}, payload){
        await OrderService.insertOrder(payload);
    },

    //ORDER ////////////////////////////////////////////////////////////
    async dbGetOrders({ commit }){
        commit('dbSetOrders', await OrderService.getOrders());
    },

    async deleteOrderStore({commit}, id){
        await OrderService.deleteOrder(id);
        const msg = 'Uspešno je obrisan order';
        await ('getDbOrder');
        Notify.create(msg);
    },
};

const getters = {
    //PARTNER ////////////////////////////////////////////////////////////
    dbPartnerModel(state){
        return state.dbPartnerModel;
    },

    dbPartners(state){
        return state.dbPartners;
    },

    dbPartnersActive(state){
        return state.dbPartners.filter(partner => partner.active == true);
    },
    
    //ORDER ////////////////////////////////////////////////////////////
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}