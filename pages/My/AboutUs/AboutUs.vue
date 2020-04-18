<template>
	<view>
		<custom>关于我们</custom>
		<web-view :src="AboutUs"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				AboutUs:"",
			}
		},
		onLoad(e) {
			var that = this;
			that.AboutUs = JSON.parse(e.data);
		},
	}
</script>

<style>

</style>
