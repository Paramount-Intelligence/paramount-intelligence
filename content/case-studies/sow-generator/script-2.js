__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const onView=(el,fn,th=.35)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const visible=(el,cb)=>{ new IntersectionObserver(es=>cb(es[0].isIntersecting),{threshold:.15}).observe(el); };
const IMG={"gen": "/images/case-studies/fx-01-general-info.webp", "scope": "/images/case-studies/fx-02-scope.webp", "scopesel": "/images/case-studies/fx-03-scope-selected.webp", "add": "/images/case-studies/fx-04-additional-info.webp", "hdr": "/images/case-studies/fx-05-header-period.webp", "assume": "/images/case-studies/fx-06-assumptions.webp", "prereq": "/images/case-studies/fx-07-prerequisites.webp", "tl": "/images/case-studies/fx-08-timeline.webp", "resp": "/images/case-studies/fx-09-responsibilities.webp", "docx": "/images/case-studies/fx-10-generated-docx.webp", "sso": "/images/case-studies/fx-11-checklist-sso.webp", "summ": "/images/case-studies/fx-12-checklist-summary.webp", "xls": "/images/case-studies/fx-13-checklist-export.webp"};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.12});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* lightbox */
const LB=(()=>{ const lb=$('#lb'),li=$('#lbimg'),lc=$('#lbcap'); let last=null;
  const close=()=>{ lb.hidden=true; last&&last.focus(); }; $('#lbx').onclick=close; lb.addEventListener('click',e=>{ if(e.target===lb) close(); }); addEventListener('keydown',e=>{ if(e.key==='Escape'&&!lb.hidden) close(); });
  return (k,cap,from)=>{ last=from||document.activeElement; li.src=IMG[k]; li.alt=cap; lc.textContent=cap; lb.hidden=false; $('#lbx').focus(); }; })();

/* ===== THE ENGINE (shared) ===== */
const SCOPE={devops:['EBS','OIC','JDBC','APEX','SOA','PeopleSoft','Salesforce','Python'],
  cm:['Fusion - ERP','Fusion - HCM','EBS - Financials','EBS - HRMS','Migrations'],
  int:['Source Control Management (SCM)','Issue Tracking System (ITS)','Change Management System (CMS)','Single Sign On (SSO)','Test Automation','Code Quality / Scan'],
  other:['Upgrade & Training','Source Code Conversion','Customer Managed to SaaS Migration','DevOps Assessment']};
const GROUP={devops:'Deployment targets / DevOps',cm:'CM Packs',int:'Integrations',other:'Other scope'};
const HOSTED=['Source Control Management (SCM)','Issue Tracking System (ITS)','Change Management System (CMS)'];
const OTHER_H={'Upgrade & Training':40,'Source Code Conversion':40,'Customer Managed to SaaS Migration':40,'DevOps Assessment':20};
const RULE={ 'BR-001':'Scope normalized into four canonical groups, duplicates removed','BR-019':'Requirements inserted because DevOps scope exists','BR-023':'Technology content retrieved from Qdrant sow_templates','BR-024':'Aliases, fixed blocks, rules and overrides loaded from PostgreSQL','BR-025':'40-hour weekly capacity; overflow creates continuation weeks','BR-027':'One daily stand-up row per week, de-duplicated','BR-016':'CM Packs retrieved as one Configuration Management aggregate','BR-017':'CM Packs sized at {h} hours ({why})','BR-009':'SCM label variants normalized to one canonical key','BR-010':'SCM retrieved with zero hours','BR-014':'Zero-hour rows hosted inside a positive-hour week','BR-013':'Source Code Conversion kept separate from SCM, with its own hours','BR-020':'Production Cutover sized at {h} hours for {n} DevOps technolog{y}','BR-021':'HyperCare sized at {h} hours for {n} DevOps technolog{y}','BR-022':'Project Wrap added at the end with zero hours','BR-026':'Every row stamped with its owning scope group, key and label','BR-028':'Upgrade & Training branch selects its own template','BR-007':'At least one scope item is required' };
function engine(sel){ const s={devops:[],cm:[],int:[],other:[]}; Object.keys(s).forEach(g=>s[g]=SCOPE[g].filter(x=>sel.has(g+':'+x)));
  const fired=[]; const fire=(id,vars)=>{ let t=RULE[id]; if(vars) Object.entries(vars).forEach(([k,v])=>t=t.replace('{'+k+'}',v)); fired.push([id,t]); };
  const total=s.devops.length+s.cm.length+s.int.length+s.other.length;
  if(!total){ fire('BR-007'); return {weeks:[],fired,s,total:0,pending:[]}; }
  fire('BR-001'); fire('BR-024'); fire('BR-023');
  const items=[];
  if(s.devops.length){ items.push({g:'fixed',t:'Requirements',h:40,o:'fixed:requirements'}); fire('BR-019'); }
  s.devops.forEach(d=>items.push({g:'devops',t:d+' implementation',h:40,o:'devops:'+d}));
  if(s.cm.length){ const mig=s.cm.includes('Migrations'); items.push({g:'cm',t:'Configuration Management ('+s.cm.join(', ')+')',h:mig?60:40,o:'cm_packs:aggregate'}); fire('BR-016'); fire('BR-017',{h:mig?60:40,why:mig?'a Migrations selection':'no Migrations selected'}); }
  const hosted=[];
  s.int.forEach(i=>{ if(HOSTED.includes(i)) hosted.push({g:'int',t:i,h:0,o:'integrations:'+i}); else items.push({g:'int',t:i,h:20,o:'integrations:'+i}); });
  if(s.int.includes('Source Control Management (SCM)')){ fire('BR-009'); fire('BR-010'); }
  s.other.forEach(o=>items.push({g:'other',t:o,h:OTHER_H[o],o:'other:'+o}));
  if(s.other.includes('Source Code Conversion')) fire('BR-013');
  if(s.other.includes('Upgrade & Training')) fire('BR-028');
  const n=s.devops.length;
  if(n){ const h=n>4?40:20, y=n===1?'y':'ies'; items.push({g:'fixed',t:'Production Cutover',h,o:'fixed:cutover',fin:1}); items.push({g:'fixed',t:'HyperCare',h,o:'fixed:hypercare',fin:1}); fire('BR-020',{h,n,y}); fire('BR-021',{h,n,y}); }
  items.push({g:'fixed',t:'Project Wrap',h:0,o:'fixed:wrap',fin:1}); fire('BR-022');
  // pack into 40h weeks
  const weeks=[]; let w=null; const nw=()=>{ w={rows:[],used:0}; weeks.push(w); };
  nw(); let cont=false;
  items.forEach(it=>{ if(it.h===0){ w.rows.push({...it}); return; }
    let left=it.h,first=true; while(left>0){ if(w.used>=40) nw(); const take=Math.min(left,40-w.used); w.rows.push({...it,h:take,t:first?it.t:it.t+' (continued)'}); if(!first) cont=true; w.used+=take; left-=take; first=false; } });
  fire('BR-025'); if(cont) fired[fired.length-1][1]+=' (continuation used)';
  // host zero-hour integrations
  const host=weeks.find(wk=>wk.rows.some(r=>(r.g==='devops'||r.g==='cm')&&r.h>0)); const pending=[];
  if(hosted.length){ if(host){ const i=host.rows.findIndex(r=>(r.g==='devops'||r.g==='cm')); host.rows.splice(i+1,0,...hosted.map(h=>({...h,hosted:1}))); fire('BR-014'); } else { pending.push(...hosted); fire('BR-014'); fired[fired.length-1][1]='No positive-hour host week: zero-hour rows reported as pending diagnostics'; } }
  fire('BR-027'); fire('BR-026');
  weeks.forEach(wk=>wk.rows.unshift({g:'std',t:'Daily stand-up (15 min)',h:0,o:'general:standup'}));
  return {weeks,fired,s,total,pending}; }
