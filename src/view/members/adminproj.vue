<template>
  <div class="smallproject" >
  <!-- <br> -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline">

    <el-form-item label="货物单号">
      <el-input v-model="formInline.goodsnum" placeholder="货物单号"></el-input>
    </el-form-item>

    <el-form-item>
      <!-- //查询 -->
      <el-button type="success" class="el-icon-search" @click="onSubmit()"></el-button>
    </el-form-item>
    <el-button class="filter-item" type="primary" @click="toReset()"  icon="edit">重置</el-button>  

    <el-button class="filter-item" type="primary" @click="handleCreate()"  icon="edit">添加</el-button>   
  </el-form>

  <div class="content">
  <el-table  :data="tableData"  style="width: 100%" :row-class-name="tableRowClassName">
    <el-table-column  label="序号"  width="100">
    <template scope="scope">
      {{scope.$index + 1}}
    </template>
    </el-table-column>
    <el-table-column  prop="goodsnum" label="包裹单号"  width="150"></el-table-column>
    <el-table-column  prop="name" label="包裹名称"  width="150"></el-table-column>
    <el-table-column  prop="goodstype" label="类型"  width="150"></el-table-column>
    <el-table-column  prop="weight" label="重量/kg"  width="150"></el-table-column>
    <el-table-column  prop="size" label="尺寸"  width="150"></el-table-column>
    <el-table-column  prop="temperature" label="温度"  width="150"></el-table-column>
    <el-table-column  prop="humidity" label="湿度"  width="150"></el-table-column>
    <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small"  @click="showLocation(scope.$index)"> 定位详情</el-button>
            <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button> 
          </template>
        </el-table-column>
      </el-table>
  </div>

  <!-- 点击添加项目出现的弹窗 -->
  <el-dialog title="添加货物信息" v-model="dialogFormVisibleadd" size="tiny">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="包裹单号">
        <el-input v-model="form.goodsnum"></el-input>
      </el-form-item>
      <el-form-item label="包裹名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="包裹重量">
        <el-input v-model="form.weight"></el-input>
      </el-form-item>
      <el-form-item label="包裹种类">
        <!-- <el-input v-model="form.goodstype"></el-input> -->
        <el-select v-model="form.goodstype" placeholder="请选择">
            <el-option label="冷鲜" value="冷鲜"></el-option>
            <el-option label="危险" value="危险"></el-option>
            <el-option label="易碎" value="易碎"></el-option>
            <el-option label="平常物品" value="平常物品"></el-option>
            <el-option label="贵重物品" value="贵重物品"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="包裹尺寸">
        <!-- <el-input v-model="form.size"></el-input> -->
        <el-select v-model="form.size" placeholder="请选择">
            <el-option label="大" value="大"></el-option>
            <el-option label="中" value="中"></el-option>
            <el-option label="小" value="小"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="运输司机">
          <el-select v-model="form.driverdata" placeholder="请选择">
    <el-option v-for="item in this.driverdata" :key="item.index" :label="item.name" :value="item.name">
    </el-option>
  </el-select>
      </el-form-item>
      
      <el-form-item label="包裹发出地址">
        <el-input v-model="form.startplace"></el-input>
        <span><a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">点此处获取地址坐标</a></span>
      </el-form-item>
      <el-form-item label="包裹接收地址">
        <el-input v-model="form.endplace"></el-input>
      </el-form-item>
      <el-form-item class="center">
        <el-button type="primary" @click="handleSaveadd" :loading="editLoading">添加</el-button>
        <el-button @click="dialogFormVisibleadd = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>  


