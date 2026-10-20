__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
const onView=(el,fn,th=.3)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const IMG={"pubtabs": "/images/case-studies/sy-01-publisher-lifecycle.webp", "adminq": "/images/case-studies/sy-02-admin-approval-queue.webp", "consumer": "/images/case-studies/sy-03-consumer-catalog.webp", "record": "/images/case-studies/sy-04-approved-record.webp", "drafts": "/images/case-studies/sy-05-publisher-drafts.webp", "deprecated": "/images/case-studies/sy-06-admin-deprecated.webp", "detail": "/images/case-studies/sy-07-record-detail.webp", "grid": "/images/case-studies/sy-08-consumer-grid.webp"};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const segBind=(root,attr,cb)=>{ const B=[...root.querySelectorAll('button['+attr+']')]; B.forEach(b=>b.addEventListener('click',()=>{ B.forEach(x=>x.setAttribute('aria-pressed',x===b)); cb(b.getAttribute(attr),true); })); return v=>{ B.forEach(x=>x.setAttribute('aria-pressed',x.getAttribute(attr)===v)); }; };
const ST=s=>`<span class="sy-st ${s}">${s.replace('_',' ')}</span>`;
const PR=p=>`<span class="sy-pr ${p}">${p}</span>`;

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.08});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* lightbox */
const LB=(()=>{ const lb=$('#lb'),li=$('#lbimg'),lc=$('#lbcap'); let last=null;
  const close=()=>{ lb.hidden=true; last&&last.focus(); }; $('#lbx').onclick=close; lb.addEventListener('click',e=>{ if(e.target===lb) close(); }); addEventListener('keydown',e=>{ if(e.key==='Escape'&&!lb.hidden) close(); });
  return (k,cap,from)=>{ last=from||document.activeElement; li.src=IMG[k]; li.alt=cap; lc.textContent=cap; lb.hidden=false; $('#lbx').focus(); }; })();

/* HERO */
(()=>{ const N=[['pdf-extractor','A2A'],['batch-scoring','HTTP'],['enterprise-assistant','AGUI'],['knowledge-hub','MCP'],['customer-360','A2A'],['legacy-runtime','UNKNOWN'],['slide-builder','AGUI'],['postgres-tools','MCP'],['trade-decision','A2A'],['report-svc','HTTP'],['field-advisor','AGUI'],['office-graph','MCP'],['data-analyst','A2A'],['etl-runner','HTTP']];
  const field=$('#hfield'),list=$('#hlist'),cnt=$('#hcount'),beam=field.querySelector('.beam');
  const pos=N.map((n,i)=>({x:(i%2?46:2)+((i*7)%6),y:3+Math.floor(i/2)*13.5+((i*5)%4)}));
  field.insertAdjacentHTML('beforeend',N.map((n,i)=>`<span class="sy-node ${n[1]}" style="left:${pos[i].x}%;top:${pos[i].y}%;animation-delay:${(i%5)*.5}s"><i></i>${n[0]}</span>`).join(''));
  const nodes=$$('#hfield .sy-node');
  const count=(a,s,ap)=>{ cnt.innerHTML=`<span>${a} ingested</span><span>${s} skipped</span><span>${ap} approved</span>`; };
  function final(){ list.innerHTML=N.filter(n=>!/HTTP|UNKNOWN/.test(n[1])).slice(0,8).map((n,i)=>`<div class="sy-hrow"><b>${n[0]}</b><em>${ST(i<5?'APPROVED':'DRAFT')}</em></div>`).join(''); nodes.forEach(n=>n.classList.add('gone')); count(10,4,5); }
  if(RM){ final(); return; }
  async function loop(){ for(;;){ list.innerHTML=''; nodes.forEach(n=>n.className=n.className.replace(/ (hit|skip|gone)/g,'')); count(0,0,0);
      await sleep(900); beam.classList.remove('go'); void beam.offsetWidth; beam.classList.add('go');
      const order=nodes.map((n,i)=>[n,i]).sort((a,b)=>pos[a[1]].y-pos[b[1]].y); let a=0,s=0; const t0=performance.now(); const rows=[];
      for(const [n,i] of order){ const wait=pos[i].y/100*2200-(performance.now()-t0); if(wait>0) await sleep(wait);
        if(/HTTP|UNKNOWN/.test(N[i][1])){ n.classList.add('skip'); s++; }
        else { n.classList.add('hit'); a++; const r=document.createElement('div'); r.className='sy-hrow'; r.innerHTML=`<b>${N[i][0]}</b><em>${ST('DRAFT')}</em>`; list.prepend(r); rows.push(r); if(list.children.length>8) list.lastChild.remove(); setTimeout(()=>n.classList.add('gone'),500); }
        count(a,s,0); }
      await sleep(900); let ap=0;
      for(const r of [...list.children].slice(0,6)){ r.querySelector('em').innerHTML=ST('PENDING_APPROVAL'); await sleep(260); }
      for(const [k,r] of [...list.children].slice(0,6).entries()){ r.querySelector('em').innerHTML=ST(k===2?'REJECTED':'APPROVED'); if(k!==2) ap++; count(a,s,ap); await sleep(380); }
      await sleep(3800); } }
  loop(); })();