const GC={fixed:'#646c7e',devops:'#204ecf',cm:'#3dbe8b',int:'#09b6f9',other:'#7b5cf0',std:'#c4cbd9',human:'#f5b83d'};

/* HERO */
(()=>{ const sel=new Set(['devops:EBS','devops:OIC','cm:Fusion - ERP','int:Source Control Management (SCM)']);
  const R=engine(sel),sc=$('#hscope'),wk=$('#hweeks'),tb=$('#htb'),doc=$('#hdoc');
  const chips=['EBS','OIC','Fusion - ERP','SCM'];
  function draw(k){ // k: 0..3 phases
    sc.innerHTML=chips.map((c,i)=>`<span class="${k>=1||i<k?'on':''}" style="transition-delay:${i*120}ms">${c}</span>`).join('');
    wk.innerHTML=R.weeks.map((w,i)=>`<div class="${k>=2?'on':''}" style="transition-delay:${i*160}ms"><em>W${i+1}</em><span>${w.rows.filter(r=>r.g!=='std').map(r=>`<i style="background:${GC[r.g]};flex:${Math.max(r.h,6)}" title="${esc(r.t)}"></i>`).join('')}</span><b>${w.rows.filter(r=>r.g!=='std'&&r.h>0)[0]?.t.replace(' implementation','').replace(/Configuration Management.*/,'Config Mgmt')||'Wrap'}</b></div>`).join('');
    doc.classList.toggle('on',k>=3); tb.innerHTML=k>=3?R.weeks.map((w,i)=>`<i style="animation-delay:${i*120}ms"></i>`).join(''):''; }
  if(RM){ draw(3); return; }
  let vis=true; visible($('#hx'),v=>vis=v);
  (async()=>{ while(true){ for(let k=0;k<4;k++){ while(!vis) await sleep(400); draw(k); await sleep(k===3?3800:1500); } } })();
})();

/* PROBLEM: two estimators and the platform */
(()=>{ const S=['EBS','OIC','Fusion - ERP','SCM','Jira'];
  $('#tscope').innerHTML=S.map(s=>`<span class="on">${s}</span>`).join('');
  const sel=new Set(['devops:EBS','devops:OIC','cm:Fusion - ERP','int:Source Control Management (SCM)','int:Issue Tracking System (ITS)']); const R=engine(sel);
  const P=[['Requirements','#646c7e'],['EBS','#204ecf'],['OIC','#204ecf'],['Config Mgmt','#3dbe8b'],['Cutover + HyperCare','#646c7e']];
  const box=$('#twin'); let runs=0;
  const rnd=(a,b)=>Math.round((a+Math.random()*(b-a))*2)/2;
  function manual(el){ const L=[rnd(.5,1.5),rnd(1,2.5),rnd(.5,2),rnd(.5,1.5),rnd(.5,1.5)],T=L.reduce((a,b)=>a+b,0);
    el.querySelector('.bars').innerHTML=L.map((l,i)=>`<i style="flex:${l};background:${P[i][1]}" title="${P[i][0]}: ${l} wk"><span>${l}w</span></i>`).join('');
    el.querySelector('.tot').innerHTML=`<b>${T} weeks</b>${runs?'<em class="n">changed again</em>':''}`; }
  function rule(){ const el=$('#estC'),T=R.weeks.length;
    el.querySelector('.bars').innerHTML=R.weeks.map((w,i)=>`<i style="flex:1;background:${GC[w.rows.find(r=>r.g!=='std'&&r.h>0)?.g||'fixed']}" title="Week ${i+1}"><span>W${i+1}</span></i>`).join('');
    el.querySelector('.tot').innerHTML=`<b>${T} weeks</b>${runs?'<em class="y">identical ✓</em>':''}`; }
  function go(){ manual($('#estA')); manual($('#estB')); rule(); box.classList.remove('fx-flash'); void box.offsetWidth; box.classList.add('fx-flash'); runs++; }
  let user=false; $('#tagain').onclick=()=>{ user=true; go(); }; go(); runs=0;
  onView(box,async()=>{ if(RM) return; for(let i=0;i<3;i++){ await sleep(2400); if(user) return; go(); } },.4);
})();

