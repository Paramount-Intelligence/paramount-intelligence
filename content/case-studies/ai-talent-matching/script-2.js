__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
const onView=(el,fn,th=.3)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const segBind=(root,attr,cb)=>{ const B=[...root.querySelectorAll('button['+attr+']')]; B.forEach(b=>b.addEventListener('click',()=>{ B.forEach(x=>x.setAttribute('aria-pressed',x===b)); cb(b.getAttribute(attr),true); })); return v=>{ B.forEach(x=>x.setAttribute('aria-pressed',x.getAttribute(attr)===v)); }; };
const ini=n=>n.split(' ').map(x=>x[0]).join('').slice(0,2);
const toDet=el=>{ if(matchMedia('(max-width:900px)').matches) el.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'}); };

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.08});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* HERO */
(()=>{ const NM=['Elena Marquez','Kwame Asante','Haruto Sato','Sofia Lind','Marco Bianchi','Aisha Rahman','David Cohen','Lena Vogel','Priya Nair','Omar Farouk','Grace Liu','Tom Wells','Nadia Petrov','Luis Ortega','Mei Chen','Sam Okafor'];
  const B=[['S/4HANA finance transformation','6 months · EU hours',[0,1,5]],['GCC market-entry strategy','8 weeks · remote',[9,12,4]],['Snowflake + dbt data rebuild','3 days a week · US Eastern',[14,8,13]]];
  const pool=$('#hpool'),sh=$('#hshort'),br=$('#hbrief');
  pool.innerHTML=NM.map(n=>`<span class="tm-t"><i>${ini(n)}</i></span>`).join('');
  const T=[...pool.children];
  const show=(b,top)=>{ br.innerHTML=`<small>New project brief</small><b>${b[0]}</b><span>${b[1]}</span>`; sh.innerHTML=`<small>Ranked shortlist · for staffing review</small>`+top.map((i,k)=>`<div class="tm-hr" style="animation-delay:${k*.15}s"><em>#${k+1}</em><b>${NM[i]}</b><span>${[94,89,85][k]}% fit</span></div>`).join(''); };
  if(RM){ T.forEach((t,i)=>t.classList.toggle('top',B[0][2].includes(i))); show(B[0],B[0][2]); return; }
  (async()=>{ for(let k=0;;k=(k+1)%B.length){ const b=B[k]; br.innerHTML=`<small>New project brief</small><b>${b[0]}</b><span>${b[1]}</span>`; sh.innerHTML='<small>Ranked shortlist · for staffing review</small><div class="tm-hw">Agent reading every profile…</div>'; T.forEach(t=>t.className='tm-t');
      await sleep(700); for(const [i,t] of T.entries()){ t.classList.add('sc'); await sleep(110); t.classList.remove('sc'); t.classList.add(b[2].includes(i)?'top':'lo'); }
      await sleep(300); show(b,b[2]); await sleep(4200); } })();
})();

