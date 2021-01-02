<template>
  <v-alert type="error"
           transition="scale-transition"
           color="error"
           icon="mdi-warning"
           :value="true"
           dismissible>
    <h3>{{message}}</h3>
  </v-alert>
</template>

<script>
export default {
  name: "FormAlert",
  props: ['message'],
  data: () => {
    return {
      alert
    }
  }
}
</script>

<style scoped>

</style>