"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[734,777],{777:(n,e,o)=>{o.r(e),o.d(e,{default:()=>u});var i,t,s,r=o(7528),a=o(3216),l=o(197),d=o(579);const c=l.Ay.div(i||(i=(0,r.A)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  flex-direction: column;\n  background-color: black;\n  color: rgb(245, 245, 245);\n  white-space: pre-line;\n"]))),x=l.Ay.div(t||(t=(0,r.A)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  .longshadow {\n    font-size: 12rem;\n    color: #131313;\n    color: gray;\n    text-shadow: 4px 4px 0px #131313, 8px 8px 0px #131313, 12px 12px 0px #131313;\n    text-shadow: 4px 4px 0px gray, 8px 8px 0px gray, 12px 12px 0px gray;\n  }\n\n  .o {\n    color: tomato;\n    text-shadow: 4px 4px 0px tomato, 8px 8px 0px tomato, 12px 12px 0px tomato;\n    text-shadow: 4px 4px 0px tomato, 8px 8px 0px tomato, 12px 12px 0px gray;\n  }\n"]))),p=l.Ay.div(s||(s=(0,r.A)(["\n  color: rgb(224, 241, 255);\n  transition: all 0.3s ease;\n  margin-top: 10rem;\n  cursor: pointer;\n  &:hover {\n    color: rgb(179, 219, 255);\n  }\n"]))),u=n=>{let{text:e}=n;const o=(0,a.Zp)();return(0,d.jsx)(c,{children:e?(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(x,{children:e})}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(x,{children:[(0,d.jsxs)("span",{className:"longshadow",children:["4",(0,d.jsx)("span",{className:"o",children:"0"}),"4"]}),(0,d.jsx)("span",{children:"\ud398\uc774\uc9c0\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.."})]}),(0,d.jsx)(p,{onClick:()=>{o(-1)},children:"Go back"})]})})}},1760:(n,e,o)=>{o.r(e),o.d(e,{default:()=>_e});var i=o(7528),t=o(5043),s=o(423),r=o(3216),a=o(197),l=o(5518),d=o(8261),c=o(5818),x=o(8245);const p=n=>{const{data:e,isLoading:o,error:i}=(0,d.I)({queryKey:[x.l.postBookmark,n],queryFn:()=>(async n=>(await c.A.get("/api/posts/bookmark/".concat(n))).data)(n),refetchOnWindowFocus:!1,staleTime:15e3});return{data:e,isLoading:o,error:i}};var u=o(1529),h=o(3401);const m=n=>{const{data:e,isLoading:o,error:i}=(0,d.I)({queryKey:[x.l.postLike,n],queryFn:()=>(async n=>(await c.A.get("/api/posts/like/".concat(n))).data)(n),refetchOnWindowFocus:!1,staleTime:15e3});return(0,t.useEffect)((()=>{i&&h.oR.error("\uac8c\uc2dc\uae00\uc744 \ubd88\ub7ec\uc624\ub294\ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.")}),[i]),{data:e,isLoading:o,error:i}};var g=o(3874),v=o(3026),j=o(777),y=o(7606),k=o(2721),f=o(1462),b=o(5051),w=o(3156),A=o(5394),L=o(5475),C=o(831),N=o(5132),_=o(3248),z=o(7097),F=o(780);const I=async n=>{let{postId:e}=n;const o=await c.A.put("/api/posts/bookmark/".concat(e));return"\ub9ac\ud504\ub808\uc2dc \ud1a0\ud070 \ub9cc\ub8cc\ub428"===o.msg&&(h.oR.error("\ub85c\uadf8\uc778 \uae30\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \ub85c\uadf8\uc778 \ud574\uc8fc\uc138\uc694!"),setTimeout((()=>{window.location.reload()}),1200)),o.data},P=(n,e)=>{const o=(0,_.jE)();return(0,z.n)({mutationFn:I,mutationKey:["post-bookmark"],onSuccess:e=>{o.invalidateQueries({queryKey:[x.l.post,n],refetchType:"all"}),o.invalidateQueries({queryKey:[x.l.postBookmark],refetchType:"all"}),o.invalidateQueries({queryKey:[F.h.myBookmark],refetchType:"all"})},onError:n=>{var e;console.log("error:",n),h.oR.error("\ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694"),401===(null===n||void 0===n||null===(e=n.response)||void 0===e?void 0:e.status)&&setTimeout((()=>{window.location.reload()}),1200)}})};var R=o(9264);const T=async n=>{let{postId:e}=n;const o=await c.A.delete("/api/posts/".concat(e));return"\ub9ac\ud504\ub808\uc2dc \ud1a0\ud070 \ub9cc\ub8cc\ub428"===o.msg&&(h.oR.error("\ub85c\uadf8\uc778 \uae30\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \ub85c\uadf8\uc778 \ud574\uc8fc\uc138\uc694!"),setTimeout((()=>{window.location.reload()}),1200)),o.data},K=()=>{const n=(0,r.Zp)(),e=(0,_.jE)();return(0,z.n)({mutationFn:T,mutationKey:["post-delete"],onSuccess:o=>{e.invalidateQueries({queryKey:[x.Z.posts],refetchType:"all"}),n(-1)},onError:n=>{var e;console.log("error:",n),h.oR.error("\ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694"),401===(null===n||void 0===n||null===(e=n.response)||void 0===e?void 0:e.status)&&setTimeout((()=>{window.location.reload()}),1200)}})};var E,S=o(8371),$=o(579);const q=(0,a.Ay)(S.A)(E||(E=(0,i.A)(["\n  font-weight: 700;\n  background-color: rgb(38, 38, 38);\n  width: 250px;\n  min-height: 48px;\n  padding: 4px 8px;\n  border-bottom: 1px solid rgb(54, 54, 54);\n  transition: all 0.3s ease;\n\n  &:hover {\n    background-color: rgb(29, 29, 29);\n  }\n"]))),{Kakao:B}=window,W=n=>{let{post:e}=n;return(0,t.useEffect)((()=>{window.Kakao&&(window.Kakao.cleanup(),window.Kakao.init("34f0b2dd3ad0dec989eefe63a1463149"))}),[]),(0,$.jsx)(q,{type:"button",onClick:()=>{(()=>{var n,o;e&&B.Share.sendCustom({templateId:107624,templateArgs:{post_id:"post/".concat(null===e||void 0===e?void 0:e._id),avatar:"".concat(null===e||void 0===e||null===(n=e.author)||void 0===n?void 0:n.avatar),nickname:"".concat(null===e||void 0===e||null===(o=e.author)||void 0===o?void 0:o.nickname),postImg:"".concat(null===e||void 0===e?void 0:e.images[0]),contents:"".concat(null!==e&&void 0!==e&&e.contents?null===e||void 0===e?void 0:e.contents.replace(/<[^>]*>?/gm,""):"#\uacf5\ucc28 #\ud558\uc774!"),like:"".concat(null===e||void 0===e?void 0:e.postLikeCount),commentCount:"".concat(null===e||void 0===e?void 0:e.postCommentCount)}})})()},children:"\uacf5\uc720\ud558\uae30"})};var Z,Q,D,U,H,J=o(9945);const M=(0,a.i7)(Z||(Z=(0,i.A)(["\n  0% {\n    opacity: 0;\n    scale: 0;\n  }\n  50% {\n    opacity: 1;\n    scale: 1.1;\n  }\n  100%{\n    scale: 1;\n  }\n"]))),G=a.Ay.div(Q||(Q=(0,i.A)(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  min-height: 100vh;\n  color: #fff;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 30;\n  overflow: hidden;\n"]))),O=a.Ay.div(D||(D=(0,i.A)(["\n  display: flex;\n  flex-direction: column;\n  animation: "," 0.3s ease-in-out;\n"])),M),V=(0,a.Ay)(S.A)(U||(U=(0,i.A)(["\n  font-weight: 700;\n  background-color: rgb(38, 38, 38);\n  width: 250px;\n  min-height: 48px;\n  padding: 4px 8px;\n  border-bottom: 1px solid rgb(54, 54, 54);\n  transition: all 0.3s ease;\n  border-bottom-left-radius: ",";\n  border-bottom-right-radius: ",";\n  color: ",";\n\n  &:first-child {\n    border-top-left-radius: 12px;\n    border-top-right-radius: 12px;\n  }\n\n  &:hover {\n    background-color: rgb(29, 29, 29);\n  }\n"])),(n=>{let{$last:e}=n;return e?"12px":"0px"}),(n=>{let{$last:e}=n;return e?"12px":"0px"}),(n=>{let{$danger:e}=n;return e?"rgb(237, 73, 86)":"#fff"})),Y=(0,a.Ay)(L.N_)(H||(H=(0,i.A)(["\n  background-color: rgb(38, 38, 38);\n  border-bottom-left-radius: 0px;\n  border-bottom-right-radius: 0px;\n"]))),X=n=>{var e;let{text:o,text2:i,post:s,handleConfirm:r,handleCancel:a}=n;const[d,c]=(0,t.useState)(!1),{user:x}=(0,l.J)(),{mutate:p}=K(),u=(0,t.useCallback)((()=>{s&&(p({postId:s._id}),c(!1),a())}),[s]);return(0,$.jsxs)($.Fragment,{children:[d&&(0,$.jsx)(J.A,{text:"\uc815\ub9d0 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c? (\uc608)",handleConfirm:()=>{u()},handleCancel:()=>c(!1)}),(0,$.jsx)(G,{children:(0,$.jsxs)(O,{children:[(null===x||void 0===x?void 0:x._id)===(null===s||void 0===s||null===(e=s.author)||void 0===e?void 0:e._id)&&x&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(V,{type:"button",onClick:()=>c(!0),$danger:"true",children:o}),(0,$.jsx)(Y,{to:"/post/edit/".concat(null===s||void 0===s?void 0:s._id),children:(0,$.jsx)(V,{type:"button",children:i})})]}),(0,$.jsx)(W,{post:s}),(0,$.jsx)(V,{type:"button",onClick:a,$last:"true",children:"\ucde8\uc18c"})]})})]})};var nn=o(1207);const en=async n=>{let{postId:e}=n;const o=await c.A.put("/api/posts/like/".concat(e));return"\ub9ac\ud504\ub808\uc2dc \ud1a0\ud070 \ub9cc\ub8cc\ub428"===o.msg&&(h.oR.error("\ub85c\uadf8\uc778 \uae30\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \ub85c\uadf8\uc778 \ud574\uc8fc\uc138\uc694!"),setTimeout((()=>{window.location.reload()}),1200)),o.data},on=(n,e)=>{const o=(0,_.jE)();return(0,z.n)({mutationFn:en,mutationKey:["post-like"],onSuccess:e=>{o.invalidateQueries({queryKey:[x.l.post,n],refetchType:"all"}),o.invalidateQueries({queryKey:[x.l.postLike],refetchType:"all"})},onError:n=>{var e;console.log("error:",n),h.oR.error("\ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694"),401===(null===n||void 0===n||null===(e=n.response)||void 0===e?void 0:e.status)&&setTimeout((()=>{window.location.reload()}),1200)}})};var tn,sn,rn,an,ln=o(2620),dn=o(50),cn=o(4975);o(4014),o(1493),o(5084),o(9604);const xn=a.Ay.div(tn||(tn=(0,i.A)(["\n  position: relative;\n"]))),pn=a.Ay.div(sn||(sn=(0,i.A)(["\n  aspect-ratio: auto 3/4;\n  background-color: black;\n"]))),un=a.Ay.img(rn||(rn=(0,i.A)(["\n  width: 100%;\n  height: 100%;\n"]))),hn=a.Ay.div(an||(an=(0,i.A)(["\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  padding: 0 12px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 20;\n\n  button {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 16px 8px;\n    width: 30px;\n    height: 30px;\n    background-color: #beb3b3;\n    background-color: rgb(245, 245, 245);\n    border-radius: 50%;\n  }\n\n  @media (max-width: 500px) {\n    display: none;\n  }\n"]))),mn=n=>{let{images:e}=n;const[o,i]=(0,t.useState)();return(0,$.jsxs)(xn,{children:[(0,$.jsxs)(hn,{children:[(0,$.jsx)("button",{onClick:()=>{o&&o.slidePrev()},className:"prev-btn",children:(0,$.jsx)(ln.xrT,{})}),(0,$.jsx)("button",{onClick:()=>{o&&o.slideNext()},className:"next-btn",children:(0,$.jsx)(ln.Xor,{})})]}),(0,$.jsx)(cn.RC,{spaceBetween:0,slidesPerView:1,modules:[dn.Vx,dn.dK,dn.Ze,dn.Jq],pagination:{clickable:!0},onSwiper:n=>i(n),children:null===e||void 0===e?void 0:e.map(((n,e)=>(0,$.jsx)(cn.qr,{children:(0,$.jsx)(pn,{children:(0,$.jsx)(un,{src:n,alt:"img"})})},e)))})]})};var gn,vn;const jn=a.Ay.div(gn||(gn=(0,i.A)(["\n  aspect-ratio: auto 3/4;\n  background-color: black;\n  max-height: 100%;\n  margin: 0 auto;\n"]))),yn=a.Ay.img(vn||(vn=(0,i.A)(["\n  width: 100%;\n  height: 100%;\n"]))),kn=n=>{let{url:e,postLoading:o}=n;return(0,$.jsx)(jn,{children:o?"":1===(null===e||void 0===e?void 0:e.length)?(0,$.jsx)(yn,{src:e[0],alt:"post-img"}):(0,$.jsx)(mn,{images:e})})};var fn,bn=o(446),wn=o(6058),An=o(686);const Ln=(0,a.Ay)(bn.P.div)(fn||(fn=(0,i.A)(["\n  cursor: pointer;\n"]))),Cn=n=>{let{handlePostLike:e,isPostLike:o}=n;return(0,$.jsx)(Ln,{onClick:e,whileTap:{scale:.9},transition:{duration:.2},children:o?(0,$.jsx)(wn.DR4,{style:{fontSize:24}}):(0,$.jsx)(An.MUx,{style:{fontSize:24}})})};var Nn,_n,zn,Fn,In,Pn,Rn,Tn;const Kn=a.Ay.div(Nn||(Nn=(0,i.A)(["\n  min-width: 335px;\n  width: 100%;\n  background-color: black;\n"]))),En=a.Ay.div(_n||(_n=(0,i.A)(["\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 1rem;\n  padding-top: 3.5rem;\n\n  .user-nickname {\n    font-size: 14px;\n    line-height: 18px;\n    font-weight: 600;\n  }\n\n  .user-image {\n    width: 32px;\n    height: 32px;\n    border-radius: 50%;\n    object-fit: cover;\n    flex-shrink: 0;\n    margin-right: 10px;\n  }\n"]))),Sn=a.Ay.ul(zn||(zn=(0,i.A)(["\n  height: calc(100% - 200px);\n  margin: 0;\n  overflow-y: scroll;\n  padding: 16px;\n  scrollbar-width: none;\n  background-color: black;\n\n  @media (max-width: 768px) {\n    height: 150px;\n    padding-top: 0;\n    overflow-y: initial;\n  }\n"]))),$n=a.Ay.li(Fn||(Fn=(0,i.A)(["\n  display: flex;\n  align-items: start;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n"]))),qn=a.Ay.div(In||(In=(0,i.A)(["\n  width: 100%;\n  max-width: 335px;\n  font-size: 14px;\n  line-height: 18px;\n  gap: 5px;\n\n  @media (max-width: 768px) {\n    max-width: 100%;\n    font-size: 12px;\n  }\n"]))),Bn=a.Ay.section(Pn||(Pn=(0,i.A)(["\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 23px;\n  color: rgb(245, 245, 245);\n  width: 100%;\n  padding: 0.2rem 0;\n  .bookmark {\n    margin-left: auto;\n  }\n\n  .section-icons {\n    cursor: pointer;\n  }\n"]))),Wn=a.Ay.div(Rn||(Rn=(0,i.A)(["\n  color: rgb(168, 168, 168);\n  font-size: 12px;\n"]))),Zn=a.Ay.div(Tn||(Tn=(0,i.A)(["\n  cursor: pointer;\n  margin-left: auto;\n"]))),Qn=n=>{var e,o,i;let{user:s,post:r,commentListResponse:a,commentListLoading:l,postLoading:d,isPostLike:c,isBookmark:x}=n;const[p,u]=(0,t.useState)(!1),m=(0,C.lZ)(N.iz),{mutate:g}=on(null===r||void 0===r?void 0:r._id,s),{mutate:j}=P(null===r||void 0===r?void 0:r._id,s);return(0,$.jsxs)($.Fragment,{children:[p&&(0,$.jsx)(X,{text:"\uc0ad\uc81c\ud558\uae30",text2:"\uc218\uc815\ud558\uae30",post:r,handleCancel:()=>u(!1)}),(0,$.jsxs)(Kn,{children:[(0,$.jsx)(nn.A,{text:"\uac8c\uc2dc\ubb3c"}),(0,$.jsx)(En,{children:d?(0,$.jsx)(R.A,{}):(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)("img",{className:"user-image",src:null===r||void 0===r||null===(e=r.author)||void 0===e?void 0:e.avatar,alt:"userImage"}),(0,$.jsx)("div",{className:"user-nickname",children:null===r||void 0===r||null===(o=r.author)||void 0===o?void 0:o.nickname}),(0,$.jsx)(Zn,{onClick:()=>u(!0),children:(0,$.jsx)(f.Ym0,{})})]})}),(0,$.jsx)(kn,{url:null===r||void 0===r?void 0:r.images,postLoading:d}),(0,$.jsxs)(Sn,{children:[(0,$.jsxs)($n,{children:[(0,$.jsxs)(Bn,{children:[(0,$.jsx)(Cn,{handlePostLike:()=>{s?g({postId:null===r||void 0===r?void 0:r._id}):h.oR.warning("\ub85c\uadf8\uc778\uc774 \ud544\uc694\ud55c \uc11c\ube44\uc2a4\uc785\ub2c8\ub2e4.")},isPostLike:c}),(0,$.jsx)(L.N_,{to:"/".concat(null===r||void 0===r?void 0:r._id,"/commentList"),onClick:()=>m(!0),children:(0,$.jsx)("div",{className:"section-icons",children:(0,$.jsx)(A.NWn,{})})}),(0,$.jsx)("div",{className:"bookmark section-icons",onClick:()=>{s?j({postId:null===r||void 0===r?void 0:r._id}):h.oR.warning("\ub85c\uadf8\uc778\uc774 \ud544\uc694\ud55c \uc11c\ube44\uc2a4\uc785\ub2c8\ub2e4.")},children:x?(0,$.jsx)(w.U$b,{}):(0,$.jsx)(b.NaU,{})})]}),(0,$.jsxs)(qn,{children:[(0,$.jsxs)("b",{children:["\uc88b\uc544\uc694"," ",new Intl.NumberFormat("ko-KR").format((null===r||void 0===r?void 0:r.postLikeCount)||0),"\uac1c"]}),(0,$.jsx)("br",{}),(0,$.jsx)(v.A,{children:(0,$.jsxs)("span",{children:[(0,$.jsxs)("b",{children:[null===r||void 0===r||null===(i=r.author)||void 0===i?void 0:i.nickname," "]}),(0,$.jsx)("span",{dangerouslySetInnerHTML:{__html:(null===r||void 0===r?void 0:r.contents)||""}})]})})]})]}),(0,$.jsx)(L.N_,{to:"/".concat(null===r||void 0===r?void 0:r._id,"/commentList"),children:(0,$.jsxs)(Wn,{children:["\ub313\uae00 ",null===a||void 0===a?void 0:a.pages[0].totalCount,"\uac1c \ubaa8\ub450 \ubcf4\uae30"]})}),(0,$.jsxs)(Wn,{children:[r&&(0,y.B)(new Date,new Date(r.date),{locale:k.ko}),"\uc804"]})]})]})]})};var Dn,Un,Hn,Jn,Mn,Gn,On,Vn,Yn,Xn,ne,ee=o(9698),oe=o(2668),ie=o(4707),te=o(3704);const se=a.Ay.div(Dn||(Dn=(0,i.A)(["\n  min-width: 335px;\n  background-color: black;\n"]))),re=a.Ay.div(Un||(Un=(0,i.A)(["\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 1rem;\n  border-bottom: 1px solid rgb(38, 38, 38);\n\n  .user-nickname {\n    font-size: 14px;\n    line-height: 18px;\n    font-weight: 600;\n  }\n\n  .user-image {\n    width: 35px;\n    height: 35px;\n    border-radius: 50%;\n    object-fit: cover;\n    flex-shrink: 0;\n    margin-right: 10px;\n  }\n"]))),ae=a.Ay.ul(Hn||(Hn=(0,i.A)(["\n  height: calc(100% - 200px);\n  margin: 0;\n  overflow-y: scroll;\n  padding: 16px;\n  scrollbar-width: none;\n"]))),le=a.Ay.li(Jn||(Jn=(0,i.A)(["\n  display: flex;\n  align-items: start;\n"]))),de=a.Ay.img(Mn||(Mn=(0,i.A)(["\n  width: 35px;\n  height: 35px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  margin-right: 10px;\n"]))),ce=a.Ay.div(Gn||(Gn=(0,i.A)(["\n  display: flex;\n  width: 100%;\n  max-width: 335px;\n  font-size: 14px;\n  line-height: 18px;\n  gap: 5px;\n"]))),xe=a.Ay.div(On||(On=(0,i.A)(["\n  width: 100%;\n  border-top: 1px solid rgb(38, 38, 38);\n  padding-top: 6px;\n  span {\n    cursor: pointer;\n    padding-top: 6px;\n    font-size: 14px;\n    color: rgb(245, 245, 245);\n    line-height: 18px;\n    font-weight: 600;\n  }\n"]))),pe=a.Ay.section(Vn||(Vn=(0,i.A)(["\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 23px;\n  color: rgb(245, 245, 245);\n\n  .bookmark {\n    margin-left: auto;\n  }\n\n  .section-icons {\n    cursor: pointer;\n  }\n"]))),ue=a.Ay.div(Yn||(Yn=(0,i.A)(["\n  padding: 0 16px;\n"]))),he=a.Ay.div(Xn||(Xn=(0,i.A)(["\n  cursor: pointer;\n  margin-left: auto;\n"]))),me=a.Ay.div(ne||(ne=(0,i.A)(["\n  color: rgb(168, 168, 168);\n  font-size: 12px;\n"]))),ge=Array(12).fill(0),ve=n=>{var e,o,i,s,r;let{user:a,post:l,commentListResponse:d,commentListLoading:c,postLoading:x,fetchNext:p,hasNextPage:u,isFetchingNextPage:m,isPostLike:g,isBookmark:j}=n;const[L,_]=(0,t.useState)(!1),z=(0,C.lZ)(N.iz),{mutate:F}=on(null===l||void 0===l?void 0:l._id,a),{mutate:I}=P(null===l||void 0===l?void 0:l._id,a);return(0,$.jsxs)($.Fragment,{children:[L&&(0,$.jsx)(X,{text:"\uc0ad\uc81c\ud558\uae30",text2:"\uc218\uc815\ud558\uae30",post:l,handleCancel:()=>_(!1)}),(0,$.jsx)(kn,{postLoading:x,url:null===l||void 0===l?void 0:l.images}),(0,$.jsxs)(se,{children:[x?(0,$.jsx)(R.A,{}):(0,$.jsxs)(re,{children:[(0,$.jsx)(de,{src:null===l||void 0===l||null===(e=l.author)||void 0===e?void 0:e.avatar,alt:"userImage"}),(0,$.jsx)("div",{className:"user-nickname",children:null===l||void 0===l||null===(o=l.author)||void 0===o?void 0:o.nickname}),(0,$.jsx)(he,{onClick:()=>_(!0),children:(0,$.jsx)(f.Ym0,{})})]}),(0,$.jsxs)(ae,{children:[x?(0,$.jsx)(R.A,{}):(0,$.jsxs)(le,{children:[(0,$.jsx)(de,{src:null===l||void 0===l||null===(i=l.author)||void 0===i?void 0:i.avatar,alt:"userImage"}),(0,$.jsx)(ce,{children:(0,$.jsxs)("span",{children:[(0,$.jsxs)("b",{children:[null===l||void 0===l||null===(s=l.author)||void 0===s?void 0:s.nickname," "]}),(0,$.jsx)("span",{dangerouslySetInnerHTML:{__html:(null===l||void 0===l?void 0:l.contents)||""}})]})})]}),(0,$.jsx)(v.A,{$direction:"column",style:{height:"100%"},children:c?(0,$.jsx)($.Fragment,{children:ge.map(((n,e)=>(0,$.jsx)("div",{children:(0,$.jsx)(R.A,{})},e)))}):(0,$.jsxs)($.Fragment,{children:[null===d||void 0===d||null===(r=d.pages)||void 0===r?void 0:r.map(((n,e)=>{var o;return 0!==(null===n||void 0===n||null===(o=n.commentList)||void 0===o?void 0:o.length)?n.commentList.map((n=>(0,$.jsx)(ie.A,{postId:null===l||void 0===l?void 0:l._id,comment:n},n._id))):(0,$.jsxs)(v.A,{style:{height:"100%"},$justifyContent:"center",$alignItems:"center",$direction:"column",children:[(0,$.jsx)(te.A,{tag:"h3",children:"\uc544\uc9c1 \ub313\uae00\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}),(0,$.jsx)(te.A,{tag:"h5",children:"\ub313\uae00\uc744 \ub0a8\uaca8\ubcf4\uc138\uc694."})]},e)})),m?(0,$.jsx)("img",{src:"/spinner.svg",alt:"loading",className:"spinner"}):(0,$.jsx)($.Fragment,{children:u&&(0,$.jsx)("div",{onClick:()=>p(),children:(0,$.jsx)(v.A,{$justifyContent:"center",$alignItems:"center",style:{minHeight:"40px",fontSize:"20px",marginTop:"10px",cursor:"pointer"},children:(0,$.jsx)(ee.GZN,{})})})})]})})]}),(0,$.jsxs)(xe,{children:[(0,$.jsxs)(ue,{children:[(0,$.jsxs)(pe,{children:[(0,$.jsx)(Cn,{handlePostLike:()=>{a?F({postId:null===l||void 0===l?void 0:l._id}):h.oR.warning("\ub85c\uadf8\uc778\uc774 \ud544\uc694\ud55c \uc11c\ube44\uc2a4\uc785\ub2c8\ub2e4.")},isPostLike:g}),(0,$.jsx)("div",{className:"section-icons",onClick:()=>z(!0),children:(0,$.jsx)(A.NWn,{})}),(0,$.jsx)("div",{className:"bookmark section-icons",onClick:()=>{a?I({postId:null===l||void 0===l?void 0:l._id}):h.oR.warning("\ub85c\uadf8\uc778\uc774 \ud544\uc694\ud55c \uc11c\ube44\uc2a4\uc785\ub2c8\ub2e4.")},children:j?(0,$.jsx)(w.U$b,{}):(0,$.jsx)(b.NaU,{})})]}),(0,$.jsxs)("span",{children:["\uc88b\uc544\uc694"," ",new Intl.NumberFormat("ko-KR").format((null===l||void 0===l?void 0:l.postLikeCount)||0),"\uac1c"]})," ",(0,$.jsx)("br",{}),(0,$.jsxs)(me,{children:[l&&(0,y.B)(new Date,new Date(l.date),{locale:k.A}),"\uc804"]})]}),(0,$.jsx)(oe.A,{post:l})]})]})]})};var je,ye,ke,fe,be;const we=(0,a.i7)(je||(je=(0,i.A)(["\n  0% {\n    opacity: 0;\n    scale: 0;\n  }\n  50% {\n    opacity: 1;\n    scale: 1.1;\n  }\n  100%{\n    scale: 1;\n  }\n  "]))),Ae=a.Ay.div(ye||(ye=(0,i.A)(["\n  width: 100%;\n  height: 100vh;\n  background-color: black;\n"]))),Le=a.Ay.div(ke||(ke=(0,i.A)(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  min-height: 100vh;\n  color: #fff;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 20;\n  overflow: hidden;\n  animation: "," 0.3s ease-in-out;\n\n  @media (max-width: 768px) {\n    align-items: start;\n    overflow-y: scroll;\n  }\n"])),we),Ce=a.Ay.div(fe||(fe=(0,i.A)(["\n  max-width: calc(100% - 64px - 64px);\n  max-height: calc(100vh - 150px);\n  height: ",";\n  transition: all 0.3s ease;\n  border: 1px solid rgb(38, 38, 38);\n\n  @media (max-width: 768px) {\n    max-width: initial;\n    max-height: initial;\n    width: 100%;\n    height: 100%;\n    border: none;\n  }\n"])),(n=>{let{$boxheight:e}=n;return"".concat(e,"px")})),Ne=a.Ay.div(be||(be=(0,i.A)(["\n  position: absolute;\n  right: 30px;\n  font-size: 2rem;\n  color: #fff;\n  cursor: pointer;\n  @media (max-width: 768px) {\n    display: none;\n  }\n"]))),_e=()=>{const n=(0,r.g)(),e=(0,r.Zp)(),o=(0,r.zy)(),[i,a]=(0,t.useState)(window.innerWidth<=768),[d,c]=(0,t.useState)(window.innerWidth/1.5),{user:x}=(0,l.J)(),{data:h,isLoading:y,error:k}=(0,u.A)(n.id),{data:f}=m(n.id),{data:b}=p(n.id),{data:w,isLoading:A,fetchNextPage:L,hasNextPage:C,isFetchingNextPage:N}=(0,g.A)(n.id),_=(0,t.useRef)(null),z=(0,t.useCallback)((async()=>{const n=await L();n.isError&&console.log(n.error)}),[L]),F=()=>{"default"===o.key?e("/posts"):e(-1)};return(0,t.useEffect)((()=>{document.body.style.overflow="hidden";const n=n=>{27===n.keyCode&&F()},e=n=>{_.current&&!_.current.contains(n.target)&&F()},o=()=>{window.innerWidth<=768?a(!0):(c(window.innerWidth/1.875),a(!1))};return window.addEventListener("resize",o),document.addEventListener("mousedown",e),document.addEventListener("keydown",n),()=>{document.body.style.overflow="",document.removeEventListener("mousedown",e),document.removeEventListener("keydown",n),window.removeEventListener("resize",o)}}),[]),k?(0,$.jsx)(j.default,{}):(0,$.jsx)(Ae,{children:(0,$.jsx)(Le,{children:(0,$.jsx)(Ce,{$boxheight:d,ref:_,children:(0,$.jsxs)(v.A,{$justifyContent:"center",style:{height:"100%"},children:[(0,$.jsx)(Ne,{onClick:()=>{F()},children:(0,$.jsx)(s.WQq,{})}),i?(0,$.jsx)(Qn,{post:h,commentListResponse:w,commentListLoading:A,postLoading:y,user:x,isPostLike:f,isBookmark:b}):(0,$.jsx)(ve,{post:h,user:x,commentListResponse:w,commentListLoading:A,postLoading:y,fetchNext:z,hasNextPage:C,isFetchingNextPage:N,isPostLike:f,isBookmark:b})]})})})})}},780:(n,e,o)=>{o.d(e,{h:()=>i});const i={myPosts:"myPosts",myBookmark:"myBookmark"}}}]);
//# sourceMappingURL=734.274faf9a.chunk.js.map