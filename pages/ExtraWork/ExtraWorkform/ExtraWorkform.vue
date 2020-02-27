<template>
	<view>
		<custom>加班</custom>
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal">
						<text class="icon-roundclose text-black"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					<text class="text-black text-bold">确定提交申请?</text>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-grey" @tap="onlySave">存草稿</view>
					<view class="action margin-0 flex-sub text-black solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="saveAndDoSteps">确定提交</view>
				</view>
			</view>
		</view>
		<view class="ul-swiper-box">
			<form>
				<view class="cu-list menu">
					<view class="cu-item">
						<view class="content">
							<text class="icon-sort margin-right-xs"></text>
							<text class="text-grey">补偿方式</text>
						</view>
						<view class="action">
							<view class="cu-tag round bg-orange light">
								<picker @change="PickerChange" :value="indexComp" :range="Compensate">
									<view class="picker">
										{{indexComp>-1?Compensate[indexComp]:'禁止换行，超出容器部分会以 ... 方式截断'}}
									</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="icon-calendar margin-right-xs"></text>
							<text class="text-grey">开始日期</text>
						</view>
						<view class="action">
							<view class="cu-tag round bg-orange light">
								<MagicDatePicker ref="PstartDate" placeholder="请选择" :maxDate="defaultMaxDate" @getData="getData" :value="itemData.BeginDate"></MagicDatePicker>
							</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="icon-calendar margin-right-xs"></text>
							<text class="text-grey">结束日期</text>
						</view>
						<view class="action">
							<view class="cu-tag round bg-orange light">
								<MagicDatePicker ref="PEndDate" placeholder="请选择" :maxDate="defaultMaxDate" @getData="getData1" :value="itemData.EndDate"></MagicDatePicker>
							</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="icon-similar margin-right-xs"></text>
							<text class="text-grey">加班时长</text>
						</view>
						<view class="action">
							<input disabled="true" placeholder="加班时长" name="input" type="digit" class="margin-left-sm" style="text-align: right;"
							 @input="inputHours(itemData,$event)" :value="itemData.Hours" />
						</view>
						<view class="action">
							<text class="cu-tag round bg-orange light">
								<!-- <input disabled="true" placeholder="加班时长" name="input" type="digit" style="text-align: right;" @input="inputHours(itemData,$event)"
								 :value="itemData.ExtraWorkHoursTextName" /> -->
								{{itemData.ExtraWorkHoursTextName}}
							</text>
						</view>
					</view>
					<!-- <view class="cu-item">
						<view class="content">
							<text class="icon-tag margin-right-xs"></text>
							<text class="text-grey">时长单位</text>
						</view>
						<view class="action">
							
						</view>
					</view> -->
					<view class="cu-item">
						<view class="content">
							<text class="icon-edit margin-right-xs"></text>
							<text class="text-grey">加班事由</text>
						</view>
					</view>
					<view class="cu-form-group">
						<textarea @input="textareaInput" :class="itemData.Cause?'value':''" maxlength="-1" :disabled="modalName!=null"
						 placeholder-class="placeholder" data-placeholder="在此输入加班事由" :value="itemData.Cause"></textarea>
					</view>
				</view>
			</form>
		</view>
		<view class="cu-bar bg-white solid-bottom" style="position: fixed;bottom:0upx;display: flex;justify-content: space-around;z-index: 2;z-index: 999;width: 100%;">
			<view class="action" v-if="edit === false" style="width: 50%;">
				<button class="cu-btn round bg-blue shadow" data-target="DialogModal2" @tap="showModal">
					<text class="icon-upload"></text>提交
				</button>
			</view>
			<view class="action" style="width: 50%;" v-if="from === 'firstPage'">
				<button class="cu-btn round bg-blue shadow" @tap="toList">加班记录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import abc from "../../components/uni-datetimepicker.vue";
	import wPicker from "../../../components/w-picker/w-picker.vue";
	import MagicDatePicker from "../../../components/MagicDatePicker/MagicDatePicker.vue";
	var sourceType = [
		["camera"],
		["album"],
		["camera", "album"]
	];
	var sizeType = [
		["compressed"],
		["original"],
		["compressed", "original"]
	];
	export default {
		components: {
			abc,
			wPicker,
			MagicDatePicker
		},
		watch: {
			showValue(val) {}
		},
		data() {
			return {
				Compensate: ["加班费", "倒休"],
				indexComp: 0,
				defaultMinDate: new Date("2019/1/1").getTime(),
				defaultMaxDate: new Date("2050/12/31").getTime(),
				indexExtraWorkType: 0,
				ExtraWorkType: ["按实际加班时长计算", "按固定加班时长计算"],
				ExtraWorkTypeList: [{
						Code: "Actucl",
						Name: "按实际加班时长计算"
					},
					{
						Code: "Fixed",
						Name: "按固定加班时长计算"
					}
				],
				modalName: null,
				enddate: "",
				themeColor: "",

				/*图片*/
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ["拍照", "相册", "拍照或相册"],
				sizeTypeIndex: 2,
				sizeType: ["压缩", "原图", "压缩或原图"],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				itemData: {
					DocEntry: "",
					BeginDate: '', //this.formatDate(Date.parse(new Date()),'yyyy-MM-dd HH:mm'),
					EndDate: '', //this.formatDate(Date.parse(new Date()),'yyyy-MM-dd HH:mm'),
					ExtraWorkTypeCode: "Actucl",
					ExtraWorkTypeName: "按实际加班时长计算",
					Hours: "",
					ExtraWorkHoursText: "Hour",
					ExtraWorkHoursTextName: "小时",
					Cause: "",
					Remarks: ""
				},
				formList: [{
					id: 1,
					imageList: [],
					bigjine: ""
				}],
				editEntitysList: [],
				totalJine: "0.00",
				editflag: false,
				editItem: {},
				isDoSteps: false,
				edit: false,
				from: "",
				startYear: new Date().getFullYear(),
				resultInfo1: {},
				resultInfo2: {},
				HolidayScheduleList: [],
				// 第一段标准上班时间
				FirstOnTime: "",
				// 第二段标准下班时间
				SecondOffTime: "",
				// 系统初始化表里的每天工作时长
				InitializeDay: 0
			};
		},
		computed: {
			endYear() {
				const date = new Date();
				let year = date.getFullYear() + 2;
				return year;
			},
			defaultVal1() {
				const date = new Date();
				let year = date.getFullYear();
				let m = date.getMonth() + 1;
				let d = date.getDate();
				let h = date.getHours();
				return "[" + year + "," + m + "," + d + "," + h + ",'0','0']";
			},
			defaultVal2() {
				const date = new Date();
				let year = date.getFullYear();
				let m = date.getMonth() + 1;
				let d = date.getDate();
				let h = date.getHours();
				return "[" + year + "," + m + "," + d + "," + h + ",'0','0']";
			}
		},
		methods: {
			PickerChange(e) {
				this.indexComp = e.detail.value
			},
			getData(time) {
				this.resultInfo1 = time;
				this.itemData.BeginDate = time;
				if (this.$mbservices.isEmpty(this.itemData.EndDate)) {
					return false;
				} else {
					this.CalcDateTime();
				}
			},
			getData1(time) {
				this.itemData.EndDate = time;
				this.CalcDateTime();
			},
			//获取当前时间
			formatDate: function(value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? "0" + MM : MM;
				let d = date.getDate();
				d = d < 10 ? "0" + d : d;
				let h = date.getHours();
				h = h < 10 ? "0" + h : h;
				let m = date.getMinutes();
				m = m < 10 ? "0" + m : m;
				let s = date.getSeconds();
				s = s < 10 ? "0" + s : s;
				return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
			},
			toList() {
				uni.navigateTo({
					url: "/pages/ExtraWork/ExtraWorklist/ExtraWorklist",
					title: "加班记录"
				});
			},
			async getInvCompany() {
				//invCompanys
				var ajaxJSON = {
					pageIndex: 1,
					rowsPerPage: "10000",
					type: "Initialize",
					Parameter: {
						LoadChildren: "NoLoad",
						Conditions: [{
							FieldName: "Activated",
							Operation: "EQUAL",
							ConditionValue: "Y",
							Relationship: "AND"
						}]
					}
				};
				this.$mbservices.Request(
					this.$webapi.getInvCompany,
					"POST",
					ajaxJSON,
					res => {
						if (res.data.RecordCount > 0) {
							this.invCompanys = res.data.data;
						}
					},
					err => {}
				);
			},
			async getHolidaySchedule() {
				var ajaxJSON = {
					pageIndex: 1,
					rowsPerPage: "10000",
					type: "Initialize",
					Parameter: {
						LoadChildren: "NoLoad",
						Conditions: [{
							FieldName: "Activated",
							Operation: "EQUAL",
							ConditionValue: "Y",
							Relationship: "AND"
						}]
					}
				};
				this.$mbservices.Request(
					this.$webapi.getHolidaySchedule,
					"POST",
					ajaxJSON,
					res => {
						if (res.data.RecordCount > 0) {
							this.HolidayScheduleList = res.data.data;
						}
					},
					err => {}
				);
			},
			async getScheduleList() {
				var ajaxJSON = {
					pageIndex: 1,
					rowsPerPage: "10000",
					type: "Initialize",
					Parameter: {
						LoadChildren: "Load",
						Conditions: [{
							FieldName: "Activated",
							Operation: "EQUAL",
							ConditionValue: "Y",
							Relationship: "AND"
						}]
					}
				};
				this.$mbservices.Request(
					this.$webapi.getScheduleList,
					"POST",
					ajaxJSON,
					res => {
						if (res.data.RecordCount > 0) {
							res.data.data.forEach(item => {
								var ScheduleLines = item.ScheduleLines;
								ScheduleLines.forEach(inner => {
									if (
										inner.UserId.toString() ===
										uni.getStorageSync("JSUserInfo").UserId.toString()
									) {
										this.FirstOnTime = item.FirstOnTime;
										this.SecondOffTime = item.SecondOffTime;
									}
								});
							});
						}
					},
					err => {}
				);
			},
			async getInitialize() {
				var ajaxJSON = {
					pageIndex: 1,
					rowsPerPage: "10000",
					type: "Initialize",
					Parameter: {
						LoadChildren: "NoLoad",
						Conditions: [{
							FieldName: "Activated",
							Operation: "EQUAL",
							ConditionValue: "Y",
							Relationship: "AND"
						}]
					}
				};
				this.$mbservices.Request(
					this.$webapi.getInitialize,
					"POST",
					ajaxJSON,
					res => {
						if (res.data.RecordCount > 0) {
							this.InitializeDay = res.data.data[0].Day;
						}
					},
					err => {}
				);
			},
			RadioChange(e) {
				this.radio = e.detail.value;
				this.itemData.InvCompanyId = e.detail.value;
				this.invCompanys.forEach(item => {
					if (item.ACCode === e.detail.value) {
						this.itemData.InvCompanyName = item.ACName;
					}
				});
				this.modalName = null;
				this.radio = "";
			},
			showModal1(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			showModal(e) {
				if (
					this.$mbservices.isEmpty(this.itemData.Hours) ||
					this.$mbservices.isEmpty(this.itemData.BeginDate) ||
					this.$mbservices.isEmpty(this.itemData.EndDate)
				) {
					uni.showModal({
						title: "提示",
						content: "请选择正确的开始时间和结束时间",
						showCancel: false
					});
					this.itemData.BeginDate = "";
					this.itemData.EndDate = "";
					return false;
				}
				var isNull_ = false;
				var content = "";
				this.formList.forEach(_item => {});
				if (isNull_) {
					uni.showModal({
						title: "提示",
						content: content,
						showCancel: false
					});
					return false;
				}
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
			onlySave() {
				this.modalName = null;
				this.isDoSteps = false;
				this.submitForm();
			},
			saveAndDoSteps() {
				this.modalName = null;
				this.isDoSteps = true;
				this.submitForm();
			},
			submitForm() {
				var _this = this;
				uni.showLoading({
					title: "正在提交..."
				});
				var ajaxJSON = {};
				if (_this.editflag) {
					_this.editEntitysList[0].Approve = _this.isDoSteps ? "Yes" : "No";
					_this.editEntitysList[0].ApproveStatus = "Pending";
					_this.editEntitysList[0].Hours = this.itemData.Hours;
					_this.editEntitysList[0].Remarks = _this.itemData.Remarks;
					_this.editEntitysList[0].Cause = _this.itemData.Cause;
					_this.editEntitysList[0].BeginDate = _this.itemData.BeginDate;
					_this.editEntitysList[0].EndDate = _this.itemData.EndDate;
					_this.editEntitysList[0].Compensate = _this.indexComp === 0 ? 'Overtime' : 'Rest';
					_this.editEntitysList[0].ExtraWorkType =
						_this.itemData.ExtraWorkTypeCode;
					_this.editEntitysList[0].ExtraWorkHoursText =
						_this.itemData.ExtraWorkHoursText;
					_this.editEntitysList[0].UIStatus = "Modify";
					ajaxJSON = _this.editEntitysList[0];
				} else {
					ajaxJSON = {
						ObjectType: "ExtraWork",
						DocNum: _this.itemData.DocEntry,
						BeginDate: _this.itemData.BeginDate,
						EndDate: _this.itemData.EndDate,
						ExtraWorkType: _this.itemData.ExtraWorkTypeCode,
						Hours: _this.itemData.Hours,
						Compensate: _this.indexComp === 0 ? 'Overtime' : 'Rest',
						ExtraWorkHoursText: _this.itemData.ExtraWorkHoursText,
						CreatorId: parseInt(uni.getStorageSync("JSUserInfo").UserId),
						Creator: uni.getStorageSync("JSUserInfo").UserName,
						Cause: _this.itemData.Cause,
						Remarks: _this.itemData.Remarks,
						Approve: _this.isDoSteps ? "Yes" : "No",
						ApproveStatus: "Pending",
						Canceled: "No",
						Closed: "No",
						Attachments: "",
						OrganizationCode: uni.getStorageSync("JSUserInfo").OrganizationCode,
						OrganizationName: uni.getStorageSync("JSUserInfo").OrganizationName,
						CompanyId: uni.getStorageSync("JSUserInfo").CompanyId,
						CompanyName: uni.getStorageSync("JSUserInfo").CompanyName,
						UIStatus: "New"
					};
				}
				var requestUrl = _this.editflag ?
					_this.$webapi.saveExtraWork :
					_this.$webapi.saveExtraWork;
				var _$this = _this;
				_this.$mbservices.Request(
					requestUrl,
					"POST",
					ajaxJSON,
					function(succ) {
						setTimeout(function() {
							uni.hideLoading();
						}, 1000);
						if (
							succ.data.RecordCount == undefined ||
							succ.data.RecordCount <= 0
						) {
							uni.showModal({
								title: "提示",
								content: succ.data,
								showCancel: false
							});
							return false;
						}
						uni.showToast({
							title: "成功"
						});
						_$this.$mbservices.setIsRefresh(true);
						uni.navigateBack({
							animationDuration: 500
						});
					},
					function(err) {
						uni.showModal({
							title: "提示",
							content: "data: '" + JSON.stringify(err) + "'",
							showCancel: false
						});
					}
				);
			},
			onKeyInput: function(event) {
				this.formList[parseInt(event.target.id) - 1].jine = event.detail.value;
				var _cache = 0;
				this.formList.forEach(item => {
					_cache = (parseFloat(item.jine) + parseFloat(_cache)).toFixed(2);
				});
				this.totalJine = _cache.toString();
			},
			textareaInput(e) {
				this.itemData.Cause = e.detail.value;
			},
			bindPickerChange: function(e) {
				this.indexType = e.target.value;
				this.formList[parseInt(e.target.id) - 1].itemOptionIndex = parseInt(
					e.target.value
				);
				this.formList[parseInt(e.target.id) - 1].itemOptionText = this.arrayType[
					parseInt(e.target.value)
				];
			},
			toggleTab(mode) {
				this.itemData.BeginDate = "";
				this.$refs[mode].show();
			},
			toggleTab1(mode) {
				this.itemData.EndDate = "";
				this.$refs[mode].show();
			},
			onConfirm(val) {
				this.resultInfo1 = val;
				if (this.$mbservices.isEmpty(this.resultInfo2)) {
					return;
				} else {
					this.computTime();
				}
			},
			onConfirm1(val) {
				this.resultInfo2 = val;
				this.computTime();
			},
			CalcDateTime() {
				//this.itemData.BeginDate = this.resultInfo1;
				//this.itemData.EndDate = this.resultInfo2;
				if (!this.$mbservices.isEmpty(this.itemData.EndDate)) {
					this.itemData.Hours = parseFloat((new Date(this.itemData.EndDate.toString().replace(/-/g, '/')).valueOf() - new Date(
						this.itemData.BeginDate.toString().replace(/-/g, '/')).valueOf()) / 3600000).toFixed(2);
				}
				if (this.itemData.Hours <= 0) {
					uni.showToast({
						title: '结束时间小于或等于开始时间',
						icon: 'none'
					})
					this.$refs.PEndDate.refresh()
					this.itemData.Hours = "";
					return false;
				}
			},
			computTime() {
				this.itemData.BeginDate = this.resultInfo1; //.result;
				this.itemData.EndDate = this.resultInfo2; //.result;
				this.itemData.Hours = 0;
				var startDate = this.resultInfo1; //.result;
				startDate = startDate.toString().replace(/-/g, "/");
				var time1 = new Date(startDate);
				time1 = time1.getTime();
				var endDate = this.resultInfo2; //.result;
				endDate = endDate.toString().replace(/-/g, "/");
				var time2 = new Date(endDate);
				time2 = time2.getTime();
				var endDate1 =
					this.resultInfo2.checkArr[0] +
					"-" +
					this.resultInfo2.checkArr[1] +
					"-" +
					this.resultInfo2.checkArr[2] +
					" " +
					this.SecondOffTime;
				endDate1 = endDate1.toString().replace(/-/g, "/");
				var Etime = new Date(endDate1);
				Etime = Etime.getTime();
				var endOnTime =
					this.resultInfo2.checkArr[0] +
					"-" +
					this.resultInfo2.checkArr[1] +
					"-" +
					this.resultInfo2.checkArr[2] +
					" " +
					this.FirstOnTime;
				endOnTime = endOnTime.toString().replace(/-/g, "/");
				var EOtime = new Date(endOnTime);
				EOtime = EOtime.getTime();
				var everyDay = (Etime - EOtime) / 1000 / 3600;
				var endHour = this.SecondOffTime.slice(0, 2);
				var beginDate1 =
					this.resultInfo1.checkArr[0] +
					"-" +
					this.resultInfo1.checkArr[1] +
					"-" +
					this.resultInfo1.checkArr[2] +
					" " +
					this.FirstOnTime;
				beginDate1 = beginDate1.toString().replace(/-/g, "/");
				var Btime = new Date(beginDate1);
				Btime = Btime.getTime();
				var beginHour = this.FirstOnTime.slice(0, 2);
				if (time2 === time1) {
					this.itemData.Hours = 0;
					return;
				}
				if (time2 < time1) {
					this.itemData.BeginDate = "请选择";
					this.itemData.Hours = 0;
					return;
				}
				var year2 = this.resultInfo2.checkArr[0];
				var month2 = this.resultInfo2.checkArr[1];
				var day2 = this.resultInfo2.checkArr[2];
				var hour2 = this.resultInfo2.checkArr[3];
				var minute2 = this.resultInfo2.checkArr[4];
				var seconds2 = this.resultInfo2.checkArr[5];
				var year1 = this.resultInfo1.checkArr[0];
				var month1 = this.resultInfo1.checkArr[1];
				var day1 = this.resultInfo1.checkArr[2];
				var hour1 = this.resultInfo1.checkArr[3];
				var minute1 = this.resultInfo1.checkArr[4];
				var seconds1 = this.resultInfo1.checkArr[5];
				if (year2 === year1 && month1 === month2 && day1 === day2) {
					this.itemData.ExtraWorkHoursTextName = "小时";
					var date = year2 + "-" + month2 + "-" + day2;
					for (var i in this.HolidayScheduleList) {
						if (this.HolidayScheduleList[i].Date === date) {
							this.itemData.Hours = (
								hour2 -
								hour1 +
								(minute2 - minute1) / 60
							).toFixed(2);
							if (this.itemData.Hours > everyDay) {
								this.itemData.Hours = this.InitializeDay;
							}
							return;
						} else {
							if (hour1 < beginHour && hour2 < beginHour) {
								return;
							}
							// 开始时间小于18点
							if (hour1 < endHour) {
								// 结束时间小于18点
								if (hour2 < endHour) {
									uni.showModal({
										title: "提示",
										content: "当前时间为上班时间，不算加班",
										showCancel: false
									});
									return;
								} else if (hour2 >= endHour) {
									this.itemData.Hours = (hour2 - endHour + minute2 / 60).toFixed(
										2
									);
								}
							} else if (hour1 >= endHour) {
								this.itemData.Hours = (
									hour2 -
									hour1 +
									(minute2 - minute2) / 60
								).toFixed(2);
							}
						}
					}
				} else {
					this.itemData.ExtraWorkHoursText = "Hour";
					this.itemData.ExtraWorkHoursTextName = "小时";
					var hour = Math.floor(
						(time2 - time1) / 1000 / 24 / 3600 - (1 * 1000) / 24 / 3600
					);
					if (hour1 <= beginHour) {
						if (hour2 <= beginHour) {
							this.itemData.Hours = (hour * this.InitializeDay).toFixed(2);
						} else if (hour2 > beginHour && hour2 < endHour) {
							this.itemData.Hours = (
								hour * this.InitializeDay +
								everyDay -
								(Etime - time2) / 1000 / 3600
							).toFixed(2);
						} else if (hour2 >= endHour) {
							this.itemData.Hours = (
								hour * this.InitializeDay +
								this.InitializeDay
							).toFixed(2);
						}
					} else if (hour1 > beginHour) {
						if (hour1 >= endHour) {
							this.itemData.Hours = (hour * this.InitializeDay).toFixed(2);
						} else if (hour2 < endHour) {
							this.itemData.Hours = (
								hour * this.InitializeDay +
								everyDay -
								(time1 - Btime) / 1000 / 3600 -
								(Etime - time2) / 1000 / 3600
							).toFixed(2);
						} else if (hour2 >= endHour) {
							this.itemData.Hours = (
								hour * this.InitializeDay +
								everyDay -
								(time1 - Btime) / 1000 / 3600
							).toFixed(2);
						}
					}
				}
			},
			onSelected(data) {},
			sourceTypeChange: function(e) {
				this.sourceTypeIndex = e.target.value;
			},
			sizeTypeChange: function(e) {
				this.sizeTypeIndex = e.target.value;
			},
			countChange: function(e) {
				this.countIndex = e.target.value;
			},
			chooseImage: async function(_item_) {
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					if (!isContinue) {
						return;
					}
				}
				var _this = this;
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ?
						9 - this.imageList.length : this.count[this.countIndex],
					success: res => {
						var imageSrc = res.tempFilePaths[0];
						res.tempFilePaths.forEach(item => {
							/* 上传图片开始 */
							uni.uploadFile({
								url: _this.$webapi.uploadImages,
								header: {
									Authorization: "bearer " + uni.getStorageSync("JSUserInfo").access_token
								},
								filePath: item,
								fileType: "image",
								name: "data",
								success: res1 => {
									uni.showToast({
										title: "上传成功",
										icon: "none",
										duration: 1000
									});
									var imagePath_ = {};
									if (_this.editflag) {
										imagePath_ = {
											retInfo: JSON.parse(res1.data),
											url: item,
											deleteurl: JSON.parse(res1.data)[0].filePath
										};
									} else {
										imagePath_ = {
											retInfo: JSON.parse(res1.data),
											url: item
										};
									}
									_item_.imageList.push(imagePath_);
								},
								fail: err => {
									uni.showModal({
										content: err.errMsg,
										showCancel: false
									});
								}
							});
							/* 上传图片结束 */
						});
					}
				});
			},
			isFullImg: function() {
				return new Promise(res => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: e => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false);
							}
						},
						fail: () => {
							res(false);
						}
					});
				});
			},
			previewImage: function(_item_, e) {
				var current = e.target.dataset.src;
				var imagePath = [];
				_item_.imageList.forEach(item => {
					imagePath.push(item.url);
				});
				uni.previewImage({
					current: current,
					urls: imagePath
				});
			},
			deleteImage(imlist, item) {
				var _this = this;
				uni.showModal({
					title: "操作提示",
					content: "确定删除图片?",
					success: function(ret) {
						if (ret.confirm) {
							var ajaxParam = {};
							if (_this.editflag) {
								ajaxParam.path = item.deleteurl;
							} else {
								ajaxParam = {
									path: item.retInfo[0].filePath
								};
							}
							_this.$mbservices.Request(
								_this.$webapi.deleteImage,
								"POST",
								ajaxParam,
								function(res) {
									if (res.statusCode === 200) {
										var cache = [];
										imlist.imageList.forEach(_item => {
											if (_item != item) {
												cache.push(_item);
											}
										});
										imlist.imageList = [];
										cache.forEach(_item => {
											imlist.imageList.push(_item);
										});
									} else {
										uni.showToast({
											title: "有异常",
											icon: "none"
										});
									}
								},
								function(err) {}
							);
						}
					}
				});
			},
			getDetailData: function() {
				this.pageIndex = parseInt(this.pageIndex) + 1;
				var ajaxJSON = {
					pageIndex: this.pageIndex,
					rowsPerPage: "10",
					type: "Initialize",
					Parameter: {
						LoadChildren: "Load",
						Conditions: [{
							FieldName: "DocEntry",
							Operation: "EQUAL",
							ConditionValue: this.editItem.DocEntry,
							Relationship: "AND"
						}]
					}
				};
				uni.showLoading({
					title: "拼命加载中..."
				});
				var _this = this;
				this.$mbservices.Request(
					this.$webapi.getExtraWorkList,
					"POST",
					ajaxJSON,
					function(ret) {
						if (!ret.data.data) {
							uni.showToast({
								title: "查无数据"
							});
							return false;
						}
						//_this.formList = [];
						_this.editEntitysList = [];
						_this.editEntitysList = ret.data.data;
						var _$this = _this;
						ret.data.data.forEach(item => {
							if (item.ApproveStatus === "Pending") {
								item.AApproveStatus = "待审核";
							}
							if (item.ApproveStatus === "Approved") {
								item.AApproveStatus = "已批准";
							}
							if (item.ApproveStatus === "Rejected") {
								item.AApproveStatus = "已拒绝";
							}
							_$this.itemData.Remarks = item.Remarks;
							_$this.itemData.ExtraWorkTypeCode = "";
							_$this.itemData.ExtraWorkTypeName = "";
							_$this.itemData.ExtraWorkTypeCode = item.ExtraWorkType;
							_$this.ExtraWorkTypeList.forEach((__item, __index) => {
								if (__item.Code === _$this.itemData.ExtraWorkTypeCode) {
									_$this.itemData.ExtraWorkTypeName = __item.Name;
								}
							});
							_$this.ExtraWorkType.forEach((__item, __index) => {
								if (__item === _$this.itemData.ExtraWorkTypeName) {
									_$this.itemData.indexExtraWorkType = __index;
									_$this.indexExtraWorkType = __index;
								}
							});
							_$this.itemData.BeginDate = _$this.$mbservices.formatDateTime(item.BeginDate, 'yyyy-MM-dd hh:mm');
							_$this.itemData.EndDate = _$this.$mbservices.formatDateTime(item.EndDate, 'yyyy-MM-dd hh:mm');
							_$this.$refs.PstartDate.refreshAll(_$this.itemData.BeginDate);
							_$this.$refs.PEndDate.refreshAll(_$this.itemData.EndDate);
							_$this.itemData.Cause = item.Cause;
							_$this.itemData.Hours = parseFloat(item.Hours).toFixed(2);
							_$this.itemData.ExtraWorkHoursText = item.ExtraWorkHoursText;
							if (item.ExtraWorkHoursText === "Hour") {
								_$this.itemData.ExtraWorkHoursText = "小时";
							} else if (item.ExtraWorkHoursText === "Day") {
								_$this.itemData.ExtraWorkHoursText = "天";
							}
							_$this.itemData.InvCompanyId = item.InvCompanyId;
							_$this.itemData.InvCompanyName = item.InvCompanyName;
							if (item.Compensate === 'Overtime') {
								_$this.indexComp = 0;
							}
							if (item.Compensate === 'Rest') {
								_$this.indexComp = 1;
							}
						});
						setTimeout(() => {
							uni.hideLoading();
						}, 1000);
					},
					function(ret) {
						uni.showToast({
							title: ret.errMsg,
							icon: "none",
							success: function() {
								setTimeout(function() {
									uni.navigateBack();
								}, 1000);
							}
						});
					}
				);
			}
		},
		onLoad(e) {
			this.from = JSON.parse(e.data).from;

			/* 修改传递参数 */
			if (e.flag === "modify") {
				this.editflag = true;
				this.edit = false;
			} else if (e.flag === "Original") {
				this.editflag = true;
				this.edit = true;
			} else if (e.flag === "tasklist") {
				this.editflag = true;
				this.edit = true;
			}

			if (this.editflag) {
				this.editItem = JSON.parse(e.data);
				this.itemData.DocEntry = this.editItem.DocEntry;
				/* 所属公司 */
				this.getInvCompany();
				this.getHolidaySchedule();
				this.getScheduleList();
				this.getInitialize();
				var _this = this;
				setTimeout(function() {
					_this.getDetailData();
				}, 1000);
			}
			if (!this.editflag) {
				//最大编号
				this.$mbservices.Request(
					this.$webapi.maxNumReimRequest,
					"GET", {},
					res => {
						this.itemData.DocEntry = res.data;
					},
					null
				);
			}
			/* 所属公司 */
			this.getInvCompany();
			this.getHolidaySchedule();
			this.getScheduleList();
			this.getInitialize();
		},
		onUnload() {
			this.totalJine = "0.00";
			(this.imageList = []), (this.sourceTypeIndex = 2);
			this.sourceType = ["拍照", "相册", "拍照或相册"];
			this.sizeTypeIndex = 2;
			this.sizeType = ["压缩", "原图", "压缩或原图"];
			this.countIndex = 8;
		}
	};
</script>

<style>
	/* tab bar */
	.ul-uni-tab-bar {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}

	.ul-uni-tab-bar .ul-list {
		width: 750upx;
		height: 100%;
	}

	.ul-uni-swiper-tab {
		width: 100%;
		white-space: nowrap;
		line-height: 80upx;
		height: 80upx;
		border-bottom: 0.1px solid #eaffea;
		text-align: -webkit-center;
	}

	.ul-swiper-tab-list {
		font-size: 30upx;
		width: 150upx;
		display: inline-block;
		text-align: center;
		color: #555;
	}

	.ul-uni-tab-bar .ul-swiper-box {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		width: 100%;
		height: calc(100% - 100rpx);
	}

	.placeholder {
		color: #b5b8c2;
		font-size: 30rpx;
	}
</style>
