<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="container">
          <router-link to="/"><a class="brand">Matsh</a></router-link>
          <router-link to="/CatStatistic"><a class="brand">Statistic</a></router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
