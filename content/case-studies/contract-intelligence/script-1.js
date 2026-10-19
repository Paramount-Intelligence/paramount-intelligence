__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const onView=(el,fn,th=.35)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const visible=(el,cb)=>{ new IntersectionObserver(es=>cb(es[0].isIntersecting),{threshold:.15}).observe(el); };

/* reveal: motion only, content readable at rest */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.12});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* shared demo data: the 10-clause standard */
const CL=[
 {n:'Liability cap',s:'a',says:'Capped at fees paid in the prior 12 months, with no carve-outs.',fix:'Add carve-outs for data breach, IP infringement and confidentiality.'},
 {n:'IP ownership',s:'r',says:'Vendor keeps IP in deliverables; client receives a licence only.',fix:'Require full assignment of deliverables on payment.'},
 {n:'Termination & exit',s:'a',says:'Termination for convenience on 90 days’ notice, with a 25% fee.',fix:'Remove the termination fee and reduce notice to 30 days.'},
 {n:'Renewal opt-out',s:'r',says:'Auto-renews for 12 months; no opt-out window stated.',fix:'Add a 60-day opt-out window before each renewal.'},
 {n:'Data security',s:'g',says:'AES-256 at rest and in transit; 24-hour breach notification.',fix:'No change needed.'},
 {n:'Confidentiality',s:'g',says:'Mutual confidentiality for 5 years after termination.',fix:'No change needed.'},
 {n:'Subcontracting',s:'a',says:'Vendor may subcontract without notice.',fix:'Require prior written approval for material subcontracting.'},
 {n:'Payment terms',s:'g',says:'Net 45 against approved milestones.',fix:'No change needed.'},
 {n:'Insurance',s:'g',says:'$5M professional and cyber liability cover.',fix:'No change needed.'},
 {n:'Governing law',s:'g',says:'Governing law and dispute resolution clearly defined.',fix:'No change needed.'}];
const LBL={g:'COMPLIANT',a:'NEEDS REVIEW',r:'NON-COMPLIANT'};

/* HERO: annotated contract */
(()=>{ const C=[
  {no:'§4.1',t:'Scope of services',s:'g',n:3,f:'Compliant',d:'Deliverables defined'},
  {no:'§6.3',t:'Intellectual property',s:'r',n:3,f:'Non-compliant',d:'Vendor keeps IP · require assignment'},
  {no:'§8.2',t:'Payment terms',s:'g',n:2,f:'Compliant',d:'Net 45 on milestones'},
  {no:'§9.2',t:'Limitation of liability',s:'a',n:3,f:'Needs review',d:'Cap too low · no carve-outs'},
  {no:'§12.4',t:'Data security',s:'g',n:2,f:'Compliant',d:'AES-256 · 24h breach notice'},
  {no:'§14.1',t:'Term and renewal',s:'r',n:3,f:'Non-compliant',d:'Auto-renews · no opt-out'}];
  const box=$('#clauses'),paper=$('#paper'),line=$('#scanline'),pg=$('#pgno'),tm=$('#rtime');
  box.innerHTML=C.map(c=>`<div class="ci-c" data-s="${c.s}"><h5><i>${c.no}</i>${c.t}</h5>${Array.from({length:c.n},(_,i)=>`<div class="ln" style="width:${[96,88,72,92,64][i%5]}%"></div>`).join('')}<span class="ci-flag ${c.s}">${c.f}<small>${c.d}</small></span></div>`).join('');
  const els=$$('#clauses .ci-c');
  const final=()=>{ els.forEach(e=>{ e.classList.add(e.dataset.s,'show'); }); pg.textContent='Page 150 of 150'; tm.textContent='00:34'; };
  let vis=true; visible($('#desk'),v=>vis=v);
  async function loop(){ while(true){
      els.forEach(e=>e.classList.remove('g','a','r','show')); line.style.opacity=1; pg.textContent='Page 1 of 150'; tm.textContent='00:00';
      const H=paper.clientHeight,T=4200,t0=performance.now();
      await new Promise(res=>{ (function f(t){ const k=Math.min(1,(t-t0)/T); const y=k*H; line.style.top=y+'px';
        pg.textContent='Page '+Math.max(1,Math.round(k*150))+' of 150'; const s=Math.round(k*34); tm.textContent='00:'+String(s).padStart(2,'0');
        els.forEach(e=>{ if(e.offsetTop+e.offsetHeight*.6<y&&!e.classList.contains('show')) e.classList.add(e.dataset.s,'show'); });
        k<1?requestAnimationFrame(f):res(); })(t0); });
      line.style.opacity=0; final(); await sleep(4200); while(!vis) await sleep(500); } }
  if(RM) final(); else { final(); setTimeout(loop,900); }
})();

