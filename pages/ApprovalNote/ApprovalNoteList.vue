<template>
	<view>
		<callback :baseEntry="from" :backFrom="backFrom">我的审批列表</callback>
		<view id="_tabBar" ref="_tabBar" class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="icon-search"></text>
				<input @input="searchInput" :adjust-position="false" type="text" placeholder="输入搜索关键词"
				 confirm-type="search" :value="searchValue" />
			</view>
			<view class="action">
				<button class="cu-btn icon" @click="doSearch">
					<text class="icon-search"></text>
				</button>
			</view>
			<view class="action">
				<button class="cu-btn icon bg-gray" @tap="doRefresh" data-target="DrawerModalR">
					<text class="icon-refresh"></text>
				</button>
			</view>
		</view>
		<scroll-view id="_tabBar" ref="_tabBar" scroll-x class="cu-bar bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabBars" :key="index" @tap="tapTab(index,$event)"
			 :data-current="index" :data-id="index" :id="'_tabBarItem'+item.id">
				<text>
					{{item.name}}
				</text>
			</view>
		</scroll-view>
		<swiper :current="TabCur" class="swiper-box" duration="300" @change="changeTab" :style="{'height':scrollBarHeight+'px'}">
			<swiper-item v-for="(tab,index1) in newsitems" :key="index1">
				<scroll-view scroll-y @scrolltolower="loadMore(index1)" :style="{'height':scrollBarHeight+'px'}">
					<view class="cu-list menu">
						<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(list,index) in tab.data" :key="index"
						 :data-target="'move-box-' + index" @tap="goDetail(list)">
							<view class="content padding-tb-sm">
								<view>
									<text class="icon-ellipse text-blue margin-right-xs"></text>
									审批编号:<text class="text-pink">{{list.DocEntry}}</text>&nbsp;&nbsp;&nbsp;<label style="margin-left: 15px;">单据编号:</label><text
									 class="text-brown">{{list.BusinessOrderNo}}</text>
								</view>
								<view>
									<text class="icon-peoplefill text-blue margin-right-xs"></text>
									申请人员:<text class="text-Abc" style="min-width: 80px;">{{list.OriginatorName}}</text>
								</view>
								<view>
									<text class="icon-activityfill text-blue margin-right-xs"></text>
									申请类型:
									<text v-if="list.BusinessType==='BorrowRequest'" class="bg-gradual-green radius text-center shadow-blur padding-lr margin-left-sm text-ABC"
									 style="min-width: 100px;">{{list.BBusinessType}}</text>
									<text v-else-if="list.BusinessType==='BusinesstravelRequest'" class="bg-gradual-orange radius text-center shadow-blur padding-lr margin-left-sm text-ABC"
									 style="min-width: 100px;">{{list.BBusinessType}}</text>
									<text v-else-if="list.BusinessType==='ReimbursementRequest'" class="bg-gradual-purple radius text-center shadow-blur padding-lr margin-left-sm text-ABC"
									 style="min-width: 100px;">{{list.BBusinessType}}</text>
									<text v-else-if="list.BusinessType==='RepaymentRequest'" class="bg-gradual-blue radius text-center shadow-blur padding-lr margin-left-sm text-ABC"
									 style="min-width: 100px;">{{list.BBusinessType}}</text>
									<text v-else-if="list.BusinessType==='AdvancePayRequest'" class="bg-gradual-red radius text-center shadow-blur padding-lr margin-left-sm text-ABC"
									 style="min-width: 100px;">{{list.BBusinessType}}</text>
									<text v-else class="bg-gradual-green radius text-center shadow-blur padding-lr margin-left-sm text-ABC" style="min-width: 100px;">{{list.BBusinessType}}</text>
								</view>
								<view class="text-gray text-sm">
									<text class="icon-timefill margin-right-xs"></text>
									创建时间:{{list.CreateDate}}
								</view>
							</view>
							<view class="action">
								<view v-if="list.ApproveStatus==='Pending'" class="cu-tag round bg-olive light">{{list.AApproveStatus}}</view>
								<view v-if="list.ApproveStatus==='Approved'" class="cu-tag round bg-blue light">{{list.AApproveStatus}}</view>
								<view v-if="list.ApproveStatus==='Rejected'" class="cu-tag round bg-red light">{{list.AApproveStatus}}</view>
							</view>
						</view>
					</view>
					<view class="uni-tab-bar-loading" v-if="tab.data.length !== 0">
						<uni-load-more :showIcon="tab.showIcon" :status="tab.status" :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<fabTag :content="pageNum"></fabTag>
	</view>
