var websiteUrl = "https://so.magicdata.co";
/* https://oa.magicbox.net.cn*/
/* http://localhost:62142 */
/* http://localhost:51682 */
/* http://oa.magicbox.net.cn */
/* http://192.168.0.109:8080 */
/* https://oa.magicbox.net.cn*/
/* https://so.magicdata.co */ 
module.exports = {
	/* 接口根目录 */
	webroot: websiteUrl,
	/* 图片上传路径 */
	uploadFilePath: websiteUrl + '/api/Upload/PostImage',
	/* 拿Code换去OpenId */
	getLoginOpenId: websiteUrl + '/api/WeChat/GetMiniProgramOpenId',
	/* 登录 */
	login: websiteUrl + '/Token',
	/* 登陆前验证 */
	ValidateUserInfo: websiteUrl + '/api/User/ValidateUserInfo',
	/* 根据用户id获取用户信息 */
	getUserInfo: websiteUrl + '/api/User/GetUsers',
	/* 获取AccessToken */
	getAccessToken: websiteUrl + '/api/Authorization/GetUserAuthorization_Mobile',
	/* 获取权限菜单 */
	getAuthMenus: websiteUrl + '/api/Authorization/GetMyAuthorization_Mobile',
	/* 获取组织架构TreeList */
	getTreeList: websiteUrl + '/api/Organization/GetOrganizationTreeApp',
	/* 提交组织架构 */
	submitOrgForm: websiteUrl + '/api/Organization/Save',
	/* 删除组织架构 */
	deleteOrg: websiteUrl + '/api/Organization/Delete',
	/* 获取记账公司列表 */
	getInvCompany: websiteUrl + '/api/AccountingCompany/GetRecords',
	/* 获取组织架构列表 */
	getOrgList: websiteUrl + '/api/Organization/GetOrganizations',
	/* 获取费用类型列表 */
	getCostTypeList: websiteUrl + '/api/CostType/GetRecords',
	/* 获取人员记录 */
	getUserList: websiteUrl + '/api/User/GetUsers',
	/* 添加、删除、修改人员记录 */
	deleteUser: websiteUrl + '/api/User/Save',
	/* 批量删除人员 */
	deleteUserArray: websiteUrl + '/api/User/DeleteArray',
	/* 上传图片 */
	uploadImages: websiteUrl + '/api/Upload/PostImage',
	/* 删除选中的图片 */
	deleteImage: websiteUrl + '/api/Upload/appDeleteImage',
	/* 添加请假审批 */
	saveLeaveEntity: websiteUrl + '/api/Leave/Save',
	/* 获取请假列表 */
	getLeaveList: websiteUrl + '/api/Leave/GetRecords',
	/* 请假最大ID*/
	maxNumLeave: websiteUrl + '/api/Leave/GetMaxDocEntry',
	/* 获取请假类型*/
	getHolidayType: websiteUrl + '/api/HolidayType/GetRecords',
	/* 获取请假带薪假*/
	getHolidayRestDays: websiteUrl + '/api/HolidayType/GetRestDays',
	/* 获取加班列表 */
	getExtraWorkList: websiteUrl + '/api/ExtraWork/GetRecords',
	// 加班最大ID
	maxNumExtraWork: websiteUrl + '/api/ExtraWork/GetMaxDocEntry',
	// 添加加班
	saveExtraWork: websiteUrl + '/api/ExtraWork/Save',
	/* 获取外出列表 */
	getGooutList: websiteUrl + '/api/Goout/GetRecords',
	// 外出最大ID
	maxNumGoout: websiteUrl + '/api/Goout/GetMaxDocEntry',
	// 添加外出
	saveGoout: websiteUrl + '/api/Goout/Save',
	/* 获取出差列表 */
	getTripList: websiteUrl + '/api/Trip/GetRecords',
	// 出差最大ID
	maxNumTrip: websiteUrl + '/api/Trip/GetMaxDocEntry',
	// 添加出差
	saveTrip: websiteUrl + '/api/Trip/Save',
	/* 报销最大ID */
	maxNumReimRequest: websiteUrl + '/api/ReimbursementRequest/GetMaxDocEntry',
	/* 得到费用报销类型 */
	getRemTypeList: websiteUrl + '/api/ReimbursementType/GetRecords',
	/* 提交报销申请 */
	submitCostForm: websiteUrl + '/api/ReimbursementRequest/Save',
	/* 删除报销申请 */
	deleteCostItem: websiteUrl + '/api/ReimbursementRequest/Delete',
	/* 修改报销申请 */
	updateCostItem: websiteUrl + '/api/ReimbursementRequest/Update',
	/* 获取报销列表 */
	getReimList: websiteUrl + '/api/ReimbursementRequest/GetRecords',
	// 获取收款公司
	getBusinessPartner: websiteUrl + '/api/BusinessPartner/GetRecords',
	/* 获取审核步骤 */
	getStages: websiteUrl + '/api/ApprovalNote/GetApproveStageFlow',//'/api/ApprovalTemplate/GetApprovalStage',
	/* 获取待办任务列表 */
	getTaskList: websiteUrl + '/api/Backlog/GetRecords',
	/* 提交审批结果 */
	submitApproveNote: websiteUrl + '/api/ApprovalNote/Save',
	/* 获取支出分类 */
	getExpendType: websiteUrl + '/api/ExpendType/GetRecords',
	/* 支出申请最大编号 */
	maxNumExpendRequest: websiteUrl + '/api/ExpendRequest/GetMaxDocEntry',
	/* 提交支出申请 */
	submitExpendRequest: websiteUrl + '/api/ExpendRequest/Save',
	/* 获取支出申请列表 */
	getExpendRequestList: websiteUrl + '/api/ExpendRequest/GetExpendRequest',
	/* 支出申请单据详情 */
	getItemExpendRequest: websiteUrl + '/api/ExpendRequest/GetRecords',
	/* 借款申请最大编号 */
	maxNumBorrowRequest: websiteUrl + '/api/BorrowRequest/GetMaxDocEntry',
	/* 提交借款申请 */
	submitBorrowRequest: websiteUrl + '/api/BorrowRequest/Save',
	/* 获取借款申请列表 */
	getBorrowRequestList: websiteUrl + '/api/BorrowRequest/GetRecords',
	/* 借款申请单据详情 */
	getItemBorrowRequest: websiteUrl + '/api/BorrowRequest/GetRecords',
	/* 借款申请冲销明细 */
	getBorrowRequestRepaymentDetail: websiteUrl + '/api/BorrowRequest/GetRepmentDetailRecords',
	/* 差旅报销申请最大编号 */
	maxNumBusinessTravelRequest: websiteUrl + '/api/BusinessTravelRequest/GetMaxDocEntry',
	/* 获取差旅报销申请列表 */
	getBusinesstravelReimList: websiteUrl + '/api/BusinessTravelRequest/GetRecords',
	/* 差旅报销申请、详情 */
	getBusinesstravelRequestItemDetail: websiteUrl + '/api/BusinesstravelRequest/GetBusinesstravelRequestDetail',
	/* 提交差旅报销申请 */
	saveBusinesstravelRequest: websiteUrl + '/api/BusinessTravelRequest/Save',
	/* 还款申请最大编号 */
	maxNumpaymentRequest: websiteUrl + '/api/RepaymentRequest/GetMaxDocEntry',
	/* 获取还款申请列表 */
	getpaymentRequestReimList: websiteUrl + '/api/RepaymentRequest/GetRecords',
	/* 提交还款申请列表 */
	submitpaymentRequest: websiteUrl + '/api/RepaymentRequest/Save',
	// 在还款中获取借款单
	GetOpenBorrowList: websiteUrl + '/api/Borrow/GetOpenBorrowList',
	/* 还款申请、详情 */
	getRepaymentRequestItemDetail: websiteUrl + '/api/RepaymentRequest/GetRepaymentRequestDetail',
	/* 预支申请、详情 */
	getAdvancePayRequestItemDetail: websiteUrl + '/api/AdvancePayRequest/GetAdvancePayRequestDetail',
	/* 获取消耗申请列表 */
	getDepleteRequestList: websiteUrl + '/api/DepleteDetails/GetRecords',
	/* 消耗申请最大编号 */
	maxNumDepleteRequest: websiteUrl + '/api/DepleteDetails/GetMaxDocEntry',
	// 在消耗申请中获取消耗品管理
	GetOpenDepletes: websiteUrl + '/api/Deplete/GetOpenDepletes',
	// 消耗申请中获取费用明细
	GetReimbursementType: websiteUrl + '/api/ReimbursementType/GetRecords',
	// 在消耗申请中获取使用人
	GetUsers: websiteUrl + '/api/User/GetUsers',
	// 在消耗申请中获取使用车辆
	GetVehicle: websiteUrl + '/api/VehicleManagement/GetRecords',
	// 保存消耗申请
	submitDepleteRequestList: websiteUrl + '/api/DepleteDetails/Save',
	/* 获取我的审核列表 */
	getApprovalNotesList: websiteUrl + '/api/ApprovalNote/GetApprovalNotes',
	// 获取可用会议室列表
	getMeetingroomList: websiteUrl + "/api/MeetingRoom/GetRecords",
	// 获取可用会议列表
	getMeetingList: websiteUrl + "/api/Meeting/GetRecords",
	// 获取我的审批未读
	getApprovalNote: websiteUrl + "/api/ApprovalNote/GetRecordCounter",
	//获取待办事项未读
	getBacklog: websiteUrl + "/api/Backlog/GetRecords",
	/* 腾讯地图逆地址 */
	getAddressByLatLong: websiteUrl + '/api/WorkRecord/GetAddressByLatLong',
	/* 保存打卡记录 */
	saveWorkRecord: websiteUrl + '/api/WorkRecord/SaveEntity',
	/* 获取今天的打卡记录 */
	getWorkRecords: websiteUrl + '/api/WorkRecord/GetRecordsList',
	// 获取发票类型
	getVatRecords: websiteUrl + '/api/Vat/GetRecords',
	// 获取系统初始化表格的数据
	getInitialize: websiteUrl + '/api/Initialize/GetInitialize',
	// 获取公休时间表的数据
	getHolidaySchedule: websiteUrl + '/api/HolidaySchedule/GetRecords',
	// 获取指定用户当前月份的外出次数，出差天数，请假，外出，
	GetCurrentMonthGooutAndTripList: websiteUrl + '/api/HolidayType/GetCurrentMonthGooutAndTripList',
	/* 获取适用当前用户的排版班信息 */
	getScheduleList: websiteUrl + '/api/Schedule/GetRecords',
	/* 考勤确认 */
	AttendanceSave: websiteUrl + '/api/AttendanceRecord/Save',
	/* 获取考勤 */
	GetAttendanceRecords: websiteUrl + '/api/AttendanceRecord/GetRecordsArr',
	/* 获取当月考勤汇总 */
	GetCurrentMonthAttendanceRecord: websiteUrl + '/api/AttendanceRecord/GetAttendanceRecordsBySelectMonth',
	/* 警报提醒 */
	GetMessageRecords: websiteUrl + '/api/MessageRecords/GetMessageRecords',
	/* 警报提醒已读（修改状态） */
	SaveMessageRecords: websiteUrl + '/api/MessageRecords/Save',
	/* 年假申请记录 */
	GetHolidayDelayRecords: websiteUrl + '/api/HolidayDelay/GetRecords',
	/* 获取年假剩余可用天数 */
	GetLastLeaveDays: websiteUrl + '/api/HolidayType/GetRestDays',
	/* 获取年假申请最大编号 */
	GetHolidayDelayMaxNum: websiteUrl + '/api/HolidayDelay/GetMaxDocEntry',
	/* 保存年假延期申请 */
	SaveHolidayDelay: websiteUrl + '/api/HolidayDelay/Save',
	/* 获取工资条 */
	GetMySalaryList: websiteUrl + '/api/Salary/GetPeopleRecords',
	/* 打卡时验证有没有出差申请或者外出申请 */
	ValidateIsHaveGooutTripRequest: websiteUrl + '/api/WorkRecord/ValidateIsHaveGooutTripRequest',
	/* 用户更新工资条阅读次数 */
	SaveSSReadTimes: websiteUrl + '/api/Salary/SaveReadInfo',
	/* 获取Employee */
	GetEmployee: websiteUrl + '/api/Employee/GetRecords',
	/* 修改员工资料 */
	SaveEmployeeEntity: websiteUrl + '/api/Employee/Save',
	/* 保存系统设置 */
	SaveSysSetting: websiteUrl + '/api/UsersSystemSettings/Save',
	/* 获取系统设置 */
	GetSysSettingRecords: websiteUrl + '/api/UsersSystemSettings/GetRecords',
	/* 获取业绩绩效 */
	GetPerformace: websiteUrl + '/api/Performance/GetRecordsList',
	/* 提交问题记录 */
	SaveQuestions: websiteUrl + '/api/Question/Save',
	/* 计算请假时长 */
	CalcDateDiffByStartEndDateTime:websiteUrl+'/api/Leave/CalcDateDiffByStartEndDateTime'
}
