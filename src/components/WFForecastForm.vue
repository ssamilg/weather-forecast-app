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
      selectedCountry: null,
      countries: [],
      cities: [],
      isCitiesFetching: false,
      isCountriesFetching: false,
      isCityTypingModeOn: false,
    };
  },
  mounted() {
    this.getCountries();
  },
  watch: {
    selectedCountry() {
      if (!this.selectedCountry) {
        this.formData.city = null;
      }
    },
  },
  methods: {
    ...mapActions(['setUserName', 'setUserCity', 'fetchCitiesByCountry', 'fetchCountries']),
    getCountries() {
      this.isCountriesFetching = true;

      this.fetchCountries()
        .then(({ data }) => {
          this.countries = data.data;
        })
        .catch((err) => {
          this.$emit('showError', { type: 'error', text: err.message });
        })
        .finally(() => {
          this.isCountriesFetching = false;
        });
    },
    getCitiesByCountry(country) {
      this.isCitiesFetching = true;

      this.fetchCitiesByCountry(country)
        .then(({ data }) => {
          this.cities = data.data;
        })
        .catch((err) => {
          this.$emit('showError', { type: 'error', text: err.message });
        })
        .finally(() => {
          this.isCitiesFetching = false;
        });
    },
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

    <template v-if="!isCityTypingModeOn">
      <v-layout mt-3>
        <v-autocomplete
          v-model="selectedCountry"
          :items="countries"
          :disabled="isCountriesFetching"
          :loading="isCountriesFetching"
          item-value="name"
          item-text="name"
          label="Country"
          @input="getCitiesByCountry"
          dense
        />
      </v-layout>

      <v-layout mt-3>
        <v-autocomplete
          v-model="formData.city"
          :items="cities"
          :loading="isCitiesFetching"
          :disabled="isCitiesFetching || !selectedCountry"
          label="City"
          dense
        />
      </v-layout>

      <v-layout @click="isCityTypingModeOn = true" class="city-option-label">
        I would like to type my city.
      </v-layout>
    </template>

    <template v-if="isCityTypingModeOn">
      <v-layout>
        <v-text-field
          v-model="formData.city"
          label="City"
        />
      </v-layout>

      <v-layout @click="isCityTypingModeOn = false" class="city-option-label">
        I would like to select from list.
      </v-layout>
    </template>

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

  .city-option-label {
    font-size: .8rem;
    color: #3F51B5;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
