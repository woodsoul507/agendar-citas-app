<template>
  <div class="card-normal">
    <h2 class="label-text text-lg mb-2">Ingrese numero de placa y fecha</h2>
    <label class="label" for="placa">Placa </label>
    <input required class="input input-bordered max-w-xs" v-model="placa" name="placa" type="text"
      placeholder="Ingrese la placa">

    <label class="label" for="fecha">Fecha</label>
    <input required v-model="inputDate" type="date" id="date" :min="minDate" name="fecha">

    <label class="label" for="hora">Hora</label>
    <select required class="select select-bordered select-sm max-w-xs mx-1" v-model="inputHour" name="hora" id="cars">
      <option value="01">01</option>
      <option value="02">02</option>
      <option value="03">03</option>
      <option value="04">04</option>
      <option value="05">05</option>
      <option value="06">06</option>
      <option value="07">07</option>
      <option value="08">08</option>
      <option value="09">09</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
    </select>

    <select required class="select select-bordered select-sm max-w-xs mx-1" v-model="inputMinutes" name="minutos"
      id="minutos">
      <option value="00">00</option>
      <option value="30">30</option>
    </select>

    <select required class="select select-bordered select-sm max-w-xs mx-1" v-model="inputMeridiano" name="meridiano"
      id="meridiano">
      <option value="am">am</option>
      <option value="pm">pm</option>
    </select>

    <button class="btn btn-wide block mt-2 " @click="postCita">Agendar</button>

  </div>
</template>

<script>
const URL = 'https://citavehiculosapi2022.azurewebsites.net/'

export default {

  beforeMount() {
    this.getDate()
  },

  data() {
    return {
      placa: '',
      fecha: '',
      minDate: '',
      inputDate: '',
      inputHour: '',
      inputMinutes: '',
      inputMeridiano: ''
    }
  },

  methods: {
    getDate() {
      let date = new Date()
      this.minDate = date.toISOString().split('T')[0]
    },
    async postCita() {
      if (!this.inputDate || !this.inputHour ||
        !this.inputMinutes || !this.inputMeridiano
        || !this.placa) {
        alert('Uno o mas campos faltan por completar')
        return
      }

      const cita = {
        "id": 0,
        "fecha": new Date(
          `${this.inputDate} ${this.inputHour}:${this.inputMinutes} ${this.inputMeridiano}`
        ),
        "atendida": false,
        "placa": this.placa
      }

      cita.fecha.setHours(cita.fecha.getHours() - 5)
      cita.fecha = cita.fecha.toJSON()

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cita)
      }
      try {
        const response = await fetch(URL + 'api/Citas', requestOptions)
          .then(response => response.json())
        if (response.statusCode != 200) {
          this.$emit('citaAgendada', false)
        }
        this.$emit('citaAgendada', true)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
label {
  margin-left: 10px;
}

button {
  margin-left: 10px;
}
</style>