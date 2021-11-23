<template>
  <v-app>
    <v-row align="center justify-center">
      <v-col cols="12" sm="6">
        <v-card class="register-card" rounded="xl" elevation="12">
          <v-card-title class="justify-center">
            <h1 class="display-2">Empresa</h1>
          </v-card-title>
          <v-card-text class="aligncenter">
            <v-img src="../assets/empresa.png" max-width="200px"></v-img>
          </v-card-text>
          <v-card-actions class="justify-center mt-12">
            <v-btn color="primary" x-large to="./register">Continuar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="register-card" rounded="xl" elevation="12">
          <v-card-title class="justify-center">
            <h1 class="display-2">Persona Natural</h1>
          </v-card-title>
          <v-card-text class="aligncenter">
            <v-img src="../assets/persona.png" max-width="200px"></v-img>
          </v-card-text>
          <v-card-actions class="justify-center mt-12">
            <v-btn color="primary" x-large to="./registerperson"
              >Continuar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "TipoUsuario",
};
</script>
<style scoped>
.register-card {
  width: 100vh;
  text-align: center;
  justify-content: center;
  padding: 10%;
}
.aligncenter {
  margin-top: 50px;
  margin-left: 33%;
}
</style>
