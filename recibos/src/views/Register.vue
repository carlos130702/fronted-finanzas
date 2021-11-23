<template>
  <v-app>
    <v-row align="center justify-center">
      <v-col cols="auto">
        <v-row class="text-center justify-center mb-2">
          <v-alert v-if="error" color="red" type="error">
            {{ error }}
          </v-alert>
        </v-row>
        <v-card class="register-card" rounded="xl" elevation="12">
          <v-card-title class="justify-center">
            <h1 class="display-1">Registrarme como <span>Empresa</span></h1>
          </v-card-title>
          <v-card-text>
            <v-form class="mt-12" @submit.prevent="register">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" class="col-register">
                    <v-text-field
                      v-model="ruc"
                      outlined
                      autofocus
                      label="RUC"
                      name="Ruc"
                      type="text"
                      color="primary accent-3"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" class="col-register">
                    <v-text-field
                      v-model="nombres"
                      outlined
                      id="nombre"
                      label="Nombre o Razón Social"
                      name="nombre"
                      type="text"
                      color="primary accent-3"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" class="col-register">
                    <v-text-field
                      v-model="email"
                      outlined
                      id="email"
                      label="Email"
                      name="email"
                      type="email"
                      color="primary accent-3"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" class="col-register">
                    <v-text-field
                      v-model="celular"
                      outlined
                      id="celular"
                      label="Celular"
                      name="celular"
                      type="number"
                      color="primary accent-3"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" class="col-register">
                    <v-text-field
                      v-model="contraseña"
                      outlined
                      id="password1"
                      label="Password"
                      name="password1"
                      type="password"
                      color="primary accent-3"
                    />
                  </v-col>
                </v-row>
                <div class="text-center mt-2">
                  <v-btn large color="primary" type="submit">Registrarme</v-btn>
                </div>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import "../firebase/init";
import firebase from "firebase/compat/app";

export default {
  data() {
    return {
      ruc: "",
      nombres: "",
      email: "",
      celular: "",
      contraseña: "",
      error: "",
    };
  },
  name: "Register",
  methods: {
    register() {
      this.error = "";
      if (
        this.ruc &&
        this.nombres &&
        this.email &&
        this.celular &&
        this.contraseña
      ) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.contraseña)
          .then((user) => {
            //Actualizar usuario
            if (user) {
              user.user
                .updateProfile({
                  displayName: this.nombres,
                })
                .then(() => {
                  this.ruc = "";
                  this.nombres = "";
                  this.email = "";
                  this.celular = "";
                  this.contraseña = "";
                  this.$router.push({ name: "SuccessRegister" });
                })
                .catch((err) => {
                  this.error = err.message;
                });
            }
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
.register-card {
  width: 100vh;
  text-align: center;
  padding: 10%;
}

.col-register {
  padding-block: 0px;
}

.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
