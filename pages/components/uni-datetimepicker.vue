<template>
	<view class="mpvue-picker">
		<view :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></view>
		<view class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
			<view class="mpvue-picker__hd" catchtouchmove="true">
				<view class="mpvue-picker__action">
					<view class="uni-tab-bar">
						<view class="uni-swiper-tab" style="border-bottom: 1px solid rgba(0,0,0,0);">
							<div class="uni-scroll-view">
								<div class="uni-scroll-view" style="overflow: auto hidden;">
									<div style="padding: 5px;">
										<uni-view data-v-76d84dbe="" id="guanzhu" data-current="0" class="swiper-tab-list" :class="[dateTabActive&&!timeTabActive?'active':'']"
										 @click="tabTap(1)">
											<text>{{dateTabTitle}}</text>
										</uni-view>
										<uni-view data-v-76d84dbe="" id="tuijian" data-current="1" class="swiper-tab-list" :class="[timeTabActive&&!dateTabActive?'active':'']"
										 @click="tabTap(2)">{{timeTabTitle}}</uni-view>
									</div>
								</div>
							</div>
						</view>
					</view>
				</view>
				<view class="mpvue-picker__action" @click="pickerCancel">确定</view>
			</view>
			<view class="mpvue-picker-view" v-if="dateTabActive">
				<view class="mx-mask">
					<view class="mx-modal">
						<view v-if="type!='time'" class="mx-modal-header">
							<text style="padding: 0 15px;" @click="onPrevMonth"><text class="icon icon-left"></text></text>
							<text>{{date.year}}年 - {{date.month}}月</text>
							<text style="padding: 0 15px;" @click="onNextMonth"><text class="icon icon-right"></text></text>
						</view>
						<view v-else class="mx-modal-header">
							<text>选择时间</text>
							<view class="mx-modal-header-colse" @click="onClose"><text class="icon icon-close"></text></view>
						</view>
						<view class="mx-modal-body">
							<!-- 日期选择 -->
							<view class="mx-date">
								<view class="mx-date-header">
									<view v-for="(header,index) in ['一','二','三','四','五','六','日']" :key="index">{{header}}</view>
								</view>
								<view class="mx-date-body">
									<view v-for="(item,index) in dateList" :key="index" :id="index" @click="onSelectDate" :class="{'active': item.selected,'gray': item.is_gray}">{{item.date}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 时间选择器 -->
			<picker-view v-if="timeTabActive" indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerHM"
			 @change="pickerChange">
				<block>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueHour1" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueMinute1" :key="index">{{item}}</view>
					</picker-view-column>
				</block>
			</picker-view>
		</view>
	</view>
</template>
<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
	export default {
		components: {
			uniSegmentedControl
		},
		props: {
			value: {
				type: Boolean,
				default: false
			},
			init: {
				type: String,
				default () {
					let d = new Date();
					return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() +
						':' + d.getSeconds();
				}
			},
			type: {
				type: String,
				default: 'datetime'
			}
		},
		data() {
			let d = new Date();
			let dtt = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
			let dttt = d.getHours() + ':' + d.getMinutes();
			let hourArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
				'17', '18', '19', '20', '21', '22', '23', '24'
			];
			let minuteArr = ['00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
				'17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'
			];
			let index1 = 0,
				index2 = 0;
			for (let i = 0; i < hourArr.length; ++i) {
				if (hourArr[i] === (d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours())) {
					index1 = i;
					break;
				}
			}
			for (let i = 0; i < minuteArr.length; ++i) {
				if (minuteArr[i] === (d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes())) {
					index2 = i;
					break;
				}
			}
			return {
				items: [
					'选项卡1',
					'选项卡2'
				],
				current: 0,
				activeColor: '#007aff',
				styleType: 'text',
				/* 是否显示控件 */
				showPicker: false,
				/*日期时间选项卡活跃*/
				dateTabActive: true,
				timeTabActive: false,
				pickerValueHour1: hourArr,
				pickerValueMinute1: minuteArr,
				date: {
					year: 2019,
					month: 3,
					date: 1,
					hour: 0,
					minute: 0,
					second: 0
				},
				dateIndex: 0,
				dateList: [],
				isShow: false,
				time: [0, 0, 0],
				cls: {
					mask: true,
					fadeIn: false,
					fadeOut: false
				},
				dateTabTitle: dtt,
				timeTabTitle: dttt,
				indexH:index1,
				indexM:index2,
				pickerHM:[index1,index2],
				selectDtime:"",
				type:""
			};
		},
		mounted() {
			let initValue = this.type == 'time' ? '1970-0-0 ' + this.init : this.init;
			let date = new Date(initValue.replace(/^(\d{4})-(\d{1,2})-(\d{1,2})$/, "$1/$2/$3")); //转换 年-月-日 =>年/月/日
			this.date.year = date.getFullYear();
			this.date.month = date.getMonth() + 1;
			this.date.date = date.getDate();
			this.date.minute = date.getMinutes();
			this.date.second = date.getSeconds();
			this.date.hour = date.getHours();
			this.date.minute = date.getMinutes();
			this.date.second = date.getSeconds();
			this.time = [this.date.hour, this.date.minute, this.date.second];
			if (this.type.indexOf('date') >= 0) {
				this.dateList = this.getDateList(this.date);
				this.dateList.forEach((item) => {
					if (item.year == this.date.year && item.month == this.date.month && item.date == this.date.date) {
						item.selected = true;
					}
				});
			}
		},
		methods: {
			show() {
				this.showPicker = true;
			},
			maskClick() {
				this.pickerCancel();
			},
			pickerCancel() {
				this.selectDtime=this.dateTabTitle+' '+this.timeTabTitle;
				let picObj={
					type:this.type,
					data:this.dateTabTitle+' '+this.timeTabTitle
				}
				this.$emit('onCancel', picObj);
				this.showPicker = false;
			},
			pickerConfirm() {
				this.showPicker = false;
				
				this.selectDtime=this.dateTabTitle+' '+this.timeTabTitle;
				this.$emit('onCancel', pickObj);
				
				//this.showPicker=false;
				//return {selectDateTime:this.dateTabTitle+' '+this.timeTabTitle}
			},
			pickerChange(e) {
				//this.pickerValue = e.mp.detail.value;
				//console.log(e);
				this.timeTabTitle=this.pickerValueHour1[e.mp.detail.value[0]]+':'+this.pickerValueMinute1[e.mp.detail.value[1]];
				this.selectDtime=this.dateTabTitle+' '+this.timeTabTitle;
				
			},
			tabTap(e) {
				if (e === 1) {
					this.dateTabActive = true;
					this.timeTabActive = false;
				}
				if (e === 2) {
					this.dateTabActive = false;
					this.timeTabActive = true;
				}
			},
			onClose() {
				this.isShow = false;
				this.$emit('input', this.isShow);
			},
			//确定
			onConfirm() {
				let date = JSON.parse(JSON.stringify(this.date));
				if (this.type == 'date') {
					date.value = date.year + '-' + date.month + '-' + date.date;
				} else if (this.type == 'datetime') {
					date.value = date.year + '-' + date.month + '-' + date.date + ' ' + date.hour + ':' + date.minute + ':' + date.second;
				} else {
					date.value = date.hour + ':' + date.minute + ':' + date.second;
				}
				this.onClose();
				this.$emit('selected', date);
			},
			//时间变更
			onTimeChange(event) {
				this.time = event.detail.value;
				[this.date.hour, this.date.minute, this.date.second] = this.time;
			},
			//上一月
			onPrevMonth() {
				this.date.month--;
				if (this.date.month <= 0) {
					this.date.year--;
					this.date.month = 12;
				}
				this.dateList = this.getDateList(this.date);
			},
			//下一月
			onNextMonth() {
				this.date.month++;
				if (this.date.month > 12) {
					this.date.year++;
					this.date.month = 1;
				}
				this.dateList = this.getDateList(this.date);
			},
			//选择日期
			onSelectDate(event) {
				let index = event.target.id;
				if (this.dateList[index].is_gray) return; //不能选择非本月日期
				for (let i = 0, len = this.dateList.length; i < len; i++) this.dateList[i].selected = false;
				this.dateList[index].selected = true;
				this.date.date = this.dateList[index].date;
				this.dateTabTitle = this.date.year + '-' + this.date.month + '-' + this.date.date;
				this.selectDtime=this.dateTabTitle+' '+this.timeTabTitle;
			},
			//转换日期对象
			getDateInfo(date) {
				let weeks = ["日", "一", "二", "三", "四", "五", "六"];
				let data = {
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					date: date.getDate(),
					week: weeks[date.getDay()],
					selected: false, //是否选中
					is_gray: false //是否显示灰色
				};
				return data;
			},
			//获取日期列表
			getDateList(option = {}) {
				let nowDate = new Date();
				let year = option.year || nowDate.getFullYear();
				let month = option.month ? option.month - 1 : nowDate.getMonth();
				let date = option.date || nowDate.getDate();
				let pointerDate = new Date();
				pointerDate.setFullYear(year);
				pointerDate.setMonth(month);
				pointerDate.setDate(1);
				let oneWeek = pointerDate.getDay() == 0 ? 7 : pointerDate.getDay(); //这月1号是周几
				pointerDate.setDate(pointerDate.getDate() - (oneWeek - 1));
				let dateList = [],
					is_selected = false;
				for (let i = 0; i < 42; i++) {
					let tmp = this.getDateInfo(pointerDate);
					tmp.is_gray = pointerDate.getMonth() < month || pointerDate.getMonth() > month; //设置非本月日期
					dateList.push(tmp);
					pointerDate.setDate(pointerDate.getDate() + 1);
				}
				return dateList;
			}
		},
		watch: {
			value(newVal) {
				this.isShow = newVal;
			}
		}
	};
