__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const onView=(el,fn,th=.35)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const visible=(el,cb)=>{ new IntersectionObserver(es=>cb(es[0].isIntersecting),{threshold:.15}).observe(el); };
const pkr=v=>{ v=Math.round(v*100)/100; return '$'+v.toLocaleString('en-US',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2}); };
const IMG={"web": "/images/case-studies/lms-01-website.webp", "form": "/images/case-studies/lms-02-admission-form.webp", "login": "/images/case-studies/lms-03-login.webp", "super": "/images/case-studies/lms-04-superadmin-fees.webp", "admin": "/images/case-studies/lms-05-admin-classes.webp", "coord": "/images/case-studies/lms-06-coordinator-dashboard.webp", "teacher": "/images/case-studies/lms-07-teacher-assessments.webp", "parent": "/images/case-studies/lms-08-parent-calendar.webp", "student": "/images/case-studies/lms-09-student-dashboard.webp", "verify": "/images/case-studies/lms-10-lecture-verifications.webp", "res": "/images/case-studies/lms-11-learning-resources.webp", "lib": "/images/case-studies/lms-12-parent-library.webp", "vposter": "/images/case-studies/lms-v-poster.webp", "vchap": "/images/case-studies/lms-v-chapters.webp", "video": "/images/case-studies/lms-ai-lesson.mp4"};

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.12});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* HERO: the record that grows */
(()=>{ const ST=[
   {n:'Enquiry',s:'interested · new',f:[['Child','Sarah A.'],['Parent','Hannah A. (mother)'],['Source','Contact form']]},
   {n:'Interview',s:'interview submitted',f:[['Parent interview','Submitted ✓',1]]},
   {n:'Admission form',s:'new_lead',f:[['Class','Prep-I'],['Documents','ID documents · photo']]},
   {n:'Voucher',s:'voucher_created',f:[['Voucher','LMS-202610-0108'],['Total due','$120']]},
   {n:'Verified',s:'fee_verified',f:[['Payment','Approved by coordinator',1]]},
   {n:'Accounts',s:'access_granted',ok:1,f:[['Roll no.','PR1-0108'],['Logins','Sent to parent ✓',1]]},
   {n:'Live learning',s:'access_granted',ok:1,f:[['First lecture','English · Mon 10:30',1,1]]}];
  const tr=$('#rtrack'),fill=$('#rfill'),fs=$('#rfields'),st=$('#rstat'),stage=$('#rstage');
  tr.insertAdjacentHTML('beforeend',ST.map(s=>`<span class="lm-st"><i></i><span>${s.n}</span></span>`).join('')); const D=$$('#rtrack .lm-st');
  const field=([k,v,g,w],anim)=>`<div class="lm-f${g?' g':''}${w?' wide':''}"${anim?'':' style="animation:none"'}><span>${k}</span><b>${v}</b></div>`;
  function show(k,anim){ D.forEach((d,i)=>{ d.classList.toggle('done',i<k); d.classList.toggle('on',i===k); }); fill.style.width=(k/(ST.length-1)*88)+'%';
    fs.innerHTML=ST.slice(0,k+1).map((s,i)=>s.f.map(f=>field(f,anim&&i===k)).join('')).join(''); st.textContent=ST[k].s; st.classList.toggle('ok',!!ST[k].ok); stage.textContent=`Stage ${k+1} of ${ST.length} · ${ST[k].n}`; }
  show(ST.length-1,false); if(RM) return;
  let vis=true; visible($('#rec'),v=>vis=v);
  (async()=>{ await sleep(1200); while(true){ for(let k=0;k<ST.length;k++){ while(!vis) await sleep(400); show(k,true); await sleep(k===ST.length-1?3600:1500); } } })();
})();

/* PROBLEM: patchwork */
(()=>{ const T=[
   {k:'web',e:'🌐',t:'Website contact form',s:'Enquiries land in an inbox',b:['leads'],x:4,y:6,r:-3},
   {k:'wa',e:'💬',t:'WhatsApp groups',s:'Follow-ups and Meet links in chats',b:['follow-up','Meet links'],x:52,y:4,r:2},
   {k:'xls',e:'📊',t:'Fee register spreadsheet',s:'Hand-kept dues and discounts',b:['fees','dues'],x:6,y:38,r:2},
   {k:'paper',e:'🗂️',t:'Paper admission files',s:'Forms and ID copies',b:['admissions','documents'],x:50,y:40,r:-2},
   {k:'meet',e:'🎥',t:'Google Meet',s:'Classes happen, but nothing is recorded',b:['lectures'],x:26,y:70,r:1}];
  const Q=[{q:'Which leads went cold this month?',need:['web','wa'],a:'Interested-students pipeline with 10/20/30-day reminders'},
   {q:'Who still owes last month’s fee?',need:['xls','wa'],a:'Fee history with carry-forward, per family'},
   {q:'Did Thursday’s English lecture happen?',need:['meet','wa'],a:'Verified lecture with attendance and recording'},
   {q:'Where is this child’s admission?',need:['paper','web','xls'],a:'One admission record with its status'}];
  const desk=$('#desk'),qs=$('#qs'),btn=$$('#patch .seg button');
  desk.insertAdjacentHTML('beforeend',T.map(t=>`<div class="lm-tool" data-k="${t.k}" style="left:${t.x}%;top:${t.y}%;transform:rotate(${t.r}deg)"><b><em>${t.e}</em>${t.t}</b><small>${t.s}</small><div class="bits">${t.b.map(x=>`<i>${x}</i>`).join('')}</div></div>`).join(''));
  const tools=$$('#desk .lm-tool');
  qs.insertAdjacentHTML('beforeend',Q.map((q,i)=>`<button type="button" class="lm-q" data-i="${i}"><b>${q.q}</b><span class="ans"></span></button>`).join(''));
  const qb=$$('#qs .lm-q'); let mode='before',cur=0,user=false;
  function layout(){ const one=mode==='after'; desk.classList.toggle('one',one); const H=desk.clientHeight;
    tools.forEach((t,i)=>{ if(one){ t.style.top=(30+i*((H-42)/T.length))+'px'; } else { t.style.top=T[i].y+'%'; t.style.transform=`rotate(${T[i].r}deg)`; } }); }
  function ask(i){ cur=i; const q=Q[i]; qb.forEach((b,k)=>b.classList.toggle('on',k===i));
    tools.forEach(t=>t.classList.toggle('hit',q.need.includes(t.dataset.k)));
    qb.forEach((b,k)=>{ const a=b.querySelector('.ans'); if(k!==i){ a.textContent=''; a.className='ans'; return; }
      if(mode==='before'){ a.className='ans no'; a.textContent='✕ Check '+q.need.length+' tools and ask around'; } else { a.className='ans yes'; a.textContent='✓ '+q.a; } }); }
  function setMode(m){ mode=m; btn.forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===m)); layout(); ask(cur); }
  btn.forEach(b=>b.addEventListener('click',()=>{ user=true; setMode(b.dataset.v); }));
  qb.forEach(b=>b.addEventListener('click',()=>{ user=true; ask(+b.dataset.i); }));
  addEventListener('resize',layout); setMode('before');
  onView($('#patch'),async()=>{ if(RM) return; let k=0; while(!user){ for(const m of ['before','after']){ if(user) return; setMode(m); for(let i=0;i<2;i++){ if(user) return; ask((k+i)%Q.length); await sleep(1900); } } k+=2; } },.35);
})();

