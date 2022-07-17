<script>
import WFTodaysWeatherSection from './WFTodaysWeatherSection.vue';
import WFCurrentWeatherSection from './WFCurrentWeatherSection.vue';

export default {
  name: 'WFForecastTable',
  components: { WFTodaysWeatherSection, WFCurrentWeatherSection },
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
      days: [],
      weather: null,
      todaysForecastData: null,
      processedForecastData: null,
    };
  },
  mounted() {
    console.log('forecastData', this.forecastData);
    console.log('userData', this.userData);

    [this.weather] = this.forecastData.list;
    this.weather.today = new Date(this.weather.dt_txt).toString().slice(0, 21);

    this.todaysForecastData = this.filterForecastByDate(this.weather.dt_txt);
    this.processedForecastData = this.processForecastData();
  },
  methods: {
    filterForecastByDate(date) {
      return this.forecastData.list.filter((i) => i.dt_txt.slice(0, 10) === date.slice(0, 10));
    },
    processForecastData() {
      const processedData = {};

      this.forecastData.list.forEach((element, index) => {
        if ((index + 1) % 8 === 0) {
          this.days.push(element.dt_txt.slice(0, 10));
        }
      });

      this.days.forEach((date) => {
        processedData[date] = this.filterForecastByDate(date);
      });

      console.log(this.days);
      console.log(processedData);

      return processedData;
    },
  },
};
</script>

<template>
  <div id="wf-forecast-table">
    <template v-if="forecastData.cod">
      <wF-current-weather-section
        v-if="weather"
        :user-data="userData"
        :current-weather="weather"
        :forecast-data="{ city: forecastData.city }"
      />

      <template v-if="processedForecastData">
        <v-layout class="weather-table-container">
          <v-flex>
            <wF-todays-weather-section
              v-if="todaysForecastData"
              :current-weather="weather"
              :todays-forecast="todaysForecastData"
            />

            <template v-if="false">
              <v-layout
                v-for="(day, index) in days"
                :key="index"
              >
                <v-flex>
                  {{ new Date(day).toString().slice(0, 10) }}
                </v-flex>
                <template v-for="weatherForDay in processedForecastData[day]">
          <!-- v-if="`${day} ${weather.dt_txt.slice(-8)}` === weatherForDay.dt_txt" -->
          <!-- {{ new Date(weatherForDay.dt_txt).toString().slice(0, 21).replace('2022', '') }} -->
                  <v-flex
                    :key="weatherForDay.dt_txt"
                    pa-1
                  >
                    {{ weatherForDay.main.temp }}
                  </v-flex>
                </template>
              </v-layout>
            </template>
          </v-flex>
        </v-layout>
      </template>
    </template>

    <template v-else>
      No data damn
    </template>
  </div>
</template>

<style lang="scss">
#wf-forecast-table {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .city-label {
    text-align: center;
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 500;
  }

  .date-label {
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
  }

  .temperature-label {
    text-align: center;
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 500;
  }

  .weather-table-container {
    // height: fill;
  }
}
</style>
