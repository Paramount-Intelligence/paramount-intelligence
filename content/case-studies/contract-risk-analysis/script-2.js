__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
const onView=(el,fn,th=.3)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const segBind=(root,attr,cb)=>{ const B=[...root.querySelectorAll('button['+attr+']')]; B.forEach(b=>b.addEventListener('click',()=>{ B.forEach(x=>x.setAttribute('aria-pressed',x===b)); cb(b.getAttribute(attr),true); })); return v=>{ B.forEach(x=>x.setAttribute('aria-pressed',x.getAttribute(attr)===v)); }; };
const VL={ok:['Standard','ok'],warn:['Review','warn'],risk:['High risk','risk'],miss:['Missing','miss']};

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.08});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* HERO: a contract is scanned clause by clause while the risk report builds */
(()=>{ const H=[['§1','Definitions','ok',82],['§3','Services & service levels','ok',94],['§5','Fees & price changes','warn',76],['§7','Limitation of liability','risk',88],['§9','Confidentiality','ok',70],['§12','Termination','risk',84],['§14','Indemnities','warn',92],['§16','Governing law','ok',60],['—','Data protection clause','miss',0]];
  const F={warn:'w',risk:'',miss:'m'},WHY={'§5':'Vendor can raise fees on 15 days\' notice','§7':'Client liability uncapped, vendor capped','§12':'Only the vendor can exit for convenience','§14':'One-way indemnity in vendor\'s favour','—':'No breach-notification duty found'};
  const L=$('#hlines'),fl=$('#hfl'),k=$('#hk'),tm=$('#htime'),scan=$('#hx .scan');
  L.innerHTML=H.map(h=>`<div class="ct-hl"><em>${h[0]}</em><span><b>${esc(h[1])}</b>${h[3]?`<i style="--w:${h[3]}%"></i>`:''}</span><span class="iv-chip ${VL[h[2]][1]}">${VL[h[2]][0]}</span></div>`).join('');
  const R=[...L.children]; let c=0,r=0,m=0;
  const kp=()=>{ k.innerHTML=`<div><b>${c}</b><span>Clauses read</span></div><div class="r"><b>${r}</b><span>Flags</span></div><div class="m"><b>${m}</b><span>Missing</span></div>`; };
  const flag=h=>{ fl.insertAdjacentHTML('afterbegin',`<div class="ct-hf ${F[h[2]]}"><b>${h[2]==='miss'?'Missing · ':h[0]+' · '}${esc(h[1])}</b><span>${esc(WHY[h[0]])}</span></div>`); if(fl.children.length>4) fl.lastChild.remove(); };
  const fin=()=>{ tm.textContent='Report ready · minutes, not hours'; };
  if(RM){ R.forEach((e,i)=>e.classList.add('k-'+H[i][2])); H.forEach(h=>{ if(h[2]!=='ok'){ flag(h); if(h[2]==='miss') m++; else r++; } }); c=H.length-1; kp(); fin(); return; }
  (async()=>{ for(;;){ R.forEach(e=>e.className='ct-hl'); fl.innerHTML=''; c=r=m=0; kp(); tm.textContent='Reading contract from SAP Ariba…'; scan.style.opacity=1; await sleep(900);
      for(const [i,e] of R.entries()){ const h=H[i]; scan.style.top=(e.offsetTop-4)+'px'; e.classList.add('k-sc'); await sleep(520); e.classList.remove('k-sc'); e.classList.add('k-'+h[2]);
        if(h[2]==='miss'){ m++; flag(h); } else { c++; if(h[2]!=='ok'){ r++; flag(h); } } kp(); tm.textContent=h[2]==='miss'?'Checking for missing protections…':`Comparing ${h[0]} with clause patterns…`; await sleep(260); }
      scan.style.opacity=0; fin(); await sleep(4200); } })();
})();

