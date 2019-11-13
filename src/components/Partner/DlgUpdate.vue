<template>
      <q-card
        class="min-component-width"
        @keyup.esc="formResponse(false)"
        >
        <q-card-section class="bg-primary text-white">
          <div 
            class="text-h5 text-center"
          >Unos kupca</div>
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
              dense
              v-model="partnerModelLocal.active"
          ></q-checkbox>
        </q-card-section>

        <!-- Buttons for insert new partner -->
        <div class="bg-primary">
          <q-card-actions align="left">
            <button-cancel
                @clicked="formResponse(false)"
            ></button-cancel>

            <!-- <q-btn
              label="Odustani"
              color="negative"
              @click="formResponse(false)"
              /> -->

              <q-space />

            <button-ok
                @clicked="formResponse(true)"
            ></button-ok>
            <!-- <q-btn
              label="Sačuvaj"
              color="positive"
              @click="formResponse(true)"/> -->
          </q-card-actions>
        </div>
      </q-card>
</template>

<script>
    //mixin
    import buttonMixin from '../../mixin/buttons-mixin'

    export default {
        mixins:[ buttonMixin ],

        data() {
          return {
            partnerModelLocal: {name: '', active: true}
          }
        },

        methods: {
          formResponse(value) {
              this.$emit('insertResponse', value);
          }
        }
    }
</script>

<style>

</style>