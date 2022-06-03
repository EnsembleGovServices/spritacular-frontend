"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[7925],{47925:function(e,n,t){t.r(n);var a=t(15861),o=t(4942),l=t(1413),i=t(70885),r=t(87757),s=t.n(r),d=t(7788),u=t(94677),c=t(72791),v=t(74551),m=t(17834),h=t(47300),p=t(80184);n.default=function(e){var n,t,r,f,_,g,x,j,y,Z,C,I=e.user,S=(0,m.Z)().setAuth,b=(0,c.useState)(),w=(0,i.Z)(b,2),k=w[0],N=w[1],A=(0,c.useState)(),F=(0,i.Z)(A,2),E=F[0],G=F[1],L=(0,c.useState)(),P=(0,i.Z)(L,2),z=P[0],D=P[1],B=function(e){e.preventDefault();var n=e.target.name,t=e.target.value;N((0,l.Z)((0,l.Z)({},k),{},(0,o.Z)({},n,t)))};(0,c.useEffect)((function(){N(null===I||void 0===I?void 0:I.user)}),[null===I||void 0===I?void 0:I.user]);var T=function(){var e=(0,a.Z)(s().mark((function e(n){var t,a,o,i;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),G(""),D(""),e.next=5,u.Z.patch(v.v2.api+"/users/user_profile/"+(null===I||void 0===I||null===(t=I.user)||void 0===t?void 0:t.id)+"/",{first_name:null===k||void 0===k?void 0:k.first_name,last_name:null===k||void 0===k?void 0:k.last_name,email:null===k||void 0===k?void 0:k.email,location:null===k||void 0===k?void 0:k.location,place_uid:null===k||void 0===k?void 0:k.place_uid,country_code:null===k||void 0===k?void 0:k.country_code,location_metadata:{lat:null===k||void 0===k||null===(a=k.location_metadata)||void 0===a?void 0:a.lat,lng:null===k||void 0===k||null===(o=k.location_metadata)||void 0===o?void 0:o.lng}},{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(null===I||void 0===I||null===(i=I.token)||void 0===i?void 0:i.access)},withCredentials:!0}).then((function(e){G(e),S((function(e){return(0,l.Z)((0,l.Z)({},e),{},{user:k})}))})).catch((function(e){console.log(e.response),D(e.response)}));case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,p.jsxs)(p.Fragment,{children:[E&&200===(null===E||void 0===E?void 0:E.status)&&(0,p.jsx)(d.sU,{variant:"success","data-dismiss":"alert",dismissible:"true",children:"Profile updated successfully"}),(0,p.jsxs)(d.l0,{onSubmit:T,children:[(0,p.jsxs)(d.cw,{children:[(0,p.jsx)(d.__,{htmlFor:"first_name",children:"First Name"}),(0,p.jsx)(d.II,{type:"text",name:"first_name",value:null!==(n=null===k||void 0===k?void 0:k.first_name)&&void 0!==n?n:"",onChange:function(e){return B(e)},invalid:!(null===z||void 0===z||null===(t=z.data)||void 0===t||!t.first_name),placeholder:"First Name"}),(0,p.jsx)(d.AG,{children:null===z||void 0===z||null===(r=z.data)||void 0===r?void 0:r.first_name})]}),(0,p.jsxs)(d.cw,{children:[(0,p.jsx)(d.__,{htmlFor:"last_name",children:"Last Name"}),(0,p.jsx)(d.II,{type:"text",name:"last_name",placeholder:"Last Name",value:null!==(f=null===k||void 0===k?void 0:k.last_name)&&void 0!==f?f:"",invalid:!(null===z||void 0===z||null===(_=z.data)||void 0===_||!_.last_name),onChange:function(e){return B(e)}}),(0,p.jsx)(d.AG,{children:null===z||void 0===z||null===(g=z.data)||void 0===g?void 0:g.last_name})]}),(0,p.jsxs)(d.cw,{children:[(0,p.jsx)(d.__,{htmlFor:"email",children:"Email"}),(0,p.jsx)(d.II,{type:"email",name:"email",placeholder:"Enter Your Email",value:null!==(x=null===k||void 0===k?void 0:k.email)&&void 0!==x?x:"",invalid:!(null===z||void 0===z||null===(j=z.data)||void 0===j||!j.email),onChange:function(e){return B(e)}}),(0,p.jsx)(d.AG,{children:null===z||void 0===z||null===(y=z.data)||void 0===y?void 0:y.email})]}),(0,p.jsxs)(d.cw,{children:[(0,p.jsx)(d.__,{htmlFor:"location",children:"Location"}),(0,p.jsx)(h.Z,{handleLocations:function(e){N((0,l.Z)((0,l.Z)({},k),{},{location:e.address,place_uid:e.placeId,country_code:e.countryCode,location_metadata:{lat:e.lat,lng:e.lng}}))},address:null===I||void 0===I||null===(Z=I.user)||void 0===Z?void 0:Z.location}),(0,p.jsx)(d.AG,{children:null===z||void 0===z||null===(C=z.data)||void 0===C?void 0:C.location})]}),(0,p.jsx)(d.cw,{className:"profile-bottom-btn ",children:(0,p.jsx)(d.zx,{type:"submit",className:"save-btn",children:"Save Changes"})})]})]})}},47300:function(e,n,t){t.d(n,{Z:function(){return h}});var a=t(1413),o=t(15671),l=t(43144),i=t(60136),r=t(29388),s=t(72791),d=t(20382),u=t(7788),c=t(26022),v=function(e){for(var n=0;n<e.length;n++)if(e[n].types[0]&&"administrative_area_level_2"===e[n].types[0])return e[n].long_name},m=t(80184),h=function(e){(0,i.Z)(t,e);var n=(0,r.Z)(t);function t(e){var a;return(0,o.Z)(this,t),(a=n.call(this,e)).handleChange=function(e){a.setState({address:e})},a.handleSelect=function(e,n,t){var o,l=new google.maps.places.PlacesService(document.createElement("div"));a.address="",l.getDetails({placeId:n},(function(e){if((o=e).geometry){var t=v(o.address_components),l=function(e){for(var n=0;n<e.length;n++)for(var t=0;t<e.length;t++)if(e[t].types[0]&&"administrative_area_level_1"===e[t].types[0])return e[t].long_name}(o.address_components),i=function(e){for(var n=[],t=0;t<e.length;t++)for(var a=0;a<e.length;a++)if(e[a].types[0]&&"country"===e[a].types[0])return n.long_name=e[a].long_name,n.short_name=e[a].short_name,n}(o.address_components),r=[t,l,i.long_name].filter((function(e){return void 0!==e&&null!==e})),s=[];s.address=r.join(", "),s.lat=o.geometry.location.lat(),s.lng=o.geometry.location.lng(),s.placeId=n,s.countryCode=i.short_name,a.props.handleLocations(s),a.setState({addressArray:s})}}))},a.state={address:a.props.address},a}return(0,l.Z)(t,[{key:"render",value:function(){var e,n=this;return(0,m.jsx)(d.ZP,{value:null!==(e=this.state.address)&&void 0!==e?e:"",onChange:this.handleChange,onSelect:this.handleSelect,children:function(e){var t,o,l,i,r,s=e.getInputProps,d=e.suggestions,v=e.getSuggestionItemProps,h=e.loading;return(0,m.jsxs)("div",{className:"position-relative setplaceholdersize",children:[(0,m.jsx)(u.II,(0,a.Z)((0,a.Z)({},s({placeholder:"Enter name of your city or country of residence",className:"location-search-input form-control"})),{},{value:null!==(t=n.state.address)&&void 0!==t?t:"",invalid:null===(o=n.props.error)||void 0===o||null===(l=o.data)||void 0===l?void 0:l.location})),(0,m.jsx)(u.AG,{children:null===(i=n.props.error)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.location}),(0,m.jsxs)("div",{className:"autocomplete-dropdown-container",children:[h&&(0,m.jsx)(c.Z,{fixContent:!1}),d.map((function(e,t){var o=e.active?"suggestion-item suggestion-item--active":"suggestion-item",l=e.active?{backgroundColor:"#ffebeb",color:"#990000",cursor:"pointer"}:{backgroundColor:"transparent",color:"#000",cursor:"pointer"};return(0,m.jsx)("div",(0,a.Z)((0,a.Z)({},v(e,{className:o,style:l})),{},{children:(0,m.jsx)("span",{onClick:function(){n.setState({address:e.description})},children:e.description})}),t)}))]})]})}})}}]),t}(s.Component)}}]);
//# sourceMappingURL=7925.5cd4a46f.chunk.js.map