import { createStore } from 'vuex'
import { createApp } from 'vue'



var store = createStore({
  actions: {

  },
  mutations: {
    setUser(state,value){
      // state.user = value;
      state.user = JSON.parse(localStorage.getItem("access-admin")).data;
    },
  },


  modules: {
  },
  state: {
    user:{
      username:'',
      postId:'',
      avatarUrl:''
    }
  },
});
createApp(app).use(store)
export default  store