/* PROBLEM */
(()=>{ const r=$('#lrange'),q=$('#lq'); let mode='man',tok=0,user=false;
  function hours(){ const n=+r.value,mh=n*45/60,a=mh*.2; $('#lnum').textContent=n; $('#lhm').textContent=mh.toFixed(0)+' h'; $('#lha').textContent=a.toFixed(0)+' h'; $('#lbm').style.width='100%'; $('#lba').style.width='20%'; $('#lsave').textContent=(mh-a).toFixed(0); }
  async function sim(){ const my=++tok,n=Math.round(+r.value/10); q.innerHTML='<i></i>'.repeat(n); const I=[...q.children];
    $('#lql').textContent=mode==='man'?'Review queue · each square is 10 contracts waiting for a lawyer':'Review queue · each square is 10 contracts, each with a risk report';
    if(mode==='man'){ I.forEach(i=>i.className='w'); for(let k=0;k<I.length;k++){ await sleep(360); if(my!==tok) return; I[k].className='a'; if(k>=Math.round(n*.3)){ $('#lql').textContent=`Review queue · ${n-k-1} of ${n} squares still unread at the end of the week`; break; } } }
    else { for(const i of I){ await sleep(40); if(my!==tok) return; i.className='d'; } $('#lql').textContent='Review queue · every contract pre-analysed, lawyers review the flags'; } }
  const setM=segBind($('#load'),'data-m',(v,u)=>{ if(u) user=true; mode=v; sim(); });
  r.addEventListener('input',()=>{ user=true; hours(); sim(); });
  hours(); q.innerHTML='<i class="w"></i>'.repeat(50);
  onView($('#load'),async()=>{ await sim(); await sleep(2200); if(user) return; mode='ai'; setM('ai'); sim(); },.35);
})();

