<template>
	<view>
		<custom>关于我们</custom>
		<web-view style="width:100px;height: 100px;" :src="AboutUs"></web-view>
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
			console.log(JSON.parse(e.data));
			that.AboutUs = JSON.parse(e.data);
		},
	}
</script>

<style>

</style>
