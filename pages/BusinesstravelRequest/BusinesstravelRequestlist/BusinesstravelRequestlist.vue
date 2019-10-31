<template>
	<view class="ul-uni-tab-bar">
		<custom>差旅报销申请列表</custom>
		<view id="_tabBar" ref="_tabBar" v-if="!isMultiSelect" class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="icon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" @input="searchInput" :adjust-position="false" type="text" placeholder="输入搜索关键词"
				 confirm-type="search" :value="searchValue" />
			</view>
			<view class="action">
				<button class="cu-btn icon" @click="doSearch">
					<text class="icon-search"></text>
				</button>
			</view>
			<view class="action">
				<button class="cu-btn icon" @click="addWorkOrder">
					<text class="icon-roundadd"></text>
				</button>
			</view>
		</view>
		<view v-if="isMultiSelect" class="cu-bar search bg-white">
			<view class="action">
				<button class="cu-btn bg-grey shadow-blur round" @click="allSelectOrNo">{{allSeleStatus?'全选':'全不选'}}</button>
			</view>
			<view class="action">
				<button class="cu-btn bg-grey shadow-blur round" @click="selectOther">反选</button>
			</view>
			<view class="action">
				<button class="cu-btn bg-grey shadow-blur round" @click="deleteSelect">删除</button>
			</view>
			<view class="action">
				<button class="cu-btn bg-grey shadow-blur round" @click="cancelSelModel">取消</button>
			</view>
		</view>
		<view class="ul-swiper-box" style="margin-top: 2upx;">
			<scroll-view scroll-y @scrolltolower="loadMore" style="width: 100%;margin-bottom: 10px;" :style="{'height':scrollBarHeight+'px'}">
				<!-- :style="{'height':scrollBarHeight+'px'}" -->
				<view class="cu-list menu">
					<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(list,index) in dataList" :key="index"
					 @touchstart="ListTouchStart(index,$event)" @touchmove="ListTouchMove(index,$event)" @touchend="ListTouchEnd(index,$event)" :data-target="'move-box-' + index"
					 @tap="goDetail(list)" style="position: relative;">
						<view class="cu-tag bg-blue" style="position:absolute;top: 10px;right: 10px;" v-if="list.Approve==='No'&&list.ApproveStatus!=='Rejected'">草稿</view>
						<view v-if="isMultiSelect" style="height: 100%;text-align:center;vertical-align: middle;margin-top: 30px;">
							<radio @click.stop="radioClick(list)" :checked="list.radchecked"></radio>
						</view>
						<view class="content padding-tb-sm">
							<view>
								<text class="icon-peoplefill text-blue margin-right-xs"></text>
								{{list.OrganizationName}}-{{list.Creator}}的{{list.CostTypeName}}报销
							</view>
							<view>
								<text class="icon-title text-orange"></text>
								单号:{{list.DocEntry}}
							</view>
							<view>
								<text class="icon-title text-orange"></text>
								金额:{{list.Amount}}
							</view>
							<view class="text-gray text-sm">
								<text class="icon-timefill margin-right-xs"></text>
								{{list.DocDate}}
							</view>
						</view>
						<view class="action" v-if="list.Approve!=='No'||list.ApproveStatus==='Rejected'">
							<view v-if="list.ApproveStatus==='Pending'" class="cu-tag round bg-olive light">{{list.AApproveStatus}}</view>
							<view v-if="list.ApproveStatus==='Approved'" class="cu-tag round bg-blue light">{{list.AApproveStatus}}</view>
							<view v-if="list.ApproveStatus==='Rejected'" class="cu-tag round bg-red light">{{list.AApproveStatus}}</view>
						</view>
						<view class="move" v-if="list.Approve==='No'||list.ApproveStatus==='Rejected'">
							<view class="bg-grey" @click.stop="editItem(list)">编辑</view>
							<view class="bg-red" @click.stop="deleteItem(list)">删除</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				isMultiSelect: false,
				allSeleStatus: true,
				pattern: {
					color: "#7A7E83",
					backgroundColor: "#fff",
					selectedColor: "#007AFF",
					buttonColor: "#007AFF"
				},
				content: [{
						iconPath: "/static/component.png",
						selectedIconPath: "/static/componentHL.png",
						text: "添加",
						active: false
					},
					{
						iconPath: "/static/api.png",
						selectedIconPath: "/static/apiHL.png",
						text: "API",
						active: false
					},
					{
						iconPath: "/static/template.png",
						selectedIconPath: "/static/templateHL.png",
						text: "模版",
						active: false
					}
				],
				//title: 'tag',
				type: "default",
				inverted: false,
				dataList: [],
				pageIndex: 0,
				scrollBarHeight: 0,
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				isFirstLoad: true,
				searchParams: [],
				searchValue: "",
				isLoadMore: false
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: "/pages/workorder/woform/woform"
			});
		},
		onShow() {
			/* if (!this.isFirstLoad) {
				this.pageIndex = parseInt(this.pageIndex) - 1;
				this.newShowGetReimList();
			} */
			if(this.$mbservices.getIsRefresh())
			{
				this.pageIndex = 0; // parseInt(this.pageIndex) - 1;
				this.$mbservices.setIsRefresh(false);
				this.newShowGetReimList();
			}
			this.isFirstLoad = false;
			this.isLoadMore = false;
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
			//this.dataList = [];
			/*加载数据*/
			this.getReimList();
		},
		onReachBottom() {
			this.searchParams = [];
			this.searchValue = "";
			this.pageIndex = 0;
			//this.dataList = [];
			this.newShowGetReimList();
			/* setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000) */
			uni.stopPullDownRefresh();
		},
		onPullDownRefresh() {
			this.searchParams = [];
			this.searchValue = "";
			this.pageIndex = 0;
			//this.dataList = [];
			this.newShowGetReimList();
		},
		methods: {
			goDetail(item) {
				if(item.Approve==='No'&&item.ApproveStatus!=='Rejected'){
					uni.navigateTo({
						url: "/pages/BusinesstravelRequest/BusinesstravelRequestform/BusinesstravelRequestform?flag=modify&data=" + JSON.stringify(item)
					});
				}else if(item.ApproveStatus==='Rejected'){
					uni.navigateTo({
						url: "/pages/BusinesstravelRequest/BusinesstravelRequestform/BusinesstravelRequestform?flag=modify&data=" + JSON.stringify(item)
					});
				}else if(item.ApproveStatus === "Approved" || item.ApproveStatus === "Pending"){
					uni.navigateTo({
						url: "/pages/BusinesstravelRequest/BusinesstravelRequestform/BusinesstravelRequestform?flag=Original&data=" + JSON.stringify(item)
					});
				}
			},
			editItem(item) {
				console.log(item);
				uni.navigateTo({
					url: "/pages/costReim/form/form?flag=modify&data=" + JSON.stringify(item)
				});
			},
			deleteItem(item) {
				this.modalName = null;
				var _this = this;
				uni.showModal({
					title: "操作提示",
					content: "确定删除选中项?",
					success(res) {
						if (res.confirm) {
							item.UIStatus = "Modify";
							_this.$mbservices.Request(
								_this.$webapi.deleteCostItem,
								"POST",
								item,
								function(succ) {
									if (succ.statusCode === 200) {
										var cache = [];
										_this.dataList.forEach(_item => {
											if (_item != item) {
												cache.push(_item);
											}
										});
										_this.dataList = [];
										cache.forEach(_item => {
											_this.dataList.push(_item);
										});
									}
								},
								function(err) {
									console.log(err);
								}
							);
						}
					}
				});
			},
			searchInput(e) {
				this.searchValue = e.detail.value;
			},
			doSearch(e) {
				//this.dataList = [];
				this.makeParams();
				this.pageIndex = 0;
				this.getReimList(this.searchParams);
			},
			loadMore() {
				if (this.searchValue != undefined && this.searchValue.length > 0) {
					this.makeParams();
				}
				this.isLoadMore = true;
				this.newShowGetReimList(this.searchParams);
			},
			makeParams() {
				if (this.$mbservices.isEmpty(this.searchValue)) {
					this.searchParams=[];
					return false;
				}
				this.searchParams = [{
						FieldName: "DocEntry",
						Operation: "CONTAIN",
						ConditionValue: this.searchValue,
						Relationship: "OR"
					},
					{
						FieldName: "DocNum",
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
			},
			newShowGetReimList: async function(params) {
				this.pageIndex = parseInt(this.pageIndex) + 1;
				var ajaxJSON = {
					pageIndex: this.pageIndex,
					rowsPerPage: "10",
					type: "Initialize",
					Parameter: {
						Sorts: [{
							FieldName: "DocEntry",
							type: "Descending"
						}],
						LoadChildren: "NoLoad",
						Conditions: [{
							FieldName: "CreatorId",
							Operation: "EQUAL",
							ConditionValue: parseInt(uni.getStorageSync("JSUserInfo").UserId),
							Relationship: "AND"
						},{
							FieldName: "Canceled",
							Operation: "EQUAL",
							ConditionValue: "N",
							Relationship: "AND"
						}]
					}
				};
				if (params != undefined && params.length > 0) {
					params.forEach(item => {
						ajaxJSON.Parameter.Conditions.push(item);
					});
				}
				var _this = this;
				this.$mbservices.Request(
					this.$webapi.getBusinesstravelReimList,
					"POST",
					ajaxJSON,
					function(ret) {
						if (!ret.data.data) {
							_this.dataList = [];
							uni.showToast({
								title: "查无数据"
							});
							return false;
						}
						console.log(ret.data.data);
						var _cacheList = [];
						ret.data.data.forEach(item => {
							item.radchecked = false;
							if (item.ApproveStatus === "Pending") {
								item.AApproveStatus = "待审核";
							}
							if (item.ApproveStatus === "Approved") {
								item.AApproveStatus = "已批准";
							}
							if (item.ApproveStatus === "Rejected") {
								item.AApproveStatus = "已拒绝";
							}
							item.Amount = parseFloat(item.Amount).toFixed(2);
							//_this.dataList.push(item);
							_cacheList.push(item);
						});
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

					},
					function(ret) {
						uni.showToast({
							title: ret.errMsg,
							icon: "none",
							success: function() {
								setTimeout(function() {
									uni.navigateBack();
								}, 1000);
							}
						});
					}
				);
			},
			getReimList(params) {
				uni.showLoading({
					title: "拼命加载中..."
				});
				this.pageIndex = parseInt(this.pageIndex) + 1;
				var ajaxJSON = {
					pageIndex: this.pageIndex,
					rowsPerPage: "10",
					type: "Initialize",
					Parameter: {
						Sorts: [{
							FieldName: "DocEntry",
							type: "Descending"
						}],
						LoadChildren: "NoLoad",
						Conditions: [{
							FieldName: "CreatorId",
							Operation: "EQUAL",
							ConditionValue: parseInt(uni.getStorageSync("JSUserInfo").UserId),
							Relationship: "AND"
						},{
							FieldName: "Canceled",
							Operation: "EQUAL",
							ConditionValue: "N",
							Relationship: "AND"
						}]
					}
				};
				if (params != undefined && params.length > 0) {
					params.forEach(item => {
						ajaxJSON.Parameter.Conditions.push(item);
					});
				}
				var _this = this;
				this.$mbservices.Request(
					this.$webapi.getBusinesstravelReimList,
					"POST",
					ajaxJSON,
					function(ret) {
						if (!ret.data.data) {
							_this.dataList = [];
							uni.showToast({
								title: "查无数据"
							});
							return false;
						}
						console.log('aaaaaaaaaaaaaaaaa');
						console.log(ret.data.data);
						setTimeout(() => {
							var _cacheList=[];
							ret.data.data.forEach(item => {
								item.radchecked = false;
								if (item.ApproveStatus === "Pending") {
									item.AApproveStatus = "待审核";
								}
								if (item.ApproveStatus === "Approved") {
									item.AApproveStatus = "已批准";
								}
								if (item.ApproveStatus === "Rejected") {
									item.AApproveStatus = "已拒绝";
								}
								item.Amount = parseFloat(item.Amount).toFixed(2);
								//_this.dataList.push(item);
								_cacheList.push(item);
							});
							_this.dataList=_cacheList;
							uni.hideLoading();
						}, 1000);
					},
					function(ret) {
						uni.showToast({
							title: ret.errMsg,
							icon: "none",
							success: function() {
								setTimeout(function() {
									uni.navigateBack();
								}, 1000);
							}
						});
					}
				);
			},
			allSelectOrNo(e) {
				this.allSeleStatus = !this.allSeleStatus;
				if (!this.allSeleStatus) {
					this.dataList.forEach(item => {
						item.radchecked = true;
					});
				} else {
					this.dataList.forEach(item => {
						item.radchecked = false;
					});
				}
			},
			selectOther(e) {
				this.dataList.forEach(item => {
					item.radchecked = !item.radchecked;
				});
			},
			deleteSelect(e) {},
			cancelSelModel(e) {
				this.isMultiSelect = false;
			},
			radioClick(item) {
				item.radchecked = !item.radchecked;
			},
			actionView(item) {
				this.isMultiSelect = true;
				return true;
				item.radchecked = true;
				uni.showActionSheet({
					itemList: ["编辑", "删除"],
					success: e => {}
				});
			},
			addWorkOrder() {
				uni.navigateTo({
					url: "/pages/BusinesstravelRequest/BusinesstravelRequestform/BusinesstravelRequestform"
				});
			},

			// ListTouch触摸开始
			ListTouchStart(indx, e) {
				if (this.dataList[indx].Approve === "Yes"&&(this.dataList[indx].ApproveStatus==='Pending'||this.dataList[indx].ApproveStatus==='Approved')) {
					return false;
				}
				this.listTouchStart = e.touches[0].pageX;
			},

			// ListTouch计算方向
			ListTouchMove(indx,e) {
				if (this.dataList[indx].Approve === "Yes"&&(this.dataList[indx].ApproveStatus==='Pending'||this.dataList[indx].ApproveStatus==='Approved')) {
					return false;
				}
				this.listTouchDirection =
					e.touches[0].pageX - this.listTouchStart > 0 ? "right" : "left";
			},

			// ListTouch计算滚动
			ListTouchEnd(indx,e) {
				if (this.dataList[indx].Approve === "Yes"&&(this.dataList[indx].ApproveStatus==='Pending'||this.dataList[indx].ApproveStatus==='Approved')) {
					return false;
				}
				if (this.listTouchDirection == "left") {
					this.modalName = e.currentTarget.dataset.target;
				} else {
					this.modalName = null;
				}
				this.listTouchDirection = null;
			}
		}
	};
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
