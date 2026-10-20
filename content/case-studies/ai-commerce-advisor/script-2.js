__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const onView=(el,fn,th=.35)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const visible=(el,cb)=>{ new IntersectionObserver(es=>cb(es[0].isIntersecting),{threshold:.15}).observe(el); };
const money=v=>'$'+v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

/* reveal: motion only, content readable at rest */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.12});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* HERO: a sentence becomes context; the catalog narrows to two */
(()=>{ const parts=[['We’re heading to ',0],['Yellowstone',1],[' in ',0],['August',1],[' with ',0],['my wife',1],['. I hear it ',0],['rains',1],[' then. Budget’s about ',0],['$2,000',1],['.',0]];
  const chips=['Yellowstone','August','2 people','Rain-ready','$2,000 budget'];
  const say=$('#say'),row=$('#ichips'),tiles=$('#tiles'),pair=$('#pair'),catn=$('#catn'),catl=$('#catl');
  tiles.innerHTML='<i></i>'.repeat(128); const T=[...tiles.children];
  const keep=[37,90];
  const finalState=()=>{ say.innerHTML=parts.map(p=>p[1]?`<mark class="hit">${p[0]}</mark>`:p[0]).join(''); row.innerHTML='<span class="k">Context</span>'+chips.map(c=>`<span class="ac-chip"><i></i>${c}</span>`).join(''); T.forEach((t,i)=>t.className=keep.includes(i)?'keep':'out'); pair.classList.add('on'); tiles.style.opacity=.25; catn.textContent='2 that fit'; catl.textContent='Live catalog'; };
  let vis=true; visible($('#intent'),v=>vis=v);
  async function loop(){ while(true){
      say.innerHTML='<span class="ac-caret"></span>'; row.innerHTML='<span class="k">Context</span>'; T.forEach(t=>t.className=''); pair.classList.remove('on'); tiles.style.opacity=1; catn.textContent='every product';
      let html=''; for(const [txt,hit] of parts){ for(const ch of txt){ html+=ch; say.innerHTML=(html)+'<span class="ac-caret"></span>'; await sleep(22); } if(hit){ html=html.slice(0,-txt.length)+`<mark>${txt}</mark>`; } }
      say.innerHTML=html; await sleep(400);
      const marks=$$('#say mark'); let order=[...T.keys()].filter(i=>!keep.includes(i)).sort(()=>Math.random()-.5); const per=Math.ceil(order.length/5);
      for(let k=0;k<5;k++){ marks[k].classList.add('hit'); const c=document.createElement('span'); c.className='ac-chip'; c.innerHTML='<i></i>'+chips[k]; row.appendChild(c);
        order.slice(k*per,(k+1)*per).forEach(i=>T[i].classList.add('out')); catn.textContent=['narrowing…','narrowing…','narrowing…','a handful','2 that fit'][k]; await sleep(650); }
      keep.forEach(i=>T[i].classList.add('keep')); await sleep(500); tiles.style.opacity=.25; pair.classList.add('on');
      await sleep(5200); while(!vis) await sleep(500); } }
  if(RM) finalState(); else { finalState(); setTimeout(loop,700); }
})();

