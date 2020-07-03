import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ParkingForm from "../../src/components/ParkingForm.vue"

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ParkingForm.vue',()=>{
    let wrapper;
    let store ;
    let actions;
    beforeEach(()=>{
        actions = {
            setCarsList : jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
        wrapper = shallowMount(ParkingForm, {localVue,store,
                            mocks: {
                                $message : jest.fn(),
                            }
                        })

    })

    it('to test if only integer values are accepted',()=>{
        const button = wrapper.find('el-button');
        button.trigger('click');
        expect(wrapper.vm.$message).toHaveBeenCalledWith({"message": "Please enter integer values in both the fields", "type": "error"});
    })

    it('to test the values of slots are greater than cars',()=>{
        wrapper.setData({parking:{cars : 10, slots : 5}, no : 'false'});
        const btn = wrapper.find('el-button');
        btn.trigger('click');
        expect(wrapper.vm.$message).toHaveBeenCalledWith({"message": "Parking Slots must be greater than number of cars","type": "error"});
    })

    it('to tetst if actions is called',()=>{
        wrapper.setData({parking:{cars : 1, slots : 1}});
        wrapper.vm.setCarsList = jest.fn();
        const carList = [{slot : 1, registration : 'KA-00-AA-1001', color : 'Red'}]
        const btn = wrapper.find('el-button');
        btn.trigger('click');
        expect(wrapper.vm.setCarsList).toHaveBeenCalledWith({status : false, slots : 1, carsList : carList});
    })
    
})