/* PROBLEM: life of one contract */
(()=>{ const life=$('#life'),now=$('#lnow'),side=$('#lside'),rng=$('#lrange'),fill=$('#lfill'),knob=$('#lknob'),rev=$('#lrev'),btn=$$('#life .seg button');
  let mode='manual',user=false,playing=false,last='';
  // timeline: 0-8 received, 8-34 review (manual) | 8-10 (copilot), 34/10 signed, then months to 100
  const P={manual:{r0:8,r1:34},copilot:{r0:8,r1:11}};
  const pageBar=(n,fast)=>`<div class="ci-pagebar${fast?' fast':''}">${Array.from({length:50},(_,i)=>`<i class="${i<n?'on':''}"></i>`).join('')}</div>`;
  function render(v){ const p=P[mode]; fill.style.width=v+'%'; knob.style.left=v+'%'; rev.style.left=p.r0+'%'; rev.style.width=(p.r1-p.r0)+'%';
    let key,nowH,sideH,cls='';
    if(v<p.r0){ key='rec'; nowH=`<span class="when">Day 0 · Monday</span><h3>A 150-page SOW arrives from a vendor.</h3><p>It joins every other SOW, MSA and NDA waiting to be checked before anyone signs.</p>`;
      sideH=`<span class="lbl2">In the queue</span><div class="big">+1</div><span class="cap">and they never stop coming</span>`; }
    else if(v<p.r1){ const k=(v-p.r0)/(p.r1-p.r0);
      if(mode==='manual'){ const day=1+Math.min(2,Math.floor(k*3)); key='rev'+Math.floor(k*25);
        nowH=`<span class="when">Day ${day} of 3 · legal review</span><h3>A lawyer reads every page, clause by clause.</h3>${pageBar(Math.round(k*50))}<div class="ci-revs">
          <div><b>§14.1 Term and renewal</b><span class="pill g">Reviewer A: fine</span></div>
          <div><b>Same clause, another contract</b><span class="pill a">Reviewer B: check</span></div>
          <div><b>Same clause, a busy week</b><span class="pill n">Reviewer C: not flagged</span></div></div>`;
        sideH=`<span class="lbl2">Time in review</span><div class="big">Day ${day}</div><span class="cap">Results vary by reviewer</span>`; }
      else { key='revc'+Math.floor(k*10);
        nowH=`<span class="when">Day 0 · under a minute</span><h3>Claude reviews all 150 pages against the 10-clause standard.</h3>${pageBar(Math.round(k*50),true)}<div class="ci-revs">
          <div><b>§14.1 Term and renewal</b><span class="pill r">RED · no opt-out</span></div>
          <div><b>§9.2 Limitation of liability</b><span class="pill a">AMBER · cap too low</span></div>
          <div><b>§12.4 Data security</b><span class="pill g">GREEN</span></div></div>`;
        sideH=`<span class="lbl2">Time in review</span><div class="big">&lt; 1 min</div><span class="cap">Same standard, every time</span>`; } }
    else if(v<p.r1+8){ key='sign'; nowH=mode==='manual'?`<span class="when">Day 3 · signed</span><h3>Signed, with the renewal clause unchanged.</h3><p>Nobody flagged that §14.1 auto-renews with no opt-out window.</p>`:`<span class="when">Day 0 · signed</span><h3>Signed after one fix: a 60-day opt-out added to §14.1.</h3><p>The vendor answered the follow-up questions Claude drafted.</p>`;
      sideH=`<div class="ci-stamp on ${mode==='manual'?'':'green'}">SIGNED</div><span class="cap">${mode==='manual'?'Day 3':'Same day'}</span>`; }
    else if(v<92){ const m=Math.min(11,Math.max(1,Math.round((v-(p.r1+8))/(92-(p.r1+8))*11))); key='m'+m;
      nowH=`<span class="when">Month ${m}</span><h3>${m>=10?'The opt-out window closes.':'The contract runs. Everyone moves on.'}</h3><p>${m>=10?(mode==='manual'?'No one is watching for it.':'The opt-out added at signing is on record.'):'The work starts, invoices are paid.'}</p>`;
      sideH=`<span class="lbl2">Contract running</span><div class="big">M${m}</div><span class="cap">of 12</span>`; }
    else { key='end';
      if(mode==='manual'){ cls='alarm'; nowH=`<span class="when">Month 12 · renewal</span><h3>It auto-renews for another 12 months.</h3><p>The missing opt-out becomes a problem only now, long after signing.</p>`;
        sideH=`<span class="lbl2">Risk surfaced</span><div class="big">Too late</div><div class="ci-stamp on red">AUTO-RENEWED</div>`; }
      else { cls='safe'; nowH=`<span class="when">Month 12 · renewal</span><h3>The client decides whether to renew.</h3><p>The risk was caught before signing, not after.</p>`;
        sideH=`<span class="lbl2">Risk surfaced</span><div class="big">Day 0</div><div class="ci-stamp on green">CAUGHT EARLY</div>`; } }
    side.className='ci-side2 '+cls; if(key!==last){ now.innerHTML=nowH; side.innerHTML=sideH; last=key; } }
  async function play(){ if(playing) return; playing=true; for(let v=+rng.value>=100?0:+rng.value; v<=100; v+=0.5){ if(user&&!playing) return; rng.value=v; render(v); await sleep(RM?0:55); if(!playing) return; } playing=false;
    if(!user){ await sleep(2400); mode=mode==='manual'?'copilot':'manual'; setBtn(); rng.value=0; last=''; play(); } }
  const setBtn=()=>btn.forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===mode));
  rng.addEventListener('input',()=>{ user=true; playing=false; render(+rng.value); });
  btn.forEach(b=>b.addEventListener('click',()=>{ user=true; playing=false; mode=b.dataset.v; setBtn(); last=''; render(+rng.value); }));
  rng.value=100; render(100);
  onView(life,()=>{ if(RM) return; rng.value=0; last=''; render(0); play(); },.35);
})();

