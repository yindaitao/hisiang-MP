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
			<view class="cu-list menu sm-border card-menu animation-slide-bottom">
				<view class="cu-item">
					<view class="content">
						<text class="icon-ellipse text-orange light"></text>
						{{UserName}}
					</view>
					<view class="action">
						<text class="text-grey">业绩/绩效</text>
					</view>
				</view>
				<view class="cu-item padding" style="min-height: 100px;" v-for="(Performance,index) in PerformanceList" :key="index"
				 :style="[{animationDelay: (index + 1)*0.1 + 's'}]">
					<view class="content">
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
						<text class="text-green text-right">合计:{{Total}}</text>
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
				UserName: uni.getStorageSync("JSUserInfo").UserName,
				scrollBarHeight: 0,
				SelectYearMonth: nowDate,
				SelectYearMonthText: nowDateText,
				StartYearMonth: startTime,
				EndYearMonth: nowDateMonth,
				Performance1: {
					Quantity: '',
					Amount: '',
					EmployeeName: '',
					Remarks: ''
				},
				PerformanceList: [{
					Quantity: '',
					Amount: '',
					EmployeeName: '',
					Remarks: ''
				}, {
					Quantity: '',
					Amount: '',
					EmployeeName: '',
					Remarks: ''
				}, {
					Quantity: '',
					Amount: '',
					EmployeeName: '',
					Remarks: ''
				}, {
					Quantity: '',
					Amount: '',
					EmployeeName: '',
					Remarks: ''
				}, {
					Quantity: '',
					Amount: '',
					EmployeeName: '',
					Remarks: ''
				}],
				Total: 0.00
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
					this.PerformanceList = [];
					this.Total = 0.00;
					if (res.data.RecordCount > 0) {
						res.data.data.forEach((item) => {
							item.Quantity = parseInt(item.Quantity);
							item.Amount = parseFloat(item.Amount).toFixed(2);
							this.Total = parseFloat(item.Amount) + parseFloat(this.Total);
							this.PerformanceList.push(item);
						})
						this.Total = parseFloat(this.Total).toFixed(2)===0?0.00:parseFloat(this.Total).toFixed(2);
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
