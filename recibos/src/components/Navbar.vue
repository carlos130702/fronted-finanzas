<template>
  <v-card class="mx-auto overflow-hidden">
    <v-app-bar light fixed>
      <v-app-bar-nav-icon>
        <v-icon>mdi-finance</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        Bienvenido {{ user.displayName || user.email }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template>
        <div class="item-menu"></div>
      </template>
      <div class="item-menu">
        <router-link to="./" class="text-black"> Home </router-link>
      </div>
      <div class="item-menu">
        <router-link to="./recibos" class="text-black">
          Recibos por Honorarios
        </router-link>
      </div>
      <div class="item-menu">
        <v-btn rounded color="primary" @click.stop="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list nav dense>
        <v-list-item>
          <v-layout column align-start> Menu </v-layout>
          <v-layout column align-end>
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
          </v-layout>
        </v-list-item>
        <br />
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <router-link to="./">
            <v-list-item>
              <v-list-item-title>Inicio</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </router-link>

          <v-list-group no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Descuentos</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="./recibos">
              <v-list-item-title>Dscto. de Facturas</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-cash-fast</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item disabled>
              <v-list-item-title>Dscto. de Letras</v-list-item-title>
              <v-list-item-icon>
                <v-icon disabled>mdi-file-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item disabled>
              <v-list-item-title>Dscto. de Recibos</v-list-item-title>
              <v-list-item-icon>
                <v-icon disabled>mdi-card-bulleted-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <router-link to="./myaccount">
            <v-list-item>
              <v-list-item-title>Mi Cuenta</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </router-link>

          <v-list-item @click.prevent="logout">
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import "../firebase/init";
import firebase from "firebase/compat/app";
export default {
  name: "Navbar",
  data: () => ({
    drawer: false,
    group: null,
    user: null,
    menu: "Diswallet",
  }),
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.text-black {
  color: black;
}
.item-menu {
  padding: 2%;
}
</style>
