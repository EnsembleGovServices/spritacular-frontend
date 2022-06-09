"use strict";(self.webpackChunkspritacular_frontend=self.webpackChunkspritacular_frontend||[]).push([[2199,2678],{92678:function(e,n,t){t.r(n),t.d(n,{default:function(){return v}});var a=t(1413),i=t(42982),r=t(70885),o=t(7551),s=t(60536),c=t.n(s),d=t(74551),l=t(17834),u=t(72791),f=t(43504),m=t(80184),v=function(e){var n=e.data,t=e.setData,s=e.editorData,v=e.setLoading,h=e.setReadMode,p=e.readMode,g=e.readOnly,x=(0,l.Z)().auth,j=(0,f.lr)(),b="edit"!==(0,r.Z)(j,1)[0].get("mode"),y=(0,u.useState)([]),Z=(0,r.Z)(y,2),N=Z[0],k=Z[1],w=(0,u.useState)(!1),C=(0,r.Z)(w,2),_=C[0],M=C[1],R=(0,u.useState)([]),F=(0,r.Z)(R,2),S=F[0],D=F[1];var B={toolbar:{items:["undo","redo","fontsize","fontColor","fontBackgroundColor","|","heading","|","alignment","|","bold","italic","|","link","|","bulletedList","numberedList","insertTable","mergeTableCells","|","insertImage","codeBlock","|","code","HorizontalLine","SpecialCharacters","ImageResize","pageBreak"],shouldNotGroupWhenFull:!1},removePlugins:["Title"],extraPlugins:[function(e){e.plugins.get("FileRepository").createUploadAdapter=function(e){return function(e){return M(!1),{upload:function(){return new Promise((function(n,t){var a=new FormData;v(!0),e.file.then((function(e){var r;a.append("image",e),(new Headers).append("Authorization","Bearer ".concat(null===x||void 0===x||null===(r=x.token)||void 0===r?void 0:r.access)),fetch("".concat(d.v2.blog_image_upload),{method:"post",body:a}).then((function(e){return e.json()})).then((function(e){v(!1),n({default:e.url}),k((function(n){return[].concat((0,i.Z)(n),[{id:e.image_id,url:e.url}])}))})).catch((function(e){t(e)}))}))}))}}}(e)}}]};return(0,u.useEffect)((function(){t&&t((function(e){return(0,a.Z)((0,a.Z)({},e),{},{image_ids:N})}))}),[N,S]),(0,u.useEffect)((function(){if(_&&N){var e,n=null===s||void 0===s||null===(e=s.image_ids)||void 0===e?void 0:e.filter((function(e){return S.includes(e.url)})).map((function(e){return e}));k(n)}}),[S,_]),(0,u.useEffect)((function(){h&&h(b)}),[b]),(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(o.CKEditor,{editor:c(),config:B,data:n||"",then:function(e){console.log(e)},onReady:function(e){var n=e.ui.view.stickyPanel;e.isReadOnly=p||g,e.isReadOnly&&(e.ui.view.top.remove(n),e.ui.view.editable.element.classList.add("p-0"),e.ui.view.editable.element.classList.add("border-0"))},onChange:function(e,n){M(!1);var i=n.getData();n.model.document.on("change:data",(function(){M(!0)}));var r=Array.from((new DOMParser).parseFromString(n.getData(),"text/html").querySelectorAll("img")).map((function(e){return e.getAttribute("src")}));D(r),t&&t((function(e){return(0,a.Z)((0,a.Z)({},e),{},{content:i})}))},onFocus:function(e,n){},onBlur:function(e,n){}})})}},27338:function(e,n,t){var a=t(7788),i=t(43504),r=t(74551),o=t(62711),s=t(92678),c=t(80184);n.Z=function(e){var n=e.slug,t=e.content,d=e.setReadMode,l=e.readMode,u=e.type;return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("div",{className:"blog_page position-relative",children:[(0,c.jsx)("div",{className:"common-banner"}),(0,c.jsx)("section",{className:"blog-main",children:(0,c.jsxs)(a.W2,{children:[(0,c.jsx)("div",{className:"position-relative",children:(0,c.jsxs)("div",{className:"",children:[(0,c.jsxs)(i.rU,{to:"/"+r.X0.dashboard+"/"+u,className:"d-flex align-items-center justify-content-start mb-3",children:[(0,c.jsx)(o.JO,{icon:"ep:back"}),(0,c.jsxs)("span",{className:"ms-2",children:["Back to ",u]})]}),(0,c.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,c.jsx)("h2",{className:"mb-0",children:null===t||void 0===t?void 0:t.title}),(0,c.jsx)(i.rU,{to:t?"/".concat(r.X0.dashboard,"/").concat(u,"/").concat(n,"/edit"):"",className:"btn btn-primary px-4 btn-sm",children:"Edit"})]})]})}),(0,c.jsx)("div",{className:"mt-5",children:(0,c.jsx)("div",{className:"row",children:(0,c.jsx)(a.JX,{sm:12,children:(0,c.jsx)("div",{className:"card",children:(0,c.jsxs)("div",{className:"card-body p-4 py-md-5 px-md-5",children:[(0,c.jsx)("span",{className:"text-light-dark",children:"Description"}),(0,c.jsx)("p",{className:"card-text",children:null===t||void 0===t?void 0:t.description}),(0,c.jsx)("div",{children:(0,c.jsx)(s.default,{data:null===t||void 0===t?void 0:t.content,setReadMode:d,readMode:l})})]})})})})})]})})]})})}},12199:function(e,n,t){t.r(n);var a=t(74165),i=t(15861),r=t(70885),o=(t(44453),t(72791)),s=t(16871),c=t(94677),d=t(74551),l=t(27338),u=t(80184);n.default=function(){var e=(0,s.UO)().slug,n=(0,s.s0)(),t=(0,o.useState)(),f=(0,r.Z)(t,2),m=f[0],v=f[1],h=(0,o.useState)(!1),p=(0,r.Z)(h,2),g=p[0],x=p[1],j=function(){var t=(0,i.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.Z.get("".concat(d.v2.get_single_blog).concat(e,"/"),{headers:{"Content-Type":"application/json"}}).then((function(e){var n;v(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.data)})).catch((function(e){var t;200!==(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.statusCode)&&n("/404",{replace:!0})}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return(0,o.useEffect)((function(){j().then((function(e){return e}))}),[]),(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(l.Z,{setReadMode:x,readMode:g,content:m,slug:e,type:"tutorial"})})}},44453:function(){}}]);
//# sourceMappingURL=2199.e094c384.chunk.js.map