ss<template>
	<view>
		<custom :isBack="false">打卡</custom>
		<scroll-view scroll-y class="page" :style="{'height':scrollBarHeight+'px'}">
			<view class="bg-white">
				<view class="top">
					<view class="bg-blue margin-0 light" style="margin-top: 0px;">当前经纬度:{{latitude}},{{longitude}}
					</view>
				</view>
				<map id="_mapController" ref="_mapController" :latitude="latitude" @markertap="openMap()"
					@callouttap="openMap()" :longitude="longitude" :markers="covers" :circles="circles" :scale="scale">
					<!--  -->
				</map>
			</view>
			<view class="content text-center" v-if="ValidateAAType()===2">
				<text>当前连接WIFI:{{WIFIInfo.SSID}}</text>
			</view>
			<view class="flex padding justify-center" style="position: relative;">
				<view v-if="Loaded" @tap="showModal" data-target="ConfirmModal"
					:class="[toggleDelay?'animation-scale-up':'',IsOutSideWork?'bg-gradual-orange':'bg-gradual-blue']"
					class="animation-reverse padding-xl justify-center text-white text-center margin-top-xs"
					style="min-width: 120px;min-height: 120px;width: 120px;height: 120px;border-radius: 50%;">
					<view class="margin-top">
						<text class="text-bold">{{BtnActionName}}</text><br />
						<text>{{TimeShow}}</text>
					</view>
				</view>
				<view v-if="!Loaded" data-target="ConfirmModal"
					class="animation-reverse padding-xl justify-center text-white text-center margin-top-xs bg-grey"
					style="min-width: 120px;min-height: 120px;width: 120px;height: 120px;border-radius: 50%;">
					<view class="margin-top">
						<text class="text-bold">考勤打卡</text><br />
						<text>{{TimeShow}}</text>
					</view>
				</view>
				<!-- <text class="text-white" style="position: absolute;margin-top: 75px;">{{TimeShow}}</text> -->
				<text class="top text-blue text-sm" style="position: absolute;top:15px;right: 15px;"
					@tap="ToCheckRecord">历史打卡记录</text>
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

			<!-- <view class="flex padding justify-center" style="position: relative;">
				<view>
					<button class="cu-btn bg-white shadow round-dot" style="background-color: rgba(0,0,0,0);" @tap="ToCheckRecord">
						打卡记录
					</button>
				</view>
			</view> -->
			<view class="cu-timeline bg-white" v-for="(item,index) in WorkRecords" :key="index"
				style="background-color: rgba(0,0,0,0);">
				<!-- style="background-color: rgba(0,0,0,0);" -->
				<view class="cu-time cu-tag radius round margin-left">第{{index+1}}次打卡<text
						v-if="ScheduleEntity.AttendanceAccording==='Wifi'&&item.RecordIsEffective!=='Yes'"
						class="cu-tag radius bg-red">无效</text></view>
				<view class="cu-item">
					<view class="content">
						<view class="cu-capsule radius" style="background-color: rgba(0,0,0,0);">
							<view class="cu-tag bg-cyan" v-if="getMornAfter(item.CheckDatetime)==='上午'">
								{{getMornAfter(item.CheckDatetime)}}</view>
							<view class="cu-tag bg-orange" v-if="getMornAfter(item.CheckDatetime)==='下午'">
								{{getMornAfter(item.CheckDatetime)}}</view>
							<view class="cu-tag bg-red" v-if="getMornAfter(item.CheckDatetime)==='未知'">
								{{getMornAfter(item.CheckDatetime)}}</view>
							<view class="cu-tag line-cyan" v-if="getMornAfter(item.CheckDatetime)==='上午'">
								{{getCheckTime(item.CheckDatetime)}}</view>
							<view class="cu-tag line-orange" v-if="getMornAfter(item.CheckDatetime)==='下午'">
								{{getCheckTime(item.CheckDatetime)}}</view>
							<view class="cu-tag line-red" v-if="getMornAfter(item.CheckDatetime)==='未知'">
								{{getCheckTime(item.CheckDatetime)}}</view>
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
								<view class="padding-xs bg-img" :style="'background-image:url(' + _item +')'"
									v-for="(_item,_idx) in item.PicPaths" :key="_idx"
									@tap="ViewImage1(item.PicPaths,_idx)" :data-url="_item">
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
						<view class="text-left" v-if="ValidateAAType()===1"><text class="text-bold">打卡地点:</text><text
								class="text-sm">{{currentArea.address}}附近</text></view>
						<view class="text-left" v-if="ValidateAAType()===2"><text
								class="text-bold">当前链接WIFI:</text><text
								class="text-sm text-blue text-bold">{{WIFIInfo.SSID}}</text></view>
						<view class="text-left" v-if="ValidateAAType()===2"><text class="text-bold">当前Mac地址:</text><text
								class="text-sm text-blue text-bold">{{WIFIInfo.BSSID}}</text>&nbsp;<button
								class="cu-btn sm bg-yellow" @tap="cloneMac">复制</button></view>
						<view class="text-left">
							<text class="text-bold">在此备注:</text>
							<textarea class="text sm-border placeholder" v-if="modalName==='ConfirmModal'"
								:disabled="modalName===null" @input="txtInput"
								style="height: 150px;min-height: 150px;width: 100%;"></textarea>
						</view>
					</view>
				</view>
				<view class="cu-form-group text-left margin-top" style="background-color: rgba(0,0,0,0);">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
							:data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='icon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="TakePhotos" v-if="imgList.length<4">
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
				</view>
			</view>
		</view>
		<!-- 关联申请单-开始 -->
		<view class="cu-modal" :class="modalName==='RelatedRequest'?'show':''">
			<view class="cu-dialog" @tap.stop="" style="width: 280px;max-width: 280px;">
				<view class="cu-item padding-lr-xl">
					<view class="action text-bold text-xxl">选择填写申请单类型</view>
				</view>
				<scroll-view scroll-y="true" :style="{'height':(scrollBarHeight/2)+'px'}">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in 2" :key="index">
								<label class="flex justify-between align-center flex-sub" v-if="index===0">
									<view class="flex-sub">
										<text>{{index +1}}、出差申请单</text>
									</view>
									<radio class="round" :class="radio=='radio' + index?'checked':''"
										:checked="radio=='radio' + index?true:false" :value="'radio' + index"></radio>
								</label>
								<label class="flex justify-between align-center flex-sub" v-if="index===1">
									<view class="flex-sub">
										<text>{{index +1}}、外出申请单</text>
									</view>
									<radio class="round" :class="radio=='radio' + index?'checked':''"
										:checked="radio=='radio' + index?true:false" :value="'radio' + index"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</scroll-view>
				<view class="cu-bar solid-top">
					<view class="action"></view>
					<view class="action">
						<button class="cu-btn round bg-blue" @tap="hideModal()">取消</button>
					</view>
					<view class="action solid-left">
						<button class="cu-btn round bg-blue" @tap="CreateRequest">创建</button>
					</view>
					<view class="action"></view>
				</view>
			</view>
		</view>
		<!-- 关联申请单-结束 -->
		<!-- 外勤打卡-开始 -->
		<view class="cu-modal" :class="modalName==='GooutRecord'?'show':''">
			<view class="cu-dialog" @tap.stop="" style="width: 280px;max-width: 280px;">
				<view class="cu-item padding-lr-xl">
					<view class="action text-bold text-xxl">外勤打卡信息</view>
					<view class="text-content">
						<view class="text-left"><text class="text-bold">打卡时间:</text>{{TimeShow}}</view>
						<view class="text-left" v-if="ValidateAAType()===1"><text class="text-bold">打卡地点:</text><text
								class="text-sm">{{currentArea.address}}附近</text></view>

						<!-- <view class="text-left">
							<view class="flex p-xs">
								<view class="flex-sub"><text class="text-bold">外出时长:</text></view>
								<view class="flex-sub">
									<view class="flex">
										<view class="flex-twice" style="border-bottom: 1rpx solid #ddd;"><input placeholder="外出时长" type="digit" class="text-right"
											 :value="GooutHours" @input="txtInputHours" /></view>
										<view class="flex-sub text-right" style="border-bottom: 1rpx solid #ddd;"><text class="cu-tag round bg-orange light sm">小时</text></view>
									</view>
								</view>
							</view>
						</view> -->
						<view class="text-left">
							<text class="text-bold">是否居家:</text>
							<text>是</text>
							<switch class="wx-switch-input" @change="SwitchWFH" :checked="IsWorkFromHouse"
								style="margin: 0 19px;"></switch>
							<text>否</text>
						</view>
						<view class="text-left">
							<text class="text-bold">在此备注:</text>
							<textarea class="text sm-border placeholder" v-if="modalName==='GooutRecord'"
								:disabled="modalName===null" @input="txtInput"
								style="height: 150px;min-height: 150px;width: 100%;" placeholder="在此输入外勤原因"></textarea>
						</view>
					</view>
				</view>
				<view class="cu-form-group text-left margin-top" style="background-color: rgba(0,0,0,0);">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
							:data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='icon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="TakePhotos" v-if="imgList.length<4">
							<text class='icon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="cu-bar solid-top">
					<view class="action"></view>
					<view class="action">
						<button class="cu-btn round bg-blue" @tap="hideModal()">取消</button>
					</view>
					<view class="action">
						<button class="cu-btn round bg-blue" @tap="submitData">确定</button>
					</view>
					<view class="action"></view>
				</view>
			</view>
		</view>
		<!-- 外勤打卡-结束 -->
	</view>
