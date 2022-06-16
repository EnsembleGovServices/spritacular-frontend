"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[3627],{21032:function(e,n,t){var s=t(74165),o=t(15861),r=t(4942),a=t(1413),l=t(70885),i=t(7788),c=t(94677),d=t(74551),u=t(72791),v=t(17834),h=t(16871),p=t(80184);n.Z=function(e){var n,t=e.cp,m=(0,v.Z)(),f=m.setAuth,x=(m.auth,m.persist),g=m.setPersist,j=(0,h.s0)(),Z=(0,u.useState)({email:"",password:""}),w=(0,l.Z)(Z,2),y=w[0],_=w[1],C=(0,u.useState)(""),k=(0,l.Z)(C,2),b=k[0],I=k[1],S=(0,u.useState)(),N=(0,l.Z)(S,2),P=(N[0],N[1]),T=function(e){e.preventDefault();var n=e.target.name,t=e.target.value;_((0,a.Z)((0,a.Z)({},y),{},(0,r.Z)({},n,t)))},X=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(n){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,c.Z.post(d.v2.token,y).then((function(e){if(200===e.status){var n,t,s,o,r,a=null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.is_superuser;g((function(e){return!e})),I(""),f({token:{access:null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.access,refresh:null===e||void 0===e||null===(s=e.data)||void 0===s?void 0:s.refresh},user:null===e||void 0===e?void 0:e.data}),P(null===e||void 0===e?void 0:e.data),localStorage.setItem("refresh",null===e||void 0===e||null===(o=e.data)||void 0===o?void 0:o.refresh),localStorage.removeItem("camera"),A(null===e||void 0===e||null===(r=e.data)||void 0===r?void 0:r.access).then((function(e){return e})),j(a?d.X0.dashboard:d.X0.home,{replace:!0})}})).catch((function(e){var n;if(null!==e&&void 0!==e&&e.response)if(null!==e&&void 0!==e&&e.response)I({status:e.response.status,message:e.response.statusText,data:e.response.data});else if(401===(null===e||void 0===e||null===(n=e.response)||void 0===n?void 0:n.status))console.log("unauthorized");else{var t;console.log(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.statusText)}else console.log(null===e||void 0===e?void 0:e.message),I((function(n){return(0,a.Z)((0,a.Z)({},n),{},{server:null===e||void 0===e?void 0:e.message})}))}));case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),A=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(n){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.get(d.v2.api+"/observation/get_category_list/",{headers:{"Content-Type":"application/json"}}).then((function(e){f((function(n){return(0,a.Z)((0,a.Z)({},n),{},{categoryList:null===e||void 0===e?void 0:e.data})}))})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,u.useEffect)((function(){localStorage.setItem("persist",x)}),[x]),(0,p.jsxs)(p.Fragment,{children:[(null===b||void 0===b?void 0:b.data)&&(0,p.jsx)("p",{className:"text-danger small mb-4 fw-bolder",children:null===b||void 0===b||null===(n=b.data)||void 0===n?void 0:n.detail}),(null===b||void 0===b?void 0:b.server)&&(0,p.jsx)("p",{className:"text-danger text-center small mb-4 fw-bolder",children:null===b||void 0===b?void 0:b.server}),(0,p.jsxs)(i.l0,{onSubmit:X,children:[(0,p.jsx)(i.cw,{children:(0,p.jsx)(i.II,{type:"email",name:"email",placeholder:"Email address",autoComplete:"off",required:!0,onChange:function(e){return T(e)}})}),(0,p.jsx)(i.cw,{children:(0,p.jsx)(i.II,{type:"password",name:"password",placeholder:"Password",required:!0,onChange:function(e){return T(e)}})}),(0,p.jsx)(i.R9,{className:"forgot-password",children:(0,p.jsx)(i.zx,{type:"button",onClick:function(){return t()},children:"Forgot Password?"})}),(0,p.jsx)(i.cw,{children:(0,p.jsx)(i.zx,{type:"submit",className:"modal-btn",disabled:!(null!==y&&void 0!==y&&y.email&&null!==y&&void 0!==y&&y.password),children:"Login"})})]})]})}},47300:function(e,n,t){t.d(n,{Z:function(){return p}});var s=t(1413),o=t(15671),r=t(43144),a=t(60136),l=t(29388),i=t(72791),c=t(20382),d=t(7788),u=t(26022),v=function(e){for(var n=0;n<e.length;n++)if(e[n].types[0]&&"administrative_area_level_2"===e[n].types[0])return e[n].long_name},h=t(80184),p=function(e){(0,a.Z)(t,e);var n=(0,l.Z)(t);function t(e){var s;return(0,o.Z)(this,t),(s=n.call(this,e)).handleChange=function(e){s.setState({address:e})},s.handleSelect=function(e,n,t){var o,r=new google.maps.places.PlacesService(document.createElement("div"));s.address="",r.getDetails({placeId:n},(function(e){if((o=e).geometry){var t=v(o.address_components),r=function(e){for(var n=0;n<e.length;n++)for(var t=0;t<e.length;t++)if(e[t].types[0]&&"administrative_area_level_1"===e[t].types[0])return e[t].long_name}(o.address_components),a=function(e){for(var n=[],t=0;t<e.length;t++)for(var s=0;s<e.length;s++)if(e[s].types[0]&&"country"===e[s].types[0])return n.long_name=e[s].long_name,n.short_name=e[s].short_name,n}(o.address_components),l=[t,r,a.long_name].filter((function(e){return void 0!==e&&null!==e})),i=[];i.address=l.join(", "),i.lat=o.geometry.location.lat(),i.lng=o.geometry.location.lng(),i.placeId=n,i.countryCode=a.short_name,s.props.handleLocations(i),s.setState({addressArray:i})}}))},s.state={address:s.props.address},s}return(0,r.Z)(t,[{key:"render",value:function(){var e,n=this;return(0,h.jsx)(c.ZP,{value:null!==(e=this.state.address)&&void 0!==e?e:"",onChange:this.handleChange,onSelect:this.handleSelect,children:function(e){var t,o,r,a,l,i=e.getInputProps,c=e.suggestions,v=e.getSuggestionItemProps,p=e.loading;return(0,h.jsxs)("div",{className:"position-relative setplaceholdersize",children:[(0,h.jsx)(d.II,(0,s.Z)((0,s.Z)({},i({placeholder:"Enter name of your city or country of residence",className:"location-search-input form-control"})),{},{value:null!==(t=n.state.address)&&void 0!==t?t:"",invalid:null===(o=n.props.error)||void 0===o||null===(r=o.data)||void 0===r?void 0:r.location})),(0,h.jsx)(d.AG,{children:null===(a=n.props.error)||void 0===a||null===(l=a.data)||void 0===l?void 0:l.location}),(0,h.jsxs)("div",{className:"autocomplete-dropdown-container",children:[p&&(0,h.jsx)(u.Z,{fixContent:!1}),c.map((function(e,t){var o=e.active?"suggestion-item suggestion-item--active":"suggestion-item",r=e.active?{backgroundColor:"#ffebeb",color:"#990000",cursor:"pointer"}:{backgroundColor:"transparent",color:"#000",cursor:"pointer"};return(0,h.jsx)("div",(0,s.Z)((0,s.Z)({},v(e,{className:o,style:r})),{},{children:(0,h.jsx)("span",{onClick:function(){n.setState({address:e.description})},children:e.description})}),t)}))]})]})}})}}]),t}(i.Component)},76113:function(e,n,t){t.d(n,{Z:function(){return p}});var s=t(70885),o=t(7788),r=t(72791),a=t(47604),l=t(21032),i=t(74165),c=t(15861),d=(t(37084),t(94677)),u=t(74551),v=t(80184),h=function(e){var n,t,l=e.open,h=e.handleClose,p=e.modalClass,m=(0,r.useState)(""),f=(0,s.Z)(m,2),x=f[0],g=f[1],j=(0,r.useState)(""),Z=(0,s.Z)(j,2),w=Z[0],y=Z[1],_=(0,r.useState)(""),C=(0,s.Z)(_,2),k=C[0],b=C[1],I=function(){var e=(0,c.Z)((0,i.Z)().mark((function e(n){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,d.Z.post(u.v2.api+"/users/password_reset/",{email:x}).then((function(e){b("Password reset link sent successfully"),setTimeout((function(){h()}),3e3)})).catch((function(e){console.log(e),y(e.response),null!==e&&void 0!==e&&e.response||console.log("server error occurred")}));case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(o.u_,{className:p||"common-modal",isOpen:l,toggle:h,centered:!0,backdrop:!0,keyboard:!1,children:[(0,v.jsxs)(o.xB,{children:["Forgot Your Password",(0,v.jsx)(o.zx,{className:"close-icon",onClick:function(){return h()},children:(0,v.jsx)("img",{src:a.Z.Modalcloseicon,alt:"close-icon"})}),(0,v.jsxs)("p",{children:["Please enter the email address you'd like your password reset information sent to"," "]})]}),(0,v.jsx)(o.fe,{children:(0,v.jsx)(o.l0,{children:(0,v.jsxs)(o.X2,{children:[(0,v.jsxs)(o.JX,{sm:12,children:[k&&(0,v.jsx)(o.bZ,{color:"success",children:k}),(0,v.jsxs)(o.cw,{children:[(0,v.jsx)(o.II,{type:"email",name:"email",placeholder:"Enter email address",onChange:function(e){return function(e){e.preventDefault(),g(e.target.value)}(e)},invalid:!(null===w||void 0===w||null===(n=w.data)||void 0===n||!n.email)}),(0,v.jsx)(o.AG,{children:null===w||void 0===w||null===(t=w.data)||void 0===t?void 0:t.email})]})]}),(0,v.jsx)(o.JX,{sm:12,children:(0,v.jsx)(o.cw,{children:(0,v.jsx)(o.zx,{className:"modal-btn",onClick:I,children:"Request reset link"})})}),(0,v.jsx)(o.JX,{sm:12,children:(0,v.jsx)(o.cw,{className:"text-center modal-bottom-text",children:(0,v.jsx)(o.zx,{onClick:function(){return h()},children:" Back To Login "})})})]})})})]})})},p=function(e){var n=e.open,t=e.handleClose,i=e.modalClass,c=(0,r.useState)(!1),d=(0,s.Z)(c,2),u=d[0],p=d[1],m=(0,r.useState)(!0),f=(0,s.Z)(m,2),x=f[0],g=f[1],j=function(){p(!u),g(!x)};return(0,v.jsxs)(v.Fragment,{children:[!0===x&&(0,v.jsxs)(o.u_,{className:i||"common-modal",isOpen:n,toggle:t,centered:!0,backdrop:!0,keyboard:!1,children:[(0,v.jsxs)(o.xB,{children:["Login",(0,v.jsx)(o.zx,{className:"close-icon",onClick:function(){return t()},children:(0,v.jsx)("img",{src:a.Z.Modalcloseicon,alt:"close-icon"})})]}),(0,v.jsx)(o.fe,{children:(0,v.jsx)(l.Z,{cp:function(){return j()}})})]}),u&&(0,v.jsx)(h,{open:u,handleClose:j})]})}},93754:function(e,n,t){t.d(n,{Z:function(){return g}});var s=t(7788),o=t(47604),r=(t(37084),t(74165)),a=t(15861),l=t(4942),i=t(1413),c=t(70885),d=t(72791),u=t(94677),v=t(17834),h=t(74551),p=t(47300),m=t(43504),f=t(80184),x=function(e){var n,t,o,x,g,j,Z,w,y,_,C,k=e.handleLogin,b=(0,v.Z)(),I=b.setAuth,S=b.persist,N=b.setPersist,P=(0,d.useState)({first_name:"",last_name:"",email:"",location:"",place_uid:"",location_metadata:{address:"",lat:"",lng:"",countryCode:""}}),T=(0,c.Z)(P,2),X=T[0],A=T[1],L=(0,d.useState)(),z=(0,c.Z)(L,2),q=z[0],E=z[1],F=(0,d.useState)(),D=(0,c.Z)(F,2),G=D[0],J=D[1],B=function(e){var n=e.target.name,t=e.target.value;A((0,i.Z)((0,i.Z)({},X),{},(0,l.Z)({},n,t)))},M=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,u.Z.post(h.v2.register,X).then((function(e){201===e.status?(J(null),E({status:e.status,data:e.data}),O()):console.log(null===e||void 0===e?void 0:e.statusText)})).catch((function(e){var n;(E(null),null!==e&&void 0!==e&&e.response)?(J({status:e.response.status,message:e.response.statusText,data:e.response.data}),console.log(null===e||void 0===e||null===(n=e.response)||void 0===n?void 0:n.statusText)):console.log("Server error occurred");e&&console.log(e.response)}));case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),O=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.Z.post(h.v2.token,{email:X.email,password:X.password}).then((function(e){var n;N((function(e){return!e})),I((function(n){var t,s;return(0,i.Z)((0,i.Z)({},n),{},{token:{access:null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.access,refresh:null===e||void 0===e||null===(s=e.data)||void 0===s?void 0:s.refresh},user:null===e||void 0===e?void 0:e.data})})),A(null),localStorage.setItem("refresh",null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.refresh)})).catch((function(e){console.log("Something went wrong")}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,d.useEffect)((function(){localStorage.setItem("persist",S)}),[S]),(0,f.jsxs)(f.Fragment,{children:[q&&(0,f.jsx)("p",{className:"text-success small mb-4 fw-bolder",children:"Signed up successfully"}),(0,f.jsxs)(s.l0,{onSubmit:M,children:[(0,f.jsxs)(s.X2,{children:[(0,f.jsx)(s.JX,{sm:6,children:(0,f.jsxs)(s.cw,{children:[(0,f.jsx)(s.II,{required:!0,type:"text",name:"first_name",placeholder:"First name",value:null!==(n=null===X||void 0===X?void 0:X.first_name)&&void 0!==n?n:"",onChange:function(e){return B(e)},invalid:!(null===G||void 0===G||null===(t=G.data)||void 0===t||!t.first_name)}),(0,f.jsx)(s.AG,{children:null===G||void 0===G||null===(o=G.data)||void 0===o?void 0:o.first_name})]})}),(0,f.jsx)(s.JX,{sm:6,className:"",children:(0,f.jsxs)(s.cw,{children:[(0,f.jsx)(s.II,{required:!0,type:"text",name:"last_name",placeholder:"Last name",value:null!==(x=null===X||void 0===X?void 0:X.last_name)&&void 0!==x?x:"",invalid:!(null===G||void 0===G||null===(g=G.data)||void 0===g||!g.last_name),onChange:function(e){return B(e)}}),(0,f.jsx)(s.AG,{children:null===G||void 0===G||null===(j=G.data)||void 0===j?void 0:j.last_name})]})})]}),(0,f.jsx)(s.X2,{children:(0,f.jsxs)(s.JX,{sm:12,children:[(0,f.jsxs)(s.cw,{children:[(0,f.jsx)(s.II,{required:!0,type:"email",name:"email",placeholder:"Email address",value:null!==(Z=null===X||void 0===X?void 0:X.email)&&void 0!==Z?Z:"",invalid:!(null===G||void 0===G||null===(w=G.data)||void 0===w||!w.email),onChange:function(e){return B(e)}}),(0,f.jsx)(s.AG,{children:null===G||void 0===G||null===(y=G.data)||void 0===y?void 0:y.email})]}),(0,f.jsxs)(s.cw,{children:[(0,f.jsx)(s.II,{required:!0,type:"password",name:"password",placeholder:"Password",invalid:!(null===G||void 0===G||null===(_=G.data)||void 0===_||!_.password),onChange:function(e){return B(e)}}),(0,f.jsx)(s.AG,{children:null===G||void 0===G||null===(C=G.data)||void 0===C?void 0:C.password})]}),(0,f.jsx)(s.cw,{children:(0,f.jsx)(s.II,{required:!0,type:"password",name:"password_confirmation",placeholder:"Confirm Password",onChange:function(e){return B(e)}})}),(0,f.jsx)(s.cw,{children:(0,f.jsx)(p.Z,{handleLocations:function(e){A((0,i.Z)((0,i.Z)({},X),{},{location:e.address,place_uid:e.placeId,country_code:e.countryCode,location_metadata:{lat:e.lat,lng:e.lng}}))},error:G})}),(0,f.jsx)(s.cw,{check:!0,children:(0,f.jsxs)(s.__,{check:!0,children:[(0,f.jsx)(s.II,{required:!0,type:"checkbox",name:"agreeTerms",checked:!0===(null===X||void 0===X?void 0:X.agreeTerms),onChange:function(e){return function(e){A((0,i.Z)((0,i.Z)({},X),{},{agreeTerms:!!e.target.checked}))}(e)}}),"Creating an account means you agree with our with our"," ",(0,f.jsx)(m.rU,{to:"/".concat(h.X0.policy),children:"Privacy Policy"})," and ",(0,f.jsx)(m.rU,{to:"/".concat(h.X0.policy),children:"Terms."})]})})]})}),(0,f.jsx)(s.zx,{type:"submit",className:"modal-btn",disabled:!(null!==X&&void 0!==X&&X.agreeTerms&&(null===X||void 0===X?void 0:X.password)===(null===X||void 0===X?void 0:X.password_confirmation)),children:"Create Account"})]}),(0,f.jsxs)("p",{className:"bottom-text",children:["Already have an account? ",(0,f.jsx)("span",{onClick:function(){return k()},className:"pointer fw-bold",children:"Login"})]})]})},g=function(e){var n=e.open,t=e.handleClose,r=e.handleLoginModal,a=e.modalClass;return(0,f.jsxs)(s.u_,{className:"common-modal ".concat(a||""),isOpen:n,toggle:t,backdrop:!0,keyboard:!0,centered:!0,children:[(0,f.jsxs)(s.xB,{children:[(0,f.jsx)("span",{children:"Sign Up"}),(0,f.jsx)(s.zx,{className:"close-icon",onClick:function(){return t()},children:(0,f.jsx)("img",{src:o.Z.Modalcloseicon,alt:"close-icon"})})]}),(0,f.jsx)(s.fe,{children:(0,f.jsx)(x,{handleLogin:r})})]})}},37084:function(){}}]);
//# sourceMappingURL=3627.8fad7a4d.chunk.js.map