/* CONSTRAINTS: schedule A */
(()=>{ const L=[['Formats','The platform shall accept contracts in PDF, DOCX and TXT format.'],['Length','It shall review documents approaching 200 pages in full.'],['Structured output','It shall return statuses, fields and fixes, not free-form text.'],['Security','Contracts shall be encrypted; no credential shall be hardcoded.'],['Infrastructure','It shall run fully serverless, with nothing for the client to operate.'],['Responsiveness','Long reviews shall run asynchronously, with real-time chat on top.']];
  $('#cls').innerHTML=L.map((x,i)=>`<button type="button" class="ci-cl2" aria-pressed="false"><span class="no">A.${i+1}</span><span><b>${x[0]}.</b><p>${x[1]}</p></span><span class="ci-init">PI</span></button>`).join('');
  const cs=$$('#cls .ci-cl2'),held=$('#held'),sig=$('#sigpath'); const len=sig.getTotalLength(); sig.style.strokeDasharray=len; sig.style.strokeDashoffset=len; sig.style.transition='stroke-dashoffset 1.4s ease';
  function upd(){ const n=cs.filter(c=>c.classList.contains('on')).length; held.textContent=n===6?'All six held':n+' of 6 held'; held.classList.toggle('on',n===6); sig.style.strokeDashoffset=n===6?0:len; }
  cs.forEach(c=>c.addEventListener('click',()=>{ c.classList.toggle('on'); c.setAttribute('aria-pressed',c.classList.contains('on')); upd(); }));
  onView($('#sched'),()=>cs.forEach((c,i)=>setTimeout(()=>{ c.classList.add('on'); c.setAttribute('aria-pressed','true'); upd(); },RM?0:300+i*420)),.35);
})();

