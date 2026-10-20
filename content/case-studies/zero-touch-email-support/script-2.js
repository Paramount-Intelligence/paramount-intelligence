__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
const onView=(el,fn,th=.3)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const segBind=(root,attr,cb)=>{ const B=[...root.querySelectorAll('button['+attr+']')]; B.forEach(b=>b.addEventListener('click',()=>{ B.forEach(x=>x.setAttribute('aria-pressed',x===b)); cb(b.getAttribute(attr),true); })); return v=>{ B.forEach(x=>x.setAttribute('aria-pressed',x.getAttribute(attr)===v)); }; };
const fmt=n=>Math.round(n).toLocaleString('en-US');
const toDet=el=>{ if(matchMedia('(max-width:900px)').matches) el.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'}); };

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.08});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* HERO */
(()=>{ const F=[['Billing','Why is my bill higher this month?',1],['Service','Internet slow since yesterday',1],['General','What is in the monthly 4G bundle?',1],['Complaint','Third time reporting this, unacceptable',0],['Billing','Need a copy of my last invoice',1],['Account security','SIM changed without my request',0],['Service','How do I reset my router?',1],['General','Roaming rates for UAE?',1]];
  const feed=$('#hfeed'),k=$('#hk'); let a=1840,e=412;
  const kp=()=>{ k.innerHTML=`<div><b>${fmt(a)}</b><span>resolved with zero touch</span></div><div class="r"><b>${fmt(e)}</b><span>escalated to agents</span></div><div class="m"><b>Seconds</b><span>to a first reply</span></div>`; };
  const item=f=>`<div class="tz-hi ${f[2]?'a':'e'}"><span class="iv-chip ${f[2]?'neu':'risk'}">${f[0]}</span><b>${esc(f[1])}</b><em>${f[2]?'✓ auto-replied':'→ agent'}</em></div>`;
  kp();
  if(RM){ feed.innerHTML=F.slice(0,5).map(item).join(''); return; }
  (async()=>{ for(let i=0;;i=(i+1)%F.length){ const f=F[i]; feed.insertAdjacentHTML('afterbegin',item(f).replace('tz-hi','tz-hi in')); const el=feed.firstElementChild; if(feed.children.length>5) feed.lastChild.remove(); await sleep(700); el.classList.remove('in'); if(f[2]) a++; else e++; kp(); await sleep(900); } })();
})();

/* PROBLEM: one day of email */
(()=>{ const SH=[.2,.15,.1,.1,.15,.3,.5,.8,1.0,1.1,1.2,1.15,1.0,.95,1.0,1.05,1.1,1.2,1.3,1.25,1.0,.7,.45,.3],C=100,AUTO=.7;
  const cap=h=>h>=8&&h<20?C:40; const r=$('#drange'),svg=$('#dchart'); let mode='man',user=false;
  const ST=['Read','Classify','Draft reply','Route ticket'];
  function sim(){ const P=+r.value/10,mx=Math.max(...SH); let b=0,peak=0,wait=0; const B=[];
    for(let h=0;h<24;h++){ const d=SH[h]/mx*P*C; const need=mode==='man'?d:d*(1-AUTO); b=Math.max(0,b+need-cap(h)); B.push(b); peak=Math.max(peak,b); wait=Math.max(wait,b/cap(h)); }
    return {B,peak,wait}; }
  function draw(){ const {B,peak,wait}=sim(),MAXY=1400,y=v=>118-Math.min(v,MAXY)/MAXY*112,x=i=>i*300/23;
    $('#dnum').textContent=(+r.value/10).toFixed(1)+'×';
    svg.innerHTML=`<rect x="${8*300/23}" y="0" width="${12*300/23}" height="120" fill="rgba(125,8,63,.06)"/><text x="${8*300/23+3}" y="10" font-size="7" fill="#6b5862">agents on shift</text><polygon points="0,118 ${B.map((v,i)=>`${x(i)},${y(v)}`).join(' ')} 300,118" fill="${mode==='man'?'var(--cr)':'var(--cp)'}" opacity=".85"/>`;
    $('#dpeak').textContent=fmt(peak); $('#dwait').textContent=mode==='man'?(wait<1?Math.round(wait*60)+' min':wait.toFixed(1)+' h'):(wait<.02?'Seconds':Math.max(1,Math.round(wait*60))+' min'); $('#dhand').textContent=mode==='man'?'100%':Math.round((1-AUTO)*100)+'%';
    $('#dsteps').innerHTML=ST.map(s=>`<div class="tz-st ${mode}"><span>${mode==='man'?'👤':'⚙'}</span><b>${s}</b><small>${mode==='man'?'by a person':'automatic'}</small></div>`).join('')+`<div class="tz-st esc ${mode}"><span>${mode==='man'?'—':'→'}</span><b>Escalate</b><small>${mode==='man'?'everything was manual':'only complex or sensitive cases'}</small></div>`;
    $('#dnote').textContent=mode==='man'?'Illustrative day: most agents on shift 08:00–20:00 with a small night team, and every email needs a person.':'Illustrative: if about 70% of emails are routine and resolved with zero touch, agents only see the rest.'; }
  const setM=segBind($('#day'),'data-m',(v,u)=>{ if(u) user=true; mode=v; draw(); });
  r.addEventListener('input',()=>{ user=true; draw(); });
  draw();
  onView($('#day'),async()=>{ await sleep(1800); if(user) return; r.value=20; draw(); await sleep(2600); if(user) return; mode='auto'; setM('auto'); draw(); },.35);
})();

