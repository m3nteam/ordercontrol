<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .min-component-width{
    min-width: 300px;
  }

  .removeMP{
    margin: 0px;
    padding: 0px;
  }

  .q-expansion-item{
    @extend .q-list;
  } 

  .input-dialog {
    margin-bottom: 10px;
  }
</style>