/* RESOLUTION: three modes */
(()=>{ const prev=$('#modeprev'),btn=$$('#drop .ci-modes button'),drop=$('#drop'),svc=$$('#svc div');
  const V={validate:{rows:CL.slice(0,4).map(c=>`<div class="row"><b>${c.n}</b><span class="pill ${c.s}">${LBL[c.s]}</span></div>`).join(''),hot:['claude','lambda','s3']},
    compare:{rows:[['IP ownership','B'],['Liability cap','B'],['Pricing','A'],['Payment terms','E']].map(([n,w])=>`<div class="row"><b>${n}</b><span class="pill ${w==='B'?'g':w==='A'?'n':'a'}">${w==='E'?'EQUAL':'VENDOR '+w+' STRONGER'}</span></div>`).join(''),hot:['claude','lambda','react']},
    chat:{rows:`<div class="row"><b>“Can we exit early?”</b><span class="pill n">ASKED</span></div><div class="row" style="display:block"><span>Yes, on 90 days' notice, with a 25% termination fee.</span><br><span style="font-family:var(--mono);font-size:.66rem;color:var(--royal)">Cited: §14.2 Termination for convenience</span></div>`,hot:['claude','sm','cf']}};
  let cur='validate',user=false;
  function set(m){ cur=m; btn.forEach(b=>b.classList.toggle('on',b.dataset.m===m)); prev.innerHTML=V[m].rows; svc.forEach(d=>d.classList.toggle('hot',V[m].hot.includes(d.dataset.k)));
    if(!RM){ drop.classList.remove('fly'); void drop.offsetWidth; drop.classList.add('fly'); setTimeout(()=>drop.classList.remove('fly'),650); } }
  btn.forEach(b=>b.addEventListener('click',()=>{ user=true; set(b.dataset.m); }));
  set('validate'); const order=['validate','compare','chat']; let i=0;
  onView(drop,()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); i=(i+1)%3; set(order[i]); },3200); },.4);
})();

