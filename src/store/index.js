import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    fetchCityInfoByName(_, cityName) {
      return axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.VUE_APP_API_ID}`);
    },
    fetchCityWeather(_, cityData) {
      return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${process.env.VUE_APP_API_ID}`);
    },
  },
  modules: {
  },
});
