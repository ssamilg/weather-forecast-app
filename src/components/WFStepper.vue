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
          <v-card
            class="mb-12"
            height="100%"
          >
            <wF-selfie-step @next-step="currentStep=3"/>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <wF-forecast-table
            v-if="forecastData && currentStep === 3"
            :forecast-data="forecastData"
            :user-data="userData"
          />
        </v-stepper-content>
      </v-stepper-items>

      <v-layout class="wf-stepper-actions pa-2">
        <v-btn
          color="primary"
          @click="currentStep += 1"
        >
          Continue
        </v-btn>

        <v-btn text @click="currentStep = 1">
          Cancel
        </v-btn>
      </v-layout>
    </v-stepper>
  </div>
</template>

<style lang="scss">
#wf-stepper {
  height: 90vh;

  .v-stepper {
    height: 100%;

    .v-stepper__header {
      height: 12%;
      box-shadow: none;
      border-bottom: 1px solid #e0e0e0;
    }

    .v-stepper__items {
      height: 76%;

      .v-stepper__content {
        height: 100%;

        .v-stepper__wrapper {
          height: 100%;
        }
      }
    }
  }

  &-actions {
    height: 12%;
  }
}
</style>