/* VALIDATOR demo */
(()=>{ const body=$('#vbody'),steps=$$('#vsteps li'),pipe=$$('#vpipe div'); let run=0,auto=true;
  const step=k=>steps.forEach((s,i)=>{ s.classList.toggle('on',i===k); s.classList.toggle('done',i<k); });
  const pl=k=>pipe.forEach(p=>{ p.classList.toggle('on',p.dataset.p===k); });
  const pdone=ks=>pipe.forEach(p=>{ if(ks.includes(p.dataset.p)) p.classList.add('done'); });
  function idle(){ body.innerHTML=`<div class="ci-idle"><div><div class="ci-file" style="justify-content:center;margin-bottom:14px"><span class="ext">PDF</span><span>Vendor_SOW_v3.pdf<small>150 pages · Statement of Work</small></span></div><b>Drop a contract to validate it</b><p class="demo-note" style="margin-top:6px">PDF, DOCX or TXT</p></div></div>`; step(0); pipe.forEach(p=>p.classList.remove('on','done')); }
  function results(filter){ const c={g:0,a:0,r:0}; CL.forEach(x=>c[x.s]++);
    body.innerHTML=`<div class="ci-card"><div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap;margin-bottom:10px"><div><b style="color:var(--navy)">Vendor_SOW_v3.pdf</b><div class="demo-note">Statement of Work · analysed just now</div></div><span class="pill n">EXPORT</span></div>
      <div class="ci-meta"><div><span>Vendor</span><b>Vendor A Consulting</b></div><div><span>Contract type</span><b>Statement of Work</b></div><div><span>Contract value</span><b>$2,400,000 (not to exceed)</b></div><div><span>Effective date</span><b>1 June 2026</b></div><div><span>Expiry date</span><b>31 May 2027</b></div><div><span>Duration</span><b>12 months</b></div></div></div>
      <div class="ci-sum"><div class="o"><b>AMBER</b><span>Overall risk</span></div><div class="g"><b data-c="${c.g}">0</b><span>Compliant</span></div><div class="a"><b data-c="${c.a}">0</b><span>Needs review</span></div><div class="r"><b data-c="${c.r}">0</b><span>Non-compliant</span></div></div>
      <div class="ci-card"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><b style="color:var(--navy);font-size:.88rem">Clause review</b><div class="ci-filt" id="vf"><button type="button" data-f="all">All (10)</button><button type="button" data-f="r">Non-compliant (${c.r})</button><button type="button" data-f="a">Needs review (${c.a})</button><button type="button" data-f="g">Compliant (${c.g})</button></div></div><div class="ci-clauses" id="vcl"></div></div>
      <div class="ci-card" id="vfq" hidden><b style="color:var(--navy);font-size:.88rem">Follow-up questions for the vendor</b><div class="ci-fq" style="margin-top:8px">
        <div>Will you assign full ownership of all deliverables to us on payment?</div><div>Can the liability cap carve out data breach and IP infringement?</div><div>Can you add a 60-day opt-out window before auto-renewal?</div><div>Which parts of the work do you plan to subcontract, and to whom?</div></div></div>`;
    const draw=f=>{ $$('#vf button').forEach(b=>b.classList.toggle('on',b.dataset.f===f)); const ord=[...CL].sort((a,b)=>'rag'.indexOf(a.s)-'rag'.indexOf(b.s));
      $('#vcl').innerHTML=ord.filter(x=>f==='all'||x.s===f).map((x,i)=>`<div class="ci-cl ${x.s}" tabindex="0" role="button" aria-expanded="false" style="animation-delay:${i*50}ms"><div class="h"><b>${x.n}</b><span class="pill ${x.s}">● ${LBL[x.s]}</span></div><div class="d"><div><span>Contract says</span>${x.says}</div><div><span>Recommendation</span>${x.fix}</div></div></div>`).join('');
      $$('#vcl .ci-cl').forEach(e=>{ const t=()=>{ e.classList.toggle('open'); e.setAttribute('aria-expanded',e.classList.contains('open')); auto=false; }; e.addEventListener('click',t); e.addEventListener('keydown',ev=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); t(); } }); }); };
    $$('#vf button').forEach(b=>b.addEventListener('click',()=>{ auto=false; draw(b.dataset.f); }));
    draw(filter||'all');
    $$('.ci-sum b[data-c]').forEach(b=>{ const to=+b.dataset.c; if(RM){ b.textContent=to; return; } let v=0; const t=setInterval(()=>{ b.textContent=++v; if(v>=to) clearInterval(t); },120); });
  }
  async function play(){ const id=++run; idle(); await sleep(RM?0:900); if(id!==run) return;
    step(0); pl('cf'); await sleep(RM?0:600); if(id!==run) return; pl('api'); await sleep(RM?0:500); if(id!==run) return; pdone(['cf','api']); pl('lambda'); step(1);
    body.innerHTML=`<div class="ci-prog"><div class="pg"><span id="vpg">0</span><small> / 150 pages</small></div><div class="track"><i id="vbar"></i></div><div class="stage" id="vst">Parsing document…</div></div>`;
    for(let p=0;p<=150;p+=3){ if(id!==run) return; $('#vpg').textContent=p; $('#vbar').style.width=(p/150*100)+'%';
      if(p===30){ pdone(['lambda']); pl('sm'); $('#vst').textContent='Fetching the Claude API key from Secrets Manager…'; }
      if(p===45){ pdone(['sm']); pl('claude'); $('#vst').textContent='Claude Haiku 4.5 · extracting metadata…'; step(2); }
      if(p===90){ $('#vst').textContent='Claude Haiku 4.5 · scoring clauses against the 10-clause standard…'; step(3); }
      await sleep(RM?0:40); }
    if(id!==run) return; pdone(['claude']); pl('s3'); $('#vst').textContent='Saving results to encrypted S3…'; await sleep(RM?0:600); if(id!==run) return;
    pdone(['s3']); pl(''); results('all'); step(4); await sleep(RM?0:900); if(id!==run) return;
    const f=$('#vfq'); if(f) f.hidden=false; steps.forEach(s=>{ s.classList.remove('on'); s.classList.add('done'); });
    if(auto&&!RM){ await sleep(1400); const first=$('#vcl .ci-cl'); if(first&&auto){ first.classList.add('open'); } }
  }
  $('#vrun').onclick=()=>{ auto=false; play(); }; $('#vreset').onclick=()=>{ run++; idle(); };
  results('all'); steps.forEach(s=>s.classList.add('done')); $('#vfq').hidden=false; // resting state
  onView($('#vapp'),()=>{ if(!RM) play(); },.35);
})();

