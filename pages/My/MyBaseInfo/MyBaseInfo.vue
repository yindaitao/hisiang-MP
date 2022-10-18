<template>
	<view>
		<custom>我的基本资料</custom>
		<scroll-view scroll-y="true" :style="{'height':scrollBarHeight+'px'}">
			<form>
				<view class="cu-list menu sm-border animation-slide-bottom" :style="[{animationDelay: (0 + 1)*0.1 + 's'}]">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action" @tap="ToogleBaseInfo('IsBaseInfoShow')">
							<text class="icon-unfold text-orange" v-if="IsBaseInfoShow"><span></span></text>
							<text class="icon-right text-orange" v-if="!IsBaseInfoShow"><span></span></text>基本信息
						</view>
						<view class="action">
							<button class="cu-btn round sm bg-green" data-target="menuModal" v-if="IsBaseInfoShow" @tap="BeforeSaveEvent">保存</button>
						</view>
					</view>
					<view v-if="IsBaseInfoShow">
						<view class="cu-form-group">
							<view class="title text-gray">工号</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.EmployeeId}}</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">姓名</view>
							<view>
								<input class="text-right padding-right-0" name="input" @input="onKeyInput(EmployeeInfo,'EmployeeName',$event)" :value="EmployeeInfo.EmployeeName"></input>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">英文名</view>
							<view>
								<input class="text-right padding-right-0" name="input" @input="onKeyInput(EmployeeInfo,'ForeignName',$event)" :value="EmployeeInfo.ForeignName"></input>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">移动电话</view>
							<view>
								<input class="text-right padding-right-0" name="input" @input="onKeyInput(EmployeeInfo,'Mobile1',$event)" :value="EmployeeInfo.Mobile1"></input>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">工作邮箱</view>
							<view>
								<input class="text-right padding-right-0" @input="onKeyInput(EmployeeInfo,'Email',$event)" name="input" :value="EmployeeInfo.Email"></input>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">员工状态</view>
							<view>
								<text class="text-right text-grey padding-right text-cut" v-if="EmployeeInfo.EmployeeStatus==='OnTheJobNoConfirmed'">未转正</text>
								<text class="text-right text-grey padding-right text-cut" v-if="EmployeeInfo.EmployeeStatus==='OnTheJobConfirmed'">在职</text>
								<text class="text-right text-grey padding-right text-cut" v-if="EmployeeInfo.EmployeeStatus==='LeaveJob'">离职</text>
								<text class="text-right text-grey padding-right text-cut" v-if="EmployeeInfo.EmployeeStatus==='Else'">其他</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">性别</view>
							<view>
								<text class="cu-tag round bg-blue light" v-if="EmployeeInfo.Sex==='Male'" @tap="Sex_SelShow">男</text>
								<text class="cu-tag round bg-red light" v-if="EmployeeInfo.Sex==='Female'" @tap="Sex_SelShow">女</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">所属公司</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.InvCompanyName}}</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">所属部门</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.OrganizationName}}</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">岗位</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.WriteJobTitle}}</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">角色</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.JobTitle}}</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">登录账号</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.EmployeeId}}[{{EmployeeInfo.Account}}]</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">办公地点</view>
							<view>
								<input disabled class="text-right padding-right-0" data-target="menuModal" :value="EmployeeInfo.OfficeLocation" />
							</view>
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
					</view>
				</view>
				<view class="cu-list menu sm-border animation-slide-bottom" :style="[{animationDelay: (0 + 1)*0.2 + 's'}]">
					<!-- 个人信息 -->
					<view class="cu-bar bg-white solid-bottom">
						<view class="action" @tap="ToogleBaseInfo('IsPersonInfoShow')">
							<text class="icon-unfold text-orange" v-if="IsPersonInfoShow"><span></span></text>
							<text class="icon-right text-orange" v-if="!IsPersonInfoShow"><span></span></text>个人信息
						</view>
						<view class="action">
							<button class="cu-btn round sm bg-green" data-target="menuModal" v-if="IsPersonInfoShow" @tap="BeforeSaveEvent">保存</button>
						</view>
					</view>
					<view v-if="IsPersonInfoShow">
						<view class="cu-form-group">
							<view class="title text-gray">出生日期</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.Birthday}}</text>
							</view>
						</view>
						<!-- <view class="cu-form-group">
							<view class="title text-gray">年龄</view>
							<view>
								<input class="text-right padding-right-0" name="input" :value="EmployeeInfo.Age"></input>
							</view>
						</view> -->
						<view class="cu-form-group">
							<view class="title text-gray">民族</view>
							<view>
								<input class="text-right padding-right-0" name="input" @input="onKeyInput(EmployeeInfo,'Nation',$event)" :value="EmployeeInfo.Nation"></input>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">婚姻状况</view>
							<view>
								<text class="cu-tag round bg-green light" v-if="EmployeeInfo.MaritalStatus==='WH'" @tap="HunYin_SelShow">未婚</text>
								<text class="cu-tag round bg-pink light" v-if="EmployeeInfo.MaritalStatus==='YH'" @tap="HunYin_SelShow">已婚</text>
								<text class="cu-tag round bg-brown light" v-if="EmployeeInfo.MaritalStatus==='LY'" @tap="HunYin_SelShow">离异</text>
								<text class="cu-tag round bg-gray light" v-if="EmployeeInfo.MaritalStatus==='SO'" @tap="HunYin_SelShow">丧偶</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">紧急联系人</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.EmergencyContact===null?"":EmployeeInfo.EmergencyContact}}</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">紧急联系人电话</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.EmergencyPhone===null?"":EmployeeInfo.EmergencyPhone}}</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">证件类型</view>
							<view>
								<input class="text-right padding-right-0" name="input" @input="onKeyInput(EmployeeInfo,'CardType',$event)" :value="EmployeeInfo.CardType"></input>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">证件号码</view>
							<view>
								<input class="text-right padding-right-0" name="input" @input="onKeyInput(EmployeeInfo,'IdentityId',$event)" :value="EmployeeInfo.IdentityId"></input>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">国籍</view>
							<view>
								<input class="text-right padding-right-0" name="input" @input="onKeyInput(EmployeeInfo,'Country',$event)" :value="EmployeeInfo.Country"></input>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">户口性质</view>
							<view>
								<text class="text-right text-grey padding-right text-cut" v-if="EmployeeInfo.RegistStatus==='BDCZ'">本地城镇</text>
								<text class="text-right text-grey padding-right text-cut" v-if="EmployeeInfo.RegistStatus==='BDNC'">本地农村</text>
								<text class="text-right text-grey padding-right text-cut" v-if="EmployeeInfo.RegistStatus==='WBCZ'">外埠城镇</text>
								<text class="text-right text-grey padding-right text-cut" v-if="EmployeeInfo.RegistStatus==='WBNY'">外埠农业</text>
								<text class="text-right text-grey padding-right text-cut" v-if="EmployeeInfo.RegistStatus==='BSZD'">本市征地</text>
								<text class="text-right text-grey padding-right text-cut" v-if="EmployeeInfo.RegistStatus==='GATRY'">港澳台人员</text>
								<text class="text-right text-grey padding-right text-cut" v-if="EmployeeInfo.RegistStatus==='WJRY'">外籍人员</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">户口所在地</view>
							<view>
								<input class="text-right padding-right-0" name="input" @input="onKeyInput(EmployeeInfo,'RegisterAddress',$event)" :value="EmployeeInfo.RegisterAddress"></input>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">生育状况</view>
							<view>
								<text class="cu-tag round bg-gradual-orange light" v-if="EmployeeInfo.ProCreativeStatus==='Yes'" @tap="ShengYu_SelShow">已育</text>
								<text class="cu-tag round bg-gradual-purple light" v-if="EmployeeInfo.ProCreativeStatus==='No'" @tap="ShengYu_SelShow">未育</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">住址</view>
							<view>
								<input class="text-right padding-right-0" name="input" @input="onKeyInput(EmployeeInfo,'Address',$event)" :value="EmployeeInfo.Address"></input>
							</view>
						</view>
					</view>
				</view>

				<view class="cu-list menu sm-border animation-slide-bottom" :style="[{animationDelay: (0 + 1)*0.3 + 's'}]">
					<!-- 岗位信息 -->
					<view class="cu-bar bg-white solid-bottom">
						<view class="action" @tap="ToogleBaseInfo('IsStationInfoShow')">
							<text class="icon-unfold text-orange" v-if="IsStationInfoShow"><span></span></text>
							<text class="icon-right text-orange" v-if="!IsStationInfoShow"><span></span></text>岗位信息
						</view>
						<view class="action" v-if="false">
							<button class="cu-btn round sm bg-green" data-target="menuModal" v-if="IsStationInfoShow" @tap="BeforeSaveEvent">保存</button>
						</view>
					</view>
					<view v-if="IsStationInfoShow">
						<view class="cu-form-group">
							<view class="title text-gray">入职日期</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.StartDate===null?"":EmployeeInfo.StartDate}}</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">试用周期</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.TrialPeriod===null?"":EmployeeInfo.TrialPeriod}}</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">转正日期</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.OfficalStartDate===null?"":EmployeeInfo.OfficalStartDate}}</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">固定电话</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.Phone===null?"":EmployeeInfo.Phone}}</text>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title text-gray">司龄</view>
							<view>
								<text class="text-right text-grey padding-right text-cut">{{EmployeeInfo.ComapnyAge===null?"":EmployeeInfo.ComapnyAge}}</text>
							</view>
						</view>
					</view>
				</view>

				<view class="cu-list menu sm-border animation-slide-bottom" :style="[{animationDelay: (0 + 1)*0.4 + 's'}]">
					<!-- 教育经历 -->
					<view class="cu-bar bg-white solid-bottom">
						<view class="action" @tap="ToogleBaseInfo('IsEducationInfoShow')">
							<text class="icon-unfold text-orange" v-if="IsEducationInfoShow"><span></span></text>
							<text class="icon-right text-orange" v-if="!IsEducationInfoShow"><span></span></text>教育经历
						</view>
						<view class="action">
							<button class="cu-btn round sm bg-green" data-target="menuModal" v-if="IsEducationInfoShow" @tap="BeforeSaveEvent">保存</button>
						</view>
					</view>
					<view v-if="IsEducationInfoShow">
						<view class="padding-left padding-right" v-for="(item,index) in EmployeeInfo.EmployeeEduLines" :key="index" v-if="item.UIStatus!=='Delete'">
							<view class="cu-form-group bg-pink" style="max-height: 30px;">
								<view class="title text-white">教育经历{{index+1}}</view>
								<view>
									<button class="cu-btn round icon line-white" @tap="DeleteEEL(index,item)">
										<text class="icon-roundclosefill text-white"></text>
									</button>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">专业</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'StudyWay',$event)" :value="item.StudyWay"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">毕业院校</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'College',$event)" :value="item.College"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">学历</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'Academic',$event)" :value="item.Academic"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">学历号码</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'AcademicId',$event)" :value="item.AcademicId"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">证书</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'Certificate',$event)" :value="item.Certificate"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">学历类型</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'AcademicType',$event)" :value="item.AcademicType"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">入学时间</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'StartDate',$event)" :value="item.StartDate"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">毕业时间</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'EndDate',$event)" :value="item.EndDate"></input>
								</view>
							</view>
						</view>
						<view class="text-center solid-bottom margin-top" style="width: 100%;">
							<button class="cu-btn round bg-blue shadow sm" style="margin: 0 auto;" @tap="AddEEL">
								<text class="icon-add"></text>增加&nbsp;&nbsp;教育经历
							</button>
						</view>
					</view>
				</view>

				<view class="cu-list menu sm-border animation-slide-bottom" :style="[{animationDelay: (0 + 1)*0.6 + 's'}]">
					<!-- 工作经历 -->
					<view class="cu-bar bg-white solid-bottom">
						<view class="action" @tap="ToogleBaseInfo('IsWorkInfoShow')">
							<text class="icon-unfold text-orange" v-if="IsWorkInfoShow"><span></span></text>
							<text class="icon-right text-orange" v-if="!IsWorkInfoShow"><span></span></text>工作经历
						</view>
						<view class="action">
							<button class="cu-btn round sm bg-green" data-target="menuModal" v-if="IsWorkInfoShow" @tap="BeforeSaveEvent">保存</button>
						</view>
					</view>
					<view v-if="IsWorkInfoShow">
						<view class="padding-left padding-right" v-for="(item,index) in EmployeeInfo.EmployeeWorkingLines" :key="index"
						 v-if="item.UIStatus!=='Delete'">
							<view class="cu-form-group bg-cyan" style="max-height: 30px;">
								<view class="title text-white">工作经历{{index+1}}</view>
								<view>
									<button class="cu-btn icon line-white round" @tap="DeleteEWL(index,item)">
										<text class="icon-roundclosefill text-xxl text-white"></text>
									</button>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">公司名称</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'CompanyName',$event)" :value="item.CompanyName"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">入职时间</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'StartDate',$event)" :value="item.StartDate"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">离职时间</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'EndDate',$event)" :value="item.EndDate"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">职位名称</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'JobTitle',$event)" :value="item.JobTitle"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title text-gray">离职原因</view>
								<view>
									<input class="text-right padding-right-0" name="input" @input="onKeyInput(item,'TermReason',$event)" :value="item.TermReason"></input>
								</view>
							</view>
						</view>
						<view class="text-center solid-bottom margin-top" style="width: 100%;">
							<button class="cu-btn round bg-blue shadow sm" style="margin: 0 auto;" @tap="AddEWL">
								<text class="icon-add"></text>增加&nbsp;&nbsp;工作经历
							</button>
						</view>
					</view>
				</view>
			</form>
			<view style="height: 50px;"></view>
		</scroll-view>
		<MagicSelect ref="Sex" :Title="Sex_mgSelTitle" @ChangeSelect="Sex_ChangeSelect" :DataList="Sex_DataList" :Width="scrollBarHeight/3"
		 :MaxHeight="scrollBarHeight/3" :ShowText="Sex_ShowText" :RadioValue="Sex_RadioValue" Background="rgba(0,0,0,0);"
		 :radio="EmployeeInfo.Sex"></MagicSelect>
		<MagicSelect ref="HunYin" :Title="HunYin_mgSelTitle" @ChangeSelect="HunYin_ChangeSelect" :DataList="HunYin_DataList"
		 :Width="scrollBarHeight/3" :MaxHeight="scrollBarHeight/3" :ShowText="HunYin_ShowText" :RadioValue="HunYin_RadioValue"
		 Background="rgba(0,0,0,0);" :radio="EmployeeInfo.MaritalStatus"></MagicSelect>
		<MagicSelect ref="ShengYu" :Title="ShengYu_mgSelTitle" @ChangeSelect="ShengYu_ChangeSelect" :DataList="ShengYu_DataList"
		 :Width="scrollBarHeight/3" :MaxHeight="scrollBarHeight/3" :ShowText="ShengYu_ShowText" :RadioValue="ShengYu_RadioValue"
		 Background="rgba(0,0,0,0);" :radio="EmployeeInfo.ProCreativeStatus"></MagicSelect>
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
				/* 性别 */
				Sex_mgSelTitle: '请选择性别',
				Sex_DataList: [{
					Code: 'Male',
					Name: '男'
				}, {
					Code: 'Female',
					Name: '女'
				}],
				Sex_ShowText: 'Name',
				Sex_RadioValue: 'Code',
				/* 婚姻 */
				HunYin_mgSelTitle: '请选择婚姻状况',
				HunYin_DataList: [{
					Code: 'WH',
					Name: '未婚'
				}, {
					Code: 'YH',
					Name: '已婚'
				}, {
					Code: 'LY',
					Name: '离异'
				}, {
					Code: 'SO',
					Name: '丧偶'
				}],
				HunYin_ShowText: 'Name',
				HunYin_RadioValue: 'Code',
				/* 生育 */
				ShengYu_mgSelTitle: '请选择生育状况',
				ShengYu_DataList: [{
					Code: 'Yes',
					Name: '已育'
				}, {
					Code: 'No',
					Name: '未育'
				}],
				ShengYu_ShowText: 'Name',
				ShengYu_RadioValue: 'Code',

				scrollBarHeight: 0,
				IsBaseInfoShow: false,
				IsPersonInfoShow: false,
				IsStationInfoShow: false,
				IsEducationInfoShow: false,
				IsWorkInfoShow: false,
				EELOption: {
					EmployeeId: '',
					LineNum: '',
					VisOrder: '',
					ObjType: '',
					Version: '',
					Remarks: '',
					StudyWay: '',
					College: '',
					Academic: '',
					AcademicId: '',
					Certificate: '',
					CertificateAttachment: '',
					AcademicType: '',
					StartDate: '',
					EndDate: '',
					UIStatus: 'New'
				},
				EWLOption: {
					EmployeeId: '',
					LineNum: '',
					VisOrder: '',
					ObjType: '',
					Version: '',
					Remarks: '',
					CompanyName: '',
					StartDate: '',
					EndDate: '',
					JobTitle: '',
					UIStatus: 'New'
				},
				EmployeeInfo: {
					EmployeeEduLines: [],
					EmployeeWorkingLines: []
				}
				//IsBaseInfoShow: false
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			this.scrollBarHeight = uni.getSystemInfoSync().screenHeight - this.CustomBar;
			//#endif
			this.GetEmployeeEntity();
		},
		methods: {
			onKeyInput(obj,option,e){
				obj[option]=e.target.value;
			},
			
			Sex_SelShow() {
				this.$refs.Sex.show()
			},
			Sex_ChangeSelect(e) {
				if (this.$mbservices.isEmpty(e.detail.value)) {
					return false;
				}
				this.EmployeeInfo.Sex = this.Sex_DataList.filter((item) => {
					return item.Code === e.detail.value
				})[0].Code;
			},

			HunYin_SelShow() {
				this.$refs.HunYin.show()
			},

			HunYin_ChangeSelect(e) {
				if (this.$mbservices.isEmpty(e.detail.value)) {
					return false;
				}
				this.EmployeeInfo.MaritalStatus = this.HunYin_DataList.filter((item) => {
					return item.Code === e.detail.value
				})[0].Code;
			},

			ShengYu_SelShow() {
				this.$refs.ShengYu.show()
			},

			ShengYu_ChangeSelect(e) {
				if (this.$mbservices.isEmpty(e.detail.value)) {
					return false;
				}
				this.EmployeeInfo.ProCreativeStatus = this.ShengYu_DataList.filter((item) => {
					return item.Code === e.detail.value
				})[0].Code;
			},

			AddEWL() {
				this.EWLOption = {
					EmployeeId: '',
					LineNum: '',
					VisOrder: '',
					ObjType: '',
					Version: '',
					Remarks: '',
					CompanyName: '',
					StartDate: '',
					EndDate: '',
					JobTitle: '',
					UIStatus: 'New'
				}
				this.EWLOption.EmployeeId = this.EmployeeInfo.EmployeeId;
				if (this.EmployeeInfo.EmployeeWorkingLines.length > 0) {
					var arr = [];
					this.EmployeeInfo.EmployeeWorkingLines.forEach((item) => {
						arr.push(item);
					});
					arr.sort(function(a, b) {
						return b.LineNum = a.LineNum
					})
					this.EWLOption.LineNum = parseInt(arr[0].LineNum) + 1;
				} else {
					this.EWLOption.LineNum = 1;
				}
				this.EmployeeInfo.EmployeeWorkingLines.push(this.EWLOption)
			},

			AddEEL() {
				this.EELOption = {
					EmployeeId: '',
					LineNum: '',
					VisOrder: '',
					ObjType: '',
					Version: '',
					Remarks: '',
					StudyWay: '',
					College: '',
					Academic: '',
					AcademicId: '',
					Certificate: '',
					CertificateAttachment: '',
					AcademicType: '',
					StartDate: '',
					EndDate: '',
					UIStatus: 'New'
				}
				this.EELOption.EmployeeId = this.EmployeeInfo.EmployeeId;
				if (this.EmployeeInfo.EmployeeEduLines.length > 0) {
					var arr = [];
					this.EmployeeInfo.EmployeeEduLines.forEach((item) => {
						arr.push(item);
					});
					arr.sort(function(a, b) {
						return b.LineNum = a.LineNum
					})
					this.EELOption.LineNum = parseInt(arr[0].LineNum) + 1;
				} else {
					this.EELOption.LineNum = 1;
				}
				this.EmployeeInfo.EmployeeEduLines.push(this.EELOption)
			},

			DeleteEEL(idx, item) {
				item.UIStatus = "Delete";
			},

			DeleteEWL(idx, item) {
				item.UIStatus = "Delete";
			},
			ToogleBaseInfo(e) {
				switch (e) {
					case 'IsBaseInfoShow':
						this.IsBaseInfoShow = !this.IsBaseInfoShow;
						break;
					case 'IsPersonInfoShow':
						this.IsPersonInfoShow = !this.IsPersonInfoShow;
						break;
					case 'IsStationInfoShow':
						this.IsStationInfoShow = !this.IsStationInfoShow;
						break;
					case 'IsEducationInfoShow':
						this.IsEducationInfoShow = !this.IsEducationInfoShow;
						break;
					case 'IsWorkInfoShow':
						this.IsWorkInfoShow = !this.IsWorkInfoShow;
						break;
					default:
						break;
				}
			},
			GetEmployeeEntity() {
				var ajaxJSON = {
					pageIndex: 1,
					rowsPerPage: "10",
					type: "Initialize",
					Parameter: {
						LoadChildren: "Load",
						Conditions: [{
							FieldName: "UserId",
							Operation: "EQUAL",
							ConditionValue: uni.getStorageSync("JSUserInfo").UserId,
							Relationship: "AND"
						}]
					}
				};
				this.$mbservices.Request(this.$webapi.GetEmployee, "POST", ajaxJSON, res => {
					if (res.data.RecordCount > 0) {
						this.EmployeeInfo = res.data.data[0];
					}

				}, err => {})
			},
			BeforeSaveEvent() {
				uni.showModal({
					title: '提示',
					content: '确定保存修改内容?',
					success: (res) => {
						if (res.confirm) {
							this.DoSaveEvent()
						}
					}
				});
			},
			DoSaveEvent() {
				this.EmployeeInfo.UIStatus = "Modify";
				this.EmployeeInfo.EmployeeEduLines.forEach((item, index) => {
					if (item.UIStatus === 'Original') {
						item.UIStatus = "Modify";
					}
				});
				this.EmployeeInfo.EmployeeWorkingLines.forEach((item, index) => {
					if (item.UIStatus === 'Original') {
						item.UIStatus = "Modify";
					}
				});
				uni.showLoading({
					title:'提交中...'
				})
				this.$mbservices.Request(
					this.$webapi.SaveEmployeeEntity,
					"POST",
					this.EmployeeInfo,
					(res)=> {
						if (res.data.RecordCount > 0) {
							uni.showToast({
								title: '更新成功',
								icon: 'none'
							})
							this.GetEmployeeEntity()
						} else {
							uni.showToast({
								title: '更新失败',
								icon: 'none'
							})
						}
						uni.hideLoading()
					},
					(err)=> {
						uni.showToast({
							title: '更新失败',
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