/* PROBLEM: keyword vs semantic */
(()=>{ const P=[['Priya Nair','Built ARR and churn projection models for three subscription software companies.',[],94,'ARR and churn projections are revenue forecasting; subscription software is SaaS.'],
  ['Tom Wells','Weather forecasting data scientist at a meteorology institute.',['forecasting'],12,'Forecasting weather, not revenue; no business finance.'],
  ['Lucía Romero','FP&A lead: revenue planning and bookings forecasts for a B2B cloud platform.',['revenue','forecasts'],91,'Revenue planning for a cloud (SaaS) platform.'],
  ['Ben Kaur','Sales lead at a SaaS start-up, owning quota planning.',['SaaS'],46,'SaaS context, but sales planning rather than finance.'],
  ['Omar Farouk','Head of financial planning, subscription media business: MRR models and pricing scenarios.',[],88,'MRR models are recurring-revenue forecasts; subscription model matches.'],
  ['Grace Liu','Demand forecasting for a retail supply chain.',['forecasting'],38,'Forecasting skills, but inventory demand, not revenue.']];
  const res=$('#kres'),sum=$('#ksum'); let mode='kw',user=false;
  const mk=(t,w)=>{ let s=esc(t); w.forEach(x=>{ s=s.replace(new RegExp('('+x+')','i'),'<mark>$1</mark>'); }); return s; };
  function draw(){ let L;
    if(mode==='kw'){ L=P.map((p,i)=>[p,i,p[2].length]).sort((a,b)=>b[2]-a[2]);
      res.innerHTML=L.map(([p,i,k],r)=>`<div class="tm-kr ${k?'':'miss'} ${k&&p[3]<50?'bad':''}" style="animation-delay:${r*.06}s"><span class="av">${ini(p[0])}</span><div><b>${p[0]}</b><p>${mk(p[1],p[2])}</p></div><span class="tg">${k?k+' keyword'+(k>1?'s':''):'Not found'}</span></div>`).join('');
      sum.innerHTML='<b>4 results, ranked by matching words.</b> Three are poor fits (weather, retail and sales planning), and the two strongest consultants never appear, because their profiles say "ARR" and "MRR", not "revenue forecasting".'; }
    else { L=P.map((p,i)=>[p,i]).sort((a,b)=>b[0][3]-a[0][3]);
      res.innerHTML=L.map(([p],r)=>`<div class="tm-kr ${p[3]>80?'good':p[3]<50?'lo':''}" style="animation-delay:${r*.06}s"><span class="av">${ini(p[0])}</span><div><b>${p[0]}</b><p>${esc(p[1])}</p><small>${esc(p[4])}</small></div><span class="tg">${p[3]}% fit</span></div>`).join('');
      sum.innerHTML='<b>Ranked by meaning.</b> The top three are all genuine revenue-forecasting experts in subscription businesses, including the two that keyword search missed.'; } }
  const setK=segBind($('#kw'),'data-k',(v,u)=>{ if(u) user=true; mode=v; draw(); });
  draw();
  onView($('#kw'),async()=>{ await sleep(3800); if(user) return; mode='sem'; setK('sem'); draw(); },.35);
})();

