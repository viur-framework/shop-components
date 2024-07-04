(function(f,e){typeof exports=="object"&&typeof module!="undefined"?e(exports,require("vue"),require("@viur/vue-utils"),require("pinia"),require("@viur/viur-shop-client"),require("vue-router")):typeof define=="function"&&define.amd?define(["exports","vue","@viur/vue-utils","pinia","@viur/viur-shop-client","vue-router"],e):(f=typeof globalThis!="undefined"?globalThis:f||self,e(f.ViurShopComponents={},f.Vue,f.ViurVueUtils,f.Pinia,f.ViurShopClient))})(this,function(f,e,w,q,D){"use strict";var ct="",y=(t,r)=>{const n=t.__vccOpts||t;for(const[_,o]of r)n[_]=o;return n};const C={props:{size:{type:String,default:"2"},active:{type:Boolean,default:!0},logo:{default:"logo-cube.svg",type:String},color:{default:"var(--sl-color-primary-500)",type:String}},setup(t,r){const n=e.reactive({trackWidth:e.computed(()=>`${t.size/30}rem`),outerSize:e.computed(()=>`calc(${t.size}rem + ${n.trackWidth})`),spinnerSize:e.computed(()=>`${t.size}rem`),logoSize:e.computed(()=>`calc(${t.size}rem - ${n.trackWidth} * 10)`),shadow:e.computed(()=>`0px 0px ${t.size/6}rem 0 color-mix(in hsl, var(--sl-color-neutral-1000), 80% transparent)`)});return{state:n}}},T=()=>{e.useCssVars(t=>({"4d516391":t.state.outerSize,"9cfd9e6a":t.state.shadow,"08327592":t.state.logoSize,"602facef":t.state.spinnerSize,"0a642916":t.color,"3a404d66":t.state.trackWidth}))},I=C.setup;C.setup=I?(t,r)=>(T(),I(t,r)):T;const O=C,A={key:0,class:"loading"},F={class:"logo"};function j(t,r,n,_,o,l){const u=e.resolveComponent("sl-spinner"),p=e.resolveComponent("sl-icon");return e.openBlock(),e.createBlock(e.Transition,null,{default:e.withCtx(()=>[n.active?(e.openBlock(),e.createElementBlock("div",A,[e.createVNode(u,{class:"loader"}),e.createElementVNode("div",F,[e.createVNode(p,{src:n.logo},null,8,["src"])])])):e.createCommentVNode("",!0)]),_:1})}var W=y(O,[["render",j],["__scopeId","data-v-356919e0"]]);const g=q.defineStore("cartstore",()=>{const t=new D.ViURShopClient({host_url:window.location.origin==="http://localhost:8081"?"http://localhost:8080":window.location.origin}),r=e.reactive({basketRootNode:{},whishlistRootNodes:[],children:{},structure:{address:{},cart:{}}});async function n(){await o()}async function _(s){return await t.cart_list({cart_key:s})}async function o(){(await t.cart_list()).forEach(a=>{a.is_root_node&&(a.cart_type==="basket"?r.basketRootNode=a:r.whishlistRootNodes.push(a))})}async function l(s,a){let i=await t.article_add({article_key:s,parent_cart_key:a});console.log("addToCart",i)}async function u(s,a){let i=await t.article_view({article_key:s,parent_cart_key:a});console.log("getArticleView",i)}async function p(s,a){let i=await t.article_remove({article_key:s,parent_cart_key:a});console.log("remove Resp",i)}async function m(s,a,i){let d=await t.article_update({article_key:s,parent_cart_key:a,quantity:i,quantity_mode:"replace"});console.log("update Resp",d)}async function h(){let s=await t.address_structure();r.structure.address=s.addSkel,console.log("adress add",r.structure.address)}return{state:r,addToCart:l,getArticleView:u,removeItem:p,updateItem:m,init:n,getAdressStructure:h,getChildren:_}}),L={__name:"CartNode",props:{node:{type:Object,required:!0}},setup(t){return e.reactive({}),(r,n)=>(e.openBlock(),e.createElementBlock(e.Fragment,null,[e.createTextVNode(" cartnode "),e.createElementVNode("pre",null,e.toDisplayString(t.node.name),1)],64))}};var lt="";const x=t=>(e.pushScopeId("data-v-3f1dae7a"),t=t(),e.popScopeId(),t),M=["src"],K={class:"viur-shop-cart-card-header",slot:"header"},U={class:"viur-shop-cart-card-headline headline"},G={class:"viur-shop-cart-card-body-row"},P={class:"viur-shop-cart-card-body-info"},Z=x(()=>e.createElementVNode("div",{class:"viur-shop-cart-card-descr"},[e.createTextVNode(" Version: 900x900x2000 "),e.createElementVNode("br"),e.createTextVNode(" Farbe: Chromoptik "),e.createElementVNode("br"),e.createTextVNode(" Glasart: Klar hell mit Edelglasbeschichtung"),e.createElementVNode("br"),e.createTextVNode(" Anschlag: Beidseitig variabel"),e.createElementVNode("br"),e.createTextVNode(" Griff: Stangengriff Exklusiv (56) ")],-1)),H={class:"viur-shop-cart-card-body-footer"},J={class:"viur-shop-cart-card-body-amount"},Q={class:"viur-shop-cart-card-price-wrap",slot:"footer"},X=x(()=>e.createElementVNode("div",{class:"viur-shop-cart-card-price-label"},"Preis",-1)),Y={class:"viur-shop-cart-card-price"},v=x(()=>e.createElementVNode("div",{class:"viur-shop-cart-card-small-print"},"Brutto / Stk.",-1));var ee=y({__name:"CartLeaf",props:{leaf:{type:Object,required:!0},node:{type:Object,required:!0}},emits:["updateItem","removeItem"],setup(t,{emit:r}){const n=t,_=r,o=e.reactive({leaf:{}});function l(m){return m!==void 0?w.Request.downloadUrlFor(m):"https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"}function u(m,h,s,a){_("updateItem",{item:m,articleKey:h,node:s,quantity:a})}function p(m,h,s){_("removeItem",{item:m,articleKey:h,node:s})}return e.onBeforeMount(()=>{o.leaf=n.leaf}),(m,h)=>{const s=e.resolveComponent("sl-icon"),a=e.resolveComponent("sl-button"),i=e.resolveComponent("sl-input"),d=e.resolveComponent("sl-card");return e.openBlock(),e.createElementBlock(e.Fragment,null,[e.createTextVNode(" cartleafe "),e.createVNode(d,{horizontal:"",class:"viur-shop-cart-card"},{default:e.withCtx(()=>[e.createElementVNode("img",{class:"viur-shop-cart-card-img",slot:"image",src:l(o.leaf.shop_image?o.leaf.shop_image:void 0)},null,8,M),e.createElementVNode("div",K,[e.createElementVNode("h4",U,e.toDisplayString(o.leaf.shop_name)+" | "+e.toDisplayString(t.leaf.shop_art_no_or_gtin),1)]),e.createElementVNode("div",G,[e.createElementVNode("div",P,[Z,e.createElementVNode("div",H,[e.createVNode(a,{size:"small",outline:"",class:"viur-shop-cart-card-add-to-favourites-btn",variant:"primary",title:"Add to favourites"},{default:e.withCtx(()=>[e.createVNode(s,{name:"heart",slot:"prefix"})]),_:1}),e.createVNode(a,{size:"small",outline:"",class:"viur-shop-cart-card-delete-btn",variant:"primary",title:"Remove from cart",onClick:h[0]||(h[0]=b=>p(o.leaf,o.leaf.article.dest.key,t.node))},{default:e.withCtx(()=>[e.createVNode(s,{name:"trash",slot:"prefix"})]),_:1})])]),e.createElementVNode("div",J,[e.createVNode(i,{class:"amount-input",type:"number",label:"Anzahl",placeholder:"Number",min:"0",modelValue:o.leaf.quantity,"onUpdate:modelValue":h[1]||(h[1]=b=>o.leaf.quantity=b),onInput:h[2]||(h[2]=b=>u(o.leaf,o.leaf.article.dest.key,t.node,o.leaf.quantity))},null,8,["modelValue"])]),e.createElementVNode("div",Q,[X,e.createElementVNode("div",Y,e.toDisplayString(o.leaf.price.retail)+" \u20AC ",1),v])])]),_:1})],64)}}},[["__scopeId","data-v-3f1dae7a"]]),dt="";const k=t=>(e.pushScopeId("data-v-6c25a013"),t=t(),e.popScopeId(),t),te=k(()=>e.createElementVNode("p",null,"M\xF6chten Sie den Artikel wirklich aus dem Warenkorb entfernen?",-1)),oe={class:"footer-wrap",slot:"footer"},ae={key:0},ne=k(()=>e.createElementVNode("h2",{class:"viur-shop-cart-sidebar-headline headline"},"Zusammenfassung",-1)),re=k(()=>e.createElementVNode("br",null,null,-1)),se=k(()=>e.createElementVNode("br",null,null,-1)),ce={class:"viur-shop-cart-sidebar-info-line"},le=k(()=>e.createElementVNode("span",null,"Zwischensumme",-1)),ie=k(()=>e.createElementVNode("div",{class:"viur-shop-cart-sidebar-info-line"},[e.createElementVNode("span",null,"Rabatt"),e.createTextVNode(" 0 \u20AC ")],-1)),de=k(()=>e.createElementVNode("div",{class:"viur-shop-cart-sidebar-info-line"},[e.createElementVNode("span",null,"Versandkosten"),e.createTextVNode(" 0 \u20AC ")],-1)),_e={class:"viur-shop-cart-sidebar-info-line total"},me=k(()=>e.createElementVNode("span",null,"Gesamt:",-1)),pe={class:"viur-shop-cart-sidebar-btn-wrap"};var B=y({__name:"CartView",props:{mode:{type:String,default:"basket"},cartKey:{type:String,required:!0},sidebar:{type:Boolean,default:!0}},setup(t){const r=t,n=g(),_=e.ref(null),o=e.reactive({cartIsInit:e.computed(()=>!!n.state.basketRootNode),itemsIsInit:e.computed(()=>!0),images:{},currentItem:{},currentNode:{},nodes:[],leaves:{}});e.computed(()=>r.mode==="basket"?n.state.basket:r.cartKey);async function l(){await n.updateItem(o.currentItem.article.dest.key,o.currentNode.key,0),await h(),_.value.hide()}async function u(a){console.log("updateItem :",a),a.quantity===0?(_.value.show(),o.currentItem=a.item,o.currentNode=a.node):(await n.updateItem(a.articleKey,a.node.key,a.quantity),await n.init())}function p(a){console.log("removeItem :",a),_.value.show(),o.currentItem=a.item,o.currentNode=a.node}async function m(){o.leaves[o.currentNode.key].forEach(a=>{a.key===o.currentItem.key&&(a.quantity=1)}),o.currentItem={},o.currentNode={}}async function h(){o.nodes=[],o.leaves={},await n.init(),await s()}async function s(a=r.cartKey){console.log("debug getChildren parentKey from comp: ",a);const i=await n.getChildren(a);console.log("getChildren children: ",i),i.forEach(async d=>{d.skel_type==="node"?(o.nodes.push(d),await s(d.key)):(Object.keys(o.leaves).includes(a)||(o.leaves[a]=[]),o.leaves[a].push(d))})}return e.onBeforeMount(async()=>{await n.init(),await s(),r.mode==="basket"&&o.nodes.push(n.state.basketRootNode),console.log("state.nodes test",o.nodes),console.log("state.leaves",o.leaves)}),(a,i)=>{const d=e.resolveComponent("sl-spinner"),b=e.resolveComponent("sl-button"),S=e.resolveComponent("sl-dialog"),$=e.resolveComponent("sl-input"),V=e.resolveComponent("sl-icon");return t.cartKey.length?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[e.createVNode(S,{ref_key:"confirm",ref:_,onSlHide:m},{default:e.withCtx(()=>[te,e.createElementVNode("div",oe,[e.createVNode(b,{variant:"danger",onClick:i[0]||(i[0]=N=>_.value.hide()),size:"medium"},{default:e.withCtx(()=>[e.createTextVNode(" Abbrechen ")]),_:1}),e.createVNode(b,{variant:"success",onClick:l,size:"medium"},{default:e.withCtx(()=>[e.createTextVNode(" Aus Warenkorb entfernen ")]),_:1})])]),_:1},512),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.nodes,N=>(e.openBlock(),e.createElementBlock("div",null,[Object.keys(o.leaves).includes(N.key)?(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createVNode(L,{node:N},null,8,["node"]),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.leaves[N.key],E=>(e.openBlock(),e.createBlock(ee,{key:E.key,leaf:E,node:N,onRemoveItem:p,onUpdateItem:u},null,8,["leaf","node"]))),128))],64)):e.createCommentVNode("",!0)]))),256)),t.sidebar?(e.openBlock(),e.createElementBlock("div",ae,[ne,re,e.createVNode($,{label:"Rabattcode eingeben"}),se,e.createElementVNode("div",ce,[le,e.createTextVNode(" --> "+e.toDisplayString(t.mode==="basket"?e.unref(n).state.basketRootNode.total:e.unref(n).state.whishlistRootNodes[t.cartKey].total)+" \u20AC ",1)]),ie,de,e.createElementVNode("div",_e,[me,e.createTextVNode(" "+e.toDisplayString(t.mode==="basket"?e.unref(n).state.basketRootNode.total:e.unref(n).state.whishlistRootNodes[t.cartKey].total)+" \u20AC ",1)]),e.createElementVNode("div",pe,[e.createVNode(b,{variant:"info",size:"small"},{default:e.withCtx(()=>[e.createTextVNode(" Jetzt Bestellen ")]),_:1}),e.createVNode(b,{size:"small",variant:"primary"},{default:e.withCtx(()=>[e.createVNode(V,{name:"paypal",slot:"prefix"}),e.createTextVNode(" Paypal ")]),_:1})])])):e.createCommentVNode("",!0)],64)):(e.openBlock(),e.createBlock(d,{key:0}))}}},[["__scopeId","data-v-6c25a013"]]),mt="";const c=t=>(e.pushScopeId("data-v-65081a13"),t=t(),e.popScopeId(),t),he={key:1,class:"list"},fe=c(()=>e.createElementVNode("h2",{class:"viur-shop-cart-headline headline"},"Bestellung pr\xFCfen",-1)),Ve=c(()=>e.createElementVNode("br",null,null,-1)),Ne={class:"viur-shop-cart-address-wrap"},ue={class:"viur-shop-cart-address"},be={class:"viur-shop-cart-address-headline"},ke=c(()=>e.createElementVNode("br",null,null,-1)),ye=c(()=>e.createElementVNode("br",null,null,-1)),ge=c(()=>e.createElementVNode("br",null,null,-1)),Ee=c(()=>e.createElementVNode("br",null,null,-1)),we=c(()=>e.createElementVNode("br",null,null,-1)),Ce={class:"viur-shop-cart-address"},xe={class:"viur-shop-cart-address-headline"},Be=c(()=>e.createElementVNode("br",null,null,-1)),Se=c(()=>e.createElementVNode("br",null,null,-1)),$e=c(()=>e.createElementVNode("br",null,null,-1)),Te=c(()=>e.createElementVNode("br",null,null,-1)),Ie=c(()=>e.createElementVNode("br",null,null,-1)),ze={class:"viur-shop-cart-payment"},Re=c(()=>e.createElementVNode("div",{class:"viur-shop-cart-payment-method"},[e.createElementVNode("span",null,"Zahlungsmethode:"),e.createTextVNode(" Paypal ")],-1)),qe=c(()=>e.createElementVNode("h2",{class:"viur-shop-cart-headline headline"},"Warenkorb",-1)),De=c(()=>e.createElementVNode("br",null,null,-1)),Oe=["src"],Ae={class:"viur-shop-cart-mini-cart-header",slot:"header"},Fe={class:"viur-shop-cart-mini-headline headline"},je={class:"viur-shop-cart-mini-card-body-row"},We={class:"viur-shop-cart-mini-card-body-info"},Le={class:"viur-shop-cart-mini-card-info-wrap"},Me=c(()=>e.createElementVNode("div",{class:"viur-shop-cart-mini-card-info"},[e.createElementVNode("span",null,"Anzahl: "),e.createTextVNode(" 1 ")],-1)),Ke={class:"viur-shop-cart-mini-card-info"},Ue=c(()=>e.createElementVNode("span",null,"Preis: ",-1)),Ge=c(()=>e.createElementVNode("h2",{class:"viur-shop-cart-sidebar-headline headline"},"Jetzt Bestellen",-1)),Pe=c(()=>e.createElementVNode("br",null,null,-1)),Ze={class:"viur-shop-cart-sidebar-info-line"},He=c(()=>e.createElementVNode("span",null,"Zwischensumme",-1)),Je=c(()=>e.createElementVNode("div",{class:"viur-shop-cart-sidebar-info-line"},[e.createElementVNode("span",null,"Rabatt"),e.createTextVNode(" 0 \u20AC ")],-1)),Qe=c(()=>e.createElementVNode("div",{class:"viur-shop-cart-sidebar-info-line"},[e.createElementVNode("span",null,"Versandkosten"),e.createTextVNode(" 0 \u20AC ")],-1)),Xe={class:"viur-shop-cart-sidebar-info-line total"},Ye=c(()=>e.createElementVNode("span",null,"Gesamt:",-1)),ve={class:"viur-shop-cart-sidebar-btn-wrap"};var z=y({__name:"ConfirmView",setup(t){const r=g(),n=e.reactive({cartIsInit:e.computed(()=>!!r.state.basket.length),itemsIsInit:e.computed(()=>!!r.state.carts[r.state.basket].items),images:{},showOrderButton:!1});function _(l){return w.Request.get(`/json/dk_variante/view/${l}`).then(async u=>{let p=await u.json();p=p.values;let m=p.dk_artikel.dest.image?w.Request.downloadUrlFor(p.dk_artikel.dest.image):"https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";n.images[l]=m}),n.images[l]}function o(l){l.target.checked&&(n.showOrderButton=!0),l.target.checked||(n.showOrderButton=!1)}return e.onBeforeMount(async()=>{await r.init()}),(l,u)=>{const p=e.resolveComponent("sl-icon"),m=e.resolveComponent("sl-button"),h=e.resolveComponent("sl-card"),s=e.resolveComponent("sl-checkbox");return n.cartIsInit?(e.openBlock(),e.createElementBlock("div",he,[fe,Ve,e.createElementVNode("div",Ne,[e.createElementVNode("div",ue,[e.createElementVNode("div",be,[e.createTextVNode(" Versandadresse "),e.createVNode(m,{outline:"",size:"small"},{default:e.withCtx(()=>[e.createVNode(p,{name:"pencil",slot:"prefix"})]),_:1})]),e.createTextVNode(" Roland Brose"),ke,e.createTextVNode(" Speicherstra\xDFe 33"),ye,e.createTextVNode(" 44147 Dortmund, DE"),ge,Ee,e.createTextVNode(" rb@mausbrand.de"),we,e.createTextVNode(" 0231 21 34 68 90 ")]),e.createElementVNode("div",Ce,[e.createElementVNode("div",xe,[e.createTextVNode(" Rechnungsadresse "),e.createVNode(m,{outline:"",size:"small"},{default:e.withCtx(()=>[e.createVNode(p,{name:"pencil",slot:"prefix"})]),_:1})]),e.createTextVNode(" Roland Brose"),Be,e.createTextVNode(" Speicherstra\xDFe 33"),Se,e.createTextVNode(" 44147 Dortmund, DE"),$e,Te,e.createTextVNode(" rb@mausbrand.de"),Ie,e.createTextVNode(" 0231 21 34 68 90 ")])]),e.createElementVNode("div",ze,[Re,e.createVNode(m,{outline:"",size:"small"},{default:e.withCtx(()=>[e.createVNode(p,{name:"pencil",slot:"prefix"})]),_:1})]),qe,De,(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(r).state.carts[e.unref(r).state.basket].items,a=>(e.openBlock(),e.createBlock(h,{horizontal:"",class:"viur-shop-cart-mini-card"},{default:e.withCtx(()=>[e.createElementVNode("img",{class:"viur-shop-cart-mini-card-img",slot:"image",src:_(a.article.dest.key)},null,8,Oe),e.createElementVNode("div",Ae,[e.createElementVNode("h4",Fe,e.toDisplayString(a.article.dest.shop_name)+" | 425018",1)]),e.createElementVNode("div",je,[e.createElementVNode("div",We,[e.createElementVNode("div",Le,[Me,e.createElementVNode("div",Ke,[Ue,e.createTextVNode(" "+e.toDisplayString(a.article.dest.shop_price_recommended)+" \u20AC ",1)])])])])]),_:2},1024))),256)),(e.openBlock(),e.createBlock(e.Teleport,{to:"#order_sidebar"},[Ge,Pe,e.createElementVNode("div",Ze,[He,e.createTextVNode(" "+e.toDisplayString(e.unref(r).state.carts[e.unref(r).state.basket].info.total)+" \u20AC ",1)]),Je,Qe,e.createElementVNode("div",Xe,[Ye,e.createTextVNode(" "+e.toDisplayString(e.unref(r).state.carts[e.unref(r).state.basket].info.total)+" \u20AC ",1)]),e.createVNode(s,{onSlChange:o},{default:e.withCtx(()=>[e.createTextVNode(" Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen ")]),_:1}),e.createElementVNode("div",ve,[e.createVNode(m,{variant:n.showOrderButton?"info":"disabled",size:"small",disabled:!n.showOrderButton},{default:e.withCtx(()=>[e.createTextVNode(" Zahlungspflichtig bestellen ")]),_:1},8,["variant","disabled"])])]))])):(e.openBlock(),e.createBlock(W,{key:0}))}}},[["__scopeId","data-v-65081a13"]]),ht="";const et=t=>(e.pushScopeId("data-v-f09670ea"),t=t(),e.popScopeId(),t),tt={class:"bind viur-shop-wrap"},ot={class:"viur-shop-order-step"},at={class:"viur-shop-order-status-text"},nt=et(()=>e.createElementVNode("div",{class:"viur-shop-sidebar",id:"order_sidebar"},null,-1));var rt=y({__name:"OrderView",props:{tabs:{type:Object,required:!0}},emits:["tabChange"],setup(t,{emit:r}){const n=t,_=r,o=e.reactive({tabNames:e.computed(()=>u(n.tabs)),isFirstTab:s=>s===0}),l=e.ref(null);function u(s){let a=[],i=[];for(const d in s)s[d].position?a.push([d,s[d].position]):a.push([d,0]);return a.sort((d,b)=>d[1]-b[1]),a.forEach(d=>{i.push(d[0])}),i}function p(s){_("tabChange",s)}function m(s){l.value.show(s)}function h(s){l.value.show(s)}return(s,a)=>{const i=e.resolveComponent("sl-icon"),d=e.resolveComponent("sl-tab"),b=e.resolveComponent("sl-button"),S=e.resolveComponent("sl-tab-panel"),$=e.resolveComponent("sl-tab-group");return e.openBlock(),e.createElementBlock("div",tt,[e.createVNode($,{class:"viur-shop-order-tab",noScrollControls:"",onSlTabShow:p,ref_key:"tabGroup",ref:l},{default:e.withCtx(()=>[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.tabNames,(V,N)=>(e.openBlock(),e.createBlock(d,{slot:"nav",panel:V,key:V,disabled:t.tabs[V].disabled},{default:e.withCtx(()=>[e.createElementVNode("div",ot,[e.createVNode(i,{name:t.tabs[V].icon.name,library:t.tabs[V].icon.library},null,8,["name","library"]),e.createElementVNode("div",at,e.toDisplayString(N+1)+". "+e.toDisplayString(t.tabs[V].displayName),1)]),N<o.tabNames.length-1?(e.openBlock(),e.createBlock(i,{key:0,name:"chevron-right",class:"viur-shop-order-tab-check"})):e.createCommentVNode("",!0)]),_:2},1032,["panel","disabled"]))),128)),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.tabNames,(V,N)=>(e.openBlock(),e.createBlock(S,{name:V,key:V},{default:e.withCtx(()=>[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(t.tabs[V].component),e.mergeProps({ref_for:!0},t.tabs[V].props?t.tabs[V].props:""),null,16)),N!==o.tabNames.length-1?(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass(["viur-shop-form-footer",{"flex-end":o.isFirstTab(N)}])},[e.withDirectives(e.createVNode(b,{type:"submit",onClick:E=>m(o.tabNames[N-1])},{default:e.withCtx(()=>[e.createTextVNode(" Zur\xFCck ")]),_:2},1032,["onClick"]),[[e.vShow,N!==0]]),e.createVNode(b,{type:"submit",variant:"primary",onClick:E=>h(o.tabNames[N+1])},{default:e.withCtx(()=>[e.createTextVNode(" Weiter ")]),_:2},1032,["onClick"])],2)):e.createCommentVNode("",!0)]),_:2},1032,["name"]))),128))]),_:1},512),nt])}}},[["__scopeId","data-v-f09670ea"]]),Vt="",Nt="",ut="";const R={__name:"ExampleUsage",setup(t){const r=g(),n=e.computed(()=>r.state.basketRootNode.key?r.state.basketRootNode.key:""),_=e.reactive({rootNode:{},tabs:{cart:{component:e.shallowRef(B),props:{sidebar:!0,mode:"basket",cartKey:n},displayName:"Warenkorb",icon:{name:"cart",library:"hsk"},position:2,disabled:!1,atShow:null,atHide:null}}});function o(l){(l==null?void 0:l.detail.name)==="confirm"&&(_.tabs.orderComplete.disabled=!1)}return e.onBeforeMount(async()=>{await r.init(),await r.getAdressStructure(),console.log("debug init exampleusage :",r.state.basketRootNode)}),(l,u)=>(e.openBlock(),e.createBlock(rt,{tabs:_.tabs,onTabChange:o},null,8,["tabs"]))}},st={install(t){t.component("CartView",B),t.component("ExampleUsage",R),t.component("ConfirmView",z)}};f.CartView=B,f.ConfirmView=z,f.ExampleUsage=R,f.default=st,f.useCartStore=g,Object.defineProperties(f,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