/* CLASSIFY */
(()=>{ const CAT=['Billing','Service issue','Complaint','General inquiry','Account security'];
  const M=[{t:'Charged twice',s:'Charged twice this month',from:'Ayesha K.',body:'Hi, my bill for March shows Rs 2,450 but I was charged twice on my card ending ••21. Please check and refund. My number is 0301-•••-7742.',p:[91,3,4,1,1],u:['Medium','warn'],sen:'Frustrated',ent:[['Amount','Rs 2,450'],['Card','ending ••21 (masked)'],['Number','0301-•••-7742 (masked)'],['Month','March']],dec:['Auto-reply + billing ticket for refund check','auto']},
   {t:'Slow internet',s:'Internet very slow since yesterday',from:'Bilal R.',body:'Internet on my home device has been very slow since yesterday evening in Gulberg. Speed tests show under 1 Mbps. Is there an outage?',p:[2,94,2,2,0],u:['Medium','warn'],sen:'Neutral',ent:[['Area','Gulberg'],['Since','Yesterday evening'],['Measured','under 1 Mbps']],dec:['Auto-reply with area network status and fix steps','auto']},
   {t:'Angry complaint',s:'Third time reporting this',from:'Usman T.',body:'This is the THIRD time I am writing about dropped calls. Nobody has fixed it. If this is not solved this week I will file a complaint with the regulator.',p:[3,8,87,1,1],u:['High','risk'],sen:'Angry',ent:[['Issue','Dropped calls'],['History','3rd contact'],['Signal','Regulator threat']],dec:['Escalate to a senior agent with full history','esc']},
   {t:'Bundle question',s:'Monthly 4G bundle',from:'Sara M.',body:'Hello, what is included in the monthly 4G bundle and how do I subscribe from the app?',p:[2,1,0,96,1],u:['Low','neu'],sen:'Positive',ent:[['Product','Monthly 4G bundle'],['Channel','App']],dec:['Auto-reply with bundle details and subscribe link','auto']},
   {t:'SIM changed',s:'SIM stopped working',from:'Hamza A.',body:'I did not request a SIM replacement but my SIM stopped working today and I got a message about a SIM change. Please help urgently.',p:[1,10,4,1,84],u:['High','risk'],sen:'Worried',ent:[['Signal','Unrequested SIM change'],['Since','Today']],dec:['Escalate immediately to the fraud and security team','esc']}];
  const tabs=$('#ctabs'),mail=$('#cmail'),out=$('#cout'); let cur=0,tok=0,user=false;
  tabs.innerHTML=M.map((m,i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-i="${i}">${m.t}</button>`).join('');
  function load(i){ ++tok; cur=i; const m=M[i]; $$('#ctabs button').forEach((b,k)=>b.setAttribute('aria-selected',k===i)); mail.innerHTML=`<div class="mh"><b>${esc(m.s)}</b><span>From ${m.from} · via support@ · Google Workspace</span></div><p>${esc(m.body)}</p>`; out.innerHTML='<div class="wait">Press <b>Classify this email</b>.</div>'; }
  async function run(){ const my=++tok,m=M[cur]; out.innerHTML=`<div class="tz-res"><small>Intent</small><div id="cbars">${CAT.map((c,k)=>`<div class="tz-cb"><span>${c}</span><div><i style="width:0"></i></div><b>0%</b></div>`).join('')}</div></div>`;
    await sleep(200); const Bs=$$('#cbars .tz-cb'); Bs.forEach((b,k)=>{ b.querySelector('i').style.width=m.p[k]+'%'; b.querySelector('b').textContent=m.p[k]+'%'; b.classList.toggle('top',m.p[k]===Math.max(...m.p)); });
    await sleep(800); if(my!==tok) return;
    out.insertAdjacentHTML('beforeend',`<div class="tz-res tz-meta"><div><small>Urgency</small><span class="iv-chip ${m.u[1]}">${m.u[0]}</span></div><div><small>Tone</small><b>${m.sen}</b></div></div><div class="tz-res"><small>Details extracted</small><dl>${m.ent.map(e=>`<dt>${e[0]}</dt><dd>${esc(e[1])}</dd>`).join('')}</dl></div>`);
    await sleep(700); if(my!==tok) return;
    out.insertAdjacentHTML('beforeend',`<div class="tz-dec ${m.dec[1]}"><small>Decision</small><b>${m.dec[1]==='auto'?'✓ ':'→ '}${m.dec[0]}</b></div>`); }
  $$('#ctabs button').forEach(b=>b.addEventListener('click',()=>{ user=true; load(+b.dataset.i); run(); }));
  $('#crun').onclick=()=>{ user=true; run(); };
  load(0);
  onView($('#cl'),async()=>{ await sleep(400); if(user) return; await run(); for(const i of [2,4]){ await sleep(4200); if(user) return; load(i); await run(); } },.3);
})();

/* RESPOND */
(()=>{ const R=[{tpl:'Dear {{name}},<br>Thank you for contacting us about your bill for {{month}}. Your bill is {{amount}}, due on {{due}}. {{explanation}}<br>You can see the full breakdown in the app under <i>Bills</i>.<br>Reference: {{ticket}}',
    v:{name:'Ayesha',month:'March',amount:'Rs 2,450',due:'18 April',explanation:'It is higher than February because your 4G bundle renewed on 2 March and an international call of Rs 380 was made on 11 March.',ticket:'TCK-58213'},chk:['Billing explanation matches the account record','Uses the approved billing template','No promises outside support policy','Personal details masked in logs','Ticket created and linked']},
   {tpl:'Dear {{name}},<br>We\'re sorry your internet has been slow. We\'ve checked the network in {{area}}: {{status}}.<br>{{steps}}<br>If it is still slow after {{window}}, simply reply to this email and an engineer will follow up.<br>Reference: {{ticket}}',
    v:{name:'Bilal',area:'Gulberg',status:'maintenance on one site finished at 09:40, and speeds are back to normal',steps:'Please restart your device once to reconnect to the restored site.',window:'2 hours',ticket:'TCK-58214'},chk:['Area network status checked automatically','Uses the approved service template','Follow-up path offered','Personal details masked in logs','Ticket created and auto-closed if no reply']},
   {tpl:'Dear {{name}},<br>The {{bundle}} includes {{contents}} for {{price}}, valid for {{validity}}.<br>To subscribe, {{how}}.<br>Reference: {{ticket}}',
    v:{name:'Sara',bundle:'Monthly 4G bundle',contents:'30 GB of data, 1,000 on-net minutes and 300 SMS',price:'Rs 1,200',validity:'30 days',how:'open the app, go to Bundles and tap Subscribe',ticket:'TCK-58215'},chk:['Bundle details pulled from the current catalogue','Uses the approved product template','Price and validity verified','Ticket created and resolved']}];
  let cur=0,tok=0,user=false;
  const tplH=t=>t.replace(/\{\{(\w+)\}\}/g,'<u>{{$1}}</u>');
  function load(){ ++tok; const r=R[cur]; $('#rtpl').innerHTML=tplH(r.tpl); $('#rrep').innerHTML='<div class="wait">Press <b>Build the reply</b>.</div>'; $('#rchk').innerHTML=''; }
  async function run(){ const my=++tok,r=R[cur]; let html=r.tpl.replace(/\{\{(\w+)\}\}/g,(m,k)=>`<u data-k="${k}">{{${k}}}</u>`); const rep=$('#rrep'); rep.innerHTML=`<div class="tz-mailr">${html}</div>`; $('#rchk').innerHTML='';
    for(const k of Object.keys(r.v)){ await sleep(450); if(my!==tok) return; const u=rep.querySelector(`u[data-k="${k}"]`); if(u){ u.textContent=r.v[k]; u.classList.add('fill'); } const t=$('#rtpl').querySelectorAll('u'); t.forEach(x=>x.classList.toggle('on',x.textContent==='{{'+k+'}}')); }
    $$('#rtpl u').forEach(x=>x.classList.remove('on'));
    for(const c of r.chk){ await sleep(300); if(my!==tok) return; $('#rchk').insertAdjacentHTML('beforeend',`<span>✓ ${c}</span>`); }
    $('#rchk').insertAdjacentHTML('beforeend','<b>Sent automatically · no agent needed</b>'); }
  segBind($('#rs'),'data-r',v=>{ user=true; cur=+v; load(); run(); });
  $('#rrun').onclick=()=>{ user=true; run(); };
  load();
  onView($('#rs'),async()=>{ await sleep(400); if(user) return; await run(); await sleep(4200); if(user) return; cur=1; $$('#rs .seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.r==='1')); load(); await run(); },.3);
})();

/* ROUTING: confidence threshold + safety rules */
(()=>{ const TY={B:'Billing',S:'Service issue',G:'General inquiry',C:'Complaint',F:'Account security'};
  const CONF=[97,93,99,88,95,91,86,98,94,90,96,89,92,87,99,95,93,97,88,91,94,86,90,98,92,96,  82,76,71,64,79,58,73,67];
  const TYP='BSGBSGBSGBSGBSGBSGBSGBSGBS'+'BSGBSGBS';
  const E=CONF.map((c,i)=>({t:TYP[i],c,sen:false,mis:c<78&&i%2===0}));
  [['C',92],['C',89],['C',95],['C',81],['F',90],['F',86]].forEach(([t,c])=>E.push({t,c,sen:true,mis:false}));
  const order=[...E.keys()].sort((a,b)=>((a*37)%41)-((b*37)%41)); const L=order.map(i=>E[i]);
  const box=$('#tbatch'),r=$('#trange'),rule=$('#trule'); let user=false,sel=-1;
  box.innerHTML=L.map((e,i)=>`<button type="button" class="tz-em" data-i="${i}" aria-label="${TY[e.t]} email, ${e.c}% confident"><b>${e.t}</b><small>${e.c}</small></button>`).join('');
  const T=$$('#tbatch .tz-em');
  const out=e=>{ const th=+r.value; if(rule.checked&&e.sen) return 'esc'; if(e.c<th) return 'esc'; return (e.sen||e.mis)?'risk':'auto'; };
  function draw(){ let a=0,s=0,k=0; L.forEach((e,i)=>{ const o=out(e); T[i].className='tz-em '+o+(i===sel?' sel':''); if(o==='esc') s++; else { a++; if(o==='risk') k++; } });
    $('#tval').textContent=r.value+'%'; $('#tauto').textContent=a; $('#tesc').textContent=s; $('#trisk').textContent=k;
    const n=$('#tnote');
    if(sel>=0){ const e=L[sel],o=out(e); n.innerHTML=`<b>${TY[e.t]} · ${e.c}% confident.</b> ${o==='esc'?(rule.checked&&e.sen?'Escalated by safety rule: sensitive cases always reach a person.':'Escalated: confidence is below the line you set.'):o==='risk'?(e.sen?'<span class="r">Risky:</span> a sensitive case answered by template. This is exactly what the safety rule prevents.':'<span class="r">Risky:</span> low confidence, and in this case the classifier was wrong, so the template reply would not fit.'):'Resolved with zero touch: confident, routine and covered by a template.'}`; }
    else n.innerHTML=k?`<b class="r">${k} risky auto-repl${k>1?'ies':'y'}.</b> ${!rule.checked?'With the safety rule off, complaints and fraud reports get template answers. ':''}${+r.value<78?'With the line this low, some misclassified emails get the wrong template. ':''}Raise the line or switch the rule back on.`:`<b>${a} of ${L.length} resolved with zero touch, ${s} escalated, 0 risky.</b> Every sensitive or uncertain email reaches a person.`; }
  r.addEventListener('input',()=>{ user=true; draw(); }); rule.addEventListener('change',()=>{ user=true; draw(); });
  T.forEach((t,i)=>t.addEventListener('click',()=>{ user=true; sel=sel===i?-1:i; draw(); }));
  draw();
  const setT=v=>{ r.value=v; draw(); };
  onView($('#rt'),async()=>{ await sleep(2200); if(user) return; for(const v of [80,72,64]){ setT(v); await sleep(900); if(user) return; } await sleep(1800); if(user) return; setT(85); await sleep(1500); if(user) return; rule.checked=false; draw(); await sleep(2800); if(user) return; rule.checked=true; draw(); },.3);
})();

/* WORKFLOW (n8n-style canvas) */
(()=>{ const N={trig:['Gmail trigger','Google Workspace','New email in support@ mailbox. {"from":"Sara M.","subject":"Monthly 4G bundle"}'],norm:['Normalise & mask','Code node','Strips signatures and quoted threads, masks phone and card numbers before anything is stored.'],cls:['Classify intent','NLP','{"intent":"General inquiry","confidence":0.96,"urgency":"low","sensitive":false}'],sw:['Route','Switch node','Routine and confident → automate. Complaint, fraud, legal threat or low confidence → a person.'],
    tpl:['Fill template','Response logic','Picks the approved template and fills it with account and catalogue data.'],pol:['Policy check','Rules','Checks the reply against support policy before it can be sent.'],send:['Send reply','Gmail','Reply sent from support@ within seconds of the email arriving.'],tkt:['Log & resolve','Ticketing','Ticket created, linked to the email and resolved automatically.'],
    tke:['Create ticket','Ticketing','Ticket opened with intent, urgency and a short summary of the case.'],q:['Assign agent','Support queue','Routed to the right team: senior agents for complaints, fraud team for security.'],ack:['Acknowledge','Gmail','The customer is told right away that a specialist has the case.']};
  const ROW=[['trig','norm','cls','sw'],['tpl','pol','send','tkt'],['tke','q','ack']];
  const c=$('#wcanvas'),det=$('#wdet'); let mode='auto',tok=0,user=false;
  const node=k=>`<button type="button" class="tz-nd" data-k="${k}"><em>${N[k][1]}</em><b>${N[k][0]}</b></button>`;
  c.innerHTML=`<div class="tz-row main">${ROW[0].map(node).join('<i class="tz-ln"></i>')}</div><div class="tz-br a"><span class="tz-lb">if routine and confident</span><div class="tz-row">${ROW[1].map(node).join('<i class="tz-ln"></i>')}</div></div><div class="tz-br e"><span class="tz-lb">if complex, sensitive or uncertain</span><div class="tz-row">${ROW[2].map(node).join('<i class="tz-ln"></i>')}</div></div><div class="tz-aws">All running on AWS · executions logged for audit and metrics</div>`;
  const B=$$('#wcanvas .tz-nd');
  const show=k=>{ B.forEach(b=>b.classList.toggle('on',b.dataset.k===k)); det.innerHTML=`<b>${N[k][0]} · ${N[k][1]}.</b> <span>${esc(N[k][2])}</span>`; };
  async function run(){ const my=++tok,path=[...ROW[0],...(mode==='auto'?ROW[1]:ROW[2])]; B.forEach(b=>b.className='tz-nd'); $$('#wcanvas .tz-br').forEach(x=>x.classList.toggle('dim',x.classList.contains(mode==='auto'?'e':'a')));
    if(mode==='esc'){ N.trig[2]='New email in support@ mailbox. {"from":"Hamza A.","subject":"SIM stopped working"}'; N.cls[2]='{"intent":"Account security","confidence":0.84,"urgency":"high","sensitive":true}'; } else { N.trig[2]='New email in support@ mailbox. {"from":"Sara M.","subject":"Monthly 4G bundle"}'; N.cls[2]='{"intent":"General inquiry","confidence":0.96,"urgency":"low","sensitive":false}'; }
    for(const k of path){ if(my!==tok) return; const b=B.find(x=>x.dataset.k===k); show(k); await sleep(1050); if(my!==tok) return; b.classList.remove('on'); b.classList.add('done'); }
    det.innerHTML=mode==='auto'?'<b>Resolved with zero touch.</b> <span>From inbox to answered and closed in seconds, with no person involved.</span>':'<b>Escalated safely.</b> <span>A specialist has the case with its context, and the customer already knows help is coming.</span>'; }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; ++tok; show(b.dataset.k); }));
  segBind($('#wfx'),'data-w',v=>{ user=true; mode=v; run(); });
  $('#wrun').onclick=()=>{ user=true; run(); };
  det.innerHTML='<b>One n8n workflow.</b> <span>Press Run, or tap any node to see what it does.</span>';
  onView($('#wfx'),async()=>{ await sleep(400); if(user) return; await run(); await sleep(2500); if(user) return; mode='esc'; $$('#wfx .seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.w==='esc')); await run(); },.3);
})();

/* CONSTRAINTS */
(()=>{ const C=[['A wrong reply is worse than a slow one','Automated answers had to be correct and aligned with support policy.','Templates plus confidence','Replies come only from approved templates and response logic, and only when the classifier is confident.'],
  ['Some emails must reach a person','Complaints, fraud and ambiguous cases cannot be answered by a template.','Escalation rules that always win','Sensitive categories always escalate, and anything uncertain goes to an agent with a summary.'],
  ['The support operation already existed','Agents, queues and ticketing had to keep working exactly as before.','Orchestrate, don\'t replace','n8n connects Google Workspace mail with the existing ticketing and support workflow, so escalations land where agents already work.'],
  ['Peaks are when it matters most','Email volume spikes are exactly when manual queues used to break.','Always on, scales with volume','The workflow runs continuously on AWS and processes each email as it arrives, whatever the volume.']];
  const f=$('#flip'); f.innerHTML=C.map((c,i)=>`<button type="button" class="sy-fc" aria-pressed="false" aria-label="${esc(c[0])}: flip to see the solution"><span class="in"><span class="fa"><small>Challenge ${i+1}</small><b>${c[0]}</b><span class="tx">${c[1]}</span><span class="go">See how we solved it ↻</span></span><span class="ba"><small>How we solved it</small><b>${c[2]}</b><span class="tx">${c[3]}</span><span class="go">↻ Back</span></span></span></button>`).join('');
  const cards=$$('#flip .sy-fc'); let user=false;
  cards.forEach(c=>c.addEventListener('click',()=>{ user=true; const on=!c.classList.contains('on'); c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }));
  $('#flipall').onclick=()=>{ user=true; const on=!cards.every(c=>c.classList.contains('on')); cards.forEach(c=>{ c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }); $('#flipall').textContent=on?'Show the challenges':'Flip all cards'; };
  onView(f,async()=>{ if(RM) return; await sleep(1000); for(const c of cards){ if(user) return; c.classList.add('on'); await sleep(1000); c.classList.remove('on'); await sleep(150); } },.4);
})();

/* RESULTS */
(()=>{ const BA=[['Every email read by a person','Routine emails handled with zero touch'],['Replies varied by agent','Policy-aligned replies, every time'],['Queues spiked at peak','Emails processed as they arrive'],['Roles spent on triage and basic replies','Agents focused on complex cases'],['Slow first responses','Replies in seconds, around the clock'],['Escalation by guesswork','Rules and confidence decide what a person sees']];
  $('#ba').innerHTML='<span class="lbl">Before and after</span>'+BA.map(b=>`<div><span class="b">${b[0]}</span><i>→</i><span class="a">${b[1]}</span></div>`).join('');
  onView($('#ba'),()=>$('#ba').classList.add('in'),.25);
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to,suf=b.dataset.suf||'',pre=b.dataset.pre||''; if(RM) return; onView(b,async()=>{ for(let i=0;i<=20;i++){ b.textContent=pre+Math.round(to*i/20)+suf; await sleep(30); } },.5); });
})();
