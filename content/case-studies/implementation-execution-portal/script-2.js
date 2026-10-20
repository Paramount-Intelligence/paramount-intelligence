__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const onView=(el,fn,th=.3)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const IMG={"portfolio": "/images/case-studies/ep-01-portfolio.webp", "overview": "/images/case-studies/ep-02-project-overview.webp", "sow": "/images/case-studies/ep-03-sow-roadmap.webp", "req": "/images/case-studies/ep-04-requirements.webp", "udoc": "/images/case-studies/ep-05-user-documentation.webp", "tc": "/images/case-studies/ep-06-to-confirm.webp", "ss": "/images/case-studies/ep-07-screenshot-needed.webp", "groovy": "/images/case-studies/ep-08-groovy-scripts.webp", "advisor": "/images/case-studies/ep-09-product-advisor.webp", "rc": "/images/case-studies/ep-10-review-center.webp", "risk": "/images/case-studies/ep-11-risk-analysis.webp", "status": "/images/case-studies/ep-12-reports-status.webp", "activity": "/images/case-studies/ep-13-activity.webp", "usage": "/images/case-studies/ep-14-ai-usage.webp", "deliv": "/images/case-studies/ep-15-deliverables.webp"};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>n.toLocaleString('en-US');
const segBind=(root,attr,cb)=>{ const B=[...root.querySelectorAll('button['+attr+']')]; B.forEach(b=>b.addEventListener('click',()=>{ B.forEach(x=>x.setAttribute('aria-pressed',x===b)); cb(b.getAttribute(attr),true); })); return v=>{ B.forEach(x=>x.setAttribute('aria-pressed',x.getAttribute(attr)===v)); }; };
const DOCS=[['Requirements',32],['Solution Design',32],['Implementation Runbook',25],['User Documentation',40]];

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
(()=>{ const chips=['EBS','OIC','Fusion - ERP','GitHub','Jira'];
  const H=[['Requirements',32],['Solution Design',32],['Runbook',25],['User Docs',40]];
  $('#hdocs').innerHTML=H.map((d,i)=>`<div class="ep-hd" data-i="${i}"><b>${d[0]}</b><span class="n">0 / ${d[1]} approved</span><div class="sq">${'<i></i>'.repeat(d[1])}</div><div class="fl"></div><span class="st">APPROVED</span></div>`).join('');
  const T=['Grounded in Confluence · support history · approved exemplars · checklist','Requirements generating per technology in scope','TO-CONFIRM raised instead of a guess','Requirements 100% approved → Solution Design starts','Runbook and user guides generated when the engagement is ready','Every section approved by a consultant'];
  const tick=$('#htick'); const cards=$$('#hdocs .ep-hd');
  const setT=i=>{ tick.textContent='› '+T[i]; };
  function final(){ $('#hchips').innerHTML=chips.map(c=>`<span>${c}</span>`).join(''); cards.forEach((c,i)=>{ c.querySelectorAll('.sq i').forEach(q=>q.className='a'); c.classList.add('ok'); c.querySelector('.n').textContent=`${H[i][1]} / ${H[i][1]} approved`; }); setT(5); }
  if(RM){ final(); return; }
  async function doc(i,flags){ const c=cards[i],Q=[...c.querySelectorAll('.sq i')],fl=c.querySelector('.fl');
    for(let k=0;k<Q.length;k+=2){ Q[k].className='g'; Q[k+1]&&(Q[k+1].className='g'); await sleep(45); if(k>1){ Q[k-2].className='d'; Q[k-1]&&(Q[k-1].className='d'); } }
    Q.forEach(q=>q.className='d');
    for(let f=0;f<flags;f++){ fl.insertAdjacentHTML('beforeend','<span class="ep-flag tc">To confirm</span>'); await sleep(240); }
    return async()=>{ for(const s of fl.children){ s.className='ep-flag ok'; s.textContent='Resolved'; await sleep(220); }
      for(let k=0;k<Q.length;k++){ Q[k].className='a'; c.querySelector('.n').textContent=`${k+1} / ${Q.length} approved`; await sleep(16); } c.classList.add('ok'); await sleep(300); fl.innerHTML=''; }; }
  async function loop(){ for(;;){ $('#hchips').innerHTML=''; cards.forEach((c,i)=>{ c.classList.remove('ok'); c.querySelector('.fl').innerHTML=''; c.querySelectorAll('.sq i').forEach(q=>q.className=''); c.querySelector('.n').textContent=`0 / ${H[i][1]} approved`; });
      setT(0); for(const ch of chips){ $('#hchips').insertAdjacentHTML('beforeend',`<span>${ch}</span>`); await sleep(220); }
      await sleep(400); setT(1); const a=await doc(0,2); setT(2); await sleep(900); await a(); setT(3);
      const b=await doc(1,1); await sleep(500); setT(4); const [c,d]=await Promise.all([doc(2,1),doc(3,2)]); await sleep(600); await b(); await c(); await d(); setT(5); await sleep(3600); } }
  loop(); })();

/* PROBLEM */
(()=>{ const S=[['sow','Signed SOW','scope & discovery answers'],['chk','Readiness checklist','customer environment values'],['docs','Product docs','which platform version?'],['tix','Support tickets','known issues, past fixes'],['past','Past documents','written for other customers'],['ref','Groovy & REST refs','scripting and API guides']];
  $('#srcs').innerHTML=S.map(s=>`<div class="ep-src" data-k="${s[0]}"><b>${s[1]}</b><span>${s[2]}</span><em></em></div>`).join('');
  const body=$('#hbody'),warn=$('#hwarn'),stat=$('#hstat'); let tok=0,user=false,mode='hand';
  const SEQ=[['sow',1,''],['docs',0,''],['docs',1,'Opened the 10.0 page. The customer runs 11.1.'],['past',1,''],['past',0,'Pasted structure from another customer\'s document.'],['chk',1,''],['tix',0,''],['ref',0,''],['sow',0,'Open question left in the prose: "repo name?"']];
  const stats=(a)=>{ stat.innerHTML=a.map(x=>`<span class="${x[2]||''}"><b>${x[0]}</b><small>${x[1]}</small></span>`).join(''); };
  const reset=()=>{ body.innerHTML='<span class="cur"></span>'; warn.innerHTML=''; $$('#srcs .ep-src').forEach(e=>{ e.className='ep-src'; e.querySelector('em').textContent=''; }); };
  async function hand(){ const my=++tok; reset(); let tabs=0,lines=0,h=0; const cnt={};
    stats([[0,'tabs opened'],[0,'lines written'],['0 h','time spent'],[0,'questions tracked']]);
    for(const [k,ln,w] of SEQ){ if(my!==tok) return; const el=$(`#srcs [data-k="${k}"]`); $$('#srcs .ep-src').forEach(e=>e.classList.remove('on')); el.classList.add('on'); cnt[k]=(cnt[k]||0)+1; el.querySelector('em').textContent=cnt[k]+'×'; tabs++; h+=.4;
      await sleep(RM?0:700); if(my!==tok) return;
      if(ln){ lines++; body.querySelector('.cur').insertAdjacentHTML('beforebegin',`<i style="width:${55+Math.random()*40}%"></i>`); }
      if(w) warn.insertAdjacentHTML('beforeend',`<span>⚠ ${w}</span>`);
      stats([[tabs,'tabs opened'],[lines,'lines written'],[h.toFixed(1)+' h','time spent','bad'],[0,'questions tracked','bad']]); }
    $$('#srcs .ep-src').forEach(e=>e.classList.remove('on')); }
  async function portal(){ const my=++tok; reset(); body.innerHTML=''; stats([[0,'sources used'],['–','section drafted'],['minutes','time spent','good'],[0,'questions tracked']]);
    for(const e of $$('#srcs .ep-src')){ e.classList.add('lit'); e.querySelector('em').textContent='✓'; await sleep(RM?0:110); if(my!==tok) return; }
    stats([[6,'sources used'],['…','section drafted'],['minutes','time spent','good'],[0,'questions tracked']]);
    await sleep(RM?0:400); if(my!==tok) return;
    body.innerHTML=`<p>Source code for the EBS customizations is held in the customer's GitHub Enterprise organization, with one repository per business area.</p><p>The platform connects through a Git SCM instance configured under Topology → Integrations → Source Control, using the branching model approved for this engagement.</p><div class="callout"><b>TO CONFIRM:</b> GitHub Enterprise organization name for the EBS repositories.</div><div class="cite">Grounded in <span>SOW scope · GitHub</span><span>Checklist · SCM</span><span>Platform 11.1 docs</span><span>Approved exemplar</span></div>`;
    stats([[6,'sources used'],['✓','section drafted','good'],['minutes','time spent','good'],[1,'question tracked','good']]); }
  const setMode=segBind($('#hunt'),'data-m',(m,fromUser)=>{ if(fromUser) user=true; mode=m; m==='hand'?hand():portal(); });
  reset(); stats([[0,'tabs opened'],[0,'lines written'],['0 h','time spent'],[0,'questions tracked']]);
  onView($('#hunt'),async()=>{ await hand(); if(user) return; await sleep(RM?0:2200); if(user) return; setMode('portal'); portal(); },.35);
})();

