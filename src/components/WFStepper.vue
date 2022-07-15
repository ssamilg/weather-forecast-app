<script>
import WFForecastForm from '@/components/WFForecastForm.vue';

export default {
  name: 'WFStepper',
  components: { WFForecastForm },
  data() {
    return {
      currentStep: 1,
    };
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
          <wF-forecast-form/>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-12"
          >
            selfie section
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12"
          ></v-card>
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
  height: 80vh;

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
