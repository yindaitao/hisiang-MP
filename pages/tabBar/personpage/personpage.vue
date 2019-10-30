<template>
	<view>
		<div class="vbox">
			<image class="top_back_img" :src="userbg" mode="aspectFit" style="margin-top: -10px;"></image>
			<view class="top">
				<view class="circle" v-if="userInfo.ProfilePhoto===null||userInfo.ProfilePhoto===''">
					<image v-if="userInfo.Sex==='Man'" class="head" :src="userman" mode="widthFix"></image>
					<image v-if="userInfo.Sex==='Woman'" class="head" :src="userfelame" mode="widthFix"></image>
				</view>
				<view class="circle" v-else>
					<image class="head" :src="userInfo.Avatar" mode="widthFix"></image>
				</view>
				<view class="top-texts">
					<text class="name" style="color: var(--black);">{{userInfo.UserName}}</text>
					<text class="depart" style="color: var(--black);">{{userInfo.CompanyName}}</text>
					<view>
						<!-- <text style="color: var(--black);">Tel1：</text> -->
						<text style="color: var(--black);">{{userInfo.OrganizationName}}</text>
					</view>
				</view>
			</view>
		</div>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="icon-title text-orange"></text> 我的列表
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @click="logout" data-target="menuModal">退出登录</button>
			</view>
		</view>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="icon-circlefill text-grey"></text>
					<text class="text-grey">编辑资料</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="icon-circlefill text-grey"></text>
					<text class="text-grey">修改密码</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="icon-circlefill text-grey"></text>
					<text class="text-grey">清除缓存</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="icon-circlefill text-grey"></text>
					<text class="text-grey">关于</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				userbg: this.$webapi.webroot + "/Images/MP/userbg.png",
				man: this.$webapi.webroot + "/Images/MP/man.png",
				felame: this.$webapi.webroot + "/Images/MP/felame.png"
			};
		},
		onLoad() {
			var _this = this;
			_this.userInfo = uni.getStorageSync("JSUserInfo");
			uni.getUserInfo({
				provider: "weixin",
				success: function(infoRes) {
					console.log(infoRes.userInfo.avatarUrl);
					_this.userInfo.ProfilePhoto = infoRes.userInfo.avatarUrl;
					console.log(_this.userInfo.ProfilePhoto);
				}
			});
		},
		methods: {
			test() {
				uni.navigateTo({
					url: "/pages/demo/testColorUI/testColorUI"
				});
			},
			logout() {
				console.log("yes");
				uni.showModal({
					title: "提示",
					content: "确认退出登陆？",
					success: function(res) {
						if (res.confirm) {
							uni.removeStorage({
								key: "JSUserInfo",
								success(res) {
									uni.redirectTo({
										url: "/pages/login/login"
									});
								}
							});
						} else if (res.cancel) {
							console.log("用户点击取消");
						}
					}
				});
			}
		}
	};
</script>

<style scoped>
	.index {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: white;
		border-top: 1px solid #cccccc;
	}

	.vbox {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top_back_img {
		z-index: 0;
		position: absolute;
		top: 0upx;
		width: 100%;
		height: 420upx;
	}

	.top {
		display: flex;
		width: 100%;
		height: 420upx;
		align-items: center;
	}

	.circle {
		margin-left: 100upx;
		width: 120upx;
		height: 120upx;
		border: 5upx solid #f0f0f0;
		border-radius: 150upx;
		overflow: hidden;
		z-index: 2;
	}

	.head {
		width: 120upx;
		height: 120upx;
		border-radius: 150upx;
		z-index: 2;
	}

	.top-texts {
		display: flex;
		flex-direction: column;
		margin-left: 15upx;
		color: white;
		z-index: 2;
	}

	.name {
		font-size: 36upx;
		font-weight: 500;
	}

	.set-top-hr {
		width: 210upx;
		height: 6upx;
	}

	.top-changeInfo {
		margin-top: 250upx;
		width: 120upx;
		height: 28upx;
		line-height: 28upx;
		background-color: #ffffff;
		border-radius: 15upx;
		padding: 10upx;
		color: #33dce8;
		z-index: 2;
	}

	.middle {
		display: flex;
		align-items: center;
		position: relative;
		top: -50upx;
		width: 80%;
		height: 100upx;
		background-color: white;
		border-radius: 15upx;
	}

	.middle-line {
		width: 2upx;
		height: 80upx;
		background-color: #eeeeee;
	}

	.middle-left {
		flex-grow: 1;
		color: #666666;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.middle-right {
		flex-grow: 1;
		color: #666666;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.middle-icon {
		width: 40upx;
		height: 40upx;
		margin-left: 20upx;
	}

	.middle-num {
		color: #fcac45;
		-webkit-font-smoothing: antialiased;
	}

	.cell {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
		height: 90upx;
		align-items: center;
		justify-content: space-between;
	}

	.cell:active {
		background-color: #333;
		color: white;
		box-shadow: 1upx 1upx 35upx #ccc;
	}

	.cell-left {
		display: flex;
		align-items: center;
		margin-left: 65upx;
	}

	.cell-text {
		margin-left: 25upx;
	}

	.cell-right {
		margin-right: 45upx;
		height: 28upx;
	}

	.cell_icon {
		width: 40upx;
		height: 40upx;
		height: 40upx;
	}

	.right-arrow {
		color: #aaa;
		width: 15upx;
		height: 28upx;
	}
</style>
