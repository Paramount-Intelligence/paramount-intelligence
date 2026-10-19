__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const onView=(el,fn,th=.35)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const visible=(el,cb)=>{ new IntersectionObserver(es=>cb(es[0].isIntersecting),{threshold:.15}).observe(el); };
const IMG={"ov": "/images/case-studies/se-01-overview.webp", "kb": "/images/case-studies/se-02-knowledge-base.webp", "parse": "/images/case-studies/se-03-ingestion-parsing.webp", "guard": "/images/case-studies/se-04-prompts-guardrails.webp", "ask": "/images/case-studies/se-05-ask-copilot.webp", "trace": "/images/case-studies/se-06-request-trace.webp", "impact": "/images/case-studies/se-07-usage-impact.webp"};
const SRC=[['SOP-412 MV feeder breaker operation.pdf','Section 6.3 · Close permissives','Text','0.91'],['LINE3-MV-PANEL-SCH-02.pdf','Page 4 · Panel schematic','Diagram','0.87'],['Bus VT monitoring block spec.docx','Section 2 · Undervoltage permissive','Text','0.82']];
const SLD=(hi)=>`<svg viewBox="0 0 360 120" class="se-sld" aria-hidden="true"><line x1="10" y1="48" x2="350" y2="48"/><rect x="58" y="34" width="34" height="28"/><rect x="164" y="34" width="34" height="28" class="${hi?'hi':''}"/><line x1="181" y1="62" x2="181" y2="92"/><rect x="262" y="34" width="34" height="28"/><text x="75" y="24">52-L3</text><text x="181" y="24">ES-L3</text><text x="279" y="24">VT-BUS</text><text x="181" y="110">DI-07 position</text></svg>`;

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.12});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* lightbox (shared) */
const LB=(()=>{ const lb=$('#lb'),li=$('#lbimg'),lc=$('#lbcap'); let last=null;
  const close=()=>{ lb.hidden=true; last&&last.focus(); }; $('#lbx').onclick=close; lb.addEventListener('click',e=>{ if(e.target===lb) close(); }); addEventListener('keydown',e=>{ if(e.key==='Escape'&&!lb.hidden) close(); });
  return (k,cap,from)=>{ last=from||document.activeElement; li.src=IMG[k]; li.alt=cap; lc.textContent=cap+' · sample data'; lb.hidden=false; $('#lbx').focus(); }; })();

/* HERO: a question answered */
(()=>{ const Q='The MV feeder breaker won’t close after a trip in line 3. What does the interlock need?';
  const A=[['Trip reset','protection relay latch reset locally',1],['Earthing switch open','ES-L3 reads OPEN on input DI-07',2],['Spring charged','closing spring contact made',1],['No undervoltage','bus VT permissive healthy',3]];
  const q=$('#hqq'),src=$('#hqsrc'),a=$('#hqa'),st=$('#hqst'),ok=$('#hqok');
  function full(){ q.textContent=Q; src.innerHTML=SRC.map((s,i)=>`<span class="on"><em>${i+1}</em>${s[0].replace(/\.(pdf|docx)$/,'')}<i>${s[2]}</i></span>`).join('');
    a.innerHTML='<p>Close is blocked until all four permissives in SOP-412 §6.3 are true:</p><ol>'+A.map(x=>`<li class="on"><b>${x[0]}.</b> ${x[1]} <sup>${x[2]}</sup></li>`).join('')+'</ol>'; st.textContent='Grounded in 3 sources'; ok.classList.add('on'); }
  if(RM){ full(); return; }
  let vis=true; visible($('#hq'),v=>vis=v);
  (async()=>{ while(true){ while(!vis) await sleep(400);
    q.textContent=''; src.innerHTML=''; a.innerHTML=''; ok.classList.remove('on'); st.textContent='Engineer is typing…';
    for(let i=1;i<=Q.length;i++){ q.textContent=Q.slice(0,i); await sleep(22); }
    st.textContent='Searching 10,000+ documents'; await sleep(700);
    for(let i=0;i<SRC.length;i++){ const s=SRC[i]; src.insertAdjacentHTML('beforeend',`<span><em>${i+1}</em>${s[0].replace(/\.(pdf|docx)$/,'')}<i>${s[2]}</i></span>`); await sleep(60); src.lastChild.classList.add('on'); await sleep(420); }
    st.textContent='Writing a grounded answer'; a.innerHTML='<p>Close is blocked until all four permissives in SOP-412 §6.3 are true:</p><ol></ol>'; const ol=a.querySelector('ol');
    for(const x of A){ ol.insertAdjacentHTML('beforeend',`<li><b>${x[0]}.</b> ${x[1]} <sup>${x[2]}</sup></li>`); await sleep(40); ol.lastChild.classList.add('on'); await sleep(520); }
    st.textContent='Grounded in 3 sources'; ok.classList.add('on'); await sleep(5200); } })();
})();

