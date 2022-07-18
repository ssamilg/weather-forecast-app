import { shallowMount } from '@vue/test-utils';
import WFForecastForm from '@/components/WFForecastForm.vue';

it('calls setUserData data method when button is clicked', () => {
  const wrapper = shallowMount(WFForecastForm);
  const setUserData = jest.fn();

  wrapper.setMethods({ setUserData });
  wrapper.find('#submit-btn').trigger('click');

  expect(setUserData).toHaveBeenCalled();
});
