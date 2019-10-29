<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title class="text-center text-h5">
          KONTROLA PORUDŽBINA
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigacija</q-item-label>

        <q-item
          v-for="nav in navs"
          :key="nav.id"
          clickable
          :to="nav.to"
          exact
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
            <q-item-label caption>{{ nav.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false,
      navs:[
        {id:'1', to:'/', icon:'home', label:'Dobrodošli', caption:''},
        {id:'2', to:'/partner', icon:'list', label:'Kupci', caption:'Pregled kupaca'},
        {id:'3', to:'/import', icon:'import_export', label:'Import', caption:'Import porudžbina'},
        {id:'4', to:'/orderPreview', icon:'view_list', label:'Pregled', caption:'Pregled porudžbina'},
        {id:'5', to:'/orderReport', icon:'list_alt', label:'Izveštaj', caption:'Izveštaj o porudžbinama'},
      ]
    }
  }
}
</script>
