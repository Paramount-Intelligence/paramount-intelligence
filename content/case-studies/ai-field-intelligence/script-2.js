__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
const onView=(el,fn,th=.3)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const segBind=(root,attr,cb)=>{ const B=[...root.querySelectorAll('button['+attr+']')]; B.forEach(b=>b.addEventListener('click',()=>{ B.forEach(x=>x.setAttribute('aria-pressed',x===b)); cb(b.getAttribute(attr),true); })); return v=>{ B.forEach(x=>x.setAttribute('aria-pressed',x.getAttribute(attr)===v)); }; };
const fmt=n=>Math.round(n).toLocaleString('en-US');
const EV={m:'<span class="ev m">Measured</span>',mo:'<span class="ev mo">Modelled</span>',x:'<span class="ev x">Expected</span>'};
const toDet=el=>{ if(matchMedia('(max-width:900px)').matches) el.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'}); };

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.08});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* HERO */
(()=>{ const S=[['North Yard','Critical'],['Riverside','High'],['Elm Road','High'],['Harbor Point','Medium'],['Mill Lane','Low'],['Quarry Rd','Low'],['Bay Street','Low'],['Fox Hill','Low']];
  const P=[['o','<b>14 inspections filed</b> between 06:40 and 17:15 across 9 stations.',[1]],['b','<b>Pump 2 at North Yard seized,</b> rated Critical; unit isolated, impeller on order.',[3,4]],['b','<b>Seal leaks at Riverside and Elm Road,</b> both rated High.',[5,6]],['b','<b>Lockout tag missing</b> on Panel B at Harbor Point.',[7]],['c','Severity: 1 critical, 2 high, 1 medium, 10 low.',[2]]];
  const subs=$('#hsubs'),pulse=$('#hpulse'),ct=$('#hct');
  const line=p=>`<div class="fp-pl ${p[0]}">${p[1]} ${p[2].map(n=>`<i class="cite">L${n}</i>`).join('')}</div>`;
  if(RM){ subs.innerHTML=S.slice(0,5).map(s=>`<div class="fp-sub"><b>${s[0]}</b><span class="sv ${s[1].toLowerCase()}">${s[1]}</span></div>`).join(''); pulse.innerHTML=P.map(line).join(''); ct.textContent='14 submissions · 1,218 answers read · every number from code'; return; }
  (async()=>{ for(;;){ subs.innerHTML=''; pulse.innerHTML=''; let a=0;
      for(const [i,s] of S.entries()){ subs.insertAdjacentHTML('afterbegin',`<div class="fp-sub"><b>${s[0]}</b><span class="sv ${s[1].toLowerCase()}">${s[1]}</span></div>`); if(subs.children.length>5) subs.lastChild.remove(); a+=87+i*3; ct.textContent=`${i+1} submissions · ${fmt(a)} answers read`; await sleep(380); }
      ct.textContent='14 submissions · 1,218 answers read · every number from code';
      for(const p of P){ pulse.insertAdjacentHTML('beforeend',line(p)); await sleep(650); }
      await sleep(4200); } })();
})();

/* PROBLEM */
(()=>{ $$('#scale b[data-to]').forEach(b=>{ const to=+b.dataset.to,d=+(b.dataset.dec||0),suf=b.dataset.suf||'',f=b.dataset.fmt; if(RM) return; onView(b,async()=>{ for(let i=0;i<=24;i++){ const v=to*i/24; b.textContent=(d?v.toFixed(d):f?fmt(v):Math.round(v))+suf; await sleep(28); } },.5); });
  const r=$('#mrange'),st=$('#mstack');
  function draw(){ const n=+r.value; $('#mnum').textContent=n; st.innerHTML=Array.from({length:n},(_,i)=>`<i style="animation-delay:${i*.012}s"></i>`).join(''); $('#mtime').innerHTML=`<b>${n} to ${n*2} minutes</b> of opening and scanning, every day, for one form.`; }
  r.addEventListener('input',draw); draw();
})();

