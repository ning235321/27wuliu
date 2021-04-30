<template>
  <div class="project" >

  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <router-link to="/home/project/smallproject">
      <el-menu-item index="1">您的包裹列表</el-menu-item>
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
      msg: '包裹',
      activeIndex:'2',
      handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      }
    }
  }
}
</script>

<style scoped>


</style>
