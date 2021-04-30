<template>
  <div class="account" >
    
    <br>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-form-item label="账号">
        <el-input v-model="formInline.accountnum" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" class="el-icon-search" @click="onSubmit"></el-button>
      </el-form-item> 
    <el-button class="filter-item" type="primary" @click="toReset()"  icon="edit">重置</el-button>  

    </el-form>

    <!-- 表格内容 -->
    <div class="content">
      <el-table  :data="tableData"  account_type="width: 100%" >
        <el-table-column  prop="accountnum" label="成员账号"  width="180"></el-table-column>
       
        <el-table-column  prop="isadmin" label="成员类型"  width="180"></el-table-column>
        <el-table-column  prop="name" label="用户名"  width="180"></el-table-column>
        <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" type="success" @click="account_typeChange(scope.$index, scope.row)"> 修改</el-button>
                <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button> 
              </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 点击类型变更出现的弹窗 -->
    <el-dialog title="用户类型变更" v-model="dialogFormVisible_changeaccount_type" size="tiny" >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="用户名："><span>{{form.name}}</span> </el-form-item>

        <el-form-item label="用户类型："><span>{{form.isadmin}}</span> </el-form-item>

         <el-form-item label="变更类型为：">
          <el-select v-model="changeaccount_type" placeholder="请选择">
            <el-option label="普通用户" value="false"></el-option>
            <el-option label="管理员" value="true"></el-option>
          </el-select>
          </el-form-item>

        <el-form-item class="center">
        <template scope="scope">
          <el-button type="primary" @click="handleSave_changeaccount_type()" :loading="editLoading">确定</el-button>
          <el-button @click="dialogFormVisible_changeaccount_type = false">取消</el-button>
        </template>
        </el-form-item>

      </el-form>
    </el-dialog>   

    <!-- 分页 -->
    <div class="block">
       <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="currentPage1"
         :page-sizes="[10, 20, 30, 40]"
         :page-size="100"
         layout="total, sizes, prev, pager, next, jumper"
         :total="tableData.length">
       </el-pagination>
    </div>
    
  </div>
</template>
<script >
import axios from 'axios'
import {userDataChange} from '../../network/newhttp'
export default {
  username: 'account',
  data () {
    return {
      
      dialogFormVisible_changeaccount_type:false,
      editLoading:false,//是否显示修改状态
      currentPage1: 5,
      activeIndex: '1',
      value: '',
      changeaccount_type:'',
      formInline: {
        name:'',
        accountnum:'',
        password:'',
        isadmin:'',
      },
     form: {
        name:'',
        accountnum:'',
        password:'',
        isadmin:'',
        goodslist: []
},
      tableData:[
                  {
        _id:'',            
        name:'',
        accountnum:'',
        password:'',
        isadmin:'',
        goodslist: []
        }
                ]
      }
    },
    //实例化就获取数据
    mounted:function(){
      axios.get("http://localhost:3000/user").then((res)=>{
         this.tableData=res.data;
        //  console.log(res);
       })
    },
    methods: {
        onSubmit() {
               let _search = this.formInline.accountnum.toLowerCase();
            let newListData = []; // 用于存放搜索出来数据的新数组
            if (_search) {
             this.tableData.filter(item => {
             if (item.accountnum.toLowerCase().indexOf(_search) !== -1) {
             newListData.push(item);
             }
            }) 
            }
            this.tableData = newListData;
        },
        toReset(){
       this.$router.go(0);

        },

        
        //点击类型变更
        account_typeChange(index, row){
         this.changeaccount_type='';
         this.dialogFormVisible_changeaccount_type = true;
         this.form = Object.assign({}, row);
         this.table_index = index;
        },


        //点击类型更改确定
        handleSave_changeaccount_type () {
         this.$confirm('确认提交吗？', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           cancelButtonClass: 'cancel'
         }).then(() => {
          this.editLoading = true;//显示正在修改，圆圈跑起来
          this.form.isadmin=this.changeaccount_type;
          this.tableData[this.table_index] = this.form;
          this.tableData.splice(this.table_index, 1, this.form);
          // console.log(this.tableData[this.table_index].isadmin);
          const changedata = {
            isadmin:this.tableData[this.table_index].isadmin
          }
          userDataChange(this.tableData[this.table_index]._id,JSON.stringify(changedata))
          this.$message({
             message: "操作成功！",
             type: 'success'
           });
           this.editLoading = false;
           this.dialogFormVisible_changeaccount_type = false;
         })
        },

        
       //删除
        handleDelete (index, row) {
          axios.delete(`http://localhost:3000/user/${this.tableData[index]._id}`)
         this.tableData.splice(index, 1);
         this.$message({
           message: "操作成功！",
           type: 'success'
         });
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
    }
}
</script>
<style type="text/css">
  .account{
    padding: 20px;
  }
  .account .content{
    height: 400px;
   background: white;
  }
  .account .block{
    text-align: center;
  }
  .account .center{
    text-align: center;
  }
  .account .left{
    width: 50%;
    float: left;
    text-align: center;
  }
  .account .right{
     width: 50%;
    float: right;
    text-align: center;
  }
  .account .lleft{
    text-align: left;
  }
  .account .el-form-item__content {
    font-size: 23px;
  }
  .account .content_size{
    font-size: 20px;
  }
  .el-dialog__header{
    background: #f6f6f6;
    padding-bottom: 10px;
  }
</style>
