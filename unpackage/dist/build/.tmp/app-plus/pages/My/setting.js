(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/My/setting"],{5184:function(t,e,n){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("4795"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,i,o,a,r){try{var u=t[a](r),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(i,o)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var a=t.apply(e,n);function u(t){r(a,i,o,u,c,"next",t)}function c(t){r(a,i,o,u,c,"throw",t)}u(void 0)}))}}var c={data:function(){return{fileSizeString:"",version:"",platInfo:""}},methods:{goToArt:function(e){t.navigateTo({url:"../article/article?id="+e})},handleToFeedback:function(){t.navigateTo({url:"problem"})},clearCacheModal:function(){var e=this;t.showModal({title:"提醒",content:"你确定要清除缓存吗？",success:function(t){t.confirm&&(i("log","清除缓存"," at pages\\My\\setting.vue:63"),e.clearCache())}})},formatSize:function(){var t=this;plus.cache.calculate((function(e){var n=parseInt(e);t.fileSizeString=0==n?"0B":n<1024?n+"B":n<1048576?(n/1024).toFixed(2)+"KB":n<1073741824?(n/1048576).toFixed(2)+"MB":(n/1073741824).toFixed(2)+"GB",i("log",t.fileSizeString," at pages\\My\\setting.vue:85")}))},clearCache:function(){var e=this,n=plus.os.name;if("Android"==n)for(var o=plus.android.runtimeMainActivity(),a=o.getCacheDir(),r=plus.android.invoke(a,"listFiles"),u=r.length,c=0;c<u;c++){var s=""+r[c];plus.io.resolveLocalFileSystemURL(s,(function(n){n.isDirectory?n.removeRecursively((function(n){t.showToast({title:"缓存清理完成",duration:2e3}),e.formatSize()}),(function(t){i("log",t.message," at pages\\My\\setting.vue:107")})):n.remove()}),(function(t){i("log","文件路径读取失败"," at pages\\My\\setting.vue:113")}))}else plus.cache.clear((function(){t.showToast({title:"缓存清理完成",duration:2e3}),e.formatSize()}))},handleToLoginOut:function(){t.removeStorageSync("token"),t.reLaunch({url:"../Login/Login"})},checkVersions:function(){var e=this;return u(o.default.mark((function n(){var a,r,u;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$fetch(e.$api.getVersion,{},"GET","FORM");case 2:if(a=n.sent,r=plus.runtime.version.split(".").join(""),u=a.data.version.split(".").join(""),i("log",r,u," at pages\\My\\setting.vue:139"),r!=u){n.next=10;break}return n.abrupt("return",t.showToast({icon:"none",title:"已经是最新版本, 无需更新"}));case 10:t.showModal({title:"提示",content:"检测到新版本, 是否更新",success:function(t){t.confirm?"ios"==e.platInfo?plus.runtime.openURL(a.data.ios):plus.runtime.openURL(a.data.apk):t.cancel&&i("log","用户点击取消"," at pages\\My\\setting.vue:158")}});case 11:case"end":return n.stop()}}),n)})))()}},onLoad:function(){this.formatSize(),this.version=plus.runtime.version,this.platInfo=t.getSystemInfoSync().platform}};e.default=c}).call(this,n("6e42")["default"],n("0de9")["default"])},"6c9b":function(t,e,n){"use strict";(function(t){n("fad5"),n("921b");i(n("66fd"));var e=i(n("c387"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"6fae":function(t,e,n){},"8a4b":function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}))},b10d:function(t,e,n){"use strict";n.r(e);var i=n("5184"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},c387:function(t,e,n){"use strict";n.r(e);var i=n("8a4b"),o=n("b10d");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("ec35");var r,u=n("f0c5"),c=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=c.exports},ec35:function(t,e,n){"use strict";var i=n("6fae"),o=n.n(i);o.a}},[["6c9b","common/runtime","common/vendor"]]]);