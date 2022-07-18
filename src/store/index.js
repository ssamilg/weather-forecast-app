import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    userCity: '',
    imgURL: '',
  },
  getters: {
  },
  mutations: {
    setUserName(state, value) {
      state.userName = value;
    },
    setUserCity(state, value) {
      state.userCity = value;
    },
    setImgURL(state, value) {
      state.imgURL = value;
    },
  },
  actions: {
    fetchCityInfoByName(_, cityName) {
      return axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.VUE_APP_API_ID}`);
    },
    fetchCityWeather(_, cityData) {
      return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${process.env.VUE_APP_API_ID}`);
    },
    setUserName({ commit }, value) {
      commit('setUserName', value);
    },
    setUserCity({ commit }, value) {
      commit('setUserCity', value);
    },
    setImgURL({ commit }, value) {
      commit('setImgURL', value);
    },
  },
  modules: {
  },
});
