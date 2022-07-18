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
    <!-- TODO add a welcome message here -->
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
      <v-btn depressed color="primary" @click="setUserData()">
        Next
        <v-icon class="ml-2">mdi-chevron-right</v-icon>
      </v-btn>
    </v-layout>
  </div>
</template>

<style lang="scss">
#wf-forecast-form {
  height: 100%;
}
</style>
