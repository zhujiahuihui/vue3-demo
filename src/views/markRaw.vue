<template>
  <div>
    <h1>markRaw函数</h1>
    <p>{{ obj.name }}</p>
    <button @click="btn">按钮</button>
  </div>
</template>
<script >
import { markRaw, isReactive, reactive, toRaw } from "vue";
export default {
  /**
   *markRaw函数
   *添加不可转为响应式数据的标记
   *
   * toRaw - 响应式对象转普通对象
   * 返回由 reactive 或 readonly 方法转换成响应式代理的普通对象。这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发更改。不建议一直持有原始对象的引用。请谨慎使用。
   */
  setup() {
    //markRaw函数
    const foo = markRaw({ name: "谢大脚" });
    let obj = reactive(foo);
    console.log(isReactive(reactive(foo))); // false
    console.log(foo);
    const btn = () => {
      obj.name = "小红";
      console.log(obj.name);
    };

    //toRaw
    let obj1 = {};
    let obj2 = reactive(obj1);
    console.log(toRaw(obj2) == obj1); //true
    return {
      obj,
      btn,
    };
  },
};
</script>
<style scoped>
</style>