/* PROBLEM: the queue */
(()=>{ const box=$('#queue'),jr=$('#jrs'),grid=$('#queue .se-qgrid'),nc=$('#ncop'),ns=$('#nsme'),cc=$('#ccop'),cs=$('#csme'),B=$$('#queue .seg button');
  const wrep=$('#wrep'),wl=$('#wrepl'),wcap=$('#wcap');
  const J=['Junior engineer','Controls engineer','Commissioning','Maintenance','New hire'];
  jr.innerHTML=J.map(j=>`<div class="se-jr"><i></i><span>${j}</span></div>`).join(''); const JR=$$('#jrs .se-jr');
  let mode='before',nC=0,nS=0,user=false,vis=false,tick=0;
  function setMode(m){ mode=m; B.forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===m)); box.classList.toggle('after',m==='after'); nC=0; nS=0; cc.textContent=0; cs.textContent=0;
    wrep.style.width=m==='after'?'8%':'40%'; wl.textContent=m==='after'?'Repeat questions · about 80% less':'Repeat questions and logic checks · up to 40%';
    wcap.innerHTML=m==='after'?'The co-pilot answers first-line questions from historical documentation and code. <b>Senior engineer distraction fell by about 80%.</b>':'Up to 40% of senior time went on repetitive questions and checking other people’s configuration logic.'; }
  function shoot(){ const j=JR[Math.floor(Math.random()*JR.length)],gr=grid.getBoundingClientRect(),a=j.querySelector('i').getBoundingClientRect();
    const toCop=mode==='after'&&Math.random()<.8, t=(toCop?nc:ns).querySelector('i').getBoundingClientRect();
    const d=document.createElement('span'); d.className='se-dot'+(toCop?' c':''); grid.appendChild(d);
    const x0=a.left+a.width/2-gr.left,y0=a.top+a.height/2-gr.top,x1=t.left+t.width/2-gr.left,y1=t.top+t.height/2-gr.top;
    const an=d.animate([{transform:`translate(${x0}px,${y0}px)`},{transform:`translate(${(x0+x1)/2}px,${(y0+y1)/2+(toCop?-14:14)}px)`},{transform:`translate(${x1}px,${y1}px)`}],{duration:1100,easing:'ease-in-out'});
    j.classList.add('ask'); setTimeout(()=>j.classList.remove('ask'),400);
    an.onfinish=()=>{ d.remove(); if(toCop){ nC++; cc.textContent=nC; nc.classList.remove('hit'); void nc.offsetWidth; nc.classList.add('hit'); } else { nS++; cs.textContent=nS; ns.classList.remove('hit'); void ns.offsetWidth; ns.classList.add('hit'); } }; }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; setMode(b.dataset.m); }));
  setMode('before'); visible(box,v=>vis=v);
  if(RM){ return; }
  setInterval(()=>{ if(!vis) return; shoot(); tick++; if(!user&&tick%22===0) setMode(mode==='before'?'after':'before'); },420);
})();

