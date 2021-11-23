<template>
  <v-app>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  color: #4e9af4;
  background: rgb(124, 215, 228);
  background: radial-gradient(
    circle,
    rgba(124, 215, 228, 1) 0%,
    rgba(72, 112, 210, 1) 100%
  );
}

span {
  color: #4e9af4;
  font-weight: bolder;
}
</style>
