__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
const onView=(el,fn,th=.3)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const segBind=(root,attr,cb)=>{ const B=[...root.querySelectorAll('button['+attr+']')]; B.forEach(b=>b.addEventListener('click',()=>{ B.forEach(x=>x.setAttribute('aria-pressed',x===b)); cb(b.getAttribute(attr),true); })); return v=>{ B.forEach(x=>x.setAttribute('aria-pressed',x.getAttribute(attr)===v)); }; };

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.08});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* sample emails (all fictional) */
const MAILS=[
 {k:'intro',tab:'Introduction',tag:'Northbridge Capital',from:'Daniel Reyes &lt;d.reyes@northbridge.example&gt;',subj:'Intro: climate infrastructure allocation',id:'msg-7f3a91',
  body:`<p>Hi Sarah,</p><p>Great to connect at the Lisbon summit. <mark data-k="org" id="a-org">Northbridge Capital</mark> is <mark data-k="top" id="a-top">raising allocation for climate infrastructure in Q3</mark> and we'd like to hear more about your pipeline.</p><p><mark data-k="int" id="a-int">Could we set up a call next Tuesday?</mark></p><p>Best,<br><mark data-k="per" id="a-per">Daniel Reyes</mark>, <mark data-k="per" id="a-ttl">Partner</mark></p>`,
  cls:[['Investor-relevant','pos'],['Introduction','hi'],['Meeting request','hi'],['Signal: warming','pos']],
  recs:[{t:'Interaction',rows:[['Contact','Daniel Reyes','a-per'],['Title','Partner','a-ttl'],['Organisation','Northbridge Capital','a-org'],['Type','Meeting request','a-int'],['Topic','Climate infrastructure · Q3 allocation','a-top'],['Next step','Call proposed for next Tuesday','a-int'],['Engagement','Warming',null]]}],
  val:['Required fields present','Organisation matched to an existing CRM account','No duplicate interaction found','Linked to source email msg-7f3a91']},
 {k:'multi',tab:'Three signals, one email',tag:'Harlow Family Office',from:'Amara Okafor &lt;a.okafor@harlow-fo.example&gt;',subj:'Re: Fund III close and data room access',id:'msg-2c18e4',
  body:`<p>Thanks for the deck. Two things from our side.</p><p>First, <mark data-k="int" id="b-com">we're confirming our commitment to Fund III before the June close</mark>. Second, <mark data-k="per" id="b-new">our analyst Priya Shah</mark> will need <mark data-k="int" id="b-dr">data room access</mark> for the final review.</p><p>Also, <mark data-k="int" id="b-uns">please take me off the monthly newsletter list</mark>.</p><p>Kind regards,<br><mark data-k="per" id="b-per">Amara Okafor</mark>, <mark data-k="org" id="b-org">Harlow Family Office</mark></p>`,
  cls:[['Investor-relevant','pos'],['Commitment','hi'],['Access request','hi'],['Preference change','adm'],['Signal: strong','pos']],
  recs:[{t:'Interaction · commitment',rows:[['Contact','Amara Okafor','b-per'],['Organisation','Harlow Family Office','b-org'],['Type','Commitment confirmed','b-com'],['Fund','Fund III · before June close','b-com'],['Engagement','Strong',null]]},
        {t:'New contact',rows:[['Name','Priya Shah','b-new'],['Role','Analyst','b-new'],['Organisation','Harlow Family Office','b-org'],['Request','Data room access','b-dr']]},
        {t:'Preference update',rows:[['Contact','Amara Okafor','b-per'],['Change','Unsubscribe from monthly newsletter','b-uns']]}],
  val:['Three separate signals, three separate records','New contact created and linked to the organisation','No duplicate interaction found','Every record linked to source email msg-2c18e4']},
 {k:'noise',tab:'Newsletter',tag:'Markets Daily digest',from:'Markets Daily &lt;noreply@marketsdaily.example&gt;',subj:'Your weekly market digest',id:'msg-90bd02',
  body:`<p>This week: rates hold steady, IPO pipeline grows, and five charts on private credit.</p><p>Read the full digest online. You are receiving this because you subscribed.</p><p><mark data-k="int" id="c-uns">Unsubscribe</mark> · Manage preferences</p>`,
  cls:[['Not investor-relevant','neu'],['Automated newsletter','neu']],
  recs:[],val:null},
 {k:'decline',tab:'A polite decline',tag:'Altavista Partners',from:'Tom Becker &lt;t.becker@altavista.example&gt;',subj:'Re: Co-investment opportunity',id:'msg-5e77c0',
  body:`<p>Thanks for sending this over.</p><p><mark data-k="int" id="d-dec">We'll pass on this one</mark>: <mark data-k="top" id="d-why">our allocation for the year is fully deployed</mark>. <mark data-k="int" id="d-fu">Happy to revisit in Q1</mark>.</p><p>Best,<br><mark data-k="per" id="d-per">Tom Becker</mark>, <mark data-k="org" id="d-org">Altavista Partners</mark></p>`,
  cls:[['Investor-relevant','pos'],['Decline','neg'],['Follow-up date','hi'],['Signal: cooling','neg']],
  recs:[{t:'Interaction',rows:[['Contact','Tom Becker','d-per'],['Organisation','Altavista Partners','d-org'],['Type','Declined co-investment','d-dec'],['Reason','Annual allocation fully deployed','d-why'],['Follow up','Q1','d-fu'],['Engagement','Cooling',null]]}],
  val:['Required fields present','Organisation matched to an existing CRM account','Follow-up date captured for the relationship owner','Linked to source email msg-5e77c0']}];