/* PORTALS */
(()=>{ const R=[
   {k:'superadmin',n:'Super Admin',img:'super',cap:'<b>Fee management and payment setup:</b> class fees, extra charges, payment methods and global settings.',nav:['Dashboard','Plan for Month','Educational Documents','Library','All Events Calendar','Public Events','Internal Events','Event Registrations','Interested Students','Parent Interview Forms','Admission Records','Scholarship','Fee Management','Payments','Careers','User Management','Students','Parents','Subject Catalog','Class Management','Notes','Headlines','Audit History','Sent Emails']},
   {k:'admin',n:'Admin',img:'admin',cap:'<b>Class management:</b> approved class levels, assigned subjects and related lecture activity.',nav:['Dashboard','Plan for Month','Educational Documents','Library','All Events Calendar','Public Events','Internal Events','Event Registrations','Interested Students','Parent Interview Forms','Admission Records','Scholarship','Payments','Careers','User Management','Subject Catalog','Class Management','Notes','Headlines','Audit History','Sent Emails']},
   {k:'coordinator',n:'Coordinator',img:'coord',cap:'<b>Coordinator command center:</b> registrations, interview forms, pending vouchers and active students by class.',nav:['Dashboard','Plan for Month','Educational Documents','All Events Calendar','Public Events','Internal Events','Event Registrations','Interested Students','Parent Interview Forms','Admission Records','Scholarship','Monthly Fee Vouchers','Payments','Fee History','Students','Parents','Create Teacher','Teacher Assignments','Lecture Schedules','Lecture Verifications','Library','Reports','Sent Emails']},
   {k:'teacher',n:'Teacher',img:'teacher',cap:'<b>Early-years assessments:</b> section-by-section assessment forms submitted for coordinator review.',nav:['Dashboard','Events Calendar','Lectures','Attendance','Students','Homework','Approve Homework','Library','Notes','Profile']},
   {k:'parent',n:'Parent',img:'parent',cap:'<b>Events calendar:</b> public and internal school events alongside the child’s classes.',nav:['Dashboard','Events Calendar','Lectures','Homework','Attendance','Library','Notes','Fees','Profile']},
   {k:'student',n:'Student',img:'student',cap:'<b>Student dashboard:</b> the month’s plan, academic calendar and upcoming events.',nav:['Dashboard','Lectures','Calendar','Homework','Attendance','Notes','Fees','Profile']}];
  const roles=$('#roles'),side=$('#side'),img=$('#simg'),url=$('#surl'),cap=$('#scap');
  roles.innerHTML=R.map(r=>`<button type="button" data-k="${r.k}" aria-pressed="false">${r.n}</button>`).join(''); const B=$$('#roles button');
  let user=false;
  function show(k){ const r=R.find(x=>x.k===k); B.forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===k));
    side.innerHTML=`<div class="who"><b>${r.n}</b><span>${r.nav.length} pages</span></div>`+r.nav.map((n,i)=>`<a href="#portals" tabindex="-1" style="animation-delay:${i*25}ms">${n}</a>`).join('');
    img.style.animation='none'; void img.offsetWidth; img.style.animation=''; img.src=IMG[r.img]; img.alt=r.n+' portal: '+cap.textContent; url.textContent='lms.school.example/'+r.k; cap.innerHTML=r.cap; img.alt=r.n+' portal screen'; }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; show(b.dataset.k); }));
  show('coordinator'); const order=R.map(r=>r.k); let i=2;
  onView(roles,()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); i=(i+1)%order.length; show(order[i]); },3600); },.4);
})();

/* ADMISSIONS: wizard + reminders */
(()=>{ const W=[
   {t:'Programme',f:[['Programme','Early Childhood Education (Parent Partnership Model)',1],['Applying for class','Prep-I'],['Starting month','August']]},
   {t:'Student',f:[['Full name','Sarah A.'],['Gender','Female'],['Date of birth','2022-03-14'],['Country / city','United States · Houston'],['Time zone','Central (CT)'],['Religion','Islam']]},
   {t:'Profile',f:[['Strengths','Curious, loves stories',1],['Support needs','None noted'],['Special interests','Drawing, animals'],['Developmental concerns','No'],['Medical conditions','None']]},
   {t:'Parents',f:[['Father','Name · ID · occupation'],['Mother','Hannah A. · ID · occupation'],['WhatsApp','+1 713 •••-••••'],['Email','parent@•••••.com'],['Preferred contact','Mother'],['Learning support person','Mother']]},
   {t:'Readiness',f:[['Device','Laptop with camera',1],['Birth certificate','Uploaded ✓',0,1],['Parent ID','Uploaded ✓',0,1],['Child photograph','Uploaded ✓',0,1],['Medical report','Optional',0,1]]},
   {t:'Declaration',f:[['Declaration','I confirm the information is accurate ✓',1],['On submit','Admission record + fee voucher created',1]]}];
  const S=$('#wsteps'),body=$('#wbody'); S.innerHTML=W.map((w,i)=>`<button type="button" class="lm-ws" role="tab" data-i="${i}"><span class="n">${i+1}</span><span>${w.t}<small>Step ${i+1}</small></span></button>`).join(''); const B=$$('#wsteps .lm-ws');
  let cur=0,user=false;
  function go(i){ cur=i; B.forEach((b,k)=>{ b.classList.toggle('on',k===i); b.classList.toggle('done',k<i); b.setAttribute('aria-selected',k===i); });
    const w=W[i]; body.innerHTML=`<span class="eyebrow">Online school admission form</span><h4>Step ${i+1}: ${w.t}</h4>
      <div class="lm-inp">${w.f.map(([k,v,wd,up],j)=>`<div class="${wd?'w ':''}${up?'up':''}" style="animation-delay:${j*50}ms"><span>${k}</span>${v}</div>`).join('')}</div>
      ${i===4?'<p>Photos over 1 MB are compressed on the phone to about 1600 px before upload.</p>':''}
      <div class="lm-wnav"><button type="button" class="lm-btn" id="wb" ${i===0?'disabled':''}>Back</button><span class="demo-note">Step ${i+1} of 6 · demo data</span><button type="button" class="lm-btn pri" id="wn">${i===5?'Submit ✓':'Next step'}</button></div>`;
    $('#wb').onclick=()=>{ user=true; go(Math.max(0,cur-1)); }; $('#wn').onclick=()=>{ user=true; go(cur===5?0:cur+1); }; }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; go(+b.dataset.i); }));
  go(0); onView($('#wiz'),()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); go((cur+1)%6); },2600); },.4);
  // reminders
  const cal=$('#cal'),rng=$('#day'),log=$('#remlog'); cal.innerHTML='<i></i>'.repeat(31); const C=[...cal.children];
  const EV=[[0,'Day 0','Admission link sent by email; WhatsApp link ready for the coordinator','m0'],[10,'Day 10','Reminder 1 by email and WhatsApp','m1'],[20,'Day 20','Reminder 2 by email and WhatsApp','m2'],[30,'Day 30','Reminder 3; marked not submitted for follow-up','m3']];
  function draw(d){ C.forEach((c,i)=>{ c.className=i<=d?'past':''; const e=EV.find(x=>x[0]===i); if(e&&i<=d) c.className=e[3]; });
    log.innerHTML=EV.filter(e=>e[0]<=d).map(e=>`<div class="${e[0]===30?'bad':''}"><b>${e[1]}</b><span>${e[2]}</span></div>`).join('')+(d<30?`<div class="ok"><b>If submitted</b><span>Reminders stop; the record moves to admission review</span></div>`:''); }
  rng.addEventListener('input',()=>{ ruser=true; draw(+rng.value); }); let ruser=false; draw(30); rng.value=30;
  onView($('#rem'),async()=>{ if(RM) return; for(let d=0;d<=30;d++){ if(ruser) return; rng.value=d; draw(d); await sleep(140); } },.5);
})();

