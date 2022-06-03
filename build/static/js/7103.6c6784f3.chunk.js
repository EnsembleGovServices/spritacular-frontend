"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[7103],{27103:function(e,n,i){i.r(n),i.d(n,{default:function(){return _}});var t=i(1413),l=i(15861),a=i(70885),o=i(87757),s=i.n(o),r=i(72791),d=i(7788),c=i(62711),u=i(36652),v=i(47604),m=i(74405),f=i(94677),h=i(74551),p=i(17834),x=i(16871),j=i(40872),b=i(2579),g=i(80184),y=(0,r.lazy)((function(){return i.e(6442).then(i.bind(i,6442))})),N=(0,r.lazy)((function(){return Promise.all([i.e(2426),i.e(8750)]).then(i.bind(i,58750))})),C=(0,r.lazy)((function(){return i.e(9035).then(i.bind(i,99035))})),w=(0,r.lazy)((function(){return Promise.all([i.e(2426),i.e(382),i.e(3627),i.e(782)]).then(i.bind(i,52334))})),Z=(0,r.lazy)((function(){return Promise.all([i.e(2815),i.e(2147)]).then(i.bind(i,72147))})),_=function(e){var n,i,o,_,k,E,O,L,D,K,z,I,P,J,S,T,A=(0,p.Z)().auth,R=(0,x.TH)(),X=(0,r.useRef)(),q=e.modalClass,Y=e.open,B=e.handleClose,F=e.data,M=e.activeType,H=e.handleContinueEdit,$=e.handleApproveRejectEvent,G=e.refreshData,Q=(0,r.useState)(m.Ku.Details),U=(0,a.Z)(Q,2),V=U[0],W=U[1],ee=(0,j.Z)(),ne=ee.observationComments,ie=ee.setObservationListData,te=ee.observationListData,le=(0,r.useRef)(null),ae=(0,r.useState)(!0),oe=(0,a.Z)(ae,2),se=oe[0],re=oe[1],de=(0,r.useState)(!0),ce=(0,a.Z)(de,2),ue=ce[0],ve=ce[1],me=function(e){V!==e&&W(e)},fe=function(){var e=(0,l.Z)(s().mark((function e(){var n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.Z.post(h.v2.api+"/observation/get_observation_details/"+(null===F||void 0===F?void 0:F.id)+"/",null,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(null===A||void 0===A||null===(n=A.token)||void 0===n?void 0:n.access)}}).then((function(e){var n,i;re(null===e||void 0===e||null===(n=e.data)||void 0===n||null===(i=n.data)||void 0===i?void 0:i.includes(null))})).catch((function(e){console.log(e)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),he=function(e){ve(e)};return(0,r.useEffect)((function(){ve(!0),W(m.Ku.Details)}),[Y,null===F||void 0===F?void 0:F.id]),(0,r.useEffect)((function(){var e,n;if(Y&&null!==F&&void 0!==F&&F.id&&se&&null!==A&&void 0!==A&&null!==(e=A.user)&&void 0!==e&&e.id)return X.current=setInterval((function(){fe().then((function(e){return e}))}),1e3),function(){clearInterval(X.current)};Y&&null!==F&&void 0!==F&&F.id&&se&&(null===A||void 0===A||null===(n=A.user)||void 0===n||!n.id)&&setTimeout((function(){re(!1)}),1e3)}),[null===F||void 0===F?void 0:F.id,se,Y,null===A||void 0===A?void 0:A.user]),(0,r.useEffect)((function(){se||R.pathname!=="/".concat(h.X0.myObservations)||G(!0,M)}),[se,R]),(0,r.useEffect)((function(){var e;se||(null===te||void 0===te||null===(e=te.list)||void 0===e||e.filter((function(e){var n;return e.id===(null===te||void 0===te||null===(n=te.active)||void 0===n?void 0:n.id)})).map((function(e){return ie((function(n){return(0,t.Z)((0,t.Z)({},n),{},{active:e})}))})))}),[te.list]),(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(d.u_,{className:q||"",isOpen:Y,backdrop:!0,keyboard:!1,scrollable:!1,size:"xl",toggle:B,ref:le,children:[(0,g.jsxs)(d.xB,{className:"d-flex justify-content-between align-items-center w-100",children:[(0,g.jsxs)("div",{className:"d-flex align-items-center justify-content-start",children:[(0,g.jsx)(d.zx,{className:"close-icon bg-transparent rounded-0 border-0 shadow-none p-0 me-3",onClick:function(){return B()},children:(0,g.jsx)("img",{src:v.Z.Modalcloseicon,alt:"close-icon"})}),(0,g.jsx)("h4",{className:"d-inline-block m-0",children:null!==F&&void 0!==F&&null!==(n=F.category_data)&&void 0!==n&&n[0]?null===F||void 0===F||null===(i=F.category_data)||void 0===i||null===(o=i[0])||void 0===o?void 0:o.name:null}),(0,g.jsxs)(d.Ct,{className:"text-uppercase ".concat("verified"===M?"badge-success":""),children:["verified"===M&&(0,g.jsx)(c.JO,{icon:"mdi:check-decagram",color:"#27ae60",className:"me-1",width:"13",height:"13"}),M]})]}),"draft"===M&&(0,g.jsx)("div",{children:(0,g.jsx)(d.zx,{variant:"primary",onClick:function(){return H({id:null===F||void 0===F?void 0:F.id,type:M})},children:"Continue Editing"})})]}),(0,g.jsx)(d.fe,{children:(0,g.jsxs)(d.X2,{children:[(0,g.jsx)(d.JX,{md:6,children:(0,g.jsxs)("div",{className:"mb-4 mb-md-0 h-100",children:[(0,g.jsxs)("div",{className:"preview-detail mb-3 mb-md-2",children:[!(3===(null===F||void 0===F?void 0:F.image_type))&&(0===(null===F||void 0===F||null===(_=F.images)||void 0===_?void 0:_.length)?(0,g.jsx)("img",{src:v.Z.NotAvailable,alt:"No available",className:"object-contain img-fluid"}):se?(0,g.jsxs)("div",{className:"d-flex flex-column h-100 align-items-center justify-content-center bg-gradient bg-light",children:[(0,g.jsx)(d.$j,{color:"primary",size:"20px"}),(0,g.jsx)("h5",{className:"mt-3",children:"Processing image..."})]}):(0,g.jsx)(r.Suspense,{fallback:(0,g.jsx)("div",{}),children:(0,g.jsx)(y,{image:null===F||void 0===F||null===(k=F.images)||void 0===k||null===(E=k[0])||void 0===E?void 0:E.image,preview:null===F||void 0===F||null===(O=F.images)||void 0===O||null===(L=O[0])||void 0===L?void 0:L.image,alt:null===F||void 0===F||null===(D=F.images)||void 0===D||null===(K=D[0])||void 0===K?void 0:K.location,loaderLoading:he})})),3===(null===F||void 0===F?void 0:F.image_type)&&(0,g.jsx)(Z,{carouselData:null===F||void 0===F?void 0:F.images,detail:!0,loaderLoading:he})]}),(0,g.jsxs)(d.X2,{children:[(0,g.jsxs)(d.JX,{sm:6,className:"justify-content-start d-flex align-items-center mb-2 mb-sm-0 position-relative",children:[ue&&(0,g.jsx)("div",{className:"obv-user-cat-loader",children:(0,g.jsx)(b.Z,{height:35})}),(0,g.jsxs)("div",{className:"d-flex card-user_details align-items-center overflow-hidden",children:[(0,g.jsx)("i",{className:"profile-icon rounded-circle",children:(0,g.jsx)("img",{width:"100%",height:"100%",src:null!==F&&void 0!==F&&null!==(z=F.user_data)&&void 0!==z&&z.profile_image?null===F||void 0===F||null===(I=F.user_data)||void 0===I?void 0:I.profile_image:v.Z.DefaultProfile,alt:"Profile",className:"rounded-circle"})}),(0,g.jsx)("h5",{className:"pe-2 mb-0 text-truncate fw-normal text-black",children:(null===F||void 0===F||null===(P=F.user_data)||void 0===P?void 0:P.first_name)+" "+(null===F||void 0===F||null===(J=F.user_data)||void 0===J?void 0:J.last_name)})]})]}),(0,g.jsx)(d.JX,{sm:6,className:"justify-content-end d-flex align-items-center position-relative",children:(0,g.jsx)("div",{className:"observation_type d-flex align-items-center",children:(null===F||void 0===F||null===(S=F.category_data)||void 0===S?void 0:S.length)>0&&(null===F||void 0===F||null===(T=F.category_data)||void 0===T?void 0:T.map((function(e,n){var i,t;return(0,g.jsxs)("div",{className:"obv-cat",children:[ue&&(0,g.jsx)("div",{className:"obv-cat-load",children:(0,g.jsx)(b.Z,{circle:!0,height:35,width:35})}),(0,g.jsx)("div",{className:"obv-cat-item",children:(0,g.jsx)("span",{id:null===e||void 0===e||null===(i=e.name)||void 0===i?void 0:i.toLowerCase().replaceAll(" ",""),className:"rounded-circle bg-white ms-2 cursor-pointer",children:(0,g.jsx)(u.ZP,{animation:"perspective",content:null===e||void 0===e?void 0:e.name,children:(0,g.jsx)("img",{src:"/assets/images/category/".concat(null===e||void 0===e||null===(t=e.name)||void 0===t?void 0:t.toLowerCase().replaceAll(" ",""),".png"),alt:null===e||void 0===e?void 0:e.name})})})})]},n)})))})})]})]})}),(0,g.jsxs)(d.JX,{md:6,children:[(0,g.jsxs)(d.JL,{tabs:!0,children:[(0,g.jsx)(d.LY,{children:(0,g.jsx)(d.OL,{className:V===m.Ku.Details?"active":"",onClick:function(){me(m.Ku.Details)},children:"Details"})}),(0,g.jsx)(d.LY,{children:(0,g.jsx)(d.OL,{className:V===m.Ku.Equipment?"active":"",onClick:function(){me(m.Ku.Equipment)},children:"Equipment"})}),(0,g.jsx)(d.LY,{children:(0,g.jsxs)(d.OL,{className:V===m.Ku.Comments?"active":"",onClick:function(){me(m.Ku.Comments)},children:["Comments"," ",0===(null===ne||void 0===ne?void 0:ne.comment_count)?"":"(".concat(null===ne||void 0===ne?void 0:ne.comment_count,")")]})})]}),(0,g.jsxs)(d.I5,{activeTab:V,children:[(0,g.jsx)(d.Jm,{tabId:m.Ku.Details,children:(0,g.jsx)(r.Suspense,{fallback:(0,g.jsx)("div",{children:"please wait..."}),children:(0,g.jsx)(N,{handlePopup:B,approveRejectEvent:$,obvCommentCount:null===ne||void 0===ne?void 0:ne.comment_count,data:F,activeType:M})})}),(0,g.jsx)(d.Jm,{tabId:m.Ku.Equipment,children:(0,g.jsx)(r.Suspense,{fallback:(0,g.jsx)("div",{children:"please wait..."}),children:(0,g.jsx)(C,{obvCommentCount:null===ne||void 0===ne?void 0:ne.comment_count,data:null===F||void 0===F?void 0:F.camera_data})})}),(0,g.jsx)(d.Jm,{tabId:m.Ku.Comments,children:(0,g.jsx)(r.Suspense,{fallback:(0,g.jsx)("div",{children:"please wait..."}),children:(0,g.jsx)(w,{obvId:null===F||void 0===F?void 0:F.id})})})]})]})]})})]})})}},45987:function(e,n,i){i.d(n,{Z:function(){return l}});var t=i(63366);function l(e,n){if(null==e)return{};var i,l,a=(0,t.Z)(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(l=0;l<o.length;l++)i=o[l],n.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(a[i]=e[i])}return a}},2579:function(e,n,i){i.d(n,{Z:function(){return d}});var t=i(70885),l=i(1413),a=i(45987),o=i(72791),s=["count","wrapper","className","containerClassName","containerTestId","circle","style"],r=o.createContext({});function d(e){for(var n,i,d,c=e.count,u=void 0===c?1:c,v=e.wrapper,m=e.className,f=e.containerClassName,h=e.containerTestId,p=e.circle,x=void 0!==p&&p,j=e.style,b=(0,a.Z)(e,s),g=o.useContext(r),y=(0,l.Z)({},b),N=0,C=Object.entries(b);N<C.length;N++){var w=(0,t.Z)(C[N],2),Z=w[0];"undefined"===typeof w[1]&&delete y[Z]}var _=(0,l.Z)((0,l.Z)((0,l.Z)({},g),y),{},{circle:x}),k=(0,l.Z)((0,l.Z)({},j),function(e){var n=e.baseColor,i=e.highlightColor,t=e.width,l=e.height,a=e.borderRadius,o=e.circle,s=e.direction,r=e.duration,d=e.enableAnimation,c=void 0===d||d,u={};return"rtl"===s&&(u["--animation-direction"]="reverse"),"number"===typeof r&&(u["--animation-duration"]="".concat(r,"s")),c||(u["--pseudo-element-display"]="none"),"string"!==typeof t&&"number"!==typeof t||(u.width=t),"string"!==typeof l&&"number"!==typeof l||(u.height=l),"string"!==typeof a&&"number"!==typeof a||(u.borderRadius=a),o&&(u.borderRadius="50%"),"undefined"!==typeof n&&(u["--base-color"]=n),"undefined"!==typeof i&&(u["--highlight-color"]=i),u}(_)),E="react-loading-skeleton";m&&(E+=" ".concat(m));for(var O=null!==(n=_.inline)&&void 0!==n&&n,L=[],D=Math.ceil(u),K=0;K<D;K++){var z=k;if(D>u&&K===D-1){var I=null!==(i=z.width)&&void 0!==i?i:"100%",P=u%1,J="number"===typeof I?I*P:"calc(".concat(I," * ").concat(P,")");z=(0,l.Z)((0,l.Z)({},z),{},{width:J})}var S=o.createElement("span",{className:E,style:z,key:K},"\u200c");O?L.push(S):L.push(o.createElement(o.Fragment,{key:K},S,o.createElement("br",null)))}return o.createElement("span",{className:f,"data-testid":h,"aria-live":"polite","aria-busy":null===(d=_.enableAnimation)||void 0===d||d},v?L.map((function(e,n){return o.createElement(v,{key:n},e)})):L)}}}]);
//# sourceMappingURL=7103.6c6784f3.chunk.js.map