/* PROBLEM: what keyword search hears */
(()=>{ const EX=[
   {w:[['waterproof',0],['tent',1],['for',0],['Yellowstone',0],['in',0],['August,',0],['2',0],['people,',0],['under',0],['$2,000',0]],heard:'tent',ign:'Waterproof, Yellowstone, August, 2 people, budget'},
   {w:[['quiet',0],['ergonomic',0],['home',0],['office',0],['setup',0],['under',0],['$800',0],['for',0],['calls',0],['desk',1]],heard:'desk',ign:'Quiet, ergonomic, home office, $800, calls'},
   {w:[['first',0],['hiking',0],['kit,',0],['beginner,',0],['day',0],['trips',0],['in',0],['spring',0],['boots',1]],heard:'boots',ign:'First kit, beginner, day trips, spring'}];
  const btn=$$('#search .ex button'),sq=$('#sq'),heard=$('#heard'),ign=$('#ignored'),wall=$('#wall');
  wall.innerHTML='<div class="c"><i></i><b></b><b></b></div>'.repeat(48);
  let run=0,user=false;
  async function show(i){ const id=++run; btn.forEach((b,k)=>b.classList.toggle('on',k===i)); const e=EX[i];
    sq.innerHTML=e.w.map(([t])=>`<span class="ac-w">${t}</span>`).join(' '); heard.textContent='…'; ign.textContent='';
    const ws=$$('#sq .ac-w'); await sleep(RM?0:600);
    for(let k=0;k<ws.length;k++){ if(id!==run) return; ws[k].classList.add(e.w[k][1]?'hit':'ign'); await sleep(RM?0:140); }
    heard.textContent='“'+e.heard+'”'; ign.textContent='Ignored: '+e.ign; }
  btn.forEach(b=>b.addEventListener('click',()=>{ user=true; show(+b.dataset.i); }));
  show(0); let k=0; onView($('#search'),()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); k=(k+1)%3; show(k); },5200); },.4);
  // carts
  const cr=$('#cartrow'); const cart='<svg viewBox="0 0 24 24"><path d="M3 4h2l2.4 11h11l2-8H6.2"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>';
  cr.innerHTML=cart.repeat(10); const cs=[...cr.children];
  onView($('#carts'),async()=>{ const gone=[0,2,3,5,6,8,9]; for(const i of gone){ cs[i].classList.add('gone'); await sleep(RM?0:260); } },.5);
})();

/* COMPLICATION: turns hop between containers */
(()=>{ const TURNS=[{l:'Trip details',set:{trip:'Yellowstone, Aug'}},{l:'Budget',set:{budget:'$2,000'}},{l:'Compare',set:{pick:'North Face 777'}},{l:'Add to cart',set:{cart:'1 tent'}},{l:'Check out',set:{}}];
  const ROUTE=[0,1,1,2,0]; const KEYS=[['trip','Trip'],['budget','Budget'],['pick','Better pick'],['cart','Cart']];
  const tu=$('#turns'),cs=$$('#conts .ac-cont'),shelf=$('#shelf'),sst=$('#shelfst'),btn=$$('#hop .seg button');
  tu.innerHTML=TURNS.map((t,i)=>`<div class="ac-turn"><b>Turn ${i+1} → ${'ABC'[ROUTE[i]]}</b>${t.l}</div>`).join(''); const tdiv=[...tu.children];
  let mode='mem',run=0,user=false;
  const rows=(st,lostAll,final)=>KEYS.map(([k,l])=>{ const v=st[k]; if(v) return `<div><span>${l}</span><b>${v}</b></div>`; return lostAll?`<div class="lost"><span>${l}</span><span>lost</span></div>`:`<div><span>${l}</span><span>—</span></div>`; }).join('')+(final||'');
  async function play(m){ const id=++run; mode=m; btn.forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===m)); shelf.classList.toggle('off',m==='mem'); sst.textContent=m==='mem'?'Not used':'Read and written every turn';
    tdiv.forEach(t=>t.classList.remove('on')); cs.forEach(c=>{ c.classList.remove('act'); c.querySelector('div').innerHTML='<span class="demo-note">Idle</span>'; });
    const local=[{},{},{}], global={};
    for(let i=0;i<TURNS.length;i++){ if(id!==run) return; await sleep(RM?0:1100); if(id!==run) return;
      const c=ROUTE[i]; tdiv.forEach((t,k)=>t.classList.toggle('on',k===i)); cs.forEach((x,k)=>x.classList.toggle('act',k===c));
      Object.assign(local[c],TURNS[i].set); Object.assign(global,TURNS[i].set);
      let st,html;
      if(m==='mem'){ st=local[c]; const missing=KEYS.some(([k])=>global[k]&&!st[k]);
        const fin=i===4?(st.cart?'<div class="ok">Checkout ready</div>':'<div class="lost">Checkout failed: cart is empty</div>'):(missing?'<div class="lost">Context from earlier turns is gone</div>':'');
        html=rows(st,false,fin).replace(/<div><span>(Trip|Budget|Better pick|Cart)<\/span><span>—<\/span><\/div>/g,(s,l)=>{ const k=KEYS.find(x=>x[1]===l)[0]; return global[k]?`<div class="lost"><span>${l}</span><span>lost</span></div>`:s; });
      } else { st={...global}; html=rows(st,false,i===4?'<div class="ok">Checkout ready</div>':''); $$('#shelf div').forEach(d=>{ d.classList.add('flash'); setTimeout(()=>d.classList.remove('flash'),500); }); }
      cs[c].querySelector('div').innerHTML=`<div class="ac-state">${html}</div>`;
    }
    if(!user&&id===run){ await sleep(2600); if(!user&&id===run) play(m==='mem'?'persist':'mem'); }
  }
  btn.forEach(b=>b.addEventListener('click',()=>{ user=true; play(b.dataset.v); }));
  if(RM) play('persist'); else onView($('#hop'),()=>play('mem'),.35);
})();

