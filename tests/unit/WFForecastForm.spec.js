import { shallowMount } from '@vue/test-utils';
import WFForecastForm from '@/components/WFForecastForm.vue';
import Vuex from 'vuex';
import Vue from 'vue';

it('calls setUserData data method when button is clicked', () => {
  Vue.use(Vuex);
  const store = new Vuex.Store({
    actions: {
      fetchCountries() { return jest.fn(); },
    },
  });

  const wrapper = shallowMount(WFForecastForm, {
    store,
  });
  const setUserData = jest.fn();

  wrapper.setMethods({ setUserData });
  wrapper.find('#submit-btn').trigger('click');

  expect(setUserData).toHaveBeenCalled();
});
