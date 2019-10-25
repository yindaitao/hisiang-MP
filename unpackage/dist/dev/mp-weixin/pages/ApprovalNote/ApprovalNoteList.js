(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/ApprovalNote/ApprovalNoteList"],{

/***/ 210:
/*!****************************************************************************************************!*\
  !*** F:/xiaochengxuquan/SmartOffice.MP/main.js?{"page":"pages%2FApprovalNote%2FApprovalNoteList"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _ApprovalNoteList = _interopRequireDefault(__webpack_require__(/*! ./pages/ApprovalNote/ApprovalNoteList.vue */ 211));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_ApprovalNoteList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 211:
/*!*********************************************************************************!*\
  !*** F:/xiaochengxuquan/SmartOffice.MP/pages/ApprovalNote/ApprovalNoteList.vue ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ApprovalNoteList_vue_vue_type_template_id_7b619f7a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApprovalNoteList.vue?vue&type=template&id=7b619f7a& */ 212);
/* harmony import */ var _ApprovalNoteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ApprovalNoteList.vue?vue&type=script&lang=js& */ 214);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ApprovalNoteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ApprovalNoteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 14);





/* normalize component */

var component = Object(_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ApprovalNoteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ApprovalNoteList_vue_vue_type_template_id_7b619f7a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ApprovalNoteList_vue_vue_type_template_id_7b619f7a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "F:/xiaochengxuquan/SmartOffice.MP/pages/ApprovalNote/ApprovalNoteList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 212:
/*!****************************************************************************************************************!*\
  !*** F:/xiaochengxuquan/SmartOffice.MP/pages/ApprovalNote/ApprovalNoteList.vue?vue&type=template&id=7b619f7a& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ApprovalNoteList_vue_vue_type_template_id_7b619f7a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ApprovalNoteList.vue?vue&type=template&id=7b619f7a& */ 213);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ApprovalNoteList_vue_vue_type_template_id_7b619f7a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ApprovalNoteList_vue_vue_type_template_id_7b619f7a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 213:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/xiaochengxuquan/SmartOffice.MP/pages/ApprovalNote/ApprovalNoteList.vue?vue&type=template&id=7b619f7a& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 214:
/*!**********************************************************************************************************!*\
  !*** F:/xiaochengxuquan/SmartOffice.MP/pages/ApprovalNote/ApprovalNoteList.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ApprovalNoteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ApprovalNoteList.vue?vue&type=script&lang=js& */ 215);
/* harmony import */ var _E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ApprovalNoteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ApprovalNoteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ApprovalNoteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ApprovalNoteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_HBuilderX_1_9_9_20190522_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ApprovalNoteList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 215:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/xiaochengxuquan/SmartOffice.MP/pages/ApprovalNote/ApprovalNoteList.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var callback = function callback() {return __webpack_require__.e(/*! import() | pages/components/callback/callback */ "pages/components/callback/callback").then(__webpack_require__.bind(null, /*! ../components/callback/callback.vue */ 278));};var uniLoadMore = function uniLoadMore() {return __webpack_require__.e(/*! import() | components/uni-load-more/uni-load-more */ "components/uni-load-more/uni-load-more").then(__webpack_require__.bind(null, /*! @/components/uni-load-more/uni-load-more.vue */ 283));};var fabTag = function fabTag() {return __webpack_require__.e(/*! import() | components/uni-fab-tag/uni-fab-tag */ "components/uni-fab-tag/uni-fab-tag").then(__webpack_require__.bind(null, /*! @/components/uni-fab-tag/uni-fab-tag.vue */ 290));};var _default =




































































































































































































































