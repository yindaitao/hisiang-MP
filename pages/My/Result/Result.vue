<template>
	<view>
		<custom>业绩绩效</custom>
		<view id="tab-bar" class="cu-bar top">
			<view class="action">请选择月份</view>
			<view class="action ">
				<picker mode="date" fields="month" :value="SelectYearMonth" :start="StartYearMonth" :end="EndYearMonth" @change="DateChange">
					<view class="picker text-center">
						<text class="cu-tag round shadow bg-grey text-center light">{{SelectYearMonthText}}</text>
					</view>
				</picker>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{'height':scrollBarHeight+'px'}">
			<view class="cu-list menu sm-border card-menu animation-slide-bottom" :style="[{animationDelay: (0 + 1)*0.1 + 's'}]">
				<view class="cu-item">
					<text class="icon-ellipse text-orange light"></text>
					<text class="text-grey">业绩/绩效</text>
				</view>
				<view class="cu-item padding" style="min-height: 100px;">
					<view class="content">
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">姓名：{{Performance.EmployeeName}}</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">数量：{{Performance.Quantity}}</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">金额：{{Performance.Amount}}</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">备注：{{Performance.Remarks}}</text>
						</view>
					</view>
				</view>
				<view class="cu-item padding">
					<view class="content">
						<view>
							<text class="text-grey"></text>
						</view>
					</view>
					<view class="action">
						<text class="text-green text-right"></text>
					</view>
				</view>
			</view>
			<view style="height: 50px;"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			let nowDate = this.$mbservices.formatDateTime(new Date(), 'yyyy-MM')
			let nowDateText = this.$mbservices.formatDateTime(new Date(), 'yyyy年MM月')
			let startTime = this.$mbservices.formatDateTime(new Date(new Date().valueOf() - 365 * 24 * 60 * 60 * 1000),
				'yyyy-MM-dd')
			let nowDateMonth = this.$mbservices.formatDateTime(new Date(), 'yyyy-MM-dd')
			return {
				scrollBarHeight: 0,
				SelectYearMonth: nowDate,
				SelectYearMonthText: nowDateText,
				StartYearMonth: startTime,
				EndYearMonth: nowDateMonth,
				Performance: {
					Quantity: '',
					Amount: '',
					EmployeeName: '',
					Remarks: ''
				}
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			const query = wx.createSelectorQuery().in(this);
			query.select("#tab-bar").boundingClientRect();
			query.selectViewport().scrollOffset();
			var _this = this;
			query.exec(function(res) {
				res[0].top; // #the-id节点的上边界坐标
				res[1].scrollTop; // 显示区域的竖直滚动位置
				_this.NavBarHgt = res[0].height + _this.CustomBar;
				_this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - _this.CustomBar - res[0].height;
			});
			//#endif
			this.GetEmployeeInfo();
		},
		methods: {
			initPerformace() {
				this.Performance.Quantity = '';
				this.Performance.Amount = '';
				this.Performance.EmployeeName = '';
				this.Performance.Remarks = '';
			},
			DateChange(e) {
				
				this.SelectYearMonth = e.target.value
				this.SelectYearMonthText = e.target.value.toString().split('-')[0] + '年' + e.target.value.toString().split('-')[1] +
					'月';
				if (parseInt(e.target.value.toString().split('-')[1]) === (new Date().getMonth() + 1)) {
					//选择月份是当前月份
					this.GetEmployeeInfo();
				} else {
					//选择月份小于当前月份
					this.GetEmployeeInfo();
				}
			},
			GetEmployeeInfo() {
				uni.showLoading({
					title: '请稍后...'
				})
				let ajaxJson = {
					type: "Search",
					Parameter: {
						Conditions: [{
							FieldName: "UserId",
							Operation: "EQUAL",
							ConditionValue: uni.getStorageSync('JSUserInfo').UserId,
							Relationship: 'AND'
						}]
					}
				};
				this.$mbservices.Request(this.$webapi.GetEmployee, 'POST', ajaxJson, res => {
					if (res.data.RecordCount > 0) {
						uni.hideLoading()
						this.getPerformance(res.data.data[0].EmployeeId)
					}
				}, err => {

				})
			},
			getPerformance(EmployeeId) {
				uni.showLoading({
					title: '请稍后...'
				})
				let ajaxJson = {
					type: "Search",
					Parameter: {
						Conditions: [{
							FieldName: "EmployeeId",
							Operation: "EQUAL",
							ConditionValue: EmployeeId,
							Relationship: 'AND'
						}, {
							FieldName: "Year",
							Operation: "EQUAL",
							ConditionValue: this.$mbservices.formatDateTime(this.SelectYearMonth + '-01', 'yyyy'),
							Relationship: 'AND'
						}, {
							FieldName: "Month",
							Operation: "EQUAL",
							ConditionValue: this.$mbservices.formatDateTime(this.SelectYearMonth + '-01', 'MM'),
							Relationship: 'AND'
						}]
					}
				};
				this.$mbservices.Request(this.$webapi.GetPerformace, 'POST', ajaxJson, res => {
					this.initPerformace();
					if (res.data.RecordCount > 0) {
						this.Performance = res.data.data[0];
						this.Performance.Quantity = parseInt(this.Performance.Quantity);
						this.Performance.Amount = parseFloat(this.Performance.Amount).toFixed(2);
					} else {
						uni.showToast({
							title: '查无数据',
							icon: 'none'
						})
					}
					setTimeout(function() {
						uni.hideLoading()
					}, 500);
				}, err => {
					this.initPerformace();
					uni.showToast({
						title: err,
						icon: 'none'
					})
					setTimeout(function() {
						uni.hideLoading()
					}, 500);
				})
			}
		}
	}
</script>

<style>

</style>
