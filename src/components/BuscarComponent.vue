<template>
  <div>
    <p v-if="mostarResultado">{{ cita }}</p>
  </div>
</template>

<script>
const URL = 'https://citavehiculosapi2022.azurewebsites.net/'

export default {

  async mounted() {
    await this.getCitas()
  },

  data() {
    return {
      mostarResultado: false,
      cita: ''
    }
  },

  props: ['buscar'],

  methods: {
    async getCitas() {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
      try {
        const data = await fetch(URL + 'api/Citas/placa/' + this.buscar, requestOptions)
          .then(response => response.json())
          .then(data => {
            this.cita = data
            console.log(data)
            this.mostarResultado = true

          })
        this.cita = data
      } catch (error) {
        this.cita = 'Placa no encontrada.'
        this.mostarResultado = true
      }
    }
  }
}
</script>

<style scoped>
</style>