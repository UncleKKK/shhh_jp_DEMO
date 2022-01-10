import { createStore } from 'vuex'

export const store = createStore({
  state: {
    transition:{
      style:'',
      image_src:'',
      is_loging:false,
    }
  },
  mutations: {
    set_transition(state,transition_data){
      state.transition = transition_data.data
    }
  },
  actions: {
  },
  modules: {
  }
})
