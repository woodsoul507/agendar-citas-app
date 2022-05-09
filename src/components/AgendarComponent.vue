<template>
  <div>
    <h2>Agendar Cita</h2>
    <label for="placa">Placa: </label>
    <input v-model="placa" name="placa" type="text" placeholder="placa">

    <label for="fecha">Fecha: </label>
    <input v-model="inputDate" type="date" id="date" :min="minDate" name="fecha">

    <label for="hora">Hora: </label>
    <select v-model="inputHour" name="hora" id="cars">
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

    <select v-model="inputMinutes" name="minutos" id="minutos">
      <option value="00">00</option>
      <option value="30">30</option>
    </select>

    <select v-model="inputMeridiano" name="meridiano" id="meridiano">
      <option value="am">am</option>
      <option value="pm">pm</option>
    </select>

    <button @click="postCita">Agendar</button>

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

      console.log('CITA', cita)

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cita)
      }
      try {
        await fetch(URL + 'api/Citas', requestOptions)
          .then(response => response.json())
        this.$emit('citaAgendada')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
label {
  margin-left: 10px;
}

button {
  margin-left: 10px;
}
</style>