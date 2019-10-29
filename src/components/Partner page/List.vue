<template>
    <q-item
        class="q-pa-sm"
        clickable
        v-ripple
        @click="updatePartnerEmit"
    >
        <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
                {{ getInitials(partner.name) }}
            </q-avatar>
        </q-item-section>

        <q-item-section>
            <q-item-label>{{ partner.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-checkbox
            :value="partner.active"
            ></q-checkbox>
        </q-item-section>
    </q-item>
</template>

<script>
    export default {
        props: ['partner'],

        methods:{
            updatePartnerEmit(){
                this.$emit('updatePartnerEmit', this.partner)
            },

            getInitials(name){
                var names = name.split(' '),
                initials = names[0].substring(0, 1).toUpperCase();
            
                if (names.length > 1) {
                    initials += names[names.length - 1].substring(0, 1).toUpperCase();
                }
                return initials;
            },
        }
    }
</script>