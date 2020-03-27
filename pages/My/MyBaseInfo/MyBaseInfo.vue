<template>
	<view>
		<custom>我的基本资料</custom>
		<scroll-view scroll-y="true" :style="{'height':scrollBarHeight+'px'}">
			<form>
				<view class="cu-list menu sm-border card-menu animation-slide-bottom margin-top" :style="[{animationDelay: (0 + 1)*0.1 + 's'}]">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action" @tap="ToogleBaseInfo">
							<text class="icon-unfold text-orange" v-if="IsBaseInfoShow"><span></span></text>
							<text class="icon-right text-orange" v-if="!IsBaseInfoShow"><span></span></text>基本信息
						</view>
						<view class="action">
							<button class="cu-btn round sm bg-green" data-target="menuModal" v-if="IsBaseInfoShow">保存</button>
						</view>
					</view>
					<view v-if="IsBaseInfoShow">
						<span>
							<view class="cu-form-group">
								<view class="title">工号</view>
								<input disabled name="input">10017</input>
							</view>
							<view class="cu-form-group">
								<view class="title">姓名</view>
								<input name="input" value="张三"></input>
							</view>
							<view class="cu-form-group">
								<view class="title">英文名</view>
								<input name="input" value="Vincent"></input>
							</view>
							<view class="cu-form-group">
								<view class="title">移动电话</view>
								<input name="input" value="18566661111"></input>
							</view>
							<view class="cu-form-group">
								<view class="title">工作邮箱</view>
								<input name="input" value="777555888@qq.com"></input>
							</view>
							<view class="cu-form-group">
								<view class="title">员工状态</view>
								<text class='cu-tag round bg-orange light'>在职</text>
							</view>
							<view class="cu-form-group">
								<view class="title">性别</view>
								<text class="cu-btn round sm bg-green" data-target="menuModal">男</text>
							</view>
							<view class="cu-form-group">
								<view class="title">所属公司</view>
								<text class="cu-btn round sm bg-green" data-target="menuModal">山东麦哲克数据科技有限公司</text>
							</view>
							<view class="cu-form-group">
								<view class="title">所属部门</view>
								<text class="cu-btn round sm bg-green text-cut" data-target="menuModal">运营部运营部运营部运营部运营部运</text>
							</view>
							<view class="cu-form-group">
								<view class="title">岗位</view>
								<text class="cu-btn round sm bg-green" data-target="menuModal">信息技术部</text>
							</view>
							<view class="cu-form-group">
								<view class="title">角色</view>
								<text class="cu-btn round sm bg-green" data-target="menuModal">职员</text>
							</view>
							<view class="cu-form-group">
								<view class="title">绑定账号</view>
								<text class="cu-btn round sm bg-green" data-target="menuModal">cfz[test]</text>
							</view>
							<view class="cu-form-group">
								<view class="title">办公地点</view>
								<text class="text-cut" data-target="menuModal">山东省济南市槐荫区经十东路西城西进时代中心B-1208</text>
							</view>
							<!-- <view class="cu-form-group">
								<view class="title">手机号码</view>
								<input placeholder="输入框带标签" name="input"></input>
								<view class="cu-capsule radius">
									<view class='cu-tag bg-blue '>
										+86
									</view>
									<view class="cu-tag line-blue">
										中国大陆
									</view>
								</view>
							</view> -->
						</span>
					</view>

				</view>
			</form>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollBarHeight: 0,
				IsBaseInfoShow: false
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar;
			//#endif
		},
		methods: {
			ToogleBaseInfo() {
				this.IsBaseInfoShow=!this.IsBaseInfoShow;
			}
		}
	}
</script>

<style>

</style>