</script>

<style>
	.pickerMask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.mpvue-picker-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 3000;
	}

	.mpvue-picker-view-show {
		transform: translateY(0);
	}

	.mpvue-picker__hd {
		display: flex;
		padding: 9px 15px;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 17px;
	}

	.mpvue-picker__hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 100%;
		transform: scaleY(0.5);
	}

	.mpvue-picker__action {
		display: block;
		flex: 1;
		color: #1aad19;
	}

	.mpvue-picker__action:first-child {
		text-align: left;
		color: #888;
	}

	.mpvue-picker__action:last-child {
		text-align: right;
	}

	.picker-item {
		text-align: center;
		line-height: 40px;
		font-size: 16px;
	}

	.mpvue-picker-view {
		position: relative;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 238px;
		background-color: rgba(255, 255, 255, 1);
	}

	/* .activedd{
		background-color:#007AFF;
	} */



	/* @keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(.8);
		}
	
		to {
			opacity: 1;
			transform: scale(1);
		}
	} */

	.mx-mask {
		/* position: fixed; */
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0);
		font-size: 16px;
		z-index: 1000;
		animation: fadeIn .2s 1;
	}

	.mx-modal {
		background: #fff;
		/* position: absolute; */
		/* left: 5%; */
		/* right: 5%; */
		/* top: 50%; */
		/* transform: translateY(-50%); */
		color: #606266;
		/* border-radius: 6px; */
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
		/* padding: 0 10px 10px 10px; */
		/* box-sizing: border-box; */
		text-align: center;
	}

	.mx-modal-header {
		/* position: relative; */
		padding: 10px 0;
		border-bottom: 1px solid #eee;
	}

	.mx-modal-header-colse {
		/* position: absolute; */
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
	}

	.mx-modal-body {
		padding: 10px 0;
	}

	/*日期*/
	.mx-date-header,
	.mx-date-body {
		/* position: relative; */
		display: flex;
		justify-content: space-between;
	}

	.mx-date-header view,
	.mx-date-body view {
		width: 14.28%;
		transition: .2s;
		border-radius: 6px;
	}

	.mx-date-header {
		padding: 5px 0;
	}

	.mx-date-body view {
		padding: 2px 0;
	}

	.mx-date-body {
		flex-wrap: wrap;
	}

	.mx-date-body view.active {
		background: #409eff;
		color: #fff;
	}

	.mx-date-body view.gray {
		background: none;
		color: #c0c4cc;
	}

	/*时间*/
	.mx-time {
		width: 100%;
		height: 66px;
	}

	/*带线的标题*/
	.line-title {
		position: relative;
		font-size: 14px;
		width: 100%;
		text-align: center;
		color: #666;
	}

	.line-title::before,
	.line-title::after {
		content: "";
		display: inline-block;
		width: 30px;
		height: 1px;
		background: #eee;
		position: relative;
		top: -4px;
	}

	.line-title::before {
		right: 6px;
	}

	.line-title::after {
		right: -6px;
	}

	@font-face {
		font-family: "icondt";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAL8AAsAAAAAB0QAAAKtAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDFAqBfIFcATYCJAMQCwoABCAFhG0HUxtRBsiusCnDvUiJtoUQcQPnvVtvMMCnT/Hw/drrue/d3SConygCFR0eHy6CqjJVZVtlO74ZX0ugo/dyqp/OAdgfz4ZBXQtNLtsvRV7vk14dExXgwABohHp8A9bwLjsU6HnCWeSN0hVuWvowzYJJTfFg9rm/gkTApixA7f9/7/T/2tzJ57Vvua01aSx71Akw7AQU0FibIiuRgDyF2kUclLDyr44TGDSvqXF0cHYJCxIZF4gX1ihY6ISlDHL9QjuxNMVrjf7yslwBr/T3479+LFA0FZl6/Hw/ga1f/XqljtyVGMl5TgSrqNgAkng4mb5tWgSsaYP9Z2wBrRTKWcGuQ5OIc2370j9eUYkWKRwG23am8itOEPxCUPj1AhV+hra/m90BzlxqTxW0a29i05sRr6YTLTiDDCWc2Z2hFputH4mOOA8URaL5Hv51fMCPmzFRoiEZxKAG/j/UgibTxguO47b+ygEf64gwbJKoJTEjytLsBxVAd/1cTwE6NeqJZpavv2gguO5dXeG6fyjBFx+fFewkNx/0K8CSfysB6zKXEUtmKufiwpt6ULJgkMboIv5Jv2doZ+BSQr+ZHd4+cw1U/RbwpG5AY8g2tPrtwqB1h6uHTHGmRQ5gzZsFYVwNxahPUI17x5P6A41Zf9Aaj2kYdBlqyyFLYZeiIyWUYHSPNuZSM5ssmeJzMiFXri3TnGty3saw1+72c4dUkjtjhr8xfRGN2nGBB9ZplOeMleOUYmkPRapBp6On3tSOuYAlhxyiCJJAkXvIirGSls3F0uDz54gR5BS3gMyErxHHs52jnrYugB+qSwj5lle8G0afEBrSHFZAB5aT5DTNUDU9KEViom24I1kZ6DiNNKpu368tvnAbDCI3ZJSokdFongS+DevVqtLcc0i1VbjLfghsAgAAAAA=') format('woff2');
	}

	.icon {
		font-family: "icondt" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-close:before {
		content: "\e641";
	}

	.icon-right:before {
		content: "\e65f";
	}

	.icon-left:before {
		content: "\e660";
	}

	/*button*/
	.mx-btn {
		display: block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		background: #409eff;
		border: 1px solid #409eff;
		color: #fff;
		-webkit-appearance: none;
		text-align: center;
		box-sizing: border-box;
		outline: none;
		margin: 0;
		transition: .1s;
		font-weight: 500;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
	}

	.mx-btn:active {
		background-color: #3A8EE6;
		border-color: #3A8EE6;
	}
</style>