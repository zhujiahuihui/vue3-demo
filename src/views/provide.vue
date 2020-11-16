<template>
  <div class="home">
    <h1>Provide和inject</h1>
    <Inject></Inject>
  </div>
</template>

<script>
import { provide, ref,  } from "vue";
import Inject from "../components/inject.vue";
/**
 *
 *
 * provide()和inject()生产者消费者（组件嵌套层级比较深的时候用到）
 * 可以实现嵌套组件之间的数据传递，这两个函数只能在setup()中使用。
 * 父级组件中使用provide()函数向下传递，子组件中使用inject()获取上层传递过来的数据
 *
 */
export default {
  name: "Home",
  setup() {

    let provideMsg = ref("provide传递数据了");
    let Msg = "嵌套数据";
    provide("msg", provideMsg);
    provide("provideMsg", Msg);

    return {};
  },
  components: {
    Inject,
  },
};
</script>