/* HARD */
(()=>{ const H=[['Every form is different','12,374','customer-designed forms; median 53 questions, mean 135, largest 17,988.','A schema per form version, built by code from the definition, plus a form card that says what each field means and what matters.'],
  ['Raw data is too big','58.8 MB','largest stored submission; busy forms run about 34,000 tokens per submission at p95.','Code flattens each submission to one row per answer; an input guard caps model input at 150,000 tokens; large schemas are built in parts of 400 questions.'],
  ['Forms change while in use','16.3%','of forms (2,021) had more than one version live on the same day; about 2,800 new versions a month.','Questions are matched across versions by label and data type, agreed with the client\'s engineers, so a day\'s pulse merges versions.'],
  ['Submissions are re-sent','1.32–1.58×','each submission arrives this many times on average as it is edited or moves through workflow.','The artifact is overwritten by submission id, and the pulse counts the latest version once.'],
  ['Not every answer is real','13.4–20.5%','of answers carry a "required but blank" flag; some content is hidden by form logic.','Data rules agreed with the client\'s architect: ignored content excluded, hidden-and-empty means not asked, hidden-with-value kept.'],
  ['Key facts hide in comments','10.8–22.3%','of submissions carry comments, almost all on scored answers.','Comments travel with their answer into the model input.'],
  ['Forms declare their own defects','41–47%','of form definitions carry exception rules.','Exceptions are read as findings and ranked first.'],
  ['Cost concentrates in a few customers','72%','of volume sits in the top 40 customers; the top 10 carry 41%.','A per-customer and per-form cost model, with live levers for fair usage.'],
  ['One wrong fact loses trust','0','tolerance for invented numbers: the bar set by the client\'s SVP Product.','Code computes every number, the model writes, and code checks every statement against its cited inputs.'],
  ['Evaluation bias','96.6th','percentile of form-days: where the training days sat, because busy days dominate any sample.','Held-out customers are protected in code, and results are reported separately for typical and busy days.'],
  ['Privacy and tenant isolation','0%','identifier-leak target in summaries, with a hard stop.','No cross-customer data anywhere; emails, usernames, phones and system ids never reach a model; all data stays in the client\'s AWS account.'],
  ['Production lives in another stack','Java','is the client\'s core platform language.','A Python reference implementation written as pure, testable steps with versioned JSON contracts, so the client can host or port it.']];
  const g=$('#hgrid'),d=$('#hdet'); let sel=0,user=false;
  g.innerHTML=H.map((h,i)=>`<button type="button" role="tab" class="fp-hc" data-i="${i}" aria-selected="${i===0}"><b>${h[1]}</b><span>${h[0]}</span></button>`).join('');
  const B=$$('#hgrid .fp-hc');
  const show=i=>{ sel=i; B.forEach((b,k)=>b.setAttribute('aria-selected',k===i)); const h=H[i]; d.innerHTML=`<small>Challenge ${String(i+1).padStart(2,'0')} of 12</small><h3>${h[0]}</h3><div class="ev-row"><b>${h[1]}</b><span>${esc(h[2])} ${EV.m}</span></div><div class="how"><small>How we handle it</small><p>${esc(h[3])}</p></div>`; };
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; show(+b.dataset.i); toDet(d); }));
  show(0);
  onView($('#hd'),async()=>{ for(const i of [1,2,8]){ await sleep(3200); if(user) return; show(i); } },.3);
})();

/* RULE: counting + pipeline */
(()=>{ const MOD=[7,7,6,7,8]; let tok=0;
  const reset=()=>{ $('#cmod').innerHTML=''; $('#ccode').innerHTML=''; };
  async function run(){ const my=++tok; reset();
    for(let i=0;i<5;i++){ await sleep(420); if(my!==tok) return; const m=MOD[i]; $('#cmod').insertAdjacentHTML('beforeend',`<span class="${m===7?'ok':'bad'}">${m}</span>`); $('#ccode').insertAdjacentHTML('beforeend','<span class="ok">7</span>'); } }
  $('#crun').onclick=run;
  onView($('#cnt'),()=>run(),.4);
  const N=[['Flatten','Code','Reads each submission into label, type and value rows, with the agreed data rules applied: ignored content out, hidden-and-empty means not asked.','c'],
   ['Schema','Code','Describes every question on a form version with a stable key. In V0 this was a model call; in V1 code builds it from the definition and matches questions to the previous version.','c'],
   ['Form card','Model · once per form','Claude Opus 5, run once per form version: each question\'s role, priority, which answers mean a problem, and a short guide. Frozen and reused for every later submission.','m'],
   ['Submission artifact','Code + model','Every value is filled by code from the frozen schema. Claude Sonnet 5 only condenses free text and writes up to three observations. Emails, usernames, phones and system ids are withheld from it.','cm'],
   ['Daily view by record','Code','The day\'s input to the writer: one block per record, named by site or asset from the card\'s identity fields, filing window in words. Busy days show 40 records in full, the rest as lines.','c'],
   ['Writers','Model','Claude Opus 5, thinking off, writes the per-submission summary and the daily pulse in a fixed shape, citing the numbered input lines behind every bullet.','m'],
   ['Checks','Code','Every number, date, quote and name is checked against the lines it cites; identifiers and shape are checked too. A failed check flags the summary; it is never silently withheld.','c']];
  const sw=$('#pstages'),det=$('#pdet'); let pt=0,user=false;
  sw.innerHTML=N.map((n,i)=>`<button type="button" class="fp-st ${n[3]}" data-i="${i}"><em>${String(i+1).padStart(2,'0')}</em><b>${n[0]}</b><span>${n[1]}</span></button>`).join('<i class="fp-arr" aria-hidden="true">→</i>');
  const S=$$('#pstages .fp-st');
  const show=i=>{ S.forEach((s,k)=>s.classList.toggle('on',k===i)); det.innerHTML=`<b>${N[i][0]} · ${N[i][1]}.</b> ${N[i][2]}`; };
  det.innerHTML='<b>Light stages are code. Dark stages are a model.</b> Tap a stage, or trace one submission through.';
  S.forEach(s=>s.addEventListener('click',()=>{ user=true; ++pt; show(+s.dataset.i); }));
  async function trace(){ const my=++pt; for(let i=0;i<N.length;i++){ if(my!==pt) return; show(i); await sleep(1500); } if(my===pt){ S.forEach(s=>s.classList.remove('on')); det.innerHTML='<b>Five of seven stages are code.</b> The model is used only where judgement is needed, and its output is checked by code before anyone reads it.'; } }
  $('#ptrace').onclick=()=>{ user=true; trace(); };
  onView($('#pipe'),()=>{ if(!user) trace(); },.4);
})();