/* CHAIN */
(()=>{ const C=[
  {n:'System 1',t:'SOW Generator',s:'defines the engagement',h:'The signed SOW becomes structured scope',p:'The portal reads each SOW draft from the shared PostgreSQL database through a controlled database function and stores a full snapshot against the engagement. Scope is normalized into four groups, and integration details such as the SCM tool, ITS application and CMS application are carried forward.'},
  {n:'System 2',t:'Readiness Checklist',s:'captures the environment',h:'Checklist values reach the right section. Secrets never reach the model.',p:'Completed checklist items are routed to the matching technology section and capped to a fixed context budget. Secret values are stripped first: the label reaches the model, the credential never does.'},
  {n:'System 3',t:'Execution Portal',s:'generates and governs',u:1,h:'One click opens the project. Consultant edits are protected.',p:'Projects open from the SOW with a single click, or are created automatically the moment a SOW is ready. Creation is idempotent, so opening twice never makes a second project. Scope resyncs until real documentation work begins, then freezes.'},
  {n:'Delivered',t:'Customer documents',s:'what the customer keeps',h:'Four documents the customer keeps after go-live',p:'Approved documents export to formatted Word files built from structured content, with Mermaid diagrams rendered into the output. User Documentation downloads as a full set or one guide at a time.'}];
  const rail=$('#crail'),bd=$('#cbody'); let cur=-1,user=false;
  rail.innerHTML=C.map((c,i)=>`<button type="button" role="tab" data-i="${i}"><em>${c.n}</em><b>${c.t}</b><span>${c.s}</span>${c.u?'<i class="us">This case study</i>':''}</button>`).join('');
  const viz=[
   ()=>`<div class="ep-cv"><small>Scope snapshot · four canonical groups</small>${[['DevOps targets',['EBS','OIC']],['CM Packs',['Fusion - ERP']],['Integrations',['SCM · GitHub','ITS · Jira','CMS · ServiceNow']],['Other scope',['Upgrade & Training']],['Discovery answers',['14 captured']]].map((g,i)=>`<div class="ep-grp" style="animation-delay:${i*.08}s"><b>${g[0]}</b><div>${g[1].map(x=>`<span>${x}</span>`).join('')}</div></div>`).join('')}</div>`,
   ()=>`<div class="ep-cv"><small>Checklist rows on their way to the prompt</small><table class="ep-sec-t"><thead><tr><th>Section</th><th>Item</th><th>Reaches the model</th></tr></thead><tbody>${[['SSO','Okta domain URL','acme.okta.com',0],['SSO','Okta API token','••••••••••',1],['SCM','GitHub organization','acme-erp',0],['SCM','Service account password','••••••••',1]].map(r=>`<tr class="${r[3]?'sec':''}"><td>${r[0]}</td><td>${r[1]}</td><td><span class="val" data-s="${r[3]}">${r[2]}</span></td></tr>`).join('')}</tbody></table><div class="ep-sim"><button type="button" class="se-btn" id="cstrip">Run secret stripping</button></div></div>`,
   ()=>`<div class="ep-cv"><small>Try it</small><div class="ep-sim"><button type="button" class="se-btn" data-a="open">Open the SOW again</button><button type="button" class="se-btn" data-a="jira">Customer adds Jira to the SOW</button><button type="button" class="se-btn" data-a="edit">Consultant edits a section</button><button type="button" class="se-btn" data-a="fetch">Fetch SOW updates</button></div><div class="ep-cstate" id="cst">Project created from SOW 001. Requirements generation started automatically.</div></div>`,
   ()=>`<div class="ep-cv"><small>Exported from approved content</small><div class="ep-out">${[['Requirements','per technology in scope','.docx'],['Solution Design','how it will be built','.docx'],['Implementation Runbook','step-by-step build procedure','.docx'],['User Documentation','admin · end user · approver · audit','.docx · per guide']].map(d=>`<div><b>${d[0]}</b><span>${d[1]}</span><em>${d[2]}</em></div>`).join('')}</div></div>`];
  let st={work:false,jira:false};
  function show(i){ if(i===cur) return; cur=i; $$('#crail button').forEach((b,k)=>{ b.classList.toggle('on',k===i); b.setAttribute('aria-selected',k===i); });
    const c=C[i]; bd.style.animation='none'; void bd.offsetWidth; bd.style.animation='';
    bd.innerHTML=`<div class="ep-ct"><span class="n">Step ${i+1} of 4</span><h3>${c.h}</h3><p>${c.p}</p></div>${viz[i]()}`;
    if(i===1) $('#cstrip').onclick=async()=>{ user=true; for(const v of $$('#cbody .val')){ if(v.dataset.s==='1'){ v.classList.add('ep-strip'); await sleep(RM?0:450); v.textContent='[label only]'; v.classList.remove('ep-strip'); v.classList.add('to'); } } };
    if(i===2){ st={work:false,jira:false}; $$('#cbody [data-a]').forEach(b=>b.onclick=()=>{ user=true; const a=b.dataset.a,s=$('#cst');
      if(a==='open'){ s.className='ep-cstate ok'; s.textContent='Same project returned. Creation is idempotent, so a SOW never becomes two projects.'; }
      if(a==='edit'){ st.work=true; s.className='ep-cstate ep-lk'; s.textContent='Real documentation work has begun. Scope is now frozen, so nothing moves underneath the consultant.'; }
      if(a==='jira'){ st.jira=true; if(!st.work){ s.className='ep-cstate ok'; s.textContent='Scope resynced on the next page load: Jira added and its sections laid out automatically.'; } else { s.className='ep-cstate ep-lk'; s.textContent='The SOW changed upstream, but the project scope is frozen. Consultant edits are safe until someone chooses to fetch the update.'; } }
      if(a==='fetch'){ s.className='ep-cstate ok'; s.textContent=st.jira?'Fetch SOW Updates: empty sections added for Jira. Written content is never regenerated or overwritten.':'SOW already up to date.'; } }); }
  }
  $$('#crail button').forEach(b=>b.addEventListener('click',()=>{ user=true; show(+b.dataset.i); }));
  show(0);
  onView($('#chainx'),async()=>{ if(RM) return; for(let i=1;i<4;i++){ await sleep(5200); if(user) return; show(i); if(i===1){ await sleep(1400); if(user) return; $('#cstrip')&&$('#cstrip').click(); user=false; } } },.35);
})();