</template>

<script>
	import QQMapWX from '../../../common/qqmap-wx-jssdk.js'
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
				currentArea: {
					address: '位置'
				},
				latitude: 36.645008,
				longitude: 116.915131,
				scale: 20,
				IsOutSideWork: false,
				BtnActionName: "考勤打卡",
				radio: 'radio1',
				circles: [{
					latitude: null,
					longitude: null,
					color: '#32CD324D',
					fillColor: '#32CD324D',
					radius: 0,
					strokeWidth: 0
				}],
				WIFIInfo: {
					SSID: '',
					BSSID: ''
				},
				GooutHours: 0,
				covers: [{
					width: 50,
					height: 50,
					id: 1,
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
				toggleDelay: false,
				IsWorkFromHouse: false,
			}
		},
		async onShow() {
			this.Loaded = false;


			//#ifdef MP-WEIXIN
			// 实例化腾讯地图API核心类
			let mapTX = uni.createMapContext("_mapController", this);
			//#endif

			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar - 53;
			//#endif
			this.circles[0].latitude = null; //parseFloat(this.ScheduleEntity.Latitude);
			this.circles[0].longitude = null; // parseFloat(this.ScheduleEntity.Longitude);
			var arr = [];
			this.circles.forEach((item, index) => {
				if (index === 0) {
					arr.push(item)
				}
			})
			this.circles = [];
			arr.forEach((item, index) => {
				this.circles.push(item);
			})
			this.$forceUpdate()
			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar - 50 - 40;
			setInterval(() => {
				this.TimeShow = this.$mbservices.formatDateTime(new Date(), 'hh:mm:ss')
			}, 1000);
			// #endif
			this._New_isGetLocation();
			this.getWorkRecords();
		},
		onLoad(e) {
			//#ifdef MP-WEIXIN
			// 实例化腾讯地图API核心类
			this.qqmapsdk = new QQMapWX({
				key: 'RTGBZ-QCCKU-HWRVD-2BYLK-PGWAT-PLFRG' // 必填
			});
			//#endif

			//#ifdef MP-WEIXIN
			/* this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar - 50 - 40;
			setInterval(() => {
				this.TimeShow = this.$mbservices.formatDateTime(new Date(), 'hh:mm:ss')
			}, 1000); */
			uni.$on('GetPhotoImgPath', this.GetPhotoImgPath)
			// #endif
		},
		methods: {
			/* 新流程-开始 */
			_New_isGetLocation(a = "scope.userLocation") { // 3. 检查当前是否已经授权访问scope属性，参考下截图
				var _this = this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting[a]) { //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
							_this._New_getAuthorizeInfo()
						} else {
							_this._New_ReloadScheduleInfo()
						}
					},
					fail(err) {
						_this._New_getAuthorizeInfo()
					}
				});
			},
			_New_ReloadScheduleInfo() {
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

							/* 是否是多打卡地点 */



							this._New_getLocationInfo();
						}
					} else {
						if (this.$mbservices.isEmpty(this.ScheduleEntity.ScheduleCode)) {
							uni.showToast({
								title: '查无排班',
								icon: 'none'
							})
						}
					}
				}, err => {
					uni.hideLoading()
				})
			},

			_New_getAuthorizeInfo(a = "scope.userLocation") { //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
				var _this = this;
				uni.authorize({
					scope: a,
					success() { //1.1 允许授权
						_this._New_ReloadScheduleInfo();
					},
					fail() { //1.2 拒绝授权
						console.log("你拒绝了授权，无法获得周边信息")
					}
				})
			},
			_New_getLocationInfo() {
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
								this._New_calcDistanceCurToAim();
							},
							fail: function(res) {}
						})
					},
				})
			},
			_New_calcDistanceCurToAim() {
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
						this.element = res;
						this._New_ValidateWorkRecordType(res);
					},
					fail: function(error) {
						console.log(error);
					},
					complete: function(res) {
						console.log(res);
					}
				});
			},
			_New_ValidateWorkRecordType(value) {
				/* 锁定经纬度打卡-开始 */
				if (this.ScheduleEntity.AttendanceAccording === "LatLng") {
					var disEntity = value //await this.calcDistanceCurToAim();
					this.circles[0].latitude = parseFloat(this.ScheduleEntity.Latitude);
					this.circles[0].longitude = parseFloat(this.ScheduleEntity.Longitude);
					this.circles[0].radius = parseFloat(this.ScheduleEntity.LimitRadius) > 0 ? parseFloat(this
							.ScheduleEntity.LimitRadius) :
						0;
					if (parseFloat(disEntity.elements[0].distance) > parseFloat(this.ScheduleEntity.LimitRadius)) {
						if (this.ScheduleEntity.IsExtraLongLat === 'Yes') { //多个打卡地
							var _To = "";
							this.ScheduleEntity.ExtraLongLatLines.forEach((item, index) => {
								this.circles.push({
									latitude: parseFloat(item.Latitude),
									longitude: parseFloat(item.Longitude),
									color: '#32CD324D',
									fillColor: '#32CD324D',
									radius: parseFloat(item.LimitRadius) > 0 ? parseFloat(item
										.LimitRadius) : 500.0,
									strokeWidth: 0
								})
								_To += item.Latitude + "," + item.Longitude + ";";
							})
							_To = _To.toString().substr(0, _To.toString().length - 1);
							//一对多计算距离
							this.qqmapsdk.calculateDistance({
								mode: 'straight',
								//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
								//from参数不填默认当前地址
								//获取表单提交的经纬度并设置from和to参数（示例为string格式）
								from: this.latitude + ',' + this.longitude || '', //若起点有数据则采用起点坐标，若为空默认当前地址
								to: _To, //终点坐标
								success: (res) => {
									//成功后的回调
									var isHave = false;
									var option = {};
									var aimIndex = 0;
									res.result.elements.forEach((opt, idx) => {
										this.ScheduleEntity.ExtraLongLatLines.forEach((_opt, _idx) => {
											if (parseFloat(opt.to.lat) === parseFloat(_opt
													.Latitude) && parseFloat(opt.to.lng) ===
												parseFloat(
													_opt.Longitude)) {
												if (parseFloat(opt.distance) <= parseFloat(_opt
														.LimitRadius)) {
													isHave = true;
													option = opt;
													aimIndex = idx;
												}
											}
										})
									})
									if (isHave) {
										this.BtnActionName = "考勤打卡";
										this.IsOutSideWork = false;

										this.element = {
											elements: []
										};
										this.element.elements.push(option);

										this.ScheduleEntity.Latitude = option.Latitude;
										this.ScheduleEntity.Longitude = option.Longitude;
										this.ScheduleEntity.LimitRadius = option
										.LimitRadius; //this.element.elements[0];

										this.Loaded = true;
										this.$forceUpdate()
										uni.hideLoading()
									} else {
										this.BtnActionName = "外勤打卡";
										this.IsOutSideWork = true;

										this.Loaded = true;
										this.$forceUpdate()
										uni.hideLoading()
									}
								},
								fail: function(error) {
									console.log(error);
								},
								complete: function(ress) {
									console.log(ress);
								}
							});


						} else { //确实是外勤
							this.BtnActionName = "外勤打卡";
							this.IsOutSideWork = true;

							this.Loaded = true;
							this.$forceUpdate()
							uni.hideLoading()
						}
					} else { //正常打卡
						this.BtnActionName = "考勤打卡";
						this.IsOutSideWork = false;

						this.Loaded = true;
						this.$forceUpdate()
						uni.hideLoading()
					}
				}
				/* 锁定经纬度打卡-结束 */
				/* 锁定WIFI打卡-开始 */
				if (this.ScheduleEntity.AttendanceAccording === "Wifi") {
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
									if (!(this.WIFIInfo.BSSID.toLocaleLowerCase().indexOf(this
												.ScheduleEntity.WifiMac.toLocaleLowerCase()) ===
											-1)) {
										this.BtnActionName = "外勤打卡";
										this.IsOutSideWork = true;
									}
									this.Loaded = true;
									uni.hideLoading()
								},
								fail: (err) => {
									uni.showToast({
										title: '获取不到WIFI信息',
										icon: 'none'
									})
								},
								complete: (cmp) => {
									uni.hideLoading()
								}
							})
						}
					})
					//#endif
				}
				/* 锁定WIFI打卡-结束 */
			},
			





















			/* 新流程-结束 */
			ReloadScheduleInfo() {
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
			},
			CreateRequest(e) {
				if (this.radio === 'radio0') {
					uni.navigateTo({
						url: '/pages/Trip/Tripform/Tripform'
					})
				}
				if (this.radio === 'radio1') {
					uni.navigateTo({
						url: '/pages/Goout/Gooutform/Gooutform'
					})
				}
				this.modalName = null;
			},
			RadioChange(e) {
				this.radio = e.detail.value
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
			submitDataCommon() {
				if (this.$mbservices.isEmpty(this.ScheduleEntity.ScheduleCode)) {
					uni.showModal({
						title: '无排班信息,请刷新重试'
					})
					this.ReloadScheduleInfo()
					return false;
				}
				if (this.ScheduleEntity.AttendanceAccording === 'LatLng') {
					if (this.$mbservices.isEmpty(this.currentArea.address) || this.currentArea.address === '位置') {
						uni.showModal({
							title: '等待位置信息加载完成后再打卡'
						})
						return false;
					}
				}
				if (this.ScheduleEntity.AttendanceAccording === 'Wifi') {
					if (this.$mbservices.isEmpty(this.WIFIInfo.BSSID.toLocaleLowerCase())) {
						uni.showModal({
							title: '连接WIFI后打卡'
						})
						return false;
					}
				}
				this.modalName = null;

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
					RecordPicPath: '',
					RecordRemarks: '',
					AttendanceAccording: this.ScheduleEntity.AttendanceAccording,
					UIStatus: "New"
				};
				if (this.ScheduleEntity.AttendanceAccording === 'Wifi') {
					data.RecordIsEffective = this.ScheduleEntity.WifiMac.toLocaleLowerCase() === this.WIFIInfo.BSSID
						.toLocaleLowerCase() ?
						'Yes' : 'No'
				}
				if (this.ScheduleEntity.AttendanceAccording === 'LatLng') {
					data.ScheduleLat = this.ScheduleEntity.Latitude;
					data.ScheduleLng = this.ScheduleEntity.Longitude;
					data.ScheduleLmt = this.ScheduleEntity.LimitRadius; //this.element.elements[0];
					data.CurentLat = this.latitude;
					data.CurentLng = this.longitude;
					if (this.element.elements[0] === undefined || this.element.elements.length <= 0 || this.$mbservices
						.isEmpty(this.element
							.elements[0].distance)) {
						uni.showToast({
							title: '正在计算距离，请稍后再试...',
							icon: 'none'
						})
						this.modalName = null;
						return false;
					}
					data.DistanceToAim = this.element.elements[0].distance;
					if (data.DistanceToAim <= 0 || this.$mbservices.isEmpty(data.DistanceToAim) || data.DistanceToAim
						.toString() ===
						'NaN') {
						uni.showToast({
							title: '距离异常，请刷新重试...',
							icon: 'none'
						})
						this.modalName = null;
						return false;
					}
				}
				uni.showLoading({
					title: '正在打卡...'
				})
				this.$mbservices.Request(this.$webapi.saveWorkRecord, 'POST', data, res => {
					uni.hideLoading()
					if (res.data.RecordCount > 0) {
						uni.showToast({
							title: '已打卡',
							icon: 'none'
						})
						this.txtContent = "";
						this.imgList = [];
						this.PicPaths = [];
						this.getWorkRecords();

						/* let param = {
							PageIndex: 1,
							RowsPerPage: "1000",
							type: "Initialize",
							Parameter: {
								LoadChildren: "NoLoad",
								Conditions: []
							}
						};
						this.$mbservices.Request(this.$webapi.ValidateIsHaveGooutTripRequest, 'POST', param,
							ret => {
								if (ret.data.RecordCount > 0) {
									if (ret.data.data === 'N' && (data.DistanceToAim > data.ScheduleLmt || data.RecordIsEffective === 'No')) {
										this.modalName = 'RelatedRequest';
									}
								}
							},
							err => {
								reject(err)
							}
						) */
					}
				}, err => {
					uni.showToast({
						title: err
					})
					uni.hideLoading()
				})
			},
			SwitchWFH(e){
				var that = this;
				if(e.target.value === false){
					that.IsWorkFromHouse = false;
				}else{
					that.IsWorkFromHouse = true;
				}
			},
			submitData() {
				/* if (this.$mbservices.isEmpty(this.GooutHours) || this.GooutHours <= 0) {
					uni.showToast({
						title: '请输入有效外勤时长',
						icon: 'none'
					})
					return false;
				} */
				/* if (this.GooutHours > 8) {
					uni.showToast({
						title: '外出时长不得大于8小时',
						icon: 'none'
					})
					return false;
				} */
				if (this.$mbservices.isEmpty(this.txtContent)) {
					uni.showToast({
						title: '请输入外勤原因',
						icon: 'none'
					})
					return false;
				}
				if (this.IsOutSideWork && this.PicPaths.length <= 0) {
					uni.showToast({
						title: '外勤打卡必须上传图片',
						icon: 'none'
					})
					return false;
				}
				this.modalName = null;

				let pathurls = '';
				this.PicPaths.forEach(item => {
					pathurls += item + ','
				})
				pathurls = pathurls.substr(0, pathurls.length - 1);
				var IsWFH = "";
				if(that.IsWorkFromHouse === false){
					IsWFH = "N";
				}else{
					IsWFH = "Y";
				}
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
					IsGooutWRecord: 'Yes',
					Hours: this.GooutHours,
					RecordRemarks: this.txtContent,
					AttendanceAccording: this.ScheduleEntity.AttendanceAccording,
					IsWorkFromHouse: IsWFH,
					UIStatus: "New"
				};
				if (this.ScheduleEntity.AttendanceAccording === 'Wifi') {
					data.RecordIsEffective = this.ScheduleEntity.WifiMac.toLocaleLowerCase() === this.WIFIInfo.BSSID
						.toLocaleLowerCase() ?
						'Yes' : 'No'
				}
				if (this.ScheduleEntity.AttendanceAccording === 'LatLng') {
					data.ScheduleLat = this.ScheduleEntity.Latitude;
					data.ScheduleLng = this.ScheduleEntity.Longitude;
					data.ScheduleLmt = this.ScheduleEntity.LimitRadius; //this.element.elements[0];
					data.CurentLat = this.latitude;
					data.CurentLng = this.longitude;
					if (this.element.elements[0] === undefined || this.element.elements.length <= 0 || this.$mbservices
						.isEmpty(this.element
							.elements[0].distance)) {
						uni.showToast({
							title: '正在计算距离，请稍后再试...',
							icon: 'none'
						})
						this.modalName = null;
						return false;
					}
					data.DistanceToAim = this.element.elements[0].distance;
					if (data.DistanceToAim <= 0 || this.$mbservices.isEmpty(data.DistanceToAim) || data.DistanceToAim
						.toString() ===
						'NaN') {
						uni.showToast({
							title: '距离异常，请刷新重试...',
							icon: 'none'
						})
						this.modalName = null;
						return false;
					}
				}
				uni.showLoading({
					title: '正在打卡...'
				})
				this.$mbservices.Request(this.$webapi.saveWorkRecord, 'POST', data, res => {
					uni.hideLoading()
					if (res.data.RecordCount > 0) {
						uni.showToast({
							title: '已打卡',
							icon: 'none'
						})
						this.txtContent = "";
						this.imgList = [];
						this.PicPaths = [];
						this.getWorkRecords();

						let param = {
							PageIndex: 1,
							RowsPerPage: "1000",
							type: "Initialize",
							Parameter: {
								LoadChildren: "NoLoad",
								Conditions: []
							}
						};
						/* this.$mbservices.Request(this.$webapi.ValidateIsHaveGooutTripRequest, 'POST', param,
							ret => {
								if (ret.data.RecordCount > 0) {
									if (ret.data.data === 'N' && (data.DistanceToAim > data.ScheduleLmt || data.RecordIsEffective === 'No')) {
										this.modalName = 'RelatedRequest';
									}
								}
							},
							err => {
								reject(err)
							}
						) */
					} else {
						uni.showModal({
							title: res.data
						})
					}
				}, err => {
					uni.showModal({
						title: err
					})
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
							ConditionValue: this.$mbservices.formatDateTime(new Date(), 'yyyy/MM/dd') +
								' 00:00:00',
							Relationship: "AND"
						}, {
							FieldName: "CheckDatetime",
							Operation: "LESS_EQUAL",
							ConditionValue: this.$mbservices.formatDateTime(new Date(), 'yyyy/MM/dd') +
								' 23:59:59',
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
			txtInputHours(e) {
				this.GooutHours = e.detail.value;
			},
			RefreshAddress(e) {
				this.circles[0].latitude = null; //parseFloat(this.ScheduleEntity.Latitude);
				this.circles[0].longitude = null; // parseFloat(this.ScheduleEntity.Longitude);
				var arr = [];
				this.circles.forEach((item, index) => {
					if (index === 0) {
						arr.push(item)
					}
				})
				this.circles = [];
				arr.forEach((item, index) => {
					this.circles.push(item);
				})
				this.$forceUpdate();
				this.Loaded = false;
				this._New_isGetLocation();
				this.getWorkRecords();
				//this.calcDistanceCurToAim();
			},
			//点击按钮进入打卡记录页面
			ToCheckRecord() {
				uni.navigateTo({
					url: "/pages/CheckRecord/CheckRecord",
					title: "打卡记录"
				});
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
										url: this.$webapi
										.uploadFilePath, //仅为示例，非真实的接口地址
										header: {
											Authorization: "bearer " + uni
												.getStorageSync("JSUserInfo")
												.access_token
										},
										filePath: _item,
										name: 'file',
										formData: {
											'user': 'test'
										},
										success: (uploadFileRes) => {
											JSON.parse(uploadFileRes.data).forEach(
												item => {
													this.PicPaths.push(item
														.filePath)
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
									Authorization: "bearer " + uni.getStorageSync("JSUserInfo")
										.access_token
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
								if (parseFloat(res.elements[0].distance) > parseFloat(this
										.ScheduleEntity.LimitRadius)) {
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
	map {
		width: 100%;
		height: 560upx;
	}
</style>
