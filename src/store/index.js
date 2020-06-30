import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialogvisible : true,
    totalSlots : 0,
    carsList : []
  },

  getters : {
    filledSlots(state){
      return state.carsList.filter( data => data !== null)
    },
    nextSlot(state){
      for(let [index,value] of state.carsList.entries()){
        if(!value)return index + 1
      }
      return -1
    }
  },

  mutations: {

    setCarsList(state,payload){
      state.dialogvisible = payload.status;
      state.totalSlots = payload.slots;
      state.carsList = payload.carsList;
    },

    deleteCar(state,slot){
      Vue.set(state.carsList,slot - 1, null);
    },

    addCar(state,newCar){
      Vue.set(state.carsList,newCar.slot - 1,newCar);
    }
  },

  actions: {

    setCarsList({commit},payload){
      commit('setCarsList', payload)
    },

    deleteCar({commit},slot){
      commit('deleteCar',slot);
    },

    addCar({commit,getters},newCar){
      const nextSlot = getters.nextSlot;
      const payload = {
        slot : nextSlot,
        registration : newCar.number,
        color : newCar.color
      }
      commit('addCar',payload)
    }
  },
  modules: {
  }
})
