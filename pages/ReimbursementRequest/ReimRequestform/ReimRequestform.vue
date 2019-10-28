<template>
	<view>
		<custom>报销申请</custom>
		<view class="cu-bar bg-white solid-bottom" style="position: fixed;display: flex;z-index: 2;z-index: 999;width: 100%;">
			<view class="action">
				<text class="icon-redpacket text-orange"></text>
				总金额:{{totalJine}}(元)
			</view>
			<view class="action">
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
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in invCompanys" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.Name}}</view>
								<radio class="round" :class="radio==item.Code?'checked':''" :checked="radio==item.Code?true:false" :value="item.Code"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
		<view class="ul-swiper-box margin-top" style="margin-top: 50px;">
			<form>
				<view class="cu-form-group" readonly>
					<view class="title">单号</view>
					<text class="cu-tag round bg-gray light">{{itemData.DocEntry}}</text>
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group" readonly>
					<view class="title">公司</view>
					<text class="cu-tag round bg-blue light" data-target="RadioModal" @tap="showModal1">{{itemData.InvCompanyName}}</text>
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">支付方式</view>
					<picker @change="bindPickerChange1" :value="indexPayType" :range="PayType">
						<view class="picker">{{PayType[indexPayType]}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">费用类型</view>
					<picker @change="bindPickerChange2" :value="indexCostType" :range="CostType">
						<view class="picker">{{CostType[indexCostType]}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">账户(卡号)</view>
					<input placeholder="账户(卡号)" name="input" style="text-align: right;" @input="inputNum11($event)" :value="itemData.AccountNumber">
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">受理单位(银行)</view>
					<input placeholder="受理单位(银行)" name="input" style="text-align: right;" @input="inputNum22($event)" :value="itemData.AcceptingUnit">
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">备注</view>
				</view>
				<view class="cu-form-group">
					<textarea @input="textareaInput33" :class="itemData.Remarks?'value':''" maxlength="-1" :disabled="modalName!=null"
					 id="_Remarks" name="_Remarks" placeholder-class="placeholder" data-placeholder="在此输入备注" :value="itemData.Remarks" />
					</view>
				<block v-for="(item,index) in formList" :key="index">
					<view class="cu-bar bg-gray solid-bottom margin-top">
						<view class="action">
							<text class="icon-title text-orange"></text>
							报销明细({{item.id}})
						</view>
						<view class="action" v-if="formList.length!=1">
							<button class="cu-btn icon" @tap="deleteOption(item)" data-target="menuModal">
								<text class="icon-roundclosefill" style="font-size: 2em;color:red;"></text>
							</button>
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">报销金额</view>
						<input placeholder="请输入报销金额" name="input" type="digit" style="text-align: right;" @input="inputNum(item,$event)"
						 :value="item.jine">
						<text v-if="false" class="icon-roundclosefill text-orange"></text>
					</view>
					<view class="cu-form-group">
						<view class="title">大写金额</view>
						<view class="action">
							<view class="cu-tag round bg-blue light">{{item.bigjine}}</view>
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">报销日期</view>
						<picker v-bind:id="item.id" v-bind:name="item.id" mode="date" :value="item.itemDate" :start="startDate" :end="endDate"
						 @change="bindDateChange(item,$event)">
							<view class="picker">{{item.itemDate}}</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">报销类型</view>
						<picker v-bind:id="item.id" v-bind:name="item.id" @change="bindPickerChange" :value="item.itemOptionIndex" :range="arrayType">
							<view class="picker">{{arrayType[item.itemOptionIndex]}}</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">明细备注</view>
						<!-- <view class="action">
							<view>已输入({{!this.$mbservices.isEmpty(itemData.Remarks)?item.itemReason.length:0}})个字符</view>
						</view> -->
					</view>
					<view class="cu-form-group">
						<textarea @input="textareaInput" :class="item.itemReason?'value':''" v-bind:id="item.id" v-bind:name="item.id"
						 maxlength="-1" :disabled="modalName!=null" placeholder-class="placeholder" data-placeholder="在此输入明细备注" :value="item.itemReason" />
						</view>
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
        <uni-view class="uni-card-link margin-top" style="text-align: center;min-height: 100upx;top: 10px;">
          <i class="icon-add" @tap="addOption">增加&nbsp;&nbsp;报销明细</i>
        </uni-view>
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
			PayType:["请选择支付方式","转账给申请人","转账给第三人(需备注)","银行转账(需备注)","现金支付给申请人","按发票汇款","银行托收","申请支票",
			"其他现金支付","其他银行汇款"],
			indexPayType:0,
			indexCostType: 0,
			radio: 'radio1',
			invCompanys:[],
			CostType:["请选择"],
			CostTypeList:[],
			PayTypeList:[{
				Code:"ToRequestUser",
				Name:"转账给申请人",
			},
			{
				Code:"ToThirdUser",
				Name:"转账给第三人(需备注)",
			},
			{
				Code:"BankToUser",
				Name:"银行转账(需备注)",
			},
			{
				Code:"MoneyToUser",
				Name:"现金支付给申请人",
			},{
				Code:"ToUserByInvonice",
				Name:"按发票汇款",
			},{
				Code:"ToBank",
				Name:"银行托收",
			},{
				Code:"RequestCheque",
				Name:"申请支票",
			},{
				Code:"OtherMoneyPay",
				Name:"其他现金支付",
			},{
				Code:"OtherBankPay",
				Name:"其他银行汇款",
			}],
      modalName: null,
      resourceArray: ["选项一", "选项二", "选项三"],
      arrayType: ["选项一", "选项二", "选项三"],
      indexType: 0,
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
			itemData:{DocEntry:"",indexPayType:0,AccountNumber:"",AcceptingUnit:"",PayTypeCode:"",PayTypeName:"请选择支付方式",Remarks:"","InvCompanyId":uni.getStorageSync("JSUserInfo").CompanyId,
			"InvCompanyName":uni.getStorageSync("JSUserInfo").CompanyName,CostType: [],CostTypeCode:"",CostTypeName:""},
      formList: [
        {
          id: 1,
          name: "张三",
          jine: "",
          itemDate: "请选择",
          itemOptionIndex: 0,
          itemOptionText: "",
          itemReason: "",
          imageList: [],
          bigjine: ""
        }
      ],
      editEntitysList: [],
      totalJine: "0.00",
      editflag: false,
      editItem: {},
      isDoSteps: false
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
				    },
						{
							FieldName: "OrganizationType",
							Operation: "EQUAL",
							ConditionValue: "B",
							Relationship: "AND"
						}
				  ]
				}
			};
			this.$mbservices.Request(this.$webapi.getOrgList,"POST",ajaxJSON,res=>{
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
				if(item.Code===e.detail.value)
				{
					this.itemData.InvCompanyName=item.Name;
				}
			})
			this.modalName = null;
			console.log(e);
		},
		showModal1(e) {
			this.modalName = e.currentTarget.dataset.target;
		},
    showModal(e) {
			if(this.$mbservices.isEmpty(this.itemData.InvCompanyId))
			{
				uni.showToast({
					title:'请选择开票公司',
					icon:'none'
				});
				return false;
			}
			if(this.itemData.PayTypeCode==="BankToUser")
			{
				if(this.$mbservices.isEmpty(this.itemData.AccountNumber))
				{
					uni.showToast({
						title:'请输入银行卡号',
						icon:'none'
					});
					return false;
				}
				if(this.$mbservices.isEmpty(this.itemData.AcceptingUnit))
				{
					uni.showToast({
						title:'请输入受理银行',
						icon:'none'
					});
					return false;
				}
			}
			if(this.itemData.PayTypeCode!=="BankToUser"&&this.itemData.PayTypeCode!=="MoneyToUser")
			{
				if(this.$mbservices.isEmpty(this.itemData.AccountNumber))
				{
					uni.showToast({
						title:'请输入收款账户',
						icon:'none'
					});
					return false;
				}
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
          _item.itemDate === "" ||
          _item.itemDate === undefined ||
          _item.itemDate === null ||
          _item.itemDate === "请选择"
        ) {
          isNull_ = true;
          content = "请选择报销时间";
        }
      });
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
          LineNum: _indx,
          ObjType: "Reimbursement",
          Remarks: _item.itemReason,
          Amount: parseFloat(_item.jine).toFixed(2),
          Imgs: path,
          DocDate: _item.itemDate,
          ReimbursementTypeCode:
            _this.resourceArray[_item.itemOptionIndex].ReimbursementTypeCode,
          ReimbursementTypeName: _this.arrayType[_item.itemOptionIndex],
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
				_this.editEntitysList[0].AccountNumber=_this.itemData.AccountNumber;
				_this.editEntitysList[0].AcceptingUnit=_this.itemData.AcceptingUnit;
				_this.editEntitysList[0].Remarks= _this.itemData.Remarks;
				_this.editEntitysList[0].InvCompanyId=_this.itemData.InvCompanyId;
				_this.editEntitysList[0].InvOrganizationCode=uni.getStorageSync("JSUserInfo").OrganizationCode;
				_this.editEntitysList[0].InvOrganizationName=uni.getStorageSync("JSUserInfo").OrganizationName;
				_this.editEntitysList[0].CostTypeCode= _this.itemData.CostTypeCode;
				_this.editEntitysList[0].CostTypeName=_this.itemData.CostTypeName;
        _this.editEntitysList[0].UIStatus = "Modify";
        ajaxJSON = _this.editEntitysList[0];
      } else {
        ajaxJSON = {
          DocNum: this.itemData.DocEntry,
          ObjType: "Reimbursement",
          CreatorId: parseInt(uni.getStorageSync("JSUserInfo").UserId),
          Remarks: _this.itemData.Remarks,
          Approve: _this.isDoSteps ? "Yes" : "No",
          ApproveStatus: "Pending",
          Canceled: "No",
          Closed: "No",
          Amount: parseFloat(_this.totalJine).toFixed(2),
          Attachment: "",
          Imgs: "",
          DocDate: _this.getDate(),
          OrganizationCode: uni.getStorageSync("JSUserInfo").OrganizationCode,
					CompanyId:uni.getStorageSync("JSUserInfo").CompanyId,
					PayType:_this.itemData.PayTypeCode,
					AccountNumber:_this.itemData.AccountNumber,
					AcceptingUnit:_this.itemData.AcceptingUnit,
          ReimbursementTypeID: "",
		  InvOrganizationCode: uni.getStorageSync("JSUserInfo").OrganizationCode,
		  InvOrganizationName: uni.getStorageSync("JSUserInfo").OrganizationName,
		  CostTypeCode: _this.itemData.CostTypeCode,
		  CostTypeName: _this.itemData.CostTypeName,
		  ReimbursementAmount: parseFloat(_this.totalJine).toFixed(2),
					InvCompanyId:_this.itemData.InvCompanyId,
          ReimbursementRequestLines: _lines,
          UIStatus: "New"
        };
      }
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
      );
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
        itemDate: "请选择",
        itemOptionIndex: 0,
        itemOptionText: this.arrayType[0],
        itemReason: "",
        imageList: [],
        bigjine: ""
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
			
			// if (this.PayType[this.indexPayType] != "BankToUser") {this.itemData.AcceptingUnit=this.PayType[this.indexPayType];}
		 //    else {this.itemData.AcceptingUnit="";}
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
						_$this.itemData.AccountNumber=item.AccountNumber;
						_$this.itemData.AcceptingUnit=item.AcceptingUnit;
						_$this.itemData.Remarks=item.Remarks;
						_$this.PayType.forEach((_item,index)=>{
											  if(_item===_this.itemData.PayTypeName)
											  {
												  _this.indexPayType=index;
												  _this.itemData.indexPayType=index;
													
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
              /* _item.Amount = parseFloat(item.Amount).toFixed(2); */
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
			this.itemData.AccountNumber=event.detail.value;
		},
		inputNum22(event){
			this.itemData.AcceptingUnit=event.detail.value;
		},
		textareaInput33(e) {
		  this.itemData.Remarks = e.detail.value;
		}
  },
  onLoad(e) {
		/* 初始值 */
		
		
    /* 修改传递参数 */
    if (e.flag === "modify") {
      this.editflag = true;
    }
    if (this.editflag) {
      this.editItem = JSON.parse(e.data);
      this.getDetailData();
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
		// 费用类型
		this.getCostType();
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
