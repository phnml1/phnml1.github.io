(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[246],{8581:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/search",function(){return s(5559)}])},5983:function(e,t,s){"use strict";s.d(t,{Z:function(){return h}});var r=s(5893),n=s(7294),a=s(9008),l=s.n(a),o=s(1664),c=s.n(o),d=s(588),i=s(1578),u=e=>{let t=(0,i.ZP)(new Date(e.content.date),"yyyy년 MM월 dd일");return(0,r.jsx)(c(),{href:"/".concat(e.content.slug),className:"w-full h-auto cursor-pointer transition-all hover:drop-shadow-tag-hover",children:(0,r.jsxs)("div",{className:"w-full ml-2 transition-all hover:drop-shadow-tag-hover",children:[(0,r.jsx)("div",{className:"text-lg font-bold md:text-3xl",children:e.content.title}),(0,r.jsx)("div",{className:"mt-8 text-sm md:text-base",children:e.content.summary}),(0,r.jsxs)("div",{className:"mt-8 flex justify-between flex-wrap gap-4 flex-col sm:flex-row",children:[(0,r.jsx)("div",{className:"flex gap-4",children:e.content.tags.map((e,t)=>(0,r.jsx)(d.Z,{name:e},t))}),(0,r.jsx)("div",{className:"pl-2 mr-12 text-sm sm:text-base",children:t})]})]})})},x=e=>(0,r.jsx)("div",{className:"w-full h-fit px-3 mt-12 grid gap-12",children:e.contents.map((e,t)=>(0,r.jsx)(u,{content:e},t))});function h(e){return(0,r.jsxs)(n.Fragment,{children:[(0,r.jsxs)(l(),{children:[(0,r.jsxs)("title",{children:["phnml1","'","s blog"]}),(0,r.jsx)("meta",{name:"description",content:"".concat(e.currentCategory,"와 관련한 글 모두 보여주기")})]}),(0,r.jsx)("div",{className:"w-full relative h-auto flex items-start justify-center mb-8 md:w-4/5 px-8 flex-col",children:(0,r.jsxs)("div",{className:"w-full h-auto mt-10",children:[(0,r.jsxs)("div",{className:"mt-16 text-3xl font-extrabold w-full ml-5 mb-16 flex gap-2",children:[(0,r.jsx)("div",{children:"all"===e.currentCategory||""===e.currentCategory?"All Posts":e.currentCategory}),(0,r.jsxs)("div",{children:["(",e.posts.length,")"]})]}),(0,r.jsx)(x,{contents:e.posts})]})})]})}},588:function(e,t,s){"use strict";var r=s(5893),n=s(1664),a=s.n(n);t.Z=e=>(0,r.jsx)(a(),{href:"/posts/tag/".concat(e.name),className:"w-fit h-fit px-2 py-1 transition-all bg-gray-100 rounded-lg text-sm dark:bg-dark-secondary dark:hover:text-white hover:bg-tag-hover dark:hover:bg-tag-dark-hover",children:e.name})},5559:function(e,t,s){"use strict";s.r(t),s.d(t,{__N_SSG:function(){return d},default:function(){return i}});var r=s(5893),n=s(8080),a=s(5983),l=e=>(0,r.jsx)("input",{type:"text",value:e.keyword,onChange:t=>{e.setKeyword(t.target.value)},placeholder:"포스트 제목 검색",className:"outline-none transition-all border-2 border-slate-200 focus:border-indigo-200 dark:border-dark-secondary dark:focus:border-indigo-200 border-solid rounded-lg px-6 w-full h-14 "}),o=s(3320),c=s(7294),d=!0;function i(e){let[t,s]=(0,c.useState)(e.posts),[d,i]=(0,c.useState)("");return(0,c.useEffect)(()=>{let t=(0,o.cl)(e.posts,d);s(t)},[d,e.posts]),(0,r.jsxs)(n.Z,{children:[(0,r.jsx)("div",{className:"w-full mt-8 md:w-4/5 px-8",children:(0,r.jsx)(l,{keyword:d,setKeyword:i})}),(0,r.jsx)(a.Z,{posts:t,currentCategory:d,theme:"search"})]})}}},function(e){e.O(0,[916,135,80,774,888,179],function(){return e(e.s=8581)}),_N_E=e.O()}]);