/* RESOLUTION: agent anatomy */
(()=>{ const N={
   ui:['React storefront','The customer-facing app. It shows the chat plus whatever panel the agent asks for: search results, a comparison, the cart or checkout, and context pills.','In the demo: the pills “August · Yellowstone · $2,000 budget” and every product card.'],
   api:['FastAPI','The API around the agent. One entry point receives each message; simple cart buttons can skip the model and go straight to the cart tools.','In the demo: every turn arrives here over WebSocket from the storefront.'],
   orch:['Orchestrator agent','Claude Sonnet 4.6, orchestrated with the Strands SDK and running on AWS Bedrock AgentCore. It reads the conversation, decides which tools to call and writes the reply, keeping a 20-turn sliding window of context.','In the demo: it decided to compare on weight, not price, because the customer said “easy to carry”.'],
   research:['Research agent','Searches the product catalog for the right handful, and falls back to a Bedrock Knowledge Base when needed.','In the demo: two tents, then two backpacks, never hundreds.'],
   profile:['Profile agent','Reads and updates the returning-customer profile: location, group size, season, experience and past purchases, plus loyalty grade.','In the demo: “Given your last trip to Antarctica…” in the very first message.'],
   cart:['Cart & checkout tools','Deterministic tools for add, remove, clear, prepare checkout and checkout, including bundle and loyalty discounts.','In the demo: three tents recalculated instantly, and two discounts itemised at checkout.'],
   panel:['Panel tools','Silent tools that tell the storefront what to draw: which panel, the budget, the destination, the better pick and which comparison attributes to show.','In the demo: the “Best pick” badge and the five comparison rows.'],
   s3:['Amazon S3','Holds the conversation history turn by turn, and the product catalog.','In the demo: the chat history survives even when turns run in different containers.'],
   dsess:['DynamoDB · session','Session metadata: budget, destination, group size, month, experience, search results and the better pick.','In the demo: the $2,000 budget is remembered all the way to checkout.'],
   dcart:['DynamoDB · cart','Cart sessions with transactional operations.','In the demo: the live budget tracker updates as items change.'],
   kb:['Knowledge Base','A Bedrock Knowledge Base on S3 Vectors with Titan embeddings, tuned for retrieval relevance.','In the demo: grounds product research when catalog search needs backup.']};
  const box=$('#ninfo'),nodes=$$('#map .ac-node');
  function show(k){ nodes.forEach(n=>n.classList.toggle('on',n.dataset.n===k)); const n=N[k]; box.innerHTML=`<span class="eyebrow">Component</span><h3>${n[0]}</h3><p>${n[1]}</p><div class="used">${n[2]}</div>`; }
  let user=false; nodes.forEach(n=>n.addEventListener('click',()=>{ user=true; show(n.dataset.n); }));
  show('orch'); const order=['orch','research','panel','cart','profile','dsess','s3']; let i=0;
  onView($('#map'),()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); i=(i+1)%order.length; show(order[i]); },3000); },.4);
})();

