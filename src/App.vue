<template>
  <h1>Citas</h1>
  <label for="buscar">Buscar por numero de placa </label>
  <input v-model="this.buscar" type="text" name="buscar" placeholder="Ingrese su placa">
  <button @click="getCitas">Buscar</button>
  <button @click="isAgendar = true; citas = ''" class="block-button">AGENDAR CITA</button>
  <hr>
  <div v-if="citas !== 'Placa no encontrada.' && !isAgendar">
    <span v-for="cita in citas" :key="cita.id">
      Placa: {{ cita.placa }} Fecha: {{ cita.fecha }}
    </span>
  </div>
  <span v-else>
    {{ citas }}
  </span>
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
      citas: ''
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
        data.forEach(cita => {
          cita.fecha = this.convertirHora(cita.fecha)
        })
        this.citas = data
      } catch (error) {
        this.citas = 'Placa no encontrada.'
      }
    },
    convertirHora(fecha) {
      const fechaArray = fecha.split('T')
      let hora = fechaArray[1].toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [fechaArray[1]];
      console.log('Hora' + fechaArray[1], hora)

      if (hora.length > 1) {
        hora = hora.slice(1)
        hora[0] = hora[0] - 5
        hora[5] = +hora[0] < 12 ? 'AM' : 'PM'
        hora[0] = +hora[0] % 12 || 12
      }
      return fechaArray[0] + ' ' + hora.join('')
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

span {
  display: block;
  margin: 5px;
}
</style>
