exports.id=771,exports.ids=[771],exports.modules={19719:(a,b,c)=>{"use strict";c.d(b,{Header:()=>i});var d=c(46831),e=c(94646),f=c.n(e),g=c(60339),h=c(20650);function i(){let{user:a,logout:b,loading:c}=(0,g.A)(),[e,i]=(0,h.useState)(!1);return(0,d.jsxs)("header",{className:"sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",children:[(0,d.jsxs)("div",{className:"mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",children:[(0,d.jsxs)(f(),{href:"/",className:"flex items-center gap-2",children:[(0,d.jsx)("svg",{className:"h-8 w-8 text-accent",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})}),(0,d.jsx)("span",{className:"text-xl font-bold text-foreground",children:"CarRent"})]}),(0,d.jsxs)("nav",{className:"hidden items-center gap-6 md:flex",children:[(0,d.jsx)(f(),{href:"/",className:"text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",children:"Home"}),(0,d.jsx)(f(),{href:"/cars",className:"text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",children:"Veicoli"}),a&&(0,d.jsx)(f(),{href:"/bookings",className:"text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",children:"Le Mie Prenotazioni"}),a?.isAdmin&&(0,d.jsx)(f(),{href:"/admin",className:"text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",children:"Admin"})]}),(0,d.jsx)("div",{className:"hidden items-center gap-4 md:flex",children:c?(0,d.jsx)("div",{className:"h-9 w-20 animate-pulse rounded-md bg-muted"}):a?(0,d.jsxs)("div",{className:"flex items-center gap-4",children:[(0,d.jsxs)("span",{className:"text-sm text-muted-foreground",children:["Ciao, ",a.username]}),(0,d.jsx)("button",{onClick:b,className:"rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80",children:"Esci"})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(f(),{href:"/login",className:"text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",children:"Accedi"}),(0,d.jsx)(f(),{href:"/register",className:"rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90",children:"Registrati"})]})}),(0,d.jsx)("button",{onClick:()=>i(!e),className:"inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden",children:(0,d.jsx)("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e?(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"}):(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})})]}),e&&(0,d.jsx)("div",{className:"border-t border-border md:hidden",children:(0,d.jsxs)("nav",{className:"flex flex-col gap-2 p-4",children:[(0,d.jsx)(f(),{href:"/",className:"rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted",onClick:()=>i(!1),children:"Home"}),(0,d.jsx)(f(),{href:"/cars",className:"rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted",onClick:()=>i(!1),children:"Veicoli"}),a&&(0,d.jsx)(f(),{href:"/bookings",className:"rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted",onClick:()=>i(!1),children:"Le Mie Prenotazioni"}),a?.isAdmin&&(0,d.jsx)(f(),{href:"/admin",className:"rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted",onClick:()=>i(!1),children:"Admin"}),(0,d.jsx)("div",{className:"mt-4 border-t border-border pt-4",children:a?(0,d.jsx)("button",{onClick:()=>{b(),i(!1)},className:"w-full rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground",children:"Esci"}):(0,d.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,d.jsx)(f(),{href:"/login",className:"w-full rounded-md bg-secondary px-4 py-2 text-center text-sm font-medium text-secondary-foreground",onClick:()=>i(!1),children:"Accedi"}),(0,d.jsx)(f(),{href:"/register",className:"w-full rounded-md bg-accent px-4 py-2 text-center text-sm font-medium text-accent-foreground",onClick:()=>i(!1),children:"Registrati"})]})})]})})]})}},19773:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>d});let d=(0,c(64701).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/vercel/share/v0-project/app/global-error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/vercel/share/v0-project/app/global-error.tsx","default")},26265:()=>{},28635:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>f,metadata:()=>e});var d=c(52393);c(26265);let e={title:"Car Rental App - Noleggio Auto",description:"Noleggia la tua auto ideale in pochi click. Ampia selezione di veicoli a prezzi competitivi."};function f({children:a}){return(0,d.jsx)("html",{lang:"it",children:(0,d.jsx)("body",{className:"min-h-screen bg-background text-foreground antialiased",children:a})})}},33716:()=>{},36227:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,33738,23)),Promise.resolve().then(c.t.bind(c,17812,23)),Promise.resolve().then(c.t.bind(c,2979,23)),Promise.resolve().then(c.t.bind(c,29571,23)),Promise.resolve().then(c.t.bind(c,85531,23)),Promise.resolve().then(c.t.bind(c,4021,23)),Promise.resolve().then(c.t.bind(c,63442,23)),Promise.resolve().then(c.bind(c,18963))},58127:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>e});var d=c(46831);function e({error:a}){return console.error(a),(0,d.jsxs)("html",{children:[(0,d.jsx)("head",{children:(0,d.jsx)("style",{children:`
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: ui-monospace, monospace;
            padding: 2rem;
            background: #fafafa;
            color: #171717;
            font-size: 14px;
            min-height: 100vh;
            display: flex;
            align-items: flex-start;
          }
          .error-container {
            width: 100%;
            max-width: 560px;
            min-width: 0;
          }
          .error-header {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .error-icon {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fef2f2;
            color: #b91c1c;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 12px;
            flex-shrink: 0;
          }
          .error-message {
            margin: 0;
            font-weight: 500;
            line-height: 1.5;
          }
          .error-message code {
            background: #e5e5e5;
            padding: 0.1em 0.3em;
          }
          .error-summary {
            margin: 0.25rem 0 0 2rem;
            padding: 0;
            font-size: 13px;
            color: #b91c1c;
            line-height: 1.5;
          }
          .error-details-wrapper {
            margin: 1rem 0 0 2rem;
          }
          .error-details summary {
            list-style: none;
            cursor: pointer;
            padding: 0;
            color: #737373;
            font-size: 12px;
            user-select: none;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .error-details summary::-webkit-details-marker {
            display: none;
          }
          .error-details summary .chevron {
            display: inline-flex;
            align-items: center;
            font-size: 0.6rem;
            transition: transform 0.2s ease;
            transform: rotate(-90deg);
          }
          .error-details[open] summary .chevron {
            transform: rotate(0deg);
          }
          .error-stack-slot {
            height: 320px;
            margin-top: 0.5rem;
          }
          .error-details-wrapper:not(:has(details[open])) .error-stack {
            visibility: hidden;
          }
          .error-stack {
            margin: 0;
            padding: 1rem;
            background: #f5f5f5;
            overflow: auto;
            max-width: 100%;
            min-width: 0;
            height: 100%;
            box-sizing: border-box;
            font-size: 11px;
            line-height: 1.5;
          }
        `})}),(0,d.jsx)("body",{children:(0,d.jsxs)("div",{className:"error-container",children:[(0,d.jsxs)("div",{className:"error-header",children:[(0,d.jsx)("div",{className:"error-icon",children:"!"}),(0,d.jsx)("div",{children:(0,d.jsxs)("p",{className:"error-message",children:["An application error has occurred while loading"," ",(0,d.jsx)("code",{children:"/"})]})})]}),(0,d.jsx)("div",{className:"error-summary",children:a.message||"Unknown error"}),a.stack&&(0,d.jsxs)("div",{className:"error-details-wrapper",children:[(0,d.jsx)("details",{className:"error-details",children:(0,d.jsxs)("summary",{children:[(0,d.jsx)("span",{className:"chevron",children:"▼"}),"View full error trace"]})}),(0,d.jsx)("div",{className:"error-stack-slot",children:(0,d.jsx)("pre",{className:"error-stack",children:a.stack})})]})]})})]})}},60203:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,88680,23)),Promise.resolve().then(c.t.bind(c,71070,23)),Promise.resolve().then(c.t.bind(c,17353,23)),Promise.resolve().then(c.t.bind(c,69197,23)),Promise.resolve().then(c.t.bind(c,23605,23)),Promise.resolve().then(c.t.bind(c,82063,23)),Promise.resolve().then(c.t.bind(c,56088,23)),Promise.resolve().then(c.t.bind(c,59445,23))},60339:(a,b,c)=>{"use strict";c.d(b,{A:()=>j,AuthProvider:()=>i});var d=c(46831),e=c(20650),f=c(523);let g=(0,e.createContext)(void 0),h=a=>fetch(a).then(a=>a.json());function i({children:a}){let{data:b,isLoading:c,mutate:i}=(0,f.Ay)("/api/auth/me",h),[j,k]=(0,e.useState)(null),l=(0,e.useCallback)(async(a,b)=>{try{let c=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:a,password:b})}),d=await c.json();if(!c.ok)return{success:!1,error:d.error||"Login fallito"};return k(d.user),i(),{success:!0}}catch{return{success:!1,error:"Si \xe8 verificato un errore"}}},[i]),m=(0,e.useCallback)(async a=>{try{let b=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),c=await b.json();if(!b.ok)return{success:!1,error:c.error||"Registrazione fallita"};return{success:!0}}catch{return{success:!1,error:"Si \xe8 verificato un errore"}}},[]),n=(0,e.useCallback)(async()=>{await fetch("/api/auth/logout",{method:"POST"}),k(null),i()},[i]),o=(0,e.useCallback)(()=>{i()},[i]);return(0,d.jsx)(g.Provider,{value:{user:j,loading:c,login:l,register:m,logout:n,refreshUser:o},children:a})}function j(){let a=(0,e.useContext)(g);if(void 0===a)throw Error("useAuth must be used within an AuthProvider");return a}},90040:(a,b,c)=>{Promise.resolve().then(c.bind(c,19773))},97332:()=>{},99768:(a,b,c)=>{Promise.resolve().then(c.bind(c,58127))}};