/* PROBLEM */
(()=>{ const P=[['AWS console','Account A · eu-central-1',['34 runtimes, names only','coreagents_pdf_extractor_v2 · A2A','owner: not recorded']],['AWS console','Account B',['pdf_parser_agent · AGUI','status: unknown']],['Spreadsheet','Team AI inventory',['"PDF extractor" row','last edited months ago']],['Slack','#ai-help thread',['"is the PDF agent prod-ready?"','no answer']],['GitLab','Repositories',['pdf-extractor and pdf-extractor-v2','which one is deployed?']],['Ask around','A colleague',['"I think Data Platform owns it"','approval never recorded']]];
  const R=[['pdf-extractor-agent','A2A','Data Platform','Document AI','Extracts tables and fields from PDF documents.'],['enterprise-assistant','AGUI','AI Foundry','Productivity','Company-wide assistant with knowledge and graph tools.'],['knowledge-hub-gateway','MCP','AI Foundry','Knowledge','MCP gateway to the AI Foundry knowledge hub.'],['customer-360-agent','A2A','Commercial','Sales','Customer view across commercial systems.'],['pricing-data-gateway','MCP','Commercial','Pricing','Pricing data tools behind token exchange.'],['trade-decision-agent','A2A','Portfolio','Strategy','Supports trade and portfolio decisions.']];
  const body=$('#hbody'),stat=$('#hstat'); let tok=0,user=false,seen=0,cands=0;
  const stats=a=>{ stat.innerHTML=a.map(x=>`<span class="${x[2]||''}"><b>${x[0]}</b><small>${x[1]}</small></span>`).join(''); };
  const noStats=()=>stats([[`${seen} / 6`,'places searched',seen?'bad':''],[cands,'candidates found',cands>1?'bad':''],['?','owner confirmed','bad'],['?','approved?','bad']]);
  function without(){ ++tok; seen=0; cands=0; body.innerHTML=`<div class="sy-places">${P.map((p,i)=>`<button type="button" class="sy-place" data-i="${i}"><small>${p[0]}</small><b>${p[1]}</b><div class="fr"></div><span class="hint">Search here →</span></button>`).join('')}</div>`; noStats();
    $$('#hbody .sy-place').forEach(b=>b.addEventListener('click',()=>{ user=true; openP(b); })); }
  function openP(b){ if(b.classList.contains('open')) return; b.classList.add('open'); const p=P[+b.dataset.i]; b.querySelector('.hint').remove(); b.querySelector('.fr').innerHTML=p[2].map(f=>`<span>${esc(f)}</span>`).join(''); seen++; if(/pdf/i.test(p[2][0])) cands++; noStats(); }
  function withR(){ ++tok; body.innerHTML=`<div class="sy-reg"><div class="sy-sbar"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="none" stroke="#0f256e" stroke-width="1.8"/><path d="M11 11l3.5 3.5" stroke="#0f256e" stroke-width="1.8"/></svg><input id="hq" type="search" value="" placeholder="Search the registry" aria-label="Search the registry"><span>Consumer view · approved only</span></div><div id="hres" class="sy-reg"></div></div>`;
    const q=$('#hq'); const draw=()=>{ const v=q.value.trim().toLowerCase(); const r=R.filter(x=>!v||(x[0]+x[3]+x[4]).toLowerCase().includes(v));
      $('#hres').innerHTML=(r.length?r.slice(0,3).map(x=>`<div class="sy-rcard"><div class="t"><b>${x[0]}</b>${ST('APPROVED')}</div><dl><div><dt>Protocol</dt><dd>${PR(x[1])}</dd></div><div><dt>Owner</dt><dd>${x[2]}</dd></div><div><dt>Business function</dt><dd>${x[3]}</dd></div><div><dt>Description</dt><dd>${x[4]}</dd></div></dl></div>`).join(''):'<p class="sy-hidden">No approved records match.</p>')+(/pdf/.test(v)?'<p class="sy-hidden">2 similar drafts exist, hidden from consumers until an admin approves them.</p>':'');
      const one=/pdf/.test(v); stats([[1,'place searched','good'],[one?1:r.length,one?'approved match':'approved matches','good'],[one?'Yes':'–','owner confirmed',one?'good':''],[one?'Yes':'–','approved?',one?'good':'']]); };
    q.addEventListener('input',()=>{ user=true; draw(); }); draw(); return q; }
  const setMode=segBind($('#hunt'),'data-m',(m,u)=>{ if(u) user=true; m==='no'?without():typeQ(); });
  async function typeQ(){ const q=withR(); const my=tok; for(const c of 'pdf'){ await sleep(220); if(my!==tok) return; q.value+=c; q.dispatchEvent(new Event('input')); } user=false; }
  without();
  onView($('#hunt'),async()=>{ const my=tok; for(const b of $$('#hbody .sy-place')){ await sleep(700); if(user||my!==tok) return; openP(b); } await sleep(1800); if(user||my!==tok) return; setMode('yes'); typeQ(); },.35);
})();