/* GROUNDING */
(()=>{ const COL={conf:['Confluence 11.1','#204ecf'],kb:['Technology KB','#7b5cf0'],git:['Branching guide','#0a8fc4'],ex:['Approved exemplar','#1f8a5c'],chk:['Checklist','#b07a00'],sow:['SOW scope','#646c7e']};
  const G=[
   {d:'Requirements',t:'EBS · Source Code Management',q:['source control setup ebs','git scm instance ebs','branching strategy ebs','custom top folder ebs','ebs object types build','pull request flow ebs'],h:[['conf','Source Control integrations'],['conf','Git SCM instance'],['git','Feature branch from main'],['conf','Source Control integrations',1],['kb','EBS customization layout'],['ex','Approved · SCM section (EBS)'],['chk','SCM checklist values'],['git','Feature branch from main',1],['sow','Scope: EBS · GitHub']]},
   {d:'Solution Design',t:'OIC · Deployment topology',q:['oic topology environments','oic integration deployment','oic endpoints configuration','environment instance oic','oic properties replacement'],h:[['conf','Topology and environments'],['conf','OIC plugin setup'],['conf','Topology and environments',1],['ex','Consultant-refined · topology'],['chk','OIC checklist values'],['conf','Property replacement'],['sow','Scope: OIC']]},
   {d:'Implementation Runbook',t:'Jira integration',q:['jira issue tracking integration','its instance configuration','work item linking jira'],h:[['conf','Issue tracking systems'],['conf','Jira ITS instance'],['ex','Approved · Jira runbook step'],['conf','Issue tracking systems',1],['chk','ITS checklist values'],['sow','Scope: ITS · Jira']]},
   {d:'User Documentation',t:'Approver Guide',q:['approvals pending tasks','approve reject release','approval notifications email','approval gates pipeline'],h:[['conf','Pending approvals'],['conf','Release approval gates'],['conf','Approval notifications'],['conf','Pending approvals',1],['ex','Approved · approver guide']]}];
  const V=['9.0','10.0','11.0','11.1','Unapproved release'];
  let gi=0,ver='11.1',budget='fair',tok=0,user=false;
  $('#gsec').innerHTML=G.map((g,i)=>`<button type="button" aria-pressed="${i===0}" data-i="${i}"><small>${g.d}</small><b>${g.t}</b></button>`).join('');
  $('#gver').innerHTML=V.map(v=>`<button type="button" class="${v.length>5?'x':''}" aria-pressed="${v==='11.1'}" data-v="${v}">${v.length>5?v:'Platform '+v}</button>`).join('');
  const STEPS=['Scoped queries','Top matches','Parent pages','De-duplicate','Fair budget','Draft via n8n'];
  $('#gsteps').innerHTML=STEPS.map((s,i)=>`<span><em>${i+1}</em>${s}</span>`).join('');
  const vn=$('#gvn'),stage=$('#gstage'),run=$('#grun');
  const verNote=()=>{ if(ver==='11.1'){ vn.className='ep-gvn ok'; vn.textContent='Platform 11.1 is the default for document generation.'; run.disabled=false; }
    else if(ver.length>5){ vn.className='ep-gvn bad'; vn.textContent='Not on the allowlist. The portal never substitutes a nearby version: no answer beats a wrong-version answer.'; run.disabled=true; }
    else { vn.className='ep-gvn'; vn.textContent=`${ver} is an approved release used by the AI Assist tools. Document generation stays on the 11.1 default.`; run.disabled=true; } };
  const stp=i=>$$('#gsteps span').forEach((s,k)=>s.className=k<i?'done':k===i?'on':'');
  function bar(srcs){ const n=srcs.length; const w=budget==='fair'?srcs.map(()=>100/n):srcs.map((_,k)=>k===0?72:28/(n-1));
    return `<div class="ep-budget"><div class="bar">${srcs.map((s,k)=>`<i style="flex:${w[k]};background:${COL[s[0]][1]}" title="${esc(s[1])}">${w[k]>9?esc(s[1]):''}</i>`).join('')}</div><p>${budget==='fair'?`Each of ${n} source documents gets an equal share of the context budget, so no single page dominates.`:'Without the split, one heavily matched page takes most of the budget and crowds the others out.'}</p></div>`; }
  async function go(){ const my=++tok,g=G[gi],D=RM?0:1; stage.innerHTML=''; stp(0);
    stage.insertAdjacentHTML('beforeend',`<div class="ep-qs">${g.q.map((q,k)=>`<span style="animation-delay:${k*.12*D}s">${esc(q)}</span>`).join('')}</div><p class="demo-note">${g.q.length} scope-specific queries (up to 9 per section)</p>`);
    await sleep(1300*D); if(my!==tok) return; stp(1);
    stage.insertAdjacentHTML('beforeend',`<div class="ep-hits">${g.h.map((h,k)=>`<div class="ep-hit" data-d="${h[2]?1:0}" style="color:${COL[h[0]][1]};animation-delay:${k*.08*D}s"><small>${COL[h[0]][0]}</small><b>${esc(h[1])}</b><i></i></div>`).join('')}</div>`);
    await sleep(1400*D); if(my!==tok) return; stp(2); $$('#gstage .ep-hit').forEach(h=>h.classList.add('full'));
    await sleep(1200*D); if(my!==tok) return; stp(3); const dups=$$('#gstage .ep-hit[data-d="1"]'); dups.forEach(h=>h.classList.add('dup'));
    stage.insertAdjacentHTML('beforeend',`<p class="demo-note">${dups.length} duplicate${dups.length===1?'':'s'} removed across three de-duplication passes</p>`);
    await sleep(1300*D); if(my!==tok) return; stp(4); const uniq=[]; g.h.filter(h=>!h[2]).forEach(h=>{ if(!uniq.some(u=>u[1]===h[1])) uniq.push(h); });
    stage.insertAdjacentHTML('beforeend',`<div id="gbar">${bar(uniq)}</div>`); stage.dataset.u=JSON.stringify(uniq);
    await sleep(1500*D); if(my!==tok) return; stp(5);
    const conf=uniq.filter(u=>u[0]==='conf').length,ex=uniq.filter(u=>u[0]==='ex').length;
    stage.insertAdjacentHTML('beforeend',`<div class="ep-gdone"><b>✓ Draft written · ${g.d} → ${esc(g.t)}</b><p>Grounded in ${conf} Confluence page${conf===1?'':'s'}${ex?`, ${ex} exemplar`:''}${uniq.some(u=>u[0]==='chk')?', checklist values':''}. Prompt sent through the n8n gateway; ${gi===3?'1 SCREENSHOT NEEDED':'2 TO-CONFIRM'} flag${gi===3?'':'s'} raised instead of guesses.</p></div>`);
    await sleep(400*D); stp(6); }
  $$('#gsec button').forEach(b=>b.addEventListener('click',()=>{ user=true; gi=+b.dataset.i; $$('#gsec button').forEach(x=>x.setAttribute('aria-pressed',x===b)); if(!run.disabled) go(); }));
  $$('#gver button').forEach(b=>b.addEventListener('click',()=>{ user=true; ver=b.dataset.v; $$('#gver button').forEach(x=>x.setAttribute('aria-pressed',x===b)); verNote(); if(run.disabled){ ++tok; stp(-1); stage.innerHTML=`<div class="ep-wait-g"></div>`; } }));
  segBind($('#gr'),'data-b',(v)=>{ user=true; budget=v; const gb=$('#gbar'); if(gb&&stage.dataset.u) gb.innerHTML=bar(JSON.parse(stage.dataset.u)); });
  run.addEventListener('click',()=>{ user=true; go(); });
  verNote(); stp(-1);
  onView($('#gr'),async()=>{ await go(); },.3);
})();

/* GENERATION */
(()=>{ const GR=[[['General',3],['Common Requirements',5],['EBS',8],['OIC',8],['Fusion - ERP',8]],[['General',3],['Common Solution Design',5],['EBS',8],['OIC',8],['Fusion - ERP',8]],[['Common Runbook',3],['EBS',6],['OIC',6],['Fusion - ERP',6],['GitHub',1],['Jira',1],['CM',2]],[['Admin Guide',16],['End User Guide',8],['Approver Guide',8],['Reporting & Audit',7],['Additional',1]]];
  const GATE=['Starts when the SOW is opened','Waits for Requirements, 100% approved','Generated when the engagement is ready','Generated when the engagement is ready'];
  let S,Q,R,J,timer=null,user=false,approved=[false,false,false,false],started=[false,false,false,false];
  const docs=$('#gdocs'),log=$('#glog');
  docs.innerHTML=DOCS.map((d,i)=>`<div class="ep-doc" data-i="${i}"><div class="t"><b>${d[0]}</b><em></em></div><span class="tpl">Outline template · headings locked</span><div class="sq">${'<i></i>'.repeat(d[1])}</div><div class="pb"><i style="background:var(--green)"></i><i style="background:#7c95e6"></i></div><span class="gate ${i===1?'':i>1?'man':''}">${GATE[i]}</span></div>`).join('');
  const B=[['open','▶ Open the SOW'],['apr0','Approve Requirements'],['gen1','Generate Solution Design'],['apr1','Approve Solution Design'],['gen2','Generate Runbook'],['gen3','Generate User Docs'],['reset','Reset']];
  $('#gbtns').innerHTML=B.map(b=>`<button type="button" class="se-btn${b[0]==='open'?' pri':''}" data-b="${b[0]}">${b[1]}</button>`).join('');
  const msg=(t,c='')=>{ log.className='ep-glog '+c; log.innerHTML=t; };
  function init(){ S=DOCS.map(d=>Array(d[1]).fill('')); Q=[]; R=[]; J=[]; approved=[false,false,false,false]; started=[false,false,false,false]; draw(); msg('Nothing generated yet. Open the SOW to start.'); }
  function draw(){ $$('#gdocs .ep-doc').forEach((el,i)=>{ const s=S[i],a=s.filter(x=>x==='a').length,d=s.filter(x=>x==='d').length;
      el.querySelectorAll('.sq i').forEach((q,k)=>q.className=s[k]); el.querySelector('.t em').textContent=`${a+d}/${s.length}`;
      const pb=el.querySelectorAll('.pb i'); pb[0].style.width=a/s.length*100+'%'; pb[1].style.width=d/s.length*100+'%';
      el.classList.toggle('act',s.some(x=>x==='g')); el.classList.toggle('ok',a===s.length);
      if(i===1){ const g=el.querySelector('.gate'); g.classList.toggle('open',approved[0]); g.textContent=approved[0]?'Gate open · Requirements approved':GATE[1]; } });
    $('#jrun').textContent=`${R.length} / 3`; $('#jq').textContent=Q.length;
    $('#jlist').innerHTML=J.slice(-7).reverse().map(j=>`<li class="${j.st}">${esc(j.n)}<span>${j.st==='r'?'running':j.st==='q'?'queued':'done'}</span></li>`).join('');
    const can={open:!started[0],apr0:S[0].every(x=>x==='d')&&!approved[0],gen1:!started[1],apr1:S[1].every(x=>x==='d')&&!approved[1],gen2:!started[2],gen3:!started[3]};
    $$('#gbtns button').forEach(b=>{ const k=b.dataset.b; if(k in can) b.disabled=!can[k]; }); }
  function enqueue(i){ started[i]=true; let off=0; GR[i].forEach(g=>{ const j={n:`${DOCS[i][0].split(' ')[0]} · ${g[0]}`,doc:i,idx:[...Array(g[1]).keys()].map(k=>k+off),p:0,st:'q'}; off+=g[1]; Q.push(j); J.push(j); }); tickOn(); }
  function tickOn(){ if(timer) return; timer=setInterval(step,RM?60:240); }
  function step(){ while(R.length<3&&Q.length){ const j=Q.shift(); j.st='r'; R.push(j); }
    R.forEach(j=>{ if(j.p>0) S[j.doc][j.idx[j.p-1]]='d'; if(j.p<j.idx.length){ S[j.doc][j.idx[j.p]]='g'; j.p++; } else { j.st='d'; } });
    R=R.filter(j=>j.st==='r'); if(!R.length&&!Q.length){ clearInterval(timer); timer=null; onIdle(); } draw(); }
  let idleCb=null; function onIdle(){ const f=idleCb; idleCb=null; f&&f(); }
  async function approve(i){ for(let k=0;k<S[i].length;k++){ S[i][k]='a'; if(k%3===0){ draw(); await sleep(RM?0:30); } } approved[i]=true; draw(); }
  async function act(k){ if(k==='reset'){ clearInterval(timer); timer=null; init(); return; }
    if(k==='open'){ msg('SOW opened → Requirements generation queued as background jobs, one per technology group.'); enqueue(0); }
    if(k==='apr0'){ await approve(0); msg('<b>Requirements 100% approved</b> → Solution Design started automatically.','ok'); if(!started[1]) enqueue(1); }
    if(k==='gen1'){ if(!approved[0]){ msg('<b>Blocked by the ordering gate.</b> Solution Design can\'t be bulk-generated until Requirements is 100% approved. The gate sits inside the single enqueue path, so no route can bypass it.','bad'); return; } enqueue(1); }
    if(k==='apr1'){ await approve(1); msg('<b>Solution Design approved.</b> Approved Requirements and Design now feed the Runbook and user guides.','ok'); }
    if(k==='gen2'){ msg('Implementation Runbook queued: build and configuration steps per technology and integration.'); enqueue(2); }
    if(k==='gen3'){ msg('User Documentation queued: Admin, End User, Approver and Reporting & Audit guides.'); enqueue(3); } }
  $$('#gbtns button').forEach(b=>{ b.addEventListener('click',()=>{ user=true; act(b.dataset.b); }); });
  // allow clicking the gated button while disabled state is not set for gen1 (it stays enabled to demonstrate the gate)
  init();
  onView($('#gen'),async()=>{ await sleep(RM?0:700); if(user) return; act('open'); idleCb=async()=>{ if(user) return; await sleep(RM?0:900); if(user) return; act('gen1'); await sleep(RM?0:2600); if(user) return; act('apr0'); }; },.3);
})();

