<template>
	<view>
		<custom :isBack="false">打卡</custom>
		<scroll-view scroll-y class="page" :style="{'height':scrollBarHeight+'px'}">
			<view class="bg-white">
				<map id="_mapController" :latitude="latitude" @markertap="openMap()" @callouttap="openMap()" :longitude="longitude"
				 :markers="covers"></map>
			</view>
			<view class="flex padding justify-center" style="position: relative;">
				<button @tap="showModal" data-target="ConfirmModal" class="cu-btn lg bg-gradual-blue text-white text-center" style="min-width: 120px;min-height: 120px;width: 120px;height: 120px;border-radius: 50%;vertical-align:middle;">
					<text>考勤打卡</text><br />
				</button>
				<text class="text-white" style="position: absolute;margin-top: 75px;">{{TimeShow}}</text>
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
				<view class="cu-time">第{{index+1}}次打卡</view>
				<view class="cu-item">
					<view class="content">
						<view class="cu-capsule radius" style="background-color: rgba(0,0,0,0);">
							<view class="cu-tag bg-cyan">{{getMornAfter(item.CheckDatetime)}}</view>
							<view class="cu-tag line-cyan">{{getCheckTime(item.CheckDatetime)}}</view>
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
								 :key="_idx" @tap="ViewImage" :data-url="_item">
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
					<text class="line-grey"></text>
					<view class="text-content">
						<view class="text-left"><text class="text-bold">打卡时间:</text>{{TimeShow}}</view>
						<view class="text-left"><text class="text-bold">打卡地点:</text><text class="text-sm">{{currentArea.address}}附近</text></view>
						<view class="text-left margin-top-xs">
							<textarea class="text" placeholder="请填写备注" @input="txtInput" style="height: 150px;min-height: 150px;width: 100%;"></textarea>
						</view>
					</view>
				</view>
				<view class="cu-form-group text-left" style="background-color: rgba(0,0,0,0);">
					<view class="grid col-4 grid-square flex-sub">
						<view class="padding-xs bg-img" :style="'background-image:url(' + imgList[index] +')'" v-for="(item,index) in imgList"
						 :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='icon-close'></text>
							</view>
						</view>
						<view class="padding-xs solids" @tap="ChooseImage" v-if="imgList.length<4">
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
				RecordPicPathArr: []
			}
		},
		onLoad(e) {
			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar - 50;
			setInterval(() => {
				this.TimeShow = this.$mbservices.formatDateTime(new Date(), 'hh:mm:ss')
			}, 1000);
			// #endif
			this.isGetLocation()
			this.getWorkRecords();
		},
		methods: {
			getImgPathArr(path) {
				console.log('解析图片路径进来了');
				let arr = [];
				if (path.toString().lastIndexOf(',') <= -1 && this.$mbservices.isEmpty(path)) {
					return arr;
				}
				if (path.toString().lastIndexOf(',') <= -1 && !this.$mbservices.isEmpty(path)) {
					return arr.push(this.$webapi.webroot + '/' + path);
				}
				if (path.toString().lastIndexOf(',') > -1) {
					let cArr = path.toString().split(',');
					cArr.forEach(item => {
						arr.push(this.$webapi.webroot + '/' + item);
					})
				}
				console.log('看下返回值');
				console.log(arr);
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
					UIStatus: "New"
				};
				this.$mbservices.Request(this.$webapi.saveWorkRecord, 'POST', data, res => {
					uni.hideLoading()
					console.log('这个呢');
					console.log(res);
					if (res.data.RecordCount > 0) {
						this.getWorkRecords();
					}
					console.log(res);
				}, err => {
					uni.hideLoading()
					console.log(err);
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
					console.log('请求数据发挥的');
					console.log(res);
					if (res.data.RecordCount) {
						this.WorkRecords = res.data.data;
						this.WorkRecords.forEach(item => {
							item.PicPaths = [];
							item.PicPaths = this.getImgPathArr(item.RecordPicPath);
						})
					}
				}, err => {
					console.log(err);
				})
			},
			txtInput(e) {
				this.txtContent = e.detail.value;
			},
			RefreshAddress(e) {
				this.isGetLocation()
				this.getWorkRecords();
			},
			showModal(e) {
				console.log('看看');
				console.log(e);
				this.modalName = e.currentTarget.dataset.target
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
				console.log(e)
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
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
				console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
				console.log(Params);
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
						console.log('返回的是什么？');
						console.log(res.data.RecordCount);
						if (res.data.RecordCount > 0) {
							var re = JSON.parse(res.data.data);
							console.log(re);
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
				var _this = this;
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
				});
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
		}
	}
</script>

<style>
	map {
		width: 100%;
		height: 460upx;
	}
</style>
