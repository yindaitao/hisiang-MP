<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App Launch');
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif

					Vue.prototype.ColorList = [{
							title: '嫣红',
							name: 'red',
							color: '#e54d42'
						},
						{
							title: '桔橙',
							name: 'orange',
							color: '#f37b1d'
						},
						{
							title: '明黄',
							name: 'yellow',
							color: '#fbbd08'
						},
						{
							title: '橄榄',
							name: 'olive',
							color: '#8dc63f'
						},
						{
							title: '森绿',
							name: 'green',
							color: '#39b54a'
						},
						{
							title: '天青',
							name: 'cyan',
							color: '#1cbbb4'
						},
						{
							title: '海蓝',
							name: 'blue',
							color: '#0081ff'
						},
						{
							title: '姹紫',
							name: 'purple',
							color: '#6739b6'
						},
						{
							title: '木槿',
							name: 'mauve',
							color: '#9c26b0'
						},
						{
							title: '桃粉',
							name: 'pink',
							color: '#e03997'
						},
						{
							title: '棕褐',
							name: 'brown',
							color: '#a5673f'
						},
						{
							title: '玄灰',
							name: 'grey',
							color: '#8799a3'
						},
						{
							title: '草灰',
							name: 'gray',
							color: '#aaaaaa'
						},
						{
							title: '墨黑',
							name: 'black',
							color: '#333333'
						},
						{
							title: '雅白',
							name: 'white',
							color: '#ffffff'
						},
					]
				}
			})

			//#ifdef MP-WEIXIN
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
			});

			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});

			});

			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				uni.showModal({
					title: '更新提示',
					content: '更新失败,请重试'
				})
			});
			//#endif


			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			// 检测升级
			uni.request({
				url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
				data: {
					appid: plus.runtime.appid,
					version: plus.runtime.version,
					imei: plus.device.imei
				},
				success: (res) => {
					if (res.statusCode == 200 && res.data.isUpdate) {
						let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
						// 提醒用户更新
						uni.showModal({
							title: '更新提示',
							content: res.data.note ? res.data.note : '是否选择更新',
							success: (showResult) => {
								if (showResult.confirm) {
									plus.runtime.openURL(openUrl);
								}
							}
						})
					}
				}
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
			Vue.prototype.ScheduleEntity = {};
			// #ifdef MP-WEIXIN
			if (this.$store.state.access_token === null) {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						/* 开始自动登录 */
						uni.request({
							url: this.$webapi.getLoginOpenId,
							method: "POST",
							header: {
								"content-type": "application/x-www-form-urlencoded;charset=utf-8",
								Authorization: "Basic bWFnaWM6MTIzNA=="
							},
							data: {
								Code: res.code
							},
							success: result => {
								if (result.data.RecordCount > 0) {
									console.log(result);
									
									let OrherInfo = {};
									if (result.data.data.UserInfo === null) {
										uni.reLaunch({
											url: '/pages/login/login?data=' + result.data.data.Openid
										})
										return;
									}
									if (result.data.data.Openid === result.data.data.UserInfo.WechatOpenID_MP) {
										//是同一个人
										OrherInfo.IsFirst = false;
										OrherInfo.Openid = result.data.data.Openid;
										uni.request({
											url: this.$webapi.login,
											method: "POST",
											header: {
												"content-type": "application/x-www-form-urlencoded;charset=utf-8",
												Authorization: "Basic bWFnaWM6MTIzNA=="
											},
											data: {
												grant_type: "password",
												username: result.data.data.UserInfo.UserCode,
												password: result.data.data.UserInfo.Password,
												Scope: [JSON.stringify({
													Flag: 1,
													Code: "",
													OtherInfo: OrherInfo
												})],
											},
											success: ace => {
												this.$store.state.hasLogin = true;
												this.$store.state.userId = ace.data.UserId;
												this.$store.state.companyId = ace.data.CompanyId;
												this.$store.state.organizationCode = ace.data.OrganizationCode;
												this.$store.state.userType = ace.data.UserType;
												this.$store.state.access_token = ace.data.access_token;

												let _this = this;
												if (ace.statusCode === 200) {
													this.$mbservices.setStorageInfo(
														"JSUserInfo",
														ace.data,
														function(ace1) {}
													);
												}
											},
											fail: err => {}
										});
									} else {
										//不是同一个微信号
										uni.showModal({
											title: '与之前绑定账号不符，请联系管理员操作'
										})
										/* uni.reLaunch({
										    url: '/pages/login/login?data=' + res.data.data.Openid
										}) */
									}
								} else {
									uni.showToast({
										title: '获取用户信息异常,请联系管理员',
										duration: 5000
									})
								}
							},
							fail: function(error) {}
						});
						/* 结束自动登录 */
					},
					fail: (err) => {}
				});
			}
			// #endif
			// #ifdef MP-WEIXIN
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
					Vue.prototype.ScheduleEntity = res.data.data[0];
				}
			}, err => {
				console.log(err);
			})
			//#endif
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */

	/* @import './common/uni.css'; */


	@import "./common/icon.css";
	@import "./common/colorui.css";
	/* @import "./common/main.css"; */

	/* ColorUI */
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #F4F5F6;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}

	.uni-header-logo {
		padding: 30upx;
		text-align: center;
		margin-top: 10upx;
	}

	.uni-header-logo image {
		width: 140upx;
		height: 140upx;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300upx;
		background: #FFF;
		padding: 50upx;
		margin-top: 10px;
		font-size: 38upx;
		color: #808080;
	}
</style>