const recHTML=(r,i,id)=>`<div class="iv-rec" style="animation-delay:${i*.12}s"><div class="rh"><b>${r.t}</b><span class="iv-chip hi">CRM-ready</span></div><table>${r.rows.map(x=>`<tr ${x[2]?`data-src="${x[2]}"`:''}><td>${x[0]}</td><td>${esc(x[1])}</td></tr>`).join('')}<tr><td>Source</td><td class="src">${id} ↗</td></tr></table></div>`;
const MLEG='<div class="ml"><span><i style="background:#c9ecdc"></i>person</span><span><i style="background:#e5ecff"></i>organisation</span><span><i style="background:#fff3d6"></i>intent</span><span><i style="background:#dff3ea"></i>topic</span></div>';
const mailHTML=m=>`<div class="mh"><b>${m.subj}</b><span>From ${m.from} · ${m.id}</span></div><div class="mb">${m.body.replace(/<mark data-k="(\w+)"/g,'<mark class="k-$1" data-k="$1"')}</div>${MLEG}`;

/* HERO */
(()=>{ const cv=$('#hcv'),hx=$('#hx'),ctx=cv.getContext('2d'); let W,H,pts=[];
  const size=()=>{ const r=hx.getBoundingClientRect(); W=cv.width=r.width; H=cv.height=r.height; pts=[...Array(420)].map(()=>({x:Math.random()*W,o:Math.random()*6.28,s:.3+Math.random()*.9,r:Math.random()*40-20})); };
  size(); addEventListener('resize',size);
  let t=0; const draw=()=>{ ctx.clearRect(0,0,W,H); for(const p of pts){ const y=H*.55+Math.sin(p.x/W*5+t+p.o*.15)*H*.22+p.r+Math.sin(p.o+t*2)*6; ctx.fillStyle=`rgba(95,196,158,${.12+p.s*.25})`; ctx.fillRect(p.x,y,1.4,1.4); p.x+=p.s*.4; if(p.x>W) p.x=0; } t+=.006; if(!RM) requestAnimationFrame(draw); }; draw();
  const S=[['Daniel Reyes','Intro: climate allocation','Meeting request','Northbridge Capital'],['Amara Okafor','Re: Fund III close','Commitment','Harlow Family Office'],['Markets Daily','Your weekly digest',null],['Tom Becker','Re: Co-investment','Declined · revisit Q1','Altavista Partners'],['Lena Fischer','Data room question','Due diligence','Ostwind Ventures'],['Raj Mehta','Coffee in London?','Meeting request','Kestrel LP']];
  const inb=$('#hin'),out=$('#hout'),ct=$('#hct'); let n=0,sk=0;
  const count=()=>{ ct.textContent=`${n} records written · ${sk} skipped · 0 retyped`; };
  if(RM){ out.innerHTML=S.filter(s=>s[2]).slice(0,4).map(s=>`<div class="iv-hr"><div class="t"><b>${s[0]}</b><span class="iv-chip hi">CRM</span></div><span>${s[3]} · ${s[2]}</span></div>`).join(''); n=5; sk=1; count(); return; }
  (async()=>{ for(;;){ inb.innerHTML=S.map(s=>`<div class="iv-hm"><b>${s[0]}</b><span>${s[1]}</span></div>`).join(''); out.innerHTML=''; n=0; sk=0; count(); await sleep(1200);
      for(const [i,s] of S.entries()){ const m=inb.children[i]; m.classList.add('go'); await sleep(450); m.style.display='none';
        if(s[2]){ out.insertAdjacentHTML('afterbegin',`<div class="iv-hr"><div class="t"><b>${s[0]}</b><span class="iv-chip hi">CRM</span></div><span>${s[3]} · ${s[2]}</span></div>`); if(out.children.length>5) out.lastChild.remove(); n++; } else sk++;
        count(); await sleep(600); }
      await sleep(3200); } })();
})();

