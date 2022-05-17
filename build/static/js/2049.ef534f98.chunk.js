"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[2049],{59122:function(e,t,n){n.d(t,{f:function(){return a}});var i=n(7788),l=n(80184),a=function(e){var t=e.handleLoadMore;return(0,l.jsx)(i.zx,{className:"gray-outline-btn d-block mx-auto px-4 fw-normal",onClick:function(){return t()},children:"Load more"})}},92049:function(e,t,n){n.r(t),n.d(t,{default:function(){return j}});var i=n(42982),l=n(1413),a=n(70885),o=(n(33505),n(72791)),s=n(7788),d=n(43504),r=n(17834),u=n(94677),c=n(74551),v=n(46883),f=n(59122),h=n(40872),p=n(80184),y=(0,o.lazy)((function(){return n.e(7103).then(n.bind(n,27103))})),b=(0,o.lazy)((function(){return Promise.all([n.e(9136),n.e(8418)]).then(n.bind(n,66788))})),x=(0,o.lazy)((function(){return Promise.all([n.e(7244),n.e(3961),n.e(6755),n.e(3555)]).then(n.bind(n,82488))})),j=function(){var e,t,n,j,m=(0,o.useState)(!1),g=(0,a.Z)(m,2),Z=g[0],S=g[1],C=(0,o.useState)(!0),O=(0,a.Z)(C,2),k=O[0],N=O[1],w=(0,o.useState)(),F=(0,a.Z)(w,2),L=F[0],z=F[1],D=(0,o.useState)(""),_=(0,a.Z)(D,2),E=_[0],T=_[1],M=(0,o.useState)({isCountryOpen:!1,isTypeOpen:!1,isStatusOpen:!1}),A=(0,a.Z)(M,2),H=A[0],I=A[1],P=(0,o.useState)({country:{name:"",code:""},type:"",status:""}),R=(0,a.Z)(P,2),U=R[0],W=R[1],B=(0,h.Z)(),G=B.observationListData,V=B.setObservationListData,X=(0,r.Z)().auth,q=(0,o.useState)(10),J=(0,a.Z)(q,2),K=(J[0],J[1]),Q=(0,o.useState)(10),Y=(0,a.Z)(Q,2),$=Y[0],ee=(Y[1],(0,o.useState)("".concat(c.v2.api,"/observation/gallery/?country=&category=&status="))),te=(0,a.Z)(ee,2),ne=te[0],ie=te[1],le=null===X||void 0===X||null===(e=X.user)||void 0===e?void 0:e.is_user;(0,o.useEffect)((function(){K($),ae(!0,"",U.type,U.status),N(!1)}),[k]);(0,o.useEffect)((function(){!1===H.isCountryOpen&&T("")}),[H.isCountryOpen]),(0,o.useEffect)((function(){V((function(e){var t;return(0,l.Z)((0,l.Z)({},e),{},{active:null===G||void 0===G||null===(t=G.list)||void 0===t?void 0:t[L]})}))}),[Z]);var ae=function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"".concat(null===(e=U.country)||void 0===e?void 0:e.code),o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"".concat(U.type),s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"".concat(U.status);t=!0!==n&&ne?ne:"".concat(c.v2.api,"/observation/gallery/?country=").concat(a,"&category=").concat(o,"&status=").concat(s,"&page=1");var d,r={};(r["Content-Type"]="application/json",X.user)&&(r.Authorization="Bearer ".concat(null===X||void 0===X||null===(d=X.token)||void 0===d?void 0:d.access));u.Z.get(t,{headers:r}).then((function(e){var t,a;if(void 0!==(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(a=t.results)||void 0===a?void 0:a.data)){var o,s,d,r,u;if(null!==e&&void 0!==e&&null!==(o=e.data)&&void 0!==o&&o.next)ie(null===e||void 0===e||null===(u=e.data)||void 0===u?void 0:u.next);else ie(null);var c,v,f,h=null===e||void 0===e||null===(s=e.data)||void 0===s||null===(d=s.results)||void 0===d?void 0:d.data;if((null===G||void 0===G||null===(r=G.list)||void 0===r?void 0:r.length)>0&&!1===n)c=(0,i.Z)(null===G||void 0===G?void 0:G.list),c=[].concat((0,i.Z)(c),(0,i.Z)(h));else c=null===e||void 0===e||null===(v=e.data)||void 0===v||null===(f=v.results)||void 0===f?void 0:f.data;V((function(e){return(0,l.Z)((0,l.Z)({},e),{},{list:c})})),N(!1)}else ie(null),V({list:[],active:{}})})).catch((function(e){console.log(e.response)}))};return(0,o.useEffect)((function(){V((function(e){return(0,l.Z)((0,l.Z)({},e),{},{activeType:"",list:[]})})),ae(!0,"","","")}),[]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.Suspense,{fallback:(0,p.jsx)("div",{children:"please wait..."}),children:(0,p.jsx)(b,{galleryFilter:!0,isFilterOpen:H,setIsFilterOpen:I,selectedFilterHorizontal:U,setSelectedFilterHorizontal:W,searchCountry:E,findCountry:function(e){var t=e.target.value.toLowerCase();T(t)},handleFilterValue:function(e,t){var n;if(V([]),"status"===t)e=e.toLowerCase(),ae(!0,null===(n=U.country)||void 0===n?void 0:n.code,U.type,e);else if("category"===t){var i;ae(!0,null===(i=U.country)||void 0===i?void 0:i.code,e,U.status)}else"country"===t&&ae(!0,e.code,U.type,U.status)}})}),(0,p.jsxs)(s.W2,{className:"pt-5",children:[le&&(0,p.jsxs)(s.sU,{color:"danger","data-dismiss":"alert",dismissible:"true",className:"text-center mb-5",children:["Would you like to help us sift through observations and endorse their validity?",(0,p.jsx)(d.rU,{to:"/"+c.X0.tutorials,className:"btn btn-outline-primary",children:"Get Trained"})]}),(null===G||void 0===G?void 0:G.list)&&(0,p.jsxs)("div",{className:"gallery-page",children:[(0,p.jsx)("h4",{className:"text-black fw-bold",children:"Recent Observations"}),(0,p.jsx)("div",{children:(null===G||void 0===G?void 0:G.list.length)>0?(0,p.jsx)(o.Suspense,{fallback:(0,p.jsx)("div",{children:"please wait..."}),children:(0,p.jsx)(x,{observationList:null===G||void 0===G?void 0:G.list,isObservationDetailModal:Z,setObservationDetailModal:S,setSelectedObservationId:z})}):(0,p.jsxs)("div",{className:"data-not-found",children:[(0,p.jsx)("img",{src:v.Z.NoDataFound,alt:"No data found",className:"mb-3"}),(0,p.jsxs)("p",{children:[(0,p.jsx)("b",{className:"text-secondary fw-bold",children:"Opps!"})," No Data Found"]})]})}),ne&&(0,p.jsx)(f.f,{handleLoadMore:function(){var e;ae(!1,null===(e=U.country)||void 0===e?void 0:e.code,U.type,U.status)}}),(0,p.jsx)(o.Suspense,{fallback:(0,p.jsx)("div",{children:"please wait..."}),children:(0,p.jsx)(y,{data:null===G||void 0===G?void 0:G.active,activeType:null!==G&&void 0!==G&&null!==(t=G.active)&&void 0!==t&&t.is_verified?"verified":null!==G&&void 0!==G&&null!==(n=G.active)&&void 0!==n&&n.is_reject?"denied":null!==G&&void 0!==G&&null!==(j=G.active)&&void 0!==j&&j.is_submit?"unverified":"draft",modalClass:"observation-details_modal",open:Z,handleClose:function(e){S(!Z),z(e)},handleApproveRejectEvent:ae,refreshData:ae})})]})]})]})}},33505:function(){}}]);
//# sourceMappingURL=2049.ef534f98.chunk.js.map