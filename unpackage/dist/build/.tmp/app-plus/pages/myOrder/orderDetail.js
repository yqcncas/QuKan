(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myOrder/orderDetail"],{"0c53":function(e,t,n){"use strict";(function(e){n("fad5"),n("921b");r(n("66fd"));var t=r(n("14c8"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"14c8":function(e,t,n){"use strict";n.r(t);var r=n("2284"),a=n("fc96");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("d097");var c,i=n("f0c5"),s=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],c);t["default"]=s.exports},2284:function(e,t,n){"use strict";var r={"u-popup":function(){return n.e("uview/components/u-popup/u-popup").then(n.bind(null,"dcee"))}},a=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}))},"87bc":function(e,t,n){"use strict";(function(e,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("4795"));function o(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,r,a,o,c){try{var i=e[o](c),s=i.value}catch(u){return void n(u)}i.done?t(s):Promise.resolve(s).then(r,a)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function i(e){c(o,r,a,i,s,"next",e)}function s(e){c(o,r,a,i,s,"throw",e)}i(void 0)}))}}var s={onLoad:function(t){e("log",t," at pages\\myOrder\\orderDetail.vue:148"),this.ordnum=t.ordnum,this.orderIndex=t.index,this.queueId=t.queueId,this.type=t.type,this.initOrderDetail()},data:function(){return{showPayPopFlag:!1,circleShowFlag:0,payInfo:[{image:"../../static/image/ych/pay/1.png",text:"支付宝支付",sectext:""},{image:"../../static/image/ych/pay/2.png",text:"微信支付",sectext:""}],ordnum:0,orderIndex:0,orderDetailInfo:{},queueId:"",type:""}},methods:{handleToEvaluate:function(e){r.redirectTo({url:"./evaluate?id="+e})},handleShowPopup:function(){this.showPayPopFlag=!0},handleCircle:function(e){this.circleShowFlag=e},consignee:function(t){var n=this;return i(a.default.mark((function o(){return a.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:e("log",t," at pages\\myOrder\\orderDetail.vue:195"),r.showModal({title:"提示",content:"是否确认收货",success:function(){var o=i(a.default.mark((function o(c){var i;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!c.confirm){a.next=15;break}if(1!=n.type){a.next=8;break}return a.next=4,n.$fetch(n.$api.commitOrderQukan,{ordnum:t},"GET","FORM");case 4:i=a.sent,0==i.code?(r.showToast({icon:"success",title:"操作成功"}),n.orderDetailInfo.status=3,r.setStorageSync("consigneeFlag",!0)):r.showToast({icon:"none",title:i.msg}),a.next=12;break;case 8:return a.next=10,n.$fetch(n.$api.commitOrderMarket,{ordnum:t},"GET","FORM");case 10:i=a.sent,0==i.code?(r.showToast({icon:"success",title:"操作成功"}),n.orderDetailInfo.status=3,r.setStorageSync("consigneeFlag",!0)):r.showToast({icon:"none",title:i.msg});case 12:e("log",i," at pages\\myOrder\\orderDetail.vue:234"),a.next=16;break;case 15:c.cancel&&e("log","用户点击取消"," at pages\\myOrder\\orderDetail.vue:236");case 16:case"end":return a.stop()}}),o)})));function c(e){return o.apply(this,arguments)}return c}()});case 2:case"end":return o.stop()}}),o)})))()},payMoney:function(){var t=this;return i(a.default.mark((function n(){var o,c,i;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(0!=t.circleShowFlag){n.next=5;break}return n.next=3,t.$fetch(t.$api.appOrderPay,{ordnum:t.ordnum},"POST","FORM");case 3:o=n.sent,r.requestPayment({provider:"alipay",orderInfo:o.msg,success:function(n){e("log","success:"+JSON.stringify(n)," at pages\\myOrder\\orderDetail.vue:249"),r.showToast({icon:"none",title:"支付成功"}),t.showPayPopFlag=!1,t.orderDetailInfo.status=1,r.setStorageSync("paySuccess",t.orderIndex)},fail:function(e){r.showToast({icon:"none",title:"支付失败"})}});case 5:if(1!=t.circleShowFlag){n.next=13;break}return n.next=8,t.$fetch(t.$api.wxAppPay,{ordnum:t.ordnum},"POST","FORM");case 8:c=n.sent,e("log",c," at pages\\myOrder\\orderDetail.vue:273"),i=JSON.parse(c.msg),e("log",i," at pages\\myOrder\\orderDetail.vue:275"),r.requestPayment({provider:"wxpay",orderInfo:i,success:function(n){e("log","success:"+JSON.stringify(n)," at pages\\myOrder\\orderDetail.vue:280"),r.showToast({icon:"none",title:"支付成功"}),t.showPayPopFlag=!1,t.orderDetailInfo.status=1,r.setStorageSync("paySuccess",t.orderIndex)},fail:function(e){r.showToast({icon:"none",title:"支付失败"})}});case 13:case"end":return n.stop()}}),n)})))()},handleToCancelOrder:function(){var t=this;r.showModal({title:"提示",content:"确定取消该订单么",success:function(){var n=i(a.default.mark((function n(o){var c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!o.confirm){n.next=8;break}return n.next=3,t.$fetch(t.$api.delMarketOrder,{ordnum:t.ordnum},"GET","FORM");case 3:c=n.sent,e("log",c," at pages\\myOrder\\orderDetail.vue:308"),0==c.code?(r.showToast({icon:"success",title:c.msg}),r.setStorageSync("cancelFlag",t.orderIndex),setTimeout((function(){r.navigateBack({delta:1})}),1e3)):r.showToast({icon:"none",title:c.msg}),n.next=9;break;case 8:o.cancel&&e("log","用户点击取消"," at pages\\myOrder\\orderDetail.vue:328");case 9:case"end":return n.stop()}}),n)})));function o(e){return n.apply(this,arguments)}return o}()})},initOrderDetail:function(){var t=this;return i(a.default.mark((function n(){var r,o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(2!=t.type){n.next=9;break}return n.next=3,t.$fetch(t.$api.getMarketOrderInfo,{ordnum:t.ordnum},"GET","FORM");case 3:r=n.sent,e("log",r," at pages\\myOrder\\orderDetail.vue:337"),t.orderDetailInfo=r.data,t.orderDetailInfo.addressDetail=r.data.province+r.data.detail,n.next=15;break;case 9:return n.next=11,t.$fetch(t.$api.getQukanOrderInfo,{ordnum:t.ordnum},"GET","FORM");case 11:o=n.sent,e("log",o," at pages\\myOrder\\orderDetail.vue:342"),t.orderDetailInfo=o.data[0],t.orderDetailInfo.addressDetail=t.orderDetailInfo.province+t.orderDetailInfo.detail;case 15:case"end":return n.stop()}}),n)})))()}}};t.default=s}).call(this,n("0de9")["default"],n("6e42")["default"])},"997b":function(e,t,n){},d097:function(e,t,n){"use strict";var r=n("997b"),a=n.n(r);a.a},fc96:function(e,t,n){"use strict";n.r(t);var r=n("87bc"),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a}},[["0c53","common/runtime","common/vendor"]]]);