/* PROBLEM */
(()=>{ const r=$('#lrange'),q=$('#lq'); let mode='man',tok=0,user=false;
  function hours(){ const n=+r.value,m=n*12/60,a=m*.1; $('#lnum').textContent=n; $('#lhm').textContent=m.toFixed(0)+' h'; $('#lha').textContent=a.toFixed(0)+' h'; $('#lbm').style.width='100%'; $('#lba').style.width='10%'; $('#lsave').textContent=(m-a).toFixed(0); }
  async function sim(){ const my=++tok,n=Math.round(+r.value/10); q.innerHTML='<i></i>'.repeat(n); const I=[...q.children];
    $('#lql').textContent=mode==='man'?'Inbox · each square is 10 emails waiting for an analyst':'Inbox · each square is 10 emails, processed as they arrive';
    if(mode==='man'){ I.forEach(i=>i.className='w'); for(let k=0;k<I.length;k++){ await sleep(380); if(my!==tok) return; I[k].className='a'; if(k>=Math.round(n*.35)){ $('#lql').textContent=`Inbox · ${n-k-1} of ${n} squares still waiting at the end of the day`; break; } } }
    else { for(const i of I){ await sleep(40); if(my!==tok) return; i.className='d'; } $('#lql').textContent='Inbox · every email structured, analysts review the records'; } }
  const setM=segBind($('#load'),'data-m',(v,u)=>{ if(u) user=true; mode=v; sim(); });
  r.addEventListener('input',()=>{ user=true; hours(); sim(); });
  hours(); q.innerHTML='<i class="w"></i>'.repeat(40);
  onView($('#load'),async()=>{ await sim(); await sleep(2200); if(user) return; mode='ai'; setM('ai'); sim(); },.35);
})();

