"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[0],{1393:(n,e,t)=>{t.d(e,{OS:()=>s,Ww:()=>a,b$:()=>l});var r=t(7154),o=t(3401),i=t(7459);const a=async n=>{let{images:e}=n;try{const n=(0,i.gf)();return(await r.A.put("/api/posts/upload",{images:e},{headers:{Authorization:"Bearer ".concat(n)}})).data}catch(a){var t;console.log(a),401===(null===a||void 0===a||null===(t=a.response)||void 0===t?void 0:t.status)&&(o.oR.error("\ud30c\uc77c \uc0ad\uc81c \uc911 \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694"),window.location.reload())}},s=async n=>{let{formData:e}=n;try{const n=(0,i.gf)();return(await r.A.post("/api/posts/upload",e,{headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer ".concat(n)}})).data}catch(a){var t;401===(null===a||void 0===a||null===(t=a.response)||void 0===t?void 0:t.status)&&(o.oR.error("\uc5c5\ub85c\ub4dc\uc911 \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694"),window.location.reload())}},l=async n=>{let{formData:e}=n;try{const n=(0,i.gf)();return(await r.A.post("/api/users/edit/avatar",e,{headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer ".concat(n)}})).data}catch(a){var t;return 401===(null===a||void 0===a||null===(t=a.response)||void 0===t?void 0:t.status)&&(o.oR.error("\uc5c5\ub85c\ub4dc\uc911 \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694"),window.location.reload()),""}}},3026:(n,e,t)=>{t.d(e,{A:()=>l});var r,o=t(7528),i=t(197),a=t(579);const s=i.Ay.div(r||(r=(0,o.A)(["\n  display: flex;\n  flex-direction: ",";\n  justify-content: ",";\n  align-items: ",";\n  flex-wrap: ",";\n  gap: ",";\n  padding: ",";\n  background: ",";\n"])),(n=>{let{$direction:e}=n;return e||"row"}),(n=>{let{$justifyContent:e}=n;return e||"flex-start"}),(n=>{let{$alignItems:e}=n;return e||"stretch"}),(n=>{let{$wrap:e}=n;return e||"nowrap"}),(n=>{let{$gap:e}=n;return e||"0"}),(n=>{let{$padding:e}=n;return e}),(n=>{let{$background:e}=n;return e||"transparent"})),l=n=>{let{children:e,$direction:t,$justifyContent:r,$alignItems:o,$wrap:i,$gap:l,$padding:d,$background:c,style:p}=n;return(0,a.jsx)(s,{$direction:t,$justifyContent:r,$alignItems:o,$wrap:i,$gap:l,$padding:d,$background:c,style:p,children:e})}},5376:(n,e,t)=>{t.d(e,{A:()=>j});var r,o,i,a,s,l,d,c,p=t(7528),u=(t(9686),t(5043)),g=t(2485),x=t(3401),h=t(197),f=t(579);const m=h.Ay.div(r||(r=(0,p.A)(["\n  z-index: 20;\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  .cropper-crop-box,\n  .cropper-view-box {\n    ","\n  }\n\n  .cropper-view-box {\n    ","\n  }\n"])),(n=>{let{profileimg:e}=n;return e&&(0,h.AH)(o||(o=(0,p.A)(["\n        border-radius: 50%;\n      "])))}),(n=>{let{profileimg:e}=n;return e&&(0,h.AH)(i||(i=(0,p.A)(["\n        box-shadow: 0 0 0 1px #39f;\n        outline: 0;\n      "])))})),b=h.Ay.div(a||(a=(0,p.A)(["\n  position: inherit;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  backdrop-filter: blur(8px);\n"]))),v=h.Ay.div(s||(s=(0,p.A)(["\n  z-index: 2;\n  background: #ffffff;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n\n  .title {\n    font-weight: 600;\n    line-height: 26px;\n    padding: 20px 16px;\n    text-align: center;\n    color: black;\n    margin: 0;\n  }\n"]))),y=h.Ay.div(l||(l=(0,p.A)(["\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #ffffff;\n"]))),w=h.Ay.div(d||(d=(0,p.A)(["\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: white;\n"]))),A=h.Ay.div(c||(c=(0,p.A)(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  padding: 20px 16px;\n  background: #ffffff;\n  column-gap: 12px;\n\n  button {\n    width: 100px;\n    height: 40px;\n    border: 1px solid #c3c3c3;\n    border-radius: 4px;\n    background: white;\n  }\n\n  .crop {\n    background: #cf3e58;\n    color: white;\n    border: none;\n  }\n"]))),j=n=>{let{children:e,aspectRatio:t,onCrop:r,profileImg:o=!1}=n;const i=(0,u.useRef)(null),a=(0,u.useRef)(null),[s,l]=(0,u.useState)(null);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("input",{type:"file",ref:i,multiple:!0,style:{display:"none"},onChange:n=>{n.preventDefault();const e=n.target.files;if(!e||0===e.length)return;if(!e[0].type.startsWith("image/"))return void x.oR.warning("\uc774 \ud30c\uc77c\uc740 \uc774\ubbf8\uc9c0\uac00 \uc544\ub2d9\ub2c8\ub2e4.");const t=new FileReader;t.onload=()=>{l(t.result)},t.readAsDataURL(e[0])},onClick:n=>{n.target.value=""}}),(0,f.jsx)("span",{onClick:()=>{i.current&&i.current.click()},children:e}),s&&(0,f.jsxs)(m,{profileimg:!0===o?"true":"",children:[(0,f.jsx)(b,{}),(0,f.jsxs)(v,{children:[(0,f.jsx)("h3",{className:"title",children:"\uc774\ubbf8\uc9c0 \ud3b8\uc9d1\ud558\uae30"}),(0,f.jsx)(y,{children:(0,f.jsx)(w,{children:(0,f.jsx)(g.I,{ref:a,aspectRatio:t&&t,initialAspectRatio:1,src:s,viewMode:1,width:800,height:500,background:!1,responsive:!0,autoCropArea:1,checkOrientation:!1,guides:!0})})}),(0,f.jsxs)(A,{children:[(0,f.jsx)("button",{onClick:()=>l(null),children:"\ucde8\uc18c"}),(0,f.jsx)("button",{className:"crop",onClick:()=>{var n;if("undefined"!==typeof(null===(n=a.current)||void 0===n?void 0:n.cropper)){const n=a.current.cropper.getCroppedCanvas().toDataURL();r(n),l(null)}},children:"\uc801\uc6a9\ud558\uae30"})]})]})]})]})}},3704:(n,e,t)=>{t.d(e,{A:()=>d});var r,o=t(7528),i=t(5043),a=t(197),s=t(579);const l=(0,a.Ay)((n=>{let{tag:e,children:t,...r}=n;return(0,i.createElement)(e,r,t)}))(r||(r=(0,o.A)(["\n  color: rgb(245, 245, 245);\n"]))),d=n=>{let{tag:e="p",children:t,...r}=n;return(0,s.jsx)(l,{tag:e,style:{...r},children:t})}},4348:(n,e,t)=>{t.d(e,{A:()=>r});const r=n=>{const e=atob(n.split(",")[1]),t=n.split(",")[0].split(":")[1].split(";")[0],r=new ArrayBuffer(e.length),o=new Uint8Array(r);for(let a=0;a<e.length;a++)o[a]=e.charCodeAt(a);const i=new Blob([r],{type:t});return new File([i],"uploadImage",{type:t})}},1296:(n,e,t)=>{t.d(e,{A:()=>i});var r=t(1641),o=t(5043);const i=()=>{const[n,e]=(0,o.useState)(!1);return{compressImage:async t=>{if(n)return;e(!0),console.log("\uc6d0\ubcf8 \uc774\ubbf8\uc9c0 \uc0ac\uc774\uc988 : ".concat(t.size/1024/1024," MB"));const o={maxSizeMB:2,maxWidthOrHeight:1920};try{const n=await(0,r.A)(t,o);return console.log("\uc555\ucd95\ub41c \uc774\ubbf8\uc9c0 \uc0ac\uc774\uc988 : ".concat(n.size/1024/1024," MB")),e(!1),n}catch(i){e(!1),console.log(i)}},isLoading:n}}},4241:(n,e,t)=>{t.r(e),t.d(e,{default:()=>nn});var r=t(7528),o=t(5043),i=t(4858),a=t(423),s=t(9698),l=t(3216),d=t(8222),c=t.n(d),p=t(197),u=t(1393),g=t(4348),x=t(5518),h=t(1296),f=t(6773),m=t(3248),b=t(7097),v=t(5818),y=t(1905),w=t(3401);const A=async n=>{const e=await v.A.post("/api/users/edit/profile",n);return"\ub9ac\ud504\ub808\uc2dc \ud1a0\ud070 \ub9cc\ub8cc\ub428"===e.msg&&(w.oR.error("\ub85c\uadf8\uc778 \uae30\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \ub85c\uadf8\uc778 \ud574\uc8fc\uc138\uc694!"),setTimeout((()=>{window.location.reload()}),1200)),e.data},j=()=>{const n=(0,m.jE)();return(0,b.n)({mutationFn:A,mutationKey:["user-edit"],onSuccess:e=>{n.invalidateQueries({queryKey:[y.X.user],refetchType:"all"}),w.oR.success("\ud504\ub85c\ud544\uc774 \uc5c5\ub370\uc774\ud2b8 \ub418\uc5c8\uc2b5\ub2c8\ub2e4.")},onError:n=>{var e;console.log("error:",n),w.oR.error("\ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694"),401===(null===n||void 0===n||null===(e=n.response)||void 0===e?void 0:e.status)&&setTimeout((()=>{window.location.reload()}),500)}})};var k,$,C,z,R,S,I,N,B,D,O,F,T=t(8371),E=t(7357),L=t(3026),M=t(5376),W=t(3704),H=t(579);const U=p.Ay.div(k||(k=(0,r.A)(["\n  padding-top: 1rem;\n  height: 100vh;\n  background-color: black;\n  color: rgb(245, 245, 245);\n\n  .inside {\n    position: absolute;\n    right: 1rem;\n    bottom: 1rem;\n  }\n\n  .edit-icon-img {\n    position: absolute;\n    top: 5px;\n    left: 3rem;\n    filter: drop-shadow(-1px -3px 10px rgb(245, 245, 245));\n  }\n  .edit-icon-close-box {\n    position: relative;\n\n    .edit-icon-close {\n      position: absolute;\n      top: -10px;\n      right: -10px;\n      filter: drop-shadow(-1px -3px 10px rgb(245, 245, 245));\n      font-weight: 600;\n    }\n  }\n"]))),Z=p.Ay.div($||($=(0,r.A)(["\n  max-width: 1024px;\n  padding: 1rem;\n  margin: 0 auto;\n  color: rgb(245, 245, 245);\n"]))),K=p.Ay.div(C||(C=(0,r.A)(["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n  }\n"]))),P=p.Ay.div(z||(z=(0,r.A)(["\n  position: relative;\n  margin: 1rem 0;\n  border-radius: 20px;\n  background-color: rgb(38, 38, 38);\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 1rem;\n"]))),X=p.Ay.div(R||(R=(0,r.A)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: rgb(38, 38, 38);\n  border-radius: 50%;\n  width: 25px;\n  height: 25px;\n  font-size: 14px;\n  transition: all 0.2s ease;\n  cursor: pointer;\n\n  &:hover {\n    background-color: rgb(48, 48, 48);\n  }\n"]))),q=p.Ay.img(S||(S=(0,r.A)(["\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  margin-right: 10px;\n  cursor: pointer;\n"]))),J=p.Ay.form(I||(I=(0,r.A)([""]))),Q=p.Ay.input(N||(N=(0,r.A)(["\n  border: none;\n  outline: 0;\n  padding: 8px;\n  font-size: 15px;\n  transition: all 0.2s ease;\n  border-radius: 8px;\n  box-shadow: ",";\n  background-color: transparent;\n  border: 1px solid rgb(50, 53, 57);\n  color: rgb(245, 245, 245);\n\n  &:focus + .limit-text {\n    opacity: 1;\n  }\n\n  &:focus {\n    opacity: 1;\n    border: 1px solid rgb(248, 249, 249);\n  }\n  &:focus::placeholder {\n    color: rgb(245, 245, 245);\n  }\n"])),(n=>{let{$iserror:e}=n;return e?" 0 0 10px tomato":""})),V=p.Ay.input(B||(B=(0,r.A)(["\n  border: none;\n  outline: 0;\n  padding: 8px;\n  font-size: 15px;\n  transition: all 0.2s ease;\n  box-shadow: ",";\n  background-color: transparent;\n  border-bottom: 1px solid rgb(120 120 120);\n  color: rgb(245, 245, 245);\n\n  &::placeholder {\n    color: rgb(245, 245, 245);\n  }\n\n  &:focus + .limit-text {\n    opacity: 1;\n  }\n\n  &:focus {\n    opacity: 1;\n    border-bottom: 1px solid rgb(248, 249, 249);\n  }\n"])),(n=>{let{$iserror:e}=n;return e?" 0 0 10px tomato":""})),_=p.Ay.textarea(D||(D=(0,r.A)(["\n  border: none;\n  outline: 0;\n  width: 100%;\n  padding: 9.5px 80px 2rem 15px;\n  resize: none;\n  font-size: 15px;\n  border-radius: 12px;\n  box-shadow: ",";\n  border: 1px solid rgb(50, 53, 57);\n  background-color: transparent;\n  color: rgb(245, 245, 245);\n\n  &::placeholder {\n    opacity: 0.5;\n    color: rgb(245, 245, 245);\n  }\n\n  &:focus {\n    opacity: 1;\n    border: 1px solid rgb(248, 249, 249);\n  }\n\n  &:focus::placeholder {\n    opacity: 1;\n  }\n"])),(n=>{let{$iserror:e}=n;return e?" 0 0 10px tomato":""})),G=p.Ay.span(O||(O=(0,r.A)(["\n  opacity: ",";\n  color: ",";\n  font-weight: 400;\n  font-size: 12px;\n"])),(n=>{let{opacity:e}=n;return e}),(n=>{let{$islimit:e}=n;return e?"rgb(237, 73, 86)":"white"})),Y=(0,p.Ay)(T.A)(F||(F=(0,r.A)(["\n  width: inherit;\n  background-color: rgb(0, 149, 246);\n  font-weight: 600;\n  padding: 16px 20px;\n  width: 253px;\n  margin-top: 2rem;\n  margin-left: auto;\n  border-radius: 8px;\n  font-size: 14px;\n  opacity: ",";\n  cursor: ",";\n"])),(n=>n.disabled?"0.5":"1"),(n=>n.disabled?"not-allowed":"pointer")),nn=()=>{var n;const e=(0,l.Zp)(),{user:t}=(0,x.J)(),[r,d]=(0,o.useState)(""),[p,m]=(0,o.useState)(null),[b,v]=(0,o.useState)(),{register:y,handleSubmit:w,watch:A,formState:{errors:k},reset:$}=(0,i.mN)(),C=A("nickname"),z=A("introduction"),R=A("password"),{mutate:S,isPending:I}=j(),{isLoading:N,compressImage:B}=(0,h.A)();return(0,o.useEffect)((()=>{p&&(async()=>{if(!p)return;const n=(0,g.A)(p),e=await B(n);v(e)})()}),[p,c()]),(0,H.jsx)(U,{children:(0,H.jsxs)(Z,{children:[(0,H.jsxs)(L.A,{$alignItems:"center",children:[(0,H.jsx)(a.m6W,{size:30,style:{cursor:"pointer"},onClick:()=>e(-1)}),(0,H.jsx)(W.A,{tag:"h3",padding:"1rem 0",children:"\ud504\ub85c\ud544 \ud3b8\uc9d1"})]}),(0,H.jsxs)(J,{onSubmit:w((async n=>{let e="";if(b){const n=new FormData;n.append("file",b),e=await(0,u.b$)({formData:n})}if(e||C||z||R||null!==n&&void 0!==n&&n.password2){const t={nickname:C,introduction:z,password:R,password2:null===n||void 0===n?void 0:n.password2,avatar:e};await S(t),m(null),v(null),$()}})),children:[(0,H.jsxs)(P,{children:[(0,H.jsxs)(M.A,{profileImg:!0,onCrop:n=>{d(c()()),m(n)},aspectRatio:1,children:[(0,H.jsx)(X,{className:"edit-icon-img",children:(0,H.jsx)(s._rf,{})}),(0,H.jsx)(q,{src:p||(null===t||void 0===t?void 0:t.avatar),alt:""})]}),(0,H.jsx)(V,{autoComplete:"on",...y("nickname",f.yZ),placeholder:null===t||void 0===t?void 0:t.nickname,$iserror:null!==k&&void 0!==k&&k.nickname?"true":""}),(0,H.jsx)(G,{opacity:"0",$islimit:C&&C.length>6?"true":"",className:"limit-text",children:void 0!==C&&0!==C.length&&C.length})]}),(0,H.jsxs)(K,{children:[(0,H.jsxs)("div",{children:[(0,H.jsx)(W.A,{tag:"h4",padding:"1rem 0",children:"\uc18c\uac1c"}),(0,H.jsxs)("div",{className:"relative",children:[(0,H.jsx)(_,{wrap:"hard",autoComplete:"on",...y("introduction",f.uX),placeholder:null!==t&&void 0!==t&&t.introduction?null===t||void 0===t?void 0:t.introduction:"\uc18c\uac1c",$iserror:null!==k&&void 0!==k&&k.introduction||(null===z||void 0===z?void 0:z.length)>150?"true":""}),(0,H.jsx)("div",{className:"inside",children:(0,H.jsxs)(G,{opacity:"1",$islimit:z&&z.length>150?"true":"",className:"limit-text",children:[void 0!==z&&0!==z.length&&z.length?z.length:"0","/ 150"]})})]})]}),(0,H.jsxs)("div",{children:[(0,H.jsx)(W.A,{tag:"h4",padding:"1rem 0",children:"\ube44\ubc00\ubc88\ud638 \ubcc0\uacbd"}),(0,H.jsxs)(L.A,{$direction:"column",$gap:"10px",children:[(0,H.jsx)(Q,{autoComplete:"on",type:"password",placeholder:"\ube44\ubc00\ubc88\ud638",$iserror:null!==k&&void 0!==k&&k.password?"true":"",...y("password",f.Zp)}),(0,H.jsx)(Q,{autoComplete:"on",type:"password",placeholder:"\ube44\ubc00\ubc88\ud638 \ud655\uc778",className:"input-last",$iserror:null!==k&&void 0!==k&&k.password2?"true":"",...y("password2",(0,f.PV)(R))})]})]})]}),0!==Object.values(k).length&&(0,H.jsx)(E.A,{text:null===(n=Object.values(k)[0])||void 0===n?void 0:n.message}),(0,H.jsx)(L.A,{children:(0,H.jsx)(Y,{type:"submit",disabled:!(!N&&0===Object.keys(k).length&&(C||z||R||b)),children:N||I?(0,H.jsx)("img",{src:"/spinner.svg",alt:"loading",className:"spinner"}):"\uc81c\ucd9c"})})]})]})})}}}]);
//# sourceMappingURL=0.44da8d4b.chunk.js.map