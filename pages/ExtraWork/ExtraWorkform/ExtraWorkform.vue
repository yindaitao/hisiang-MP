<template>
	<view>
		<custom>加班</custom>
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
				<view class="cu-form-group">
					<view class="title">加班类型</view>
					<picker :disabled="edit?true:false" @change="bindPickerChange2" :value="indexExtraWorkType" :range="ExtraWorkType">
						<view class="picker">{{ExtraWorkType[indexExtraWorkType]}}</view>
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
					<view class="title">加班时长</view>
					<input :disabled="edit?true:false" placeholder="请输入加班时长" name="input" type="digit" style="text-align: right;"
					 @input="inputHours(itemData,$event)" :value="itemData.Hours">
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">加班事由</view>
				</view>
				<view class="cu-form-group">
					<textarea @input="textareaInput" :class="itemData.Cause?'value':''" maxlength="-1" :disabled="modalName!=null"
					 placeholder-class="placeholder" data-placeholder="在此输入加班事由" :value="itemData.Cause" />
					</view>
						<view class="cu-form-group">
							<view class="title">备注</view>
						</view>
						<view class="cu-form-group">
							<textarea @input="textareaInput33" :class="itemData.Remarks?'value':''" maxlength="-1" :disabled="modalName!=null"
							 id="_Remarks" name="_Remarks" placeholder-class="placeholder" data-placeholder="在此输入备注" :value="itemData.Remarks" />
							</view>
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
			indexExtraWorkType: 0,
					ExtraWorkType:["按实际加班时长计算","按固定加班时长计算"],
					ExtraWorkTypeList:[
						{
							Code:"Fixed",
							Name:"按实际加班时长计算",
						},{
							Code:"Actucl",
							Name:"按固定加班时长计算",
						},],
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
				  ExtraWorkTypeCode:"Fixed",
				  ExtraWorkTypeName:"按实际加班时长计算",
				  Hours:"",
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
		getInvCompany:async function(){
			//invCompanys
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
			this.$mbservices.Request(this.$webapi.getInvCompany,"POST",ajaxJSON,res=>{
				if(res.data.RecordCount>0)
				{
					this.invCompanys=res.data.data;
				}
				
			},err=>{})
		},
		selectOption(e){},
		RadioChange(e) {
			this.radio = e.detail.value;
			this.itemData.InvCompanyId=e.detail.value;
			this.invCompanys.forEach(item=>{
				if(item.ACCode===e.detail.value)
				{
					this.itemData.InvCompanyName=item.ACName;
				}
			})
			this.modalName = null;
			this.radio = "";
			console.log(e);
		},
		showModal1(e) {
			this.modalName = e.currentTarget.dataset.target;
		},
    showModal(e) {
      var isNull_ = false;
      var content = "";
      this.formList.forEach(_item => {
        
      });
      if (isNull_) {
		  uni.showModal({
		  	title:"提示",
		  	content: content,
		  	showCancel:false,
		  	
		  });
        return false;
      }
      this.modalName = e.currentTarget.dataset.target;
    },
    hideModal(e) {
      this.modalName = null;
    },
	inputHours(itemData, event) {
	  itemData.Hours = event.detail.value;
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
      // var _indx = 0;
      // _this.formList.forEach(_item => {
      //   var path = "";
      //   _item.imageList.forEach(_item_ => {
      //     if (_this.editflag) {
      //       path += _item_.deleteurl + "|";
      //     } else {
      //       path += _item_.retInfo[0].filePath + "|";
      //     }
      //   });
      //   if (path.length > 0 && path.lastIndexOf("|") > 0) {
      //     path = path.substr(0, path.length - 1);
      //   }
      //  }); 
      var ajaxJSON = {};
      if (_this.editflag) {
        _this.editEntitysList[0].Approve = _this.isDoSteps ? "Yes" : "No";
        (_this.editEntitysList[0].ApproveStatus = "Pending");
		
				_this.editEntitysList[0].Remarks= _this.itemData.Remarks;
				_this.editEntitysList[0].Cause = _this.itemData.Cause;
				_this.editEntitysList[0].BeginDate = _this.itemData.BeginDate;
				_this.editEntitysList[0].EndDate = _this.itemData.EndDate;
				_this.editEntitysList[0].ExtraWorkType = _this.itemData.ExtraWorkTypeCode;
        _this.editEntitysList[0].UIStatus = "Modify";
        ajaxJSON = _this.editEntitysList[0];
      } else {
        ajaxJSON = {
		  ObjectType: "ExtraWork",
		  DocNum: _this.itemData.DocEntry,
		  BeginDate: _this.itemData.BeginDate,
		  EndDate: _this.itemData.EndDate,
		  ExtraWorkType: _this.itemData.ExtraWorkTypeCode,
		  Hours: _this.itemData.Hours,
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
      }
	  console.log(ajaxJSON)
      var requestUrl = _this.editflag
        ? _this.$webapi.saveExtraWork
        : _this.$webapi.saveExtraWork;
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
			  	title: "提示",
			  	content: succ.data,
			  	showCancel: false
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
			uni.showModal({
				title: "提示",
				content: "data: '" + JSON.stringify(err) + "'",
				showCancel: false
			});
        }
      );
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
		bindPickerChange2: function(e) {
			this.indexExtraWorkType = e.target.value;
			console.log(this.indexExtraWorkType);
			for(var i in this.ExtraWorkTypeList){
				if(this.ExtraWorkType[this.indexExtraWorkType] === this.ExtraWorkTypeList[i].Name){
					this.itemData.ExtraWorkTypeCode = this.ExtraWorkTypeList[i].Code;
					this.itemData.ExtraWorkTypeName = this.ExtraWorkType[this.indexExtraWorkType];
				}
			}
		},
	bindDateChange: function(item, e) {
      item.BeginDate = e.target.value;
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
        this.$webapi.getExtraWorkList,
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
         			_$this.itemData.ExtraWorkTypeCode = item.ExtraWorkType;
         			_$this.itemData.ExtraWorkTypeName = item.ExtraWorkTypeName;
         			_$this.ExtraWorkType.forEach((__item,__index)=>{
         								  if(__item===_$this.itemData.ExtraWorkTypeName)
         								  {
         									  _$this.itemData.indexExtraWorkType=__index;
         									  _$this.indexExtraWorkType=__index;
         								  }
         			});
					_$this.itemData.BeginDate = item.BeginDate;
					_$this.itemData.EndDate = item.EndDate;
         			_$this.itemData.InvCompanyId = item.InvCompanyId;
         			_$this.itemData.InvCompanyName = item.InvCompanyName;
           _this.formList = [];
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
		}
  },
  onLoad(e) {
		
		
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
	  /* 所属公司 */
	  this.getInvCompany();
	  var _this = this;
	  setTimeout(function(){
		  _this.getDetailData();
	  }, 1000);
    }
    if(!this.editflag)
		{
			//最大编号
			this.$mbservices.Request(this.$webapi.maxNumReimRequest,'GET',{},res=>{
				this.itemData.DocEntry=res.data;
			},null);
		}
		/* 所属公司 */
		this.getInvCompany();
  },
  onUnload() {
    this.totalJine = "0.00";
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
