<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="cur in currs" :key="cur" class="currency-line">
          <span>{{ getCurr(cur) | currf(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //проброс свойства в компонент
  //rates добавится в this и прокинется т.о. сюда из Home
  props: ["rates"],

  data: () => ({
    currs: ["RUB", "USD", "EUR"]
  }),

  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["RUB"] / this.rates["EUR"])
      );
    }
  },

  methods: {
    getCurr(cur) {
      return Math.floor(this.base * this.rates[cur]);
    }
  }
};
</script>