/* LIFECYCLE */
(()=>{ const L=[['Capture','Form App','GET /webhook/sow-form','One single-page app captures company, SOW metadata, scope, technical answers and signers.',
    `<div class="fx-mock form"><div><small>Company</small><b>[Client name]</b></div><div><small>SOW</small><b>001 · CST · Customer Managed</b></div><div class="w"><small>Scope</small><span class="fx-chips sm"><span class="on">EBS</span><span class="on">OIC</span><span class="on">Fusion - ERP</span><span class="on">SCM</span></span></div><div class="w"><small>Signers</small><b>Client · Customer</b></div></div>`],
   ['Save','Draft Save','POST /webhook/sow-draft/save','The whole SOW is saved as one versioned JSONB state through save_sow_draft. Load and List bring it back, searchable by company.',
    `<pre class="fx-json">{
  "company": { "name": "[Client]" },
  "sow": { "number": "001", "start_date": "2026-07-06" },
  "scope": { "devops": ["EBS","OIC"], "cm_packs": ["Fusion - ERP"],
             "integrations": ["SCM"], "other": [] },
  "answers": { … }, "signers": { … },
  "version": 3, "latest": true
}</pre>`],
   ['Generate for review','Generate DOCX · timeline_only','POST /webhook/generate-sow-docx','The engine builds a canonical timeline from catalog content and 30+ rules, and returns it for review instead of a document.',
    `<div class="fx-mock weeks">${engine(new Set(['devops:EBS','devops:OIC','cm:Fusion - ERP','int:Source Control Management (SCM)'])).weeks.map((w,i)=>`<div><em>W${i+1}</em>${w.rows.filter(r=>r.g!=='std').map(r=>`<span style="border-color:${GC[r.g]}">${esc(r.t.replace(' implementation',''))}${r.hosted?' · 0h':''}</span>`).join('')}</div>`).join('')}</div>`],
   ['Review and edit','Form App · Timeline tab','reviewer in the browser','A reviewer inspects the weeks, edits tasks, adds rows and reorders them. Their judgment goes into the plan.',
    `<div class="fx-mock weeks edit"><div><em>W1</em><span style="border-color:#646c7e">Requirements</span><span class="hu">+ Customer workshop: branching strategy</span></div><div><em>W2</em><span style="border-color:#204ecf">EBS</span><span style="border-color:#09b6f9">SCM · 0h</span></div><div><em>W3</em><span style="border-color:#204ecf">OIC</span><span class="hu">✎ Extra UAT support for finance</span></div></div>`],
   ['Approve','approved_sections.timeline_weeks','persisted with the draft','The edited timeline is saved as approved. From now on it is authoritative and is not silently regenerated.',
    `<div class="fx-mock fx-lk"><span class="seal">APPROVED</span><b>Timeline v3 · reviewed</b><small>Authoritative for rendering and for future scope changes</small></div>`],
   ['Render','Generate DOCX · use_existing','Docxtemplater + mounted template','The final Word document is rendered from the approved state into the standard or Upgrade &amp; Training template.',
    `<div class="fx-mock docx"><span class="logo">[CLIENT]</span><b>SOW [Client] 001 – Implementation Services</b><i></i><i></i><i class="s"></i><em>Project Timeline</em><div class="tb"><i></i><i></i><i></i><i></i></div><span class="ext">.docx</span></div>`]];
  const rail=$('#lrail'),body=$('#lbody'); rail.innerHTML=L.map((l,i)=>`<button type="button" role="tab" data-i="${i}"><em>${i+1}</em><b>${l[0]}</b>${i>=4?'<i class="auth" title="authoritative state"></i>':''}</button>`).join(''); const B=$$('#lrail button');
  let cur=0,user=false;
  function show(i){ cur=i; B.forEach((b,k)=>{ b.classList.toggle('on',k===i); b.classList.toggle('done',k<i); b.setAttribute('aria-selected',k===i); }); const l=L[i];
    body.innerHTML=`<div class="fx-lt"><span class="n">Step ${i+1} of 6</span><h3>${l[0]}</h3><p>${l[3]}</p><div class="wf"><small>Handled by</small><b>${l[1]}</b><code>${l[2]}</code></div>${i>=4?'<span class="fx-auth">Reviewed state is authoritative</span>':''}</div><div class="fx-lv">${l[4]}</div>`; }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; show(+b.dataset.i); })); show(0);
  onView(rail,()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); show((cur+1)%L.length); },3600); },.4);
})();

