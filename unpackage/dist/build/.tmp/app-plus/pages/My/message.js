(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/My/message"],{"2d6a":function(e,n,t){"use strict";(function(e,u){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(t("4795"));function a(e){return e&&e.__esModule?e:{default:e}}function o(e,n,t,u,r,a,o){try{var i=e[a](o),c=i.value}catch(f){return void t(f)}i.done?n(c):Promise.resolve(c).then(u,r)}function i(e){return function(){var n=this,t=arguments;return new Promise((function(u,r){var a=e.apply(n,t);function i(e){o(a,u,r,i,c,"next",e)}function c(e){o(a,u,r,i,c,"throw",e)}i(void 0)}))}}var c=function(){t.e("components/uni-load-more/uni-load-more").then(function(){return resolve(t("4709"))}.bind(null,t)).catch(t.oe)},f={data:function(){return{hasFlag:!0,page:0,msgType:"",msgList:[],firstLoad:!0,isEmpty:!1}},components:{uniLoadMore:c},methods:{getMsgList:function(){var n=this;return i(r.default.mark((function t(){var u;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.$fetch(n.$api.getMessage,{},"GET","FORM");case 2:u=t.sent,e("log",u," at pages\\My\\message.vue:57"),u.data.forEach((function(e){e.content=n.filterHTMLTag(e.content)})),n.msgList=u.data,0==n.msgList.length&&(n.isEmpty=!0);case 7:case"end":return t.stop()}}),t)})))()},filterHTMLTag:function(e){e=e.replace(/<\/?[^>]*>/g,"");return e=e.replace(/[|]*\n/,""),e=e.replace(/&nbsp;/gi,""),e},handleOpenDetail:function(e){u.navigateTo({url:"../article/article?id="+e})}},onLoad:function(){this.getMsgList()}};n.default=f}).call(this,t("0de9")["default"],t("6e42")["default"])},"46b2":function(e,n,t){"use strict";t.r(n);var u=t("e716"),r=t("6fc2");for(var a in r)"default"!==a&&function(e){t.d(n,e,(function(){return r[e]}))}(a);t("4e15");var o,i=t("f0c5"),c=Object(i["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],o);n["default"]=c.exports},"4e15":function(e,n,t){"use strict";var u=t("e0c5"),r=t.n(u);r.a},5483:function(e,n,t){"use strict";(function(e){t("fad5"),t("921b");u(t("66fd"));var n=u(t("46b2"));function u(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},"6fc2":function(e,n,t){"use strict";t.r(n);var u=t("2d6a"),r=t.n(u);for(var a in u)"default"!==a&&function(e){t.d(n,e,(function(){return u[e]}))}(a);n["default"]=r.a},e0c5:function(e,n,t){},e716:function(e,n,t){"use strict";var u={"u-empty":function(){return Promise.all([t.e("common/vendor"),t.e("uview/components/u-empty/u-empty")]).then(t.bind(null,"f4ef"))}},r=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return u}))}},[["5483","common/runtime","common/vendor"]]]);