s<template>
	<view>
		<custom>问题反馈</custom>
		<scroll-view scroll-y="true" :style="{'height':scrollBarHeight+'px'}">
			<form>
				<view class="cu-form-group no-border" style="background-color: rgba(0,0,0,0);">
					<view class="title text-grey">请选择紧急程度</view>
					<view class="text-right">
						<text class="text-sm text-red" @tap="showMgSelect(1)">数字大紧急程度高</text>
						<text class="cu-tag round text-blue light" @tap="showMgSelect(1)">{{Grade.Name}}</text>
					</view>
				</view>
				<view class="cu-form-group no-border" style="background-color: rgba(0,0,0,0);border-top: 0px rgba(0,0,0,0);">
					<view class="title text-grey">请选择问题类型</view>
					<view class="text-right">
						<text class="cu-tag round text-orange light" @tap="showMgSelect(2)">{{QuestionType.Name}}</text>
					</view>
				</view>
				<view class="padding-left padding-right margin-top">
					<input placeholder="在此输入标题" name="input" type=" text" style="border-bottom: 1px solid #eee;" :value="QTitle"
					 @input="titleInput">
				</view>
				<view class="title text-gray padding">请输入描述</view>
				<view class="text-center">
					<view class="cu-tag bg-grey" @tap="SetUndo">
						<text class="icon-repeal"></text>
					</view>
					<view class="cu-tag bg-grey" @tap="SetRedo">
						<text class="icon-forwardfill"></text>
					</view>
					<text class="cu-tag text-bold bg-grey" @tap="SetTextBold">B</text>
					<text class="cu-tag bg-grey" style="text-decoration: underline;" @tap="SetTextUnderLine">U</text>
					<text class="cu-tag bg-grey" style="text-decoration: line-through;" @tap="SetTextLineThrough">abc</text>
					<text class="cu-tag bg-grey" @tap="SetTextH1">H1</text>
					<text class="cu-tag bg-grey" @tap="SetTextH2">H2</text>
					<text class="cu-tag bg-grey" @tap="SetTextH3">H3</text>
					<text class="cu-tag bg-grey" @tap="SetTextH4">H4</text>
					<text class="cu-tag bg-grey" @tap="SetTextH5">H5</text>
					<text class="cu-tag bg-grey" @tap="SetTextH6">H6</text>
					<text class="cu-tag bg-grey" @tap="SetTextLeft">居左</text>
					<text class="cu-tag bg-grey" @tap="SetTextCenter">居中</text>
					<text class="cu-tag bg-grey" @tap="SetTextRight">居右</text>
					<text class="cu-tag bg-grey" @tap="SetTextJustify">两端</text>
					<text class="cu-tag bg-grey" @tap="SetLine">——</text>
					<view class="cu-tag bg-grey" @tap="SelectPics">
						<text class="icon-picfill"></text>
					</view>
				</view>
				<view class="padding-left padding-right">
					<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady" :style="{'height':(scrollBarHeight/1.5)+'px'}"></editor>
				</view>
				<view class="text-center margin-top padding">
					<button class="cu-btn bg-blue block lg round light" @tap="ConfirmSubmit" :disabled="!!isSave">提交问题</button>
				</view>
				<view style="height: 50px;"></view>
			</form>
		</scroll-view>
		<MagicSelect ref="PicFrom" :Title="mgSelTitle" @ChangeSelect="ChangeSelect" :DataList="DataList" :Width="scrollBarHeight/3"
		 :MaxHeight="scrollBarHeight/3" :ShowText="ShowText" :RadioValue="RadioValue" Background="rgba(0,0,0,0);"></MagicSelect>
		<MagicSelect ref="Grade" :Title="GmgSelTitle" @ChangeSelect="ChangeSelectG" :DataList="GradeDataList" :Width="scrollBarHeight/3"
		 :MaxHeight="scrollBarHeight/3" :ShowText="ShowText" :RadioValue="RadioValue" Background="rgba(0,0,0,0);"></MagicSelect>
		<MagicSelect ref="QuestionType" :Title="QTmgSelTitle" @ChangeSelect="ChangeSelectQT" :DataList="QuestionTypeDataList"
		 :Width="scrollBarHeight/3" :MaxHeight="scrollBarHeight/3" :ShowText="ShowText" :RadioValue="RadioValue" Background="rgba(0,0,0,0);"></MagicSelect>
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
				mgSelTitle: '请选择图片来源',
				GmgSelTitle: '请选择紧急程度',
				QTmgSelTitle: '请选择问题类型',
				DataList: [{
					Code: 'Album',
					Name: '相册'
				}, {
					Code: 'Takephoto',
					Name: '拍照'
				}],
				GradeDataList: [{
					Code: '1',
					Name: '1级'
				}, {
					Code: '2',
					Name: '2级'
				}, {
					Code: '3',
					Name: '3级'
				}, {
					Code: '4',
					Name: '4级'
				}, {
					Code: '5',
					Name: '5级'
				}, {
					Code: '6',
					Name: '6级'
				}, {
					Code: '7',
					Name: '7级'
				}, {
					Code: '8',
					Name: '8级'
				}, {
					Code: '9',
					Name: '9级'
				}, {
					Code: '10',
					Name: '10级'
				}],
				QuestionTypeDataList: [{
					Code: 'BUG修复',
					Name: 'BUG修复'
				}, {
					Code: '新增需求',
					Name: '新增需求'
				}, {
					Code: '数据维护',
					Name: '数据维护'
				}, {
					Code: '新增需求',
					Name: '新增需求'
				}, {
					Code: '特殊需求',
					Name: '特殊需求'
				}, {
					Code: '其他问题',
					Name: '其他问题'
				}],
				ShowText: 'Name',
				RadioValue: 'Code',
				Grade: {
					Code: '1',
					Name: '1级'
				},
				QuestionType: {
					Code: 'BUG修复',
					Name: 'BUG修复'
				},
				QTitle: '',
				scrollBarHeight: 0,
				modalName: null,
				itemData: {},
				placeholder: '请输入问题描述...',
				editorCtx: null,
				isSave: false
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar;
			//#endif
			uni.$on('GetPhotoImgPath', this.GetPhotoImgPath)
		},
		methods: {
			GetPhotoImgPath(e) {
				uni.uploadFile({
					url: this.$webapi.uploadFilePath, //仅为示例，非真实的接口地址
					header: {
						Authorization: "bearer " + uni.getStorageSync("JSUserInfo").access_token
					},
					filePath: e.data,
					name: 'file',
					formData: {
						'user': 'test'
					},
					success: (uploadFileRes) => {
						JSON.parse(uploadFileRes.data).forEach(item => {
							this.editorCtx.insertImage({
								src: this.$webapi.webroot + '/' + item.filePath
							})
						});
					}
				});

			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			hideModal() {
				tis.modalName = null
			},
			showMgSelect(type) {
				if (type === 1) {
					this.$refs.Grade.show()
				}
				if (type === 2) {
					this.$refs.QuestionType.show()
				}
			},
			titleInput(e) {
				this.QTitle = e.detail.value
			},
			ChangeSelectG(e) {
				if (this.$mbservices.isEmpty(e.detail.value)) {
					return false;
				}
				let item = this.GradeDataList.filter((item) => {
					return item.Code === e.detail.value
				})[0];
				this.Grade = item;
			},
			ChangeSelectQT(e) {
				if (this.$mbservices.isEmpty(e.detail.value)) {
					return false;
				}
				let item = this.QuestionTypeDataList.filter((item) => {
					return item.Code === e.detail.value
				})[0];
				this.QuestionType = item;
			},
			ChangeSelect(e) {
				if (this.$mbservices.isEmpty(e.detail.value)) {
					return false;
				}
				if (e.detail.value === 'Takephoto') {
					uni.navigateTo({
						url: '/pages/CommonTools/TakePhotos/TakePhotos'
					})
				}
				if (e.detail.value === 'Album') {
					uni.chooseImage({
						count: 6, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: (res) => {
							uni.showLoading({
								title: '请稍后...'
							})
							res.tempFilePaths.forEach((item) => {
								uni.uploadFile({
									url: this.$webapi.uploadFilePath, //仅为示例，非真实的接口地址
									header: {
										Authorization: "bearer " + uni.getStorageSync("JSUserInfo").access_token
									},
									filePath: item,
									name: 'file',
									formData: {
										'user': 'test'
									},
									success: (uploadFileRes) => {
										JSON.parse(uploadFileRes.data).forEach(item => {
											this.editorCtx.insertImage({
												src: this.$webapi.webroot + '/' + item.filePath
											})
										});
									}
								});
							})
							uni.hideLoading()
						}
					});
				}

			},
			ConfirmSubmit() {
				uni.showModal({
					title: '提示',
					content: '确定提交问题吗?',
					success: (res) => {
						if (res.confirm) {
							this.saveEvent()
						}
					}
				})
			},
			saveEvent() {
				uni.showLoading({
					title: '提交中...'
				})
				this.editorCtx.getContents({
					success: (res) => {
						var url = this.$webapi.webroot + '/';
						var reg = new RegExp(url, "g");
						var content = res.html.replace(reg, "");
						let Entity = {
							DocEntry:1,
							DocNum:1,
							CreatorId: uni.getStorageSync("JSUserInfo").UserId,
							CreateDate: new Date(),
							Canceled: 'No',
							Closed: 'No',
							DocStatus: 'Open',
							ProjectName: 'OA小程序提交',
							EmergencyRating: this.Grade.Code,
							QuestionType: this.QuestionType.Code,
							Caption: this.QTitle,
							Description: content,
							DiscovererId: uni.getStorageSync("JSUserInfo").UserName,
							DiscoverDatetime: new Date(),
							CompanyId: uni.getStorageSync("JSUserInfo").CompanyId,
							UIStatus: 'New'
						};
						this.$mbservices.Request(this.$webapi.SaveQuestions, 'POST', Entity, res => {
							uni.hideLoading()
							if (res.data.RecordCount > 0) {
								uni.showToast({
									title: '提交成功',
									icon: 'none'
								})
								this.isSave = true
							} else {
								uni.showToast({
									title: '提交失败',
									icon: 'none'
								})
							}
						}, err => {
							uni.hideLoading()
						});
					}
				})
			},
			SetUndo() {
				this.editorCtx.undo()
			},
			SetRedo() {
				this.editorCtx.redo()
			},
			SetTextBold() {
				this.editorCtx.format('bold', '')
			},
			SetTextUnderLine() {
				this.editorCtx.format('underline', '')
			},
			SetTextLineThrough() {
				this.editorCtx.format('strike', '')
			},
			SetTextH1() {
				this.editorCtx.format('header', 'H1')
			},
			SetTextH2() {
				this.editorCtx.format('header', 'H2')
			},
			SetTextH3() {
				this.editorCtx.format('header', 'H3')
			},
			SetTextH4() {
				this.editorCtx.format('header', 'H4')
			},
			SetTextH5() {
				this.editorCtx.format('header', 'H5')
			},
			SetTextH6() {
				this.editorCtx.format('header', 'H6')
			},
			SetTextLeft() {
				this.editorCtx.format('align', 'left')
			},
			SetTextCenter() {
				this.editorCtx.format('align', 'center')
			},
			SetTextRight() {
				this.editorCtx.format('align', 'right')
			},
			SetTextJustify() {
				this.editorCtx.format('align', 'justify')
			},
			SetLine() {
				this.editorCtx.insertDivider({})
			},
			SelectPics() {
				this.$refs.PicFrom.show()
			},
		}
	}
</script>

<style>
	#editor {
		width: 100%;
		height: 300px;
		background-color: #eee;
	}

	input::input-placeholder {
		color: #eee;
	}

	input::-webkit-input-placeholder {
		color: #eee;
	}

	input:-ms-input-placeholder {
		color: #eee;
	}

	input:-moz-placeholder {
		color: #eee;
	}

	input::-moz-placeholder {
		color: #eee;
	}

	input:focus::-webkit-input-placeholder {
		color: rgba(0, 0, 0, 0);
	}

	input:focus::-moz-input-placeholder {
		color: rgba(0, 0, 0, 0);
	}
</style>
