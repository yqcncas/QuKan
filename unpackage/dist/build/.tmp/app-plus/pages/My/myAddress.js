(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/My/myAddress"],{"0459":function(t,e,n){"use strict";n.r(e);var r=n("6c30"),o=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=o.a},"0d07":function(t,e,n){"use strict";var r={"uni-load-more":function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"4709"))},"u-empty":function(){return Promise.all([n.e("common/vendor"),n.e("uview/components/u-empty/u-empty")]).then(n.bind(null,"f4ef"))}},o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}))},1080:function(t,e,n){"use strict";var r=n("901b"),o=n.n(r);o.a},"1e53":function(t,e,n){"use strict";(function(t){n("fad5"),n("921b");r(n("66fd"));var e=r(n("5a84"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"5a84":function(t,e,n){"use strict";n.r(e);var r=n("0d07"),o=n("0459");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("1080");var u,i=n("f0c5"),s=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);e["default"]=s.exports},"6c30":function(t,e,n){"use strict";(function(t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("4795"));function a(t){return t&&t.__esModule?t:{default:t}}function u(t){return d(t)||c(t)||s(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,e){if(t){if("string"===typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function d(t){if(Array.isArray(t))return f(t)}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function l(t,e,n,r,o,a,u){try{var i=t[a](u),s=i.value}catch(c){return void n(c)}i.done?e(s):Promise.resolve(s).then(r,o)}function m(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function u(t){l(a,r,o,u,i,"next",t)}function i(t){l(a,r,o,u,i,"throw",t)}u(void 0)}))}}var p=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("4709"))}.bind(null,n)).catch(n.oe)},h={data:function(){return{addressList:[],hasFlag:!0,page:0,flag:0,isEmpty:!1}},methods:{handleEditAddress:function(e,n){t.navigateTo({url:"editAddress?id="+e})},getAddressList:function(){var t=this;return m(o.default.mark((function e(){var n;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.hasFlag){e.next=2;break}return e.abrupt("return");case 2:return t.page=++t.page,e.next=5,t.$fetch(t.$api.getAddressList,{pageNum:t.page,pageSize:10},"GET");case 5:n=e.sent,r("log",n," at pages\\My\\myAddress.vue:45"),t.addressList=[].concat(u(t.addressList),u(n.rows)),t.hasFlag=10*t.page<n.total;case 9:case"end":return e.stop()}}),e)})))()},chooseAddress:function(e){1==this.flag&&(t.setStorageSync("chooseAddress",e),t.navigateBack({delta:1}))}},components:{uniLoadMore:p},onLoad:function(t){t.flag&&(this.flag=t.flag)},onShow:function(){this.addressList=[],this.hasFlag=!0,this.getAddressList()},onNavigationBarButtonTap:function(){t.navigateTo({url:"editAddress"})},onReachBottom:function(){this.getAddressList()}};e.default=h}).call(this,n("6e42")["default"],n("0de9")["default"])},"901b":function(t,e,n){}},[["1e53","common/runtime","common/vendor"]]]);