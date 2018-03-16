<template>
  <div id="app">
    <h3 class="title">{{title}}</h3>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  data:function(){
    return {
      title:"学习vue+mongod+nodejs构建项目后台"
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.title{
  margin-bottom: 50px;
  text-align: center;
}
</style>
