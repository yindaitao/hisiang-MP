<template>
	<view>
		<custom bgColor="bg-gradual-pink">费用报销明细</custom>
		<view class="cu-bar bg-white solid-bottom margin-top" v-if="numList.length>0">
			<view class="action">
				<text class="icon-title text-orange"></text> 流程步骤
			</view>
		</view>
		<view class="bg-white padding" v-if="numList.length>0">
			<view class="cu-steps">
				<view class="cu-item" :class="(item.Code==='First'||(item.Code==='Finish'&&entitys[0].Closed==='Yes'&&entitys[0].DocStatus==='Close'))?'text-blue':stepColor[item.ApproveStatus]"
				 v-for="(item,index) in numList" :key="index">
					<text data-target="Modal" class="num" :class="item.ApproveStatus===2?'err':''" :data-index="index + 1" @tap="showStepInfo(item,$event)"></text>
					{{item.Name}}
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">
						<view>审核信息</view>
					</view>
					<view class="action" @tap="hideModal">
						<text class="icon-roundclose text-black"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" readonly>
						<view class="title">时间</view>
						<text class="text-orange">{{showcontent.date}}</text>
					</view>
					<view class="cu-form-group" readonly>
						<view class="title">审核人</view>
						<text class="text-orange">{{showcontent.name}}</text>
					</view>
					<view class="cu-form-group" readonly>
						<view class="title">意见</view>
						<text class="text-orange">{{showcontent.content}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="icon-title text-orange"></text> 报销明细
			</view>
			<view class="action">
				总金额：<view class="cu-tag round bg-olive light" v-if="entitys.length>0">{{entitys[0].Amount}}</view>
			</view>
		</view>
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view style="position: relative;">
					<view class="content">{{entitys[0].CompanyName}}&nbsp;/&nbsp;{{entitys[0].OrganizationName}}&nbsp;/&nbsp;{{entitys[0].Creator}}</view>
					<view class="content">单据编号:{{entitys[0].DocEntry}}&nbsp;&nbsp;RMB:{{entitys[0].Amount}}</view>
					<view class="content">开票公司:{{entitys[0].InvCompanyName}}</view>
					<view class="content">支付方式:{{entitys[0].PayType}}&nbsp;&nbsp;账号(卡号):{{entitys[0].AccountNumber}}&nbsp;&nbsp;受理单位(银行):{{entitys[0].AcceptingUnit}}</view>
					<view class="content">
						<view class="text-gray text-sm">
							<h4>备注：{{entitys[0].Remarks}}</h4>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="entitys.length>0" class="cu-card dynamic padding-sm" :class="isCard?'no-card':''" v-for="(item,index1) in entitys[0].ReimbursementRequestLines"
		 :key="index1">
			<view class="cu-item shadow">
				<view style="position: relative;">
					<view class="cu-tag bg-gray" style="position:absolute;top: 10px;right: 10px;">费用报销明细({{NumArray[index1]}})&nbsp;&nbsp;RMB:{{item.Amount}}</view>
					<view class="content padding-tb-sm">
						<view>
							<text class="icon-list text-blue margin-right-xs"></text>{{item.ReimbursementTypeName}} 报销</view>
						<view class="text-gray text-sm">
							<text class="icon-timefill margin-right-xs"></text> {{item.DocDate}}</view>
						<view class="text-gray text-sm">
							<text class="icon-coin margin-right-xs"></text>备注：{{item.Remarks}}</view>
					</view>
				</view>
				<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'" v-if="item.pathArr.length>0">
					<view class="bg-img" :class="isCard?'':'only-img'" :style="{'background-image':'url('+_item+')'}" v-for="(_item,index) in item.pathArr"
					 :key="index">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: true,
				scroll: 0,
				NumArray: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九',
					'二十'
				],
				stepColor: ['', 'text-blue', 'text-red'],
				numList: [],
				num: 1,
				itemData: {},
				pageIndex: 0,
				entitys: [{
					Amount: '0.00',
					ReimbursementLines: []
				}],
				stageArr: [],
				modalName: null,
				showcontent: {}
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			showStepInfo(item, e) {
				if (item.stageUserList.length <= 0) {
					return false;
				}
				console.log(e);
				this.modalName = e.currentTarget.dataset.target;
				this.showcontent.date = this.$mbservices.formatDateTime(item.stageUserList[0].ApproveDatetime,
					'yyyy-MM-dd hh:mm:ss');
				this.showcontent.name = item.stageUserList[0].UserName;
				this.showcontent.content = item.stageUserList[0].ApproveComments;
				/* uni.showModal({
					title: item.stageUserList[0].UserName + "\n\r\t" + this.$mbservices.formatDateTime(item.stageUserList[0].ApproveDatetime,
						"yyyy-MM-dd hh:mm:ss") + "\n\r\t" + item.stageUserList[0].ApproveComments
				}) */
			},
			deleteItem() {
				var item = this.entitys[0];
				item.UIStatus = "Delete";
				item.ReimbursementLines.forEach((_item) => {
					_item.UIStatus = "Delete";
				});
				var _this = this;
				uni.showModal({
					title: '操作提示',
					content: '确定删除选中项?',
					success(res) {
						if (res.confirm) {
							_this.$mbservices.Request(_this.$webapi.submitCostForm, 'POST', item, function(succ) {
								if (succ.statusCode === 200) {
									var cache = [];
								}
							}, function(err) {
								console.log(err);
							})
						}
					}
				})
			},
			getStages: async function() {
				var ajaxJSON = {approveNoteEntry: this.itemData.DocEntry};
				var _this = this;
				this.$mbservices.Request(this.$webapi.getStages, 'POST', ajaxJSON, function(succ) {
					_this.numList = succ.data;
				}, function(err) {
					console.log('获取步骤错误');
				})
			},
			getDetailData: function() {
				this.pageIndex = parseInt(this.pageIndex) + 1;
				var ajaxJSON = {
					pageIndex: this.pageIndex,
					rowsPerPage: '10',
					type: "Initialize",
					Parameter: {
						LoadChildren: 'Load',
						Conditions: [{
							FieldName: "CreatorId",
							Operation: "EQUAL",
							ConditionValue: parseInt(uni.getStorageSync('JSUserInfo').UserId),
							Relationship: "AND"
						}, {
							FieldName: "DocEntry",
							Operation: "EQUAL",
							ConditionValue: parseInt(this.itemData.DocEntry),
							Relationship: "AND"
						}, {
							FieldName: "DocNum",
							Operation: "EQUAL",
							ConditionValue: this.itemData.DocNum,
							Relationship: "AND"
						}]
					}
				};
				uni.showLoading({
					title: '拼命加载中...'
				});
				var _this = this;
				this.$mbservices.Request(this.$webapi.getReimList, 'POST', ajaxJSON, function(ret) {
					if (!ret.data.data) {
						uni.showToast({
							title: '查无数据'
						});
						return false;
					}
					_this.entitys = [];
					ret.data.data.forEach((item) => {
						if (item.ApproveStatus === 'Pending') {
							item.AApproveStatus = "待审核";
						}
						if (item.ApproveStatus === 'Approved') {
							item.AApproveStatus = "已批准";
						}
						if (item.ApproveStatus === 'Rejected') {
							item.AApproveStatus = "已拒绝";
						}
						if (item.Approve === "Yes" || item.ApproveStatus === 'Rejected') {
							_this.getStages();
						}
						item.Amount = parseFloat(item.Amount).toFixed(2);
						item.ReimbursementRequestLines.forEach((_item) => {
							var _pathArr = (_item.Imgs === "" || _item.Imgs === undefined || _item.Imgs === null) ? [] : _item.Imgs.split(
								"|");
							_item.pathArr = new Array();
							_pathArr.forEach((_item_) => {
								_item.pathArr.push(_this.$webapi.webroot + '/' + _item_);
							});
							_item.Amount = parseFloat(_item.Amount).toFixed(2);
						});
						_this.entitys.push(item);
					});
					setTimeout(() => {
						uni.hideLoading();
					}, 1000);
				}, function(ret) {
					uni.showToast({
						title: ret.errMsg,
						icon: 'none',
						success: function() {
							setTimeout(function() {
								uni.navigateBack();
							}, 1000);
						}
					});
				})
			}
		},
		onLoad(e) {
			try{
				this.itemData = JSON.parse(e.data);
			}catch(e){
				//TODO handle the exception
				if (this.$mbservices.isEmpty(e.data)) {
					this.itemData.BusinessOrderNo=parseInt("0");
				} else{
					this.itemData.BusinessOrderNo=parseInt(e.data);
				}
			}
			this.getDetailData();

		}
	}
</script>

<style>

</style>
