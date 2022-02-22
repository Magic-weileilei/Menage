<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/user">user</router-link> -->
    </nav>
    <router-view/>
  </div>
</template>
<script>
    name: 'App'
</script>

<style lang="less" scoped>
    html,
    body {
        margin: 0;
        padding: 0;
    }
    
    #app {
        height: 100vh;
    }
</style>