/* FINANCE: voucher + ledger */
(()=>{ const g=id=>$('#'+id); let role='coord';
  const btn=$$('#calc .seg button'); const CAP=20;
  function calc(){ let reg=+g('vRegular').value,adm=+g('vAdm').value,dp=+g('vDisc').value,sch=+g('vSch').value;
    const capped=role==='coord'&&dp>CAP; if(capped){ dp=CAP; g('vDisc').value=CAP; }
    g('capmsg').textContent=role==='coord'?(capped?'Coordinator limit reached: 20% maximum. Switch to Admin to go higher.':'Coordinators can discount up to 20%.'):'Admins can apply larger discounts.';
    const sub=reg+adm, disc=reg*dp/100, tot=Math.max(0,sub-disc-sch);
    g('oRegular').textContent=pkr(reg); g('oAdm').textContent=pkr(adm); g('oDisc').textContent=dp+'%'; g('oSch').textContent=pkr(sch);
    g('voucher').innerHTML=`<span class="stamp">UNPAID</span><h5>SCHOOL · FEE VOUCHER</h5><div class="sub">LMS-202610-0108 · Prep-I · due in 5 days</div>
      <div class="ln"><span>Regular monthly fee</span><span>${pkr(reg)}</span></div><div class="ln"><span>Admission fee</span><span>${pkr(adm)}</span></div><div class="rule"></div>
      <div class="ln"><span>Subtotal</span><span>${pkr(sub)}</span></div><div class="ln m"><span>Discount (${dp}% of regular fee)</span><span>−${pkr(disc)}</span></div><div class="ln m"><span>Scholarship</span><span>−${pkr(sch)}</span></div><div class="rule"></div>
      <div class="ln tot"><span>Total payable</span><span>${pkr(tot)}</span></div><div class="ln"><span>Next monthly fee after discount</span><span>${pkr(reg-disc)}</span></div>
      <div class="formula">total = (regular + admission) − discount − scholarship · never below zero</div>`; }
  ['vRegular','vAdm','vDisc','vSch'].forEach(id=>g(id).addEventListener('input',calc));
  btn.forEach(b=>b.addEventListener('click',()=>{ role=b.dataset.r; btn.forEach(x=>x.setAttribute('aria-pressed',x===b)); g('vDisc').max=role==='coord'?50:50; calc(); }));
  calc();
  // ledger
  const M=['July','August','September','October'], FEE=100; const pay=['full','full','partial','none'];
  const tb=g('lbody'),mini=g('mini'),acc=g('accst');
  function draw(){ let carry=0,html='';
    M.forEach((m,i)=>{ const tot=carry+FEE; const paid=pay[i]==='full'?tot:pay[i]==='partial'?Math.round(FEE*.5):0; const rem=Math.max(0,tot-paid);
      html+=`<tr><td>${m}</td><td class="${carry?'carry':''}">${carry?pkr(carry):'—'}</td><td>${pkr(FEE)}</td><td>${pkr(tot)}</td><td>${paid?pkr(paid):'—'}</td><td class="rem ${rem?'':'z'}">${rem?pkr(rem):'Cleared'}</td></tr>
      <tr><td colspan="6" style="padding:0 10px 8px;border-bottom:1px solid var(--line)"><div class="lm-pay" data-i="${i}">${['full','partial','none'].map(p=>`<button type="button" data-p="${p}" class="${pay[i]===p?'on':''}">${{full:'Paid',partial:'Partial',none:'Unpaid'}[p]}</button>`).join('')}</div></td></tr>`;
      carry=rem; });
    tb.innerHTML=html;
    const locked=pay[M.length-1]!=='full'||carry>0&&pay[M.length-1]!=='full'; mini.classList.toggle('locked',locked); acc.className='lm-accst '+(locked?'bad':'ok'); acc.textContent=locked?'October overdue · access paused':'Access open';
    $$('#lbody .lm-pay button').forEach(b=>b.addEventListener('click',()=>{ user=true; pay[+b.parentNode.dataset.i]=b.dataset.p; draw(); })); }
  let user=false; draw();
  onView(g('ledger'),async()=>{ if(RM) return; await sleep(2200); if(user) return; pay[3]='full'; draw(); },.5);
})();

/* VERIFICATION ENGINE */
(()=>{ const L=[['Parent upload','Proof uploaded on the public payment page'],['Coordinator on behalf','Coordinator has the proof and approves for the parent'],['Scholarship approval','Reduced voucher approved from the scholarship page'],['Voucher fallback','No submission found; proof attached to the voucher']];
  const OA=['Payment and voucher marked verified','Parent account and profile','Student account and profile','Enrolment in the matching class','Roll number assigned','Login details emailed to the parent','Audit log and fee history written'];
  const OM=['Payment and voucher marked verified','Fee history updated, carry-forward recalculated','Monthly approval email sent','LMS access restored if it was paused','No new accounts or logins created','Audit log written'];
  const lanes=$('#lanes'),outs=$('#outs'),core=$('#core'),flow=$('#flow'),tb=$$('#eng .seg button'),title=$('#eng .lm-etop b');
  lanes.innerHTML=L.map((l,i)=>`<button type="button" class="lm-lane" data-i="${i}"><b>${l[0]}</b><span>${l[1]}</span></button>`).join(''); const LB=$$('#lanes .lm-lane');
  let type='adm',run=0,user=false,lane=0;
  function list(){ const O=type==='adm'?OA:OM; outs.innerHTML=O.map(o=>`<div class="lm-out${o.startsWith('No new')?' skip':''}"><i>✓</i><span>${o}</span></div>`).join(''); title.textContent=type==='adm'?'Approving an admission payment':'Approving a monthly fee payment'; }
  async function go(i){ const id=++run; lane=i; LB.forEach((b,k)=>b.classList.toggle('on',k===i)); list(); const O=$$('#outs .lm-out');
    flow.classList.remove('go'); void flow.offsetWidth; flow.classList.add('go'); core.classList.remove('pulse'); void core.offsetWidth; core.classList.add('pulse');
    if(RM){ O.forEach(o=>o.classList.add('on')); return; }
    await sleep(700); for(const o of O){ if(id!==run) return; o.classList.add('on'); await sleep(260); } }
  LB.forEach(b=>b.addEventListener('click',()=>{ user=true; go(+b.dataset.i); }));
  tb.forEach(b=>b.addEventListener('click',()=>{ user=true; type=b.dataset.t; tb.forEach(x=>x.setAttribute('aria-pressed',x===b)); go(lane); }));
  list(); $$('#outs .lm-out').forEach(o=>o.classList.add('on'));
  onView($('#eng'),async()=>{ if(RM) return; let i=0; while(!user){ await go(i%4); await sleep(1800); i++; if(i===4&&!user){ type='mon'; tb.forEach(x=>x.setAttribute('aria-pressed',x.dataset.t==='mon')); } if(i===6&&!user){ type='adm'; tb.forEach(x=>x.setAttribute('aria-pressed',x.dataset.t==='adm')); } } },.35);
})();

