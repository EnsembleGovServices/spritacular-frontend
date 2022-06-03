"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[3562,3417],{59122:function(e,t,n){n.d(t,{f:function(){return i}});var a=n(7788),o=n(80184),i=function(e){var t=e.handleLoadMore;return(0,o.jsx)(a.zx,{className:"gray-outline-btn d-block mx-auto px-4 fw-normal",onClick:function(){return t()},children:"Load more"})}},77849:function(e,t,n){var a=n(72791),o=n(63417);t.Z=function(){var e=(0,a.useContext)(o.ObservationContext).observationImages;return(0,a.useDebugValue)(e,(function(e){return null!==e&&void 0!==e&&e.data?"Images set":"Images not set"})),(0,a.useContext)(o.ObservationContext)}},40872:function(e,t,n){var a=n(72791),o=n(21353);t.Z=function(){var e=(0,a.useContext)(o.J).observationListData;return(0,a.useDebugValue)(e,(function(e){return e?"List data set":"Listing data not set"})),(0,a.useContext)(o.J)}},73562:function(e,t,n){n.r(t),n.d(t,{default:function(){return M}});var a=n(4942),o=n(15861),i=n(1413),s=n(42982),l=n(70885),r=n(87757),d=n.n(r),u=n(72791),c=n(16871),v=n(17834),f=n(40872),b=n(77849),p=n(59122),m=n(94677),h=n(72426),_=n.n(h),x=n(47604),y={isCountryOpen:!1,isTypeOpen:!1,isStatusOpen:!1,isRateOpen:!1,isFOVOpen:!1,isLensTypeOpen:!1},Z={country:{name:"",code:""},type:"",status:""},g={from_obs_data:null,to_obs_data:null,obs_start_date:null,obs_end_date:null,obs_start_time:null,obs_end_time:null,camera_type:"",fps:"",iso:"",fov:"",shutter_speed:"",lens_type:""},j="/observation/dashboard/?country=&category=&status=",O=n(74551),S=n(80184),D=(0,u.lazy)((function(){return Promise.all([n.e(2711),n.e(9136),n.e(6788)]).then(n.bind(n,66788))})),C=(0,u.lazy)((function(){return Promise.all([n.e(2711),n.e(2945)]).then(n.bind(n,32945))})),F=(0,u.lazy)((function(){return Promise.all([n.e(2711),n.e(6652),n.e(2815),n.e(3674),n.e(1212),n.e(9439)]).then(n.bind(n,4577))})),w=(0,u.lazy)((function(){return Promise.all([n.e(2711),n.e(2815),n.e(180)]).then(n.bind(n,90180))})),L=(0,u.lazy)((function(){return Promise.all([n.e(2711),n.e(6652),n.e(7103),n.e(3333)]).then(n.bind(n,27103))})),M=function(){var e,t,n,r,h=(0,c.s0)(),M=(0,v.Z)().auth,k=(0,u.useState)(!1),N=(0,l.Z)(k,2),I=N[0],V=N[1],z=(0,u.useState)(),H=(0,l.Z)(z,2),T=H[0],E=H[1],P=(0,b.Z)(),Y=P.setObservationData,J=P.setObservationSteps,A=P.setObservationImages,R=(0,u.useState)(!0),B=(0,l.Z)(R,2),G=B[0],W=B[1],q=(0,u.useState)(!1),K=(0,l.Z)(q,2),Q=K[0],U=K[1],X=(0,u.useState)(!0),$=(0,l.Z)(X,2),ee=$[0],te=$[1],ne=(0,u.useState)(""),ae=(0,l.Z)(ne,2),oe=ae[0],ie=ae[1],se=(0,u.useState)(y),le=(0,l.Z)(se,2),re=le[0],de=le[1],ue=(0,u.useState)(Z),ce=(0,l.Z)(ue,2),ve=ce[0],fe=ce[1],be=(0,u.useState)(g),pe=(0,l.Z)(be,2),me=pe[0],he=pe[1],_e=(0,u.useState)(!1),xe=(0,l.Z)(_e,2),ye=(xe[0],xe[1]),Ze=(0,f.Z)(),ge=Ze.observationListData,je=Ze.setObservationListData,Oe=(0,u.useState)(j),Se=(0,l.Z)(Oe,2),De=Se[0],Ce=Se[1],Fe=(0,u.useState)(!1),we=(0,l.Z)(Fe,2),Le=we[0],Me=we[1],ke=function(){var e,t,n,a,o=arguments.length>0&&void 0!==arguments[0]&&arguments[0],l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"".concat(null===ve||void 0===ve||null===(e=ve.country)||void 0===e?void 0:e.code),r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"".concat(null===ve||void 0===ve?void 0:ve.type),d=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"".concat(null===ve||void 0===ve?void 0:ve.status);null!==M&&void 0!==M&&null!==(t=M.user)&&void 0!==t&&t.is_superuser&&(a=!0!==o&&De?De.replace("http","https"):"".concat(O.v2.api,"/observation/dashboard/?country=").concat(l,"&category=").concat(r,"&status=").concat(d,"&page=1"),null!==me.obs_start_date&&(null!==me.obs_start_time?me.from_obs_data=_()(me.obs_start_date+" "+me.obs_start_time).format("DD/MM/Y H:mm"):me.from_obs_data=_()(me.obs_start_date+" 00:00").format("DD/MM/Y HH:mm")),null!==me.obs_end_date&&(null!==me.obs_end_time?me.to_obs_data=_()(me.obs_end_date+" "+me.obs_end_time).format("DD/MM/Y HH:mm"):me.to_obs_data=_()(me.obs_end_date+" 23:59").format("DD/MM/Y HH:mm")),m.Z.post(a,me,{headers:{"Content-type":"application/json",Authorization:"Bearer ".concat(null===M||void 0===M||null===(n=M.token)||void 0===n?void 0:n.access)}}).then((function(e){var t,n;if(Me(!1),void 0!==(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(n=t.results)||void 0===n?void 0:n.data)){var a,l,r,d,u;if(null!==e&&void 0!==e&&null!==(a=e.data)&&void 0!==a&&a.next)Ce(null===e||void 0===e||null===(u=e.data)||void 0===u?void 0:u.next);else Ce(null);var c,v,f,b=null===e||void 0===e||null===(l=e.data)||void 0===l||null===(r=l.results)||void 0===r?void 0:r.data;if((null===ge||void 0===ge||null===(d=ge.list)||void 0===d?void 0:d.length)>0&&!1===o)c=(0,s.Z)(null===ge||void 0===ge?void 0:ge.list),c=[].concat((0,s.Z)(c),(0,s.Z)(b));else c=null===e||void 0===e||null===(v=e.data)||void 0===v||null===(f=v.results)||void 0===f?void 0:f.data;je((function(e){return(0,i.Z)((0,i.Z)({},e),{},{list:c})})),ye(!0)}else Ce(null),je({list:[],active:{}})})).catch((function(e){console.log(e.response)})))},Ne=function(){var e=(0,o.Z)(d().mark((function e(t){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A([]),Y([]),e.next=4,Ie(t);case 4:return e.abrupt("return",!0);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ie=function(e){J((function(t){return(0,i.Z)((0,i.Z)({},t),{},{total:3,active:1,mode:(0,i.Z)({update:!0},e)})}))},Ve=function(){W(!G)},ze=function(e,t){var n,a;"status"===t&&(e=e.toLowerCase(),ke(!0,null===(n=ve.country)||void 0===n?void 0:n.code,ve.type,e));"category"===t&&ke(!0,null===(a=ve.country)||void 0===a?void 0:a.code,e,ve.status);"country"===t&&ke(!0,e.code,ve.type,ve.status),"filter"===t&&ke(!0,ve.country.code,ve.type,ve.status)};return(0,u.useEffect)((function(){ke(!0)}),[Le]),(0,u.useEffect)((function(){je((function(e){return(0,i.Z)((0,i.Z)({},e),{},{activeType:"",list:[]})})),ke(!0,"","",""),window.innerWidth<768&&W(!1),console.clear()}),[]),(0,u.useEffect)((function(){je((function(e){var t;return(0,i.Z)((0,i.Z)({},e),{},{active:null===ge||void 0===ge||null===(t=ge.list)||void 0===t?void 0:t[T]})}))}),[I]),(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(u.Suspense,{fallback:(0,S.jsx)("div",{}),children:(0,S.jsx)(D,{dashboardFilter:!0,galleryFilter:!0,filterShow:G,handleFilterOpen:Ve,handleListView:function(){U(!0),te(!1)},handleGridView:function(){te(!0),U(!1)},listView:Q,gridView:ee,isFilterOpen:re,setIsFilterOpen:de,selectedFilterHorizontal:ve,setSelectedFilterHorizontal:fe,searchCountry:oe,findCountry:function(e){var t=e.target.value.toLowerCase();ie(t)},handleFilterValue:ze})}),(0,S.jsx)("div",{className:"observation-dashboard_content",children:(0,S.jsx)("div",{className:"container",children:(0,S.jsx)("div",{className:"row",children:(0,S.jsx)("div",{className:"col-sm-12",children:(0,S.jsxs)("div",{className:"set-dash-content",children:[G&&(0,S.jsx)(u.Suspense,{fallback:(0,S.jsx)("div",{}),children:(0,S.jsx)(C,{selectedFilterVertical:me,setSelectedFilterVertical:he,handleFilterValue:ze,handleFilterOpen:Ve,isFilterOpen:re,setIsFilterOpen:de,resetFilters:function(){Me(!0),fe(Z),he(g),ke(!0,"","","")},handleFilterInput:function(e){var t=e.target.name,n=e.target.value;console.log(t,n),he((0,i.Z)((0,i.Z)({},me),{},(0,a.Z)({},t,n)))}})}),(0,S.jsx)("div",{className:"dashboard-card overflow-hidden ".concat(G?"sm-card":"maximize-dash-content"),children:(null===ge||void 0===ge||null===(e=ge.list)||void 0===e?void 0:e.length)>0?Q?(0,S.jsx)(u.Suspense,{fallback:(0,S.jsx)("div",{}),children:(0,S.jsx)(w,{observationList:null===ge||void 0===ge?void 0:ge.list,isObservationDetailModal:I,setObservationDetailModal:V,setSelectedObservationId:E})}):(0,S.jsxs)(u.Suspense,{fallback:(0,S.jsx)("div",{}),children:[(0,S.jsx)(F,{observationList:null===ge||void 0===ge?void 0:ge.list,isObservationDetailModal:I,setObservationDetailModal:V,setSelectedObservationId:E}),De&&(0,S.jsx)(p.f,{handleLoadMore:function(){ke(!1)}})]}):(0,S.jsxs)("div",{className:"data-not-found",children:[(0,S.jsx)("img",{src:x.Z.NoDataFound,alt:"No data found",className:"mb-3"}),(0,S.jsxs)("p",{children:[(0,S.jsx)("b",{className:"text-secondary fw-bold",children:"Opps!"})," No Data Found"]})]})}),(0,S.jsx)(u.Suspense,{fallback:(0,S.jsx)("div",{}),children:(0,S.jsx)(L,{data:null===ge||void 0===ge?void 0:ge.active,modalClass:"observation-details_modal",open:I,handleClose:function(e){V(!I),E(e)},handleContinueEdit:function(e){Ne(e).then((function(e){return e})),V(!1),setTimeout((function(){h("/observations/update")}),100)},activeType:null!==ge&&void 0!==ge&&null!==(t=ge.active)&&void 0!==t&&t.is_verified?"verified":null!==ge&&void 0!==ge&&null!==(n=ge.active)&&void 0!==n&&n.is_reject?"denied":null!==ge&&void 0!==ge&&null!==(r=ge.active)&&void 0!==r&&r.is_submit?"unverified":"draft",handleApproveRejectEvent:ke,refreshData:ke})})]})})})})})]})}},63417:function(e,t,n){n.r(t),n.d(t,{ObservationContext:function(){return d}});var a=n(42982),o=n(70885),i=n(16871),s=n(72791),l=n(74551),r=n(80184),d=(0,s.createContext)({});t.default=function(){var e=(0,s.useState)({image_type:1}),t=(0,o.Z)(e,2),n=t[0],u=t[1],c=(0,s.useState)({total:3,active:1,mode:{update:!1}}),v=(0,o.Z)(c,2),f=v[0],b=v[1],p=(0,s.useState)([]),m=(0,o.Z)(p,2),h=m[0],_=m[1],x=(0,s.useState)(l.pJ),y=(0,o.Z)(x,2),Z=y[0],g=y[1],j=(0,s.useState)([]),O=(0,o.Z)(j,2),S=O[0],D=O[1],C=(0,s.useState)({}),F=(0,o.Z)(C,2),w=F[0],L=F[1];return(0,s.useEffect)((function(){var e=null!==h&&void 0!==h&&h.data?(0,a.Z)(null===h||void 0===h?void 0:h.data):[];L({image_type:null===n||void 0===n?void 0:n.image_type,map_data:e,elevation_angle:null,video_url:""})}),[null===h||void 0===h?void 0:h.data,null===f||void 0===f?void 0:f.is_draft,null===n||void 0===n?void 0:n.image_type]),(0,r.jsx)(d.Provider,{value:{observationType:n,setObservationType:u,observationSteps:f,setObservationSteps:b,observationImages:h,setObservationImages:_,observationCategory:S,setObservationCategory:D,observationData:w,setObservationData:L,cameraDetails:Z,setCameraDetails:g},children:(0,r.jsx)(i.j3,{})})}}}]);
//# sourceMappingURL=3562.d40c6f91.chunk.js.map