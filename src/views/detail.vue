<template>
  <div class="home">
    <h1>详情</h1>
    {{ data }}
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
export default {
  name: "Home",
  setup() {
    let { ctx } = getCurrentInstance();
    let data = ctx.$router.currentRoute.value.params.id;
    // let data=ctx.$router.currentRoute.value.query.name
    // let data = ctx.$router.currentRoute.value.params.id;
    return {
      data,
    };
  },
};
</script>
