<template>
	<div class="register">
		<div class="content">
			<div class="head">
				<ul>
					<li>
            <router-link to="/">
						  <i class="fa fa-user-o" aria-hidden="true"></i>返回登录
            </router-link>
					</li>
					<li>
						<i class="fa fa-question-circle" aria-hidden="true"></i>帮助
					</li>
				</ul>
			</div>
			<div class="part">
				<h1>27号物流</h1>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form1">
				  	<el-form-item label="真实姓名：" prop="name">
				   		<el-input v-model="ruleForm.name"></el-input>
				  	</el-form-item>
					<el-form-item label="用户账号：" prop="accountnum">
					   	<el-input v-model="ruleForm.accountnum"></el-input>
					</el-form-item>
					<el-form-item label="密码：" prop="password">
					   	<el-input v-model="ruleForm.password"></el-input>
					</el-form-item>
					<el-form-item label="重复密码：" prop="dbpassword">
					   	<el-input v-model="ruleForm.dbpassword"></el-input>
					</el-form-item>
					<el-form-item label="用户类型：" prop="isadmin">
					   	<el-select v-model="ruleForm.isadmin" placeholder="请选择用户类型">
							<el-option label="普通用户" value="false"></el-option>
          					<el-option label="管理员" value="true"></el-option>
					</el-select>
					</el-form-item>
				 	<el-form-item>
				    	<el-button type="primary" class="registerBtn" @click="submitForm('ruleForm')">注册</el-button>
				    	<el-button type="primary"  @click="resetForm('ruleForm')">重置</el-button>
				  	</el-form-item>
				</el-form>
			</div>
		</div>
		
	</div>
</template>
<style scoped>
	.register{
		width: 100%;
    text-align: center;
	}
	.register .head{
		line-height: 50px;
    background: #fff;
		text-align: right;
		border-bottom: 1px solid #f1f1f1;
	}
	.register .head ul li{
		list-style: none;
		display: inline-block;
		margin-left: 30px;
		color: #666;
		font-size: 14px;
	}
  .register .head a{
    color: #666;
    text-decoration: none;
  }
	.register .head ul li:last-child{
		margin-right: 100px;
	}
	.register .head ul li i{
		margin-right: 10px;
	}
	.register .part{
		width: 780px;
		margin: 0 auto;
		text-align: center;
	}
	.register .part h1{
		width: 100%;
    font-family: "华文行楷";
		line-height: 50px;
    margin-left:35px;
    margin-top: 25px; 
	}
  .register .part .form1{
    width: 400px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .register .part .registerBtn{
    margin-right: 50px;
  }
</style>
<script>
	import {getGoodsdata,userRegister} from '../network/newhttp'
  export default {
    data() {
    	var validateName = (rule, value, callback) => {
    	    if (!value) {
    	        return callback(new Error('请输入真实名字'));
    	    }
    	    else {
    	    	if (value.length>=1&&value.length<=10) {
    	    		callback();
    	    	} else {
    	       		callback(new Error('长度在3到5个字符之间'));
    	    	}
    		}
    	};
    	var validateUserName=(rule, value, callback) => {
    		if (value === '') {
    	        callback(new Error('请输入用户名'));
    	  }
        else{
          callback();
        }
    	    
    	};

		var validateIsAdmin=(rule, value, callback) => {
			callback();
    		/* if (!value) {
    	        callback(new Error('请选择用户类型'));
    	  }
        else{
          callback();
        } */}
	
    	var validatePass = (rule, value, callback) => {
    	    if (value === '') {
    	        callback(new Error('请输入密码'));
    	    }
          else if(value.length<6){
              callback(new Error('密码不能少于6位'));
          }
    	    else {
            if(this.ruleForm.dbpassword !== '') {
    	        this.$refs.ruleForm.validateField('dbpassword');
            }
            callback();
    	    }
  
    	};
    	var validatedbPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
     	 return {
	        ruleForm: {
	          name: '',
	          accountnum: '',
	          password: '',
	          dbpassword: '',
			  isadmin:''
	        },
        rules: {
          name: [
            {validator: validateName, trigger: 'blur' }
          ],
          accountnum: [
            {validator: validateUserName, trigger: 'blur' }
            
          ],
          password: [
            {validator: validatePass, trigger: 'blur' }          
          ],
          dbpassword: [
            {validator: validatedbPass, trigger: 'blur' }
          ],
          isadmin: [
            {validator: validateIsAdmin, trigger: 'blur' }
          ]

        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
			let formData = new FormData();
			formData.append('name',this.ruleForm.name);
			formData.append('accountnum',this.ruleForm.accountnum);
			formData.append('password',this.ruleForm.password);
			formData.append('isadmin',this.ruleForm.isadmin);
			formData.append('goodslist[]',[]);
			userRegister(formData).then((res)=>{
				console.log(res);
			})
			alert('注册成功')
			this.$refs[formName].resetFields();
			
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
		}
      }
    }
  
</script>