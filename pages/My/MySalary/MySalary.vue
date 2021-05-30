<template>
	<view>
		<custom>我的工资条</custom>
		<view class="menu sm-border animation-slide-bottom salary">
			<view class="cu-item salary-month">
				<view class="action card-row-title">
					<picker mode="date" fields="month" :value="SelectYearMonth" :start="StartYearMonth"
						:end="EndYearMonth" @change="DateChange">
						<view class="picker text-center">
							<text
								class="salary-date-month cu-tag round shadow bg-grey text-center light">{{SelectYearMonthText}}</text>
						</view>
					</picker>
				</view>
			</view>
			<view class="cu-item card-row-content">
				<view class="content justify-center">
					<view class="salary-content">
						<text class="line-black salary-content-left">实发薪资</text>
						<text class="line-black salary-content-right">￥ {{salaryValue}}</text>
					</view>

				</view>

			</view>

		</view>
		<view class="salary-item-content">
			<scroll-view class="salary-item" scroll-y="true">
				<view class="cu-list menu card-menu sm-border animation-slide-bottom margin-top"
					:style="[{animationDelay: (0 + 1)*0.1 + 's'}]" v-if="SalaryInfo.SalaryLines.length>0">

					<view class="flex" v-for="(item,index) in SalaryInfo.SalaryLines" :key="index"
						v-if="item.IsShowInClient==='Yes'">
						<view class="flex-sub padding-sm radius basis-xl">
							<text class="text-grey text-left">{{item.FieldName}}</text>
						</view>
						<view class="flex-sub padding-sm radius basis-xs text-right">
							<text class="text-grey text-right badge radius">￥ {{item.Value}}</text>
						</view>
					</view>
				</view>
				<view style="height: 50px;"></view>
			</scroll-view>
		</view>
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
				SalaryList: [],
				salaryValue: 0
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
				this.SelectYearMonthText = e.target.value.toString().split('-')[0] + '年' + e.target.value.toString().split(
						'-')[1] +
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
							ConditionValue: this.$mbservices.formatDateTime(this.SelectYearMonth + '-01',
								'yyyy'),
							Relationship: 'AND'
						}, {
							FieldName: "Month",
							Operation: "EQUAL",
							ConditionValue: this.$mbservices.formatDateTime(this.SelectYearMonth + '-01',
								'MM'),
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
									if (_item.FieldName === "实发工资") {
										// 实发薪资
										this.salaryValue = _item.Value;
									}
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
	.card-row-title {
		height: 80upx;
	}

	.salary-month {
		position: relative;
		top: 10%;
	}

	.card-row-content {
		text-align: center;
		position: relative;
		top: 20%;
		padding: 0 100upx;
	}

	.salary {
		position: fixed;
		width: 100%;
		z-index: 100;
		background-image: linear-gradient(#069459, #39b348);
		height: 200upx;
	}

	.salary-content {
		height: 100upx;
		color: #F4F5F6;
	}

	.salary-date-month {
		font-size: 35upx;
		background-color: none;
		background: none !important;
		color: #fff !important;
		box-shadow: none;
	}

	.salary-content .salary-content-left {
		float: left;
	}

	.salary-content .salary-content-right {
		float: right;
	}

	.line-black {
		display: block;
		color: #F4F5F6;
	}

	.salary-item {
		position: relative;
		top: 200rpx;
	}

	.salary-item .menu {
		margin-left: 80upx;
		margin-right: 80rpx;
	}
</style>
