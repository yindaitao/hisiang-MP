<template>
    <view class="page">
        <custom>{{meetingroomName}}使用情况</custom>
        date: {{date}}
        <uni-calendar
            :insert="true"
            :lunar="true"
            :disable-before="true"
            :start-date="'2019-9-1'"
            :end-date="'2019-9-30'"
            @change="change"
        />
        <!-- 列表部分 -->
        <view
            class="ul-swiper-box"
            style="margin-top: 2upx;"
        >
            <scroll-view
                scroll-y
                @scrolltolower="loadMore()"
                style="width: 100%;margin-bottom: 10px;"
                :style="{'height':scrollBarHeight+'px'}"
            >
                <view class="cu-list menu">
                    <view
                        class="cu-item"
                        :class="modalName=='move-box-'+ index?'move-cur':''"
                        v-for="(item,index) in dataList"
                        :key="index"
                        @touchstart="ListTouchStart(index,$event)"
                        @touchmove="ListTouchMove(index,$event)"
                        @touchend="ListTouchEnd(index,$event)"
                        :data-target="'move-box-' + index"
                        @tap="goDetail(item)"
                        style="position: relative;"
                    >

                        <view class="content padding-tb-sm">
                            <view>
                                <text class="icon-peoplefill text-blue margin-right-xs"></text>
                                {{item.Subject}}-{{item.ApplicantName}}
                            </view>
                            <view>
                                <text class="icon-title text-orange"></text>
                                {{item.BeginDate}}-{{item.EndDate}}
                            </view>
                            <view class="text-gray text-sm">
                                <text class="icon-timefill margin-right-xs"></text>
                                {{item.CreateDate}}
                            </view>
                        </view>
                        <view class="action">
                            <view class="cu-tag round bg-red light">未开始</view>
                        </view>
                        <view class="move">
                            <view
                                class="bg-grey"
                                @click.stop="editItem(item)"
                            >编辑</view>
                            <view
                                class="bg-red"
                                @click.stop="deleteItem(item)"
                            >删除</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view class="uni-padding-wrap uni-common-mt">
            <button
                type="primary"
                loading="true"
                @click="booking"
            >页面主操作 Loading</button>
        </view>
    </view>
</template>
<script>
import { uniCalendar } from "../../components/uni-calendar/uni-calendar.vue";
export default {
    components: {
        uniCalendar
    },
    data() {
        return {
            meetingroomCode: null,
            meetingroomName: null,
            dataList: [],
            date: null
        };
    },
    methods: {
        change(e) {
            this.date = e.fulldate;
            console.log(e);
        },
        goDetail(item) {
            uni.navigateTo({
                url:
                    "/pages/meeting/meeting?data=" +
                    encodeURIComponent(JSON.stringify(item))
            });
        },
        editItem(item) {
            uni.navigateTo({
                url:
                    "/pages/meeting/meeting?data=?flag=modify&data=" +
                    JSON.stringify(item)
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
                        item.UIStatus = "Delete";
                        item.Canceled = "Yes";
                        _this.$mbservices.Request(
                            _this.$webapi.submitBorrowRequest,
                            "POST",
                            item,
                            function(succ) {
                                console.log(succ);
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
        // ListTouch触摸开始
        ListTouchStart(indx, e) {
            if (
                this.dataList[indx].Approve === "Yes" &&
                (this.dataList[indx].ApproveStatus === "Pending" ||
                    this.dataList[indx].ApproveStatus === "Approved")
            ) {
                return false;
            }
            this.listTouchStart = e.touches[0].pageX;
        },

        // ListTouch计算方向
        ListTouchMove(indx, e) {
            if (
                this.dataList[indx].Approve === "Yes" &&
                (this.dataList[indx].ApproveStatus === "Pending" ||
                    this.dataList[indx].ApproveStatus === "Approved")
            ) {
                return false;
            }
            this.listTouchDirection =
                e.touches[0].pageX - this.listTouchStart > 0 ? "right" : "left";
        },

        // ListTouch计算滚动
        ListTouchEnd(indx, e) {
            if (
                this.dataList[indx].Approve === "Yes" &&
                (this.dataList[indx].ApproveStatus === "Pending" ||
                    this.dataList[indx].ApproveStatus === "Approved")
            ) {
                return false;
            }
            if (this.listTouchDirection == "left") {
                this.modalName = e.currentTarget.dataset.target;
            } else {
                this.modalName = null;
            }
            this.listTouchDirection = null;
        },
        booking() {
            uni.navigateTo({
                url:
                    "/pages/meeting/meeting?method=add&meetingroom" +
                    encodeURIComponent(JSON.stringify(this.meetingroomCode)) +
                    "&date=" +
                    encodeURIComponent(JSON.stringify(this.date))
            });
        },
        loadMore() {
            this.pageIndex = parseInt(this.pageIndex) + 1;
            let ajaxJSON = {
                pageIndex: this.pageIndex,
                rowsPerPage: "5",
                type: "Initialize",
                Parameter: {
                    Sorts: [
                        {
                            FieldName: "DocEntry",
                            type: "Descending"
                        }
                    ],
                    LoadChildren: "NoLoad",
                    Conditions: [
                        {
                            FieldName: "Canceled",
                            Operation: "EQUAL",
                            ConditionValue: "N",
                            Relationship: "AND"
                        }
                    ]
                }
            };
            if (params != undefined && params.length > 0) {
                params.forEach(item => {
                    ajaxJSON.Parameter.Conditions.push(item);
                });
            }
            let _this = this;
            this.$mbservices.Request(
                this.$webapi.getBorrowRequestList,
                "POST",
                ajaxJSON,
                ret => {
                    console.log(ret);
                    if (!ret.data.data) {
                        _this.dataList = [];
                        uni.showToast({
                            title: "查无数据"
                        });
                        return false;
                    }
                    let _cacheList = [];
                    ret.data.data.forEach(item => {
                        _this.dataList.push(item);
                    });
                },
                ret => {
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
        }
    },
    onLoad(option) {
        try {
            this.meetingroomCode = JSON.parse(option.meetingroomCode);
            this.meetingroomName = JSON.parse(option.meetingroomName);
            //获取
        } catch (e) {
            //TODO handle the exception
            uni.showToast({
                title: "获取DocEntry失败",
                icon: "none"
            });
        }
    }
};
</script>


<style lang="scss">
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