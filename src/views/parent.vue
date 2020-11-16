<template>
  <div class="home">
    <h1>父组件</h1>
    <p>{{ receptionSon }}</p>
    <Son :parent="parent" @sendparent="sendparent"></Son>
    <button @click="change">进入详情</button>
    <router-view />
  </div>
</template>

<script>
import Son from "@/components/Son.vue";
import { ref, getCurrentInstance } from "vue";

export default {
  name: "Home",
  setup() {
    let { ctx } = getCurrentInstance();
    let receptionSon = ref("");
    let parent = ref("我是父亲，给儿子送东西");
    let sendparent = (data) => {
      receptionSon.value = data;
    };
    let change = () => {
      // 路由传参的三种方式
      // 第一种 刷新页面数据不会丢失
      // {
      //   path: '/detail/:id',
      //   name: 'detail',
      //   component: () => import('@/views/detail.vue')
      // }
      let name = "路由参数";
      ctx.$router.push(`/detail/${name}`);

      //  第二种 query传参相当于get,参数会出现在地址栏(query用path)
      // ctx.$router.push({
      //   path: "/detail",
      //   query: {
      //     name: "路由传参",
      //   },
      // });

      //第三种params传参相当于post,参数不会出现在地址栏中（params用name跳转）页面刷新数据会丢失
      // ctx.$router.push({
      //   name: "detail",
      //   params: {
      //     name: "路由传参",
      //   },
      // });
    };
    return {
      parent,
      sendparent,
      receptionSon,
      change,
    };
  },
  components: {
    Son,
  },
};
</script>