/* BRIEF PARSING */
(()=>{ const B=[{t:'ERP transformation',txt:`We're kicking off our <m id="b1">S/4HANA finance migration</m> in <m id="b2">early March</m> and need <m id="b3">someone senior</m> to <m id="b4">own the finance workstream</m>, ideally someone who has <m id="b5">done this before in a manufacturing setting</m>. <m id="b6">Six-month engagement</m>; our team is in <m id="b7">Frankfurt, so EU hours matter</m>. <m id="b8">Change management experience</m> would be a bonus. <m id="b9">German is a plus</m> but not required.`,
    f:[['Role','Finance workstream lead','b4'],['Must have','SAP S/4HANA Finance · ERP migration','b1'],['Seniority','Senior · has led a similar rollout','b3'],['Industry','Manufacturing (preferred)','b5'],['Start','Early March','b2'],['Duration','6 months','b6'],['Location','EU time zones · Frankfurt team','b7'],['Nice to have','Change management · German','b8']]},
   {t:'Market entry',txt:`Client wants to know whether to <m id="c1">enter the Saudi market</m> for their <m id="c2">B2B payments product</m>. Need a <m id="c3">strategy consultant</m> who knows <m id="c4">GCC fintech regulation</m>, can do a <m id="c5">TAM/SAM/SOM</m> and <m id="c6">present to the board</m> in <m id="c7">8 weeks</m>. <m id="c8">Arabic would really help</m>. <m id="c9">Remote is fine</m>.`,
    f:[['Role','Market-entry strategy consultant','c3'],['Must have','GCC fintech regulation · market sizing (TAM/SAM/SOM)','c4'],['Context','Saudi Arabia · B2B payments','c1'],['Seniority','Board-level communication','c6'],['Duration','8 weeks','c7'],['Location','Remote','c9'],['Nice to have','Arabic','c8']]},
   {t:'Data engineering',txt:`Looking for a <m id="d1">hands-on data engineer</m> to rebuild our reporting pipelines in <m id="d2">Snowflake + dbt</m> and get <m id="d3">Power BI dashboards</m> out to ops <m id="d4">by Q3</m>. <m id="d5">Mid-level is fine</m>. <m id="d6">Healthcare data experience (HIPAA) needed</m>. <m id="d7">3 days a week</m>, <m id="d8">US Eastern</m>.`,
    f:[['Role','Data engineer (hands-on)','d1'],['Must have','Snowflake · dbt · healthcare data (HIPAA)','d2'],['Also needed','Power BI dashboards','d3'],['Seniority','Mid-level','d5'],['Deadline','Q3','d4'],['Capacity','3 days a week','d7'],['Location','US Eastern time','d8']]}];
  const tabs=$('#btabs'),doc=$('#bdoc'),out=$('#bout'); let cur=0,tok=0,user=false;
  tabs.innerHTML=B.map((b,i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-i="${i}">${b.t}</button>`).join('');
  const bindF=()=>$$('#bout tr[data-m]').forEach(tr=>tr.addEventListener('click',()=>{ user=true; pick(tr); }));
  const pick=tr=>{ $$('#bdoc mark').forEach(x=>x.classList.remove('focus')); $$('#bout tr').forEach(x=>x.classList.remove('sel')); tr.classList.add('sel'); const t=$('#'+tr.dataset.m); if(t){ t.classList.add('on','focus'); } };
  function load(i){ ++tok; cur=i; $$('#btabs button').forEach((b,k)=>b.setAttribute('aria-selected',k===i)); doc.innerHTML=`<small>Free-text brief · as received</small><p>${B[i].txt.replace(/<m /g,'<mark ').replace(/<\/m>/g,'</mark>')}</p>`; out.innerHTML='<div class="wait">Press <b>Parse this brief</b> to turn it into a structured requirement.</div>'; }
  async function run(){ const my=++tok,b=B[cur]; out.innerHTML=`<div class="tm-req"><div class="rh"><b>Structured requirement</b><span class="ae-chip h">Role-parsing agent</span></div><table id="btb"></table></div>`; const tb=$('#btb');
    for(const f of b.f){ const m=$('#'+f[2]); if(m) m.classList.add('on'); tb.insertAdjacentHTML('beforeend',`<tr data-m="${f[2]}"><td>${f[0]}</td><td>${esc(f[1])}</td></tr>`); await sleep(330); if(my!==tok) return; }
    out.querySelector('.tm-req').insertAdjacentHTML('beforeend','<div class="tm-rf">✓ Ready for matching · click a field to see its source</div>'); bindF(); }
  $$('#btabs button').forEach(b=>b.addEventListener('click',()=>{ user=true; load(+b.dataset.i); run(); }));
  $('#brun').onclick=()=>{ user=true; run(); };
  load(0);
  onView($('#br'),async()=>{ await sleep(400); if(user) return; await run(); for(const tr of $$('#bout tr[data-m]').slice(0,4)){ await sleep(1100); if(user) return; pick(tr); } },.3);
})();

/* PROFILE INTERPRETATION */
(()=>{ const P=[{n:'Elena Marquez',h:'Finance transformation lead · Madrid',raw:`Finance transformation lead with 14 yrs experience. <m>Ran S4 Finance go-lives</m> for 3 retailers; <m>owned R2R and month-end close redesign</m>. <m>PowerBI reporting</m> for CFO office. <m>Led change & training for 400 finance users</m>. Spanish, English, <m>basic German</m>.`,
    map:[['"Ran S4 Finance go-lives"','SAP S/4HANA Finance','Expert · 3 rollouts'],['"owned R2R and month-end close redesign"','Record-to-report process design','Expert'],['"PowerBI reporting"','Power BI','Advanced'],['"Led change & training for 400 finance users"','Change management','Advanced'],['"basic German"','German','Basic']],
    meta:[['Experience','14 years'],['Industries','Retail, consumer goods'],['Availability','From 4 weeks · 100%'],['Time zone','CET']]},
   {n:'Kwame Asante',h:'ERP programme manager · London',raw:`<m>PMO lead on SAP S/4 FI/CO migrations</m> (2 programmes, 120+ people). <m>Manufacturing and automotive clients</m>. <m>Prince2 / agile delivery</m>. <m>Stakeholder mgmt up to CFO</m>. Available immediately.`,
    map:[['"PMO lead on SAP S/4 FI/CO migrations"','SAP S/4HANA Finance · programme management','Expert · 2 programmes'],['"Manufacturing and automotive clients"','Industry: manufacturing','Strong'],['"Prince2 / agile delivery"','Delivery methods','Advanced'],['"Stakeholder mgmt up to CFO"','Executive stakeholder management','Expert']],
    meta:[['Experience','16 years'],['Industries','Manufacturing, automotive'],['Availability','Now · 100%'],['Time zone','GMT']]},
   {n:'Haruto Sato',h:'SAP FICO solution architect · Tokyo',raw:`<m>SAP FICO architect</m>, <m>ECC→S/4 conversions</m> in electronics manufacturing. <m>Designs GL, AP/AR, asset accounting</m>. <m>Fluent Japanese, professional English</m>. <m>Next free: June</m>.`,
    map:[['"SAP FICO architect"','SAP S/4HANA Finance · architecture','Expert'],['"ECC→S/4 conversions"','ERP migration','Expert'],['"Designs GL, AP/AR, asset accounting"','Finance process design','Advanced'],['"Fluent Japanese, professional English"','Japanese, English','Fluent'],['"Next free: June"','Availability','In about 10 weeks']],
    meta:[['Experience','12 years'],['Industries','Electronics manufacturing'],['Availability','About 10 weeks'],['Time zone','JST · outside EU hours']]}];
  let cur=0,tok=0,user=false; const raw=$('#praw'),map=$('#pmap');
  function load(){ ++tok; const p=P[cur]; raw.innerHTML=`<div class="rh"><b>${p.n}</b><span>${p.h} · CV as written</span></div><p>${p.raw.replace(/<m>/g,'<mark>').replace(/<\/m>/g,'</mark>')}</p>`; map.innerHTML='<div class="wait">Press <b>Interpret profile</b> to build the comparable profile.</div>'; }
  async function run(){ const my=++tok,p=P[cur],M=$$('#praw mark'); map.innerHTML='<div class="tm-norm" id="pn"><small>Raw phrase → standard skill</small></div>'; const pn=$('#pn');
    for(const [k,m] of p.map.entries()){ M[k]&&M[k].classList.add('on'); pn.insertAdjacentHTML('beforeend',`<div class="tm-nl"><span>${esc(m[0])}</span><i>→</i><b>${esc(m[1])}</b><em>${esc(m[2])}</em></div>`); await sleep(500); if(my!==tok) return; }
    map.insertAdjacentHTML('beforeend',`<div class="tm-pcard"><div class="rh"><b>Comparable profile · ${p.n}</b><span class="ae-chip h">Profile agent</span></div><dl>${p.meta.map(m=>`<dt>${m[0]}</dt><dd>${m[1]}</dd>`).join('')}</dl></div>`); }
  segBind($('#pfx'),'data-p',v=>{ user=true; cur=+v; load(); run(); });
  $('#prun').onclick=()=>{ user=true; run(); };
  load();
  onView($('#pfx'),async()=>{ await sleep(400); if(user) return; await run(); await sleep(4000); if(user) return; cur=2; $$('#pfx .seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.p==='2')); load(); await run(); },.3);
})();

/* SCORING */
const CS=[
 ['Elena Marquez','Finance transformation lead',{sk:92,ex:88,in:62,av:65},{sk:'Led 3 SAP S/4HANA finance rollouts; redesigned record-to-report.',ex:'14 years; two programmes of similar size.',in:'Retail and consumer goods, not manufacturing.',av:'Free in 4 weeks; CET, inside EU hours.'}],
 ['Kwame Asante','ERP programme manager',{sk:80,ex:92,in:90,av:100},{sk:'PMO lead on two S/4HANA finance migrations; less hands-on design.',ex:'16 years; programmes of 120+ people.',in:'Manufacturing and automotive clients.',av:'Available now; GMT.'}],
 ['Haruto Sato','SAP FICO solution architect',{sk:96,ex:84,in:88,av:25},{sk:'Architect on ECC to S/4HANA finance conversions.',ex:'12 years in SAP finance.',in:'Electronics manufacturing.',av:'Free in about 10 weeks; JST, outside EU hours.'}],
 ['Aisha Rahman','S/4HANA finance consultant',{sk:86,ex:68,in:58,av:90},{sk:'Hands-on S/4HANA finance configuration.',ex:'7 years; one full rollout.',in:'Telecoms and media.',av:'Free in 1 week; CET.'}],
 ['Sofia Lind','Finance process consultant',{sk:68,ex:66,in:80,av:100},{sk:'Finance process design; ERP-agnostic.',ex:'9 years.',in:'Industrial manufacturing.',av:'Available now; CET.'}],
 ['Marco Bianchi','Change management lead',{sk:50,ex:86,in:74,av:90},{sk:'Change and training lead; not an SAP specialist.',ex:'15 years.',in:'Manufacturing and pharma.',av:'Free in 1 week; CET.'}],
 ['David Cohen','Oracle ERP consultant',{sk:40,ex:82,in:85,av:85},{sk:'Oracle ERP finance, not SAP S/4HANA.',ex:'13 years.',in:'Manufacturing.',av:'Free in 2 weeks; GMT.'}],
 ['Lena Vogel','Interim finance controller',{sk:55,ex:72,in:92,av:70},{sk:'Controller who has been a key user on an S/4HANA project.',ex:'11 years.',in:'German manufacturing; German native.',av:'Free in 3 weeks; CET.'}]];
(()=>{ const K=[['sk','Skills fit'],['ex','Experience'],['in','Industry'],['av','Availability']],D={sk:40,ex:25,in:15,av:20};
  let W={...D},sel=1,user=false,dec={}; const rank=$('#srank'),why=$('#swhy');
  $('#sw').innerHTML='<small>What matters for this project</small>'+K.map(([k,l])=>`<label class="tm-wl"><span>${l} <b id="w-${k}">${W[k]}</b></span><input type="range" min="0" max="50" step="5" value="${W[k]}" data-k="${k}" aria-label="${l} weight"></label>`).join('')+'<p class="tm-wn">Weights are relative; the score is the weighted average of the four criteria.</p>';
  rank.innerHTML=CS.map((c,i)=>`<button type="button" class="tm-rr" data-i="${i}"><em></em><span class="av">${ini(c[0])}</span><span class="nm"><b>${c[0]}</b><small>${c[1]}</small></span><span class="bar"><i></i></span><strong></strong></button>`).join('');
  const R=$$('#srank .tm-rr');
  const score=c=>{ const t=Object.values(W).reduce((a,b)=>a+b,0)||1; return Math.round(K.reduce((a,[k])=>a+c[2][k]*W[k],0)/t); };
  function draw(){ const S=CS.map((c,i)=>[score(c),i]).sort((a,b)=>b[0]-a[0]); const h=R[0].offsetHeight+6;
    rank.style.height=(h*R.length)+'px';
    S.forEach(([s,i],r)=>{ const e=R[i]; e.style.transform=`translateY(${r*h}px)`; e.querySelector('em').textContent='#'+(r+1); e.querySelector('strong').textContent=s+'%'; e.querySelector('.bar i').style.width=s+'%'; e.classList.toggle('top',r<3); e.classList.toggle('sel',i===sel); e.dataset.d=dec[i]||''; });
    showWhy(); }
  function showWhy(){ const c=CS[sel],s=score(c),r=CS.map((x,i)=>[score(x),i]).sort((a,b)=>b[0]-a[0]).findIndex(x=>x[1]===sel)+1;
    why.innerHTML=`<div class="wh"><b>${c[0]}</b><span>${c[1]} · rank #${r} · ${s}% fit</span></div>${K.map(([k,l])=>`<div class="tm-cr"><div><span>${l}</span><b>${c[2][k]}</b></div><i><s style="width:${c[2][k]}%"></s></i><p>${esc(c[3][k])}</p></div>`).join('')}
      <div class="tm-dec"><small>Staffing team decision</small><div><button type="button" class="se-btn ${dec[sel]==='y'?'pri':''}" data-d="y">✓ Add to shortlist</button><button type="button" class="se-btn ${dec[sel]==='n'?'pri':''}" data-d="n">✗ Not this time</button></div><span>${dec[sel]==='y'?'Added by the staffing team. The AI only recommended.':dec[sel]==='n'?'Removed by the staffing team, with the reason logged.':'The agent recommends; a person decides.'}</span></div>`;
    $$('#swhy .tm-dec button').forEach(b=>b.addEventListener('click',()=>{ user=true; dec[sel]=dec[sel]===b.dataset.d?'':b.dataset.d; draw(); })); }
  $$('#sw input').forEach(inp=>inp.addEventListener('input',()=>{ user=true; W[inp.dataset.k]=+inp.value; $('#w-'+inp.dataset.k).textContent=inp.value; draw(); }));
  R.forEach(e=>e.addEventListener('click',()=>{ user=true; sel=+e.dataset.i; draw(); toDet(why); }));
  $('#sreset').onclick=()=>{ user=true; W={...D}; $$('#sw input').forEach(i=>{ i.value=W[i.dataset.k]; $('#w-'+i.dataset.k).textContent=W[i.dataset.k]; }); draw(); };
  draw(); addEventListener('resize',draw);
  const setW=(k,v)=>{ W[k]=v; const i=$(`#sw input[data-k="${k}"]`); i.value=v; $('#w-'+k).textContent=v; draw(); };
  onView($('#sc'),async()=>{ await sleep(2600); if(user) return; setW('av',0); sel=2; draw(); await sleep(2800); if(user) return; setW('av',45); sel=1; draw(); await sleep(2800); if(user) return; setW('av',20); sel=0; draw(); },.3);
})();

/* REVIEW: consistency */
(()=>{ const T=['Staffing team North','Staffing team Central','Staffing team South'];
  const BF=[[['Marco Bianchi','worked with him last year'],['Sofia Lind','available now'],['Kwame Asante','top of the search']],[['David Cohen','"ERP" in his title'],['Lena Vogel','speaks German'],['Elena Marquez','recommended by a colleague']],[['Aisha Rahman','first SAP result'],['Sofia Lind','available now'],['Marco Bianchi','strong references']]];
  const AF=[['Kwame Asante','89% · manufacturing S/4HANA, available now'],['Elena Marquez','81% · 3 S/4HANA finance rollouts'],['Aisha Rahman','78% · hands-on S/4HANA, free in 1 week']];
  const AD=[['Approved all three','no changes'],['Approved two, swapped in Lena Vogel','reason logged: client asked for a German speaker'],['Approved all three','no changes']];
  let mode='before',user=false; const box=$('#rteams');
  function draw(){ box.innerHTML=T.map((t,i)=>`<div class="tm-team"><div class="th"><b>${t}</b><span>${mode==='before'?'built their own shortlist':'started from the AI ranking'}</span></div><ol>${(mode==='before'?BF[i]:AF.map((a,k)=>i===1&&k===2?['Lena Vogel','added by team · German speaker']:a)).map((c,k)=>`<li style="animation-delay:${(i*3+k)*.06}s"><span class="av">${ini(c[0])}</span><div><b>${c[0]}</b><small>${esc(c[1])}</small></div></li>`).join('')}</ol>${mode==='after'?`<div class="tf"><span class="ae-chip h">Human decision</span> ${AD[i][0]} · ${esc(AD[i][1])}</div>`:''}</div>`).join('');
    $('#rsum').innerHTML=mode==='before'?'<b>Same brief, three different shortlists.</b> Only two consultants appear on more than one list, and every choice rests on a different reason, so outcomes depend on who picked up the brief.':'<b>One explained starting point.</b> Every team reviews the same ranked, reasoned shortlist; they can still change it, and every change is recorded with its reason.'; }
  const setR=segBind($('#rvx'),'data-r',(v,u)=>{ if(u) user=true; mode=v; draw(); });
  draw();
  onView($('#rvx'),async()=>{ await sleep(3600); if(user) return; mode='after'; setR('after'); draw(); },.35);
})();

/* ARCHITECTURE */
(()=>{ const N=[['Project intake','Staffing system','New project requirements arrive through the client\'s existing staffing workflow.',''],['Role-parsing agent','LLM · NLP','Reads the free-text brief and normalises it into a structured requirement: role, skills, seniority, industry, timing, location.','ag'],['Profile agent','LLM · NLP','Interprets consultant CVs, skills, experience and availability into comparable profiles.','ag'],['Scoring engine','Structured matching logic','Scores every consultant on skills, experience, industry and availability together, and ranks them.','ag'],['Explained shortlist','Ranked recommendations','Each recommendation carries its per-criterion scores and the evidence behind them.',''],['Staffing team','Human in the loop','Reviews, adjusts and finalises placements in their usual tools, with decisions recorded.','']];
  $('#aflow').innerHTML=N.map((n,i)=>`<button type="button" class="iv-an ${n[3]}" data-i="${i}"><em>${String(i+1).padStart(2,'0')}</em><b>${n[0]}</b><span>${n[1]}</span></button>`).join('');
  const det=$('#adet'),B=$$('#aflow .iv-an'); let tok=0,user=false;
  const show=i=>{ B.forEach((b,k)=>b.classList.toggle('on',k===i)); det.innerHTML=`<b>${N[i][0]} · ${N[i][1]}.</b> ${N[i][2]}`; };
  det.innerHTML='<b>Integrated with the client\'s enterprise data and staffing systems.</b> Tap a component to see its job.';
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; ++tok; show(+b.dataset.i); }));
  async function trace(){ const my=++tok; for(let i=0;i<N.length;i++){ if(my!==tok) return; show(i); await sleep(1600); } if(my===tok){ B.forEach(b=>b.classList.remove('on')); det.innerHTML='<b>Done.</b> One brief in, an explained, ranked shortlist out, and the staffing team makes the call.'; } }
  $('#atrace').onclick=()=>{ user=true; trace(); };
  onView($('#archx'),()=>{ if(!user) trace(); },.35);
})();

