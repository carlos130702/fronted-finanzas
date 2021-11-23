<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="4">
            <v-card class="pa-12 card-finance" rounded="xl" elevation="20">
              <v-card-title class="justify-center">
                <v-alert v-if="error" color="red" type="error">
                  {{ error }}
                </v-alert>
                <h1 class="display-2">My Finance</h1>
              </v-card-title>
              <v-card-text>
                <v-form class="mt-12" @submit.prevent="login">
                  <v-text-field
                    v-model="email"
                    outlined
                    autofocus
                    label="Email"
                    name="Email"
                    type="text"
                    color="primary accent-3"
                  />
                  <v-text-field
                    v-model="contraseña"
                    outlined
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    color="primary accent-3"
                  />
                  <div class="text-center mt-2">
                    <v-btn large color="primary" type="submit"
                      >Iniciar Sesión</v-btn
                    >
                    <p class="text-center mt-6">
                      No tengo una cuenta.
                      <router-link to="./tipousuario">Regístrarme</router-link>
                    </p>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import "../firebase/init";
import firebase from "firebase/compat/app";

export default {
  data() {
    return {
      email: "",
      contraseña: "",
      error: "",
    };
  },
  name: "Login",
  methods: {
    login() {
      this.error = "";
      if (this.email && this.contraseña) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.contraseña)
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            this.error = err.message;
          });
      } else {
        this.error = "Todos los campos son requeridos.";
      }
    },
  },
};
</script>

<style scoped>
.v-main__wrap {
  background-color: black;
}
.card-finance {
  margin: 0 auto;
  float: none;
}
</style>