/* DEMO: from hello to checkout */
const IMGP={tentG:'/images/case-studies/ac-p-tent-garmin.webp',tentN:'/images/case-studies/ac-p-tent-northface.webp',pack:'/images/case-studies/ac-p-backpack.webp'};
(()=>{ const B=2000;
  const card=(img,n,tag,r,p,best)=>`<div class="ac-pc${best?' best':''}">${best?'<span class="ac-best">Best pick</span>':''}<img src="${IMGP[img]}" alt="${n}"><div class="in"><b>${n}</b><span class="t">${tag}</span><span class="r">${'★'.repeat(Math.round(r))} ${r}</span><strong>${money(p)}</strong></div></div>`;
  const li=(img,n,q,p,isNew)=>`<div class="ac-li${isNew?' new':''}">${img?`<img src="${IMGP[img]}" alt="">`:'<span class="ph">💧</span>'}<span><b>${n}</b><small>Qty ${q}</small></span><span>${money(p)}</span></div>`;
  const budget=(spent)=>`<div class="ac-budget"><div style="display:flex;justify-content:space-between"><span>Budget remaining: <b>${money(B-spent)}</b></span><span>of ${money(B)}</span></div><div class="tr"><i style="width:${(spent/B*100).toFixed(1)}%"></i></div></div>`;
  const cartP=(items,sub,newIdx)=>`<h4>Your cart <small>panel_type: "cart"</small></h4><div class="ac-cart">${items.map((x,i)=>li(...x,i===newIdx)).join('')}<div class="ac-sum"><div><span>Subtotal</span><span>${money(sub)}</span></div><div><span>Shipping</span><span>FREE</span></div><div class="tot"><span>Total</span><span>${money(sub)}</span></div></div>${budget(sub)}</div>`;
  const coP=(items,sub,bd,ld,tot,last,newIdx)=>`<h4>Checkout <small>panel_type: "checkout"</small></h4><div class="ac-cart">${items.map((x,i)=>li(...x,i===newIdx)).join('')}<div class="ac-sum"><div><span>Subtotal</span><span>${money(sub)}</span></div><div class="disc"><span>Bundle discount (10%)</span><span>−${money(bd)}</span></div><div class="disc"><span>Loyalty discount (5%)</span><span>−${money(ld)}</span></div><div class="tot"><span>Total</span><span>${money(tot)}</span></div></div>${budget(tot)}</div>${last?`<div class="ac-last"><span style="font-size:1.2rem">💧</span><span><b>Aquatabs water purification</b><br>Essential for backcountry safety · $12.00 each</span><span class="btn2">Add to order</span></div>`:''}`;
  const T1=['tentN','The North Face Tent 777',1,281.65], PK=['pack','Hydro Flask Backpack 535',1,153.55], T3=['tentN','The North Face Tent 777',3,844.95], AQ=[null,'Aquatabs water purification',2,24.00];
  const S=[
   {u:null,a:'Welcome back! Great to have you here again. Given your last epic trip to <b>Antarctica</b>, are you planning something equally bold this time, or somewhere a little warmer?',pills:[],loop:[],memo:true,
    panel:`<h4>Customer profile <small>loaded from DynamoDB</small></h4><div class="ac-cart"><div class="ac-sum" style="border:0;padding:0"><div><span>Returning customer</span><b style="color:#1f8a5c">Yes</b></div><div><span>Loyalty grade</span><b>A</b></div><div><span>Last trip</span><b>Antarctica</b></div></div></div><p class="demo-note">Recognised from the first message. Loyalty details are saved for checkout.</p>`,
    json:{panel_type:null,returning_customer:true,loyalty_grade:'A'},cap:'Turn 1 · the agent remembers'},
   {u:'We’re going again, this time to Yellowstone in August. I hear it rains that time of year.',a:'Yellowstone in August sounds incredible. And yes, <b>afternoon rain showers are common</b> then, so let’s start with a solid waterproof tent. How many people, and do you have a budget in mind?',pills:['August','Yellowstone'],loop:[0],
    panel:`<div class="ac-empty">Context captured from one sentence.<br>No form, no dropdown.</div>`,json:{panel_type:null,context_pills:['August','Yellowstone']},cap:'Turn 2 · intent understood'},
   {u:'Me and my wife. I’m thinking around $2,000 for the whole trip.',a:'Perfect. Here are two tents that fit your trip and budget. I’d lean towards <b>The North Face Tent 777</b>.',pills:['August','Yellowstone','$2,000 budget'],loop:[1,3],
    panel:`<h4>Recommended products <small>panel_type: "search"</small></h4><div class="ac-cards2">${card('tentG','Garmin Tent 327','backpacking',4.6,215.79)}${card('tentN','The North Face Tent 777','family trips',4.2,281.65,1)}</div>`,
    json:{panel_type:'search',context_pills:['August','Yellowstone','$2,000 budget'],products:'[2 items]',better_pick_product_name:'The North Face Tent 777',budget_callout:65.86},cap:'Turn 3 · the right handful'},
   {u:'I need something easy to carry that I can use on future trips. Can you compare these two?',a:'The biggest difference is <b>weight</b>: 65 oz vs 74.8 oz, noticeably easier on future hikes, and the North Face is sturdier. For Yellowstone and beyond, I’d go with <b>The North Face Tent 777</b>. Shall I add it and move on to the next essential?',pills:['August','Yellowstone','$2,000 budget'],loop:[2,3],
    panel:`<h4>Head-to-head comparison <small>panel_type: "comparison"</small></h4><table class="ac-cmp"><thead><tr><th></th><th>Garmin Tent 327</th><th>North Face Tent 777</th></tr></thead><tbody><tr><td>Price</td><td>$215.79</td><td>$281.65</td></tr><tr><td>Weight</td><td>74.8 oz</td><td class="w">65 oz</td></tr><tr><td>Capacity</td><td>6-person</td><td>4-person</td></tr><tr><td>Season</td><td>3-season</td><td>3-season</td></tr><tr><td>Best for</td><td>Day trips, festivals, backpacking</td><td class="w">Backpacking, hiking, family trips</td></tr></tbody></table>`,
    json:{panel_type:'comparison',comparison_attributes:['price','weight','capacity','season','best_for'],better_pick_product_name:'The North Face Tent 777'},cap:'Turn 4 · compared on what matters'},
   {u:'Yes, add it and show me some backpacks.',a:'Added. Here are two backpacks for the trip; the <b>Hydro Flask Backpack 535</b> is my pick for camping.',pills:['August','Yellowstone','$2,000 budget'],loop:[4,1,3],
    panel:`<h4>Recommended products <small>panel_type: "search"</small></h4><div class="ac-cards2">${card('pack','MSR Backpack 481','hiking',4.7,108.09)}${card('pack','Hydro Flask Backpack 535','camping',4,153.55,1)}</div><div class="ac-cart">${li(...T1,true)}</div>`,
    json:{panel_type:'search',cart:{items:1,subtotal:281.65},better_pick_product_name:'Hydro Flask Backpack 535'},cap:'Turn 5 · next logical item'},
   {u:'Add the Hydro Flask Backpack 535.',a:'The Hydro Flask Backpack 535 is in your cart. With your tent and pack sorted, <b>a good sleeping bag</b> would be the next essential. Want to see some options?',pills:['August','Yellowstone','$2,000 budget'],loop:[4,3],
    panel:cartP([T1,PK],435.20,1),json:{panel_type:'cart',cart:{items:2,subtotal:435.20},budget_remaining:1564.80},cap:'Turn 6 · live budget'},
   {u:'My neighbours are joining us. Can you add two more tents?',a:'Done: two more North Face Tent 777s added, <b>three in total</b> for the group. With a bigger group, sleeping bags would be a great next step.',pills:['August','Yellowstone','$2,000 budget'],loop:[4],
    panel:cartP([T3,PK],998.50,0),json:{panel_type:'cart',cart:{items:2,quantity_tents:3,subtotal:998.50},budget_remaining:1001.50},cap:'Turn 7 · the cart follows the conversation'},
   {u:'Looks good, let’s check out.',a:'Here’s your checkout. As a returning customer you get a <b>10% bundle discount</b> and a <b>5% loyalty discount</b>. One last thing: water purification tablets are essential for backcountry safety. Add them?',pills:['August','Yellowstone','$2,000 budget'],loop:[4],memo:true,
    panel:coP([T3,PK],998.50,99.85,44.93,853.72,true),json:{panel_type:'checkout',cart:{subtotal:998.50,bundle_discount:99.85,loyalty_discount_pct:5,loyalty_discount_amount:44.93,total:853.72},last_mile_recommendation:'Aquatabs Water Purification'},cap:'Turn 8 · rewarded at checkout'},
   {u:'Sure.',a:'Added. Your total is <b>$874.24</b>, with <b>$1,125.76</b> of your $2,000 budget still left. Ready to continue to shipping?',pills:['August','Yellowstone','$2,000 budget'],loop:[4],
    panel:coP([AQ,T3,PK],1022.50,102.25,46.01,874.24,false,0),json:{panel_type:'checkout',cart:{subtotal:1022.50,bundle_discount:102.25,loyalty_discount_amount:46.01,total:874.24},budget_remaining:1125.76},cap:'Turn 9 · one “sure” to the final pick'}];
  const chat=$('#chat'),panel=$('#panel'),pills=$('#pills'),json=$('#json'),loop=$$('#loop li'),memo=$('#memo'),dots=$('#dots'),cap=$('#dcap'),play=$('#dplay');
  dots.innerHTML=S.map((_,i)=>`<button type="button" aria-label="Turn ${i+1}">${i+1}</button>`).join(''); const D=[...dots.children];
  const fmt=(o,ind='')=>{ const pad=ind+'  '; return '{\n'+Object.entries(o).map(([k,v])=>{ let val; if(v===null) val='<span class="n">null</span>'; else if(typeof v==='number'||typeof v==='boolean') val=`<span class="n">${v}</span>`; else if(Array.isArray(v)) val='['+v.map(x=>`<span class="s">"${x}"</span>`).join(', ')+']'; else if(typeof v==='object') val=fmt(v,pad); else val=`<span class="s">"${v}"</span>`; return `${pad}<span class="k">"${k}"</span>: ${val}`; }).join(',\n')+'\n'+ind+'}'; };
  let cur=-1,auto=!RM,timer=null;
  function go(i){ cur=Math.max(0,Math.min(S.length-1,i)); const s=S[cur];
    chat.innerHTML=S.slice(0,cur+1).map((x,k)=>(x.u?`<div class="ac-m u"${k<cur?' style="animation:none"':''}>${x.u}</div>`:'')+`<div class="ac-m a"${k<cur?' style="animation:none"':''}>${x.a}</div>`).join('');
    chat.scrollTop=chat.scrollHeight;
    const prev=cur>0?S[cur-1].pills:[]; pills.innerHTML=s.pills.length?s.pills.map(p=>`<span class="p"${prev.includes(p)?' style="animation:none"':''}>${p}</span>`).join(''):'<span class="hint">Context pills appear here as the customer talks</span>';
    panel.innerHTML=s.panel; loop.forEach((l,k)=>l.classList.toggle('on',s.loop.includes(k))); memo.classList.toggle('on',!!s.memo);
    json.innerHTML=`<div class="h">// ChatResponse · turn ${cur+1}</div><div>${fmt(s.json)}</div>`;
    D.forEach((d,k)=>d.classList.toggle('on',k===cur)); cap.textContent=s.cap; }
  const next=()=>{ if(cur>=S.length-1){ go(0); } else go(cur+1); };
  function setAuto(a){ auto=a; play.textContent=a?'❚❚ Pause':'▶ Play'; clearInterval(timer); if(a) timer=setInterval(()=>{ if(vis) next(); },5200); }
  let vis=false; visible($('#app'),v=>vis=v);
  $('#dprev').onclick=()=>{ setAuto(false); go(cur-1); }; $('#dnext').onclick=()=>{ setAuto(false); go(cur+1); }; play.onclick=()=>setAuto(!auto);
  D.forEach((d,k)=>d.addEventListener('click',()=>{ setAuto(false); go(k); }));
  go(RM?S.length-1:0); if(!RM) onView($('#app'),()=>setAuto(true),.3); else setAuto(false);
})();