/* RECORDS */
(()=>{ const R=[['North Yard','Pump 2','Critical','pump seized'],['Riverside','Seal assembly','High','seal leaking under load'],['Elm Road','Seal assembly','High','weeping seal, drip tray half full'],['Harbor Point','Panel B','Medium','lockout tag missing'],['Mill Lane','Valve 4','Low','stiff handle, greased'],['Quarry Rd','Pump 1','Low','vibration within range']];
  const inp=$('#rin'),out=$('#rout'); let mode='q',tok=0,user=false;
  const sev=s=>`<span class="sv ${s.toLowerCase()}">${s}</span>`;
  async function draw(){ const my=++tok;
    if(mode==='q'){ $('#rinl').textContent='V0 · one line per question, all answers'; const L=[['Site',R.map(r=>r[0])],['System',R.map(r=>r[1])],['Severity',R.map(r=>r[2])],['Description',R.map(r=>`"${r[3]}"`)]];
      inp.innerHTML=L.map((l,i)=>`<div class="fp-ql"><em>L${i+3}</em><b>${l[0]}</b><span>${l[1].map(v=>l[0]==='Severity'?sev(v):`<i>${esc(v)}</i>`).join(' · ')}</span></div>`).join('');
      out.innerHTML=''; await sleep(500); if(my!==tok) return;
      out.innerHTML=`<div class="fp-ob bad"><b>A pump was reported seized and rated Critical.</b> Two seals are leaking. <i class="cite">L5</i><i class="cite">L6</i></div><div class="fp-ob bad"><b>A lockout tag is missing.</b> <i class="cite">L6</i></div><div class="fp-why">✗ Which site? Which pump? "Critical", "pump seized" and "North Yard" sit in three different lists, so the writer cannot link them.</div>`;
      $('#rgain').innerHTML='V0 · daily score before the change: 59%'; }
    else { $('#rinl').textContent='V1 · one block per record, named by code'; inp.innerHTML=R.map((r,i)=>`<div class="fp-rb"><em>L${i+3}</em><b>${r[0]} · ${r[1]}</b>${sev(r[2])}<span>"${esc(r[3])}"</span></div>`).join('');
      out.innerHTML=''; await sleep(500); if(my!==tok) return;
      const O=[['Pump 2 at North Yard seized,','rated Critical.',[3]],['Seal leaks at Riverside and Elm Road,','both rated High.',[4,5]],['Lockout tag missing','on Panel B at Harbor Point.',[6]]];
      for(const o of O){ out.insertAdjacentHTML('beforeend',`<div class="fp-ob good"><b>${o[0]}</b> ${o[1]} ${o[2].map(n=>`<i class="cite">L${n}</i>`).join('')}</div>`); await sleep(350); if(my!==tok) return; }
      out.insertAdjacentHTML('beforeend','<div class="fp-why good">✓ Site, system, severity and description travel together, so every bullet is specific and citable. Routine records (Mill Lane, Quarry Rd) fall to the closing line.</div>');
      $('#rgain').innerHTML=`Iteration 10 · daily score 59% → 65% · the largest single gain ${EV.m}`; } }
  const setV=segBind($('#rvx'),'data-v',(v,u)=>{ if(u) user=true; mode=v; draw(); });
  draw();
  onView($('#rvx'),async()=>{ await sleep(3600); if(user) return; mode='r'; setV('r'); draw(); },.35);
})();

/* FORM CARD */
(()=>{ const Q=[['Station','Text','Identity','—','—','Names each record in the daily view; the raw value is kept beside the clean name.'],
  ['Technician','Person','Identity','—','—','Full names may appear; emails and usernames are withheld from every model by code.'],
  ['Pump running?','Yes / No','Finding','High','No','A "No" means the station is down. Always leads the pulse.'],
  ['Outlet pressure (bar)','Number','Measurement','Medium','Below 6.0 or above 10.0','Out-of-range readings are news; readings in range are routine.'],
  ['Seal condition','Choice','Finding','High','Leaking · Weeping','The most frequent defect on this form.'],
  ['Lockout tag in place?','Yes / No','Finding','High','No','A safety failure: leads whenever it fires.'],
  ['Severity','Choice','Finding','High','Critical · High','Drives the order of bullets and the closing severity split.'],
  ['Notes','Free text','Finding','Medium','—','Condensed by the artifact model; comments travel with their answer.'],
  ['Supervisor sign-off','Signature','Sign-off','Low','Missing','Counted in the closing line; rarely a headline.']];
  const fq=$('#fq'),fc=$('#fcard'); let user=false;
  fq.innerHTML=Q.map((q,i)=>`<button type="button" class="fp-fqi" data-i="${i}"><em>Q${i+1}</em><b>${q[0]}</b><span>${q[1]}</span><i class="pr ${q[3]==='—'?'idf':q[3].toLowerCase()}">${q[3]==='—'?'id':q[3]}</i></button>`).join('');
  const B=$$('#fq .fp-fqi');
  const show=i=>{ const q=Q[i]; B.forEach((b,k)=>b.classList.toggle('on',k===i)); const p={High:3,Medium:2,Low:1}[q[3]]||0;
    fc.innerHTML=`<div class="ch3"><small>Form card · built once by Claude Opus 5</small><b>${q[0]}</b></div><dl><dt>Role</dt><dd><span class="role">${q[2]}</span></dd><dt>Priority</dt><dd><span class="pbar">${[1,2,3].map(k=>`<i class="${k<=p?'on':''}"></i>`).join('')}</span> ${q[3]==='—'?'Identity field':q[3]}</dd><dt>Problem answers</dt><dd>${q[4]==='—'?'<span class="muted">None: never news on its own</span>':q[4].split(' · ').map(x=>`<span class="pa">${esc(x)}</span>`).join('')}</dd><dt>Guide</dt><dd>${esc(q[5])}</dd></dl><div class="lead"><small>Card summary for this form</small><p><b>Lead with:</b> pumps down, safety failures, Critical and High findings. <b>Routine:</b> readings in range, signed-off visits.</p></div>`; };
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; show(+b.dataset.i); toDet(fc); }));
  show(2);
  onView($('#fcx'),async()=>{ for(const i of [5,3,0]){ await sleep(2600); if(user) return; show(i); } },.3);
})();

