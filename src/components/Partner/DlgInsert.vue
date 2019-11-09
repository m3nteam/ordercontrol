<template>
      <q-card>
        <q-card-section>
          <div class="text-h6">Unos kupca</div>
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="left">
          <q-btn
            label="Odustani"
            color="negative"
            @click="formResponse(false)"
            />

            <q-space />

          <q-btn
            label="Sačuvaj"
            color="primary"
            @click="formResponse(true)"/>
        </q-card-actions>
      </q-card>
</template>

<script>
    export default {
        methods: {
            formResponse(value) {
                this.$emit('insertResponse', value);
            }
        },
    }
</script>

<style>

</style>