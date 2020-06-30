<template>
    <div>
        <el-row>
            <el-col :xs="24" :md="{span : '20', offset : '2'}">
                <el-card>
                    <h2 class="title">
                        <i class="el-icon-s-grid"></i>Parking Slots Information
                    </h2>
                    <el-table 
                        :data="filteredData" 
                        :header-cell-style="tableHeaderColor"  
                        :cell-style="cell"
                        class="table">
                        <el-table-column
                            label="Slot Number"
                            prop="slot"
                        >
                        </el-table-column>

                        <el-table-column
                            label="Registration Number"
                            prop="registration"
                        >
                        </el-table-column>

                        <el-table-column
                            label="Color"
                            prop="color"
                        >
                        </el-table-column>

                        <el-table-column>
                            <template slot="header" slot-scope="{}">
                                <el-input
                                    v-model="registration"
                                    size="mini"
                                    placeholder="Search registration number"
                                    spellcheck="false"
                                />
                            </template>
                            <template slot-scope="scope">
                                <el-popconfirm
                                    confirmButtonText='OK'
                                    cancelButtonText='No, Thanks'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="Are you sure to delete this?"
                                    @onConfirm="handleDelete(scope.$index, scope.row)"
                                >
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        slot="reference" 
                                    >
                                        Delete
                                    </el-button>
                                </el-popconfirm>
                            </template>
                        </el-table-column>

                        <el-table-column>
                            <template slot="header" slot-scope="{}">
                                <el-select v-model="color" placeholder="Color of the car" clearable>
                                    <el-option label="Red" value="Red"></el-option>
                                    <el-option label="Blue" value="Blue"></el-option>
                                    <el-option label="White" value="White"></el-option>
                                    <el-option label="Black" value="Black"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapActions,mapGetters } from "vuex";

    export default {
        data(){
            return{
                registration : '',
                color : null
            }
        },

        methods : {
            ...mapActions(['deleteCar']),

            handleDelete(index,row){
                this.deleteCar(row.slot);
            },

            tableHeaderColor({ rowIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #65b1ff;color: #fff;font-weight: 500;text-align:center'
                }  
            },
            cell(){
                return 'text-align : center'
            }
        },
        computed : {
            ...mapGetters(['filledSlots']),

            filteredData(){
                return this.filledSlots
                    .filter(data =>(!this.registration || data.registration.toLowerCase().includes(this.registration.toLowerCase()))
                        && (!this.color || data.color === this.color))
            }

        }

    }
</script>

<style scoped>
    .title,
    .cell{
        text-align: center;
    }

    .table{
        border:1px solid #ccc;
        border-radius : 4px;
    }
    
</style>