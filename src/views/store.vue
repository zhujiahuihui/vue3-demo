<template>
  <div class="home">
    <h1>store用法</h1>
    <p>{{ count }}</p>
    <button @click="add">增加</button>
  </div>
</template>

<script>
import {getCurrentInstance,computed} from "vue";

export default {
  name: "Home",
  setup() {
    // let count=new Vue();
//    console.log(Vue)
    let { ctx } = getCurrentInstance();
    // //获取state的数据
    // let count = ctx.$store.state.count;
    let count=computed(()=>{return ctx.$store.getters.getGetters})
    // console.log( ctx.$store.getters.getGetters,1111111111)
 
    //    console.log(mapMutations )
    let add = () => {
       
      //   ctx.$store.dispatch("setCount"); //把数据派发到action里面做异步操作
        // ctx.$store.commit("getCount");//把数据派发到mutation里面修改state的值
    };
    return {
      count,
      add,
    };
  },
};
</script>