/* BRIEF: objectives + principles */
(()=>{ const O=[['Replace SME dependency','Scarce senior experts answer everything','An always-available first-line expert'],['Augment junior staff','Close oversight to avoid configuration errors','Context-based, step-by-step guidance'],['Speed up configuration','Weeks of manual code checks per change','Hours, with error-checked configuration reaching the machine edge']];
  const P=[['Grounded','Every answer comes from verified documentation, not general model knowledge.'],['Diagrams count','Schematics, topologies and charts are read like a senior engineer would.'],['Configured, not coded','Managed services and native connectors; no custom ingestion scripts.'],['Behaviour outside code','Prompts, guardrails and output rules change without redeploying.'],['Governed runtime','Identity, safety and the agent lifecycle in Microsoft AI Foundry.'],['Their own tool','Questions start and answers arrive inside EcoStruxure.']];
  const ob=$('#obj'); ob.innerHTML=O.map((o,i)=>`<button type="button" class="se-ob" aria-pressed="false"><span class="n">0${i+1}</span><b>${o[0]}</b><span class="fr"><small>From</small>${o[1]}</span><span class="to"><small>To</small>${o[2]}</span><span class="tap">Tap to flip</span></button>`).join('');
  $('#princ').innerHTML='<span class="lbl">Six design principles</span>'+P.map((p,i)=>`<div style="--d:${i*80}ms"><em>${i+1}</em><b>${p[0]}</b><span>${p[1]}</span></div>`).join('');
  const OB=$$('#obj .se-ob'); let user=false;
  OB.forEach(b=>b.addEventListener('click',()=>{ user=true; b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true'); }));
  onView(ob,async()=>{ $('#princ').classList.add('in'); if(RM){ OB.forEach(b=>b.setAttribute('aria-pressed','true')); return; } for(const b of OB){ await sleep(700); if(user) return; b.setAttribute('aria-pressed','true'); } },.4);
})();

/* ARCHITECTURE: trace the two paths */
(()=>{ const D={kb:'<b>Step 1 · Knowledge base.</b> More than 10,000 manuals, CAD schematics, SOPs, specifications and compliance guidelines in Google Cloud Storage, synced with Google Drive.',
   rag:'<b>Steps 2–3 · Vertex AI RAG Engine.</b> A layout parser for text and a Gemini multimodal parser for diagrams; chunking and embeddings configured in Vertex AI Studio.',
   db:'<b>Step 3 · RagManaged DB.</b> A Cloud Spanner instance managed by the RAG Engine: horizontal scale, strict data isolation and built-in sharding.',
   ui:'<b>Step 5 · EcoStruxure UI.</b> The engineer asks inside EcoStruxure Automation Expert, and the governed answer arrives in the same panel.',
   af:'<b>Steps 5–7 · Microsoft AI Foundry.</b> Checks identity through Entra ID, applies safety controls, orchestrates retrieval and guards the response.',
   fm:'<b>Step 7 · Foundation model.</b> Gemini or GPT writes the answer from the retrieved context.'};
  const PATH={build:[['kb',null,'Files land in Cloud Storage, synced from Google Drive'],['rag','kb-rag','Native connector feeds the Vertex AI RAG Engine'],['rag',null,'Text and diagrams are parsed, chunked and embedded'],['db','rag-db','Vectors are stored in the Spanner index']],
    answer:[['ui',null,'An engineer asks a question in EcoStruxure'],['af','ui-af','AI Foundry checks identity and input guardrails'],['rag','api','Secure API call to the Vertex AI RAG Engine'],['db',null,'Spanner returns the best passages and diagram descriptions'],['af','api','Context comes back to AI Foundry'],['fm','af-fm','A foundation model drafts a grounded answer'],['af','af-fm','Foundry applies output guardrails'],['ui','ui-af','The governed answer lands in EcoStruxure']]};
  const N={}; $$('#adiag .se-an').forEach(n=>N[n.dataset.n]=n); const E={}; $$('#adiag [data-e]').forEach(e=>E[e.dataset.e]=e);
  const det=$('#adet'),lbl=$('#apath'),B=$$('#archx .seg button'); let tok=0,user=false;
  function clear(){ Object.values(N).forEach(n=>n.classList.remove('on','seen')); Object.values(E).forEach(e=>e.classList.remove('go')); }
  async function run(p){ const my=++tok;
    while(my===tok){ B.forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===p)); $('#adiag').dataset.p=p; const S=PATH[p]; clear();
      for(let i=0;i<S.length;i++){ if(my!==tok) return; const [n,e,t]=S[i];
        Object.values(N).forEach(x=>{ if(x.classList.contains('on')){ x.classList.remove('on'); x.classList.add('seen'); } }); N[n].classList.remove('seen'); N[n].classList.add('on'); if(e) E[e].classList.add('go');
        lbl.textContent=`Step ${i+1} of ${S.length}: ${t}`; det.innerHTML=D[n]; if(!RM) await sleep(1500); }
      if(RM) return; await sleep(1800); if(my!==tok) return; if(!user) p=p==='build'?'answer':'build'; } }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; run(b.dataset.p); }));
  Object.entries(N).forEach(([k,n])=>n.addEventListener('click',()=>{ user=true; tok++; clear(); n.classList.add('on'); det.innerHTML=D[k]; lbl.textContent='Showing one component · pick a path to trace it'; }));
  det.innerHTML=D.kb; clear(); N.kb.classList.add('on'); lbl.textContent='Pick a path to trace it';
  onView($('#archx'),()=>{ if(!user) run('build'); },.35);
})();

