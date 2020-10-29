<template>
	<view>
		<view class="cu-modal" :class="modalName=='show'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-center">
						<view class="cu-item text-center">
							<view class="action"></view>
							<view class="action">
								<text class="text-black text-bold">{{Title}}</text>
							</view>
							<view class="action"></view>
						</view>
					</view>
					<view class="cu-list menu text-left margin-top" style="overflow: auto;" :style="{'height':Width+'px','max-height':MaxHeight+'px'}">
						<view class="cu-item" v-for="(item,index) in DataList" :key="index" :style="{'background-color':Background}">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item[ShowText]}}</view>
								<radio class="round" :class="radio==item[RadioValue]?'checked':''" :checked="radio==item[RadioValue]?true:false"
								 :value="item[RadioValue]"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			modalName1: {
				type: String,
				default () {
					return ''
				}
			},
			DataList: {
				type: Array,
				default () {
					return []
				}
			},
			Width: {
				type: Number,
				default () {
					return 300
				}
			},
			MaxHeight: {
				type: Number,
				default () {
					return 300
				}
			},
			Title: {
				type: String,
				default () {
					return '请选择'
				}
			},
			ShowText: {
				type: String,
				default () {
					return ''
				}
			},
			RadioValue: {
				type: String,
				default () {
					return ''
				}
			},
			Background: {
				type: String,
				default () {
					return ``
				}
			},
			radio: {
				type: String,
				default () {
					return ''
				}
			}
		},
		data() {
			return {
				modalName: '',
				radio1:''
			};
		},
		methods: {
			hideModal() {
				this.$nextTick(() => {
					this.modalName = null
				});
			},
			show() {
				this.modalName = 'show'
			},
			RadioChange(e) {
				//this.radio = e.detail.value
				this.$emit('ChangeSelect', e)
				this.modalName = null
			},

		}
	}
</script>

<style>

</style>
