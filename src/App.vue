<template>
  <h1>Citas</h1>
  <label for="buscar">Buscar por numero de placa </label>
  <input v-model="this.buscar" type="text" name="buscar" placeholder="Ingrese su placa">
  <button @click="getCitas">Buscar</button>
  <button @click="isAgendar = true" class="block-button">AGENDAR CITA</button>
  <hr>
  <p v-if="cita != '' && !isAgendar">{{ cita }}</p>
  <AgendarComponent v-if="isAgendar" @citaAgendada="citaAgendada()" />
</template>

<script>
import AgendarComponent from "./components/AgendarComponent";

const URL = 'https://citavehiculosapi2022.azurewebsites.net/'

export default {
  name: 'App',

  data() {
    return {
      buscar: '',
      isAgendar: false,
      cita: ''
    }
  },

  methods: {
    citaAgendada() {
      alert("Cita agendada exitosamente.")
      this.isAgendar = false
    },

    async getCitas() {
      this.isAgendar = false
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
      try {
        const data = await fetch(URL + 'api/Citas/placa/' + this.buscar, requestOptions)
          .then(response => response.json())
        const dateArray = data.fecha.split('T')
        this.cita = 'Placa: ' + data.placa + ' Fecha: ' + dateArray[0] + ' ' + this.convertirHora(dateArray[1])
      } catch (error) {
        this.cita = 'Placa no encontrada.'
      }
    },
    convertirHora(time) {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? 'AM' : 'PM';
        time[0] = +time[0] % 12 || 12;
      }
      return time.join('');
    }
  },

  components: {
    AgendarComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.block-button {
  margin: auto;
  margin-top: 10px;
  width: 20%;
  display: block;
}
</style>
