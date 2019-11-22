<template>
	<view>
		<custom :isBack="false">打卡</custom>
		<scroll-view scroll-y class="page" :style="{'height':scrollBarHeight+'px'}">
			<view class="bg-white">
				<map id="_mapController" :latitude="latitude" @markertap="openMap()" @callouttap="openMap()" :longitude="longitude"
				 :markers="covers" :circles="circles"></map>
			</view>
			<view class="content text-center" v-if="ValidateAAType()===1">
				<text>当前经纬度:{{latitude}},{{longitude}}</text>
			</view>
			<view class="content text-center" v-if="ValidateAAType()===2">
				<text>当前连接WIFI:{{WIFIInfo.SSID}}</text>
			</view>
			<view class="flex padding justify-center">
				<view @tap="showModal" data-target="ConfirmModal" :class="[toggleDelay?'animation-scale-up':'']" class="animation-reverse padding-xl justify-center bg-gradual-blue text-white text-center margin-top-xs"
				 style="min-width: 120px;min-height: 120px;width: 120px;height: 120px;border-radius: 50%;">
					<view class="margin-top">
						<text class="text-bold">考勤打卡</text><br />
						<text>{{TimeShow}}</text>
					</view>
				</view>
				<!-- <text class="text-white" style="position: absolute;margin-top: 75px;">{{TimeShow}}</text> -->
			</view>
			<view class="flex solid-bottom padding justify-center" style="position: relative;">
				<view>
					<text class="icon-locationfill text-grey"></text>
					<text class="text-center text-grey">{{currentArea.address}}附近</text>
					<button class="cu-btn icon bg-white" style="background-color: rgba(0,0,0,0);" @tap="RefreshAddress">
						<text class="icon-refresh text-blue"><span></span></text>
					</button>
				</view>
			</view>
			<view class="cu-timeline" style="background-color: rgba(0,0,0,0);" v-for="(item,index) in WorkRecords" :key="index">
				<view class="cu-time">第{{index+1}}次打卡<text v-if="ScheduleEntity.AttendanceAccording==='Wifi'&&item.RecordIsEffective!=='Yes'"
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
						<view class="cu-form-group text-left" style="background-color: rgba(0,0,0,0);">
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
		<view class="cu-modal" :class="modalName==='ConfirmModal'?'show':''">
			<view class="cu-dialog" @tap.stop="" style="width: 280px;max-width: 280px;">
				<view class="cu-item padding-lr-xl">
					<view class="action text-bold text-xxl">确定打卡?</view>
					<view class="text-content">
						<view class="text-left"><text class="text-bold">打卡时间:</text>{{TimeShow}}</view>
						<view class="text-left" v-if="ValidateAAType()===1"><text class="text-bold">打卡地点:</text><text class="text-sm">{{currentArea.address}}附近</text></view>
						<view class="text-left" v-if="ValidateAAType()===2"><text class="text-bold">当前链接WIFI:</text><text class="text-sm text-blue text-bold">{{WIFIInfo.SSID}}</text></view>
						<view class="text-left">
							<text class="text-bold">在此备注:</text>
							<textarea class="text sm-border placeholder" v-if="modalName==='ConfirmModal'" :disabled="modalName===null"
							 @input="txtInput" style="height: 150px;min-height: 150px;width: 100%;"></textarea>
						</view>
					</view>
				</view>
				<view class="cu-form-group text-left margin-top" style="background-color: rgba(0,0,0,0);">
					<view class="grid col-4 grid-square flex-sub">
						<!-- <view class="padding-xs bg-img" :style="'background-image:url(' + imgList[index] +')'" v-for="(item,index) in imgList"
						 :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='icon-close'></text>
							</view>
						</view>
						<view class="padding-xs solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='icon-cameraadd'></text>
						</view> -->
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='icon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='icon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="cu-bar solid-top">
					<view class="action"></view>
					<view class="action">
						<button class="cu-btn round bg-blue" @tap="hideModal()">取消</button>
					</view>
					<view class="action solid-left">
						<button class="cu-btn round bg-blue" @tap="submitData">确定</button>
					</view>
					<view class="action"></view>
					<!-- <view class="flex solid-bottom padding justify-around">
						<view class=" padding-sm margin-xs" style="border-right: 1px solid #929292;">
							<button class="cu-btn round">不打卡</button>
						</view>
						<view class=" padding-sm margin-xs">
							<button class="cu-btn round">确定</button>
						</view>
					</view> -->
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import QQMapWX from '../../../common/qqmap-wx-jssdk.js'
	export default {
		data() {
			let _timeShow = this.$mbservices.formatDateTime(new Date(), 'hh:mm:ss')
			return {
				txtContent: '',
				TimeShow: _timeShow,
				scrollBarHeight: 0,
				animation: '',
				imgList: [],
				modalName: null,
				currentArea: {
					address: '位置'
				},
				latitude: 36.645008,
				longitude: 116.915131,
				circles: [{
					latitude: 36.658565,
					longitude: 116.893201,
					color: '#32CD324D',
					fillColor: '#32CD324D',
					radius: 500.0,
					strokeWidth: 0
				}],
				WIFIInfo: {
					SSID: '',
					BSSID: ''
				},
				covers: [{
					/* callout: {
						content: '点击图标跳转到导航',
						display: 'ALWAYS',
						color:'#FF4500'
					}, */
					width: 50,
					height: 50,
					id: '_marker_1',
					latitude: 36.645008,
					longitude: 116.915131,
					// #ifdef APP-PLUS
					iconPath: '../../static/app-plus/location@3x.png',
					// #endif
					// #ifndef APP-PLUS
					iconPath: '../../static/location.png',
					// #endif
					// #ifdef MP-WEIXIN
					iconPath: '../../../static/locationfill.png',
					//#endif
				}],
				PicPaths: [],
				WorkRecords: [],
				RecordPicPathArr: [],
				qqmapsdk: {},
				element: {},
				toggleDelay: false
			}
		},
		onShow() {
			console.log('进入onShow');
			this.circles[0].latitude = parseFloat(this.ScheduleEntity.Latitude);
			this.circles[0].longitude = parseFloat(this.ScheduleEntity.Longitude);
			this.$forceUpdate();
			this.isGetLocation();
			this.getWorkRecords();
			this.calcDistanceCurToAim();

			// #ifdef MP-WEIXIN
			this.WIFIInfo.SSID = "";
			this.WIFIInfo.BSSID = "";
			wx.startWifi({
				success: (res) => {},
				fail: (err) => {},
				complete: (cmp1) => {
					wx.getConnectedWifi({
						success: (res) => {},
						fail: (err) => {},
						complete: (cmp) => {
							this.WIFIInfo.SSID = cmp.wifi.SSID
							this.WIFIInfo.BSSID = cmp.wifi.BSSID
						}
					})
				}
			})
			//#endif
		},
		onLoad(e) {
			console.log('看下排版信息');
			console.log(this.ScheduleEntity);
			this.circles[0].latitude = parseFloat(this.ScheduleEntity.Latitude);
			this.circles[0].longitude = parseFloat(this.ScheduleEntity.Longitude);
			this.$forceUpdate()



			//#ifdef MP-WEIXIN
			// 实例化腾讯地图API核心类
			this.qqmapsdk = new QQMapWX({
				key: 'RTGBZ-QCCKU-HWRVD-2BYLK-PGWAT-PLFRG' // 必填
			});

			//#endif



			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar - 50 - 40;
			setInterval(() => {
				this.TimeShow = this.$mbservices.formatDateTime(new Date(), 'hh:mm:ss')
			}, 1000);
			// #endif
			this.isGetLocation()
			this.getWorkRecords();
			this.calcDistanceCurToAim();
		},
		methods: {
			RefreshWIFIINfo() {
				// #ifdef MP-WEIXIN
				this.WIFIInfo.SSID = "";
				this.WIFIInfo.BSSID = "";
				wx.startWifi({
					success: (res) => {},
					fail: (err) => {},
					complete: (cmp1) => {
						wx.getConnectedWifi({
							success: (res) => {},
							fail: (err) => {},
							complete: (cmp) => {
								this.WIFIInfo.SSID = cmp.wifi.SSID
								this.WIFIInfo.BSSID = cmp.wifi.BSSID
							}
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
			submitData() {
				this.modalName = null;
				uni.showLoading({
					title: '正在打卡...'
				})
				let pathurls = '';
				this.PicPaths.forEach(item => {
					pathurls += item + ','
				})
				pathurls = pathurls.substr(0, pathurls.length - 1);
				let data = {
					DocNum: "1",
					CreatorId: uni.getStorageSync("JSUserInfo").UserId,
					CreateDate: new Date(),
					Version: "1",
					CompanyId: uni.getStorageSync("JSUserInfo").CompanyId,
					Canceled: "N",
					Closed: "N",
					DocStatus: "O",
					Remarks: "",
					UserId: uni.getStorageSync("JSUserInfo").UserId,
					CheckType: "General",
					DataFrom: "MiniProgram",
					RecordAddress: this.currentArea.address,
					RecordPicPath: pathurls,
					RecordRemarks: this.txtContent,
					AttendanceAccording: this.ScheduleEntity.AttendanceAccording,
					UIStatus: "New"
				};
				if (this.ScheduleEntity.AttendanceAccording === 'Wifi') {
					data.RecordIsEffective = this.ScheduleEntity.WifiMac === this.WIFIInfo.BSSID ? 'Yes' : 'No'
				}
				if (this.ScheduleEntity.AttendanceAccording === 'LatLng') {
					data.ScheduleLat = this.ScheduleEntity.Latitude;
					data.ScheduleLng = this.ScheduleEntity.Longitude;
					data.ScheduleLmt = this.ScheduleEntity.LimitRadius; //this.element.elements[0];
					data.CurentLat = this.latitude;
					data.CurentLng = this.longitude;
					if (this.element.elements[0] === undefined || this.element.elements.length <= 0 || this.$mbservices.isEmpty(this.element
							.elements[0].distance)) {
						uni.showToast({
							title: '正在计算距离，请稍后再试...',
							icon: 'none'
						})
						return false;
					}
					data.DistanceToAim = this.element.elements[0].distance;
				}
				this.$mbservices.Request(this.$webapi.saveWorkRecord, 'POST', data, res => {
					uni.hideLoading()
					if (res.data.RecordCount > 0) {
						this.txtContent = "";
						this.imgList = [];
						this.PicPaths = [];
						this.getWorkRecords();
					}
				}, err => {
					uni.hideLoading()
				})
			},
			getWorkRecords() {
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
							ConditionValue: this.$mbservices.formatDateTime(new Date(), 'yyyy/MM/dd') + ' 00:00:00',
							Relationship: "AND"
						}, {
							FieldName: "CheckDatetime",
							Operation: "LESS_EQUAL",
							ConditionValue: this.$mbservices.formatDateTime(new Date(), 'yyyy/MM/dd') + ' 23:59:59',
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
					}
				}, err => {})
			},
			txtInput(e) {
				this.txtContent = e.detail.value;
			},
			RefreshAddress(e) {
				this.isGetLocation()
				this.getWorkRecords();
				this.calcDistanceCurToAim();
			},
			RefreshAddress1() {
				//获取当前位置
				let _this = this;
				wx.getLocation({
					type: 'gcj02',
					success: (res) => {
						//根据坐标获取当前位置名称，显示在顶部，腾讯地图逆地址解析
						console.log(res.latitude);
						console.log(res.longitude);
						this.latitude = res.latitude;
						this.longitude = res.longitude;
						this.qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success: (addressRes) => {
								console.log(addressRes);
								var address = addressRes.result.formatted_addresses.recommend;
								this.currentArea.address = address;
								console.log(address);
							}

						})
					},
				})
			},
			showModal(e) {
				this.RefreshWIFIINfo();
				this.toggleDelay = true;
				setTimeout(() => {
					this.toggleDelay = false
				}, 50)
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null
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
						console.log('看下图片数组');
						console.log(this.imgList);
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
									console.log(uploadFileRes);
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
			getAddressBylatLong() {
				let Params = {
					Latitude: this.latitude,
					Longitude: this.longitude
				};
				uni.request({
					url: this.$webapi.getAddressByLatLong,
					method: "POST",
					header: {
						"content-type": "application/x-www-form-urlencoded;charset=utf-8",
						Authorization: "Basic bWFnaWM6MTIzNA=="
					},
					data: {
						Latitude: this.latitude,
						Longitude: this.longitude
					},
					success: res => {
						if (res.data.RecordCount > 0) {
							var re = JSON.parse(res.data.data);
							this.currentArea = {
								code: re.result.ad_info.adcode,
								name: re.result.ad_info.district,
								address: re.result.address
							}
						}
					},
					fail: err => {}
				});
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
			getLocationInfo() { //2. 获取地理位置
				/* var _this = this;
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						let latitude, longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						_this.latitude = latitude;
						_this.longitude = longitude;

						_this.covers[0].latitude = _this.latitude;
						_this.covers[0].longitude = _this.longitude;
						_this.$forceUpdate();
						_this.getAddressBylatLong();
					}
				}); */




				let _this = this;
				wx.getLocation({
					type: 'gcj02',
					success: (res) => {
						//根据坐标获取当前位置名称，显示在顶部，腾讯地图逆地址解析
						console.log(res.latitude);
						console.log(res.longitude);
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
								console.log(addressRes);
								var address = addressRes.result.formatted_addresses.recommend;
								this.latitude = addressRes.result.location.lat;
								this.longitude = addressRes.result.location.lng;
								this.currentArea.address = address;
								console.log(address);
							}

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
					}
				});
			},
			calcDistanceCurToAim() {
				var _this = this;
				this.element = {};
				//调用距离计算接口
				this.qqmapsdk.calculateDistance({
					mode: 'straight', //可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
					//from参数不填默认当前地址
					//获取表单提交的经纬度并设置from和to参数（示例为string格式）
					from: this.latitude + ',' + this.longitude || '', //若起点有数据则采用起点坐标，若为空默认当前地址
					to: this.ScheduleEntity.Latitude + ',' + this.ScheduleEntity.Longitude, //终点坐标
					success: (res) => { //成功后的回调
						console.log(res);
						var res = res.result;
						var dis = [];
						for (var i = 0; i < res.elements.length; i++) {
							dis.push(res.elements[i].distance); //将返回数据存入dis数组，
						}
						console.log(res);
						this.element = res;
						/* _this.setData({ 
							  //设置并更新distance数据
				            distance: dis
				          }); */
					},
					fail: function(error) {
						console.error(error);
					},
					complete: function(res) {
						console.log(res);
					}
				});
			}
		}
	}
</script>

<style>
	map {
		width: 100%;
		height: 560upx;
	}
</style>