/* LEARNING: lecture lifecycle */
(()=>{ const S=[['scheduled','Scheduled','Calendar + Meet created'],['live','Live','Class in progress'],['completed_by_teacher','Taught','Teacher marked conducted'],['verified_by_coordinator','Verified','Coordinator approved']];
  const ls=$('#lstate'); ls.innerHTML=S.map(s=>`<div class="lm-ls"><code>${s[0]}</code><b>${s[1]}</b><span style="font-size:.7rem;color:var(--muted)">${s[2]}</span></div>`).join(''); const LS=$$('#lstate .lm-ls');
  const tmin=$('#tmin'),ot=$('#otmin'),evT=$('#evT'),evR=$('#evR'),evC=$('#evC'),ap=$('#aApprove'),rj=$('#aReject'),ms=$('#aMissed'),rs=$('#aReset'),msg=$('#amsg'),roster=$('#roster');
  const kids=['A','B','C','D','E','F','G','H','I','J','K','L']; const marks=['p','p','p','a','p','p','l','p','p','p','a','p'];
  roster.innerHTML=kids.map(k=>`<i>${k}</i>`).join(''); const RK=[...roster.children];
  $('#thri').style.left=(20/30*100)+'%'; $('#thrs').style.left=(20/30*100)+'%';
  let rec=true,rep=true,state='taught';
  function stateUI(){ const idx={sched:0,live:1,taught:2,verified:3,disputed:2,missed:2}[state];
    LS.forEach((l,i)=>{ l.classList.remove('on','done','bad'); if(i<idx) l.classList.add('done'); if(i===idx) l.classList.add(state==='verified'?'done':(state==='disputed'||state==='missed')?'bad':'on'); });
    if(state==='disputed') LS[3].querySelector('b').textContent='Disputed'; else if(state==='missed') LS[3].querySelector('b').textContent='Missed'; else LS[3].querySelector('b').textContent='Verified';
    if(state==='disputed'||state==='missed') LS[3].classList.add('bad'); }
  function ev(){ const m=+tmin.value; ot.textContent=m+' min'; const present=m>=20; evT.className='st '+(present?'y':'n'); evT.textContent=present?'PRESENT':'ABSENT';
    evR.textContent=rec?'Found ✓':'Not found'; evR.setAttribute('aria-pressed',rec); evC.textContent=rep?'Submitted ✓':'Missing'; evC.setAttribute('aria-pressed',rep);
    const done=state==='verified'||state==='disputed'||state==='missed';
    ap.disabled=!rep||done; rj.disabled=done; ms.disabled=done;
    if(!done){ RK.forEach(r=>r.className=''); msg.textContent=rep?(present?'Ready for review. Teacher attendance, recording and report are in.':'Report is in, but the teacher was in the Meet under 20 minutes. Check before approving.'):'Waiting for the teacher’s completion report before this can be approved.'; } }
  function approve(){ state='verified'; stateUI(); RK.forEach((r,i)=>setTimeout(()=>r.className=marks[i],RM?0:i*70)); msg.textContent='Approved. Pending attendance applied to 12 students; lecture and recording now visible to families.'; ev(); }
  ap.onclick=()=>{ user=true; approve(); }; rj.onclick=()=>{ user=true; state='disputed'; stateUI(); msg.textContent='Rejected: lecture marked disputed and logged for follow-up.'; ev(); };
  ms.onclick=()=>{ user=true; state='missed'; stateUI(); msg.textContent='Marked missed: flagged for review or rescheduling.'; ev(); };
  rs.onclick=()=>{ user=true; state='taught'; stateUI(); ev(); };
  tmin.addEventListener('input',()=>{ user=true; ev(); }); evR.onclick=()=>{ user=true; rec=!rec; ev(); }; evC.onclick=()=>{ user=true; rep=!rep; ev(); };
  let user=false; stateUI(); ev();
  onView($('#life'),async()=>{ if(RM){ approve(); return; } state='sched'; stateUI(); await sleep(900); if(user) return; state='live'; stateUI(); await sleep(1100); if(user) return; state='taught'; stateUI(); ev(); await sleep(1700); if(user) return; approve(); },.4);
})();

/* AI layer */
(()=>{ const A=[['Interested students','The same fixed reminders for every lead, and guesswork on which leads matter','Lead scoring and next-best-action','Ranks leads by likelihood to enrol and drafts the right follow-up on the right channel, replacing fixed reminder buckets.',['admissions','04 · Admissions']],
   ['Parent interview','Reading long free-text answers','Interview summaries and fit signals','Condenses each interview into a one-screen brief, so decisions take minutes.',['admissions','04 · Admissions']],
   ['Admission documents','Eyeballing ID documents and birth certificates','Document verification','OCR reads ID documents and birth certificates and flags mismatches with the admission form.',['admissions','04 · Admissions']],
   ['Fees and scholarships','Reconciling proofs, drafting decisions','Payment reconciliation agent','Matches proofs to vouchers and pre-sorts each as clean, needs review or suspicious before a person looks.',['verify','06 · Payment verification']],
   ['Lectures','Teachers write every completion report themselves','Recording transcripts and summaries','Meet recordings become summaries that pre-fill the teacher’s completion report for review.',['learning','07 · Learning engine']],
   ['Homework','Slow, uneven feedback','AI feedback and assisted grading','First-pass feedback the teacher edits and approves. Never graded blind.'],
   ['Attendance','Raw minutes, no engagement insight','Engagement scoring and at-risk alerts','Flags a child who is quietly disengaging, in time for someone to act.',['learning','07 · Learning engine']],
   ['Support','Coordinators answer the same questions','Grounded assistant for families','Answers “when is the next fee due?” from the family’s own records, strictly scoped by role.'],
   ['Finance','Surprise defaults, reactive gating','Fee-default prediction','Spots families likely to fall behind, so outreach comes before access is paused.',['finance','05 · Finance engine']]];
  const st=$('#aistages'),card=$('#aicard'); st.innerHTML=A.map((a,i)=>`<button type="button" class="lm-ais" role="tab" data-i="${i}">${a[0]}<i>AI →</i></button>`).join(''); const B=$$('#aistages .lm-ais');
  let user=false;
  function show(i){ B.forEach((b,k)=>{ b.classList.toggle('on',k===i); b.setAttribute('aria-selected',k===i); }); const a=A[i];
    card.innerHTML=`<div class="before"><small>Today: human bottleneck</small><b>${a[1]}</b>${a[4]?`<a class="lm-airef" href="#${a[4][0]}">Today's workflow: ${a[4][1]} ↑</a>`:''}</div><div class="arr">→</div><div class="after"><small>AI contribution · designed</small><b>${a[2]}</b><p>${a[3]}</p></div>`; }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; show(+b.dataset.i); })); show(0); let i=0;
  onView(st,()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); i=(i+1)%A.length; show(i); },3000); },.4);
})();

/* PROOF gallery */
(()=>{ const P=[['web','Public website','The school’s front door and enquiry entry point.'],['form','Admission form','Six-step wizard parents complete on a phone.'],['login','Secure sign-in','Email, phone or username, one portal per role.'],['coord','Coordinator dashboard','Registrations, interviews, vouchers, active students.'],['verify','Lecture verifications','Pending, verified and rejected or missed lectures.'],['super','Fee management','Class fees, payment methods and voucher settings.'],['admin','Class management','Class levels, subjects and lecture activity.'],['teacher','Teacher assessments','Section-by-section early-years assessment form.'],['parent','Parent calendar','School events alongside the child’s classes.'],['student','Student dashboard','Illustrated monthly plan and academic calendar.'],['res','Learning resources','Parent guides and the student’s learning command center.'],['lib','Parent library','Class resources, videos and documents by subject.']];
  const g=$('#proofg'); g.innerHTML=P.map((p,i)=>`<button type="button" data-i="${i}"><img src="${IMG[p[0]]}" alt="${p[1]}: ${p[2]}" loading="lazy"><span><b>${p[1]}</b>${p[2]}</span></button>`).join('');
  const lb=$('#lb'),li=$('#lbimg'),lc=$('#lbcap'); let last=null;
  $$('#proofg button').forEach(b=>b.addEventListener('click',()=>{ last=b; const p=P[+b.dataset.i]; li.src=IMG[p[0]]; li.alt=p[1]; lc.textContent=p[1]+' · '+p[2]; lb.hidden=false; $('#lbx').focus(); }));
  const close=()=>{ lb.hidden=true; last&&last.focus(); }; $('#lbx').onclick=close; lb.addEventListener('click',e=>{ if(e.target===lb) close(); }); addEventListener('keydown',e=>{ if(e.key==='Escape'&&!lb.hidden) close(); });
})();

