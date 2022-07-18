<script>
export default {
  name: 'WFTodaysWeatherSection',
  props: {
    currentWeather: {
      type: Object,
      required: true,
    },
    todaysForecast: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      todaysForecastData: null,
    };
  },
  mounted() {
    this.todaysForecastData = this.todaysForecast
      .map((i) => (i.dt_txt === this.currentWeather.dt_txt ? { ...i, isCurrent: true } : i));
  },
};
</script>

<template>
  <div id="wF-todays-weather-section">
    <v-layout align-center mt-4>
      <v-flex shrink class="text-truncate font-weight-bold date-label">
        {{ currentWeather.today.slice(0, 15) }}
      </v-flex>
    </v-layout>

    <v-layout align-center no-wrap class="todays-weather-container">
      <v-flex
        v-for="todaysWeather in todaysForecastData"
        :key="todaysWeather.dt_txt"
        class="todays-weather"
        :class="todaysWeather.isCurrent && 'current-weather'"
      >
        <v-layout>
          <v-flex class="py-1">
            {{ todaysWeather.isCurrent ?
            'NOW' : new Date(todaysWeather.dt_txt).getHours().toString().padStart(2, '0') }}
          </v-flex>
        </v-layout>

        <v-layout justify-center>
          <v-flex shrink>
            <v-img
              :src="`http://openweathermap.org/img/wn/${todaysWeather.weather[0].icon}@2x.png`"
              height="48"
              width="48"
            />
          </v-flex>
        </v-layout>

        <v-layout class="todays-weather-temperature">
          <v-flex >
            {{  Math.floor(todaysWeather.main.temp) }}°
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="scss">
#wF-todays-weather-section {
  .todays-weather-container {
    overflow: auto;

    .current-weather {
      background-color: #FFECB3;
      border-radius: 8px;

      .todays-weather-temperature {
        font-weight: 500;
        font-size: 1.5rem;
      }
    }

    .todays-weather {
      text-align: center;

      &-temperature {
        font-weight: 300;
        font-size: 1rem;
      }
    }
  }
}
</style>
