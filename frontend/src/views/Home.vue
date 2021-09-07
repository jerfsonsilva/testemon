<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <h5>Bem vindo(a)</h5>

    <div class="columns mt-4">
      <div class="column is-three-quarters is-offset-1">
        <input
          type="text"
          class="input"
          v-model="symbol"
          placeholder="Digite aqui o symbol da ação desejada"
        />
      </div>
      <div class="column">
        <button class="button" @click="buscarCompany()">Buscar</button>
      </div>
    </div>

    <div v-if="preload">Aguarde...</div>

    <div class="card" v-if="company">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">
              {{ company.industry }} - {{ company.symbol }}
            </p>
            <p class="subtitle is-6">LatestPrice {{ company.latestPrice }}$</p>

            <p class="subtitle is-6">CEO {{ company.CEO }}</p>
          </div>
        </div>

        <div class="content">
          <p>
            Tags:
            <small>{{ company.tags.join(", ") }}</small>
          </p>

          <p>
            SITE: <a :href="company.website">{{ company.website }}</a>
          </p>
          <p></p>

          <p>
            Description <small>{{ company.description }}</small>
          </p>

          <p>
            Address:
            <small>{{
              company.address +
              " " +
              company.address2 +
              ", state " +
              company.state +
              ", city " +
              company.city +
              ", zip " +
              company.zip +
              ", country " +
              company.country
            }}</small>
          </p>

          <p>
            Phone:
            <small>{{ company.phone }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import env from "../../env";

export default {
  name: "Home",
  data() {
    return {
      symbol: null,
      company: null,
      preload: false,
    };
  },
  methods: {
    buscarCompany() {
      this.preload = true
      let url = env.HOST_BACKEND
      axios
        .get(url + "/company/" + this.symbol)
        .then((response) => {
          //Buscar company
          this.company = response.data;
          this.symbol = null
        })
        .catch((err) => {
          this.company = null
          var msg = err.response.data.err
          this.$alertify.error(msg)
        })
        .then(() => {
          this.preload = false
        });
    },
  },
  components: {},
};
</script>
