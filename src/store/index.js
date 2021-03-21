import Vue from 'vue'
import Vuex from 'vuex'

import { state, mutations } from './default'
import restaurants from './modules/restaurants'
import cart from './modules/cart/cart'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        restaurants,
        cart,
    },
    state,
    mutations
})

export default store