/* REVIEW */
const REV=(()=>{ let F,val,lifeS,approvedG,user=false,hist;
  const secs=$('#rsecs'),msgEl=$('#rmsg'),btn=$('#rapprove'),cnt=$('#rcount');
  function init(){ F={a1:{s:'A',k:'tc',key:'org',q:'GitHub Enterprise organization name for the EBS repositories.',st:'open'},a3:{s:'A',k:'tc',key:'branch',q:'Integration branch name.',std:'main',st:'open'},a2:{s:'A',k:'ss',q:'Repository home page showing the integration branch.',st:'open'},b1:{s:'B',k:'tc',key:'org',q:'GitHub Enterprise organization name for the EBS repositories.',st:'open'},b2:{s:'B',k:'ci',q:'Generation stopped before the release-branch table.',st:'open'}};
    val={}; approvedG=false; lifeS='draft'; render(); msg('Five open items across two sections. Resolve them, then approve the group.'); }
  const open=s=>Object.values(F).filter(f=>(!s||f.s===s)&&f.st==='open').length;
  const msg=(t,c='')=>{ msgEl.className='ep-rmsg '+c; msgEl.innerHTML=t; };
  const v=(k,d)=>val[k]?`<mark>${esc(val[k])}</mark>`:`<span style="color:var(--muted)">${d}</span>`;
  function co(id){ const f=F[id];
    if(f.k==='tc'){ if(f.st==='open') return `<div class="ep-co tc" data-id="${id}"><div class="q"><b>TO CONFIRM:</b> ${f.q}</div><div class="a"><input type="text" placeholder="Enter the real value…" aria-label="Answer"><button type="button" class="p" data-x="save">Save</button>${f.std?`<button type="button" data-x="std">Use standard: ${f.std}</button>`:''}<button type="button" class="l" data-x="na">Not applicable</button></div></div>`;
      const auto=f.st==='auto'; return `<div class="ep-co done" data-id="${id}"><div class="q"><b>${auto?'FILLED AUTOMATICALLY:':f.st==='na'?'NOT APPLICABLE':'ANSWERED:'}</b> ${f.st==='na'?'':esc(val[f.key])}${auto?' <span class="n">from your answer to the same question in Source Code Management. Use Change if it\'s different here.</span>':''}</div>${approvedG?'':`<div class="a"><button type="button" class="l" data-x="chg">Change</button>${open(f.s)?'<span class="n">Will be applied once every open item in this section is addressed.</span>':''}</div>`}</div>`; }
    if(f.k==='ss'){ if(f.st==='open') return `<div class="ep-co ss" data-id="${id}"><div class="q"><b>SCREENSHOT NEEDED:</b> ${f.q}</div><div class="a"><button type="button" class="p" data-x="up">Upload screenshot</button><button type="button" data-x="pick">Choose existing…</button><button type="button" class="l" data-x="na">Not applicable</button></div><div class="ep-shot" hidden><button type="button" data-x="use">repo · main</button><button type="button" data-x="use">pipeline</button><button type="button" data-x="use">topology</button></div></div>`;
      return f.st==='na'?`<div class="ep-co done"><div class="q"><b>NOT APPLICABLE</b></div></div>`:`<div class="ep-img" role="img" aria-label="Uploaded screenshot placeholder"></div>`; }
    if(f.k==='ci'){ if(f.st==='open') return `<div class="ep-co ci" data-id="${id}"><div class="q"><b>CONTENT INCOMPLETE:</b> ${f.q}</div><div class="a"><button type="button" class="p" data-x="regen">Regenerate this section</button></div></div>`;
      if(f.st==='gen') return `<div class="ep-co tc"><div class="q"><b>REGENERATING…</b> grounded in the same sources, with your confirmed facts</div></div>`;
      return `<p><b>Release branches:</b> release/&lt;version&gt; cut from ${v('branch','the integration branch')}; hotfix/* merged back after deployment.</p>`; }
    return ''; }
  function render(){ const oA=open('A'),oB=open('B'),cleanA=!oA,cleanB=!oB;
    secs.innerHTML=`
    <article class="ep-sc ${approvedG?'ap':''}"><div class="h"><b>Source Code Management</b><div class="bd"><span>AI-generated</span>${approvedG?'<span class="ap">Approved</span>':''}</div></div><div class="gs">Grounded in 2 Confluence pages, 1 sample · ${oA?`${3-oA} of 3 answered`:'clean'}</div>
      <div class="bd2"><p>Source code for the EBS customizations is held in GitHub Enterprise under the organization ${cleanA?v('org','[organization]'):'<span style="color:var(--muted)">[pending]</span>'}, with one repository per business area. The platform connects through a Git SCM instance under Topology → Integrations → Source Control. The integration branch is ${cleanA?v('branch','[branch]'):'<span style="color:var(--muted)">[pending]</span>'}.</p>${co('a1')}${co('a3')}${co('a2')}</div></article>
    <article class="ep-sc ${approvedG?'ap':''}"><div class="h"><b>Branching Strategy</b><div class="bd"><span>AI-generated</span>${approvedG?'<span class="ap">Approved</span>':''}</div></div><div class="gs">Grounded in 1 Confluence page, branching guide · ${oB?`${2-oB} of 2 resolved`:'clean'}</div>
      <div class="bd2"><p>Repositories in ${cleanB?v('org','[organization]'):'<span style="color:var(--muted)">[pending]</span>'} follow a feature-branch-from-main model. Each change starts on a feature branch named after its Jira ticket and merges through a reviewed pull request.</p>${co('b1')}${co('b2')}</div></article>`;
    const o=open(); cnt.className=o?'':'ok'; cnt.textContent=approvedG?'Locked':o?`${o} open item${o===1?'':'s'}`:'Ready to approve';
    btn.textContent=approvedG?'Re-open EBS':'Approve EBS';
    $$('#rlife span').forEach(s=>{ const order=['empty','generating','draft','approved']; const k=order.indexOf(s.dataset.s),c=order.indexOf(lifeS); s.className=k<c?'past':k===c?'on':''; });
    bind(); }
  function answer(id,value){ const f=F[id]; val[f.key]=value; f.st='done'; Object.entries(F).forEach(([k,g])=>{ if(k!==id&&g.key===f.key&&g.st==='open'){ g.st='auto'; } }); }
  function bind(){ $$('#rsecs [data-x]').forEach(b=>b.addEventListener('click',e=>{ user=true; const c=b.closest('[data-id]'),id=c&&c.dataset.id,f=F[id],x=b.dataset.x;
      if(x==='save'){ const inp=c.querySelector('input'),t=inp.value.trim(); if(!t){ inp.focus(); inp.placeholder='Type a value, or mark it Not applicable'; return; } answer(id,t); msg(Object.values(F).some(g=>g.st==='auto')&&f.key==='org'?'Answered once, filled everywhere: the same question in Branching Strategy was filled automatically. Confirmed answers are stored as project facts and never asked again.':'Answer saved as a project fact.','ok'); }
      if(x==='std'){ answer(id,f.std); msg(`Standard value accepted: ${esc(f.std)}.`,'ok'); }
      if(x==='na'){ f.st='na'; msg('Marked not applicable. The flag is cleared without putting a value in.'); }
      if(x==='chg'){ f.st='open'; }
      if(x==='up'||x==='use'){ f.st='done'; msg('Screenshot placed into the section.','ok'); }
      if(x==='pick'){ c.querySelector('.ep-shot').hidden=false; return; }
      if(x==='regen'){ f.st='gen'; render(); msg('Regenerating the section…'); setTimeout(()=>{ f.st='done'; render(); msg('Section regenerated and complete. Its unresolved-flag count is recomputed in the same write.','ok'); },RM?0:1400); return; }
      render(); }));
    $$('#rsecs input').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') i.parentElement.querySelector('[data-x="save"]').click(); })); }
  btn.addEventListener('click',async()=>{ user=true; if(approvedG){ approvedG=false; lifeS='draft'; render(); msg('Group re-opened for editing. Reopen events are recorded in the audit trail.'); return; }
    const o=open(); if(o){ msg(`<b>Blocked.</b> ${o} open item${o===1?'':'s'} remain in this group. Approval is all-or-nothing, and every flag kind counts: TO CONFIRM, SCREENSHOT NEEDED and CONTENT INCOMPLETE.`,'bad'); return; }
    approvedG=true; lifeS='approved'; render(); msg('<b>EBS approved.</b> Both sections are locked, a weekly snapshot was captured, and the approval is attributed to the signed-in consultant.','ok'); });
  init();
  onView($('#rev'),async()=>{ if(RM) return; await sleep(2600); if(user) return; const inp=$('#rsecs [data-id="a1"] input'); if(!inp) return; for(const ch of 'acme-erp'){ if(user) return; inp.value+=ch; await sleep(90); } await sleep(400); if(user) return; answer('a1','acme-erp'); render(); msg('Answered once, filled everywhere: the same question in Branching Strategy was filled automatically. Now clear the rest and approve.','ok'); },.35);
})();

/* REFINE + EXEMPLARS */
(()=>{ let L,H,busy=false; const doc=$('#rdoc'),hist=$('#rhist');
  const init=()=>{ L=[['main','protected integration branch'],['feature/&lt;ticket&gt;','one branch per Jira ticket'],['hotfix/*','urgent fixes, merged back to main']]; H=[['v1','ai','Generated from the outline template'],['v2','us','Answered 2 open items']]; draw(); };
  const draw=(nw=[])=>{ doc.innerHTML=`<b>Branching Strategy · EBS</b><ul>${L.map((l,i)=>`<li class="${nw.includes(i)?'new':''}"><code>${l[0]}</code> — ${l[1]}</li>`).join('')}</ul>`; hist.innerHTML=H.map(h=>`<li><em>${h[0]}</em><span class="${h[1]}">${h[1]==='ai'?'AI':'Consultant'}</span>${esc(h[2])}</li>`).join(''); };
  async function refine(q){ if(busy||!q.trim()) return; busy=true;
    if(q.startsWith('fix:')){ L[0][1]='protected integration branch, no direct pushes'; H.push([`v${H.length+1}`,'us','Inline edit, no AI involved']); draw([0]); busy=false; return; }
    doc.insertAdjacentHTML('beforeend','<span class="ai"><i></i>Rewriting this section from your request…</span>'); await sleep(RM?0:1200);
    let nw=[];
    if(/qa|perf/i.test(q)){ if(!L.some(l=>l[0]==='qa')){ L.splice(2,0,['qa','promotes builds to the QA environment'],['perf','performance-testing environment']); } nw=[2,3]; }
    else if(/hotfix|strict/i.test(q)){ const i=L.findIndex(l=>l[0]==='hotfix/*'); L[i][1]='urgent fixes only, approved by the release manager, merged back to main'; nw=[i]; }
    else { L.push(['note',esc(q)]); nw=[L.length-1]; }
    H.push([`v${H.length+1}`,'ai',`Refine: ${q}`]); draw(nw); busy=false; }
  $('#rgo').onclick=()=>refine($('#rin').value); $('#rin').addEventListener('keydown',e=>{ if(e.key==='Enter') refine($('#rin').value); });
  $$('#refine .ep-rq button').forEach(b=>b.onclick=()=>{ $('#rin').value=b.dataset.q; refine(b.dataset.q); });
  init();
  const X=[['Source Code Management · EBS','Global manufacturer','EBS','Approved'],['Source Code Management · OIC','Healthcare network','OIC','Consultant-refined'],['Branching Strategy · APEX','Regional bank','APEX','Approved'],['Source Code Management · JDBC','Energy utility','JDBC','Approved'],['Change Orchestration · EBS','Retail group','EBS','Consultant-refined'],['Security Realm · EBS','Logistics group','EBS','Approved']];
  let added=[]; const res=$('#xres'),ad=$('#xadded'),xm=$('#xmsg');
  function draw2(){ const q=$('#xin').value.trim().toLowerCase(); const r=X.map((x,i)=>[x,i]).filter(([x])=>!q||(x[0]+x[1]).toLowerCase().includes(q));
    res.innerHTML=r.length?r.map(([x,i])=>`<div class="ep-xr"><div><b>${x[0]}</b><small>${x[1]} · ${x[2]}<em class="${x[3]==='Approved'?'':'cr'}">${x[3]}</em></small></div><button type="button" data-i="${i}" ${added.includes(i)?'disabled':''}>${added.includes(i)?'Added':'Add'}</button></div>`).join(''):'<p class="ep-xmsg">No approved or consultant-refined sections found for this document type.</p>';
    ad.innerHTML=added.length?added.map(i=>`<span>${X[i][0]} · ${X[i][1]}<button type="button" data-r="${i}" aria-label="Remove">×</button></span>`).join(''):'<span style="background:none;color:var(--muted)">The best match is chosen automatically.</span>';
    res.querySelectorAll('button[data-i]').forEach(b=>b.onclick=()=>{ const i=+b.dataset.i; if(added.length>=2){ xm.textContent='Limit reached. Remove one to add another: two or three strong examples steer the model better than a long list.'; return; } added.push(i); xm.textContent=added.length===2?'Two exemplars added. They steer the structure of the next generation.':''; draw2(); });
    ad.querySelectorAll('button[data-r]').forEach(b=>b.onclick=()=>{ added=added.filter(i=>i!==+b.dataset.r); xm.textContent=''; draw2(); }); }
  $('#xin').addEventListener('input',draw2); draw2();
})();

/* AI ASSIST */
(()=>{ const T=[
  {n:'Groovy Scripts',s:'writes saved scripts',q:'Incoming webhook: start a build when GitHub receives a push to main',src:['Confluence · webhook functions','Confluence · webhook context variables','Confluence · provider examples','Services script catalog'],shape:['script type','inputs & bindings','libraries','verification steps'],
   a:[['Type','Incoming Webhook Function Script'],['code',`// Sketch only: names are placeholders\ndef event  = parse(payload)          // GitHub push event\ndef branch = event.ref - 'refs/heads/'\nif (branch == 'main') {\n  startBuild(project: '<PROJECT>', branch: branch)\n}`],['Verify','Push a commit to main; confirm a build request appears for the mapped project.'],['val',[['p','No hard-coded credentials'],['h','1 platform call flagged: verify against docs'],['p','Syntax validated']]]]},
  {n:'REST APIs',s:'endpoint-precise answers',q:'How do I trigger a build for a project, then check its status?',src:['FD 11.1 · API Guide','FD 11.1 · GraphQL Queries','OpenAPI v1 snapshot','OpenAPI v2 snapshot'],shape:['method & endpoint','auth & headers','request body','response handling'],
   a:[['Method','POST to the build-request endpoint, then GET the request status'],['Auth','API token in the request header · value supplied by you'],['code',`curl -X POST "<BASE_URL>/<build-request-path>" \\\n  -H "Authorization: <API_TOKEN>" \\\n  -d '{"project":"<PROJECT_ID>","environment":"DEV"}'`],['val',[['p','Endpoint checked against the cached OpenAPI specs'],['h','Not retry-safe by default'],['i','Tenant values left as placeholders']]]]},
  {n:'Best Practices',s:'shaped by this project',q:'What branching strategy fits EBS with two business areas?',src:['Platform docs 9.0 → 11.1','Config Management docs (if in scope)','FLEX implementation process','Project scope, facts & design'],shape:['recommendation','rationale','risks','practices to avoid'],
   a:[['Recommend','One repository per business area, feature branches from a protected main, release branches per version.'],['Why','Matches the approved Requirements and keeps each area\'s release cadence independent.'],['Avoid','Mixing a single-trunk model in one section with a multi-branch model in another.'],['val',[['p','3 references, each checked against what was retrieved'],['p','Structurally validated']]]]},
  {n:'Troubleshooting',s:'takes attachments',q:'Build fails fetching the repository after the SCM change',att:'build.log · 212 KB attached',src:['Platform docs 9.0 → 11.1','Release notes (version-matched)','Freshdesk resolved tickets','Jira engineering history'],shape:['issue summary','causes by confidence','investigation steps','safe resolution'],
   a:[['Summary','Git fetch rejected during build; authentication fails against the new SCM host.'],['Causes','<ol><li><b>High</b> · SCM instance still holds the old credentials</li><li><b>Medium</b> · repository URL changed in the move</li><li><b>Low</b> · network rule blocks the new Git host</li></ol>'],['Next','Test the SCM instance connection, then re-enter the service account token.'],['val',[['h','Cause 2: Hypothesis, validation required'],['p','Release notes checked'],['p','Matched a resolved support ticket']]]]},
  {n:'Product Advisor',s:'version-aware evidence',q:'Is this capability supported in the customer\'s platform version?',src:['All approved doc versions','Release notes','Platform & CM Jira spaces','Jira process reference'],shape:['support status','introduced in','limitations','evidence strength'],
   a:[['Status','Assessed against the selected version, with the release that introduced it where known'],['Limits','Documented limitations listed with their source'],['Evidence','<b>Mixed</b> · confidence lowered where sources disagree'],['val',[['i','Citations built by the server from verified sources'],['p','Model-written citations discarded']]]]}];
  let cur=0,tok=0,user=false,prov='claude',eff='Medium';
  $('#atabs').innerHTML=T.map((t,i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-i="${i}"><b>${t.n}</b><span>${t.s}</span></button>`).join('');
  const effNote=()=>{ $('#aeff').textContent=`${prov==='claude'?'Claude':'ChatGPT'} · ${eff} effort · same n8n gateway either way${eff==='High'?' · slower and costs more':''}`; };
  async function show(i){ const my=++tok,t=T[i],D=RM?0:1; cur=i; $$('#atabs button').forEach((b,k)=>b.setAttribute('aria-selected',k===i));
    $('#aq').innerHTML=`<i>Q</i><b>${esc(t.q)}</b>${t.att?`<span class="att">📎 ${t.att}</span>`:''}`;
    $('#asrc').innerHTML=t.src.map(s=>`<span>${s}</span>`).join(''); $('#ashape').innerHTML=t.shape.map(s=>`<span>${s}</span>`).join('');
    const ans=$('#aans'); ans.innerHTML='<div class="ep-typing"><i></i><i></i><i></i></div>';
    for(const s of $$('#asrc span')){ await sleep(220*D); if(my!==tok) return; s.classList.add('on'); }
    await sleep(500*D); if(my!==tok) return; ans.innerHTML='';
    for(const [k,v] of t.a){ await sleep(260*D); if(my!==tok) return;
      if(k==='code') ans.insertAdjacentHTML('beforeend',`<pre>${esc(v)}</pre>`);
      else if(k==='val') ans.insertAdjacentHTML('beforeend',`<div class="val">${v.map(x=>`<span class="${x[0]}">${x[0]==='p'?'✓ ':x[0]==='h'?'! ':''}${x[1]}</span>`).join('')}</div>`);
      else ans.insertAdjacentHTML('beforeend',`<div class="row"><b>${k}</b><div>${v}</div></div>`); } }
  $$('#atabs button').forEach(b=>b.addEventListener('click',()=>{ user=true; show(+b.dataset.i); }));
  segBind($('#as'),'data-p',v=>{ user=true; prov=v; effNote(); }); segBind($('#as'),'data-e',v=>{ user=true; eff=v; effNote(); });
  effNote(); show(0);
  onView($('#as'),async()=>{ if(RM) return; for(let i=1;i<T.length;i++){ await sleep(6500); if(user) return; show(i); } },.3);
})();

/* REVIEW CENTER */
(()=>{ const C=[['mr','25','Missing Requirements','unresolved TO-CONFIRM'],['dg','27','Design Gaps','unresolved in Design'],['ra','5','Risk Analysis','traceable risks'],['ph','38%','Project Health','overall completion'],['cc','0','Compliance Check','guardrail anomalies']];
  const box=$('#qbody'); let cur='',mrN=25,dgN=27,riskF='all';
  $('#qcards').innerHTML=C.map((c,i)=>`<button type="button" role="tab" aria-selected="false" data-k="${c[0]}"><b>${c[1]}</b><strong>${c[2]}</strong><span>${c[3]}</span></button>`).join('');
  const list=(items,act)=>`<div class="ep-ql">${items.map((x,i)=>`<div data-i="${i}"><div><b>${x[0]}</b><span>${x[1]}</span></div>${act?`<button type="button" data-r="${i}">${act} →</button>`:''}</div>`).join('')}</div>`;
  const RISK=[['h','Requirements','Contradictory branching models across approved sections','One section defines a four-branch model while another describes a single-trunk main.'],['h','Integration','Pipeline definitions disagree for one technology','One section implies a single pipeline, another separate standard and hotfix pipelines.'],['m','Integration','Jenkins trigger direction not confirmed','Whether Jenkins triggers the platform or the reverse is still open.'],['m','Schedule','Runbook not started with two weeks left','Runbook sections are still empty late in the timeline.'],['l','Technical','Directory realm type unconfirmed','Blocks the final security configuration.']];
  const V={
   mr:()=>`<p>Every unresolved TO-CONFIRM item in Requirements, in one place. Resolve each one directly in its section.</p><div class="ep-qk"><div><b class="amb" id="mrn">${mrN}</b><span>unresolved items</span></div><div><b>15 of 32</b><span>sections affected</span></div><div><b class="grn" id="mrc">53%</b><span>document clean</span></div></div>${list([['Source Code Management','GitHub Enterprise hosting organization name.'],['Security','Confirm the external directory type so the platform realm can be finalized.'],['Advanced SCM','Short name used as the top-level folder for SCM objects.']],'Resolve')}`,
   dg:()=>`<p>Unresolved items in Solution Design, plus an AI check that compares every Design section against its own instruction.</p><div class="ep-qk"><div><b class="amb">${dgN}</b><span>unresolved items</span></div><div><b>20 of 32</b><span>sections affected</span></div><div><b>38%</b><span>document clean</span></div></div>${list([['Integrations','Jenkins trigger direction, and the API user Jenkins will authenticate with.'],['System Settings','Outgoing mail host and from-address for notifications.']])}<div><button type="button" class="se-btn pri" id="dgrun">Run the AI gap check</button></div><div id="dgout"></div>`,
   ra:()=>`<p>AI-synthesised risks from the SOW's structured scope and approved Requirements and Design content, each with a severity. Regenerate after big approval rounds.</p><div class="ep-chips" id="rf">${['all','Requirements','Integration','Schedule','Technical'].map(f=>`<button type="button" aria-pressed="${f===riskF}" data-f="${f}">${f==='all'?'All (5)':f}</button>`).join('')}</div><div class="ep-ql">${RISK.filter(r=>riskF==='all'||r[1]===riskF).map(r=>`<div><div><b><span class="ep-sev ${r[0]}">${r[0]==='h'?'High':r[0]==='m'?'Medium':'Low'}</span>${r[2]}</b><span>${r[3]}</span></div><small>${r[1]}</small></div>`).join('')}</div>`,
   ph:()=>`<p>A live scorecard computed on every visit, the same record leadership sees in the Management Summary.</p><div class="ep-hl"><div class="ep-gauge"><svg viewBox="0 0 120 120" aria-label="38% complete"><circle cx="60" cy="60" r="48" fill="none" stroke="#e3e8f2" stroke-width="12"/><circle cx="60" cy="60" r="48" fill="none" stroke="var(--royal)" stroke-width="12" stroke-dasharray="${.38*301.6} 301.6" transform="rotate(-90 60 60)"/><text x="60" y="66" text-anchor="middle" font-size="20" font-weight="700" fill="var(--navy)">38%</text></svg></div><div><span>To-confirm density</span><b>0.50</b><small>65 open items across 129 sections</small></div><div><span>Staleness</span><b>26 d</b><small>oldest untouched section</small></div><div><span>Approval velocity</span><b style="color:var(--muted)">—</b><small>after 2 full weeks of human approvals</small></div></div><div><button type="button" class="se-btn pri" id="phrun">Generate the AI interpretation</button></div><div id="phout"></div>`,
   cc:()=>`<p>Mechanical checks, not AI opinion: was anything approved that still carried open items?</p><div class="ep-chk4"><div class="ok"><b>Approval-guardrail integrity</b><span>0 anomalies since the guardrail was introduced</span></div><div class="lg"><b>Legacy cleanup</b><span>17 sections approved before the guardrail existed, listed for review</span></div><div class="ok"><b>Scope coverage</b><span>Every in-scope item has content where its outline calls for it</span></div><div id="rbf"><b>Runbook fidelity</b><span><button type="button" class="se-btn" id="ccrun">Compare Runbook to approved Design</button></span></div></div>`};
  function show(k){ cur=k; $$('#qcards button').forEach(b=>b.setAttribute('aria-selected',b.dataset.k===k)); box.style.animation='none'; void box.offsetWidth; box.style.animation=''; box.innerHTML=V[k](); bindK(k); }
  function bindK(k){ if(k==='mr') $$('#qbody [data-r]').forEach(b=>b.onclick=()=>{ b.parentElement.classList.add('gone'); mrN--; $('#mrn').textContent=mrN; $('#mrc').textContent=Math.round((17+(25-mrN))/32*100)+'%'; $('#qcards [data-k="mr"] b').textContent=mrN; });
    if(k==='dg') $('#dgrun').onclick=async e=>{ e.target.disabled=true; e.target.textContent='Analyzing…'; await sleep(RM?0:1100); $('#dgout').innerHTML='<div class="ep-narr"><b>2 gaps detected.</b> Topology reads well but never lists the target environments its instruction asks for; Releases describes promotion but not the rollback path.</div>'; e.target.textContent='Regenerate'; e.target.disabled=false; };
    if(k==='ra') $$('#rf button').forEach(b=>b.onclick=()=>{ riskF=b.dataset.f; show('ra'); });
    if(k==='ph') $('#phrun').onclick=async e=>{ e.target.disabled=true; e.target.textContent='Analyzing…'; await sleep(RM?0:1100); $('#phout').innerHTML='<div class="ep-narr">The engagement is 38% approved with 80 sections remaining. Open questions cluster in Requirements and Solution Design, which is what is holding approvals back, and the Runbook has not started. Clearing the 65 open items is the fastest path to momentum. <em>Reads only the numbers above.</em></div>'; e.target.textContent='Regenerate'; e.target.disabled=false; };
    if(k==='cc') $('#ccrun').onclick=async e=>{ e.target.disabled=true; e.target.textContent='Comparing…'; await sleep(RM?0:1100); const r=$('#rbf'); r.className='ok'; r.innerHTML='<b>Runbook fidelity</b><span>No drift detected: each Runbook section matches its approved basis</span>'; }; }
  $$('#qcards button').forEach(b=>b.addEventListener('click',()=>show(b.dataset.k)));
  show('mr');
})();

/* MANAGEMENT */
(()=>{ const TABS=[['pf','Portfolio'],['wk','Weekly status'],['act','Activity'],['ai','AI usage'],['dl','Deliverables']];
  $('#mtabs').innerHTML=TABS.map((t,i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-k="${t[0]}">${t[1]}</button>`).join('');
  const body=$('#mbody');
  const PF=[['Global manufacturer','SOW 001','In review',49,80,0,129,'13 hours ago',1],['Regional bank','SOW 001','Complete',88,0,0,88,'14 hours ago',2],['Energy utility','SOW 001','Generating',3,58,12,93,'just now',0],['Retail group','SOW 001','In review',0,96,0,96,'yesterday',3],['Healthcare network','SOW 002','In review',0,65,0,65,'4 days ago',5],['Insurance carrier','SOW 003','In review',0,113,0,113,'4 days ago',4],['Public sector agency','SOW 001','In review',0,71,0,71,'18 days ago',6],['Logistics group','SOW 001','Not opened',0,0,0,0,'18 days ago',7]];
  const stc={'In review':'rv2','Complete':'cp','Generating':'gn','Not opened':'no'};
  const WK=[[[0,32,0],[0,0,32],[0,0,25],[0,0,40]],[[14,18,0],[0,0,32],[0,0,25],[0,12,28]],[[32,0,0],[0,32,0],[0,0,25],[6,14,20]],[[32,0,0],[12,20,0],[0,10,15],[12,12,16]],[[32,0,0],[24,8,0],[6,14,5],[20,14,6]],[[32,0,0],[32,0,0],[15,10,0],[30,10,0]]];
  const EV=[['Sep 14 · 3:57 PM','Consultant A','us','Modified','Source Control','User Documentation'],['Sep 14 · 3:19 PM','Consultant A','us','Modified','Key URLs','User Documentation'],['Sep 14 · 3:18 PM','AI Agent','ai','Generated','Source Control','User Documentation'],['Sep 13 · 11:02 AM','Consultant B','us','Approved','EBS','Solution Design'],['Sep 13 · 10:40 AM','Consultant B','us','Reopened','General','Solution Design'],['Sep 12 · 4:15 PM','AI Agent','ai','Generated','Admin Guide','User Documentation'],['Sep 12 · 9:30 AM','System','sys','Generated','Common Requirements','Requirements'],['Sep 11 · 2:44 PM','Consultant A','us','Approved','General','Requirements']];
  const AC={Generated:['#0a6e96','#eaf6ff'],Approved:['#1f8a5c','#e3f7ee'],Modified:['#204ecf','#eaf1ff'],Reopened:['#8a6200','#fff3d6']};
  let actF='all',wk=6,aiM='calls',dl=[[16,32],[17,32],[16,40]],toast='';
  const V={
   pf:()=>`<div class="ep-kpi"><div><small>Total engagements</small><b>18</b><span>2 not opened yet</span></div><div><small>Active engagements</small><b>15</b><span>work in progress</span></div><div class="amb"><small>Needs review</small><b>13</b><span>1,390 sections awaiting approval</span></div><div><small>Recently updated</small><b>10</b><span>in the last 7 days</span></div></div>
     <div class="ep-pf"><input id="pfq" type="search" placeholder="Search company or SOW number…" aria-label="Search engagements"><select id="pfs" aria-label="Status"><option value="">All statuses</option><option>In review</option><option>Generating</option><option>Complete</option><option>Not opened</option></select><select id="pfo" aria-label="Sort"><option value="act">Sort: Last activity</option><option value="pend">Most pending work</option><option value="comp">Most complete</option><option value="az">Company A–Z</option></select></div><div class="ep-tbl" id="pft"></div>`,
   wk:()=>`<div class="ep-wk"><input type="range" min="1" max="6" value="${wk}" id="wkr" aria-label="Week"><div class="ep-wkl">${[1,2,3,4,5,6].map(i=>`<span class="${i===wk?'on':''}">Week ${i}</span>`).join('')}</div></div><div class="ep-snap" id="wks"></div><div class="ep-bars" id="wkb"></div><div class="ep-leg"><span><i class="a"></i>Approved</span><span><i class="d"></i>Draft</span><span><i></i>Not started</span></div>`,
   act:()=>`<div class="ep-kpi"><div><small>Total events</small><b>108</b><span>recorded workflow changes</span></div><div><small>Actors</small><b>4</b><span>consultants, AI and system</span></div><div><small>Sections touched</small><b>45</b><span>across project documents</span></div><div><small>Approvals</small><b>24</b><span>completed approval actions</span></div></div><div class="ep-mix">${[['Generated',63],['Approved',24],['Modified',8],['Reopened',13]].map(m=>`<i style="flex:${m[1]};background:${AC[m[0]][0]}" title="${m[0]} ${m[1]}"></i>`).join('')}</div><div class="ep-mixl" id="mixl">${[['all','All actions',''],['Generated','Generated 63'],['Approved','Approved 24'],['Modified','Modified 8'],['Reopened','Reopened 13']].map(m=>`<button type="button" aria-pressed="${actF===m[0]}" data-f="${m[0]}">${m[0]!=='all'?`<i style="background:${AC[m[0]][0]}"></i>`:''}${m[1]}</button>`).join('')}</div><div class="ep-ev" id="evl"></div>`,
   ai:()=>`<div class="ep-kpi"><div><small>Input tokens</small><b>1,580,349</b><span>prompt and context</span></div><div><small>Output tokens</small><b>184,437</b><span>generated responses</span></div><div><small>AI calls</small><b>289</b><span>model invocations</span></div><div><small>Estimated cost</small><b style="font-size:1rem">List rates</b><span>by person and by document</span></div></div><div class="seg sm" role="group" aria-label="Metric"><button type="button" data-m="calls" aria-pressed="${aiM==='calls'}">Calls</button><button type="button" data-m="tok" aria-pressed="${aiM==='tok'}">Input tokens</button></div><div class="ep-use"><div class="ep-ub" id="aib"></div><div class="ep-ub" id="aip"></div></div>`,
   dl:()=>`<p style="margin:0;font-size:.86rem">Enterprise downloads of the customer-facing documents. A download unlocks once every section in that document is approved.</p><div class="ep-dl" id="dlc"></div><div class="ep-toast" id="dlt"></div>`};
  function pfDraw(){ const q=($('#pfq').value||'').toLowerCase(),s=$('#pfs').value,o=$('#pfo').value;
    let r=PF.filter(p=>(!q||(p[0]+' '+p[1]).toLowerCase().includes(q))&&(!s||p[2]===s));
    r.sort((a,b)=>o==='pend'?(b[6]-b[3])-(a[6]-a[3]):o==='comp'?(b[6]?b[3]/b[6]:0)-(a[6]?a[3]/a[6]:0):o==='az'?a[0].localeCompare(b[0]):a[8]-b[8]);
    $('#pft').innerHTML=`<div class="ep-tr hd"><span>Engagement</span><span>Status</span><span class="pg">Documentation progress</span><span class="pd">Pending</span></div>`+(r.length?r.map(p=>{ const t=p[6]||1; return `<div class="ep-tr"><div><b>${p[0]}</b><small>${p[1]} · ${p[7]}</small></div><span class="ep-st ${stc[p[2]]}">${p[2]}</span><div class="pg">${p[6]?`<div class="ep-seg3"><i style="width:${p[3]/t*100}%;background:var(--green)"></i><i style="width:${p[4]/t*100}%;background:#7c95e6"></i><i style="width:${p[5]/t*100}%;background:var(--cyan)"></i></div><small>${Math.round(p[3]/t*100)}% · ${p[3]}/${p[6]} approved</small>`:'<small>Not opened yet</small>'}</div><span class="pd">${p[6]?p[6]-p[3]:'—'}</span></div>`; }).join(''):'<p class="demo-note">No engagements match these filters.</p>'); }
  function wkDraw(){ const d=WK[wk-1]; const ap=d.reduce((a,x)=>a+x[0],0); $$('#mbody .ep-wkl span').forEach((s,i)=>s.className=i+1===wk?'on':'');
    $('#wks').innerHTML=`<b>Week ${wk}</b> ${wk===6?'<span class="live">Current week · live</span>':'<span class="fz">Stored snapshot · frozen</span>'}<em>${Math.round(ap/129*100)}% complete · ${129-ap} of 129 sections remaining</em>`;
    $('#wkb').innerHTML=DOCS.map((doc,i)=>{ const [a,dr,ns]=d[i],n=doc[1]; return `<div><span>${doc[0]}</span><div class="b3"><i style="width:${a/n*100}%;background:var(--green)"></i><i style="width:${dr/n*100}%;background:#7c95e6"></i><i style="width:${ns/n*100}%;background:#d3d9e6"></i></div><em>${Math.round(a/n*100)}%</em></div>`; }).join(''); }
  function evDraw(){ $('#evl').innerHTML=EV.filter(e=>actF==='all'||e[3]===actF).map(e=>`<div><small>${e[0]}</small><span class="who"><i class="${e[2]==='ai'?'ai':e[2]==='sys'?'sys':''}">${e[1]==='AI Agent'?'AI':e[1]==='System'?'SY':e[1].slice(-1)}</i>${e[1]}</span><span class="ep-act" style="color:${AC[e[3]][0]};background:${AC[e[3]][1]}">${e[3]}</span><span>${e[4]} <small>· ${e[5]}</small></span></div>`).join(''); }
  function aiDraw(){ const D=aiM==='calls'?[['Requirements',104],['Solution Design',79],['Runbook',20],['User Documentation',31],['Assist & Review',55]]:[['Requirements',210400],['Solution Design',41655],['Runbook',13949],['User Documentation',242912],['Assist & Review',1071433]];
    const P=aiM==='calls'?[['Automated initial generation',244],['Consultant A',43],['Consultant B',2]]:[['Automated initial generation',1165431],['Consultant A',361530],['Consultant B',53388]];
    const bars=(t,a)=>{ const m=Math.max(...a.map(x=>x[1])); return `<small>${t}</small>`+a.map(x=>`<div><span>${x[0]}</span><i style="width:${x[1]/m*100}%"></i><em>${aiM==='calls'?x[1]:(x[1]/1000).toFixed(0)+'k'}</em></div>`).join(''); };
    $('#aib').innerHTML=bars('Usage by document',D); $('#aip').innerHTML=bars('Usage by person',P); }
  function dlDraw(){ const N=['Requirements','Solution Design','User Documentation'];
    $('#dlc').innerHTML=dl.map((d,i)=>{ const ok=d[0]===d[1]; return `<div class="${ok?'ok':''}"><b>${N[i]}</b><span>${d[0]} of ${d[1]} sections approved (${Math.round(d[0]/d[1]*100)}%)</span><div class="pb"><i style="width:${d[0]/d[1]*100}%"></i></div><span class="lk">${ok?'✓ Ready to download':'🔒 Locked until every section is approved'}</span>${ok?`<button type="button" class="se-btn pri" data-d="${i}">Download DOCX</button>`:`<button type="button" class="se-btn" data-a="${i}">Approve remaining sections</button>`}${i===2?`<span style="font-size:.66rem">Or one guide at a time: Admin Guide is ready now</span>`:''}</div>`; }).join('');
    $('#dlt').textContent=toast;
    $$('#dlc [data-a]').forEach(b=>b.onclick=async()=>{ const i=+b.dataset.a; b.disabled=true; while(dl[i][0]<dl[i][1]){ dl[i][0]++; const c=$$('#dlc>div')[i]; c.querySelector('.pb i').style.width=dl[i][0]/dl[i][1]*100+'%'; c.querySelector('span').textContent=`${dl[i][0]} of ${dl[i][1]} sections approved`; await sleep(RM?0:40); } toast=''; dlDraw(); });
    $$('#dlc [data-d]').forEach(b=>b.onclick=()=>{ toast=`${N[+b.dataset.d]}.docx built from structured content, with Mermaid diagrams rendered in (simulated on this page).`; dlDraw(); }); }
  function show(k){ $$('#mtabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.k===k)); body.style.animation='none'; void body.offsetWidth; body.style.animation=''; body.innerHTML=V[k]();
    if(k==='pf'){ ['pfq','pfs','pfo'].forEach(id=>$('#'+id).addEventListener('input',pfDraw)); pfDraw(); }
    if(k==='wk'){ $('#wkr').addEventListener('input',e=>{ wk=+e.target.value; wkDraw(); }); wkDraw(); }
    if(k==='act'){ $$('#mixl button').forEach(b=>b.onclick=()=>{ actF=b.dataset.f; $$('#mixl button').forEach(x=>x.setAttribute('aria-pressed',x===b)); evDraw(); }); evDraw(); }
    if(k==='ai'){ segBind(body,'data-m',v=>{ aiM=v; aiDraw(); }); aiDraw(); }
    if(k==='dl') dlDraw(); }
  $$('#mtabs button').forEach(b=>b.addEventListener('click',()=>show(b.dataset.k)));
  show('pf');
})();

/* SECURITY */
(()=>{ const N=[['user','Consultant','browser, client account',''],['sso','Microsoft Entra ID','single sign-on, client tenant only',''],['portal','Execution Portal','deny-by-default middleware · auth guard on every API route','0 model keys'],['n8n','n8n model gateway','brokers every generation and embedding call','keys live here'],['llm','Claude · OpenAI','generation and embeddings',''],['qd','Qdrant','29 collections · read-only for the portal',''],['pg','PostgreSQL','portal schema · SOW tables read-only','']];
  $('#smap').innerHTML=N.map(n=>`<div data-n="${n[0]}"><b>${n[1]}</b><span>${n[2]}</span>${n[3]?`<em>${n[3]}</em>`:''}</div>`).join('');
  const det=$('#sdet'),aud=$('#saud'); let tok=0,user=false;
  const clr=()=>$$('#smap>div').forEach(d=>d.className='');
  const on=k=>$(`#smap [data-n="${k}"]`).classList.add('on');
  const A=(k,t)=>{ const now=new Date(); aud.insertAdjacentHTML('afterbegin',`<span><em>${now.toTimeString().slice(0,8)}</em><b class="${k}">${k==='u'?'user':k==='a'?'ai':'system'}</b>${t}</span>`); };
  const TR={
   gen:[['user','Consultant asks for a section to be generated.','u','Consultant A · generate requested'],['sso','Session verified: signed in through Entra ID.'],['portal','Middleware and route guard pass; a durable job is queued.','s','Generation job queued'],['qd','Context retrieved from Qdrant, read-only.'],['n8n','Prompt sent to the n8n gateway. The portal holds no model key.'],['llm','n8n calls the model with its own credentials.'],['pg','Section, revision, usage record and audit event saved in one transaction.','a','AI agent · section generated (new revision)']],
   keys:[],anon:[]};
  async function run(k){ const my=++tok; clr(); det.innerHTML=''; $$('#sec .ep-sbtns button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===k));
    if(k==='keys'){ $$('#smap>div').forEach(d=>d.classList.add('dim')); const n=$('#smap [data-n="n8n"]'),p=$('#smap [data-n="portal"]'); n.className='key'; p.className='nokey on'; det.innerHTML='<b>Model credentials exist in exactly one place: n8n.</b> The portal holds no Anthropic or OpenAI key and makes no direct provider call; every generation and embedding goes through the gateway.'; return; }
    if(k==='anon'){ on('user'); await sleep(RM?0:500); if(my!==tok) return; $('#smap [data-n="portal"]').className='bad'; det.innerHTML='<b>Denied by default.</b> Without a signed-in client session, browser routes redirect to sign-in and API routes return unauthorized. Nothing reaches the data or the models.'; A('s','Unauthenticated request rejected'); return; }
    det.innerHTML='<b>Tracing a section generation</b><ol id="sol"></ol>';
    for(const s of TR.gen){ if(my!==tok) return; on(s[0]); $('#sol').insertAdjacentHTML('beforeend',`<li>${s[1]}</li>`); if(s[2]) A(s[2],s[3]); await sleep(RM?0:850); } }
  $$('#sec .ep-sbtns button').forEach(b=>b.addEventListener('click',()=>{ user=true; run(b.dataset.t); }));
  A('s','Weekly snapshot captured');
  onView($('#sec'),()=>{ if(!user) run('gen'); },.35);
})();

/* PROOF */
(()=>{ const P=[['portfolio','Implementation Portfolio','Every engagement, its documentation progress and AI status in one control room.'],['overview','Project workspace','Completion, documents, open items and AI readiness at a glance.'],['sow','SOW as source of truth','Duration, timeline and scope flow into a week-by-week roadmap.'],['req','Requirements','Generated per technology, each section grounded in Confluence pages and samples.'],['udoc','User Documentation','Admin, end-user, approver and audit guides, downloadable separately.'],['tc','TO CONFIRM, answered','An open question answered in place, applied once the section is clean.'],['ss','SCREENSHOT NEEDED','The AI asks for the image instead of describing a screen it hasn\'t seen.'],['groovy','Groovy Scripts','Named platform scripts generated against vetted references.'],['advisor','Product Advisor','Version-aware answers on what the platform supports.'],['rc','AI Review Center','Five cross-document checks, each with a live number.'],['risk','Risk Analysis','AI-synthesised risks with severity, traced to approved sections.'],['status','Reports and Status','Cumulative standing by document across the SOW timeline.'],['activity','Activity','Every generate, approve, modify and reopen, attributed.'],['usage','AI usage','Tokens, model calls and cost by person and by document.'],['deliv','Customer Deliverables','Word downloads unlock once every section is approved.']];
  const g=$('#proofg'); g.innerHTML=P.map((p,i)=>`<button type="button" data-i="${i}"><img src="${IMG[p[0]]}" alt="${p[1]}: ${p[2]}" loading="lazy"><span><b>${p[1]}</b>${p[2]}</span></button>`).join('');
  $$('#proofg button').forEach(b=>b.addEventListener('click',()=>{ const p=P[+b.dataset.i]; LB(p[0],p[1]+' · '+p[2],b); }));
})();

/* RESULTS */
(()=>{ const BA=[['Four documents written from a blank page','Generated from the signed SOW and checklist'],['Structure varied by author','Versioned outline templates own the structure'],['No link back to approved sources','Every section grounded and traceable'],['Open questions buried in prose','Explicit flags, resolved before approval'],['Searching docs and old tickets by hand','Five specialist assistants, grounded per tool'],['No view of progress or AI spend','Live portfolio, weekly snapshots and cost tracking']];
  $('#ba').innerHTML='<span class="lbl">Before and after</span>'+BA.map(b=>`<div><span class="b">${b[0]}</span><i>→</i><span class="a">${b[1]}</span></div>`).join('');
  onView($('#ba'),()=>$('#ba').classList.add('in'),.25);
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to,suf=b.dataset.suf||'',dec=+(b.dataset.dec||0),f=b.dataset.fmt; if(RM) return;
    onView(b,async()=>{ for(let i=0;i<=24;i++){ const v=to*i/24; b.textContent=(dec?v.toFixed(dec):f?fmt(Math.round(v)):Math.round(v))+suf; await sleep(28); } },.5); });
})();
