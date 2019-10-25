<template>
	<view>
		<custom>费用报销明细</custom>
		<view class="cu-bar bg-white solid-bottom margin-top" v-if="numList.length>0">
			<view class="action">
				<text class="icon-title text-orange"></text> 流程步骤
			</view>
			<!-- <view class="action">
				<button class="cu-btn bg-green shadow" @tap="deleteItem">删除</button>
			</view> -->
		</view>
		<view class="bg-white padding" v-if="numList.length>0">
			<view class="cu-steps">
				<view class="cu-item" :class="(item.Code==='First'||(item.Code==='Finish'&&entitys[0].Closed==='Yes'&&entitys[0].DocStatus==='Close'))?'text-blue':stepColor[item.ApproveStatus]" v-for="(item,index) in numList"
				 :key="index">
					<text data-target="Modal" class="num" :class="item.ApproveStatus===2?'err':''" :data-index="index + 1" @tap="showStepInfo(item,$event)"></text> {{item.Name}}
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
		<view v-if="entitys.length>0" class="cu-card dynamic margin-top" :class="isCard?'no-card':''" v-for="(item,index1) in entitys"
		 :key="index1">
			<view class="cu-item shadow">
				<view style="position: relative;">
					<!-- <view class="cu-tag bg-blue" style="position:absolute;top: 10px;right: 10px;">费用报销明细({{NumArray[index1]}})</view> -->
					<view class="content padding-tb-sm">
						<view>
							<text class="icon-list text-blue margin-right-xs"></text>{{item.ExpendTypeName}}/{{item.Amount}}&nbsp;&nbsp;开票公司:{{item.InvCompanyName}}</view>
						<view class="text-gray text-sm">
							<text class="icon-timefill margin-right-xs"></text> {{item.PayType}}&nbsp;&nbsp;{{item.AccountNumber}}&nbsp;&nbsp;{{item.AcceptingUnit}}</view>
						<view class="text-gray text-sm">
							<text class="icon-coin margin-right-xs"></text>备注：{{item.Remarks}}</view>
					</view>
				</view>
				<view class="text-gray text-sm text-right padding">
					<view class="cu-capsule round">
						<view class='cu-tag bg-cyan '>
							总金额
						</view>
						<view class="cu-tag line-cyan">
							{{item.Amount}}
						</view>
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
				stepColor:['','text-blue','text-red'],
				numList: [],
				num: 1,
				itemData: {},
				pageIndex: 0,
				entitys: [],
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
								console.log(succ);
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
					console.log(_this.numList);
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
						}]
					}
				};
				uni.showLoading({
					title: '拼命加载中...'
				});
				var _this = this;
				this.$mbservices.Request(this.$webapi.getExpendRequestList, 'POST', ajaxJSON, function(ret) {
					if (!ret.data.data) {
						uni.showToast({
							title: '查无数据'
						});
						return false;
					}
					console.log(ret)
					_this.entitys = [];
					ret.data.data.forEach((item) => {
						console.log("可以进来");
						if (item.ApproveStatus === 'Pending') {
							item.AApproveStatus = "待审核";
						}
						if (item.ApproveStatus === 'Approved') {
							item.AApproveStatus = "已批准";
						}
						if (item.ApproveStatus === 'Rejected') {
							item.AApproveStatus = "已拒绝";
						}
						if (item.Approve === "Yes"|| item.ApproveStatus === 'Rejected') {
							_this.getStages();
						}
						item.Amount = parseFloat(item.Amount).toFixed(2);
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
