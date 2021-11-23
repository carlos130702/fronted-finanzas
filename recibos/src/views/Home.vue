<template>
  <div>
    <Navbar></Navbar>
    <v-card rounded="xl" elevation="12">
      <v-parallax class="parallax" src="https://fondosmil.com/fondo/89680.jpg">
        <v-card
          rounded="xl"
          elevation="12"
          class="mx-auto my-12 card-principal"
          max-width="400"
        >
          <v-card-title class="justify-center c-text dark"
            ><h4 class="text-ra">
              Emite un recibo con un solo click!
            </h4></v-card-title
          >
          <v-card-actions class="justify-center c-text">
            <router-link to="./recibos"
              ><v-btn color="white">Crear recibo</v-btn></router-link
            >
          </v-card-actions>
        </v-card>
      </v-parallax>
      <v-card elevation="12" class="pa-12">
        <v-card-title class="justify-center c-text"
          ><h2 class="text-h4">¿Qué es un recibo por honorarios?</h2>
        </v-card-title>
        <v-card-text class="justify-center c-text">
          <p class="text-h5">
            Es un documento y un tipo de comprobante de pago donde se registra
            el pago de honorarios a una persona natural que presta sus servicios
            a una empresa. En la actualidad se emiten de forma electrónica y por
            lo general se hace a través de la página web de la SUNAT.
          </p>
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Navbar,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.header-title {
  color: white;
  font-size: 58px;
}

.parallax {
  padding-left: 0 !important;
  padding-right: 0 !important;
  width: 100% !important;
}
.fact {
  margin: auto;
}
.c-text {
  padding: 30px;
}

.bg {
  background-color: #f5f5f5;
}
.card-principal {
  background-color: #4498ff;
}
.text-ra {
  color: white;
}
</style>