/* CONSTRAINTS */
(()=>{ const C=[['Unstructured text on both sides','Project briefs and CVs are free text, written differently every time.','Parse both into structure','LLM agents turn briefs and profiles into normalised, comparable representations before anything is matched.'],
  ['Skills alone are not a match','A perfect skill fit is no use if the consultant is unavailable or lacks the right experience.','Score everything together','Structured scoring weighs skills, experience and availability in one score, alongside industry.'],
  ['Recommendations must be explainable','Staffing teams will not trust a ranking they cannot question.','Evidence on every score','Each recommendation shows its per-criterion scores and the profile evidence behind them.'],
  ['People keep control','Placement decisions belong to the staffing team, not the model.','Decision support only','The agents recommend; staffing teams review, adjust and finalise every placement inside their existing workflow.']];
  const f=$('#flip'); f.innerHTML=C.map((c,i)=>`<button type="button" class="sy-fc" aria-pressed="false" aria-label="${esc(c[0])}: flip to see the solution"><span class="in"><span class="fa"><small>Challenge ${i+1}</small><b>${c[0]}</b><span class="tx">${c[1]}</span><span class="go">See how we solved it ↻</span></span><span class="ba"><small>How we solved it</small><b>${c[2]}</b><span class="tx">${c[3]}</span><span class="go">↻ Back</span></span></span></button>`).join('');
  const cards=$$('#flip .sy-fc'); let user=false;
  cards.forEach(c=>c.addEventListener('click',()=>{ user=true; const on=!c.classList.contains('on'); c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }));
  $('#flipall').onclick=()=>{ user=true; const on=!cards.every(c=>c.classList.contains('on')); cards.forEach(c=>{ c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }); $('#flipall').textContent=on?'Show the challenges':'Flip all cards'; };
  onView(f,async()=>{ if(RM) return; await sleep(1000); for(const c of cards){ if(user) return; c.classList.add('on'); await sleep(1000); c.classList.remove('on'); await sleep(150); } },.4);
})();

/* RESULTS */
(()=>{ const BA=[['Every profile screened by hand','Agents do the first pass'],['Keyword search on titles','Semantic matching on meaning'],['Shortlist depended on who matched','One explained ranking for every team'],['Slow from intake to shortlist','Faster turnaround on every brief'],['Available talent overlooked','Higher utilisation of the pool'],['Choices hard to explain','Reasons attached to every recommendation']];
  $('#ba').innerHTML='<span class="lbl">Before and after</span>'+BA.map(b=>`<div><span class="b">${b[0]}</span><i>→</i><span class="a">${b[1]}</span></div>`).join('');
  onView($('#ba'),()=>$('#ba').classList.add('in'),.25);
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to,suf=b.dataset.suf||'',pre=b.dataset.pre||''; if(RM) return; onView(b,async()=>{ for(let i=0;i<=20;i++){ b.textContent=pre+Math.round(to*i/20)+suf; await sleep(30); } },.5); });
})();
