(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/My/commission"],{"0144":function(t,n,e){"use strict";(function(t,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=r(e("4795"));function r(t){return t&&t.__esModule?t:{default:t}}function a(t){return l(t)||c(t)||s(t)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,n){if(t){if("string"===typeof t)return f(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?f(t,n):void 0}}function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function l(t){if(Array.isArray(t))return f(t)}function f(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,o=new Array(n);e<n;e++)o[e]=t[e];return o}function d(t,n,e,o,i,r,a){try{var u=t[r](a),s=u.value}catch(c){return void e(c)}u.done?n(s):Promise.resolve(s).then(o,i)}function p(t){return function(){var n=this,e=arguments;return new Promise((function(o,i){var r=t.apply(n,e);function a(t){d(r,o,i,a,u,"next",t)}function u(t){d(r,o,i,a,u,"throw",t)}a(void 0)}))}}var h={data:function(){return{height:64,top:0,scrollH:0,opcity:0,iconOpcity:0,tabList:[{id:1,name:"佣金收入"},{id:2,name:"佣金支出"}],tabCurrentIndex:0,commissList:[],hasFlag:!0,reward:0,page:0,sign:1,pointsList:[]}},methods:{back:function(){t.navigateBack({delta:1})},changeTab:function(t){this.tabCurrentIndex=t,0==t?(this.sign=1,this.hasFlag=!0,this.pointsList=[],this.getFlowList()):(this.sign=2,this.hasFlag=!0,this.pointsList=[],this.getFlowList())},loadMore:function(){o("log","加载"," at pages\\My\\commission.vue:89")},getFlowList:function(){var t=this;return p(i.default.mark((function n(){var e;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.hasFlag){n.next=2;break}return n.abrupt("return");case 2:return t.page=++t.page,n.next=5,t.$fetch(t.$api.getFlowLists,{pageNum:t.page,pageSize:10,sign:t.sign,type:4},"GET");case 5:e=n.sent,o("log",e," at pages\\My\\commission.vue:96"),e.total?t.isEmpty=!1:t.isEmpty=!0,t.pointsList=[].concat(a(t.pointsList),a(e.rows)),t.hasFlag=10*t.page<e.total;case 10:case"end":return n.stop()}}),n)})))()}},onLoad:function(n){var e=this,o={};setTimeout((function(){t.getSystemInfo({success:function(t){e.width=o.left||t.windowWidth,e.height=o.top?o.top+o.height+8:t.statusBarHeight+44,e.top=o.top?o.top+(o.height-32)/2:t.statusBarHeight+6,e.scrollH=t.windowWidth}})}),50),this.reward=n.reward,this.getFlowList()},onPageScroll:function(t){var n=t.scrollTop<=0?0:t.scrollTop,e=n/this.scrollH;this.opcity>=1&&e>=1||(this.opcity=e)}};n.default=h}).call(this,e("6e42")["default"],e("0de9")["default"])},2306:function(t,n,e){},"37e2":function(t,n,e){"use strict";var o=e("2306"),i=e.n(o);i.a},"47c6":function(t,n,e){"use strict";var o={"uni-load-more":function(){return e.e("components/uni-load-more/uni-load-more").then(e.bind(null,"4709"))},"u-empty":function(){return Promise.all([e.e("common/vendor"),e.e("uview/components/u-empty/u-empty")]).then(e.bind(null,"f4ef"))}},i=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return o}))},b798:function(t,n,e){"use strict";(function(t){e("fad5"),e("921b");o(e("66fd"));var n=o(e("e046"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},d981:function(t,n,e){"use strict";e.r(n);var o=e("0144"),i=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,(function(){return o[t]}))}(r);n["default"]=i.a},e046:function(t,n,e){"use strict";e.r(n);var o=e("47c6"),i=e("d981");for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);e("37e2");var a,u=e("f0c5"),s=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=s.exports}},[["b798","common/runtime","common/vendor"]]]);