<template>
	<view class="w-picker">
		<view class="mask" :class="{'show':showPicker}" @tap="maskTap" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="w-picker-cnt" :class="{'show':showPicker}">
			<view class="w-picker-hd" @touchmove.stop.prevent catchtouchmove="true">
				<view class="w-picker-btn" @tap="pickerCancel">取消</view>
				<view class="w-picker-btn" :style="{'color':themeColor}" @tap="pickerConfirm">确定</view>
			</view>
			<view class="w-picker-view" v-if="mode=='half'">
				<picker-view :indicator-style="itemHeight" :value="pickVal" @change="bindChange">
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.days" :key="index">{{item}}日</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.areas" :key="index">{{item.label}}</view>
					</picker-view-column>
				</picker-view>
			</view>
			<view class="w-picker-view" v-if="mode=='date'">
				<picker-view :indicator-style="itemHeight" :value="pickVal" @change="bindChange">
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.days" :key="index">{{item}}日</view>
					</picker-view-column>
				</picker-view>
			</view>
			<view class="w-picker-view" v-if="mode=='dateTime'">
				<picker-view :indicator-style="itemHeight" :value="pickVal" @change="bindChange">
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.days" :key="index">{{item}}日</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.minutes" :key="index">{{item}}分</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.seconds" :key="index">{{item}}秒</view>
					</picker-view-column>
				</picker-view>
			</view>
			<view class="w-picker-view" v-if="mode=='dateTime1'">
				<picker-view :indicator-style="itemHeight" :value="pickVal" @change="bindChange">
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.days" :key="index">{{item}}日</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.minutes" :key="index">{{item}}分</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.seconds" :key="index">{{item}}秒</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	import initPicker from "./w-picker.js";

	function oneOf(value, validList) {
		for (let i = 0; i < validList.length; i++) {
			if (value === validList[i]) {
				return true;
			}
		}
		throw new Error('mode无效，请选择有效的mode!');
		return false;
	}
	export default {
		data() {
			return {
				result: [],
				data: {},
				checkArr: [],
				checkValue: [],
				pickVal: [],
				showPicker: false,
				resultStr: "",
				itemHeight: `height: ${uni.upx2px(88)}px;`
			};
		},
		computed: {

		},
		props: {
			mode: {
				type: String,
				validator(mode) {
					let modeList = ['half', 'date', 'dateTime', 'dateTime1']; //过滤无效mode;
					return oneOf(mode, modeList);
				},
				default () {
					return "date"
				}
			},
			themeColor: {
				type: String,
				default () {
					return "#f5a200"
				}
			},
			startYear: {
				type: [String, Number],
				default () {
					return "1970"
				}
			},
			endYear: {
				type: [String, Number],
				default () {
					return new Date().getFullYear() + ''
				}
			},
			defaultVal: {
				type: Array,
				default () {
					const date = new Date();
					let year = date.getFullYear();
					let m = date.getMonth() + 1;
					let d = date.getDate();
					return '[' + year + ',' + m + ',' + d + ',00,00,00]';
				}
			},
			step: {
				type: [String, Number],
				default: 1
			},
			current: {
				type: Boolean,
				default: false
			},
			selectList: {
				type: Array,
				default () {
					return [];
				}
			},
		},
		watch: {
			mode() {
				this.initData();
			},
			selectList() {
				this.initData();
			},
			linkList() {
				this.initData();
			}
		},
		methods: {
			useCurrent() {
				let aToday = new Date();
				let tYear = aToday.getFullYear().toString();
				let tMonth = this.formatNum(aToday.getMonth() + 1).toString();
				let tDay = this.formatNum(aToday.getDate()).toString();
				let tHours = this.formatNum(aToday.getHours()).toString();
				let tMinutes = this.formatNum(aToday.getMinutes()).toString();
				let tSeconds = this.formatNum(aToday.getSeconds()).toString();
				if (this.current) {
					return [tYear, tMonth, tDay, tHours, (Math.floor(tMinutes / this.step) * this.step).toString(), tSeconds];
				} else {
					return this.defaultVal;
				}
			},
			formatNum(num) {
				return num < 10 ? '0' + num : num + '';
			},
			maskTap() {
				this.showPicker = false;
			},
			show() {
				this.showPicker = true;
			},
			hide() {
				this.showPicker = false;
			},
			pickerCancel() {
				this.$emit("cancel", {
					checkArr: this.checkArr,
					defaultVal: this.pickVal
				});
				this.showPicker = false;
			},
			pickerConfirm(e) {
				this.$emit("confirm", {
					checkArr: this.checkArr,
					defaultVal: this.pickVal,
					result: this.resultStr
				});
				this.showPicker = false;
			},
			bindChange(val) {
				let _this = this;
				let arr = val.detail.value;
				let year = "",
					month = "",
					day = "",
					hour = "",
					minute = "",
					second = "",
					note = [];
				let checkArr = _this.checkArr;
				let days = [];
				let months = [];
				let mode = _this.mode;
				let col1, col2, col3, d, a, h, m;
				switch (mode) {
					case "half":
						year = _this.data.years[arr[0]] || _this.data.years[_this.data.years.length - 1];
						month = _this.data.months[arr[1]] || _this.data.months[_this.data.months.length - 1];
						day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
						area = _this.data.areas[arr[3]] || _this.data.areas[_this.data.areas.length - 1];
						if (year != checkArr[0]) {
							arr[1] = 0;
							arr[2] = 0;
							days = initPicker.date.initDays(year, month, _this.disabledAfter);
							months = initPicker.date.initMonths(year, _this.disabledAfter);
							month = _this.data.months[arr[1]] || _this.data.months[_this.data.months.length - 1];
							day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
							_this.data.days = days;
							_this.data.months = months;
						};
						if (month != checkArr[1]) {
							arr[2] = 0;
							days = initPicker.date.initDays(year, month, _this.disabledAfter);
							day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
							_this.data.days = days;
						};
						_this.checkArr = [year, month, day, area];
						_this.resultStr = `${year+'-'+month+'-'+day+area.label}`;
						break;
					case "date":
						year = _this.data.years[arr[0]] || _this.data.years[_this.data.years.length - 1];
						month = _this.data.months[arr[1]] || _this.data.months[_this.data.months.length - 1];
						day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
						if (year != checkArr[0]) {
							arr[1] = 0;
							arr[2] = 0;
							days = initPicker.date.initDays(year, month, _this.disabledAfter);
							months = initPicker.date.initMonths(year, _this.disabledAfter);
							month = _this.data.months[arr[1]] || _this.data.months[_this.data.months.length - 1];
							day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
							_this.data.days = days;
							_this.data.months = months;
						};
						if (month != checkArr[1]) {
							arr[2] = 0;
							days = initPicker.date.initDays(year, month, _this.disabledAfter);
							day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
							_this.data.days = days;
						};
						_this.checkArr = [year, month, day];
						_this.resultStr = `${year+'-'+month+'-'+day}`;
						break;
					case "dateTime":
						year = _this.data.years[arr[0]] || _this.data.years[_this.data.years.length - 1];
						month = _this.data.months[arr[1]] || _this.data.months[_this.data.months.length - 1];
						day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
						console.log(_this.data.days[_this.data.days.length - 1]);
						hour = _this.data.hours[arr[3]] || _this.data.hours[_this.data.hours.length - 1];
						minute = _this.data.minutes[arr[4]] || _this.data.minutes[_this.data.minutes.length - 1];
						second = _this.data.seconds[arr[5]] || _this.data.seconds[_this.data.seconds.length - 1];
						if (year != checkArr[0]) {
							arr[2] = 0;
							days = initPicker.date.initDays(year, month);
							day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
							_this.data.days = days;
						};
						if (month != checkArr[1]) {
							arr[2] = 0;
							days = initPicker.date.initDays(year, month);
							day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
							_this.data.days = days;
						};
						_this.checkArr = [year, month, day, hour, minute, second];
						_this.resultStr = `${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`;
						break;
					case "dateTime1":
						year = _this.data.years[arr[0]] || _this.data.years[_this.data.years.length - 1];
						month = _this.data.months[arr[1]] || _this.data.months[_this.data.months.length - 1];
						day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
						hour = _this.data.hours[arr[3]] || _this.data.hours[_this.data.hours.length - 1];
						minute = _this.data.minutes[arr[4]] || _this.data.minutes[_this.data.minutes.length - 1];
						second = _this.data.seconds[arr[5]] || _this.data.seconds[_this.data.seconds.length - 1];
						if (year != checkArr[0]) {
							arr[2] = 0;
							days = initPicker.date.initDays(year, month);
							day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
							_this.data.days = days;
						};
						if (month != checkArr[1]) {
							arr[2] = 0;
							days = initPicker.date.initDays(year, month);
							day = _this.data.days[arr[2]] || _this.data.days[_this.data.days.length - 1];
							_this.data.days = days;
						};
						_this.checkArr = [year, month, day, hour, minute, second];
						_this.resultStr = `${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`;
						break;
				}
				_this.$nextTick(() => {
					_this.pickVal = arr;
				})
			},
			initData() {
				let _this = this;
				let data = {};
				let mode = _this.mode;
				let year, month, day, hour, minute, second, province, city, area;
				let col1, col2, col3;
				let dVal = [];
				data = initPicker.date.init(_this.startYear, _this.endYear, _this.mode, _this.step, _this.useCurrent(), _this.current,
					_this.disabledAfter);
				dVal = data.defaultVal || _this.defaultVal;
				_this.data = data;
				switch (mode) {
					case "half":
						year = data.years[dVal[0]] || data.years[data.years.length - 1];
						month = data.months[dVal[1]] || data.months[data.months.length - 1];
						day = data.days[dVal[2]] || data.days[data.days.length - 1];
						area = data.areas[dVal[3]] || data.areas[data.areas.length - 1];
						_this.checkArr = [year, month, day, area];
						_this.resultStr = `${year+'-'+month+'-'+day+' '+area.label}`;
						break;
					case "date":
						year = data.years[dVal[0]] || data.years[data.years.length - 1];
						month = data.months[dVal[1]] || data.months[data.months.length - 1];
						day = data.days[dVal[2]] || data.days[data.days.length - 1];
						_this.checkArr = [year, month, day];
						_this.resultStr = `${year+'-'+month+'-'+day}`;
						break;
					case "dateTime":
						year = data.years[dVal[0]] || data.years[data.years.length - 1];
						month = data.months[dVal[1]] || data.months[data.months.length - 1];
						day = data.days[dVal[2]] || data.days[data.days.length - 1];
						hour = data.hours[dVal[3]] || data.hours[data.hours.length - 1];
						minute = data.minutes[dVal[4]] || data.minutes[data.minutes.length - 1];
						second = data.seconds[dVal[5]] || data.seconds[data.seconds.length - 1];
						_this.resultStr = `${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`;
						_this.checkArr = [year, month, day, hour, minute];
						break;
					case "dateTime1":
						year = data.years[dVal[0]] || data.years[data.years.length - 1];
						month = data.months[dVal[1]] || data.months[data.months.length - 1];
						day = data.days[dVal[2]] || data.days[data.days.length - 1];
						hour = data.hours[dVal[3]] || data.hours[data.hours.length - 1];
						minute = data.minutes[dVal[4]] || data.minutes[data.minutes.length - 1];
						second = data.seconds[dVal[5]] || data.seconds[data.seconds.length - 1];
						_this.resultStr = `${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`;
						_this.checkArr = [year, month, day, hour, minute];
						break;
				}
				_this.$nextTick(() => {
					_this.pickVal = dVal;
				})
			}
		},
		mounted() {
			this.initData();
		}
	}
</script>

<style lang="scss">
	.w-picker {
		position: relative;
		z-index: 888;

		.mask {
			position: fixed;
			z-index: 1000;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.6);
			visibility: hidden;
			opacity: 0;
			transition: all 0.3s ease;
		}

		.mask.show {
			visibility: visible;
			opacity: 1;
		}

		.w-picker-cnt {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			transition: all 0.3s ease;
			transform: translateY(100%);
			z-index: 3000;
		}

		.w-picker-cnt.show {
			transform: translateY(0);
		}

		.w-picker-hd {
			display: flex;
			align-items: center;
			padding: 0 30upx;
			height: 88upx;
			background-color: #fff;
			position: relative;
			text-align: center;
			font-size: 32upx;
			justify-content: space-between;

			.w-picker-btn {
				font-size: 30upx;
			}
		}

		.w-picker-hd:after {
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

		.w-picker-item {
			text-align: center;
			width: 100%;
			height: 88upx;
			line-height: 88upx;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 30upx;
		}

		.w-picker-view {
			width: 100%;
			height: 476upx;
			overflow: hidden;
			background-color: rgba(255, 255, 255, 1);
			z-index: 666;
		}

		picker-view {
			height: 100%;
		}
	}
</style>
