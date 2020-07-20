<template>
	<view style="background-color: #fff;">
		<custom>打卡记录</custom>
		<scroll-view scroll-y class="page" :style="{'height':scrollBarHeight+'px'}">
			<view class="bg-white">
				<view class="content solid-bottom">
					<model-calendar :sendYear="toYear" :sendMonth="toMonth" :dataSource="signData" :totalNum="sumCount" @dateChange="getData"
					 @clickChange="clickSign">
					</model-calendar>
				</view>
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
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import modelCalendar from '@/components/Calendar/Calendar.vue';
	export default {
		data() {
			let _timeShow = this.$mbservices.formatDateTime(new Date(), 'hh:mm:ss')
			return {
				Loaded: false,
				txtContent: '',
				TimeShow: _timeShow,
				scrollBarHeight: 0,
				animation: '',
				imgList: [],
				modalName: null,
				scale: 20,
				IsOutSideWork: false,
				radio: 'radio1',
				WIFIInfo: {
					SSID: '',
					BSSID: ''
				},
				GooutHours: 0,
				PicPaths: [],
				WorkRecords: [],
				//单击某个日期显示打卡记录
				CheckRecords: [],
				RecordPicPathArr: [],
				element: {},
				toggleDelay: false,
				toYear: parseInt(new Date().getFullYear()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				sumCount: 0,
				signData: [],
				time: "",
			}
		},
		components: {
			modelCalendar
		},
		async onShow() {
			this.Loaded = false;

			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar;
			//#endif

			this.$forceUpdate()
			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar;
			setInterval(() => {
				this.TimeShow = this.$mbservices.formatDateTime(new Date(), 'hh:mm:ss')
			}, 1000);
			// #endif
		},
		onLoad(e) {
			var that = this;
			uni.showLoading({
				title: '正在加载...'
			})
			that.getYearMonth();
			that.getData(that.time);
			uni.hideLoading();
			//#ifdef MP-WEIXIN
			/* this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar - 50 - 40;
			setInterval(() => {
				this.TimeShow = this.$mbservices.formatDateTime(new Date(), 'hh:mm:ss')
			}, 1000); */
			uni.$on('GetPhotoImgPath', this.GetPhotoImgPath)
			// #endif
		},
		methods: {
			//单击日历日期事件
			clickSign(day) {
				let m = day.split('-')[1];
				let d = day.split('-')[2];
				if (parseInt(m) >= 10) {
					m = m;
				} else {
					m = "0" + m;
				}
				if (parseInt(d) >= 10) {
					d = d;
				} else {
					d = "0" + d;
				}
				var date = day.split('-')[0] + "/" + m + "/" + d;
				this.CheckRecords = [];
				this.getWorkRecords(date, "clickSign");
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

			GetPhotoImgPath(e) {
				this.imgList.push(e.data)
				uni.uploadFile({
					url: this.$webapi.uploadFilePath, //仅为示例，非真实的接口地址
					header: {
						Authorization: "bearer " + uni.getStorageSync("JSUserInfo").access_token
					},
					filePath: e.data,
					name: 'file',
					formData: {
						'user': 'test'
					},
					success: (uploadFileRes) => {
						JSON.parse(uploadFileRes.data).forEach(item => {
							this.PicPaths.push(item.filePath)
						});
					}
				});
			},
			cloneMac() {
				if (this.$mbservices.isEmpty(this.WIFIInfo.BSSID)) {
					uni.showToast({
						title: '无可用Mac',
						icon: 'none'
					})
					return false;
				}
				uni.setClipboardData({
					data: this.WIFIInfo.BSSID,
					success: function() {
						console.log('success');
					}
				});
			},
			RefreshWIFIINfo() {
				// #ifdef MP-WEIXIN
				this.WIFIInfo.SSID = "";
				this.WIFIInfo.BSSID = "";
				wx.startWifi({
					success: (res) => {},
					fail: (err) => {},
					complete: (cmp1) => {
						wx.getConnectedWifi({
							success: (res) => {
								this.WIFIInfo.SSID = res.wifi.SSID
								this.WIFIInfo.BSSID = res.wifi.BSSID
							},
							fail: (err) => {},
							complete: (cmp) => {}
						})
					}
				})
				//#endif
			},
			ValidateAAType() {
				if (this.ScheduleEntity.AttendanceAccording === 'LatLng') {
					return 1;
				}
				if (this.ScheduleEntity.AttendanceAccording === 'Wifi') {
					return 2;
				}
				return 0;
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
			//获取当前年月，日历按当前年月展示
			getYearMonth() {
				var that = this;
				var date = this.$mbservices.formatDateTime(new Date(), 'yyyy-MM-dd');
				that.time = date.split("-")[0] + "-" + parseInt(date.split("-")[1]) + "-" + parseInt(date.split("-")[2]);
			},
			getWorkRecords(e, from) {
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
						var time = e.split("/");
						var obj = time[0] + "-" + parseInt(time[1]) + "-" + parseInt(time[2]);
						this.signData.push(obj);
					}
				}, err => {})
			},
			txtInput(e) {
				this.txtContent = e.detail.value;
			},
			txtInputHours(e) {
				this.GooutHours = e.detail.value;
			},
			showModal(e) {
				if (!this.Loaded) {
					return;
				}
				if (this.$mbservices.isEmpty(this.ScheduleEntity.ScheduleCode)) {
					uni.showLoading({
						title: '请稍后...'
					})

					let param = {
						PageIndex: 1,
						RowsPerPage: "1000",
						type: "Initialize",
						Parameter: {
							LoadChildren: "Load",
							Conditions: [{
								FieldName: "Activated",
								Operation: "EQUAL",
								ConditionValue: 'Y',
								Relationship: "AND"
							}],
							ChildCriterias: [{
								BusinessObjectSearchType: "Search",
								BusinessObjectTypeName: "ScheduleLine",
								Conditions: [{
									FieldName: "UserId",
									Operation: "EQUAL",
									ConditionValue: uni.getStorageSync("JSUserInfo").UserId,
									Relationship: "AND"
								}]
							}],
						}

					};
					this.$mbservices.Request(this.$webapi.getScheduleList, 'POST', param, res => {
						if (res.data.RecordCount > 0) {
							this.ScheduleEntity = res.data.data[0];
							if (this.$mbservices.isEmpty(this.ScheduleEntity.ScheduleCode)) {
								uni.showToast({
									title: '查无排班',
									icon: 'none'
								})
							} else {
								this.RefreshWIFIINfo();
								this.toggleDelay = true;
								setTimeout(() => {
									this.toggleDelay = false
								}, 50)
								if (this.IsOutSideWork) {
									this.modalName = "GooutRecord";
								} else {
									//this.modalName = e.currentTarget.dataset.target;
									this.submitDataCommon()
								}
							}
						} else {
							if (this.$mbservices.isEmpty(this.ScheduleEntity.ScheduleCode)) {
								uni.showToast({
									title: '查无排班',
									icon: 'none'
								})
							}
						}
						uni.hideLoading()
					}, err => {
						uni.hideLoading()
					})

					return false;
				}

				this.RefreshWIFIINfo();
				this.toggleDelay = true;
				setTimeout(() => {
					this.toggleDelay = false
				}, 50)
				if (this.IsOutSideWork) {
					this.modalName = "GooutRecord";
				} else {
					//this.modalName = e.currentTarget.dataset.target;
					this.submitDataCommon()
				}
			},
			hideModal(e) {
				this.modalName = null
			},
			TakePhotos() {
				uni.navigateTo({
					url: '/pages/CommonTools/TakePhotos/TakePhotos'
				})
				return false;
				uni.authorize({
					scope: 'scope.camera',
					success() {
						/* 拍照开始 */
						var cameraContext = uni.createCameraContext();
						cameraContext.takePhoto({
							quality: "normal",
							success: (e) => {
								[tempFilePaths].forEach(_item => {
									uni.uploadFile({
										url: this.$webapi.uploadFilePath, //仅为示例，非真实的接口地址
										header: {
											Authorization: "bearer " + uni.getStorageSync("JSUserInfo").access_token
										},
										filePath: _item,
										name: 'file',
										formData: {
											'user': 'test'
										},
										success: (uploadFileRes) => {
											JSON.parse(uploadFileRes.data).forEach(item => {
												this.PicPaths.push(item.filePath)
											});

										}
									});
								})
							},
							fail: (e) => {},
							complete: (e) => {}
						});
						/* 拍照结束 */
					}
				})

			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						const tempFilePaths = res.tempFilePaths;
						tempFilePaths.forEach(_item => {
							uni.uploadFile({
								url: this.$webapi.uploadFilePath, //仅为示例，非真实的接口地址
								header: {
									Authorization: "bearer " + uni.getStorageSync("JSUserInfo").access_token
								},
								filePath: _item,
								name: 'file',
								formData: {
									'user': 'test'
								},
								success: (uploadFileRes) => {
									JSON.parse(uploadFileRes.data).forEach(item => {
										this.PicPaths.push(item.filePath)
									});

								}
							});
						})
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			ViewImage1(arr, idx) {
				uni.previewImage({
					urls: arr,
					current: arr[idx]
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除确认',
					content: '确定要删除这张图片？',
					cancelText: '再想想',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							this.PicPaths.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			getAuthorizeInfo(a = "scope.userLocation") { //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
				var _this = this;
				uni.authorize({
					scope: a,
					success() { //1.1 允许授权
						_this.getLocationInfo();
					},
					fail() { //1.2 拒绝授权
						console.log("你拒绝了授权，无法获得周边信息")
					}
				})
			},
			getLocationInfo() {
				//2. 获取地理位置
				let _this = this;
				wx.getLocation({
					type: 'gcj02',
					success: (res) => {
						//根据坐标获取当前位置名称，显示在顶部，腾讯地图逆地址解析
						this.latitude = res.latitude;
						this.longitude = res.longitude;
						this.covers[0].latitude = _this.latitude;
						this.covers[0].longitude = _this.longitude;
						this.$forceUpdate();
						this.qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success: (addressRes) => {
								var address = addressRes.result.formatted_addresses.recommend;
								this.latitude = addressRes.result.location.lat;
								this.longitude = addressRes.result.location.lng;
								this.currentArea.address = address;
								this.$forceUpdate();
								this.calcDistanceCurToAim();
							},
							fail: function(res) {}
						})
					},
				})
			},
			isGetLocation(a = "scope.userLocation") { // 3. 检查当前是否已经授权访问scope属性，参考下截图
				var _this = this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting[a]) { //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
							_this.getAuthorizeInfo()
						} else {
							_this.getLocationInfo()
						}
					},
					fail(err) {
						_this.getAuthorizeInfo()
					}
				});
			},
			async calcDistanceCurToAim() {
				return new Promise((resolve, reject) => {
					var _this = this;
					this.element = {};
					//调用距离计算接口
					this.qqmapsdk.calculateDistance({
						mode: 'straight',
						//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
						//from参数不填默认当前地址
						//获取表单提交的经纬度并设置from和to参数（示例为string格式）
						from: this.latitude + ',' + this.longitude || '', //若起点有数据则采用起点坐标，若为空默认当前地址
						to: this.ScheduleEntity.Latitude + ',' + this.ScheduleEntity.Longitude, //终点坐标
						success: (res) => {
							//成功后的回调
							var res = res.result;
							/* 锁定经纬度打卡-开始 */
							if (this.ScheduleEntity.AttendanceAccording === "LatLng") {
								if (parseFloat(res.elements[0].distance) > parseFloat(this.ScheduleEntity.LimitRadius)) {
									this.BtnActionName = "外勤打卡";
									this.IsOutSideWork = true;
								} else {
									this.BtnActionName = "考勤打卡";
									this.IsOutSideWork = false;
								}
							}
							/* 锁定经纬度打卡-结束 */
							this.element = res;
							this.Loaded = true;
							resolve(res);
						},
						fail: function(error) {
							console.error(error);
							reject(error);
						},
						complete: function(res) {
							console.log(res);
						}
					});
				});
			}
		}
	}
</script>

<style>

</style>
