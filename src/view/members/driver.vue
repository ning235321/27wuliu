<template>
  <div class="driver" >
    
    <br>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-form-item label="工号">
        <el-input v-model="formInline.drivernum" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" class="el-icon-search" @click="onSubmit"></el-button>
      </el-form-item> 
    <el-button class="filter-item" type="primary" @click="toReset()"  icon="edit">重置</el-button>  
    <el-button class="filter-item" type="primary" @click="handleCreate()"  icon="edit">添加</el-button>  

    </el-form>

    <!-- 表格内容 -->
    <div class="content">
      <el-table  :data="tableData"  driver_type="width: 100%" >
        <el-table-column  prop="drivernum" label="司机工号"  width="180"></el-table-column>
        <el-table-column  prop="name" label="用户名"  width="180"></el-table-column>
        <el-table-column  prop="phone" label="电话号码"  width="180"></el-table-column>
        <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" type="success" @click="editorDialogForm(scope.$index, scope.row)"> 修改</el-button>
                <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button> 
              </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 点击添加项目出现的弹窗 -->
  <el-dialog title="添加司机信息" v-model="dialogFormVisibleadd" size="tiny">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="司机姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="司机工号">
        <el-input v-model="form.drivernum"></el-input>
      </el-form-item>
      <el-form-item label="司机电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      
      <el-form-item class="center">
        <el-button type="primary" @click="handleSaveadd" :loading="editLoading">添加</el-button>
        <el-button @click="dialogFormVisibleadd = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>  


    <!-- 点击修改出现的弹窗 -->
    <el-dialog title="司机信息修改" v-model="dialogFormVisible" size="tiny" >
      <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="司机工号">
        <el-input v-model="form.drivernum"></el-input>
      </el-form-item>
      <el-form-item label="司机姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="司机电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

        <el-form-item class="center">
        <template slot-scope>
          <el-button type="primary" @click="handleDialogForm()" :loading="editLoading">确定</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
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
import store from '../../store';
import {driverDataChange, driversAdd} from '../../network/newhttp'
export default {
  name: 'driver',
  data () {
    return {
      
      dialogFormVisibleadd:false,
      dialogFormVisible:false,
      editLoading:false,//是否显示修改状态
      currentPage1: 5,
      activeIndex: '1',
      value: '',
      changedriver_type:'',
      onindex:0,
      formInline: {
        name:'',
        drivernum:'',
        phone:'',
      },
     form: {
        name:'',
        drivernum:'',
        phone:'',
},
     dataform: {
        name:'',
        drivernum:'',
        phone:'',
},
      tableData:[
                  {
        _id:'',
        name:'',
        drivernum:'',
        phone:'',
        }
                ]
      }
    },
    //实例化就获取数据
    mounted:function(){
      axios.get("http://localhost:3000/driver").then((res)=>{
         this.tableData=res.data;
        //  console.log(res);
       })
    },
    methods: {
        onSubmit() {
               let _search = this.formInline.drivernum.toLowerCase();
            let newListData = []; // 用于存放搜索出来数据的新数组
            if (_search) {
             this.tableData.filter(item => {
             if (item.drivernum.toLowerCase().indexOf(_search) !== -1) {
             newListData.push(item);
             }
            }) 
            }
            this.tableData = newListData;
        },
        toReset(){
       this.$router.go(0);

        },

        editorDialogForm(index,row){
          // console.log(index);
          this.onindex = index
          // console.log(this.onindex);
				this.dialogFormVisible = true;
				this.form={
                      name:this.tableData[this.onindex].name,
                      drivernum:this.tableData[this.onindex].drivernum,
                      phone:this.tableData[this.onindex].phone,
				};
				// this.form={
        //               name:'',
        //               drivernum:'',
        //               phone:'',
				// };
                
			},
			// 个人信息部分提交时执行的操作
			handleDialogForm(){
				this.dialogFormVisible = false;
				this.dataform=JSON.parse(JSON.stringify(this.form));
				driverDataChange(this.tableData[this.onindex]._id,JSON.stringify(this.dataform)).then(()=>{
        this.$router.go(0);
        })

			},

        
      handleSaveadd () {
       this.$confirm('确认提交吗？', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         cancelButtonClass: 'cancel'
       }).then(() => {
        let newgoodsData = new FormData();
			newgoodsData.append('name',this.form.name);
			newgoodsData.append('drivernum',this.form.drivernum);
			newgoodsData.append('phone',this.form.phone);
			driversAdd(newgoodsData).then((res)=>{
				console.log(res);
			})
      
        this.$message({
           message: "操作成功！",
           type: 'success'
        });
        this.dialogFormVisibleadd = false;
        this.$router.go(0);
       });
     },

     handleCreate(){    
      this.initform();// //每次都初始化
      this.dialogFormVisibleadd = true; 
     },

     //每次都初始化为空
     initform(){
      this.form={
        name:'',
        drivernum:'',
        phone:'',
}
     },

        
       //删除
        handleDelete (index, row) {
          axios.delete(`http://localhost:3000/driver/${this.tableData[index]._id}`)
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
  .driver{
    padding: 20px;
  }
  .driver .content{
    height: 400px;
   background: white;
  }
  .driver .block{
    text-align: center;
  }
  .driver .center{
    text-align: center;
  }
  .driver .left{
    width: 50%;
    float: left;
    text-align: center;
  }
  .driver .right{
     width: 50%;
    float: right;
    text-align: center;
  }
  .driver .lleft{
    text-align: left;
  }
  .driver .el-form-item__content {
    font-size: 23px;
  }
  .driver .content_size{
    font-size: 20px;
  }
  .el-dialog__header{
    background: #f6f6f6;
    padding-bottom: 10px;
  }
</style>
