<template>
  <div class="project" >

  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <router-link to="/home/members/account">
      <el-menu-item index="1">成员账号</el-menu-item>
    </router-link>
    <router-link to="/home/members/adminproj">
      <el-menu-item index="2">包裹列表</el-menu-item>
    </router-link>
    <router-link to="/home/members/driver">
      <el-menu-item index="3">司机列表</el-menu-item>
    </router-link>
  </el-menu>

  <router-view ></router-view> 
  </div>
</template>
<script >

export default {
  name: 'project',
  data () {
    return {
      msg: '项目',
      activeIndex:'1',
      handleSelect(key, keyPath) {
      }
    }
  }
}
</script>

<style scoped>

</style>