/* RETURNING: first message on a second visit + receipt */
(()=>{ const btn=$$('#visit .seg button'),vc=$('#vchat'),vp=$('#vprof'); let run=0,user=false;
  const M=(c,t)=>`<div class="ac-m ${c}">${t}</div>`;
  async function show(m){ const id=++run; btn.forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===m));
    vc.innerHTML=''; vp.innerHTML='';
    if(m==='std'){ vc.innerHTML=M('a','Hi! How can I help you today?'); await sleep(RM?0:700); if(id!==run) return; vc.innerHTML+=M('u','We’re going camping again.'); await sleep(RM?0:700); if(id!==run) return; vc.innerHTML+=M('a','Great! Try searching our catalog for tents, sleeping bags and more.');
      vp.innerHTML='<h5>customer profile</h5><div class="none">No profile. Every visit starts from zero.</div><div class="none">No loyalty reward at checkout.</div>'; }
    else { vp.innerHTML='<h5>DynamoDB · profile#customer</h5>'; const rows=[['Returning customer','Yes'],['Loyalty grade','A'],['Last trip','Antarctica'],['Past purchases','Kept and de-duplicated'],['Checkout reward','5% loyalty discount']];
      for(const [k,v] of rows){ if(id!==run) return; vp.innerHTML+=`<div><span>${k}</span><b>${v}</b></div>`; await sleep(RM?0:260); }
      vc.innerHTML=M('a','Welcome back! Given your last epic trip to <b>Antarctica</b>, are you planning something equally bold this time, or somewhere a little warmer?'); }
    if(!user&&id===run){ await sleep(4200); if(!user&&id===run) show(m==='std'?'ai':'std'); } }
  btn.forEach(b=>b.addEventListener('click',()=>{ user=true; show(b.dataset.v); }));
  onView($('#visit'),()=>show(RM?'ai':'std'),.4);
  vp.innerHTML='<h5>DynamoDB · profile#customer</h5><div><span>Returning customer</span><b>Yes</b></div><div><span>Loyalty grade</span><b>A</b></div><div><span>Last trip</span><b>Antarctica</b></div>';
  vc.innerHTML=M('a','Welcome back! Given your last epic trip to <b>Antarctica</b>, are you planning something equally bold this time, or somewhere a little warmer?');
  // receipt
  const R=[['h','CAMPGEAR · ORDER'],['s','Returning customer · loyalty grade A'],['l','North Face Tent 777 ×3','$844.95'],['l','Hydro Flask Backpack 535','$153.55'],['l','Aquatabs water purification ×2','$24.00'],['r'],['l','Subtotal','$1,022.50'],['d','Bundle discount (10%)','−$102.25'],['d','Loyalty discount (5%)','−$46.01'],['r'],['t','Total','$874.24'],['l','Budget','$2,000.00'],['m','Budget remaining','$1,125.76']];
  const rc=$('#receipt');
  const line=x=>x[0]==='h'?`<h5>${x[1]}</h5>`:x[0]==='s'?`<div class="sub">${x[1]}</div>`:x[0]==='r'?'<div class="rule"></div>':`<div class="ln ${({d:'disc',t:'tot',m:'rem'})[x[0]]||''}"><span>${x[1]}</span><span>${x[2]}</span></div>`;
  async function print(){ rc.innerHTML=''; for(const x of R){ rc.insertAdjacentHTML('beforeend',line(x)); await sleep(RM?0:230); } rc.insertAdjacentHTML('beforeend','<button type="button" id="reprint">↺ Print again</button>'); $('#reprint').onclick=print; }
  rc.innerHTML=R.map(line).join(''); onView(rc,print,.4);
})();

