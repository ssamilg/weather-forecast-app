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
      isLoading: false,
      currentStep: 1,
      forecastData: null,
      snackbar: {
        isVisible: false,
        text: '',
        type: 'info',
      },
    };
  },
  methods: {
    ...mapActions(['fetchCityWeather', 'fetchCityInfoByName']),
    getForm(form) {
      this.isLoading = true;

      this.fetchCityInfoByName(form.city)
        .then((res) => {
          console.log({ res });
          const [cityData] = res.data;

          this.fetchCityWeather(cityData)
            .then((forecast) => {
              this.forecastData = forecast.data;
              this.currentStep = 2;

              this.showSnackbar('success');
            })
            .catch((err) => {
              this.showSnackbar('error', err);
            })
            .finally(() => {
              this.isLoading = false;
            });
        })
        .catch((err) => {
          this.showSnackbar('error', err.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    showSnackbar(type, text = null) {
      this.snackbar.isVisible = true;
      this.snackbar.type = type;
      this.snackbar.text = text || 'Successfull';
    },
  },
};
</script>

<template>
  <div id="wf-stepper">
    <v-stepper v-model="currentStep">
      <v-stepper-header>
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
            v-show="!isLoading"
            @setForm="getForm"
            @showWarning="showSnackbar($event.type, $event.text)"
            @showError="showSnackbar($event.type, $event.text)"
          />

          <v-layout
            v-show="isLoading"
            align-center justify-center fill-height
          >
            <v-flex shrink>
              <v-progress-circular
                :size="70"
                :width="7"
                color="primary"
                indeterminate
              />
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="2">
          <wF-selfie-step
            v-if="currentStep === 2"
            @nextStep="currentStep=3"
            @prevStep="currentStep=1"
            @showError="showSnackbar($event.type, $event.text)"
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

    <v-snackbar
      v-model="snackbar.isVisible"
      :timeout="2000"
      :color="snackbar.type"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="snackbar.isVisible = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
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
