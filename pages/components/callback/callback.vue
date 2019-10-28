<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="[{height:CustomBar + 'px',paddingTop:StatusBar + 'px'}]" :class="bgColor">
				<view class='action' @click="back">
					<text class='icon-back'></text>
					<slot></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
			};
		},
		props: {
			bgColor: {
				type: String,
				default: "bg-gradual-blue"
			},
			baseEntry: {
				type: String
			},
			backFrom: {
				type: String
			}
		},
		methods: {
			back() {
				if (this.backFrom === "ApprovalNoteList") {
					if (this.$mbservices.isEmpty(this.baseEntry)) {
						uni.switchTab({
						    url: '/pages/tabBar/firstPage/firstPage?data=' + JSON.stringify({
								from:"ApprovalNoteList",
							})
						});
					}else{
						uni.navigateBack({
						    delta: 1
						});
					}
				} else if (this.backFrom === "ApprovalHandle") {
					if (this.$mbservices.isEmpty(this.baseEntry)) {
						uni.switchTab({
						    url: '/pages/tabBar/firstPage/firstPage?data=' + JSON.stringify({
								from:"ApprovalHandle",
							})
						});
					}
				} 
			}
		},
		onLoad(e) {
			if (e.hasOwnProperty("data")) {
			    this.baseEntrys = e.data;
				console.log(this.baseEntrys)
			}
		}
	};
</script>

<style>
</style>
