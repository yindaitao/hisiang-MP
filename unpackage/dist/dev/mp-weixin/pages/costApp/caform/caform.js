(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/costApp/caform/caform"],{

/***/ 68:
/*!***************************************************************************************************************!*\
  !*** C:/MagicWork/OAUniApp/MiniProgramHR/SmartOffice.MP/main.js?{"page":"pages%2FcostApp%2Fcaform%2Fcaform"} ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _caform = _interopRequireDefault(__webpack_require__(/*! ./pages/costApp/caform/caform.vue */ 69));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_caform.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 69:
/*!******************************************************************************************!*\
  !*** C:/MagicWork/OAUniApp/MiniProgramHR/SmartOffice.MP/pages/costApp/caform/caform.vue ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _caform_vue_vue_type_template_id_60b263db___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./caform.vue?vue&type=template&id=60b263db& */ 70);
/* harmony import */ var _caform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./caform.vue?vue&type=script&lang=js& */ 72);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _caform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _caform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 14);





/* normalize component */

var component = Object(_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _caform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _caform_vue_vue_type_template_id_60b263db___WEBPACK_IMPORTED_MODULE_0__["render"],
  _caform_vue_vue_type_template_id_60b263db___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "MagicWork/OAUniApp/MiniProgramHR/SmartOffice.MP/pages/costApp/caform/caform.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 70:
/*!*************************************************************************************************************************!*\
  !*** C:/MagicWork/OAUniApp/MiniProgramHR/SmartOffice.MP/pages/costApp/caform/caform.vue?vue&type=template&id=60b263db& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_caform_vue_vue_type_template_id_60b263db___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./caform.vue?vue&type=template&id=60b263db& */ 71);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_caform_vue_vue_type_template_id_60b263db___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_caform_vue_vue_type_template_id_60b263db___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 71:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/MagicWork/OAUniApp/MiniProgramHR/SmartOffice.MP/pages/costApp/caform/caform.vue?vue&type=template&id=60b263db& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 72:
/*!*******************************************************************************************************************!*\
  !*** C:/MagicWork/OAUniApp/MiniProgramHR/SmartOffice.MP/pages/costApp/caform/caform.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_caform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../../Users/Administrator/Documents/Dev Tools/HBuilderX.1.6.2.20190220.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./caform.vue?vue&type=script&lang=js& */ 73);
/* harmony import */ var _Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_caform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_caform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_caform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_caform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Users_Administrator_Documents_Dev_Tools_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_caform_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 73:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/MagicWork/OAUniApp/MiniProgramHR/SmartOffice.MP/pages/costApp/caform/caform.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var abc = function abc() {return __webpack_require__.e(/*! import() | pages/components/uni-datetimepicker */ "pages/components/uni-datetimepicker").then(__webpack_require__.bind(null, /*! ../../components/uni-datetimepicker.vue */ 279));};var uniIcon = function uniIcon() {return __webpack_require__.e(/*! import() | components/uni-icon/uni-icon */ "components/uni-icon/uni-icon").then(__webpack_require__.bind(null, /*! ../../../components/uni-icon/uni-icon.vue */ 28));};













































































































