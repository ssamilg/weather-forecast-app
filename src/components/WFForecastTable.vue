<script>
export default {
  name: 'WFForecastTable',
  props: {
    forecastData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      weather: null,
    };
  },
  mounted() {
    console.log('data', this.forecastData);
    // console.log(this.filterToday());
    [this.weather] = this.forecastData.list;
  },
  methods: {
    filterToday() {
      const today = new Date().toISOString().slice(0, 10);
      console.log(today);

      const todaysWeather = this.forecastData.list.filter((i) => i.dt_txt.slice(0, 10) === today);
      return todaysWeather;
    },
  },
};
</script>

<template>
  <div id="wf-forecast-table">
    <template v-if="forecastData.cod">
      <v-layout>
        <v-flex xs1>
          <v-icon>mdi-weather-cloudy</v-icon>
          {{ weather }}
        </v-flex>
      </v-layout>
    </template>

    <template v-else>
      No data damn
    </template>
  </div>
</template>

<style lang="scss">
#wf-forecast-table {
  height: 100%;
  overflow: auto;
}
</style>
