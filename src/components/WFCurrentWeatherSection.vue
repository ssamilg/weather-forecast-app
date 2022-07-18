<script>
import { mapState } from 'vuex';

export default {
  name: 'WFCurrentWeatherSection',
  props: {
    currentWeather: {
      type: Object,
      required: true,
    },
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
  computed: {
    ...mapState(['imgURL', 'userName']),
  },
  mounted() {
    this.weather = this.currentWeather;
  },
};
</script>

<template>
  <div id="wf-current-weather-section">
      <v-layout v-if="weather">
        <v-flex xs4 align-self-center>
          <v-img
            :src="imgURL"
          />
            <!-- height="100%" -->
        </v-flex>

        <v-flex xs8>
          <v-layout align-center justify-center>
            <v-flex shrink class="name-label font-weight-medium">
              Weather for
              {{ userName }}
            </v-flex>

            <v-flex shrink>
              <v-img
                :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
                height="40"
                width="40"
              />
            </v-flex>
          </v-layout>

          <v-layout wrap align-center justify-end mt-2>
            <v-flex xs12 md8>
              <v-layout justify-center class="city-label">
                <v-flex class="text-truncate">
                  {{ forecastData.city.name }}
                </v-flex>
              </v-layout>

              <v-layout justify-center>
                {{ forecastData.city.country }},
                {{ weather.today.slice(-5) }}
              </v-layout>
            </v-flex>

            <v-flex xs12 md4>
              <v-layout justify-center class="temperature-label">
                {{ Math.floor(weather.main.temp) }}°
              </v-layout>

              <v-layout justify-center>
                {{ weather.weather[0].description }}
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
  </div>
</template>

<style lang="scss">
#wf-current-weather-section {

}
</style>
