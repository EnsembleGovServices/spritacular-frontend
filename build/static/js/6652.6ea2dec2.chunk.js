"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[6652],{36652:function(e,t,n){n.d(t,{ZP:function(){return le}});var r=n(50481),i=n(13514),o="tippy-content",a="tippy-backdrop",s="tippy-arrow",u="tippy-svg-arrow",c={passive:!0,capture:!0},p=function(){return document.body};function f(e,t,n){if(Array.isArray(e)){var r=e[t];return null==r?Array.isArray(n)?n[t]:n:r}return e}function d(e,t){var n={}.toString.call(e);return 0===n.indexOf("[object")&&n.indexOf(t+"]")>-1}function l(e,t){return"function"===typeof e?e.apply(void 0,t):e}function v(e,t){return 0===t?e:function(r){clearTimeout(n),n=setTimeout((function(){e(r)}),t)};var n}function m(e){return[].concat(e)}function b(e,t){-1===e.indexOf(t)&&e.push(t)}function h(e){return e.split("-")[0]}function g(e){return[].slice.call(e)}function y(e){return Object.keys(e).reduce((function(t,n){return void 0!==e[n]&&(t[n]=e[n]),t}),{})}function O(){return document.createElement("div")}function E(e){return["Element","Fragment"].some((function(t){return d(e,t)}))}function w(e){return d(e,"MouseEvent")}function T(e){return!(!e||!e._tippy||e._tippy.reference!==e)}function A(e){return E(e)?[e]:function(e){return d(e,"NodeList")}(e)?g(e):Array.isArray(e)?e:g(document.querySelectorAll(e))}function x(e,t){e.forEach((function(e){e&&(e.style.transitionDuration=t+"ms")}))}function C(e,t){e.forEach((function(e){e&&e.setAttribute("data-state",t)}))}function L(e){var t,n=m(e)[0];return null!=n&&null!=(t=n.ownerDocument)&&t.body?n.ownerDocument:document}function k(e,t,n){var r=t+"EventListener";["transitionend","webkitTransitionEnd"].forEach((function(t){e[r](t,n)}))}function j(e,t){for(var n=t;n;){var r;if(e.contains(n))return!0;n=null==n.getRootNode||null==(r=n.getRootNode())?void 0:r.host}return!1}var D={isTouch:!1},S=0;function V(){D.isTouch||(D.isTouch=!0,window.performance&&document.addEventListener("mousemove",_))}function _(){var e=performance.now();e-S<20&&(D.isTouch=!1,document.removeEventListener("mousemove",_)),S=e}function N(){var e=document.activeElement;if(T(e)){var t=e._tippy;e.blur&&!t.state.isVisible&&e.blur()}}var H=!!("undefined"!==typeof window&&"undefined"!==typeof document)&&!!window.msCrypto;var I={animateFill:!1,followCursor:!1,inlinePositioning:!1,sticky:!1},P=Object.assign({appendTo:p,aria:{content:"auto",expanded:"auto"},delay:0,duration:[300,250],getReferenceClientRect:null,hideOnClick:!0,ignoreAttributes:!1,interactive:!1,interactiveBorder:2,interactiveDebounce:0,moveTransition:"",offset:[0,10],onAfterUpdate:function(){},onBeforeUpdate:function(){},onCreate:function(){},onDestroy:function(){},onHidden:function(){},onHide:function(){},onMount:function(){},onShow:function(){},onShown:function(){},onTrigger:function(){},onUntrigger:function(){},onClickOutside:function(){},placement:"top",plugins:[],popperOptions:{},render:null,showOnCreate:!1,touch:!0,trigger:"mouseenter focus",triggerTarget:null},I,{allowHTML:!1,animation:"fade",arrow:!0,content:"",inertia:!1,maxWidth:350,role:"tooltip",theme:"",zIndex:9999}),R=Object.keys(P);function M(e){var t=(e.plugins||[]).reduce((function(t,n){var r,i=n.name,o=n.defaultValue;i&&(t[i]=void 0!==e[i]?e[i]:null!=(r=P[i])?r:o);return t}),{});return Object.assign({},e,t)}function U(e,t){var n=Object.assign({},t,{content:l(t.content,[e])},t.ignoreAttributes?{}:function(e,t){return(t?Object.keys(M(Object.assign({},P,{plugins:t}))):R).reduce((function(t,n){var r=(e.getAttribute("data-tippy-"+n)||"").trim();if(!r)return t;if("content"===n)t[n]=r;else try{t[n]=JSON.parse(r)}catch(i){t[n]=r}return t}),{})}(e,t.plugins));return n.aria=Object.assign({},P.aria,n.aria),n.aria={expanded:"auto"===n.aria.expanded?t.interactive:n.aria.expanded,content:"auto"===n.aria.content?t.interactive?null:"describedby":n.aria.content},n}function $(e,t){e.innerHTML=t}function B(e){var t=O();return!0===e?t.className=s:(t.className=u,E(e)?t.appendChild(e):$(t,e)),t}function W(e,t){E(t.content)?($(e,""),e.appendChild(t.content)):"function"!==typeof t.content&&(t.allowHTML?$(e,t.content):e.textContent=t.content)}function F(e){var t=e.firstElementChild,n=g(t.children);return{box:t,content:n.find((function(e){return e.classList.contains(o)})),arrow:n.find((function(e){return e.classList.contains(s)||e.classList.contains(u)})),backdrop:n.find((function(e){return e.classList.contains(a)}))}}function q(e){var t=O(),n=O();n.className="tippy-box",n.setAttribute("data-state","hidden"),n.setAttribute("tabindex","-1");var r=O();function i(n,r){var i=F(t),o=i.box,a=i.content,s=i.arrow;r.theme?o.setAttribute("data-theme",r.theme):o.removeAttribute("data-theme"),"string"===typeof r.animation?o.setAttribute("data-animation",r.animation):o.removeAttribute("data-animation"),r.inertia?o.setAttribute("data-inertia",""):o.removeAttribute("data-inertia"),o.style.maxWidth="number"===typeof r.maxWidth?r.maxWidth+"px":r.maxWidth,r.role?o.setAttribute("role",r.role):o.removeAttribute("role"),n.content===r.content&&n.allowHTML===r.allowHTML||W(a,e.props),r.arrow?s?n.arrow!==r.arrow&&(o.removeChild(s),o.appendChild(B(r.arrow))):o.appendChild(B(r.arrow)):s&&o.removeChild(s)}return r.className=o,r.setAttribute("data-state","hidden"),W(r,e.props),t.appendChild(n),n.appendChild(r),i(e.props,e.props),{popper:t,onUpdate:i}}q.$$tippy=!0;var z=1,Z=[],J=[];function X(e,t){var n,i,o,a,s,u,d,E,T=U(e,Object.assign({},P,M(y(t)))),A=!1,S=!1,V=!1,_=!1,N=[],I=v(Oe,T.interactiveDebounce),R=z++,$=(E=T.plugins).filter((function(e,t){return E.indexOf(e)===t})),B={id:R,reference:e,popper:O(),popperInstance:null,props:T,state:{isEnabled:!0,isVisible:!1,isDestroyed:!1,isMounted:!1,isShown:!1},plugins:$,clearDelayTimeouts:function(){clearTimeout(n),clearTimeout(i),cancelAnimationFrame(o)},setProps:function(t){0;if(B.state.isDestroyed)return;ae("onBeforeUpdate",[B,t]),ge();var n=B.props,r=U(e,Object.assign({},n,y(t),{ignoreAttributes:!0}));B.props=r,he(),n.interactiveDebounce!==r.interactiveDebounce&&(ce(),I=v(Oe,r.interactiveDebounce));n.triggerTarget&&!r.triggerTarget?m(n.triggerTarget).forEach((function(e){e.removeAttribute("aria-expanded")})):r.triggerTarget&&e.removeAttribute("aria-expanded");ue(),oe(),X&&X(n,r);B.popperInstance&&(Ae(),Ce().forEach((function(e){requestAnimationFrame(e._tippy.popperInstance.forceUpdate)})));ae("onAfterUpdate",[B,t])},setContent:function(e){B.setProps({content:e})},show:function(){0;var e=B.state.isVisible,t=B.state.isDestroyed,n=!B.state.isEnabled,r=D.isTouch&&!B.props.touch,i=f(B.props.duration,0,P.duration);if(e||t||n||r)return;if(te().hasAttribute("disabled"))return;if(ae("onShow",[B],!1),!1===B.props.onShow(B))return;B.state.isVisible=!0,ee()&&(q.style.visibility="visible");oe(),le(),B.state.isMounted||(q.style.transition="none");if(ee()){var o=re(),a=o.box,s=o.content;x([a,s],0)}u=function(){var e;if(B.state.isVisible&&!_){if(_=!0,q.offsetHeight,q.style.transition=B.props.moveTransition,ee()&&B.props.animation){var t=re(),n=t.box,r=t.content;x([n,r],i),C([n,r],"visible")}se(),ue(),b(J,B),null==(e=B.popperInstance)||e.forceUpdate(),ae("onMount",[B]),B.props.animation&&ee()&&function(e,t){me(e,t)}(i,(function(){B.state.isShown=!0,ae("onShown",[B])}))}},function(){var e,t=B.props.appendTo,n=te();e=B.props.interactive&&t===p||"parent"===t?n.parentNode:l(t,[n]);e.contains(q)||e.appendChild(q);B.state.isMounted=!0,Ae(),!1}()},hide:function(){0;var e=!B.state.isVisible,t=B.state.isDestroyed,n=!B.state.isEnabled,r=f(B.props.duration,1,P.duration);if(e||t||n)return;if(ae("onHide",[B],!1),!1===B.props.onHide(B))return;B.state.isVisible=!1,B.state.isShown=!1,_=!1,A=!1,ee()&&(q.style.visibility="hidden");if(ce(),ve(),oe(!0),ee()){var i=re(),o=i.box,a=i.content;B.props.animation&&(x([o,a],r),C([o,a],"hidden"))}se(),ue(),B.props.animation?ee()&&function(e,t){me(e,(function(){!B.state.isVisible&&q.parentNode&&q.parentNode.contains(q)&&t()}))}(r,B.unmount):B.unmount()},hideWithInteractivity:function(e){0;ne().addEventListener("mousemove",I),b(Z,I),I(e)},enable:function(){B.state.isEnabled=!0},disable:function(){B.hide(),B.state.isEnabled=!1},unmount:function(){0;B.state.isVisible&&B.hide();if(!B.state.isMounted)return;xe(),Ce().forEach((function(e){e._tippy.unmount()})),q.parentNode&&q.parentNode.removeChild(q);J=J.filter((function(e){return e!==B})),B.state.isMounted=!1,ae("onHidden",[B])},destroy:function(){0;if(B.state.isDestroyed)return;B.clearDelayTimeouts(),B.unmount(),ge(),delete e._tippy,B.state.isDestroyed=!0,ae("onDestroy",[B])}};if(!T.render)return B;var W=T.render(B),q=W.popper,X=W.onUpdate;q.setAttribute("data-tippy-root",""),q.id="tippy-"+B.id,B.popper=q,e._tippy=B,q._tippy=B;var Y=$.map((function(e){return e.fn(B)})),G=e.hasAttribute("aria-expanded");return he(),ue(),oe(),ae("onCreate",[B]),T.showOnCreate&&Le(),q.addEventListener("mouseenter",(function(){B.props.interactive&&B.state.isVisible&&B.clearDelayTimeouts()})),q.addEventListener("mouseleave",(function(){B.props.interactive&&B.props.trigger.indexOf("mouseenter")>=0&&ne().addEventListener("mousemove",I)})),B;function K(){var e=B.props.touch;return Array.isArray(e)?e:[e,0]}function Q(){return"hold"===K()[0]}function ee(){var e;return!(null==(e=B.props.render)||!e.$$tippy)}function te(){return d||e}function ne(){var e=te().parentNode;return e?L(e):document}function re(){return F(q)}function ie(e){return B.state.isMounted&&!B.state.isVisible||D.isTouch||a&&"focus"===a.type?0:f(B.props.delay,e?0:1,P.delay)}function oe(e){void 0===e&&(e=!1),q.style.pointerEvents=B.props.interactive&&!e?"":"none",q.style.zIndex=""+B.props.zIndex}function ae(e,t,n){var r;(void 0===n&&(n=!0),Y.forEach((function(n){n[e]&&n[e].apply(n,t)})),n)&&(r=B.props)[e].apply(r,t)}function se(){var t=B.props.aria;if(t.content){var n="aria-"+t.content,r=q.id;m(B.props.triggerTarget||e).forEach((function(e){var t=e.getAttribute(n);if(B.state.isVisible)e.setAttribute(n,t?t+" "+r:r);else{var i=t&&t.replace(r,"").trim();i?e.setAttribute(n,i):e.removeAttribute(n)}}))}}function ue(){!G&&B.props.aria.expanded&&m(B.props.triggerTarget||e).forEach((function(e){B.props.interactive?e.setAttribute("aria-expanded",B.state.isVisible&&e===te()?"true":"false"):e.removeAttribute("aria-expanded")}))}function ce(){ne().removeEventListener("mousemove",I),Z=Z.filter((function(e){return e!==I}))}function pe(t){if(!D.isTouch||!V&&"mousedown"!==t.type){var n=t.composedPath&&t.composedPath()[0]||t.target;if(!B.props.interactive||!j(q,n)){if(m(B.props.triggerTarget||e).some((function(e){return j(e,n)}))){if(D.isTouch)return;if(B.state.isVisible&&B.props.trigger.indexOf("click")>=0)return}else ae("onClickOutside",[B,t]);!0===B.props.hideOnClick&&(B.clearDelayTimeouts(),B.hide(),S=!0,setTimeout((function(){S=!1})),B.state.isMounted||ve())}}}function fe(){V=!0}function de(){V=!1}function le(){var e=ne();e.addEventListener("mousedown",pe,!0),e.addEventListener("touchend",pe,c),e.addEventListener("touchstart",de,c),e.addEventListener("touchmove",fe,c)}function ve(){var e=ne();e.removeEventListener("mousedown",pe,!0),e.removeEventListener("touchend",pe,c),e.removeEventListener("touchstart",de,c),e.removeEventListener("touchmove",fe,c)}function me(e,t){var n=re().box;function r(e){e.target===n&&(k(n,"remove",r),t())}if(0===e)return t();k(n,"remove",s),k(n,"add",r),s=r}function be(t,n,r){void 0===r&&(r=!1),m(B.props.triggerTarget||e).forEach((function(e){e.addEventListener(t,n,r),N.push({node:e,eventType:t,handler:n,options:r})}))}function he(){var e;Q()&&(be("touchstart",ye,{passive:!0}),be("touchend",Ee,{passive:!0})),(e=B.props.trigger,e.split(/\s+/).filter(Boolean)).forEach((function(e){if("manual"!==e)switch(be(e,ye),e){case"mouseenter":be("mouseleave",Ee);break;case"focus":be(H?"focusout":"blur",we);break;case"focusin":be("focusout",we)}}))}function ge(){N.forEach((function(e){var t=e.node,n=e.eventType,r=e.handler,i=e.options;t.removeEventListener(n,r,i)})),N=[]}function ye(e){var t,n=!1;if(B.state.isEnabled&&!Te(e)&&!S){var r="focus"===(null==(t=a)?void 0:t.type);a=e,d=e.currentTarget,ue(),!B.state.isVisible&&w(e)&&Z.forEach((function(t){return t(e)})),"click"===e.type&&(B.props.trigger.indexOf("mouseenter")<0||A)&&!1!==B.props.hideOnClick&&B.state.isVisible?n=!0:Le(e),"click"===e.type&&(A=!n),n&&!r&&ke(e)}}function Oe(e){var t=e.target,n=te().contains(t)||q.contains(t);if("mousemove"!==e.type||!n){var r=Ce().concat(q).map((function(e){var t,n=null==(t=e._tippy.popperInstance)?void 0:t.state;return n?{popperRect:e.getBoundingClientRect(),popperState:n,props:T}:null})).filter(Boolean);(function(e,t){var n=t.clientX,r=t.clientY;return e.every((function(e){var t=e.popperRect,i=e.popperState,o=e.props.interactiveBorder,a=h(i.placement),s=i.modifiersData.offset;if(!s)return!0;var u="bottom"===a?s.top.y:0,c="top"===a?s.bottom.y:0,p="right"===a?s.left.x:0,f="left"===a?s.right.x:0,d=t.top-r+u>o,l=r-t.bottom-c>o,v=t.left-n+p>o,m=n-t.right-f>o;return d||l||v||m}))})(r,e)&&(ce(),ke(e))}}function Ee(e){Te(e)||B.props.trigger.indexOf("click")>=0&&A||(B.props.interactive?B.hideWithInteractivity(e):ke(e))}function we(e){B.props.trigger.indexOf("focusin")<0&&e.target!==te()||B.props.interactive&&e.relatedTarget&&q.contains(e.relatedTarget)||ke(e)}function Te(e){return!!D.isTouch&&Q()!==e.type.indexOf("touch")>=0}function Ae(){xe();var t=B.props,n=t.popperOptions,i=t.placement,o=t.offset,a=t.getReferenceClientRect,s=t.moveTransition,c=ee()?F(q).arrow:null,p=a?{getBoundingClientRect:a,contextElement:a.contextElement||te()}:e,f={name:"$$tippy",enabled:!0,phase:"beforeWrite",requires:["computeStyles"],fn:function(e){var t=e.state;if(ee()){var n=re().box;["placement","reference-hidden","escaped"].forEach((function(e){"placement"===e?n.setAttribute("data-placement",t.placement):t.attributes.popper["data-popper-"+e]?n.setAttribute("data-"+e,""):n.removeAttribute("data-"+e)})),t.attributes.popper={}}}},d=[{name:"offset",options:{offset:o}},{name:"preventOverflow",options:{padding:{top:2,bottom:2,left:5,right:5}}},{name:"flip",options:{padding:5}},{name:"computeStyles",options:{adaptive:!s}},f];ee()&&c&&d.push({name:"arrow",options:{element:c,padding:3}}),d.push.apply(d,(null==n?void 0:n.modifiers)||[]),B.popperInstance=(0,r.fi)(p,q,Object.assign({},n,{placement:i,onFirstUpdate:u,modifiers:d}))}function xe(){B.popperInstance&&(B.popperInstance.destroy(),B.popperInstance=null)}function Ce(){return g(q.querySelectorAll("[data-tippy-root]"))}function Le(e){B.clearDelayTimeouts(),e&&ae("onTrigger",[B,e]),le();var t=ie(!0),r=K(),i=r[0],o=r[1];D.isTouch&&"hold"===i&&o&&(t=o),t?n=setTimeout((function(){B.show()}),t):B.show()}function ke(e){if(B.clearDelayTimeouts(),ae("onUntrigger",[B,e]),B.state.isVisible){if(!(B.props.trigger.indexOf("mouseenter")>=0&&B.props.trigger.indexOf("click")>=0&&["mouseleave","mousemove"].indexOf(e.type)>=0&&A)){var t=ie(!1);t?i=setTimeout((function(){B.state.isVisible&&B.hide()}),t):o=requestAnimationFrame((function(){B.hide()}))}}else ve()}}function Y(e,t){void 0===t&&(t={});var n=P.plugins.concat(t.plugins||[]);document.addEventListener("touchstart",V,c),window.addEventListener("blur",N);var r=Object.assign({},t,{plugins:n}),i=A(e).reduce((function(e,t){var n=t&&X(t,r);return n&&e.push(n),e}),[]);return E(e)?i[0]:i}Y.defaultProps=P,Y.setDefaultProps=function(e){Object.keys(e).forEach((function(t){P[t]=e[t]}))},Y.currentInput=D;Object.assign({},i.Z,{effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow)}});Y.setDefaultProps({render:q});var G=Y,K=n(72791),Q=n(54164);function ee(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}var te="undefined"!==typeof window&&"undefined"!==typeof document;function ne(e,t){e&&("function"===typeof e&&e(t),{}.hasOwnProperty.call(e,"current")&&(e.current=t))}function re(){return te&&document.createElement("div")}function ie(e,t){if(e===t)return!0;if("object"===typeof e&&null!=e&&"object"===typeof t&&null!=t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n in e){if(!t.hasOwnProperty(n))return!1;if(!ie(e[n],t[n]))return!1}return!0}return!1}function oe(e){var t=[];return e.forEach((function(e){t.find((function(t){return ie(e,t)}))||t.push(e)})),t}function ae(e,t){var n,r;return Object.assign({},t,{popperOptions:Object.assign({},e.popperOptions,t.popperOptions,{modifiers:oe([].concat((null==(n=e.popperOptions)?void 0:n.modifiers)||[],(null==(r=t.popperOptions)?void 0:r.modifiers)||[]))})})}var se=te?K.useLayoutEffect:K.useEffect;function ue(e){var t=(0,K.useRef)();return t.current||(t.current="function"===typeof e?e():e),t.current}function ce(e,t,n){n.split(/\s+/).forEach((function(n){n&&e.classList[t](n)}))}var pe={name:"className",defaultValue:"",fn:function(e){var t=e.popper.firstElementChild,n=function(){var t;return!!(null==(t=e.props.render)?void 0:t.$$tippy)};function r(){e.props.className&&!n()||ce(t,"add",e.props.className)}return{onCreate:r,onBeforeUpdate:function(){n()&&ce(t,"remove",e.props.className)},onAfterUpdate:r}}};function fe(e){return function(t){var n=t.children,r=t.content,i=t.visible,o=t.singleton,a=t.render,s=t.reference,u=t.disabled,c=void 0!==u&&u,p=t.ignoreAttributes,f=void 0===p||p,d=(t.__source,t.__self,ee(t,["children","content","visible","singleton","render","reference","disabled","ignoreAttributes","__source","__self"])),l=void 0!==i,v=void 0!==o,m=(0,K.useState)(!1),b=m[0],h=m[1],g=(0,K.useState)({}),y=g[0],O=g[1],E=(0,K.useState)(),w=E[0],T=E[1],A=ue((function(){return{container:re(),renders:1}})),x=Object.assign({ignoreAttributes:f},d,{content:A.container});l&&(x.trigger="manual",x.hideOnClick=!1),v&&(c=!0);var C=x,L=x.plugins||[];a&&(C=Object.assign({},x,{plugins:v&&null!=o.data?[].concat(L,[{fn:function(){return{onTrigger:function(e,t){var n=o.data.children.find((function(e){return e.instance.reference===t.currentTarget}));e.state.$$activeSingletonInstance=n.instance,T(n.content)}}}}]):L,render:function(){return{popper:A.container}}}));var k=[s].concat(n?[n.type]:[]);return se((function(){var t=s;s&&s.hasOwnProperty("current")&&(t=s.current);var n=e(t||A.ref||re(),Object.assign({},C,{plugins:[pe].concat(x.plugins||[])}));return A.instance=n,c&&n.disable(),i&&n.show(),v&&o.hook({instance:n,content:r,props:C,setSingletonContent:T}),h(!0),function(){n.destroy(),null==o||o.cleanup(n)}}),k),se((function(){var e;if(1!==A.renders){var t=A.instance;t.setProps(ae(t.props,C)),null==(e=t.popperInstance)||e.forceUpdate(),c?t.disable():t.enable(),l&&(i?t.show():t.hide()),v&&o.hook({instance:t,content:r,props:C,setSingletonContent:T})}else A.renders++})),se((function(){var e;if(a){var t=A.instance;t.setProps({popperOptions:Object.assign({},t.props.popperOptions,{modifiers:[].concat(((null==(e=t.props.popperOptions)?void 0:e.modifiers)||[]).filter((function(e){return"$$tippyReact"!==e.name})),[{name:"$$tippyReact",enabled:!0,phase:"beforeWrite",requires:["computeStyles"],fn:function(e){var t,n=e.state,r=null==(t=n.modifiersData)?void 0:t.hide;y.placement===n.placement&&y.referenceHidden===(null==r?void 0:r.isReferenceHidden)&&y.escaped===(null==r?void 0:r.hasPopperEscaped)||O({placement:n.placement,referenceHidden:null==r?void 0:r.isReferenceHidden,escaped:null==r?void 0:r.hasPopperEscaped}),n.attributes.popper={}}}])})})}}),[y.placement,y.referenceHidden,y.escaped].concat(k)),K.createElement(K.Fragment,null,n?(0,K.cloneElement)(n,{ref:function(e){A.ref=e,ne(n.ref,e)}}):null,b&&(0,Q.createPortal)(a?a(function(e){var t={"data-placement":e.placement};return e.referenceHidden&&(t["data-reference-hidden"]=""),e.escaped&&(t["data-escaped"]=""),t}(y),w,A.instance):r,A.container))}}var de=function(e,t){return(0,K.forwardRef)((function(n,r){var i=n.children,o=ee(n,["children"]);return K.createElement(e,Object.assign({},t,o),i?(0,K.cloneElement)(i,{ref:function(e){ne(r,e),ne(i.ref,e)}}):null)}))},le=de(fe(G))}}]);
//# sourceMappingURL=6652.6ea2dec2.chunk.js.map