/* PIPELINE */
(()=>{ const ST=[['Ingestion','captured and prepared'],['Extraction','people, organisations, contacts'],['Classification','relevance and context'],['Structuring','CRM-ready records'],['Validation','checks and source link']];
  $('#pst').innerHTML=ST.map((s,i)=>`<div class="iv-stg"><em>Agent ${i+1}</em><b>${s[0]}</b><span>${s[1]}</span></div>`).join('');
  $('#ppick').innerHTML=MAILS.map((m,i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-i="${i}"><b>${m.tab}</b><span>${m.tag}</span></button>`).join('');
  let cur=0,tok=0,user=false; const mail=$('#pmail'),res=$('#pres'),S=$$('#pst .iv-stg');
  const stg=i=>S.forEach((s,k)=>s.className='iv-stg'+(k<i?' done':k===i?' on':''));
  function load(){ ++tok; const m=MAILS[cur]; mail.innerHTML=mailHTML(m); res.innerHTML='<div class="wait">Press <b>Process this email</b> to run the five agents.</div>'; stg(-1); }
  function bindTrace(){ $$('#pres tr[data-src]').forEach(tr=>tr.addEventListener('click',()=>{ $$('#pmail mark').forEach(x=>x.classList.remove('focus')); $$('#pres tr').forEach(x=>x.classList.remove('sel')); tr.classList.add('sel'); const t=$('#'+tr.dataset.src); if(t){ t.classList.add('on','focus'); } })); }
  async function run(){ const my=++tok,m=MAILS[cur]; res.innerHTML=''; $$('#pmail mark').forEach(x=>x.classList.remove('on','focus'));
    stg(0); await sleep(700); if(my!==tok) return;
    stg(1); for(const k of ['per','org']){ for(const x of $$(`#pmail mark[data-k="${k}"]`)){ x.classList.add('on'); await sleep(260); if(my!==tok) return; } }
    stg(2); for(const x of $$('#pmail mark[data-k="int"],#pmail mark[data-k="top"]')){ x.classList.add('on'); await sleep(260); if(my!==tok) return; }
    res.innerHTML=`<div class="iv-cls"><small>Classification</small><div>${m.cls.map(c=>`<span class="iv-chip ${c[1]}">${c[0]}</span>`).join('')}</div></div>`; await sleep(700); if(my!==tok) return;
    stg(3); if(m.recs.length){ res.insertAdjacentHTML('beforeend',m.recs.map((r,i)=>recHTML(r,i,m.id)).join('')); } else res.insertAdjacentHTML('beforeend','<div class="iv-val skip"><span><b>No CRM record written.</b> An automated newsletter carries no investor signal, so it is logged and skipped instead of cluttering the CRM.</span></div>');
    await sleep(800); if(my!==tok) return;
    stg(4); await sleep(500); if(my!==tok) return;
    if(m.val) res.insertAdjacentHTML('beforeend',`<div class="iv-val">${m.val.map(v=>`<span>✓ ${v}</span>`).join('')}<span style="color:var(--royal);font-weight:600">Tip: click any field to see its source in the email.</span></div>`);
    stg(5); bindTrace(); }
  $$('#ppick button').forEach(b=>b.addEventListener('click',()=>{ user=true; cur=+b.dataset.i; $$('#ppick button').forEach(x=>x.setAttribute('aria-selected',x===b)); load(); run(); }));
  $('#prun').onclick=()=>{ user=true; run(); };
  load();
  onView($('#pipe'),async()=>{ await sleep(500); if(user) return; await run(); for(const i of [1,3,2]){ await sleep(5200); if(user) return; cur=i; $$('#ppick button').forEach((x,k)=>x.setAttribute('aria-selected',k===i)); load(); await run(); } },.3);
})();

/* TRACE */
(()=>{ const m=MAILS[0],r=m.recs[0]; let user=false;
  $('#trec').innerHTML=`<div class="iv-rec"><div class="rh"><b>CRM record · INT-20481</b><small>source ${m.id}</small></div><table>${r.rows.map(x=>`<tr ${x[2]?`data-src="t${x[2]}"`:''}><td>${x[0]}</td><td>${esc(x[1])}</td></tr>`).join('')}</table><div class="iv-hint">← Click a field</div><div class="iv-tlog"><span>09:14:02 · received via n8n ingestion</span><span>09:14:05 · entities extracted · Claude agent</span><span>09:14:06 · classified: introduction, meeting request</span><span>09:14:07 · validated: account matched, no duplicate</span><span>09:14:07 · written to CRM with source link</span></div></div>`;
  $('#tmail').innerHTML=`<div class="iv-mail">${mailHTML(m).replace(/id="a-/g,'id="ta-')}</div>`;
  const pick=tr=>{ $$('#tmail mark').forEach(x=>x.classList.remove('on','focus')); $$('#trec tr').forEach(x=>x.classList.remove('sel')); tr.classList.add('sel'); const t=$('#'+tr.dataset.src.replace('ta-','ta-')); if(t) t.classList.add('on','focus'); };
  $$('#trec tr[data-src]').forEach(tr=>{ tr.dataset.src=tr.dataset.src.replace(/^ta-/,'ta-').replace(/^t/,'t'); tr.addEventListener('click',()=>{ user=true; pick(tr); }); });
  onView($('#tr'),async()=>{ for(const tr of $$('#trec tr[data-src]')){ await sleep(1300); if(user) return; pick(tr); } },.35);
})();

/* SIGNALS */
(()=>{ const INV=[
  ['Northbridge Capital','Daniel Reyes · Partner','warm',[1,0,2,1,2,3,3,5],[['This week','Meeting request','Call proposed for Tuesday','msg-7f3a91'],['3 weeks ago','Introduction','Met at the Lisbon summit','msg-61aa20']]],
  ['Harlow Family Office','Amara Okafor','warm',[0,1,1,2,2,2,4,4],[['This week','Commitment','Fund III confirmed before the June close','msg-2c18e4'],['This week','New contact','Analyst requests data room access','msg-2c18e4'],['Last month','Due diligence','Questions on the track record','msg-44b0c9']]],
  ['Altavista Partners','Tom Becker','cool',[4,3,3,2,2,1,1,1],[['This week','Decline','Allocation fully deployed · revisit in Q1','msg-5e77c0'],['6 weeks ago','Meeting','Co-investment walkthrough','msg-1d0e5f']]],
  ['Ostwind Ventures','Lena Fischer','steady',[2,2,3,2,2,3,2,2],[['Last week','Due diligence','Data room question on portfolio KPIs','msg-82c7d1']]],
  ['Kestrel LP','Raj Mehta','warm',[0,0,0,1,1,2,2,3],[['This week','Meeting request','Coffee in London next month','msg-9a30e2']]],
  ['Meridian Endowment','Clara Jensen','cool',[3,3,2,2,1,1,0,0],[['5 weeks ago','Update','Pausing new commitments this quarter','msg-3fe9b4']]]];
  const TR={warm:['Warming','pos'],steady:['Steady','neu'],cool:['Cooling','neg']};
  let f='all',sel=0,user=false;
  $('#sfil').innerHTML=[['all','All investors'],['warm','Warming'],['steady','Steady'],['cool','Cooling']].map(x=>`<button type="button" data-f="${x[0]}" aria-pressed="${x[0]==='all'}">${x[1]}</button>`).join('');
  const spark=(a,c)=>{ const mx=Math.max(...a,1); return `<svg viewBox="0 0 120 30" preserveAspectRatio="none" aria-hidden="true"><polyline fill="none" stroke="${c}" stroke-width="2" points="${a.map((v,i)=>`${i*120/7},${28-v/mx*24}`).join(' ')}"/></svg>`; };
  function draw(){ const L=INV.map((v,i)=>[v,i]).filter(([v])=>f==='all'||v[2]===f); if(!L.some(([,i])=>i===sel)&&L.length) sel=L[0][1];
    $('#slist').innerHTML=L.map(([v,i])=>`<button type="button" class="iv-inv" data-i="${i}" aria-pressed="${i===sel}"><span><b>${v[0]}</b><small>${v[1]} · ${v[3].reduce((a,b)=>a+b,0)} emails in 8 weeks</small></span>${spark(v[3],v[2]==='cool'?'#c03030':v[2]==='warm'?'#3f9c7c':'#646c7e')}<span class="iv-chip ${TR[v[2]][1]}">${TR[v[2]][0]}</span></button>`).join('');
    const v=INV[sel]; $('#sdet').innerHTML=`<div class="dh"><b>${v[0]}</b><span>${v[1]} · trend: ${TR[v[2]][0].toLowerCase()} · every event below is a record linked to its email</span></div><ol>${v[4].map(e=>`<li><em>${e[0]}</em><b>${e[1]}</b><span>${e[2]}</span><span class="src">${e[3]} ↗</span></li>`).join('')}</ol>`;
    $$('#slist .iv-inv').forEach(b=>b.addEventListener('click',()=>{ user=true; sel=+b.dataset.i; draw(); })); }
  segBind($('#sig'),'data-f',v=>{ user=true; f=v; draw(); });
  draw();
  onView($('#sig'),async()=>{ for(const i of [1,2,4]){ await sleep(2600); if(user) return; sel=i; draw(); } },.35);
})();

/* ARCHITECTURE */
(()=>{ const N=[['Mailbox','Investor email','Incoming investor communications arrive in the shared inbox.',''],['n8n','Ingestion workflow','n8n captures each new email and prepares it for processing: sender, thread, body and attachments.',''],['FastAPI','Orchestration service','A Python FastAPI service receives each message and coordinates the agents in order.',''],['Claude agents','Extract · classify · structure','Anthropic Claude agents identify people and organisations, decide relevance and context, and build the CRM records.','ag'],['Validation','Checks and traceability','Records are checked for required fields, known organisations and duplicates, and linked to their source email.',''],['PostgreSQL','Records, sources, audit','Structured records, source links and the audit trail are stored, ready for the CRM and engagement analytics.','']];
  $('#aflow').innerHTML=N.map((n,i)=>`<button type="button" class="iv-an ${n[3]}" data-i="${i}"><em>${String(i+1).padStart(2,'0')}</em><b>${n[0]}</b><span>${n[1]}</span></button>`).join('');
  const det=$('#adet'),B=$$('#aflow .iv-an'); let tok=0,user=false;
  const show=i=>{ B.forEach((b,k)=>b.classList.toggle('on',k===i)); det.innerHTML=`<b>${N[i][0]} · ${N[i][1]}.</b> ${N[i][2]}`; };
  det.innerHTML='<b>Everything runs in Docker containers in the cloud.</b> Tap a component to see its job.';
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; ++tok; show(+b.dataset.i); }));
  async function trace(){ const my=++tok; for(let i=0;i<N.length;i++){ if(my!==tok) return; show(i); await sleep(1500); } if(my===tok){ B.forEach(b=>b.classList.remove('on')); det.innerHTML='<b>Done in seconds.</b> One email in, a validated, traceable CRM record out, with no analyst typing.'; } }
  $('#atrace').onclick=()=>{ user=true; trace(); };
  onView($('#archx'),()=>{ if(!user) trace(); },.35);
})();