/* BUILD: four steps */
(()=>{ const S=[['Knowledge base','10,000+ verified files'],['Multimodal parsing','Text and diagrams'],['Chunk, embed, store','Vertex AI + Spanner'],['Prompts and guardrails','Versioned, no redeploy']];
  const st=$('#bsteps'),stage=$('#bstage'); st.innerHTML=S.map((s,i)=>`<button type="button" role="tab" class="se-bs" data-i="${i}"><span class="n">${i+1}</span><span><b>${s[0]}</b><small>${s[1]}</small></span></button>`).join(''); const B=$$('#bsteps .se-bs');
  let cur=0,user=false,tok=0;
  const shot=(k,c)=>`<button type="button" class="se-shotlink" data-k="${k}" data-c="${c}">See the real screen ↗</button>`;
  const CAT=[['Engineering manuals',3412],['CAD schematics',2280],['Standard operating procedures',1906],['Specifications',1574],['Compliance guidelines',968]];
  const PARSED='Single-line diagram, line 3 MV feeder. Breaker 52-L3 in series with earthing switch ES-L3. ES-L3 position wired to digital input DI-07. Bus voltage transformer VT feeds the undervoltage permissive. Close circuit passes through the 86 lockout contact.';
  const R=[
   async my=>{ const max=Math.max(...CAT.map(c=>c[1]));
     stage.innerHTML=`<div class="se-sh"><h4>Step 1 · One source of verified material</h4>${shot('kb','Knowledge base')}</div>
      <div class="se-sync"><span><i class="gd"></i>Google Drive</span><em></em><span><i class="gcs"></i>Cloud Storage</span><em></em><span><i class="vx"></i>Vertex AI RAG Engine</span></div>
      <div class="se-cats">${CAT.map(c=>`<div><span>${c[0]}</span><i><b style="--w:${c[1]/max*100}%"></b></i><em data-n="${c[1]}">0</em></div>`).join('')}</div>
      <div class="se-total"><b id="btot">0</b> files · sample counts · native connector, no custom ingestion scripts</div>`;
     const em=$$('#bstage .se-cats em'),tot=$('#btot'); await sleep(60); stage.classList.add('go');
     const T=CAT.reduce((a,c)=>a+c[1],0); for(let f=0;f<=30;f++){ if(my!==tok) return; em.forEach((e,i)=>e.textContent=Math.round(CAT[i][1]*f/30).toLocaleString('en-US')); tot.textContent=Math.round(T*f/30).toLocaleString('en-US'); await sleep(RM?0:30); } },
   async my=>{ stage.innerHTML=`<div class="se-sh"><h4>Step 2 · Each kind of content gets its own parser</h4>${shot('parse','Ingestion and parsing')}</div>
      <div class="seg se-pk" role="group" aria-label="Input"><button type="button" data-k="d" aria-pressed="true">Schematic · Gemini parser</button><button type="button" data-k="t" aria-pressed="false">Manual · layout parser</button></div>
      <div class="se-parse"><div class="se-pin" id="pin"></div><div class="se-parr">→</div><div class="se-pout"><small id="plab"></small><p id="pout"></p><div class="se-chips" id="pchips"></div></div></div>`;
     const pk=$$('#bstage .se-pk button');
     async function show(k){ const m=tok; pk.forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===k));
       const pin=$('#pin'),out=$('#pout'),lab=$('#plab'),ch=$('#pchips');
       if(k==='d'){ pin.innerHTML=`<span class="fn">LINE3-MV-PANEL-SCH-02.pdf · p.4</span>${SLD(0)}<i class="scan"></i>`; lab.textContent='Gemini multimodal parser · diagram to description'; ch.innerHTML='';
         pin.classList.remove('go'); void pin.offsetWidth; pin.classList.add('go'); out.textContent='';
         await sleep(RM?0:1200); for(let i=0;i<=PARSED.length;i+=3){ if(m!==tok) return; out.textContent=PARSED.slice(0,i); await sleep(RM?0:14); } out.textContent=PARSED;
         ch.innerHTML='<span class="p">Gemini multimodal parser</span><span>4 chunks</span><span class="c">embedded</span>'; }
       else { pin.innerHTML=`<span class="fn">EAE function block library guide.pdf</span><div class="se-page"><i class="h"></i><i></i><i></i><i class="s"></i><i class="h"></i><i></i><i class="s"></i><i></i></div><i class="scan"></i>`; lab.textContent='Layout parser · structured text, layout kept'; ch.innerHTML='';
         pin.classList.remove('go'); void pin.offsetWidth; pin.classList.add('go'); out.innerHTML='';
         await sleep(RM?0:1100); if(m!==tok) return; out.innerHTML='<span class="se-tx"><b># 4 Function block library</b><br>## 4.2 Reusable start/stop blocks<br>Text, headings and tables extracted in reading order…</span>';
         ch.innerHTML='<span class="p">Layout parser</span><span>Text + 41 diagrams</span><span class="c">indexed</span>'; } }
     pk.forEach(b=>b.addEventListener('click',()=>{ user=true; tok++; show(b.dataset.k); })); await show('d'); },
   async my=>{ const parts=PARSED.split(/(?<=\.)\s/).reduce((a,s,i)=>{ const k=Math.min(3,Math.floor(i/1.3)); (a[k]=a[k]||[]).push(s); return a; },[]).map(x=>x.join(' '));
     stage.innerHTML=`<div class="se-sh"><h4>Step 3 · Chunked, embedded and stored at scale</h4><span class="demo-note">Configured in Vertex AI Studio, not coded</span></div>
      <div class="se-emb"><div class="se-chunks">${parts.map((p,i)=>`<div class="k k${i}"><small>Chunk ${i+1}</small>${p}</div>`).join('')}</div>
      <div class="se-vecs">${parts.map((p,i)=>`<div class="v k${i}">${Array.from({length:16},()=>`<i style="height:${15+Math.random()*85}%"></i>`).join('')}</div>`).join('')}</div>
      <div class="se-spanner"><b>RagManaged DB · Cloud Spanner</b><div class="sh">${[0,1,2].map(s=>`<div><small>Shard ${s+1}</small><span>${Array.from({length:12},(x,j)=>`<i data-s="${s}" data-j="${j}"></i>`).join('')}</span></div>`).join('')}</div><span class="demo-note">Horizontal scale · strict isolation · built-in sharding</span></div></div>`;
     const K=$$('#bstage .se-chunks .k'),V=$$('#bstage .se-vecs .v'),C=$$('#bstage .se-spanner i');
     C.forEach((c,i)=>{ if(Math.random()<.55) c.classList.add('f'); });
     for(let i=0;i<K.length;i++){ if(my!==tok) return; K[i].classList.add('on'); await sleep(RM?0:450); V[i].classList.add('on'); await sleep(RM?0:350);
       const e=C.filter(c=>!c.classList.contains('f')); const c=e[Math.floor(Math.random()*e.length)]; if(c){ c.classList.add('f','new','k'+i); } } },
   async my=>{ const G=[['Answer only from retrieved context',1],['Block requests to bypass safety functions',1],['Content safety filters',1],['Require source citations',1],['Mask personal data in responses',1],['Allow answers without sources',0]];
     stage.innerHTML=`<div class="se-sh"><h4>Step 4 · Behaviour managed outside the code</h4>${shot('guard','Prompts and guardrails')}</div>
      <div class="se-pg"><div class="se-sys"><div class="hd"><b>Agent persona · EcoStruxure Co-Pilot</b><span class="v" id="pver">v14 live</span></div>
        <pre>You are an automation engineering assistant for EcoStruxure Automation Expert.
Answer only from the retrieved documents. If they do not contain the answer, say so and suggest escalating to a subject matter expert.
Cite every source as [n] with document name and section.
For troubleshooting, give numbered steps in the order an engineer should check them.
When a schematic was retrieved, refer to its component tags exactly as drawn.
Never suggest bypassing an interlock, a protection function or a safety circuit.</pre>
        <div class="ft"><button type="button" class="se-btn pri" id="ppub">Publish v15</button><span id="pmsg">No backend redeploy needed</span></div></div>
      <div class="se-guards"><b>Guardrails · Microsoft AI Foundry</b>${G.map((g,i)=>`<label><input type="checkbox" ${g[1]?'checked':''}><span>${g[0]}</span></label>`).join('')}<span class="demo-note">Sample configuration</span></div></div>`;
     $('#ppub').onclick=async()=>{ user=true; const m=$('#pmsg'),v=$('#pver'),b=$('#ppub'); b.disabled=true; m.textContent='Publishing…'; await sleep(RM?0:700); v.textContent='v15 live'; v.classList.add('new'); m.innerHTML='<b>Live.</b> Behaviour updated, nothing rebuilt or redeployed.'; };
     $$('#bstage .se-guards input').forEach(c=>c.addEventListener('change',()=>{ user=true; $('#pmsg').textContent='Unpublished changes · publish to apply'; $('#ppub').disabled=false; })); }];
  async function go(i){ cur=i; const my=++tok; B.forEach((b,k)=>{ b.classList.toggle('on',k===i); b.classList.toggle('done',k<i); b.setAttribute('aria-selected',k===i); }); stage.classList.remove('go'); await R[i](my); }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; go(+b.dataset.i); }));
  stage.addEventListener('click',e=>{ const s=e.target.closest('.se-shotlink'); if(s) LB(s.dataset.k,s.dataset.c,s); });
  go(0); onView($('#bld'),async()=>{ if(RM) return; await sleep(400); go(0); const dur=[4200,7600,5200,6000]; while(!user){ await sleep(dur[cur]); if(user) return; go((cur+1)%4); } },.35);
})();

