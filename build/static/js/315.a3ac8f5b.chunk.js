"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[315],{3026:(n,e,t)=>{t.d(e,{A:()=>l});var i,r=t(7528),o=t(197),s=t(579);const a=o.Ay.div(i||(i=(0,r.A)(["\n  display: flex;\n  flex-direction: ",";\n  justify-content: ",";\n  align-items: ",";\n  flex-wrap: ",";\n  gap: ",";\n  padding: ",";\n  background: ",";\n"])),(n=>{let{$direction:e}=n;return e||"row"}),(n=>{let{$justifyContent:e}=n;return e||"flex-start"}),(n=>{let{$alignItems:e}=n;return e||"stretch"}),(n=>{let{$wrap:e}=n;return e||"nowrap"}),(n=>{let{$gap:e}=n;return e||"0"}),(n=>{let{$padding:e}=n;return e}),(n=>{let{$background:e}=n;return e||"transparent"})),l=n=>{let{children:e,$direction:t,$justifyContent:i,$alignItems:r,$wrap:o,$gap:l,$padding:d,$background:c,style:u}=n;return(0,s.jsx)(a,{$direction:t,$justifyContent:i,$alignItems:r,$wrap:o,$gap:l,$padding:d,$background:c,style:u,children:e})}},6022:(n,e,t)=>{t.d(e,{A:()=>c});var i,r,o=t(7528),s=t(197),a=t(579);const l=(0,s.i7)(i||(i=(0,o.A)(["\n  0% {\n    background-position:100% 0%;\n  }\n  100% {\n    background-position:0% 0%;\n  }\n  "]))),d=s.Ay.div(r||(r=(0,o.A)(["\n  height: ",";\n  width: ",";\n  border-radius: ",";\n  margin: ",";\n  background: linear-gradient(90deg, #1e1e1e 35%, #0a0a0a 50%, #151515 65%);\n  /* background-size: 200px 100%; */\n  background-size: 300% auto;\n  animation: "," 2s infinite linear;\n"])),(n=>{let{height:e}=n;return e}),(n=>{let{width:e}=n;return e}),(n=>{let{$borderradius:e}=n;return e}),(n=>{let{$margin:e}=n;return e}),l),c=n=>{let{width:e,height:t,$borderradius:i,$margin:r}=n;return(0,a.jsx)("div",{children:(0,a.jsx)(d,{width:e,height:t,$borderradius:i,$margin:r})})}},3704:(n,e,t)=>{t.d(e,{A:()=>d});var i,r=t(7528),o=t(5043),s=t(197),a=t(579);const l=(0,s.Ay)((n=>{let{tag:e,children:t,...i}=n;return(0,o.createElement)(e,i,t)}))(i||(i=(0,r.A)(["\n  color: rgb(245, 245, 245);\n"]))),d=n=>{let{tag:e="p",children:t,...i}=n;return(0,a.jsx)(l,{tag:e,style:{...i},children:t})}},940:(n,e,t)=>{t.d(e,{A:()=>r});var i=t(5043);const r=function(n,e){let{threshold:t=.1,root:r=null,rootMargin:o="0%"}=e;const[s,a]=(0,i.useState)(),l=n=>{let[e]=n;a(e)};return(0,i.useEffect)((()=>{const e=null===n||void 0===n?void 0:n.current,i=!!window.IntersectionObserver;if(!e||!i)return;const s=new IntersectionObserver(l,{threshold:t,root:r,rootMargin:o});return s.observe(e),()=>s.disconnect()}),[null===n||void 0===n?void 0:n.current,r,o,JSON.stringify(t)]),s}},4315:(n,e,t)=>{t.r(e),t.d(e,{default:()=>vn});var i=t(7528),r=t(5518),o=t(5043),s=t(5051),a=t(423),l=t(5475),d=t(3216),c=t(197),u=t(8371),g=t(6022),h=t(5394),p=t(940);const x=n=>n>=1e4?new Intl.NumberFormat("ko-KR").format(n/1e4)+"\ub9cc":n>=1e3?new Intl.NumberFormat("ko-KR").format(n/1e3)+"\ucc9c":n;var v=t(5714),m=t(5818),f=t(780);const y=()=>{const{fetchNextPage:n,isFetching:e,isFetchingNextPage:t,hasNextPage:i,isLoading:r,data:o,error:s}=(0,v.q)({queryKey:[f.h.myBookmark],queryFn:n=>{let{pageParam:e=1}=n;return(async n=>(await new Promise((n=>setTimeout(n,1e3))),(await m.A.get("/api/myPage/bookmarks/?page=".concat(n))).data))(e)},initialPageParam:1,getNextPageParam:n=>{var e;return(null===n||void 0===n||null===(e=n.posts)||void 0===e?void 0:e.length)>0&&(null===n||void 0===n?void 0:n.page)!==(null===n||void 0===n?void 0:n.totalPage)?n.page+1:void 0}});return{fetchNextPage:n,isFetching:e,isFetchingNextPage:t,hasNextPage:i,isLoading:r,data:o,error:s}};var b,j,A,w,P,k=t(3026),N=t(3704),$=t(579);const F=c.Ay.div(b||(b=(0,i.A)(["\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 4px;\n"]))),z=c.Ay.div(j||(j=(0,i.A)(["\n  position: relative;\n  &:hover .hover-box {\n    opacity: 1;\n  }\n"]))),C=c.Ay.div(A||(A=(0,i.A)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 16px;\n  font-weight: bold;\n  z-index: 10;\n  background-color: rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity 0.3s;\n\n  .icons {\n    font-size: 30px;\n    margin-right: 2px;\n    @media (max-width: 768px) {\n      font-size: 20px;\n    }\n  }\n\n  .chat-icon {\n    font-size: 25px;\n    transform: scaleX(-1);\n    @media (max-width: 768px) {\n      font-size: 20px;\n    }\n  }\n\n  span {\n    @media (max-width: 768px) {\n      font-size: 12px;\n    }\n  }\n"]))),L=c.Ay.img(w||(w=(0,i.A)(["\n  width: 100%;\n  height: 100%;\n  aspect-ratio: 1;\n  cursor: pointer;\n"]))),M=c.Ay.div(P||(P=(0,i.A)(["\n  width: 100%;\n  max-width: 935px;\n  position: absolute;\n  bottom: 10px;\n  display: flex;\n  justify-content: center;\n"]))),R=Array(10).fill(0),E=()=>{var n,e,t;const[i,r]=(0,o.useState)(!1),a=(0,o.useRef)(null),d=(0,p.A)(a,{}),c=!(null===d||void 0===d||!d.isIntersecting),{data:u,isLoading:v,isFetching:m,fetchNextPage:f,hasNextPage:b,isFetchingNextPage:j}=y(),A=(0,o.useCallback)((async()=>{const n=await f();n.isError&&console.log(n.error)}),[f]);return(0,o.useEffect)((()=>{let n;return c&&b&&(n=setTimeout((()=>{A()}),500)),()=>{clearTimeout(n)}}),[A,c,b]),v||0!==(null===u||void 0===u||null===(n=u.pages[0])||void 0===n||null===(e=n.posts)||void 0===e?void 0:e.length)?(0,$.jsxs)(F,{children:[v?R.map(((n,e)=>(0,$.jsx)(g.A,{width:"100%",height:"350px"},e))):(0,$.jsx)($.Fragment,{children:null===u||void 0===u||null===(t=u.pages)||void 0===t?void 0:t.map((n=>{var e;return null===n||void 0===n||null===(e=n.posts)||void 0===e?void 0:e.map((n=>{var e,t,o,a;return(0,$.jsx)(l.N_,{to:"/post/".concat(null===n||void 0===n||null===(e=n.post)||void 0===e?void 0:e._id),children:(0,$.jsxs)(z,{onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),children:[(0,$.jsx)(L,{src:null===n||void 0===n||null===(t=n.post)||void 0===t?void 0:t.images[0],alt:"post-img"}),i&&(0,$.jsx)(C,{className:"hover-box",children:(0,$.jsxs)(k.A,{style:{width:"100%",height:"100%"},$alignItems:"center",$justifyContent:"center",$gap:"4px",children:[(0,$.jsx)(s.n0G,{className:"icons"})," ",(0,$.jsx)("span",{children:x((null===n||void 0===n||null===(o=n.post)||void 0===o?void 0:o.postLikeCount)||0)}),(0,$.jsx)(h.NWn,{className:"icons chat-icon"}),(0,$.jsx)("span",{children:x((null===n||void 0===n||null===(a=n.post)||void 0===a?void 0:a.postCommentCount)||0)})]})})]})},n._id)}))}))}),(m||j)&&(0,$.jsx)(M,{children:(0,$.jsx)("img",{src:"/spinner.svg",alt:"loading",className:"spinner"})}),(0,$.jsx)("div",{ref:a,style:{height:"40px",width:"100%",marginBottom:"40px"}})]}):(0,$.jsx)(N.A,{tag:"p",paddingTop:"5rem",textAlign:"center",children:"\uc544\uc9c1 \uc800\uc7a5\ub41c \uac8c\uc2dc\ubb3c\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."})};var I=t(3401);const T=()=>{const{fetchNextPage:n,isFetching:e,isFetchingNextPage:t,hasNextPage:i,isLoading:r,data:s,error:a}=(0,v.q)({queryKey:[f.h.myPosts],queryFn:n=>{let{pageParam:e=1}=n;return(async n=>(await new Promise((n=>setTimeout(n,1e3))),(await m.A.get("/api/myPage/?page=".concat(n))).data))(e)},initialPageParam:1,getNextPageParam:n=>{var e;return(null===n||void 0===n||null===(e=n.posts)||void 0===e?void 0:e.length)>0&&n.page!==n.totalPage?n.page+1:void 0}});return(0,o.useEffect)((()=>{a&&I.oR.error("\uac8c\uc2dc\uae00\uc744 \ubd88\ub7ec\uc624\ub294\ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.")}),[a]),{fetchNextPage:n,isFetching:e,isFetchingNextPage:t,hasNextPage:i,isLoading:r,data:s,error:a}};var _,q,O,S,B;const K=c.Ay.div(_||(_=(0,i.A)(["\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 4px;\n"]))),W=c.Ay.div(q||(q=(0,i.A)(["\n  position: relative;\n  &:hover .hover-box {\n    opacity: 1;\n  }\n"]))),X=c.Ay.div(O||(O=(0,i.A)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 16px;\n  font-weight: bold;\n  z-index: 10;\n  background-color: rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity 0.3s;\n\n  .icons {\n    font-size: 30px;\n    margin-right: 2px;\n    @media (max-width: 768px) {\n      font-size: 20px;\n    }\n  }\n\n  .chat-icon {\n    font-size: 25px;\n    transform: scaleX(-1);\n    @media (max-width: 768px) {\n      font-size: 20px;\n    }\n  }\n\n  span {\n    @media (max-width: 768px) {\n      font-size: 12px;\n    }\n  }\n"]))),G=c.Ay.img(S||(S=(0,i.A)(["\n  width: 100%;\n  height: 100%;\n  aspect-ratio: 1;\n  cursor: pointer;\n"]))),J=c.Ay.div(B||(B=(0,i.A)(["\n  width: 100%;\n  max-width: 935px;\n  position: absolute;\n  bottom: 10px;\n  display: flex;\n  justify-content: center;\n"]))),Q=Array(10).fill(0),U=()=>{var n,e,t;const[i,r]=(0,o.useState)(!1),[a,d]=(0,o.useState)(""),c=(0,o.useRef)(null),u=(0,p.A)(c,{}),v=!(null===u||void 0===u||!u.isIntersecting),{data:m,isLoading:f,isFetching:y,fetchNextPage:b,hasNextPage:j,isFetchingNextPage:A}=T(),w=(0,o.useCallback)((async()=>{const n=await b();n.isError&&console.log(n.error)}),[b]);return(0,o.useEffect)((()=>{let n;return v&&j&&(n=setTimeout((()=>{w()}),500)),()=>{clearTimeout(n)}}),[w,v,j]),!f&&m&&0===(null===m||void 0===m||null===(n=m.pages[0])||void 0===n||null===(e=n.posts)||void 0===e?void 0:e.length)?(0,$.jsx)(N.A,{tag:"p",paddingTop:"5rem",textAlign:"center",children:"\uc544\uc9c1 \uc791\uc131\ud55c \uac8c\uc2dc\ubb3c\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}):(0,$.jsxs)(K,{children:[f?Q.map(((n,e)=>(0,$.jsx)(g.A,{width:"100%",height:"350px"},e))):(0,$.jsx)($.Fragment,{children:null===m||void 0===m||null===(t=m.pages)||void 0===t?void 0:t.map((n=>{var e;return null===n||void 0===n||null===(e=n.posts)||void 0===e?void 0:e.map((n=>{var e;return(0,$.jsx)(l.N_,{to:"/post/".concat(null===n||void 0===n?void 0:n._id),children:(0,$.jsxs)(W,{onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),children:[(0,$.jsx)(G,{src:null===n||void 0===n||null===(e=n.images)||void 0===e?void 0:e[0],alt:"post-img"}),i&&(0,$.jsx)(X,{className:"hover-box",children:(0,$.jsxs)(k.A,{style:{width:"100%",height:"100%"},$alignItems:"center",$justifyContent:"center",$gap:"4px",children:[(0,$.jsx)(s.n0G,{className:"icons"})," ",(0,$.jsx)("span",{children:x((null===n||void 0===n?void 0:n.postLikeCount)||0)}),(0,$.jsx)(h.NWn,{className:"icons chat-icon"}),(0,$.jsx)("span",{children:x((null===n||void 0===n?void 0:n.postCommentCount)||0)})]})})]})},n._id)}))}))}),(y||A)&&(0,$.jsx)(J,{children:(0,$.jsx)("img",{src:"/spinner.svg",alt:"loading",className:"spinner"})}),(0,$.jsx)("div",{ref:c,style:{height:"40px",width:"100%",marginBottom:"40px"}})]})};var Z,D,H,V,Y,nn,en,tn,rn,on;const sn=c.Ay.div(Z||(Z=(0,i.A)(["\n  min-height: 100vh;\n  background: black;\n  overflow: hidden;\n  color: rgb(245, 245, 245);\n  padding: 2rem 0;\n  @media (max-width: 768px) {\n    padding-top: 5rem;\n  }\n"]))),an=c.Ay.div(D||(D=(0,i.A)(["\n  position: relative;\n  max-width: 935px;\n  margin: 0 auto;\n"]))),ln=c.Ay.div(H||(H=(0,i.A)(["\n  position: absolute;\n  top: 2rem;\n  left: 1rem;\n  font-size: 30px;\n  transition: transform 0.3s ease-in-out;\n  cursor: pointer;\n\n  &:hover {\n    transform: scale(1.2);\n  }\n\n  @media (max-width: 768px) {\n    top: -4rem;\n  }\n"]))),dn=c.Ay.div(V||(V=(0,i.A)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]))),cn=c.Ay.img(Y||(Y=(0,i.A)(["\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  margin-right: 10px;\n  cursor: pointer;\n"]))),un=c.Ay.h2(nn||(nn=(0,i.A)(["\n  font-weight: bold;\n"]))),gn=c.Ay.div(en||(en=(0,i.A)(["\n  max-width: 500px;\n  text-align: left;\n  margin: 0.5rem 0rem 1rem 4px;\n  font-size: 14px;\n  white-space: pre;\n\n  button {\n    color: rgb(245, 245, 245);\n    font-weight: bold;\n  }\n"]))),hn=(0,c.Ay)(u.A)(tn||(tn=(0,i.A)(["\n  width: inherit;\n  padding: 12px 16px;\n  background-color: rgb(54, 54, 54);\n  border-radius: 12px;\n  font-size: 14px;\n\n  &:hover {\n    background-color: rgb(35, 35, 35);\n  }\n"]))),pn=c.Ay.ul(rn||(rn=(0,i.A)(["\n  position: relative;\n  margin-top: 2rem;\n  border-top: 1px solid rgb(38, 38, 38);\n  display: flex;\n  justify-content: space-around;\n  font-weight: 600;\n"]))),xn=c.Ay.li(on||(on=(0,i.A)(["\n  gap: 5px;\n  font-size: 14px;\n  border-top: ",";\n  color: ",";\n  cursor: pointer;\n  height: 52px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: all 0.3s ease;\n\n  &:hover {\n    color: rgb(245, 245, 245);\n  }\n"])),(n=>{let{$clicked:e}=n;return e?" 1px solid rgb(245, 245, 245)":""}),(n=>{let{$clicked:e}=n;return e?"rgb(245, 245, 245)":"rgb(168, 168, 168)"})),vn=()=>{const n=(0,o.useRef)(null),e=(0,o.useRef)(null),[t,i]=(0,o.useState)(!1),[c,u]=(0,o.useState)(0),[h,p]=(0,l.ok)(),x=(0,d.Zp)(),v=h.get("currentTab")||"\uac8c\uc2dc\ubb3c",{user:m,isLoading:f}=(0,r.J)(),y=(n,e)=>{const t=n.currentTarget.offsetLeft;u(t),p({currentTab:e})},b=(0,o.useCallback)((()=>{n.current&&e.current&&("\uac8c\uc2dc\ubb3c"===v?u(n.current.offsetLeft):"\ubd81\ub9c8\ud06c"===v&&u(e.current.offsetLeft))}),[n,e,v]);return(0,o.useEffect)((()=>(n.current&&e.current&&("\uac8c\uc2dc\ubb3c"===v?u(n.current.offsetLeft):"\ubd81\ub9c8\ud06c"===v&&u(e.current.offsetLeft)),window.addEventListener("resize",b),()=>window.removeEventListener("resize",b))),[n,e,v,c,b]),(0,$.jsx)(sn,{children:(0,$.jsxs)(an,{children:[(0,$.jsx)(ln,{onClick:()=>x("/"),children:(0,$.jsx)(a.m6W,{})}),(0,$.jsx)(dn,{children:f?(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(g.A,{width:"120px",height:"120px",$borderradius:"50%"}),(0,$.jsx)(g.A,{width:"80px",height:"20px",$margin:"10px 0 10px 0 "})]}):(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(cn,{src:null===m||void 0===m?void 0:m.avatar,alt:""}),(0,$.jsx)(un,{children:null===m||void 0===m?void 0:m.nickname}),(0,$.jsx)(gn,{children:t||(null===m||void 0===m?void 0:m.introduction)&&(m.introduction.length<=100?m.introduction:(0,$.jsxs)($.Fragment,{children:[m.introduction.slice(0,100),"...",(0,$.jsx)("button",{onClick:()=>i(!0),children:"\ub354\ubcf4\uae30"})]}))}),(0,$.jsx)(l.N_,{to:"/myPage/edit/".concat(null===m||void 0===m?void 0:m._id),children:(0,$.jsx)(hn,{type:"button",children:"\ud504\ub85c\ud544 \uc218\uc815"})})]})}),(0,$.jsxs)(pn,{children:[(0,$.jsxs)(xn,{ref:n,onClick:n=>y(n,"\uac8c\uc2dc\ubb3c"),$clicked:v&&"\uac8c\uc2dc\ubb3c"===v?"true":"",children:[(0,$.jsx)(s.gXn,{}),"\uac8c\uc2dc\ubb3c"]}),(0,$.jsxs)(xn,{ref:e,onClick:n=>y(n,"\ubd81\ub9c8\ud06c"),$clicked:v&&"\ubd81\ub9c8\ud06c"===v?"true":"",children:[(0,$.jsx)(s.NaU,{})," \ubd81\ub9c8\ud06c"]})]}),"\uac8c\uc2dc\ubb3c"===v&&(0,$.jsx)(U,{}),"\ubd81\ub9c8\ud06c"===v&&(0,$.jsx)(E,{})]})})}},780:(n,e,t)=>{t.d(e,{h:()=>i});const i={myPosts:"myPosts",myBookmark:"myBookmark"}},5714:(n,e,t)=>{t.d(e,{q:()=>a});var i=t(888),r=t(28),o=class extends i.${constructor(n,e){super(n,e)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(n,e){super.setOptions({...n,behavior:(0,r.PL)()},e)}getOptimisticResult(n){return n.behavior=(0,r.PL)(),super.getOptimisticResult(n)}fetchNextPage(n){return this.fetch({...n,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(n){return this.fetch({...n,meta:{fetchMore:{direction:"backward"}}})}createResult(n,e){var t,i;const{state:o}=n,s=super.createResult(n,e),{isFetching:a,isRefetching:l}=s,d=a&&"forward"===(null===(t=o.fetchMeta)||void 0===t||null===(t=t.fetchMore)||void 0===t?void 0:t.direction),c=a&&"backward"===(null===(i=o.fetchMeta)||void 0===i||null===(i=i.fetchMore)||void 0===i?void 0:i.direction);return{...s,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:(0,r.rB)(e,o.data),hasPreviousPage:(0,r.RQ)(e,o.data),isFetchingNextPage:d,isFetchingPreviousPage:c,isRefetching:l&&!d&&!c}}},s=t(226);function a(n,e){return(0,s.t)(n,o,e)}}}]);
//# sourceMappingURL=315.a3ac8f5b.chunk.js.map