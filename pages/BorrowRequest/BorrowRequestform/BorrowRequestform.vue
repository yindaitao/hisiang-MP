<template>
    <view class="page">
        <custom>借款申请</custom>
        <view
            class="cu-bar bg-white solid-bottom"
            style="position: fixed;display: flex;z-index: 2;z-index: 999;width: 100%;"
        >
            <view class="action">
                <text class="icon-redpacket text-orange"></text>
                总金额:{{totalJine}}(元)
            </view>
            <view class="action" v-if="edit === false">
                <button
                    class="cu-btn round bg-blue shadow"
                    data-target="DialogModal2"
                    @tap="showModal"
                >
                    <text class="icon-upload"></text>提交
                </button>
            </view>
        </view>
        <view
            class="cu-modal"
            :class="modalName=='DialogModal2'?'show':''"
        >
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">操作提示</view>
                    <view
                        class="action"
                        @tap="hideModal"
                    >
                        <text class="icon-roundclose text-black"></text>
                    </view>
                </view>
                <view class="padding-xl bg-white">
                    <text class="text-black text-bold">确定提交申请?</text>
                </view>
                <view class="cu-bar bg-white">
                    <view
                        class="action margin-0 flex-sub text-grey"
                        @tap="onlySave"
                    >存草稿</view>
                    <view
                        class="action margin-0 flex-sub text-black solid-left"
                        @tap="hideModal"
                    >取消</view>
                    <view
                        class="action margin-0 flex-sub text-green solid-left"
                        @tap="saveAndDoSteps"
                    >确定提交</view>
                </view>
            </view>
        </view>
        <view
            class="ul-swiper-box margin-top"
            style="margin-top: 50px;"
        >
            <form @submit="setNaivgationBarTitle">
                <view
                    class="cu-form-group"
                    readonly
                >
                    <view class="title">单号</view>
                    <text class="cu-tag round bg-gray light">{{itemData.DocEntry}}</text>
                    <text
                        v-if="false"
                        class="icon-roundclosefill text-orange"
                    ></text>
                </view>
                <!-- <view class="cu-form-group">
					<view class="title">支出类型</view>
					<picker @change="bindPickerChange" :value="indexBorrowType" :range="BorrowType">
						<view class="picker">{{BorrowType[indexBorrowType]}}</view>
					</picker>
				</view> -->
                <view class="cu-form-group">
                    <view class="title">金额</view>
                    <input
                        placeholder="支出金额"
                        name="input"
                        type="digit"
                        style="text-align: right;"
                        @input="inputNum"
                        :value="itemData.Amount"
                    >
                    <text
                        v-if="false"
                        class="icon-roundclosefill text-orange"
                    ></text>
                </view>
                <view class="cu-form-group">
                    <view class="title">大写</view>
                    <view class="action">
                        <view class="cu-tag round bg-blue light">{{itemData.bigjine}}</view>
                    </view>
                </view>
				<view class="cu-form-group">
					<view class="title">还款日期</view>
					<picker mode="date" :value="itemData.BackDate" :start="startDate" :end="endDate" @change="bindDateChange(itemData,$event)">
						<view class="picker">{{itemData.BackDate}}</view>
					</picker>
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
                    <input
                        placeholder="账户(卡号)"
                        name="input"
                        style="text-align: right;"
                        @input="inputNum1($event)"
                        :value="itemData.AccountNumber"
                    >
                    <text
                        v-if="false"
                        class="icon-roundclosefill text-orange"
                    ></text>
                </view>
                <view class="cu-form-group">
                    <view class="title">受理单位(银行)</view>
                    <input
                        placeholder="受理单位(银行)"
                        name="input"
                        style="text-align: right;"
                        @input="inputNum2($event)"
                        :value="itemData.AcceptingUnit"
                    >
                    <text
                        v-if="false"
                        class="icon-roundclosefill text-orange"
                    ></text>
                </view>
                <view class="cu-form-group">
                    <view class="title">备注</view>
                    <!-- <view class="action">
						<view>已输入({{itemData.Remarks.length!==undefined?itemData.Remarks.length:0}})个字符</view>
					</view> -->
                </view>
                <view class="cu-form-group">
                    <textarea
                        @input="textareaInput"
                        :class="itemData.Remarks?'value':''"
                        maxlength="-1"
                        :disabled="modalName!=null"
                        id="_Remarks"
                        name="_Remarks"
                        placeholder-class="placeholder"
                        data-placeholder="在此输入备注"
                        :value="itemData.Remarks"
                    />
                    </view>
					
		</form>
		</view>
	</view>
