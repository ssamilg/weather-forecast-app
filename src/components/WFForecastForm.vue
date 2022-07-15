<script>
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
      <v-btn @click="$emit('setForm', formData)">
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
