"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[3870],{6442:function(n,e,t){var i=t(70885),a=t(72791),s=t(80184);e.Z=function(n){var e=n.preview,t=n.image,r=n.alt,c=n.bgColor,l=void 0===c?"transparent":c,o=n.handleClick,d=n.homepage,u=(0,a.useState)(e),m=(0,i.Z)(u,2),v=m[0],h=m[1],f=(0,a.useState)(!0),x=(0,i.Z)(f,2),p=x[0],j=x[1];return(0,a.useEffect)((function(){!function(n){var e=new Image;e.src=n,e.onload=function(){h(e.src),j(!1)}}(t)}),[]),(0,s.jsx)("div",{className:"shadow-sm drop-shadow-lg",style:{overflow:"hidden"},children:(0,s.jsx)("img",{style:{filter:"".concat(p?"blur(10px)":""),transition:"0.4s filter linear",width:"100%",background:l},src:v,alt:r,className:"".concat(d?"img-fluid card-img no-cursor":"img-fluid card-img"),onClick:o})})}},85423:function(n,e,t){var i=t(92927),a=t(80184);e.Z=function(){return(0,a.jsxs)("div",{className:"data-not-found",children:[(0,a.jsx)("img",{src:i.Z.NoDataFound,alt:"No data found",className:"mb-3"}),(0,a.jsxs)("p",{children:[(0,a.jsx)("b",{className:"text-secondary fw-bold",children:"Opps!"})," No Data Found"]})]})}},73870:function(n,e,t){t.r(e);var i=t(15861),a=t(70885),s=t(87757),r=t.n(s),c=(t(44453),t(72791)),l=t(74551),o=t(94677),d=t(35429),u=t(80184);e.default=function(){var n=(0,c.useState)(),e=(0,a.Z)(n,2),t=e[0],s=e[1],m=function(){var n=(0,i.Z)(r().mark((function n(){return r().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.Z.get("".concat(l.v2.get_blog,"1"),{headers:{"Content-Type":"application/json"}}).then((function(n){var e;s(null===n||void 0===n||null===(e=n.data)||void 0===e?void 0:e.data)})).catch((function(n){console.log("error",n)}));case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,c.useEffect)((function(){m().then((function(n){return n}))}),[]),(0,u.jsx)(d.Z,{content:t,thead:[{name:"ID"},{name:"Title"},{name:"Description"},{name:"Action"}],type:"blog"})}},35429:function(n,e,t){t.d(e,{Z:function(){return u}});var i=t(7788),a=t(43504),s=t(74551),r=t(85423),c=t(6442),l=t(80184),o=function(n){var e=n.item,t=n.type;return(0,l.jsxs)("div",{children:[(0,l.jsx)(a.rU,{className:"me-2 btn btn-sm btn-primary px-4",to:"/"+s.X0.dashboard+"/"+t+"/"+(null===e||void 0===e?void 0:e.slug),children:"view"}),(0,l.jsx)(a.rU,{className:"btn btn-sm btn-dark px-4",to:"/".concat(s.X0.dashboard,"/").concat(t,"/").concat(null===e||void 0===e?void 0:e.slug,"/edit"),children:"edit"})]})},d=function(n){var e=n.item,t=n.type;return null===e||void 0===e?void 0:e.map((function(n,e){return(0,l.jsx)(i.JX,{sm:12,md:4,xl:3,className:"mb-4",children:(0,l.jsxs)("div",{className:"card h-100",children:[(0,l.jsxs)("div",{className:"card-body",children:[(0,l.jsx)("div",{className:"dash-inner-card-list",children:(0,l.jsx)(c.Z,{preview:null===n||void 0===n?void 0:n.thumbnail_image,image:null===n||void 0===n?void 0:n.thumbnail_image,alt:null===n||void 0===n?void 0:n.title})}),(0,l.jsx)("div",{children:(0,l.jsx)("h5",{className:"card-title",children:(null===n||void 0===n?void 0:n.title.substring(0,40))+"..."})}),(0,l.jsx)("div",{children:(null===n||void 0===n?void 0:n.description.substring(0,80))+"..."})]}),(0,l.jsx)("div",{className:"card-footer",children:(0,l.jsx)("div",{children:(0,l.jsx)(o,{type:t,item:n})})})]})},e)}))},u=function(n){var e=n.content,t=n.type;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:"blog_page position-relative",children:[(0,l.jsx)("div",{className:"common-banner"}),(0,l.jsx)("section",{className:"blog-main",children:(0,l.jsxs)(i.W2,{children:[(0,l.jsx)("div",{className:"position-relative",children:(0,l.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,l.jsxs)("h2",{className:"mb-0 text-capitalize",children:["Manage ",t]}),(0,l.jsxs)(a.rU,{to:"/".concat(s.X0.dashboard,"/").concat(t,"/create"),className:"btn btn-primary px-4 text-capitalize",children:["Create ",t]})]})}),(0,l.jsx)("div",{className:"mt-5",children:(null===e||void 0===e?void 0:e.length)>0?(0,l.jsx)("div",{className:"row",children:(0,l.jsx)(d,{item:e,type:t})}):(0,l.jsx)(r.Z,{})})]})})]})})}},44453:function(){}}]);
//# sourceMappingURL=3870.cc070088.chunk.js.map