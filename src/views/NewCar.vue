<template>
    <div>
        <el-container>
            <el-header>
                <el-row>
                    <el-col :sm="{span:'24'}" :md="{span:'12',offset:'6'}">
                        <h3 class="title">Add the New Car Details Below</h3>
                    </el-col>
                </el-row>  
            </el-header>

            <el-main>
                <el-row>
                    <el-col :xs = "{span : '24'}" :md = "{span : '12',offset : '6'}">
                        <el-card>
                            <el-form ref="newCar" :model="newCar" label-position="right" label-width="120px" >
                                <el-row>
                                    <el-col >
                                        <el-form-item label="Reg. Number">
                                            <el-input v-model="newCar.number"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col>
                                        <el-form-item label="Color">
                                            <el-select v-model="newCar.color" placeholder="Color of the car">
                                                <el-option label="Red" value="Red"></el-option>
                                                <el-option label="Blue" value="Blue"></el-option>
                                                <el-option label="White" value="White"></el-option>
                                                <el-option label="Black" value="Black"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                
                                <el-row>
                                    <el-col>
                                        <el-button type="primary" @click="onSubmit" class="btn">
                                            ADD <i class="el-icon-s-promotion"></i>
                                        </el-button>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-card>
                    </el-col>
                </el-row>
                
            </el-main>
        </el-container>
    </div>
</template>


<script>
import { mapState, mapGetters, mapActions} from "vuex";

export default {
    name : 'NewCar',
    data(){
        return{
            newCar: {
                number: '',
                color: '',
            },

        }
    },
    methods : {
        ...mapActions(['addCar']),

        isAlreadyPresent(){
            for(let value of this.filledSlots){
                if(value.registration === this.newCar.number){
                    return true;
                }
            }

            return false;
        },

        onSubmit(){

            if(this.filledSlots.length >= this.totalSlots){
                this.$message({
                    message : 'Parking is Full!!!',
                    type : 'error'
                })
            }
            else if(this.isAlreadyPresent()){
                this.$message({
                    message : 'Registration number already present',
                    type : 'error'
                })
            }
            else{
                const pattern = new RegExp("^[A-Z]{2}-[0-9]{2}-[A-Z]{2}-[0-9]{4}$");
                if(!pattern.test(this.newCar.number)){
                    this.$message({
                        message : 'Invalid Registration number(Ex:AA-00-BB-1111)',
                        type : 'error'
                })
                }
                else{
                    this.addCar(this.newCar);
                    this.$message({
                        message : 'Car is added is to next available parking slot',
                        type : 'success'
                    })
                    this.newCar.number = "";
                    this.newCar.color = "";

                }
            }
        },
        
    },
    computed : {
      ...mapState(['totalSlots']),
      ...mapGetters(['filledSlots'])
    }
}
</script>

<style scoped>
    .title{
        color : #65b1ff;
        text-align: center;
    }

    .btn{
        float : right;
    }

</style>