/* ENGINE: interactive builder */
(()=>{ const sel=new Set(['devops:EBS','devops:OIC','cm:Fusion - ERP','int:Source Control Management (SCM)']);
  const sc=$('#escope'),sum=$('#esum'),wk=$('#eweeks'),rl=$('#erules');
  sc.innerHTML=Object.keys(SCOPE).map(g=>`<div class="g"><small><i style="background:${GC[g]}"></i>${GROUP[g]}</small><div class="fx-chips">${SCOPE[g].map(x=>`<button type="button" data-k="${esc(g+':'+x)}" aria-pressed="false">${esc(x.replace(' (SCM)',' (SCM)'))}</button>`).join('')}</div></div>`).join('')+`<div class="fx-presets"><small>Try</small><button type="button" data-p="big">6 DevOps targets</button><button type="button" data-p="mig">CM Packs + Migrations</button><button type="button" data-p="scm">SCM only</button><button type="button" data-p="clr">Clear</button></div>`;
  const CB=$$('#escope .fx-chips button');
  let prev=new Set(),user=false;
  function draw(){ CB.forEach(b=>b.setAttribute('aria-pressed',sel.has(b.dataset.k))); const R=engine(sel);
    if(!R.total){ sum.innerHTML='<span class="err">Validation error · BR-007: at least one scope item is required</span>'; wk.innerHTML=''; }
    else { const hrs=R.weeks.reduce((a,w)=>a+w.rows.reduce((x,r)=>x+r.h,0),0); const tpl=R.s.other.includes('Upgrade & Training')?'master_sow_upgrade_training.docx':'master-sow-template.docx';
      sum.innerHTML=`<div><b>${R.weeks.length}</b><span>weeks</span></div><div><b>${hrs}</b><span>hours</span></div><div><b>${R.total}</b><span>scope items</span></div><div class="t"><span>Template</span><b class="mono">${tpl}</b></div>`;
      wk.innerHTML=R.weeks.map((w,i)=>{ const u=w.rows.reduce((a,r)=>a+r.h,0); return `<div class="fx-wk"><div class="h"><b>Week ${i+1}</b><span>${u} / 40 h</span><i><em style="width:${u/40*100}%"></em></i></div>${w.rows.map(r=>`<div class="r ${r.g}${r.hosted?' hosted':''}"><i style="background:${GC[r.g]}"></i><span>${esc(r.t)}</span><em>${r.hosted?'0 h · hosted':r.h?r.h+' h':r.g==='std'?'':'0 h'}</em></div>`).join('')}</div>`; }).join('')+(R.pending.length?`<div class="fx-pend">pending_zero_hour_rows: ${R.pending.map(p=>esc(p.t)).join(', ')} · no positive-hour host week</div>`:''); }
    rl.innerHTML=R.fired.map(f=>`<li class="${prev.size&&!prev.has(f[0]+f[1])?'new':''}"><code>${f[0]}</code><span>${esc(f[1])}</span></li>`).join(''); prev=new Set(R.fired.map(f=>f[0]+f[1])); }
  CB.forEach(b=>b.addEventListener('click',()=>{ user=true; sel.has(b.dataset.k)?sel.delete(b.dataset.k):sel.add(b.dataset.k); draw(); }));
  const PRE={big:['devops:EBS','devops:OIC','devops:JDBC','devops:APEX','devops:SOA','devops:Salesforce','int:Source Control Management (SCM)'],mig:['devops:EBS','cm:Fusion - ERP','cm:EBS - Financials','cm:Migrations','int:Source Control Management (SCM)'],scm:['int:Source Control Management (SCM)'],clr:[]};
  $$('#escope .fx-presets button').forEach(b=>b.onclick=()=>{ user=true; sel.clear(); PRE[b.dataset.p].forEach(k=>sel.add(k)); draw(); });
  draw();
  onView($('#eng'),async()=>{ if(RM) return; const seq=[['devops:JDBC',1],['cm:Migrations',1],['other:Upgrade & Training',1],['other:Upgrade & Training',0],['cm:Migrations',0],['devops:JDBC',0]]; for(const [k,on] of seq){ await sleep(1900); if(user) return; on?sel.add(k):sel.delete(k); draw(); } },.3);
})();

/* RECONCILE */
(()=>{ const B=[[['fixed','Requirements · general introductions',40],['human','Customer workshop: branching strategy',0]],[['devops','EBS implementation',40],['int','Source Control Management (SCM)',0,1]],[['devops','OIC implementation',30,0,'rm'],['human','Extra UAT support for finance team',10]],[['fixed','Production Cutover',20],['fixed','HyperCare',20],['fixed','Project Wrap',0]]];
  const RECON=[[['fixed','Requirements · general introductions',40],['human','Customer workshop: branching strategy',0,0,'keep']],[['devops','EBS implementation',40],['int','Source Control Management (SCM)',0,1],['int','Issue Tracking System (ITS) · Jira',0,1,'add']],[['human','Extra UAT support for finance team',10,0,'keep']],[['devops','Salesforce implementation',40,0,'add']],[['fixed','Production Cutover',20],['fixed','HyperCare',20],['fixed','Project Wrap',0]]];
  const REGEN=[[['fixed','Requirements · general introductions',40]],[['devops','EBS implementation',40],['int','Source Control Management (SCM)',0,1],['int','Issue Tracking System (ITS) · Jira',0,1]],[['devops','Salesforce implementation',40]],[['fixed','Production Cutover',20],['fixed','HyperCare',20],['fixed','Project Wrap',0]]];
  const ST=['Remove owned rows','Preserve mixed weeks','Generate added scope','Insert before final phases','Merge zero-hour rows','Renumber'];
  const steps=$('#rsteps'),bf=$('#rbefore'),af=$('#rafter'),verd=$('#rverd'),afl=$('#raftl'),SB=$$('#rec .seg button');
  let mode='recon',tok=0,user=false;
  const wkHtml=(W,mark)=>W.map((w,i)=>`<div class="fx-rw"><b>W${i+1}</b><div>${w.map(r=>`<div class="r ${r[0]}${r[4]&&mark?' '+r[4]:''}"><i style="background:${GC[r[0]]}"></i><span>${esc(r[1])}</span><em>${r[3]?'0 h hosted':r[2]?r[2]+' h':''}</em></div>`).join('')}</div></div>`).join('');
  bf.innerHTML=wkHtml(B,1);
  function setMode(m){ mode=m; SB.forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===m)); steps.innerHTML=m==='recon'?ST.map((s,i)=>`<span><em>${i+1}</em>${s}</span>`).join(''):'<span class="x"><em>1</em>Discard the approved timeline</span><span class="x"><em>2</em>Generate everything again from current scope</span>'; af.innerHTML='<div class="fx-wait">Press "Apply the change"</div>'; verd.innerHTML=''; afl.textContent='After'; }
  async function play(){ const my=++tok; const S=$$('#rsteps span'); af.innerHTML=''; verd.innerHTML='';
    for(let i=0;i<S.length;i++){ if(my!==tok) return; S.forEach((s,k)=>{ s.classList.toggle('on',k===i); s.classList.toggle('done',k<i); }); await sleep(RM?0:520); }
    S.forEach(s=>{ s.classList.remove('on'); s.classList.add('done'); });
    if(mode==='recon'){ af.innerHTML=wkHtml(RECON,1); afl.textContent='After · reconciled'; verd.innerHTML='<b class="g">✓ Both reviewer edits kept.</b> Only OIC-owned rows removed; Salesforce added before Cutover; Jira merged into the EBS week; weeks renumbered.'; }
    else { af.innerHTML=wkHtml(REGEN,1); afl.textContent='After · regenerated'; verd.innerHTML='<b class="r">✕ 2 reviewer edits lost.</b> The workshop row and the extra UAT support disappeared. Someone has to find and redo them by hand.'; } }
  SB.forEach(b=>b.addEventListener('click',()=>{ user=true; tok++; setMode(b.dataset.m); }));
  $('#rplay').onclick=()=>{ user=true; play(); };
  setMode('recon');
  onView($('#rec'),async()=>{ if(RM){ play(); return; } await sleep(600); if(user) return; setMode('regen'); await play(); await sleep(3200); if(user) return; setMode('recon'); play(); },.35);
})();

