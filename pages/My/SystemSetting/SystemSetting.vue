<template>
	<view>
		<custom>系统设置</custom>
		<form>
			<view class="cu-list menu sm-border">
				<view class="cu-item" style="background-color: rgba(0,0,0,0);">
					<view class="content">上班打卡提醒</view>
					<view class="action">
						<text class="cu-tag round bg-orange light" v-if="switchD==='Open'" @tap="SD_Show">接收</text>
						<text class="cu-tag round bg-grey light" v-if="switchD==='Close'" @tap="SD_Show">不接收</text>
					</view>
				</view>
				<view class="cu-item" style="background-color: rgba(0,0,0,0);">
					<view class="content">下班打卡提醒</view>
					<view class="action">
						<text class="cu-tag round bg-orange light" v-if="switchX==='Open'" @tap="SX_Show">接收</text>
						<text class="cu-tag round bg-grey light" v-if="switchX==='Close'" @tap="SX_Show">不接收</text>
					</view>
				</view>
				<view class="cu-item" style="background-color: rgba(0,0,0,0);">
					<view class="content">审批提醒</view>
					<view class="action">
						<text class="cu-tag round bg-orange light" v-if="switchA==='Open'" @tap="SA_Show">接收</text>
						<text class="cu-tag round bg-grey light" v-if="switchA==='Close'" @tap="SA_Show">不接收</text>
					</view>
				</view>
				<view class="cu-item" style="background-color: rgba(0,0,0,0);">
					<view class="content">审批结果提醒</view>
					<view class="action">
						<text class="cu-tag round bg-orange light" v-if="switchR==='Open'" @tap="SR_Show">接收</text>
						<text class="cu-tag round bg-grey light" v-if="switchR==='Close'" @tap="SR_Show">不接收</text>
					</view>
				</view>
				<view class="cu-item" style="background-color: rgba(0,0,0,0);"></view>
				<!-- <view class="cu-item">
					<view class="content">
						<text class="icon-tagfill text-red  margin-right-xs"><span></span></text>
						<text class="text-grey"><span>标签</span></text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">音乐</view>
						<view class="cu-tag round bg-olive light">电影</view>
						<view class="cu-tag round bg-blue light">旅行</view>
					</view>
				</view> -->
			</view>
		</form>
		<MagicSelect ref="SD" :Title="SD_mgSelTitle" @ChangeSelect="SD_ChangeSelect" :DataList="OpenClose" :Width="scrollBarHeight/3"
		 :MaxHeight="scrollBarHeight/3" :ShowText="SD_ShowText" :RadioValue="SD_RadioValue" Background="rgba(0,0,0,0);"
		 :radio="switchD"></MagicSelect>
		<MagicSelect ref="SX" :Title="SD_mgSelTitle" @ChangeSelect="SX_ChangeSelect" :DataList="OpenClose" :Width="scrollBarHeight/3"
		 :MaxHeight="scrollBarHeight/3" :ShowText="SD_ShowText" :RadioValue="SD_RadioValue" Background="rgba(0,0,0,0);"
		 :radio="switchX"></MagicSelect>
		<MagicSelect ref="SA" :Title="SD_mgSelTitle" @ChangeSelect="SA_ChangeSelect" :DataList="OpenClose" :Width="scrollBarHeight/3"
		 :MaxHeight="scrollBarHeight/3" :ShowText="SD_ShowText" :RadioValue="SD_RadioValue" Background="rgba(0,0,0,0);"
		 :radio="switchA"></MagicSelect>
		<MagicSelect ref="SR" :Title="SD_mgSelTitle" @ChangeSelect="SR_ChangeSelect" :DataList="OpenClose" :Width="scrollBarHeight/3"
		 :MaxHeight="scrollBarHeight/3" :ShowText="SD_ShowText" :RadioValue="SD_RadioValue" Background="rgba(0,0,0,0);"
		 :radio="switchR"></MagicSelect>
	</view>
</template>

