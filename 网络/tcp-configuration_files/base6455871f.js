define("appmsg/subscribe/subscribe_btn_tpl.html.js",[],function(){
return'<#if(supportWxOpen){#>\n<wx-open-subscribe template="<#=templateIdList#>" scene="<#=scene#>" username="<#=username#>" scale="<#=scale#>" appmsgindex="<#=appmsgIndex#>"> \n  <template slot="style">\n    <style>\n    .reset_btn{\n      -webkit-appearance: none;\n      -webkit-tap-highlight-color:rgba(0,0,0,0);\n      outline: 0;\n      background-color: transparent;\n      border: 0;\n      font-family:inherit;\n      display: inline-block;\n      vertical-align: middle;\n    }\n    .subsc_btn {\n      font-size:inherit;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      padding: 0;\n      margin: 0;\n      color: #576b95;\n    }\n    .icon_subsc {\n      display: -ms-flexbox;\n      display: flex;\n      width: 20px;\n      height: 20px;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      margin-right: 4px;\n      box-sizing: border-box;\n      border-radius: 100%;\n      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);\n    }\n    .icon_subsc:before {\n      content: "";\n      display: inline-block;\n      vertical-align: middle;\n      width: 14px;\n      height: 14px;\n      -webkit-mask: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 14 14\'%3E  %3Cpath fill=\'%23576B95\' d=\'M7 1.167a1.167 1.167 0 0 1 1.15 1.36 3.501 3.501 0 0 1 2.35 3.306v2.334c0 .857.315 1.714.945 2.571a.583.583 0 0 1-.47.929H7.582v.116a.583.583 0 0 1-1.166 0v-.116H3.025a.583.583 0 0 1-.47-.929c.63-.857.944-1.714.944-2.571V5.833c0-1.53.982-2.83 2.35-3.306A1.167 1.167 0 0 1 7 1.167zm0 1a.167.167 0 0 0-.167.166l.003.03.139.831-.797.277a2.501 2.501 0 0 0-1.672 2.185l-.006.177v2.334c0 .833-.23 1.653-.678 2.45l-.029.049h6.413l-.028-.048c-.403-.719-.63-1.454-.671-2.202l-.007-.25V5.834a2.5 2.5 0 0 0-1.515-2.298l-.163-.064-.797-.277.14-.832A.167.167 0 0 0 7 2.166z\'/%3E%3C/svg%3E") no-repeat 50% 50%;\n      mask: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 14 14\'%3E  %3Cpath fill=\'%23576B95\' d=\'M7 1.167a1.167 1.167 0 0 1 1.15 1.36 3.501 3.501 0 0 1 2.35 3.306v2.334c0 .857.315 1.714.945 2.571a.583.583 0 0 1-.47.929H7.582v.116a.583.583 0 0 1-1.166 0v-.116H3.025a.583.583 0 0 1-.47-.929c.63-.857.944-1.714.944-2.571V5.833c0-1.53.982-2.83 2.35-3.306A1.167 1.167 0 0 1 7 1.167zm0 1a.167.167 0 0 0-.167.166l.003.03.139.831-.797.277a2.501 2.501 0 0 0-1.672 2.185l-.006.177v2.334c0 .833-.23 1.653-.678 2.45l-.029.049h6.413l-.028-.048c-.403-.719-.63-1.454-.671-2.202l-.007-.25V5.834a2.5 2.5 0 0 0-1.515-2.298l-.163-.064-.797-.277.14-.832A.167.167 0 0 0 7 2.166z\'/%3E%3C/svg%3E") no-repeat 50% 50%;\n      -webkit-mask-size: cover;\n      mask-size: cover;\n      background-color: currentColor;\n    }\n    @media (prefers-color-scheme: dark) {\n      .subsc_btn {\n        color: #7d90a9;\n      }\n      .icon_subsc {\n        box-shadow: 0 0 3px 0 rgba(255, 255, 255, 0.1);\n      }\n    }\n    </style>\n  </template>\n  <template>\n    <div class="subsc_context">\n      <button class="subsc_btn reset_btn" type="button"><i class="icon_subsc"></i>订阅通知</button>\n    </div>\n  </template>\n</wx-open-subscribe>\n<#}else{#>\n  <div class="subsc_context js_subsc_btn">\n    <button class="subsc_btn reset_btn" type="button"><i class="icon_subsc"></i>订阅通知</button>\n  </div>\n<#}#>\n\n\n';
});define("album/utils/report.js",["common/comm_report.js"],function(e){
"use strict";
var i=e("common/comm_report.js"),o=window.WX_BJ_REPORT||{},r=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r={
BizUin:window.biz,
MsgId:1*window.mid,
ItemIdx:1*window.idx,
ItemShowType:1*window.item_show_type||0,
SessionId:window.sessionid+"",
EnterId:1*window.enterid,
Scene:1*window.source,
SubScene:1*window.subscene,
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType,
Vid:e.vid,
Audioid:e.audioid||"",
Title:e.title||"",
TagSource:1*e.tagSrc||0
};
i.report(19647,r,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 19647",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:r,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
},n=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r={
BizUin:window.biz,
Scene:1*window.source,
SubScene:1*window.subscene,
EnterId:1*window.enterid,
SceneNote:e.sceneNote+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType,
IfSubscription:1*e.isSubscribed===1?2:1,
NewTagId:e.tagId+"",
ShowTag:e.showTag+"",
InsideTag:e.insideTag+"",
Cate1:e.c1+"",
Cate2:e.c2+"",
StayTime:e.stayTime?1*e.stayTime:0,
NetworkType:1*e.networkType
};
i.report(19648,r,{
async:e.async||!0,
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 19648",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:r,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
},d=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r={
BizUin:window.biz,
MsgId:1*e.msgid,
ItemIdx:1*e.itemidx,
Pos:1*e.pos,
Scene:178,
SubScene:1*window.subscene,
EnterId:1*window.enterid,
SceneNote:e.sceneNote+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType,
Vid:e.vid,
IfSubscription:1*e.isSubscribed===1?2:1,
NewTagId:e.tagId+"",
ShowTag:e.showTag+"",
InsideTag:e.insideTag+"",
Cate1:e.c1+"",
Cate2:e.c2+"",
ArticleSource:1
};
i.report(19649,r,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 19649",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:r,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
}),1*e.eventType===1&&!function(){
var r={
BizUin:window.biz,
MsgId:1*e.msgid,
ItemIdx:1*e.itemidx,
AppMsgUrl:e.url,
Title:e.title,
IsReaded:1*e.isRead,
Scene:1*window.source,
SubScene:1*window.subscene
};
i.report(20805,r,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 20805",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:r,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
}();
},t=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r={
bizuin:window.biz,
url:e.url+"",
ActionType:1*e.actionType,
Scene:1*window.source,
Network:window.__networkType+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
ExpType:window.exptype||"",
ExpSessionIdStr:window.expsessionid||""
};
i.report(10380,r,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 10380",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:r,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
},s=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r={
BizUin:window.biz,
Action:1*e.action,
AppMsgLikeType:window.appmsg_like_type,
Scene:1*window.source,
SubScene:1*window.subscene,
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
ExpType:window.exptype||"",
ExpSessionIdStr:window.expsessionid||""
};
i.report(14299,r,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 14299",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:r,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
};
return{
cardReport:r,
albumActionReport:n,
articleActionReport:d,
shareReport:t,
likeReport:s
};
});define("appmsg/rec_report_key.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var r=e("biz_wap/jsapi/core.js"),n=[],i=void 0;
!function(){
i[i.kRead=1]="kRead",i[i.kLike=2]="kLike",i[i.kSeen=3]="kSeen",i[i.kShare=4]="kShare",
i[i.kFavorite=5]="kFavorite",i[i.kComment=6]="kComment",i[i.kReward=7]="kReward",
i[i.kSubscibe=8]="kSubscibe",i[i.kRead20Percent=9]="kRead20Percent",i[i.kReadOver=10]="kReadOver";
}(i||(i={}));
var o=function(e){
var i=arguments.length<=1||void 0===arguments[1]?1:arguments[1];
if("169"===window.source){
var o=n.indexOf(e);
-1===o&&1===i?n.push(e):o>-1&&0===i&&n.splice(o,1),console.log("[reportRecommend] params: "+JSON.stringify(n)),
r.invoke("handleMPPageAction",{
action:"reportRecommend",
reportData:JSON.stringify({
action:n
})
},function(e){
console.log("[reportRecommend] res: "+JSON.stringify(e));
});
}
},t=function(){
n.splice(0,n.length);
};
return{
RecActionType:i,
reportRecAction:o,
resetActionMap:t
};
});define("pages/scrollY.js",["pages/utils.js"],function(e){
"use strict";
var n=e("pages/utils.js"),t=window.requestAnimationFrame,o=0;
["webkit","moz","ms","o"].some(function(e){
return t?!0:(t=t||window[e+"RequestAnimationFrame"],!1);
}),t||(t=function(e){
var n=(new Date).getTime(),t=Math.max(0,16-(n-o));
return o=n+t,window.setTimeout(function(){
return e(n+t);
},t);
});
var r={
easeOutSine:function(e){
return Math.sin(e*(Math.PI/2));
},
easeInOutSine:function(e){
return-.5*(Math.cos(Math.PI*e)-1);
},
easeInOutQuint:function(e){
return e/=.5,1>e?.5*Math.pow(e,5):.5*(Math.pow(e-2,5)+2);
},
easeInOutCubic:function(e){
return.5>e?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1;
}
},i=function(e,n){
var t=arguments.length<=2||void 0===arguments[2]?document.body:arguments[2];
"function"==typeof e&&e(),t===document.body?(document.documentElement.scrollTop=n,
document.body.scrollTop=n):t.scrollTop=n;
},u=function(){
var e=arguments.length<=0||void 0===arguments[0]?document.body:arguments[0];
return e===document.body?n.getScrollTop():e.scrollTop;
},a={},s=function m(){
var e=1*new Date+"_"+1e4*Math.random().toFixed(4);
return a[e]?m():e;
},c=function(e){
delete a[e];
},d=function(e){
var n=e.el,o=void 0===n?document.body:n,d=e.y,m=e.distance,f=e.speed,l=e.duration,v=e.easing,p=void 0===v?"easeOutSine":v,g=e.begin,h=e.end,b=e.beforeScroll;
"function"==typeof g&&g(),Object.keys(a).forEach(function(e){
a[e].el===o&&c(e);
});
var y=u(o),w=0;
if(void 0!==d)m=d-y;else{
if(void 0===m)return void console.error("need param `y` or `distance`.");
d=m+y;
}
if(0!==m){
void 0===f&&(f=void 0!==l?m/l:2e3);
var M=l||Math.max(.1,Math.min(Math.abs((y-d)/f),.8)),T=s();
a[T]={
el:o
};
var O=function I(){
if(a[T]){
w+=1/60;
var e=w/M,n=r[p](e);
1>e?(t(I),i(b,y+(d-y)*n,o)):(c(T),i(b,d,o),"function"==typeof h&&h());
}
};
O();
}
};
return{
start:d,
stop:c
};
});define("appmsg/related_article_feedback.js",["biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","common/utils.js"],function(e){
"use strict";
function t(e,t){
for(;!e.parentNode.className.match(t);)e=e.parentNode;
return e.parentNode||"";
}
function i(e){
this.container=e.container,this.biz=e.biz,this.mid=e.mid,this.idx=e.idx,this.vid=e.vid,
this.isVideo=e.isVideo,this.dislikeCb=e.dislikeCb,s["top"===e.position?"addClass":"removeClass"](this.container.querySelector(".js_dialog_wrp"),"feedback_dialog_pos_top"),
this.bindEvent();
}
function a(e){
var a=e.container;
n.on(a,"touchstart",".js_feedback_btn",function(e){
e.stopPropagation();
},!0),n.on(a,"touchend",".js_feedback_btn",function(e){
e.stopPropagation();
},!0),n.on(a,"click",".js_feedback_btn",function(a){
a.stopPropagation();
var o=a.delegatedTarget,s=t(o,"js_related_item"),n=268;
l=new i({
container:s,
biz:e.biz,
mid:e.mid,
idx:e.idx,
isVideo:e.isVideo,
vid:e.vid,
position:r.getInnerHeight()-s.getBoundingClientRect().bottom<n?"top":"bottom",
dislikeCb:e.dislikeCb
}),l.show();
},!0);
}
var o=e("biz_wap/utils/ajax.js"),s=e("biz_common/dom/class.js"),n=e("biz_common/dom/event.js"),d=e("biz_common/utils/url/parse.js"),r=e("common/utils.js"),l=null;
return i.prototype.bindEvent=function(){
var e=this,i=this.container,a=this.biz,r=this.mid,l=this.idx,c=i.getAttribute("data-url"),u=new Set,_=new Set,m=i.querySelector(".js_submit");
this.tabClickEventHandler=function(e){
e.stopPropagation(),e.preventDefault();
var t=e.delegatedTarget,i=t.getAttribute("data-value");
s.hasClass(t,"js_reason")&&(i*=1),s.hasClass(t,"feedback_tag_selected")?(s.removeClass(t,"feedback_tag_selected"),
s.hasClass(t,"js_reason")?u.delete(i):_.delete(i)):(s.addClass(t,"feedback_tag_selected"),
s.hasClass(t,"js_reason")?u.add(i):_.add(i)),0===u.size&&0===_.size?s.addClass(m,"weui-btn_disabled"):s.removeClass(m,"weui-btn_disabled");
},this.submitDataHandler=function(n){
n.stopPropagation(),n.preventDefault();
var m=n.target;
if(!s.hasClass(m,"weui-btn_disabled")){
var h={
tacitly:Array.from(u),
keyword:Array.from(_)
},b={
biz_from:a,
mid_from:r,
idx_from:l,
recommended_biz:d.getQuery("__biz",c),
mid:d.getQuery("mid",c),
idx:d.getQuery("idx",c),
reason:JSON.stringify(h)
},p="/mp/relatedarticle?action=dislike";
e.isVideo&&(b.vid_from=e.vid,b.vid=i.getAttribute("data-vid"),p="/mp/video_similar?action=dislike"),
o({
type:"POST",
url:p,
dataType:"json",
data:b,
success:function(i){
if(console.log(i),i&&i.base_resp&&0===i.base_resp.ret){
e.hide(m);
var a=t(m,"js_related_item");
e.dislikeCb(a);
}else window.weui.alert("系统错误，请稍后重试");
}
});
}
},this.maskHandler=function(t){
t.stopPropagation(),t.preventDefault(),e.hide(t.target);
},this.maskTouchMoveHandler=function(e){
e.stopPropagation(),e.preventDefault();
},this.stopPropagationHandler=function(e){
e.stopPropagation();
},n.on(i,"click",".js_tag_item",this.tabClickEventHandler,!0),n.on(m,"click",this.submitDataHandler,!0),
n.on(i,"click",".js_mask",this.maskHandler,!0),n.on(i,"touchmove",".js_mask",this.maskTouchMoveHandler,!0),
n.on(i,"touchmove",".js_dialog_wrp",this.maskTouchMoveHandler,!0),n.on(i,"click",".js_dialog_wrp",this.maskTouchMoveHandler,!1),
n.on(i,"touchstart",".js_feedback_dialog",this.stopPropagationHandler,!0),n.on(i,"touchend",".js_feedback_dialog",this.stopPropagationHandler,!0);
},i.prototype.show=function(){
this.container.querySelector(".js_feedback_dialog").style.display="",s.addClass(this.container.querySelector(".js_feedback_dialog"),"feedback_dialog_show");
},i.prototype.hide=function(){
var e=this.container,t=e.querySelector(".js_submit");
n.off(e,"click",this.tabClickEventHandler,!0),n.off(t,"click",this.submitDataHandler,!0),
n.off(e,"click",this.maskHandler,!0),n.off(e,"touchmove",this.maskTouchMoveHandler,!0),
n.off(e,"click",this.maskTouchMoveHandler,!1),s.removeClass(this.container.querySelector(".js_feedback_dialog"),"feedback_dialog_show");
},{
init:a
};
});define("biz_wap/utils/openUrl.js",["biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function r(e){
var r=document.createElement("a");
return r.href=e,{
source:e,
protocol:r.protocol.replace(":",""),
host:r.hostname,
port:r.port,
query:r.search,
params:function(){
for(var e,t={},i=r.search.replace(/^\?/,"").split("&"),a=i.length,o=0;a>o;o++)i[o]&&(e=i[o].split("="),
t[e[0]]=e[1]);
return t;
}(),
file:(r.pathname.match(/([^\/?#]+)$/i)||[,""])[1],
hash:r.hash.replace("#",""),
path:r.pathname.replace(/^([^\/])/,"/$1"),
relative:(r.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],
segments:r.pathname.replace(/^\//,"").split("/")
};
}
function t(e,t){
var o;
t=t||1,0==e.indexOf("/")&&(o=r(location.href),e=o.protocol+"://"+o.host+e,console.log("openUrlWithExtraWebview with relative path:",e)),
e=e.replace(/(#[^#]*)+/,function(e,r){
return r;
}),-1!==navigator.userAgent.indexOf("MicroMessenger")&&(a.isIOS||a.isAndroid||a.isWp)?i.invoke("openUrlWithExtraWebview",{
url:e,
openType:t
},function(r){
-1==r.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e;
}
var i=e("biz_wap/jsapi/core.js"),a=e("biz_wap/utils/mmversion.js");
return{
openUrlWithExtraWebview:t
};
});define("appmsg/related_article_item.html.js",[],function(){
return'<# list.forEach(function(item, idx) { #>\n  <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg js_related_item"\n    data-index="<#=begin+idx#>"\n    data-url="<#=item.url#>"\n    data-time="<#=item.send_time#>"\n    data-recalltype="<#=item.recall_type#>"\n    data-isreaded="<#=item.is_readed#>"\n    data-bizuin="<#=item.bizuin#>"\n    data-mid="<#=item.mid#>"\n    data-idx="<#=item.idx#>"\n    data-item_show_type="<#=item.item_show_type#>"\n    data-exptype="<#=item.exptype#>"\n    data-ext_info="<#=item.ext_info#>"\n  >\n    <div class="weui-media-box__bd">\n      <div class="ellipsis_relate_title weui_ellipsis_mod_wrp\n        <# if (item.is_pay_subscribe) { #>\n          <# if (item.is_paid) { #>\n          relate_article_pay\n          <# } else { #>\n          <# } #>\n        <# } else { #>\n          relate_article_default\n        <# } #>\n      ">\n        <div class="weui_ellipsis_mod">\n          <div class="weui_ellipsis_mod_inner">\n            <#=item.title#>\n            <# if (item.is_pay_subscribe) { #>\n              <# if (item.is_paid) { #>\n                <span class="pay__tag">已付费</span>\n              <# } else { #>\n                <span class="unpay__tag">付费</span>\n              <# } #>\n            <# } #>\n          </div>\n        </div>\n        <div class="weui_ellipsis_fake_mod">\n          <div class="weui_ellipsis_fake_inner">\n            <#=item.title#>\n            <# if (item.is_pay_subscribe) { #>\n              <# if (item.is_paid) { #>\n                <span class="pay__tag">已付费</span>\n              <# } else { #>\n                <span class="unpay__tag">付费</span>\n              <# } #>\n            <# } #>\n          </div>\n          <div class="weui_ellipsis_fake_placeholder"></div>\n          <div class="weui_ellipsis_fake_extra">...\n            <# if (item.is_pay_subscribe) { #>\n              <# if (item.is_paid) { #>\n                <span class="pay__tag">已付费</span>\n              <# } else { #>\n                <span class="unpay__tag">付费</span>\n              <# } #>\n            <# } #>\n          </div>\n        </div>\n      </div>\n      <div class="weui-media-box__info">\n        <div class="weui-media-box__info__inner">\n          <div class="weui-media-box__info__meta">\n            <# if (item.old_like_num >= 10) { #>\n              赞 <#=item.like_num_wording#>            <# } else if (item.is_pay_subscribe && item.pay_cnt) { #>\n              付费 <#=item.pay_cnt_wording#>            <# } else if (item.read_num) { #>\n              阅读 <#=item.read_num_wording#>            <# } #>\n          </div>\n          <div class="js_profile relate_profile relate_article_panel_active" data-username="<#=item.username#>">\n            <div class="weui-media-box__info__meta">\n              <span class="relate_profile_nickname">\n                <#=item.nickname#>\n              </span>\n            </div>\n          </div>\n        </div>\n        <div class="relate_article_opr">\n          <button type="button" class="reset_btn dislike_btn js_feedback_btn">不喜欢</button>\n        </div>\n        <!-- 去掉display:none;改用样式默认隐藏，加classnamme:feedback_dialog_show显示 -->\n        <div class="feedback_dialog_wrp js_feedback_dialog">\n          <div class="weui-mask js_mask"></div>\n          <!-- 底部时弹窗向上，加.feedback_dialog_pos_top -->\n          <div class="feedback_dialog js_dialog_wrp">\n            <div class="feedback_dialog_hd weui-flex">\n              <div class="weui-flex__item feedback_dialog_title">不看的原因</div>\n              <button type="button" class="weui-btn weui-btn_primary weui-btn_mini weui-btn_disabled js_submit">确定</button>\n            </div>\n            <div class="feedback_dialog_bd">\n              <ul class="feedback_tag_list">\n                <!-- 选中时tag加.feedback_tag_selected -->\n                <# reason.forEach(function(r) { #>\n                  <li class="feedback_tag_item js_reason js_tag_item" data-value="<#=r.value#>"><#=r.name#></li>\n                <# }); #>\n                <# item.keyword.forEach(function(k,i) { #>\n                  <# if (i<2) { #>\n                    <li class="feedback_tag_item js_keyword js_tag_item" data-value="<#=k#>">对<#=k#>不感兴趣</li>\n                  <# } #>\n                <# }); #>\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="weui-media-box__ft" style="background-image:url(<#=item.cover#>)"></div>\n  </a>\n<# }); #>\n';
});define("appmsg/related_article_tpl.html.js",[],function(){
return'<div class="relate_mod_transition function_mod js_related_area" style="opacity: 1; overflow: hidden; height: 0; margin: 0;">\n  <div class="function_mod_index js_related_main">\n      <div class="function_hd js_related_title">\n        <# if (type === \'share\') { #> <!-- 分享 -->\n          分享此内容的人还喜欢        <# } else if (type === \'favorite\') { #> <!-- 收藏 -->\n          收藏此内容的人还喜欢        <# } else if (type === \'praise\' || type === \'like\') { #> <!-- 点赞/在看 -->\n          喜欢此内容的人还喜欢        <# } else { #> <!-- 其它 -->\n          喜欢此内容的人还喜欢        <# } #>\n      </div>\n      <div class="function_bd">\n          <div class="relate_article_list relate_article_placeholder js_related_placeholder">\n              <div class="weui-media-box weui-media-box_appmsg"><div class="weui-media-box_placeholder"></div></div>\n              <div class="weui-media-box weui-media-box_appmsg"><div class="weui-media-box_placeholder"></div></div>\n              <div class="weui-media-box weui-media-box_appmsg"><div class="weui-media-box_placeholder"></div></div>\n          </div>\n          <div class="relate_article_index_list relate_article_list js_related_list" style="height: auto;"></div>\n      </div>\n  </div>\n</div>\n';
});define("biz_common/utils/monitor.js",[],function(){
"use strict";
function t(t,r){
if(null===t)return{};
for(var o={},e=Object.keys(t),n=0;n<e.length;n++){
var i=e[n];
r.indexOf(i)>=0||(o[i]=t[i]);
}
return o;
}
function r(t){
var r=[],o=null;
for(o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.push(o+"="+encodeURIComponent(t[o]));
return r.join("&");
}
var o=[],e="/mp/jsmonitor?#wechat_redirect",n={};
return window.__monitor?window.__monitor:(n._reportOptions={
idkey:{}
},n.getReportData=function(t){
t=t||{};
var r,e,i=n._reportOptions.idkey||{},p=null;
try{
for(p in i)Object.prototype.hasOwnProperty.call(i,p)&&i[p]&&o.push(p+"_"+i[p]);
}catch(a){
return!1;
}
if(0===o.length)return!1;
try{
var c=n._reportOptions;
if(null!==c&&void 0!==c)for(e in c)Object.prototype.hasOwnProperty.call(c,e)&&(r[e]=c[e]);
}catch(a){
r={};
}
return r.idkey=o.join(";"),r.t=Math.random(),t.remove!==!1&&(o=[],n._reportOptions={
idkey:{}
}),r;
},n.setLogs=function(r){
var o=r.id,e=r.key,i=r.value,p=t(r,["id","key","value"]),a=n._reportOptions.idkey||{},c=o+"_"+e;
a[c]?a[c]+=i:a[c]=i,n._reportOptions.idkey=a;
try{
if(null!==p&&void 0!==p)for(var s in p)Object.prototype.hasOwnProperty.call(p,s)&&(n._reportOptions[s]=p[s]);
}catch(u){
console.log(u);
}
return n;
},n.setAvg=function(t,r,o){
var e=n._reportOptions.idkey||{},i=t+"_"+r,p=t+"_"+(r-1);
return e[i]?e[i]+=o:e[i]=o,e[p]?e[p]+=1:e[p]=1,n._reportOptions.idkey=e,n;
},n.setSum=function(t,r,o){
var e=n._reportOptions.idkey,i=t+"_"+r;
return e[i]?e[i]+=o:e[i]=o,n._reportOptions.idkey=e,n;
},n.send=function(t,o,i){
t!==!1&&(t=!0);
var p=n.getReportData();
i=i||"",p&&(o&&o instanceof Function?o({
url:i+e,
type:"POST",
mayAbort:!0,
data:p,
async:t,
timeout:2e3
}):(new Image).src=i+"/mp/jsmonitor?"+r(p)+"#wechat_redirect");
},window.__monitor=n,n);
});define("biz_wap/utils/setMpInfo.js",["biz_wap/jsapi/core.js"],function(n,r,t){
"use strict";
function e(n,r){
a(i,n),o.invoke("currentMpInfo",i,r);
}
var o=n("biz_wap/jsapi/core.js"),i={},a=null;
a="function"==typeof Object.assign?Object.assign:function(){
var n=Array.prototype.slice.call(arguments);
if(null==n[0])throw new TypeError("Cannot convert undefined or null to object");
for(var r=Object(n[0]),t=1;t<n.length;t++){
var e=n[t];
if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);
}
return r;
},t.exports={
currentMpInfo:e
};
});var _extends=Object.assign||function(e){
for(var n=1;n<arguments.length;n++){
var t=arguments[n];
for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);
}
return e;
};
define("pages/utils.js",["appmsg/appmsg_report.js","biz_common/utils/emoji_data.js","pages/version4video.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_common/dom/event.js","album/utils/report.js","common/utils.js","biz_common/utils/url/parse.js","appmsg/i18n.js"],function(e){
"use strict";
function n(e){
if(!e)return null;
var n=location.href.match(new RegExp("(\\?|&)"+e+"=([^&]+)"));
return n?n[2].split("#")[0]:null;
}
function t(e){
if(window.hasChannelTwoTab&&C.isNewNativePage()){
var n=void 0;
n=document.getElementById("tab").offsetTop-window.minHeight;
var t=document.body.offsetHeight,i=z+n;
if(i>t){
var o=n+z-document.body.offsetHeight,r=document.createElement("div");
r.setAttribute("class","empty_comment_element"),r.style.cssText="height: "+o+"px;",
document.getElementById(e).appendChild(r);
}
window.minMountHeight=i;
}
}
function i(){
S.on(window,"load",function(){
!window.__networkType&&A.inWechat&&!function(){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
I.invoke("getNetworkType",{},function(n){
window.__networkType=e[n.err_msg];
});
}();
},!1);
}
function o(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
appId:e.appId,
img_url:e.img_url,
img_width:e.img_width,
img_height:e.img_height,
link:e.link.replace(/<br\/>/g,"\n"),
desc:e.desc.replace(/<br\/>/g,"\n"),
title:e.title
};
i(),/#wechat_redirect/.test(n.link)||(n.link+="#wechat_redirect");
var t="",o={
url:n.link,
actionType:0
},r=B;
e.isAlbum?(t="album",n=_extends({
album_id:e.album_id,
album_type:e.album_type
},n),o=_extends({
albumId:e.album_id,
albumType:e.album_type
},o)):"function"==typeof e.shareReport&&(r=function(n,t){
return e.shareReport(t.actionType);
}),I.on("menu:share:appmessage",function(e){
var i=void 0;
e&&"favorite"===e.scene?(i=24,n.link=V(n.link,"scene",Q[1])):(i=1,n.link=V(n.link,"scene",Q[0])),
o.url=n.link,o.actionType=i,r(t,o),I.invoke("sendAppMessage",n);
}),I.on("menu:share:timeline",function(){
n.link=V(n.link,"scene",Q[2]),o.url=n.link,o.actionType=2,r(t,o),I.invoke("shareTimeline",n);
}),I.on("menu:share:weiboApp",function(){
n.link=V(n.link,"scene",Q[3]),o.url=n.link,o.actionType=3,r(t,o),I.invoke("shareWeiboApp",{
img_url:n.img_url,
link:n.link,
title:n.title
});
}),I.on("menu:share:facebook",function(){
n.link=V(n.link,"scene",Q[4]),o.url=n.link,o.actionType=7,r(t,o),I.invoke("shareFB",n);
}),I.on("menu:share:QZone",function(){
n.link=V(n.link,"scene",Q[5]),o.url=n.link,o.actionType=5,r(t,o),I.invoke("shareQZone",n);
}),I.on("menu:share:qq",function(){
n.link=V(n.link,"scene",Q[6]),o.url=n.link,o.actionType=5,r(t,o),I.invoke("shareQQ",n);
}),I.on("menu:share:email",function(){
n.link=V(n.link,"scene",Q[7]),o.url=n.link,o.actionType=5,r(t,o),I.invoke("sendEmail",{
content:n.link,
title:n.title
});
});
}
function r(e){
for(var n=window.location.href,t=n.indexOf("?"),i=n.substr(t+1),o=i.split("&"),r=0;r<o.length;r++){
var a=o[r].split("=");
if(a[0].toUpperCase()==e.toUpperCase())return a[1];
}
return"";
}
function a(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],t=arguments.length<=2||void 0===arguments[2]?function(){}:arguments[2];
T.isWechat&&(T.isIOS||T.isAndroid)?I.invoke("profile",n,t):location.href="/mp/profile_ext?action=home&__biz="+e.biz+"&scene="+e.scene+"#wechat_redirect";
}
function s(e,n){
I.invoke("createWebViewForFastLoad",{
scene:1
},function(){
e.forEach(function(e){
I.invoke("downloadPageDataForFastLoad",{
itemList:[{
item_show_type:5,
url:e[n]
}]
},function(e){
console.log(e);
});
});
});
}
function c(e,n,t){
var i=void 0;
return function(){
var o=this,r=arguments,a=function(){
i=null,t||e.apply(o,r);
},s=t&&!i;
clearTimeout(i),i=setTimeout(a,n),s&&e.apply(o,r);
};
}
function l(e){
var n=parseInt(e,10),t=0,i=0;
n>60&&(t=parseInt(n/60,10),n=parseInt(n%60,10),t>60&&(i=parseInt(t/60,10),t=parseInt(t%60,10))),
10>n&&(n="0"+n);
var o=":"+n;
return t>0?(10>t&&(t="0"+t),o=t+o):o="00"+o,i>0&&(0===parseInt(i,10)?i="":10>i&&(i="0"+i),
o=""+i+":"+o),o;
}
function u(e){
if("en"===window.LANG)return O.dealLikeReadShow_en(e);
var n="";
if(parseInt(e,10)>1e5)n="10万+";else if(parseInt(e,10)>1e4&&parseInt(e,10)<=1e5){
var t=""+parseInt(e,10)/1e4,i=t.indexOf(".");
n=-1===i?t+"万":t.substr(0,i)+"."+t.charAt(i+1)+"万";
}else n=0===parseInt(e,10)?"":e||"";
return n;
}
function d(e,n){
var t=void 0,i=void 0;
return function(){
var o=this,r=arguments,a=+new Date;
t&&t+n>a?(clearTimeout(i),i=setTimeout(function(){
t=a,e.apply(o,r);
},n)):(t=a,e.apply(o,r));
};
}
function m(){
var e=0,n=0,t=0;
return document.body&&(n=document.body.scrollTop),document.documentElement&&(t=document.documentElement.scrollTop),
e=n-t>0?n:t;
}
function p(){
var e=0,n=void 0,t=void 0;
return document.body&&(n=document.body.scrollHeight),document.documentElement&&(t=document.documentElement.scrollHeight),
e=n-t>0?n:t;
}
function g(){
var e=0;
return e="CSS1Compat"===document.compatMode?document.documentElement.clientHeight:document.body.clientHeight;
}
function h(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=location.origin+"/mp/videochannel_profile_page?biz_username="+encodeURIComponent(e.userName)+"&sessionid="+e.sessionId+"&__biz="+e.biz+"&scene="+e.scene+"&subscene="+e.subscene+"&channel_session_id="+e.channelSessionId+"#wechat_redirect";
R(n,!0);
}
function f(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=e.albumLink.replace("#wechat_redirect","")+("&scene="+e.scene+"&is_first_screen=1&subscene="+e.subscene+"&vid="+e.vid+"&count="+(e.pageCount?e.pageCount:3)+"&from_msgid="+(e.curMsgid?e.curMsgid:"")+"&from_itemidx="+(e.curItemidx?e.curItemidx:"")+"&scenenote="+e.scenenote+"#wechat_redirect");
R(n,!0);
}
function w(e){
return e.getBoundingClientRect().top;
}
function v(e){
return e.getBoundingClientRect().height;
}
function _(){
return m()+g()+30>=p();
}
function b(e,n){
return M.getQuery("__biz",e)+"_"+M.getQuery("mid",e)+"_"+M.getQuery("idx",e)+"_"+n;
}
function k(e,n){
var t="en"===window.LANG,i=t?"k":"万",o="",r=1e4*n,a=t?10*n:n;
if(e=parseInt(e,10),e>r)o=a+i+"+";else if(e>=1e4&&r>=e){
var s=""+(t?e/1e3:e/1e4),c=s.indexOf(".");
o=-1===c?s+i:s.substr(0,c)+"."+s.charAt(c+1)+i;
}else o=e;
return o||0;
}
function y(e,n){
if(n.useSwitchVideo||C.isNativePage())I.invoke("handleMPPageAction",_extends({
action:"switchVideo",
scene:n.clickScene,
channelSessionId:window.channel_session_id,
landingType:window.isFromVideoChannel?1:2,
subscene:n.clickSubScene
},e),function(e){
console.log(JSON.stringify(e));
});else if(n.isWcSlPlayerTailIframe&&window.top!==window)window.parent.postMessage({
__wcSlPlayerLoadTailRelateVideo__:e.url
},document.location.protocol+"//mp.weixin.qq.com");else if(!window.__failConfigWxOpen&&C.isWcSlPage())n.leaveReport(),
C.loadNewPageKeepingHistoryStackIfSecOpen(e.url);else{
console.log("==================JSAPI.invoke openWebViewUseFastLoad",window.__failConfigWxOpen,C.isWcSlPage());
var t=n.target.getElementsByClassName("js_relate_cover_img")[0],i=window.getComputedStyle(t),o=t.getBoundingClientRect(),r=document.createElement("canvas");
r.style.width=i.width,r.style.height=i.height,r.width=parseFloat(i.width),r.height=parseFloat(i.height);
var a=r.getContext("2d"),s="";
try{
a.drawImage(t,0,0,o.width,o.height),s=r.toDataURL();
}catch(c){
console.error(c);
}
T.isAndroid&&(s=""),I.invoke("openWebViewUseFastLoad",_extends({
scene:n.clickScene,
item_show_type:5,
openType:0,
subscene:n.clickSubScene,
channelSessionId:window.channel_session_id,
currentInfo:{
url:e.cover,
data:s,
pos:{
x:o.left-parseFloat(i.paddingLeft)-parseFloat(i.borderLeftWidth),
y:o.top-parseFloat(i.paddingTop)-parseFloat(i.borderTopWidth),
width:o.width-parseFloat(i.paddingLeft)-parseFloat(i.paddingRight)-parseFloat(i.borderLeftWidth)-parseFloat(i.borderRightWidth),
height:o.height-parseFloat(i.paddingTop)-parseFloat(i.paddingBottom)-parseFloat(i.borderTopWidth)-parseFloat(i.borderBottomWidth)
}
}
},e),function(t){
console.log(t),t&&t.err_msg&&-1===t.err_msg.indexOf("ok")&&I.invoke("openUrlWithExtraWebview",{
url:e.url,
openType:1
},function(t){
t&&t.err_msg&&-1===t.err_msg.indexOf("ok")&&(n.leaveReport(),window.location.href=e.url);
});
});
}
}
var x=e("appmsg/appmsg_report.js"),W=e("biz_common/utils/emoji_data.js"),j=e("pages/version4video.js"),T=e("biz_wap/utils/mmversion.js"),I=e("biz_wap/jsapi/core.js"),S=e("biz_common/dom/event.js"),E=e("album/utils/report.js"),C=e("common/utils.js"),M=e("biz_common/utils/url/parse.js"),O=e("appmsg/i18n.js"),z=C.getInnerHeight(),F=C.getInnerWidth(),A={
inWechat:j.device.inWechat,
windowWechat:/WindowsWechat/i.test(navigator.userAgent),
macWechat:/wechat.*mac os/i.test(navigator.userAgent),
emojiImg:'<img src="https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single #style#" alt="#name#">',
emojiDataMap:{}
};
!function(){
for(var e=0,n=W.length;n>e;e++){
var t=W[e];
t.cn&&!A.emojiDataMap[t.cn]&&(A.emojiDataMap[t.cn]={
index:e
}),t.hk&&!A.emojiDataMap[t.hk]&&(A.emojiDataMap[t.hk]={
index:e
}),t.us&&!A.emojiDataMap[t.us]&&(A.emojiDataMap[t.us]={
index:e
});
}
}();
var P=function(e){
return/\[[^\[\]]+\]/.test(e)?e.replace(/\[[^\[\]]+\]/g,function(e){
if(A.emojiDataMap[e]&&W[A.emojiDataMap[e].index]){
var n=W[A.emojiDataMap[e].index];
return A.emojiImg.replace("#name#",e).replace("#style#",n.style);
}
return e;
}):e;
},R=function(e,n){
A.inWechat?A.windowWechat||A.macWechat?window.parent.location.href=e:I.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
-1==t.err_msg.indexOf("ok")&&(n===!0?window.parent.open(e):window.parent.location.href=e);
}):n===!0?window.open(e):location.href=e;
},N=function(){
!A.inWechat||A.windowWechat||A.macWechat?window.close():I.invoke("closeWindow",function(e){
-1==e.err_msg.indexOf("ok")&&window.close();
});
},L=function(e){
return document.getElementById(e);
},B=function(e){
var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
"album"===e&&E.shareReport(n);
},H=function(e,n){
return(n||document).getElementsByClassName(e);
},q=function(e){
return(""+(e||"")).replace(/^\s+|\s+$/g,"");
},D=function(e,n){
return(n||document).querySelector(e);
},U=function(e,n){
return(n||document).querySelectorAll(e);
},V=function(e,n,t){
var i=new RegExp(n+"=[^&]*","gi"),o=n+"="+t;
return i.test(e)?e.replace(i,o):e.replace(/(#.*)?$/,""+(e.indexOf("?")>-1?"&":"?")+o+"$1");
},Q=[1,24,2,3,43,22,23,5],G=null,$=function(e){
var t=e.$container;
t&&!T.isInMiniProgram&&(G&&S.off(t,"tap",G),S.on(t,"tap",".js_go_profile",G=function(t){
var i=t.delegatedTarget;
i&&!function(){
var t=i.getAttribute("data-biz")||e.biz||window.biz||"";
if("function"==typeof e.beforeGo2Profile&&e.beforeGo2Profile(i),1==window.isprofileblock)I.invoke("openUrlWithExtraWebview",{
url:"https://mp.weixin.qq.com/mp/profileblock?__biz="+t+"#wechat_redirect",
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href="https://mp.weixin.qq.com/mp/profileblock?__biz="+t+"#wechat_redirect");
});else{
var o=i.getAttribute("data-scene")||e.profile_scene||"";
x.profileReport({
isnew:0,
title:e.title||"",
item_show_type:e.item_show_type||""
}),console.log("channelSessionId"+n("channel_session_id")),I.invoke("profile",{
username:e.user_name,
profileReportInfo:"",
scene:o+"",
channelSessionId:n("channel_session_id"),
subscene:e.subscene,
tabType:e.tabType||1
},function(){});
}
}();
}));
},J=function(e){
var n=arguments.length<=1||void 0===arguments[1]?.5:arguments[1],t=arguments.length<=2||void 0===arguments[2]?"vertical":arguments[2],i=arguments.length<=3||void 0===arguments[3]?window:arguments[3];
if(!e)return!1;
var o=!1,r=0,a=0,s=!1,c=!1,l=i===i.window?F:i.getBoundingClientRect().width,u=i===i.window?z:i.getBoundingClientRect().height;
switch("number"==typeof n?(r=n,a=n):(r=n.vertical,a=n.horizontal),t){
case"vertical":
s=!0;
break;

case"horizontal":
c=!0;
break;

case"all":
s=!0,c=!0;
}
var d=e.getBoundingClientRect();
if(s){
var m=d.height*r;
d.bottom>m&&d.top<u-m&&(o=!0);
}
if(!c)return o;
if(s&&!o)return o;
var p=d.width*a;
return o=d.right>p&&d.left<l-p?!0:!1;
},Z=function(e,n){
for(;e;){
if(e===n)return!0;
e=e.parentNode;
}
return!1;
},K=function(e){
var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],t=arguments.length<=2||void 0===arguments[2]?"webview":arguments[2];
if(e){
/^http/.test(e)||(e=location.protocol+"//"+location.host+e);
var i=(-1===e.indexOf("?")?"?":"&")+Object.keys(n).map(function(e){
return e+"="+n[e];
}).join("&"),o=e.indexOf("#");
switch(-1===o?e+=i+"#wechat_redirect":e=e.slice(0,o)+i+e.slice(o),t){
case"webview":
-1!==navigator.userAgent.indexOf("MicroMessenger")&&(T.isIOS||T.isAndroid||T.isWp)?I.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(n){
-1===n.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e;
break;

case"href":
default:
location.href=e;
}
}
},X=function(e){
if(!e.length)return{};
var n=e.indexOf("?"),t={};
return n>-1&&e.slice(n+1,e.indexOf("#")>-1?e.indexOf("#"):void 0).split("&").forEach(function(e){
if(e){
var n=e.indexOf("=");
n>-1?t[e.slice(0,n)]=e.slice(n+1):t[e]="";
}
}),t;
},Y=function(){
var e=arguments.length<=0||void 0===arguments[0]?0:arguments[0],n=arguments.length<=1||void 0===arguments[1]?1:arguments[1];
if("number"!=typeof e||"number"!=typeof n)throw new Error(e+" and "+n+" should be a number.");
var t={
value:0,
unit:""
},i=1e4,o=["","万","亿","万亿"],r=0;
return"en"===window.LANG&&(i=1e3,o=["","k","m","b"]),i>e?(t.value=e,t.unit=""):(r=Math.floor(Math.log(e)/Math.log(i)),
t.value=(e/Math.pow(i,r)).toFixed(n),t.unit=o[r]),t.value+t.unit;
},en=function(e){
e=e||document.body;
var n=document.createElement("div");
n.style.width="1000em",e.appendChild(n);
var t=n.offsetWidth/1e3;
return e.removeChild(n),t;
},nn=function(){
var e=document.createElement("style");
return e.innerHTML="* { -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }",
{
enableSelect:function(){
document.head.contains(e)&&document.head.removeChild(e);
},
disableSelect:function(){
document.head.appendChild(e);
}
};
}(),tn=nn.enableSelect,on=nn.disableSelect;
return{
jumpUrl:R,
closeWin:N,
trim:q,
getId:L,
qs:D,
qsAll:U,
inWechat:A.inWechat,
windowWechat:A.windowWechat,
macWechat:A.macWechat,
emojiFormat:P,
getParam:n,
go2ProfileEvent:$,
prepareNativePage:s,
debounce:c,
throttle:d,
formatReadNum:u,
formatSeconds:l,
setTwoTabHeight:t,
getByClass:H,
getScrollTop:m,
getScrollHeight:p,
getWindowHeight:g,
shareMessage:o,
getElementTop:w,
formatAlbumnReadNum:k,
getElementHeight:v,
getQuery:r,
openAllVideoPage:h,
getNetWorkType:i,
getMoreVideoInfo:b,
isPageEnd:_,
openAlbumPage:f,
switchVideo:y,
checkExposedStatus:J,
isParent:Z,
goUrl:K,
getUrlParamsMap:X,
numFormat2Unit:Y,
goProfile:a,
getDefaultFontSize:en,
enableSelect:tn,
disableSelect:on
};
});define("appmsg/like_profile_tpl.html.js",[],function(){
return'<!-- 关注 -->\n<!-- 显示：去掉wx_follow_hide，并获取function_mod_inner的高度，赋值给function_mod即可-->\n<div class="wx_follow_context wx_follow_hide" id="js_like_profile_bar">\n    <div class="function_mod js_function_mod">\n        <div class="function_mod_inner js_function_mod_inner">\n        <div class="function_hd">关注以获取最新消息</div>\n        <div class="function_bd">\n            <div class="wx_follow_media weui-flex">\n            <div class="wx_follow_hd">\n                <img class="wx_follow_avatar" src="{roundHeadImg}" alt="<#=nickname#>">\n\n            </div>\n            <div class="wx_follow_bd weui-flex__item">\n                <div class="wx_follow_nickname">{nickname}</div>\n                <div class="wx_follow_tips">\n                    {if orignalNum}\n                    <span class="wx_follow_tips_meta">{orignalNum}篇原创内容</span>\n                    {/if}\n                    {if friendSubscribeCount}\n                    <span class="wx_follow_tips_meta">{friendSubscribeCount}位朋友关注</span>\n                    {/if}\n                </div>\n            </div>\n            <div class="wx_follow_ft">\n                <button class="weui-btn weui-btn_primary weui-btn_xmini" type="button" id="js_focus">关注</button>\n                <button class="weui-btn weui-btn_primary weui-btn_xmini weui-btn_disabled" type="button" id="js_already_focus" style="display: none;">已关注</button>\n            </div>\n            </div>\n        </div>\n        </div>\n    </div>\n</div>\n';
});define("biz_common/template-2.0.1-cmd.js",[],function(){
"use strict";
var e=function(n,t){
return e["object"==typeof t?"render":"compile"].apply(e,arguments);
};
return window.template=e,function(e,n){
e.version="2.0.1",e.openTag="<#",e.closeTag="#>",e.isEscape=!0,e.isCompress=!1,e.parser=null,
e.render=function(e,n){
var t=r(e);
return void 0===t?o({
id:e,
name:"Render Error",
message:"No Template"
}):t(n);
},e.compile=function(n,r){
function a(t){
try{
return new l(t)+"";
}catch(i){
return u?(i.id=n||r,i.name="Render Error",i.source=r,o(i)):e.compile(n,r,!0)(t);
}
}
var c=arguments,u=c[2],s="anonymous";
"string"!=typeof r&&(u=c[1],r=c[0],n=s);
try{
var l=i(r,u);
}catch(p){
return p.id=n||r,p.name="Syntax Error",o(p);
}
return a.prototype=l.prototype,a.toString=function(){
return l.toString();
},n!==s&&(t[n]=a),a;
},e.helper=function(n,t){
e.prototype[n]=t;
},e.onerror=function(e){
var t="[template]:\n"+e.id+"\n\n[name]:\n"+e.name;
e.message&&(t+="\n\n[message]:\n"+e.message),e.line&&(t+="\n\n[line]:\n"+e.line,
t+="\n\n[source]:\n"+e.source.split(/\n/)[e.line-1].replace(/^[\s\t]+/,"")),e.temp&&(t+="\n\n[temp]:\n"+e.temp),
n.console&&console.error(t);
};
var t={},r=function(r){
var o=t[r];
if(void 0===o&&"document"in n){
var i=document.getElementById(r);
if(i){
var a=i.value||i.innerHTML;
return e.compile(r,a.replace(/^\s*|\s*$/g,""));
}
}else if(t.hasOwnProperty(r))return o;
},o=function(n){
function t(){
return t+"";
}
return e.onerror(n),t.toString=function(){
return"{Template Error}";
},t;
},i=function(){
e.prototype={
$render:e.render,
$escape:function(e){
return"string"==typeof e?e.replace(/&(?![\w#]+;)|[<>"']/g,function(e){
return{
"<":"&#60;",
">":"&#62;",
'"':"&#34;",
"'":"&#39;",
"&":"&#38;"
}[e];
}):e;
},
$string:function(e){
return"string"==typeof e||"number"==typeof e?e:"function"==typeof e?e():"";
}
};
var n=Array.prototype.forEach||function(e,n){
for(var t=this.length>>>0,r=0;t>r;r++)r in this&&e.call(n,this[r],r,this);
},t=function(e,t){
n.call(e,t);
},r="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",o=/\/\*(?:.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|'[^']*'|"[^"]*"|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,i=/[^\w$]+/g,a=new RegExp(["\\b"+r.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),c=/\b\d[^,]*/g,u=/^,+|,+$/g,s=function(e){
return e=e.replace(o,"").replace(i,",").replace(a,"").replace(c,"").replace(u,""),
e=e?e.split(/,+/):[];
};
return function(n,r){
function o(n){
return g+=n.split(/\n/).length-1,e.isCompress&&(n=n.replace(/[\n\r\t\s]+/g," ")),
n=n.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n"),n=w[1]+"'"+n+"'"+w[2],
n+"\n";
}
function i(n){
var t=g;
if(p?n=p(n):r&&(n=n.replace(/\n/g,function(){
return g++,"$line="+g+";";
})),0===n.indexOf("=")){
var o=0!==n.indexOf("==");
if(n=n.replace(/^=*|[\s;]*$/g,""),o&&e.isEscape){
var i=n.replace(/\s*\([^\)]+\)/,"");
$.hasOwnProperty(i)||/^(include|print)$/.test(i)||(n="$escape($string("+n+"))");
}else n="$string("+n+")";
n=w[1]+n+w[2];
}
return r&&(n="$line="+t+";"+n),a(n),n+"\n";
}
function a(e){
e=s(e),t(e,function(e){
h.hasOwnProperty(e)||(c(e),h[e]=!0);
});
}
function c(e){
var n;
"print"===e?n=O:"include"===e?(y.$render=$.$render,n=j):(n="$data."+e,$.hasOwnProperty(e)&&(y[e]=$[e],
n=0===e.indexOf("$")?"$helpers."+e:n+"===undefined?$helpers."+e+":"+n)),m+=e+"="+n+",";
}
var u=e.openTag,l=e.closeTag,p=e.parser,f=n,d="",g=1,h={
$data:!0,
$helpers:!0,
$out:!0,
$line:!0
},$=e.prototype,y={},m="var $helpers=this,"+(r?"$line=0,":""),v="".trim,w=v?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],b=v?"if(content!==undefined){$out+=content;return content}":"$out.push(content);",O="function(content){"+b+"}",j="function(id,data){if(data===undefined){data=$data}var content=$helpers.$render(id,data);"+b+"}";
t(f.split(u),function(e){
e=e.split(l);
var n=e[0],t=e[1];
1===e.length?d+=o(n):(d+=i(n),t&&(d+=o(t)));
}),f=d,r&&(f="try{"+f+"}catch(e){e.line=$line;throw e}"),f="'use strict';"+m+w[0]+f+"return new String("+w[3]+")";
try{
var E=new Function("$data",f);
return E.prototype=y,E;
}catch(T){
throw T.temp="function anonymous($data) {"+f+"}",T;
}
};
}();
e.openTag="{",e.closeTag="}",e.parser=function(n){
n=n.replace(/^\s/,"");
var t=n.split(" "),r=t.shift(),o=e.keywords,i=o[r];
return i&&o.hasOwnProperty(r)?(t=t.join(" "),n=i.call(n,t)):e.prototype.hasOwnProperty(r)?(t=t.join(","),
n="=="+r+"("+t+");"):(n=n.replace(/[\s;]*$/,""),n="="+n),n;
},e.keywords={
"if":function(e){
return"if("+e+"){";
},
"else":function(e){
return e=e.split(" "),e="if"===e.shift()?" if("+e.join(" ")+")":"","}else"+e+"{";
},
"/if":function(){
return"}";
},
each:function(e){
e=e.split(" ");
var n=e[0]||"$data",t=e[1]||"as",r=e[2]||"$value",o=e[3]||"$index",i=r+","+o;
return"as"!==t&&(n="[]"),"$each("+n+",function("+i+"){";
},
"/each":function(){
return"});";
},
echo:function(e){
return"print("+e+");";
},
include:function(e){
e=e.split(" ");
var n=e[0],t=e[1],r=n+(t?","+t:"");
return"include("+r+");";
}
},e.helper("$each",function(e,n){
var t=Array.isArray||function(e){
return"[object Array]"===Object.prototype.toString.call(e);
};
if(t(e))for(var r=0,o=e.length;o>r;r++)n.call(e,e[r],r,e);else for(r in e)n.call(e,e[r],r);
});
}(e,window),e;
});define("tpl/appmsg/loading.html.js",[],function(){
return'<div style="display: none;">\n  <div class="weui-mask_transparent"></div>\n  <div class="weui-toast">\n    <i class="weui-loading weui-icon_toast"></i>\n    <p class="weui-toast__content js_loading_content"></p>\n  </div>\n</div>';
});define("biz_common/base64.js",[],function(r,t,n){
"use strict";
var e,c="2.1.9";
if("undefined"!=typeof n&&n.exports)try{}catch(o){}
var u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=function(r){
for(var t={},n=0,e=r.length;e>n;n++)t[r.charAt(n)]=n;
return t;
}(u),h=String.fromCharCode,i=function(r){
if(r.length<2){
var t=r.charCodeAt(0);
return 128>t?r:2048>t?h(192|t>>>6)+h(128|63&t):h(224|t>>>12&15)+h(128|t>>>6&63)+h(128|63&t);
}
var t=65536+1024*(r.charCodeAt(0)-55296)+(r.charCodeAt(1)-56320);
return h(240|t>>>18&7)+h(128|t>>>12&63)+h(128|t>>>6&63)+h(128|63&t);
},f=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,A=function(r){
return r.replace(f,i);
},d=function(r){
var t=[0,2,1][r.length%3],n=r.charCodeAt(0)<<16|(r.length>1?r.charCodeAt(1):0)<<8|(r.length>2?r.charCodeAt(2):0),e=[u.charAt(n>>>18),u.charAt(n>>>12&63),t>=2?"=":u.charAt(n>>>6&63),t>=1?"=":u.charAt(63&n)];
return e.join("");
},g=function(r){
return r.replace(/[\s\S]{1,3}/g,d);
},s=e?function(r){
return(r.constructor===e.constructor?r:new e(r)).toString("base64");
}:function(r){
return g(A(r));
},C=function(r,t){
return t?s(String(r)).replace(/[+\/]/g,function(r){
return"+"==r?"-":"_";
}).replace(/=/g,""):s(String(r));
},l=function(r){
return C(r,!0);
},p=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),S=function(r){
switch(r.length){
case 4:
var t=(7&r.charCodeAt(0))<<18|(63&r.charCodeAt(1))<<12|(63&r.charCodeAt(2))<<6|63&r.charCodeAt(3),n=t-65536;
return h((n>>>10)+55296)+h((1023&n)+56320);

case 3:
return h((15&r.charCodeAt(0))<<12|(63&r.charCodeAt(1))<<6|63&r.charCodeAt(2));

default:
return h((31&r.charCodeAt(0))<<6|63&r.charCodeAt(1));
}
},b=function(r){
return r.replace(p,S);
},v=function(r){
var t=r.length,n=t%4,e=(t>0?a[r.charAt(0)]<<18:0)|(t>1?a[r.charAt(1)]<<12:0)|(t>2?a[r.charAt(2)]<<6:0)|(t>3?a[r.charAt(3)]:0),c=[h(e>>>16),h(e>>>8&255),h(255&e)];
return c.length-=[0,0,2,1][n],c.join("");
},F=function(r){
return r.replace(/[\s\S]{1,4}/g,v);
},j=e?function(r){
return(r.constructor===e.constructor?r:new e(r,"base64")).toString();
}:function(r){
return b(F(r));
},m=function(r){
return j(String(r).replace(/[-_]/g,function(r){
return"-"==r?"+":"/";
}).replace(/[^A-Za-z0-9\+\/]/g,""));
};
return{
VERSION:c,
atob:F,
btoa:g,
fromBase64:m,
toBase64:C,
utob:A,
encode:C,
encodeURI:l,
btou:b,
decode:m
};
});