/* COMPARISON + CHAT */
(()=>{ const R=[
  {n:'IP ownership',w:'B',r:'High',a:'Joint ownership of deliverables',b:'Full assignment on payment',t:'Ask Vendor A for full assignment, as Vendor B already offers.'},
  {n:'Liability cap',w:'B',r:'High',a:'$500K, no carve-outs',b:'$2M with carve-outs for breaches',t:'Push Vendor A to at least $2M with carve-outs.'},
  {n:'Termination',w:'B',r:'Medium',a:'25% fee to terminate for convenience',b:'30 days’ notice, no fee',t:'Remove Vendor A’s termination fee.'},
  {n:'Data security',w:'B',r:'High',a:'“Industry standard”, undefined',b:'AES-256, 24-hour breach notice',t:'Write named standards into Vendor A’s contract.'},
  {n:'Confidentiality',w:'B',r:'Medium',a:'2 years',b:'5 years',t:'Extend Vendor A’s term to 5 years.'},
  {n:'Subcontracting',w:'B',r:'Medium',a:'Unilateral right to subcontract',b:'Prior written approval',t:'Require approval for material subcontracting.'},
  {n:'Warranty',w:'B',r:'Low',a:'30-day warranty',b:'90-day warranty',t:'Ask Vendor A for 90 days.'},
  {n:'Insurance',w:'B',r:'Medium',a:'$1M general cover',b:'$5M including cyber liability',t:'Require $5M cyber cover from Vendor A.'},
  {n:'Pricing',w:'A',r:'Low',a:'Lower day rates',b:'Higher day rates',t:'Use Vendor A’s rates as leverage with Vendor B.'},
  {n:'Payment terms',w:'E',r:'Low',a:'Net 30',b:'Net 30',t:'No action needed.'}];
  const rows=$('#crows'); let wa=0,wb=0,we=0;
  function draw(animate){ rows.innerHTML=R.map((x,i)=>`<div class="ci-row" tabindex="0" role="button" aria-expanded="false" style="animation-delay:${i*60}ms"><div class="h"><b>${x.n}</b><div class="tug"><i></i><em data-w="${x.w}"></em></div><span class="win ${x.w}">${x.w==='E'?'EQUAL':'VENDOR '+x.w}</span></div><div class="d"><div><span>Vendor A</span>${x.a}</div><div><span>Vendor B</span>${x.b}</div><div class="tip"><span>Negotiation tip · ${x.r} risk</span>${x.t}</div></div></div>`).join('');
    const ems=$$('#crows .tug em'); const set=()=>ems.forEach(e=>{ const w=e.dataset.w; e.style.left=w==='A'?'calc(8% - 7px)':w==='B'?'calc(92% - 7px)':'calc(50% - 7px)'; e.style.background=w==='A'?'#5b3fc4':w==='B'?'#1f8a5c':'#646c7e'; });
    if(animate&&!RM) requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(set,200))); else set();
    $$('#crows .ci-row').forEach(e=>{ const t=()=>{ e.classList.toggle('open'); e.setAttribute('aria-expanded',e.classList.contains('open')); }; e.addEventListener('click',t); e.addEventListener('keydown',ev=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); t(); } }); });
    const tgt={A:0,B:0,E:0}; R.forEach(x=>tgt[x.w]++);
    const cnt=(el,to)=>{ if(!animate||RM){ el.textContent=to; return; } let v=0; el.textContent=0; const t=setInterval(()=>{ el.textContent=++v; if(v>=to) clearInterval(t); },110); };
    cnt($('#cwa'),tgt.A); cnt($('#cwb'),tgt.B); cnt($('#cwe'),tgt.E);
  }
  draw(false); onView($('#capp'),()=>draw(true),.3);
  // chat
  const Q=[
    {q:"What's Vendor A's liability cap?",a:'Capped at $500K across all claims, with no carve-outs for data breach or IP infringement.',c:'Vendor A · §9.2 Limitation of liability'},
    {q:'Can we end Vendor B early?',a:'Yes. Either party can terminate for convenience on 30 days’ written notice, with no termination fee.',c:'Vendor B · §14.1 Termination for convenience'},
    {q:'Who owns the deliverables under Vendor A?',a:'Ownership is joint: both parties can use the deliverables, and the vendor keeps the right to reuse them.',c:'Vendor A · §6.3 Intellectual property'},
    {q:'What should we push back on first?',a:'IP ownership. Ask Vendor A for full assignment of deliverables on payment, which Vendor B already offers.',c:'Comparison · priority 1'}];
  const log=$('#clog'),qs=$('#cqs'); let busy=false,user=false;
  qs.innerHTML=Q.map((x,i)=>`<button type="button" data-i="${i}">${x.q}</button>`).join('');
  const add=(cls,h)=>{ const d=document.createElement('div'); d.className='m '+cls; d.innerHTML=h; log.appendChild(d); log.scrollTop=log.scrollHeight; return d; };
  add('b','Both contracts are loaded. Ask me anything; I’ll cite the clause I’m drawing from.');
  async function ask(i){ if(busy) return; busy=true; const x=Q[i]; $$('#cqs button').forEach((b,k)=>b.classList.toggle('on',k===i)); add('u',x.q);
    const t=document.createElement('div'); t.className='typing'; t.innerHTML='<i></i><i></i><i></i>'; log.appendChild(t); log.scrollTop=log.scrollHeight; await sleep(RM?0:900); t.remove();
    add('b',`${x.a}<br><span class="cite">📄 ${x.c}</span>`); busy=false; }
  $$('#cqs button').forEach(b=>b.addEventListener('click',()=>{ user=true; ask(+b.dataset.i); }));
  onView($('#cchat'),async()=>{ for(let i=0;i<2;i++){ if(user) return; await sleep(RM?0:1200); if(user) return; await ask(i); } },.4);
})();

