import { shallowMount } from '@vue/test-utils'
import Home from "../../src/views/Home.vue"
import ParkingForm from "@/components/ParkingForm";
import CarsList from "@/components/CarsList"

describe('Home.vue', () => {
  it('renders Parking form without error', () => {
    // const wrapper = shallowMount(HelloWorld, {
    //   propsData: { msg }
    // })
    // expect(wrapper.text()).toMatch(msg)

    const wrapper = shallowMount(Home);

    const parking = wrapper.findComponent(ParkingForm);

    expect(parking.exists()).toBeTruthy();
  })

  it('renders CarsList without error',()=>{
    const wrapper = shallowMount(Home);
    const carsList = wrapper.findComponent(CarsList);

    expect(carsList.exists()).toBe(true);
  })
})
