<script>
export default {
  name: 'WFTodaysWeatherSection',
  props: {
    currentWeather: {
      type: Object,
      required: true,
    },
    todaysForecast: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div id="wF-todays-weather-section">
    <v-layout align-center mt-4>
      <v-flex shrink class="text-truncate date-label">
        {{ currentWeather.today.slice(0, 15) }}
      </v-flex>
    </v-layout>

    <v-layout class="todays-weather-container">
      <v-flex
        v-for="todaysWeather in todaysForecast"
        :key="todaysWeather.dt_txt"
        class="todays-weather"
      >
        <v-layout>
          <v-flex>
            {{ new Date(todaysWeather.dt_txt).getHours().toString().padStart(2, '0') }}
          </v-flex>
        </v-layout>

        <v-layout class="todays-weather-icons">
          <v-flex>
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

    .todays-weather {
      text-align: center;
      border: 1px solid rgba($color: #000000, $alpha: 0);

      &:hover {
        border: 1px solid #e0e0e0;
        cursor: default;
      }

      &-hours {
      }

      &-temperature {
        font-weight: 500;
        font-size: 1.5rem;
      }

      &-icons {
        // background-color: #80CBC4
      }
    }
  }
}
</style>
