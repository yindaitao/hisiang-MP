<template>
	<view>
		<custom>外出</custom>
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal">
						<text class="icon-roundclose text-black"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					<text class="text-black text-bold">确定提交申请?</text>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-grey" @tap="onlySave">存草稿</view>
					<view class="action margin-0 flex-sub text-black solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="saveAndDoSteps">确定提交</view>
				</view>
			</view>
		</view>
		<view class="ul-swiper-box">
			<form>
				<view class="cu-form-group">
					<view class="title">外出时长单位</view>
					<picker :disabled="edit?true:false" @change="bindPickerChange1" :value="indexGooutHoursText" :range="GooutHoursTextType">
						<view class="picker">{{GooutHoursTextType[indexGooutHoursText]}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">开始日期</view>
					<picker :disabled="edit?true:false" mode="date" :value="itemData.BeginDate" :start="startDate" :end="endDate"
					 @change="bindDateChange(itemData,$event)" v-if='itemData.GooutHoursText==="Day"'>
						<view class="picker">{{itemData.BeginDate}}</view>
					</picker>
					<w-picker mode="dateTime" :startYear="startYear" :endYear="endYear" step="1" :defaultVal="defaultVal1" :current="true"
					 @confirm="onConfirm" ref="dateTime1" themeColor="#f00" v-if="itemData.GooutHoursText!=='Day'"></w-picker>
					<view :disabled="edit?true:false" @tap="toggleTab('dateTime1')" v-if="(!$mbservices.isEmpty(itemData.BeginDate)||itemData.BeginDate!=='请选择')&&itemData.GooutHoursText!=='Day'">{{itemData.BeginDate}}</view>
					<view :disabled="edit?true:false" @tap="toggleTab('dateTime1')" v-if="($mbservices.isEmpty(itemData.BeginDate)||itemData.BeginDate==='请选择')&&itemData.GooutHoursText!=='Day'">{{$mbservices.isEmpty(resultInfo1.result)?'请选择':resultInfo1.result}}</view>
				</view>
				<view class="cu-form-group">
					<view class="title">结束日期</view>
					<picker :disabled="edit?true:false" mode="date" :value="itemData.EndDate" :start="startDate" :end="endDate"
					 @change="bindDateChange1(itemData,$event)" v-if='itemData.GooutHoursText==="Day"'>
						<view class="picker">{{itemData.EndDate}}</view>
					</picker>
					<w-picker mode="dateTime1" :startYear="startYear" :endYear="endYear" step="1" :defaultVal="defaultVal2" :current="true"
					 @confirm="onConfirm1" ref="dateTime2" themeColor="#f00" v-if="itemData.GooutHoursText!=='Day'"></w-picker>
					<view :disabled="edit?true:false" @tap="toggleTab1('dateTime2')" v-if="(!$mbservices.isEmpty(itemData.EndDate)||itemData.EndDate!=='请选择')&&itemData.GooutHoursText!=='Day'">{{itemData.EndDate}}</view>
					<view :disabled="edit?true:false" @tap="toggleTab1('dateTime2')" v-if="($mbservices.isEmpty(itemData.EndDate)||itemData.EndDate==='请选择')&&itemData.GooutHoursText!=='Day'">{{$mbservices.isEmpty(resultInfo2.result)?'请选择':resultInfo2.result}}</view>
				</view>
				<view class="cu-form-group">
					<view class="title">外出时长</view>
					<input disabled="true" placeholder="外出时长" name="input" type="digit" style="text-align: right;" @input="inputHours(itemData,$event)"
					 :value="itemData.Hours">
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">外出事由</view>
				</view>
				<view class="cu-form-group">
					<textarea @input="textareaInput" :class="itemData.Cause?'value':''" maxlength="-1" :disabled="modalName!=null"
					 placeholder-class="placeholder" data-placeholder="在此输入外出事由" :value="itemData.Cause" />
					</view>
				<!-- <view class="cu-form-group">
					<view class="title">备注</view>
				</view>
				<view class="cu-form-group">
					<textarea @input="textareaInput33" :class="itemData.Remarks?'value':''" maxlength="-1" :disabled="modalName!=null"
					 id="_Remarks" name="_Remarks" placeholder-class="placeholder" data-placeholder="在此输入备注" :value="itemData.Remarks" />
					</view> -->
      </form>
    </view>
	<view class="cu-bar bg-white solid-bottom" style="position: fixed;bottom:0upx;display: flex;justify-content: space-around;z-index: 2;z-index: 999;width: 100%;">
		<view class="action" v-if="edit === false" style="width: 50%;">
			<button class="cu-btn round bg-blue shadow" data-target="DialogModal2" @tap="showModal">
				<text class="icon-upload"></text>提交
			</button>
		</view>
		<view class="action" style="width: 50%;" v-if="from === 'firstPage'">
			<button class="cu-btn round bg-blue shadow" @tap="toList">
				外出记录
			</button>
		</view>
	</view>
  </view>
</template>

<script>
import abc from "../../components/uni-datetimepicker.vue";
import wPicker from "../../../components/w-picker/w-picker.vue";
var sourceType = [["camera"], ["album"], ["camera", "album"]];
var sizeType = [["compressed"], ["original"], ["compressed", "original"]];
export default {
  components: {
    abc,
	wPicker
  },
  watch: {
    showValue(val) {
    }
  },
  data() {
    return {
		    time: Date.parse(new Date()),
			GooutHoursTextType:["天","小时"],
			indexGooutHoursText:0,
			GooutHoursTextList:[
			{
				Code:"Day",
				Name:"天",
			},{
				Code:"Hour",
				Name:"小时",
			}],
      modalName: null,
      enddate: "",
      themeColor: "",

      /*图片*/
      imageList: [],
      sourceTypeIndex: 2,
      sourceType: ["拍照", "相册", "拍照或相册"],
      sizeTypeIndex: 2,
      sizeType: ["压缩", "原图", "压缩或原图"],
      countIndex: 8,
      count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	  itemData:{
		  DocEntry:"",
		  BeginDate:"请选择",
		  EndDate: "请选择",
		  GooutTypeCode:"Goout",
		  Hours: "",
		  GooutHoursText:"Day",
		  GooutHoursTextName: "天",
		  Cause:"",
		  Remarks:"",
	},
      formList: [
        {
          id: 1,
          imageList: [],
          bigjine: ""
        }
      ],
      editEntitysList: [],
      totalJine: "0.00",
      editflag: false,
      editItem: {},
      isDoSteps: false,
	  edit:false,
	  from:"",
	  startYear:new Date().getFullYear(),
	  resultInfo1:{},
	  resultInfo2:{},
	  HolidayScheduleList:[],
	  // 第一段标准上班时间
	  FirstOnTime:"",
	  // 第二段标准下班时间
	  SecondOffTime:"",
	  // 系统初始化表里的每天工作时长
	  InitializeDay: 0,
    };
  },
  computed: {
	  startDate() {
	    return this.getDate("start");
	  },
	  endDate() {
	    return this.getDate("end");
	  },
	  endYear(){
	  	const date = new Date();
	  	let year = date.getFullYear()+2;
	  	return year;
	  },
	  defaultVal1(){
	  	const date = new Date();
	  	let year = date.getFullYear();
	  	let m = date.getMonth()+1;
	  	let d = date.getDate();
		let h = date.getHours();
		return "["+ year +","+ m +","+ d +","+ h +",'0','0']";
	  },
	  defaultVal2(){
	  	const date = new Date();
	  	let year = date.getFullYear();
	  	let m = date.getMonth()+1;
	  	let d = date.getDate();
		let h = date.getHours();
		return "["+ year +","+ m +","+ d +","+ h +",'0','0']";
	  },
  },
  methods: {
	  //获取当前时间
	              formatDate: function (value) {
	                  let date = new Date(value);
	                  let y = date.getFullYear();
	                  let MM = date.getMonth() + 1;
	                  MM = MM < 10 ? ('0' + MM) : MM;
	                  let d = date.getDate();
	                  d = d < 10 ? ('0' + d) : d;
	                  let h = date.getHours();
	                  h = h < 10 ? ('0' + h) : h;
	                  let m = date.getMinutes();
	                  m = m < 10 ? ('0' + m) : m;
	                  let s = date.getSeconds();
	                  s = s < 10 ? ('0' + s) : s;
	                  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
	              },
				  getHolidaySchedule:async function(){
				  	var ajaxJSON={
				  		pageIndex: 1,
				  		rowsPerPage: "10000",
				  		type: "Initialize",
				  		Parameter: {
				  		  LoadChildren: "NoLoad",
				  		  Conditions: [
				  		    {
				  		      FieldName: "Activated",
				  		      Operation: "EQUAL",
				  		      ConditionValue: "Y",
				  		      Relationship: "AND"
				  		    }
				  		  ]
				  		}
				  	};
				  	this.$mbservices.Request(this.$webapi.getHolidaySchedule,"POST",ajaxJSON,res=>{
				  		if(res.data.RecordCount>0)
				  		{
				  			this.HolidayScheduleList=res.data.data;
				  		}
				  		
				  	},err=>{})
				  },
				  getScheduleList:async function(){
				  	var ajaxJSON={
				  		pageIndex: 1,
				  		rowsPerPage: "10000",
				  		type: "Initialize",
				  		Parameter: {
				  		  LoadChildren: "NoLoad",
				  		  Conditions: [
				  		    {
				  		      FieldName: "Activated",
				  		      Operation: "EQUAL",
				  		      ConditionValue: "Y",
				  		      Relationship: "AND"
				  		    }
				  		  ]
				  		}
				  	};
				  	this.$mbservices.Request(this.$webapi.getScheduleList,"POST",ajaxJSON,res=>{
				  		if(res.data.RecordCount>0)
				  		{
				  			this.FirstOnTime=res.data.data[0].FirstOnTime;
				  			this.SecondOffTime = res.data.data[0].SecondOffTime;
				  		}
				  		
				  	},err=>{})
				  },
				  getInitialize:async function(){
				  	var ajaxJSON={
				  		pageIndex: 1,
				  		rowsPerPage: "10000",
				  		type: "Initialize",
				  		Parameter: {
				  		  LoadChildren: "NoLoad",
				  		  Conditions: [
				  		    {
				  		      FieldName: "Activated",
				  		      Operation: "EQUAL",
				  		      ConditionValue: "Y",
				  		      Relationship: "AND"
				  		    }
				  		  ]
				  		}
				  	};
				  	this.$mbservices.Request(this.$webapi.getInitialize,"POST",ajaxJSON,res=>{
				  		if(res.data.RecordCount>0)
				  		{
				  			this.InitializeDay = res.data.data[0].Day;
				  		}
				  		
				  	},err=>{})
				  },
		selectOption(e){},
		bindPickerChange1: function(e) {
			this.indexGooutHoursText=e.target.value;
			this.itemData.indexGooutHoursText=e.target.value;
			for(var i in this.GooutHoursTextList){
				if(this.GooutHoursTextType[this.indexGooutHoursText] === this.GooutHoursTextList[i].Name){
					this.itemData.GooutHoursText = this.GooutHoursTextList[i].Code;
					this.itemData.GooutHoursTextName = this.GooutHoursTextType[this.indexGooutHoursText];
				}
			}
			if(this.itemData.GooutHoursText==='Day'){
				this.itemData.BeginDate = "请选择";
				this.itemData.EndDate = "请选择";
			}else{
				this.itemData.BeginDate = this.formatDate(Date.parse(new Date()));
				this.itemData.EndDate = this.formatDate(Date.parse(new Date()));
			}
			if(this.itemData.GooutHoursText!=='Day'&&!this.$mbservices.isEmpty(this.resultInfo1) && !this.$mbservices.isEmpty(this.resultInfo2)){
				this.computTime();
			}
			console.log(this.itemData.BeginDate);
			console.log(this.itemData.EndDate);
		},
		showModal1(e) {
			this.modalName = e.currentTarget.dataset.target;
		},
		toList(){
			uni.navigateTo({
				url: "/pages/Goout/Gooutlist/Gooutlist",
				title: "外出记录"
			});
		},
    showModal(e) {
		if(this.$mbservices.isEmpty(this.itemData.Hours)||this.$mbservices.isEmpty(this.itemData.BeginDate)||this.$mbservices.isEmpty(this.itemData.EndDate)
		||this.itemData.BeginDate==='请选择'||this.itemData.EndDate==='请选择')
		{
			uni.showModal({
				title:"提示",
				content:"请选择正确的开始时间和结束时间",
				showCancel:false,
				
			});
			if (this.itemData.GooutHoursText==='Hour') {
				this.itemData.BeginDate = "";
				this.itemData.EndDate = "";
			}else if(this.itemData.GooutHoursText==='Day'){
				console.log("一天为单位");
			}
		return false;
		}
      this.modalName = e.currentTarget.dataset.target;
    },
    hideModal(e) {
      this.modalName = null;
    },
    onlySave() {
      this.modalName = null;
      this.isDoSteps = false;
      this.submitForm();
    },
    saveAndDoSteps() {
      this.modalName = null;
      this.isDoSteps = true;
      this.submitForm();
    },
    submitForm() {
      var _this = this;
      uni.showLoading({
        title: "正在提交..."
      });
      var ajaxJSON = {};
      if (_this.editflag) {
        _this.editEntitysList[0].Approve = _this.isDoSteps ? "Yes" : "No";
        (_this.editEntitysList[0].ApproveStatus = "Pending"),
				_this.editEntitysList[0].Remarks= _this.itemData.Remarks;
				_this.editEntitysList[0].Cause = _this.itemData.Cause;
				_this.editEntitysList[0].BeginDate = _this.itemData.BeginDate;
				_this.editEntitysList[0].EndDate = _this.itemData.EndDate;
				_this.editEntitysList[0].GooutType = _this.itemData.GooutTypeCode;
				_this.editEntitysList[0].Hours = _this.itemData.Hours;
				_this.editEntitysList[0].GooutHoursText = _this.itemData.GooutHoursText;
                _this.editEntitysList[0].UIStatus = "Modify";
        ajaxJSON = _this.editEntitysList[0];
      } else {
        ajaxJSON = {
		  ObjectType: "Goout",
		  DocNum: _this.itemData.DocEntry.toString(),
		  BeginDate: _this.itemData.BeginDate,
		  EndDate: _this.itemData.EndDate,
		  GooutType: _this.itemData.GooutTypeCode,
		  Hours: _this.itemData.Hours,
		  CreateDate: this.formatDate(Date.parse(new Date())),
		  GooutHoursText: _this.itemData.GooutHoursText,
          CreatorId: uni.getStorageSync("JSUserInfo").UserId,
		  Creator: uni.getStorageSync("JSUserInfo").UserName,
		  Cause: _this.itemData.Cause, 
          Remarks: _this.itemData.Remarks,
          Approve: _this.isDoSteps ? "Yes" : "No",
          ApproveStatus: "Pending",
          Canceled: "No",
          Closed: "No",
          Attachments: "",
          OrganizationCode: uni.getStorageSync("JSUserInfo").OrganizationCode,
		  OrganizationName: uni.getStorageSync("JSUserInfo").OrganizationName,
		  CompanyId:uni.getStorageSync("JSUserInfo").CompanyId,
		  CompanyName:uni.getStorageSync("JSUserInfo").CompanyName,
          UIStatus: "New"
        };
				}
	  console.log(ajaxJSON);
      var requestUrl = _this.editflag
        ? _this.$webapi.saveGoout
        : _this.$webapi.saveGoout;
				var _$this=_this;
      _this.$mbservices.Request(
        requestUrl,
        "POST",
        ajaxJSON,
        function(succ) {
          setTimeout(function() {
            uni.hideLoading();
          }, 1000);
          if (
            succ.data.RecordCount == undefined ||
            succ.data.RecordCount <= 0
          ) {
			  uni.showModal({
			  	title:"提示",
				content: succ.data,
				showCancel:false,
			  })
            return false;
          }
          uni.showToast({
            title: "成功"
          });
					_$this.$mbservices.setIsRefresh(true);
          uni.navigateBack({
            animationDuration: 500
          });
        },
        function(err) {
          uni.showToast({
            title: "失败:" + err.data
          });
        }
      )
	},
	inputHours(itemData, event) {
	  itemData.Hours = event.detail.value;
	},
	bindDateChange: function(itemData, e) {
	  itemData.BeginDate = e.target.value;
	  itemData.EndDate = "请选择";
	  if(this.$mbservices.isEmpty(itemData.EndDate)||itemData.EndDate==='请选择'){
	  	return;
	  }else{
		this.computTime1();
	  }
	},
	bindDateChange1: function(itemData, e) {
	  itemData.EndDate = e.target.value;
	  this.computTime1();
	},
	getDate(type) {
	  const date = new Date();
	  let year = date.getFullYear();
	  let month = date.getMonth() + 1;
	  let day = date.getDate();
	
	  if (type === "start") {
	    year = year - 60;
	  } else if (type === "end") {
	    year = year + 2;
	  }
	  month = month > 9 ? month : "0" + month;
	  day = day > 9 ? day : "0" + day;
	
	  return `${year}-${month}-${day}`;
	},
	computTime1(){
		var endTime = this.itemData.EndDate;
		endTime = endTime.replace(/-/g, '/');
		var time1 = new Date(endTime);
		time1 = time1.getTime();
		var startTime = this.itemData.BeginDate;
		startTime = startTime.replace(/-/g, '/');
		var time2 = new Date(startTime);
		time2 = time2.getTime();
		var Hours = time1 - time2;
		var ajaxJSON = {};
		this.$mbservices.Request(this.$webapi.GetCurrentMonthGooutAndTripList,"POST",ajaxJSON,res=>{
			if(res.data.RecordCount>0)
			{
				console.log(res.data.data);
				res.data.data.forEach(item => {
					var d = new Date(item.DataDate);
					let MM = d.getMonth() + 1;
					MM = MM < 10 ? ('0' + MM) : MM;
					let DD = d.getDate();
					DD = DD < 10 ? ('0' + DD) : DD;
					var times=d.getFullYear() + '-' + MM + '-' + DD;
					if(times === this.itemData.BeginDate){
						var type = "";
						if(!this.$mbservices.isEmpty(item.Goout)){
							type = "外出";
						}else if(!this.$mbservices.isEmpty(item.Trip)){
							type = "出差";
						}else if(!this.$mbservices.isEmpty(item.Leave)){
							type = "请假";
						}
						if(!this.$mbservices.isEmpty(type)){
							uni.showModal({
								title:"提示",
								content:times+"这天你已经申请了"+type,
								showCancel:false
							})
						}
						this.itemData.Hours = 0;
					}
				})
			}
			
		},err=>{})
		if(Hours < 0){
			this.itemData.BeginDate = "请选择";
			this.itemData.Hours = 0;
			return;
		}else {
			this.itemData.Hours = (parseFloat(Hours / (3600 * 1000)/24)+1).toFixed(1);
		}
	},
    onKeyInput: function(event) {
      this.formList[parseInt(event.target.id) - 1].jine = event.detail.value;
      var _cache = 0;
      this.formList.forEach(item => {
        _cache = (parseFloat(item.jine) + parseFloat(_cache)).toFixed(2);
      });
      this.totalJine = _cache.toString();
    },
    textareaInput(e) {
      this.itemData.Cause = e.detail.value;
    },
	toggleTab(mode){
		this.itemData.BeginDate = "";
		this.$refs[mode].show();
	},
	toggleTab1(mode){
		this.itemData.EndDate = "";
		this.$refs[mode].show();
	},
	onConfirm(val){
		this.resultInfo1=val;
		if(this.$mbservices.isEmpty(this.resultInfo2)){
			return;
		}else{
			this.computTime();
		}
	},
	onConfirm1(val){
		this.resultInfo2=val;
		this.computTime();
	},
	computTime(){
		this.itemData.BeginDate = this.resultInfo1.result;
		this.itemData.EndDate = this.resultInfo2.result;
		this.itemData.Hours = 0;
		var endTime = this.resultInfo2.result;
		endTime = endTime.replace(/-/g, '/');
		var time2 = new Date(endTime);
		time2 = time2.getTime();
		var startTime = this.resultInfo1.result;
		startTime = startTime.replace(/-/g, '/');
		var time1 = new Date(startTime);
		time1 = time1.getTime();
		if(time2 === time1){
			this.itemData.Hours = 0;
			return;
		}
		if(time2<time1){
			this.itemData.BeginDate = "请选择";
			this.itemData.Hours = 0;
			return;
		}
		var endDate1 = this.resultInfo2.checkArr[0]+"-"+this.resultInfo2.checkArr[1]+"-"+this.resultInfo2.checkArr[2]+" "+this.SecondOffTime;
		endDate1 = endDate1.replace(/-/g, '/');
		var Etime = new Date(endDate1);
		Etime = Etime.getTime();
		var endOnTime = this.resultInfo2.checkArr[0]+"-"+this.resultInfo2.checkArr[1]+"-"+this.resultInfo2.checkArr[2]+" "+this.FirstOnTime;
		endOnTime = endOnTime.replace(/-/g, '/');
		var EOtime = new Date(endOnTime);
		EOtime = EOtime.getTime();
		var everyDay = (Etime-EOtime)/1000/3600;
		var endHour = this.SecondOffTime.slice(0,2);
		var beginDate1 = this.resultInfo1.checkArr[0]+"-"+this.resultInfo1.checkArr[1]+"-"+this.resultInfo1.checkArr[2]+" "+this.FirstOnTime;
		beginDate1 = beginDate1.replace(/-/g, '/');
		var Btime = new Date(beginDate1);
		Btime = Btime.getTime();
		var beginHour = this.FirstOnTime.slice(0,2);
		var year2 = this.resultInfo2.checkArr[0];
		var month2 = this.resultInfo2.checkArr[1];
		var day2 = this.resultInfo2.checkArr[2];
		var hour2 = this.resultInfo2.checkArr[3];
		var minute2 = this.resultInfo2.checkArr[4];
		var seconds2 = this.resultInfo2.checkArr[5];
		var year1 = this.resultInfo1.checkArr[0];
		var month1 = this.resultInfo1.checkArr[1];
		var day1 = this.resultInfo1.checkArr[2];
		var hour1 = this.resultInfo1.checkArr[3];
		var minute1 = this.resultInfo1.checkArr[4];
		var seconds1 = this.resultInfo1.checkArr[5];
		var goouthours = time2 - time1;
		var gooutH = Math.floor(goouthours / (24 * 3600 * 1000)).toFixed(0);
		var gooutDate = "";
		if(year2!==year1 || month2!==month1){
			this.itemData.GooutHoursText === 'Day';
			this.indexGooutHoursText = 0;
			this.itemData.GooutHoursTextName === this.GooutHoursTextType[this.indexGooutHoursText] === "天";
		}else if(year2===year1 && month2===month1){
			if(day1===day2){
				gooutDate = "";
				gooutDate = year1+'-'+month1+"-"+day1;
				var ajaxJSON ={}
				this.$mbservices.Request(this.$webapi.GetCurrentMonthGooutAndTripList,"POST",ajaxJSON,res=>{
					if(res.data.RecordCount>0)
					{
						res.data.data.forEach(item => {
							var d = new Date(item.DataDate);
							let MM = d.getMonth() + 1;
							MM = MM < 10 ? ('0' + MM) : MM;
							let DD = d.getDate();
							DD = DD < 10 ? ('0' + DD) : DD;
							var times=d.getFullYear() + '-' + MM + '-' + DD;
							if(times === gooutDate){
								var type = "";
								if(!this.$mbservices.isEmpty(item.Goout)){
									type = "外出";
								}else if(!this.$mbservices.isEmpty(item.Trip)){
									type = "出差";
								}else if(!this.$mbservices.isEmpty(item.Leave)){
									type = "请假";
								}
								if(!this.$mbservices.isEmpty(type)){
									uni.showModal({
										title:"提示",
										content:times+"这天你已经申请了"+type,
										showCancel:false
									})
									this.itemData.Hours = 0;
								}
							}
						})
					}
					
				},err=>{})
				console.log(this.itemData.Hours);
				this.itemData.GooutHoursText === 'Hour';
				this.indexGooutHoursText = 1;
				this.itemData.GooutHoursTextName === this.GooutHoursTextType[this.indexGooutHoursText] === "小时";
				var date = year2+'-'+month2+'-'+day2;
				for(var i in this.HolidayScheduleList){
					console.log(date);
					if(this.HolidayScheduleList[i].Date === date){
						this.itemData.Hours = 0;
						uni.showModal({
							title:"提示",
							content:"当前时间为"+this.HolidayScheduleList[i].typeDes+"，不需要申请外出",
							showCancel:false
						})
					return;
					}else{
						if(hour1<beginHour && hour2<beginHour){
							uni.showModal({
								title:"提示",
								content:"还没开始上班，不需要申请外出",
								showCancel:false
							})
							return;
						}
						// 开始时间小于8点
						if(hour1<=beginHour){
							// 结束时间小于18点
							if(hour2<endHour){
								this.itemData.Hours = everyDay - ((Etime-time2)/1000/3600).toFixed(2);
							}else if(hour2>=endHour){
								this.itemData.Hours = (this.InitializeDay).toFixed(2);
							}
						}else if(hour1>beginHour){
							if(hour2<endHour){
								this.itemData.Hours = (everyDay).toFixed(2) - ((time1-Btime)/1000/3600).toFixed(2)-((Etime-time2)/1000/3600).toFixed(2);
							}else if(hour2>=endHour){
								this.itemData.Hours =  (everyDay).toFixed(2) - ((time1-Btime)/1000/3600).toFixed(2);
							}
						}
						return;
					}
				}
			}else{
				gooutDate = "";
				gooutDate = year1+'-'+month1+"-"+day1;
				this.$mbservices.Request(this.$webapi.GetCurrentMonthGooutAndTripList,"POST","",res=>{
					if(res.data.RecordCount>0)
					{
						console.log(res.data.data);
						res.data.data.forEach(item => {
							var d = new Date(item.DataDate);
							let MM = d.getMonth() + 1;
							MM = MM < 10 ? ('0' + MM) : MM;
							let DD = d.getDate();
							DD = DD < 10 ? ('0' + DD) : DD;
							var times=d.getFullYear() + '-' + MM + '-' + DD;
							if(times === gooutDate){
								var type = "";
								if(!this.$mbservices.isEmpty(item.Goout)){
									type = "外出";
								}else if(!this.$mbservices.isEmpty(item.Trip)){
									type = "出差";
								}else if(!this.$mbservices.isEmpty(item.Leave)){
									type = "请假";
								}
								if(!this.$mbservices.isEmpty(type)){
									uni.showModal({
										title:"提示",
										content:times+"这天你已经申请了"+type,
										showCancel:false
									})
									this.itemData.Hours = 0;
								}
								return;
							}
						})
					}
					
				},err=>{})
			this.itemData.GooutHoursText === 'Hour';
			this.indexGooutHoursText = 1;
			this.itemData.GooutHoursTextName === this.GooutHoursTextType[this.indexGooutHoursText] === "小时";
			if(hour1 === hour2){
				this.itemData.LeaveHours = ((time2 -time1)/1000/24/3600*this.InitializeDay).toFixed(2);
				console.log();
				return;
			}
			var hour = Math.floor((time2 -time1)/1000/24/3600-1*1000/24/3600);
			if(hour1<=beginHour){
				if(hour2<=beginHour){
					this.itemData.Hours = (hour*this.InitializeDay).toFixed(2);
				}else if(hour2>beginHour && hour2<endHour){
					this.itemData.Hours = (hour*this.InitializeDay+everyDay-(Etime-time2)/1000/3600).toFixed(2);
				}else if(hour2>=endHour){
					this.itemData.Hours = (hour*this.InitializeDay+everyDay).toFixed(2);
				}
			}else if(hour1>beginHour){
				if(hour1>=endHour){
					this.itemData.Hours = (hour*this.InitializeDay+everyDay).toFixed(2);
				}
				else if(hour2<endHour){
					this.itemData.Hours = (hour*this.InitializeDay+everyDay-(time1-Btime)/1000/3600-(Etime-time2)/1000/3600).toFixed(2);
				}else if(hour2>=endHour){
					this.itemData.Hours = (hour*this.InitializeDay+everyDay-(time1-Btime)/1000/3600).toFixed(2);
				}
			}
			}
		}
		if(this.itemData.GooutHoursText === 'Day'){
			this.indexGooutHoursText = 0;
			this.itemData.GooutHoursTextName === this.GooutHoursTextType[this.indexGooutHoursText] === "天";
			this.itemData.BeginDate = "请选择";
			this.itemData.EndDate = "请选择";
		}
	},
    onSelected(data) {
    },
    sourceTypeChange: function(e) {
      this.sourceTypeIndex = e.target.value;
    },
    sizeTypeChange: function(e) {
      this.sizeTypeIndex = e.target.value;
    },
    countChange: function(e) {
      this.countIndex = e.target.value;
    },
    chooseImage: async function(_item_) {
      if (this.imageList.length === 9) {
        let isContinue = await this.isFullImg();
        if (!isContinue) {
          return;
        }
      }
      var _this = this;
      uni.chooseImage({
        sourceType: sourceType[this.sourceTypeIndex],
        sizeType: sizeType[this.sizeTypeIndex],
        count:
          this.imageList.length + this.count[this.countIndex] > 9
            ? 9 - this.imageList.length
            : this.count[this.countIndex],
        success: res => {
          var imageSrc = res.tempFilePaths[0];
          res.tempFilePaths.forEach(item => {
            /* 上传图片开始 */
            uni.uploadFile({
              url: _this.$webapi.uploadImages,
              header: {
                Authorization:
                  "bearer " + uni.getStorageSync("JSUserInfo").access_token
              },
              filePath: item,
              fileType: "image",
              name: "data",
              success: res1 => {
                uni.showToast({
                  title: "上传成功",
                  icon: "none",
                  duration: 1000
                });
                var imagePath_ = {};
                if (_this.editflag) {
                  imagePath_ = {
                    retInfo: JSON.parse(res1.data),
                    url: item,
                    deleteurl: JSON.parse(res1.data)[0].filePath
                  };
                } else {
                  imagePath_ = {
                    retInfo: JSON.parse(res1.data),
                    url: item
                  };
                }
                _item_.imageList.push(imagePath_);
              },
              fail: err => {
                uni.showModal({
                  content: err.errMsg,
                  showCancel: false
                });
              }
            });
            /* 上传图片结束 */
          });
        }
      });
    },
    isFullImg: function() {
      return new Promise(res => {
        uni.showModal({
          content: "已经有9张图片了,是否清空现有图片？",
          success: e => {
            if (e.confirm) {
              this.imageList = [];
              res(true);
            } else {
              res(false);
            }
          },
          fail: () => {
            res(false);
          }
        });
      });
    },
    previewImage: function(_item_, e) {
      var current = e.target.dataset.src;
      var imagePath = [];
      _item_.imageList.forEach(item => {
        imagePath.push(item.url);
      });
      uni.previewImage({
        current: current,
        urls: imagePath
      });
    },
    deleteImage(imlist, item) {
      var _this = this;
      uni.showModal({
        title: "操作提示",
        content: "确定删除图片?",
        success: function(ret) {
          if (ret.confirm) {
            var ajaxParam = {};
            if (_this.editflag) {
              ajaxParam.path = item.deleteurl;
            } else {
              ajaxParam = { path: item.retInfo[0].filePath };
            }
            _this.$mbservices.Request(
              _this.$webapi.deleteImage,
              "POST",
              ajaxParam,
              function(res) {
                if (res.statusCode === 200) {
                  var cache = [];
                  imlist.imageList.forEach(_item => {
                    if (_item != item) {
                      cache.push(_item);
                    }
                  });
                  imlist.imageList = [];
                  cache.forEach(_item => {
                    imlist.imageList.push(_item);
                  });
                } else {
                  uni.showToast({
                    title: "有异常",
                    icon: "none"
                  });
                }
              },
              function(err) {
              }
            );
          }
        }
      });
    },
    getArrayIndex(keyValue) {
      var index = 0;
      this.resourceArray.forEach((item, _indx) => {
        if (item.ReimbursementTypeName === keyValue) {
          index = _indx;
        }
      });
      return index;
    },
    getDetailData: function() {
      this.pageIndex = parseInt(this.pageIndex) + 1;
      var ajaxJSON = {
        pageIndex: this.pageIndex,
        rowsPerPage: "10",
        type: "Initialize",
        Parameter: {
          LoadChildren: "Load",
          Conditions: [
            {
              FieldName: "DocEntry",
              Operation: "EQUAL",
              ConditionValue: this.editItem.DocEntry,
              Relationship: "AND"
            },
			{
			  FieldName: "DocEntry",
			  Operation: "EQUAL",
			  ConditionValue: this.editItem.DocEntry,
			  Relationship: "AND"
			}
          ]
        }
      };
      uni.showLoading({
        title: "拼命加载中..."
      });
      var _this = this;
      this.$mbservices.Request(
        this.$webapi.getGooutList,
        "POST",
        ajaxJSON,
        function(ret) {
          if (!ret.data.data) {
            uni.showToast({
              title: "查无数据"
            });
            return false;
          }
          //_this.formList = [];
          _this.editEntitysList = [];
          _this.editEntitysList = ret.data.data;
		  console.log(ret.data.data)
					var _$this=_this;
          ret.data.data.forEach(item => {
            if (item.ApproveStatus === "Pending") {
              item.AApproveStatus = "待审核";
            }
            if (item.ApproveStatus === "Approved") {
              item.AApproveStatus = "已批准";
            }
            if (item.ApproveStatus === "Rejected") {
              item.AApproveStatus = "已拒绝";
            }
			_$this.itemData.Remarks=item.Remarks;
			_$this.itemData.GooutTypeCode = item.GooutType;
			_$this.itemData.Hours = item.Hours;
			_$this.itemData.GooutHoursText = item.GooutHoursText;
			_$this.GooutHoursTextList.forEach((__item,__index)=>{
								  if(__item.Code===_$this.itemData.GooutHoursText)
								  {
									  _$this.itemData.indexGooutType=__index;
									  _$this.indexGooutType=__index;
									  _$this.itemData.GooutHoursTextName = __item.Name;
								  }
			});
			_$this.itemData.BeginDate = item.BeginDate;
			_$this.itemData.EndDate = item.EndDate;
			_$this.itemData.Cause = item.Cause;
			_$this.itemData.CompanyId = item.CompanyId;
			_$this.itemData.CompanyName = item.CompanyName;
            // _this.formList = [];
            //   var _pathArr =
            //     _item.Imgs != "undefined" &&
            //     _item.Imgs != null &&
            //     _item.Imgs != ""
            //       ? _item.Imgs.split("|")
            //       : [];
            //   _item.pathArr = new Array();
            //   _pathArr.forEach(_item_ => {
            //     _item.pathArr.push({
            //       retInfo: {},
            //       url: _this.$webapi.webroot + "/" + _item_,
            //       deleteurl: _item_
            //     });
            //   });
            //   _this.formList.push({
            //     id: parseInt(_indx) + 1,
            //     imageList: _item.pathArr,
            //   });
            // });
          });
          setTimeout(() => {
            uni.hideLoading();
          }, 1000);
        },
        function(ret) {
          uni.showToast({
            title: ret.errMsg,
            icon: "none",
            success: function() {
              setTimeout(function() {
                uni.navigateBack();
              }, 1000);
            }
          });
        }
      );
    },
	textareaInput33(e) {
		  this.itemData.Remarks = e.detail.value;
	},
  },
  onLoad(e) {
	this.from = JSON.parse(e.data).from;
    /* 修改传递参数 */
    if (e.flag === "modify") {
      this.editflag = true;
	  this.edit = false;
	  console.log("e.flag === modify")
    }else if(e.flag === "Original"){
    	  this.editflag = true;
    	  this.edit = true;
    	}else if(e.flag === "tasklist"){
			 this.editflag = true;
			 this.edit = true;
		}
    if (this.editflag) {
      this.editItem = JSON.parse(e.data);
      this.itemData.DocEntry=this.editItem.DocEntry;
	  uni.showLoading({
	    title: "拼命加载中..."
	  });
	  this.getHolidaySchedule();
	  this.getScheduleList();
	  this.getInitialize();
	  var _this = this;
	  setTimeout(function(){
	  		  _this.getDetailData();
	  }, 1000);
    }
    if(!this.editflag)
		{
			//最大编号
			this.$mbservices.Request(this.$webapi.maxNumGoout,'GET',{},res=>{
				this.itemData.DocEntry=res.data;
			},null);
		}
		this.getHolidaySchedule();
		this.getScheduleList();
		this.getInitialize();
  },
  onUnload() {
    (this.imageList = []), (this.sourceTypeIndex = 2);
    this.sourceType = ["拍照", "相册", "拍照或相册"];
    this.sizeTypeIndex = 2;
    this.sizeType = ["压缩", "原图", "压缩或原图"];
    this.countIndex = 8;
  }
};
</script>

<style>
/* tab bar */
.ul-uni-tab-bar {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.ul-uni-tab-bar .ul-list {
  width: 750upx;
  height: 100%;
}

.ul-uni-swiper-tab {
  width: 100%;
  white-space: nowrap;
  line-height: 80upx;
  height: 80upx;
  border-bottom: 0.1px solid #eaffea;
  text-align: -webkit-center;
}

.ul-swiper-tab-list {
  font-size: 30upx;
  width: 150upx;
  display: inline-block;
  text-align: center;
  color: #555;
}

.ul-uni-tab-bar .ul-swiper-box {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  height: calc(100% - 100rpx);
}
</style>
