<template>
	<view>
		<custom>待办任务详情</custom>

		<view class="bg-white padding">
			<view class="cu-form-group">
				<textarea data-placeholder="在此输入审批意见" maxlength="-1" :disabled="modalName!=null" placeholder-class='placeholder'
				 :class="textareaAValue?'value':''" @input="textareaAInput"></textarea>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom solid-top">
			<view class="action">
				<text class="icon-title text-orange"></text> 审批操作
			</view>
			<view class="action">
				<!-- <button class="cu-btn bg-green shadow" @tap="submitApprove">提交审批</button> -->
				<button class='cu-btn bg-red shadow' @click="actionClick('R',$event)">拒绝</button>
				<button class='cu-btn bg-green shadow margin-left-sm' @click="actionClick('A',$event)">通过</button>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="icon-title text-orange"></text> 流程步骤
			</view>
			<!-- <view class="action">
				<button class="cu-btn bg-green shadow" @tap="deleteItem">删除</button>
			</view> -->
		</view>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="(item.Code==='First'||(item.Code==='Finish'&&entitys[0].Closed==='Yes'&&entitys[0].DocStatus==='Close'))?'text-blue':stepColor[item.ApproveStatus]"
				 v-for="(item,index) in numList" :key="index">
					<!-- v-bind:class="item.Code==='First'||item.ApproveStatus===1?'text-blue':''" -->
					<text data-target="Modal" class="num" :class="item.ApproveStatus===2?'err':''" :data-index="index + 1" @tap="showStepInfo(item,$event)"></text>
					{{item.Name}}
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">
						<view>审核信息</view>
					</view>
					<view class="action" @tap="hideModal">
						<text class="icon-roundclose text-black"></text>
					</view>
				</view>
				<view>
					<view class="cu-form-group" readonly>
						<view class="title">时间</view>
						<text class="text-orange">{{showcontent.date}}</text>
					</view>
					<view class="cu-form-group" readonly>
						<view class="title">审核人</view>
						<text class="text-orange">{{showcontent.name}}</text>
					</view>
					<view class="cu-form-group" readonly>
						<view class="title">意见</view>
						<text class="text-orange">{{showcontent.content}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="icon-title text-orange"></text> 报销明细
			</view>
			<view class="action">
				总金额：<view class="cu-tag round bg-olive light" v-if="entitys.length>0">{{entitys[0].Amount}}</view>
			</view>
		</view>
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view style="position: relative;">
					<view class="content">{{entitys[0].CompanyName}}&nbsp;/&nbsp;{{entitys[0].OrganizationName}}&nbsp;/&nbsp;{{entitys[0].Creator}}</view>
					<view class="content">单据编号:{{entitys[0].DocEntry}}&nbsp;&nbsp;RMB:{{entitys[0].Amount}}</view>
					<view class="content">开票公司:{{entitys[0].InvCompanyName}}</view>
					<view class="content">支付方式:{{entitys[0].PayType}}&nbsp;&nbsp;账号(卡号):{{entitys[0].AccountNumber}}&nbsp;&nbsp;受理单位(银行):{{entitys[0].AcceptingUnit}}</view>
					<view class="content">
						<view class="text-gray text-sm">
							<h4>备注：{{entitys[0].Remarks}}</h4>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="entitys.length>0" class="cu-card dynamic padding-sm" :class="isCard?'no-card':''" v-for="(item,index1) in entitys[0].ReimbursementRequestLines"
		 :key="index1">
			<view class="cu-item shadow">
				<view style="position: relative;">
					<view class="cu-tag bg-gray" style="position:absolute;top: 10px;right: 10px;">费用报销明细({{NumArray[index1]}})&nbsp;&nbsp;RMB:{{item.Amount}}</view>
					<view class="content padding-tb-sm">
						<view>
							<text class="icon-list text-blue margin-right-xs"></text>{{item.ReimbursementTypeName}} 报销</view>
						<view class="text-gray text-sm">
							<text class="icon-timefill margin-right-xs"></text> {{item.DocDate}}</view>
						<view class="text-gray text-sm">
							<text class="icon-coin margin-right-xs"></text>备注：{{item.Remarks}}</view>
					</view>
				</view>

				<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="isCard?'':'only-img'" :style="{'background-image':'url('+_item+')'}" v-for="(_item,index) in item.pathArr"
					 :key="index">
					</view>
				</view>
				<!-- <view class="text-gray text-sm text-right padding">
					<view class="cu-capsule round">
						<view class='cu-tag bg-cyan '>
							明细{{index1+1}}总金额
						</view>
						<view class="cu-tag line-cyan">
							{{item.Amount}}
						</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: true,
				scroll: 0,
				NumArray: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九',
					'二十'
				],
				stepColor: ['', 'text-blue', 'text-red'],
				numList: [],
				num: 1,
				itemData: {},
				pageIndex: 0,
				entitys: [{
					Amount: '0.00',
					ReimbursementLines: []
				}],
				stageArr: [],
				textareaAValue: "",
				modalName: null,
				showcontent: {},
				radio: 'P',
				userinfo: {}
			};
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			showStepInfo(item, e) {
				if (item.stageUserList.length <= 0) {
					return false;
				}
				console.log(e);
				this.modalName = e.currentTarget.dataset.target;
				this.showcontent.date = this.$mbservices.formatDateTime(item.stageUserList[0].ApproveDatetime,
					'yyyy-MM-dd hh:mm:ss');
				this.showcontent.name = item.stageUserList[0].UserName;
				this.showcontent.content = item.stageUserList[0].ApproveComments;
				/* uni.showModal({
					title: item.stageUserList[0].UserName + "\n\r\t" + this.$mbservices.formatDateTime(item.stageUserList[0].ApproveDatetime,
						"yyyy-MM-dd hh:mm:ss") + "\n\r\t" + item.stageUserList[0].ApproveComments
				}) */
			},
			actionClick(type, e) {
				if (this.$mbservices.isEmpty(this.textareaAValue)) {
					uni.showToast({
						title: '审批意见不允许为空',
						icon: 'none'
					});
					return false;
				}
				var _content = type === 'A' ? '确定同意申请?' : "确定拒绝申请?";
				var _this = this;
				uni.showModal({
					title: '操作提示',
					content: _content,
					success: function(succ) {
						if (succ.confirm) {
							/* uni.showLoading({
								title: '正在提交请稍后...'
							}) */
							_this.itemData.UIStatus = "Modify";
							_this.itemData.ApproveStatus = type;
							_this.itemData.ApprovalComments = _this.textareaAValue;
							_this.itemData.Approver = parseInt(uni.getStorageSync('JSUserInfo').UserId);
							var _$this=_this;
							_this.$mbservices.Request(_this.$webapi.submitApproveNote, 'POST', _this.itemData, function(retsucc) {
								/* setTimeout(function() {
									uni.hideLoading();
								}, 300); */
								if (retsucc.data.RecordCount == undefined || retsucc.data.RecordCount <= 0) {
									uni.showToast({
										title: '' + retsucc.data
									})
									return false;
								}
								uni.showToast({
									title: '成功'
								});
								_$this.$mbservices.setIsRefresh(true);
								uni.navigateBack({
									animationDuration: 500
								});
							}, function(reterr) {
								uni.showToast({
									title: '失败:' + reterr.data
								})
							})
						}
					}
				})
			},
			submitApprove() {

				var _this = this;
				uni.showModal({
					title: '操作提示',
					content: '确定提交审批?',
					success: function(succ) {
						if (succ.confirm) {
							_this.entitys[0].ApproveStatus = _this.radio;
							_this.entitys[0].ApproveComments = _this.textareaAValue;
							_this.entitys[0].UIStatus = "Modify";

							var _$this = _this;
							_this.$mbservices.Request(_this.$webapi.submitCostForm, 'POST', _this.entitys[0], function(retsucc) {
								console.log(retsucc);
								if (retsucc.RecordCount > 0) {
									_$this.$mbservices.setIsRefresh(true);
								}
							}, function(reterr) {
								console.log(reterr);
							})
						}
					}
				})
			},
			radclick(type) {
				switch (type) {
					case 'P':
						this.radio = 'P';
						break;
					case 'A':
						this.radio = 'A';
						break;
					case 'R':
						this.radio = 'R';
						break;
					default:
						break;
				}
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			deleteItem() {
				var item = this.entitys[0];
				item.UIStatus = "Delete";
				item.ReimbursementLines.forEach((_item) => {
					_item.UIStatus = "Delete";
				});
				var _this = this;
				uni.showModal({
					title: '操作提示',
					content: '确定删除选中项?',
					success(res) {
						if (res.confirm) {
							_this.$mbservices.Request(_this.$webapi.submitCostForm, 'POST', item, function(succ) {
								console.log(succ);
								if (succ.statusCode === 200) {
									var cache = [];
								}
							}, function(err) {
								console.log(err);
							})
						}
					}
				})
			},
			getDetailUserInfo: async function(val) {
				console.log(val);
				if (this.$mbservices.isEmpty(val)) {
					return false;
				}
				var ajaxJSON = {
					pageIndex: 1,
					rowsPerPage: '10',
					type: "Initialize",
					Parameter: {
						LoadChildren: 'NoLoad',
						Conditions: [{
							FieldName: "DocEntry",
							Operation: "EQUAL",
							ConditionValue: parseInt(val),
							Relationship: "AND"
						}]
					}
				};
				this.$mbservices.Request(this.$webapi.getUserInfo, "POST", ajaxJSON, res => {
					console.log(res)
					if (res.data.RecordCount > 0) {
						this.userinfo = res.data.data[0];
					}
				}, er => {})
			},
			getStages: async function() {
                var ajaxJSON = {approveNoteEntry: this.itemData.BusinessOrderNo};
				var _this = this;
				_this.numList = [];
				this.$mbservices.Request(this.$webapi.getStages, 'POST', ajaxJSON, function(succ) {
					_this.numList = succ.data;
					console.log(_this.numList);
				}, function(err) {
					console.log('获取步骤错误');
				})
			},
			getDetailData: async function() {
				this.pageIndex = parseInt(this.pageIndex) + 1;
				var ajaxJSON = {
					pageIndex: this.pageIndex,
					rowsPerPage: '10',
					type: "Initialize",
					Parameter: {
						LoadChildren: 'Load',
						Conditions: [{
							FieldName: "DocEntry",
							Operation: "EQUAL",
							ConditionValue: this.itemData.BusinessOrderNo,
							Relationship: "AND"
						}]
					}
				};
				uni.showLoading({
					title: '拼命加载中...'
				});
				var _this = this;
				this.$mbservices.Request(this.$webapi.getReimList, 'POST', ajaxJSON, function(ret) {
					if (!ret.data.data) {
						uni.showToast({
							title: '查无数据'
						});
						return false;
					}
					_this.entitys = [];
					ret.data.data.forEach((item) => {
						//_this.getDetailUserInfo(item.Originator);
						console.log(item);
						if (item.ApproveStatus === 'Pending') {
							item.AApproveStatus = "待审核";
							_this.radio = "P";
						}
						if (item.ApproveStatus === 'Approved') {
							item.AApproveStatus = "已批准";
							_this.radio = "A";
						}
						if (item.ApproveStatus === 'Rejected') {
							item.AApproveStatus = "已拒绝";
							_this.radio = "R";
						}
						item.Amount = parseFloat(item.Amount).toFixed(2);
						item.ReimbursementRequestLines.forEach((_item) => {
							var _pathArr = (_item.Imgs === "" || _item.Imgs === undefined || _item.Imgs === null) ? [] : _item.Imgs.split(
								"|");
							_item.pathArr = new Array();
							_pathArr.forEach((_item_) => {
								_item.pathArr.push(_this.$webapi.webroot + '/' + _item_);
							});
							_item.Amount = parseFloat(_item.Amount).toFixed(2);
						});
						_this.entitys.push(item);
					});
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
				})
			}
		},
		onLoad(e) {
			try{
				this.itemData = JSON.parse(e.data);
			}catch(e){
				//TODO handle the exception
				if (this.$mbservices.isEmpty(e.data)) {
					this.itemData.BusinessOrderNo=parseInt("0");
				} else{
					this.itemData.BusinessOrderNo=parseInt(e.data);
				}
			}
			
			this.getDetailData();
			this.getStages();
		}
	}
</script>

<style>

</style>
