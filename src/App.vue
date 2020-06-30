<template>
  <div>
    <Navigation />
    <router-view></router-view>
  </div>
</template>

<script>
  import Navigation from "./components/Navigation";
  export default {
    name: 'app',
    components: {Navigation},
    


  }
</script>

<style>
  body{
    font-family:sans-serif;
    margin:0;
    padding:0;
  }
  .header{
        background-color: #65b1ff;
    }
</style>