/* COPILOT */
(()=>{ const N=[['wh','Webhook','POST /webhook/sow-command'],['norm','Normalize context','allow-list, scope aliases'],['det','Detect lifecycle command','create · open · copy'],['prompt','Build parser prompt','operations + output schema'],['ai','Claude parser','temperature 0'],['parse','Parse response','candidate operations'],['val','Validate and normalize','reject unsupported'],['cls','Classify','runtime vs database'],['sql','Parameterized SQL','built by workflow logic'],['db','PostgreSQL','lifecycle action'],['resp','Respond','to the Form App']];
  const Q=['Create a new SOW for Acme Corp','Add Jira and remove OIC','Copy SOW 001 for Globex','Make it 8 weeks and add a UAT week','Delete every draft in the database'];
  const pipe=$('#cpipe'),out=$('#cout'),note=$('#cnote'),inp=$('#cin');
  pipe.innerHTML=N.map(n=>`<div class="n" data-n="${n[0]}"><b>${n[1]}</b><small>${n[2]}</small></div>`).join(''); const NN={}; $$('#cpipe .n').forEach(n=>NN[n.dataset.n]=n);
  $('#cq').innerHTML='<small>Try</small>'+Q.map(q=>`<button type="button">${q}</button>`).join('');
  const ALL=[...SCOPE.devops,...SCOPE.cm,'Jira','ServiceNow','Okta','Salesforce'];
  function plan(c){ const t=c.trim(),l=t.toLowerCase();
    let m=l.match(/^(create|new|start)\b.*?(?:for\s+)(.+)$/i); if(m) return {path:'det',route:'db',ops:[{op:'create_sow',company:t.replace(/^.*?for\s+/i,'')}],msg:'Deterministic lifecycle command. The model was never called; PostgreSQL ran parameterized SQL.'};
    m=l.match(/^(copy|duplicate)\b/); if(m) return {path:'det',route:'db',ops:[{op:'copy_sow',source:(t.match(/\d{3}/)||['current'])[0],company:(t.match(/for\s+(.+)$/i)||[,'same company'])[1]}],msg:'Deterministic lifecycle command. No model call; a new draft version was written by parameterized SQL.'};
    m=l.match(/^open\b/); if(m) return {path:'det',route:'db',ops:[{op:'open_sow',ref:t.replace(/^open\s+/i,'')}],msg:'Deterministic lifecycle command, handled without the model.'};
    if(/(delete|drop|truncate|wipe|erase)\b/.test(l)) return {path:'ai',route:'reject',ops:[],msg:'Rejected. The parsed request is not in the allow-list of operations, so nothing changed.',bad:'delete_all_drafts'};
    const ops=[]; const add=t.match(/add\s+([^,]+?)(?=\s+and\s+remove|\s+and\s+|,|$)/i), rem=t.match(/remove\s+([^,]+?)(?=\s+and\s+|,|$)/i);
    const norm=x=>{ const k=ALL.find(a=>a.toLowerCase()===x.trim().toLowerCase()); return k||x.trim(); };
    if(add){ const a=norm(add[1]); if(/jira|servicenow/i.test(a)) ops.push({op:'add_scope',group:'integrations',item:'Issue Tracking System (ITS)',tool:a}); else if(/week/i.test(a)) ops.push({op:'add_timeline_week',title:a.replace(/\s*week$/i,'').replace(/^an?\s+/i,'')}); else ops.push({op:'add_scope',group:SCOPE.devops.includes(a)?'devops':'other',item:a}); }
    if(rem){ const r=norm(rem[1]); ops.push({op:'remove_scope',group:SCOPE.devops.includes(r)?'devops':'other',item:r}); }
    const wks=l.match(/(\d+)\s*weeks?/); if(wks) ops.unshift({op:'set_duration_weeks',weeks:+wks[1]});
    if(ops.length) return {path:'ai',route:'runtime',ops,msg:'Free-form command. Claude parsed it into operations, which were validated and applied in the browser. No database write.'};
    return {path:'ai',route:'reject',ops:[],msg:'Rejected. The parser found no supported operation, so nothing changed.',bad:'unknown'}; }
  let tok=0;
  async function run(c){ const my=++tok,p=plan(c); Object.values(NN).forEach(n=>n.className='n'); out.textContent='…'; note.innerHTML='';
    const path=['wh','norm','det'].concat(p.path==='det'?[]:['prompt','ai','parse']).concat(['val']).concat(p.route==='reject'?[]:['cls']).concat(p.route==='db'?['sql','db']:[]).concat(p.route==='reject'?[]:['resp']);
    Object.keys(NN).forEach(k=>{ if(!path.includes(k)) NN[k].classList.add('skip'); });
    for(const k of path){ if(my!==tok) return; NN[k].classList.add('on'); await sleep(RM?0:330); NN[k].classList.remove('on'); NN[k].classList.add('done'); }
    if(p.route==='reject'){ NN.val.classList.remove('done'); NN.val.classList.add('bad'); }
    out.textContent=JSON.stringify(p.route==='reject'?{ok:false,error:'unsupported_operation',parsed:p.bad}:{ok:true,route:p.route==='db'?'database':'runtime',operations:p.ops},null,2);
    note.innerHTML=`<span class="${p.route==='reject'?'r':p.route==='db'?'b':'g'}">${p.path==='det'?'Model bypassed':'Model as parser only'} · ${p.route==='reject'?'nothing changed':p.route==='db'?'database via parameterized SQL':'browser edit, no database write'}</span><p>${p.msg}</p>`; }
  let user=false; $('#crun').onclick=()=>{ user=true; run(inp.value); }; inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ user=true; run(inp.value); } });
  $$('#cq button').forEach(b=>b.onclick=()=>{ user=true; inp.value=b.textContent; run(b.textContent); });
  onView($('#cop'),async()=>{ await run(inp.value); if(RM) return; let i=0; while(!user){ await sleep(5200); if(user) return; i=(i+1)%Q.length; inp.value=Q[i]; await run(Q[i]); } },.35);
})();