<!-- 点击定位出现的界面 -->
<el-dialog title="定位信息" :visible.sync="dialogLocation" customClass="customWidth">
  <div id="allmap" ></div>
  <div class="location-box">
    <h3>当前司机信息：</h3>
    <div>姓名：{{this.ondriverdata.name}}</div>
    <div>工号：{{this.ondriverdata.drivernum}}</div>
    <div>电话：{{this.ondriverdata.phone}}</div>
    <br>
    <h3>当地天气信息：</h3>
    <div>地点：{{this.onweatherdata.data.city.pname}}-{{this.onweatherdata.data.city.secondaryname}}-{{this.onweatherdata.data.city.name}}</div>
    <div>天气：{{this.onweatherdata.data.forecast[0].conditionDay}}</div>
    <div>温度：{{this.onweatherdata.data.forecast[0].tempDay}}</div>
    <div>湿度：{{this.onweatherdata.data.forecast[0].humidity}}</div>
  </div>
  <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="dialogLocation = false">取 消</el-button>
    <el-button type="primary" @click="dialogLocation = false">确 定</el-button>
  </span> -->
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
import {goodsAdd, getGoodsdata, goodsDelete,getdriverdata} from '../../network/newhttp'
import store from '../../store';
export default {
  name: 'adminproj',
  data () {
    return {
      msg: '包裹管理',
      dialogFormVisible:false,
      dialogFormVisibleadd:false,
      dialogLocation:true,
      editLoading:false,//是否显示修改状态
      currentPage1: 5,
      activeIndex: '1',
      formInline: {
         goodsnum: '',
      },
      driverdata:[],
      ondriverdata:{},
      onweatherdata:{
        data:{
          city:{
            pname:'',
            secondaryname:'',
            name:''
          },
          forecast:[{
            conditionDay:'',
            humidity:'',
            tempDay:''
          }]
        }
      },
       form: {
        name:'',
        goodsnum:'',
        temperature:'',
        humidity:'',
        goodstype:'',
        size:'',
        weight:'',
        lal:'',
        startplace:'',
        endplace:'',
        drivername:''
},

      tableData: [{
        _id:'',
        name:'',
        goodsnum:'',
        temperature:'',
        humidity:'',
        goodstype:'',
        size:'',
        weight:'',
        lal:'',
        startplace:'',
        endplace:'',
        drivername:''
}]
    }
  }, //实例化就获取数据
    mounted(){
      
    this.dialogLocation = false;
      // axios.get("http://localhost:3000/goods").then((res)=>{
      //    this.tableData=res.data;
      //  })
      getGoodsdata().then((res)=>{
         this.tableData=res;
       });
       
       getdriverdata().then((res)=>{
			   store.commit('changeDriverData',res)
			// console.log(res);
      
      this.driverdata=store.state.driverdata
		  	})
       
    },
  methods:{

    // 地图API调用
  loadJScript(index) {
    console.log(index);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    // script.src = 'http://api.map.baidu.com/getscript?v=3.0&ak=xOe5uZP8qXqUBnGzHBtzWf9BpBIvE5ze&services=&t=20210201100830';
    script.src = 'http://api.map.baidu.com/getscript?v=3.0&ak=xOe5uZP8qXqUBnGzHBtzWf9BpBIvE5ze&services=&t=20210201100830';
    script.onload = ()=>{
      this.init(index);
    }
    document.body.appendChild(script);
},
init(index) {
  
        var map = new BMap.Map("allmap");    // 创建Map实例
        let lal =  this.tableData[index].lal
        let startplace =  this.tableData[index].startplace
        let endplace =  this.tableData[index].endplace
        // console.log(lal);
        let nowlal = lal.split(',');
        let startlal = startplace.split(',');
        let endlal = endplace.split(',');
        // this.weaterlal = nowlal;
        // console.log(this.weaterlal);
        map.centerAndZoom(new BMap.Point(nowlal[0],nowlal[1]), 18);  // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
          mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
          ]
        }));
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var marker1 = new BMap.Marker(new BMap.Point(nowlal[0],nowlal[1]));
        map.addOverlay(marker1);

      let opts = {
          position: new BMap.Point(nowlal[0],nowlal[1]), // 指定文本标注所在的地理位置
          offset: new BMap.Size(20, -60) // 设置文本偏移量
      };
      // 创建文本标注对象
      let label = new BMap.Label('您的快递已到达这里，正在快马加鞭给您送过去', opts);
      // 自定义文本标注样式
      label.setStyle({
          color: 'blue',
          borderRadius: '5px',
          borderColor: '#ccc',
          padding: '10px',
          fontSize: '16px',
          height: '30px',
          lineHeight: '30px',
          fontFamily: '微软雅黑'
      });
      map.addOverlay(label);
      let driving = new BMap.DrivingRoute(map, { 
          renderOptions: { 
              map: map, 
              autoViewport: true 
          }
      });
      let start = new BMap.Point(startlal[0],startlal[1]);
      let end = new BMap.Point(endlal[0],endlal[1]);
      driving.search(start, end);
      this.getweaterdata(nowlal[1],nowlal[0])
},




     onSubmit() {
               let _search = this.formInline.goodsnum.toLowerCase();
            let newListData = []; // 用于存放搜索出来数据的新数组
            if (_search) {
             this.tableData.filter(item => {
             if (item.goodsnum.toLowerCase().indexOf(_search) !== -1) {
             newListData.push(item);
             }
            }) 
            }
            this.tableData = newListData;
        },
        toReset(){
       this.$router.go(0);

        },


    //获取天气数据
      getweaterdata(lat,lon) {
        axios({
            method: 'post',
            url: 'https://apifreelat.market.alicloudapi.com/whapi/json/aliweather/briefforecast3days',
            // data:null,
            params: {
              // lat: '39.91488908',
              // lon: '116.40387397',
              lat:lat,
              lon:lon,
              token: '443847fa1ffd4e69d929807d42c2db1b'
            },
                  headers: { 'Authorization': 'APPCODE ee7742a2ea454c70abeb905708f26945',
                  'Content-Type':'application/x-www-form-urlencoded' }
          }).then((res)=>{
            // console.log(res);
            this.onweatherdata = res.data
            console.log(this.onweatherdata.data);
          })
      },
