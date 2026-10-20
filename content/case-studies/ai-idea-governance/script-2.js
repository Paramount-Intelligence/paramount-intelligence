__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const onView=(el,fn,th=.35)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const visible=(el,cb)=>{ new IntersectionObserver(es=>cb(es[0].isIntersecting),{threshold:.15}).observe(el); };
const IMG={"submit": "/images/case-studies/ag-01-submit-idea.webp", "triage": "/images/case-studies/ag-02-triage-queue.webp", "pipe": "/images/case-studies/ag-03-idea-pipeline.webp", "teams": "/images/case-studies/ag-04-teams-notifications.webp", "sens": "/images/case-studies/ag-05-sensitive-review.webp", "dash": "/images/case-studies/ag-06-dashboard.webp", "int": "/images/case-studies/ag-07-integrations.webp", "flows": "/images/case-studies/ag-08-flows-writeback.webp"};
const STAGES=['Submitted','Triaged','Approved','In Build','Deployed','Parked','Declined'];
const SC={Submitted:'#646c7e','Triaged':'#09b6f9','Approved':'#3dbe8b','In Build':'#204ecf','Deployed':'#0f256e','Parked':'#9aa3b5','Declined':'#c2410c'};
const now=()=>new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
function teamsMsg(st,t,sup,extra){ const S=sup||'your support contact';
  const M={Submitted:null,
    Triaged:`The governance team is reviewing your AI idea <b>"${t}"</b>.`,
    Approved:`Your AI idea <b>"${t}"</b> has been <b>approved</b>. Your support contact is <b>${S}</b>. They will reach out to plan the first build steps.`,
    'In Build':`Your AI idea <b>"${t}"</b> has moved to <b>In Build</b>. The governance team has been notified.`,
    Deployed:`Your AI idea <b>"${t}"</b> is <b>deployed</b> and added to the hub's inventory of shipped AI tools.`,
    Parked:`Your AI idea <b>"${t}"</b> has been <b>parked</b>. Notes from triage: ${extra||'no further action needed for now.'}`,
    Declined:`Thank you for <b>"${t}"</b>. It won't be taken forward this time: ${extra||'it overlaps with an existing tool'}. You're welcome to resubmit.`};
  return M[st]; }
const bubble=(html,meta,sens)=>`<div class="ag-tm${sens?' sens':''}"><i>⚡</i><div><span class="h"><b>Workflows</b> ${now()}</span><p>${html}</p><small>${meta||'Sent via Power Automate · AI Idea Governance'}</small></div></div>`;

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.12});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* lightbox */
const LB=(()=>{ const lb=$('#lb'),li=$('#lbimg'),lc=$('#lbcap'); let last=null;
  const close=()=>{ lb.hidden=true; last&&last.focus(); }; $('#lbx').onclick=close; lb.addEventListener('click',e=>{ if(e.target===lb) close(); }); addEventListener('keydown',e=>{ if(e.key==='Escape'&&!lb.hidden) close(); });
  return (k,cap,from)=>{ last=from||document.activeElement; li.src=IMG[k]; li.alt=cap; lc.textContent=cap+' · sanitised data'; lb.hidden=false; $('#lbx').focus(); }; })();

/* HERO: one idea's journey */
(()=>{ const S=['Submitted','Triaged','Approved','In Build','Deployed'],T='Design Review Checker';
  const M=[`Thanks! Your AI idea <b>"${T}"</b> was received. The governance team will follow up within five business days.`,teamsMsg('Triaged',T),teamsMsg('Approved',T,'Dana Whitfield'),teamsMsg('In Build',T),teamsMsg('Deployed',T)];
  const st=$('#hstages'),card=$('#hcard'),stat=$('#hstat'),tm=$('#hteams');
  st.innerHTML=S.map(s=>`<span><i></i>${s}</span>`).join(''); const D=$$('#hstages span');
  function show(k){ D.forEach((d,i)=>{ d.classList.toggle('done',i<k); d.classList.toggle('on',i===k); });
    card.style.setProperty('--x',(k/(S.length-1))); card.className='ag-hcard s'+k; stat.textContent=S[k]; stat.style.background=SC[S[k]];
    tm.insertAdjacentHTML('afterbegin',bubble(M[k])); const all=$$('#hteams .ag-tm'); all.slice(2).forEach(x=>x.remove()); }
  if(RM){ show(4); return; }
  let vis=true; visible($('#hj'),v=>vis=v);
  (async()=>{ while(true){ tm.innerHTML=''; for(let k=0;k<S.length;k++){ while(!vis) await sleep(400); show(k); await sleep(k===S.length-1?3600:2300); } } })();
})();