/* PROOF lightbox */
(()=>{ const lb=$('#lb'),img=$('#lbimg'),capt=$('#lbcap'); let last=null;
  $$('#proof button').forEach(b=>b.addEventListener('click',()=>{ last=b; const i=b.querySelector('img'); img.src=i.src; img.alt=i.alt; capt.textContent=b.querySelector('span').textContent; lb.hidden=false; $('#lbx').focus(); }));
  const close=()=>{ lb.hidden=true; last&&last.focus(); };
  $('#lbx').onclick=close; lb.addEventListener('click',e=>{ if(e.target===lb) close(); }); addEventListener('keydown',e=>{ if(e.key==='Escape'&&!lb.hidden) close(); });
})();

/* DIFFERENT: flip cards */
(()=>{ const P=[['Matches keywords','Understands intent'],['Returns hundreds of results','Surfaces the right handful'],['No sense of context','Compares on what matters'],['Waits to be asked','Flags the better pick, proactively'],['Same for everyone','Guides all the way to checkout']];
  const box=$('#flips'); box.innerHTML=P.map(([a,b])=>`<button type="button" class="ac-flip" aria-pressed="false"><span class="in"><span class="f"><small>Traditional search</small><b>${a}</b><span class="hint">Tap to flip</span></span><span class="b"><small>AI Commerce Advisor</small><b>${b}</b><span class="hint">Tap to flip back</span></span></span></button>`).join('');
  const F=$$('#flips .ac-flip'); F.forEach(f=>f.addEventListener('click',()=>{ f.classList.toggle('on'); f.setAttribute('aria-pressed',f.classList.contains('on')); }));
  onView(box,()=>F.forEach((f,i)=>setTimeout(()=>{ f.classList.add('on'); f.setAttribute('aria-pressed','true'); },RM?0:500+i*450)),.4);
})();

