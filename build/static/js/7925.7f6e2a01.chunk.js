"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[7925],{47925:function(n,l,e){e.r(l);var i=e(15861),a=e(4942),t=e(1413),o=e(70885),d=e(87757),s=e.n(d),u=e(7788),r=e(94677),c=e(72791),v=e(74551),m=e(17834),h=e(47300),f=e(80184);l.default=function(n){var l,e,d,_,p,x,j,Z,g,y,w,C=n.user,b=(0,m.Z)().setAuth,F=(0,c.useState)(),I=(0,o.Z)(F,2),k=I[0],A=I[1],N=(0,c.useState)(),S=(0,o.Z)(N,2),E=S[0],G=S[1],L=(0,c.useState)(),z=(0,o.Z)(L,2),D=z[0],B=z[1],P=function(n){n.preventDefault();var l=n.target.name,e=n.target.value;A((0,t.Z)((0,t.Z)({},k),{},(0,a.Z)({},l,e)))};(0,c.useEffect)((function(){A(null===C||void 0===C?void 0:C.user)}),[null===C||void 0===C?void 0:C.user]);var T=function(){var n=(0,i.Z)(s().mark((function n(l){var e,i,a,o;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return l.preventDefault(),G(""),B(""),n.next=5,r.Z.patch(v.v2.api+"/users/user_profile/"+(null===C||void 0===C||null===(e=C.user)||void 0===e?void 0:e.id)+"/",{first_name:null===k||void 0===k?void 0:k.first_name,last_name:null===k||void 0===k?void 0:k.last_name,email:null===k||void 0===k?void 0:k.email,location:null===k||void 0===k?void 0:k.location,place_uid:null===k||void 0===k?void 0:k.place_uid,country_code:null===k||void 0===k?void 0:k.country_code,location_metadata:{lat:null===k||void 0===k||null===(i=k.location_metadata)||void 0===i?void 0:i.lat,lng:null===k||void 0===k||null===(a=k.location_metadata)||void 0===a?void 0:a.lng}},{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(null===C||void 0===C||null===(o=C.token)||void 0===o?void 0:o.access)},withCredentials:!0}).then((function(n){G(n),b((function(n){return(0,t.Z)((0,t.Z)({},n),{},{user:k})}))})).catch((function(n){console.log(n.response),B(n.response)}));case 5:case"end":return n.stop()}}),n)})));return function(l){return n.apply(this,arguments)}}();return(0,f.jsxs)(f.Fragment,{children:[E&&200===(null===E||void 0===E?void 0:E.status)&&(0,f.jsx)(u.sU,{variant:"success","data-dismiss":"alert",dismissible:"true",children:"Profile updated successfully"}),(0,f.jsxs)(u.l0,{onSubmit:T,children:[(0,f.jsxs)(u.cw,{children:[(0,f.jsx)(u.__,{htmlFor:"first_name",children:"First Name"}),(0,f.jsx)(u.II,{type:"text",name:"first_name",value:null!==(l=null===k||void 0===k?void 0:k.first_name)&&void 0!==l?l:"",onChange:function(n){return P(n)},invalid:!(null===D||void 0===D||null===(e=D.data)||void 0===e||!e.first_name),placeholder:"First Name"}),(0,f.jsx)(u.AG,{children:null===D||void 0===D||null===(d=D.data)||void 0===d?void 0:d.first_name})]}),(0,f.jsxs)(u.cw,{children:[(0,f.jsx)(u.__,{htmlFor:"last_name",children:"Last Name"}),(0,f.jsx)(u.II,{type:"text",name:"last_name",placeholder:"Last Name",value:null!==(_=null===k||void 0===k?void 0:k.last_name)&&void 0!==_?_:"",invalid:!(null===D||void 0===D||null===(p=D.data)||void 0===p||!p.last_name),onChange:function(n){return P(n)}}),(0,f.jsx)(u.AG,{children:null===D||void 0===D||null===(x=D.data)||void 0===x?void 0:x.last_name})]}),(0,f.jsxs)(u.cw,{children:[(0,f.jsx)(u.__,{htmlFor:"email",children:"Email"}),(0,f.jsx)(u.II,{type:"email",name:"email",placeholder:"Enter Your Email",value:null!==(j=null===k||void 0===k?void 0:k.email)&&void 0!==j?j:"",invalid:!(null===D||void 0===D||null===(Z=D.data)||void 0===Z||!Z.email),onChange:function(n){return P(n)}}),(0,f.jsx)(u.AG,{children:null===D||void 0===D||null===(g=D.data)||void 0===g?void 0:g.email})]}),(0,f.jsxs)(u.cw,{children:[(0,f.jsx)(u.__,{htmlFor:"location",children:"Location"}),(0,f.jsx)(h.Z,{handleLocations:function(n){A((0,t.Z)((0,t.Z)({},k),{},{location:n.address,place_uid:n.placeId,country_code:n.countryCode,location_metadata:{lat:n.lat,lng:n.lng}}))},address:null===C||void 0===C||null===(y=C.user)||void 0===y?void 0:y.location}),(0,f.jsx)(u.AG,{children:null===D||void 0===D||null===(w=D.data)||void 0===w?void 0:w.location})]}),(0,f.jsx)(u.cw,{className:"profile-bottom-btn ",children:(0,f.jsx)(u.zx,{type:"submit",className:"save-btn",children:"Save Changes"})})]})]})}}}]);
//# sourceMappingURL=7925.7f6e2a01.chunk.js.map