/* RENDER */
(()=>{ const R=engine(new Set(['devops:EBS','devops:OIC','cm:Fusion - ERP','int:Source Control Management (SCM)']));
  const st={company:'[Client]',sow:'001',type:'standard',timeline_weeks:R.weeks.map((w,i)=>({week:i+1,rows:w.rows.filter(r=>r.g!=='std').map(r=>r.t.replace(' implementation','')+(r.h?` (${r.h}h)`:''))}))};
  const js=$('#rjson'),doc=$('#rdoc'),tpl=$('#rtpl'),B=$$('#ren .seg button'); let user=false;
  function draw(t){ B.forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===t)); st.type=t==='upg'?'upgrade_training':'standard';
    js.textContent=JSON.stringify(st,null,1).replace(/\n\s+"rows"/g,' "rows"').replace(/\[\n\s+/g,'[').replace(/\n\s+\]/g,']').replace(/",\n\s+"/g,'", "');
    tpl.textContent=t==='upg'?'master_sow_upgrade_training.docx':'master-sow-template.docx';
    const head=t==='upg'?['Upgrade &amp; Training Services','Upgrade Scope','Training Plan']:['Implementation Services','Scope of Work and Deliverables','In Scope'];
    doc.className='fx-rdoc '+t; doc.innerHTML=`<div class="pg"><div class="hd"><span class="logo">[CLIENT]</span><span class="ad">[Address] · [Website]</span></div><i class="band"></i><b class="ti">SOW [Client] 001 – ${head[0]}</b><div class="meta"><span>Date</span><span>Performed by</span><span>Performed for</span></div><em>Period of Performance</em><i class="l"></i><i class="l s"></i><em>${head[1]}</em><i class="l"></i><i class="l s"></i><em>Project Timeline</em><table>${st.timeline_weeks.map(w=>`<tr><td>Week ${w.week}</td><td>${w.rows.map(esc).join('<br>')}</td></tr>`).join('')}</table><span class="same">Same timeline in both templates</span></div><button type="button" class="se-shotlink" id="rreal">See a real generated SOW ↗</button>`;
    $('#rreal').onclick=e=>LB('docx','Generated SOW (customer name blurred)',e.target); doc.classList.remove('in'); void doc.offsetWidth; doc.classList.add('in'); }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; draw(b.dataset.t); })); draw('std');
  onView($('#ren'),()=>{ if(RM) return; let t='std'; const iv=setInterval(()=>{ if(user) return clearInterval(iv); t=t==='std'?'upg':'std'; draw(t); },3800); },.4);
})();

