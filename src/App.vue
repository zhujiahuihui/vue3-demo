<template>
  <!-- <a-button type="primary">
    Primary
  </a-button>
  <a-button>Default</a-button>
  <a-button type="dashed">
    Dashed
  </a-button>
  <a-button type="danger">
    Danger
  </a-button>
  <a-config-provider :auto-insert-space-in-button="false">
    <a-button type="primary">
      按钮
    </a-button>
  </a-config-provider>
  <a-button type="primary">
    按钮
  </a-button>
  <a-button type="link">
    Link
  </a-button> -->

  <div id="nav">
    <router-link to="/">Setup</router-link> |
    <router-link to="/ref">ref</router-link>|
    <router-link to="/customRef">customRef</router-link> |
    <router-link to="/reactive">reactive</router-link>|
    <router-link to="/readonly">readonly</router-link> |
    <router-link to="/markRaw">markRaw</router-link>|
    <router-link to="/life">生命周期</router-link>|
    <router-link to="/parent">组件传参</router-link>
    |<router-link to="/provide"><button>Provide和inject</button></router-link>
    <router-link to="/store"><button>store用法</button></router-link>
  </div>
  <router-view />
</template>
<script>
export default {
  name: "Home",
  setup() {},
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  border: 1px solid;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
