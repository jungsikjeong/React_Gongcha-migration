"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[526],{5132:(n,e,t)=>{t.d(e,{VO:()=>a,iz:()=>r,wW:()=>o});var i=t(831);const r=(0,i.eU)({key:"commentFormStatus",default:!1}),o=(0,i.eU)({key:"replyCommentStatus",default:!1}),a=(0,i.eU)({key:"replyCommentUserStatus",default:{userId:"",commentId:"",nickName:""}})},2668:(n,e,t)=>{t.d(e,{A:()=>_});var i=t(7528),r=t(5518),o=t(5043),a=t(831),l=t(197),s=t(5132),d=t(3248),c=t(7097),m=t(5818),u=t(9724),p=t(8245),g=t(3401);const h=async n=>{let{contents:e,postId:t}=n;const i=await m.A.post("/api/comment",{contents:e,postId:t});return"\ub9ac\ud504\ub808\uc2dc \ud1a0\ud070 \ub9cc\ub8cc\ub428"===i.msg&&(g.oR.error("\ub85c\uadf8\uc778 \uae30\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \ub85c\uadf8\uc778 \ud574\uc8fc\uc138\uc694!"),setTimeout((()=>{window.location.reload()}),1200)),i.data},x=()=>{const n=(0,d.jE)();return(0,c.n)({mutationFn:h,mutationKey:["commentKey"],onSuccess:e=>{n.invalidateQueries({queryKey:[u.T.comment],refetchType:"all"}),n.invalidateQueries({queryKey:[p.l.post],refetchType:"all"})},onError:n=>{var e;console.log("error:",n),g.oR.error("\ub313\uae00 \uc791\uc131 \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694"),401===(null===n||void 0===n||null===(e=n.response)||void 0===e?void 0:e.status)&&setTimeout((()=>{window.location.reload()}),1200)}})},v=async n=>{let{contents:e,postId:t,commentId:i}=n;const r=await m.A.post("/api/reply/comment/".concat(i),{contents:e,postId:t});return"\ub9ac\ud504\ub808\uc2dc \ud1a0\ud070 \ub9cc\ub8cc\ub428"===r.msg&&(g.oR.error("\ub85c\uadf8\uc778 \uae30\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \ub85c\uadf8\uc778 \ud574\uc8fc\uc138\uc694!"),setTimeout((()=>{window.location.reload()}),1200)),r.data},y=()=>{const n=(0,d.jE)();return(0,c.n)({mutationFn:v,mutationKey:["comment-reply-post"],onSuccess:e=>{n.invalidateQueries({queryKey:[u.T.commentReply],refetchType:"all"}),n.refetchQueries({queryKey:[u.T.comment]})},onError:n=>{var e;console.log("error:",n),g.oR.error("\ub313\uae00 \uc791\uc131 \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694"),401===(null===n||void 0===n||null===(e=n.response)||void 0===e?void 0:e.status)&&setTimeout((()=>{window.location.reload()}),1200)}})};var j,A,f,b,k,w=t(3026),C=t(579);const I=l.Ay.div(j||(j=(0,i.A)(["\n  margin-top: 1.5rem;\n  border-top: 1px solid rgb(38, 38, 38);\n  padding: 0px 16px;\n\n  @media (max-width: 768px) {\n    padding: 0;\n  }\n"]))),$=l.Ay.form(A||(A=(0,i.A)(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n  max-height: 50px;\n  padding: 0.875rem 0.1rem;\n\n  .spinner {\n    width: 25px;\n    height: 25px;\n  }\n  @media (max-width: 768px) {\n    padding: 0 1rem;\n    padding-top: 0.875rem;\n  }\n"]))),P=l.Ay.textarea(f||(f=(0,i.A)(["\n  width: 100%;\n  height: 100%;\n  resize: none;\n  background-color: transparent;\n  outline: none;\n  border: none;\n  color: rgb(245, 245, 245);\n  margin-top: ",";\n\n  &::placeholder {\n    color: rgb(168, 168, 168);\n    font-weight: 600;\n  }\n"])),(n=>{let{$iscontents:e}=n;return e?"0px":"20px"})),R=l.Ay.button(b||(b=(0,i.A)(["\n  visibility: ",";\n  opacity: ",";\n  transition: all 0.1s ease;\n  flex-shrink: 0;\n  font-size: 14px;\n  color: rgb(0, 149, 246);\n  font-weight: 600;\n  padding-right: 0.5rem;\n"])),(n=>{let{value:e}=n;return e?"visible":"hidden"}),(n=>{let{value:e}=n;return e?"1":"0"})),F=l.Ay.img(k||(k=(0,i.A)(["\n  width: 35px;\n  height: 35px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  margin-right: 10px;\n"]))),_=n=>{let{post:e}=n;const{user:t}=(0,r.J)(),[i,l]=(0,o.useState)(""),{mutate:d,isPending:c}=x(),{mutate:m,isPending:u}=y(),[p,g]=(0,a.L4)(s.wW),[h,v]=(0,a.L4)(s.VO),[j,A]=(0,a.L4)(s.iz),f=(0,o.useRef)(null),b=(0,o.useCallback)((async()=>{if(null!==e&&void 0!==e&&e._id)if(h.commentId){const n=i.replace("@".concat(h.nickName),"");m({contents:n,postId:e._id,commentId:h.commentId}),v({userId:"",commentId:"",nickName:""}),l("")}else d({contents:i,postId:e._id}),l("")}),[null===e||void 0===e?void 0:e._id,h,i]);return(0,o.useEffect)((()=>{p&&f.current?(f.current.focus(),l("@".concat(h.nickName," "))):j&&f.current&&f.current.focus()}),[p,j]),(0,o.useEffect)((()=>{const n=n=>{f.current&&!f.current.contains(n.target)&&(g(!1),A(!1))};return document.addEventListener("mousedown",n),()=>{document.removeEventListener("mousedown",n)}}),[f,g,b]),(0,C.jsx)(I,{children:t?(0,C.jsxs)($,{onSubmit:async n=>{n.preventDefault(),await b()},children:[(0,C.jsx)(F,{src:null===t||void 0===t?void 0:t.avatar,alt:""}),c||u?(0,C.jsx)(w.A,{$justifyContent:"center",style:{width:"100%"},children:(0,C.jsx)("img",{src:"/spinner.svg",alt:"spinner",className:"spinner",style:{zIndex:"999"}})}):(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(P,{placeholder:"".concat(null===t||void 0===t?void 0:t.nickname,"\ub2d8\uc73c\ub85c \ub313\uae00 \ub2ec\uae30..."),onChange:n=>l(n.target.value),onKeyDown:async n=>{"Enter"===n.key&&(n.preventDefault(),await b())},value:i,ref:f,$iscontents:i?"true":""}),(0,C.jsx)(R,{value:0!==(null===i||void 0===i?void 0:i.length)?"true":"",children:"\uac8c\uc2dc"})]})]}):""})}},4707:(n,e,t)=>{t.d(e,{A:()=>Cn});var i=t(7528),r=t(5132),o=t(5518),a=t(5043),l=t(6058),s=t(686),d=t(3216),c=t(831),m=t(3248),u=t(7097),p=t(5818),g=t(9724),h=t(8245),x=t(3401);const v=async n=>{let{commentId:e,postId:t}=n;return(await p.A.delete("/api/comment/".concat(e,"?postId=").concat(t))).data},y=n=>{const e=(0,m.jE)();return(0,u.n)({mutationFn:v,mutationKey:["comment-delete"],onSuccess:t=>{e.invalidateQueries({queryKey:[g.T.comment,n],refetchType:"all"}),e.invalidateQueries({queryKey:[h.l.post],refetchType:"all"})},onError:n=>{console.log("error:",n),x.oR.error("\ub313\uae00 \uc0ad\uc81c\uc911 \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694")}})},j=async n=>{let{commentId:e,postId:t}=n;return(await p.A.put("/api/comment/like/".concat(e,"?postId=").concat(t))).data},A=n=>{const e=(0,m.jE)();return(0,u.n)({mutationFn:j,mutationKey:["comment-like"],onSuccess:t=>{e.invalidateQueries({queryKey:[g.T.comment,n],refetchType:"all"})},onError:n=>{console.log("error:",n),x.oR.error("\uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694")}})};var f=t(197),b=t(3026),k=t(9945),w=t(5714);const C=n=>{const{fetchNextPage:e,isFetching:t,isFetchingNextPage:i,hasNextPage:r,isLoading:o,data:l,error:s}=(0,w.q)({queryKey:[g.T.commentReply,n],queryFn:e=>{let{pageParam:t=1}=e;return(async(n,e)=>{const t=await p.A.get("/api/reply/comment/".concat(n,"?page=").concat(e),{params:{limit:3,page:e}});return new Promise((n=>{setTimeout((()=>{n(t.data)}),500)}))})(n,t)},initialPageParam:1,getNextPageParam:n=>{var e;return(null===(e=n.commentReply)||void 0===e?void 0:e.length)>0&&n.page!==n.totalPage?n.page+1:void 0},refetchOnWindowFocus:!1,staleTime:1/0,select:n=>({pages:[...n.pages].reverse(),pageParams:[...n.pageParams].reverse()})});return(0,a.useEffect)((()=>{s&&(console.log(s),x.oR.error("\ub300\ub313\uae00\uc744 \ubd88\ub7ec\uc624\ub294\ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4."))}),[s]),{fetchNextPage:e,isFetching:t,isFetchingNextPage:i,hasNextPage:r,isLoading:o,data:l,error:s}},I=async n=>{let{commentReplyId:e,parentCommentId:t}=n;return(await p.A.delete("/api/reply/".concat(e,"?parentCommentId=").concat(t))).data},$=n=>{const e=(0,m.jE)();return(0,u.n)({mutationFn:I,mutationKey:["comment-reply-delete"],onSuccess:t=>{e.invalidateQueries({queryKey:[g.T.commentReply,n],refetchType:"all"}),e.refetchQueries({queryKey:[g.T.comment]})},onError:n=>{var e,t,i,r;(console.log("error:",n),null!==n&&void 0!==n&&null!==(e=n.response)&&void 0!==e&&null!==(t=e.data)&&void 0!==t&&t.msg)?x.oR.error(null===n||void 0===n||null===(i=n.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.msg):x.oR.error("\ub313\uae00 \uc0ad\uc81c\uc911 \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694")}})},P=async n=>{let{commentReplyId:e,parentCommentId:t,postId:i}=n;return(await p.A.put("/api/reply/like/".concat(e,"?parentCommentId=").concat(t),{postId:i})).data},R=n=>{const e=(0,m.jE)();return(0,u.n)({mutationFn:P,mutationKey:["comment-reply-like"],onSuccess:t=>{e.invalidateQueries({queryKey:[g.T.commentReply,n],refetchType:"all"})},onError:n=>{console.log("error:",n),x.oR.error("\uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694")}})};var F,_,N,T,z,K,E,q,L=t(579);const S=f.Ay.li(F||(F=(0,i.A)(["\n  margin-top: 1rem;\n  margin-right: -2px;\n  width: 100%;\n  height: 100%;\n  max-width: ",";\n  font-size: 14px;\n  line-height: 18px;\n  color: rgb(245, 245, 245);\n"])),(n=>{let{$ispathname:e}=n;return e?"500px":"335px"})),Q=f.Ay.div(_||(_=(0,i.A)([""]))),U=f.Ay.img(N||(N=(0,i.A)(["\n  width: 35px;\n  height: 35px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  margin-right: 10px;\n"]))),O=f.Ay.span(T||(T=(0,i.A)(["\n  font-weight: bold;\n  margin-right: 4px;\n  flex-shrink: 0;\n"]))),W=f.Ay.span(z||(z=(0,i.A)(["\n  margin-right: 4px;\n  flex-shrink: 0;\n"]))),Z=f.Ay.span(K||(K=(0,i.A)([""]))),D=f.Ay.div(E||(E=(0,i.A)(["\n  padding-top: 8px;\n  font-size: 12px;\n  color: rgb(168, 168, 168);\n\n  span {\n    cursor: pointer;\n  }\n"]))),M=f.Ay.div(q||(q=(0,i.A)(["\n  cursor: pointer;\n  margin-top: 5px;\n  margin-left: auto;\n\n  @media (max-width: 768px) {\n    font-size: 12px;\n  }\n"]))),V=n=>{var e,t,i,m,u,p,g;let{commentReplyItem:h}=n;const x=(0,d.g)(),{user:v}=(0,o.J)(),[y,j]=(0,a.useState)(!1),A=(0,c.lZ)(r.wW),f=(0,c.lZ)(r.VO),{mutate:w}=$(null===h||void 0===h?void 0:h.parentComment),{mutate:C}=R(null===h||void 0===h?void 0:h.parentComment),I=(0,d.zy)(),P=(0,a.useCallback)((()=>{if(h){const n=h._id,e=h.parentComment;w({commentReplyId:n,parentCommentId:e})}}),[h,w]),F=(0,a.useCallback)((()=>{if(h){const n=h.parentComment,e=h._id;C({commentReplyId:e,parentCommentId:n,postId:x.id})}}),[h,C]),_=(0,a.useCallback)((n=>{var e;A(!0),f({userId:null===h||void 0===h?void 0:h.user._id,commentId:null===h||void 0===h?void 0:h.parentComment,nickName:null===h||void 0===h||null===(e=h.user)||void 0===e?void 0:e.nickname})}),[]);return(0,L.jsxs)(L.Fragment,{children:[y&&(0,L.jsx)(k.A,{text:"\uc0ad\uc81c",handleConfirm:()=>{P(),j(!1)},handleCancel:()=>j(!1)}),(0,L.jsx)(S,{$ispathname:I.pathname.includes("/commentList"),children:(0,L.jsxs)(b.A,{children:[(0,L.jsx)(U,{src:null===h||void 0===h||null===(e=h.user)||void 0===e?void 0:e.avatar,alt:""}),(0,L.jsxs)(Q,{children:[(0,L.jsx)(b.A,{children:(0,L.jsxs)(Z,{children:[(0,L.jsx)(O,{children:null===h||void 0===h||null===(t=h.user)||void 0===t?void 0:t.nickname}),(0,L.jsxs)(W,{className:"user-reply-comment",children:["@",null===h||void 0===h||null===(i=h.parentCommentUser)||void 0===i?void 0:i.nickname]}),null===h||void 0===h?void 0:h.contents]})}),(0,L.jsxs)(D,{children:[0!==(null===h||void 0===h||null===(m=h.likes)||void 0===m?void 0:m.length)&&(0,L.jsxs)("span",{children:["\uc88b\uc544\uc694 ",null===h||void 0===h||null===(u=h.likes)||void 0===u?void 0:u.length,"\uac1c"]})," ",(0,L.jsx)("span",{onClick:_,children:"\ub2f5\uae00 \ub2ec\uae30"})," ",(null===v||void 0===v?void 0:v._id)===(null===h||void 0===h?void 0:h.user._id)&&(0,L.jsx)("span",{onClick:()=>j(!0),children:"\ub313\uae00 \uc0ad\uc81c"})]})]}),(0,L.jsx)(M,{onClick:F,children:0!==(null===h||void 0===h||null===(p=h.likes)||void 0===p?void 0:p.length)?(0,L.jsx)(L.Fragment,{children:null===h||void 0===h||null===(g=h.likes)||void 0===g?void 0:g.map((n=>(null===n||void 0===n?void 0:n.user)===(null===v||void 0===v?void 0:v._id)?(0,L.jsx)("div",{children:(0,L.jsx)(l.DR4,{})},n._id):(0,L.jsx)("div",{children:(0,L.jsx)(s.MUx,{})},n._id)))}):(0,L.jsx)(s.MUx,{})})]})})]})};var J,B,G,H;const X=f.Ay.div(J||(J=(0,i.A)([""]))),Y=f.Ay.ul(B||(B=(0,i.A)([""]))),nn=f.Ay.div(G||(G=(0,i.A)(["\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n"]))),en=f.Ay.div(H||(H=(0,i.A)(["\n  border-bottom-width: 1px;\n  border-bottom-color: rgb(85, 85, 85);\n  border-bottom-style: solid;\n  width: 22px;\n  margin-right: 12px;\n"]))),tn=n=>{var e;let{commentReplyCount:t,parentCommentId:i,setOpen:r}=n;const{data:o,isLoading:l,fetchNextPage:s,isFetching:d,isFetchingNextPage:c,hasNextPage:m}=C(i),[u,p]=(0,a.useState)(t-3),g=(0,a.useCallback)((async()=>{const n=await s();p(u-3),n.isError&&console.log(n.error)}),[s,u]);return(0,L.jsx)(X,{children:(0,L.jsx)(Y,{children:l?(0,L.jsx)(b.A,{$justifyContent:"center",children:(0,L.jsx)("img",{className:"spinner",src:"/spinner.svg",alt:"loading"})}):(0,L.jsxs)(L.Fragment,{children:[m&&u>0?(0,L.jsxs)(nn,{onClick:g,children:[(0,L.jsx)(en,{}),(0,L.jsxs)("span",{children:["\ub2f5\uae00 \ubcf4\uae30(",u,"\uac1c)"]})]}):(0,L.jsxs)(nn,{onClick:()=>r(!1),children:[(0,L.jsx)(en,{}),(0,L.jsx)("span",{children:"\ub2f5\uae00 \uc228\uae30\uae30"})]}),(d||c)&&(0,L.jsx)(L.Fragment,{children:(0,L.jsx)(b.A,{$justifyContent:"center",children:(0,L.jsx)("img",{className:"spinner",src:"/spinner.svg",alt:"loading"})})}),null===o||void 0===o||null===(e=o.pages)||void 0===e?void 0:e.map((n=>null===n||void 0===n?void 0:n.commentReply.map((n=>(0,L.jsx)(V,{commentReplyItem:n},n._id)))))]})})})};var rn,on,an;const ln=f.Ay.div(rn||(rn=(0,i.A)(["\n  color: rgb(168, 168, 168);\n  font-size: 12px;\n  margin: 16px 0 0 54px;\n"]))),sn=f.Ay.div(on||(on=(0,i.A)(["\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n"]))),dn=f.Ay.div(an||(an=(0,i.A)(["\n  border-bottom-width: 1px;\n  border-bottom-color: rgb(85, 85, 85);\n  border-bottom-style: solid;\n  width: 22px;\n  margin-right: 12px;\n"]))),cn=n=>{let{commentReplyCount:e,parentCommentId:t}=n;const[i,r]=(0,a.useState)(!1);return(0,L.jsxs)(ln,{children:[!i&&(0,L.jsxs)(sn,{onClick:()=>r(!i),children:[(0,L.jsx)(dn,{}),(0,L.jsxs)("span",{children:["\ub2f5\uae00 \ubcf4\uae30(",e,"\uac1c)"]})]}),i&&(0,L.jsx)(tn,{commentReplyCount:e,parentCommentId:t,setOpen:r})]})};var mn,un,pn,gn,hn,xn,vn;const yn=f.Ay.li(mn||(mn=(0,i.A)(["\n  margin-right: -2px;\n  margin-top: 1rem;\n  width: 100%;\n  max-width: ",";\n  font-size: 14px;\n  line-height: 18px;\n  color: rgb(245, 245, 245);\n"])),(n=>{let{$ispathname:e}=n;return e?"500px":"335px"})),jn=f.Ay.div(un||(un=(0,i.A)([""]))),An=f.Ay.img(pn||(pn=(0,i.A)(["\n  width: 35px;\n  height: 35px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  margin-right: 10px;\n"]))),fn=f.Ay.span(gn||(gn=(0,i.A)(["\n  font-weight: bold;\n  margin-right: 4px;\n  flex-shrink: 0;\n"]))),bn=f.Ay.span(hn||(hn=(0,i.A)([""]))),kn=f.Ay.div(xn||(xn=(0,i.A)(["\n  padding-top: 8px;\n  font-size: 12px;\n  color: rgb(168, 168, 168);\n\n  span {\n    cursor: pointer;\n  }\n"]))),wn=f.Ay.div(vn||(vn=(0,i.A)(["\n  cursor: pointer;\n  margin-top: 5px;\n  margin-left: auto;\n\n  @media (max-width: 768px) {\n    font-size: 12px;\n  }\n"]))),Cn=n=>{var e,t,i,m,u,p;let{comment:g,postId:h}=n;const{user:x}=(0,o.J)(),[v,j]=(0,a.useState)(!1),f=(0,c.lZ)(r.wW),w=(0,c.lZ)(r.VO),{mutate:C}=y(h),{mutate:I}=A(h),$=(0,d.zy)(),P=(0,a.useCallback)((()=>{if(g._id&&h){const n=g._id;C({commentId:n,postId:h})}}),[g._id,C,h]),R=(0,a.useCallback)((()=>{if(g._id&&h){const n=g._id;I({commentId:n,postId:h})}}),[g._id,I,h]),F=(0,a.useCallback)((()=>{var n,e;f(!0),w({userId:null===g||void 0===g||null===(n=g.user)||void 0===n?void 0:n._id,commentId:null===g||void 0===g?void 0:g._id,nickName:null===g||void 0===g||null===(e=g.user)||void 0===e?void 0:e.nickname})}),[]);return(0,L.jsxs)(L.Fragment,{children:[v&&(0,L.jsx)(k.A,{text:"\uc0ad\uc81c",handleConfirm:()=>{P(),j(!1)},handleCancel:()=>j(!1)}),(0,L.jsxs)(yn,{$ispathname:$.pathname.includes("/commentList"),children:[(0,L.jsxs)(b.A,{children:[(0,L.jsx)(An,{src:null===g||void 0===g||null===(e=g.user)||void 0===e?void 0:e.avatar,alt:""}),(0,L.jsxs)(jn,{children:[(0,L.jsx)(b.A,{$alignItems:"center",children:(0,L.jsxs)(bn,{children:[(0,L.jsx)(fn,{children:null===g||void 0===g||null===(t=g.user)||void 0===t?void 0:t.nickname}),"\xa0",null===g||void 0===g?void 0:g.contents]})}),(0,L.jsxs)(kn,{children:[0!==(null===g||void 0===g||null===(i=g.likes)||void 0===i?void 0:i.length)&&(0,L.jsxs)("span",{children:["\uc88b\uc544\uc694 ",null===g||void 0===g||null===(m=g.likes)||void 0===m?void 0:m.length,"\uac1c"]})," ",(0,L.jsx)("span",{onClick:F,children:"\ub2f5\uae00 \ub2ec\uae30"})," ",(null===x||void 0===x?void 0:x._id)===(null===g||void 0===g?void 0:g.user._id)&&(0,L.jsx)("span",{onClick:()=>j(!0),children:"\ub313\uae00 \uc0ad\uc81c"})]})]}),(null===x||void 0===x?void 0:x._id)===(null===g||void 0===g?void 0:g.user._id)&&(0,L.jsx)(wn,{onClick:R,children:0!==(null===g||void 0===g||null===(u=g.likes)||void 0===u?void 0:u.length)?(0,L.jsx)(L.Fragment,{children:null===g||void 0===g||null===(p=g.likes)||void 0===p?void 0:p.map((n=>(null===n||void 0===n?void 0:n.user)===(null===x||void 0===x?void 0:x._id)?(0,L.jsx)("div",{children:(0,L.jsx)(l.DR4,{})},n._id):(0,L.jsx)("div",{children:(0,L.jsx)(s.MUx,{})},n._id)))}):(0,L.jsx)(s.MUx,{})})]}),0!==(null===g||void 0===g?void 0:g.commentReplyCount)&&(0,L.jsx)(cn,{commentReplyCount:null===g||void 0===g?void 0:g.commentReplyCount,parentCommentId:null===g||void 0===g?void 0:g._id})]})]})}},9264:(n,e,t)=>{t.d(e,{A:()=>a});var i=t(3026),r=t(6022),o=t(579);const a=()=>(0,o.jsxs)(i.A,{$padding:"1rem 0 0 0",children:[(0,o.jsx)(r.A,{$borderradius:"50%",width:"35px",height:"35px"}),(0,o.jsxs)(i.A,{$direction:"column",$gap:"5px",$justifyContent:"center",$padding:"0 0 0 10px",children:[(0,o.jsx)(r.A,{$borderradius:"12px",width:"150px",height:"10px"}),(0,o.jsx)(r.A,{$borderradius:"12px",width:"100px",height:"10px"})]})]})},3026:(n,e,t)=>{t.d(e,{A:()=>s});var i,r=t(7528),o=t(197),a=t(579);const l=o.Ay.div(i||(i=(0,r.A)(["\n  display: flex;\n  flex-direction: ",";\n  justify-content: ",";\n  align-items: ",";\n  flex-wrap: ",";\n  gap: ",";\n  padding: ",";\n  background: ",";\n"])),(n=>{let{$direction:e}=n;return e||"row"}),(n=>{let{$justifyContent:e}=n;return e||"flex-start"}),(n=>{let{$alignItems:e}=n;return e||"stretch"}),(n=>{let{$wrap:e}=n;return e||"nowrap"}),(n=>{let{$gap:e}=n;return e||"0"}),(n=>{let{$padding:e}=n;return e}),(n=>{let{$background:e}=n;return e||"transparent"})),s=n=>{let{children:e,$direction:t,$justifyContent:i,$alignItems:r,$wrap:o,$gap:s,$padding:d,$background:c,style:m}=n;return(0,a.jsx)(l,{$direction:t,$justifyContent:i,$alignItems:r,$wrap:o,$gap:s,$padding:d,$background:c,style:m,children:e})}},9945:(n,e,t)=>{t.d(e,{A:()=>h});var i,r,o,a,l=t(7528),s=t(197),d=t(8371),c=t(579);const m=(0,s.i7)(i||(i=(0,l.A)(["\n  0% {\n    opacity: 0;\n    scale: 0;\n  }\n  50% {\n    opacity: 1;\n    scale: 1.1;\n  }\n  100%{\n    scale: 1;\n  }\n"]))),u=s.Ay.div(r||(r=(0,l.A)(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  min-height: 100vh;\n  color: #fff;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 50;\n  overflow: hidden;\n"]))),p=s.Ay.div(o||(o=(0,l.A)(["\n  display: flex;\n  flex-direction: column;\n  animation: "," 0.3s ease-in-out;\n"])),m),g=(0,s.Ay)(d.A)(a||(a=(0,l.A)(["\n  font-weight: 700;\n  background-color: rgb(38, 38, 38);\n  width: 250px;\n  min-height: 48px;\n  padding: 4px 8px;\n  &:first-child {\n    border-top-left-radius: 12px;\n    border-top-right-radius: 12px;\n    border-bottom: 1px solid rgb(54, 54, 54);\n    color: rgb(237, 73, 86);\n  }\n  &:last-child {\n    border-bottom-left-radius: 12px;\n    border-bottom-right-radius: 12px;\n  }\n\n  &:hover {\n    background-color: rgb(29, 29, 29);\n  }\n"]))),h=n=>{let{text:e,handleConfirm:t,handleCancel:i}=n;return(0,c.jsx)(u,{children:(0,c.jsxs)(p,{children:[(0,c.jsx)(g,{type:"button",onClick:()=>{t(),i(!1)},children:e}),(0,c.jsx)(g,{type:"button",onClick:()=>i(!1),children:"\ucde8\uc18c"})]})})}},1207:(n,e,t)=>{t.d(e,{A:()=>g});var i,r,o=t(7528),a=t(5394),l=t(3216),s=t(3026),d=t(3704),c=t(197),m=t(579);const u=c.Ay.div(i||(i=(0,o.A)(["\n  max-width: ",";\n  max-width: 100%;\n  margin: 0 auto;\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n\n  &::before {\n    background-color: rgb(54, 54, 54);\n    bottom: -1px;\n    content: '';\n    height: 1px;\n    left: 0;\n    position: absolute;\n    right: 0;\n  }\n\n  @media (min-width: 768px) {\n    max-width: 500px;\n  }\n"])),(n=>{let{$pathname:e}=n;return e?"100%":"500px"})),p=c.Ay.div(r||(r=(0,o.A)(["\n  color: white;\n  font-size: 1.5rem;\n  z-index: 10;\n  cursor: pointer;\n"]))),g=n=>{let{text:e}=n;const t=(0,l.Zp)(),i=(0,l.zy)();return(0,m.jsx)(u,{$pathname:"/posts"===i.pathname?"true":"",children:(0,m.jsxs)(s.A,{$alignItems:"center",$justifyContent:"space-between",$background:"black",$padding:"5px 16px",children:[(0,m.jsx)(p,{onClick:()=>{t(-1)},children:(0,m.jsx)(a.zrQ,{})}),(0,m.jsx)(d.A,{tag:"p",fontWeight:"bold",fontSize:"16px",children:e}),(0,m.jsx)("div",{})]})})}},6022:(n,e,t)=>{t.d(e,{A:()=>c});var i,r,o=t(7528),a=t(197),l=t(579);const s=(0,a.i7)(i||(i=(0,o.A)(["\n  0% {\n    background-position:100% 0%;\n  }\n  100% {\n    background-position:0% 0%;\n  }\n  "]))),d=a.Ay.div(r||(r=(0,o.A)(["\n  height: ",";\n  width: ",";\n  border-radius: ",";\n  margin: ",";\n  background: linear-gradient(90deg, #1e1e1e 35%, #0a0a0a 50%, #151515 65%);\n  /* background-size: 200px 100%; */\n  background-size: 300% auto;\n  animation: "," 2s infinite linear;\n"])),(n=>{let{height:e}=n;return e}),(n=>{let{width:e}=n;return e}),(n=>{let{$borderradius:e}=n;return e}),(n=>{let{$margin:e}=n;return e}),s),c=n=>{let{width:e,height:t,$borderradius:i,$margin:r}=n;return(0,l.jsx)("div",{children:(0,l.jsx)(d,{width:e,height:t,$borderradius:i,$margin:r})})}},3704:(n,e,t)=>{t.d(e,{A:()=>d});var i,r=t(7528),o=t(5043),a=t(197),l=t(579);const s=(0,a.Ay)((n=>{let{tag:e,children:t,...i}=n;return(0,o.createElement)(e,i,t)}))(i||(i=(0,r.A)(["\n  color: rgb(245, 245, 245);\n"]))),d=n=>{let{tag:e="p",children:t,...i}=n;return(0,l.jsx)(s,{tag:e,style:{...i},children:t})}},3874:(n,e,t)=>{t.d(e,{A:()=>a});var i=t(5714),r=t(5818),o=t(9724);const a=n=>{const{fetchNextPage:e,isFetching:t,isFetchingNextPage:a,hasNextPage:l,isLoading:s,data:d,error:c}=(0,i.q)({queryKey:[o.T.comment,n],queryFn:e=>{let{pageParam:t=1}=e;return(async(n,e)=>(await r.A.get("/api/comment/".concat(n,"?page=").concat(e),{params:{limit:10,page:e}})).data)(n,t)},initialPageParam:1,getNextPageParam:n=>{var e;return(null===(e=n.commentList)||void 0===e?void 0:e.length)>0&&n.page!==n.totalPage?n.page+1:void 0}});return{fetchNextPage:e,isFetching:t,isFetchingNextPage:a,hasNextPage:l,isLoading:s,data:d,error:c}}},1529:(n,e,t)=>{t.d(e,{A:()=>a});var i=t(8261),r=t(5818),o=t(8245);const a=n=>{const{data:e,isLoading:t,error:a}=(0,i.I)({queryKey:[o.l.post,n],queryFn:()=>(async n=>(await r.A.get("/api/posts/".concat(n))).data)(n),refetchOnWindowFocus:!1,staleTime:15e3});return{data:e,isLoading:t,error:a}}},9724:(n,e,t)=>{t.d(e,{T:()=>i});const i={comment:"comment",commentReply:"comment-reply"}},8245:(n,e,t)=>{t.d(e,{Z:()=>i,l:()=>r});const i={posts:"posts"},r={post:"post",postLike:"postLike",postBookmark:"postBookmark"}}}]);
//# sourceMappingURL=526.4f79cf7c.chunk.js.map