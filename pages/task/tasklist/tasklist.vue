<template>
	<view class="ul-uni-tab-bar">
		<custom>待办任务列表</custom>
		<!-- <scroll-view scroll-x class="bg-white nav fixed" :style="[{top:CustomBar + 'px'}]">
			
		</scroll-view> -->
		<view id="_tabBar" ref="_tabBar" class="cu-bar search bg-white">
			<!-- <view class="action" @click="showSinglePicker">
				<text>{{searchTypeArr[searchTypeIndex].label}}</text>
				<text class="icon-triangledownfill"></text>
			</view> -->
			<view class="search-form round">
				<text class="icon-search"></text>
				<input :adjust-position="false" type="text" placeholder="请输入关键字" confirm-type="search" style="float:left;" />
			</view>
			<view class="action">
				<!-- <button class="cu-btn bg-green shadow-blur round">搜索</button> -->
				<button class="cu-btn icon" @click="doSearch">
					<text class="icon-search"></text>
				</button>
			</view>
		</view>




		<view class="ul-swiper-box" style="margin-top: 2upx;">
			<scroll-view scroll-y @scrolltolower="loadMore()" style="width: 100%;margin-bottom: 10px;" :style="{'height':scrollBarHeight+'px'}">
				<view class="cu-list menu">
					<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(list,index) in dataList" :key="index"
					 :data-target="'move-box-' + index" @tap="goDetail(list)">
						<view class="content padding-tb-sm">
							<!-- <view>
								<text class="icon-title text-orange"></text>{{list.DocNum}}</view> -->
							<view>
								<text class="icon-peoplefill text-blue margin-right-xs"></text> {{list.OrganizationName}}{{list.Creator}}的{{list.BaseTypeName}}</view>
							<view>
								<text class="icon-title text-orange"></text>
								单据号:{{list.DocEntry}}
							</view>
							<view class="text-gray text-sm">
								<text class="icon-timefill margin-right-xs"></text> {{list.CreateDate}}</view>
						</view>
						<view class="action">
							<view class="cu-tag round bg-olive light">{{list.AApproveStatus}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<block>

		</block>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="searchTypeArr"></mpvue-picker>
	</view>
</template>
<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				isFirstLoad: true,
				TabCur: 0,
				searchTypeIndex: 0,
				searchTypeValue: "",
				searchTypeArr: [
					/* {
											label: '请假',
											value: 1
										}, */
					{
						label: '个人',
						value: "ReimbursementRequest"
					},
					{
						label: '分摊',
						value: "ExpendRequest"
					},
					/* {
						label: '付费',
						value: 4
					}, */
					{
						label: '借款',
						value: "BorrowRequest"
					}
				],
				themeColor: '#007AFF',
				scrollBarHeight: 0,
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pageIndex: 0,
				dataList: [],
				modalName: null,
				isLoadMore: false,
				searchParams: [],
				searchValue: ""

			}
		},
		methods: {
			goDetail(item) {
				item.flag = "tasklist"; 
				item.from = "tasklist";
				switch (item.BaseType) {
					case "ApprovalNote":
						uni.navigateTo({
							url: '/pages/task/taskdetail/taskdetail?data=' + JSON.stringify(
								item)
						});
						break;
					case "ReimbursementRequest":
						uni.navigateTo({
							url: '/pages/ReimbursementRequest/ReimRequestform/ReimRequestform?flag=tasklist&data=' + JSON.stringify(item)
						});
						break;
					case "BorrowRequest":
						uni.navigateTo({
							url: '/pages/BorrowRequest/BorrowRequestform/BorrowRequestform?flag=tasklist&data=' + JSON.stringify(item)
						});
						break;
					case "BusinesstravelRequest":
						uni.navigateTo({
							url: '/pages/BusinesstravelRequest/BusinesstravelRequestform/BusinesstravelRequestform?flag=tasklist&data=' + JSON.stringify(
								item)
						});
						break;
					case "RepaymentRequest":
						uni.navigateTo({
							url: '/pages/RepaymentRequest/RepaymentRequestform/RepaymentRequestform?flag=tasklist&data=' + JSON.stringify(
								item)
						});
						break;
					case "DepleteDetails":
						uni.navigateTo({
							url: '/pages/DepleteRequest/DepleteRequestform/DepleteRequestform?flag=tasklist&data=' + JSON.stringify(
								item)
						});
						break;
					default:
						break;
				}
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				this.searchTypeIndex = e.index[0];
				this.searchTypeValue = this.searchTypeArr[this.searchTypeIndex].value;
			},
			showSinglePicker() {
				this.mode = 'selector'
				console.log(this.$refs);
				this.$refs.mpvuePicker.show()
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			makeParams() {
				if (this.$mbservices.isEmpty(this.searchValue)) {
					this.searchParams = [];
					return false;
				}
				this.searchParams = [{
					FieldName: "BusinessType",
					Operation: "EQUAL",
					ConditionValue: this.searchTypeValue,
					Relationship: "AND"
				}];
				if (!this.$mbservices.isEmpty(this.searchValue)) {
					var arr = [{
							FieldName: "DocEntry",
							Operation: "CONTAIN",
							ConditionValue: this.searchValue,
							Relationship: "OR"
						},
						{
							FieldName: "Remarks",
							Operation: "CONTAIN",
							ConditionValue: this.searchValue,
							Relationship: "OR"
						},
						{
							FieldName: "Amount",
							Operation: "CONTAIN",
							ConditionValue: this.searchValue,
							Relationship: "OR"
						}
					];
					arr.forEach(item => {
						this.searchParams.push(item);
					})
				}
			},
			doSearch(e) {
				//this.dataList = [];
				this.makeParams();
				this.pageIndex = 0;
				this.getTaskList(this.searchParams);
			},
			loadMore() {
				if (this.searchValue != undefined && this.searchValue.length > 0) {
					this.makeParams();
				}
				this.isLoadMore = true;
				this.newShowGetTaskList(this.searchParams);
			},
			newShowGetTaskList: async function(params) {
				this.pageIndex = parseInt(this.pageIndex) + 1;
				var ajaxJSON = {
					"type": "Initialize",
					"rowsPerPage": 15,
					"pageIndex": 1,
					"Parameter": {
						"LoadChildren": "NoLoad",
						"Conditions": [],
						"Sorts": [{
							"FieldName": "CreateDate",
							"type": "Ascending"
						}]
					}
				}
				if (params != undefined && params.length > 0) {
					params.forEach((item) => {
						ajaxJSON.Parameter.Conditions.push(item);
					});
				}
				var _this = this;
				this.$mbservices.Request(this.$webapi.getTaskList, 'POST', ajaxJSON, function(ret) {
					if (!ret.data.data) {
						_this.dataList = [];
						uni.showToast({
							title: '查无数据'
						});
						return false;
					}
					var _cacheList = [];
					ret.data.data.forEach((item) => {
						item.radchecked = false;
						if (item.ApproveStatus === 'Pending') {
							item.AApproveStatus = "待审核";
						}
						if (item.ApproveStatus === 'Approved') {
							item.AApproveStatus = "已批准";
						}
						if (item.ApproveStatus === 'Rejected') {
							item.AApproveStatus = "已拒绝";
						}
						if (item.BusinessType === "ReimbursementRequest") {
							item.BBusinessType = "个人报销"
						}
						if (item.BusinessType === "ExpendRequest") {
							item.BBusinessType = "分摊报销"
						}
						if (item.BusinessType === "BorrowRequest") {
							item.BBusinessType = "借款申请"
						}

						item.Amount = parseFloat(item.Amount).toFixed(2);
						_cacheList.push(item);
					});
					//_this.dataList = _cacheList;
					if (_this.isLoadMore) {
						if (_cacheList.length <= 0) {
							_this.pageIndex = parseInt(_this.pageIndex) - 1;
						}
						_cacheList.forEach(item => {
							_this.dataList.push(item);
						})
					} else {
						_this.dataList = _cacheList;
					}
				}, function(ret) {
					uni.showToast({
						title: ret.errMsg,
						icon: 'none',
						success: function() {
							setTimeout(function() {
								uni.navigateBack();
							}, 1000);
						}
					});
				});
			},
			getTaskList(params) {
				uni.showLoading({
					title: '拼命加载中...'
				});
				this.pageIndex = parseInt(this.pageIndex) + 1;
				var ajaxJSON = {
					"type": "Initialize",
					"rowsPerPage": 15,
					"pageIndex": this.pageIndex,
					"Parameter": {
						"LoadChildren": "NoLoad",
						"Conditions": [],
						"Sorts": [{
							"FieldName": "CreateDate",
							"type": "Ascending"
						}]
					}
				}
				if (params != undefined && params.length > 0) {
					params.forEach((item) => {
						ajaxJSON.Parameter.Conditions.push(item);
					});
				}
				var _this = this;
				this.$mbservices.Request(this.$webapi.getTaskList, 'POST', ajaxJSON, function(ret) {
					if (!ret.data.data) {
						_this.dataList = [];
						uni.showToast({
							title: '查无数据'
						});
						return false;
					}
					console.log(ret.data.data)
					//_this.dataList = [];
					var _cacheList = [];
					ret.data.data.forEach((item) => {
						item.radchecked = false;
						if (item.ApproveStatus === 'Pending') {
							item.AApproveStatus = "待审核";
						}
						if (item.ApproveStatus === 'Approved') {
							item.AApproveStatus = "已批准";
						}
						if (item.ApproveStatus === 'Rejected') {
							item.AApproveStatus = "已拒绝";
						}
						if (item.BusinessType === "ReimbursementRequest") {
							item.BBusinessType = "个人报销"
						}
						if (item.BusinessType === "ExpendRequest") {
							item.BBusinessType = "分摊报销"
						}
						if (item.BusinessType === "BorrowRequest") {
							item.BBusinessType = "借款申请"
						}

						item.AllAmount = parseFloat(item.AllAmount).toFixed(2);
						//_this.dataList.push(item);
						_cacheList.push(item);
					});
					_this.dataList = _cacheList;
					setTimeout(() => {
						uni.hideLoading();
					}, 1000);
				}, function(ret) {
					uni.showToast({
						title: ret.errMsg,
						icon: 'none',
						success: function() {
							setTimeout(function() {
								uni.navigateBack();
							}, 1000);
						}
					});
				});
			}
		},
		onShow() {
			/* if (!this.isFirstLoad) {
				this.pageIndex = parseInt(this.pageIndex) - 1;
				this.newShowGetTaskList();
			} */
			if (this.$mbservices.getIsRefresh()) {
				this.pageIndex = 0; // parseInt(this.pageIndex) - 1;
				this.$mbservices.setIsRefresh(false);
				this.newShowGetTaskList();
			}

			this.isFirstLoad = false;

		},
		onLoad() {
			//#ifdef MP-WEIXIN
			const query = wx.createSelectorQuery();
			query.select("#_tabBar").boundingClientRect();
			query.selectViewport().scrollOffset();
			var _this = this;
			query.exec(function(res) {
				res[0].top; // #the-id节点的上边界坐标
				res[1].scrollTop; // 显示区域的竖直滚动位置
				_this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - _this.CustomBar - res[0].height;
			});
			//#endif

			this.getTaskList();
		}
	}
</script>

<style>
	.ul-uni-tab-bar {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}

	.ul-uni-tab-bar .ul-list {
		width: 750upx;
		height: 100%;
	}

	.ul-uni-swiper-tab {
		width: 100%;
		white-space: nowrap;
		line-height: 80upx;
		height: 80upx;
		border-bottom: 0.1px solid #eaffea;
		text-align: -webkit-center;
	}

	.ul-swiper-tab-list {
		font-size: 30upx;
		width: 150upx;
		display: inline-block;
		text-align: center;
		color: #555;
	}

	.ul-uni-tab-bar .ul-swiper-box {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		width: 100%;
		height: calc(100% - 100rpx);
	}
</style>
