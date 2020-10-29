<template>
  <div class="home">
    <h3>readonly函数</h3>
    <p>ref对象————{{ count }}</p>
    <p>reactive对象————{{ obj.name }}</p>
    <button @click="change">按钮</button>

    <h3>{{ state.foo }}</h3>

    <h3>{{ state.nested.bar }}</h3>
    <button @click="changeNum">shallowReadonly</button>
  </div>
</template>

<script>
import { readonly, ref, reactive, isReadonly, shallowReadonly } from "vue";

/**
 * readonly函数
 * 传入ref或reactive对象,并返回一个原始对象的只读代理,对象内部任何嵌套的属性也都是只读的。
 * 传入普通对象等也返回只读代理
 * 入普通数值或字符串不能变成只读
 *
 *isReadonly
 * 检查对象是否是由创建的只读代理readonly
 *
 * shallowReadonly - 创建浅层的只读响应式代理
 */
export default {
  name: "Home",
  setup() {
    // readonly
    let count = readonly(ref(0));
    let obj = readonly(reactive({ name: "张三" }), name);
    let obj1 = readonly({ name: "李四" });
    let str = readonly("222222");

    const change = () => {
      count.value = 1;
      console.log(count.value); //0
      console.log(isReadonly(count)); //true
      obj.name = "谢大脚";
      console.log(obj.name); //张三
      console.log(isReadonly(obj)); //true
      obj1.name = "英子";
      console.log(obj1); //李四
      console.log(isReadonly(obj1)); //true
      str = "44444";
      console.log(str); //444
      console.log(isReadonly(str)); //false
    };
    
    // shallowReadonly
    let state = shallowReadonly({
      foo: 1,
      nested: {
        bar: 2,
      },
    });
    const changeNum = () => {
      // 变更 state 的自有属性会失败
      state.foo++;
      console.log(state.foo); // 1
      // ...但是嵌套的对象是可以变更的
      console.log(isReadonly(state.nested)); // false
      state.nested.bar++; // 嵌套属性依然可修改
      console.log(state.nested.bar); // 2 3 4 5
    };
    return {
      count,
      change,
      obj,
      state,
      changeNum,
    };
  },
};
</script>