/* PROBLEM: the hub */
(()=>{ const A=[['Engineering',22],['Industrialization',16],['Offer marketing',10],['Agile delivery',8],['Quality',10],['Procurement',7],['Supply chain',7]];
  const IDEA=new Set([3,9,14,25,31,40,47,55,63]),HELP=new Set([3,14,31,47,70]),SENS=new Set([25,55]);
  let n=0; $('#people').innerHTML=A.map(([a,c])=>`<div class="ag-area"><span>${a}</span><div>${Array.from({length:c},()=>{ const i=n++; return `<i data-i="${i}" class="${IDEA.has(i)?'idea':''}${HELP.has(i)?' help':''}${SENS.has(i)?' sens':''}"></i>`; }).join('')}</div></div>`).join('');
  const Q=[['What AI work exists?','No single list anywhere','9 ideas in one register','idea'],['On which platform, and by whom?','Ask around and hope','Tool, owner and team on every record','idea'],['Who is stuck and needs help?','No defined way to ask','5 asked for help, each with a named contact','help'],['Which ideas touch sensitive material?','Found out late, if at all','2 flagged for review at intake','sens']];
  const box=$('#fog'),fq=$('#fq'),B=$$('#fog .seg button');
  fq.innerHTML=Q.map((q,i)=>`<button type="button" class="ag-q" data-i="${i}"><b>${q[0]}</b><span class="a"></span></button>`).join(''); const QB=$$('#fq .ag-q');
  let mode='before',cur=0,user=false;
  function ask(i){ cur=i; const q=Q[i]; QB.forEach((b,k)=>{ b.classList.toggle('on',k===i); const a=b.querySelector('.a'); a.className='a '+(mode==='after'?'y':'n'); a.textContent=k===i?(mode==='after'?'✓ '+q[2]:'✕ '+q[1]):''; });
    $('#people').dataset.f=q[3]; }
  function setMode(m){ mode=m; B.forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===m)); box.classList.toggle('after',m==='after'); ask(cur); }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; setMode(b.dataset.m); })); QB.forEach(b=>b.addEventListener('click',()=>{ user=true; ask(+b.dataset.i); }));
  setMode('before');
  onView(box,async()=>{ if(RM) return; let k=0; while(!user){ for(const m of ['before','after']){ for(let i=0;i<2;i++){ if(user) return; setMode(m); ask((k+i)%4); await sleep(2000); } } k+=2; } },.35);
})();

/* RULES */
(()=>{ const R=[['Inside our tenant','External SaaS, or any data leaving the tenant','Everything runs in the client’s own Microsoft 365 tenant and Azure subscription.'],
   ['Native Microsoft tools only','Dataverse, Power Apps per-app licences, a Copilot Studio dependency','Forms, SharePoint, Power Automate and Teams on standard E3/E5 licensing.'],
   ['Nothing new to sign into','A new app, portal or login for engineers','Engineers submit in Microsoft Forms and hear back in Teams.'],
   ['Under two minutes','Long questionnaires that feel like paperwork','Four core questions plus identity; follow-ups appear only when they apply.'],
   ['No approval gate','Asking permission before building','The register observes and supports work. It never grants permission for it.'],
   ['Rebuildable without us','Black-box delivery','Every step documented so the client can rebuild and maintain it without Paramount.']];
  const box=$('#rulesx'); box.innerHTML=R.map((r,i)=>`<button type="button" class="ag-rule" aria-pressed="false"><span class="n">Rule ${i+1}</span><b>${r[0]}</b><span class="out"><small>Ruled out</small>${r[1]}</span><span class="did"><small>So we</small>${r[2]}</span></button>`).join('');
  const B=$$('#rulesx .ag-rule'); let user=false;
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true'); }));
  onView(box,async()=>{ if(RM){ B.forEach(b=>b.setAttribute('aria-pressed','true')); return; } for(const b of B){ await sleep(550); if(user) return; b.setAttribute('aria-pressed','true'); } },.3);
})();