</template>

<script>
	import callback from "../components/callback/callback.vue";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import fabTag from "@/components/uni-fab-tag/uni-fab-tag.vue";
	export default {
		components: {
			uniLoadMore,
			fabTag,
			callback
		},
		data() {
			return {
				backFrom: "ApprovalNoteList",
				from: "",
				index: 0,
				picker: ["姓名", "审单号", "单据号"],
				CustomBar: this.CustomBar,
				loadMoreOption: {
					status: "loading",
					showIcon: true
				},
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				tabBars: [{
						id: 1,
						name: "待审核",
						approvalstatus: "Pending",
						num: 0
					},
					{
						id: 2,
						name: "已审批",
						approvalstatus: "Approved",
						num: 0
					},
					{
						id: 3,
						name: "已拒绝",
						approvalstatus: "Rejected",
						num: 0
					}
				],
				checkbox: [{
						value: 0,
						name: "报销",
						checked: false,
						hot: false
					},
					{
						value: 1,
						name: "差旅报销",
						checked: false,
						hot: false
					},
					{
						value: 2,
						name: "借款申请",
						checked: false,
						hot: false
					},
					{
						value: 3,
						name: "还款申请",
						checked: false,
						hot: false
					},
					{
						value: 4,
						name: "预支报销",
						checked: false,
						hot: false
					}
				],
				SearchConditions: [],
				TabCur: 0,
				tabIndex: 0,
				pageIndex: 1,
				pageNum: "0/0",
				showList: [],
				KeyValues: "",
				showList4Approved: [],
				showList4Pending: [],
				showList4Rejected: [],
				newsitems: [],
				scrollLeft: 0,
				modalName: null,
				modalNameSearch: null,
				scrollBarHeight: 0,
				isClickChange: false,
				refreshRowCOunt: 0,
				searchValue:""
			};
		},
		onShow(e) {
			if (this.$mbservices.getIsRefresh()) {
				this.newsitems[this.TabCur].pageIndex = 0;
				this.newsitems[this.TabCur].status = "more";
				this.newsitems[this.TabCur].loadingText = "more";
				this.newsitems[this.TabCur].pageRecordCount = "0";
				this.newsitems[this.TabCur].data = [];
				if (this.TabCur === 0) {
					this.getApprovalList({
						FieldName: "ApproveStatus",
						Operation: "EQUAL",
						ConditionValue: "P"
					});
				}
				this.$mbservices.setIsRefresh(false);
			}
		},
		methods: {
			searchInput(e) {
				this.searchValue = e.detail.value;
			},
			doSearch(){
				
			},
			resetConditions() {
				this.KeyValues = "";
				this.checkbox.forEach(item => {
					item.checked = false;
				});
				this.newsitems[this.TabCur].SearchConditions = [];
				//this.modalNameSearch = null;
			},
			inputValues(event) {
				this.KeyValues = event.detail.value;
			},
			doSearchApprovalList() {
				var cons = [];
				//验证关键字
				if (!this.$mbservices.isEmpty(this.KeyValues)) {
					if (this.index > 0) {
						if (!this.$mbservices.isInt(this.KeyValues)) {
							uni.showToast({
								title: "请输入数字类型",
								icon: "none"
							});
							return false;
						}
					}
					if (parseInt(this.index) === 0) {
						cons.push({
							FieldName: "OriginatorName",
							Operation: "EQUAL",
							ConditionValue: this.KeyValues,
							Relationship: "AND"
						});
					}
					if (parseInt(this.index) === 1) {
						cons.push({
							FieldName: "DocEntry",
							Operation: "EQUAL",
							ConditionValue: this.KeyValues,
							Relationship: "AND"
						});
					}
					if (parseInt(this.index) === 2) {
						cons.push({
							FieldName: "BusinessOrderNo",
							Operation: "EQUAL",
							ConditionValue: this.KeyValues,
							Relationship: "AND"
						});
					}
				}
				var CheckedArray = [];
				this.checkbox.forEach(item => {
					if (item.checked) {
						CheckedArray.push(item);
					}
				});
				//验证分类
				CheckedArray.forEach((item, index) => {
					if (index === 0 && CheckedArray.length !== 1) {
						if (item.value === 0) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "ReimbursementRequest",
								Relationship: "OR",
								BracketOpenNum: "1"
							});
						}
						if (item.value === 1) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "BusinesstravelRequest",
								Relationship: "OR",
								BracketOpenNum: "1"
							});
						}
						if (item.value === 2) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "BorrowRequest",
								Relationship: "OR",
								BracketOpenNum: "1"
							});
						}
						if (item.value === 3) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "RepaymentRequest",
								Relationship: "OR",
								BracketOpenNum: "1"
							});
						}
						if (item.value === 4) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "AdvancePayRequest",
								Relationship: "OR",
								BracketOpenNum: "1"
							});
						}
					} else if (index === 0 && CheckedArray.length === 1) {
						if (item.value === 0) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "ReimbursementRequest",
								Relationship: "AND"
							});
						}
						if (item.value === 1) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "BusinesstravelRequest",
								Relationship: "AND"
							});
						}
						if (item.value === 2) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "BorrowRequest",
								Relationship: "AND"
							});
						}
						if (item.value === 3) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "RepaymentRequest",
								Relationship: "AND"
							});
						}
						if (item.value === 4) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "AdvancePayRequest",
								Relationship: "AND"
							});
						}
					} else if (
						index === CheckedArray.length - 1 &&
						CheckedArray.length !== 1
					) {
						if (item.value === 0) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "ReimbursementRequest",
								Relationship: "AND",
								BracketCloseNum: "1"
							});
						}
						if (item.value === 1) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "BusinesstravelRequest",
								Relationship: "AND",
								BracketCloseNum: "1"
							});
						}
						if (item.value === 2) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "BorrowRequest",
								Relationship: "AND",
								BracketCloseNum: "1"
							});
						}
						if (item.value === 3) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "RepaymentRequest",
								Relationship: "AND",
								BracketCloseNum: "1"
							});
						}
						if (item.value === 4) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "AdvancePayRequest",
								Relationship: "AND",
								BracketCloseNum: "1"
							});
						}
					} else {
						if (item.value === 0) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "ReimbursementRequest",
								Relationship: "OR"
							});
						}
						if (item.value === 1) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "BusinesstravelRequest",
								Relationship: "OR"
							});
						}
						if (item.value === 2) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "BorrowRequest",
								Relationship: "OR"
							});
						}
						if (item.value === 3) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "RepaymentRequest",
								Relationship: "OR"
							});
						}
						if (item.value === 4) {
							cons.push({
								FieldName: "BusinessType",
								Operation: "EQUAL",
								ConditionValue: "AdvancePayRequest",
								Relationship: "OR"
							});
						}
					}
				});
				//Tab页
				if (this.TabCur === 0) {
					cons.push({
						FieldName: "ApproveStatus",
						Operation: "EQUAL",
						ConditionValue: "P"
					});
				}
				if (this.TabCur === 1) {
					cons.push({
						FieldName: "ApproveStatus",
						Operation: "EQUAL",
						ConditionValue: "A"
					});
				}
				if (this.TabCur === 2) {
					cons.push({
						FieldName: "ApproveStatus",
						Operation: "EQUAL",
						ConditionValue: "R"
					});
				}
				this.newsitems[this.TabCur].status = "loading";
				this.newsitems[this.TabCur].loadingText = "loading";
				this.newsitems[this.TabCur].pageIndex = 0;
				this.newsitems[this.TabCur].SearchConditions = cons;
				this.newsitems[this.TabCur].data = [];
				this.getApprovalList();
				this.modalNameSearch = null;
			},
			doRefresh() {
				this.newsitems[this.TabCur].data = [];
				this.newsitems[this.TabCur].SearchConditions = [];
				this.newsitems[this.TabCur].pageIndex = 0;
				this.newsitems[this.TabCur].status = "loading";
				this.newsitems[this.TabCur].loadingText === "loading";
				if (this.TabCur === 0) {
					this.getApprovalList({
						FieldName: "ApproveStatus",
						Operation: "EQUAL",
						ConditionValue: "P"
					});
				}
				if (this.TabCur === 1) {
					this.getApprovalList({
						FieldName: "ApproveStatus",
						Operation: "EQUAL",
						ConditionValue: "A"
					});
				}
				if (this.TabCur === 2) {
					this.getApprovalList({
						FieldName: "ApproveStatus",
						Operation: "EQUAL",
						ConditionValue: "R"
					});
				}
			},
			goDetail(item) {
				console.log(item.BBusinessType);
				//业务类型
				switch (item.BusinessType) {
					case "ReimbursementRequest": //报销申请
						uni.navigateTo({
							url: "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
								DocEntry: item.DocEntry,
								from: "ApprovalNoteList"
							})
						});
						break;
					case "BusinesstravelRequest": //差旅报销申请
						uni.navigateTo({
							url: "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
								DocEntry: item.DocEntry,
								from: "ApprovalNoteList"
							})
						});
						break;
					case "BorrowRequest": //借款申请
						uni.navigateTo({
							url: "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
								DocEntry: item.DocEntry,
								from: "ApprovalNoteList"
							})
						});
						break;
					case "RepaymentRequest": //还款申请
						uni.navigateTo({
							url: "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
								DocEntry: item.DocEntry,
								from: "ApprovalNoteList"
							})
						});
						break;
					case "AdvancePayRequest": //预支费用申请
						uni.navigateTo({
							url: "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
								DocEntry: item.DocEntry,
								from: "ApprovalNoteList"
							})
						});
						break;
					default:
						//其他类型的申请
						uni.navigateTo({
							url: "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
								DocEntry: item.DocEntry,
								from: "ApprovalNoteList"
							})
						});
						break;
				}
			},
			loadMore(e) {
				if (this.newsitems[this.TabCur].status === "nomore") {
					return false;
				}
				this.newsitems[e].loadingType = 0;
				this.newsitems[e].showIcon = true;
				this.newsitems[e].status = "loading";
				setTimeout(() => {
					if (this.TabCur === 0) {
						this.getApprovalList({
							FieldName: "ApproveStatus",
							Operation: "EQUAL",
							ConditionValue: "P"
						});
					}
					if (this.TabCur === 1) {
						this.getApprovalList({
							FieldName: "ApproveStatus",
							Operation: "EQUAL",
							ConditionValue: "A"
						});
					}
					if (this.TabCur === 2) {
						this.getApprovalList({
							FieldName: "ApproveStatus",
							Operation: "EQUAL",
							ConditionValue: "R"
						});
					}
				}, 1200);
			},
			async changeTab(e) {
				let index = e.detail.current;
				this.TabCur = index;
				this.scrollLeft = (this.TabCur - 1) * 60;
				this.pageNum =
					this.newsitems[this.TabCur].data.length +
					"/" +
					this.newsitems[this.TabCur].pageRecordCount;
				if (this.newsitems[this.TabCur].data.length > 0) {
					return false;
				}
				this.newsitems[this.TabCur].status = "loading";
				this.newsitems[this.TabCur].loadingText = "loading";
				if (this.newsitems[this.TabCur].SearchConditions.length > 0) {
					this.getApprovalList();
					return false;
				}
				if (this.TabCur === 0) {
					this.getApprovalList({
						FieldName: "ApproveStatus",
						Operation: "EQUAL",
						ConditionValue: "P"
					});
				}
				if (this.TabCur === 1) {
					this.getApprovalList({
						FieldName: "ApproveStatus",
						Operation: "EQUAL",
						ConditionValue: "A"
					});
				}
				if (this.TabCur === 2) {
					this.getApprovalList({
						FieldName: "ApproveStatus",
						Operation: "EQUAL",
						ConditionValue: "R"
					});
				}
				return false;
			},
			getElSize(id) {
				//得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery()
						.select("#" + id)
						.fields({
								size: true,
								scrollOffset: true
							},
							data => {
								res(data);
							}
						)
						.exec();
				});
			},
			async tapTab(index, e) {
				//点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					this.tabIndex = index;
					this.TabCur = e.currentTarget.dataset.id;
					this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
					//this.newsitems[this.TabCur].status = "loading";
					//this.newsitems[this.TabCur].loadingText = "loading";
					//this.pageNum = this.newsitems[this.TabCur].data.length + '/' + this.newsitems[this.TabCur].pageRecordCount;
				}
			},
			getApprovalList(params) {
				var cons = [{
					FieldName: "Canceled",
					Operation: "EQUAL",
					ConditionValue: "N",
					Relationship: "AND"
				}];
				if (!this.$mbservices.isEmpty(params)) {
					cons.push(params);
				}
				var ajaxJSON = {
					pageIndex: parseInt(this.newsitems[this.TabCur].pageIndex) + 1,
					rowsPerPage: "10",
					type: "Initialize",
					Parameter: {
						Sorts: [{
							FieldName: "DocEntry",
							type: "Descending"
						}],
						LoadChildren: "NoLoad",
						Conditions: this.newsitems[this.TabCur].SearchConditions.length > 0 ?
							this.newsitems[this.TabCur].SearchConditions : cons
					}
				};
				this.$mbservices.Request(
					this.$webapi.getApprovalNotesList,
					"POST",
					ajaxJSON,
					res => {
						if (res.data.RecordCount > 0) {
							if (
								this.newsitems[this.TabCur].data.length >=
								res.data.RecordCount
							) {
								this.newsitems[this.TabCur].loadingText = "nomore";
								this.newsitems[this.TabCur].status = "nomore";
								this.newsitems[this.TabCur].showIcon = false;
								return;
							}
							res.data.data.forEach(item => {
								//审批状态
								switch (item.ApproveStatus) {
									case "Pending":
										item.AApproveStatus = "待审核";
										break;
									case "Approved":
										item.AApproveStatus = "已批准";
										break;
									case "Rejected":
										item.AApproveStatus = "已拒绝";
										break;
								}
								//业务类型
								switch (item.BusinessType) {
									case "ReimbursementRequest":
										item.BBusinessType = "报销";
										break;
									case "BusinesstravelRequest":
										item.BBusinessType = "差旅报销";
										break;
									case "BorrowRequest":
										item.BBusinessType = "借款申请";
										break;
									case "RepaymentRequest":
										item.BBusinessType = "还款申请";
										break;
									case "AdvancePayRequest":
										item.BBusinessType = "预支报销申请";
										break;
									default:
										item.BBusinessType = item.BusinessTypeName;
										break;
								}
								item.Amount =
									parseFloat(item.Amount).toString() === "NaN" ?
									0.0 :
									item.Amount.toFixed(2);
								//this.showList.push(item);
								this.newsitems[this.TabCur].data.push(item);
							});
							this.tabBars[this.TabCur].num = this.newsitems[
								this.TabCur
							].data.length;
							this.newsitems[this.TabCur].pageIndex =
								parseInt(this.newsitems[this.TabCur].pageIndex) + 1;
							this.newsitems[this.TabCur].showIcon = false;
							if (
								this.newsitems[this.TabCur].data.length >=
								res.data.RecordCount
							) {
								this.newsitems[this.TabCur].loadingText = "nomore";
								this.newsitems[this.TabCur].status = "nomore";
							} else {
								this.newsitems[this.TabCur].status = "more";
							}
							this.pageNum =
								this.newsitems[this.TabCur].data.length +
								"/" +
								res.data.RecordCount;
							this.newsitems[this.TabCur].pageRecordCount =
								res.data.RecordCount + "";
						}
					},
					err => {}
				);
			},
			randomfn() {
				let ary = [];
				for (let i = 0, length = this.tabBars.length; i < length; i++) {
					let aryItem = {
						status: "more",
						showIcon: true,
						pageIndex: 0,
						pageRecordCount: "0",
						loadingType: 0,
						loadingText: "more",
						SearchConditions: [],
						data: []
					};
					ary.push(aryItem);
				}
				return ary;
			}
		},
		onLoad(e) {
			if (!this.$mbservices.isEmpty(e.data)) {
				if (!this.$mbservices.isEmpty(JSON.parse(e.data).from)) {
					this.from = JSON.parse(e.data).from;
				} else {
					this.from = null;
				}
			} else {
				this.from = null;
			}
			//#ifdef MP-WEIXIN
			const query = wx.createSelectorQuery();
			query.select("#_tabBar").boundingClientRect();
			query.selectViewport().scrollOffset();
			var _this = this;
			query.exec(function(res) {
				res[0].top; // #the-id节点的上边界坐标
				res[1].scrollTop; // 显示区域的竖直滚动位置
				_this.scrollBarHeight =
					uni.getSystemInfoSync().screenHeight -
					_this.CustomBar - res[0].height -
					res[0].height;
			});
			//#endif
			this.newsitems = this.randomfn();
			if (this.TabCur === 0) {
				this.getApprovalList({
					FieldName: "ApproveStatus",
					Operation: "EQUAL",
					ConditionValue: "P"
				});
			}
			if (this.TabCur === 1) {
				this.getApprovalList({
					FieldName: "ApproveStatus",
					Operation: "EQUAL",
					ConditionValue: "A"
				});
			}
			if (this.TabCur === 2) {
				this.getApprovalList({
					FieldName: "ApproveStatus",
					Operation: "EQUAL",
					ConditionValue: "R"
				});
			}
		}
	};
</script>

<style>
</style>