/* INGESTION */
(()=>{ const ST=[['Capture','contract arrives'],['Extract','OCR and parsing'],['Normalise','clean, consistent text'],['Segment','clause-level sections'],['Index','embeddings for retrieval']];
  $('#ist').innerHTML=ST.map((s,i)=>`<div class="iv-stg"><em>Step ${i+1}</em><b>${s[0]}</b><span>${s[1]}</span></div>`).join('');
  const S=$$('#ist .iv-stg'),raw=$('#iraw'),seg=$('#isegs'); let src='ariba',tok=0,user=false;
  const stg=i=>S.forEach((s,k)=>s.className='iv-stg'+(k<i?' done':k===i?' on':''));
  const TXT=`<p><b>VENDOR SERVICES AGREEMENT</b></p><p><b>1. Definitions.</b> "Services" means the payment processing services described in Schedule A…</p><p><b>2. Term.</b> This Agreement commences on the Effective Date and renews automatically for successive 12-month periods…</p><p><b>5. Fees.</b> Vendor may revise the fees on fifteen (15) days' written notice…</p><p><b>7. Liability.</b> Vendor's aggregate liability shall not exceed the fees paid in the preceding month…</p>`;
  const SRC={ariba:{h:'SAP Ariba · contract workspace',tag:'captured via API',body:`<div class="ct-ariba"><div><span>Workspace</span><span>CW-48213</span></div><div><span>Counterparty</span><span>Northwind Payments Ltd</span></div><div><span>Status</span><span>Pending legal review</span></div><div><span>Document</span><span>VSA_Northwind_v3.pdf</span></div><div><span>Trigger</span><span>New contract created between the companies</span></div></div><p class="ct-rnote">No download, no upload: the contract is picked up the moment it is created in Ariba.</p>`,ex:'Text layer read from the attached PDF'},
    pdf:{h:'Uploaded PDF · VSA_Northwind_v3.pdf',tag:'digital text',body:`<div class="ct-page">${TXT}</div>`,ex:'Text layer read, headings detected'},
    scan:{h:'Scanned copy · signed_VSA_scan.pdf',tag:'image only, no text',body:`<div class="ct-page scan"><i class="ocr"></i>${TXT}</div>`,ex:'OCR converts the image to text'}};
  const SEG=[['§1','Definitions','heading'],['§2','Term and renewal','clause'],['§3','Services','clause'],['§5','Fees and price changes','clause'],['§7','Limitation of liability','clause'],['§9','Confidentiality','clause'],['§12','Termination','clause'],['§14','Indemnities','clause'],['§16','Governing law','clause']];
  function load(){ ++tok; const s=SRC[src]; raw.innerHTML=`<div class="rh"><b>${s.h}</b><span>${s.tag}</span></div>${s.body}`; seg.innerHTML='<div class="wait">Press <b>Run ingestion</b> to turn this document into clauses.</div>'; stg(-1); }
  async function run(){ const my=++tok,s=SRC[src]; seg.innerHTML=''; const pg=$('#iraw .ct-page');
    stg(0); await sleep(800); if(my!==tok) return;
    stg(1); if(src==='scan'&&pg){ pg.classList.add('ocring'); await sleep(1800); if(my!==tok) return; pg.classList.remove('ocring'); pg.classList.add('read'); } else await sleep(900); if(my!==tok) return;
    seg.insertAdjacentHTML('beforeend',`<div class="ct-sdone"><b>Extracted.</b> ${s.ex}; headings and clause boundaries preserved.</div>`);
    stg(2); await sleep(700); if(my!==tok) return;
    stg(3); for(const g of SEG){ seg.insertAdjacentHTML('beforeend',`<div class="ct-sg"><em>${g[0]}</em><b>${g[1]}</b><small>${g[2]}</small></div>`); await sleep(220); if(my!==tok) return; }
    stg(4); await sleep(800); if(my!==tok) return;
    seg.insertAdjacentHTML('beforeend',`<div class="ct-sdone"><b>${SEG.length} sections indexed.</b> Every clause is now searchable and ready for risk analysis.</div>`); stg(5); }
  segBind($('#ing'),'data-s',v=>{ user=true; src=v; load(); run(); });
  $('#irun').onclick=()=>{ user=true; run(); };
  load();
  onView($('#ing'),async()=>{ await sleep(400); if(user) return; await run(); await sleep(2600); if(user) return; src='scan'; $$('#ing .seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.s==='scan')); load(); await run(); },.3);
})();

/* RISK ANALYSIS */
const CL=[
 {n:'§2',t:'Term and renewal',v:'warn',x:'This Agreement continues for 36 months and renews automatically for successive 12-month periods unless either party gives 30 days\' notice.',
  p:[['Auto-renewal with a notice window of 90 days or more',.89],['Renewal reminder owed to the client',.74]],a:'Auto-renewal is acceptable, but a 30-day notice window is easy to miss and locks the client in for another year.',r:'Extend the notice window to 90 days and require the vendor to send a renewal reminder.'},
 {n:'§3',t:'Services',v:'ok',x:'Vendor shall provide the payment processing services in Schedule A and meet the service levels in Schedule B.',
  p:[['Services defined by schedule with measurable service levels',.94]],a:'Matches the standard position: scope and service levels are defined and measurable.',r:'No change needed.'},
 {n:'§5',t:'Fees and price changes',v:'warn',x:'Vendor may revise the fees on fifteen (15) days\' written notice.',
  p:[['Price increases capped (for example at inflation) with 90 days\' notice',.91],['Right to terminate if fees increase',.78]],a:'The vendor can change fees unilaterally, at any time, with very short notice and no cap.',r:'Cap annual increases, require 90 days\' notice, and add a right to terminate if fees rise.'},
 {n:'§7',t:'Limitation of liability',v:'risk',x:'Client shall be liable for all losses arising from its use of the Services. Vendor\'s aggregate liability shall not exceed the fees paid in the preceding one (1) month.',
  p:[['Mutual liability cap of at least 12 months\' fees',.93],['Carve-outs for data breach, confidentiality and fraud',.88]],a:'Liability is one-sided: the client is uncapped while the vendor is capped at one month of fees, with no carve-outs for data breach.',r:'Make the cap mutual at 12 months\' fees or more, with carve-outs for data breach, confidentiality and fraud.'},
 {n:'§9',t:'Confidentiality',v:'ok',x:'Each party shall keep the other\'s Confidential Information secret for five (5) years after termination.',
  p:[['Mutual confidentiality surviving termination',.95]],a:'Mutual and survives termination, in line with the standard position.',r:'No change needed.'},
 {n:'§12',t:'Termination',v:'risk',x:'Vendor may terminate this Agreement for convenience on 30 days\' notice. Client may terminate only for material breach.',
  p:[['Mutual termination rights',.9],['Exit and transition assistance for critical services',.84]],a:'Only the vendor can walk away for convenience, on short notice, for a service the client depends on.',r:'Make termination rights mutual, lengthen the notice period and add transition assistance.'},
 {n:'§16',t:'Governing law',v:'ok',x:'This Agreement is governed by the laws agreed in the Order Form, with disputes resolved by arbitration.',
  p:[['Agreed governing law and dispute forum',.92]],a:'Governing law and the dispute forum are clearly defined.',r:'No change needed.'},
 {n:'—',t:'Data protection and breach notification',v:'miss',g:1,x:'No clause found. Searched every section for data processing, security and breach notification terms.',
  p:[['Data processing terms with security standards',.0],['Breach notification within a fixed number of hours',.0]],a:'The vendor handles payment data, but the agreement contains no data protection or breach-notification obligations.',r:'Add a data processing clause with security standards, breach notification within a fixed time and audit rights.'},
 {n:'—',t:'Regulatory audit rights',v:'miss',g:1,x:'No clause found. Searched for audit, inspection and regulator access terms.',
  p:[['Client and regulator audit rights over critical vendors',.0]],a:'For a regulated financial services business, there is no right for the client or its regulator to audit the vendor.',r:'Add audit and regulator access rights proportionate to the service.'}];
(()=>{ const doc=$('#rdoc'),sum=$('#rsum'),det=$('#rdet'); let tok=0,user=false,done=false,sel=-1;
  doc.innerHTML=CL.map((c,i)=>`<button type="button" class="ct-cl${c.g?' k-ghost':''}" data-i="${i}"><b>${c.n} ${esc(c.t)}</b><span class="iv-chip ${VL[c.v][1]}">${VL[c.v][0]}</span><span class="tx">${esc(c.x)}</span></button>`).join('');
  const B=$$('#rdoc .ct-cl');
  const cnt=()=>{ const s={ok:0,warn:0,risk:0,miss:0},seen=B.filter(b=>/k-(ok|warn|risk|miss)/.test(b.className)); seen.forEach(b=>s[CL[+b.dataset.i].v]++); return [seen.filter(b=>!CL[+b.dataset.i].g).length,s]; };
  function drawSum(final){ const [n,s]=cnt(),score=Math.min(100,(s.risk*22+s.warn*9+s.miss*16));
    sum.innerHTML=`<div class="ct-sk"><div><b>${n}</b><span>Clauses</span></div><div class="r"><b>${s.risk}</b><span>High risk</span></div><div class="w"><b>${s.warn}</b><span>Review</span></div><div class="m"><b>${s.miss}</b><span>Missing</span></div></div>
    <div class="ct-rate"><small>Overall risk</small><div><i style="left:calc(${score}% - 2px)"></i></div><b>${final?(score>60?'High: 4 items to fix before signature':'Moderate'):(n?'Analysing…':'Not analysed yet')}</b></div>
    ${final?`<div class="ct-top"><small style="font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)">Structured risk report · fix first</small>${CL.map((c,i)=>[c,i]).filter(([c])=>c.v==='risk'||c.v==='miss').map(([c,i])=>`<button type="button" data-i="${i}"><span class="iv-chip ${VL[c.v][1]}">${VL[c.v][0]}</span><span>${c.n==='—'?'':c.n+' '}${esc(c.t)}</span></button>`).join('')}</div>`:''}`;
    $$('#rsum .ct-top button').forEach(b=>b.addEventListener('click',()=>{ user=true; show(+b.dataset.i); toDet(); })); }
  const toDet=()=>{ if(matchMedia('(max-width:900px)').matches) det.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'}); };
  function show(i){ sel=i; const c=CL[i]; B.forEach((b,k)=>b.classList.toggle('k-sel',k===i));
    det.innerHTML=`<h4><span>${c.n==='—'?'':c.n+' '}${esc(c.t)}</span><span class="iv-chip ${VL[c.v][1]}">${VL[c.v][0]}</span></h4>
    <div class="ct-step"><small>Retrieved clause patterns (RAG)</small>${c.p.map(p=>`<div class="ct-pat"><span>${esc(p[0])}</span><em>${p[1]?'match '+p[1].toFixed(2):'not found'}</em></div>`).join('')}</div>
    <div class="ct-step"><small>Assessment</small><div class="ct-ass">${esc(c.a)}</div></div>
    <div class="ct-step"><small>Recommended action</small><div class="ct-rec"><b>→</b> ${esc(c.r)}</div></div>`; }
  function reset(){ ++tok; done=false; B.forEach(b=>b.className='ct-cl'+(CL[+b.dataset.i].g?' k-ghost':'')); drawSum(false); det.innerHTML='<div class="wait">Press <b>Analyse contract</b>. Each clause is compared with known clause patterns, then judged by the language model.</div>'; }
  async function run(){ reset(); const my=tok;
    for(const [i,b] of B.entries()){ const c=CL[i]; if(c.g) continue; b.classList.add('k-sc');
      det.innerHTML=`<div class="ct-live"><span>${c.n} ${esc(c.t)}</span><span>→ retrieving ${c.p.length} clause pattern${c.p.length>1?'s':''}…</span></div>`; await sleep(420); if(my!==tok) return;
      det.querySelector('.ct-live').insertAdjacentHTML('beforeend','<span>→ language model evaluating wording…</span>'); await sleep(380); if(my!==tok) return;
      b.classList.remove('k-sc'); b.classList.add('k-'+c.v); drawSum(false); }
    det.innerHTML='<div class="ct-live"><span>Checking for protections that should be there but are not…</span></div>'; await sleep(900); if(my!==tok) return;
    for(const [i,b] of B.entries()){ if(!CL[i].g) continue; b.classList.add('k-miss'); drawSum(false); await sleep(450); if(my!==tok) return; }
    done=true; drawSum(true); show(3); }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; if(!done){ ++tok; B.forEach(x=>{ const c=CL[+x.dataset.i]; x.className='ct-cl k-'+c.v; }); done=true; drawSum(true); } show(+b.dataset.i); toDet(); }));
  $('#rrun').onclick=()=>{ user=true; run(); };
  reset();
  onView($('#rk'),async()=>{ await sleep(500); if(user) return; await run(); for(const i of [5,7,2]){ await sleep(4200); if(user||!done) return; show(i); } },.25);
})();

/* SEARCH */
(()=>{ const D=[
  ['Northwind Payments Ltd','Vendor services','§7','risk','Client shall be liable for all losses arising from its use of the Services.',['liability','uncapped','unlimited','losses','cap']],
  ['Bluegate Telecom','Connectivity agreement','§11','risk','Neither party\'s liability is limited for claims arising under this Section.',['liability','uncapped','unlimited','cap']],
  ['Orchid Cloud Services','Hosting agreement','§8','ok','Each party\'s liability is capped at the fees paid in the previous 12 months.',['liability','cap','capped']],
  ['Kestrel Card Solutions','Card issuing agreement','§2','warn','This Agreement renews automatically for 12 months unless notice is given 30 days before expiry.',['renewal','auto','automatic','renew','notice']],
  ['Lumen Analytics','Data services agreement','§3','warn','The term renews automatically each year; either party may give 45 days\' notice of non-renewal.',['renewal','auto','automatic','renew','notice']],
  ['Harbor Merchant Network','Partner agreement','—','risk','No data protection or breach-notification clause found in the agreement.',['data','protection','breach','notification','privacy','without','missing']],
  ['Ridgeway Security','Managed services agreement','—','risk','No data protection clause found; security obligations are not defined.',['data','protection','breach','privacy','security','without','missing']],
  ['Northwind Payments Ltd','Vendor services','§12','risk','Vendor may terminate this Agreement for convenience on 30 days\' notice.',['termination','terminate','convenience','exit','vendor']],
  ['Atlas Logistics','Courier services agreement','§15','warn','Either party may terminate for convenience on 60 days\' written notice.',['termination','terminate','convenience','exit']],
  ['Orchid Cloud Services','Hosting agreement','§6','warn','Provider may adjust prices annually by up to 7% with 60 days\' notice.',['price','fees','increase','pricing','fee','raise']],
  ['Northwind Payments Ltd','Vendor services','§5','warn','Vendor may revise the fees on fifteen (15) days\' written notice.',['price','fees','fee','increase','raise','revise','pricing']]];
  const Q=['Which contracts have uncapped liability?','Auto-renewal with short notice','Contracts without a data protection clause','Vendor can terminate for convenience','Who can raise prices on us?'];
  const inp=$('#sq'),res=$('#sres'); let tok=0,user=false;
  $('#ssug').innerHTML=Q.map((q,i)=>`<button type="button" data-i="${i}" aria-pressed="false">${q}</button>`).join('');
  const words=s=>s.toLowerCase().replace(/[^a-z\s-]/g,' ').split(/\s+/).filter(w=>w.length>2);
  const stem=w=>w.replace(/(ing|ed|s)$/,'').replace(/e$/,'');
  function search(q){ const W=words(q).map(stem); const sc=D.map((d,i)=>[d.at(-1).reduce((a,k)=>a+(W.some(w=>stem(k)===w||(w.length>4&&stem(k).startsWith(w.slice(0,5))))?1:0),0),i]).filter(x=>x[0]>0).sort((a,b)=>b[0]-a[0]);
    const top=sc.length?sc[0][0]:0, hits=sc.filter(x=>x[0]>=Math.max(1,top-1)).slice(0,4).map(x=>D[x[1]]);
    const t=(0.4+Math.random()*0.6).toFixed(1);
    res.innerHTML=hits.length?`<div class="ct-smeta"><b>${hits.length} matching clause${hits.length>1?'s':''}</b> · ${t} s across 3,412 indexed contracts</div>`+hits.map((h,i)=>`<div class="ct-hit k-${h[3]}" style="animation-delay:${i*.08}s"><div class="t"><b>${esc(h[0])} · ${esc(h[1])}</b><span>${h[2]} · <span class="iv-chip ${VL[h[3]][1]}">${VL[h[3]][0]}</span></span></div><p>${hl(esc(h[4]),W)}</p></div>`).join('')
      :`<div class="ct-smeta">No matching clauses in the sample set. Try one of the questions above.</div>`; }
  const hl=(s,W)=>s.replace(/[A-Za-z']+/g,m=>W.some(w=>w.length>3&&stem(m.toLowerCase()).startsWith(w.slice(0,5)))?`<mark>${m}</mark>`:m);
  async function typeQ(q){ const my=++tok; inp.value=''; res.innerHTML='<div class="ct-smeta">Searching…</div>'; for(const ch of q){ inp.value+=ch; await sleep(28); if(my!==tok) return; } await sleep(350); if(my!==tok) return; search(q); }
  const pick=i=>$$('#ssug button').forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
  $$('#ssug button').forEach(b=>b.addEventListener('click',()=>{ user=true; const i=+b.dataset.i; pick(i); ++tok; inp.value=Q[i]; search(Q[i]); }));
  const go=()=>{ user=true; ++tok; pick(-1); search(inp.value); };
  $('#sgo').onclick=go; inp.addEventListener('keydown',e=>{ if(e.key==='Enter') go(); }); inp.addEventListener('input',()=>{ user=true; ++tok; });
  res.innerHTML='<div class="ct-smeta">Ask a question, or pick one above.</div>';
  onView($('#srch'),async()=>{ for(const i of [0,2,1]){ if(user) return; pick(i); await typeQ(Q[i]); await sleep(3800); } },.35);
})();

/* ARCHITECTURE */
(()=>{ const N=[['SAP Ariba API · Microsoft Graph','Where contracts live','Contracts created in SAP Ariba are captured through its API the moment they exist; Microsoft Graph connects the platform to the client\'s Microsoft 365 environment.',''],['Amazon S3','Document store','Every captured or uploaded contract is stored securely in S3 on AWS, ready for processing.',''],['OCR & parsing','Python services','OCR turns scans into text; parsing keeps headings and clause boundaries, then the text is normalised and split into clauses.',''],['Embeddings · Kendra','Retrieval layer','Clauses are indexed with embeddings, and Amazon Kendra powers search; during analysis the relevant clause patterns and context are retrieved.',''],['Large language model','Risk evaluation','Guided by the retrieved patterns, the language model flags risky language, missing protections and commercial exposure, and recommends actions.','ag'],['React app','Reports and search','Legal and commercial teams read the structured risk reports and search across every contract.','']];
  $('#aflow').innerHTML=N.map((n,i)=>`<button type="button" class="iv-an ${n[3]}" data-i="${i}"><em>${String(i+1).padStart(2,'0')}</em><b>${n[0]}</b><span>${n[1]}</span></button>`).join('');
  const det=$('#adet'),B=$$('#aflow .iv-an'); let tok=0,user=false;
  const show=i=>{ B.forEach((b,k)=>b.classList.toggle('on',k===i)); det.innerHTML=`<b>${N[i][0]} · ${N[i][1]}.</b> ${N[i][2]}`; };
  det.innerHTML='<b>Runs on AWS.</b> Tap a component to see its job.';
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; ++tok; show(+b.dataset.i); }));
  async function trace(){ const my=++tok; for(let i=0;i<N.length;i++){ if(my!==tok) return; show(i); await sleep(1600); } if(my===tok){ B.forEach(b=>b.classList.remove('on')); det.innerHTML='<b>Done in minutes.</b> One contract in from Ariba, a clause-by-clause risk report out, with nobody downloading or retyping anything.'; } }
  $('#atrace').onclick=()=>{ user=true; trace(); };
  onView($('#archx'),()=>{ if(!user) trace(); },.35);
})();

