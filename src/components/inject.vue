<template>
  <div class="home">
    <h1>子组件</h1>
    <p>inject接收的参数：msg ——————{{ testMassge }}</p>
    <p>inject接收的参数：provideMsg———————— {{ provideMsg }}</p>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "Home",
  setup() {
    let testMassge = inject("msg");
    let provideMsg = inject("provideMsg");
    console.log(testMassge, provideMsg);
    return {
      testMassge,
      provideMsg
    };
  },
};
</script>
