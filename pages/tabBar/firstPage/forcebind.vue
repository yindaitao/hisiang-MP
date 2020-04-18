<template>
	<view>
		<view class="margin-top-xs text-center" style="margin-top: 100px;">
			<text class="text-orange text-ABC">长按识别图中的二维码</text>
		</view>
		<view class="margin-top-xs text-center" style="margin-top: 100px;">
			<image :src="imgUrl" class="padding-xl margin-xs" style="width: 200px;height: 200px;" @tap="longTapBind"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQFW7zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyTmo1Y1FDUXpld0QxNGxGSk50Y3cAAgS9Zi1dAwRYAgAA"
			}
		},
		methods: {
			longTapBind() {
				// 允许从相机和相册扫码
				// 预览图片
				wx.previewImage({
					current: this.imgUrl, // 当前显示图片的http链接 
					urls: [this.imgUrl]
				})
			},
			loadWifiInfo() {
				var Context = plus.android.importClass("android.content.Context");
				var WifiManager = plus.android.importClass("android.net.wifi.WifiManager")
				var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);
				var List = plus.android.importClass("java.util.List");
				var ArrayList = plus.android.importClass("java.util.ArrayList");
				var ScanResult = plus.android.importClass("android.net.wifi.ScanResult");
				var wifis = new ArrayList();
				wifis = wifiManager.getScanResults();
				return wifis;
			}
		},
		onLoad() {
			this.$mbservices.Request(this.$webapi.getQRCode, 'GET', {}, res => {
				//this.imgUrl = res.data
				console.log(res);
			}, err => {
				console.log(err);
			})
			

			uni.getSystemInfo({
				success: function(res) {
					console.log(res.model);
					console.log(res.pixelRatio);
					console.log(res.windowWidth);
					console.log(res.windowHeight);
					console.log(res.language);
					console.log(res.version);
					console.log(res.platform);
				}
			});

			wx.startWifi({
				success(res) {
					uni.showModal({
						title: 'WIFI结果',
						content: JSON.stringify(res)
					})
				},
				fail(err) {
					console.log(err);
				}
			})
			uni.openBluetoothAdapter({
				success(res) {
					uni.showModal({
						title: '蓝牙结果',
						content: JSON.stringify(res)
					})
				}
			})
		}
	}
</script>

<style>

</style>
