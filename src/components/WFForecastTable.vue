<script>
export default {
  name: 'WFForecastTable',
  props: {
    userData: {
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
  mounted() {
    console.log('forecastData', this.forecastData);
    console.log('userData', this.userData);
    // console.log(this.filterToday());
    [this.weather] = this.forecastData.list;
    this.weather.today = new Date(this.weather.dt_txt).toString().slice(0, 21);
    this.processWeatherData();
  },
  methods: {
    filterToday() {
      const today = new Date().toISOString().slice(0, 10);
      console.log(today);

      const todaysWeather = this.forecastData.list.filter((i) => i.dt_txt.slice(0, 10) === today);
      return todaysWeather;
    },
    processWeatherData() {
      const days = [];

      this.forecastData.list.forEach((element, index) => {
        if ((index + 1) % 8 === 0) {
          days.push(element);
        }
      });

      console.log(days);
    },
  },
};
</script>

<template>
  <div id="wf-forecast-table">
    <template v-if="forecastData.cod">
      <v-layout>
        <v-flex xs4>
          <v-img
            src="https://avatars.githubusercontent.com/u/24295210?v=4"
          />
          <!-- <v-icon>mdi-weather-cloudy</v-icon> -->
          <!-- {{ weather }} -->
        </v-flex>

        <v-flex xs8>
          <v-layout align-center justify-center>
            <v-flex shrink class="name-label font-weight-medium">
              Weather for
              {{ userData.name }}
            </v-flex>
          </v-layout>

          <v-layout align-center justify-end>
            <v-flex xs8>
              <v-layout justify-center class="city-label">
                {{ forecastData.city.name }}
              </v-layout>

              <!-- <v-layout justify-center>
                {{ forecastData.city.country }}
              </v-layout> -->
            </v-flex>

            <v-flex xs4>
              <v-layout justify-center class="temperature-label">
                {{ Math.floor(weather.main.temp) }}
              </v-layout>

              <v-layout justify-center>
                {{ weather.weather[0].description }}
              </v-layout>
            </v-flex>
          </v-layout>

        </v-flex>
      </v-layout>

      <v-layout align-center justify-center>
        <v-flex shrink class="text-truncate date-label">
          {{ weather.today }}
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

  .city-label {
    text-align: center;
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 500;
  }

  .date-label {
    text-align: center;
    font-size: 1rem;
    // font-weight: 500;
  }

  .temperature-label {
    text-align: center;
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 500;
  }
}
</style>
