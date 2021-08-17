<template>
  <div id="app">
    <div class="heead">
    BANKEO - porównywarka placówek banków
    </div>
     <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.heead {
  padding: 20px;
  text-align: center;
  background: #1abc9c;
  color: white;
  font-size: 30px;
  margin-bottom: 50px;
}
</style>