/* ANSWER: replay a request */
(()=>{ const SV={es:['EcoStruxure','#3dbe8b'],en:['Entra ID','#0f256e'],af:['AI Foundry','#204ecf'],vx:['Vertex AI','#09b6f9'],gm:['Gemini','#262d3d']};
  const RQ=[{n:'Troubleshoot a breaker',q:'The MV feeder breaker won’t close after a trip in line 3. What does the interlock sequence require before close is permitted? I’m looking at SOP-412.',
     t:[['es','Question received','Line 3 workspace',0],['en','Identity verified','Automation engineer role',42],['af','Input guardrails','Content safety, policy rules passed',118],['af','Retrieval call','Secure API gateway to Vertex AI',131],['vx','Vector search','Cloud Spanner index · top 5 chunks, 1 diagram',612],['gm','Answer synthesis','Grounded in 3 cited sources',2410],['af','Output guardrails','Citation check, safety filters passed',2530],['es','Answer delivered','Shown in the co-pilot panel',2580]],
     a:()=>`<div class="se-badges"><span class="g">Grounded in 3 sources</span><span class="ok">Guardrails passed</span></div><p>Close is blocked until all four permissives in SOP-412 section 6.3 are true. Check them in this order:</p><ol><li><b>Trip reset.</b> The protection relay trip latch must be reset locally. A remote reset is not accepted after an overcurrent trip. <sup>1</sup></li><li><b>Earthing switch open.</b> On the line 3 panel schematic this is input DI-07. <sup>2</sup></li><li><b>Spring charged.</b> The closing spring charged contact must be made for at least 2 seconds. <sup>1</sup></li><li><b>No undervoltage on the bus.</b> The permissive comes from the bus VT monitoring block. <sup>3</sup></li></ol><div class="se-fig"><small>From LINE3-MV-PANEL-SCH-02.pdf, page 4 · parsed diagram</small>${SLD(1)}</div><div class="se-srcs">${SRC.map((s,i)=>`<span><em>${i+1}</em><b>${s[0]}</b><small>${s[1]} · ${s[2]} · relevance ${s[3]}</small></span>`).join('')}</div>`},
   {n:'Ask to bypass an interlock',q:'Can I jumper out the ES-L3 interlock so we can close the line 3 breaker faster?',
     t:[['es','Question received','Line 3 workspace',0],['en','Identity verified','Automation engineer role',42],['af','Input guardrails','Blocked: request to bypass a safety function',118,1],['es','Answer delivered','Safe refusal with an escalation path',160]],
     a:()=>`<div class="se-badges"><span class="b">Blocked by guardrail</span></div><p>I can’t help bypass an interlock, a protection function or a safety circuit.</p><p>If close is still blocked once the permissives are true, the lockout relay is the usual cause. For anything beyond that, please escalate to a subject matter expert.</p><button type="button" class="se-esc">Escalate to SME</button>`},
   {n:'Generate a function block',q:'Generate a reusable block for conveyor start-stop with fault reset.',
     t:[['es','Question received','Conveyor workspace',0],['en','Identity verified','Controls engineer role',40],['af','Input guardrails','Content safety, policy rules passed',112],['af','Retrieval call','Secure API gateway to Vertex AI',126],['vx','Vector search','Library guide and coding standard · top 4 chunks',540],['gm','Code generation','Grounded in 2 cited sources',2650],['af','Output guardrails','Error check and safety filters passed',2790],['es','Answer delivered','Code block in the co-pilot panel',2840]],
     a:()=>`<div class="se-badges"><span class="g">Grounded in 2 sources</span><span class="ok">Error check passed</span></div><p>Here is a start-stop block with a latched fault and reset, following the coding standard. <sup>2</sup></p><pre class="se-code">FUNCTION_BLOCK ConveyorStartStop
VAR_INPUT  Start, Stop, Fault, FaultReset : BOOL; END_VAR
VAR_OUTPUT Run, FaultLatched : BOOL; END_VAR
IF Fault THEN FaultLatched := TRUE; END_IF;
IF FaultReset AND NOT Fault THEN FaultLatched := FALSE; END_IF;
Run := (Start OR Run) AND NOT Stop AND NOT FaultLatched;
END_FUNCTION_BLOCK</pre><p class="se-sug"><b>Reusable library:</b> a matching start/stop block already exists in the function block library. Reuse it to keep line code consistent. <sup>1</sup></p><div class="se-srcs"><span><em>1</em><b>EAE function block library guide.pdf</b><small>Manual · Text</small></span><span><em>2</em><b>IEC 61499 coding standard v3.docx</b><small>Specification · Text</small></span></div>`}];
  const tabs=$('#atabs'),chat=$('#achat'),tr=$('#atrace'),bar=$('#atbar'),tm=$('#atime');
  tabs.innerHTML=RQ.map((r,i)=>`<button type="button" role="tab" data-i="${i}">${r.n}</button>`).join(''); const TB=$$('#atabs button');
  let tok=0,cur=0,user=false;
  async function play(i){ const my=++tok,r=RQ[i]; cur=i; TB.forEach((b,k)=>{ b.classList.toggle('on',k===i); b.setAttribute('aria-selected',k===i); });
    const T=r.t[r.t.length-1][3];
    tr.innerHTML=r.t.map((s,k)=>`<li class="${s[4]?'blk':''}"><em style="background:${SV[s[0]][1]}">${SV[s[0]][0]}</em><span><b>${s[1]}</b><small>${s[2]}</small></span><code>${s[3]<1000?s[3]+' ms':(s[3]/1000).toFixed(2)+' s'}</code></li>`).join('');
    bar.innerHTML=r.t.slice(1).map((s,k)=>`<i style="background:${SV[s[0]][1]};flex:${Math.max(s[3]-r.t[k][3],T*.012)}"></i>`).join('');
    const L=$$('#atrace li'),BI=$$('#atbar i');
    chat.innerHTML=`<div class="se-me">${r.q}</div><div class="se-bot"><div class="hd"><i>✦</i><b>EcoStruxure Co-Pilot</b></div><div class="body" id="abody"><span class="se-typing"><i></i><i></i><i></i></span></div></div>`;
    for(let k=0;k<r.t.length;k++){ if(my!==tok) return; L.forEach((l,j)=>{ l.classList.toggle('on',j===k); l.classList.toggle('done',j<k); }); if(k>0) BI[k-1].classList.add('on'); tm.textContent=L[k].querySelector('code').textContent;
      const gap=k<r.t.length-1?r.t[k+1][3]-r.t[k][3]:0; await sleep(RM?0:Math.min(1400,Math.max(380,gap*.45))); }
    if(my!==tok) return; L.forEach(l=>{ l.classList.remove('on'); l.classList.add('done'); }); $('#abody').innerHTML=r.a(); $('#abody').classList.add('in'); }
  TB.forEach(b=>b.addEventListener('click',()=>{ user=true; play(+b.dataset.i); })); $('#areplay').onclick=()=>{ user=true; play(cur); };
  play(0);
  onView($('#ask'),async()=>{ if(RM) return; await play(0); let i=0; while(!user){ await sleep(6500); if(user) return; i=(i+1)%RQ.length; await play(i); } },.3);
})();

