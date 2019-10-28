<template>
	<view style="background-color: #fff;">
		<!-- style="word-spacing: inherit;" src="/static/componentBg.png"  round-dot   square-dot-->
		<!-- <swiper indicator-dots="true" class="flex-wrap response" style="min-height: 243px;">
			<swiper-item v-for="(img,key) in imgUrls" :key="key" class="flex-wrap response">
				<image :src="img" mode="widthFix" class="response" />
			</swiper-item>
		</swiper> -->

		<!-- <image src="http://oa.magicbox.net.cn/Images/bannera.png" mode="widthFix" class="response"></image> -->
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500" style="min-height: 255px;">
			<swiper-item v-for="(item,index) in imgUrls" :key="index">
				<image :src="item" class="response"></image>
			</swiper-item>
		</swiper>
		<!-- <image src="/static/componentBg.png" mode="widthFix" class="response" /> -->
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view :id="item.id" class="cu-item" v-for="(item,index) in iconList" :key="index" @click="itemClick">
				<view :class="['icon-' + item.icon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<official-account style="width: 300px;height: 84px;" bindload="">关注公众号</official-account>
	</view>
</template>

<script>
	import uniIcon from "../../../components/uni-icon/uni-icon";
	export default {
		comments: {
			uniIcon
		},
		data() {
			return {
				Code: '',
				iconList: [],
				gridCol: 3,
				gridBorder: false,
				title: "这是段描述性的文字",
				grids: [
					"../../../static/sp.png",
					"../../../static/c2.png",
					"../../../static/c3.png",
					"../../../static/c4.png",
					"../../../static/c5.png",
					"../../../static/c6.png",
					"../../../static/c7.png",
					"../../../static/c8.png",
					"../../../static/c9.png"
				],
				imgUrls: [
					this.$webapi.webroot + "/Images/MP/bannera.png",
					this.$webapi.webroot + "/Images/MP/bannerb.png"
				],
				grids1: [{
						id: 1,
						text: "请假",
						url: "../../../static/sp.png"
					},
					{
						id: 2,
						text: "",
						url: "../../../static/c2.png"
					},
					{
						id: 3,
						text: "",
						url: "../../../static/c3.png"
					},
					{
						id: 4,
						text: "",
						url: "../../../static/c4.png"
					},
					{
						id: 5,
						text: "",
						url: "../../../static/c5.png"
					}
				],
				ApprovalBage: "",
				BacklogBage: "",
			};
		},
		methods: {
			itemClick(e) {
				switch (e.currentTarget.id) {
					case "GeneralReim":
						uni.navigateTo({
							url: "/pages/ReimbursementRequest/ReimRequestlist/ReimRequestlist",
							title: "报销申请"
						});
						break;
					case "lendmoneyReim":
						uni.navigateTo({
							url: "/pages/BorrowRequest/BorrowRequestlist/BorrowRequestlist",
							title: "借款申请"
						});
						break;
					case "paymoneyReim":
						uni.navigateTo({
							url: "/pages/RepaymentRequest/RepaymentRequestlist/RepaymentRequestlist",
							title: "还款申请"
						});
						break;
					case "TravellReim":
						uni.navigateTo({
							url: "/pages/BusinesstravelRequest/BusinesstravelRequestlist/BusinesstravelRequestlist",
							title: "差旅报销申请"
						});
						break;
					case "xiaohaoReim":
						uni.navigateTo({
							url: "/pages/DepleteRequest/DepleteRequestlist/DepleteRequestlist",
							title: "消耗申请"
						});
						break;
					case "deplist":
						uni.navigateTo({
							url: "/pages/department/deplist/deplist",
							title: "部门管理"
						});
						break;
					case "login":
						uni.navigateTo({
							url: "/pages/login/login",
							title: "登录"
						});
						break;
					case "test":

						uni.navigateTo({
							url: "/pages/department/depform/multiModal",
							title: "全选测试"
						});
						break;
					case "tasklist":
						uni.navigateTo({
							url: "/pages/task/tasklist/tasklist"
						});
						break;
					case "approvallist": //审批列表
						uni.navigateTo({
							url: "/pages/ApprovalNote/ApprovalNoteList?data=" + JSON.stringify({
								from: "firstPage",
							})
						})
						break;
						// case "approvalNote":
						//     uni.navigateTo({
						//         url: "/pages/ApprovalNote/ApprovalNote?data=110"
						//     });
						//     break;
						// case "approvalNote1":
						//     uni.navigateTo({
						//         url: "/pages/ApprovalNote/ApprovalNoteBT?data=100"
						//     });
						//     break;
						// case "approvalNote2":
						//     uni.navigateTo({
						//         url: "/pages/ApprovalNote/ApprovalNoteBorrow?data=107"
						//     });
						//     break;
						// case "approvalNote3":
						//     uni.navigateTo({
						//         url:
						//             "/pages/ApprovalNote/ApprovalNoteRepayment?data=125"
						//     });
						//     break;
					case "histasklist": //已办任务
						uni.navigateTo({
							url: "/pages/histask/histasklist/histasklist"
						});
						break;
					case "meeting": //预约会议室
						uni.navigateTo({
							url: "/pages/meeting/meetingroomlist"
						});
						break;
				}
			},
			getApprovalNote() {
				var _this = this;
				var criteria = {
					type: "Search",
					Parameter: {
						Conditions: [{
								FieldName: "Canceled",
								Operation: "EQUAL",
								ConditionValue: "N",
								Relationship: "AND"
							},
							{
								FieldName: "Closed",
								Operation: "EQUAL",
								ConditionValue: "N",
								Relationship: "AND"
							},
							{
								FieldName: "DocStatus",
								Operation: "EQUAL",
								ConditionValue: "O",
								Relationship: "AND"
							},
							{
								FieldName: "ApproveStatus",
								Operation: "EQUAL",
								ConditionValue: "P"
							}
						],
					},
				};
				this.$mbservices.Request(this.$webapi.getApprovalNote, 'POST', criteria, res => {
					if (res.data.RecordCount > 0) {
						_this.ApprovalBage = res.data.data;
					}
					uni.hideLoading()
				}, err => {
					uni.hideLoading()
				});
			},
			getBacklog() {
				var _this = this;
				var ajax = {};
				this.$mbservices.Request(this.$webapi.getBacklog, 'POST', ajax, res => {
					if (res.data.RecordCount >= 0) {
						_this.BacklogBage = res.data.data.length;
					}
					uni.hideLoading()
				}, err => {
					uni.hideLoading()
				});
			},
			autoLogin() {
				/* 开始自动登录 */
				uni.request({
					url: this.$webapi.getLoginOpenId,
					method: "POST",
					header: {
						"content-type": "application/x-www-form-urlencoded;charset=utf-8",
						Authorization: "Basic bWFnaWM6MTIzNA=="
					},
					data: {
						Code: this.Code
					},
					success: result => {
						if (result.data.RecordCount > 0) {
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
										this.$store.state.userId = ace.data.UserId;
										this.$store.state.companyId = ace.data.CompanyId;
										this.$store.state.organizationCode = ace.data.OrganizationCode;
										this.$store.state.userType = ace.data.UserType;
										this.$store.state.access_token = ace.data.access_token;

										let _this = this;
										if (ace.statusCode === 200) {
											uni.reLaunch({
												url: '/pages/tabBar/firstPage/firstPage'
											})

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
			}
		},
		onBackPress: e => {},
		onLoad: function(e) {
			/* 菜单组合 */
			var _this = this;
			if (this.$store.state.access_token !== null) {
				this.getApprovalNote();
				this.getBacklog();
				uni.showLoading({
					title: '努力加载菜单中...'
				})
				uni.request({
					url: this.$webapi.getAccessToken,
					method: "POST",
					header: {
						Authorization: "bearer " +
							uni.getStorageSync("JSUserInfo").access_token
					},
					data: {},
					success: resultM => {
						setTimeout(function() {
							uni.hideLoading()
						}, 3000);
						if (!resultM || resultM.statusCode === 401) {
							uni.reLaunch({
								url: "/pages/login/login"
							});
							return;
						}
						_this.iconList = [];
						resultM.data.forEach(item => {
							item.children.forEach(_item => {
								_item.children.forEach(__item => {
									if (_item.isVisible === "Yes") {
										if (__item.Code === "approvallist") {
											_this.iconList.push({
												id: __item.Code,
												icon: __item.Icon,
												color: __item.Remarks,
												badge: _this.ApprovalBage,
												name: __item.Name
											});
										} else if (__item.Code === "tasklist") {
											_this.iconList.push({
												id: __item.Code,
												icon: __item.Icon,
												color: __item.Remarks,
												badge: _this.BacklogBage,
												name: __item.Name
											});
										} else {
											_this.iconList.push({
												id: __item.Code,
												icon: __item.Icon,
												color: __item.Remarks,
												badge: 0,
												name: __item.Name
											});
										}
									}
								});
							});
						});
						if (!this.$mbservices.isEmpty(e.data)) {
							if (JSON.parse(e.data).from === "ApprovalNoteList") {
								uni.navigateTo({
									url: '/pages/tabBar/firstPage/firstPage'
								})
							} else if (JSON.parse(e.data).from === "ApprovalHandle") {
								uni.navigateTo({
									url: '/pages/ApprovalNote/ApprovalNoteList'
								})
							}
						}
					},

					fail: resultM => {
						setTimeout(function() {
							uni.hideLoading()
						}, 3000);
					}
				});
				console.log()
			} else {
				// #ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success: (res) => {
						this.Code = res.code;
						this.autoLogin();
					},
					fail: (err) => {
						uni.showModal({
							title: '登录提示',
							content: "data: '" + JSON.stringify(err) + "'",
							showCancel: false
						});
					}
				});
				// #endif

			}
		}
	};
</script>

<style>
	page {
		background-color: #fff;
	}
</style>
