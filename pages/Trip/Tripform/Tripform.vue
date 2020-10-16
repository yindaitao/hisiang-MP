<template>
	<view>
		<custom>出差</custom>
		<view class="cu-modal" :class="modalNameTraffic=='RadioModalTraffic'?'show':''" @tap="hideModalTraffic" v-if="edit === false">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioTrafficChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in TrafficTypeList" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.Name}}</view>
								<radio class="round" :class="radio3==item.Code?'checked':''" :checked="radio3==item.Code?true:false" :value="item.Code"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
		<!-- <scroll-view scroll-y :style="{'height':scrollBarHeight+'px'}" :scroll-with-animation="true"> -->
		<view class="ul-swiper-box">
			<form>
				<view class="cu-list menu">
					<view class="cu-item">
						<view class="content">出差类型</view>
						<view class="action">
							<view class="cu-tag round bg-orange light">
								<picker @change="PickerChange" :value="indexTripType" :range="TripTypes" range-key="Text">
									<view class="picker">
										{{indexTripType>-1?TripTypes[indexTripType].Text:'禁止换行，超出容器部分会以 ... 方式截断'}}
									</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">出发日期</view>
						<view class="action">
							<picker :disabled="edit?true:false" mode="date" :value="itemData.BeginDate" :start="startDate" :end="endDate"
							 @change="bindDateChange(itemData,$event)">
								<view class="picker">{{itemData.BeginDate}}</view>
							</picker>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">到达日期</view>
						<view class="action">
							<picker :disabled="edit?true:false" mode="date" :value="itemData.EndDate" :start="startDate" :end="endDate"
							 @change="bindDateChange1(itemData,$event)">
								<view class="picker">{{itemData.EndDate}}</view>
							</picker>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">出差时长</view>
						<view class="action">
							<input disabled="true" placeholder="出差时长(单位:天)" name="input" type="digit" style="text-align: right;" @input="inputHours(itemData,$event)"
							 :value="itemData.TripHours">
							<text v-if="false" class="icon-roundclosefill text-orange"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">出差补贴</view>
						<view class="action">
							<input disabled="true" name="input" type="digit" style="text-align: right;" @input="inputButie(itemData,$event)"
							 :value="itemData.Allowance">
							<text v-if="false" class="icon-roundclosefill text-orange"></text>
						</view>
					</view>
					<view class="cu-item">
						<view class="title">行程及交通工具</view>
					</view>
					<!-- <view class="cu-item">
						<view class="content">
							<input type="text" style="min-height: 100px;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 6;overflow: auto;"
							 :value="itemData.BeginDateAndStartPlace" />
						</view>
					</view> -->
					<view class="cu-item">
						<view class="content">
							<editor id="editor" class="ql-container" placeholder="在此输入行程及交通工具" @ready="onEditorReady" @input="BeginDateAStartPlaceInput"></editor>
						</view>
					</view>
					<!-- <view class="cu-item">
						<textarea @input="BeginDateAStartPlaceInput" :class="itemData.BeginDateAndStartPlace?'value':''" maxlength="-1"
						 :disabled="modalName!=null" placeholder-class="placeholder" data-placeholder="在此输入行程及交通工具" :value="itemData.BeginDateAndStartPlace"></textarea>
						<view class="content">
							<sunui-textarea ref="textarea" :SelDisabled="modalName!=null" :value="itemData.BeginDateAndStartPlace"
							 :styTextarea="styTextarea" indent="0em" @input="BeginDateAStartPlaceInput"></sunui-textarea>
						</view>
					</view> -->
					<view class="cu-item">
						<view class="title">出差事由</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<editor id="editor1" class="ql-container" placeholder="在此输入出差事由" @ready="onEditorReady" @input="textareaInput"></editor>
						</view>
					</view>
					<!-- <view class="cu-item">
						<textarea @input="textareaInput" :class="itemData.Cause?'value':''" maxlength="-1" :disabled="modalName!=null"
						 placeholder-class="placeholder" data-placeholder="在此输入出差事由" :value="itemData.Cause"></textarea>
						<view class="content">
							<sunui-textarea ref="textarea1" :SelDisabled="modalName!=null" :value="itemData.Cause" :styTextarea="styTextarea"
							 indent="0em" @input="textareaInput"></sunui-textarea>
						</view>
					</view> -->
					<view class="cu-bar bg-gray solid-bottom margin-top">
						<view class="action">
							<text class="icon-title text-orange"></text>
							出差同行人
						</view>
					</view>
					<block v-for="(item,index) in editEntitysList[0].TripCompanions" :key="index" v-if="item.UIStatus!=='Delete'">
						<view class="cu-form-group">
							<view class="title">同行人</view>
							<picker :disabled="edit?true:false" @change="bindPickerChange4(item,$event)" :range-key="'UserName'" :value="item.indexType"
							 :range="TripCompanions">
								<view class="picker">{{TripCompanions[item.indexType].UserName}}</view>
							</picker>
							<button v-if="formList.length>1" v-show="edit?false:true" class="cu-btn icon" @tap="deleteOption(item)"
							 data-target="menuModal">
								<text class="icon-roundclosefill" style="font-size: 1.5em;color:red;"></text>
							</button>
						</view>
					</block>
					<uni-view class="cu-bar bg-gray solid-bottom" style="width: 100%;" v-if="edit === false">
						<button class="cu-btn round bg-blue shadow sm" style="margin: 0 auto;" @tap="addOption">
							<text class="icon-add"></text>增加&nbsp;&nbsp;同行人
						</button>
					</uni-view>
				</view>
			</form>
		</view>
		<!-- </scroll-view> -->
		<view style="width: :100%;height: 50px;"></view>
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
		<view id="_tabBar" class="cu-bar bg-white solid-bottom" style="position: fixed;bottom:0upx;display: flex;justify-content: space-around;z-index: 2;z-index: 999;width: 100%;">
			<view class="action" v-if="edit === false||(itemData.Approve==='N'&&editflag)" style="width: 50%;">
				<button class="cu-btn round bg-blue shadow" data-target="DialogModal2" @tap="showModal">
					<text class="icon-upload"></text>提交
				</button>
			</view>
			<view class="action" style="width: 50%;" v-if="from === 'firstPage'">
				<button class="cu-btn round bg-blue shadow" @tap="toList">
					出差记录
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import sunUiTextarea from "@/components/sunui-textarea/sunui-textarea.vue";
	import abc from "../../components/uni-datetimepicker.vue";
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
			sunUiTextarea,
			abc
		},
		watch: {
			showValue(val) {}
		},
		data() {
			return {
				TripTypes: [{
						Key: 'Internal',
						Text: '国内出差'
					},
					{
						Key: 'External',
						Text: '国外出差'
					}
				],
				indexTripType: 0,
				placeholder: '开始输入...',
				editorCtx: {},
				editorCtx1: {},
				scrollBarHeight: 0,
				time: Date.parse(new Date()),
				modalName: null,
				radio3: 'radio3',
				enddate: "",
				themeColor: "",
				TripCompanions: [{
					UserId: "0",
					UserName: "请选择"
				}],
				indexType: 0,
				itemData: {
					DocEntry: "",
					BeginDate: "请选择",
					EndDate: "请选择",
					BeginDateAndStartPlace: "",
					TripHours: 0,
					Cause: "",
					Remarks: "",
				},
				formList: [{
					id: 1,
					UserId: "0",
					UserName: "请选择",
					indexType: 0,
					UIStatus: ""
				}],
				editEntitysList: [],
				editflag: false,
				editItem: {},
				isDoSteps: false,
				edit: false,
				from: "",
				HolidayScheduleList: [],
			};
		},
		computed: {
			startDate() {
				return this.getDate("start");
			},
			endDate() {
				return this.getDate("end");
			}
		},
		methods: {
			async PickerChange(e) {
				this.indexTripType = e.detail.value;
				this.itemData.TripType = this.TripTypes[this.indexTripType].Key;
				let ret = await this.computTime1();
				if (ret.data.RecordCount > 0) {
					this.itemData.TripHours = ret.data.data.DayDiff;
					this.itemData.Allowance = ret.data.data.Allowance;
					this.$forceUpdate();
				} else {
					uni.showToast({
						title: ret.data.data,
						icon: 'none'
					})
				}
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context;
				}).exec()
				uni.createSelectorQuery().select('#editor1').context((res) => {
					this.editorCtx1 = res.context;
				}).exec()
			},
			setRefsTextarea() {
				this.$nextTick(function() {
					// 是否显示输入输入样式提示,默认false
					this.$refs.textarea.maxnum = true;
					// 输入最大数量,传-1代表无限,默认为-1
					this.$refs.textarea.maxlength = 1000;
					// 弹出键盘高度,默认40
					this.$refs.textarea.cursor = 1000;
					// 是否禁用输入,默认不禁用
					this.$refs.textarea.disabled = false;
					// 是否显示组件,默认显示（控制它显示隐藏textarea）
					this.$refs.textarea.show = true;
					// 描述文字,默认简述文字...
					this.$refs.textarea.placeholder = "在此输入行程及交通工具";
					//文本内容
					this.$refs.textarea.valueText = this.itemData.BeginDateAndStartPlace;

					// 是否显示输入输入样式提示,默认false
					this.$refs.textarea1.maxnum = true;
					// 输入最大数量,传-1代表无限,默认为-1
					this.$refs.textarea1.maxlength = 1000;
					// 弹出键盘高度,默认40
					this.$refs.textarea1.cursor = 1000;
					// 是否禁用输入,默认不禁用
					this.$refs.textarea1.disabled = false;
					// 是否显示组件,默认显示（控制它显示隐藏textarea）
					this.$refs.textarea1.show = true;
					// 描述文字,默认简述文字...
					this.$refs.textarea1.placeholder = "在此输入出差事由";
					//文本内容
					this.$refs.textarea1.valueText = this.itemData.Cause;
				});
			},
			//获取当前时间
			formatDate: function(value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			},
			getUserList: async function() {
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
				this.$mbservices.Request(this.$webapi.getUserList, "POST", ajaxJSON, res => {
					if (res.data.RecordCount > 0) {
						res.data.data.forEach(item => {
							this.TripCompanions.push(item)
						})
					}

				}, err => {})
			},
			getHolidaySchedule: async function() {
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
				this.$mbservices.Request(this.$webapi.getHolidaySchedule, "POST", ajaxJSON, res => {
					if (res.data.RecordCount > 0) {
						this.HolidayScheduleList = res.data.data;
					}

				}, err => {})
			},
			selectOption(e) {},
			showModal1(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			toList() {
				uni.navigateTo({
					url: "/pages/Trip/Triplist/Triplist",
					title: "出差记录"
				});
			},
			showModal(e) {
				if (this.$mbservices.isEmpty(this.itemData.TripHours)) {
					uni.showModal({
						title: "提示",
						content: "请选择正确的开始时间和结束时间",
						showCancel: false,

					});
					return false;
				}
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
			computTime() {
				var endTime = this.itemData.EndDate;
				endTime = endTime.replace(/-/g, '/');
				var time1 = new Date(endTime);
				time1 = time1.getTime();
				var startTime = this.itemData.BeginDate;
				startTime = startTime.replace(/-/g, '/');
				var time2 = new Date(startTime);
				time2 = time2.getTime();
				var TripHours = time1 - time2;
				var ajaxJSON = {};

				if (TripHours === 0) {
					var HTime = this.itemData.EndDate;
					this.itemData.TripHours = 1;
					for (var i in this.HolidayScheduleList) {
						if (this.HolidayScheduleList[i].Date === HTime) {
							uni.showModal({
								title: "提示",
								content: "当前时间为" + this.HolidayScheduleList[i].Name + "，不能算在出差",
								showCancel: false
							})
							this.itemData.TripHours = 0;
							return;
						} else {
							this.itemData.TripHours = 1;
						}
					}
				}
				if (TripHours < 0) {
					this.itemData.BeginDate = "请选择";
					this.itemData.TripHours = 0;
					return;
				} else {
					this.itemData.TripHours = (parseFloat(TripHours / (3600 * 1000) / 24) + 1).toFixed(1);
				}
			},
			computTime1() {
				if (this.$mbservices.isEmpty(this.itemData.BeginDate)) {
					return;
				}
				if (this.$mbservices.isEmpty(this.itemData.EndDate)) {
					return;
				}
				return new Promise((resolve) => {
					let ajaxJSON = {
						BeginDate: this.itemData.BeginDate,
						EndDate: this.itemData.EndDate,
						TripType: this.TripTypes[this.indexTripType].Key,
						UIStatus: "New"
					};
					this.$mbservices.Request(this.$webapi.CalcTripDateDiffAndAllowance, "POST", ajaxJSON, res => {
						if (res.data.RecordCount > 0) {
							resolve(res);
						}
					}, err => {
						resolve(err);
					})
				});
			},
			bindPickerChange4(item, e) {
				var _this = this;
				_this.indexType = e.target.value;
				item.indexType = e.target.value;
				item.UserId = _this.TripCompanions[item.indexType].UserId;
				item.UserName = _this.TripCompanions[item.indexType].UserName;
				item.UIStatus = "New"
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
			addOption(e) {
				if (this.editEntitysList.length <= 0) {
					this.editEntitysList.push({
						TripCompanions: []
					})
				}
				this.editEntitysList[0].TripCompanions.push({
					id: this.editEntitysList[0].TripCompanions.length + 1,
					UserId: "0",
					LineNum: this.editEntitysList[0].TripCompanions.length + 1,
					UserName: "请选择",
					indexType: 0,
					UIStatus: "New"
				});
			},
			deleteOption(e) {
				if (this.editEntitysList[0].TripCompanions.length === 1) {
					return false;
				}
				var cache = new Array();
				this.editEntitysList[0].TripCompanions.forEach(item => {
					if (item.id === e.id) {
						//cache.push(item);
						e.UIStatus = "Delete"
					}
				});
			},
			submitForm() {
				var _this = this;
				uni.showLoading({
					title: "正在提交..."
				});
				var _lines = new Array();
				var _indx = 0;
				var ajaxJSON = {};
				if (_this.editflag) {
					_this.editEntitysList[0].Approve = _this.isDoSteps ? "Yes" : "No";
					(_this.editEntitysList[0].ApproveStatus = "Pending"),
					_this.editEntitysList[0].Remarks = _this.itemData.Remarks;
					_this.editEntitysList[0].Cause = _this.itemData.Cause;
					_this.editEntitysList[0].BeginDate = _this.itemData.BeginDate;
					_this.editEntitysList[0].EndDate = _this.itemData.EndDate;
					_this.editEntitysList[0].BeginDateAndStartPlace = _this.itemData.BeginDateAndStartPlace;
					_this.editEntitysList[0].TripType = _this.TripTypes[_this.indexTripType].Key;
					_this.editEntitysList[0].Allowance = _this.itemData.Allowance;
					_this.editEntitysList[0].UIStatus = "Modify";
					ajaxJSON = _this.editEntitysList[0];
				} else {
					if (_this.editEntitysList.length > 0 && _this.editEntitysList[0].TripCompanions.length > 0) {
						_this.editEntitysList[0].TripCompanions.forEach(_item => {
							if (_this.editEntitysList[0].TripCompanions.length === 1 && _this.editEntitysList[0].TripCompanions[0].UserName ===
								'请选择') {
								_lines = [];
							} else {
								_indx = parseInt(_indx) + 1;
								var lineItem = {
									DocEntry: _this.itemData.DocEntry,
									LineNum: _indx,
									ObjectType: "Trip",
									UserId: _item.UserId,
									UserName: _item.UserName,
									Canceled: "N",
									Closed: "N",
									LineStatus: "O",
									UIStatus: _item.UIStatus,
								};
								_lines.push(lineItem);
							}
						})
					}

					ajaxJSON = {
						ObjectType: "Trip",
						DocNum: _this.itemData.DocEntry.toString(),
						BeginDate: _this.itemData.BeginDate,
						EndDate: _this.itemData.EndDate,
						BeginDateAndStartPlace: _this.itemData.BeginDateAndStartPlace,
						TripHours: _this.itemData.TripHours,
						CreateDate: this.formatDate(this.time),
						TripCompanions: _lines,
						CreatorId: uni.getStorageSync("JSUserInfo").UserId,
						Creator: uni.getStorageSync("JSUserInfo").UserName,
						Cause: _this.itemData.Cause,
						Remarks: _this.itemData.Remarks,
						Approve: _this.isDoSteps ? "Yes" : "No",
						ApproveStatus: "Pending",
						Canceled: "No",
						Closed: "No",
						Attachments: "",
						TripType: _this.itemData.TripType,
						Allowance: _this.itemData.Allowance,
						OrganizationCode: uni.getStorageSync("JSUserInfo").OrganizationCode,
						OrganizationName: uni.getStorageSync("JSUserInfo").OrganizationName,
						CompanyId: uni.getStorageSync("JSUserInfo").CompanyId,
						CompanyName: uni.getStorageSync("JSUserInfo").CompanyName,
						UIStatus: "New"
					};
				}
				var requestUrl = _this.editflag ?
					_this.$webapi.saveTrip :
					_this.$webapi.saveTrip;
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
								showCancel: false,
							})
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
						uni.showToast({
							title: "失败:" + err.data
						});
					}
				)
			},
			inputHours(itemData, event) {
				itemData.TripHours = event.detail.value;
			},
			onKeyInput(event) {
				this.formList[parseInt(event.target.id) - 1].jine = event.detail.value;
				var _cache = 0;
				this.formList.forEach(item => {
					_cache = (parseFloat(item.jine) + parseFloat(_cache)).toFixed(2);
				});
				this.totalJine = _cache.toString();
			},
			textareaInput(e) {
				this.itemData.Cause = e.detail.text; //e; //.detail.value;
			},
			BeginDateAStartPlaceInput(e) {
				this.itemData.BeginDateAndStartPlace = e.detail.text; //e; //.detail.value;
			},
			async bindDateChange(itemData, e) {
				itemData.BeginDate = e.target.value;
				itemData.EndDate = "请选择";
				if (this.$mbservices.isEmpty(itemData.EndDate) || itemData.EndDate === '请选择') {
					return;
				} else {
					//this.computTime();
					let ret = await this.computTime1();
					if (ret.data.RecordCount > 0) {
						this.itemData.TripHours = ret.data.data.DayDiff;
						this.itemData.Allowance = ret.data.data.Allowance;
					} else {
						uni.showToast({
							title: ret.data.data,
							icon: 'none'
						})
					}
				}
			},
			async bindDateChange1(itemData, e) {
				itemData.EndDate = e.target.value;
				//this.computTime();
				let ret = await this.computTime1();
				if (ret.data.RecordCount > 0) {
					this.itemData.TripHours = ret.data.data.DayDiff;
					this.itemData.Allowance = ret.data.data.Allowance;
				} else {
					uni.showToast({
						title: ret.data.data,
						icon: 'none'
					})
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === "start") {
					year = year - 60;
				} else if (type === "end") {
					year = year + 2;
				}
				month = month > 9 ? month : "0" + month;
				day = day > 9 ? day : "0" + day;

				return `${year}-${month}-${day}`;
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
			getUserIndex(keyValue) {
				var index = 0;
				this.TripCompanions.forEach((item, _indx) => {
					if (item.UserName === keyValue) {
						index = _indx;
					}
				});
				return index;
			},
			getDetailData() {
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
					this.$webapi.getTripList,
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
							_$this.itemData.TripHours = item.TripHours;
							_$this.itemData.TripType = item.TripType;
							if (item.TripType === 'Internal') {
								_$this.indexTripType = 0;
							}
							if (item.TripType === 'External') {
								_$this.indexTripType = 1;
							}
							_$this.itemData.Allowance = parseFloat(item.Allowance).toFixed(2);
							_$this.itemData.BeginDate = item.BeginDate;
							_$this.itemData.EndDate = item.EndDate;
							_$this.itemData.BeginDateAndStartPlace = item.BeginDateAndStartPlace;
							_$this.itemData.Cause = item.Cause;
							_$this.editorCtx.setContents(item.Cause);
							_$this.editorCtx1.setContents({
								html: item.Cause,
								success: (res) => {
									console.log(res)
								},
								fail: (res) => {
									console.log(res)
								},
							});
							_$this.editorCtx.setContents({
								html: item.BeginDateAndStartPlace,
								success: (res) => {
									console.log(res)
								},
								fail: (res) => {
									console.log(res)
								},
							});
							_this.formList = [];
							item.TripCompanions.forEach((_item, _indx) => {
								_item.indexType = _this.getUserIndex(
									_item.UserName
								)
							});
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
			},
			textareaInput33(e) {
				this.itemData.Remarks = e.detail.value;
			},
		},
		onLoad(e) {
			//this.setRefsTextarea();
			//#ifdef MP-WEIXIN
			const query = wx.createSelectorQuery().in(this);
			query.select("#_tabBar").boundingClientRect();
			query.selectViewport().scrollOffset();
			var _this = this;
			query.exec(function(res) {
				res[0].top; // #the-id节点的上边界坐标
				res[1].scrollTop; // 显示区域的竖直滚动位置
				_this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - _this.CustomBar - res[0].height;
			});
			//#endif
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
				uni.showLoading({
					title: "拼命加载中..."
				});
				var _this = this;
				_this.getUserList();
				_this.getHolidaySchedule();
				setTimeout(function() {
					_this.getDetailData();
				}, 1000);
			}
			if (!this.editflag) {
				//最大编号
				this.$mbservices.Request(this.$webapi.maxNumTrip, 'GET', {}, res => {
					this.itemData.DocEntry = res.data;
				}, null);
				this.getUserList();
				this.getHolidaySchedule();
			}
		},
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

	/*  placeholder*/
	.placeholder {
		color: transparent;
		font-size: 10px;
	}
</style>
