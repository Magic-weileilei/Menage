import Vue from 'vue'
import Vuex from 'vuex'
import tab from '@/store/tabs.js'
import user from '@/store/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        tab,
        user
    }
})