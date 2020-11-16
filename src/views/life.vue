<template>
  <div class="home">
    <h1>生命周期</h1>
    <p>onBeforeMount——————相当于 beforeMount</p>
    <p>onMounted——————————相当于 mounted</p>
    <p>onBeforeUpdate—————相当于 beforeUpdate</p>
    <p>onUpdated——————————相当于 updated</p>
    <p>onBeforeUnmount————相当于 beforeDestroy</p>
    <p>onUnmounted————————相当于 destroyed</p>
    <p>onErrorCaptured————错误监控</p>
    <p>onRenderTracked————已渲染</p>
    <p>onRenderTriggered——当组件更新时会首先触发此生命周期钩子 onRenderTriggered->onRenderTracked->onBeforeUpdate->onUpdated</p>
  </div>
</template>

<script>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
} from "vue";

export default {
  name: "Home",
  setup() {
    // console.log(props.msg, context)
    const a = ref(0);
    const setA = () => {
      return a.value++;
    };
    // 相当于 beforeMount
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    // 相当于 mounted
    onMounted(() => {
      console.log("onMounted");
    });
    // 相当于 beforeUpdate
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });
    // 相当于 updated
    onUpdated(() => {
      console.log("onUpdated");
    });
    // 相当于 beforeDestroy
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
    });
    // 相当于 destroyed
    onUnmounted(() => {
      console.log("onUnmounted");
    });
    onErrorCaptured(() => {
      // 错误监控
      console.log("onErrorCaptured");
    });
    onRenderTracked(() => {
      // 已渲染
      console.log("onRenderTracked");
    });
    onRenderTriggered(() => {
      // 当组件更新时会首先触发此生命周期钩子 onRenderTriggered->onRenderTracked->onBeforeUpdate->onUpdated
      console.log("onRenderTriggered");
    });
    return {
      a,
      setA,
    };
  },
};
</script>
