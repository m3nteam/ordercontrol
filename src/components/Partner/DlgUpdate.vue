<template>
      <q-card
        class="min-component-width"
        @keyup.esc="formResponse(false)"
        >
        <q-card-section class="bg-primary text-white">
          <div 
            class="text-h5 text-center"
          >Ispravka kupca</div>
        </q-card-section>

        <q-separator color="primary" />

        <!-- Field for partner id -->
        <q-card-section style="padding-bottom: 0;">
          <q-input
            dense
            outlined
            readonly
            label="Šifra partnera"
            autofocus
            :value="partnerModelLocal.id"
          />
        </q-card-section>

        <!-- Field for partner name -->
        <q-card-section style="padding-bottom: 0;">
          <q-input
            dense
            outlined
            clearable
            label="Naziv partnera"
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
        props: ['partnerObj'],

        computed: {
          partnerModelLocal() {
            return {id: this.partnerObj.id, name: this.partnerObj.name, active: this.partnerObj.active};
          }
        },
        methods: {
          formResponse(value) {
            let arr = [value, this.partnerModelLocal]
            this.$emit('updateResponse', arr);
          }
        }
    }
</script>