/* RESULTS: basket growth + always-on */
(()=>{ const svg=$('#bchart'); const D=[['Tent',281.65],['+ Backpack',435.20],['3 tents',998.50],['+ Water tablets',1022.50],['After discounts',874.24]];
  const W=560,H=300,L=56,Rr=16,T=24,Bm=46,max=2000; const x0=L,w=(W-L-Rr)/D.length; const y=v=>T+(H-T-Bm)*(1-v/max);
  let h=''; [0,500,1000,1500,2000].forEach(v=>{ h+=`<line x1="${L}" x2="${W-Rr}" y1="${y(v)}" y2="${y(v)}" stroke="#e3e7ef"/><text x="${L-8}" y="${y(v)+4}" text-anchor="end" font-family="Montserrat,Arial,sans-serif" font-size="11" fill="#646c7e">$${v.toLocaleString()}</text>`; });
  h+=`<line x1="${L}" x2="${W-Rr}" y1="${y(2000)}" y2="${y(2000)}" stroke="#0f256e" stroke-dasharray="5 4" stroke-width="1.5"/><text x="${W-Rr}" y="${y(2000)-6}" text-anchor="end" font-family="Montserrat,Arial,sans-serif" font-size="11" font-weight="700" fill="#0f256e">$2,000 budget</text>`;
  D.forEach(([l,v],i)=>{ const bx=x0+i*w+w*.18,bw=w*.64,last=i===D.length-1; h+=`<rect class="bb" data-v="${v}" x="${bx}" width="${bw}" y="${y(0)}" height="0" fill="${last?'#3dbe8b':'#204ecf'}"/><text class="bl" x="${bx+bw/2}" y="${y(v)-7}" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="11.5" font-weight="700" fill="#0f256e" opacity="0">${money(v)}</text><text x="${bx+bw/2}" y="${H-Bm+18}" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="11" fill="#2b3245">${l}</text>`; });
  svg.innerHTML=h; const bars=[...svg.querySelectorAll('.bb')],labs=[...svg.querySelectorAll('.bl')];
  const grow=(b,l)=>{ const v=+b.dataset.v; b.style.y=y(v)+'px'; b.style.height=(y(0)-y(v))+'px'; l.setAttribute('opacity',1); };
  bars.forEach(b=>b.style.transition='y .8s cubic-bezier(.2,.8,.2,1),height .8s cubic-bezier(.2,.8,.2,1)');
  if(RM) bars.forEach((b,i)=>grow(b,labs[i])); else { bars.forEach((b,i)=>grow(b,labs[i])); onView(svg,()=>{ bars.forEach((b,i)=>{ b.style.y=y(0)+'px'; b.style.height='0px'; labs[i].setAttribute('opacity',0); }); requestAnimationFrame(()=>requestAnimationFrame(()=>bars.forEach((b,i)=>setTimeout(()=>grow(b,labs[i]),i*320)))); },.4); }
  const a=$('#agent24'); onView(a,()=>{ a.style.width='100%'; },.5); if(RM) a.style.width='100%';
})();