/* CHECKLIST: tiered matching + soft delete */
(()=>{ const CAT=[{m:'Single Sign On (SSO)',t:'SSO',s:'Azure AD SSO (OpenId Connect)'},{m:'Single Sign On (SSO)',t:'SSO',s:'Okta SSO'},{m:'Issue Tracking',t:'Jira',s:'Jira Cloud'},{m:'EBS',t:'Deployment Target',s:'EBS'}];
  const LOADED={okta:{title:'Okta SSO',label:'Single Sign On (SSO)',want:1},jira:{title:'Jira',label:'Jira',want:2},ebs:{title:'EBS Applications',label:'EBS',want:3}};
  const n=x=>x.toLowerCase().replace(/\s+/g,' ').trim();
  $('#mcat').innerHTML='<small>Global catalog rows, in order</small>'+CAT.map((c,i)=>`<div data-i="${i}"><em>${i+1}</em><span><b>${c.s}</b><small>main: ${c.m} · tool: ${c.t}</small></span></div>`).join('');
  const CR=$$('#mcat > div'),SB=$$('#chk .fx-match .seg button'); let user=false,tok=0;
  async function run(k){ const my=++tok,L=LOADED[k]; SB.forEach(b=>b.setAttribute('aria-pressed',b.dataset.s===k)); CR.forEach(c=>c.className='');
    // single pass OR
    let one=null,oneSteps=[]; for(let i=0;i<CAT.length;i++){ const c=CAT[i]; const hit=n(c.s)===n(L.title)?'section_title':n(c.s)===n(L.label)?'section_title vs label':n(c.t)===n(L.label)?'tool_category':n(c.m)===n(L.label)?'main_category':null; oneSteps.push(`Row ${i+1}: ${hit?'matches on '+hit:'no match'}`); if(hit){ one=i; break; } }
    const P=[['section_title = title',c=>n(c.s)===n(L.title)],['section_title = label',c=>n(c.s)===n(L.label)],['tool_category = label',c=>n(c.t)===n(L.label)],['main_category = label',c=>n(c.m)===n(L.label)]];
    let tier=null,tierSteps=[]; for(let p=0;p<P.length;p++){ const i=CAT.findIndex(P[p][1]); tierSteps.push(`Pass ${p+1} · ${P[p][0]}: ${i<0?'no row':'row '+(i+1)}`); if(i>=0){ tier=i; break; } }
    $('#mOne').innerHTML=''; $('#mTier').innerHTML=''; $('#mOneR').innerHTML=''; $('#mTierR').innerHTML='';
    for(const s of oneSteps){ if(my!==tok) return; $('#mOne').insertAdjacentHTML('beforeend',`<span>${s}</span>`); await sleep(RM?0:260); }
    const okA=one===L.want; $('#mOneR').innerHTML=`<b class="${okA?'g':'r'}">${okA?'✓':'✕'} ${CAT[one].s}</b>`; CR[one].classList.add(okA?'g':'r');
    for(const s of tierSteps){ if(my!==tok) return; $('#mTier').insertAdjacentHTML('beforeend',`<span>${s}</span>`); await sleep(RM?0:260); }
    const okB=tier===L.want; $('#mTierR').innerHTML=`<b class="${okB?'g':'r'}">${okB?'✓':'✕'} ${CAT[tier].s}</b>`; CR[tier].classList.add(okB?'g':'r');
    $('#mTierR').insertAdjacentHTML('beforeend',`<small>Loaded section "${L.title}", technology label "${L.label}"</small>`); }
  SB.forEach(b=>b.addEventListener('click',()=>{ user=true; run(b.dataset.s); }));
  onView($('#chk'),async()=>{ await run('okta'); if(RM) return; await sleep(4200); if(user) return; await run('jira'); await sleep(3800); if(user) return; run('okta'); },.3);
  // soft delete
  const ITEMS=['Okta domain URL','Okta API token','Redirect URI registered'];
  let removed=false; const btn=$('#sbtn');
  function sd(){ $('#sCat').innerHTML=ITEMS.map((t,i)=>`<li class="${removed&&i===1?'off':''}">${t}${removed&&i===1?'<em>enabled = false</em>':''}</li>`).join('');
    $('#sSess').innerHTML=ITEMS.map((t,i)=>`<li class="done">✓ ${t}${removed&&i===1?'<em>kept · value intact</em>':''}</li>`).join('');
    $('#sNew').innerHTML=ITEMS.filter((t,i)=>!(removed&&i===1)).map(t=>`<li>☐ ${t}</li>`).join('');
    btn.textContent=removed?'Restore "Okta API token"':'Remove "Okta API token"'; }
  btn.onclick=()=>{ removed=!removed; sd(); }; sd();
  onView($('#sbtn'),async()=>{ if(RM) return; await sleep(1600); if(!removed){ removed=true; sd(); } },.6);
})();

