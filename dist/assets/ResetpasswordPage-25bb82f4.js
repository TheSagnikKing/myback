import{r as i,u as h,a as u,b as m,B as x,j as s,A as j,_ as p,L as n,Q as g,c as v}from"./index-35bd031f.js";const w=()=>{const[t,r]=i.useState("");i.useState(!0);const o=h();u();const c=()=>{t?o(v(t)):alert("Please Enter Email")},l=m(a=>a.AdminForgetPassword),{error:e,loading:d}=l;return console.log(e==null?void 0:e.message),i.useEffect(()=>{e&&x.error(e==null?void 0:e.message,{position:"top-right"})},[e]),s.jsxs("main",{className:"resetpassword",children:[s.jsx("div",{className:"left",children:s.jsx("img",{src:"https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000",alt:"signup"})}),s.jsx("div",{className:"right",children:s.jsxs("div",{className:"right_inner_container",children:[s.jsxs("div",{className:"divone",children:[s.jsx("h1",{children:"Reset your password"}),s.jsx("p",{children:"Enter the email address associated your account and we will send you a link to reset your password"})]}),s.jsx("div",{className:"divtwo",children:s.jsxs("div",{className:"input_container",children:[s.jsx("div",{children:s.jsx(j,{})}),s.jsx("input",{type:"email",placeholder:"Email",value:t,onChange:a=>r(a.target.value)})]})}),d===!0?s.jsx("button",{className:"divthree",children:s.jsx(p,{color:"white"})}):s.jsx("button",{className:"divthree",onClick:c,children:"Continue"}),s.jsx("p",{className:"divfour",children:s.jsx(n,{to:"/admin-signin",style:{color:"black",textDecoration:"none"},children:s.jsx("strong",{children:"Back to sign in"})})}),s.jsxs("p",{className:"divfive",children:["Don't have an account? ",s.jsx(n,{to:"/admin-signup",style:{textDecoration:"none",color:"black"},children:s.jsx("strong",{children:"Sign Up"})})]})]})}),s.jsx(g,{})]})},N=()=>s.jsx(s.Fragment,{children:s.jsx(w,{})});export{N as default};