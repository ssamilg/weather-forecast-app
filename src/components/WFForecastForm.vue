<script>
import { mapActions } from 'vuex';

export default {
  name: 'WFForecastForm',
  data() {
    return {
      formData: {
        name: null,
        city: null,
      },
    };
  },
  methods: {
    ...mapActions(['setUserName', 'setUserCity']),
    setUserData() {
      this.setUserName(this.formData.name);
      this.setUserCity(this.formData.city);

      this.$emit('setForm', this.formData);
    },
  },
};
</script>

<template>
  <div id="wf-forecast-form">
    <v-layout>
      <v-text-field
        v-model="formData.name"
        label="Name"
      />
    </v-layout>

    <v-layout>
      <v-text-field
        v-model="formData.city"
        label="City"
      />
    </v-layout>

    <v-layout justify-end>
      <v-btn @click="setUserData()">
        Next
      </v-btn>
    </v-layout>
  </div>
</template>

<style lang="scss">
#wf-forecast-form {
  height: 100%;
}
</style>
