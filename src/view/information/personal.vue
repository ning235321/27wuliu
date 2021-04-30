<template>
	<div class="personal">
		<div class="personal-content">
			<div class="content-left">
				<i class="Img">
					<img src="../../assets/logo.png">
				</i>
				<p >{{ per.name }}</p>
			</div>
			<div class="content-right">
				<div class="personal-info">
					<div class="title">
						<span>个人信息</span>
						<el-button type="text" class="editor" @click="editorDialogForm">
							<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
							编辑
						</el-button>

						<!-- 编辑对话框内容 -->
						<el-dialog title="编辑个人信息" :visible.sync="dialogFormVisible" >
						  	<el-form :model="form" ref="form">
						   		<el-form-item label="用户类型:" :label-width="formLabelWidth">
									  管理员
						    	</el-form-item>
						    	<el-form-item label="姓名:" :label-width="formLabelWidth">
						      		<el-input v-model="form.name" auto-complete="off" style="width:220px"></el-input>
						    	</el-form-item>
						    	<el-form-item label="账号:" :label-width="formLabelWidth">
						      		<el-input v-model="form.accountnum"  auto-complete="off" style="width:220px"></el-input>
						    	</el-form-item>
						    	<el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
						      		<el-input v-model="form.password"  auto-complete="off" style="width:220px"></el-input>
						    	</el-form-item>
						  	</el-form>
						  <div slot="footer" class="dialog-footer">
						    <el-button @click="dialogFormVisible = false">取 消</el-button>
						    <el-button type="primary" @click="handleDialogForm">确 定</el-button>
						  </div>
						</el-dialog>


					</div>
					<div class="title-content">
						<span class="left">
							<span>姓名：</span>
							<span class="change-text">{{ per.name }}</span>
						</span>
						<span class="left">
							<span>账号：</span>
							<span class="change-text">{{ per.accountnum }}</span>
						</span>
					</div>
					<div class="title-content">
						<span class="left">
							<span>密码：</span>
							<span class="change-text">{{ per.password  }}</span>
						</span>
						<span class="left">
							<span>用户类型：</span>
							<span class="change-text">{{per.isadmin == 'true'?'管理员':'普通用户'}}</span>
						</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<style scoped>
	.personal .navBar{
		display: inline-block;	
		color: #f1f1f1;
	}
	.personal .content-left,.personal .content-right{
		display: inline-block;
		text-align: left;
	}
	.personal .content-left{
		width: 300px;
		height: 100%;
		text-align: center;
		position: relative;
		top: -500px;
	}
	.personal .content-left img{
		width: 80px;
		height: 80px;
		vertical-align: middle;  
	}
	.personal .content-left p{
		padding-left: 14px;
	}
	.personal .content-right{
		color: #AEAEAE;
		width: 700px;
	}
	.personal .content-right .personal-info{
		border: 1px solid #f1f1f1;
		border-radius: 10px;
		background: #fff;
		height: 100%;
	}
	.personal .content-right .special{
		margin-top: 15px;
	}
	.personal .content-right .personal-info .title{
		color: #666;
		font-size: 18px;
		line-height: 50px;
		border-bottom: 1px solid #f1f1f1;
	}
	.personal .content-right .personal-info .title span{
		width: 50%;
		text-align: left;
		padding-left: 25px;
	}
	.personal .content-right .personal-info .title .editor{
		width: 50%;
		text-align: right;
		margin-left: 200px;
		font-size: 18px;
	}
	.personal .content-right .title-content{
		line-height: 50px;
		border:0.5px solid #f1f1f1; 
	}
	.personal .content-right .title-content .left{
		display: inline-block;
		width: 40%;
	}
	.personal .content-right .title-content .left1{
		width: 100%;
		display: inline-block;
	}
	.personal .content-right .title-content span:first-child{
		padding-left: 13px;
	}
	.personal .content-right .change-text{
		color: #666;
	}
	.personal .editor1{
		font-size: 18px;
		margin-left: 295px;
	}

</style>
<script>
	import store from '../../store';
	import {userDataChange} from '../../network/newhttp'
	import axios from 'axios'
	export default { 
		data() {
			return{
				// 获取登录人信息
				per:store.state.data,
				// name1:'',
				// 个人信息
				personal:{
					name: '',
	    			accountnum: '',
	    			password: ''
				},
				// 个人信息弹出框状态
				dialogFormVisible: false,
				form: {
			        name: '',
	    			accountnum: '',
	    			password: ''
				},
				formLabelWidth: '120px',
			}
		},
		mounted:function(){
		},
		methods:{
			// 点击个人信息的编辑时初始化弹出框表单的内容
			editorDialogForm:function(){
				console.log(this.per.isadmin);
				this.dialogFormVisible = true;
				this.form={
			        name: this.per.name,
	    			accountnum: this.per.accountnum,
	    			password: this.per.password
				};
			},
			// 个人信息部分提交时执行的操作
			handleDialogForm:function(){
				this.dialogFormVisible = false;
				this.personal=JSON.parse(JSON.stringify(this.form));
				userDataChange(this.per._id,JSON.stringify(this.personal)).then(()=>{
					alert("请重新登录")
				this.$router.push({ path: '/'})
       this.$router.go(0);

				})
				

			},
			
		}
	}
</script>