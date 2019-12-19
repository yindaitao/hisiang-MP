<template>
	<view>
		<custom>确认</custom>
		<view class="cu-list menu sm-border">
			<view class="bg-white padding">
				<view class="cu-item" v-for="(text,index) in Content" :key="index">
					<text maxlength="-1" disabled="disabled">{{text}}</text>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom solid-top" v-if="AttendanceRecord.ApproveStatus==='Pending'">
			<view class="action">
				<text class="icon-title text-orange"></text> 备注操作
			</view>
		</view>
		<view class="bg-white" v-if="AttendanceRecord.ApproveStatus==='Pending'">
			<view class="cu-form-group">
				<textarea data-placeholder="在此输入备注" maxlength="-1" placeholder-class='placeholder' :class="textareaValue?'value':''"
				 @input="textareaAInput" :value="textareaValue"></textarea>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom solid-top" v-if="AttendanceRecord.ApproveStatus==='Pending'">
			<view class="action">
			</view>
			<view class="action">
				<button class='cu-btn bg-red shadow' @click="showModal" data-target="DialogModal1">拒绝</button>
				<button class='cu-btn bg-green shadow margin-left-sm' @click="showModal" data-target="DialogModal2">确认</button>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'||modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog" style="width: 480upx;">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					{{confirmContent}}
				</view>
				<view class="cu-bar bg-white">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="actionClick">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				Content: [],
				ParamOption: {},
				confirmContent: '',
				AttendanceRecord: {},
				textareaValue: ''
			}
		},
		onLoad(e) {
			let item = JSON.parse(e.data)
			this.ParamOption = item;
			this.Content = item.Remarks.toString().split(',');
			//获取数据
			this.GetAttendanceRecords();
		},
		methods: {
			GetAttendanceRecords() {
				let ajaxJson = {
					type: "Search",
					Parameter: {
						Conditions: [{
							FieldName: "DocEntry",
							Operation: "EQUAL",
							ConditionValue: this.ParamOption.DocEntry
						}]
					}
				};
				this.$mbservices.Request(this.$webapi.GetAttendanceRecords, 'POST', ajaxJson, res => {
					if (res.data.RecordCount > 0) {
						this.AttendanceRecord = res.data.data[0];
					}
				}, err => {

				})
			},
			textareaAInput(e) {
				this.textareaValue = e.detail.value;
			},
			showModal(e) {
				if (e.currentTarget.dataset.target === 'DialogModal1') {
					this.confirmContent = '确定拒绝确认吗?';
				}
				if (e.currentTarget.dataset.target === 'DialogModal2') {
					this.confirmContent = '确定确认吗?';
				}
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
				this.confirmContent = '';
			},
			actionClick() {
				console.log('进来了');
				if (this.modalName === 'DialogModal1') {
					this.AttendanceRecord.IsConfirm = 'No';
					this.AttendanceRecord.ApproveStatus = 'Rejected';
					this.AttendanceRecord.Remarks = this.$mbservices.isEmpty(this.AttendanceRecord.Remarks) ? '' + this.textareaValue :
						this.AttendanceRecord.Remarks + ';' + this.textareaValue;
				}
				if (this.modalName === 'DialogModal2') {
					this.AttendanceRecord.IsConfirm = 'Yes';
					this.AttendanceRecord.ApproveStatus = 'Approved';
					this.AttendanceRecord.Remarks = this.$mbservices.isEmpty(this.AttendanceRecord.Remarks) ? '' + this.textareaValue :
						this.AttendanceRecord.Remarks + ';' + this.textareaValue;
				}
				this.AttendanceRecord.UIStatus = 'Modify';
				this.modalName = null;
				uni.showLoading({
					title:'提交中,请稍后...'
				})
				this.$mbservices.Request(this.$webapi.AttendanceSave, 'POST', this.AttendanceRecord, res => {
					if (res.data.RecordCount > 0) {
						uni.showToast({
							title: '操作成功',
							icon: 'none'
						})
					}
					uni.hideLoading()
				}, err => {
					uni.showToast({
						title: '操作失败',
						icon: 'none'
					})
					uni.hideLoading()
				});
			}
		}
	}
</script>

<style>

</style>
