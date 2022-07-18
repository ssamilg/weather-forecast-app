<script>
import WFWeeklyWeatherSection from './WFWeeklyWeatherSection.vue';
import WFTodaysWeatherSection from './WFTodaysWeatherSection.vue';
import WFCurrentWeatherSection from './WFCurrentWeatherSection.vue';

export default {
  name: 'WFForecastTable',
  components: { WFTodaysWeatherSection, WFCurrentWeatherSection, WFWeeklyWeatherSection },
  props: {
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

            <wF-weekly-weather-section
              v-if="processedForecastData"
              :processed-forecast-data="processedForecastData"
              :forecast-days="days"
            />
          </v-flex>
        </v-layout>
      </template>
    </template>

    <template v-else>
      No data !
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
}
</style>