/* INTAKE: the form and the flow */
(()=>{ const form=$('#iform'),qO=$('#qOther'),qH=$('#qHelp'),cnt=$('#fqn'),steps=$('#fsteps'),run=$('#frun'),msgs=$('#fmsgs'),fail=$('#ffail');
  const val=q=>{ const b=form.querySelector(`[data-q="${q}"] button.on`); return b?b.textContent:''; };
  function cond(){ const o=!!form.querySelector('[data-q="tool"] button.on[data-x="other"]'),h=!!form.querySelector('[data-q="sup"] button.on[data-x="help"]');
    qO.classList.toggle('show',o); qH.classList.toggle('show',h); cnt.textContent=7+(o?1:0)+(h?1:0); }
  $$('#iform .ag-opts').forEach(g=>g.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{ g.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b)); cond(); })));
  cond();
  const S=[['Read governance owner','From one variable: Rachel Moore','PA'],['Get response details','All answers from Microsoft Forms','PA'],['Sensitive check','','PA'],['Get user profile','Display name: Ryan Brooks','PA'],['Create item','AI Idea Registry · Status = Submitted · UTC stamp','SP'],['Notify the submitter','Teams confirmation to Ryan Brooks','T'],['Alert the governance owner','Teams alert to Rachel Moore','T']];
  function draw(){ steps.innerHTML=S.map((s,i)=>`<li><em class="${s[2]}">${s[2]}</em><span><b>${s[0]}</b><small>${s[1]}</small></span><i></i></li>`).join(''); }
  draw(); let tok=0;
  async function go(){ const my=++tok; draw(); msgs.innerHTML=''; const L=$$('#fsteps li'),t=$('#f1').value.trim()||'Untitled idea',sa=val('sens'),flag=sa!=='No',bad=fail.checked;
    L[2].querySelector('small').textContent=`Answer "${sa}" → flag ${flag?'TRUE':'false'}${sa==='Not sure'?' (Not sure counts as Yes)':''}`;
    run.textContent='running…'; const t0=performance.now();
    for(let i=0;i<L.length;i++){ if(my!==tok) return; L[i].classList.add('on'); await sleep(RM?0:520);
      if(i===4&&bad){ L[i].classList.remove('on'); L[i].classList.add('bad'); L[i].querySelector('small').textContent='Write to SharePoint failed';
        steps.insertAdjacentHTML('beforeend',`<li class="par on"><em class="PA">PA</em><span><b>Parallel branch: failure alert</b><small>Governance owner alerted, so the submission is not lost</small></span><i></i></li>`);
        msgs.innerHTML=bubble(`Intake flow could not save <b>"${t}"</b> to the AI Idea Registry. Please check the run and re-enter it.`,'Governance owner view · failure alert',1); run.textContent='failed · owner alerted'; return; }
      L[i].classList.remove('on'); L[i].classList.add('done'); }
    run.textContent=`succeeded in ${((performance.now()-t0)/1000).toFixed(1)} s`;
    msgs.innerHTML=bubble(`Thanks! Your AI idea <b>"${t}"</b> was received. The governance team will follow up within five business days. <u>View it in the registry</u>`,'Ryan Brooks sees this')
      +bubble(`${flag?'<b class="red">[SENSITIVE DATA REVIEW]</b> ':''}New AI idea: <b>${t}</b><br>Ryan Brooks · ${val('team')} · ${val('tool')} · ${val('sup')}`,'Governance owner view',flag); }
  $('#fsub').onclick=go;
  onView($('#itk'),async()=>{ await sleep(800); go(); },.35);
})();

