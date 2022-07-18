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

      if (this.formData.name !== null && this.formData.name !== ''
      && this.formData.city !== '' && this.formData.city !== null) {
        this.$emit('setForm', this.formData);
      } else {
        this.$emit('showWarning', { type: 'warning', text: 'Please fill the fields correctly !' });
      }
    },
  },
};
</script>

<template>
  <div id="wf-forecast-form">
    <v-layout justify-center>
      <v-flex md10 class="welcome-message">
        <h3>Welcome to Weather Forecast App.</h3>
        Please type your name and city that you want to get weather forecast report.
      </v-flex>
    </v-layout>

    <v-layout mt-4>
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
      <v-btn id="submit-btn" depressed color="primary" @click="setUserData()">
        Next
        <v-icon class="ml-2">mdi-chevron-right</v-icon>
      </v-btn>
    </v-layout>
  </div>
</template>

<style lang="scss">
#wf-forecast-form {
  height: 100%;

  .welcome-message {
    text-align: center;
  }
}
</style>
