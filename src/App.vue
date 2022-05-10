<template>
  <div class="card-body items-center text-center">
    <h1 class="card-title text-2xl">Citas de Mantenimiento Vehicular</h1>
    <label class="label-text text-lg" for="buscar">Buscar por numero de placa </label>
    <div class="table">
      <input class="input input-bordered max-w-xs mr-2" v-model="this.buscar" type="text" name="buscar"
        placeholder="Ingrese su placa">
      <button class="btn" @click="getCitas">Buscar</button>
    </div>
    <button class="btn btn-outline btn-wide mt-2" @click="isAgendar = true; citas = ''">Agendar una cita</button>
    <div class="mt-5" v-if="Array.isArray(citas)">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cita in citas" :key="cita.id">
              <td>{{ cita.placa }}</td>
              <td>{{ cita.fecha.replace('0:00') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <span v-else>
      {{ citas }}
    </span>
    <AgendarComponent v-if="isAgendar" @citaAgendada="citaAgendada($emit)" />
  </div>

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
    citaAgendada(success) {
      if (success) {
        this.isAgendar = false
        alert("Cita agendada exitosamente.")
        return
      }
      alert("Cita no fue agendada. Intente de nuevo.")
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

        if (data.statusCode != 200) {
          this.citas = data.value
          return
        }

        data.value.forEach(cita => {
          cita.fecha = this.convertirHora(cita.fecha)
        })
        this.citas = data.value
      } catch (error) {
        console.log(error)
      }
    },
    convertirHora(fecha) {
      const fechaArray = fecha.split('T')
      let hora = fechaArray[1].toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [fechaArray[1]];

      if (hora.length > 1) {
        hora = hora.slice(1)
        hora[5] = +hora[0] < 12 ? 'AM' : 'PM'
        hora[0] = +hora[0] % 12 || 12
      }
      return fechaArray[0] + ' ' + hora.join('').replace(':00AM', ' AM').replace(':00PM', ' PM')
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
  margin: 0px;
  padding: 0px;
}
</style>
