(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/QuKan/QuKan"],{"0703":function(e,t,n){},"1dc9":function(e,t,n){},"5a86":function(e,t,n){"use strict";n.r(t);var a=n("6655"),o=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=o.a},6655:function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("4795"));function r(e){return e&&e.__esModule?e:{default:e}}function s(e){return d(e)||c(e)||i(e)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(e,t){if(e){if("string"===typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function c(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function d(e){if(Array.isArray(e))return l(e)}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function g(e,t,n,a,o,r,s){try{var u=e[r](s),i=u.value}catch(c){return void n(c)}u.done?t(i):Promise.resolve(i).then(a,o)}function f(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var r=e.apply(t,n);function s(e){g(r,a,o,s,u,"next",e)}function u(e){g(r,a,o,s,u,"throw",e)}s(void 0)}))}}var m=function(){Promise.all([n.e("common/vendor"),n.e("components/jyf-parser/jyf-parser")]).then(function(){return resolve(n("0a33"))}.bind(null,n)).catch(n.oe)},h={data:function(){return{qukanTablist:["晒单评价","往期成交","趣砍规则"],qukanTablistIndex:0,value:1,goodsDetail:{},goodsId:"",socketTask:null,timer:null,recentCutUsers:[],goodsPriceNow:"获取中...",cutCount:0,second:"09",count:100,seconds:9,isFocus:"false",pageNum:0,pageSize:10,hasFlag:!0,QuKanCommentArr:[],myCount:0,isLoading:!0,recentCutUsersName:"",userId:0,richText:"",QKHistoryArr:[],QuKanCommentTotal:0,QkHisTotal:0,cutFlag:!0,errorMsg:null,phoneNumber:"",hideComment:!0,focusCount:0}},components:{"jyf-parser":m},methods:{goToShopDeatailArt:function(t,n){e.navigateTo({url:"../ShopDetailArt/ShopDeatailArt?detail="+t+"&title="+n})},handleTabIndex:function(e){var t=this;return f(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.qukanTablistIndex=e,t.hasFlag=!0,t.pageNum=0,t.QuKanCommentArr=[],t.QKHistoryArr=[],0!=e){n.next=8;break}t.initQuKanComment(),n.next=16;break;case 8:if(1!=e){n.next=12;break}t.initQKHistory(),n.next=16;break;case 12:return n.next=14,t.$fetch(t.$api.getArticle,{id:8},"GET");case 14:a=n.sent,t.richText=a.data.content;case 16:case"end":return n.stop()}}),n)})))()},valChange:function(e){a("log",e," at pages\\QuKan\\QuKan.vue:288"),this.value=e.value},initQKHistory:function(){var e=this;return f(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.hasFlag){t.next=2;break}return t.abrupt("return");case 2:return e.pageNum=++e.pageNum,t.next=5,e.$fetch(e.$api.getQukanHistory,{id:e.goodsId,pageNum:e.pageNum,pageSize:10},"GET","FORM");case 5:n=t.sent,a("log",n," at pages\\QuKan\\QuKan.vue:295"),e.QkHisTotal=n.total,e.QKHistoryArr=[].concat(s(e.QKHistoryArr),s(n.rows)),e.QKHistoryArr.forEach((function(e){e.savePercent=Number(100*(1-e.nowPrice/e.qukanGoods.price)).toFixed(2)})),e.hasFlag=10*e.pageNum<n.total;case 11:case"end":return t.stop()}}),t)})))()},goToBids:function(){if(0==this.second&&this.count<=0)return e.showToast({icon:"none",title:"该趣砍商品已结束, 请等待最新一期"});e.navigateTo({url:"../Bids/Bids?id="+this.goodsId})},getQuKanGoodsDetail:function(){var t=this;return f(o.default.mark((function n(){var r,s;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e.getStorageSync("searchToQk")){n.next=7;break}return n.next=3,t.$fetch(t.$api.getQukanGoods,{id:t.goodsId,type:1},"GET");case 3:r=n.sent,e.removeStorageSync("searchToQk"),n.next=10;break;case 7:return n.next=9,t.$fetch(t.$api.getQukanGoods,{id:t.goodsId},"GET");case 9:r=n.sent;case 10:a("log",r," at pages\\QuKan\\QuKan.vue:325"),0!=r.code?(e.showToast({icon:"none",title:r.msg}),t.second=0,t.count=0,clearInterval(t.timer),t.timer=null,t.goodsPriceNow="已结束"):(r.data.goods.images=r.data.goods.images.split(","),t.goodsDetail=r.data.goods,t.isFocus=r.data.isFocus,t.focusCount=r.data.focusCount,s=r.data.cutList,s.forEach((function(e){e.name=e.userName,e.image=e.avatar,e.price=e.nowPrice,e.userId=e.userId})),t.recentCutUsers=s,t.goodsPriceNow=r.data.nowPrice,t.goodsId=r.data.goods.id,t.phoneNumber=r.data.phonenumber,t.connectWebSocket());case 12:case"end":return n.stop()}}),n)})))()},initTimer:function(){var e=this;null==this.timer&&(this.timer=setInterval((function(){e.count--,0==e.count&&(0==e.seconds?(e.seconds=0,e.second="00",e.count<=0&&(e.count="00",clearInterval(e.timer))):(e.count=100,e.seconds--,e.second="0"+e.seconds))}),10))},cutPrice:function(){var t=this;return 0==this.second&&this.count<=0?e.showToast({icon:"none",title:"该趣砍商品已结束, 请等待最新一期"}):this.recentCutUsers.length&&(a("log",this.recentCutUsers," at pages\\QuKan\\QuKan.vue:395"),e.getStorageSync("MyUserId")==this.recentCutUsers[0].userId)?e.showToast({icon:"none",title:"您已处于领先位置, 请耐心等候"}):0==this.second&&0==this.count?e.showToast({icon:"none",title:"该趣砍商品已结束, 请等待最新一期"}):void(this.cutFlag?e.sendSocketMessage({data:"cut:"+this.goodsId,success:function(){var n=f(o.default.mark((function n(r){var s;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.cutFlag=!1,a("log",t.errorMsg," at pages\\QuKan\\QuKan.vue:419"),n.next=4,t.$fetch(t.$api.checkQukanStatus,{},"GET","FORM");case 4:s=n.sent,a("log",s," at pages\\QuKan\\QuKan.vue:421"),e.showToast({icon:"none",title:s.msg}),setTimeout((function(){t.cutFlag=!0}),1500);case 8:case"end":return n.stop()}}),n)})));function r(e){return n.apply(this,arguments)}return r}()}):e.showToast({icon:"none",title:"操作过快, 请稍后再试"}))},closeWebSocket:function(){e.closeSocket({complete:function(e){a("log",e," at pages\\QuKan\\QuKan.vue:443")}})},connectWebSocket:function(){var t=this;a("log",this.goodsId," at pages\\QuKan\\QuKan.vue:448");var n=e.getStorageSync("token"),o=e.getStorageSync("userId");a("log",o," at pages\\QuKan\\QuKan.vue:451"),a("log","ws://qukan.bajiaostar.com:8082/websocket/".concat(o,"?token=").concat(n)," at pages\\QuKan\\QuKan.vue:452"),this.socketTask=e.connectSocket({url:"ws://qukan.bajiaostar.com:8082/websocket/".concat(o,"?token=").concat(n),complete:function(){a("log","成功连接"," at pages\\QuKan\\QuKan.vue:456")},fail:function(e){a("log",e," at pages\\QuKan\\QuKan.vue:459")}}),e.onSocketOpen((function(n){a("log","WebSocket连接打开成功"," at pages\\QuKan\\QuKan.vue:464"),e.sendSocketMessage({data:"enter:"+t.goodsId,success:function(e){a("log",e," at pages\\QuKan\\QuKan.vue:468")}})})),e.onSocketError((function(t){a("log","WebSocket连接打开失败，请检查！"," at pages\\QuKan\\QuKan.vue:473"),this.second=0,this.count=0,this.goodsPriceNow="已结束",clearInterval(this.timer),this.timer=null,e.showToast({icon:"none",title:"网络连接中断, 请稍后再试"}),setTimeout((function(){e.navigateBack({delta:1})}),1e3)})),e.onSocketMessage((function(n){a("log",n," at pages\\QuKan\\QuKan.vue:490");var o=JSON.parse(n.data);a("log",n.data," at pages\\QuKan\\QuKan.vue:492"),t.errorMsg=o.msg,o.goodsId==t.goodsId&&("cut"==o.command?(t.second="09",t.seconds=9,t.count=100,a("log",o," at pages\\QuKan\\QuKan.vue:500"),o.image||(o.image="../../static/image/ylc/11.png"),t.recentCutUsers.unshift({name:o.name,image:o.image,price:o.nowPrice,userId:o.userId}),t.userId=o.userId,t.recentCutUsersName=o.name,t.recentCutUsers.length>2&&t.recentCutUsers.splice(3,t.recentCutUsers.length),t.goodsPriceNow=Number(o.nowPrice).toFixed(2),o.myCount&&(t.myCount=o.myCount)):"enter"==o.command?(a("log",o," at pages\\QuKan\\QuKan.vue:519"),a("log","_______________________"," at pages\\QuKan\\QuKan.vue:520"),t.goodsId=o.goodsId,t.goodsPriceNow=o.nowPrice,t.myCount=o.myCount,t.second="0"+o.endTime,t.seconds=o.endTime):"error0"==o.command?e.getStorageSync("MyUserId")&&t.userId==e.getStorageSync("MyUserId")&&(e.showToast({icon:"none",title:o.msg}),setTimeout((function(){e.navigateBack({delta:1})}),1e3)):"error1"==o.command?e.getStorageSync("MyUserId")&&t.userId==e.getStorageSync("MyUserId")&&e.showToast({icon:"none",title:o.msg}):"order"==o.command&&(e.showToast({icon:"none",title:"竞拍结束！恭喜"+t.recentCutUsersName+"以"+t.goodsPriceNow+"砍到"}),e.getStorageSync("MyUserId")&&(a("log",t.userId," at pages\\QuKan\\QuKan.vue:567"),a("log",e.getStorageSync("MyUserId")," at pages\\QuKan\\QuKan.vue:568"),t.userId==e.getStorageSync("MyUserId")?setTimeout((function(){e.redirectTo({url:"../myOrder/myOrder?orderType=1"})}),1e3):setTimeout((function(){e.navigateBack({delta:1})}),1e3))))}))},handleChangeFocus:function(){var t=this;return f(o.default.mark((function n(){var r,s;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("false"!=t.isFocus){n.next=9;break}return n.next=3,t.$fetch(t.$api.addFocusQukan,{id:t.goodsId},"GET");case 3:r=n.sent,a("log",r," at pages\\QuKan\\QuKan.vue:597"),e.showToast({icon:"none",title:r.msg}),0==r.code&&(t.isFocus="true"),n.next=14;break;case 9:return n.next=11,t.$fetch(t.$api.delFocusQukan,{id:t.goodsId},"GET");case 11:s=n.sent,e.showToast({icon:"none",title:s.msg}),0==s.code&&(t.isFocus="false");case 14:case"end":return n.stop()}}),n)})))()},initQuKanComment:function(){var e=this;return f(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.hasFlag){t.next=2;break}return t.abrupt("return");case 2:return e.pageNum=++e.pageNum,t.next=5,e.$fetch(e.$api.getMarketComment,{goodsId:e.goodsId,pageNum:e.pageNum,pageSize:e.pageSize},"GET","FORM");case 5:n=t.sent,n.rows.forEach((function(t){null!=t.image&&(-1!=t.image.indexOf(",")?t.image=t.image.split(","):(t.image=[t.image],"[]"==t.image[0]&&(e.hideComment=!1)))})),e.QuKanCommentArr=[].concat(s(e.QuKanCommentArr),s(n.rows)),a("log",e.QuKanCommentArr," at pages\\QuKan\\QuKan.vue:634"),e.QuKanCommentTotal=n.total,e.hasFlag=10*e.pageNum<n.total;case 11:case"end":return t.stop()}}),t)})))()},priveImage:function(t,n){e.previewImage({urls:t,current:n})},initBidsList:function(){var e=this;return f(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$fetch(e.$api.getFlowList,{id:e.goodsId},"GET");case 2:n=t.sent,a("log",n," at pages\\QuKan\\QuKan.vue:648"),n.data.forEach((function(t,n){n<3&&(t.avatar||(t.avatar="../../static/image/ylc/11.png"),e.recentCutUsersName=t.userName,e.recentCutUsers.push({name:t.userName,image:t.avatar,price:t.nowPrice}))}));case 5:case"end":return t.stop()}}),t)})))()},callPhone:function(){if(""==this.phoneNumber)return e.showToast({icon:"none",title:"暂未开通"});e.makePhoneCall({phoneNumber:this.phoneNumber})}},onReachBottom:function(){this.hasFlag&&0==this.qukanTablistIndex?this.initQuKanComment():this.hasFlag&&1==this.qukanTablistIndex&&this.initQKHistory()},onLoad:function(t){e.showLoading({title:"加载中..."}),this.goodsId=t.id,this.getQuKanGoodsDetail(),this.initTimer(),this.initQuKanComment(),this.isLoading=!1,e.hideLoading()},onUnload:function(){this.closeWebSocket(),clearInterval(this.timer)}};t.default=h}).call(this,n("6e42")["default"],n("0de9")["default"])},8382:function(e,t,n){"use strict";(function(e){n("fad5"),n("921b");a(n("66fd"));var t=a(n("cfc6"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},9325:function(e,t,n){"use strict";var a={"jyf-parser":function(){return Promise.all([n.e("common/vendor"),n.e("components/jyf-parser/jyf-parser")]).then(n.bind(null,"0a33"))}},o=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}))},cfc6:function(e,t,n){"use strict";n.r(t);var a=n("9325"),o=n("5a86");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("d66d"),n("e35c");var s,u=n("f0c5"),i=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);t["default"]=i.exports},d66d:function(e,t,n){"use strict";var a=n("0703"),o=n.n(a);o.a},e35c:function(e,t,n){"use strict";var a=n("1dc9"),o=n.n(a);o.a}},[["8382","common/runtime","common/vendor"]]]);