/* SPLIT: who owns the job */
(()=>{ const J=[['Ingestion','gc'],['Multimodal parsing','gc'],['Vector storage','gc'],['Retrieval over 10,000+ documents','gc'],['Agent lifecycle','af'],['Identity through Entra ID','af'],['Safety guardrails','af'],['Response generation','af'],['Orchestrating the call to Google Cloud','af'],['Where questions start','ex'],['Where answers land','ex']];
  const jb=$('#jobs'); jb.innerHTML=J.map((j,i)=>`<button type="button" data-i="${i}" aria-pressed="false">${j[0]}</button>`).join(''); const B=$$('#jobs button');
  const UL={}; $$('#cols .se-col').forEach(c=>UL[c.dataset.o]=c); J.forEach((j,i)=>UL[j[1]].querySelector('ul').insertAdjacentHTML('beforeend',`<li data-i="${i}">${j[0]}</li>`));
  let user=false,cur=-1;
  function pick(i){ cur=i; B.forEach((b,k)=>b.setAttribute('aria-pressed',k===i)); const o=J[i][1];
    Object.entries(UL).forEach(([k,c])=>{ c.classList.toggle('on',k===o); c.classList.toggle('dim',k!==o); c.querySelectorAll('li').forEach(l=>l.classList.toggle('on',+l.dataset.i===i)); }); }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; pick(+b.dataset.i); }));
  onView($('#own'),()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); pick((cur+1)%J.length); },1700); },.4);
})();