var sourceType = [["camera"], ["album"], ["camera", "album"]];
var sizeType = [["compressed"], ["original"], ["compressed", "original"]];var _default =
{
  components: {
    //MxDatepicker,
    abc: abc,
    uniIcon: uniIcon },

  watch: {
    showValue: function showValue(val) {
      console.log(val);
    } },

  data: function data() {
    return {
      modalName: null,
      BaseExpendType: [],
      ExpentType: ["选项一", "选项二", "选项三"],
      indexExpentType: 0,
      PayType: ["支付宝支付", "微信支付", "银行转账", "现金支付"],
      indexPayType: 2,
      isDoSteps: false,
      editflag: false,
      showPicker: false,
      themeColor: "",
      radio: "radio1",
      invCompanys: [],
      /*图片*/
      imageList: [],
      sourceTypeIndex: 2,
      sourceType: ["拍照", "相册", "拍照或相册"],
      sizeTypeIndex: 2,
      sizeType: ["压缩", "原图", "压缩或原图"],
      countIndex: 8,
      count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      totalJine: "0.00",
      bigNum: "",
      itemData: {
        DocEntry: "",
        indexExpentType: 0,
        Amount: "",
        bigjine: "零",
        indexPayType: 2,
        AccountNumber: "",
        AcceptingUnit: "",
        PayType: "银行转账",
        Remarks: "",
        InvCompanyId: "",
        InvCompanyName: "请选择",
        invoicetext: "",
        pics: [] },

      editItem: {} };

  },
  computed: {},
  onLoad: function onLoad(e) {var _this2 = this;
    var _this = this;
    /* 所属公司 */
    this.getInvCompany();

    //获取支出分类
    var conds = [
    {
      FieldName: "Activated",
      Operation: "EQUAL",
      ConditionValue: "Y",
      Relationship: "AND" },

    {
      FieldName: "DataType",
      Operation: "EQUAL",
      ConditionValue: "S",
      Relationship: "AND" }];



    this.$mbservices.Request(
    this.$webapi.getExpendType,
    "POST",
    conds,
    function (res) {
      if (
      !_this.$mbservices.isEmpty(res.data) &&
      res.data.RecordCount > 0)
      {
        _this.ExpentType = [];
        _this.BaseExpendType = [];
        res.data.data.forEach(function (item) {
          _this.BaseExpendType.push(item);
          _this.ExpentType.push(item.ExpendTypeName);
        });
      }
    },
    function (err) {});


    /* 修改传递参数 */
    if (e.flag === "modify") {
      this.editflag = true;
    }
    if (this.editflag) {
      this.editItem = JSON.parse(e.data);
      this.getDetailData();
    }

    if (!this.editflag) {
      //最大编号
      this.$mbservices.Request(
      this.$webapi.maxNumExpendRequest,
      "GET",
      {},
      function (res) {
        _this2.itemData.DocEntry = res.data;
      },
      null);

    }
  },
  methods: {
    getInvCompany: function () {var _getInvCompany = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _this3 = this;var ajaxJSON;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                //invCompanys
                ajaxJSON = {
                  pageIndex: 1,
                  rowsPerPage: "10000",
                  type: "Initialize",
                  Parameter: {
                    LoadChildren: "NoLoad",
                    Conditions: [
                    {
                      FieldName: "Activated",
                      Operation: "EQUAL",
                      ConditionValue: "Y",
                      Relationship: "AND" },

                    {
                      FieldName: "OrganizationType",
                      Operation: "EQUAL",
                      ConditionValue: "B",
                      Relationship: "AND" }] } };




                this.$mbservices.Request(
                this.$webapi.getOrgList,
                "POST",
                ajaxJSON,
                function (res) {
                  if (res.data.RecordCount > 0) {
                    _this3.invCompanys = res.data.data;
                  }
                },
                function (err) {});case 2:case "end":return _context.stop();}}}, _callee, this);}));function getInvCompany() {return _getInvCompany.apply(this, arguments);}return getInvCompany;}(),


    selectOption: function selectOption(e) {},
    RadioChange: function RadioChange(e) {var _this4 = this;
      this.radio = e.detail.value;
      this.itemData.InvCompanyId = e.detail.value;
      //this.itemData.InvCompanyName=this.
      this.invCompanys.forEach(function (item) {
        if (item.Code === e.detail.value) {
          _this4.itemData.InvCompanyName = item.Name;
        }
      });
      console.log(e);
    },
    showModal1: function showModal1(e) {
      this.modalName = e.currentTarget.dataset.target;
    },
    getDetailData: function getDetailData() {
      this.pageIndex = parseInt(this.pageIndex) + 1;
      var ajaxJSON = {
        pageIndex: this.pageIndex,
        rowsPerPage: "10",
        type: "Initialize",
        Parameter: {
          LoadChildren: "Load",
          Conditions: [
          {
            FieldName: "DocEntry",
            Operation: "EQUAL",
            ConditionValue: this.editItem.DocEntry,
            Relationship: "AND" }] } };




      uni.showLoading({
        title: "拼命加载中..." });

      var _this = this;
      this.$mbservices.Request(
      this.$webapi.getExpendRequestList,
      "POST",
      ajaxJSON,
      function (ret) {
        if (!ret.data.data) {
          uni.showToast({
            title: "查无数据" });

          return false;
        }
        _this.itemData = ret.data.data[0];
        _this.totalJine = parseFloat(_this.itemData.Amount).toFixed(
        2);

        _this.BaseExpendType.forEach(function (_item, index) {
          if (
          _item.ExpendTypeCode ===
          _this.itemData.ExpendTypeCode)
          {
            _this.indexExpentType = index;
            _this.itemData.indexExpentType = index;
          }
        });
        _this.itemData.bigjine = _this.$mbservices.smalltoBIG(
        _this.itemData.Amount);

        _this.PayType.forEach(function (_item, index) {
          if (_item === _this.itemData.PayType) {
            _this.indexPayType = index;
            _this.itemData.indexPayType = index;
          }
        });
        setTimeout(function () {
          uni.hideLoading();
        }, 1000);
      },
      function (ret) {
        uni.showToast({
          title: ret.errMsg,
          icon: "none",
          success: function success() {
            setTimeout(function () {
              uni.navigateBack();
            }, 1000);
          } });

      });

    },
    submitForm: function submitForm() {
      var _this = this;
      var ajaxJSON = {};
      uni.showLoading({
        title: "正在提交..." });

      if (_this.editflag) {
        _this.itemData.Approve = _this.isDoSteps ? "Y" : "N";
        _this.itemData.ExpendTypeCode =
        _this.BaseExpendType[_this.indexExpentType].ExpendTypeCode;
        _this.itemData.PayType = _this.itemData.PayType;
        _this.itemData.UIStatus = "Modify";
        ajaxJSON = _this.itemData;
      } else {
        ajaxJSON = {
          DocNum: _this.itemData.DocEntry,
          ObjType: "ExpendRequest",
          CreatorId: parseInt(
          uni.getStorageSync("JSUserInfo").UserId),

          Remarks: _this.itemData.Remarks,
          Approve: _this.isDoSteps ? "Yes" : "No",
          ApproveStatus: "Pending",
          Canceled: "No",
          Closed: "No",
          Amount: parseFloat(_this.itemData.Amount).toFixed(2),
          OrganizationCode: uni.getStorageSync("JSUserInfo").
          OrganizationCode,
          CompanyId: uni.getStorageSync("JSUserInfo").CompanyId,
          PayType: _this.itemData.PayType,
          AccountNumber: _this.itemData.AccountNumber,
          AcceptingUnit: _this.itemData.AcceptingUnit,
          ExpendTypeCode:
          _this.BaseExpendType[_this.indexExpentType].
          ExpendTypeCode,
          InvCompanyId: _this.itemData.InvCompanyId,
          UIStatus: "New" };

      }
      var requestUrl = _this.$webapi.submitExpendRequest;
      var _$this = _this;
      _this.$mbservices.Request(
      requestUrl,
      "POST",
      ajaxJSON,
      function (succ) {
        setTimeout(function () {
          uni.hideLoading();
        }, 1000);
        if (
        succ.data.RecordCount == undefined ||
        succ.data.RecordCount <= 0)
        {
          uni.showToast({
            title: "" + succ.data });

          return false;
        }
        uni.showToast({
          title: "成功" });

        _$this.$mbservices.setIsRefresh(true);
        uni.navigateBack({
          animationDuration: 500 });

      },
      function (err) {
        uni.showToast({
          title: "失败:" + err.data });

      });

    },
    onlySave: function onlySave() {
      this.modalName = null;
      this.isDoSteps = false;
      this.submitForm();
    },
    saveAndDoSteps: function saveAndDoSteps() {
      this.modalName = null;
      this.isDoSteps = true;
      this.submitForm();
    },
    inputNum: function inputNum(event) {
      this.itemData.Amount = event.detail.value;
      if (parseFloat(this.itemData.Amount).toFixed(2) > 0) {
        this.itemData.bigjine = this.$mbservices.smalltoBIG(
        this.itemData.Amount);

        this.totalJine = this.itemData.Amount;
      } else {
        this.itemData.bigjine = "零";
        this.totalJine = "";
      }
    },
    inputNum1: function inputNum1(event) {
      this.itemData.AccountNumber = event.detail.value;
    },
    inputNum2: function inputNum2(event) {
      this.itemData.AcceptingUnit = event.detail.value;
    },
    textareaInput: function textareaInput(e) {
      this.itemData.Remarks = e.detail.value;
    },
    hideModal: function hideModal(e) {
      this.modalName = null;
    },
    showModal: function showModal(e) {
      if (this.$mbservices.isEmpty(this.itemData.InvCompanyId)) {
        uni.showToast({
          title: "请选择开票公司",
          icon: "none" });

        return false;
      }
      if (this.$mbservices.isEmpty(this.itemData.Amount)) {
        uni.showToast({
          title: "请输入支出金额",
          icon: "none" });

        return false;
      }
      if (this.itemData.PayType === "银行转账") {
        if (this.$mbservices.isEmpty(this.itemData.AccountNumber)) {
          uni.showToast({
            title: "请输入银行卡号",
            icon: "none" });

          return false;
        }
        if (this.$mbservices.isEmpty(this.itemData.AcceptingUnit)) {
          uni.showToast({
            title: "请输入受理银行",
            icon: "none" });

          return false;
        }
      }
      if (
      this.itemData.PayType !== "银行转账" &&
      this.itemData.PayType !== "现金支付")
      {
        if (this.$mbservices.isEmpty(this.itemData.AccountNumber)) {
          uni.showToast({
            title: "请输入收款账户",
            icon: "none" });

          return false;
        }
      }
      this.modalName = e.currentTarget.dataset.target;
    },
    setNaivgationBarTitle: function setNaivgationBarTitle(e) {
      var title = e.detail.value.title;
      this.itemData.title = e.detail.value.title;
      this.itemData.description = e.detail.value.description;
      this.itemData.jine = e.detail.value.jine;
      this.itemData.supplier = e.detail.value.supplier;
      this.itemData.nameOrphone = e.detail.value.nameOrphone;
    },
    bindPickerChange: function bindPickerChange(e) {
      this.indexExpentType = e.target.value;
      this.itemData.indexExpentType = e.target.value;
      console.log("也走了" + this.indexExpentType);
    },
    bindPickerChange1: function bindPickerChange1(e) {
      this.indexPayType = e.target.value;
      this.itemData.indexPayType = e.target.value;
      this.itemData.PayType = this.PayType[this.indexPayType];

      if (this.PayType[this.indexPayType] != "银行转账") {
        this.itemData.AcceptingUnit = this.PayType[this.indexPayType];
      } else {
        this.itemData.AcceptingUnit = "";
      }
    },
    sourceTypeChange: function sourceTypeChange(e) {
      this.sourceTypeIndex = e.target.value;
    },
    sizeTypeChange: function sizeTypeChange(e) {
      this.sizeTypeIndex = e.target.value;
    },
    countChange: function countChange(e) {
      this.countIndex = e.target.value;
    },
    chooseImage: function () {var _chooseImage = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var _this5 = this;var isContinue;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!(
                this.imageList.length === 9)) {_context2.next = 7;break;}_context2.next = 3;return (
                  this.isFullImg());case 3:isContinue = _context2.sent;
                console.log("是否继续?", isContinue);if (
                isContinue) {_context2.next = 7;break;}return _context2.abrupt("return");case 7:



                uni.chooseImage({
                  sourceType: sourceType[this.sourceTypeIndex],
                  sizeType: sizeType[this.sizeTypeIndex],
                  count:
                  this.imageList.length + this.count[this.countIndex] > 9 ?
                  9 - this.imageList.length :
                  this.count[this.countIndex],
                  success: function success(res) {
                    _this5.imageList = _this5.imageList.concat(res.tempFilePaths);
                  } });case 8:case "end":return _context2.stop();}}}, _callee2, this);}));function chooseImage() {return _chooseImage.apply(this, arguments);}return chooseImage;}(),


    isFullImg: function isFullImg() {var _this6 = this;
      return new Promise(function (res) {
        uni.showModal({
          content: "已经有9张图片了,是否清空现有图片？",
          success: function success(e) {
            if (e.confirm) {
              _this6.imageList = [];
              res(true);
            } else {
              res(false);
            }
          },
          fail: function fail() {
            res(false);
          } });

      });
    },
    previewImage: function previewImage(e) {
      var current = e.target.dataset.src;
      uni.previewImage({
        current: current,
        urls: this.imageList });

    } },


  onUnload: function onUnload() {
    this.imageList = [], this.sourceTypeIndex = 2;
    this.sourceType = ["拍照", "相册", "拍照或相册"];
    this.sizeTypeIndex = 2;
    this.sizeType = ["压缩", "原图", "压缩或原图"];
    this.countIndex = 8;
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

},[[68,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/costApp/caform/caform.js.map