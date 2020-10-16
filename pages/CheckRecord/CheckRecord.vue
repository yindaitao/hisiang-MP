<template>
	<view>
		<custom>历史打卡记录</custom>
		<scroll-view scroll-y :style="{'height':scrollBarHeight+'px'}">
			<EiCalendar ref="calendar" :drawer="false" :disabled="false" title=" " @date-change="change" :visible.sync="show"
			 type="single" :disabledDate="disabledDate" v-model="dateNew" :custom-date="customDate" format="YYYY-MM-DD" @click="click"></EiCalendar>
			<view class="cu-bar bg-white">
				<view class="action">
					<!-- <text class="icon-title text-orange text-sm"></text> 标签释义 -->
				</view>
				<view class="action">
					<text class="text-blue text-sm" @tap="showModal">标签释义</text>
					<!-- <button class="cu-btn line-green round sm" @tap="showModal" data-target="Modal">查看</button> -->
				</view>
			</view>
			<!-- 打卡记录-->
			<view class="cu-timeline bg-white" v-for="(item,index) in CheckRecords" :key="index" style="background-color: rgba(0,0,0,0);">
				<!-- style="background-color: rgba(0,0,0,0);" -->
				<view class="cu-time cu-tag radius round margin-left">第{{index+1}}次打卡<text v-if="ScheduleEntity.AttendanceAccording==='Wifi'&&item.RecordIsEffective!=='Yes'"
					 class="cu-tag radius bg-red">无效</text></view>
				<view class="cu-item">
					<view class="content">
						<view class="cu-capsule radius" style="background-color: rgba(0,0,0,0);">
							<view class="cu-tag bg-cyan" v-if="getMornAfter(item.CheckDatetime)==='上午'">{{getMornAfter(item.CheckDatetime)}}</view>
							<view class="cu-tag bg-orange" v-if="getMornAfter(item.CheckDatetime)==='下午'">{{getMornAfter(item.CheckDatetime)}}</view>
							<view class="cu-tag bg-red" v-if="getMornAfter(item.CheckDatetime)==='未知'">{{getMornAfter(item.CheckDatetime)}}</view>
							<view class="cu-tag line-cyan" v-if="getMornAfter(item.CheckDatetime)==='上午'">{{getCheckTime(item.CheckDatetime)}}</view>
							<view class="cu-tag line-orange" v-if="getMornAfter(item.CheckDatetime)==='下午'">{{getCheckTime(item.CheckDatetime)}}</view>
							<view class="cu-tag line-red" v-if="getMornAfter(item.CheckDatetime)==='未知'">{{getCheckTime(item.CheckDatetime)}}</view>
						</view>
						<view class="margin-top">
							<text class="icon-locationfill"></text>{{item.RecordAddress}}附近
						</view>
					</view>
					<view class="content" v-if="item.RecordRemarks.length>0">{{item.RecordRemarks}}</view>
					<view class="content" v-if="item.PicPaths.length>0">
						<view class="cu-form-group text-left bg-white" style="background-color: rgba(0,0,0,0);">
							<!-- style="background-color: rgba(0,0,0,0);" -->
							<view class="grid col-4 grid-square flex-sub">
								<view class="padding-xs bg-img" :style="'background-image:url(' + _item +')'" v-for="(_item,_idx) in item.PicPaths"
								 :key="_idx" @tap="ViewImage1(item.PicPaths,_idx)" :data-url="_item">
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</scroll-view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog restHeight">
				<view class="cu-bar bg-orange justify-end">
					<view class="content">标签释义</view>
					<view class="action" @tap="hideModal">
						<text class="icon-close text-black"></text>
					</view>
				</view>
				<view class="">
					<view class="padding-sm text-left ">
						<view>
							<text class="text-green text-xxl icon icon-title"></text><text class="text-sm text-green">◉：</text><text class="text-gray text-sm">表示考勤正常</text>
						</view>
						<view>
							<text class="text-olive text-xxl icon icon-title"></text><text class="text-sm text-olive">出差：</text><text class="text-gray text-sm">表示国内出差或者国外出差</text>
						</view>
						<view>
							<text class="text-blue text-xxl icon icon-title"></text><text class="text-sm text-blue">请假：</text><text class="text-gray text-sm">表示全天请假</text>
						</view>
						<view>
							<text class="text-blue text-xxl icon icon-title"></text><text class="text-sm text-blue">上午请假：</text><text class="text-gray text-sm">表示上午请假</text>
						</view>
						<view>
							<text class="text-blue text-xxl icon icon-title"></text><text class="text-sm text-blue">下午请假：</text><text class="text-gray text-sm">表示下午请假</text>
						</view>
						<view>
							<text class="text-red text-xxl icon icon-title"></text><text class="text-sm text-red">旷工：</text><text class="text-gray text-sm">缺少上班或下班打卡，或全天无打卡出勤记录，或上下班打卡无效</text>
						</view>
						<view>
							<text class="text-pink text-xxl icon icon-title"></text><text class="text-sm text-pink">迟到：</text><text class="text-gray text-sm">晚于规定上班时间签到，或上班签到时间无效</text>
						</view>
						<view>
							<text class="text-orange text-xxl icon icon-title"></text><text class="text-sm text-orange">早退：</text><text
							 class="text-gray text-sm">早于规定的下班时间签退，或下班时间无效</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import EiCalendar from '@/components/ei-calendar/ei-calendar';
	export default {
		components: {
			EiCalendar
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			let thisDate = this.$mbservices.formatDateTime(new Date(), 'yyyy/MM/dd')
			let eeDate = this.$mbservices.calcJiaJianDays(thisDate, 0, 1)
			return {
				modalName: '',
				scrollBarHeight: 0,
				show: true,
				dateNew: [],
				customDate: [{
					cellClass: 'custom-cell',
					date: '',
					top: [
						/* {
							class: 'custom-cell-top-1',
							text: '√'
						}, */
						/* {
							class: 'custom-cell-top-2',
							text: '◒'
						} */
					],
					bottom: [{
							class: 'custom-cell-top-1',
							text: ''
						},
						/* {
							class: 'custom-cell-top-2',
							text: '◒'
						} */
					]
				}],
				SpeciDateList: [],
				CheckRecords: [],
				signData: [],
			}
		},
		mounted() {
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var new_date = new Date(year, month, 1);
			var day = new Date(new_date.getTime() - 1000 * 60 * 60 * 24).getDate();
			this.changeMonth([year, month, day])
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar;
			var that = this;
			uni.showLoading({
				title: '正在加载...'
			})
			//this.getHolidaySchedule();
			//that.getYearMonth();
			//that.getData(that.time);
			uni.hideLoading();
			//#endif
		},
		onShow() {
			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar;
			//#endif
			this.$forceUpdate();
		},
		methods: {
			clickP(e) {
				e.preventDefault()
			},
			showModal(e) {
				this.modalName = 'Modal';
			},
			hideModal() {
				this.modalName = null;
			},
			change(a) {
				//this.getAttendanceRecord(a);
				let isCurr = a + '/01';
				if (this.$mbservices.formatDateTime(isCurr, 'yyyy-MM') === this.$mbservices.formatDateTime((new Date()), 'yyyy-MM')) {
					this.getAttendanceRecordCurrMonth(this.$mbservices.formatDateTime(isCurr, 'yyyy-MM'));
				} else {
					this.getAttendanceRecord(a);
				}
			},
			click(e) {
				this.getWorkRecords(e.format, "clickSign");
			},
			disabledDate(date) {
				let a = this.$mbservices.formatDateTime((new Date()).getFullYear() + '-01' + '01', 'yyyy-MM-dd');
				const start = new Date(a).getTime();
				let b = this.$mbservices.formatDateTime(this.$mbservices.calcJiaJianDays(new Date(), 0, 1), 'yyyy-MM-dd');
				const end = new Date(b).getTime();
				if (this.SpeciDateList.length > 0) {
					let isHas = false;
					this.SpeciDateList.forEach((item) => {
						if (this.$mbservices.formatDateTime(date, 'yyyy-MM-dd') === this.$mbservices.formatDateTime(item, 'yyyy-MM-dd')) {
							isHas = true;
						}
					});
					if (isHas) {
						return true;
					}
				}
				return date.getTime() <= start || date.getTime() >= end;
			},
			// 月改变
			changeMonth(data) {
				var that = this;
				var start = data[0] + "-" + data[1] + "-1";
				var end = data[0] + "-" + (data[1] + 1) + "-1";
				let date = new Array();
				date.push(start);
				date.push(end);
				that.selectDates = [];
				that.selectDates = date;
				//重新加载数据
				/* this.getHouseRoomEveryDayPrice();
				if (!this.price.type)
					uni.showLoading({
						title: '加载中',
						mask: true
					})
				uni.hideLoading() */
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			getCheckTime(value) {
				let str = '';
				str = this.$mbservices.formatDateTime(value, 'hh:mm:ss');
				return str;
			},
			getMornAfter(value) {
				let num = this.$mbservices.formatDateTime(value, 'hh');
				if (parseInt(num) > 12) {
					return '下午'
				}
				if (parseInt(num) <= 12) {
					return '上午'
				}
				return '未知'
			},
			//获取当前用户打卡记录数组
			getData(val) {
				var date = new Date(val.split('-')[0], val.split('-')[1], 0);
				var day = date.getDate();
				for (var i = 1; i <= day; i++) {
					let m = val.split('-')[1];
					if (parseInt(m) >= 10) {
						m = m;
					} else {
						m = "0" + m;
					}
					if (parseInt(i) >= 10) {
						i = i;
					} else {
						i = "0" + i;
					}
					this.getWorkRecords(val.split('-')[0] + "/" + m + "/" + i, "");
				}
				this.sumCount = 88; //res.SumCount
				console.log(this.signData);
			},
			getImgPathArr(path) {
				let arr = [];
				if (path.toString().lastIndexOf(',') <= -1 && this.$mbservices.isEmpty(path)) {
					return arr;
				}
				if (path.toString().lastIndexOf(',') <= -1 && !this.$mbservices.isEmpty(path)) {
					arr.push(this.$webapi.webroot + '/' + path);
				}
				if (path.toString().lastIndexOf(',') > -1) {
					let cArr = path.toString().split(',');
					cArr.forEach(item => {
						arr.push(this.$webapi.webroot + '/' + item);
					})
				}
				return arr;
			},
			getLastDay(value) {
				var seperator1 = "-";
				var date = new Date(value);
				var new_month = date.getMonth() + 1;
				var new_year = date.getFullYear();
				//取当前的年份     
				var new_date = new Date(new_year, new_month, 1);
				//取当年当月中的第一天     
				// (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期   
				var currentdate = new_year + seperator1 + new_month + seperator1 + (new Date(new_date.getTime() - 1000 * 60 * 60 *
					24)).getDate();
				return currentdate;
			},
			getAttendanceRecordCurrMonth(YearMonth) {
				uni.showLoading({
					title: '请稍后...'
				});
				let Edate = this.getLastDay(YearMonth);
				let param = {
					Sdate: this.$mbservices.formatDateTime(YearMonth + '-01', 'yyyy-MM-dd'),
					Edate: this.$mbservices.formatDateTime(Edate, 'yyyy-MM-dd'),
					CurrMonth: this.$mbservices.formatDateTime(YearMonth + '-01', 'yyyy-MM')
				};
				this.$mbservices.Request(this.$webapi.GetUserAttendanceRecordDetailBySdateEdateCurrMonth, 'POST', param, res => {
					if (res.data.RecordCount) {
						this.customDate = [];
						res.data.data.data.forEach((item, index) => {
							let option = {
								cellClass: 'custom-cell',
								date: item.ARDate,
								bottom: [],
								top: []
							};
							if (item.IsWorkDate === 'N') {
								let tag = {
									class: 'text-grey',
									text: item.WorkDateText
								}
								option.bottom.push(tag);
							} else {
								//工作日
								let isDoTag = false;
								if (item.DomesticGooutDays > 0 || item.AbroadGooutDays > 0) {
									let tag = {
										class: 'text-olive',
										text: '出差'
									}
									option.bottom.push(tag);
									isDoTag = true;
								}
								if ((!isDoTag) && (item.PersonalLeave > 0 || item.SalaryLeave > 0)) {
									if (this.$mbservices.isEmpty(item.FirstCheckDate) && !this.$mbservices.isEmpty(item.SecondCheckDate)) {
										let tag = {
											class: 'text-blue',
											text: '上午请假'
										}
										option.bottom.push(tag);
									} else if (!this.$mbservices.isEmpty(item.FirstCheckDate) && this.$mbservices.isEmpty(item.SecondCheckDate)) {
										let tag = {
											class: 'text-blue',
											text: '下午请假'
										}
										option.bottom.push(tag);
									} else {
										let tag = {
											class: 'text-blue',
											text: '请假'
										}
										option.bottom.push(tag);
									}
									isDoTag = true;
								}
								if ((!isDoTag && item.Absence > 0) || (!isDoTag && this.$mbservices.isEmpty(item.FirstCheckDate) && this.$mbservices
										.isEmpty(
											item.SecondCheckDate))) {
									let tag = {
										class: 'text-red',
										text: '旷工'
									}
									option.bottom.push(tag);
									isDoTag = true;
								}
								if ((!isDoTag) && (item.Late > 0 || (this.$mbservices.isEmpty(item.FirstCheckDate) && !this.$mbservices.isEmpty(
										item.SecondCheckDate)))) {
									let tag = {
										class: 'text-pink',
										text: '迟到'
									}
									option.bottom.push(tag);
									isDoTag = true;
								}
								if ((!isDoTag) && (item.Early > 0 || (!this.$mbservices.isEmpty(item.FirstCheckDate) && this.$mbservices.isEmpty(
										item.SecondCheckDate)))) {
									let tag = {
										class: 'text-orange',
										text: '早退'
									}
									option.bottom.push(tag);
									isDoTag = true;
								}
								if (!isDoTag && !this.$mbservices.isEmpty(item.FirstCheckDate) && !this.$mbservices.isEmpty(item.SecondCheckDate)) {
									let tag = {
										class: 'text-green',
										text: '◉'
									}
									option.bottom.push(tag);
								}
							}
							this.customDate.push(option);
						});
						this.$refs.calendar.refresh();
					}
					uni.hideLoading();
				}, err => {
					uni.hideLoading();
				})
			},
			getAttendanceRecord(YearMonth) {
				uni.showLoading({
					title: '请稍后...'
				});
				//this.signData = [];
				//console.log('看月份')
				//console.log(this.getLastDay(YearMonth))
				let Edate = this.getLastDay(YearMonth);
				let param = {
					Sdate: this.$mbservices.formatDateTime(YearMonth + '-01', 'yyyy-MM-dd'),
					Edate: this.$mbservices.formatDateTime(Edate, 'yyyy-MM-dd')
				};
				/* 
				 
				 customDate: [{
				 	cellClass: 'custom-cell',
				 	date: '2020-08-10',
				 	top: [{
				 			class: 'custom-cell-top-1',
				 			text: '√'
				 		},
				 	],
				 	bottom: [{
				 			class: 'custom-cell-top-1',
				 			text: '端午节'
				 		},
				 	]
				 }],
				 
				 */
				this.$mbservices.Request(this.$webapi.GetUserAttendanceRecordDetailBySdateEdate, 'POST', param, res => {
					if (res.data.RecordCount) {
						this.customDate = [];
						res.data.data.forEach((item, index) => {
							let option = {
								cellClass: 'custom-cell',
								date: item.ARDate,
								bottom: [],
								top: []
							};
							if (item.IsWorkDate === 'No') {
								let tag = {
									class: 'text-grey',
									text: item.WorkDateText
								}
								option.bottom.push(tag);
							} else {
								//工作日
								/* if (item.SalaryLeave > 0) {
									let tag = {
										class: '',
										text: '带薪假'
									}
									option.bottom.push(tag);
									let days = {
										class: '',
										text: parseFloat(item.SickLeave).toFixed(2).toString()
									}
									option.top.push(days);
								} */
								let isDoTag = false;
								if (item.DomesticGooutDays > 0 || item.AbroadGooutDays > 0) {
									let tag = {
										class: 'text-olive',
										text: '出差'
									}
									option.bottom.push(tag);
									isDoTag = true;
								}
								if ((!isDoTag) && (item.PersonalLeave > 0 || item.SalaryLeave > 0)) {
									if (this.$mbservices.isEmpty(item.FirstCheckDate) && !this.$mbservices.isEmpty(item.SecondCheckDate)) {
										let tag = {
											class: 'text-blue',
											text: '上午请假'
										}
										option.bottom.push(tag);
									} else if (!this.$mbservices.isEmpty(item.FirstCheckDate) && this.$mbservices.isEmpty(item.SecondCheckDate)) {
										let tag = {
											class: 'text-blue',
											text: '下午请假'
										}
										option.bottom.push(tag);
									} else {
										let tag = {
											class: 'text-blue',
											text: '请假'
										}
										option.bottom.push(tag);
									}
									isDoTag = true;
								}
								if (!isDoTag && item.Absence > 0 && this.$mbservices.isEmpty(item.FirstCheckDate) && this.$mbservices.isEmpty(
										item.SecondCheckDate)) {
									let tag = {
										class: 'text-red',
										text: '旷工'
									}
									option.bottom.push(tag);
									isDoTag = true;
								}
								if ((!isDoTag) && (item.Late > 0 || (this.$mbservices.isEmpty(item.FirstCheckDate) && !this.$mbservices.isEmpty(
										item.SecondCheckDate)))) {
									let tag = {
										class: 'text-pink',
										text: '迟到'
									}
									option.bottom.push(tag);
									isDoTag = true;
								}
								if ((!isDoTag) && (item.Early > 0 || (!this.$mbservices.isEmpty(item.FirstCheckDate) && this.$mbservices
										.isEmpty(
											item.SecondCheckDate)))) {
									let tag = {
										class: 'text-orange',
										text: '早退'
									}
									option.bottom.push(tag);
									isDoTag = true;
								}
								/* if ((!isDoTag)&&(item.Early > 0)) {
									let tag = {
										class: 'text-orange',
										text: '晚缺卡'
									}
									option.bottom.push(tag);
									isDoTag=true;
								} */

								/* if (item.AbroadGooutDays > 0) {
									let tag = {
										class: 'text-blue',
										text: '外出差'
									}
									option.bottom.push(tag);
								} */
								/* if (this.$mbservices.isEmpty(item.FirstCheckDate) || this.$mbservices.isEmpty(item.SecondCheckDate)) {
									if (this.$mbservices.isEmpty(item.FirstCheckDate) && !this.$mbservices.isEmpty(item.SecondCheckDate)) {
										let tag = {
											class: 'text-red',
											text: '早缺卡'
										}
										option.bottom.push(tag);
									}
									if (this.$mbservices.isEmpty(item.SecondCheckDate) && !this.$mbservices.isEmpty(item.FirstCheckDate)) {
										let tag = {
											class: 'text-red',
											text: '晚缺卡'
										}
										option.bottom.push(tag);
									}

								} */
								if (!this.$mbservices.isEmpty(item.FirstCheckDate) && !this.$mbservices.isEmpty(item.SecondCheckDate)) {
									let tag = {
										class: 'text-green',
										text: '◉'
									}
									option.bottom.push(tag);
								}
							}
							this.customDate.push(option);
							/* customDate: [{
								cellClass: 'custom-cell',
								date: '2020-08-10',
								top: [{
										class: 'custom-cell-top-1',
										text: '√'
									},
								],
								bottom: [{
										class: 'custom-cell-top-1',
										text: '端午节'
									},
								]
							}], */
						});
						this.$refs.calendar.refresh();
					}
					uni.hideLoading();
				}, err => {
					uni.hideLoading();
				})
			},
			getWorkRecords(e, from) {
				uni.showLoading({
					title: '请稍后...'
				});
				this.signData = [];
				let param = {
					PageIndex: 1,
					RowsPerPage: "1000",
					type: "Initialize",
					Parameter: {
						LoadChildren: "NoLoad",
						Conditions: [{
							FieldName: "UserId",
							Operation: "EQUAL",
							ConditionValue: uni.getStorageSync("JSUserInfo").UserId,
							Relationship: "AND"
						}, {
							FieldName: "CheckDatetime",
							Operation: "GRATER_EQUAL",
							ConditionValue: e + ' 00:00:00',
							Relationship: "AND"
						}, {
							FieldName: "CheckDatetime",
							Operation: "LESS_EQUAL",
							ConditionValue: e + ' 23:59:59',
							Relationship: "AND"
						}],
					}
				};
				this.CheckRecords = [];
				this.$mbservices.Request(this.$webapi.getWorkRecords, 'POST', param, res => {
					if (res.data.RecordCount) {
						this.WorkRecords = res.data.data;
						this.WorkRecords.forEach(item => {
							item.PicPaths = [];
							item.PicPaths = this.getImgPathArr(item.RecordPicPath);
						})
						if (from === "clickSign") {
							this.CheckRecords = this.WorkRecords;
						}
						//var time = e.split("/");
						//var obj = time[0] + "-" + parseInt(time[1]) + "-" + parseInt(time[2]);
						//this.signData.push(obj);
					}
					uni.hideLoading();
				}, err => {
					uni.hideLoading();
				})
			},
		}
	}
</script>

<style>
	.disabled {
		color: #B8BDC2;
	}

	.custom-cell {
		color: #4cd964;
	}

	.custom-cell-top-1 {
		color: #FF6600;
	}

	.custom-cell-top-2 {
		color: #FF6600;
	}

	.custom-cell-top-11 {
		color: #4CD964;
	}

	.custom-cell-top-21 {
		color: #4CD964;
	}

	.custom-cell-top-13 {
		color: #4B0082;
	}

	.custom-cell-top-23 {
		color: #4B0082;
	}

	.custom-cell-top-close {
		color: #9000FF;
	}

	.custom-cell-top-close {
		color: #9000FF;
		;
	}

	.restHeight {
		height: 60vh;
		max-height: 60vh;
		min-height: 60vh;
		overflow-y: auto;
		width: 80vw;
	}
</style>
