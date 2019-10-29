<template>
    <q-banner
        class="text-white bg-primary"
        rounded
    >
        <q-item
            dense
            style="padding: 0;"
        >
            <q-item-section>
                <span class="text-h5">
                    <slot />
                </span>
            </q-item-section>

            <q-item-section side>
                <q-checkbox
                    v-if="chBoxVisible"
                    dark
                    @input="$emit('update:chBoxVal', $event)"
                    :value="chBoxVal"
                ></q-checkbox>
            </q-item-section>
        </q-item>
    </q-banner>
</template>

<script>
    export default {
        props:['chBoxVisible', 'chBoxVal']
    }
</script>