/* DISCOVERY */
(()=>{ const A=[['calculator-agent','A2A',1],['pdf-extractor-agent','A2A',1],['trade-decision-agent','A2A',0],['customer-360-agent','A2A',0],['data-analyst-agent','A2A',0],['defect-triage-agent','A2A',0],['contract-review-agent','A2A',0],['forecast-agent','A2A',0],['enterprise-assistant','AGUI'],['general-productivity-agent','AGUI'],['portfolio-insights-agent','AGUI'],['slide-builder-agent','AGUI'],['sandbox-agent','AGUI'],['data-analysis-agent','AGUI'],['field-advisor-agent','AGUI'],['knowledge-chat-agent','AGUI'],['postgres-mcp-runtime','MCP'],['kb-mcp-runtime','MCP'],['graph-mcp-runtime','MCP']];
  for(let i=1;i<=11;i++) A.push([`http-service-${String(i).padStart(2,'0')}`,'HTTP']); for(let i=1;i<=4;i++) A.push([`runtime-unclassified-${i}`,'UNKNOWN']);
  const ord=[];{ const k=[...A.keys()]; let s=7; while(k.length){ s=(s*31+11)%k.length; ord.push(A[k.splice(s,1)[0]]); } }
  const G=[['knowledge-hub-gateway','NONE',1],['kb-retrieval-gateway','CUSTOM_JWT',1],['postgres-gateway','NONE',1],['quick-start-gateway','NONE',1],['slack-notify-gateway','NONE',1],['tools-manual-gateway','NONE',1],['office-graph-gateway','CUSTOM_JWT',0],['pricing-data-gateway','CUSTOM_JWT',0],['sales-data-gateway','CUSTOM_JWT',0],['sandbox-data-gateway','CUSTOM_JWT',0]];
  const reg=new Map(); let src='agents',tok=0,user=false,running=false;
  const dots=$('#sdots'),cur=$('#scur'),log=$('#slog'),tot=$('#stot'),skip=$('#sskip');
  const L=(t,c='')=>{ log.insertAdjacentHTML('beforeend',`<span class="${c}">${esc(t)}</span>\n`); log.scrollTop=log.scrollHeight; };
  function totals(){ const c={A2A:0,MCP:0,CUSTOM:0}; reg.forEach(v=>c[v]++); tot.innerHTML=`<div><span>A2A records</span><b>${c.A2A}</b></div><div><span>MCP records</span><b>${c.MCP}</b></div><div><span>CUSTOM records</span><b>${c.CUSTOM}</b></div><div class="all"><span>Draft records in the registry</span><b>${reg.size}</b></div>`; }
  function layout(){ const S=src==='agents'?ord:G.map(g=>[g[0],'MCP']); $('#ssrcl').textContent=src==='agents'?`AgentCore runtimes · eu-central-1 · ${S.length} found`:`AgentCore gateways · eu-central-1 · ${S.length} found`;
    dots.innerHTML=S.map((a,i)=>`<i class="${a[1]}" title="${a[0]} · ${a[1]}">${a[1]==='UNKNOWN'?'?':a[1].slice(0,4)}</i>`).join('');
    $('#sleg').innerHTML=src==='agents'?[['A2A','#204ecf'],['AGUI','#7b5cf0'],['MCP','#0a8fc4'],['HTTP / ?','#9aa3b5']].map(x=>`<span><i style="background:${x[1]}"></i>${x[0]}</span>`).join('')+'<span><i style="background:#3dbe8b"></i>written</span>':'<span><i style="background:#0a8fc4"></i>MCP gateway</span><span><i style="background:#3dbe8b"></i>MCP record</span><span><i style="background:#f5b83d"></i>CUSTOM record</span>';
    skip.innerHTML=''; }
  const show=(name,p,steps,res,rc)=>{ cur.innerHTML=`<div class="n"><b>${esc(name)}</b>${PR(p)}</div><ol>${steps.map(s=>`<li class="${s[0]}"><em>${s[0]==='y'?'✓':s[0]==='n'?'✗':'–'}</em><span>${s[1]}</span></li>`).join('')}</ol><div class="res ${rc}">${res}</div>`; };
  async function runAgents(my){ const D=$$('#sdots i'); let ing=0,sk={HTTP:0,MCP:0,UNKNOWN:0},dup=0; L('$ invoke agentcore-registry-ingestion --invocation-type Event','m'); L(`ListAgentRuntimes → ${ord.length} runtimes`);
    for(const [i,a] of ord.entries()){ if(my!==tok) return; const [n,p,card]=a; D.forEach(d=>d.classList.remove('cur')); D[i].classList.add('cur');
      if(p==='HTTP'||p==='UNKNOWN'||p==='MCP'){ sk[p]++; D[i].classList.add('skip'); show(n,p,[['s',p==='MCP'?'MCP runtimes are served through gateways':'Protocol outside the agreed scope']],p==='MCP'?'Skipped here · comes in through gateway ingestion':'Skipped by design','s'); L(`skip  ${n} (${p})`,'m'); await sleep(110); continue; }
      if(reg.has(n)){ dup++; show(n,p,[['y','In scope'],['y','ListRegistryRecords → record already exists']],'No duplicate written','s'); D[i].classList.add('done',reg.get(n)==='CUSTOM'?'cus':'x'); L(`exists ${n} → no duplicate`,'y'); await sleep(260); continue; }
      let steps=[['y',`Protocol ${p} · in scope`]],res,rc,type;
      if(p==='A2A'&&card){ steps.push(['y','get_agent_card → 200 · IAM auth'],['y','Full card: skills, capabilities, URL']); res='A2A record · DRAFT'; rc='a'; type='A2A'; }
      else if(p==='A2A'){ steps.push(['n','get_agent_card → AccessDenied · JWT-protected'],['y','Keep model, gateways, auth · protocol = A2A']); res='CUSTOM record · protocol preserved · DRAFT'; rc='c'; type='CUSTOM'; }
      else { steps.push(['s','AGUI has no registry descriptor type'],['y','Keep model, gateways, auth · protocol = AGUI']); res='CUSTOM record · correct by design · DRAFT'; rc='c'; type='CUSTOM'; }
      show(n,p,steps,res,rc); await sleep(420); if(my!==tok) return; reg.set(n,type); ing++; D[i].classList.add('done'); if(type==='CUSTOM') D[i].classList.add('cus'); totals(); L(`write ${n} → ${type} · DRAFT`,'g'); await sleep(200); }
    D.forEach(d=>d.classList.remove('cur'));
    skip.innerHTML=`<b>Run complete</b><span>${ing} ingested · 0 failed${dup?` · ${dup} already registered`:''}</span><span>${sk.HTTP+sk.MCP+sk.UNKNOWN} skipped by design: ${sk.HTTP} HTTP, ${sk.MCP} MCP, ${sk.UNKNOWN} unknown</span>`;
    L(`done · ingested ${ing} · failed 0 · skipped ${sk.HTTP+sk.MCP+sk.UNKNOWN}`,'g'); }
  async function runGw(my){ const D=$$('#sdots i'); let m=0,c=0,dup=0; L('$ invoke agentcore-gateway-ingestion --invocation-type RequestResponse','m'); L(`ListGateways → ${G.length} gateways`);
    for(const [i,g] of G.entries()){ if(my!==tok) return; const [n,auth,desc]=g; D.forEach(d=>d.classList.remove('cur')); D[i].classList.add('cur');
      if(reg.has(n)){ dup++; show(n,'MCP',[['y','Gateway details fetched'],['y','ListRegistryRecords → record already exists']],'No duplicate written','s'); D[i].classList.add('done'); if(reg.get(n)==='CUSTOM') D[i].classList.add('cus'); L(`exists ${n} → no duplicate`,'y'); await sleep(260); continue; }
      const steps=[['y',`URL, auth ${auth}, tool targets, interceptors`]]; let res,rc,type;
      if(desc){ steps.push(['y','Description present'],['y','MCP schema valid · reverse-DNS name']); res='MCP record · DRAFT'; rc='m'; type='MCP'; m++; }
      else { steps.push(['n','Description empty · JWT blocks schema sync'],['y','Keep URL, targets, audience, interceptors']); res='CUSTOM record · metadata kept · DRAFT'; rc='c'; type='CUSTOM'; c++; }
      show(n,'MCP',steps,res,rc); await sleep(420); if(my!==tok) return; reg.set(n,type); D[i].classList.add('done'); if(type==='CUSTOM') D[i].classList.add('cus'); totals(); L(`write ${n} → ${type} · DRAFT`,'g'); await sleep(180); }
    D.forEach(d=>d.classList.remove('cur'));
    skip.innerHTML=`<b>Run complete · about 10 seconds in real life</b><span>${m} MCP · ${c} CUSTOM (JWT-protected, no description)${dup?` · ${dup} already registered`:''}</span>`; L(`done · ${m} MCP · ${c} CUSTOM`,'g'); }
  async function run(){ const my=++tok; running=true; layout(); log.innerHTML=''; await (src==='agents'?runAgents(my):runGw(my)); if(my===tok) running=false; return my; }
  const setSrc=segBind($('#scan'),'data-s',(v,u)=>{ if(u) user=true; ++tok; src=v; layout(); cur.innerHTML='<p class="demo-note">Press Run discovery.</p>'; });
  $('#srun').addEventListener('click',()=>{ user=true; run(); });
  layout(); totals();
  onView($('#scan'),async()=>{ const my=await run(); if(user||my!==tok) return; await sleep(1600); if(user||my!==tok) return; setSrc('gw'); src='gw'; await run(); },.3);
})();

