"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[5291],{95291:function(t,e,a){a.r(e);var r=a(72791),n=a(80184);e.default=function(t){var e=t.start,a=void 0===e?0:e,d=t.end,i=void 0===d?0:d,s=t.duration,o=void 0===s?1:s,u=t.speed,f=void 0===u?1:u,c=t.suffix,l=void 0===c?"":c;return(0,r.useEffect)((function(){setTimeout((function(){document.querySelectorAll("[data-counter]").forEach((function(t){var e={start:parseInt(t.getAttribute("data-start")),end:parseInt(t.getAttribute("data-end")),delay:parseInt(t.getAttribute("data-delay"))||0,format:"{}",time:parseInt(t.getAttribute("data-time"))||1,speed:parseInt(t.getAttribute("data-speed"))||1};if(t.getAttribute("data-format")?e.format=t.getAttribute("data-format"):""!==t.innerHTML&&(e.format=t.innerHTML),null==e.start)throw new Error("start is required");if(null==e.end)throw new Error("end is required");var a=e.start;t.innerHTML=e.format.replace("{}",a);var r=Math.ceil(e.time/(e.end-e.start));setTimeout((function(){var n=setInterval((function(){a+=(e.end-e.start)/Math.abs(e.end-e.start)*e.speed,t.innerHTML=e.format.replace("{}",a),a===e.end&&clearInterval(n)}),r)}),e.delay)}))}),500)}),[]),(0,n.jsx)("span",{className:"counter","data-counter":!0,"data-start":a,"data-end":i,"data-delay":o,"data-speed":f,"data-format":"{}".concat(l)})}}}]);
//# sourceMappingURL=5291.5accb829.chunk.js.map