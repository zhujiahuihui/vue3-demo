<template>
  <div class="home">
    <h3>setup函数</h3>

    <p>{{ count }}</p>
    <button @click="change">添加</button>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import { h } from "vue";
// import HelloWorld from '@/components/HelloWorld.vue'
/**
 * setup函数
 * 有两个参数：第一个是props,第二个是context
 * 返回值[对象或函数]
 * 1、setup 是在组件内 Composition API 的入口点。
 * 2、调用时机：在breforeCreate之前调用
 * 3、setup 返回一个对象，这个对象的属性将会被合并到组件模板中去渲染上下文
 * 4、setup 也可以返回一个函数，函数中也能使用当前 setup函数作用域中的响应式数据。
 * 5、由于我们不能在setup中使用data和methods,所以vue中为了避免我们错误的使用，他直接将setup函数中this修改成了undefined
 * 6、Setup只能是同步的，不能是异步。
 *
 */
export default {
  name: "Home",
  setup() {
    let count = 0;
    let change = () => {
      count++;
      console.log(count); //1 2 3 4 5
      //修改了 count，但是页面并没有发生改变，这是因为 setup 函数返回的对象中 count 不是响应式数据
    };

    return {
      count,
      change,
    };
  },
  //jsx渲染语法
  // setup() {
  //   let count = 0;
  //   return () =><div>{count}</div>
  // },
  // components: {
  //   HelloWorld
  // }
};
</script>
