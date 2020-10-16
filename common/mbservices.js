/**
 * 验证为NULL
 */
var isEmpty = function(value) {
	if (value === undefined || value === null || value === "")
		return true;
	else
		return false;
}
module.exports = {
	/**
	 *判断是否是浮点型
	 * */
	"isFloat": function(value) {
		if (parseFloat(value).toString() === 'NaN') {
			return false;
		}
		return true;
	},
	/**
	 * 验证是否是Int类型
	 **/
	"isInt": function(value) {
		console.log(parseInt(value).toString());
		if (parseInt(value).toString() === 'NaN') {
			return false;
		}
		return true;
	},
	/**
	 *判断是否为空
	 * */
	"isEmpty": function(value) {
		if (value === undefined || value === null || value === "")
			return true;
		else
			return false;
	},
	/**
	 *设置数据存储
	 * */
	"setStorageInfo": function(key, data, callback) {
		uni.setStorage({
			key: key,
			data: data,
			success: function(result) {
				if (callback) {
					callback(result);
				}
			},
			fail: function(result) {
				if (callback) {
					callback(result);
				}
			}
		});
	},
	/** 
	 * 获取存储数据
	 */
	"getStorageInfo": function(key, callback) {
		uni.getStorage({
			key: key,
			success: function(result) {
				if (callback) {
					callback(result)
				}
			},
			fail: function(result) {
				if (callback) {
					callback(result)
				}
			}
		})
	},
	/** 
	 * 验证AccessToken是否过期
	 */
	"validateAccessToken": function(key, callback) {
		//无身份信息
		if (isEmpty(uni.getStorageSync(key))) {
			if (callback) {
				callback({
					//retData: {},
					retStatus: false
				});
			} else {
				return false;
			}
		} else {
			//token的过期日期 大于 现在
			if (new Date(uni.getStorageSync(key)['.expires']) > new Date()) {
				if (callback) {
					callback({
						//retData: uni.getStorageSync(key),
						retStatus: true
					});
				} else {
					return true;
				}
			} else {
				uni.clearStorageSync(key)
				if (callback) {
					callback({
						//retData: {},
						retStatus: false
					});
				} else {
					return false;
				}
			}
		}
	},
	/** 
	 * 无回调验证AccessToken过期
	 */
	"validateAccessTokenSync": function(key) {
		if (isEmpty(uni.getStorageSync(key))) {
			return false;
		} else {
			//token的过期日期 大于 现在
			if (new Date(uni.getStorageSync(key)['.expires']) > new Date()) {
				return true;
			} else {
				return false;
			}
		}
	},
	/**
	 * 获取组织架构TreeList
	 */
	"getOrgTreeList": function() {
		return uni.getStorageSync('orgTreeList');
	},
	/**
	 * 提交请求
	 */
	"Request": function(url, method, data, success, fail) {
		if (!this.validateAccessTokenSync('JSUserInfo')) {
			/* uni.reLaunch({
				url: '/pages/login/login'
			}) */
			uni.reLaunch({
				url: '/pages/tabBar/firstPage/firstPage'
			})
			return false;
		}
		uni.request({
			url: url,
			method: method,
			header: {
				"Authorization": "bearer " + uni.getStorageSync('JSUserInfo').access_token
			},
			data: data,
			success: function(ret) {
				success(ret);
			},
			fail: function(ret) {
				fail(ret);
			}

		})
	},
	/**
	 * 小写数字转大写汉字
	 */
	"smalltoBIG": function(value) {
		var _cache = parseFloat(value).toFixed(2);
		/*小写转大写*/
		var fraction = ['角', '分'];
		var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
		var unit = [
			['元', '万', '亿'],
			['', '拾', '佰', '仟']
		];
		var head = _cache < 0 ? '欠' : '';
		_cache = Math.abs(_cache);
		var s = '';
		for (var i = 0; i < fraction.length; i++) {
			s += (digit[Math.floor(_cache * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
		}
		s = s || '整';
		_cache = Math.floor(_cache);
		for (var i = 0; i < unit[0].length && _cache > 0; i++) {
			var p = '';
			for (var j = 0; j < unit[1].length && _cache > 0; j++) {
				p = digit[_cache % 10] + unit[1][j] + p;
				_cache = Math.floor(_cache / 10);
			}
			s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
		}
		return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
	},
	/**
	 * 指定日期加、减天数 
	 * date:基准日期
	 * days:加减天数
	 * type:1、加日期	2、减日期
	 */
	"calcJiaJianDays": function(date, days, type) {
		var d = new Date(date);
		if (date.toString().lastIndexOf('-') > 0) {
			d = new Date(date.toString().replace(/\-/g, "/"));
		}
		d = d.valueOf();
		if (type === 1) {
			d = d + (days * 24 * 60 * 60 * 1000);
		}
		if (type === 2) {
			d = d - (days * 24 * 60 * 60 * 1000);
		}
		return this.formatDateTime(new Date(d), 'yyyy-MM-dd');
	},
	/**
	 * 计算两个时间的时间差
	 */
	"calcuDateLong": function(sdate, edate, callback) {
		if (!sdate) {
			uni.showToast({
				title: '开始时间为空',
				icon: 'none'
			});
			if (callback) {
				callback({
					status: false,
					data: ""
				});
				return false;
			}
		}
		if (!edate) {
			uni.showToast({
				title: '结束时间为空',
				icon: 'none'
			});
			if (callback) {
				callback({
					status: false,
					data: ""
				});
				return false;
			}
		}
		var stime = Date.parse(new Date(sdate));
		var etime = Date.parse(new Date(edate));
		if (etime < stime) {
			uni.showToast({
				title: '结束时间小于开始时间',
				icon: 'none'
			})
			if (callback) {
				console.log('能进来');
				callback({
					status: false,
					data: ""
				});
				return false;
			}
		}
		var usedTime = etime - stime; //两个时间戳相差的毫秒数
		var days = Math.floor(usedTime / (24 * 3600 * 1000));

		//计算出小时数
		var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
		var hours = Math.floor(leave1 / (3600 * 1000));

		//计算相差分钟数
		var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
		var minutes = Math.floor(leave2 / (60 * 1000));

		var _hour = parseFloat(usedTime / (3600 * 1000)).toFixed(1); //    Math.floor(usedTime / (3600 * 1000));

		var time = ""; //days + "天" + hours + "时" + minutes + "分";
		if (days > 0) {
			time += days + "天"
		}
		if (hours > 0) {
			time += hours + "小时"
		}
		if (minutes > 0) {
			time += minutes + "分钟"
		}
		if (callback) {
			callback({
				status: true,
				data: time,
				datenum: usedTime,
				allhour: _hour
			});
		}
	},
	/**
	 * 日期、时间格式化
	 */
	"formatDateTime": function(date, fmt) { //author: meizz   
		var d = new Date(date);
		if (date.toString().lastIndexOf('-') > 0) {
			if (date.toString().lastIndexOf('.') > 0) {
				date = date.toString().substr(0, date.toString().length - 4)
			}
			d = new Date(date.toString().replace(/\-/g, "/"));
		}
		var o = {
			"M+": d.getMonth() + 1, //月份   
			"d+": d.getDate(), //日   
			"h+": d.getHours(), //小时   
			"m+": d.getMinutes(), //分   
			"s+": d.getSeconds(), //秒   
			"q+": Math.floor((d.getMonth() + 3) / 3), //季度
			"S": d.getMilliseconds() //毫秒   
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	/**
	 * 生成单据编码
	 */
	"getEntityNum": function() {
		var d = new Date();
		var month = d.getMonth() + 1;
		var day = d.getDate();
		var hour = d.getHours();
		var minutes = d.getMinutes();
		var Seconds = d.getSeconds();
		var num = d.getFullYear() + (month > 9 ? month : '0' + month) + (day > 9 ? day : '0' + day) + (hour > 9 ? hour :
			'0' + hour) + (minutes > 9 ? minutes : '0' + minutes) + (Seconds > 9 ? Seconds : '0' + Seconds) + (Math.ceil(Math
			.random() * 10)) + (Math.ceil(Math.random() * 10)) + (Math.ceil(Math.random() * 10)) + (Math.ceil(Math.random() *
			10));
		return num;
	},
	/*
        转base64
    */
	"Base64Encode": function(str) {
		var c1, c2, c3;
		var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var i = 0,
			len = str.length,
			string = '';

		while (i < len) {
			c1 = str.charCodeAt(i++) & 0xff;
			if (i === len) {
				string += base64EncodeChars.charAt(c1 >> 2);
				string += base64EncodeChars.charAt((c1 & 0x3) << 4);
				string += "==";
				break;
			}
			c2 = str.charCodeAt(i++);
			if (i === len) {
				string += base64EncodeChars.charAt(c1 >> 2);
				string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
				string += base64EncodeChars.charAt((c2 & 0xF) << 2);
				string += "=";
				break;
			}
			c3 = str.charCodeAt(i++);
			string += base64EncodeChars.charAt(c1 >> 2);
			string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
			string += base64EncodeChars.charAt(c3 & 0x3F);
		}
		return string;
	},
	/**
	 * 列表页判断是否刷新
	 */
	"getIsRefresh": function() {
		if ((uni.getStorageSync("canrefresh") === 'true' || uni.getStorageSync("canrefresh") === true) && uni.getStorageSync(
				"canrefresh") !== undefined && uni.getStorageSync(
				"canrefresh") !== '') {
			return true;
		}
		return false;
	},
	/**
	 *设置列表页控制刷新  
	 **/
	"setIsRefresh": function(val) {
		uni.setStorageSync("canrefresh", val);
	}
}
