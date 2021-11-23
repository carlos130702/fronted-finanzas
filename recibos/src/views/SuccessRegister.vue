<template>
  <v-app>
    <v-row align="center justify-center">
      <v-col cols="auto" align-self="center">
        <v-card class="register-card" rounded="xl" elevation="12">
          <v-card-title class="justify-center">
            <h1>¡REGISTRO EXITOSO!</h1>
          </v-card-title>
          <v-card-text class="mt-6">
            <v-icon color="primary" size="150">mdi-check-circle-outline</v-icon>
          </v-card-text>
          <v-card-actions class="justify-center mt-6">
            <div class="text-center mt-2">
              <router-link to="./login"
                ><v-btn rounded x-large color="primary"
                  >Iniciar Sesión</v-btn
                ></router-link
              >
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "SuccessRegister",
};
</script>

<style scoped>
.register-card {
  width: 100vh;
  text-align: center;
  padding: 10%;
}

.col-register {
  padding-block: 0px;
}
</style>
