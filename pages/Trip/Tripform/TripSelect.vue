<template>
	<view>
		<custom>请选择出差同行人</custom>
		<view class="ul-swiper-box">
			<form>
				<view class="cu-form-group">
					<checkbox-group class="uni-list" @change="checkboxChange">
						<label class="label-3" v-for="(item,index) in TripCompanions" :key="index">
							<view class="uni-list-cell uni-list-cell-pd">
								<checkbox class="checkbox-3" :id="item.UserId" :value="item.UserName" :checked="item.checked"></checkbox>
								<label class="label-2-text" :for="item.UserName">
									<text>{{item.UserName}}</text>
								</label>
							</view>
						</label>
					</checkbox-group>
				</view>
			</form>
		</view>
		<view style="width: :100%;height: 50px;"></view>
		<view class="cu-bar bg-white solid-bottom" style="position: fixed;bottom:0upx;display: flex;justify-content: space-around;z-index: 2;z-index: 999;width: 100%;">
			<view class="action" style="width: 50%;">
				<button class="cu-btn round bg-blue shadow" data-target="DialogModal2" @tap="showModal">
					<text class="icon-upload"></text>提交
				</button>
			</view>
			<view class="action" style="width: 50%;">
				<button class="cu-btn round bg-blue shadow">
					出差记录
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import abc from "../../components/uni-datetimepicker.vue";
	export default {
		components: {
			abc
		},
		data() {
			return {
				time: Date.parse(new Date()),
				modalName: null,
				checkboxItems: [],
				hidden: false,
				TripCompanions: [],
			};
		},
		computed: {
			startDate() {
				return this.getDate("start");
			},
			endDate() {
				return this.getDate("end");
			}
		},
		methods: {
			//获取当前时间
			formatDate: function(value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			},
			getUserList: async function() {
				var ajaxJSON = {
					pageIndex: 1,
					rowsPerPage: "10000",
					type: "Initialize",
					Parameter: {
						LoadChildren: "NoLoad",
						Conditions: [{
							FieldName: "Activated",
							Operation: "EQUAL",
							ConditionValue: "Y",
							Relationship: "AND"
						}]
					}
				};
				this.$mbservices.Request(this.$webapi.getUserList, "POST", ajaxJSON, res => {
					if (res.data.RecordCount > 0) {
						this.TripCompanions = res.data.data;
					}

				}, err => {})
			},
			showModal(e) {
				if (this.$mbservices.isEmpty(this.itemData.StartPlace)) {
					uni.showModal({
						title: "提示",
						content: "请输入出发地点",
						showCancel: false,

					});
					return false;
				}
				if (this.$mbservices.isEmpty(this.itemData.ArrivePlace)) {
					uni.showModal({
						title: "提示",
						content: "请输入到达地点",
						showCancel: false,

					});
					return false;
				}
				if (this.$mbservices.isEmpty(this.itemData.TrafficType)) {
					uni.showModal({
						title: "提示",
						content: "请选择交通工具",
						showCancel: false,

					});
					return false;
				}
				if (this.$mbservices.isEmpty(this.itemData.TripHours)) {
					uni.showModal({
						title: "提示",
						content: "请输入出差时长",
						showCancel: false,

					});
					return false;
				}

				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},

			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === "start") {
					year = year - 60;
				} else if (type === "end") {
					year = year + 2;
				}
				month = month > 9 ? month : "0" + month;
				day = day > 9 ? day : "0" + day;

				return `${year}-${month}-${day}`;
			},
			checkboxChange: function(e) {
				var checked = e.target.value
			},
			radioChange: function(e) {
				var checked = e.target.value
			}

		},
		onLoad(e) {
			this.getUserList();
		},
	};
</script>

<style>
   .ul-swiper-box {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		width: 100%;
		height: calc(100% - 100rpx);
	}

	.uni-list-cell {
		justify-content: flex-start;
	}

	.uni-list .label-3 {
		padding: 0;
	}
	.label-2-text{
		margin-left: 20rpx;
	}
</style>
