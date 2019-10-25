<template>
    <mescroll-uni
        :down="downOption"
        @down="downCallback"
        @up="upCallback"
    >
        <view>
            <custom>可用会议室</custom>

            <block
                v-for="item in meetingrooms"
                :key="item.Code"
            >
                <view
                    class="meetingroom-card"
                    @click="openDetail(item)"
                >
                    <view class="meetingroom-left">
                        <image
                            class="meetingroom-img"
                            :src="imagePath + item.Images"
                            mode=""
                        ></image>
                    </view>
                    <view class="meetingroom-right">
                        <text>{{item.Name}}</text>
                        <text><text class="text-font">{{item.Qty}}</text>个座位</text>
                        <text>{{item.Devices}}</text>
                    </view>
                </view>
            </block>
        </view>
    </mescroll-uni>
</template>
<script>
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
    components: {
        MescrollUni
    },
    data() {
        return {
            downOption: {
                auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
            },
            imagePath: this.$webapi.webroot + "/",
            meetingrooms: []
        };
    },
    methods: {
        /*下拉刷新的回调 */
        downCallback(mescroll) {
            // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
            this.loadData(
                1,
                10,
                (currentPageData, totalRows) => {
                    mescroll.endSuccess();
                },
                err => {
                    mescroll.endErr();
                    uni.showModal({
                        title: "失败:" + JSON.stringify(err)
                    });
                }
            );
        },
        /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
        upCallback(mescroll) {
            this.loadData(
                mescroll.num,
                mescroll.size,
                (currentPageData, totalRows) => {
                    mescroll.endBySize(currentPageData.length, totalRows); //必传参数(当前页的数据个数, 总数据量)
                },
                err => {
                    mescroll.endErr();
                    uni.showModal({
                        title: "失败:" + JSON.stringify(err)
                    });
                }
            );
        },
        loadData(pageIndex = 1,rowsPerPage = 10,successCallback,errorCallback) {
            let cons = [
                {
                    FieldName: "Activated",
                    Operation: "EQUAL",
                    ConditionValue: "Y",
                    Relationship: "AND"
                }
            ];
            let requestJSON = {
                pageIndex: pageIndex,
                rowsPerPage: rowsPerPage,
                type: "Initialize",
                Parameter: {
                    LoadChildren: "NoLoad",
                    Conditions: cons
                }
            };
            this.$mbservices.Request(
                this.$webapi.getMeetingroomList,
                "POST",
                requestJSON,
                res => {
                    if (res.data.hasOwnProperty("data") === false) {
                        errorCallback(res.data);
                    } else {
                        res.data.data.forEach(item => {
                            this.meetingrooms.push(item);
                        });

                        successCallback(res.data.data, res.data.RecordCount);
                    }
                },
                err => {
                    errorCallback(err);
                }
            );
        },
        openDetail(meetingroom) {
            uni.navigateTo({
                url: "/pages/meeting/meetinglist?meetingroomCode="+ meetingroom.Code +"&meetingroomName=" + meetingroom.Name
            });
        }
    },
    onShow() {
        console.log(2);
    },
    onLoad() {
        console.log(1);
    }
};
</script>
<style lang="scss">
.meetingroom-card {
    display: flex;
    position: relative;
    margin: 40rpx;
    border-radius: 10rpx;
    background-color: rgb(172, 188, 223);
    .meetingroom-left {
        width: 230upx;
        flex-shrink: 0;
        position: relative;
        .meetingroom-img {
            height: 100%;
            width: 100%;
            padding: 20upx;
        }
        image {
            border-radius: 8upx;
        }
    }
    .meetingroom-right {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
        position: relative;
        padding: 30upx;
        .text-font {
            font-family: Arial, Helvetica, sans-serif;
        }
    }
}
</style>