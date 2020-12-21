<template>
	<view>
		<custom>年假延期申请</custom>
		<view id="tab-bar" class="cu-bar top">
			<view class="action">截至目前您当前剩余年假</view>
			<view class="action ">
				<text class="text-red bottom-border text-bold">{{HolidayDelay.Days}}天</text>
			</view>
		</view>
		<view class="cu-list menu sm-border card-menu animation-slide-bottom margin-top-xs" :style="[{animationDelay: (10 + 1)*0.1 + 's'}]">
			<view class="cu-item">
				<text class="icon-ellipse text-black light"></text>
				<text class="text-black">年假延期申请信息</text>
			</view>
			<view class="cu-item padding">

				<view class="content">
					<view class="margin-top " style="height: 20px;"></view>
					<view>
						<text class="icon-title text-black"></text>
						<text class="text-black">单据编号：{{HolidayDelay.DocEntry}}</text>
					</view>
					<view>
						<text class="icon-title text-black"></text>
						<text class="text-black">延期天数：{{HolidayDelay.Days}}天</text>
					</view>
					<view>
						<text class="icon-title text-black"></text>
						<text class="text-black">延期日期：{{HolidayDelay.StopDate}}</text><text class="text-orange margin-left-sm">[前]</text>
					</view>
					<view class="margin-top" style="height: 20px;"></view>
				</view>

			</view>
			<view class="cu-item padding" style="position: relative;">
				<view class="content" v-if="HolidayDelay.Approve==='No'">
					<view>
						<view class="text-black"></view>
					</view>
				</view>
				<view class="content" v-if="FHolidayDelay.Approve==='Yes'">
					<view>
						<text class="text-blue" v-if="FHolidayDelay.ApproveStatus==='Pending'">等待审核</text>
						<text class="text-blue" v-if="FHolidayDelay.ApproveStatus==='Approved'">审核通过</text>
						<text class="text-blue" v-if="FHolidayDelay.ApproveStatus==='Rejected'">审核拒绝</text>
					</view>
				</view>
				<view class="action text-right margin-bottom" style="position: absolute;right: 10px;">
					<button class="cu-btn radius round bg-green light" @tap="showModal" data-target="DialogModal" v-if="FHolidayDelay.Days>0&&(FHolidayDelay.Approve==='No'||FHolidayDelay.ApproveStatus==='Rejected'||$mbservices.isEmpty(FHolidayDelay.ApproveStatus))">提交申请</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog" style="width: 80vw">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-bold">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					确定要提交申请?
				</view>
				<view class="cu-bar bg-white">
					<view class="action">
						<button class="cu-btn line-green bg-gray light" @tap="hideModal">取消</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-green light margin-left" @tap="actionClick">确定</button>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='PropWindow'?'show':''">
			<view class="cu-dialog" style="width: 80vw">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-bold">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					{{MsgContent}}
				</view>
				<view class="cu-bar bg-white flex justify-center">
					<!-- <view class="action">
						<button class="cu-btn bg-gray light text-green" @tap="hideModal">取消</button>
					</view> -->
					<button class="cu-btn bg-gray light lg" @tap="hideModal">知道了</button>
					<!-- <view class="action">
						
					</view> -->
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
					DocEntry: 0,
					Approve: 'No',
					ApproveStatus: '',
					Days: 0,
					UIStatus: '',
					StopDate: ''
				},
				FHolidayDelay: {
					DocEntry: 0,
					Approve: 'No',
					ApproveStatus: '',
					Days: 0,
					UIStatus: '',
					StopDate: ''
				},
				Annualeave: '',
				ExtendToDate: '',
				SaveExtendToDate: '',
				initEntity: {},
				MsgContent: ''
			}
		},
		onLoad(e) {
			this.BradgeMethod()
			this.GetRecords()
		},
		methods: {
			GetRecords() {
				let dateStr = (new Date().getFullYear() + 1) + '-' + this.ExtendToDate;
				this.SaveExtendToDate = this.$mbservices.formatDateTime(dateStr, 'yyyy-MM-dd')
				let ajaxJson = {
					type: "Search",
					Parameter: {
						Conditions: [{
							FieldName: "CreatorId",
							Operation: "EQUAL",
							ConditionValue: uni.getStorageSync("JSUserInfo").UserId,
							Relationship: "AND"
						}, {
							FieldName: "CreateDate",
							Operation: "GRATER_EQUAL",
							ConditionValue: this.$mbservices.formatDateTime((new Date().getFullYear()) + '-01-01', 'yyyy-MM-dd'),
							Relationship: "AND"
						}, {
							FieldName: "CreateDate",
							Operation: "LESS_EQUAL",
							ConditionValue: this.SaveExtendToDate,
							Relationship: "AND"
						}]
					}
				};
				this.$mbservices.Request(this.$webapi.GetHolidayDelayRecords, 'POST', ajaxJson, res => {
					if (res.data.RecordCount > 0) {
						let isHave = false;
						res.data.data.forEach(item => {
							if (this.$mbservices.formatDateTime(item.CreateDate, 'yyyy') === this.$mbservices.formatDateTime(new Date(),
									'yyyy')) {
								this.HolidayDelay.Approve = item.Approve
								this.HolidayDelay.ApproveStatus = item.ApproveStatus
								this.HolidayDelay.Days = item.Days
								this.HolidayDelay.DocEntry = item.DocEntry
								this.HolidayDelay.UIStatus = "Modify"

								this.FHolidayDelay.Approve = item.Approve
								this.FHolidayDelay.ApproveStatus = item.ApproveStatus
								this.FHolidayDelay.Days = item.Days
								this.FHolidayDelay.DocEntry = item.DocEntry
								this.FHolidayDelay.UIStatus = "Modify"
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
			async GetNewHolidayDelay() {
				/* let param = await this.GetInitRecord();
				if (param.data.RecordCount <= 0) {
					uni.showToast({
						title: '获取系统初始化信息失败',
						icon: 'none'
					})
					return false;
				} */
				//this.Annualeave = this.initEntity.Annualeave;//param.data.data[0].Annualeave;
				//this.ExtendToDate = this.initEntity.ExtendToDate;//param.data.data[0].ExtendToDate;
				let dateStr = (new Date().getFullYear() + 1) + '-' + this.ExtendToDate;
				this.SaveExtendToDate = this.$mbservices.formatDateTime(dateStr, 'yyyy-MM-dd')
				this.HolidayDelay.StopDate = this.$mbservices.formatDateTime(dateStr, 'yyyy年MM月dd日')
				this.getLastNianJia()
				this.getMaxNum()
			},
			async BradgeMethod() {
				let param = await this.GetInitRecord();
				if (param.data.RecordCount <= 0) {
					uni.showToast({
						title: '获取系统初始化信息失败',
						icon: 'none'
					})
					return false;
				}

				//this.initEntity=param.data.data[0]
				this.Annualeave = param.data.data[0].Annualeave;
				this.ExtendToDate = param.data.data[0].ExtendToDate;
			},
			async GetInitRecord() {
				return new Promise((resolve, reject) => {
					let ajaxJson = {
						type: "Search",
						Parameter: {
							Conditions: [{
								FieldName: "CompanyId",
								Operation: "EQUAL",
								ConditionValue: uni.getStorageSync("JSUserInfo").CompanyId,
								Relationship: "AND"
							}]
						}
					};
					this.$mbservices.Request(this.$webapi.getInitialize, 'POST', ajaxJson, res => {
						resolve(res)
					}, err => {
						reject(err)
					})
				});
			},
			getLastNianJia() {
				let param = {
					HolidayType: this.Annualeave
				}
				this.$mbservices.Request(this.$webapi.GetLastLeaveDays, 'POST', {
					HolidayType: this.Annualeave
				}, res => {
					if (res.data.RecordCount > 0) {
						this.HolidayDelay.Days = res.data.data.restDays
						this.HolidayDelay.UIStatus = "New"

						this.FHolidayDelay.Days = res.data.data.restDays
						this.FHolidayDelay.UIStatus = "New"
						this.$forceUpdate()
					}
				}, err => {})
			},
			getMaxNum() {
				this.$mbservices.Request(this.$webapi.GetHolidayDelayMaxNum, 'GET', {}, res => {
					this.HolidayDelay.DocEntry = res.data
					this.HolidayDelay.UIStatus = "New"

					this.FHolidayDelay.DocEntry = res.data
					this.FHolidayDelay.UIStatus = "New"
				}, err => {})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			actionClick() {
				this.modalName = null
				uni.showLoading({
					title: '正在提交,请稍后...'
				})
				this.HolidayDelay.Approve = 'Yes'
				this.HolidayDelay.ApproveStatus = 'Pending'
				this.HolidayDelay.ApproveStatus = 'Pending'
				this.HolidayDelay.CompanyId = uni.getStorageSync("JSUserInfo").CompanyId
				this.$mbservices.Request(this.$webapi.SaveHolidayDelay, 'POST', this.HolidayDelay, res => {
					if (res.data.RecordCount > 0) {
						uni.showToast({
							title: '提交成功',
							icon: 'none'
						});
						this.GetRecords()
					} else {
						this.MsgContent = res.data
						this.modalName = 'PropWindow'
					}
					uni.hideLoading()
				}, err => {
					uni.showToast({
						title: '请求错误',
						icon: 'none'
					})
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>
