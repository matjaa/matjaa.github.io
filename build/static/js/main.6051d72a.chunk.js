(this.webpackJsonpfanikauppa=this.webpackJsonpfanikauppa||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),i=n(5),s=n.n(i),r=(n(10),n(2)),u=(n(11),n(3)),o=n(0),l=function(e){var t=e.lista,n=e.AddCart,c=e.RemoveCart,a=e.UpdateCart,i=e.setMain,s=t.map((function(e,t){if(e.count>0)return Object(o.jsxs)("div",{className:"cartitem",children:[Object(o.jsx)("div",{className:"itemname",children:Object(o.jsxs)("p",{className:"margin0",children:[Object(o.jsx)("b",{children:e.name})," ",e.price,"\u20ac/piece"]})}),Object(o.jsxs)("div",{className:"numofitems",children:[Object(o.jsx)("button",{onClick:function(){return n(e.id)},className:"cartbutton",children:"+"}),Object(o.jsx)("input",{type:"number",value:e.count,onChange:function(t){return a(e.id,t.target.value)},className:"itemcount"}),Object(o.jsx)("button",{onClick:function(){return c(e.id)},className:"cartbutton",children:"-"})]})]},t)}));if(t.map((function(e){return e.count})).reduce((function(e,t){return Number(e)+Number(t)}))>0)return Object(o.jsxs)("div",{className:"cart",children:[Object(o.jsxs)("p",{className:"total",children:["Total: ",Math.round(100*t.map((function(e){return e.count*e.price})).reduce((function(e,t){return Number(e)+Number(t)})))/100,"\u20ac"]}),s,Object(o.jsx)("button",{onClick:function(){return i(!1)},className:"checkoutbutton",children:"Checkout"})]})},j=function(e,t,n,c,a){return Object(o.jsx)("div",{children:l(e)})},d=function(e){var t=e.item,n=e.AddCart,a=Object(c.useState)(!0),i=Object(r.a)(a,2),s=i[0],u=i[1];return Object(o.jsxs)("div",{className:"item",children:[Object(o.jsx)("img",{src:t.pic,alt:t.alt,className:"itempic"}),Object(o.jsx)("p",{children:Object(o.jsx)("b",{children:t.name})}),Object(o.jsxs)("p",{children:[t.price," per piece"]}),Object(o.jsx)("div",{onClick:function(){return u(!s)},children:s?Object(o.jsx)("p",{className:"lisatieto",children:"More Information..."}):Object(o.jsx)("p",{children:t.desc})}),Object(o.jsx)("button",{onClick:function(){return n(t.id)},className:"addtocart",children:"Add to Cart"})]})},b=function(e){var t=e.a,n=e.setTotal,c=e.setMain,a=function(e){n(t.map((function(t){return t.id===e&&(t=Object(u.a)(Object(u.a)({},t),{},{count:Number(t.count)+1})),t})))};return Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{className:"products",children:t.map((function(e,t){return Object(o.jsx)(d,{item:e,AddCart:a},t)}))}),Object(o.jsx)("div",{children:Object(o.jsx)(j,{lista:t,AddCart:a,RemoveCart:function(e){n(t.map((function(t){return t.id===e&&(t=Object(u.a)(Object(u.a)({},t),{},{count:Number(t.count)-1})),t})))},UpdateCart:function(e,c){n(t.map((function(t){return t.id===e&&(t=Object(u.a)(Object(u.a)({},t),{},{count:c})),t})))},setMain:c})})]})},m=function(e){var t=Object(c.useState)(""),n=Object(r.a)(t,2),a=n[0],i=n[1],s=Object(c.useState)(""),u=Object(r.a)(s,2),l=u[0],j=u[1],d=Object(c.useState)(""),b=Object(r.a)(d,2),m=b[0],p=b[1],O=Object(c.useState)(""),h=Object(r.a)(O,2),f=h[0],x=h[1],g=Object(c.useState)(""),v=Object(r.a)(g,2),N=v[0],y=v[1],C=Object(c.useState)(""),S=Object(r.a)(C,2),k=S[0],B=S[1],A=Object(c.useState)(""),I=Object(r.a)(A,2),M=I[0],E=I[1],q=Object(c.useState)(""),P=Object(r.a)(q,2),T=P[0],F=P[1],w=Object(c.useState)(!1),D=Object(r.a)(w,2),L=D[0],R=D[1];return Object(o.jsxs)("div",{children:[Object(o.jsx)("button",{onClick:function(){R(!1),e.setMain(!0)},className:"back",children:"Back"}),L?Object(o.jsxs)("div",{className:"receipt",children:[Object(o.jsx)("h2",{children:"Thank you for your purchase"}),Object(o.jsxs)("p",{children:["Total: ",Math.round(100*e.lista.map((function(e){return e.count*e.price})).reduce((function(e,t){return Number(e)+Number(t)})))/100,"\u20ac"]}),e.lista.map((function(e,t){if(e.count>0)return Object(o.jsxs)("div",{children:[Object(o.jsxs)("a",{children:[e.name,": ",e.count,"/",e.count*e.price,"\u20ac"]}),Object(o.jsx)("br",{})]},t)})),Object(o.jsxs)("p",{children:["Name: ",a.name," ",a.lastname]}),Object(o.jsxs)("p",{children:["Contact: ",a.email,"/",a.phone]}),Object(o.jsxs)("p",{children:["Address: ",a.address]}),Object(o.jsxs)("p",{children:["City: ",a.city," ",a.postcode]})]}):Object(o.jsx)("div",{className:"customerinfo",children:Object(o.jsxs)("form",{onSubmit:function(e){e.preventDefault(),i({name:l,lastname:m,email:f,phone:N,address:k,city:M,postcode:T}),j(""),p(""),x(""),y(""),B(""),E(""),F(""),R(!0)},children:[Object(o.jsxs)("div",{className:"personal",children:[Object(o.jsx)("h2",{children:"Personal Info"}),Object(o.jsx)("label",{for:"name",children:"Name:"}),Object(o.jsx)("input",{type:"text",id:"name",value:l,required:!0,onChange:function(){j(document.getElementById("name").value)},className:"infoinput"}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{for:"lastname",children:"Last Name:"}),Object(o.jsx)("input",{type:"text",id:"lastname",value:m,required:!0,onChange:function(){p(document.getElementById("lastname").value)},className:"infoinput"}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{for:"email",children:"Email:"}),Object(o.jsx)("input",{type:"email",id:"email",value:f,required:!0,onChange:function(){x(document.getElementById("email").value)},className:"infoinput"}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{for:"phone",children:"Phone:"}),Object(o.jsx)("input",{type:"number",id:"phone",value:N,required:!0,onChange:function(){y(document.getElementById("phone").value)},className:"infoinput"}),Object(o.jsx)("br",{})]}),Object(o.jsxs)("div",{className:"delivery",children:[Object(o.jsx)("h2",{children:"Delivery Info"}),Object(o.jsx)("label",{for:"address",children:"Address:"}),Object(o.jsx)("input",{type:"text",id:"address",value:k,required:!0,onChange:function(){B(document.getElementById("address").value)},className:"infoinput"}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{for:"city",children:"City:"}),Object(o.jsx)("input",{type:"text",id:"city",value:M,required:!0,onChange:function(){E(document.getElementById("city").value)},className:"infoinput"}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{for:"postcode",children:"Postcode:"}),Object(o.jsx)("input",{type:"text",id:"postcode",value:T,required:!0,onChange:function(){F(document.getElementById("postcode").value)},className:"infoinput"}),Object(o.jsx)("br",{}),Object(o.jsx)("input",{type:"submit",value:"Order",className:"order"})]})]})})]})},p=[{name:"Ape",price:1499.99,desc:"A funny looking pet for a rich man",pic:"https://freesvg.org/img/papapishu-ape-1.png",alt:"Burger",count:0,id:0},{name:"Bullfrog",price:199.99,desc:"A frog that ate a whole bull and is now the size of a man",pic:"https://freesvg.org/img/papapishu-Bullfrog.png",alt:"Burger",count:0,id:1},{name:"Raccoon",price:4.99,desc:"Fat trash panda",pic:"https://freesvg.org/img/1298483681.png",alt:"Burger",count:0,id:4},{name:"Polecat",price:4.99,desc:"Skinny trash panda",pic:"https://freesvg.org/img/Polecat.png",alt:"Burger",count:0,id:2},{name:"Sloth Bear",price:4.99,desc:"Some kind of genetically modified bear",pic:"https://freesvg.org/img/Sloth-bear-.png",alt:"Burger",count:0,id:3}];var O=function(){var e=Object(c.useState)(p),t=Object(r.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)(!0),s=Object(r.a)(i,2),u=s[0],l=s[1];return Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)("header",{className:"App-header",children:Object(o.jsx)("p",{children:"Not illegal shopping site"})}),u?Object(o.jsx)(b,{a:n,setTotal:a,setMain:l}):Object(o.jsx)(m,{lista:n,setMain:l})]})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,14)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),i(e),s(e)}))};s.a.render(Object(o.jsx)(a.a.StrictMode,{children:Object(o.jsx)(O,{})}),document.getElementById("root")),h()}},[[13,1,2]]]);
//# sourceMappingURL=main.6051d72a.chunk.js.map