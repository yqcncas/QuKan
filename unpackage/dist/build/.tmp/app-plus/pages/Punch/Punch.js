(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Punch/Punch"],{"4c65":function(t,e,n){"use strict";n.r(e);var a=n("e88a"),u=n("a226");for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);n("704b");var o,r=n("f0c5"),s=Object(r["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=s.exports},"59e6":function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=i(n("4795"));function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n,a,u,i,o){try{var r=t[i](o),s=r.value}catch(c){return void n(c)}r.done?e(s):Promise.resolve(s).then(a,u)}function r(t){return function(){var e=this,n=arguments;return new Promise((function(a,u){var i=t.apply(e,n);function r(t){o(i,a,u,r,s,"next",t)}function s(t){o(i,a,u,r,s,"throw",t)}r(void 0)}))}}var s={data:function(){return{height:64,top:0,scrollH:0,opcity:0,iconOpcity:0,stepsList:[],day:0,current:-1,punchShow:!1,myPoint:0,getPoint:"",canSign:!0}},methods:{handleToCheckIntegral:function(){t.navigateTo({url:"../My/integral?points="+this.myPoint})},goToAtricle:function(e){t.navigateTo({url:"../article/article?id="+e})},back:function(){t.navigateBack({delta:1})},handleToPunch:function(){var t=this;return r(u.default.mark((function e(){var n;return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.canSign){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,t.$fetch(t.$api.addSign,{},"GET");case 4:n=e.sent,a("log",n," at pages\\Punch\\Punch.vue:93"),0==n.code&&(t.punchShow=!0,t.day++,t.current++,t.canSign=!1,t.myPoint=t.myPoint+n.data.award,t.getPoint=n.data.award);case 7:case"end":return e.stop()}}),e)})))()},getSign:function(){var t=this;return r(u.default.mark((function e(){var n,i,o,r,s,c,f,g;return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$fetch(t.$api.getSign,{},"GET");case 2:if(n=e.sent,a("log",n," at pages\\Punch\\Punch.vue:106"),t.canSign=n.data.canSign,0==n.data.sign.amount)for(i=new Date,r=n.data.sign.amount,t.day=r,n.data.canSign?t.current=r-1:t.current=r,o=0;o<7;o++)s=new Date,s.setDate(i.getDate()+o-r),c=s.getMonth()+1<10?"0"+(s.getMonth()+1):s.getMonth()+1,f=s.getDate()<10?"0"+s.getDate():s.getDate(),o==r?t.stepsList.push({name:"今天"}):t.stepsList.push({name:c+"."+f});else if(n.data.sign.amount>0&&n.data.sign.amount<=6)if(i=new Date,r=n.data.sign.amount,t.day=r,n.data.canSign)for(t.current=r-1,o=0;o<7;o++)s=new Date,s.setDate(i.getDate()+o-r),c=s.getMonth()+1<10?"0"+(s.getMonth()+1):s.getMonth()+1,f=s.getDate()<10?"0"+s.getDate():s.getDate(),o==r?t.stepsList.push({name:"今天"}):t.stepsList.push({name:c+"."+f});else{for(t.current=r-1,g=r-1,o=0;o<7;o++)s=new Date,s.setDate(i.getDate()+o-g),c=s.getMonth()+1<10?"0"+(s.getMonth()+1):s.getMonth()+1,f=s.getDate()<10?"0"+s.getDate():s.getDate(),o==g?t.stepsList.push({name:"今天"}):t.stepsList.push({name:c+"."+f});a("log",t.current," at pages\\Punch\\Punch.vue:164")}else if(n.data.amount>=7)if(i=new Date,r=n.data.sign.amount,t.day=r,n.data.canSign)for(t.current=5,o=0;o<7;o++)s=new Date,s.setDate(i.getDate()+o-6),c=s.getMonth()+1<10?"0"+(s.getMonth()+1):s.getMonth()+1,f=s.getDate()<10?"0"+s.getDate():s.getDate(),6==o?t.stepsList.push({name:"今天"}):t.stepsList.push({name:c+"."+f});else for(t.current,o=0;o<7;o++)s=new Date,s.setDate(i.getDate()+o-6),c=s.getMonth()+1<10?"0"+(s.getMonth()+1):s.getMonth()+1,f=s.getDate()<10?"0"+s.getDate():s.getDate(),6==o?t.stepsList.push({name:"今天"}):t.stepsList.push({name:c+"."+f});case 6:case"end":return e.stop()}}),e)})))()},getMyPoints:function(){var t=this;return r(u.default.mark((function e(){var n;return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$fetch(t.$api.getUserInfo,{},"GET");case 2:n=e.sent,t.myPoint=n.data.userInfo.beanPoint;case 4:case"end":return e.stop()}}),e)})))()}},onLoad:function(e){var n=this,u={};setTimeout((function(){t.getSystemInfo({success:function(t){n.width=u.left||t.windowWidth,n.height=u.top?u.top+u.height+8:t.statusBarHeight+44,n.top=u.top?u.top+(u.height-32)/2:t.statusBarHeight+6,n.scrollH=t.windowWidth}})}),50),a("log",e," at pages\\Punch\\Punch.vue:229"),this.getMyPoints(),this.getSign()},onPageScroll:function(t){var e=t.scrollTop<=0?0:t.scrollTop,n=e/this.scrollH;this.opcity>=1&&n>=1||(this.opcity=n)}};e.default=s}).call(this,n("6e42")["default"],n("0de9")["default"])},"704b":function(t,e,n){"use strict";var a=n("c7b1"),u=n.n(a);u.a},a226:function(t,e,n){"use strict";n.r(e);var a=n("59e6"),u=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=u.a},c7b1:function(t,e,n){},dabe:function(t,e,n){"use strict";(function(t){n("fad5"),n("921b");a(n("66fd"));var e=a(n("4c65"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},e88a:function(t,e,n){"use strict";var a={"u-steps":function(){return n.e("uview/components/u-steps/u-steps").then(n.bind(null,"e045"))},"u-popup":function(){return n.e("uview/components/u-popup/u-popup").then(n.bind(null,"dcee"))}},u=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))}},[["dabe","common/runtime","common/vendor"]]]);