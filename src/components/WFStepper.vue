<script>
import WFForecastForm from '@/components/WFForecastForm.vue';
import WFForecastTable from '@/components/WFForecastTable.vue';
import WFSelfieStep from '@/components/WFSelfieStep.vue';
import { mapActions } from 'vuex';

export default {
  name: 'WFStepper',
  components: { WFForecastForm, WFForecastTable, WFSelfieStep },
  data() {
    return {
      currentStep: 1,
      forecastData: null,
      userData: null,
    };
  },
  methods: {
    ...mapActions(['fetchCityWeather', 'fetchCityInfoByName']),
    getForm(form) {
      // TODO put nullcheck for form in here
      this.userData = { ...form };

      this.fetchCityInfoByName(form.city)
        .then((res) => {
          console.log({ res });
          const [cityData] = res.data;

          // Loading and error handling should be added
          this.fetchCityWeather(cityData)
            .then((forecast) => {
              this.forecastData = forecast.data;
              this.currentStep = 2;
            });
        });
    },
  },
};
</script>

<template>
  <div id="wf-stepper">
    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <!-- TODO Remove steps and add logolike text here also shrink the height -->
        <v-stepper-step
          :complete="currentStep > 1"
          step="1"
        />

        <v-divider/>

        <v-stepper-step
          :complete="currentStep > 2"
          step="2"
        />

        <v-divider/>

        <v-stepper-step step="3"/>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <wF-forecast-form
            @setForm="getForm"
          />
        </v-stepper-content>

        <v-stepper-content step="2">
          <wF-selfie-step
            @next-step="currentStep=3"
            @prev-step="currentStep=1"
          />
        </v-stepper-content>

        <v-stepper-content step="3">
          <wF-forecast-table
            v-if="forecastData && currentStep === 3"
            :forecast-data="forecastData"
            class="forecast-table-wrapper"
          />

          <v-layout class="forecast-table-actions" justify-end align-center>
            <v-btn outlined color="grey" class="mr-2" @click="currentStep=2">
              <v-icon class="mr-2">mdi-chevron-left</v-icon>
              Back
            </v-btn>

            <v-btn depressed color="primary" @click="currentStep = 1">
              <v-icon class="mr-2">mdi-restart</v-icon>
              Restart
            </v-btn>
          </v-layout>
        </v-stepper-content>

      </v-stepper-items>

    </v-stepper>
  </div>
</template>

<style lang="scss">
#wf-stepper {
  height: 90vh;

  .v-stepper {
    height: 100%;

    .v-stepper__header {
      height: 10%;
      box-shadow: none;
      border-bottom: 1px solid #e0e0e0;
    }

    .v-stepper__items {
      height: 90%;

      .v-stepper__content {
        height: 100%;

        .v-stepper__wrapper {
          height: 100%;
        }
      }
    }
  }

  .forecast-table-wrapper {
    height: 90%;
    border-bottom: 1px solid #e0e0e0;
  }

  .forecast-table-actions {
    height: 10%;
  }
}
</style>
