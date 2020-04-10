<template>
	<view>
		<custom>我的工资条</custom>
		<view id="tab-bar" class="cu-bar top">
			<view class="action">请选择年月</view>
			<view class="action ">
				<picker mode="date" fields="month" :value="SelectYearMonth" :start="StartYearMonth" :end="EndYearMonth" @change="DateChange">
					<view class="picker text-center">
						<text class="cu-tag round shadow bg-grey text-center light">{{SelectYearMonthText}}</text>
					</view>
				</picker>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{'height':scrollBarHeight+'px'}">
			<view class="cu-list menu card-menu sm-border animation-slide-bottom margin-top" :style="[{animationDelay: (0 + 1)*0.1 + 's'}]"
			 v-if="SalaryInfo.SalaryLines.length>0">
				<!-- <view class="cu-item">
					<text class="icon-ellipse text-orange"></text>
					<text class="text-grey">工资条</text>
				</view> -->
				<view class="flex bg-blue">
					<view class="flex-sub padding-sm radius basis-xl">
						<text class="icon-ellipse text-orange"></text>
					</view>
					<view class="flex-sub padding-sm radius basis-xs text-right">
						<text class="text-orange text-bold">工资条</text>
					</view>
				</view>
				<view class="flex" v-for="(item,index) in SalaryInfo.SalaryLines" :key="index" v-if="item.IsShowInClient==='Yes'">
					<view class="flex-sub padding-sm radius basis-xl">
						<text class="icon-title text-grey"></text>
						<text class="text-grey text-left">{{item.FieldName}}</text>
					</view>
					<view class="flex-sub padding-sm radius basis-xs text-right">
						<text class="text-grey text-right badge radius">{{item.Value}}</text>
					</view>
				</view>
				<!-- <view class="cu-item padding">
					<view class="content">
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">&nbsp;</text>
						</view>
					</view>
					<view class="action">
						<text class="text-green text-right">&nbsp;</text>
					</view>
				</view> -->
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
				SalaryInfo: {
					SalaryLines: []
				},
				SalaryList: []
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
			this.GetMySalaryRecord()
		},
		methods: {
			DateChange(e) {
				this.SelectYearMonth = e.target.value
				this.SelectYearMonthText = e.target.value.toString().split('-')[0] + '年' + e.target.value.toString().split('-')[1] +
					'月';
				this.GetMySalaryRecord();
			},
			UpdateReadLog() {
				if (this.SalaryList.length > 0) {
					this.$mbservices.Request(this.$webapi.SaveSSReadTimes, 'POST', this.SalaryList, res => {
						uni.hideLoading()
					}, err => {
						uni.hideLoading()
					})
				}
			},
			GetMySalaryRecord() {
				uni.showLoading({
					title: '请稍后...'
				})
				let ajaxJson = {
					type: "Search",
					Parameter: {
						LoadChildren: "Load",
						Conditions: [{
							FieldName: "EmployeeId",
							Operation: "EQUAL",
							ConditionValue: uni.getStorageSync('JSUserInfo').UserId,
							Relationship: 'AND',
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
				this.$mbservices.Request(this.$webapi.GetMySalaryList, 'POST', ajaxJson, res => {
					if (res.data.RecordCount > 0) {
						this.SalaryInfo.SalaryLines = [];
						this.SalaryList = res.data.data;
						res.data.data.forEach((item, index) => {
							item.SalaryLines.forEach((_item, _index) => {
								if (_item.IsShowInClient === 'Yes') {
									_item.Value = parseFloat(_item.Value).toFixed(2);
									this.SalaryInfo.SalaryLines.push(_item);
								}
							})
						});
						this.UpdateReadLog();
						//this.SalaryInfo = res.data.data[0];
					} else {
						this.SalaryInfo.SalaryLines = [];
						uni.showToast({
							title: '查无数据',
							icon: 'none'
						})
					}
					uni.hideLoading()
				}, err => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>