/* PIPELINE board + DASHBOARD */
const BOARD=(()=>{ const I=[[1,'AI Idea Registry Assistant','Engineering','','','Power Automate','Submitted',0,1],[9,'Supplier Quality Insights','Industrialization','Medium','','Not sure yet','Triaged',1,1],[3,'Export Control Classifier','Quality','High','Dana','Copilot Studio','Approved',1,0],[5,'Test Report Generator','Industrialization','Medium','Kevin','Power Automate','Approved',0,1],[6,'Work Instruction Copilot','Industrialization','Medium','Kevin','M365 Copilot','Approved',0,0],[7,'Design Review Checker','Engineering','High','Dana','Vertex AI / Gemini','Approved',0,1],[8,'Production Line Anomaly Detection','Industrialization','High','Kevin','Copilot Studio','In Build',0,1],[2,'Digital MV Expert','Offer Marketing','High','Dana','Copilot Studio','Deployed',0,0],[4,'Literature Review Agent','Engineering','Low','','M365 Copilot','Parked',0,0]]
    .map(r=>({id:r[0],t:r[1],a:r[2],p:r[3],s:r[4],tool:r[5],st:r[6],sens:r[7],help:r[8]}));
  const FULL={Dana:'Dana Whitfield',Kevin:'Kevin Osei'};
  const cols=$('#bcols'),tr=$('#btrace'),tm=$('#bteams'); let sel=null,user=false,listeners=[],tok=0;
  function card(i){ return `<div class="ag-card${i.sens?' sens':''}${sel===i.id?' sel':''}" draggable="true" data-id="${i.id}" tabindex="0" role="button" aria-label="${i.t}, ${i.st}. Tap, then tap a column to move it."><b>${i.t}</b><span class="a"><i style="background:${SC[i.st]}"></i>${i.a}</span><span class="m">${i.p?`<em class="p ${i.p.toLowerCase()}">${i.p}</em>`:'<em class="p none">No priority</em>'}${i.s?`<span>${i.s}</span>`:''}<span>${i.tool}</span></span></div>`; }
  function render(){ cols.innerHTML=STAGES.map(s=>{ const L=I.filter(i=>i.st===s); return `<div class="ag-col" data-s="${s}"><button type="button" class="ag-colh"><i style="background:${SC[s]}"></i>${s}<em>${L.length}</em></button><div class="ag-cl">${L.map(card).join('')||'<span class="none">No ideas</span>'}</div></div>`; }).join('');
    $$('#bcols .ag-card').forEach(c=>{ c.addEventListener('dragstart',e=>{ user=true; e.dataTransfer.setData('text/plain',c.dataset.id); c.classList.add('drag'); });
      c.addEventListener('dragend',()=>c.classList.remove('drag'));
      const pick=()=>{ user=true; sel=sel===+c.dataset.id?null:+c.dataset.id; render(); }; c.addEventListener('click',pick); c.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(); } }); });
    $$('#bcols .ag-col').forEach(col=>{ col.addEventListener('dragover',e=>{ e.preventDefault(); col.classList.add('over'); }); col.addEventListener('dragleave',()=>col.classList.remove('over'));
      col.addEventListener('drop',e=>{ e.preventDefault(); col.classList.remove('over'); move(+e.dataTransfer.getData('text/plain'),col.dataset.s); });
      col.querySelector('.ag-colh').addEventListener('click',()=>{ if(sel!=null){ user=true; const id=sel; sel=null; move(id,col.dataset.s); } }); });
    cols.classList.toggle('picking',sel!=null); listeners.forEach(f=>f(I)); }
  async function move(id,to){ const it=I.find(i=>i.id===id); if(!it||it.st===to){ render(); return; } const from=it.st,my=++tok; it.st=to; sel=null; render();
    const c=cols.querySelector(`.ag-card[data-id="${id}"]`); if(c) c.classList.add('landed');
    const msg=teamsMsg(to,it.t,FULL[it.s],to==='Parked'?'needs a data owner sign-off before any build.':to==='Declined'?'it overlaps with an existing tool':'');
    const T=[['Power BI',`Card moved: ${it.t}, ${from} to ${to}`],['Azure Functions',`Request validated: id ${id}, "${to}" is in the allowed list`],['Power Automate','Status change: one UTC timestamp composed'],['SharePoint',`Item ${id} updated: Status, StatusUpdatedAt`],['Teams',msg?(to==='In Build'||to==='Deployed'?'Engineer and governance owner notified':'Engineer notified'):'No message: the status flow ignores Submitted']];
    tr.innerHTML=T.map(x=>`<li><em>${x[0]}</em><span>${x[1]}</span><i>✓</i></li>`).join(''); tm.innerHTML='';
    const L=$$('#btrace li'); for(let k=0;k<L.length;k++){ if(my!==tok) return; await sleep(RM?0:380); L[k].classList.add('on'); }
    tm.innerHTML=msg?bubble(msg,'As the submitter sees it'):'<p class="ag-none">The status-change flow has a trigger condition that ignores items at Submitted, so nothing is posted.</p>'; }
  render(); tm.innerHTML='<p class="ag-none">Move a card to see the message it sends.</p>';
  onView($('#board'),async()=>{ await sleep(900); if(!user) await move(7,'In Build'); if(RM) return; const demo=[[9,'Approved'],[5,'In Build'],[9,'Triaged'],[5,'Approved']]; let k=0; while(!user){ await sleep(4800); if(user) return; const [id,s]=demo[k++%demo.length]; await move(id,s); } },.3);
  return {on:f=>{ listeners.push(f); f(I); }};
})();

