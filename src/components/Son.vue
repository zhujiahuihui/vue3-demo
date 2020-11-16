<template>
  <div class="home">
    <h1>子组件</h1>
    <button @click="change">子传父</button>
    <p>{{parent}}</p>
  </div>
</template>

<script>
import {} from "vue";

export default {
  props:['parent'],
  name: "Home",
  setup(props,context) {
    let change=()=>{
        context.emit('sendparent','我是儿子，来给父亲送东西')
    }
    return { props ,change};
  },
};
</script>
