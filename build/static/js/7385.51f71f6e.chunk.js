"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[7385],{97385:function(e,t,r){r.r(t),r.d(t,{default:function(){return o}});var n=r(7788),a=r(46883),s=r(72791),i=r(80184),d=function(e){var t=e.start,r=void 0===t?0:t,n=e.end,a=void 0===n?0:n,d=e.duration,c=void 0===d?1:d,o=e.speed,l=void 0===o?1:o,u=e.suffix,m=void 0===u?"":u;return(0,s.useEffect)((function(){setTimeout((function(){document.querySelectorAll("[data-counter]").forEach((function(e){var t={start:parseInt(e.getAttribute("data-start")),end:parseInt(e.getAttribute("data-end")),delay:parseInt(e.getAttribute("data-delay"))||0,format:"{}",time:parseInt(e.getAttribute("data-time"))||1,speed:parseInt(e.getAttribute("data-speed"))||1};if(e.getAttribute("data-format")?t.format=e.getAttribute("data-format"):""!==e.innerHTML&&(t.format=e.innerHTML),null==t.start)throw new Error("start is required");if(null==t.end)throw new Error("end is required");var r=t.start;e.innerHTML=t.format.replace("{}",r);var n=Math.ceil(t.time/(t.end-t.start));setTimeout((function(){var a=setInterval((function(){r+=(t.end-t.start)/Math.abs(t.end-t.start)*t.speed,e.innerHTML=t.format.replace("{}",r),r===t.end&&clearInterval(a)}),n)}),t.delay)}))}),500)}),[]),(0,i.jsx)("span",{className:"counter","data-counter":!0,"data-start":r,"data-end":a,"data-delay":c,"data-speed":l,"data-format":"{}".concat(m)})},c=r(40872),o=function(){var e=(0,c.Z)().recentObservation,t=null===e||void 0===e?void 0:e.observation_user_count,r=null===e||void 0===e?void 0:e.observation_count,s=null===e||void 0===e?void 0:e.observation_country_count;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"counter-main",children:(0,i.jsx)(n.W2,{children:(0,i.jsxs)(n.X2,{children:[(0,i.jsx)(n.JX,{md:4,sm:6,children:(0,i.jsxs)("div",{className:"counter-inner",children:[(0,i.jsx)("div",{className:"left-image",children:(0,i.jsx)("img",{src:a.Z.User,alt:"Users"})}),(0,i.jsxs)("div",{className:"right-counter",children:[(0,i.jsx)(d,{end:t,speed:1}),(0,i.jsx)("p",{children:"Volunteers"})]})]})}),(0,i.jsx)(n.JX,{md:4,sm:6,children:(0,i.jsxs)("div",{className:"counter-inner",children:[(0,i.jsx)("div",{className:"left-image",children:(0,i.jsx)("img",{src:a.Z.Submit,alt:"user"})}),(0,i.jsxs)("div",{className:"right-counter",children:[(0,i.jsx)(d,{end:r,speed:1}),(0,i.jsx)("p",{children:"Observations"})]})]})}),(0,i.jsx)(n.JX,{md:4,sm:12,children:(0,i.jsxs)("div",{className:"counter-inner",children:[(0,i.jsx)("div",{className:"left-image",children:(0,i.jsx)("img",{src:a.Z.Country,alt:"country"})}),(0,i.jsxs)("div",{className:"right-counter",children:[(0,i.jsx)(d,{end:s,speed:1}),(0,i.jsx)("p",{children:"Countries"})]})]})})]})})})})}}}]);
//# sourceMappingURL=7385.51f71f6e.chunk.js.map