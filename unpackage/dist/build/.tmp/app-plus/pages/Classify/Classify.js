(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Classify/Classify"],{"4aec":function(t,e,n){"use strict";(function(t){n("fad5"),n("921b");a(n("66fd"));var e=a(n("e91b"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"927e":function(t,e,n){"use strict";var a,r=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))},ca1b:function(t,e,n){"use strict";n.r(e);var a=n("d656"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=r.a},d5f7:function(t,e,n){"use strict";var a=n("daf6"),r=n.n(a);r.a},d656:function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("4795"));function i(t){return t&&t.__esModule?t:{default:t}}function o(t){return c(t)||l(t)||s(t)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,e){if(t){if("string"===typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}function l(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function c(t){if(Array.isArray(t))return f(t)}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function d(t,e,n,a,r,i,o){try{var u=t[i](o),s=u.value}catch(l){return void n(l)}u.done?e(s):Promise.resolve(s).then(a,r)}function h(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var i=t.apply(e,n);function o(t){d(i,a,r,o,u,"next",t)}function u(t){d(i,a,r,o,u,"throw",t)}o(void 0)}))}}var p={onLoad:function(){this.initQukanTab()},onPullDownRefresh:function(){this.classflyArr=[],this.hasFlag=!0,this.pageNum=0,this.initClassFlyInfo(),t.stopPullDownRefresh()},data:function(){return{handleIndex:0,hasFlag:!0,scrollTop:-1,headerTab:[],tochildId:"",pageNum:0,classflyArr:[],swiperFlag:!0}},methods:{goToTop:function(){var t=this;this.scrollTop=0,setTimeout((function(){t.scrollTop=-1}),700)},initQukanTab:function(){var t=this;return h(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$fetch(t.$api.qukangetCategory,{pageNum:1,pageSize:100},"GET","FORM");case 2:n=e.sent,n.data.forEach((function(t){t.childFlag="child"+t.id})),t.headerTab=n.data,a("log",t.headerTab," at pages\\Classify\\Classify.vue:90"),t.initClassFlyInfo();case 7:case"end":return e.stop()}}),e)})))()},handleTab:function(t){a("log",t," at pages\\Classify\\Classify.vue:95"),this.handleIndex=t,this.tochildId=0==t?this.headerTab[t].childFlag:this.headerTab[t-1].childFlag,a("log",this.tochildId," at pages\\Classify\\Classify.vue:100"),this.classflyArr=[],this.hasFlag=!0,this.pageNum=0,this.swiperFlag=!1,this.initClassFlyInfo()},initClassFlyInfo:function(){var t=this;return h(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.hasFlag){e.next=2;break}return e.abrupt("return");case 2:return t.pageNum=++t.pageNum,e.next=5,t.$fetch(t.$api.getQukanGoodsList,{pageNum:t.pageNum,pageSize:10,categoryId:t.headerTab[t.handleIndex].id},"GET","FORM");case 5:n=e.sent,t.classflyArr=[].concat(o(t.classflyArr),o(n.rows)),t.hasFlag=10*t.pageNum<n.total,t.swiperFlag=!0;case 9:case"end":return e.stop()}}),e)})))()},handleSwitch:function(t){this.swiperFlag&&this.handleTab(t.detail.current)},goToSearch:function(){t.navigateTo({url:"../Search/Search"})},goToQuKan:function(e){t.navigateTo({url:"../QuKan/QuKan?id="+e})},lower:function(){this.initClassFlyInfo()}}};e.default=p}).call(this,n("6e42")["default"],n("0de9")["default"])},daf6:function(t,e,n){},e91b:function(t,e,n){"use strict";n.r(e);var a=n("927e"),r=n("ca1b");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("d5f7");var o,u=n("f0c5"),s=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=s.exports}},[["4aec","common/runtime","common/vendor"]]]);