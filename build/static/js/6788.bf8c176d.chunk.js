"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[6788,8418],{66788:function(e,n,s){s.r(n);var t=s(1413),a=(s(33505),s(94677)),r=s(72426),o=s.n(r),l=s(17834),i=s(9136),c=s(40872),d=s(7788),u=s(62711),m=s(43504),h=s(47604),x=s(74551),p=s(80184);n.default=function(e){var n,s,r,v,w,f,j,b,g=e.filterShow,y=e.handleFilterOpen,N=e.galleryFilter,O=e.isFilterOpen,C=e.setIsFilterOpen,Z=e.selectedFilterHorizontal,_=e.setSelectedFilterHorizontal,k=e.searchCountry,F=e.findCountry,L=e.handleFilterValue,S=e.dashboardFilter,z=e.handleListView,J=e.handleGridView,A=e.listView,V=e.gridView,T=(0,l.Z)().auth,I=(0,c.Z)(),U=I.observationCSVId,P=I.setObservationCSVId,W=null===U||void 0===U||null===(n=U.data)||void 0===n?void 0:n.observation,X=function(e){var n,s=o().now(),r=x.v2.api+"/observation/get_observation_csv/";a.Z.post(r,{observation_ids:e},{responseType:"blob",headers:{"Content-type":"application/json",Authorization:"Bearer ".concat(null===T||void 0===T||null===(n=T.token)||void 0===n?void 0:n.access)}}).then((function(e){P((function(e){return(0,t.Z)((0,t.Z)({},e),{},{error:{status:"",message:"",data:""}})}));var n=window.URL.createObjectURL(new Blob([e.data])),a=document.createElement("a");a.href=n,a.setAttribute("download","".concat(s,".csv")),document.body.appendChild(a),a.click(),a.remove()})).catch((function(e){P((function(n){return(0,t.Z)((0,t.Z)({},n),{},{error:{status:e.response.status,message:e.response.statusText,data:e.response.data}})}))}))};return(0,p.jsx)(p.Fragment,{children:(0,p.jsx)("div",{className:"observation-filter_wrapper",children:(0,p.jsx)(d.W2,{children:(0,p.jsxs)("div",{className:"d-flex ".concat(null!==T&&void 0!==T&&null!==(s=T.user)&&void 0!==s&&s.is_user?"py-3":""),children:[(0,p.jsx)("div",{children:S&&(0,p.jsx)(d.cw,{className:"filter-btn m-0 d-flex align-items-center h-100 form-group p-0 ".concat(g?"filter-open":""),children:(0,p.jsxs)(d.zx,{onClick:function(){return y()},className:"border-0 rounded-0 bg-transparent text-black shadow-none text-start w-auto w-md-100 d-flex align-items-center",children:[(0,p.jsx)("img",{src:h.Z.Filter,alt:"Filter"})," ",g&&(0,p.jsx)("span",{className:"ms-0 ms-md-3",children:"Advanced Filter"})]})})}),(null===T||void 0===T?void 0:T.user)&&(0,p.jsx)("div",{className:"flex-fill",children:(0,p.jsxs)(d.X2,{children:[(0,p.jsxs)(d.JX,{sm:12,lg:8,className:"order-2 order-lg-1",children:[N&&!(null!==T&&void 0!==T&&null!==(r=T.user)&&void 0!==r&&r.is_user)&&(0,p.jsxs)(d.cw,{className:"m-0 d-inline-block form-group country-menu",children:[(0,p.jsx)(d.__,{className:"text-uppercase px-2 px-xl-3",htmlFor:"Country",children:"Country"}),(0,p.jsxs)(d.Lt,{className:"dropdown-with-search",toggle:function(){return C((0,t.Z)((0,t.Z)({},O),{},{isCountryOpen:!O.isCountryOpen}))},isOpen:O.isCountryOpen,children:[(0,p.jsxs)(d.Z_,{className:"px-2 px-xl-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100",children:[(0,p.jsx)("span",{className:"text-truncate",children:""!==(null===(v=Z.country)||void 0===v?void 0:v.name)?null===(w=Z.country)||void 0===w?void 0:w.name:"All countries"}),(0,p.jsx)(u.JO,{icon:"fe:arrow-down",className:"down-arrow ms-1"})]}),(0,p.jsxs)(d.h_,{className:"py-0 shadow",children:[(0,p.jsx)(d.hP,{header:!0,className:"mb-0 position-sticky start-0 top-0 end-0 p-2 bg-white",children:(0,p.jsx)(d.II,{type:"text",className:"p-2",placeholder:"Search Country",onChange:function(e){return F(e)}})}),null===i.hW||void 0===i.hW?void 0:i.hW.filter((function(e){return-1!==e.name.toLowerCase().indexOf(k.toLowerCase())})).map((function(e,n){return(0,p.jsx)(d.hP,{name:"timezone",className:"px-2 fw-normal",value:e.name,onClick:function(n){_((0,t.Z)((0,t.Z)({},Z),{},{country:e})),L(e,"country")},children:e.name},n)}))]})]})]}),N&&!(null!==T&&void 0!==T&&null!==(f=T.user)&&void 0!==f&&f.is_user)&&(0,p.jsxs)(d.cw,{className:"m-0 d-inline-block form-group type-menu",children:[(0,p.jsx)(d.__,{className:"text-uppercase px-2 px-xl-3",htmlFor:"TransientLuminousEvent",children:"Transient Luminous Event"}),(0,p.jsxs)(d.Lt,{className:"dropdown-with-search",toggle:function(){return C((0,t.Z)((0,t.Z)({},O),{},{isTypeOpen:!O.isTypeOpen}))},isOpen:O.isTypeOpen,children:[(0,p.jsxs)(d.Z_,{className:"px-2 px-xl-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100",children:[(0,p.jsx)("span",{className:"text-truncate",children:Z.type?Z.type:"All types"}),(0,p.jsx)(u.JO,{icon:"fe:arrow-down",className:"down-arrow ms-1"})]}),(0,p.jsx)(d.h_,{className:"py-0 shadow",children:void 0!==T.categoryList&&(null===T||void 0===T||null===(j=T.categoryList)||void 0===j?void 0:j.map((function(e,n){return(0,p.jsx)(d.hP,{name:"timezone",className:"px-2 fw-normal",value:e.name,onClick:function(e){_((0,t.Z)((0,t.Z)({},Z),{},{type:e.target.value})),L(e.target.value,"category")},children:e.name},n)})))})]})]}),N&&!(null!==T&&void 0!==T&&null!==(b=T.user)&&void 0!==b&&b.is_user)&&(0,p.jsxs)(d.cw,{className:"m-0 d-inline-block form-group status-menu",children:[(0,p.jsx)(d.__,{className:"text-uppercase px-2 px-xl-3",htmlFor:"ObservationStatus",children:"Observation Status"}),(0,p.jsxs)(d.Lt,{className:"dropdown-with-search",toggle:function(){return C((0,t.Z)((0,t.Z)({},O),{},{isStatusOpen:!O.isStatusOpen}))},isOpen:O.isStatusOpen,children:[(0,p.jsxs)(d.Z_,{className:"px-2 px-xl-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100",children:[(0,p.jsx)("span",{className:"text-truncate",children:Z.status?Z.status.charAt(0).toUpperCase()+Z.status.slice(1):"All status"}),(0,p.jsx)(u.JO,{icon:"fe:arrow-down",className:"down-arrow ms-1"})]}),(0,p.jsx)(d.h_,{className:"py-0 shadow",children:null===i.jQ||void 0===i.jQ?void 0:i.jQ.map((function(e,n){return(0,p.jsx)(d.hP,{name:"timezone",className:"px-2 fw-normal",value:e,onClick:function(e){_((0,t.Z)((0,t.Z)({},Z),{},{status:e.target.value.toLowerCase()})),L(e.target.value,"status")},children:e},n)}))})]})]})]}),(0,p.jsx)(d.JX,{sm:12,lg:4,className:"text-end order-1 order-lg-2 my-2 my-lg-0",children:(0,p.jsxs)("div",{className:"d-flex align-items-center justify-content-end h-100 ",children:[S&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{className:"view-switch-wrap",children:[(0,p.jsx)(d.zx,{onClick:function(){return J()},className:"bg-transparent rounded-0 border-0 p-0 shadow-none",children:(0,p.jsx)(u.JO,{icon:"mdi:view-grid-outline",color:V?"#900":"#000"})}),(0,p.jsx)(d.zx,{onClick:function(){return z()},className:"bg-transparent rounded-0 border-0 p-0 shadow-none ms-2 ms-xl-3 ",children:(0,p.jsx)(u.JO,{icon:"ic:sharp-list",color:A?"#900":"#000"})})]}),(0,p.jsx)("div",{className:"border-start ps-2 ms-2 ps-xl-3 ms-xl-3",children:(0,p.jsxs)("button",{className:"btn btn-secondary shadow-none ".concat((null===W||void 0===W?void 0:W.length)<=0||void 0===W?"disabled":""),disabled:(null===W||void 0===W?void 0:W.length)<=0||void 0===W,onClick:function(){X(W)},children:[(0,p.jsx)(u.JO,{icon:"heroicons-outline:download",width:"25",height:"22"}),"Download CSV"]})})]}),!S&&(0,p.jsxs)(m.rU,{to:"/"+x.X0.observationsAdd,className:"btn btn-secondary shadow-none mt-2 mt-md-0",children:[(0,p.jsx)(u.JO,{icon:"heroicons-outline:upload",width:"16",height:"20"})," Upload Observation"]})]})})]})})]})})})})}},33505:function(){}}]);
//# sourceMappingURL=6788.bf8c176d.chunk.js.map