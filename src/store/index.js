import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    carList: []
}

const store = new Vuex.store({
    state,
})

export default store 