<template>
	<view>
		<camera v-if="IsCameraPanel" :device-position="DeviceChange?'front':'back'" :flash="flash?'on':'off'" @error="error"
		 style="width: 100%;" :style="{'height':scrollBarHeight+'px'}">
			<cover-view class="cu-bar tabbar foot bottom" style="height: 100px;box-shadow:0 -1rpx 6rpx rgba(0, 0, 0, 0)" v-if="IsCameraPanel">
				<cover-view class="action text-green"></cover-view>
				<cover-view class="action text-gray"></cover-view>
				<cover-view class="action text-gray text-center">
					<cover-image @tap="takePhoto" style="height: 60px;width: 60px;margin-bottom: 20px;" src="https://so.magicdata.co/Images/MP/takephoto.png"></cover-image>
				</cover-view>
				<cover-view class="action text-gray text-right">
					<cover-image @tap="FlashSwitch" style="height: 40px;width: 40px;margin-bottom: 20px;margin-left: 30px;" :src="srcPath"></cover-image>
				</cover-view>
				<cover-view class="action text-gray">
					<cover-image @tap="DeviceChange1" style="height: 40px;width: 40px;margin-bottom: 20px;" src="https://so.magicdata.co/Images/MP/changecamera.png"></cover-image>
				</cover-view>
			</cover-view>
		</camera>
		<image v-if="!IsCameraPanel" mode="widthFix" :src="src" style="width: 100%;" :style="{'height':scrollBarHeight+'px'}"></image>
		<view class="cu-bar tabbar foot bottom" style="height: 100px;box-shadow:0 -1rpx 6rpx rgba(0, 0, 0, 0);" v-if="!IsCameraPanel">
			<view class="action text-green">
				<image class="text-right" @tap="TakePhotosAgain" style="height: 40px;width: 40px;margin-bottom: 20px;" src="https://so.magicdata.co/Images/MP/TakeAgain.png"></image>
			</view>
			<view class="action text-gray"></view>
			<view class="action text-gray">
				<image @tap="ConfirmYes" style="height: 60px;width: 60px;margin-bottom: 20px;" src="https://so.magicdata.co/Images/MP/confirmYes.png"></image>
			</view>
			<view class="action text-gray"></view>
			<view class="action text-gray"></view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				scrollBarHeight: 0,
				src: "",
				IsCameraPanel: true,
				DeviceChange: true,
				flash: true,
				srcPath: "https://so.magicdata.co/Images/MP/flashopen.png"
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight;
			// #endif
		},
		onReady() {
			this.IsShowTabBar = true;
		},
		methods: {
			FlashSwitch() {
				this.flash = !this.flash
				if (this.flash) {
					this.srcPath = "https://so.magicdata.co/Images/MP/flashopen.png"
					uni.showToast({
						title: '闪光灯打开',
						icon: 'none'
					})
				} else {
					this.srcPath = "https://so.magicdata.co/Images/MP/flashclose.png"
					uni.showToast({
						title: '关闭闪光灯',
						icon: 'none'
					})
				}
			},
			ConfirmYes() {
				uni.$emit('GetPhotoImgPath', {
					data: this.src
				})
				uni.navigateBack()
			},
			TakePhotosAgain() {
				this.IsCameraPanel = true;
			},
			DeviceChange1(e) {
				this.DeviceChange = !this.DeviceChange
			},
			takePhoto() {
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.src = res.tempImagePath
						this.IsCameraPanel = false
					}
				});
			}
		}
	}
</script>

<style>

</style>