/* RESULTS: report card */
(()=>{ const R=[['Admissions','Every enquiry tracked from contact form to enrolment, with automatic 10/20/30-day follow-up.','Delivered'],
   ['Finance','Vouchers, scholarships and discount caps, monthly batches, carry-forward dues and access tied to payment.','Delivered'],
   ['Teaching','Lectures scheduled with Meet, attendance from Google Workspace, and coordinator-verified delivery.','Delivered'],
   ['Global reach','A fully remote school that families join from any country, with classes timed around their time zones.','Delivered'],
   ['Families','Parents and students see lectures, homework, attendance, documents, notes and fees in their own portal.','Delivered'],
   ['Smart learning','Draw-and-trace, 3D shapes and AI-made lesson videos, alongside visual monthly plans and a class library.','Delivered'],
   ['Operations','Six role portals, a full audit trail, sent-email inspection and secret-protected scheduled jobs.','Delivered'],
   ['Intelligence','AI layer for lead scoring, summaries, reconciliation and a grounded family assistant.','In progress']];
  const box=$('#rrows'); box.innerHTML=R.map((r,i)=>`<div class="lm-rrow" style="animation-delay:${i*70}ms"><h4>${r[0]}</h4><p>${r[1]}</p><span class="lm-grade${r[2]==='In progress'?' wip':''}">${r[2]}</span></div>`).join('');
  const G=$$('#rrows .lm-grade'); if(RM){ G.forEach(g=>g.classList.add('on')); return; }
  G.forEach(g=>g.classList.add('on')); onView($('#report'),()=>{ G.forEach(g=>g.classList.remove('on')); G.forEach((g,i)=>setTimeout(()=>g.classList.add('on'),400+i*350)); },.4);
})();

/* SCHOOL: one class, many time zones */
(()=>{ const C=[['USA','New York','America/New_York'],['UK','London','Europe/London'],['Saudi Arabia','Riyadh','Asia/Riyadh'],['Qatar','Doha','Asia/Qatar'],['UAE','Dubai','Asia/Dubai'],['Pakistan','Karachi','Asia/Karachi']];
  let mine=''; try{ mine=Intl.DateTimeFormat().resolvedOptions().timeZone||''; }catch(e){}
  const rows=C.slice(); if(mine&&!C.some(c=>c[2]===mine)) rows.push(['You','Your time zone',mine,1]);
  const L=$('#tzl'),r=$('#tzr'),o=$('#tzo'),cnt=$('#tzc'),B=$$('#tz .seg button');
  const now=new Date(), base=Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate());
  const fmt={}; const loc=(tz,ms)=>{ try{ fmt[tz]=fmt[tz]||new Intl.DateTimeFormat('en-GB',{timeZone:tz,hour:'2-digit',minute:'2-digit',weekday:'short',hourCycle:'h23'}); const p=fmt[tz].formatToParts(new Date(ms)),g=k=>(p.find(x=>x.type===k)||{}).value; return {h:+g('hour')%24,m:+g('minute'),wd:g('weekday')}; }catch(e){ return null; } };
  const pad=n=>String(n).padStart(2,'0');
  L.innerHTML=rows.map((c,i)=>`<div class="lm-tzr${c[3]?' you':''}" data-i="${i}"><span class="cty"><b>${c[1]}</b><small>${c[0]}</small></span><span class="strip"><i class="win"></i><i class="cls"></i></span><span class="tm"><b>--:--</b><small></small></span></div>`).join('');
  const R=$$('#tzl .lm-tzr');
  function part(h){ return h<5?'Night':h<12?'Morning':h<17?'Afternoon':h<21?'Evening':'Night'; }
  function draw(t){ const ms=base+t*3600e3; o.textContent=pad(Math.floor(t))+':'+(t%1?'30':'00')+' UTC'; let ok=0,n=0;
    R.forEach((el,i)=>{ const v=loc(rows[i][2],ms); if(!v){ el.hidden=true; return; } n++; const h=v.h+v.m/60, good=h>=7&&h<20; if(good) ok++;
      el.classList.toggle('good',good); el.classList.toggle('bad',!good);
      el.querySelector('.cls').style.left=(h/24*100)+'%'; el.querySelector('.tm b').textContent=pad(v.h)+':'+pad(v.m);
      el.querySelector('.tm small').textContent=v.wd+' · '+part(v.h); });
    cnt.innerHTML=`<b>${ok} of ${n}</b> families in waking hours`; }
  function set(t,fromBtn){ r.value=t; B.forEach(b=>b.setAttribute('aria-pressed',+b.dataset.t===+t)); draw(+t); }
  let user=false; r.addEventListener('input',()=>{ user=true; set(+r.value); }); B.forEach(b=>b.addEventListener('click',()=>{ user=true; set(+b.dataset.t); }));
  set(5.5); onView($('#tz'),async()=>{ if(RM) return; let k=0; while(!user){ await sleep(3800); if(user) return; k^=1; set(k?14:5.5); } },.4);
})();

/* SCHOOL: the tree of values */
(()=>{ const V=[['Love for Learning','The root of all growth.'],['Character & Integrity','Doing what is right, always.'],['Skill & Competence','Striving for excellence in every task.'],['Empathy & Respect','Honouring the dignity of every person.'],['Creativity','Imagining new possibilities and original solutions.'],['Teamwork','Community strengthens the individual.'],['Confidence','Believing in God-given potential.'],['Discipline','Consistency builds lasting success.'],['Responsibility','Owning the outcomes of one’s actions.'],['Leadership','Guiding and uplifting others with humility.']];
  const Z={learn:['Learning','Knowledge and inquiry: curiosity, critical thinking, literacy, numeracy and lifelong discovery.'],char:['Character','Values and self-discipline: integrity, humility, honesty, respect and empathy.'],lead:['Leadership','Positive impact and service: stepping forward to help, not out of pride.']};
  const P=[[160,34],[116,48],[204,48],[82,82],[238,82],[128,86],[192,86],[100,120],[220,120],[160,112]];
  const g=$('#leaves'),tree=$('#tree'),cap=$('#tcap');
  g.innerHTML=V.map((v,i)=>`<g transform="translate(${P[i][0]} ${P[i][1]})"><g class="leaf" data-i="${i}" tabindex="0" role="button" aria-label="Value ${i+1}: ${v[0]}"><circle r="17"/><text y="4.5">${i+1}</text></g></g>`).join('');
  const LV=$$('#leaves .leaf'),ZB=$$('#tree .lm-tlabels button'); let user=false,cur=0;
  function leaf(i){ cur=i; tree.dataset.z=''; ZB.forEach(b=>b.classList.remove('on')); LV.forEach((l,k)=>l.classList.toggle('on',k===i));
    cap.innerHTML=`<span class="n">${String(i+1).padStart(2,'0')} / 10</span><b>${V[i][0]}</b><span>${V[i][1]}</span>`; }
  function zone(z){ tree.dataset.z=z; LV.forEach(l=>l.classList.remove('on')); ZB.forEach(b=>b.classList.toggle('on',b.dataset.z===z));
    cap.innerHTML=`<span class="n">${z==='learn'?'Roots':z==='char'?'Trunk':'Canopy'}</span><b>${Z[z][0]}</b><span>${Z[z][1]}</span>`; }
  LV.forEach(l=>{ const f=()=>{ user=true; leaf(+l.dataset.i); }; l.addEventListener('click',f); l.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); f(); } }); });
  ZB.forEach(b=>b.addEventListener('click',()=>{ user=true; zone(b.dataset.z); }));
  leaf(0); onView(tree,()=>{ if(RM) return; tree.classList.add('grow'); const seq=['learn','char','lead',0,1,2,3,4,5,6,7,8,9]; let k=0; const t=setInterval(()=>{ if(user) return clearInterval(t); k=(k+1)%seq.length; const s=seq[k]; typeof s==='string'?zone(s):leaf(s); },2400); },.35);
})();