/* PHASES */
(()=>{ const LY=['Edge','Identity & access','Compute & API','AI','Data & storage','Security & monitoring','Delivery'];
  const P={1:[[['CloudFront (CDN & WAF)']],[['Open demo access','none']],[['API Gateway'],['Lambda · FastAPI']],[['Claude via Anthropic API']],[['S3 contracts · AES-256'],['S3 React frontend'],['Secrets Manager']],[['IAM least privilege']],[['AWS CDK']]],
    2:[[['Route 53','add'],['CloudFront'],['WAF v2','add'],['ACM TLS','add']],[['Azure AD SSO · SAML 2.0','add'],['Lambda authorizer · JWT','add'],['DynamoDB access list','add'],['5-min presigned URLs','add']],[['API Gateway'],['Lambda · FastAPI'],['Verify-access Lambda','add']],[['Claude via Anthropic API']],[['S3 contracts · SSE-KMS','up'],['S3 results & logs','add'],['RDS PostgreSQL','add'],['KMS keys','add'],['Secrets Manager']],[['CloudWatch','add'],['CloudTrail','add'],['SNS alerts','add'],['IAM least privilege']],[['GitHub Actions','add'],['AWS SAM','add']]],
    3:[[['Route 53'],['CloudFront'],['WAF v2'],['Shield','add'],['ACM']],[['Cognito SSO + RBAC','up'],['Azure AD · SAML 2.0'],['DynamoDB access list'],['Presigned URL generator']],[['VPC · 3 AZs','add'],['App Load Balancer','add'],['NAT gateways','add'],['API Gateway'],['ECS Fargate · 2–10 tasks','up'],['SQS','add']],[['Claude via Anthropic API'],['Textract OCR','add']],[['RDS Multi-AZ · primary + replica','up'],['ElastiCache Redis','add'],['S3 contracts · AES-256'],['S3 logs · 7-year retention','up'],['VPC endpoints · PrivateLink','add']],[['GuardDuty','add'],['Security Hub','add'],['Macie PII detection','add'],['Config','add'],['CloudTrail'],['CloudWatch'],['KMS']],[['GitHub'],['CodeBuild','add'],['CodePipeline · blue/green','add']]]};
  const box=$('#layers'),tabs=$$('#ptabs button'); let user=false;
  function set(p){ tabs.forEach(b=>{ const on=b.dataset.p==p; b.classList.toggle('on',on); b.setAttribute('aria-selected',on); });
    box.innerHTML=LY.map((l,i)=>`<div class="ci-layer"><b>${l}</b><div>${P[p][i].map((c,j)=>`<span class="chipx ${c[1]||''}" style="animation-delay:${j*60}ms">${c[0]}</span>`).join('')}</div></div>`).join(''); }
  tabs.forEach(b=>b.addEventListener('click',()=>{ user=true; set(b.dataset.p); }));
  set(1); let i=1; onView(box,()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); i=i%3+1; set(i); },3800); },.3);
})();