(()=>{ const kp=$('#dkpi'),don=$('#ddon'),leg=$('#dleg'),tot=$('#dtot'),ar=$('#darea'),chk=$('#dcheck');
  BOARD.on(I=>{ const c=s=>I.filter(i=>i.st===s).length;
    const K=[['Total ideas',I.length,'#0f256e'],['Needs triage',c('Submitted'),'#646c7e'],['Needs support',I.filter(i=>i.help).length,'#f5b83d'],['In build',c('In Build'),'#204ecf'],['Deployed',c('Deployed'),'#3dbe8b'],['Sensitive review',I.filter(i=>i.sens).length,'#c2410c']];
    kp.innerHTML=K.map(k=>`<div><span><i style="background:${k[2]}"></i>${k[0]}</span><b>${k[1]}</b></div>`).join('');
    let a0=0; const R=46,C=2*Math.PI*R; don.innerHTML=`<circle cx="60" cy="60" r="${R}" fill="none" stroke="#eef1f6" stroke-width="16"/>`+STAGES.map(s=>{ const v=c(s)/I.length; const seg=`<circle cx="60" cy="60" r="${R}" fill="none" stroke="${SC[s]}" stroke-width="16" stroke-dasharray="${Math.max(0,v*C-1.5)} ${C}" stroke-dashoffset="${-a0*C}" transform="rotate(-90 60 60)"/>`; a0+=v; return seg; }).join('');
    tot.textContent=I.length; leg.innerHTML=STAGES.map(s=>`<li><i style="background:${SC[s]}"></i>${s}<b>${c(s)}</b></li>`).join('');
    const A={}; I.forEach(i=>A[i.a]=(A[i.a]||0)+1); const mx=Math.max(...Object.values(A));
    ar.innerHTML=Object.entries(A).sort((a,b)=>b[1]-a[1]).map(([a,v])=>`<div><span>${a}</span><i><b style="width:${v/mx*100}%"></b></i><em>${v}</em></div>`).join('');
    chk.innerHTML=`<span>${STAGES.map(s=>c(s)).join(' + ')} = <b>${I.length}</b></span><em>✓ Stage counts add up to Total ideas</em>`; });
})();

