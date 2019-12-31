<template>
	<view>
		<custom>年假延期申请</custom>
		<view id="tab-bar" class="cu-bar top">
			<view class="action">截至目前您当前剩余年假</view>
			<view class="action ">
				<text class="text-red">2.5天</text>
			</view>
		</view>
		<view class="cu-list menu sm-border card-menu animation-slide-bottom margin-top-xs" :style="[{animationDelay: (10 + 1)*0.1 + 's'}]">
			<view class="cu-item">
				<text class="icon-ellipse text-orange"></text>
				<text class="text-grey">年假延期申请信息</text>
			</view>
			<view class="cu-item padding">
				<view class="content">
					<view>
						<text class="icon-title text-grey"></text>
						<text class="text-grey">单据编号：200</text>
					</view>
					<view>
						<text class="icon-title text-grey"></text>
						<text class="text-grey">延期天数：2.5天</text>
					</view>
					<view>
						<text class="icon-title text-grey"></text>
						<text class="text-grey">延期日期：2020-03-31</text>
					</view>

				</view>
			</view>
			<view class="cu-item padding">
				<view class="content">
					<view>
						<text class="text-blue">等待审核</text>
					</view>
				</view>
				<view class="action">
					<button class="cu-btn radius round shadow bg-grey" @tap="showModal" data-target="DialogModal">提交申请</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog" style="width: 480upx;">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					确定要提交申请?
				</view>
				<view class="cu-bar bg-white">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="actionClick">确定</button>
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
				modalName: null,
				HolidayDelay: {
					Approve: '',
					ApproveStatus: '',
					Days: 0
				}
			}
		},
		onLoad(e) {
			this.GetRecords()
		},
		methods: {
			GetRecords() {
				let ajaxJson = {
					type: "Search",
					Parameter: {
						Conditions: [{
							FieldName: "CreatorId",
							Operation: "EQUAL",
							ConditionValue: uni.getStorageSync("JSUserInfo").UserId,
							Relationship: "AND"
						}]
					}
				};
				this.$mbservices.Request(this.$webapi.GetHolidayDelayRecords, 'POST', ajaxJson, res => {
					console.log('返回数据');
					console.log(res);
					if (res.data.RecordCount > 0) {
						let isHave = false;
						res.data.data.forEach(item => {
							if (this.$mbservices.formatDateTime(item.CreateDate, 'yyyy') === this.$mbservices.formatDateTime(new Date(),
									'yyyy')) {
								this.HolidayDelay.Approve = item.Approve
								this.HolidayDelay.ApproveStatus = item.ApproveStatus
								this.HolidayDelay.Days = item.Days
								isHave = true
							}
						});
						if (!isHave) {
							this.GetNewHolidayDelay()
						}
					} else {
						this.GetNewHolidayDelay()
					}
				}, err => {

				});
			},
			GetNewHolidayDelay() {

			},
			async GetInitRecord(){
				
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style>

</style>
