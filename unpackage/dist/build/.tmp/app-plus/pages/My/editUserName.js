(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/My/editUserName"],{"0c6d":function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n("4795"));function u(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,a,r,u,o){try{var i=e[u](o),c=i.value}catch(s){return void n(s)}i.done?t(c):Promise.resolve(c).then(a,r)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(a,r){var u=e.apply(t,n);function i(e){o(u,a,r,i,c,"next",e)}function c(e){o(u,a,r,i,c,"throw",e)}i(void 0)}))}}var c={data:function(){return{placeholder:"请输入昵称",userName:"",flag:0}},methods:{editUserName:function(){var t=this;return i(r.default.mark((function n(){var a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.userName){n.next=2;break}return n.abrupt("return",e.showToast({icon:"none",title:"请输入昵称！"}));case 2:return n.next=4,t.$fetch(t.$api.editUser,{userName:t.userName},"GET");case 4:a=n.sent,e.showToast({icon:"none",title:a.msg}),0==a.code&&e.navigateBack({delta:1});case 7:case"end":return n.stop()}}),n)})))()},addUpcode:function(){var t=this;return i(r.default.mark((function n(){var u;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.userName){n.next=2;break}return n.abrupt("return",e.showToast({icon:"none",title:"请输入上级邀请码"}));case 2:return n.next=4,t.$fetch(t.$api.addUpCode,{upCode:t.userName},"GET");case 4:u=n.sent,a("log",u," at pages\\My\\editUserName.vue:38"),e.showToast({icon:"none",title:u.msg}),0==u.code&&e.navigateBack({delta:1});case 8:case"end":return n.stop()}}),n)})))()}},onLoad:function(t){t.flag&&(this.flag=t.flag,this.placeholder="请输入上级邀请码",this.userName=t.upCode,e.setNavigationBarTitle({title:"绑定上级"})),t.name&&(this.userName=t.name)},onUnload:function(){e.hideKeyboard()},onNavigationBarButtonTap:function(){0==this.flag?this.editUserName():this.addUpcode()}};t.default=c}).call(this,n("6e42")["default"],n("0de9")["default"])},"1bbe":function(e,t,n){},"294f":function(e,t,n){"use strict";n.r(t);var a=n("0c6d"),r=n.n(a);for(var u in a)"default"!==u&&function(e){n.d(t,e,(function(){return a[e]}))}(u);t["default"]=r.a},"4a24":function(e,t,n){"use strict";n.r(t);var a=n("4e42"),r=n("294f");for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n("562b");var o,i=n("f0c5"),c=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=c.exports},"4e42":function(e,t,n){"use strict";var a,r=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return a}))},"562b":function(e,t,n){"use strict";var a=n("1bbe"),r=n.n(a);r.a},ea20:function(e,t,n){"use strict";(function(e){n("fad5"),n("921b");a(n("66fd"));var t=a(n("4a24"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])}},[["ea20","common/runtime","common/vendor"]]]);