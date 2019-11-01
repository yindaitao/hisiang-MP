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
		getBusinessPartner(){
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
			this.$mbservices.Request(this.$webapi.getBusinessPartner,"POST",ajaxJSON,res=>{
				if(res.data.RecordCount>0)
				{
					this.BusinessPartnerList=res.data.data;
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
		RadioChangeBP(e) {
			this.radio = e.detail.value;
			this.itemData.BPCode=e.detail.value;
			this.BusinessPartnerList.forEach(item=>{
				if(item.BPCode===e.detail.value)
				{
					this.itemData.BPName=item.BPName;
				}
			})
			this.modalName = null;
			this.radio = "";
			console.log(e);
		},
		showModal1(e) {
			this.modalName = e.currentTarget.dataset.target;
		},
		showModalBP(e) {
			this.modalName = e.currentTarget.dataset.target;
		},
    showModal(e) {
		if(this.$mbservices.isEmpty(this.itemData.ReimbursementTypeCode1))
		{
			uni.showModal({
				title:"提示",
				content:"请选择报销类型",
				showCancel:false,
				
			});
			return false;
		}
		if(this.$mbservices.isEmpty(this.itemData.CostTypeCode))
		{
			uni.showModal({
				title:"提示",
				content:"请选择费用类型",
				showCancel:false,
				
			});
			return false;
		}
      var isNull_ = false;
      var content = "";
      this.formList.forEach(_item => {
        if (
          _item.jine === "" ||
          _item.jine === undefined ||
          _item.jine === null
        ) {
          isNull_ = true;
          content = "请输入报销金额";
        }
        if (
          _item.itemOptionText === "" ||
          _item.itemOptionText === undefined ||
          _item.itemOptionText === null ||
          _item.itemOptionText === "请选择"
        ) {
          isNull_ = true;
          content = "请选择费用名称";
        }
		if (
		  _item.VatTypeName === "" ||
		  _item.VatTypeName === undefined ||
		  _item.VatTypeName === null ||
		  _item.VatTypeName === "请选择"
		) {
		  isNull_ = true;
		  content = "请选择发票类型";
		}
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
	hideModalBP(e){
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
      var _lines = new Array();
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
        _indx = parseInt(_indx) + 1;
        var lineItem = {
		  DocEntry: _this.itemData.DocEntry,
          LineNum: _indx,
          ObjectType: "ReimbursementRequest",
          Remarks: _item.itemReason,
          Amount: parseFloat(_item.jine).toFixed(2),
		  Count: _item.Count1,
          Imgs: path,
          DocDate: _this.getDate(),
          ReimbursementTypeCode:
            _this.resourceArray[_item.itemOptionIndex].ReimbursementTypeCode,
          ReimbursementTypeName: _this.arrayType[_item.itemOptionIndex],
		  VatCode: _item.VatTypeCode,
		  VatName: _item.VatTypeName,
          Canceled: "N",
          Closed: "N",
          LineStatus: "O",
          UIStatus: "New"
        };
        if (_this.editflag) {
          lineItem.DocEntry = _item.DocEntry;
        }
        _lines.push(lineItem);
      });
      var ajaxJSON = {};
      if (_this.editflag) {
        _this.editEntitysList[0].ReimbursementRequestLines.forEach(
          _calcuItem => {
            var _ishave = false;
            _lines.forEach(__option => {
              if (_calcuItem.DocEntry === __option.DocEntry) {
                _calcuItem.UIStatus = "Modify";
                _calcuItem.Amount = __option.Amount;
                _calcuItem.ReimbursementTypeCode =
                  __option.ReimbursementTypeCode;
                _calcuItem.ReimbursementTypeName =
                  __option.ReimbursementTypeName;
                (_calcuItem.Remarks = __option.Remarks),
                  (_calcuItem.Imgs = __option.Imgs);
                _calcuItem.DocDate = __option.DocDate;
                _ishave = true;
              }
            });
            if (!_ishave) {
              _calcuItem.UIStatus = "Delete";
            }
          }
        );
        _this.editEntitysList[0].Approve = _this.isDoSteps ? "Yes" : "No";
        (_this.editEntitysList[0].ApproveStatus = "Pending"),
          (_this.editEntitysList[0].Amount = parseFloat(
            _this.totalJine
          ).toFixed(2));
		  (_this.editEntitysList[0].ReimbursementAmount = parseFloat(
		    _this.totalJine
		  ).toFixed(2));
				_this.editEntitysList[0].PayType=_this.itemData.PayTypeCode;
				_this.editEntitysList[0].AccountCode=_this.itemData.AccountCode;
				_this.editEntitysList[0].AccountName=_this.itemData.AccountName;
				_this.editEntitysList[0].Bank=_this.itemData.Bank;
				_this.editEntitysList[0].BPCode=_this.itemData.BPCode;
				_this.editEntitysList[0].BPName=_this.itemData.BPName;
				_this.editEntitysList[0].Remarks= _this.itemData.Remarks;
				_this.editEntitysList[0].InvCompanyId=_this.itemData.InvCompanyId;
				_this.editEntitysList[0].InvCompanyName=_this.itemData.InvCompanyName;
				_this.editEntitysList[0].InvOrganizationCode=uni.getStorageSync("JSUserInfo").OrganizationCode;
				_this.editEntitysList[0].InvOrganizationName=uni.getStorageSync("JSUserInfo").OrganizationName;
				_this.editEntitysList[0].CostTypeCode= _this.itemData.CostTypeCode;
				_this.editEntitysList[0].CostTypeName=_this.itemData.CostTypeName;
				_this.editEntitysList[0].ReimbursementType = _this.itemData.ReimbursementTypeCode1;
				_this.editEntitysList[0].ShareType = _this.itemData.ShareType;
        _this.editEntitysList[0].UIStatus = "Modify";
        ajaxJSON = _this.editEntitysList[0];
      } else {
        ajaxJSON = {
          DocNum: this.itemData.DocEntry,
          ObjectType: "ReimbursementRequest",
          CreatorId: parseInt(uni.getStorageSync("JSUserInfo").UserId),
		  Creator: uni.getStorageSync("JSUserInfo").UserName,
          Remarks: _this.itemData.Remarks,
          Approve: _this.isDoSteps ? "Yes" : "No",
          ApproveStatus: "Pending",
          Canceled: "No",
          Closed: "No",
          Amount: parseFloat(_this.totalJine).toFixed(2),
          Attachments: "",
          Imgs: "",
          DocDate: _this.getDate(),
          OrganizationCode: uni.getStorageSync("JSUserInfo").OrganizationCode,
		  OrganizationName: uni.getStorageSync("JSUserInfo").OrganizationName,
		  CompanyId:uni.getStorageSync("JSUserInfo").CompanyId,
		  CompanyName:uni.getStorageSync("JSUserInfo").CompanyName,
		  PayType:_this.itemData.PayTypeCode,
		  AccountCode:_this.itemData.AccountCode,
		  Bank:_this.itemData.Bank,
	      AccountName: _this.itemData.AccountName,
		  BPCode: _this.itemData.BPCode,
		  BPName: _this.itemData.BPName,
          ReimbursementType: _this.itemData.ReimbursementTypeCode1,
          ShareType: _this.itemData.ShareType,
		  InvOrganizationCode: uni.getStorageSync("JSUserInfo").OrganizationCode,
		  InvOrganizationName: uni.getStorageSync("JSUserInfo").OrganizationName,
		  CostTypeCode: _this.itemData.CostTypeCode,
		  CostTypeName: _this.itemData.CostTypeName,
		  ReimbursementAmount: parseFloat(_this.totalJine).toFixed(2),
		  InvCompanyId:_this.itemData.InvCompanyId,
		  InvCompanyName:_this.itemData.InvCompanyName,
          ReimbursementRequestLines: _lines,
          UIStatus: "New"
        };
      }
	  console.log(ajaxJSON)
      var requestUrl = _this.editflag
        ? _this.$webapi.submitCostForm
        : _this.$webapi.submitCostForm;
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
	inputNumAN(event){
		this.itemData.AccountName=event.detail.value;
	},
    inputNum(item, event) {
      item.jine = event.detail.value;
      if (parseFloat(item.jine).toFixed(2) > 0) {
        item.bigjine = this.$mbservices.smalltoBIG(item.jine);
        this.totalJine = "0.00"; //parseFloat(parseFloat(this.totalJine) +parseFloat(item.jine)).toFixed(2);
        var cacheJIne = "0.00";
        this.formList.forEach(_item => {
          cacheJIne = parseFloat(
            parseFloat(cacheJIne) + parseFloat(_item.jine)
          ).toFixed(2);
        });
        this.totalJine = cacheJIne;
      } else {
        item.bigjine = "";
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
      this.formList[parseInt(e.target.id) - 1].itemReason = e.detail.value;
    },
    addOption(e) {
      this.formList.push({
        id: this.formList.length + 1,
        name: "",
        jine: "",
        itemDate: this.getDate(),
        itemOptionIndex: 0,
        itemOptionText: this.arrayType[0],
        itemReason: "",
        imageList: [],
        bigjine: "",
		Count1: 1,
		VatTypeCode:"",
		VatTypeName:"请选择",
		indexVatType: 0,
      });
    },
    deleteOption(e) {
      if (this.formList.length === 1) {
        return false;
      }
      var cache = new Array();
      this.formList.forEach(item => {
        if (item.id != e.id) {
          cache.push(item);
        }
      });
      this.formList = [];
      var index = 1;
      var _cache = 0;
      cache.forEach(item => {
        item.id = index;
        _cache = (
          parseFloat(item.jine === "" ? "0.00" : item.jine) + parseFloat(_cache)
        ).toFixed(2);
        this.formList.push(item);
        index++;
      });
      this.totalJine = _cache;
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
		bindPickerChange1: function(e) {
			this.indexPayType=e.target.value;
			this.itemData.indexPayType=e.target.value;
			for(var i in this.PayTypeList){
				if(this.PayType[this.indexPayType] === this.PayTypeList[i].Name){
					this.itemData.PayTypeCode = this.PayTypeList[i].Code;
					this.itemData.PayTypeName = this.PayType[this.indexPayType];
				}
			}
			
			// if (this.PayType[this.indexPayType] != "BankToUser") {this.itemData.Bank=this.PayType[this.indexPayType];}
		 //    else {this.itemData.Bank="";}
		},
		bindPickerChange2: function(e) {
			this.indexCostType = e.target.value;
			for(var i in this.CostTypeList){
				if(this.CostType[this.indexCostType] === this.CostTypeList[i].Name){
					this.itemData.CostTypeCode = this.CostTypeList[i].Code;
					this.itemData.CostTypeName = this.CostType[this.indexCostType];
				}
			}
		},
		bindPickerChange3: function(e) {
			this.indexReimbursementType = e.target.value;
			for(var i in this.ReimbursementTypeList){
				if(this.ReimbursementNameList[this.indexReimbursementType] === this.ReimbursementTypeList[i].Name){
					this.itemData.ReimbursementTypeCode1 = this.ReimbursementTypeList[i].Code;
					this.itemData.ReimbursementTypeName1 = this.ReimbursementNameList[this.indexReimbursementType];
				}
			}
		},
		bindPickerChange4: function(item,e) {
			var _this = this;
			item.indexVatType = e.target.value;
			for(var i in _this.VatTypeList){
				if(_this.VatType[item.indexVatType] === _this.VatTypeList[i].Name){
					item.VatTypeCode = _this.VatTypeList[i].Code;
					item.VatTypeName = _this.VatType[item.indexVatType];
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
    getVatRecords:async function(){
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
			this.$mbservices.Request(this.$webapi.getVatRecords,"POST",ajaxJSON,res=>{
				if(res.data.RecordCount>0)
				{
					res.data.data.forEach(item =>{
						this.VatType.push(item.Name)
						this.VatTypeList.push(item)
					})
				}
				
			},err=>{})
		},
	bindDateChange: function(item, e) {
      item.itemDate = e.target.value;
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
        this.$webapi.getReimList,
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
		  console.log(ret.data.data)
          _this.editEntitysList = ret.data.data;
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
            item.Amount = parseFloat(item.Amount).toFixed(2);
						_$this.itemData.PayTypeCode=item.PayType;
						_$this.itemData.AccountCode=item.AccountCode;
						_$this.itemData.Bank=item.Bank;
						_$this.itemData.AccountName = item.AccountName;
						_$this.itemData.InvCompanyId = item.InvCompanyId;
						_$this.invCompanys.forEach(item => {
							if(item.ACCode===_$this.itemData.InvCompanyId)
							{
								_$this.itemData.InvCompanyName=item.ACName;
							}
						})
						_$this.itemData.BPCode = item.BPCode;
						_$this.BusinessPartnerList.forEach(item => {
							if(item.BPCode===_$this.itemData.BPCode)
							{
								_$this.itemData.BPName=item.BPName;
							}
						})
						_$this.itemData.Remarks=item.Remarks;
						_$this.PayTypeList.forEach(inner => {
							if (inner.Code === _$this.itemData.PayTypeCode) {
								_$this.itemData.PayTypeName = inner.Name;
							}
						})
						_$this.PayType.forEach((_item,index)=>{
											  if(_item===_$this.itemData.PayTypeName)
											  {
												  _$this.indexPayType=index;
												  _$this.itemData.indexPayType=index;
													
											  }
						});
						_$this.itemData.CostTypeCode = item.CostTypeCode;
						_$this.itemData.CostTypeName = item.CostTypeName;
						_$this.CostType.forEach((_item,index)=>{
											  if(_item===_$this.itemData.CostTypeName)
											  {
												  _$this.indexCostType=index;
												  _$this.itemData.indexCostType=index;
													
											  }
						});
						_$this.itemData.ReimbursementTypeCode1 = item.ReimbursementType;
						_$this.ReimbursementTypeList.forEach(inner => {
							if (inner.Code === _$this.itemData.ReimbursementTypeCode1) {
								_$this.itemData.ReimbursementTypeName1 = inner.Name;
							}
						})
						_$this.ReimbursementNameList.forEach((_item,_index)=>{
											  if(_item===_$this.itemData.ReimbursementTypeName1)
											  {
												  _$this.indexReimbursementType=_index;
												  _$this.itemData.indexReimbursementType=_index;
													
											  }
						});
            _this.formList = [];
            _this.totalJine = parseFloat(item.Amount).toFixed(2);
            item.ReimbursementRequestLines.forEach((_item, _indx) => {

              var _pathArr =
                _item.Imgs != "undefined" &&
                _item.Imgs != null &&
                _item.Imgs != ""
                  ? _item.Imgs.split("|")
                  : [];
              _item.pathArr = new Array();
              _pathArr.forEach(_item_ => {
                _item.pathArr.push({
                  retInfo: {},
                  url: _this.$webapi.webroot + "/" + _item_,
                  deleteurl: _item_
                });
              });
             _$this.VatType.forEach((__item,__index)=>{
				 console.log()
             					  if(__item===_item.VatName)
             					  {
             						  _item.indexVatType=__index;
             					  }
             });
              _this.formList.push({
                id: parseInt(_indx) + 1,
                DocEntry: _item.DocEntry,
                name: "",
                jine: parseFloat(_item.Amount)
                  .toFixed(2)
                  .toString(),
                itemDate: _item.DocDate,
                itemOptionIndex: _this.getArrayIndex(
                  _item.ReimbursementTypeName
                ),
                itemOptionText: _item.ReimbursementTypeName,
                itemReason: _item.Remarks,
                imageList: _item.pathArr,
				VatTypeCode: _item.VatCode,
				VatTypeName: _item.VatName,
				indexVatType: _item.indexVatType,
				Count1: _item.Count,
                bigjine: _this.$mbservices.smalltoBIG(
                  parseFloat(_item.Amount).toFixed(2)
                )
              });
            });
            //_this.formList.push(item);
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
		inputNum11(event){
			this.itemData.AccountCode=event.detail.value;
		},
		inputNum22(event){
			this.itemData.Bank=event.detail.value;
		},
		inputNumCount1(item,event){
			item.Count1=event.detail.value;
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
	  // 费用类型
	  this.getCostType();
	  // 发票类型
	  this.getVatRecords();
	  /* 所属公司 */
	  this.getInvCompany();
	  // 收款公司
	  this.getBusinessPartner();
	  /* 初始化报销类型 */
	  var ajaxJSON = {
	    pageIndex: 0,
	    rowsPerPage: "10000",
	    type: "Initialize",
	    Parameter: {
	      LoadChildren: "NoLoad",
	      Conditions: [
	  				{ FieldName: "Activated", Operation: "EQUAL", ConditionValue: "Y", Relationship: "AND" },{ FieldName: "DataType", Operation: "EQUAL", ConditionValue: "P", Relationship: "AND" }
	  			]
	    }
	  };
	  var _this = this;
	  this.$mbservices.Request(
	    this.$webapi.getRemTypeList,
	    "POST",
	    ajaxJSON,
	    function(success) {
	      if (success.statusCode === 200) {
			  _this.arrayType = [];
	        _this.resourceArray = [];
	        success.data.data.forEach(_item => {
	          _this.arrayType.push(_item.ReimbursementTypeName);
	          _this.resourceArray.push(_item);
	        });
	      }
	    },
	    function(err) {
	      uni.showToast({
	        title: "获取报销类型失败",
	        icon: "none"
	      });
	    }
	  );
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
			this.$mbservices.Request(this.$webapi.maxNumReimRequest,'GET',{},res=>{
				this.itemData.DocEntry=res.data;
			},null);
		}
		/* 所属公司 */
		this.getInvCompany();
		// 收款公司
		this.getBusinessPartner();
		// 费用类型
		this.getCostType();
		// 发票类型
		this.getVatRecords();
    /* 初始化报销类型 */
    var ajaxJSON = {
      pageIndex: 0,
      rowsPerPage: "10000",
      type: "Initialize",
      Parameter: {
        LoadChildren: "NoLoad",
        Conditions: [
					{ FieldName: "Activated", Operation: "EQUAL", ConditionValue: "Y", Relationship: "AND" },{ FieldName: "DataType", Operation: "EQUAL", ConditionValue: "P", Relationship: "AND" }
				]
      }
    };
    var _this = this;
    this.$mbservices.Request(
      this.$webapi.getRemTypeList,
      "POST",
      ajaxJSON,
      function(success) {
        if (success.statusCode === 200) {
          console.log(_this.arrayType)
          _this.resourceArray = [];
          success.data.data.forEach(_item => {
            _this.arrayType.push(_item.ReimbursementTypeName);
            _this.resourceArray.push(_item);
          });
        }
      },
      function(err) {
        uni.showToast({
          title: "获取报销类型失败",
          icon: "none"
        });
      }
    );
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
