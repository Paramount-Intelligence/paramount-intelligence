__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
const onView=(el,fn,th=.3)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const segBind=(root,attr,cb)=>{ const B=[...root.querySelectorAll('button['+attr+']')]; B.forEach(b=>b.addEventListener('click',()=>{ B.forEach(x=>x.setAttribute('aria-pressed',x===b)); cb(b.getAttribute(attr),true); })); return v=>{ B.forEach(x=>x.setAttribute('aria-pressed',x.getAttribute(attr)===v)); }; };
const typeInto=async(el,html,my,get,speed=14)=>{ const tmp=document.createElement('div'); tmp.innerHTML=html; const txt=tmp.textContent; if(RM){ el.innerHTML=html; return true; } el.textContent=''; for(let i=0;i<txt.length;i+=3){ el.textContent=txt.slice(0,i+3); await sleep(speed); if(get()!==my) return false; } el.innerHTML=html; return true; };

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.08});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* HERO: live feed of AI-assisted work */
(()=>{ const F=[['Recruitment','Candidate profile summarised','Egnyte',18],['Client services','Client email reply drafted','Outlook',9],['Operations','Weekly report formatted','PowerPoint',22],['Recruitment','3 interviews scheduled','Calendar',10],['Recruitment','Outreach first draft ready','Slack',14],['Client services','Shortlist deck prepared','PowerPoint',25],['Operations','Web-form lead pushed to CRM','API',6],['Recruitment','12 applicants pre-screened','Screening',40]];
  const feed=$('#hfeed'),k=$('#hk'); let n=0,m=0;
  const kp=()=>{ k.innerHTML=`<div><b>${n}</b><span>AI workflows run</span></div><div><b>${(m/60).toFixed(1)} h</b><span>given back to the team</span></div><div class="m"><b>3</b><span>teams on AI</span></div>`; };
  const card=(f,i)=>`<div class="ae-fi" style="animation-delay:${i*.05}s"><span class="t">${f[2]}</span><div><b>${f[1]}</b><small>${f[0]}</small></div><em>−${f[3]} min</em></div>`;
  kp();
  if(RM){ feed.innerHTML=F.slice(0,5).map(card).join(''); n=128; m=1960; kp(); return; }
  (async()=>{ n=96; m=1420; for(let i=0;;i=(i+1)%F.length){ feed.insertAdjacentHTML('afterbegin',card(F[i],0)); if(feed.children.length>5) feed.lastChild.remove(); n++; m+=F[i][3]; kp(); await sleep(1500); } })();
})();

/* PROBLEM: adoption matrix */
(()=>{ const T=['Recruitment','Client services','Operations'],W=['Client emails','Candidate summaries','Reports & decks','Scheduling','Outreach drafts'],WS=['Emails','Summaries','Reports','Calendar','Outreach'];
  const BEF=[[1,1,0,0,1],[1,0,1,0,0],[0,0,1,1,0]],AFT=[[2,2,2,2,2],[2,2,2,2,2],[2,1,2,2,2]];
  const g=$('#mgrid'); let mode='before',user=false;
  g.innerHTML=`<div class="ae-gh"></div>${W.map((w,i)=>`<div class="ae-gh"><span class="lg">${w}</span><span class="sh2">${WS[i]}</span></div>`).join('')}`+T.map((t,r)=>`<div class="ae-gt">${t}</div>${W.map((w,c)=>`<div class="ae-gc" data-r="${r}" data-c="${c}"><i></i></div>`).join('')}`).join('');
  const C=$$('#mgrid .ae-gc');
  async function draw(){ const M=mode==='before'?BEF:AFT; for(const c of C){ const v=M[+c.dataset.r][+c.dataset.c]; c.className='ae-gc s'+v; c.title=['Not used','Ad hoc','Standard AI workflow'][v]; await sleep(mode==='after'?45:0); }
    const s=M.flat().filter(v=>v===2).length;
    $('#msum').innerHTML=mode==='before'?`<b>0 of 15</b> team workflows used AI in a standard way. Where AI was used at all, each person prompted their own way and results varied.`:`<b>${s} of 15</b> team workflows now run as standard AI workflows, with shared prompt templates and AI inside the tools each team uses.`; }
  const setM=segBind($('#mx'),'data-m',(v,u)=>{ if(u) user=true; mode=v; draw(); });
  draw();
  onView($('#mx'),async()=>{ await sleep(2600); if(user) return; mode='after'; setM('after'); draw(); },.35);
})();

