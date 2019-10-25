<template>
	<view>
		<custom :isBack="false">打卡</custom>
		<view class="bg-white">
			<map id="_mapController" :latitude="latitude" @markertap="openMap()" @callouttap="openMap()" :longitude="longitude"
			 :markers="covers"></map>
		</view>
		<view class="flex solid-bottom padding justify-center" style="position: relative;">
			<button @tap="showModal" data-target="ConfirmModal" class="cu-btn lg bg-gradual-blue text-white text-center" style="min-width: 120px;min-height: 120px;width: 120px;height: 120px;border-radius: 50%;vertical-align:middle;">
				<text>考勤打卡</text><br />
			</button>
			<text class="text-white" style="position: absolute;margin-top: 75px;">12:30:31</text>
		</view>
		<view class="cu-timeline" style="background-color: rgba(0,0,0,0);">
			<view class="cu-time">第1次打卡</view>
			<view class="cu-item">
				<view class="content">
					<view class="cu-capsule radius" style="background-color: rgba(0,0,0,0);">
						<view class="cu-tag bg-cyan">上午</view>
						<view class="cu-tag line-cyan">10:00:35</view>
					</view>
					<view class="margin-top">
						<text class="icon-locationfill"></text>山东省济南市槐荫区金科城西城西进时代B座附近
					</view>
				</view>
			</view>
			<view class="cu-time">第2次打卡</view>
			<view class="cu-item">
				<view class="content">
					<view class="cu-capsule radius" style="background-color: rgba(0,0,0,0);">
						<view class="cu-tag bg-cyan">上午</view>
						<view class="cu-tag line-cyan">11:10:05</view>
					</view>
					<view class="margin-top">
						<text class="icon-locationfill"></text>山东省济南市槐荫区金科城西城西进时代B座附近
					</view>
				</view>
			</view>
			<view class="cu-time">第3次打卡</view>
			<view class="cu-item">
				<view class="content">
					<view class="cu-capsule radius" style="background-color: rgba(0,0,0,0);">
						<view class="cu-tag bg-cyan">上午</view>
						<view class="cu-tag line-cyan">10:00:35</view>
					</view>
					<view class="margin-top">
						<text class="icon-locationfill"></text>山东省济南市槐荫区金科城西城西进时代B座附近
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName==='ConfirmModal'?'show':''">
			<view class="cu-dialog" @tap.stop="" style="width: 280px;max-width: 280px;">
				<view class="cu-item padding-lr-xl">
					<view class="action text-bold text-xxl">确定打卡?</view>
					<text class="line-grey"></text>
					<view class="text-content">
						<view class="text-left"><text class="text-bold">打卡时间:</text>12:15:36</view>
						<view class="text-left"><text class="text-bold">打卡地点:</text><text class="text-sm">山东省济南市槐荫区金科城西城西进时代B座附近</text></view>
						<view class="text-left margin-top-xs">
							<textarea class="text-sm" placeholder="请填写备注"></textarea>
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
						<button class="cu-btn round bg-blue">确定</button>
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
			return {
				imgList: [],
				modalName: null,
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
			}
		},
		methods: {
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
						}
					}
				})
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
