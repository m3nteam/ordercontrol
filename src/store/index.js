import Vue from 'vue'
import Vuex from 'vuex'

import storeDb from './module-example/db-store'
import storeReport from './module-example/report-store'
import storeImport from './module-example/store-import-order'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      storeDb,
      storeReport,
      storeImport,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