/* PROOF gallery */
(()=>{ const P=[['ov','Co-pilot overview','Knowledge base size, measured impact and recent questions.'],['ask','Ask the Co-Pilot','A cited, step-by-step answer with a parsed schematic.'],['kb','Knowledge base','Document categories and sync status.'],['parse','Ingestion and parsing','The pipeline and a parsed schematic.'],['guard','Prompts and guardrails','Versioned system instructions and guardrails.'],['trace','Request trace','Every service one question passes through.'],['impact','Usage and impact','Measured outcomes with sample usage trends.']];
  const g=$('#proofg'); g.innerHTML=P.map((p,i)=>`<button type="button" data-i="${i}"><img src="${IMG[p[0]]}" alt="${p[1]}: ${p[2]}" loading="lazy"><span><b>${p[1]}</b>${p[2]}</span></button>`).join('');
  $$('#proofg button').forEach(b=>b.addEventListener('click',()=>{ const p=P[+b.dataset.i]; LB(p[0],p[1],b); }));
})();

/* RESULTS: before / after sliders + counters */
(()=>{ const R=[['Subject matter expert dependency','Senior engineers spent up to 40% of their time on repetitive questions and logic checks','The co-pilot answers first-line questions from historical documentation and code','Senior engineer distraction down by about 80%'],
   ['Junior staff onboarding','Steep learning curve and close oversight to avoid errors','Immediate, context-aware, step-by-step troubleshooting','Faster time to autonomy for new hires'],
   ['Engineering velocity','Weeks of manual code checks to change a control topology or add a line','Pre-generated code blocks, error checks and reusable library suggestions','Design-to-build configuration time cut by 50%']];
  const box=$('#res'); box.innerHTML=R.map((r,i)=>`<div class="se-rr"><h4>${r[0]}</h4><div class="ba"><p class="b"><small>Before</small>${r[1]}</p><p class="a"><small>With the co-pilot</small>${r[2]}</p></div><input type="range" min="0" max="100" value="0" aria-label="${r[0]}: before to after"><span class="st">${r[3]}</span></div>`).join('');
  const RR=$$('#res .se-rr'); let user=false;
  RR.forEach(r=>{ const s=r.querySelector('input'); const f=()=>{ const v=+s.value; r.style.setProperty('--v',v/100); r.classList.toggle('after',v>=50); }; s.addEventListener('input',()=>{ user=true; f(); }); f(); });
  if(RM){ RR.forEach(r=>{ const s=r.querySelector('input'); s.value=100; r.style.setProperty('--v',1); r.classList.add('after'); }); }
  else onView(box,async()=>{ for(let k=0;k<RR.length;k++){ const r=RR[k],s=r.querySelector('input'); for(let v=0;v<=100;v+=4){ if(user) return; s.value=v; r.style.setProperty('--v',v/100); r.classList.toggle('after',v>=50); await sleep(18); } await sleep(250); } },.35);
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to,pre=b.dataset.pre||'',suf=b.dataset.suf||''; if(RM) return;
    onView(b,async()=>{ for(let f=0;f<=40;f++){ b.textContent=pre+Math.round(to*f/40).toLocaleString('en-US')+suf; await sleep(22); } },.6); });
})();
