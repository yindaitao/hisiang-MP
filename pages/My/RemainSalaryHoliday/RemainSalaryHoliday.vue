<template>
	<view>
		<custom>剩余假期</custom>
		<view id="tab-bar" class="cu-bar top"></view>
		<scroll-view scroll-y="true" :style="{'height':scrollBarHeight+'px'}">
			<view class="cu-list menu sm-border card-menu animation-slide-bottom" :style="[{animationDelay: (0 + 1)*0.1 + 's'}]">
				<view class="cu-item">
					<text class="icon-ellipse text-orange light"></text>
					<text class="text-grey">假期</text>
				</view>
				<view class="cu-item padding">
					<view class="content">
						<view v-for="(item,index) in SalaryHolidayList">
							<text class="icon-title text-grey"></text>
							<text class="text-grey">{{item.HolidayTypeName}}</text>
						</view>
					</view>
					<view class="content">
						<view v-for="(item,index) in SalaryHolidayList">
							<text>剩余:{{item.RemainNum}}天</text><text class="text-grey margin-left-sm">总数:{{item.TotalNum}}天</text>
						</view>
					</view>
				</view>
				<view class=" flex justify-center ">
					<view class="text-gray">
						<text>{{currYear}}年度您享有假期类型，剩余量及总量</text>
					</view>
					<!-- <text class="text-grey">&nbsp;</text> -->
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
				currYear:(new Date()).getFullYear(),
				scrollBarHeight: 0,
				SelectYearMonth: nowDate,
				SelectYearMonthText: nowDateText,
				StartYearMonth: startTime,
				EndYearMonth: nowDateMonth,
				SalaryHolidayList: [],
				AttendanceEntity: {
					SickLeave: 0,
					PersonLeave: 0,
					LeaveWithSalary: 0,
					LeaveWithSalaryLast: 0,
					LeaveWithSalaryTotal: 0,
					Late: 0,
					Early: 0,
					NeglectWork: 0,
					StandardAttendanceCount: 0,
					ActualAttendanceCount: 0,
					GExtraWorkHours: 0,
					GExtraWorkMeal: 0,
					RExtraWorkHours: 0,
					RExtraWorkMeal: 0,
					HExtraWorkHours: 0,
					HExtraWorkMeal: 0,
					HoursTotal: 0,
					MealsTotal: 0,
					SumNianJia: 0,
					SumDaiXinBingJia: 0,
					SumQinQingJia: 0,
					LastNianJia: 0,
					LastDaiXinBingJia: 0,
					LastQinQingJia: 0,
					UseNianJia: 0,
					UseDaiXinBingJia: 0,
					UseQinQingJia: 0
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
			this.getSalaryHoliday();
		},
		methods: {

			getSalaryHoliday() {
				var year = new Date().getFullYear();
				console.log(year);
				uni.showLoading({
					title: '请稍后...'
				})
				var ajaxJson = {
					type: "Search",
					Parameter: {
						LoadChildren: "NoLoad",
						Conditions: [{
							FieldName: "UserName",
							Operation: "EQUAL",
							ConditionValue: uni.getStorageSync("JSUserInfo").UserName,
							Relationship: "AND"
						},{
							FieldName: "Year",
							Operation: "EQUAL",
							ConditionValue: this.currYear,
							Relationship: "AND"
						}],
						Sorts: [{
								FieldName: "UserName",
								type: "Descending"
							},
							{
								FieldName: "HolidayTypeName",
								type: "Descending"
							}
						]
					},
				};
				this.$mbservices.Request(this.$webapi.RemainSalaryHolidayLog, 'POST', ajaxJson, res => {
					console.log(res.data);
					if (res.data.RecordCount > 0) {
						this.SalaryHolidayList = res.data.data;
						console.log(this.SalaryHolidayList);
						uni.hideLoading();
					}
				}, err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
					uni.hideLoading();
				});
			}
		}
	}
</script>

<style>

</style>