// <!-- <div>地点：{{this.onweatherdata.data.city.pname}}-{{this.onweatherdata.data.city.secondaryname}}-{{this.onweatherdata.data.city.name}}</div>
//     <div>天气：{{this.onweatherdata.data.forecast[0].conditionDay}}</div>
//     <div>温度：{{this.onweatherdata.data.forecast[0].humidity}}</div> -->


     getDriverDataByIndex(index){
       for (let i = 0; i < this.driverdata.length; i++) {
         if(this.tableData[index].drivername == this.driverdata[i].name){
           console.log(this.driverdata[i].name);
           this.ondriverdata = this.driverdata[i]
         }
         
       }
     },


    // 显示定位窗口
     showLocation(index){
       this.getDriverDataByIndex(index);
       this.loadJScript(index);
       console.log(this.ondriverdata);
       this.dialogLocation = true;
      //  this.map(BMap) 
      
     },


    //  handleSave () {
    //    this.$confirm('确认提交吗？', '提示', {
    //      confirmButtonText: '确定',
    //      cancelButtonText: '取消',
    //      cancelButtonClass: 'cancel'
    //    }).then(() => {
    //     this.editLoading = true;//显示正在修改，圆圈跑起来
    //     this.tableData[this.table_index] = this.form;
    //     this.tableData.splice(this.table_index, 1, this.form);
    //     this.$message({
    //        message: "操作成功！",
    //        type: 'success'
    //      });
    //      this.editLoading = false;
    //      this.dialogFormVisible = false;
    //    })
    //  },

// 添加货物
     handleSaveadd () {
       if(this.form.name&&this.form.goodsnum&&this.form.goodstype&&this.form.weight&&this.form.size&&this.form.driverdata&&this.form.startplace&&this.form.endplace){
       this.$confirm('确认提交吗？', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         cancelButtonClass: 'cancel'
       }).then(() => {
        let newgoodsData = new FormData();
			newgoodsData.append('name',this.form.name);
			newgoodsData.append('goodsnum',this.form.goodsnum);
			newgoodsData.append('goodstype',this.form.goodstype);
			newgoodsData.append('weight',this.form.weight);
			newgoodsData.append('size',this.form.size);
			newgoodsData.append('drivername',this.form.driverdata);
			newgoodsData.append('temperature',0);
			newgoodsData.append('humidity',0);
			newgoodsData.append('lal',"110.42232,25.317764");
			newgoodsData.append('startplace',this.form.startplace);
			newgoodsData.append('endplace',this.form.endplace);
			goodsAdd(newgoodsData).then((res)=>{
				console.log(res);
			})
      
        this.$message({
           message: "操作成功！",
           type: 'success'
        });
        this.dialogFormVisibleadd = false;
        this.$router.go(0);
       });
       }else{
         this.$message({
           message: "请填写完整数据",
           type: 'error'
        });
       }
     },
// 删除货物
     handleDelete (index) {
      //  axios.delete(`http://localhost:3000/goods/${this.tableData[index]._id}`)
      let dlid =  this.tableData[index]._id
      console.log(dlid);
      goodsDelete(dlid).then((res)=>{
        console.log(res);
      })
       this.tableData.splice(index, 1);

      //  this.tableData.splice(index, 1);
       this.$message({
         message: "操作成功！",
         type: 'success'
       });
      //  this.$router.go(0);
     },

     handleCreate(){    
      this.initform();// //每次都初始化
      this.dialogFormVisibleadd = true; 
     },

     //每次都初始化为空
     initform(){
      this.form={
        _id:'',
        name:'',
        goodsnum:'',
        temperature:'',
        humidity:'',
        longitude:'',
        Latitude:''
        }
     },
     


      handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      },
      // handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      // }
      tableRowClassName(index) {
        if (index.goodstype == '冷鲜') {
          if(index.temperature>= 10){
            return 'warning-row';
          }
        }
        if (index.goodstype == '危险') {
          if(index.temperature>= 30){
            return 'warning-row';
          }
        }
        if(index.temperature>= 50){
            return 'warning-row';
          }
        // console.log(index);
        return '';
      }
  }
}







</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.smallproject{
  padding: 20px;
}

.smallproject .content{
 /* width: 95%;*/
  height: 400px;
  background: white;
 /* margin: 0 auto;*/
}
.smallproject .block{
  text-align: center;
}
.smallproject .center{
  text-align: center;
}

.el-table .warning-row {
    background: rgb(240, 140, 140);
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

.customWidth{
    width:80%;
    margin-top: -100px;
    /* display: none; */
}

#allmap{ 
  float: right;
 height: 700px; 
 width: 900px;
 overflow: hidden;
 margin: 0; 
}

.location-box{
  float: left;
  width: 400px;
  padding-left: 30px;
  font-size: 20px;
  line-height: 30px;
}

</style>
