<template>
  <el-dialog 
    title="Parking Lot Information" 
    :visible.sync = "dialogvisible"
    :close-on-click-modal = "no" 
    :close-on-press-escape = "no"
    :show-close = "no"
    center
    >
      <el-form ref="parking" :model = "parking" label-position = "right" label-width="200px">

        <el-form-item label="No. of Parking slots">
          <el-input v-model = "parking.slots"></el-input>
        </el-form-item>

        <el-form-item label="No. of Cars">
            <el-input v-model = "parking.cars"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onContinue">Continue</el-button>
      </span>
    </el-dialog>
</template>

<script>
    import { mapState,mapActions } from "vuex";
    import { generateCarList } from "../helpers/generateCarList";

    export default {
        data(){
            return{
                parking :{
                slots : null,
                cars : null
                },
                no : false
            }
        },

        methods : {
            ...mapActions(['setCarsList']),

            onContinue(){
                const slots = +this.parking.slots;
                const cars = +this.parking.cars;

                if(!slots || !cars || !Number.isInteger(slots) || !Number.isInteger(cars)){
                    this.$message({
                            message: 'Please enter integer values in both the fields',
                            type: 'error'
                            });
                }
                else if(cars > slots){
                        this.$message({
                            message: 'Parking Slots must be greater than number of cars',
                            type: 'error'
                            });
                }
                else{
                    const carsList = generateCarList(slots,cars);
                    this.setCarsList({ status : false, slots : slots, carsList : carsList});
                }       
                
            }
        },

        computed : {
        ...mapState(['dialogvisible'])
        }
    }
</script>

<style>

</style>