/* SENSITIVE */
(()=>{ const B=$$('#sans button'),res=$('#sres'),who=$('#swho'),au=$('#saudit'),lk=$('#slock'); let ans='Not sure',locked=false,user=false;
  function draw(){ const flag=ans!=='No';
    res.innerHTML=flag?`<span class="ag-flag">Flagged for sensitive review</span><p>${ans==='Not sure'?'"Not sure" counts as Yes. Over-flagging is the safer error.':'The engineer said Yes.'} The governance alert starts with <b>[SENSITIVE DATA REVIEW]</b> and the idea joins the Sensitive Review view.</p>`:`<span class="ag-ok">No flag</span><p>The idea goes through the normal triage queue. Nobody waits on an extra step.</p>`;
    lk.disabled=!flag; lk.textContent=locked?'Remove restriction':'Restrict this record'; if(!flag) locked=false;
    const W=[['Governance owners','Full control','own'],['Assigned support','Edit','sup'],['Engineering community',locked?'Hidden (sensitive)':'Read','com']];
    who.innerHTML=W.map(w=>`<div class="${w[2]}${locked&&w[2]==='com'?' hid':''}"><b>${w[0]}</b><span>${w[1]}</span><i>${locked&&w[2]==='com'?'🔒':'👁'}</i></div>`).join('');
    const A=[]; if(flag) A.push(`Intake flow flagged Supplier Quality Insights (answer: ${ans}) and alerted the governance owner`); if(locked) A.push('Rachel Moore restricted the record to governance owners and assigned support');
    au.innerHTML=A.length?A.reverse().map(a=>`<li>${a}<small>just now</small></li>`).join(''):'<li class="none">No sensitive-data events for this idea</li>'; }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; ans=b.textContent; B.forEach(x=>x.classList.toggle('on',x===b)); draw(); }));
  lk.onclick=()=>{ user=true; locked=!locked; draw(); };
  draw(); onView($('#sens'),async()=>{ if(RM) return; await sleep(1600); if(user) return; locked=true; draw(); },.4);
})();

/* LOOP */
(()=>{ const D={form:'<b>Capture · Microsoft Forms.</b> The org-only AI Idea Submission form records the engineer’s identity from sign-in; nine questions, two of them conditional.',
   intake:'<b>Process · Intake flow.</b> Resolves the display name, evaluates the sensitive answer, writes the record and sends both Teams messages, with a parallel failure alert.',
   status:'<b>Process · Status change flow.</b> Fires when a registry item changes, ignores items at Submitted, switches on the status text and posts the matching message.',
   wb:'<b>Process · Write-back flow.</b> Triggered by an HTTP request: composes one UTC timestamp, merges Status and StatusUpdatedAt into the item, returns the saved time.',
   sp:'<b>Store · AI Idea Registry.</b> The single source of truth: 18 columns, versioning on, append-only triage notes, item-level permissions for sensitive records.',
   teams:'<b>Notify · Workflows bot.</b> Submitter confirmations, governance alerts and every stage update, through the standard post-message action.',
   pbi:'<b>Present · Power BI.</b> Count measures, charts and the Kanban board, read from the registry; dropping a card starts the write-back.',
   fn:'<b>Relay · UpdateIdeaStatus.</b> An Azure Function in the client’s subscription that validates the request against the seven statuses and keeps the flow’s address server-side.'};
  const P={fwd:[['form','An engineer submits the form'],['intake','The intake flow processes the response'],['sp','A new item lands in the registry'],['teams','Engineer and governance owner are told in Teams'],['pbi','The dashboard reads the new idea']],
    back:[['pbi','A governance lead drops a card on the board'],['fn','The Azure Function validates ID and status'],['wb','The write-back flow stamps one UTC time'],['sp','SharePoint saves Status and StatusUpdatedAt'],['status','The status change flow fires'],['teams','The engineer gets the stage message']]};
  const N={}; $$('#loopx .ag-ln').forEach(n=>N[n.dataset.n]=n); const det=$('#ldet'),lab=$('#lstep'),B=$$('#loopx .seg button'); let tok=0,user=false;
  async function run(d){ const my=++tok; while(my===tok){ B.forEach(b=>b.setAttribute('aria-pressed',b.dataset.d===d)); Object.values(N).forEach(n=>n.classList.remove('on','seen','n1','n2','n3','n4','n5','n6'));
      const S=P[d]; for(let i=0;i<S.length;i++){ if(my!==tok) return; Object.values(N).forEach(n=>{ if(n.classList.contains('on')){ n.classList.remove('on'); n.classList.add('seen'); } }); N[S[i][0]].classList.add('on'); N[S[i][0]].dataset.k=i+1;
        lab.textContent=`Step ${i+1} of ${S.length}: ${S[i][1]}`; det.innerHTML=D[S[i][0]]; if(!RM) await sleep(1500); }
      if(RM) return; await sleep(1800); if(my!==tok) return; if(!user) d=d==='fwd'?'back':'fwd'; } }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; run(b.dataset.d); }));
  Object.entries(N).forEach(([k,n])=>n.addEventListener('click',()=>{ user=true; tok++; Object.values(N).forEach(x=>x.classList.remove('on','seen')); n.classList.add('on'); det.innerHTML=D[k]; lab.textContent='Showing one component · pick a direction to trace it'; }));
  det.innerHTML=D.sp; N.sp.classList.add('on'); lab.textContent='Pick a direction to trace it';
  onView($('#loopx'),()=>{ if(!user) run('fwd'); },.3);
  const R=[['Engineering community','Visitors group','Read','Sees the dashboard, views and board. Cannot edit items or drag cards.'],['Governance owner and sponsor','Owners group','Full control','Triage, priorities, support assignments and permissions.'],['Assigned support','Members group','Edit','Updates the ideas they are helping with.'],['Paramount','During the build → after','Owner → Contributor','Held site owner rights to build, then stepped down at handover.']];
  $('#roles').innerHTML='<span class="lbl">Who can do what · private team site "AI Governance - Innovation Hub"</span>'+R.map(r=>`<div><small>${r[1]}</small><b>${r[0]}</b><em>${r[2]}</em><span>${r[3]}</span></div>`).join('');
})();

