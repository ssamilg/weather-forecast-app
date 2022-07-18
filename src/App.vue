<script>
export default {
  name: 'App',
  mounted() {
    this.$router.push('/');
  },
};
</script>

<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<style lang="scss">
// TODO change the project font family
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 50px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 50px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #c9c9c9;
  border-radius: 50px;
}
</style>
