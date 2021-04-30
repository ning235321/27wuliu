<template>
	<div class="top">
		<div>
			<span class="font-time">今天&nbsp;{{ time.month }}&nbsp;月{{ time.day }}&nbsp;日&nbsp;&nbsp;{{ todos[time.Day] }}&nbsp;&nbsp;{{ time.hours }}:{{ time.minutes }}</span>
			<ul class="menu2">
				<li>
					<el-dropdown class="dropdown">
					    <span class="el-dropdown-link dropdown-link">
					   	 	<i class="Img">
					   	 		<img src="../../assets/logo.png">
					   	 	</i>
					   	 	<span>{{per.name}}</span>
					    </span>
					    <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item>
						    	<router-link to='/home/personal' style="text-decoration:none;color:#666;">个人信息</router-link>
						    </el-dropdown-item>
						    <el-dropdown-item>
								<router-link to='/home/personal' style="text-decoration:none;color:#666;">修改密码</router-link>
								</el-dropdown-item> 
					  	</el-dropdown-menu>
					</el-dropdown>
				</li>
				<li class="exit">
					<router-link to="/">
						<i class="fa fa-sign-in" aria-hidden="true"></i>退出
					</router-link>
				</li>
			</ul>
			</div>
	</div>
</template>
<style type="text/css" scoped>
	.top{
		line-height: 50px;
		background: #fff;
	}
	
	/*时间*/
	.top .font-time{
		margin-left: 15px;
		float: left;
	}
	.top .font-time,.top .dropdown,.top .menu2 li{
		color: #666;
		font-size: 14px;
	}
	.top .menu2{
		text-align: center;		
		float: right;
		margin-right:60px; 
	}
	.top .menu2 li{
		display: inline-block;
		list-style: none;
		text-align: center;
		margin-left: 30px;
	}
	.top .menu2 .exit a{
		text-decoration: none;
		color: #666;
		font-size: 14px; 
	}
	.top .menu2 li i{
		margin-right: 10px;
	}
	.top img{
		width: 30px;
		height: 30px;
		vertical-align: middle;   /*使得图片垂直居中*/
	}
	.top .dropdown-link{
		cursor: pointer;
	}
</style>
<script>
	import store from '../../store';
	var date=new Date();
  	export default {
  		data() {
	    	return {
	    		per:store.state.data,
	    		time:{
	    			month:date.getMonth()+1,
	    			day:date.getDate(),
	    			Day:date.getDay(),
	    			hours:date.getHours(),
	    			minutes:date.getMinutes()
	    		},
	    		todos:["周日","周一","周二","周三","周四","周五","周六"]
	    	}
   		}
  	}
</script>