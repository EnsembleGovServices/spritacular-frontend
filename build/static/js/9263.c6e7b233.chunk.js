"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[9263,3417],{71909:function(e,n,t){var i=t(86886),r=t(80184);n.Z=function(e){var n=e.country;return(0,r.jsx)(i.Z,{countryCode:n,svg:!0,style:{width:"1.5em",height:"1.5em"},title:n})}},14212:function(e,n,t){var i=t(1413),r=t(15861),s=t(70885),a=t(87757),l=t.n(a),o=t(72791),c=t(94677),d=t(74551),u=t(17834),v=t(7788),f=t(62711),h=t(57574),m=t(80184);n.Z=function(e){var n=(0,u.Z)().setAuth,t=e.user,a=e.token,x=(0,o.useState)(""),j=(0,s.Z)(x,2),p=j[0],g=j[1],b=(0,o.useState)(""),y=(0,s.Z)(b,2),Z=y[0],C=y[1],S=(0,o.useState)("0"),N=(0,s.Z)(S,2),_=N[0],O=N[1],k=(0,o.useState)(null),w=(0,s.Z)(k,2),J=w[0],L=w[1],F=function(e){var n=e.target.files[0];g(n),O("0")},I=(0,o.useCallback)((0,r.Z)(l().mark((function e(){var r;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return L(""),(r=new FormData).append("profile_image",p),e.next=5,c.Z.patch(d.v2.api+"/users/user_profile/"+(null===t||void 0===t?void 0:t.id)+"/",r,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a)},withCredentials:!0,onUploadProgress:function(e){var n=Math.round(e.loaded/e.total*100)+"%";O(n)}}).then((function(e){C(e.data),n((function(n){var r;return(0,i.Z)((0,i.Z)({},n),{},{user:(0,i.Z)((0,i.Z)({},t),{},{profile_image:null===e||void 0===e||null===(r=e.data)||void 0===r?void 0:r.profile_image.replace(d.v2.remote,"")})})}))})).catch((function(e){L(e.response)}));case 5:case"end":return e.stop()}}),e)}))),[p]);(0,o.useEffect)((function(){p&&I().then((function(e){return e}))}),[p,I]);var X=function(){return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("label",{className:"form-label-border",children:(0,m.jsx)(h.Z,{src:null===t||void 0===t?void 0:t.profile_image,alt:null===t||void 0===t?void 0:t.first_name})}),(0,m.jsx)(v.zx,{className:"edit-btn",children:(0,m.jsx)(f.JO,{icon:"lucide:edit-2"})}),(0,m.jsx)("input",{type:"file",name:"profile_image",onChange:F})]})},D=function(){return(0,m.jsx)(m.Fragment,{children:(0,m.jsx)("div",{className:"progressBar",style:{"--percentage":_},children:(0,m.jsxs)("div",{className:"wrapper",children:[(0,m.jsx)("b",{children:_}),(0,m.jsx)("span",{children:"uploading.."})]})})})},P=function(){return(0,m.jsx)(m.Fragment,{children:(0,m.jsx)("div",{className:"form-label",children:(0,m.jsxs)("div",{className:"wrapper",children:[(0,m.jsx)("span",{children:"Please upload your image"}),(0,m.jsx)("input",{type:"file",name:"profile_image",onChange:F})]})})})};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{className:"user-profile-upload",children:Z?(0,m.jsx)(m.Fragment,{children:_>"1"&&!J&&"100%"!==_?(0,m.jsx)(D,{}):(0,m.jsx)(X,{})}):(0,m.jsx)(m.Fragment,{children:null!==t&&void 0!==t&&t.profile_image?(0,m.jsx)(m.Fragment,{children:_>"1"&&"100%"!==_?(0,m.jsx)(D,{}):(0,m.jsx)(X,{})}):(0,m.jsx)(m.Fragment,{children:_>"1"&&400!==(null===J||void 0===J?void 0:J.status)?(0,m.jsx)(D,{}):(0,m.jsx)(P,{})})})}),(0,m.jsx)(m.Fragment,{children:(null===J||void 0===J?void 0:J.data)&&J.data.profile_image.map((function(e,n){return(0,m.jsx)("span",{className:"text-danger small",children:e},n)}))})]})}},57574:function(e,n,t){var i=t(70885),r=t(72791),s=t(80184);n.Z=function(e){var n=e.src,t=e.alt,a=e.imageClass,l=e.converted,o=(0,r.useState)(null),c=(0,i.Z)(o,2),d=c[0],u=c[1],v=(0,r.useState)(""),f=(0,i.Z)(v,2),h=f[0],m=f[1];return(0,r.useEffect)((function(){var e,t=!1;return h&&d!==n&&(IntersectionObserver?(e=new IntersectionObserver((function(i){i.forEach((function(i){!t&&(i.intersectionRatio>0||i.isIntersecting)&&(u(n),e.unobserve(h))}))}),{threshold:.01,rootMargin:"75%"})).observe(h):u(n)),function(){t=!0,e&&e.unobserve&&e.unobserve(h)}}),[n,d,h,l]),(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("img",{className:a?a+" img-fluid":"img-fluid",ref:m,src:d,alt:t,onLoad:function(e){e.target.classList.add("loaded")},onError:function(e){e.target.classList.add("has-error")}})})}},77849:function(e,n,t){var i=t(72791),r=t(63417);n.Z=function(){var e=(0,i.useContext)(r.ObservationContext).observationImages;return(0,i.useDebugValue)(e,(function(e){return null!==e&&void 0!==e&&e.data?"Images set":"Images not set"})),(0,i.useContext)(r.ObservationContext)}},63417:function(e,n,t){t.r(n),t.d(n,{ObservationContext:function(){return c}});var i=t(42982),r=t(70885),s=t(16871),a=t(72791),l=t(74551),o=t(80184),c=(0,a.createContext)({});n.default=function(){var e=(0,a.useState)({image_type:1}),n=(0,r.Z)(e,2),t=n[0],d=n[1],u=(0,a.useState)({total:3,active:1,mode:{update:!1}}),v=(0,r.Z)(u,2),f=v[0],h=v[1],m=(0,a.useState)([]),x=(0,r.Z)(m,2),j=x[0],p=x[1],g=(0,a.useState)(l.pJ),b=(0,r.Z)(g,2),y=b[0],Z=b[1],C=(0,a.useState)([]),S=(0,r.Z)(C,2),N=S[0],_=S[1],O=(0,a.useState)({}),k=(0,r.Z)(O,2),w=k[0],J=k[1];return(0,a.useEffect)((function(){var e=null!==j&&void 0!==j&&j.data?(0,i.Z)(null===j||void 0===j?void 0:j.data):[];J({image_type:null===t||void 0===t?void 0:t.image_type,map_data:e,elevation_angle:null,video_url:""})}),[null===j||void 0===j?void 0:j.data,null===f||void 0===f?void 0:f.is_draft,null===t||void 0===t?void 0:t.image_type]),(0,o.jsx)(c.Provider,{value:{observationType:t,setObservationType:d,observationSteps:f,setObservationSteps:h,observationImages:j,setObservationImages:p,observationCategory:N,setObservationCategory:_,observationData:w,setObservationData:J,cameraDetails:y,setCameraDetails:Z},children:(0,o.jsx)(s.j3,{})})}},79263:function(e,n,t){t.r(n),t.d(n,{default:function(){return g}});var i=t(15861),r=t(70885),s=t(87757),a=t.n(s),l=t(7788),o=t(72791),c=t(81694),d=t.n(c),u=t(17834),v=t(14212),f=(t(74551),t(71909)),h=t(77849),m=t(80184),x=(0,o.lazy)((function(){return Promise.all([t.e(382),t.e(7925)]).then(t.bind(t,47925))})),j=(0,o.lazy)((function(){return t.e(487).then(t.bind(t,70487))})),p=(0,o.lazy)((function(){return t.e(4889).then(t.bind(t,22048))})),g=function(){var e,n=(0,u.Z)().auth,t=(0,o.useState)(null===n||void 0===n?void 0:n.user),s=(0,r.Z)(t,2),c=s[0],g=s[1],b=(0,o.useState)("1"),y=(0,r.Z)(b,2),Z=y[0],C=y[1],S=(0,h.Z)(),N=S.cameraDetails,_=S.setCameraDetails,O=(0,o.useState)(!1),k=(0,r.Z)(O,2),w=k[0],J=k[1],L=function(e){Z!==e&&("2"===e&&F().then((function(e){return e})),C(e))},F=function(){var e=(0,i.Z)(a().mark((function e(){var t,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:null!==n&&void 0!==n&&null!==(t=n.user)&&void 0!==t&&t.camera?(J(!0),_(null===n||void 0===n||null===(i=n.user)||void 0===i?void 0:i.camera)):J(!1);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){var e;g(null===n||void 0===n?void 0:n.user),null!==n&&void 0!==n&&null!==(e=n.user)&&void 0!==e&&e.camera&&J(!0)}),[n]),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("section",{className:"common-banner",children:(0,m.jsx)(l.W2,{children:(0,m.jsx)("div",{className:"banner-inner"})})}),(0,m.jsx)("section",{className:"setting-main",children:(0,m.jsx)("div",{className:"setting-inner",children:(0,m.jsx)(l.W2,{children:(0,m.jsxs)(l.X2,{children:[(0,m.jsx)(l.JX,{md:4,children:(0,m.jsxs)("div",{className:"profile-left-tab",children:[(0,m.jsxs)("div",{className:"profile-info",children:[(0,m.jsx)("div",{className:"profile-img",children:(0,m.jsx)(v.Z,{user:c,token:null===n||void 0===n||null===(e=n.token)||void 0===e?void 0:e.access})}),(0,m.jsxs)("div",{className:"profile-data text-center",children:[(0,m.jsxs)("h5",{children:[null===c||void 0===c?void 0:c.first_name," ",null===c||void 0===c?void 0:c.last_name]}),(0,m.jsx)("p",{children:null===c||void 0===c?void 0:c.email}),(0,m.jsxs)("div",{className:"d-flex align-items-center justify-content-center",children:[(0,m.jsx)(f.Z,{country:null===c||void 0===c?void 0:c.country_code}),(0,m.jsx)("span",{children:null===c||void 0===c?void 0:c.location})]})]})]}),(0,m.jsxs)(l.JL,{tabs:!0,className:"flex-column",children:[(0,m.jsx)(l.LY,{children:(0,m.jsx)(l.OL,{className:d()({active:"1"===Z}),onClick:function(){L("1")},children:"Update Profile"})}),(0,m.jsx)(l.LY,{children:(0,m.jsx)(l.OL,{className:d()({active:"2"===Z}),onClick:function(){L("2")},children:"Camera Settings"})}),(0,m.jsx)(l.LY,{children:(0,m.jsx)(l.OL,{className:d()({active:"3"===Z}),onClick:function(){L("3")},children:"Change Password"})})]})]})}),(0,m.jsx)(l.JX,{md:8,children:(0,m.jsx)("div",{className:"profile-right-tab",children:(0,m.jsxs)(l.I5,{activeTab:Z,children:[(0,m.jsx)(l.Jm,{tabId:"1",children:(0,m.jsxs)(l.X2,{children:[(0,m.jsx)(l.JX,{sm:"12",children:(0,m.jsx)("h4",{children:"Update Profile"})}),(0,m.jsx)(l.JX,{md:"12",children:(0,m.jsx)(o.Suspense,{fallback:(0,m.jsx)("div",{children:"Loading..."}),children:(0,m.jsx)(x,{user:n})})})]})}),(0,m.jsx)(l.Jm,{tabId:"2",children:(0,m.jsxs)(l.X2,{children:[(0,m.jsx)(l.JX,{sm:"12",children:(0,m.jsx)("h4",{children:"Camera Settings"})}),(0,m.jsx)(l.JX,{md:"12",children:(0,m.jsx)(o.Suspense,{fallback:(0,m.jsx)("div",{children:"Loading..."}),children:(0,m.jsx)(j,{cameraDetails:N,user:n,isDetailExist:w})})})]})}),(0,m.jsx)(l.Jm,{tabId:"3",children:(0,m.jsxs)(l.X2,{children:[(0,m.jsx)(l.JX,{sm:"12",children:(0,m.jsx)("h4",{children:"Change Password"})}),(0,m.jsx)(l.JX,{md:"12",children:(0,m.jsx)(o.Suspense,{fallback:(0,m.jsx)("div",{children:"Loading..."}),children:(0,m.jsx)(p,{user:n})})})]})})]})})})]})})})})]})}},86886:function(e,n,t){var i=t(72791);function r(){return r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},r.apply(this,arguments)}var s=["cdnSuffix","cdnUrl","countryCode","style","svg"];n.Z=function(e){var n=e.cdnSuffix,t=void 0===n?"svg":n,a=e.cdnUrl,l=void 0===a?"https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/":a,o=e.countryCode,c=e.style,d=e.svg,u=void 0!==d&&d,v=function(e,n){if(null==e)return{};var t,i,r={},s=Object.keys(e);for(i=0;i<s.length;i++)t=s[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,s);if("string"!==typeof o)return null;if(u){var f=""+l+o.toLowerCase()+"."+t;return(0,i.createElement)("img",Object.assign({},v,{src:f,style:r({display:"inline-block",width:"1em",height:"1em",verticalAlign:"middle"},c)}))}var h=o.toUpperCase().replace(/./g,(function(e){return String.fromCodePoint(e.charCodeAt(0)+127397)}));return(0,i.createElement)("span",Object.assign({role:"img"},v,{style:r({display:"inline-block",fontSize:"1em",lineHeight:"1em",verticalAlign:"middle"},c)}),h)}}}]);
//# sourceMappingURL=9263.c6e7b233.chunk.js.map