/* TRUST */
(()=>{ const L=['Window: Thursday 06:40 to 17:15 · 14 submissions · 9 stations','Severity counts: Critical 1 · High 2 · Medium 1 · Low 10','North Yard · Pump 2 · Critical · "pump seized" · unit isolated','North Yard · Parts · replacement impeller ordered','Riverside · Seal assembly · High · "seal leaking under load"','Elm Road · Seal assembly · High · "weeping seal, drip tray half full"','Harbor Point · Panel B · Lockout tag in place? No','Outlet pressure: 12 stations in range · Mill Lane 5.4 bar (minimum 6.0)','Supervisor sign-off: 13 of 14 signed'];
  const B=[['o','<b>14 inspections</b> filed between 06:40 and 17:15 across 9 stations.',[1]],['b','<b>Pump 2 at North Yard seized,</b> rated Critical. The unit is isolated and a replacement impeller is on order.',[3,4]],['b','<b>Seal leaks at Riverside and Elm Road,</b> both rated High.',[5,6]],['b','<b>Lockout tag missing</b> on Panel B at Harbor Point.',[7]],['b','<b>Low outlet pressure at Mill Lane:</b> <span class="num">5.4 bar</span> against a 6.0 minimum.',[8]],['c','Severity: 1 critical, 2 high, 1 medium, 10 low; 13 of 14 visits signed off.',[2,9]]];
  const body=$('#tbody'),lines=$('#tlines'),chk=$('#tchecks'); let broken=false,sel=-1,user=false;
  lines.innerHTML=L.map((l,i)=>`<li data-l="${i+1}"><em>L${i+1}</em><span>${esc(l)}</span></li>`).join('');
  function draw(){ body.innerHTML=B.map((b,i)=>{ let t=b[1]; if(broken&&i===4) t=t.replace('5.4 bar','<mark class="wrong">4.5 bar</mark>'); return `<button type="button" class="fp-tb ${b[0]} ${i===sel?'sel':''}" data-i="${i}">${b[0]==='b'?'<i class="dot"></i>':''}<span>${t} ${b[2].map(n=>`<i class="cite">L${n}</i>`).join('')}</span></button>`; }).join('');
    $$('#tbody .fp-tb').forEach(e=>e.addEventListener('click',()=>{ user=true; sel=+e.dataset.i; draw(); }));
    const C=sel>=0?B[sel][2]:[]; $$('#tlines li').forEach(li=>li.classList.toggle('on',C.includes(+li.dataset.l)));
    const items=[['Numbers on their cited lines',!broken,broken?'numbers:1 · "4.5" is on no input line':'every number found on a cited line'],['Times and dates match the window',true,'06:40 and 17:15 are on L1'],['Quotes are exact',true,'no quoted spans changed'],['No identifiers in the text',true,'no ids, emails, usernames or phones'],['Shape',true,'opening line, 4 bullets, closing split']];
    chk.innerHTML=`<small>Code checks on this pulse</small>${items.map(c=>`<div class="ck ${c[1]?'ok':'bad'}"><b>${c[1]?'✓':'⚑'} ${c[0]}</b><span>${c[2]}</span></div>`).join('')}<div class="st ${broken?'bad':'ok'}">Status: <b>${broken?'flagged':'ok'}</b> · ${broken?'delivered with its flag, never silently withheld':'delivered'}</div>`;
    $('#tbreak').textContent=broken?'↺ Undo the error':'⚠ Slip in a wrong number'; }
  $('#tbreak').onclick=()=>{ user=true; broken=!broken; sel=broken?4:sel; draw(); };
  draw();
  onView($('#trx'),async()=>{ for(const i of [1,2,4]){ await sleep(2000); if(user) return; sel=i; draw(); } await sleep(2000); if(user) return; broken=true; draw(); await sleep(3500); if(user) return; broken=false; draw(); },.3);
})();

