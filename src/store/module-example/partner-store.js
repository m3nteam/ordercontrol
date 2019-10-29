const state = {
    chBoxShowPartners: false,
    dlgPartnerShow: false,
    dlgPartnerModel: {},
    dlgSettup: {}, 
};

const mutations = {
    setChBoxShowPartners(state, value){
        state.chBoxShowPartners = value;
    },

    setDlgPartnerShow(state, value){
        state.dlgPartnerShow = value;
    },

    setDlgPartnerModel(state, payload){
        state.dlgPartnerModel = payload;
    },

    setResetDlg(state){
        state.dlgPartnerShow = false;
        state.dlgPartnerModel = Object.assign({}, this.getters['dbStore/dbPartnerModel']);
        state.dlgSettup = {};
    },

    setDlgSettup(state, payload){
        let type = payload.type
        let partner = payload.partner

        //prepare dialog settup
        switch(type) {
            case 'update':
                state.dlgSettup = { type: type, title: 'Ispravka partnera' };
                break;
            case 'insert':
                state.dlgSettup = { type: type, title: 'Unos partnera' };
                break;
            default:
                state.dlgSettup = {};
        };

        //prepare partner model
        state.dlgPartnerModel = Object.assign({}, partner);

        //show dialog
        state.dlgPartnerShow = true;
    }
};

const actions = {
    async setInsertOrUpdatePartner({ commit, dispatch }){
        //do insert or update partner
        if (event.type == 'submit') {
            switch(state.dlgSettup.type) {
                case 'update':
                    await dispatch('dbStore/setUpdatePartner', state.dlgPartnerModel, {root: true});
                    break;
                case 'insert':
                    await dispatch('dbStore/setInsertPartner', state.dlgPartnerModel, {root: true});
                    break;
                default:
                    console.log('default');
            };
        };
        
        //close dialog
        commit('setDlgPartnerShow', false);
    },

};

const getters = {
    partnerList(state, getters, rootGetters, allGetters){
        if (state.chBoxShowPartners) {
            return allGetters['dbStore/dbPartners'];
        }
        else{
            return allGetters['dbStore/dbPartnersActive'];
        }
    },

    chBoxShowPartners(state){
        return state.chBoxShowPartners;
    },

    dlgPartnerShow(state){
        return state.dlgPartnerShow;
    },

    dlgSettup(state){
        return state.dlgSettup;
    }
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}