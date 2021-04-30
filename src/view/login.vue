<template>
	<div class="login">
		<div class="login-container">
			<el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="card-box login-form">
			    <h1 class="title">27号物流</h1>
			    <el-form-item prop="userName" class="item userItem">
			        <span class="svg-container">
			        	<i class="fa fa-user-o" aria-hidden="true"></i>
			        </span>
			        <el-input name="accountnum" type="text" v-model="loginForm.accountnum"  placeholder="用户账号" class="input-content"></el-input>
			    </el-form-item>
			    <el-form-item prop="password" class="item">
			        <span class="svg-container">
			        	<i class="fa fa-lock" aria-hidden="true"></i>
			        </span>
			        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="密码" class="input-content"></el-input>
			    </el-form-item>
			    <el-form-item>
			        <el-button type="primary" @click="handleLogin">
			            登录
			        </el-button>
			        <el-button type="primary">
			            <router-link to="/register">注册</router-link>
			        </el-button>
			    </el-form-item>
			</el-form>
		</div>
		<!-- <router-view></router-view> -->
	</div>
</template>
<script>
	import Hello from '@/view/home_content/hello'
	import store from './../store';
	import {getuserdata, getdriverdata} from '../network/newhttp'
	import axios from 'axios'
	export default{
		mounted:function(){
	  		getuserdata().then((res)=>{
			   this.userdata = res
		  	})
	  		getdriverdata().then((res)=>{
			   store.commit('changeDriverData',res)
			// console.log(res);
		  	})
	  },
		data(){
			
			var validateUserName=(rule, value, callback) =>{
				if(!value){
					callback(new Error("请输入用户名"));
				}	
					else{
						callback();
					}
				
			};
			var validatePass = (rule, value, callback) => {
	    	    if (value === '') {
	    	        callback(new Error('请输入密码'));
	    	    } 
	    	    else if(value.length<6){
	    	        callback(new Error('密码不能少于6位'));
	    	    }
	    	    else{
	    	    	callback();
	    	    }
    		};
			return{
				userdata:[],
				// loginForm:store.state.userInfo,
				loginForm:{
					accountnum:'',
					password:''
				},
				// username:[],
				loginRules:{
					accountnum:[
						{validator: validateUserName, trigger: 'blur' }
					],
					password:[
						{validator: validatePass, trigger: 'blur' }
					]
				},
				
			};
			
		},
		
		methods:{
			handleLogin:function(){
				for(let i=0;i<this.userdata.length;i++){
						if(this.loginForm.accountnum == this.userdata[i].accountnum){
							if(this.loginForm.password == this.userdata[i].password){
								store.commit('changeDataMut',this.userdata[i])
								this.$router.push({ path: 'home/project/smallproject',component:Hello})
								return
							}else{
								console.log('账号密码错误');
								return
							}
						}else{
							console.log('未找到该用户');
						}
					}
			}	
		},
		
	}
</script>




<style scoped>
	.login .login-container{
		position: relative;
		width: 500px;
		height: 350px;
		margin: 15% auto;
		background: #fff;
		text-align: center;
		border-radius: 5px;
	}
	.login .login-container .title{
		position: relative;
		top: 30px;
		font-family: "华文行楷"
	}
	.login .login-container .userItem{
		margin-top: 50px;

	}
	.login .login-container .item .svg-container{
		display: inline-block;
		width: 40px;
		text-align: center;
		color: #889aa4;
		font-size: 20px;
	}
	.login .login-container .item .input-content{
		display: inline-block;
		height: 47px;
    	width: 55%;
	}
	.login .login-container a{
		color: #fff;
		text-decoration: none;
	}
</style>