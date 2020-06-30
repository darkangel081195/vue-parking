<template>
    <el-menu
        class="container"
        :default-active="activeLink"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router = "yes"
    >
        <el-menu-item class="menu-title">Parking Lot</el-menu-item>
        <el-menu-item index="/" :route="{name:'Home'}" class = "items">
            <i class="el-icon-s-home"></i> Home
        </el-menu-item>
        <el-menu-item index="/add" :route="{name : 'Add'}" class="items">
           <i class="el-icon-document-add"></i> Add
        </el-menu-item>
    
    </el-menu>
</template>

<script>
export default {
    data(){
        return{
            yes : true,
            activeLink : "/"
        }
    },
    watch: {
    $route (to) {
      this.activeLink = to.path;
    }
  }
}
</script>

<style scoped>
    .container{
        display : flex;
        margin-bottom: 20px;
    }
    .menu-title{
        font-size : 24px;
        padding-left : 50px;
        flex : 1;
    }

    .items{
        margin-right : 10px;
        flex : 1;
        text-align: center;
    }


</style>