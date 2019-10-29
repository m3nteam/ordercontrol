import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import dbStore from './module-example/db-store'
import partnerStore from './module-example/partner-store'
import order from './module-example/store-import-order'
import viewOrderStore from './module-example/store-view-order'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      dbStore,
      partnerStore,
      order,
      viewOrderStore,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
