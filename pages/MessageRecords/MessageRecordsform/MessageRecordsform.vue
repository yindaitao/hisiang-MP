<template>
	<view style="height:100%">
		<custom>消息内容</custom>
		<view class="ul-swiper-box" style="height: calc(100% - 130upx)">
			<form>
				<view class="cu-form-group" style="height: 100%;">
					<textarea class="textarea" maxlength="-1" placeholder-class="placeholder" :value="MessageRecords.Content" />
					</view>
		    </form>
		  </view>
		</view>
</template>

<script>
export default {
  data() {
		return{
			DocEntry:0,
			MessageRecords:{}
		}
	},
  methods: {
		
	},
	onLoad(e) {
		var that = this;
		var handleDataList = [];
		that.DocEntry = JSON.parse(e.data);
		{
			 var ajaxJSON = {
			  pageIndex: "1",
			  rowsPerPage: "10",
			  type: "Initialize",
			  Parameter: {
			    LoadChildren: "Load",
			    Conditions: [
			      {
			        FieldName: "DocEntry",
			        Operation: "EQUAL",
			        ConditionValue: this.DocEntry,
			        Relationship: "AND"
			      }
			    ]
			  }
			};
			uni.showLoading({
			  title: "拼命加载中..."
			});
			var _this = this;
			this.$mbservices.Request(
			  this.$webapi.GetMessageRecords,
			  "POST",
			  ajaxJSON,
			  function(ret) {
			    if (!ret.data.data) {
			      uni.showToast({
			        title: "查无数据"
			      });
			      return false;
			    }
					_this.MessageRecords = ret.data.data[0];
					handleDataList.push(that.MessageRecords);
					handleDataList[0].isRead = "Yes";
					handleDataList[0].UIStatus = "Modify";
					 that.$mbservices.Request(
					  that.$webapi.SaveMessageRecords,"POST",JSON.stringify(handleDataList),
					  function(succ) {
					    setTimeout(function() {
					      uni.hideLoading();
					    }, 1000);
					    if (
					      succ.data.RecordCount == undefined ||
					      succ.data.RecordCount <= 0
					    ) {
					  uni.showModal({
					  	title: "提示",
					  	content: succ.data,
					  	showCancel: false
					  });
					      return false;
					    }
							that.$mbservices.setIsRefresh(true);
					  },
					  function(err) {
							uni.showModal({
								title: "提示",
								content: "data: '" + JSON.stringify(err) + "'",
								showCancel: false,
								});
					  }
					);
			    setTimeout(() => {
			      uni.hideLoading();
			    }, 1000);
			  },
			  function(ret) {
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
	}
};
</script>

<style>
/* tab bar */
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
  height: calc(100% - 100upx);
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
  width: 100%;
  height: calc(100% - 100upx);
}
.textarea{
	width: 100%;
	height: 100%!important;
}
</style>
