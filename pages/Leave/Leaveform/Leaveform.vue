<template>
	<view>
		<custom>请假</custom>
		<view class="cu-bar bg-white solid-bottom" style="position: fixed;display: flex;z-index: 2;z-index: 999;width: 100%;">
			<view class="action" v-if="edit === false">
				<button class="cu-btn round bg-blue shadow" data-target="DialogModal2" @tap="showModal">
					<text class="icon-upload"></text>提交
				</button>
			</view>
		</view>
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
		<view class="ul-swiper-box margin-top" style="margin-top: 50px;">
			<form>
				<!-- <view class="cu-form-group" readonly>
					<view class="title">单号</view>
					<text class="cu-tag round bg-gray light">{{itemData.DocEntry}}</text>
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view> -->
				<view class="cu-form-group">
					<view class="title">请假类型</view>
					<picker :disabled="edit?true:false" @change="bindPickerChange2" :value="indexHolidayType" :range="HolidayType">
						<view class="picker">{{HolidayType[indexHolidayType]}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">开始日期</view>
					<picker :disabled="edit?true:false" mode="date" :value="itemData.BeginDate" :start="startDate" :end="endDate"
					 @change="bindDateChange(itemData,$event)">
						<view class="picker">{{itemData.BeginDate}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">结束日期</view>
					<picker :disabled="edit?true:false" mode="date" :value="itemData.EndDate" :start="startDate" :end="endDate"
					 @change="bindDateChange1(itemData,$event)">
						<view class="picker">{{itemData.EndDate}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">请假时长</view>
					<input :disabled="edit?true:false" placeholder="请输入请假时长" name="input" type="digit" style="text-align: right;"
					 @input="inputLeaveHours(itemData,$event)" :value="itemData.LeaveHours">
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">请假时长单位</view>
					<picker :disabled="edit?true:false" @change="bindPickerChange1" :value="indexLeaveHoursText" :range="LeaveHoursTextType">
						<view class="picker">{{LeaveHoursTextType[indexLeaveHoursText]}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">请假事由</view>
				</view>
				<view class="cu-form-group">
					<textarea @input="textareaInput" :class="itemData.Cause?'value':''" maxlength="-1" :disabled="modalName!=null"
					 placeholder-class="placeholder" data-placeholder="在此输入请假事由" :value="itemData.Cause" />
					</view>
				<view class="cu-form-group">
					<view class="title">备注</view>
				</view>
				<view class="cu-form-group">
					<textarea @input="textareaInput33" :class="itemData.Remarks?'value':''" maxlength="-1" :disabled="modalName!=null"
					 id="_Remarks" name="_Remarks" placeholder-class="placeholder" data-placeholder="在此输入备注" :value="itemData.Remarks" />
					</view>
				<block v-for="(item,index) in formList" :key="index">
					
					
          <!-- 图片开始 -->
          <view class="cu-bar bg-white">
			<view class="action">选择图片</view>
            <view class="action">{{item.imageList.length}}/9</view>
          </view>
          <view class="cu-form-group">
            <view class="grid col-4 grid-square flex-sub">
              <view class="padding-xs bg-img" :style="'background-image:url(' + item.imageList[index1].url +')'" v-for="(_item,index1) in item.imageList" :key="index1" @tap="previewImage(item,$event)" :data-url="item.imageList[index1].url">
                <view class="cu-tag bg-red" @tap.stop="deleteImage(item,_item)" :data-index="index1">
                  <text class="icon-delete"></text>
                </view>
              </view>
              <view class="padding-xs solids" @tap="chooseImage(item)" v-if="item.imageList.length<9">
                <text class="icon-cameraadd"></text>
              </view>
            </view>
          </view>
          <!-- 图片结束 -->
        </block>
      </form>
    </view>
  </view>
</template>

<script>
import abc from "../../components/uni-datetimepicker.vue";
var sourceType = [["camera"], ["album"], ["camera", "album"]];
var sizeType = [["compressed"], ["original"], ["compressed", "original"]];
export default {
  components: {
    abc
  },
  watch: {
    showValue(val) {
    }
  },
  data() {
    return {
			indexHolidayType: 0,
			HolidayType:["请选择"],
			HolidayTypeList:[],
			LeaveHoursTextType:["天","小时","周","月"],
			indexLeaveHoursText:0,
			LeaveHoursTextList:[{
				Code:"Hour",
				Name:"小时",
			},
			{
				Code:"Day",
				Name:"天",
			},
			{
				Code:"Week",
				Name:"周",
			},
			{
				Code:"Month",
				Name:"月",
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
		  BeginDate:this.getDate({format: true}),
		  EndDate: this.getDate({format: true}),
		  HolidayType: [],
		  HolidayTypeCode:"",
		  HolidayTypeName:"",
		  LeaveHours: "",
		  LeaveHoursText:"Day",
		  LeaveHoursTextName: "天",
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
    };
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    }
  },
  methods: {
		getHolidayType:async function(){
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
			this.$mbservices.Request(this.$webapi.getHolidayType,"POST",ajaxJSON,res=>{
				if(res.data.RecordCount>0)
				{
					res.data.data.forEach(item =>{
						this.HolidayType.push(item.Name)
						this.HolidayTypeList.push(item)
					})
				}
				
			},err=>{})
		},
		selectOption(e){},
		bindPickerChange1: function(e) {
			this.indexLeaveHoursText=e.target.value;
			this.itemData.indexLeaveHoursText=e.target.value;
			for(var i in this.LeaveHoursTextList){
				if(this.LeaveHoursTextType[this.indexLeaveHoursText] === this.LeaveHoursTextList[i].Name){
					this.itemData.LeaveHoursText = this.LeaveHoursTextList[i].Code;
					this.itemData.LeaveHoursTextName = this.LeaveHoursTextType[this.indexLeaveHoursText];
				}
			}
		},
		showModal1(e) {
			this.modalName = e.currentTarget.dataset.target;
		},
		bindPickerChange2: function(e) {
			this.indexHolidayType = e.target.value;
			for(var i in this.HolidayTypeList){
				if(this.HolidayType[this.indexHolidayType] === this.HolidayTypeList[i].Name){
					this.itemData.HolidayTypeCode = this.HolidayTypeList[i].Code;
					this.itemData.HolidayTypeName = this.HolidayType[this.indexHolidayType];
				}
			}
		},
    showModal(e) {
		
      var isNull_ = false;
      var content = "";
      if (isNull_) {
        uni.showToast({ title: content, icon: "none" });
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
      var _indx = 0;
      _this.formList.forEach(_item => {
        var path = "";
        _item.imageList.forEach(_item_ => {
          if (_this.editflag) {
            path += _item_.deleteurl + "|";
          } else {
            path += _item_.retInfo[0].filePath + "|";
          }
        });
        if (path.length > 0 && path.lastIndexOf("|") > 0) {
          path = path.substr(0, path.length - 1);
        }
      });
      var ajaxJSON = {};
      if (_this.editflag) {
        _this.editEntitysList[0].Approve = _this.isDoSteps ? "Yes" : "No";
        (_this.editEntitysList[0].ApproveStatus = "Pending"),
				_this.editEntitysList[0].Remarks= _this.itemData.Remarks;
				_this.editEntitysList[0].Cause = _this.itemData.Cause;
				_this.editEntitysList[0].BeginDate = _this.itemData.BeginDate;
				_this.editEntitysList[0].EndDate = _this.itemData.EndDate;
				_this.editEntitysList[0].HolidayType = _this.itemData.HolidayTypeCode;
				_this.editEntitysList[0].HolidayTypeName = _this.itemData.HolidayTypeName;
				_this.editEntitysList[0].LeaveHours = _this.itemData.LeaveHours;
				_this.editEntitysList[0].LeaveHoursText = _this.itemData.LeaveHoursText;
                _this.editEntitysList[0].UIStatus = "Modify";
        ajaxJSON = _this.editEntitysList[0];
      } else {
        ajaxJSON = {
		  ObjectType: "Leave",
		  DocNum: _this.itemData.DocEntry,
		  BeginDate: _this.itemData.BeginDate,
		  EndDate: _this.itemData.EndDate,
		  HolidayType: _this.itemData.HolidayTypeCode,
		  HolidayTypeName: _this.itemData.HolidayTypeName,
		  LeaveHours: _this.itemData.LeaveHours,
		  LeaveHoursText: _this.itemData.LeaveHoursText,
          CreatorId: parseInt(uni.getStorageSync("JSUserInfo").UserId),
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
	  console.log(ajaxJSON);
      var requestUrl = _this.editflag
        ? _this.$webapi.saveLeaveEntity
        : _this.$webapi.saveLeaveEntity;
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
            uni.showToast({
              title: "" + succ.data
            });
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
      )}
	},
	inputLeaveHours(itemData, event) {
	  itemData.LeaveHours = event.detail.value;
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
    bindPickerChange: function(e) {
      this.indexType = e.target.value;
      this.formList[parseInt(e.target.id) - 1].itemOptionIndex = parseInt(
        e.target.value
      );
      this.formList[parseInt(e.target.id) - 1].itemOptionText = this.arrayType[
        parseInt(e.target.value)
      ];
    },
		bindPickerChange3: function(e) {
			this.indexReimbursementType = e.target.value;
			for(var i in this.ReimbursementTypeList){
				if(this.ReimbursementType[this.indexReimbursementType] === this.ReimbursementTypeList[i].ReimbursementTypeName){
					this.itemData.ReimbursementTypeCode = this.ReimbursementTypeList[i].ReimbursementTypeCode;
					this.itemData.ReimbursementTypeName = this.ReimbursementType[this.indexReimbursementType];
				}
			}
		},
		getCostType:async function(){
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
			this.$mbservices.Request(this.$webapi.getCostTypeList,"POST",ajaxJSON,res=>{
				if(res.data.RecordCount>0)
				{
					res.data.data.forEach(item =>{
						this.CostType.push(item.Name)
						this.CostTypeList.push(item)
					})
				}
				
			},err=>{})
		},
    bindDateChange: function(itemData, e) {
      itemData.BeginDate = e.target.value;
    },
	bindDateChange1: function(itemData, e) {
	  itemData.EndDate = e.target.value;
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
            }
          ]
        }
      };
      uni.showLoading({
        title: "拼命加载中..."
      });
      var _this = this;
      this.$mbservices.Request(
        this.$webapi.getDepleteRequestList,
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
			_$this.itemData.HolidayTypeCode = item.HolidayType;
			_$this.itemData.HolidayTypeName = item.HolidayTypeName;
			_$this.HolidayType.forEach((__item,__index)=>{
								  if(__item===_$this.itemData.HolidayTypeName)
								  {
									  _$this.itemData.indexHolidayType=__index;
									  _$this.indexHolidayType=__index;
								  }
			});
			_$this.itemData.InvCompanyId = item.InvCompanyId;
			_$this.itemData.InvCompanyName = item.InvCompanyName;
            _this.formList = [];
            // item.ReimbursementRequestLines.forEach((_item, _indx) => {

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
		/* 初始值 */
		
		
    /* 修改传递参数 */
    if (e.flag === "modify") {
      this.editflag = true;
	  this.edit = false;
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
      // 获取请假类型
      this.getHolidayType();
	  uni.showLoading({
	    title: "拼命加载中..."
	  });
	  var _this = this;
	  setTimeout(function(){
	  		  _this.getDetailData();
	  }, 1000);
    }
    if(!this.editflag)
		{
			//最大编号
			this.$mbservices.Request(this.$webapi.maxNumLeave,'GET',{},res=>{
				this.itemData.DocEntry=res.data;
			},null);
		}
		// 获取请假类型
		this.getHolidayType();
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
