<template>
	<view>
		<custom>我的考勤汇总</custom>
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
					<text class="icon-ellipse text-orange"></text>
					<text class="text-grey">请假</text>
				</view>
				<view class="cu-item padding">
					<view class="content">
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">病&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;假：{{AttendanceEntity.SickLeave}}天</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">事&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;假：{{AttendanceEntity.PersonLeave}}天</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;假：{{AttendanceEntity.LeaveWithSalary}}天</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">亲&nbsp;情&nbsp;&nbsp;假：{{AttendanceEntity.LeaveWithSalary}}天</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">带薪病假：{{AttendanceEntity.LeaveWithSalary}}天</text>
						</view>
					</view>
					<view class="content">
						<view>
							<text class="text-grey text-white">无</text>
						</view>
						<view>
							<text class="text-grey text-white">无</text>
						</view>
						<view>
							<text>剩余:{{AttendanceEntity.UseNianJia}}天</text><text class="text-grey margin-left-sm">总数:{{AttendanceEntity.SumNianJia}}天</text>
						</view>
						<view>
							<text>剩余:{{AttendanceEntity.UseQinQingJia}}天</text><text class="text-grey margin-left-sm">总数:{{AttendanceEntity.SumQinQingJia}}天</text>
						</view>
						<view>
							<text>剩余:{{AttendanceEntity.UseDaiXinBingJia}}天</text><text class="text-grey margin-left-sm">总数:{{AttendanceEntity.SumDaiXinBingJia}}天</text>
						</view>
					</view>
				</view>
				<view class="cu-item padding">
					<view class="content">
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">请假合计：{{AttendanceEntity.LeaveWithSalaryLast}}天</text>
						</view>
					</view>
					<view class="action">
						<text class="text-green text-right">带薪假总数：{{AttendanceEntity.LeaveWithSalaryTotal}}天</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu sm-border card-menu animation-slide-bottom" :style="[{animationDelay: (1 + 1)*0.1 + 's'}]">
				<view class="cu-item">
					<text class="icon-ellipse text-orange"></text>
					<text class="text-grey">考勤</text>
				</view>
				<view class="cu-item padding">
					<view class="content">
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">迟到：{{AttendanceEntity.Late}}次</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">早退：{{AttendanceEntity.Early}}次</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">旷工：{{AttendanceEntity.NeglectWork}}次</text>
						</view>
					</view>
				</view>
				<view class="cu-item padding">
					<view class="content">
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">应出勤天数：{{AttendanceEntity.StandardAttendanceCount}}天</text>
						</view>
					</view>
					<view class="action">
						<text class="text-green text-right">实际出勤：{{AttendanceEntity.ActualAttendanceCount}}天</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu sm-border card-menu animation-slide-bottom" :style="[{animationDelay: (2 + 1)*0.1 + 's'}]">
				<view class="cu-item">
					<text class="icon-ellipse text-orange"></text>
					<text class="text-grey">加班</text>
				</view>
				<view class="cu-item padding">
					<view class="content">
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">工作日加班：{{AttendanceEntity.GExtraWorkHours}}小时</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">休息日加班：{{AttendanceEntity.RExtraWorkHours}}小时</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">节假日加班：{{AttendanceEntity.HExtraWorkHours}}小时</text>
						</view>
					</view>
					<view class="content">
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">餐补：{{AttendanceEntity.GExtraWorkMeal}}次</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">餐补：{{AttendanceEntity.RExtraWorkMeal}}次</text>
						</view>
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">餐补：{{AttendanceEntity.HExtraWorkMeal}}次</text>
						</view>
					</view>
				</view>
				<view class="cu-item padding">
					<view class="content">
						<view>
							<text class="icon-title text-grey"></text>
							<text class="text-grey">加班合计：{{AttendanceEntity.HoursTotal}}小时</text>
						</view>
					</view>
					<view class="action">
						<text class="text-green text-right">餐补合计：{{AttendanceEntity.MealsTotal}}次</text>
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
			this.getCurrentAttendanceRecords()
		},
		methods: {
			DateChange(e) {
				this.SelectYearMonth = e.target.value
				this.SelectYearMonthText = e.target.value.toString().split('-')[0] + '年' + e.target.value.toString().split('-')[1] +
					'月';
				if (parseInt(e.target.value.toString().split('-')[1]) === (new Date().getMonth() + 1)) {
					//选择月份是当前月份
					this.getCurrentAttendanceRecords();
				} else{
					//选择月份小于当前月份
					this.getLastAttendanceRecords();
				} 
				//(parseInt(e.target.value.toString().split('-')[1]) < (new Date().getMonth() + 1)) 
				/* else {
					uni.showToast({
						title: '选择月份不正确',
						icon: 'none'
					})
				} */
			},
			InitAttendanceEntity() {
				this.AttendanceEntity.SickLeave = 0;
				this.AttendanceEntity.PersonLeave = 0;
				this.AttendanceEntity.LeaveWithSalary = 0;
				this.AttendanceEntity.LeaveWithSalaryLast = 0;
				this.AttendanceEntity.LeaveWithSalaryTotal = 0;
				this.AttendanceEntity.Late = 0;
				this.AttendanceEntity.Early = 0;
				this.AttendanceEntity.NeglectWork = 0;
				this.AttendanceEntity.StandardAttendanceCount = 0;
				this.AttendanceEntity.ActualAttendanceCount = 0;
				this.AttendanceEntity.GExtraWorkHours = 0;
				this.AttendanceEntity.GExtraWorkMeal = 0;
				this.AttendanceEntity.RExtraWorkHours = 0;
				this.AttendanceEntity.RExtraWorkMeal = 0;
				this.AttendanceEntity.HExtraWorkHours = 0;
				this.AttendanceEntity.HExtraWorkMeal = 0;
				this.AttendanceEntity.HoursTotal = 0;
				this.AttendanceEntity.MealsTotal = 0;
				this.AttendanceEntity.SumNianJia = 0;
				this.AttendanceEntity.SumDaiXinBingJia = 0;
				this.AttendanceEntity.SumQinQingJia = 0;
				this.AttendanceEntity.LastNianJia = 0;
				this.AttendanceEntity.LastDaiXinBingJia = 0;
				this.AttendanceEntity.LastQinQingJia = 0;
				this.AttendanceEntity.UseNianJia = 0;
				this.AttendanceEntity.UseDaiXinBingJia = 0;
				this.AttendanceEntity.UseQinQingJia = 0;
			},
			getLastAttendanceRecords() {
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
							Relationship: 'AND',
						}, {
							FieldName: "ARDate",
							Operation: "EQUAL",
							ConditionValue: this.$mbservices.formatDateTime(this.SelectYearMonth + '-01', 'yyyy-MM'),
							Relationship: 'AND'
						}]
					}
				};
				this.$mbservices.Request(this.$webapi.GetAttendanceRecords, 'POST', ajaxJson, res => {
					if (res.data.RecordCount > 0) {
						this.InitAttendanceEntity()
						this.AttendanceEntity.ActualAttendanceCount = res.data.data[0].ActualAttendanceCount;
						this.AttendanceEntity.Early = res.data.data[0].Early;
						this.AttendanceEntity.GExtraWorkHours = res.data.data[0].GExtraWorkHours;
						this.AttendanceEntity.GExtraWorkMeal = res.data.data[0].GExtraWorkMeal;
						this.AttendanceEntity.HExtraWorkHours = res.data.data[0].HExtraWorkHours;
						this.AttendanceEntity.HExtraWorkMeal = res.data.data[0].HExtraWorkMeal;
						this.AttendanceEntity.Late = res.data.data[0].Late;
						this.AttendanceEntity.NeglectWork = res.data.data[0].Absence;
						this.AttendanceEntity.PersonLeave = res.data.data[0].PersonalLeave;
						this.AttendanceEntity.RExtraWorkHours = res.data.data[0].RExtraWorkHours;
						this.AttendanceEntity.RExtraWorkMeal = res.data.data[0].RExtraWorkMeal;
						this.AttendanceEntity.SickLeave = res.data.data[0].SickLeave;
						this.AttendanceEntity.StandardAttendanceCount = res.data.data[0].StandardAttendanceCount;
						this.AttendanceEntity.HoursTotal = parseFloat(this.AttendanceEntity.GExtraWorkHours) + parseFloat(this.AttendanceEntity
							.RExtraWorkHours) + parseFloat(this.AttendanceEntity.HExtraWorkHours);
						this.AttendanceEntity.MealsTotal = parseInt(this.AttendanceEntity.GExtraWorkMeal) + parseInt(this.AttendanceEntity
							.HExtraWorkMeal) + parseInt(this.AttendanceEntity.RExtraWorkMeal);
						this.calcLeaveWithSalaryDays()
					} else {
						uni.showToast({
							title: '查无数据',
							icon: 'none'
						})
						this.InitAttendanceEntity()
					}
					setTimeout(function() {
						uni.hideLoading()
					}, 500);
				}, err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
					setTimeout(function() {
						uni.hideLoading()
					}, 500);
				})
			},
			calcLeaveWithSalaryDays() {
				let ajaxJson = {
					ARDate: this.SelectYearMonth
				};
				this.$mbservices.Request(this.$webapi.GetCurrentMonthAttendanceRecord, 'POST', ajaxJson, res => {
					if (res.data.RecordCount > 0) {
						this.AttendanceEntity.LeaveWithSalary = res.data.data.LeaveWithSalary;
						this.AttendanceEntity.LeaveWithSalaryLast = res.data.data.LeaveWithSalaryLast;
						this.AttendanceEntity.LeaveWithSalaryTotal = res.data.data.LeaveWithSalaryTotal;
					}
				}, err => {});
			},
			getCurrentAttendanceRecords() {
				uni.showLoading({
					title: '请稍后...'
				})
				let ajaxJson = {
					ARDate: this.SelectYearMonth
				};
				this.$mbservices.Request(this.$webapi.GetCurrentMonthAttendanceRecord, 'POST', ajaxJson, res => {
					if (res.data.RecordCount > 0) {
						this.InitAttendanceEntity()
						this.AttendanceEntity = res.data.data;
					} else {
						uni.showToast({
							title: res.data.data,
							icon: 'none'
						})
					}
					setTimeout(function() {
						uni.hideLoading()
					}, 500);
				}, err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
					setTimeout(function() {
						uni.hideLoading()
					}, 500);
				});
			}
		}
	}
</script>

<style>

</style>