/* ARCHITECTURE */
(()=>{ const W=[['form','Services Copilot · Form App','GET /webhook/sow-form',1,[],'Browser UI delivery and client-side orchestration for capture, drafts, review, Copilot and generation.'],
   ['gen','SOW API · Generate DOCX','POST /webhook/generate-sow-docx',1,['pg','qd','fs'],'Canonical timeline generation and reconciliation, plus final standard or Upgrade & Training DOCX rendering.'],
   ['cmd','SOW API · Copilot Commands','POST /webhook/sow-command',1,['pg','qd','ai'],'Constrained natural-language parsing plus deterministic lifecycle database actions.'],
   ['save','SOW API · Draft Save','POST /webhook/sow-draft/save',1,['pg'],'Validates and persists the complete draft payload through save_sow_draft(jsonb).'],
   ['load','SOW API · Draft Load','POST /webhook/sow-draft/load',1,['pg'],'Loads a single draft through load_sow_draft(uuid), with controlled missing-ID behaviour.'],
   ['list','SOW API · Draft List','POST /webhook/sow-draft/list',1,['pg'],'Lists the latest draft summaries with optional search and company filters.'],
   ['mig','SOW DB Migrations','manual',0,['pg'],'Schema, function and configuration migration, plus the base_v1 seed of timeline rules and fixed blocks.'],
   ['sync','Sync Qdrant Catalog','manual',0,['qd','pg'],'Snapshots Qdrant sow_templates metadata into PostgreSQL, repairs classifications and reports mapping health.']];
  const ST=[['pg','PostgreSQL','Drafts, configuration, rules, overrides, approved timelines, catalog snapshot'],['qd','Qdrant','sow_templates: reusable technology content'],['fs','Mounted files','Standard and Upgrade & Training DOCX templates'],['ai','Anthropic Claude','Command parser only, temperature 0']];
  const REL=[['Back up','PostgreSQL, Qdrant snapshot, templates and workflow JSON exports'],['Change a copy','Edit an inactive copy of the workflow, never the live one'],['Regression','Run representative fixtures and compare timeline and document output'],['Smoke test','Exercise the endpoint before promotion'],['Promote','Activate the new copy; one active owner per webhook path'],['Keep the previous','The prior version is retained for rollback']];
  const view=$('#aview'),det=$('#adet'),lab=$('#alab'),B=$$('#archx .seg button'); let tok=0,user=false;
  function map(){ view.innerHTML=`<div class="fx-amap"><div class="col"><small>Browser</small><div class="br">Form App in the browser<span>calls the APIs</span></div></div><div class="col wf"><small>Eight n8n workflows</small><div class="g">${W.map(w=>`<button type="button" class="w${w[3]?'':' mt'}" data-k="${w[0]}"><b>${w[1]}</b><code>${w[2]}</code><em>${w[3]?'Active':'Manual · maintenance'}</em></button>`).join('')}</div></div><div class="col"><small>Stores and services</small>${ST.map(s=>`<div class="st" data-s="${s[0]}"><b>${s[1]}</b><span>${s[2]}</span></div>`).join('')}</div></div>`;
    const WB=$$('.fx-amap .w'),SS=$$('.fx-amap .st');
    const pick=k=>{ const w=W.find(x=>x[0]===k); WB.forEach(b=>b.classList.toggle('on',b.dataset.k===k)); SS.forEach(s=>s.classList.toggle('on',w[4].includes(s.dataset.s))); det.innerHTML=`<b>${w[1]}.</b> ${w[5]}`; lab.textContent=w[3]?'Serves production traffic':'Run manually for maintenance'; };
    WB.forEach(b=>b.onclick=()=>{ user=true; tok++; pick(b.dataset.k); }); return pick; }
  async function rel(fail){ const my=++tok; view.innerHTML=`<div class="fx-rel">${REL.map((r,i)=>`<div class="s"><em>${i+1}</em><b>${r[0]}</b><span>${r[1]}</span></div>`).join('')}</div><div class="fx-relb"><button type="button" class="se-btn" id="rok">▶ Promote a change</button><button type="button" class="se-btn" id="rbad">▶ Simulate a failed smoke test</button></div>`;
    $('#rok').onclick=()=>{ user=true; rel(false); }; $('#rbad').onclick=()=>{ user=true; rel(true); };
    const S=$$('.fx-rel .s'); lab.textContent=''; det.innerHTML='Every production change follows the same path.';
    for(let i=0;i<S.length;i++){ if(my!==tok) return; S[i].classList.add('on'); await sleep(RM?0:600);
      if(fail&&i===3){ S[i].classList.remove('on'); S[i].classList.add('bad'); det.innerHTML='<b>Smoke test failed.</b> The change is never promoted; the live workflow keeps serving, and backups are ready if anything needs restoring.'; return; }
      S[i].classList.remove('on'); S[i].classList.add('done'); }
    det.innerHTML='<b>Promoted.</b> The new version is live, and the previous version is kept for an instant rollback.'; }
  function setV(v){ B.forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v)); if(v==='map'){ tok++; const pick=map(); pick('gen'); return pick; } rel(false); }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; setV(b.dataset.v); }));
  let pick=setV('map');
  onView($('#archx'),async()=>{ if(RM) return; const ks=['gen','cmd','save','sync','form']; for(const k of ks){ await sleep(2200); if(user) return; pick(k); } },.3);
})();

/* PROOF */
(()=>{ const P=[['gen','General info','Company, SOW, dates, implementation type and signers.'],['scope','Scope','DevOps targets, CM Packs, integrations and other scope.'],['scopesel','Scope selected','Selections counted per group as the SOW takes shape.'],['add','Additional info','Technology questions, with required fields flagged.'],['hdr','Header and period','Review and edit before generating.'],['assume','Assumptions','Editable assumptions carried into the document.'],['prereq','Prerequisites','Client prerequisites with responsible roles.'],['tl','Timeline','Week-by-week tasks the reviewer can edit and reorder.'],['resp','Responsibilities','Provider and customer responsibilities, commercial terms.'],['docx','Generated SOW','The final Word document, rendered from approved state.'],['sso','Readiness checklist','Per-technology items with notes and environment values.'],['summ','Checklist summary','Technology-level readiness from the SOW scope.'],['xls','Checklist export','Completed checklist exported per technology.']];
  const g=$('#proofg'); g.innerHTML=P.map((p,i)=>`<button type="button" data-i="${i}"><img src="${IMG[p[0]]}" alt="${p[1]}: ${p[2]}" loading="lazy"><span><b>${p[1]}</b>${p[2]}</span></button>`).join('');
  $$('#proofg button').forEach(b=>b.addEventListener('click',()=>{ const p=P[+b.dataset.i]; LB(p[0],p[1]+' · '+p[2],b); }));
})();

/* RESULTS */
(()=>{ const BA=[['Copy-paste assembly across tools','One browser app from first input to final document'],['Re-entering engagement details','Versioned drafts you can save, reload and search'],['Timelines estimated by judgment','Reproducible timelines from 30+ codified rules'],['Scope changes wiped reviewed edits','Ownership-aware reconciliation keeps them'],['Formatting tangled with content','Templates own layout; the engine owns logic'],['No safe way to use AI','Constrained commands, deterministic database changes']];
  $('#ba').innerHTML='<span class="lbl">Before and after</span>'+BA.map(b=>`<div><span class="b">${b[0]}</span><i>→</i><span class="a">${b[1]}</span></div>`).join('');
  onView($('#ba'),()=>$('#ba').classList.add('in'),.3);
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to,suf=b.dataset.suf||''; if(RM) return; onView(b,async()=>{ for(let f=0;f<=24;f++){ b.textContent=Math.round(to*f/24)+suf; await sleep(28); } },.6); });
})();
