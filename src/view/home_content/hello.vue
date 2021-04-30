<template>
  <div class="smallhome">
    <h1>欢迎来到27号物流</h1>
    <div><h2>您可以在包裹列表处查询到您的包裹状态</h2></div>
    <div><h3>在包裹列表处点击添加按钮可以在弹出框内输入您所持有的快递单号</h3></div>
    <div><h3>点击确认后该包裹的信息将加入到您的包裹列表中</h3></div>
    <div><h3>同时您可以在包裹列表的搜索框内输入您的单号来查找该单号的对应包裹</h3></div>
    <div><h3>点击重置可以回到查找前的所有包裹信息</h3></div> 
    <div><h3>点击定位详情按钮可以查看包裹当前位置、运输司机信息以及当地天气情况</h3></div> 
    <div><h3>如果当前信息标红预警，请联系工作人员对相关信息进行详细查询</h3></div> 
    <div><h2>您可以在个人信息处查询到您账户的基本信息</h2></div>
    <div><h3>点击编辑按钮可以修改您当前账号的相关信息</h3></div> 
    <div><h2>祝您使用愉快</h2></div> 
    <div><h5>如果您是管理员账号，还请阅读管理员手册以对系统进行相应的操作</h5></div> 

  </div>
</template>
<style type="text/css" scoped>
    .smallhome  {
      margin-left:15px;
      text-align: center;
      float: left;
      width: 50%;
    }
</style>
 <script>
    export default {
      data() {
        return {
        }
      },
      mounted:function(){
      },

    }
  </script>

<style scoped>
h2 {
  margin-top: 35px;
}

h3 {
  margin-top: 15px;
}

h5 {
  margin-top: 30%;
}
</style>
