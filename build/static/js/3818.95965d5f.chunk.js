"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[3818],{6442:function(e,i,l){var a=l(70885),n=l(72791),o=l(80184);i.Z=function(e){var i=e.preview,l=e.image,d=e.alt,s=e.bgColor,t=void 0===s?"transparent":s,c=e.handleClick,r=e.homepage,u=(0,n.useState)(i),v=(0,a.Z)(u,2),m=v[0],h=v[1],x=(0,n.useState)(!0),_=(0,a.Z)(x,2),g=_[0],f=_[1];return(0,n.useEffect)((function(){!function(e){var i=new Image;i.src=e,i.onload=function(){h(i.src),f(!1)}}(l)}),[]),(0,o.jsx)("div",{className:"shadow-sm drop-shadow-lg",style:{overflow:"hidden"},children:(0,o.jsx)("img",{style:{filter:"".concat(g?"blur(10px)":""),transition:"0.4s filter linear",width:"100%",background:t},src:m,alt:d,className:"".concat(r?"img-fluid card-img no-cursor":"img-fluid card-img"),onClick:c})})}},72147:function(e,i,l){l.r(i);var a=l(7244),n=l(1281),o=(l(4676),l(84432),l(80184));i.default=function(e){var i=e.carouselData,l=e.handleClick,d=e.handleIndex,s=e.detail;return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(a.tq,{navigation:!0,modules:[n.W_],children:i.length>0&&i.map((function(e,i){return(0,o.jsx)(a.o5,{children:(0,o.jsx)("img",{src:s?null===e||void 0===e?void 0:e.image:e.compressed_image?e.compressed_image:null===e||void 0===e?void 0:e.image,alt:"carousel",onClick:function(e){l?l(d):e.preventDefault()}})},i)}))})})}},94462:function(e,i,l){l.d(i,{Z:function(){return h}});var a=l(46883),n=l(7788),o=l(72426),d=l.n(o),s=l(62711),t=l(61416),c=l(74405),r=l(72147),u=l(36652),v=l(6442),m=l(80184),h=function(e){var i,l,o=e.cardItems,h=e.handleClick,x=e.userProfile,_=e.cardData,g=e.index,f=e.activeType,p=e.homepage;return(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(n.Zb,{className:"".concat(p?"observation_card overflow-hidden homepage_observation_card":"observation_card overflow-hidden"),children:(0,m.jsxs)("div",{className:"text-black card-link d-inline-block shadow-none bg-transparent rounded-0 border-0 p-0 text-start",children:[!x&&(0,m.jsx)("div",{className:"observation_country",children:(0,m.jsxs)(n.Ct,{className:"bg-black text-white",children:[(0,m.jsx)(t.Z,{country:null===_||void 0===_?void 0:_.country_code}),null===_||void 0===_?void 0:_.location]})}),x&&3===(null===o||void 0===o?void 0:o.image_type)&&(0,m.jsx)("div",{className:"multiple-image_icon",children:(0,m.jsx)(s.JO,{icon:"codicon:list-filter",color:"black"})}),x&&"draft"===f&&(0,m.jsx)(n.zx,{className:"multiple-image_icon border-0 edit-icon",children:(0,m.jsx)(s.JO,{icon:"eva:edit-2-outline"})}),(null===o||void 0===o?void 0:o.is_verified)&&(0,m.jsx)("div",{className:"verify-card",children:(0,m.jsx)(s.JO,{icon:"mdi:check-decagram",color:"#27ae60",width:"13",height:"13"})}),3===(null===o||void 0===o?void 0:o.image_type)?(0,m.jsx)(r.default,{carouselData:null===o||void 0===o?void 0:o.images,handleClick:h,handleIndex:g}):(0,m.jsx)(v.Z,{preview:null!==_&&void 0!==_&&_.compressed_image?null===_||void 0===_?void 0:_.compressed_image:null===_||void 0===_?void 0:_.image,image:null!==_&&void 0!==_&&_.compressed_image?null===_||void 0===_?void 0:_.compressed_image:null===_||void 0===_?void 0:_.image,handleClick:function(){return p?null:x&&h(g)},homepage:p}),(0,m.jsxs)(n.eW,{className:"position-relative observation-card_body",children:[(0,m.jsx)("div",{className:"position-absolute observation_type d-flex align-items-center",children:(null===o||void 0===o||null===(i=o.category_data)||void 0===i?void 0:i.length)>0&&(null===o||void 0===o||null===(l=o.category_data)||void 0===l?void 0:l.map((function(e,i){var l,a="/assets/images/category/".concat(null===e||void 0===e||null===(l=e.name)||void 0===l?void 0:l.toLowerCase().replaceAll(" ",""),".png");return(0,m.jsx)("i",{className:"rounded-circle bg-white me-1",children:(0,m.jsx)(u.ZP,{animation:"perspective",content:null===e||void 0===e?void 0:e.name,children:(0,m.jsx)("img",{src:a,alt:null===e||void 0===e?void 0:e.name,className:"rounded-circle"})})},i)})))}),(0,m.jsxs)(n.X2,{className:"card-details",children:[(0,m.jsx)(n.JX,{xs:6,lg:6,className:"",children:(0,m.jsxs)("div",{className:"card_desc",children:[(0,m.jsx)(n.ll,{className:"font-bold",children:null!==_&&void 0!==_&&_.obs_date_time_as_per_utc?d().utc(d()(null===_||void 0===_?void 0:_.obs_date_time_as_per_utc).utc()).format("MMM DD, YYYY"):null!==_&&void 0!==_&&_.obs_date?null===_||void 0===_?void 0:_.obs_date:null}),(0,m.jsxs)(n._R,{children:[null!==_&&void 0!==_&&_.obs_date_time_as_per_utc?d().utc(d()(null===_||void 0===_?void 0:_.obs_date_time_as_per_utc).utc()).format("hh:mm:ss A"):null!==_&&void 0!==_&&_.obs_time?null===_||void 0===_?void 0:_.obs_time:null," ",(0,m.jsx)(n.Ct,{className:"bg-black text-white p-1",children:null!==_&&void 0!==_&&_.obs_date_time_as_per_utc||null!==_&&void 0!==_&&_.obs_time?"UTC":""})]})]})}),(0,m.jsx)(n.JX,{xs:6,lg:6,className:" justify-content-end d-flex",children:(0,m.jsxs)("div",{className:"d-flex card-user_details align-items-center overflow-hidden",children:[(0,m.jsx)(u.ZP,{animation:"perspective",content:x?(null===x||void 0===x?void 0:x.first_name)+" "+(null===x||void 0===x?void 0:x.last_name):_.username,children:(0,m.jsx)("h6",{className:"pe-2 mb-0 text-truncate",children:x?(null===x||void 0===x?void 0:x.first_name)+" "+(null===x||void 0===x?void 0:x.last_name):_.username})}),(0,m.jsx)("i",{className:"profile-icon rounded-circle",children:(0,m.jsx)("img",{src:null!==x&&void 0!==x&&x.profile_image?null===x||void 0===x?void 0:x.profile_image:a.Z.DefaultProfile,width:"100%",height:"100%",alt:"Profile",className:"rounded-circle"})})]})})]})]}),x&&!p&&(0,m.jsxs)(n.iR,{children:[(0,m.jsx)("div",{className:"location-details",children:(0,m.jsx)("h6",{className:"mb-0",children:null===_||void 0===_?void 0:_.location})}),(0,m.jsx)("div",{className:"direction-details",children:(0,m.jsxs)("div",{className:"card-user_location",style:{"--card-location-angle":"".concat((0,c.ZQ)(null===_||void 0===_?void 0:_.azimuth),"deg")},children:[(0,m.jsxs)("h6",{className:"me-1 mb-0",children:[null===_||void 0===_?void 0:_.azimuth,Number(null===_||void 0===_?void 0:_.azimuth)?"\xb0":""]}),(null===_||void 0===_?void 0:_.azimuth)&&(0,m.jsx)("span",{className:"card-direction rounded-circle position-relative d-flex justify-content-center align-items-start",children:(0,m.jsx)("span",{className:"direction-dot"})})]})})]})]})})})}},82488:function(e,i,l){l.r(i);var a=l(94462),n=l(39852),o=l.n(n),d=(l(74405),l(80184));i.default=function(e){var i=e.observationList,l=e.isObservationDetailModal,n=e.setSelectedObservationId,s=e.setObservationDetailModal,t=e.activeType,c=function(e){s(!l),n(e)};return(0,d.jsx)(o(),{className:"photo-list p-0",options:{columnWidth:1,gutter:0,itemSelector:".photo-item",fitWidth:!1,transitionDuration:10},enableResizableChildren:!0,children:(null===i||void 0===i?void 0:i.length)>0&&(null===i||void 0===i?void 0:i.map((function(e,i){var l;return(0,d.jsx)("div",{className:"photo-item mb-4",children:(0,d.jsx)(a.Z,{cardItems:e,cardData:null===e||void 0===e||null===(l=e.images)||void 0===l?void 0:l[0],index:i,userProfile:e.user_data,handleClick:c,activeType:t})},i)})))})}}}]);
//# sourceMappingURL=3818.95965d5f.chunk.js.map