/* PROOF */
(()=>{ const P=[['dash','Governance dashboard','KPI cards, charts, pipeline and activity feed.'],['submit','Submit an idea','The intake form and what happens when you submit.'],['triage','Triage queue','A full idea record, version history and access panel.'],['pipe','Idea pipeline','Dragging a card, with the write-back trace.'],['teams','Teams notifications','Stage templates, delivery log and Teams previews.'],['sens','Sensitive review','Flagged ideas, audit trail and review checklist.'],['int','Integrations','Capture, process, store, present and notify.'],['flows','Flows and write-back','The three flows step by step, recent runs and configuration.']];
  const g=$('#proofg'); g.innerHTML=P.map((p,i)=>`<button type="button" data-i="${i}"><img src="${IMG[p[0]]}" alt="${p[1]}: ${p[2]}" loading="lazy"><span><b>${p[1]}</b>${p[2]}</span></button>`).join('');
  $$('#proofg button').forEach(b=>b.addEventListener('click',()=>{ const p=P[+b.dataset.i]; LB(p[0],p[1],b); }));
})();

/* RESULTS */
(()=>{ const O=['One source of truth for ideas, owners, stage, priority, platform and support needs','Engineers who need help routed to a named support contact','Every stage change delivered to the engineer in Teams','Sensitive and export-controlled ideas flagged at intake','Live leadership visibility through dashboard views and a Kanban board','Full documentation for the hub to run, rebuild and extend it'];
  const SC=[['SharePoint site and permissions','Private team site, owners and community read access'],['Live intake form','Identity capture, conditional branching, under two minutes'],['Support-type capture','Architecture, deployment or communication help'],['Flow 1 · Intake','Tested, Teams notifications, error handling'],['Flow 2 · Status change','Tested, Teams messages, loop-safe'],['Six views and a Kanban board','Colour-coded by status and priority'],['Landing page','One URL for the whole community'],['Build documentation','Step-by-step, with screenshots'],['Live implementation and demo','Built in the client tenant with the sponsor'],['Advisory','Architecture and the team\u2019s own AI use cases']];
  $('#sgrid').innerHTML=SC.map((s,i)=>`<div><em>${String(i+1).padStart(2,'0')}</em><b>${s[0]}</b><span>${s[1]}</span></div>`).join('');
  onView($('#scope'),()=>$('#scope').classList.add('in'),.25);
  const box=$('#outs'); box.innerHTML=O.map(o=>`<div><i>✓</i><span>${o}</span></div>`).join('');
  onView(box,async()=>{ const D=$$('#outs div'); for(const d of D){ d.classList.add('on'); await sleep(RM?0:220); } },.4);
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to,pre=b.dataset.pre||'',suf=b.dataset.suf||''; if(RM||!to) return;
    onView(b,async()=>{ for(let f=0;f<=30;f++){ b.textContent=pre+Math.round(to*f/30)+suf; await sleep(26); } },.6); });
})();
