<script>
export default {
  name: 'WFWeeklyWeatherSection',
  props: {
    processedForecastData: {
      type: Object,
      required: true,
    },
    forecastDays: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<template>
  <div id="wF-weekly-weather-section">
    <v-layout align-center mt-4>
      <v-flex shrink class="text-truncate font-weight-bold">
        5 Days Forecast Report
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs2 style="text-align:left">
        <v-icon small>mdi-clock</v-icon>
      </v-flex>

      <v-flex
        v-for="hour in ['00', '03', '06', '09', '12', '15', '18', '21']"
        :key="hour"
        class="font-weight-bold"
        xs1
      >
        {{ hour }}
      </v-flex>
    </v-layout>

    <v-layout
      v-for="(day, index) in forecastDays"
      :key="index"
      class="weekly-table-row"
      align-center
    >
      <v-flex xs2 class="font-weight-bold weekly-table-cell">
        {{ new Date(day).toString().slice(0, 3) }}
      </v-flex>

      <template v-for="weatherForDay in processedForecastData[day]">
        <v-flex
          :key="weatherForDay.dt_txt"
          pa-1
          xs1
        >
          <v-layout justify-center>
            <v-flex shrink>
              <v-img
                :src="`http://openweathermap.org/img/wn/${weatherForDay.weather[0].icon}@2x.png`"
                height="36"
                width="36"
              />
            </v-flex>
          </v-layout>

          <v-layout justify-center class="weekly-table-temperature">
            {{  Math.floor(weatherForDay.main.temp) }}°
          </v-layout>
        </v-flex>
      </template>

      <v-spacer/>
    </v-layout>
  </div>
</template>

<style lang="scss">
#wF-weekly-weather-section {
  text-align: center;

  .weekly-table-row {
    border-bottom: 1px solid #e0e0e0;

    .weekly-table-cell {
      text-align:left;
    }

    .weekly-table-temperature {
      font-weight: 300;
      font-size: 1rem;
    }
  }
}
</style>
