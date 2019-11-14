<template>
  <q-dialog
    class="min-component-width"
    ref="dialog"
    @hide="onDialogHide"
    persistent
  >
    <q-card class="q-dialog-plugin">
        
      <q-card-section class="bg-primary text-white text-center min-component-width">
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      
      <q-card-section class="q-ma-sm min-component-width">
        <div>{{ text }}</div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions class="min-component-width" align="right">
            <button-cancel
                color="positive"
                @clicked="onCancelClick"
            ></button-cancel>

            <q-space />

            <button-delete
                :flat="false"
                @clicked="onOKClick"
            ></button-delete>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
    import buttonMixin from '../../mixin/buttons-mixin'
    export default {
        mixins:[ buttonMixin ],
        props: [ 'title', 'text' ],

        methods: {
            // following method is REQUIRED
            // (don't change its name --> "show")
            show () {
            this.$refs.dialog.show()
            },

            // following method is REQUIRED
            // (don't change its name --> "hide")
            hide () {
            this.$refs.dialog.hide()
            },

            onDialogHide () {
            // required to be emitted
            // when QDialog emits "hide" event
            this.$emit('hide')
            },

            onOKClick () {
            // on OK, it is REQUIRED to
            // emit "ok" event (with optional payload)
            // before hiding the QDialog
            this.$emit('ok')
            // or with payload: this.$emit('ok', { ... })

            // then hiding dialog
            this.hide()
            },

            onCancelClick () {
            // we just need to hide dialog
            this.hide()
            }
        }
    }
</script>