import { createStore } from 'vuex'
/**
 * vuex就是提供了一个仓库，store仓库里面放了很多对象
 * state:就是数据源的存放地，相对于vue对象里面的data
 * getter:有点类似于vue的计算属性，当我们需要从store的state中派发一些状态，我们就需要到getter，getter会接受state做第一个参数，而且getter的返回值会根据他的状态缓存起来，只用getter中的依赖值发生改变的时候才会重新计算
 * mutation:同步的方法，用来修改state值得地方
 * action:异步的方法，可以在action中做任何异步操作。我们也可以在action提交mutation，通过commIt方法，如果是页面中用到action，就是通过的store.dispatch来传递
 * module:分块，避免状态树代码臃肿，每个状态树都有自己的state、getter、mutation、action
 */
export default createStore({
  state: {
    count: 0
  },
  mutations: {
    getCount(state) {
      state.count++;
    }
  },

  getters: {
    getGetters(state) {
      return state.count+2;

    }
  },
  actions: {
    setCount(context) {
      context.commit('getCount')
    },
  },
  modules: {
  }
})
