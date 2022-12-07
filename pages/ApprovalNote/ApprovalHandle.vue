<template>
    <view>
        <callback :baseEntry="from" :backFrom="backFrom">{{appNote.BusinessTypeName}} - {{appNote.BusinessOrderNo}}</callback>
        <!-- 单据信息 -->
        <view>
            <view class="cu-bar bg-white solid-bottom solid-top">
                <view class="action">
                    <text class="icon-title text-orange"></text> 单据信息
                </view>
                <view class="action">
                    <button
                        class='cu-btn bg-gray icon'
                        @click="showhide('order',$event)"
                    ><text :class="[isOrder?'icon-fold':'icon-unfold']"></text></button>
                </view>
            </view>
            <view class="cu-list menu sm-border" v-if="isOrder" >
                <view class="bg-white padding">
                    <view class="cu-form-group">
                        <text
                            maxlength="-1"
                            disabled="disabled"
                        >{{this.$mbservices.isEmpty(appNote.RequestContent)? '暂无单据信息' : appNote.RequestContent}}</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 流程信息 -->
        <view>
            <view class="cu-bar bg-white solid-bottom solid-top">
                <view class="action">
                    <text class="icon-title text-orange"></text> 流程信息
                </view>
                <view class="action">
                    <button
                        class='cu-btn bg-gray icon'
                        @click="showhide('flow',$event)"
                    ><text :class="[isFlow?'icon-fold':'icon-unfold']"></text></button>
                </view>
            </view>
            <view
                class="cu-list menu sm-border"
                v-if="isFlow"
            >

                <view class="bg-white padding">
                    <view class="cu-steps">
                        <view
                            class="cu-item"
                            :class="item.ApproveStatus=='Approved'?'text-green':item.ApproveStatus=='Rejected'?'text-red':item.ApproveStatus=='Pending'?'text-blue':''"
                            v-for="(item,index) in appStages"
                            :key="index"
                        >
                            <text
                                class="num"
                                :data-index="index + 1"
                            ></text>
                            {{item.Name}}
                            <br>
                            {{item.ApproveConmments!=null?item.ApproveConmments:''}}
                            <br>
                            {{item.ApproveDatetime!=null?item.ApproveDatetime:''}}
                        </view>
                    </view>
                </view>

            </view>
        </view>

        <!-- 审批操作 -->
        <view>
            <view class="cu-bar bg-white solid-bottom solid-top">
                <view class="action">
                    <text class="icon-title text-orange"></text> 审批意见
                </view>
            </view>
            <view class="bg-white padding">
                <view class="cu-form-group" v-if="appNote.ApproveStatus === 'Pending'">
                    <textarea
                        data-placeholder="在此输入审批意见"
                        maxlength="-1"
                        :disabled="modalName!=null"
                        placeholder-class='placeholder'
                        :class="appNote.ApprovalComments?'value':''"
                        @input="textareaAInput"
						:value="appNote.ApprovalComments" 
                    ></textarea>
                </view>
				<view class="cu-form-group" v-if="appNote.ApproveStatus !== 'Pending'">
				    <text>{{appNote.ApprovalComments}}</text>
				</view>
            </view>
            <view class="cu-bar bg-white solid-bottom solid-top"  v-if="appNote.ApproveStatus==='Pending'">
                <view class="action">

                </view>
                <view class="action">
                    <button
                        class='cu-btn bg-red shadow'
                        @click="actionClick('R',$event)"
                    >拒绝</button>
                    <button
                        class='cu-btn bg-green shadow margin-left-sm'
                        @click="actionClick('A',$event)"
                    >通过</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import callback from "../components/callback/callback.vue";