/* CONSTRAINTS */
(()=>{ const C=[['PDFs, scans and everything between','Contracts arrive as digital PDFs and as scanned images with no text at all.','OCR and parsing first','OCR extracts the text from scans, and parsing preserves headings and clause boundaries so nothing downstream loses its structure.'],
  ['The same clause, worded a hundred ways','Liability, termination or renewal terms are written differently in every agreement.','Retrieve by meaning','A vector retrieval layer finds the relevant clause patterns by meaning, not by keywords, and uses them to guide the language model.'],
  ['Lawyers need to see the reasoning','An AI verdict that cannot be explained is no use in a legal workflow.','Interpretable, structured reports','Every finding shows the clause, the pattern it was compared with, the assessment and a recommended action.'],
  ['Contracts live inside SAP Ariba','Exporting documents into a separate tool would add a step nobody wanted.','Connect, don\'t copy','The system integrates directly with the SAP Ariba API, so contracts created between companies are captured and analysed automatically.']];
  const f=$('#flip'); f.innerHTML=C.map((c,i)=>`<button type="button" class="sy-fc" aria-pressed="false" aria-label="${esc(c[0])}: flip to see the solution"><span class="in"><span class="fa"><small>Challenge ${i+1}</small><b>${c[0]}</b><span class="tx">${c[1]}</span><span class="go">See how we solved it ↻</span></span><span class="ba"><small>How we solved it</small><b>${c[2]}</b><span class="tx">${c[3]}</span><span class="go">↻ Back</span></span></span></button>`).join('');
  const cards=$$('#flip .sy-fc'); let user=false;
  cards.forEach(c=>c.addEventListener('click',()=>{ user=true; const on=!c.classList.contains('on'); c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }));
  $('#flipall').onclick=()=>{ user=true; const on=!cards.every(c=>c.classList.contains('on')); cards.forEach(c=>{ c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }); $('#flipall').textContent=on?'Show the challenges':'Flip all cards'; };
  onView(f,async()=>{ if(RM) return; await sleep(1000); for(const c of cards){ if(user) return; c.classList.add('on'); await sleep(1000); c.classList.remove('on'); await sleep(150); } },.4);
})();

/* RESULTS */
(()=>{ const BA=[['Contracts downloaded from SAP Ariba by hand','Captured from Ariba automatically'],['30–60 minutes of reading per contract','A risk report in minutes'],['Clauses missed in large batches','100+ provisions checked in every document'],['Each reviewer checking differently','The same review process, every contract'],['Opening agreements one by one','Search thousands of contracts in seconds'],['Slow alignment between teams','Legal, procurement and commercial in step']];
  $('#ba').innerHTML='<span class="lbl">Before and after</span>'+BA.map(b=>`<div><span class="b">${b[0]}</span><i>→</i><span class="a">${b[1]}</span></div>`).join('');
  onView($('#ba'),()=>$('#ba').classList.add('in'),.25);
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to,suf=b.dataset.suf||'',fm=b.dataset.fmt; if(RM) return; onView(b,async()=>{ for(let i=0;i<=20;i++){ const v=Math.round(to*i/20); b.textContent=(fm?v.toLocaleString('en-US'):v)+suf; await sleep(30); } },.5); });
})();
