"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[8750],{66481:function(e,n,i){var t=i(62711),o=i(80184);n.Z=function(e){var n=e.likeView,i=e.commentCount;return(0,o.jsxs)("div",{className:"d-flex align-items-center justify-content-center user-review",children:[(0,o.jsxs)("span",{className:"me-3 d-flex",children:[(0,o.jsx)(t.JO,{icon:"heroicons-solid:thumb-up",width:"17",height:"17",className:"me-1"})," ",null===n||void 0===n?void 0:n.like_count," "]}),(0,o.jsxs)("span",{className:"me-3 d-flex",children:[(0,o.jsx)(t.JO,{icon:"heroicons-solid:eye",width:"17",height:"17",className:"me-1"})," ",null===n||void 0===n?void 0:n.watch_count," "]}),(0,o.jsxs)("span",{className:"d-flex",children:[(0,o.jsx)(t.JO,{icon:"mdi:message",width:"17",height:"17",className:"me-1"})," ",i," "]})]})}},58750:function(e,n,i){i.r(n),i.d(n,{default:function(){return k}});var t=i(4942),o=i(1413),l=i(15861),s=i(70885),a=i(87757),c=i.n(a),r=i(7788),d=i(62711),u=i(71909),v=i(72426),m=i.n(v),h=i(74405),p=i(72791),f=i(94677),x=i(74551),_=i(17834),j=i(40872),b=i(80184),g=function(e){var n,i=e.openRejectModal,t=e.handleCloseRejectObs,a=e.data,d=e.user,u=e.token,v=e.approveReject,m=e.handleDetailPopup,h=null===d||void 0===d?void 0:d.is_superuser,_=(0,p.useState)({inappropriate_image:!1,other:!1,additional_comment:""}),j=(0,s.Z)(_,2),g=j[0],w=j[1],k=(0,p.useState)(),y=(0,s.Z)(k,2),N=y[0],Z=y[1],C=(0,p.useState)(),O=(0,s.Z)(C,2),J=O[0],X=O[1],A=(0,p.useRef)(null),z=(0,p.useRef)(null),R=function(e){var n,i;w((0,o.Z)((0,o.Z)({},g),{},{inappropriate_image:null!==A&&void 0!==A&&null!==(n=A.current)&&void 0!==n&&n.checked?1:0,other:null!==z&&void 0!==z&&null!==(i=z.current)&&void 0!==i&&i.checked?1:0}))},S={name:"REJECT",reason:g},T=function(){var e=(0,l.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Z(""),X(""),!h){e.next=5;break}return e.next=5,f.Z.post("".concat(x.v2.api,"/observation/verify_observation/").concat(null===a||void 0===a?void 0:a.id,"/"),S,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(u)}}).then((function(e){var n;v(!0),setTimeout((function(){t(!1)}),1200),setTimeout((function(){m(!1)}),1500),X({message:null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.success})})).catch((function(e){var n,i;console.log(e),Z({notAllowed:null===e||void 0===e||null===(n=e.response)||void 0===n||null===(i=n.data)||void 0===i?void 0:i.detail})}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,b.jsxs)(r.u_,{isOpen:i,centered:!0,backdrop:!0,keyboard:!0,toggle:t,className:"reject-modal",children:[(0,b.jsx)(r.xB,{toggle:t,children:"Reject Observation"}),(0,b.jsx)(r.fe,{className:"p-3",children:(0,b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),T().then((function(e){return e}))},children:[J&&(null===J||void 0===J?void 0:J.message)&&(0,b.jsx)(r.sU,{color:"success","data-dismiss":"alert",dismissible:"true",className:"text-left",children:null===J||void 0===J?void 0:J.message}),(0,b.jsx)(r.__,{className:"text-uppercase mb-2",children:"Reason for Rejection"}),(null===N||void 0===N?void 0:N.notAllowed)&&(0,b.jsx)(r.sU,{color:"danger","data-dismiss":"alert",dismissible:"true",className:"text-left",children:null===N||void 0===N?void 0:N.notAllowed}),(0,b.jsxs)(r.X2,{children:[(0,b.jsx)(r.JX,{sm:6,children:(0,b.jsx)(r.cw,{check:!0,children:(0,b.jsxs)(r.__,{check:!0,className:"mb-0",children:[(0,b.jsx)("input",{ref:A,className:"form-check-input",type:"checkbox",name:"inappropriate_image",checked:1===(null===g||void 0===g?void 0:g.inappropriate_image),onChange:function(e){return R()}}),"Inappropriate Image"]})})}),(0,b.jsx)(r.JX,{sm:6,children:(0,b.jsx)(r.cw,{check:!0,children:(0,b.jsxs)(r.__,{check:!0,className:"mb-0",children:[(0,b.jsx)("input",{ref:z,className:"form-check-input",type:"checkbox",checked:1===(null===g||void 0===g?void 0:g.other),name:"other",onChange:function(e){return R()}}),"Other"]})})}),(0,b.jsx)(r.JX,{sm:12,children:(0,b.jsxs)(r.cw,{className:"mt-4 mb-4",children:[(0,b.jsx)(r.__,{className:"text-uppercase mb-2",children:"Additional Comments"}),(0,b.jsx)(r.II,{type:"textarea",name:"additional_comment",placeholder:"Write..",rows:"3",value:null!==(n=null===g||void 0===g?void 0:g.additional_comment)&&void 0!==n?n:"",style:{resize:"none"},onChange:function(e){return function(e){w((0,o.Z)((0,o.Z)({},g),{},{additional_comment:e.target.value}))}(e)}})]})}),(0,b.jsxs)(r.JX,{sm:12,children:[(0,b.jsx)(r.zx,{className:"me-2 gray-outline-btn ",onClick:function(){return t()},children:"Cancel"}),(0,b.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Submit"})]})]})]})})]})},w=i(66481),k=function(e){var n,i,a,v,k,y,N,Z,C,O,J,X,A,z,R,S,T,D,U,E,P=(0,_.Z)().auth,Y=e.data,B=e.obvCommentCount,I=e.handlePopup,L=e.approveRejectEvent,M=e.activeType,V=(0,j.Z)(),F=V.observationListData,W=V.setObservationListData,q=(0,p.useState)(null===(n=F.active)||void 0===n||null===(i=n.like_watch_count_data)||void 0===i?void 0:i.is_like),H=(0,s.Z)(q,2),Q=H[0],G=H[1],K=(0,p.useState)(!1),$=(0,s.Z)(K,2),ee=$[0],ne=$[1],ie=(0,p.useState)(),te=(0,s.Z)(ie,2),oe=te[0],le=te[1],se=(0,p.useState)(),ae=(0,s.Z)(se,2),ce=ae[0],re=ae[1],de=null===P||void 0===P?void 0:P.user,ue=null===de||void 0===de?void 0:de.is_superuser,ve=null===P||void 0===P||null===(a=P.token)||void 0===a?void 0:a.access,me=null===F||void 0===F?void 0:F.list,he=new FormData,pe=(0,p.useState)({}),fe=(0,s.Z)(pe,2),xe=fe[0],_e=fe[1],je=function(){var e=(0,l.Z)(c().mark((function e(n){var i,t,l,s,a,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return he.set("is_like",Q?0:1),s=null===F||void 0===F?void 0:F.active,a=null===s||void 0===s||null===(i=s.like_watch_count_data)||void 0===i?void 0:i.is_like,r=null===s||void 0===s||null===(t=s.like_watch_count_data)||void 0===t?void 0:t.like_count,e.next=4,f.Z.post(x.v2.api+"/observation/like/"+n+"/",he,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(null===P||void 0===P||null===(l=P.token)||void 0===l?void 0:l.access)}}).then((function(e){a||(G(!Q),null===me||void 0===me||me.filter((function(e){return(null===e||void 0===e?void 0:e.id)===(null===Y||void 0===Y?void 0:Y.id)})).map((function(e,n){return e.like_watch_count_data.is_like=!0,e.like_watch_count_data.like_count=a?r:r+1,e})),W((function(e){return(0,o.Z)((0,o.Z)({},e),{},{list:me,active:(0,o.Z)((0,o.Z)({},s),{},{like_watch_count_data:(0,o.Z)((0,o.Z)({},null===s||void 0===s?void 0:s.like_watch_count_data),{},{is_like:Q,like_count:a?r:r+1})})})})))})).catch((function(e){console.log(e)}));case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),be=function(){ne(!ee)},ge=function(){var e=(0,l.Z)(c().mark((function e(n){var i;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.Z.post(x.v2.api+"/observation/watch_count/"+n+"/",null,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(null===P||void 0===P||null===(i=P.token)||void 0===i?void 0:i.access)}}).then((function(e){var n,i,t=null===F||void 0===F?void 0:F.active,l=null===t||void 0===t||null===(n=t.like_watch_count_data)||void 0===n?void 0:n.is_watch,s=null===t||void 0===t||null===(i=t.like_watch_count_data)||void 0===i?void 0:i.watch_count;null===me||void 0===me||me.filter((function(e){return(null===e||void 0===e?void 0:e.id)===(null===t||void 0===t?void 0:t.id)})).map((function(e,n){return e.like_watch_count_data.is_watch=!0,e.like_watch_count_data.watch_count=l?s:s+1,e})),W((function(e){return(0,o.Z)((0,o.Z)({},e),{},{active:(0,o.Z)((0,o.Z)({},t),{},{like_watch_count_data:(0,o.Z)((0,o.Z)({},null===t||void 0===t?void 0:t.like_watch_count_data),{},{watch_count:l?s:s+1})})})}))}));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),we=function(){var e=(0,l.Z)(c().mark((function e(n){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return re(""),le(""),e.next=4,f.Z.post("".concat(x.v2.api,"/observation/verify_observation/").concat(n,"/"),{name:"APPROVE",reason:""},{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(ve)}}).then((function(e){var n;re({message:null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.success}),L(!0),setTimeout((function(){I(!1)}),1200)})).catch((function(e){var n,i;console.log(null===e||void 0===e?void 0:e.response),le({notAllowed:null===e||void 0===e||null===(n=e.response)||void 0===n||null===(i=n.data)||void 0===i?void 0:i.detail})}));case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),ke=function(e,n,i){_e((0,o.Z)((0,o.Z)({},xe),{},(0,t.Z)({},n,{vote:e==="yes".concat(i)?1:0,category_id:n})))},ye=function(){var e=(0,l.Z)(c().mark((function e(n){var i,t,l;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(l in t=[],n.preventDefault(),xe)t.push(xe[l]);return e.next=5,f.Z.post(x.v2.api+"/observation/vote/"+(null===Y||void 0===Y?void 0:Y.id)+"/",{votes:t},{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(null===P||void 0===P||null===(i=P.token)||void 0===i?void 0:i.access)}}).then((function(e){var n,i=null===F||void 0===F?void 0:F.active;null===me||void 0===me||me.filter((function(e){return(null===e||void 0===e?void 0:e.id)===(null===Y||void 0===Y?void 0:Y.id)})).map((function(e,n){return e.user_data.is_voted=!0,e})),i.user_data.is_voted=!0,W((function(e){return(0,o.Z)((0,o.Z)({},e),{},{list:me,active:(0,o.Z)({},i)})})),setTimeout((function(){I(!0)}),1200),re({message:null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.success}),le("")})).catch((function(e){console.log(e)}));case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,p.useEffect)((function(){var e,n;!(null!==F&&void 0!==F&&null!==(e=F.active)&&void 0!==e&&null!==(n=e.like_watch_count_data)&&void 0!==n&&n.is_watch)&&null!==Y&&void 0!==Y&&Y.id&&de&&ge(null===Y||void 0===Y?void 0:Y.id).then((function(e){return e}))}),[null===Y||void 0===Y?void 0:Y.id,null===F||void 0===F||null===(v=F.active)||void 0===v||null===(k=v.like_watch_count_data)||void 0===k?void 0:k.is_watch]),(0,b.jsxs)("div",{className:"more-details",children:[(0,b.jsx)(r.X2,{children:(0,b.jsxs)(r.JX,{md:12,children:[(0,b.jsxs)(r.X2,{className:"align-items-center",children:[(0,b.jsx)(r.JX,{sm:3,children:(0,b.jsx)("h6",{className:"m-0 text-uppercase fw-normal",children:"Azimuth"})}),(0,b.jsx)(r.JX,{sm:9,className:"text-end",children:(0,b.jsxs)("p",{className:"selected_direction rounded-circle mb-0 d-inline-flex align-items-center justify-content-center fw-bold",children:[(0,b.jsx)("span",{children:null===Y||void 0===Y||null===(y=Y.images[0])||void 0===y?void 0:y.azimuth}),(0,b.jsx)("i",{style:{"--selected-angle":"".concat((0,h.ZQ)(null===Y||void 0===Y||null===(N=Y.images[0])||void 0===N?void 0:N.azimuth),"deg")},className:"direction_arrow d-flex align-items-center justify-content-center position-absolute left-0 right-0 top-0 bottom-0"})]})})]}),(0,b.jsx)("div",{className:"border-line my-2"}),(0,b.jsxs)(r.X2,{className:"align-items-center",children:[(0,b.jsx)(r.JX,{sm:3,children:(0,b.jsx)("h6",{className:"m-0 text-uppercase fw-normal",children:"When"})}),(0,b.jsx)(r.JX,{sm:9,children:(0,b.jsxs)("p",{className:"mb-0 h-100 d-flex align-items-center justify-content-end fw-bold text-end position-relative",children:[null!==Y&&void 0!==Y&&null!==(Z=Y.images[0])&&void 0!==Z&&Z.obs_date_time_as_per_utc?m().utc(m()(null===Y||void 0===Y||null===(C=Y.images[0])||void 0===C?void 0:C.obs_date_time_as_per_utc).utc()).format("MMM DD, YYYY"):null,(0,b.jsxs)("span",{className:"d-flex align-items-center justify-content-end fw-normal ms-1",children:[" ",null!==Y&&void 0!==Y&&null!==(O=Y.images[0])&&void 0!==O&&O.obs_date_time_as_per_utc?m().utc(m()(null===Y||void 0===Y||null===(J=Y.images[0])||void 0===J?void 0:J.obs_date_time_as_per_utc).utc()).format("hh:mm:ss A"):null,(0,b.jsx)(r.Ct,{className:"bg-black text-white p-1 fw-normal ms-1",children:null!==Y&&void 0!==Y&&null!==(X=Y.images[0])&&void 0!==X&&X.obs_date_time_as_per_utc?"UTC":null})]})]})})]}),(0,b.jsx)("div",{className:"border-line my-2"}),(0,b.jsxs)(r.X2,{className:"align-items-center",children:[(0,b.jsx)(r.JX,{sm:3,children:(0,b.jsx)("h6",{className:"m-0 text-uppercase fw-normal",children:"LOCATION"})}),(0,b.jsx)(r.JX,{sm:9,children:(0,b.jsxs)("p",{className:"mb-0 h-100 d-flex align-items-center justify-content-end fw-bold text-end",children:[(0,b.jsx)(u.Z,{country:null===Y||void 0===Y||null===(A=Y.images[0])||void 0===A?void 0:A.country_code}),(0,b.jsx)("span",{className:"ms-1",children:null===Y||void 0===Y||null===(z=Y.images[0])||void 0===z?void 0:z.location})]})})]}),(0,b.jsx)("div",{className:"border-line my-2 mb-4"}),(0,b.jsxs)(r.X2,{children:[de&&(0,b.jsx)(r.JX,{sm:12,children:(0,b.jsxs)("button",{className:"btn btn-".concat(Q?"":"outline-","primary like-btn w-100 d-flex align-items-center justify-content-center py-2 mb-3"),onClick:function(){return je(null===Y||void 0===Y?void 0:Y.id)},disabled:Q,children:[(0,b.jsx)(d.JO,{icon:"heroicons-".concat(Q?"solid":"outline",":thumb-up"),width:"25",height:"25",className:"me-2"}),(0,b.jsx)("span",{children:Q?"Liked":"Like"})]})}),ce&&(null===ce||void 0===ce?void 0:ce.message)&&(0,b.jsx)(r.sU,{color:"success","data-dismiss":"alert",dismissible:"true",className:"text-left",children:null===ce||void 0===ce?void 0:ce.message}),(null===oe||void 0===oe?void 0:oe.notAllowed)&&(0,b.jsx)(r.sU,{color:"danger","data-dismiss":"alert",dismissible:"true",className:"text-left",children:null===oe||void 0===oe?void 0:oe.notAllowed}),ue&&window.location.href.split("/")[window.location.href.split("/").length-1]===x.X0.dashboard&&"verified"!==M&&"denied"!==M&&(0,b.jsx)(r.JX,{sm:12,children:(0,b.jsxs)("div",{className:"w-100 d-flex justify-content-between align-items-center verify-btns mb-4",children:[(0,b.jsxs)(r.zx,{color:"success",onClick:function(){return e=null===Y||void 0===Y?void 0:Y.id,void we(e).then((function(e){return e}));var e},className:"me-2 text-uppercase fw-bold px-5",children:[(0,b.jsx)(d.JO,{icon:"ci:circle-check-outline",className:"me-1"}),"Approve"]}),(0,b.jsxs)(r.zx,{color:"primary",className:"text-uppercase fw-bold px-4",onClick:function(){be()},outline:!0,children:[(0,b.jsx)(d.JO,{icon:"zondicons:close-outline",className:"me-1"}),"Reject"]})]})}),(0,b.jsx)(r.JX,{sm:12,children:(0,b.jsx)(w.Z,{likeView:null===F||void 0===F||null===(R=F.active)||void 0===R?void 0:R.like_watch_count_data,commentCount:B})})]}),(0,b.jsx)("div",{className:"border-line my-4"}),(null===Y||void 0===Y||null===(S=Y.user_data)||void 0===S?void 0:S.is_can_vote)&&!(null!==Y&&void 0!==Y&&Y.is_verified||null!==Y&&void 0!==Y&&Y.is_reject)&&!(null!==Y&&void 0!==Y&&null!==(T=Y.user_data)&&void 0!==T&&T.is_voted)&&(null===Y||void 0===Y?void 0:Y.category_data.length)>0&&window.location.href.split("/")[window.location.href.split("/").length-1]===x.X0.gallery&&!(null!==de&&void 0!==de&&de.is_user)&&(0,b.jsxs)(r.l0,{onSubmit:ye,children:[(0,b.jsx)("h4",{className:"mt-3",children:"Vote for observation"}),null===Y||void 0===Y||null===(D=Y.category_data)||void 0===D?void 0:D.map((function(e,n){return(0,b.jsx)("div",{className:"question-box mt-3 d-inline-block w-100",children:null!==xe&&void 0!==xe&&xe[null===e||void 0===e?void 0:e.id]?(0,b.jsxs)("h5",{className:"mb-0",children:[" You have voted for ",null===e||void 0===e?void 0:e.name," to ",null!==xe&&void 0!==xe&&xe[null===e||void 0===e?void 0:e.id].vote?"Yes":"No"]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("h5",{className:"mb-3 fw-normal text-black",children:["Is this a ",e.name,"?"]}),(0,b.jsxs)("div",{className:"d-flex",children:[(0,b.jsx)(r.zx,{className:"gray-outline-btn me-2 px-3",onClick:function(){return ke("no"+n,null===e||void 0===e?void 0:e.id,n)},children:"No"}),(0,b.jsx)(r.zx,{className:"px-3",onClick:function(){return ke("yes"+n,null===e||void 0===e?void 0:e.id,n)},children:"Yes"})]})]})},n)})),(0,b.jsxs)(r.zx,{disabled:!(void 0!==xe&&(null===(U=Object.keys(xe))||void 0===U?void 0:U.length)===(null===Y||void 0===Y||null===(E=Y.category_data)||void 0===E?void 0:E.length)),className:"like-btn mt-4 w-100 d-flex align-items-center justify-content-center py-2 mb-3",children:[(0,b.jsx)(d.JO,{icon:"heroicons-solid:thumb-up",width:"25",height:"25",className:"me-2"}),(0,b.jsx)("span",{children:"Vote this observation"})]})]})]})}),(0,b.jsx)(g,{data:Y,user:de,token:ve,openRejectModal:ee,handleCloseRejectObs:be,handleDetailPopup:I,approveReject:L})]})}},71909:function(e,n,i){var t=i(86886),o=i(80184);n.Z=function(e){var n=e.country;return(0,o.jsx)(t.Z,{countryCode:n,svg:!0,style:{width:"1.5em",height:"1.5em"},title:n})}},86886:function(e,n,i){var t=i(72791);function o(){return o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e},o.apply(this,arguments)}var l=["cdnSuffix","cdnUrl","countryCode","style","svg"];n.Z=function(e){var n=e.cdnSuffix,i=void 0===n?"svg":n,s=e.cdnUrl,a=void 0===s?"https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/":s,c=e.countryCode,r=e.style,d=e.svg,u=void 0!==d&&d,v=function(e,n){if(null==e)return{};var i,t,o={},l=Object.keys(e);for(t=0;t<l.length;t++)i=l[t],n.indexOf(i)>=0||(o[i]=e[i]);return o}(e,l);if("string"!==typeof c)return null;if(u){var m=""+a+c.toLowerCase()+"."+i;return(0,t.createElement)("img",Object.assign({},v,{src:m,style:o({display:"inline-block",width:"1em",height:"1em",verticalAlign:"middle"},r)}))}var h=c.toUpperCase().replace(/./g,(function(e){return String.fromCodePoint(e.charCodeAt(0)+127397)}));return(0,t.createElement)("span",Object.assign({role:"img"},v,{style:o({display:"inline-block",fontSize:"1em",lineHeight:"1em",verticalAlign:"middle"},r)}),h)}}}]);
//# sourceMappingURL=8750.53f0ed5b.chunk.js.map