export default {
    components: {
        callback
    },
    data() {
        return {
			backFrom:"ApprovalHandle",
            appNote: {}, //审批记录
            appStages: [], //审批步骤
            isOrder: true,
            isFlow: true,
			from: "",
			textareaAValue:""
        };
    },
    methods: {
        showhide(type, e) {
            switch (type) {
                case "order":
                    this.isOrder = !this.isOrder;
                    break;
                case "flow":
                    this.isFlow = !this.isFlow;
                    break;
            }
        },
        textareaAInput(e) {
            this.appNote.ApprovalComments = e.detail.value;
        },
        actionClick(type, e) {
            var _content = type === "A" ? "确定同意申请?" : "确定拒绝申请?";
            var _this = this;
            uni.showModal({
                title: "操作提示",
                content: _content,
                success: function(succ) {
                    if (succ.confirm) {
                        uni.showLoading({
                            title: "正在提交审批..."
                        });
                        /* 开始提交审批 */
                        _this.appNote.UIStatus = "Modify";
                        _this.appNote.ApproveStatus = type;
                        //_this.appNote.ApprovalComments = _this.textareaAValue;
                        _this.appNote.Approver = parseInt(
                            uni.getStorageSync("JSUserInfo").UserId
                        );
                        var _$this = _this;
                        _this.$mbservices.Request(
                            _this.$webapi.submitApproveNote,
                            "POST",
                            _this.appNote,
                            function(retsucc) {
                                if (
                                    retsucc.data.RecordCount == undefined ||
                                    retsucc.data.RecordCount <= 0
                                ) {
                                    uni.showToast({
                                        title: "" + retsucc.data
                                    });
                                    _this.getApprovalStages(
                                        _this.appNote.DocEntry
                                    );
									_this.getApprovalNoteData(_this.appNote.DocEntry);
                                    return false;
                                }
                                _this.$mbservices.setIsRefresh(true);
                                uni.showToast({
                                    title: "审批成功"
                                });
                                uni.hideLoading();
                            },
                            function(reterr) {
                                uni.showToast({
                                    title: "审批失败:" + reterr.data
                                });
                                uni.hideLoading();
                            }
                        );
                        /* 结束提交审批 */
                    }
                }
            });
        },
        getApprovalStages(DocEntry) {
            var _this = this;
            //请求审批流程数据
            _this.$mbservices.Request(
                _this.$webapi.getStages,
                "POST",
                DocEntry,
                item => {
                    if (item.data.length > 0) {
                        _this.appStages = item.data;
                    }
                }
            );
        },
        getApprovalNoteData(DocEntry) {
            var _criteria = {
                type: "Search",
                Parameter: {
                    Conditions: [
                        {
                            FieldName: "DocEntry",
                            Operation: "EQUAL",
                            ConditionValue: DocEntry
                        }
                    ]
                }
            };
            var _this = this;
            //请求审批记录的数据
            _this.$mbservices.Request(
                _this.$webapi.getApprovalNotesList,
                "POST",
                _criteria,
                item => {
                    if (item.data.RecordCount >= 1) {
                        _this.appNote = item.data.data[0];
						if(_this.appNote.BusinessOrderNo.indexOf('GQ') > -1 || _this.appNote.BusinessOrderNo.indexOf('GPY') > -1 
						|| _this.appNote.BusinessOrderNo.indexOf('GBP') > -1 || _this.appNote.BusinessOrderNo.indexOf('GEMLOG') > -1 
						 || _this.appNote.BusinessOrderNo.indexOf('GS') > -1 ||
						 (_this.appNote.BusinessType === "FRP-BusinessOrderSea" && _this.appNote.BusinessOrderNo.indexOf('G') > -1)){
							_this.appNote.BusinessTypeName = _this.appNote.BusinessTypeName.replace("FRP","LRP");
						}
						if(this.$mbservices.isEmpty(_this.appNote.ApprovalComments)){
							_this.appNote.ApprovalComments = "";
						}
                    }
                },
                errItem => {}
            );
            _this.getApprovalStages(DocEntry);
        }
    },
    onShow(e) {
        // uni.navigateTo({
        // 	url:"/pages/ApprovalNote/ApprovalNoteList"
        // })
    },
    onLoad(e) {
		console.log(e);
        try {
			if(this.$mbservices.isEmpty(JSON.parse(e.data))){
				uni.showToast({
				    title: "获取的DocEntry为空",
				    icon: "none"
				});
				return false;
			}else{
				if(this.$mbservices.isEmpty(JSON.parse(e.data).from)){
					this.getApprovalNoteData(e.data);
					this.from = null;
				}else{
					console.log(JSON.parse(e.data));
					this.getApprovalNoteData(JSON.parse(e.data).DocEntry);
					this.from = JSON.parse(e.data).from;
				}
			}
            //获取
        } catch (e) {
            //TODO handle the exception
            uni.showToast({
                title: "获取DocEntry失败",
                icon: "none"
            });
            return false;
        }
    }
};
</script>

<style>
</style>
