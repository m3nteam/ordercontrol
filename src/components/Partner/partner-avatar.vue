<template>
    <div class="row removeMP">
        <div class="column q-ml-md justify-center">
            <q-avatar
                color="primary"
                text-color="white"
                class="text-h5"
                :size="size"
            >
                {{ jsFunctions.getInitials(partnerName) }}
            </q-avatar>
        </div>

        <div class="column q-ml-md justify-center">
            <q-item-label caption lines="1">{{ partnerId }}</q-item-label>
            <q-item-label>{{ partnerName }}</q-item-label>
        </div>
    </div>
</template>

<script>
    //class
    import jsFunctions from '../../js-script/js-functions2'

    export default {
        props:['partnerId', 'partnerName', 'size'],

        data(){
            return{
                jsFunctions: new jsFunctions(),
            }
        }
    }
</script>