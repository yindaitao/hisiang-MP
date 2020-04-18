<template>
	<view>
		<custom>发票信息</custom>
		<web-view :src="showUrl.url" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showUrl: {}
			}
		},
		methods: {

		},
		onLoad(e) {
			this.showUrl = JSON.parse(e.data);
			// #ifdef MP-WEIXIN
			wx.downloadFile({
				url: this.showUrl.url,
				success: function(res) {
					var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
					wx.openDocument({
						filePath: Path,
						success: function(res) {
							console.log('打开成功');
						}
					})
				},
				fail: function(res) {
					console.log(res);
				}
			})
			// #endif
		}
	}
</script>

<style>

</style>
