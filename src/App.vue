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

  .q-item-type{
    padding: 5px;
  }

  .q-expansion-item{
    padding: 0px;
  }
</style>