{
  components: {
    uniLoadMore: uniLoadMore,
    fabTag: fabTag,
    callback: callback },

  data: function data() {
    return {
      backFrom: "ApprovalNoteList",
      from: "",
      index: 0,
      picker: ["姓名", "审单号", "单据号"],
      CustomBar: this.CustomBar,
      loadMoreOption: {
        status: "loading",
        showIcon: true },

      loadingText: {
        contentdown: "上拉显示更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多数据了" },

      tabBars: [
      {
        id: 1,
        name: "待审核",
        approvalstatus: "Pending",
        num: 0 },

      {
        id: 2,
        name: "已审批",
        approvalstatus: "Approved",
        num: 0 },

      {
        id: 3,
        name: "已拒绝",
        approvalstatus: "Rejected",
        num: 0 }],


      checkbox: [
      {
        value: 0,
        name: "普通报销",
        checked: false,
        hot: false },

      {
        value: 1,
        name: "差旅费报销",
        checked: false,
        hot: false },

      {
        value: 2,
        name: "借款申请",
        checked: false,
        hot: false },

      {
        value: 3,
        name: "还款申请",
        checked: false,
        hot: false },

      {
        value: 4,
        name: "预支报销",
        checked: false,
        hot: false }],


      SearchConditions: [],
      TabCur: 0,
      tabIndex: 0,
      pageIndex: 1,
      pageNum: "0/0",
      showList: [],
      KeyValues: "",
      showList4Approved: [],
      showList4Pending: [],
      showList4Rejected: [],
      newsitems: [],
      scrollLeft: 0,
      modalName: null,
      modalNameSearch: null,
      scrollBarHeight: 0,
      isClickChange: false,
      refreshRowCOunt: 0 };

  },
  onShow: function onShow(e) {
    if (this.$mbservices.getIsRefresh()) {
      this.newsitems[this.TabCur].pageIndex = 0;
      this.newsitems[this.TabCur].status = "more";
      this.newsitems[this.TabCur].loadingText = "more";
      this.newsitems[this.TabCur].pageRecordCount = "0";
      this.newsitems[this.TabCur].data = [];
      if (this.TabCur === 0) {
        this.getApprovalList({
          FieldName: "ApproveStatus",
          Operation: "EQUAL",
          ConditionValue: "P" });

      }
      this.$mbservices.setIsRefresh(false);
    }
  },
  methods: {
    PickerChange: function PickerChange(e) {
      this.index = e.detail.value;
    },
    ChooseCheckbox: function ChooseCheckbox(e) {
      var items = this.checkbox,
      values = e.currentTarget.dataset.value;
      for (var i = 0, lenI = items.length; i < lenI; ++i) {
        if (items[i].value == values) {
          items[i].checked = !items[i].checked;
          break;
        }
      }
    },
    showModalSearch: function showModalSearch(e) {
      this.modalNameSearch = e.currentTarget.dataset.target;
    },
    hideModalSearch: function hideModalSearch(e) {
      this.modalNameSearch = null;
    },
    resetConditions: function resetConditions() {
      this.KeyValues = "";
      this.checkbox.forEach(function (item) {
        item.checked = false;
      });
      this.newsitems[this.TabCur].SearchConditions = [];
      //this.modalNameSearch = null;
    },
    inputValues: function inputValues(event) {
      this.KeyValues = event.detail.value;
    },
    doSearchApprovalList: function doSearchApprovalList() {
      var cons = [];
      //验证关键字
      if (!this.$mbservices.isEmpty(this.KeyValues)) {
        if (this.index > 0) {
          if (!this.$mbservices.isInt(this.KeyValues)) {
            uni.showToast({
              title: "请输入数字类型",
              icon: "none" });

            return false;
          }
        }
        if (parseInt(this.index) === 0) {
          cons.push({
            FieldName: "OriginatorName",
            Operation: "EQUAL",
            ConditionValue: this.KeyValues,
            Relationship: "AND" });

        }
        if (parseInt(this.index) === 1) {
          cons.push({
            FieldName: "DocEntry",
            Operation: "EQUAL",
            ConditionValue: this.KeyValues,
            Relationship: "AND" });

        }
        if (parseInt(this.index) === 2) {
          cons.push({
            FieldName: "BusinessOrderNo",
            Operation: "EQUAL",
            ConditionValue: this.KeyValues,
            Relationship: "AND" });

        }
      }
      var CheckedArray = [];
      this.checkbox.forEach(function (item) {
        if (item.checked) {
          CheckedArray.push(item);
        }
      });
      //验证分类
      CheckedArray.forEach(function (item, index) {
        if (index === 0 && CheckedArray.length !== 1) {
          if (item.value === 0) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "ReimbursementRequest",
              Relationship: "OR",
              BracketOpenNum: "1" });

          }
          if (item.value === 1) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "BusinesstravelRequest",
              Relationship: "OR",
              BracketOpenNum: "1" });

          }
          if (item.value === 2) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "BorrowRequest",
              Relationship: "OR",
              BracketOpenNum: "1" });

          }
          if (item.value === 3) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "RepaymentRequest",
              Relationship: "OR",
              BracketOpenNum: "1" });

          }
          if (item.value === 4) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "AdvancePayRequest",
              Relationship: "OR",
              BracketOpenNum: "1" });

          }
        } else if (index === 0 && CheckedArray.length === 1) {
          if (item.value === 0) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "ReimbursementRequest",
              Relationship: "AND" });

          }
          if (item.value === 1) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "BusinesstravelRequest",
              Relationship: "AND" });

          }
          if (item.value === 2) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "BorrowRequest",
              Relationship: "AND" });

          }
          if (item.value === 3) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "RepaymentRequest",
              Relationship: "AND" });

          }
          if (item.value === 4) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "AdvancePayRequest",
              Relationship: "AND" });

          }
        } else if (
        index === CheckedArray.length - 1 &&
        CheckedArray.length !== 1)
        {
          if (item.value === 0) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "ReimbursementRequest",
              Relationship: "AND",
              BracketCloseNum: "1" });

          }
          if (item.value === 1) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "BusinesstravelRequest",
              Relationship: "AND",
              BracketCloseNum: "1" });

          }
          if (item.value === 2) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "BorrowRequest",
              Relationship: "AND",
              BracketCloseNum: "1" });

          }
          if (item.value === 3) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "RepaymentRequest",
              Relationship: "AND",
              BracketCloseNum: "1" });

          }
          if (item.value === 4) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "AdvancePayRequest",
              Relationship: "AND",
              BracketCloseNum: "1" });

          }
        } else {
          if (item.value === 0) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "ReimbursementRequest",
              Relationship: "OR" });

          }
          if (item.value === 1) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "BusinesstravelRequest",
              Relationship: "OR" });

          }
          if (item.value === 2) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "BorrowRequest",
              Relationship: "OR" });

          }
          if (item.value === 3) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "RepaymentRequest",
              Relationship: "OR" });

          }
          if (item.value === 4) {
            cons.push({
              FieldName: "BusinessType",
              Operation: "EQUAL",
              ConditionValue: "AdvancePayRequest",
              Relationship: "OR" });

          }
        }
      });
      //Tab页
      if (this.TabCur === 0) {
        cons.push({
          FieldName: "ApproveStatus",
          Operation: "EQUAL",
          ConditionValue: "P" });

      }
      if (this.TabCur === 1) {
        cons.push({
          FieldName: "ApproveStatus",
          Operation: "EQUAL",
          ConditionValue: "A" });

      }
      if (this.TabCur === 2) {
        cons.push({
          FieldName: "ApproveStatus",
          Operation: "EQUAL",
          ConditionValue: "R" });

      }
      this.newsitems[this.TabCur].status = "loading";
      this.newsitems[this.TabCur].loadingText = "loading";
      this.newsitems[this.TabCur].pageIndex = 0;
      this.newsitems[this.TabCur].SearchConditions = cons;
      this.newsitems[this.TabCur].data = [];
      this.getApprovalList();
      this.modalNameSearch = null;
    },
    doRefresh: function doRefresh() {
      this.newsitems[this.TabCur].data = [];
      this.newsitems[this.TabCur].SearchConditions = [];
      this.newsitems[this.TabCur].pageIndex = 0;
      this.newsitems[this.TabCur].status = "loading";
      this.newsitems[this.TabCur].loadingText === "loading";
      if (this.TabCur === 0) {
        this.getApprovalList({
          FieldName: "ApproveStatus",
          Operation: "EQUAL",
          ConditionValue: "P" });

      }
      if (this.TabCur === 1) {
        this.getApprovalList({
          FieldName: "ApproveStatus",
          Operation: "EQUAL",
          ConditionValue: "A" });

      }
      if (this.TabCur === 2) {
        this.getApprovalList({
          FieldName: "ApproveStatus",
          Operation: "EQUAL",
          ConditionValue: "R" });

      }
    },
    goDetail: function goDetail(item) {
      console.log(item.BBusinessType);
      //业务类型
      switch (item.BusinessType) {
        case "ReimbursementRequest": //报销申请
          uni.navigateTo({
            url:
            "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
              DocEntry: item.DocEntry,
              from: "ApprovalNoteList" }) });


          break;
        case "BusinesstravelRequest": //差旅报销申请
          uni.navigateTo({
            url:
            "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
              DocEntry: item.DocEntry,
              from: "ApprovalNoteList" }) });


          break;
        case "BorrowRequest": //借款申请
          uni.navigateTo({
            url:
            "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
              DocEntry: item.DocEntry,
              from: "ApprovalNoteList" }) });


          break;
        case "RepaymentRequest": //还款申请
          uni.navigateTo({
            url:
            "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
              DocEntry: item.DocEntry,
              from: "ApprovalNoteList" }) });


          break;
        case "AdvancePayRequest": //预支费用申请
          uni.navigateTo({
            url:
            "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
              DocEntry: item.DocEntry,
              from: "ApprovalNoteList" }) });


          break;
        default:
          //其他类型的申请
          uni.navigateTo({
            url:
            "/pages/ApprovalNote/ApprovalHandle?data=" + JSON.stringify({
              DocEntry: item.DocEntry,
              from: "ApprovalNoteList" }) });


          break;}

    },
    loadMore: function loadMore(e) {var _this2 = this;
      if (this.newsitems[this.TabCur].status === "nomore") {
        return false;
      }
      this.newsitems[e].loadingType = 0;
      this.newsitems[e].showIcon = true;
      this.newsitems[e].status = "loading";
      setTimeout(function () {
        if (_this2.TabCur === 0) {
          _this2.getApprovalList({
            FieldName: "ApproveStatus",
            Operation: "EQUAL",
            ConditionValue: "P" });

        }
        if (_this2.TabCur === 1) {
          _this2.getApprovalList({
            FieldName: "ApproveStatus",
            Operation: "EQUAL",
            ConditionValue: "A" });

        }
        if (_this2.TabCur === 2) {
          _this2.getApprovalList({
            FieldName: "ApproveStatus",
            Operation: "EQUAL",
            ConditionValue: "R" });

        }
      }, 1200);
    },
    changeTab: function () {var _changeTab = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {var index;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                index = e.detail.current;
                this.TabCur = index;
                this.scrollLeft = (this.TabCur - 1) * 60;
                this.pageNum =
                this.newsitems[this.TabCur].data.length +
                "/" +
                this.newsitems[this.TabCur].pageRecordCount;if (!(
                this.newsitems[this.TabCur].data.length > 0)) {_context.next = 6;break;}return _context.abrupt("return",
                false);case 6:

                this.newsitems[this.TabCur].status = "loading";
                this.newsitems[this.TabCur].loadingText = "loading";if (!(
                this.newsitems[this.TabCur].SearchConditions.length > 0)) {_context.next = 11;break;}
                this.getApprovalList();return _context.abrupt("return",
                false);case 11:

                if (this.TabCur === 0) {
                  this.getApprovalList({
                    FieldName: "ApproveStatus",
                    Operation: "EQUAL",
                    ConditionValue: "P" });

                }
                if (this.TabCur === 1) {
                  this.getApprovalList({
                    FieldName: "ApproveStatus",
                    Operation: "EQUAL",
                    ConditionValue: "A" });

                }
                if (this.TabCur === 2) {
                  this.getApprovalList({
                    FieldName: "ApproveStatus",
                    Operation: "EQUAL",
                    ConditionValue: "R" });

                }return _context.abrupt("return",
                false);case 15:case "end":return _context.stop();}}}, _callee, this);}));function changeTab(_x) {return _changeTab.apply(this, arguments);}return changeTab;}(),

    getElSize: function getElSize(id) {
      //得到元素的size
      return new Promise(function (res, rej) {
        uni.createSelectorQuery().
        select("#" + id).
        fields(
        {
          size: true,
          scrollOffset: true },

        function (data) {
          res(data);
        }).

        exec();
      });
    },
    tapTab: function () {var _tapTab = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(index, e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!(

                this.tabIndex === index)) {_context2.next = 4;break;}return _context2.abrupt("return",
                false);case 4:

                this.tabIndex = index;
                this.TabCur = e.currentTarget.dataset.id;
                this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
                //this.newsitems[this.TabCur].status = "loading";
                //this.newsitems[this.TabCur].loadingText = "loading";
                //this.pageNum = this.newsitems[this.TabCur].data.length + '/' + this.newsitems[this.TabCur].pageRecordCount;
              case 7:case "end":return _context2.stop();}}}, _callee2, this);}));function tapTab(_x2, _x3) {return _tapTab.apply(this, arguments);}return tapTab;}(),

    getApprovalList: function getApprovalList(params) {var _this3 = this;
      var cons = [
      {
        FieldName: "Canceled",
        Operation: "EQUAL",
        ConditionValue: "N",
        Relationship: "AND" }];


      if (!this.$mbservices.isEmpty(params)) {
        cons.push(params);
      }
      var ajaxJSON = {
        pageIndex: parseInt(this.newsitems[this.TabCur].pageIndex) + 1,
        rowsPerPage: "10",
        type: "Initialize",
        Parameter: {
          Sorts: [
          {
            FieldName: "DocEntry",
            type: "Descending" }],


          LoadChildren: "NoLoad",
          Conditions:
          this.newsitems[this.TabCur].SearchConditions.length > 0 ?
          this.newsitems[this.TabCur].SearchConditions :
          cons } };


      this.$mbservices.Request(
      this.$webapi.getApprovalNotesList,
      "POST",
      ajaxJSON,
      function (res) {
        if (res.data.RecordCount > 0) {
          if (
          _this3.newsitems[_this3.TabCur].data.length >=
          res.data.RecordCount)
          {
            _this3.newsitems[_this3.TabCur].loadingText = "nomore";
            _this3.newsitems[_this3.TabCur].status = "nomore";
            _this3.newsitems[_this3.TabCur].showIcon = false;
            return;
          }
          res.data.data.forEach(function (item) {
            //审批状态
            switch (item.ApproveStatus) {
              case "Pending":
                item.AApproveStatus = "待审核";
                break;
              case "Approved":
                item.AApproveStatus = "已批准";
                break;
              case "Rejected":
                item.AApproveStatus = "已拒绝";
                break;}

            //业务类型
            switch (item.BusinessType) {
              case "ReimbursementRequest":
                item.BBusinessType = "普通报销";
                break;
              case "BusinesstravelRequest":
                item.BBusinessType = "差旅费报销";
                break;
              case "BorrowRequest":
                item.BBusinessType = "借款申请";
                break;
              case "RepaymentRequest":
                item.BBusinessType = "还款申请";
                break;
              case "AdvancePayRequest":
                item.BBusinessType = "预支报销申请";
                break;
              default:
                item.BBusinessType = item.BusinessTypeName;
                break;}

            item.Amount =
            parseFloat(item.Amount).toString() === "NaN" ?
            0.0 :
            item.Amount.toFixed(2);
            //this.showList.push(item);
            _this3.newsitems[_this3.TabCur].data.push(item);
          });
          _this3.tabBars[_this3.TabCur].num = _this3.newsitems[
          _this3.TabCur].
          data.length;
          _this3.newsitems[_this3.TabCur].pageIndex =
          parseInt(_this3.newsitems[_this3.TabCur].pageIndex) + 1;
          _this3.newsitems[_this3.TabCur].showIcon = false;
          if (
          _this3.newsitems[_this3.TabCur].data.length >=
          res.data.RecordCount)
          {
            _this3.newsitems[_this3.TabCur].loadingText = "nomore";
            _this3.newsitems[_this3.TabCur].status = "nomore";
          } else {
            _this3.newsitems[_this3.TabCur].status = "more";
          }
          _this3.pageNum =
          _this3.newsitems[_this3.TabCur].data.length +
          "/" +
          res.data.RecordCount;
          _this3.newsitems[_this3.TabCur].pageRecordCount =
          res.data.RecordCount + "";
        }
      },
      function (err) {});

    },
    randomfn: function randomfn() {
      var ary = [];
      for (var i = 0, length = this.tabBars.length; i < length; i++) {
        var aryItem = {
          status: "more",
          showIcon: true,
          pageIndex: 0,
          pageRecordCount: "0",
          loadingType: 0,
          loadingText: "more",
          SearchConditions: [],
          data: [] };

        ary.push(aryItem);
      }
      return ary;
    } },

  onLoad: function onLoad(e) {
    this.from = JSON.parse(e.data).from;

    var query = wx.createSelectorQuery();
    query.select("#_tabBar").boundingClientRect();
    query.selectViewport().scrollOffset();
    var _this = this;
    query.exec(function (res) {
      res[0].top; // #the-id节点的上边界坐标
      res[1].scrollTop; // 显示区域的竖直滚动位置
      _this.scrollBarHeight =
      uni.getSystemInfoSync().screenHeight -
      _this.CustomBar -
      res[0].height;
    });

    this.newsitems = this.randomfn();
    if (this.TabCur === 0) {
      this.getApprovalList({
        FieldName: "ApproveStatus",
        Operation: "EQUAL",
        ConditionValue: "P" });

    }
    if (this.TabCur === 1) {
      this.getApprovalList({
        FieldName: "ApproveStatus",
        Operation: "EQUAL",
        ConditionValue: "A" });

    }
    if (this.TabCur === 2) {
      this.getApprovalList({
        FieldName: "ApproveStatus",
        Operation: "EQUAL",
        ConditionValue: "R" });

    }
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

},[[210,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ApprovalNote/ApprovalNoteList.js.map