/* NORMALISE */
(()=>{ const T=[
  {k:'a2a',desc:'Extracts tables and fields from PDF documents',b:'A2A agent card',s:'agent with a working card',path:'descriptors.a2a.agentCard.inlineContent',d:'A2A',name:'pdf-extractor-agent',
   raw:{name:'pdf-extractor-agent',description:'Extracts tables and fields from PDF documents',url:'https://<runtime-endpoint>/invocations',version:'1.0',capabilities:{streaming:true},skills:[{id:'extract-tables',name:'Extract tables'},{id:'summarise',name:'Summarise'}]},
   rows:[['Protocol','A2A','ro'],['Auth type','AWS IAM','ro'],['Network','VPC','ro'],['Capabilities','streaming','ro'],['Skills',['extract-tables','summarise'],'ro'],['URL','<runtime-endpoint>','ro']],
   note:'Agents that expose a working agent card are stored as full A2A records, with their skills and capabilities.'},
  {k:'mcp',desc:'Knowledge hub MCP gateway',b:'MCP server',s:'schema-compliant gateway',path:'descriptors.mcp.server.inlineContent',d:'MCP',name:'knowledge-hub-gateway',
   raw:{name:'<org>.ai/knowledge-hub-gateway',description:'Knowledge hub MCP gateway',version:'1.0.0',schemaVersion:'2025-12-11'},
   rows:[['Protocol','MCP','ro'],['Auth type','NONE','ro'],['Server name','<org>.ai/knowledge-hub-gateway','ro'],['Version','1.0.0','ro']],
   note:'Gateways with a description pass MCP schema validation and are stored as MCP records.'},
  {k:'cag',desc:'Customer view across commercial systems',b:'CUSTOM · agent',s:'JWT-protected A2A agent',path:'descriptors.custom.inlineContent',d:'CUSTOM',name:'customer-360-agent',
   raw:{protocol:'A2A',authType:'CUSTOM_JWT',networkMode:'PUBLIC',model:'eu.anthropic.claude-sonnet-4-6',gateways:['Knowledge Hub','Graph'],serviceName:'customer-360',observability:true,container:'<ecr-image>',agentRuntimeArn:'arn:aws:bedrock-agentcore:…:runtime/<redacted>'},
   rows:[['Protocol','A2A','ro'],['Auth type','CUSTOM_JWT','ro'],['Network','PUBLIC','ro'],['Model','eu.anthropic.claude-sonnet-4-6','ro'],['Gateways',['Knowledge Hub','Graph'],'ro'],['Observability','enabled','ro']],
   note:'This agent is A2A by configuration but has no card endpoint yet, so it is stored as CUSTOM with its protocol kept.',
   up:{btn:'Team ships /.well-known/agent.json → re-run ingestion',to:'A2A',path:'descriptors.a2a.agentCard.inlineContent',raw:{name:'customer-360-agent',description:'Customer view across commercial systems',url:'https://<runtime-endpoint>/invocations',version:'1.0',capabilities:{streaming:true},skills:[{id:'account-summary',name:'Account summary'}]},msg:'Upgraded to a full A2A record on the next ingestion run. No manual registry work, and no metadata lost.'}},
  {k:'cgw',desc:'— (empty in AWS, add it here)',b:'CUSTOM · gateway',s:'JWT gateway, no description',path:'descriptors.custom.inlineContent',d:'CUSTOM',name:'office-graph-gateway',
   raw:{protocol:'MCP',authType:'CUSTOM_JWT',gatewayUrl:'https://<gateway-endpoint>/mcp',gatewayId:'<redacted>',targets:['mail','calendar','files'],allowedAudience:['<app-id>'],interceptors:[],description:''},
   rows:[['Protocol','MCP','ro'],['Auth type','CUSTOM_JWT','ro'],['Gateway URL','<gateway-endpoint>/mcp','ro'],['Targets',['mail','calendar','files'],'ro'],['Allowed audience','<app-id>','ro']],
   note:'An empty description fails MCP schema validation, so the gateway is kept as CUSTOM with every detail preserved.',
   up:{btn:'Owner adds a description → re-run ingestion',to:'MCP',path:'descriptors.mcp.server.inlineContent',raw:{name:'<org>.ai/office-graph-gateway',description:'Microsoft 365 read-only tools',version:'1.0.0',schemaVersion:'2025-12-11'},msg:'With a description it passes schema validation and is re-ingested as a proper MCP record.'}}];
  const COMMON=[['Tags',['Owner','Business function','Environment'],'ed'],['Additional metadata','key / value pairs','ed']];
  let cur=0,up=false;
  $('#ntabs').innerHTML=T.map((t,i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-i="${i}"><b>${t.b}</b><span>${t.s}</span></button>`).join('');
  const hl=o=>esc(JSON.stringify(o,null,2)).replace(/(&quot;[^&]*?&quot;)(\s*:)/g,'<span class="k">$1</span>$2').replace(/:\s(&quot;[^]*?&quot;)/g,': <span class="s">$1</span>');
  function draw(){ const t=T[cur],u=up&&t.up; const d=u?t.up.to:t.d;
    $('#npath').textContent=u?t.up.path:t.path; const pre=$('#nraw'); pre.style.animation='none'; void pre.offsetWidth; pre.style.animation=''; pre.innerHTML=hl(u?t.up.raw:t.raw);
    const rows=[['Name',t.name,'ro'],['Descriptor',d,'ro'],...t.rows,['Description',t.desc,'ed'],...COMMON];
    const rec=$('#nrec'); rec.style.animation='none'; void rec.offsetWidth; rec.style.animation='';
    rec.innerHTML=`<div class="t"><b>${t.name}</b><span>${PR(d)} ${ST('DRAFT')}</span></div><table>${rows.map(r=>`<tr><td>${r[0]}</td><td>${Array.isArray(r[1])?r[1].map(x=>`<span class="sy-chip">${esc(x)}</span>`).join(''):esc(r[1])}<em class="${r[2]}">${r[2]==='ro'?'from AWS':'editable'}</em></td></tr>`).join('')}</table>`;
    $('#nup').innerHTML=t.up?(u?`<p class="ok">✓ ${t.up.msg}</p><button type="button" class="se-btn" id="nupb">↺ Undo</button>`:`<p>${t.note}</p><button type="button" class="se-btn pri" id="nupb">${t.up.btn}</button>`):`<p>${t.note}</p>`;
    const b=$('#nupb'); if(b) b.onclick=()=>{ up=!up; draw(); }; }
  $$('#ntabs button').forEach(b=>b.addEventListener('click',()=>{ cur=+b.dataset.i; up=false; $$('#ntabs button').forEach(x=>x.setAttribute('aria-selected',x===b)); draw(); }));
  draw();
})();

/* GOVERN */
(()=>{ const NODES={DRAFT:[10,100,112,'publisher edits'],PENDING_APPROVAL:[172,100,140,'admin reviews'],APPROVED:[372,26,116,'visible to consumers'],REJECTED:[372,176,116,'reason returned'],DEPRECATED:[512,26,108,'retired']};
  const EDGES=[['sub','DRAFT','PENDING_APPROVAL','M122 126 L172 126','submit',147,118],['app','PENDING_APPROVAL','APPROVED','M312 112 C340 112 340 52 372 52','approve',343,74],['rej','PENDING_APPROVAL','REJECTED','M312 140 C340 140 340 202 372 202','reject',343,186],['dep','APPROVED','DEPRECATED','M488 52 L512 52','deprecate',500,18],['res','REJECTED','PENDING_APPROVAL','M430 228 C430 254 242 254 242 152','resubmit',336,248]];
  $('#gsm').innerHTML=`<svg viewBox="0 0 630 262" role="img" aria-label="DRAFT to PENDING_APPROVAL, then APPROVED or REJECTED; REJECTED can be resubmitted; APPROVED can be deprecated"><defs><marker id="syar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#9aa3b5"/></marker><marker id="syarf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#09b6f9"/></marker></defs>
    ${EDGES.map(e=>`<g class="ed" data-e="${e[0]}"><path d="${e[3]}" marker-end="url(#syar)"/><text x="${e[5]}" y="${e[6]}" text-anchor="middle">${e[4]}</text></g>`).join('')}
    <g class="ed" data-e="bad" style="display:none"><path d="" /></g>
    ${Object.entries(NODES).map(([k,v])=>`<g class="nd" data-n="${k}"><rect x="${v[0]}" y="${v[1]}" width="${v[2]}" height="52"/><text x="${v[0]+v[2]/2}" y="${v[1]+23}" text-anchor="middle">${k.replace('_',' ')}</text><text class="s" x="${v[0]+v[2]/2}" y="${v[1]+39}" text-anchor="middle">${v[3]}</text></g>`).join('')}</svg>
    <div class="sy-smlist">${Object.keys(NODES).map(k=>`<span data-n="${k}">${k.replace('_',' ')}</span>`).join('')}</div>`;
  const EDIT0='Extracts tables and fields from PDF documents.';
  let S,user=false,persona='publishers',tok=0;
  const card=$('#gcard'),logEl=$('#glog');
  function init(){ S={status:'DRAFT',desc:EDIT0,savedDesc:EDIT0,tags:['Type: Agent'],savedTags:['Type: Agent'],reason:'',askReason:false,hist:['Ingested from AgentCore Runtime · DRAFT · system']}; logEl.innerHTML=''; draw(); }
  const fire=(id,bad)=>{ $$('#gsm .ed').forEach(e=>e.classList.remove('fire','bad')); if(id){ const e=$(`#gsm .ed[data-e="${id}"]`); if(e){ e.classList.add(bad?'bad':'fire'); e.querySelector('path').setAttribute('marker-end',bad?'url(#syar)':'url(#syarf)'); setTimeout(()=>{ e.classList.remove('fire','bad'); e.querySelector('path').setAttribute('marker-end','url(#syar)'); },1800); } } };
  const log=(code,req,msg)=>{ logEl.insertAdjacentHTML('afterbegin',`<div class="sy-req"><b class="c${String(code)[0]}">${code}</b><code>${req}</code><span>${esc(msg)}</span></div>`); };
  function draw(){ $$('#gsm .nd').forEach(n=>n.classList.toggle('on',n.dataset.n===S.status)); $$('#gsm .sy-smlist span').forEach(n=>n.classList.toggle('on',n.dataset.n===S.status));
    if(persona==='consumers'&&S.status!=='APPROVED'){ card.innerHTML=`<div class="h"><b>GET /records/{id}</b><span class="sy-pr CUSTOM">consumer</span></div><div class="hide">This record is not visible to consumers.<br><small>Drafts, pending, rejected and deprecated records are filtered on the server.</small></div>`; return; }
    const ro=persona==='consumers';
    card.innerHTML=`<div class="h"><b>pdf-extractor-agent</b>${ST(S.status)}</div><div class="bd">
      <div class="ro"><div><span>Name</span><b>pdf-extractor-agent 🔒</b></div><div><span>Descriptor</span><b>A2A 🔒</b></div><div><span>Source</span><b>AgentCore Runtime 🔒</b></div></div>
      ${S.status==='REJECTED'&&S.reason?`<div class="why"><b>Returned by admin:</b> ${esc(S.reason)}</div>`:''}
      <label>Description<textarea id="gdesc" rows="2" ${ro?'disabled':''}>${esc(S.desc)}</textarea></label>
      <div><label>Tags</label><div class="tags">${S.tags.map(t=>`<span>${esc(t)}</span>`).join('')}${ro||S.tags.length>1?'':'<button type="button" id="gtag">+ Owner: Data Platform</button>'}</div></div></div>
      ${ro?'<div class="hint">Consumers have read-only access to approved records.</div>':`<div class="acts"><button type="button" data-a="save">Save changes</button><button type="button" class="p" data-a="submit">Submit for approval</button><button type="button" data-a="APPROVED">Approve</button><button type="button" class="r" data-a="REJECTED">Reject</button><button type="button" class="x" data-a="DEPRECATED">Deprecate</button></div>
      ${S.askReason?'<div class="rj"><input type="text" id="greason" placeholder="Reason for the publisher" aria-label="Rejection reason" value="Add an owner tag before approval"><button type="button" class="se-btn" data-a="REJECTED!">Send rejection</button></div>':''}
      <div class="hint">Try something the rules forbid, like approving a draft or deprecating a pending record.</div>`}
      <div class="sy-ghist">${S.hist.slice(-4).reverse().map(h=>`<span>· ${esc(h)}</span>`).join('')}</div>`;
    const d=$('#gdesc'); if(d) d.addEventListener('input',()=>{ S.desc=d.value; });
    const t=$('#gtag'); if(t) t.onclick=()=>{ user=true; S.tags.push('Owner: Data Platform'); draw(); };
    $$('#gcard [data-a]').forEach(b=>b.addEventListener('click',()=>{ user=true; act(b.dataset.a); })); }
  const P=()=>persona==='admins'?'admin':persona==='publishers'?'publisher':'consumer';
  function act(a){ const s=S.status;
    if(a==='save'){ const changed=S.desc!==S.savedDesc||S.tags.join()!==S.savedTags.join();
      if(s==='PENDING_APPROVAL'&&persona!=='admins'){ log(403,'PUT /records/{id}','Only admins can edit records that are PENDING_APPROVAL.'); return; }
      if(!['DRAFT','REJECTED','PENDING_APPROVAL'].includes(s)){ log(409,'PUT /records/{id}',`Only DRAFT, REJECTED, or PENDING_APPROVAL (admins only) records can be updated. Current status: ${s}`); fire(null); return; }
      if(!changed){ log(400,'PUT /records/{id}','Provide at least one of: description, tags, additionalMetadata'); return; }
      S.savedDesc=S.desc; S.savedTags=[...S.tags]; S.hist.push(`Metadata updated · ${s} · ${P()}`); log(200,'PUT /records/{id}','Description and tags saved. Name, descriptor and source stay read-only.'); draw(); return; }
    if(a==='submit'){ if(!['DRAFT','REJECTED'].includes(s)){ log(409,'POST /records/{id}/submit',`Cannot submit from ${s}. Record must be in: ['DRAFT', 'REJECTED']`); return; }
      const e=s==='REJECTED'?'res':'sub'; S.status='PENDING_APPROVAL'; S.hist.push(`${s} → PENDING_APPROVAL · ${P()}`); log(200,'POST /records/{id}/submit',`${s} → PENDING_APPROVAL`); fire(e); draw(); return; }
    if(a==='REJECTED'&&persona==='admins'&&s==='PENDING_APPROVAL'&&!S.askReason){ S.askReason=true; draw(); if(user&&$('#greason')) $('#greason').focus({preventScroll:true}); return; }
    const to=a.replace('!','');
    if(persona!=='admins'){ log(403,`PUT /records/{id}/status ${to}`,'Status changes are admin actions. The persona comes from the token, not the request.'); return; }
    const need=to==='DEPRECATED'?'APPROVED':'PENDING_APPROVAL';
    if(s!==need){ log(409,`PUT /records/{id}/status ${to}`,`Cannot move from ${s} to ${to}. Record must be in: ['${need}']`); return; }
    if(to==='REJECTED'){ S.reason=($('#greason')&&$('#greason').value.trim())||'Needs changes'; S.askReason=false; }
    S.status=to; S.hist.push(`${s} → ${to} · admin`); log(200,`PUT /records/{id}/status ${to}`,`${s} → ${to}${to==='REJECTED'?' · reason returned to the publisher':''}`); fire(to==='APPROVED'?'app':to==='REJECTED'?'rej':'dep'); draw(); }
  const setP=segBind($('#gov'),'data-p',(v,u)=>{ if(u) user=true; persona=v; S.askReason=false; draw(); });
  $('#greset').onclick=()=>{ user=true; init(); };
  init();
  onView($('#gov'),async()=>{ const step=async(f,ms=1500)=>{ await sleep(ms); if(user) throw 0; f(); };
    try{ await step(()=>{ S.desc=EDIT0+' Supports scanned and digital files.'; draw(); },900); await step(()=>act('save')); await step(()=>act('submit'));
      await step(()=>{ setP('admins'); persona='admins'; draw(); }); await step(()=>act('REJECTED')); await step(()=>act('REJECTED!'),1300);
      await step(()=>{ setP('publishers'); persona='publishers'; draw(); }); await step(()=>{ S.tags.push('Owner: Data Platform'); draw(); }); await step(()=>act('save'),1100); await step(()=>act('submit'));
      await step(()=>{ setP('admins'); persona='admins'; draw(); }); await step(()=>act('APPROVED')); await step(()=>{ setP('consumers'); persona='consumers'; draw(); },1800);
    }catch(e){} },.3);
})();

/* ACCESS */
(()=>{ const K=[['consumers','Consumer','groups: [consumers]'],['publishers','Publisher','groups: [publishers]'],['admins','Admin','groups: [admins]'],['nogroup','No group claim','groups: []'],['none','No token','Authorization: —'],['forged','Tampered token','bad signature']];
  const R=[['pdf-extractor-agent','APPROVED'],['knowledge-hub-gateway','APPROVED'],['enterprise-assistant','APPROVED'],['customer-360-agent','APPROVED'],['slide-builder-agent','DRAFT'],['sales-data-gateway','DRAFT'],['forecast-agent','REJECTED'],['field-advisor-agent','PENDING_APPROVAL'],['kb-retrieval-gateway','PENDING_APPROVAL'],['calculator-agent','DEPRECATED']];
  const ALLOW={consumers:['APPROVED'],publishers:['DRAFT','REJECTED','PENDING_APPROVAL','APPROVED'],admins:['DRAFT','REJECTED','PENDING_APPROVAL','APPROVED','DEPRECATED']};
  const STEPS=[['Browser','GET /api/records with the Cognito bearer token'],['CloudFront','/api/* goes to API Gateway; everything else serves the React app'],['Lambda authorizer','Verifies the signature against Cognito keys, checks issuer, expiry and audience, then resolves the persona'],['Catalog API','Intersects the requested statuses with what this persona may see'],['AgentCore Registry','Lists and normalises the matching records']];
  let k='consumers',tok=0,user=false;
  $('#atok').innerHTML=K.map(x=>`<button type="button" data-k="${x[0]}" aria-pressed="${x[0]===k}"><b>${x[1]}</b><span>${x[2]}</span></button>`).join('');
  $('#apath').innerHTML=STEPS.map((s,i)=>`<li><em>${i+1}</em><div><b>${s[0]}</b><span>${s[1]}</span></div></li>`).join('');
  $('#arecs').innerHTML=R.map(r=>`<div class="sy-ar"><b>${r[0]}</b>${ST(r[1])}</div>`).join('');
  const res=$('#ares');
  async function go(){ const my=++tok; const li=$$('#apath li'),rows=$$('#arecs .sy-ar'); li.forEach(l=>l.className=''); rows.forEach(r=>r.className='sy-ar'); res.className='sy-ares'; res.innerHTML='Sending…';
    const draft=$('#adraft').checked; const deny=k==='none'||k==='forged'; const persona=k==='nogroup'?'consumers':k;
    for(let i=0;i<5;i++){ if(my!==tok) return; li[i].classList.add('on'); await sleep(420); li[i].classList.remove('on');
      if(i===2&&deny){ li[i].classList.add('no'); li[3].classList.add('off'); li[4].classList.add('off'); res.className='sy-ares no'; res.innerHTML=k==='none'?'<b>Deny · 401.</b> No token, so the request never reaches the business logic.':'<b>Deny.</b> The signature does not match Cognito\'s keys. Nothing behind the authorizer runs.'; $('#alab').textContent='Records returned: none'; rows.forEach(r=>r.classList.add('out')); return; }
      li[i].classList.add('ok'); }
    const allowed=ALLOW[persona],req=draft?['DRAFT']:allowed,eff=req.filter(s=>allowed.includes(s));
    rows.forEach((r,i)=>r.classList.add(eff.includes(R[i][1])?'in':'out')); const n=R.filter(x=>eff.includes(x[1])).length;
    $('#alab').textContent=`Records returned: ${n} of ${R.length}`;
    res.className='sy-ares ok'; res.innerHTML=`<b>Allow · persona = ${persona}</b>${k==='nogroup'?' (no group, so the most restrictive default)':''}<br><code>requested {${req.join(', ')}} ∩ allowed {${allowed.join(', ')}}</code> = ${eff.length?`{${eff.join(', ')}}`:'∅'} · ${n} record${n===1?'':'s'}`; }
  $$('#atok button').forEach(b=>b.addEventListener('click',()=>{ user=true; k=b.dataset.k; $$('#atok button').forEach(x=>x.setAttribute('aria-pressed',x===b)); go(); }));
  $('#adraft').addEventListener('change',()=>{ user=true; go(); });
  $('#ago').addEventListener('click',()=>{ user=true; go(); });
  onView($('#acc'),async()=>{ await go(); await sleep(2600); if(user) return; $('#adraft').checked=true; go(); },.3);
})();

/* ARCHITECTURE */
(()=>{ const COLS=[['Edge',[['browser','Browser','React catalog for all three personas'],['cf','CloudFront','/api/* → API Gateway · everything else → S3'],['s3','S3','static React build']]],['API · eu-central-1',[['apigw','API Gateway','HTTP API, named stage "api"'],['auth','Lambda authorizer','Cognito JWT → persona'],['cog','Cognito','user pool with three groups']]],['Lambdas · eu-central-1',[['cat','Catalog & governance API','browse, edit, submit, approve, reject, deprecate'],['ing','Registry ingestion','A2A and AGUI agents'],['gwi','Gateway ingestion','MCP gateways']]],['AgentCore',[['rt','Runtimes','eu-central-1'],['gw','Gateways','eu-central-1'],['reg','AgentCore Registry','eu-west-1 · the catalog itself']]]];
  const PATHS={open:{l:'Open the catalog',n:['browser','cf','s3'],s:['The browser loads the React app from CloudFront.','Any path outside /api/* is served from S3, falling back to index.html for app routes.']},
    approve:{l:'Approve a record',n:['browser','cf','apigw','auth','cog','cat','reg'],s:['The admin presses Approve; the request carries a Cognito token.','CloudFront routes /api/* to the HTTP API.','The Lambda authorizer verifies the token against Cognito\'s keys and resolves persona = admins.','The governance API checks the state machine: PENDING_APPROVAL → APPROVED is allowed.','The record is updated in the AgentCore Registry in eu-west-1.']},
    ingest:{l:'Run ingestion',n:['ing','gwi','rt','gw','reg'],s:['The ingestion Lambdas run beside the runtimes and gateways in eu-central-1.','They read protocol, auth, model, gateways and tool targets for every asset.','Each record is checked against the registry first, so re-runs never duplicate.','New assets are written cross-region into the registry in eu-west-1 as DRAFT.']}};
  const LAY=[['Consumer layer',['Web and mobile apps','Chat UI']],['Agentic AI layer',['AgentCore Runtime','Orchestration','Agent memory'],'src'],['Integration layer',['MCP Gateway','Model gateway','Identity'],'src'],['Resource layer',['MCP servers','Lambda','Enterprise systems','Data platforms']],['Development toolkit',['Infrastructure as code','Agent code','Evaluation','Observability']],['Governance layer',[['Agent registry · this project','us'],['MCP / tool registry · this project','us'],['Skills library · next phase']],'gov']];
  const view=$('#aview'),det=$('#adet'),btn=$('#abtn'); let tok=0,user=false;
  function paths(){ btn.innerHTML=Object.entries(PATHS).map(([k,p])=>`<button type="button" class="se-btn" data-p="${k}" aria-pressed="false">${p.l}</button>`).join('');
    view.innerHTML=`<div class="sy-amap">${COLS.map(c=>`<div class="col"><small>${c[0]}</small>${c[1].map(n=>`<div class="n" data-n="${n[0]}"><b>${n[1]}</b><span>${n[2]}</span></div>`).join('')}</div>`).join('')}</div>`;
    det.innerHTML='<b>Pick a path above</b> to see how a request moves through the system.';
    $$('#abtn button').forEach(b=>b.addEventListener('click',()=>{ user=true; trace(b.dataset.p); })); }
  async function trace(k){ const my=++tok,p=PATHS[k]; $$('#abtn button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===k)); $$('#aview .n').forEach(n=>{ n.classList.remove('on'); n.classList.toggle('dim',!p.n.includes(n.dataset.n)); n.querySelector('em')&&n.querySelector('em').remove(); });
    det.innerHTML=`<b>${p.l}</b><ol id="aol"></ol>`;
    for(const [i,id] of p.n.entries()){ if(my!==tok) return; const n=$(`#aview .n[data-n="${id}"]`); if(!n) return; n.classList.add('on'); n.insertAdjacentHTML('beforeend',`<em>${i+1}</em>`); await sleep(330); }
    for(const s of p.s){ if(my!==tok||!$('#aol')) return; $('#aol').insertAdjacentHTML('beforeend',`<li>${s}</li>`); await sleep(260); } }
  function layers(){ ++tok; btn.innerHTML=''; view.innerHTML=`<div class="sy-layers">${LAY.map(l=>`<div class="sy-ly ${l[2]==='gov'?'gov':''}" data-s="${l[2]||''}"><b>${l[0]}</b><div>${l[1].map(x=>Array.isArray(x)?`<span class="${x[1]}">${x[0]}</span>`:`<span>${x}</span>`).join('')}</div></div>`).join('')}</div>`;
    det.innerHTML='<b>The registry is the governance layer.</b> It reads agents from the Agentic AI layer and gateways from the Integration layer, and every team discovers approved assets through it.';
    $$('#aview .sy-ly[data-s="src"]').forEach(l=>l.classList.add('src')); }
  segBind($('#archx'),'data-v',(v,u)=>{ if(u) user=true; v==='paths'?paths():layers(); });
  paths();
  onView($('#archx'),async()=>{ await sleep(500); if(user) return; await trace('approve'); await sleep(3500); if(user) return; trace('ingest'); },.3);
})();

/* CONSTRAINTS */
(()=>{ const C=[['No IaC support for the registry','AgentCore Registry had no Terraform or CDK support.','A one-time bootstrap, everything else in code','A boto3 call creates the registry once; Terraform owns the API, identity and IAM, and the Serverless Framework owns the Lambdas.'],
  ['No native tags on records','Registry records rejected the standard AWS tagging API.','Tags inside the record itself','Tags live in each record\'s own content, so every list and read returns them, with no extra database or sync job.'],
  ['Four formats, and AGUI fits none','Descriptor formats differ, and AGUI agents have no descriptor type at all.','One normalisation layer','AGUI agents are stored as CUSTOM with the protocol preserved, and every format becomes the same clean record.'],
  ['Agents hidden behind JWT','JWT-protected agents could not serve their agent cards to the SDK.','CUSTOM now, A2A later','Full runtime metadata is captured today; the record upgrades itself to A2A on the next run once a card endpoint exists.'],
  ['Two IaC tools, one API','The HTTP API belonged to Terraform, so the Serverless Framework could not attach authorizers to it.','A post-deploy attachment step','Every pipeline deployment attaches the Lambda authorizer to each protected route automatically.'],
  ['One handler, two payload formats','The same code ran behind two API Gateway payload versions and a named "api" stage.','Routing that reads both','The handler understands both payload shapes and the platform\'s stage prefix, so one codebase works wherever it is deployed.']];
  const f=$('#flip'); f.innerHTML=C.map((c,i)=>`<button type="button" class="sy-fc" aria-pressed="false" aria-label="${esc(c[0])}: flip to see the solution"><span class="in"><span class="fa"><small>Constraint ${i+1}</small><b>${c[0]}</b><span class="tx">${c[1]}</span><span class="go">See what we built ↻</span></span><span class="ba"><small>What we built</small><b>${c[2]}</b><span class="tx">${c[3]}</span><span class="go">↻ Back</span></span></span></button>`).join('');
  const cards=$$('#flip .sy-fc'); let user=false;
  cards.forEach(c=>c.addEventListener('click',()=>{ user=true; const on=!c.classList.contains('on'); c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }));
  $('#flipall').onclick=()=>{ user=true; const on=!cards.every(c=>c.classList.contains('on')); cards.forEach(c=>{ c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }); $('#flipall').textContent=on?'Show the constraints':'Flip all cards'; };
  onView(f,async()=>{ if(RM) return; await sleep(1200); for(const c of cards){ if(user) return; c.classList.add('on'); await sleep(900); c.classList.remove('on'); await sleep(150); } },.4);
})();

/* PIPELINE */
(()=>{ const ST=[['validate','Validate','every feature/* push'],['lint','Lint','pyflakes on all four Lambdas'],['tag','Tag check','dev/v* or release/v*'],['gate','Manual gate','a person presses play'],['oidc','OIDC → AWS','short-lived role, no stored keys'],['deploy','Deploy','serverless deploy + attach authorizer']];
  const el=$('#pst'),msg=$('#pmsg'),play=$('#pplay'); let tok=0,user=false;
  el.innerHTML=ST.map(s=>`<div class="sy-stg" data-s="${s[0]}"><em>idle</em><b>${s[1]}</b><span>${s[2]}</span></div>`).join('');
  const S=k=>$(`#pst [data-s="${k}"]`);
  const set=(k,c,t)=>{ const e=S(k); e.className='sy-stg '+c; e.querySelector('em').textContent=t; };
  const M=(t,c='')=>{ msg.className='sy-pmsg '+c; msg.innerHTML=t; };
  async function runS(k,my){ set(k,'run','running'); await sleep(700); if(my!==tok) throw 0; set(k,'ok','passed'); }
  async function act(a){ const my=++tok;
    try{ if(a==='play'){ play.disabled=true; set('gate','ok','approved'); M('Deploying…'); await runS('oidc',my); await runS('deploy',my); M('<b>Deployed to dev.</b> Short-lived credentials via OIDC, Lambdas deployed, and the authorizer attached to every protected route.','ok'); return; }
      ST.forEach(s=>set(s[0],'','idle')); play.disabled=true; M(`Pipeline started for <code>${a==='push'?'feature/governance-api':a==='badtag'?'dev-v0.1.0':'dev/v0.2.0'}</code>…`);
      await runS('validate',my); await runS('lint',my);
      if(a==='push'){ ['tag','gate','oidc','deploy'].forEach(k=>set(k,'skip','not run')); M('<b>Validated and linted.</b> Nothing deployed: a branch push never reaches AWS.'); return; }
      set('tag','run','checking'); await sleep(600); if(my!==tok) return;
      if(a==='badtag'){ set('tag','no','no match'); ['gate','oidc','deploy'].forEach(k=>set(k,'skip','not run')); M('<b>Only validation ran.</b> dev-v0.1.0 does not match dev/v*, so nothing was deployed, even though the pipeline shows green.','no'); return; }
      set('tag','ok','matched'); set('gate','wait','waiting'); play.disabled=false; M('<b>Waiting for a person.</b> The tag matched; a deployment still needs someone to press ▶ Run deploy_dev.','wait');
    }catch(e){} }
  $$('#pipe [data-a]').forEach(b=>b.addEventListener('click',()=>{ user=true; act(b.dataset.a); }));
  M('Push a branch or a tag to see what runs.');
  onView($('#pipe'),async()=>{ await sleep(600); if(user) return; await act('tag'); },.4);
  const T=[['Early June','Registry created; runtime and gateway discovery'],['June 5','First ingestion: 24 records, 14 agents and 10 gateways'],['June 8–9','Governance API built; state machine validated'],['Mid-June','Frontend integrated with the live API'],['June 16–18','GitLab pipeline with OIDC deployments'],['June 18','Cognito authorizer wired; personas enforced'],['June 19','Final demo to the client; feedback fixed the same day']];
  const tl=$('#tl'); tl.innerHTML=`<span class="lbl">Three weeks, end to end</span><ol>${T.map(t=>`<li><em>${t[0]}</em><b>${t[1]}</b></li>`).join('')}</ol>`;
  onView(tl,async()=>{ for(const li of $$('#tl li')){ li.classList.add('in'); await sleep(260); } },.3);
})();

/* PROOF */
(()=>{ const P=[['pubtabs','Publisher lifecycle tabs','Drafts, submitted, approved and rejected, each a tab for the publisher.'],['adminq','Admin approval queue','Pending approvals beside approved, rejected and deprecated records.'],['consumer','Consumer catalog','Consumers see approved records only.'],['record','Approved record','Type, tags and version history for an approved MCP tool.'],['drafts','Publisher drafts','Ingested agents and gateways waiting for metadata and submission.'],['deprecated','Deprecated filter','Admins can still find retired records; consumers cannot.'],['detail','Record detail','Full metadata, with fields that still need attention flagged.'],['grid','Card grid view','Search, type and tag filters, and sorting in the catalog.']];
  const g=$('#proofg'); g.innerHTML=P.map((p,i)=>`<button type="button" data-i="${i}"><img src="${IMG[p[0]]}" alt="${p[1]}: ${p[2]}" loading="lazy"><span><b>${p[1]}</b>${p[2]}</span></button>`).join('');
  $$('#proofg button').forEach(b=>b.addEventListener('click',()=>{ const p=P[+b.dataset.i]; LB(p[0],p[1]+' · '+p[2],b); }));
})();

/* RESULTS */
(()=>{ const BA=[['Agents scattered across AWS, found by asking around','One registry, filled by automated discovery'],['Ownership and metadata unclear','Normalised records with tags and owners'],['Approvals handled case by case','One lifecycle, enforced by the API'],['No rule for who sees what','Three personas, filtered on the server'],['Manual deploys from a console','Tagged, gated deploys with no stored keys'],['No view of what already exists','Consumers browse only approved, vetted assets']];
  $('#ba').innerHTML='<span class="lbl">Before and after</span>'+BA.map(b=>`<div><span class="b">${b[0]}</span><i>→</i><span class="a">${b[1]}</span></div>`).join('');
  onView($('#ba'),()=>$('#ba').classList.add('in'),.25);
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to; if(RM||!to) return; onView(b,async()=>{ for(let i=0;i<=20;i++){ b.textContent=Math.round(to*i/20); await sleep(30); } },.5); });
})();