</template>

<script>
import abc from "../../components/uni-datetimepicker.vue";
import uniIcon from "../../../components/uni-icon/uni-icon.vue";
let sourceType = [["camera"], ["album"], ["camera", "album"]];
let sizeType = [["compressed"], ["original"], ["compressed", "original"]];
export default {
    components: {
        //MxDatepicker,
        abc,
        uniIcon
    },
    watch: {
        showValue(val) {
            console.log(val);
        }
    },
    data() {
        return {
            modalName: null,
            BaseBorrowType: [],
            BorrowType: ["选项一", "选项二", "选项三"],
            indexBorrowType: 0,
            PayType:["请选择支付方式","转账给申请人","转账给第三人(需备注)","银行转账(需备注)","现金支付给申请人","按发票汇款","银行托收","申请支票",
            "其他现金支付","其他银行汇款"],
            indexPayType:0,
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
            isDoSteps: false,
            editflag: false,
            showPicker: false,
            themeColor: "",
			CostType:["请选择"],
			CostTypeList: [],
			indexCostType: 0,

            /*图片*/
            imageList: [],
            sourceTypeIndex: 2,
            sourceType: ["拍照", "相册", "拍照或相册"],
            sizeTypeIndex: 2,
            sizeType: ["压缩", "原图", "压缩或原图"],
            countIndex: 8,
            count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            totalJine: "0.00",
            bigNum: "",
            itemData: {
				id: 1,
				name:"",
                DocEntry: "",
                indexBorrowType: 0,
                Amount: "",
                bigjine: "零",
                indexPayType:0,
                AccountNumber: "",
                AcceptingUnit: "",
				PayTypeCode:"",
				PayTypeName:"请选择支付方式",
                Remarks: "",
                invoicetext: "",
				BackDate:this.getDate({
				format: true}),
				CostTypeCode:"",
				CostTypeName:"",
				InvOrganizationCode:"",
				InvOrganizationName: "",
				InvCompanyId :"",
				"InvCompanyName":"请选择",
                pics: [],
            },
            editItem: {},
			edit:false,
        };
    },
    onLoad(e) {
        var _this = this;
        //最大编号
        this.$mbservices.Request(
            this.$webapi.maxNumBorrowRequest,
            "GET",
            {},
            res => {
                this.itemData.DocEntry = res.data;
            },
            null
        );
		// 费用类型
		this.getCostType();
        //获取支出分类
        /* var conds = [{ FieldName: "Activated", Operation: "EQUAL", ConditionValue: "Y", Relationship: "AND" },{ FieldName: "DataType", Operation: "EQUAL", ConditionValue: "S", Relationship: "AND" }];
			
			this.$mbservices.Request(this.$webapi.getBorrowType,'POST',conds,function(res){
				if(!_this.$mbservices.isEmpty(res.data)&&res.data.RecordCount>0){
					_this.BorrowType=[];
					_this.BaseBorrowType=[];
					res.data.data.forEach((item)=>{
						_this.BaseBorrowType.push(item);
						_this.BorrowType.push(item.BorrowTypeName);
					});
				}
			},function(err){}); */

        /* 修改传递参数 */
       if (e.flag === "modify") {
         this.editflag = true;
		  this.edit = false;
		  console.log("modify"+this.edit);
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
         this.getDetailData();
       }
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
                this.$webapi.getBorrowRequestList,
                "POST",
                ajaxJSON,
                function(ret) {
                    if (!ret.data.data) {
                        uni.showToast({
                            title: "查无数据"
                        });
                        return false;
                    }
                    console.log("看编辑");
                    console.log(ret.data.data);
                    _this.itemData = ret.data.data[0];
					_this.itemData.PayTypeCode=_this.itemData.PayType;
					_this.PayTypeList.forEach(inner => {
						if (inner.Code === _this.itemData.PayTypeCode) {
							_this.itemData.PayTypeName = inner.Name;
						}
					})
					_this.PayType.forEach((_item,index)=>{
										  if(_item===_this.itemData.PayTypeName)
										  {
											  _this.indexPayType=index;
											  _this.itemData.indexPayType=index;
												
										  }
					});
					_this.itemData.CostTypeCode = _this.itemData.CostTypeCode;
					_this.itemData.CostTypeName = _this.itemData.CostTypeName;
					_this.CostType.forEach((_item,index)=>{
										  if(_item===_this.itemData.CostTypeName)
										  {
											  _this.indexCostType=index;
											  _this.itemData.indexCostType=index;
												
										  }
					});
                   _this.itemData.Amount = parseFloat(_this.itemData.Amount).toFixed(2);
				   _this.totalJine = parseFloat(_this.itemData.Amount).toFixed(2);
                    _this.BaseBorrowType.forEach((_item, index) => {
                        if (
                            _item.BorrowTypeCode ===
                            _this.itemData.BorrowTypeCode
                        ) {
                            console.log("KKKKKKKKKKKKKKK");
                            _this.indexBorrowType = index;
                            _this.itemData.indexBorrowType = index;
                        }
                    });
                    _this.itemData.bigjine = _this.$mbservices.smalltoBIG(
                        _this.itemData.Amount
                    );
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
		bindDateChange: function(itemData,e) {
		 itemData.BackDate = e.target.value
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
        submitForm() {
            var _this = this;
            var ajaxJSON = {};
            uni.showLoading({
                title: "正在提交..."
            });
            if (_this.editflag) {
                _this.itemData.Approve = _this.isDoSteps ? "Y" : "N";
                //_this.itemData.BorrowTypeCode=_this.BaseBorrowType[_this.indexBorrowType].BorrowTypeCode;
                _this.itemData.PayTypeCoce = _this.itemData.PayTypeCode;
				_this.itemData.BackDate = _this.itemData.BackDate;
				_this.itemData.CostTypeCode = _this.itemData.CostTypeCode;
				_this.itemData.CostTypeName = _this.itemData.CostTypeName;
				_this.itemData.InvOrganizationCode = uni.getStorageSync("JSUserInfo").OrganizationCode;
				_this.itemData.InvOrganizationName=uni.getStorageSync("JSUserInfo").OrganizationName;
				_this.itemData.InvCompanyId = uni.getStorageSync("JSUserInfo").CompanyId,
                _this.itemData.UIStatus = "Modify";
                ajaxJSON = _this.itemData;
            } else {
                ajaxJSON = {
                    DocNum: _this.itemData.DocEntry,
                    ObjType: "BorrowRequest",
                    CreatorId: parseInt(
                        uni.getStorageSync("JSUserInfo").UserId
                    ),
                    Remarks: _this.itemData.Remarks,
                    Approve: _this.isDoSteps ? "Y" : "N",
                    ApproveStatus: "Pending",
                    Canceled: "No",
                    Closed: "No",
                    Amount: parseFloat(_this.itemData.Amount).toFixed(2),
                    OrganizationCode: uni.getStorageSync("JSUserInfo")
                        .OrganizationCode,
                    CompanyId: uni.getStorageSync("JSUserInfo").CompanyId,
                    PayType: _this.itemData.PayTypeCode,
					BackDate: _this.itemData.BackDate,
					CostTypeCode: _this.itemData.CostTypeCode,
					CostTypeName: _this.itemData.CostTypeName,
					InvOrganizationCode: uni.getStorageSync("JSUserInfo").OrganizationCode,
					InvOrganizationName: uni.getStorageSync("JSUserInfo").OrganizationName,
					InvCompanyId:uni.getStorageSync("JSUserInfo").CompanyId,
                    AccountNumber: _this.itemData.AccountNumber,
                    AcceptingUnit: _this.itemData.AcceptingUnit,
                    //BorrowTypeCode:_this.BaseBorrowType[_this.indexBorrowType].BorrowTypeCode,
                    UIStatus: "New"
                };
            }
			console.log("ajaxson")
			console.log(ajaxJSON)
            var requestUrl = _this.$webapi.submitBorrowRequest;
            var _$this = _this;
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
        inputNum(event) {
            this.itemData.Amount = event.detail.value;
            if (parseFloat(this.itemData.Amount).toFixed(2) > 0) {
                this.itemData.bigjine = this.$mbservices.smalltoBIG(
                    this.itemData.Amount
                );
                this.totalJine = this.itemData.Amount;
            } else {
                this.itemData.bigjine = "零";
                this.totalJine = "";
            }
        },
        inputNum1(event) {
            this.itemData.AccountNumber = event.detail.value;
        },
        inputNum2(event) {
            this.itemData.AcceptingUnit = event.detail.value;
        },
        textareaInput(e) {
            this.itemData.Remarks = e.detail.value;
        },
        hideModal(e) {
            this.modalName = null;
        },
        showModal(e) {
            if (this.$mbservices.isEmpty(this.itemData.Amount)) {
                uni.showToast({
                    title: "请输入支出金额",
                    icon: "none"
                });
                return false;
            }
            if (this.itemData.PayType === "BankToUser") {
                if (this.$mbservices.isEmpty(this.itemData.AccountNumber)) {
                    uni.showToast({
                        title: "请输入银行卡号",
                        icon: "none"
                    });
                    return false;
                }
                if (this.$mbservices.isEmpty(this.itemData.AcceptingUnit)) {
                    uni.showToast({
                        title: "请输入受理银行",
                        icon: "none"
                    });
                    return false;
                }
            }
            if (
                this.itemData.PayType !== "BankToUser" &&
                this.itemData.PayType !== "MoneyToUser"
            ) {
                if (this.$mbservices.isEmpty(this.itemData.AccountNumber)) {
                    uni.showToast({
                        title: "请输入收款账户",
                        icon: "none"
                    });
                    return false;
                }
            }
            this.modalName = e.currentTarget.dataset.target;
        },
        setNaivgationBarTitle: function(e) {
            let title = e.detail.value.title;
            this.itemData.title = e.detail.value.title;
            this.itemData.description = e.detail.value.description;
            this.itemData.jine = e.detail.value.jine;
            this.itemData.supplier = e.detail.value.supplier;
            this.itemData.nameOrphone = e.detail.value.nameOrphone;
        },
        bindPickerChange: function(e) {
            this.indexBorrowType = e.target.value;
            this.itemData.indexBorrowType = e.target.value;
            console.log("也走了" + this.indexBorrowType);
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
        sourceTypeChange: function(e) {
            this.sourceTypeIndex = e.target.value;
        },
        sizeTypeChange: function(e) {
            this.sizeTypeIndex = e.target.value;
        },
        countChange: function(e) {
            this.countIndex = e.target.value;
        },
        chooseImage: async function() {
            if (this.imageList.length === 9) {
                let isContinue = await this.isFullImg();
                console.log("是否继续?", isContinue);
                if (!isContinue) {
                    return;
                }
            }
            uni.chooseImage({
                sourceType: sourceType[this.sourceTypeIndex],
                sizeType: sizeType[this.sizeTypeIndex],
                count:
                    this.imageList.length + this.count[this.countIndex] > 9
                        ? 9 - this.imageList.length
                        : this.count[this.countIndex],
                success: res => {
                    this.imageList = this.imageList.concat(res.tempFilePaths);
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
        previewImage: function(e) {
            var current = e.target.dataset.src;
            uni.previewImage({
                current: current,
                urls: this.imageList
            });
        }
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
</style>