/* ACCESS CONTROL */
(()=>{ const U=$$('#aclU button'),C=$$('#aclC button'),N=$$('#aclflow .ci-node'),out=$('#aclout'); let u='proc',c='std',run=0,user=false;
  const rule=(u,c)=>{ // returns answers per step and outcome
    const roleOK = u==='legal' || (u==='proc' && c==='std');
    if(!roleOK) return {a:['yes','no'],ok:false,why:'Role has no access to this department’s contracts'};
    if(c==='std') return {a:['yes','yes','no'],ok:true,why:'5-minute presigned link generated'};
    return {a:['yes','yes','yes','yes'],ok:true,why:'Named on the restricted list · 5-minute presigned link'}; };
  async function play(){ const id=++run; U.forEach(b=>b.classList.toggle('on',b.dataset.u===u)); C.forEach(b=>b.classList.toggle('on',b.dataset.c===c));
    N.forEach(n=>{ n.classList.remove('on','yes','no'); n.querySelector('.ans').textContent=''; }); out.className='ci-out'; out.innerHTML='<span>Checking…</span><small></small>';
    const r=rule(u,c);
    for(let i=0;i<r.a.length;i++){ await sleep(RM?0:520); if(id!==run) return; const n=N[i],v=r.a[i]; n.classList.add('on',v==='yes'||(i===2&&v==='no'&&r.ok)?'yes':'no'); n.querySelector('.ans').textContent=v.toUpperCase();
      if(i===2&&v==='no'&&r.ok){ n.classList.remove('no'); n.classList.add('yes'); } }
    await sleep(RM?0:420); if(id!==run) return;
    out.className='ci-out '+(r.ok?'ok':'deny'); out.innerHTML=`<span>${r.ok?'✓ Access granted':'✕ Access denied'}</span><small>${r.why} · logged to CloudTrail</small>`; }
  U.forEach(b=>b.addEventListener('click',()=>{ user=true; u=b.dataset.u; play(); })); C.forEach(b=>b.addEventListener('click',()=>{ user=true; c=b.dataset.c; play(); }));
  const demo=[['proc','std'],['proc','res'],['legal','res'],['eng','std']]; let k=0;
  onView($('#acl'),async()=>{ while(!user){ [u,c]=demo[k++%demo.length]; await play(); await sleep(2600); if(RM) break; } },.35);
  play();
})();

/* RACE */
(()=>{ const r1=$$('#r1 i'),r2=$$('#r2 i'); let run=0;
  async function go(){ const id=++run; [...r1,...r2].forEach(e=>e.className='');
    if(RM){ r2.forEach(e=>e.className='done'); r2[2].className='fin'; r1[0].className='on'; return; }
    let a=0,b=0;
    for(let t=0;t<12;t++){ if(id!==run) return; await sleep(650);
      if(b<r2.length){ if(b>0) r2[b-1].className='done'; r2[b].className=b===r2.length-1?'fin':'on'; b++; }
      if(t%4===3&&a<2){ if(a>0) r1[a-1].className='done'; r1[a].className='on'; a++; } }
  }
  $('#rrun').onclick=go; onView($('#race'),go,.4);
})();

/* RESULTS */
(()=>{ // work-week calendar
  const wk=(id)=>{ $(id).innerHTML=['MON','TUE','WED','THU','FRI'].map(d=>`<div class="d"><span>${d}</span>${'<i></i>'.repeat(8)}</div>`).join(''); };
  wk('#wkM'); wk('#wkC');
  const M=[]; $$('#wkM .d').forEach(d=>[...d.querySelectorAll('i')].forEach(i=>M.push(i)));
  $('#wkC .d i').classList.add('first');
  onView($('#cal'),()=>{ M.slice(0,20).forEach((c,i)=>setTimeout(()=>c.classList.add('f'),RM?0:i*70)); },.5);
  // 10 x 8 grid
  const g=$('#g10'); const names=['Liab','IP','Exit','Renew','Sec','Conf','Sub','Pay','Ins','Law'];
  let h='<span></span>'+names.map(n=>`<span style="writing-mode:vertical-rl;transform:rotate(180deg);height:34px;font-size:.55rem">${n}</span>`).join('');
  for(let r=0;r<8;r++){ h+=`<span>Contract ${r+1}</span>`+'<i></i>'.repeat(10); } g.innerHTML=h;
  const cells=$$('#g10 i'); const pick=()=>{ const x=Math.random(); return x<.68?'g':x<.9?'a':'r'; };
  onView(g,()=>{ cells.forEach((c,i)=>setTimeout(()=>c.className=pick(),RM?0:i*28)); },.4);
  // what legal reads
  const tk=$('#ticks'); tk.innerHTML='<i></i>'.repeat(150);
  const F=CL.filter(c=>c.s!=='g'); const fl=$('#flagged'),nf=$('#nflag');
  async function run(){ tk.classList.remove('fade'); fl.innerHTML=''; nf.textContent='0';
    await sleep(RM?0:900); tk.classList.add('fade');
    for(let i=0;i<F.length;i++){ await sleep(RM?0:320); const s=document.createElement('span'); s.className=F[i].s; s.textContent=F[i].n; fl.appendChild(s); nf.textContent=(i+1)+' clauses'; } }
  onView($('#reads'),run,.5);
})();
