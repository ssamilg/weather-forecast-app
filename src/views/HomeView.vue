<script>
import WFStepper from '@/components/WFStepper.vue';

export default {
  name: 'HomeComponent',
  components: { WFStepper },
};
</script>

<template>
  <div>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex md4>
          <wF-stepper/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