/* SMART LEARNING 01: draw and trace with an AI helper */
(()=>{ const cv=$('#dcv'),ctx=cv.getContext('2d'),msg=$('#dmsg span'),hint=$('#dhint'),TB=$$('#draw .lm-tgt button');
  const W=400,H=300; let dpr=1;
  const line=(a,b,n)=>{ const o=[]; for(let i=0;i<=n;i++) o.push([a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n]); return o; };
  function star(){ const o=[],c=[200,152],R=112,r=46; const v=[]; for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r:R; v.push([c[0]+rr*Math.cos(a),c[1]+rr*Math.sin(a)]); } for(let i=0;i<10;i++) o.push(...line(v[i],v[(i+1)%10],12)); return [o]; }
  function heart(){ const o=[]; for(let i=0;i<=160;i++){ const t=i/160*Math.PI*2; o.push([200+6.4*16*Math.pow(Math.sin(t),3),142-6.4*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))]); } return [o]; }
  const SH={A:()=>[line([118,262],[200,40],40),line([200,40],[282,262],40),line([150,178],[250,178],24)],star,heart};
  const NAME={A:'the letter A',star:'the star',heart:'the heart'};
  let key='A',guide=SH.A(),strokes=[],cur=null,demo=null,user=false;
  function size(){ const r=cv.getBoundingClientRect(); dpr=Math.min(2,window.devicePixelRatio||1); cv.width=Math.round(r.width*dpr); cv.height=Math.round(r.width*.75*dpr); draw(); }
  function S(){ return cv.width/W; }
  function path(pts){ ctx.beginPath(); pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); }
  function draw(miss){ const s=S(); ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,cv.width,cv.height); ctx.setTransform(s,0,0,s,0,0);
    ctx.lineCap='round'; ctx.lineJoin='round';
    ctx.setLineDash([2,12]); ctx.strokeStyle='#9fb0d6'; ctx.lineWidth=7; guide.forEach(g=>{ path(g); ctx.stroke(); }); ctx.setLineDash([]);
    if(miss){ ctx.fillStyle='rgba(245,184,61,.9)'; miss.forEach(p=>{ ctx.beginPath(); ctx.arc(p[0],p[1],6,0,7); ctx.fill(); }); }
    ctx.strokeStyle='#204ecf'; ctx.lineWidth=9; strokes.forEach(st=>{ path(st); ctx.stroke(); });
    if(demo){ ctx.strokeStyle='#09b6f9'; ctx.lineWidth=9; demo.forEach(st=>{ path(st); ctx.stroke(); }); const l=demo[demo.length-1]; const p=l&&l[l.length-1]; if(p){ ctx.fillStyle='#0f256e'; ctx.beginPath(); ctx.arc(p[0],p[1],9,0,7); ctx.fill(); } } }
  const pt=e=>{ const r=cv.getBoundingClientRect(); return [(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.width*W]; };
  cv.addEventListener('pointerdown',e=>{ user=true; stopDemo(); hint.style.opacity=0; cur=[pt(e)]; strokes.push(cur); cv.setPointerCapture(e.pointerId); draw(); });
  cv.addEventListener('pointermove',e=>{ if(!cur) return; cur.push(pt(e)); draw(); });
  ['pointerup','pointercancel'].forEach(t=>cv.addEventListener(t,()=>{ cur=null; }));
  function say(t){ msg.innerHTML=t; msg.parentNode.classList.remove('pop'); void msg.offsetWidth; msg.parentNode.classList.add('pop'); }
  function check(){ const all=strokes.flat(); if(all.length<8){ say('Draw over the dotted line first, then tap <b>Check</b>.'); return; }
    const G=guide.flat(),near=(p,set,d)=>set.some(q=>(p[0]-q[0])**2+(p[1]-q[1])**2<d*d);
    const miss=G.filter(p=>!near(p,all,20)),cov=1-miss.length/G.length,acc=all.filter(p=>near(p,G,24)).length/all.length,sc=cov*.65+acc*.35;
    let where=''; if(miss.length){ const mx=miss.reduce((a,p)=>a+p[0],0)/miss.length,my=miss.reduce((a,p)=>a+p[1],0)/miss.length; where=Math.abs(mx-200)>Math.abs(my-150)*1.2?(mx<200?'left side':'right side'):(my<150?'top':'bottom'); }
    const stars=sc>.82?3:sc>.6?2:1, st='<b class="stars">'+'★'.repeat(stars)+'<i>'+'★'.repeat(3-stars)+'</i></b>';
    say(stars===3?`${st} Wonderful! You traced ${NAME[key]} beautifully.`:stars===2?`${st} Great try! Have another go at the <b>${where}</b>: I've marked it in yellow.`:`${st} Good start! Follow the dots slowly. Start at the <b>${where||'top'}</b>.`);
    draw(stars<3?miss.filter((p,i)=>i%3===0):null); }
  async function show(){ stopDemo(); const my=Symbol(); demo=[]; showTok=my; strokes=[]; hint.style.opacity=0;
    for(const g of guide){ const st=[]; demo.push(st); for(let i=0;i<g.length;i++){ if(showTok!==my) return; st.push(g[i]); if(i%2===0){ draw(); await sleep(16); } } }
    draw(); say('Your turn! Trace '+NAME[key]+' with your finger or mouse.'); await sleep(1300); if(showTok===my){ demo=null; draw(); hint.style.opacity=1; } }
  let showTok=null; function stopDemo(){ showTok=null; demo=null; }
  function setKey(k){ key=k; guide=SH[k](); strokes=[]; stopDemo(); TB.forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===k)); draw(); hint.style.opacity=1; say('Trace '+NAME[k]+'. Tap <b>Show me</b> if you want help.'); }
  TB.forEach(b=>b.addEventListener('click',()=>{ user=true; setKey(b.dataset.k); }));
  $('#dcheck').onclick=()=>{ user=true; stopDemo(); check(); }; $('#dclear').onclick=()=>{ user=true; strokes=[]; stopDemo(); draw(); hint.style.opacity=1; say('All clean. Try again!'); };
  $('#dshow').onclick=()=>{ user=true; show(); };
  addEventListener('resize',size); size();
  onView($('#draw'),async()=>{ if(RM) return; await show(); });
})();

