<template>
	<view class="page">
		<custom>预约会计</custom>

		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal">
						<text class="icon-roundclose text-black"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					<text class="text-black text-bold">确定提交申请?</text>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-grey" @tap="onlySave">存草稿</view>
					<view class="action margin-0 flex-sub text-black solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="saveAndDoSteps">确定提交</view>
				</view>
			</view>
		</view>
		<view class="content">
			<form @submit="setNaivgationBarTitle">
				<view class="cu-form-group" readonly>
					<view class="title">会议室</view>
					<text class="cu-tag round bg-gray light">{{itemData.MeetingroomName}}</text>
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group" readonly>
					<view class="title">会议室</view>
					<text class="cu-tag round bg-gray light">{{itemData.MeetingroomName}}</text>
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group" readonly>
					<view class="title">会议室</view>
					<text class="cu-tag round bg-gray light">{{itemData.MeetingroomName}}</text>
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group" readonly>
					<view class="title">会议室</view>
					<text class="cu-tag round bg-gray light">{{itemData.MeetingroomName}}</text>
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group" readonly>
					<view class="title">会议室</view>
					<text class="cu-tag round bg-gray light">{{itemData.MeetingroomName}}</text>
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group" readonly>
					<view class="title">会议室</view>
					<text class="cu-tag round bg-gray light">{{itemData.MeetingroomName}}</text>
					<text v-if="false" class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group" readonly>
					<view class="title">申请人</view>
					<text class="cu-tag round bg-gray light">{{itemData.MeetingroomName}}</text>
					<text class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">会议主题</view>
					<input placeholder="支出金额" name="input" type="digit" style="text-align: right;" :value="itemData.Subject">
					<text class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">会议提醒事项</view>
					<input placeholder="支出金额" name="input" type="digit" style="text-align: right;" :value="itemData.Subject">
					<text class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">会议方式</view>
					<picker @change="bindPickerChange1" :value="indexPayType" :range="PayType">
						<view class="picker">{{PayType[indexPayType]}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">预计开始时间</view>
					<input placeholder="支出金额" name="input" type="digit" style="text-align: right;" :value="itemData.Subject">
					<text class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">预计结束时间</view>
					<input placeholder="支出金额" name="input" type="digit" style="text-align: right;" :value="itemData.Subject">
					<text class="icon-roundclosefill text-orange"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">提前多少时间进行通知（分钟）</view>
					<input placeholder="支出金额" name="input" type="digit" style="text-align: right;" :value="itemData.Subject">
					<text class="icon-roundclosefill text-orange"></text>
				</view>

				<view class="cu-form-group">
					<view class="title">参会人数</view>
					<text class="cu-tag round bg-gray light">{{itemData.MeetingroomName}}</text>
					<text class="icon-roundclosefill text-orange"></text>
				</view>

				<MagicBoxCard title="标题文字" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="额外信息" note="Tips"
				 :btns="btns">

					<uni-tag class="nametag" text="标签" @click="bindClick">dkdkdkdkddkdkdkdk</uni-tag>

					<uni-tag class="nametag" text="标签" @click="bindClick">dkdkdkdkddkdkdkdk</uni-tag>

					<uni-tag class="nametag" text="标签" @click="bindClick">dkdkdkdkddkdkdkdk</uni-tag>

					<uni-tag class="nametag" text="标签" @click="bindClick">dkdkdkdkddkdkdkdk</uni-tag>

					<uni-tag class="nametag" text="标签" @click="bindClick">dkdkdkdkddkdkdkdk</uni-tag>

					<uni-tag class="nametag" text="标签" @click="bindClick">dkdkdkdkddkdkdkdk</uni-tag>

				</MagicBoxCard>
			</form>
		</view>
		<view class="tabbar-bottom">
			<view class="tabbar-bottom-item">
				<button type="default" plain="true">重填</button>
			</view>
			<view class="tabbar-bottom-item">
				<button type="primary" plain="true">提交</button>
			</view>
		</view>


		<!-- =============对话框====================== -->
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal">
						<text class="icon-roundclose text-black"></text>
					</view>
				</view>



				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in invCompanys" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.Name}}</view>
								<radio class="round" :class="radio==item.Code?'checked':''" :checked="radio==item.Code?true:false" :value="item.Code"></radio>
							</label>
						</view>
					</view>
				</radio-group>


				<view class="padding-xl bg-white">
					<text class="text-black text-bold">确定提交申请?</text>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-grey" @tap="onlySave">存草稿</view>
					<view class="action margin-0 flex-sub text-black solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="saveAndDoSteps">确定提交</view>
				</view>
			</view>
		</view>
		<!-- =============对话框====================== -->
	</view>
</template>
<script>
	// import MagicBoxCard from "../components/magicbox/my-card.vue";
	// import uniTag from "@/components/uni-tag/uni-tag.vue";
	export default {
		// components: { MagicBoxCard, uniTag },
		data() {
			return {
				btns: [{
						name: "+",
						clickevent: () => {
							console.log("add");

						}
					},
					{
						name: "-",
						clickevent: () => {
							console.log("del");
						}
					}
				],
				meetingroom: null,
				dilog: null
			};
		},
		methods: {
			add() {
				console.log("add");
			}
		},
		onLoad(e) {
			try {
				// console.log(e);
				// uni.showModal({
				//     title: "看传值",
				//     content: e.meetingroom
				// });
				this.meetingroom = JSON.parse(e.meetingroom);
				//获取
			} catch (e) {
				//TODO handle the exception
				uni.showToast({
					title: "获取DocEntry失败",
					icon: "none"
				});
			}
		}
	};
</script>
<style lang="scss">
	.content {
		padding-bottom: 100upx;
	}

	.nametag {
		margin: 3upx;
	}

	.tabbar-bottom {
		position: fixed;
		overflow: hidden;
		white-space: nowrap;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0;
		margin: 0 auto;
		color: #000;
		background: #fff;
		border-top: 3upx #dadada solid;
		bottom: 0upx;
		width: 100%;

		.tabbar-bottom-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			line-height: 1;
			text-align: center;
			text-overflow: ellipsis;
			overflow: hidden;
			user-select: none;
			opacity: 0.7;
			min-width: 64upx;
			height: 100%;
			background: transparent;
			transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		}
	}
</style>