<script>
	import MagicSelect from "@/components/MagicBoxModalSelect/MagicBoxModalSelect.vue"
	export default {
		components: {
			MagicSelect
		},
		data() {
			return {
				OpenClose: [{
					Code: 'Open',
					Name: '接收'
				}, {
					Code: 'Close',
					Name: '不接收'
				}],
				switchD: 'Open',
				switchX: 'Open',
				switchA: 'Open',
				switchR: 'Open',
				SD_mgSelTitle: '请选择',
				scrollBarHeight: 0,
				SD_ShowText: 'Name',
				SD_RadioValue: 'Code',
				SystemSetting: {},
				SSRecords:[]
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar;
			//#endif
			this.GetSystemSettings()
		},
		methods: {
			SD_ChangeSelect(e) {
				if (this.$mbservices.isEmpty(e.detail.value)) {
					return false;
				}
				this.switchD = this.OpenClose.filter((item) => {
					return item.Code === e.detail.value
				})[0].Code;
				this.SaveSetting('D', e.detail.value)
			},
			SX_ChangeSelect(e) {
				if (this.$mbservices.isEmpty(e.detail.value)) {
					return false;
				}
				this.switchX = this.OpenClose.filter((item) => {
					return item.Code === e.detail.value
				})[0].Code;
				this.SaveSetting('X', e.detail.value)
			},
			SA_ChangeSelect(e) {
				if (this.$mbservices.isEmpty(e.detail.value)) {
					return false;
				}
				this.switchA = this.OpenClose.filter((item) => {
					return item.Code === e.detail.value
				})[0].Code;
				this.SaveSetting('A', e.detail.value)
			},
			SR_ChangeSelect(e) {
				if (this.$mbservices.isEmpty(e.detail.value)) {
					return false;
				}
				this.switchR = this.OpenClose.filter((item) => {
					return item.Code === e.detail.value
				})[0].Code;
				this.SaveSetting('R', e.detail.value)
			},
			SD_Show() {
				this.$refs.SD.show()
			},
			SX_Show() {
				this.$refs.SX.show()
			},
			SA_Show() {
				this.$refs.SA.show()
			},
			SR_Show() {
				this.$refs.SR.show()
			},
			SaveSetting(type, Status) {
				switch (type) {
					case 'D':
						/* 上班提醒 */
						this.SystemSetting.Code = "WorkOnAlert";
						break;
					case 'X':
						/* 下班提醒 */
						this.SystemSetting.Code = "WorkOffAlert";
						break;
					case 'A':
						/* 审批提醒 */
						this.SystemSetting.Code = "ApproverAlert";
						break;
					case 'R':
						/* 审批结果提醒 */
						this.SystemSetting.Code = "ApproveResultAlert";
						break;
					default:
						break;
				}
				this.SystemSetting.UserId = uni.getStorageSync("JSUserInfo").UserId;
				this.SystemSetting.Activated = 'Y';
				this.SystemSetting.Status = Status === 'Open' ? 'Yes' : 'No';
				this.SystemSetting.UIStatus = 'New';
				this.$mbservices.Request(
					this.$webapi.SaveSysSetting,
					"POST",
					this.SystemSetting,
					(res) => {
						this.GetSystemSettings()
					},
					(err) => {});
			},
			GetSystemSettings() {
				var ajaxJSON = {
					pageIndex: 1,
					rowsPerPage: "1000",
					type: "Initialize",
					Parameter: {
						LoadChildren: "NoLoad",
						Conditions: [{
							FieldName: "UserId",
							Operation: "EQUAL",
							ConditionValue: uni.getStorageSync("JSUserInfo").UserId,
							Relationship: "AND"
						}, {
							FieldName: "Activated",
							Operation: "EQUAL",
							ConditionValue: 'Y',
							Relationship: "AND"
						}]
					}
				};
				this.$mbservices.Request(this.$webapi.GetSysSettingRecords, "POST", ajaxJSON, res => {
					if (res.data.RecordCount > 0) {
						this.SSRecords = res.data.data;
						this.SSRecords.forEach((item,index)=>{
							if(item.Code==='WorkOnAlert'&&item.Status==='Yes'){this.switchD='Open'}
							if(item.Code==='WorkOnAlert'&&item.Status==='No'){this.switchD='Close'}
							
							if(item.Code==='WorkOffAlert'&&item.Status==='Yes'){this.switchX='Open'}
							if(item.Code==='WorkOffAlert'&&item.Status==='No'){this.switchX='Close'}
							
							if(item.Code==='ApproverAlert'&&item.Status==='Yes'){this.switchA='Open'}
							if(item.Code==='ApproverAlert'&&item.Status==='No'){this.switchA='Close'}
							
							if(item.Code==='ApproveResultAlert'&&item.Status==='Yes'){this.switchR='Open'}
							if(item.Code==='ApproveResultAlert'&&item.Status==='No'){this.switchR='Close'}
						})
					}

				}, err => {})
			}
		}
	}
</script>

<style>

</style>