/* EVALUATION funnel */
(()=>{ let v='v0',j='len',user=false; const f=$('#ffun');
  function draw(){ const sum={v0:{strict:44,len:49},v1:{strict:63,len:73}}[v][j],view=v==='v0'?81:93,sub=v==='v0'?61:79;
    const rows=[...(v==='v0'?[['In the submission artifacts',94,'original judge','m']]:[]),['Reaching the daily writer',view,'lenient judge','m'],['In the daily summary',sum,j==='len'?'lenient judge':'original judge','m'],['In the per-submission summary',sub,'lenient judge','m']];
    f.innerHTML=rows.map((r,i)=>`<div class="fp-fr ${i===rows.length-2?'key':''}"><span>${r[0]}</span><div><i style="width:${r[1]}%"></i><s style="left:70%;width:10%" title="V1 target 70 to 80%"></s></div><b>${r[1]}%</b><small>${r[2]}</small></div>`).join('')+'<div class="fp-fleg"><s></s> V1 target, 70 to 80% of approved facts</div>';
    $('#fnote').innerHTML=v==='v0'?`<b>The finding that saved weeks.</b> Capture was not the problem: 94% of approved facts were in the artifacts and 81% reached the writer, but only ${sum}% survived into the summary. The rollup lost 13 facts; selection and writing lost 65, five times as many. So V1 went straight at selection and writing.`:`<b>V1 frozen, 20 October.</b> 93% of facts now reach the writer and ${sum}% reach the daily summary (${j==='len'?'+24':'+19'} points); per-submission summaries rose to 79%, ahead of V0 on all 21 approved cases. ${j==='strict'?'Even under the original strict judge, the gain holds.':'Under the original strict judge the gain is 44% → 63%.'} ${EV.m}`; }
  segBind($('#fun'),'data-f',x=>{ user=true; v=x; draw(); }); segBind($('#fun'),'data-j',x=>{ user=true; j=x; draw(); });
  draw();
  onView($('#fun'),async()=>{ await sleep(4200); if(user) return; v='v1'; $$('#fun button[data-f]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.f==='v1')); draw(); },.35);
})();

/* JOURNEY */
(()=>{ const J=[['First V1 build','Every change at once, with a large card','Below V0; set aside',35,'x'],['V0 baseline again','V0 run twice at temperature 0','Baseline and noise band',45,'b'],['Schema by code','Schema from the definition; judgement moved to a small card','Kept',45,'k'],['Rollup losses','Values, record detail and comments carried into the daily view','Kept',45,'k'],['V1 on all 7 days','First full measure','Measured',47,'b'],['Form guide to writer','A written per-form guide','No gain; reverted',47,'x'],['Form card v0.2','Priority and problem answers per question','Kept',51,'k'],['Writer drafts','Prompt drafts read side by side','Kept',53,'k'],['Gap review','Every missed fact traced to its cause','Record names kept',59,'k'],['Daily view by record','One block per record','Kept · biggest gain',65,'k'],['Writer shape','Shape rules, clean site names, window in words','Kept',68,'k'],['Writer model','Opus with and without thinking, and Sonnet, compared','Opus 5, thinking off',73,'k'],['The judge','Lenient judge added; both applied to V0 and V1','Headline judge from here · V0 49%, V1 71%',71,'b'],['Submission summaries','Per-record writer given the whole record','Kept · submissions 61% → 76%',71,'k'],['Density','Eight writing rules, noise band, V0 control','Kept · 72%; submissions 79%',72,'k'],['Review fixes','Durations in hours, V1 checks, no subject line','3 kept, 1 left off',72,'k'],['Freeze','Configuration file, snapshot, tag, all 28 days regenerated','V1 frozen 20 Oct · 73%; submissions 79%',73,'k']];
  const svg=$('#jsvg'),dots=$('#jdots'),det=$('#jdet'),W=680,H=260,X=i=>30+i*(W-60)/16,Y=v=>H-30-(v-30)/(80-30)*(H-60); let sel=16,tok=0,user=false;
  svg.innerHTML=`<rect x="20" y="${Y(80)}" width="${W-40}" height="${Y(70)-Y(80)}" fill="rgba(212,242,3,.25)"/>${[40,50,60,70,80].map(v=>`<line x1="20" x2="${W-20}" y1="${Y(v)}" y2="${Y(v)}" stroke="#e3e9ee"/><text x="2" y="${Y(v)+4}" font-size="10" fill="#718695">${v}%</text>`).join('')}<line x1="${X(12)-14}" x2="${X(12)-14}" y1="14" y2="${H-24}" stroke="#718695" stroke-dasharray="4 4"/><text x="${X(12)-10}" y="22" font-size="10" fill="#718695">lenient judge from here</text><polyline id="jline" fill="none" stroke="#027377" stroke-width="3" points="${J.map((j,i)=>`${X(i)},${Y(j[3])}`).join(' ')}"/>`;
  dots.innerHTML=J.map((j,i)=>`<button type="button" class="fp-jd ${j[4]}" data-i="${i}" style="left:${X(i)/W*100}%;top:${Y(j[3])/H*100}%" aria-label="Iteration ${i+1}: ${esc(j[0])}, ${j[3]}%"><span>${i+1}</span></button>`).join('');
  const D=$$('#jdots .fp-jd'),line=$('#jline'),len=line.getTotalLength?line.getTotalLength():1000;
  const show=i=>{ sel=i; D.forEach((d,k)=>d.classList.toggle('on',k===i)); const j=J[i]; det.innerHTML=`<div class="jh"><em>Iteration ${i+1} of 17</em><b>${j[0]}</b><strong>${j[3]}%</strong></div><p><span>What changed:</span> ${esc(j[1])}</p><p class="res ${j[4]}"><span>Result:</span> ${esc(j[2])}</p>`; };
  D.forEach(d=>d.addEventListener('click',()=>{ user=true; ++tok; show(+d.dataset.i); }));
  async function play(){ const my=++tok; line.style.transition='none'; line.style.strokeDasharray=len; line.style.strokeDashoffset=len; D.forEach(d=>d.classList.add('hid')); line.getBoundingClientRect(); line.style.transition=RM?'none':'stroke-dashoffset 6.5s linear'; line.style.strokeDashoffset=0;
    for(let i=0;i<J.length;i++){ if(my!==tok){ D.forEach(d=>d.classList.remove('hid')); line.style.strokeDashoffset=0; return; } D[i].classList.remove('hid'); show(i); await sleep(380); } }
  $('#jplay').onclick=()=>{ user=true; play(); };
  show(16);
  onView($('#jr'),()=>{ if(!user) play(); },.35);
})();

/* ARCHITECTURE */
(()=>{ const I=[['Schema request','→','A form version is published; in bulk at onboarding','Sync; async for large forms'],['Submission request','→','A submission, or a new version of one, is processed','Sync; async past the timeout'],['Form-card request','→','Weekly per enabled form with a new version; corrections','Async'],['Customer-card request','→','Monthly; at onboarding','Async'],['Generate-pulse request','→','On the client\'s schedule, one per form','Async'],['Result callback','←','An async run finishes or fails','Push, acknowledged, retried'],['Error','←','Validation fails or a prerequisite is missing','In the response']];
  const N=[['Intake','API Gateway · Lambda','Validates each request against its JSON Schema, writes a run record, and answers within a 25-second sync window or with a run id.',''],['Work queue','SQS','Holds async work and model-service retries, with a dead-letter queue.',''],['Schema builder','Lambda','Builds the schema by code, matching questions to the previous version.',''],['Form-card builder','Lambda · Bedrock Opus 5','Builds the card per form version, weekly.','ai'],['Artifact & summary worker','Lambda · Bedrock','Fills values by answer id, condenses text, writes the per-submission summary, runs checks.','ai'],['Pulse builder','Lambda · Bedrock','Rolls up the listed submissions across versions, builds the record view, writes the daily pulse.','ai'],['Customer-card builder','Lambda · Bedrock · V2','Monthly card per customer, built from its form cards. Planned for V2.','ai wip'],['Callback adapter','Lambda','Delivers async results exactly once, with backoff.',''],['Stores','S3 · MySQL index','Encrypted, versioned S3 objects with public access blocked and TLS only; index rows in the client\'s MySQL.',''],['Telemetry','CloudWatch · Langfuse','A ledger row per model call, structured logs with ids and counts only, alarms and traces.','']];
  $('#aint').innerHTML=I.map((x,i)=>`<button type="button" class="fp-int ${x[1]==='←'?'back':''}" data-i="${i}"><i>${x[1]}</i><b>${x[0]}</b></button>`).join('');
  $('#anodes').innerHTML=N.map((n,i)=>`<button type="button" class="fp-node ${n[3]}" data-n="${i}"><b>${n[0]}</b><span>${n[1]}</span></button>`).join('');
  const det=$('#adet'),IB=$$('#aint .fp-int'),NB=$$('#anodes .fp-node'); let user=false;
  const clr=()=>{ IB.forEach(b=>b.classList.remove('on')); NB.forEach(b=>b.classList.remove('on')); };
  const showI=i=>{ clr(); IB[i].classList.add('on'); const x=I[i]; det.innerHTML=`<b>${x[0]} · ${x[1]==='→'?'client to runtime':'runtime to client'}.</b> Sent when: ${esc(x[2])}. Mode: ${esc(x[3])}.`; };
  const showN=i=>{ clr(); NB[i].classList.add('on'); const n=N[i]; det.innerHTML=`<b>${n[0]} · ${n[1]}.</b> ${esc(n[2])}${n[3].includes('wip')?' '+EV.x:''}`; };
  IB.forEach(b=>b.addEventListener('click',()=>{ user=true; showI(+b.dataset.i); }));
  NB.forEach(b=>b.addEventListener('click',()=>{ user=true; showN(+b.dataset.n); }));
  $('.fp-node.cl').addEventListener('click',()=>{ user=true; clr(); det.innerHTML='<b>The client\'s platform.</b> Owns data access, storage, scheduling, recipients, email delivery and the front end. It triggers; the runtime builds.'; });
  det.innerHTML='<b>Seven interactions cross the boundary.</b> Tap any of them, or any runtime component. Infrastructure is defined in CloudFormation and deployed by the client\'s own CI pipeline.';
  onView($('#arx'),async()=>{ for(const i of [1,4,5]){ await sleep(2200); if(user) return; showI(i); } await sleep(2200); if(user) return; showN(5); },.3);
  const F=[['Submission arrives before its form schema','A clear schema_missing error and a contract alert. Never a silent gap.'],['Model service unavailable or throttled','Queued and retried for up to 6 hours (proposed), then failed by callback.'],['A summary fails a check','Delivered with its flags, never silently withheld.'],['Input over the size guard','No model call; reported as capped.'],['Submission past the sync timeout','Accepted with a run id; the result is delivered by callback exactly once.'],['Callback not acknowledged','Retried with backoff, then an alert. The result is kept.'],['A burst of pulse requests in the same hour','The work queue absorbs it; output budgets per call; requests spread across the hour.']];
  $('#ftabs').innerHTML=F.map((x,i)=>`<button type="button" data-i="${i}" aria-pressed="${i===0}">${x[0]}</button>`).join('');
  const showF=i=>{ $$('#ftabs button').forEach((b,k)=>b.setAttribute('aria-pressed',k===i)); $('#fout').innerHTML=`<b>→</b> ${esc(F[i][1])}`; };
  $$('#ftabs button').forEach(b=>b.addEventListener('click',()=>showF(+b.dataset.i)));
  showF(0);
})();

/* RESULTS */
(()=>{ const R=[['Daily summary','lenient judge',49,73,'+24 points'],['Daily summary','original judge',44,63,'+19 points'],['Per-submission summary','lenient judge',61,79,'+18 · ahead on all 21'],['Facts reaching the daily writer','lenient judge',81,93,'+12 points']];
  const box=$('#resx');
  box.innerHTML=R.map(r=>`<div class="fp-rt"><div class="rh2"><b>${r[0]}</b><span>${r[1]}</span></div><div class="br v0"><span>V0</span><div><i data-w="${r[2]}"></i></div><b>${r[2]}%</b></div><div class="br v1"><span>V1</span><div><i data-w="${r[3]}"></i><s></s></div><b>${r[3]}%</b></div><em>${r[4]}</em></div>`).join('')+`<div class="fp-rt t"><b>Inside the 70–80% V1 target</b><span>agreed in October, and met. Unsupported claims: under one per daily summary, judged claim by claim. ${EV.m}</span></div>`;
  onView(box,()=>$$('#resx i[data-w]').forEach(i=>i.style.width=i.dataset.w+'%'),.3);
  const r=$('#krange');
  const money=c=>c>=100?'$'+(c/100).toFixed(2):Math.round(c)+'¢';
  function draw(){ const n=+r.value,v0=n*(.56+.84)+2.3,v1=n*(.62+3)+6.6,vd=n*.62+6.6,mx=Math.max(v1,1);
    $('#knum').textContent=n; $('#kv0').textContent=money(v0)+' / day'; $('#kv1').textContent=money(v1)+' / day'; $('#kvd').textContent=money(vd)+' / day';
    $('#kb0').style.width=v0/mx*100+'%'; $('#kb1').style.width='100%'; $('#kbd').style.width=vd/mx*100+'%';
    $('#knote').innerHTML=`At <b>${n}</b> submissions a day, V1 with every submission summarised costs about <b>${money(v1)}</b> a day for this form (<b>${money(v1*30)}</b> a month); the daily pulse alone costs about <b>${money(vd)}</b>. Most of V1's extra cost is the per-submission summary on Opus, and bringing it under the 3-cent target is the first V2 experiment. ${EV.x}`; }
  r.addEventListener('input',draw); draw();
})();

/* NEXT: timeline, targets, benefits, limits, lessons */
(()=>{ const T=[['16–30 Sep','Kickoff, data landscape and form profiling, contracts, architecture, cost model, KPIs. Stage 1 signed off.','done'],['30 Sep – 13 Oct','V0 built, measured and handed over; review site; gold set built and approved.','done'],['14–20 Oct','V0 baseline scored; 17 V1 iterations; V1 frozen; next gold set (G2) approved.','done'],['22–24 Oct','V1 close presentation to product leadership; merge to main; Stage 2 exit.','prog'],['26–30 Oct','Integration layer (intake, queue, retries, callbacks, traces); second iteration; G2 reviews; launch-set backfill.','exp'],['2–6 Nov','User acceptance testing in the client\'s UAT path, fixes behind switches only.','exp'],['9–11 Nov','Production release, monitoring and handover: cost model, runbooks, training walkthrough.','exp'],['Nov – Dec','30 days of hypercare; V2 customer card.','exp']];
  const K=[['Approved facts in the daily summary','V1 70–80% · V2 80%+','73%'],['Approved facts per submission','V2 80%+','79%'],['Summaries with no citation flag','95%+','under one unsupported claim a day'],['Identifier leak','0%','enforced in code'],['Latency p95 per submission','under 15 s','10.8 s on V0'],['Cost per submission, artifact and summary','3¢ or less','3.6¢ on V1'],['Run success rate','99%+','from Stage 3']];
  const L={done:['Done','done'],prog:['In progress','prog'],exp:['Expected','exp']};
  $('#tlx').innerHTML=`<div class="fp-tline">${T.map(t=>`<div class="fp-ti ${t[2]}"><i></i><em>${t[0]}</em><p>${esc(t[1])}</p><span class="ts ${L[t[2]][1]}">${L[t[2]][0]}</span></div>`).join('')}</div>
    <div class="fp-side"><div class="fp-g2"><small>The next yardstick · G2</small><b>Reviewers pick and rank; nobody types</b><ol><li><b>Blind pick and rank.</b> The reviewer ticks the facts that belong and ranks the top five, before seeing our proposal.</li><li><b>Adjust the proposal.</b> Drop, add and reorder the V1 bullets.</li><li><b>Missing box.</b> Anything not on the list becomes a V2 requirement.</li></ol><p>About 10 minutes per day, against a week of reviewer time for the first gold set.</p></div>
    <div class="fp-kpi"><small>Targets at and after go-live</small>${K.map(k=>`<div><span>${k[0]}</span><b>${k[1]}</b><em>today: ${k[2]}</em></div>`).join('')}<p>${EV.x} targets · today's values ${EV.m}</p></div></div>`;
  const BN=[[['Clarity in minutes, not hours','One daily pulse replaces opening 3 to 49 submissions a form.'],['The right thing first','Safety findings, failures and decisions needed today lead; routine work closes.'],['Numbers they can trust','Every count comes from code, and every bullet cites the answers it came from.'],['Works on their own forms','No template setup: the form card is built automatically.'],['Their choice of cadence','Per submission and daily from one pipeline, weekly to follow.'],['Privacy by design','Data never leaves the platform\'s account; identifiers never reach a model.']],
   [['A flagship AI feature','A clear reason to stay on, or move up to, the top two tiers.'],['The strategy, shipped','Turns the "surface" move of the field intelligence flywheel into a product.'],['A reusable context layer','Form and customer cards that future AI features build on.'],['Predictable unit economics','Cost measured per call, with model choice, opt-in and fair-usage levers.'],['Quality that can be proven','Gold sets, fact funnel, noise band and the V0 gate show whether quality held before release.'],['In-house capability','The client\'s engineers already run the pipeline and own the code.']],
   [['Revenue expansion','A differentiated AI capability in the top tiers supports upsell and pricing power.'],['Retention','Managers who rely on a daily pulse engage every day, not only technicians.'],['Margin discipline','Unit cost per call, with controls that keep the feature margin-positive.'],['Speed to the next AI feature','Context layer, evaluation harness and observability are reusable.'],['Defensibility','Every form card deepens a proprietary layer of knowledge about customers\' operations.'],['Execution risk','Fixed scope, staged gates, measured evidence at each step, capability left in-house.']]];
  const bb=$('#bbody');
  const showB=i=>{ $$('#ben .fp-btabs button').forEach((b,k)=>b.setAttribute('aria-selected',k===i)); bb.innerHTML=BN[i].map(x=>`<div><b>${x[0]}</b><span>${esc(x[1])}</span></div>`).join('')+`<p>${EV.x} benefits, to be replaced with measured results after go-live.</p>`; };
  $$('#ben .fp-btabs button').forEach(b=>b.addEventListener('click',()=>showB(+b.dataset.b))); showB(0);
  const LM=[['A day with more than 40 problem records loses facts; one approved day scores below V0 for this reason.','A token budget that shortens record blocks instead of dropping them.'],['Day-level counts (per status, project, missing field) are under-reported.','A counts block computed by code: already built, switched off, to be measured.'],['Routine numeric answers on high-priority fields do not reach the daily writer.','A numeric-values switch.'],['The daily pulse runs about 285 words against a 260-word budget.','Density and length tuning in the second iteration.'],['V1 costs about three times V0 per submission.','Sonnet with card priorities tested against Opus on G2; prompt caching on the form card.'],['About one approved fact in ten is unreachable by design.','Captured by the G2 missing box; feeds the V2 customer card and multi-day context.']];
  $('#lim').innerHTML=LM.map(l=>`<div><span class="l">${esc(l[0])} ${EV.m}</span><i>→</i><span class="f">${esc(l[1])} ${EV.x}</span></div>`).join('');
  const C=[['Measure where facts are lost','Not just a score.','The fact funnel','It showed the writing step, not data capture, was the bottleneck.'],['One change at a time','Everything at once scored below the baseline.','Switched, single changes','Each could be measured, diagnosed and kept or reverted.'],['Let code do what code does well','Models are not reliable counters.','Counts, values and layout in code','Summaries became exact, and cost stayed down.'],['Context is about selection','Almost every fact was already in the data.','Knowing what matters','The agent lacked which facts matter on each form, not the facts.'],['Managers think in records','The day was laid out by question.','One block per record','The largest single gain of any iteration.'],['The input decides more than the prompt','Prompt edits alone plateaued.','Give the writer the whole record','The per-submission writer gained 15 points.'],['Build the yardstick with the client','Quality arguments are slow.','Gold set approved by their leaders','Every result was credible, and disagreements were quick to settle.'],['Decide in writing, early','A fast co-build across time zones.','35+ decision records','What was decided, by whom and why kept everyone aligned.']];
  const f=$('#flip'); f.innerHTML=C.map((c,i)=>`<button type="button" class="sy-fc" aria-pressed="false" aria-label="${esc(c[0])}: flip"><span class="in"><span class="fa"><small>Lesson ${i+1}</small><b>${c[0]}</b><span class="tx">${c[1]}</span><span class="go">Flip ↻</span></span><span class="ba"><small>What we did</small><b>${c[2]}</b><span class="tx">${c[3]}</span><span class="go">↻ Back</span></span></span></button>`).join('');
  const cards=$$('#flip .sy-fc'); let user=false;
  cards.forEach(c=>c.addEventListener('click',()=>{ user=true; const on=!c.classList.contains('on'); c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }));
  $('#flipall').onclick=()=>{ user=true; const on=!cards.every(c=>c.classList.contains('on')); cards.forEach(c=>{ c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }); $('#flipall').textContent=on?'Show the lessons':'Flip all cards'; };
})();