/* CONSTRAINTS */
(()=>{ const C=[['Every email is written differently','Formats, tone and structure vary from sender to sender, with no template to rely on.','Agents that read meaning','Claude extracts sender, organisation and contact details from what the email says, not from where a template puts it.'],
  ['One email, several topics','A single message can confirm a commitment, introduce a colleague and change a preference.','One record per signal','Each signal is classified on its own, so one email can create several records, all linked to the same source.'],
  ['Extraction has to be right','Wrong names or organisations in a CRM are worse than none.','Validate before writing','Required fields, known organisations and duplicates are checked before anything reaches the CRM.'],
  ['Audit is non-negotiable','Every entry had to be explainable and traceable.','A source link on every record','Each record stays linked to the original email, so any value can be traced back to the conversation.']];
  const f=$('#flip'); f.innerHTML=C.map((c,i)=>`<button type="button" class="sy-fc" aria-pressed="false" aria-label="${esc(c[0])}: flip to see the solution"><span class="in"><span class="fa"><small>Challenge ${i+1}</small><b>${c[0]}</b><span class="tx">${c[1]}</span><span class="go">See how we solved it ↻</span></span><span class="ba"><small>How we solved it</small><b>${c[2]}</b><span class="tx">${c[3]}</span><span class="go">↻ Back</span></span></span></button>`).join('');
  const cards=$$('#flip .sy-fc'); let user=false;
  cards.forEach(c=>c.addEventListener('click',()=>{ user=true; const on=!c.classList.contains('on'); c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }));
  $('#flipall').onclick=()=>{ user=true; const on=!cards.every(c=>c.classList.contains('on')); cards.forEach(c=>{ c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }); $('#flipall').textContent=on?'Show the challenges':'Flip all cards'; };
  onView(f,async()=>{ if(RM) return; await sleep(1000); for(const c of cards){ if(user) return; c.classList.add('on'); await sleep(1000); c.classList.remove('on'); await sleep(150); } },.4);
})();

/* RESULTS */
(()=>{ const BA=[['Analysts retyping every email','Agents draft every record'],['CRM updated days later','Records written as email arrives'],['Inconsistent data capture','One schema, every time'],['No view of investor engagement','Engagement trends across investors'],['Scaling meant hiring','Volume grows without growing the team'],['Data you had to take on trust','Every value traceable to its email']];
  $('#ba').innerHTML='<span class="lbl">Before and after</span>'+BA.map(b=>`<div><span class="b">${b[0]}</span><i>→</i><span class="a">${b[1]}</span></div>`).join('');
  onView($('#ba'),()=>$('#ba').classList.add('in'),.25);
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to,suf=b.dataset.suf||''; if(RM) return; onView(b,async()=>{ for(let i=0;i<=20;i++){ b.textContent=Math.round(to*i/20)+suf; await sleep(30); } },.5); });
})();
