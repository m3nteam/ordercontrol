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
            v-model="partnerModelLocal.name"
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

            <q-space />

            <button-ok
                @clicked="formResponse(true)"
            ></button-ok>
          </q-card-actions>
        </div>
      </q-card>
</template>

<script>
  import buttonMixin from '../../mixin/buttons-mixin'
    export default {
        mixins:[ buttonMixin ],
        props:[ 'modelPartner' ],

        data() {
          return {
            partnerModelLocal: Object.assign({}, this.modelPartner),
          }
        },

        methods: {
          formResponse(value) {
            let arr = [value, this.partnerModelLocal]
            this.$emit('insertResponse', arr);
          }
        }
    }
</script>

<style>

</style>