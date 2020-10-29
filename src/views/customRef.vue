<template>
  <div class="home">
    <h3>customRef函数</h3>

    <p>{{ age }}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { customRef } from "vue";
/**
 * customRef函数
 * 自定义ref
 * 返回一个ref对象,可以显式地控制依赖追踪和触发响应
 *
 *
 */
function myRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track(); // 告诉Vue这个数据是需要追踪变化的
        console.log("get", value);
        return value;
      },
      set(newValue) {
        console.log("set", newValue);
        value = "我的年龄===" + newValue;
        trigger(); // 告诉Vue触发界面更新
      },
    };
  });
}
export default {
  name: "Home",
  setup() {
    // let age = ref(18); // reactive({value: 18})
    let age = myRef(18);
    function myFn() {
      age.value += 1;
    }
    // 页面显示的是18
    // 点击button按钮后，变成了我的年龄===19
    /**
     * 注意点:
     * ————————不能在get方法中发送网络请求
     * 
     * 渲染界面-》调用get->发送网络请求
     * 保存数据-》更新界面-》调用get
     * 重复执行，造成死循环
    */

    return { age, myFn };
  },
};
</script>
