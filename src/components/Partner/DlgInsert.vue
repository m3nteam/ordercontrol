<template>
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center">Unos kupca</div>
        </q-card-section>

        <q-separator color="primary" />

        <!-- Field for partner name -->
        <q-card-section style="padding-bottom: 0;">
          <q-input
            dense
            outlined
            clearable
            label="Naziv partnera"
            autofocus
            ref="name"
            :rules="[val => !!val || 'Naziv partnera mora biti popunjen']"
            lazy-rules
            v-model="partnerModelLocal.localId"
          />
        </q-card-section>

        <!-- Field for partner activity -->
        <q-card-section
          class="text-right"
        >
          <q-checkbox
              label="Status aktivnosti"
              left-label
              v-model="partnerModelLocal.active"
          ></q-checkbox>
        </q-card-section>

        <!-- Buttons for insert new partner -->
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
        data() {
            return {
              partnerModelLocal: {name: '', active: true}
          }
        },
        methods: {
            formResponse(value) {
                this.$emit('insertResponse', value);
            }
        },
    }
</script>

<style>

</style>