/* SMART LEARNING 02: explore in 3D */
(()=>{ const cv=$('#ccv'),ctx=cv.getContext('2d'),TB=$$('#cube .lm-tgt button'),q=$('#cq'),ans=$('#cans'),stats=$('#cstats');
  const SH={cube:{n:'cube',v:[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],f:[[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[1,2,6,5],[0,3,7,4]],F:6,E:12,C:8},
    pyr:{n:'pyramid',v:[[-1,1,-1],[1,1,-1],[1,1,1],[-1,1,1],[0,-1.3,0]],f:[[0,1,2,3],[0,1,4],[1,2,4],[2,3,4],[3,0,4]],F:5,E:8,C:5},
    prism:{n:'prism',v:[[-1.2,.9,-1],[1.2,.9,-1],[0,-1.1,-1],[-1.2,.9,1],[1.2,.9,1],[0,-1.1,1]],f:[[0,1,2],[3,4,5],[0,1,4,3],[1,2,5,4],[2,0,3,5]],F:5,E:9,C:6}};
  const COL=['#204ecf','#09b6f9','#3dbe8b','#0f256e','#7aa2ff','#2fa577'];
  let key='cube',ax=-.45,ay=.6,drag=null,user=false,spin=true,step=0,count=0,known={};
  function size(){ const r=cv.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1); cv.width=Math.round(r.width*d); cv.height=Math.round(r.width*.75*d); }
  function rot(p){ let [x,y,z]=p; const cy=Math.cos(ay),sy=Math.sin(ay),cx=Math.cos(ax),sx=Math.sin(ax); [x,z]=[x*cy+z*sy,-x*sy+z*cy]; [y,z]=[y*cx-z*sx,y*sx+z*cx]; return [x,y,z]; }
  function frame(){ const s=SH[key],W=cv.width,H=cv.height,sc=Math.min(W,H)*.23,P=s.v.map(rot),pr=P.map(p=>{ const k=7/(7+p[2]); return [W/2+p[0]*sc*k,H*.56+p[1]*sc*k]; });
    ctx.clearRect(0,0,W,H);
    const fs=s.f.map((f,i)=>({f,i,z:f.reduce((a,v)=>a+P[v][2],0)/f.length})).sort((a,b)=>b.z-a.z);
    fs.forEach(({f,i})=>{ ctx.beginPath(); f.forEach((v,k)=>k?ctx.lineTo(...pr[v]):ctx.moveTo(...pr[v])); ctx.closePath();
      ctx.fillStyle=COL[i%COL.length]+'cc'; ctx.fill(); ctx.lineWidth=Math.max(2,W/220); ctx.strokeStyle='#fff'; ctx.stroke(); });
    if(step===0||count){ pr.forEach((p,i)=>{ const on=count&&i<count; ctx.beginPath(); ctx.arc(p[0],p[1],W/(on?52:80),0,7); ctx.fillStyle=on?'#f5b83d':'#0f256e'; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke();
      if(on){ ctx.fillStyle='#3a2a00'; ctx.font=`700 ${Math.round(W/40)}px Montserrat,sans-serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(i+1,p[0],p[1]+1); } }); } }
  function loop(){ if(spin&&!drag&&!RM) ay+=.008; frame(); requestAnimationFrame(loop); }
  const QS=[['corners','How many <b>corners</b> does the {n} have?','C'],['faces','How many flat <b>faces</b> does the {n} have?','F'],['edges','How many <b>edges</b> does the {n} have?','E']];
  function opts(n){ const o=new Set([n]); let d=1; while(o.size<3){ o.add(n+d); if(o.size<3&&n-d>2) o.add(n-d); d++; } return [...o].sort((a,b)=>a-b); }
  function stat(){ stats.innerHTML=QS.map(x=>`<span class="${known[x[2]]?'y':''}"><b>${known[x[2]]?SH[key][x[2]]:'?'}</b>${x[0]}</span>`).join(''); }
  function ask(){ const s=SH[key],Q=QS[step],n=s[Q[2]]; count=0;
    q.innerHTML='<i class="bot" aria-hidden="true"></i><span>'+Q[1].replace('{n}',s.n)+'</span>'; q.classList.remove('pop'); void q.offsetWidth; q.classList.add('pop');
    ans.innerHTML=opts(n).map(v=>`<button type="button" class="lm-btn" data-v="${v}">${v}</button>`).join('');
    $$('#cans button').forEach(b=>b.onclick=async()=>{ user=true; const v=+b.dataset.v;
      if(v===n){ b.classList.add('ok'); known[Q[2]]=1; stat(); q.querySelector('span').innerHTML=`Yes! A ${s.n} has <b>${n} ${Q[0]}</b>.`+(step===0?' Let’s count them.':'');
        $$('#cans button').forEach(x=>x.disabled=true);
        if(step===0&&!RM){ spin=false; for(let i=1;i<=s.C;i++){ count=i; await sleep(260); } await sleep(700); count=0; spin=true; } else await sleep(1300);
        step=(step+1)%3; if(step===0) known={}; stat(); ask(); }
      else { b.classList.add('no'); b.disabled=true; q.querySelector('span').innerHTML=`Not quite. Turn the ${s.n} and count again.`; } }); }
  function setKey(k){ key=k; step=0; known={}; TB.forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===k)); stat(); ask(); }
  TB.forEach(b=>b.addEventListener('click',()=>{ user=true; setKey(b.dataset.k); }));
  cv.addEventListener('pointerdown',e=>{ user=true; drag=[e.clientX,e.clientY,ax,ay]; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove',e=>{ if(!drag) return; ay=drag[3]+(e.clientX-drag[0])/90; ax=Math.max(-1.4,Math.min(1.4,drag[2]+(e.clientY-drag[1])/90)); if(RM) frame(); });
  ['pointerup','pointercancel'].forEach(t=>cv.addEventListener(t,()=>{ drag=null; }));
  addEventListener('resize',()=>{ size(); frame(); }); size(); setKey('cube'); frame(); if(!RM) requestAnimationFrame(loop);
  onView($('#cube'),()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); const ks=['cube','pyr','prism']; setKey(ks[(ks.indexOf(key)+1)%3]); },6000); },.4);
})();

/* SMART LEARNING 03: watch and answer */
(()=>{ const CH=[[0,'Two equals two','Two apples and two apples are the same, so they are equal.',['🍎🍎','🍎🍎',1]],[18,'Three equals one?','Three bananas and one banana are not the same. A big red cross.',['🍌🍌🍌','🍌',0]],[38,'Four equals four','Count both sides, then tick: equal.',['⭐⭐⭐⭐','⭐⭐⭐⭐',1]],[50,'Ducks in a row','Three ducks and two ducks: not equal.',['🦆🦆🦆','🦆🦆',0]],[62,'One apple, one apple','The simplest match of all: one equals one.',['🍎','🍎',1]],[74,'Two apples, three apples','The class spots the mistake: wrong!',['🍎🍎','🍎🍎🍎',0]],[88,'New signs','Plus and minus signs join the board.',null],[104,'Goodbye','The class waves goodbye on the school’s “Learn, Grow & Shine” card.',null]];
  const v=$('#lmv'),box=$('#chaps'),now=$('#fnow'),qz=$('#quiz'); const mm=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
  v.poster=IMG.vposter;
  if(IMG.video==='inline'){ const el=document.getElementById('lmv64'); if(el){ try{ const s=atob(el.textContent.trim()),u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); v.src=URL.createObjectURL(new Blob([u],{type:'video/mp4'})); }catch(e){ v.src='data:video/mp4;base64,'+el.textContent.trim(); } } } else v.src=IMG.video;
  const n=CH.length; box.style.setProperty('--n',n);
  box.innerHTML=CH.map((c,i)=>`<button type="button" role="listitem" data-i="${i}" aria-label="Play from ${mm(c[0])}: ${c[1]}"><i style="background-image:url('${IMG.vchap}');background-size:${n*100}% 100%;background-position:${i/(n-1)*100}% 0"></i><span><em>${mm(c[0])}</em>${c[1]}</span></button>`).join('');
  const B=$$('#chaps button'); let cur=-1,qi=0;
  const QI=CH.map((c,i)=>c[3]?i:-1).filter(i=>i>=0);
  function quiz(i){ const c=CH[i][3]; if(!c){ i=QI[qi%QI.length]; } const d=CH[i][3]; qi=QI.indexOf(i);
    qz.innerHTML=`<small>Your turn · question ${qi+1} of ${QI.length}</small><div class="eq"><span>${d[0]}</span><b>=</b><span>${d[1]}</span></div><div class="yn"><button type="button" data-a="1">✓ Equal</button><button type="button" data-a="0">✗ Not equal</button></div><p class="fb">Is it equal?</p>`;
    $$('#quiz .yn button').forEach(b=>b.onclick=()=>{ const ok=+b.dataset.a===d[2]; b.classList.add(ok?'ok':'no'); const fb=qz.querySelector('.fb');
      fb.innerHTML=ok?`<b>Well done!</b> ${d[2]?'Both sides match, so they are equal.':'The sides don’t match, so they are not equal.'} <button type="button" class="nx">Next question →</button>`:'Not quite. Count each side again.';
      const nx=qz.querySelector('.nx'); if(nx) nx.onclick=()=>quiz(QI[(qi+1)%QI.length]); }); }
  function mark(i){ if(i===cur) return; cur=i; B.forEach((b,k)=>{ b.classList.toggle('on',k===i); b.classList.toggle('done',k<i); }); const c=CH[i];
    now.innerHTML=`<small>Scene ${i+1} of ${n} · ${mm(c[0])}</small><b>${c[1]}</b><span>${c[2]}</span>`; if(c[3]) quiz(i); }
  B.forEach(b=>b.addEventListener('click',()=>{ const c=CH[+b.dataset.i]; try{ v.currentTime=c[0]+.1; v.play().catch(()=>{}); }catch(e){} mark(+b.dataset.i); }));
  v.addEventListener('timeupdate',()=>{ let i=0; CH.forEach((c,k)=>{ if(v.currentTime>=c[0]) i=k; }); mark(i); });
  mark(0);
})();

/* ARCHITECTURE: trace a journey */
(()=>{ const LAY=[['Frontend',[['fe-dash','Six role dashboards','Admin to student'],['fe-pub','Public flows','Admission form · payment · vouchers']]],
   ['Access gateway',[['ac-proxy','proxy.js','Route guard'],['ac-auth','NextAuth v5','Sign-in sessions'],['ac-role','roleGuard','Role check on every API']]],
   ['Backend engines',[['en-adm','Admissions & leads',''],['en-fin','Finance & vouchers',''],['en-aca','Academics & lectures',''],['en-ops','Classroom ops','Attendance · homework · ECCE'],['en-evt','Events & comms','Event forms · library'],['en-job','Automated jobs','Reminders']]],
   ['Data',[['da-pg','PostgreSQL','Prisma + raw SQL'],['da-pay','payment_proofs','Private bucket'],['da-doc','school bucket','Documents · homework · media']]],
   ['External services',[['ex-g','Google Workspace','Calendar · Meet · Drive · Reports'],['ex-mail','Email','SMTP · Resend'],['ex-wa','WhatsApp','Meta Cloud API'],['ex-geo','Country data','CountriesNow · REST Countries']]]];
  const J=[{n:'A family applies from abroad',h:[['fe-pub','The parent opens their personal admission link on a phone.'],['ex-geo','Country and city lists load for wherever the family lives.'],['en-adm','The six-step form is checked and saved against the lead.'],['da-doc','Birth certificate, ID and photo go to private storage.'],['da-pg','The admission record and its fee voucher are written.'],['ex-mail','The voucher and payment link are emailed to the parent.']]},
   {n:'A parent pays a fee',h:[['fe-pub','The parent opens the voucher’s payment page and uploads proof.'],['da-pay','The proof is stored privately, opened only through signed links.'],['fe-dash','A coordinator reviews it in their dashboard.'],['ac-role','The API checks the reviewer’s role before acting.'],['en-fin','One verification engine approves it.'],['da-pg','Accounts, enrolment and fee history are written together.'],['ex-mail','Login details go to the parent by email.']]},
   {n:'A live lecture is verified',h:[['fe-dash','A coordinator schedules a recurring lecture.'],['ac-auth','The signed-in session is checked.'],['en-aca','The lecture engine creates each session.'],['ex-g','Calendar events and Meet links are created; later, Admin Reports gives attendance and Drive finds the recording.'],['da-pg','Attendance and the lecture’s state are recorded.'],['fe-dash','Parents and students see the verified lecture.']]},
   {n:'A reminder goes out',h:[['en-job','A scheduled, secret-protected job runs.'],['da-pg','It finds admission forms still waiting at 10, 20 or 30 days.'],['ex-mail','A reminder email goes to the parent.'],['ex-wa','The same reminder goes out on WhatsApp.'],['da-pg','Every reminder is logged against the record.']]}];
  const lay=$('#layers'),hops=$('#hops'),jr=$('#jrn');
  lay.innerHTML=LAY.map((l,i)=>`<div class="lm-layer"><span class="ln"><em>${i+1}</em>${l[0]}</span><div class="nodes">${l[1].map(n=>`<div class="lm-node" data-id="${n[0]}"><b>${n[1]}</b>${n[2]?`<small>${n[2]}</small>`:''}<i class="bd"></i></div>`).join('')}</div></div>`).join('');
  jr.innerHTML=J.map((j,i)=>`<button type="button" role="tab" data-i="${i}">${j.n}</button>`).join('');
  const N={}; $$('#layers .lm-node').forEach(n=>N[n.dataset.id]=n); const JB=$$('#jrn button');
  let j=0,k=0,user=false,timer=null,tok=0;
  function paint(){ const h=J[j].h; Object.values(N).forEach(n=>{ n.classList.remove('on','seen'); n.querySelector('.bd').textContent=''; });
    h.forEach((x,i)=>{ if(i>k) return; const n=N[x[0]]; n.classList.add(i===k?'on':'seen'); if(i===k) n.classList.remove('seen'); const bd=n.querySelector('.bd'); bd.textContent=bd.textContent?bd.textContent+'·'+(i+1):String(i+1); });
    $$('#hops li').forEach((li,i)=>{ li.classList.toggle('on',i===k); li.classList.toggle('done',i<k); }); }
  function pick(i,start){ j=i; k=start; JB.forEach((b,x)=>{ b.setAttribute('aria-selected',x===i); b.classList.toggle('on',x===i); });
    hops.innerHTML=J[i].h.map((x,n)=>`<li data-n="${n}"><em>${n+1}</em><span>${x[1]}</span></li>`).join('');
    $$('#hops li').forEach(li=>li.addEventListener('click',()=>{ user=true; tok++; k=+li.dataset.n; paint(); })); paint(); }
  async function run(i){ const my=++tok; pick(i,0); if(RM){ k=J[i].h.length-1; paint(); return; }
    while(my===tok){ await sleep(1500); if(my!==tok) return; if(k<J[i].h.length-1){ k++; paint(); } else { await sleep(2600); if(my!==tok||user) return; i=(i+1)%J.length; pick(i,0); } } }
  JB.forEach(b=>b.addEventListener('click',()=>{ user=true; run(+b.dataset.i); }));
  pick(0,J[0].h.length-1); onView($('#archx'),()=>{ if(!user) run(0); },.3);
})();
