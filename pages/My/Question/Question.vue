<template>
	<view>
		<custom>问题反馈</custom>
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">操作提示</view>
					<view class="action" @tap="hideModal">
						<text class="icon-roundclose text-black"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					<text class="text-black text-bold">确定提交反馈?</text>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-grey" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub text-black solid-left"></view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="saveEvent">确定提交</view>
				</view>
			</view>
		</view>
		<view class="ul-swiper-box">
			<form>
				<view class="cu-list menu padding">
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>项目名称</view>
							<view class="text-gray">
								<input placeholder="外出时长" name="input" type="digit">
							</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view> 问题类型</view>
							<view class="text-gray">
								<input placeholder="外出时长" name="input" type="digit">
							</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>紧急等级</view>
							<view class="text-gray">
								<input placeholder="外出时长" name="input" type="digit">
							</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>标题</view>
							<view class="text-gray">
								<input placeholder="外出时长" name="input" type="digit">
							</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>详细描述</view>
							<view class="text-gray">
								<textarea maxlength="-1" placeholder-class="placeholder" data-placeholder="在此输入外出事由"></textarea>
							</view>
						</view>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				itemData: {}
			}
		},
		methods: {
			hideModal() {
				tis.modalName = null
			},
			saveEvent() {}
		}
	}
</script>

<style>

</style>
