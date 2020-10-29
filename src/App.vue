<template>
  <div id="nav">
    <router-link to="/">Setup</router-link> |
    <router-link to="/ref">ref</router-link>|
    <router-link to="/customRef">customRef</router-link> |
    <router-link to="/reactive">reactive</router-link>|
    <router-link to="/readonly">readonly</router-link> |
    <router-link to="/markRaw">markRaw</router-link>
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
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