/* TRAINING */
(()=>{ const P=[['Level 1','Foundations','What each tool is good at, and safe everyday use'],['Level 2','Practitioner','Prompting techniques and use cases for Copilot, ChatGPT and Claude'],['Level 3','Advanced','Reusable templates and multi-step workflows'],['1:1','Coaching','One-to-one help with new and emerging AI capabilities']];
  $('#tpath').innerHTML='<small>Training path</small>'+P.map((p,i)=>`<div class="ae-lv" data-i="${i}"><em>${p[0]}</em><b>${p[1]}</b><span>${p[2]}</span></div>`).join('');
  const L=[{t:'Candidate summary',bq:'summarise this cv',bo:'Jordan is an experienced professional with a strong background in finance. They have worked at several companies and have many skills including Excel and communication…',
    gq:'<b>Role:</b> you are a recruiter preparing a shortlist.<br><b>Task:</b> summarise the attached CV for the role <u>[Senior Financial Analyst]</u>.<br><b>Format:</b> 3-line summary · must-haves met / missing · notice period · 2 interview questions.<br><b>Rules:</b> only use facts from the CV; flag anything unclear.',
    go:'<b>Summary:</b> 7 years in FP&amp;A, last 3 leading monthly reporting for a mid-size logistics group.<br><b>Must-haves:</b> ✓ financial modelling · ✓ Power BI · ✗ no CPA or CFA<br><b>Notice:</b> 4 weeks<br><b>Ask:</b> 1) the forecast model they rebuilt  2) how they would close the certification gap'},
   {t:'Client email',bq:'write reply to client asking for update',bo:'Dear Client, Thank you for your email. We are working on it and will update you soon. Kind regards.',
    gq:'<b>Role:</b> account manager at a staffing firm.<br><b>Context:</b> client <u>[Harbour Logistics]</u> asked for an update on <u>[2 open roles]</u>.<br><b>Include:</b> status per role, next step with a date, one question back.<br><b>Tone:</b> warm, concise, under 120 words.',
    go:'Hi Priya,<br>Quick update on both roles. <b>Finance Manager:</b> 3 candidates shortlisted; interviews proposed for Thursday. <b>Payroll Lead:</b> 2 strong profiles in final checks, with you by Monday.<br>Could you confirm Thursday works for your panel?<br>Best, Sam'},
   {t:'Interview scheduling',bq:'find time for interview',bo:'Here are some general tips for scheduling interviews: consider time zones, send calendar invites, and confirm attendance…',
    gq:'<b>Task:</b> propose 3 interview slots next week.<br><b>People:</b> candidate <u>[Jordan]</u>, hiring manager <u>[Alex]</u>, recruiter.<br><b>Constraints:</b> 45 minutes, 10:00–16:00, use Outlook free/busy.<br><b>Output:</b> slots plus a ready-to-send invite.',
    go:'<b>Proposed slots:</b> Tue 11:00 · Wed 14:30 · Thu 10:15 (all free for Jordan, Alex and recruiter)<br><b>Invite:</b> "Interview: Senior Financial Analyst · 45 min · Teams link attached"<br><b>Next:</b> send to candidate for choice'}];
  const tabs=$('#ttabs'); let cur=0,tok=0,user=false;
  tabs.innerHTML=L.map((l,i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-i="${i}">${l.t}</button>`).join('');
  async function show(i){ const my=++tok,l=L[i]; cur=i; $$('#ttabs button').forEach((b,k)=>b.setAttribute('aria-selected',k===i));
    $('#tbq').textContent=l.bq; $('#tgq').innerHTML=l.gq; $('#tbo').innerHTML=''; $('#tgo').innerHTML='';
    $$('#tpath .ae-lv').forEach((e,k)=>e.classList.toggle('on',k===Math.min(2,i+1)));
    if(!await typeInto($('#tbo'),esc(l.bo),my,()=>tok,10)) return; await sleep(250); if(my!==tok) return; await typeInto($('#tgo'),l.go,my,()=>tok,10); }
  $$('#ttabs button').forEach(b=>b.addEventListener('click',()=>{ user=true; show(+b.dataset.i); }));
  $('#tbq').textContent=L[0].bq; $('#tgq').innerHTML=L[0].gq;
  onView($('#trn'),async()=>{ await show(0); for(const i of [1,2]){ await sleep(4200); if(user) return; await show(i); } },.3);
})();

/* WORKFLOWS */
(()=>{ const W=[
  {t:'Client email reply',tool:'Outlook · Copilot',m:20,a:11,steps:['Client email arrives in Outlook','Copilot reads the thread and the role status','Draft reply written in the firm\'s tone','Account manager reviews and sends'],
   art:`<div class="ae-mail"><div class="mh"><b>Re: Update on open roles</b><span>To: Priya Shah · Harbour Logistics</span></div><div class="mb">Hi Priya,<br><br>Thanks for checking in. <b>Finance Manager:</b> three candidates are shortlisted and interviews are proposed for Thursday. <b>Payroll Lead:</b> two strong profiles are in final checks and will be with you by Monday.<br><br>Could you confirm Thursday works for your panel?<br><br>Best,<br>Sam</div><div class="mf"><span class="ae-chip">Draft by Copilot</span><span class="ae-chip h">Reviewed by Sam</span></div></div>`},
  {t:'Candidate summary',tool:'Egnyte · Claude',m:30,a:15,steps:['CV saved to the candidate folder in Egnyte','AI extracts experience, skills and qualifications','Matched against the role\'s must-haves','Recruiter checks the summary and shortlists'],
   art:`<div class="ae-cv"><div class="ch2"><b>Jordan Ellis</b><span>Senior Financial Analyst · 7 yrs</span></div><dl><dt>Experience</dt><dd>FP&amp;A, monthly reporting lead, logistics sector</dd><dt>Skills</dt><dd>Financial modelling · Power BI · SQL · Excel</dd><dt>Must-haves</dt><dd><span class="ae-chip ok">✓ Modelling</span><span class="ae-chip ok">✓ Power BI</span><span class="ae-chip no">✗ CPA/CFA</span></dd><dt>Notice</dt><dd>4 weeks</dd></dl><div class="mf"><span class="ae-chip">Summarised by Claude</span><span class="ae-chip h">Checked by recruiter</span></div></div>`},
  {t:'Report formatting',tool:'PowerPoint · Copilot',m:60,a:38,steps:['Weekly numbers exported from the CRM','Copilot builds the slides from the house template','Charts and headlines drafted','Ops lead reviews and shares'],
   art:`<div class="ae-deck"><div class="sl"><small>Weekly placement report · fictional</small><b>Placements up, time-to-fill down</b><div class="bars"><i style="height:40%"></i><i style="height:55%"></i><i style="height:62%"></i><i style="height:80%"></i></div></div><div class="mf"><span class="ae-chip">Formatted by Copilot</span><span class="ae-chip h">Reviewed by ops lead</span></div></div>`},
  {t:'Interview scheduling',tool:'Microsoft 365 calendar',m:25,a:15,steps:['Recruiter asks for slots in Slack','AI checks Outlook free/busy for everyone','Three slots proposed with an invite','Candidate picks; invites go out'],
   art:`<div class="ae-cal"><div class="ch2"><b>Interview · Jordan Ellis</b><span>45 min · Teams</span></div>${['Tue 11:00','Wed 14:30','Thu 10:15'].map((s,i)=>`<div class="sl2 ${i===1?'pick':''}"><b>${s}</b><span>${i===1?'chosen by candidate':'all attendees free'}</span></div>`).join('')}<div class="mf"><span class="ae-chip">Coordinated by AI</span><span class="ae-chip h">Confirmed by recruiter</span></div></div>`},
  {t:'Outreach first draft',tool:'Slack · ChatGPT',m:40,a:26,steps:['Recruiter shares the role brief in Slack','AI drafts personalised outreach for each prospect','Recruiter edits and approves','Messages sent and logged'],
   art:`<div class="ae-slk"><div class="sm"><i>SR</i><div><b>Sam (recruiter)</b><span>/draft outreach for Senior Financial Analyst, 5 prospects</span></div></div><div class="sm ai"><i>AI</i><div><b>AI assistant</b><span>5 drafts ready. Example for <u>Jordan</u>: "Hi Jordan, your work leading monthly reporting at a logistics group stood out. We're helping a client hire a Senior Financial Analyst…"</span></div></div><div class="mf"><span class="ae-chip">Drafted by ChatGPT</span><span class="ae-chip h">Approved by Sam</span></div></div>`}];
  const tabs=$('#wtabs'),art=$('#wart'),st=$('#wsteps'); let cur=0,tok=0,user=false;
  tabs.innerHTML=W.map((w,i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-i="${i}"><b>${w.t}</b><span>${w.tool}</span></button>`).join('');
  function load(i){ ++tok; cur=i; const w=W[i]; $$('#wtabs button').forEach((b,k)=>b.setAttribute('aria-selected',k===i));
    st.innerHTML=w.steps.map((s,k)=>`<li><em>${k===w.steps.length-1?'Human':'Step '+(k+1)}</em><span>${s}</span></li>`).join('');
    $('#wtm').style.width='100%'; $('#wtmv').textContent=w.m+' min'; $('#wta').style.width='0%'; $('#wtav').textContent='–'; $('#wtsave').textContent='';
    art.innerHTML='<div class="wait">Press <b>Run this workflow</b> to see the AI-assisted version.</div>'; }
  async function run(){ const my=++tok,w=W[cur],L=$$('#wsteps li'); art.innerHTML='<div class="wait">Working…</div>';
    for(const [k,l] of L.entries()){ L.forEach((x,j)=>x.className=j<k?'done':j===k?'on':''); await sleep(650); if(my!==tok) return; }
    L.forEach(x=>x.className='done'); art.innerHTML=w.art;
    $('#wta').style.width=(w.a/w.m*100)+'%'; $('#wtav').textContent=w.a+' min'; $('#wtsave').innerHTML=`<b>${Math.round((1-w.a/w.m)*100)}% faster</b> per task, with a person still reviewing the result.`; }
  $$('#wtabs button').forEach(b=>b.addEventListener('click',()=>{ user=true; load(+b.dataset.i); run(); }));
  $('#wrun').onclick=()=>{ user=true; run(); };
  load(0);
  onView($('#wf'),async()=>{ await sleep(400); if(user) return; await run(); for(const i of [1,3]){ await sleep(4200); if(user) return; load(i); await run(); } },.3);
})();

/* INTEGRATION */
(()=>{ const N=[['Web form','Candidate applies','form'],['API','Data passed on automatically','api'],['CRM','Candidate record created','crm'],['Egnyte','CV filed in the right folder','egn'],['Slack','Recruiter alerted with an AI summary','slk'],['Microsoft 365','Screening call booked','o365']];
  const B=['Copied from the form email into the CRM','Re-typed into a spreadsheet tracker','Saved and renamed in Egnyte by hand','Recruiter told by email, read the CV themselves','Times agreed over several emails'];
  const f=$('#iflow'); let mode='after',tok=0,user=false;
  function lay(){ f.innerHTML=mode==='after'?N.map((n,i)=>`<div class="ae-in" data-i="${i}"><em>${String(i+1).padStart(2,'0')}</em><b>${n[0]}</b><span>${n[1]}</span></div>`).join('<i class="ae-ar" aria-hidden="true">→</i>')
      :`<div class="ae-before">${B.map((b,i)=>`<div class="ae-bi" data-i="${i}"><em>Manual ${i+1}</em><span>${b}</span></div>`).join('')}</div>`;
    $('#ire').textContent='0'; $('#isys').textContent='0'; $('#ilog').textContent='Ready'; }
  async function run(){ const my=++tok; lay(); if(mode==='after'){ const I=$$('#iflow .ae-in'); for(const [k,e] of I.entries()){ e.classList.add('on'); $('#isys').textContent=Math.max(0,k-1); $('#ilog').textContent=N[k][1]; await sleep(700); if(my!==tok) return; e.classList.remove('on'); e.classList.add('done'); } $('#isys').textContent=4; $('#ilog').textContent='Done in seconds'; }
    else { const I=$$('#iflow .ae-bi'); let r=0; for(const e of I){ e.classList.add('on'); r+=e.dataset.i<3?1:0; $('#ire').textContent=r; $('#isys').textContent=+e.dataset.i+1; $('#ilog').textContent='Waiting on a person…'; await sleep(900); if(my!==tok) return; e.classList.remove('on'); e.classList.add('done'); } $('#ire').textContent=3; $('#ilog').textContent='Hours later'; } }
  segBind($('#intx'),'data-i',v=>{ user=true; mode=v; run(); });
  $('#irun').onclick=()=>{ user=true; run(); };
  lay();
  onView($('#intx'),async()=>{ await sleep(400); if(user) return; await run(); },.3);
})();

/* SCREENING */
(()=>{ const CR=['Financial modelling','Power BI or Tableau','5+ years FP&A','CPA/CFA (nice to have)'];
  $('#scrit').innerHTML=CR.map(c=>`<i>${c}</i>`).join('');
  const C=[['Jordan Ellis','7 yrs FP&A · logistics',[1,1,1,0],'Strong modelling and reporting lead; no certification yet.','Shortlist'],
    ['Amira Haddad','9 yrs FP&A · retail',[1,1,1,1],'Meets every criterion, including CFA Level II.','Shortlist'],
    ['Leo Fischer','3 yrs accounting · audit',[0,0,0,1],'Audit background; little modelling or FP&A experience.','Not a fit'],
    ['Nina Okoro','6 yrs FP&A · SaaS',[1,1,1,0],'SaaS metrics experience (MRR, churn); Tableau not Power BI.','Shortlist'],
    ['Tom Bauer','5 yrs analyst · banking',[1,0,1,0],'Good modelling; no BI tooling listed. Worth a call to check.','Review'],
    ['Sara Lind','2 yrs graduate scheme',[0,1,0,0],'Early-career; consider for a junior role instead.','Not a fit']];
  const cl=$('#scands'),det=$('#sdet'); let tok=0,user=false,done=false;
  const score=c=>Math.round((c[2][0]*3+c[2][1]*2+c[2][2]*3+c[2][3])/9*100);
  const tag=v=>v==='Shortlist'?'ok':v==='Review'?'rv2':'no';
  cl.innerHTML=C.map((c,i)=>`<button type="button" class="ae-cd" data-i="${i}"><span class="av">${c[0].split(' ').map(x=>x[0]).join('')}</span><span class="nm"><b>${c[0]}</b><small>${c[1]}</small></span><span class="sc"><i></i><em>–</em></span><span class="ae-chip v">Not screened</span></button>`).join('');
  const D=$$('#scands .ae-cd');
  function show(i){ D.forEach((d,k)=>d.classList.toggle('sel',k===i)); const c=C[i]; det.innerHTML=`<div class="dh"><b>${c[0]}</b><span>${c[1]} · match ${score(c)}%</span></div><ul>${CR.map((r,k)=>`<li class="${c[2][k]?'y':'n'}">${c[2][k]?'✓':'✗'} ${r}</li>`).join('')}</ul><p>${c[3]}</p><div class="ae-dec"><span class="ae-chip ${tag(c[4])}">AI suggests: ${c[4]}</span><span class="ae-chip h">Recruiter decides</span></div>`; }
  function mark(d,c){ d.classList.add('done'); d.querySelector('.sc i').style.width=score(c)+'%'; d.querySelector('.sc em').textContent=score(c)+'%'; const v=d.querySelector('.v'); v.className='ae-chip v '+tag(c[4]); v.textContent=c[4]; }
  async function run(){ const my=++tok; done=false; D.forEach(d=>{ d.className='ae-cd'; d.querySelector('.sc i').style.width='0'; d.querySelector('.sc em').textContent='–'; const v=d.querySelector('.v'); v.className='ae-chip v'; v.textContent='Not screened'; });
    det.innerHTML='<div class="wait">Reading profiles and checking them against the role…</div>'; $('#sttf').style.width='100%'; $('#sttfv').textContent='100%';
    for(const [i,d] of D.entries()){ d.classList.add('rd'); await sleep(550); if(my!==tok) return; d.classList.remove('rd'); mark(d,C[i]); }
    done=true; const sl=C.filter(c=>c[4]==='Shortlist').length; det.innerHTML=`<div class="wait"><b>${sl} shortlisted, 1 to review, 2 not a fit.</b> Click any candidate to see why.</div>`; $('#sttf').style.width='20%'; $('#sttfv').textContent='20%'; await sleep(900); if(my!==tok) return; show(1); }
  D.forEach((d,i)=>d.addEventListener('click',()=>{ user=true; if(!done){ ++tok; D.forEach((x,k)=>{ x.classList.remove('rd'); mark(x,C[k]); }); done=true; $('#sttf').style.width='20%'; $('#sttfv').textContent='20%'; } show(i); if(matchMedia('(max-width:900px)').matches) det.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'}); }));
  $('#srun').onclick=()=>{ user=true; run(); };
  det.innerHTML='<div class="wait">Press <b>Screen 6 applicants</b>. Each profile is read and checked against the role\'s criteria.</div>';
  onView($('#scr'),async()=>{ await sleep(500); if(user) return; await run(); for(const i of [4,2]){ await sleep(3800); if(user) return; show(i); } },.3);
})();

/* PARTNER */
(()=>{ const S=['Gather','Translate','Prioritise','Coordinate','Deploy'];
  $('#pst').innerHTML=S.map((s,i)=>`<div class="ae-ps"><em>${String(i+1).padStart(2,'0')}</em><b>${s}</b></div>`).join('');
  const R=[{team:'Recruitment team',who:'Head of Recruitment',ask:'"Can the AI tell us which past candidates fit a new role, so we stop starting every search from zero?"',
     spec:[['Use case','Match new roles against the existing candidate database'],['Inputs','Role brief; candidate profiles from the CRM and Egnyte'],['Output','Ranked list with reasons, inside the recruiter\'s workspace'],['Systems','CRM API, Egnyte, Slack'],['Success','Shortlist time cut; recruiter accepts most suggestions'],['Priority','High · revenue impact via faster placements']],slot:'Sprint 1'},
    {team:'Client services',who:'Client Services Lead',ask:'"We need clients to get a weekly progress update without us building it by hand every Friday."',
     spec:[['Use case','Automated weekly client progress summary'],['Inputs','Role pipeline status from the CRM'],['Output','Draft update per client for account manager review'],['Systems','CRM API, Outlook'],['Success','Updates sent every week with under 10 min of review'],['Priority','Medium · client experience']],slot:'Sprint 2'},
    {team:'Operations',who:'Operations Manager',ask:'"New leads from the website keep getting lost between the form and the CRM."',
     spec:[['Use case','Web-form leads created in the CRM automatically'],['Inputs','Website enquiry form'],['Output','CRM lead with owner assigned and Slack alert'],['Systems','Form webhook, CRM API, Slack'],['Success','No manual re-entry; no lost leads'],['Priority','High · quick win']],slot:'Sprint 1'}];
  let cur=0,tok=0,user=false; const P=$$('#pst .ae-ps');
  const stg=i=>P.forEach((p,k)=>p.className='ae-ps'+(k<i?' done':k===i?' on':''));
  function load(){ ++tok; const r=R[cur]; $('#pask').innerHTML=`<small>${r.team} · ${r.who}</small><p>${r.ask}</p>`; $('#pspec').innerHTML='<div class="wait">The structured technical request for the platform partner appears here.</div>'; stg(-1); }
  async function run(){ const my=++tok,r=R[cur]; $('#pspec').innerHTML=`<div class="sh"><b>Technical request · ${r.team}</b><span class="ae-chip">for the platform partner</span></div><dl id="pdl"></dl>`; const dl=$('#pdl');
    stg(0); await sleep(700); if(my!==tok) return; stg(1);
    for(const [k,v] of r.spec){ dl.insertAdjacentHTML('beforeend',`<dt>${k}</dt><dd>${esc(v)}</dd>`); await sleep(380); if(my!==tok) return; }
    stg(2); await sleep(700); if(my!==tok) return; stg(3); $('#pspec').insertAdjacentHTML('beforeend',`<div class="pf"><span>Timeline agreed with partner: <b>${r.slot}</b></span></div>`); await sleep(700); if(my!==tok) return;
    stg(4); await sleep(600); if(my!==tok) return; stg(5); $('#pspec').querySelector('.pf').insertAdjacentHTML('beforeend','<span class="ae-chip ok">Deployed alongside existing systems</span>'); }
  $('#prun').onclick=()=>{ user=true; run(); };
  $('#pnext').onclick=()=>{ user=true; cur=(cur+1)%R.length; load(); run(); };
  load();
  onView($('#ptx'),async()=>{ await sleep(400); if(user) return; await run(); await sleep(4500); if(user) return; cur=2; load(); await run(); },.3);
})();

/* RESULTS */
(()=>{ const BA=[['Everyone prompting their own way','Shared templates and trained teams'],['AI in a separate window','AI inside Slack, Microsoft 365 and Egnyte'],['Repetitive admin done by hand','AI-assisted workflows, human-reviewed'],['Data re-typed between systems','API integrations across forms, CRM and tools'],['Screening every CV manually','AI-assisted early-stage assessment'],['Internal asks lost with the AI partner','Structured requests, clear priorities']];
  $('#ba').innerHTML='<span class="lbl">Before and after</span>'+BA.map(b=>`<div><span class="b">${b[0]}</span><i>→</i><span class="a">${b[1]}</span></div>`).join('');
  onView($('#ba'),()=>$('#ba').classList.add('in'),.25);
  const DF=[['Training tied to real work','Organisation-wide sessions built on the firm\'s own workflows.'],['Lightweight automation','Small automations that remove repetitive tasks fast.'],['Integrated, not added','AI inside the systems teams already use.'],['Cross-functional','Recruitment, client services and operations moving together.'],['Measured','Productivity and revenue impact tracked, not assumed.']];
  $('#diff').innerHTML=DF.map((d,i)=>`<div><em>${String(i+1).padStart(2,'0')}</em><b>${d[0]}</b><span>${d[1]}</span></div>`).join('');
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to,suf=b.dataset.suf||'',pre=b.dataset.pre||''; if(RM) return; onView(b,async()=>{ for(let i=0;i<=20;i++){ b.textContent=pre+Math.round(to*i/20)+suf; await sleep(30); } },.5); });
})();
