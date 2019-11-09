<template>
    <q-page
        class="q-pa-sm">

        <!-- Title of list when partners not exists -->
        <q-banner
            class="bg-orange text-white text-center"
            rounded
            v-if="this.dbObj ==''">
            <span class="text-h5">NEMA PODATAKA</span>
        </q-banner>  
        
        <div v-else>
        <!-- Title of list when partners exists -->
            <q-banner
                class="bg-primary text-white"
                rounded
                >
                Pregled kupaca
            </q-banner> 

            <!-- Lists of partners -->
            <q-list 
                bordered
                separator>
                <q-item 
                    v-for="partner in this.dbObj" 
                    :key="partner.id" 
                    class="q-pa-sm"
                    clickable
                    v-ripple
                    style="padding: 0;"
                    >
                    <q-item-section avatar>
                        <q-avatar
                            color="primary"
                            text-color="white"
                            class="text-h5">
                            {{ getInitials(partner.name) }}
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label caption lines="1">{{ partner.id }}</q-item-label>
                        <q-item-label>{{ partner.name }}</q-item-label>
                    </q-item-section>
                    
                    <!-- Checkbox  -->
                     <q-item-section side>
                        <q-checkbox
                        :value="partner.active"
                        disabled
                        ></q-checkbox>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>

        <!-- {{ this.$store.state.storeDb.allData }} -->
    </q-page>
</template>

<script>
    import dbObjects from '../mixin/db-objects'
    import jsFunctions from '../mixin/js-functions'

    export default {
        mixins: [dbObjects, jsFunctions]
    }
</script>

<style>

</style>