<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currs" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ rates[cur].toFixed(2) }}</td>
              <td>{{ date | datef('date')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates", "date"],

  data: () => ({
    currs: ["RUB", "USD", "EUR"]
  })
};
</script>