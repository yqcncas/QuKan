(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview/components/u-icon/u-icon"],{"4e38":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={props:{name:{type:String,default:""},color:{type:String,default:"inherit"},size:{type:[Number,String],default:"inherit"},bold:{type:Boolean,default:!1},index:{type:[Number,String],default:""},hoverClass:{type:String,default:""},customPrefix:{type:String,default:"uicon"}},data:function(){return{}},computed:{customClass:function(){var t=[];return t.push(this.customPrefix+"-"+this.name),"uicon"==this.customPrefix?t.push("u-iconfont"):t.push(this.customPrefix),t}},methods:{click:function(){this.$emit("click",this.index)},touchstart:function(){this.$emit("touchstart",this.index)}}};e.default=u},a8d3:function(t,e,n){"use strict";var u=n("cd9b"),i=n.n(u);i.a},b8c4:function(t,e,n){"use strict";n.r(e);var u=n("f784"),i=n("e6a7");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("a8d3");var c,o=n("f0c5"),a=Object(o["a"])(i["default"],u["b"],u["c"],!1,null,"03972b67",null,!1,u["a"],c);e["default"]=a.exports},cd9b:function(t,e,n){},e6a7:function(t,e,n){"use strict";n.r(e);var u=n("4e38"),i=n.n(u);for(var r in u)"default"!==r&&function(t){n.d(e,t,(function(){return u[t]}))}(r);e["default"]=i.a},f784:function(t,e,n){"use strict";var u,i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return u}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview/components/u-icon/u-icon-create-component',
    {
        'uview/components/u-icon/u-icon-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("b8c4"))
        })
    },
    [['uview/components/u-icon/u-icon-create-component']]
]);
