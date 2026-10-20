__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const onView=(el,fn,th=.3)=>{ if(!el) return; const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const watch=(el,cb)=>{ new IntersectionObserver(es=>cb(es[0].isIntersecting),{threshold:.05}).observe(el); };

/* reveal: motion only, content readable at rest */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.08});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* HERO: a ticket is researched, drafted, scored and routed */
(()=>{
  const hc=$('#hc'); if(!hc) return;
  const S=[
    {who:'Customer reply',q:'Thanks, but I am still seeing the same error on another package.',conf:54,g:[1,1,0,0,null],out:'rev',st:'Not assigned to AI · 54 is not above 60'},
    {who:'New ticket',q:'How do I roll back a deployment to the previous version?',conf:86,g:[1,1,1,1,1],out:'dir',st:'All five gates passed · reply sent'}
  ];
  const src=$$('#hcSrc span'), lines=$$('#hcDraft s'), fill=$('#hcFill'), num=$('#hcN'), gates=$$('#hcG i'), rev=$('#hcRev'), dir=$('#hcDir'), st=$('#hcSt'), q=$('#hcQ'), who=$('#hcWho');
  const gc=(s,i)=>s.g[i]==null?'na':(s.g[i]?'ok':'no');
  const final=s=>{ who.textContent=s.who; q.textContent=s.q; src.forEach(x=>x.classList.add('on')); lines.forEach(l=>l.style.width=l.dataset.w); fill.style.width=s.conf+'%'; fill.classList.toggle('ok',s.conf>60); num.textContent=s.conf; gates.forEach((g,i)=>g.className=gc(s,i)); rev.classList.toggle('on',s.out==='rev'); dir.classList.toggle('on',s.out==='dir'); st.textContent=s.st; };
  final(S[0]);
  if(RM) return;
  let vis=false; watch(hc,v=>vis=v);
  const wait=async ms=>{ await sleep(ms); while(!vis) await sleep(300); };
  const reset=s=>{ who.textContent=s.who; q.textContent=''; src.forEach(x=>x.classList.remove('on')); lines.forEach(l=>l.style.width='0'); fill.style.width='0'; fill.classList.remove('ok'); num.textContent='–'; gates.forEach(g=>g.className=''); rev.classList.remove('on'); dir.classList.remove('on'); };
  (async()=>{ let i=0; await wait(2400);
    while(true){ const s=S[i]; reset(s); st.textContent='New Freshdesk event'; await wait(500);
      for(let k=1;k<=s.q.length;k++){ q.textContent=s.q.slice(0,k); await sleep(18); }
      await wait(250); st.textContent='Researching six sources';
      for(const x of src){ x.classList.add('on'); await wait(220); }
      st.textContent='Drafting with Claude';
      for(const l of lines){ l.style.width=l.dataset.w; await wait(280); }
      st.textContent='Scoring confidence'; fill.style.width=s.conf+'%';
      for(let n=0;n<=s.conf;n+=3){ num.textContent=n; await sleep(16); }
      num.textContent=s.conf; fill.classList.toggle('ok',s.conf>60);
      await wait(300); st.textContent='Checking five gates';
      for(let k=0;k<5;k++){ gates[k].className=gc(s,k); await wait(230); }
      (s.out==='rev'?rev:dir).classList.add('on'); st.textContent=s.st;
      await wait(4200); i=(i+1)%S.length;
    } })();
})();

/* 01 PROBLEM: six windows by hand vs one note */
(()=>{
  const stg=$('#stage'); if(!stg) return;
  const wins=$$('.win:not(.reply)',stg), reply=$('.win.reply',stg), btns=$$('#pbSeg button'), n=$('#pbN'), L=$('#pbL'), P=$('#pbP'), C=$('#pbC'), note=$('.pnote',stg);
  const T={before:['Places to check by hand','6','Past tickets, product documentation, Jira, internal knowledge, attachments and earlier fixes, then a reply from a blank page.'],
           after:['Draft to review, in Freshdesk','1','One private note with a researched draft, the context it used and a link to review it.']};
  let user=false, tok=0;
  const set=m=>{ stg.classList.toggle('after',m==='after'); btns.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===m))); const t=T[m]; L.textContent=t[0]; n.textContent=t[1]; P.textContent=t[2]; C.classList.toggle('zero',m==='after'); note.setAttribute('aria-hidden',String(m!=='after')); };
  const all=[...wins,reply];
  async function play(){ const my=++tok; set('before'); if(RM) return; all.forEach(w=>w.classList.add('hid')); n.textContent='0'; await sleep(300);
    for(let i=0;i<wins.length;i++){ if(my!==tok) return; wins[i].classList.remove('hid'); n.textContent=String(i+1); await sleep(380); }
    if(my!==tok) return; reply.classList.remove('hid'); }
  btns.forEach(b=>b.addEventListener('click',()=>{ user=true; tok++; all.forEach(w=>w.classList.remove('hid')); if(b.dataset.v==='before') play(); else set('after'); }));
  set('before');
  onView(stg, async()=>{ await play(); await sleep(2600); if(!user) set('after'); }, .45);
})();

/* 02 COMPLICATION: eight requirements fill a ring */
(()=>{
  const ring=$('#ring'), svg=$('#ringSvg'); if(!ring) return;
  const locks=$$('#complication .lock'), N=locks.length, cx=120, cy=120, r=96, gap=4;
  const pt=a=>[cx+r*Math.cos(a), cy+r*Math.sin(a)];
  let h='';
  for(let i=0;i<N;i++){ const a0=(-90+i*360/N+gap/2)*Math.PI/180, a1=(-90+(i+1)*360/N-gap/2)*Math.PI/180; const [x0,y0]=pt(a0),[x1,y1]=pt(a1); h+=`<path class="arc" d="M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}"/>`; }
  svg.innerHTML=h;
  const arcs=$$('.arc',svg), nEl=$('#ringN'), tEl=$('#ringT'); let user=false;
  const upd=()=>{ let c=0; locks.forEach((l,i)=>{ const on=l.classList.contains('on'); if(on) c++; arcs[i].classList.toggle('on',on); l.setAttribute('aria-pressed',String(on)); }); nEl.textContent=c+'/'+N; ring.classList.toggle('all',c===N); tEl.textContent=c===N?'Ready for production':'requirements met'; };
  locks.forEach(l=>l.addEventListener('click',()=>{ user=true; l.classList.toggle('on'); upd(); }));
  upd();
  if(RM){ locks.forEach(l=>l.classList.add('on')); upd(); return; }
  onView(ring, async()=>{ for(const l of locks){ if(user) return; l.classList.add('on'); upd(); await sleep(420); } }, .4);
})();

/* 03 RESOLUTION: system map with node detail and a ticket trace */
(()=>{
  const lanes=$('#lanes'), info=$('#sinfo'); if(!lanes) return;
  const D={
    fd:{t:'Freshdesk ticket events',g:'Freshdesk',p:'Every new ticket or customer reply sends a webhook to the copilot. Freshdesk is also where every result lands: notes, replies and status updates.',rows:[['Trigger','New ticket or customer reply'],['Receives back','Private notes, public replies, status updates']]},
    main:{t:'Core orchestration workflow',g:'n8n · 58 nodes',p:'Receives the event, waits 90 seconds so the latest reply is visible, loads the ticket, classifies the latest customer message, blocks duplicates, requests a draft and routes the result.',rows:[['Stages','13, from webhook to reply or review'],['Safeguards','Duplicate protection, routing gates, logged skips']]},
    route:{t:'Routing decision',g:'n8n · inside the core flow',p:'Refreshes the ticket so its assignment is current, then applies the five gates. The decision section below explains each gate and lets you try them.',rows:[['All pass','Direct public reply'],['Any fail','Private note for human review']]},
    reply:{t:'Direct public reply',g:'Freshdesk',p:'The customer-facing reply is formatted and posted, the ticket is set to Waiting on Customer, and the send is logged so the same reply never goes out twice.',rows:[['Requires','All five gates'],['Then','Status set to Waiting on Customer']]},
    note:{t:'Private review note',g:'Freshdesk',p:'When a direct reply is not allowed, the draft is posted as a private note that only agents can see, with a link to the Review Interface.',rows:[['Contains','The draft and a review link'],['Used for','Everything the gates do not clear']]},
    draft:{t:'Draft and Edit API',g:'n8n · 21 nodes · Claude',p:'An AI agent built on Anthropic Claude writes or revises the draft from ticket context, conversation history, attachments, engineer-added context, approved canned responses and retrieval tools.',rows:[['Returns','Draft, confidence score, context used'],['Also used for','AI revisions from the Review Interface']]},
    kb:{t:'Knowledge retrieval',g:'OpenAI embeddings · Qdrant',p:'Documentation, past tickets, Jira records and support resolutions are embedded and searched by meaning, so each draft is grounded in what Flexagon already knows.',rows:[['Sources','Confluence, Freshdesk history, Jira'],['Search','Semantic, through a vector index']]},
    att:{t:'Attachment extractor',g:'n8n · 27 nodes',p:'Downloads supported attachments, extracts text or analyzes the file, and caches the result so the same file is never processed twice.',rows:[['File types','Text, logs, CSV, PDF, DOCX, images, ZIP'],['Limits','File count and size, set in configuration']]},
    ui:{t:'Review Interface',g:'n8n · browser workspace',p:'Opened from the private note. Shows the ticket, the conversation and the draft, with controls to edit, ask the AI to revise, add context and approve.',rows:[['Opened from','The private review note'],['Calls','The four review APIs']]},
    apis:{t:'Review APIs',g:'n8n · 4 workflows',p:'Single-purpose APIs behind the Review Interface: Load Ticket (9 nodes), Manual Edit (4), External Context (6) and Approval (7).',rows:[['Approval','Final draft to HTML, approval marker, private note'],['Context','Saved for the next draft']]},
    pg:{t:'Postgres state store',g:'PostgreSQL',p:'Keeps ticket sessions, context versions, drafts, confidence scores, routing decisions, skip reasons and the attachment cache, so every decision can be traced.',rows:[['Key records','Ticket sessions and context versions'],['Used for','Duplicate checks, review, audit, debugging']]}
  };
  const TR=[['fd','A customer replies, and Freshdesk sends a webhook.'],['main','The core workflow waits 90 seconds, loads the ticket and classifies the message.'],['pg','It reads the ticket session and checks the context hash for duplicates.'],['att','Attachments are extracted, or read from the cache.'],['kb','Relevant docs, past tickets and Jira records are retrieved.'],['draft','Claude drafts the reply and scores its confidence.'],['route','Five gates decide between direct reply and human review.'],['note','A gate fails, so the draft is posted as a private note.'],['ui','A support engineer opens the review link.'],['apis','Edits and context are saved, and the approved reply is posted as a private note.']];
  const nodes=$$('.nd',lanes); let tracing=false, tok=0;
  const show=(k,step)=>{ const d=D[k]; nodes.forEach(n=>n.classList.toggle('on',n.dataset.n===k));
    info.innerHTML=`<span class="step">${step||''}</span><span class="tg">${d.g}</span><h3>${d.t}</h3><p>${d.p}</p><dl>${d.rows.map(r=>`<dt>${r[0]}</dt><dd>${r[1]}</dd>`).join('')}</dl><div class="acts"><button type="button" class="btn btn-navy" id="trBtn"><svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true"><path d="${tracing?'M4 3h3v10H4zM9 3h3v10H9z':'M4 2.5v11l9-5.5z'}" fill="currentColor"/></svg>${tracing?'Stop the trace':'Trace a ticket'}</button></div>`;
    $('#trBtn').addEventListener('click',toggle); };
  const clearT=()=>{ lanes.classList.remove('tracing'); nodes.forEach(n=>n.classList.remove('lit','past')); };
  const settle=()=>nodes.forEach(n=>{ if(n.classList.contains('lit')){ n.classList.remove('lit'); n.classList.add('past'); } });
  async function trace(){ const my=++tok; tracing=true; clearT(); lanes.classList.add('tracing');
    for(let i=0;i<TR.length;i++){ if(my!==tok) return; const [k,cap]=TR[i]; settle(); $(`.nd[data-n="${k}"]`,lanes).classList.add('lit'); show(k,`Step ${i+1} of ${TR.length} · ${cap}`); await sleep(RM?0:2100); }
    if(my!==tok) return; tracing=false; settle(); show('apis','Trace complete. Tap any part to explore it.'); }
  function toggle(){ if(tracing){ tok++; tracing=false; clearT(); show('main'); } else trace(); }
  nodes.forEach(n=>n.addEventListener('click',()=>{ tok++; tracing=false; clearT(); show(n.dataset.n); }));
  show('main');
})();

/* 04 HOW IT WORKS: one message through thirteen stages */
(()=>{
  const jr=$('#jr'); if(!jr) return;
  const lis=$$('#jrSt li'), log=$('#jrLog'), out=$('#jrOut'), msgs=$$('.msg',jr), go=$('#jrGo');
  const C=[[1,'00:00','Freshdesk Ticket Created Webhook','event received'],[1,'00:00','Validate Freshdesk Ticket Payload','ticketId extracted'],[2,'01:30','Wait','90 s so the latest reply is visible'],[2,'01:31','Retrieve Freshdesk Ticket','ticket and conversations loaded'],[2,'01:31','Get Ticket Session','session read from Postgres'],[3,'01:31','Check Support Mailbox','supportMailboxMatch = true']];
  const skipTail=(act,status)=>{ const a=[[4,'01:32','Classify Latest Customer Intent','automationAction = '+act],[4,'01:32','Should Skip AI Reply?','true, no AI draft needed']]; if(status) a.push([5,'01:32','Update Ticket Status From Customer Intent','status set to '+status]); a.push([5,'01:32','Log Skipped AI Reply','skip reason saved']); return a; };
  const R={
    skip:{steps:[...C,...skipTail('no_response_needed',null)],visit:[1,2,3,4,5],end:5,out:['No draft, nothing sent','A simple thank-you needs no reply. The copilot skips the AI and logs why.',true]},
    close:{steps:[...C,...skipTail('close_ticket','Closed')],visit:[1,2,3,4,5],end:5,out:['Ticket closed automatically','The copilot asks Freshdesk to close the ticket and logs the action. No AI draft is generated.',true]},
    resolve:{steps:[...C,...skipTail('resolve_ticket','Resolved')],visit:[1,2,3,4,5],end:5,out:['Ticket marked resolved','The copilot asks Freshdesk to mark the ticket resolved and logs the action. No AI draft is generated.',true]},
    follow:{steps:[...C,[4,'01:32','Classify Latest Customer Intent','automationAction = continue_ai'],[4,'01:32','Should Skip AI Reply?','false, a real follow-up'],[6,'01:32','Build Context Hash','new context a91f…e2'],[6,'01:32','Check Context Version','contextExists = false'],[8,'01:41','Generate Suggested AI Response','draft + confidence_score = 54'],[8,'01:41','Draft Generated?','true'],[9,'01:42','Save Session And Context Version','draft, confidence and context saved'],[9,'01:42','Build Suggested Response Review Note','note ready with review link'],[10,'01:42','Select Copilot Private Notes To Delete','dry run, nothing deleted'],[11,'01:43','Refresh Freshdesk Ticket Before Routing','assignment re-checked'],[11,'01:43','Recalculate Final Routing','directReplyEligible = false'],[11,'01:43','Confidence Above 60?','false (54)'],[13,'01:44','Add Review Link Private Note','private note posted'],[13,'01:44','Mark Context Version Review Created','review required']],visit:[1,2,3,4,6,8,9,10,11,13],end:13,out:['Draft ready for human review','A real follow-up gets a fresh, researched draft. This one scored 54, below the bar for a direct reply, so it went to a support engineer as a private note.',false]}
  };
  let sel='follow', tok=0;
  const line=(s,cls)=>{ const d=document.createElement('div'); if(cls) d.className=cls; d.innerHTML=`<span class="tm">${s[1]}</span><span><b>${s[2]}</b> <em>· ${s[3]}</em></span>`; log.appendChild(d); log.scrollTop=log.scrollHeight; };
  const outcome=r=>{ const o=R[r].out; out.classList.toggle('green',o[2]); out.innerHTML=`<small>Outcome</small><h3>${o[0]}</h3><p>${o[1]}</p>`+(r==='follow'?'<a href="#gates">Try the five gates yourself →</a>':''); };
  const paint=x=>lis.forEach((li,i)=>{ const st=i+1; li.className=x.visit.includes(st)?(st===x.end?'end':'done'):'skip'; });
  const finalState=r=>{ const x=R[r]; paint(x); log.innerHTML=''; x.steps.forEach(s=>line(s)); line(['','done','Result',x.out[0]],'out'); outcome(r); };
  async function run(r){ const my=++tok, x=R[r]; lis.forEach(li=>li.className=''); log.innerHTML=''; out.classList.remove('green'); out.innerHTML='<small>Outcome</small><h3>Running…</h3><p>Watch the stages light up.</p>';
    let cur=0;
    for(const s of x.steps){ if(my!==tok) return;
      if(s[0]!==cur){ if(cur) lis[cur-1].className='done'; for(let k=cur+1;k<s[0];k++) lis[k-1].className='skip'; cur=s[0]; lis[cur-1].className='run'; }
      line(s); await sleep(s[2]==='Wait'?1100:(s[2].startsWith('Generate')?1100:430)); }
    if(my!==tok) return; paint(x); line(['','done','Result',x.out[0]],'out'); outcome(r); }
  msgs.forEach(m=>m.addEventListener('click',()=>{ sel=m.dataset.r; msgs.forEach(x=>x.setAttribute('aria-pressed',String(x===m))); RM?finalState(sel):run(sel); }));
  go.addEventListener('click',()=>RM?finalState(sel):run(sel));
  finalState('follow');
  if(!RM) onView(jr,()=>run('follow'),.35);
})();

/* 05 INSIDE THE DRAFT: inputs, engine, output */
(()=>{
  const dr=$('#dr'); if(!dr) return;
  const svg=$('#drw'), eng=$('#eng'), ins=$$('.din',dr), parts=$$('.dp',dr), K=$('#dcK'), P=$('#dcP'), score=$('#drScore');
  const ID=[['Ticket details','Subject, product, status and metadata, loaded from Freshdesk for every draft.'],['Conversation history','The whole thread, so the draft answers the latest message in context.'],['Attachments','Logs, documents and screenshots, read by the Attachment Extractor and cached for reuse.'],['Engineer-added context','Notes and files a support engineer adds in the Review Interface, used in the next draft.'],['Approved canned responses',"Flexagon's approved response templates, matched where they fit."],['Retrieved knowledge','Confluence documentation, past Freshdesk tickets, Jira records and earlier resolutions, found by semantic search in Qdrant.']];
  const PD=[['Problem analysis','What the customer is running into, read from the ticket, the conversation and any attachments.'],['Recommended resolution steps','The steps most likely to resolve the issue, grounded in documentation and past resolutions.'],['Supporting evidence','The retrieved material behind the recommendation, so the reviewer can check it.'],['Contextual references','Pointers to the documentation, tickets and records that were used.'],['Customer-facing response','A ready-to-send reply that uses approved canned responses where they fit. It comes with a confidence score from 0 to 100, and that score drives routing.']];
  const DEF='Six kinds of input go in. A draft in five parts comes out, with a confidence score that decides where it goes next.';
  let selIn=-1, selOut=-1;
  const hl=()=>{ $$('path.f',svg).forEach(p=>{ const i=p.dataset.i, o=p.dataset.o; let hot=false, dim=false;
      if(selIn>=0 && i!=null){ hot=+i===selIn; dim=!hot; }
      if(selOut>=0 && o!=null){ hot=+o===selOut; dim=!hot; }
      p.classList.toggle('hot',hot); p.classList.toggle('dim',dim); }); };
  const draw=()=>{ if(innerWidth<=1000){ svg.innerHTML=''; return; }
    const b=dr.getBoundingClientRect(), e=eng.getBoundingClientRect(); svg.setAttribute('viewBox',`0 0 ${b.width.toFixed(1)} ${b.height.toFixed(1)}`);
    const ex1=e.left-b.left, ey=e.top+e.height/2-b.top, ex2=e.right-b.left; let h='', f='';
    ins.forEach((el,i)=>{ const r=el.getBoundingClientRect(), x=r.right-b.left, y=r.top+r.height/2-b.top, m=(x+ex1)/2, d=`M${x.toFixed(1)} ${y.toFixed(1)} C${m.toFixed(1)} ${y.toFixed(1)} ${m.toFixed(1)} ${ey.toFixed(1)} ${ex1.toFixed(1)} ${ey.toFixed(1)}`; h+=`<path d="${d}"/>`; f+=`<path class="f" data-i="${i}" d="${d}"/>`; });
    parts.forEach((el,i)=>{ const r=el.getBoundingClientRect(), x=r.left-b.left-1.5, y=r.top+r.height/2-b.top, m=(ex2+x)/2, d=`M${ex2.toFixed(1)} ${ey.toFixed(1)} C${m.toFixed(1)} ${ey.toFixed(1)} ${m.toFixed(1)} ${y.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`; h+=`<path d="${d}"/>`; f+=`<path class="f" data-o="${i}" d="${d}"/>`; });
    svg.innerHTML=h+f; hl(); };
  const resetCap=()=>{ K.textContent='How it fits'; P.textContent=DEF; };
  ins.forEach((el,i)=>el.addEventListener('click',()=>{ selIn=selIn===i?-1:i; selOut=-1; ins.forEach((x,k)=>x.setAttribute('aria-pressed',String(k===selIn))); parts.forEach(x=>x.setAttribute('aria-pressed','false')); if(selIn>=0){ K.textContent='Input'; P.innerHTML=`<b>${ID[i][0]}.</b> ${ID[i][1]}`; } else resetCap(); hl(); }));
  parts.forEach((el,i)=>el.addEventListener('click',()=>{ selOut=selOut===i?-1:i; selIn=-1; parts.forEach((x,k)=>x.setAttribute('aria-pressed',String(k===selOut))); ins.forEach(x=>x.setAttribute('aria-pressed','false')); if(selOut>=0){ K.textContent='Draft part'; P.innerHTML=`<b>${PD[i][0]}.</b> ${PD[i][1]}`; } else resetCap(); hl(); }));
  /* resting state: everything filled */
  ins.forEach(x=>x.classList.add('on')); parts.forEach(x=>x.classList.add('on')); dr.classList.add('live');
  draw(); addEventListener('resize',draw); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(draw); setTimeout(draw,600);
  /* retrieval canvas: points in embedding space, nearest neighbours to a moving query */
  const cv=$('#vec'), ctx=cv.getContext('2d'), W=cv.width, H=cv.height; let seed=7; const rnd=()=>{ seed=(seed*9301+49297)%233280; return seed/233280; };
  const centers=[[.22,.35],[.55,.7],[.8,.3]]; const pts=[];
  centers.forEach(c=>{ for(let i=0;i<22;i++){ const a=rnd()*Math.PI*2, d=Math.pow(rnd(),.6)*.2; pts.push([(c[0]+Math.cos(a)*d)*W,(c[1]+Math.sin(a)*d*1.3)*H]); } });
  const paintVec=t=>{ ctx.clearRect(0,0,W,H); const qx=W*(.5+.3*Math.sin(t/2600)), qy=H*(.5+.25*Math.cos(t/3100));
    const near=pts.map((p,i)=>[Math.hypot(p[0]-qx,p[1]-qy),i]).sort((a,b)=>a[0]-b[0]).slice(0,5).map(x=>x[1]);
    ctx.strokeStyle='rgba(9,182,249,.75)'; ctx.lineWidth=1.5; near.forEach(i=>{ ctx.beginPath(); ctx.moveTo(qx,qy); ctx.lineTo(pts[i][0],pts[i][1]); ctx.stroke(); });
    pts.forEach((p,i)=>{ ctx.beginPath(); ctx.arc(p[0],p[1],near.includes(i)?4.5:3,0,Math.PI*2); ctx.fillStyle=near.includes(i)?'#09b6f9':'rgba(160,185,240,.55)'; ctx.fill(); });
    ctx.beginPath(); ctx.arc(qx,qy,6,0,Math.PI*2); ctx.fillStyle='#ffffff'; ctx.fill(); };
  if(RM){ paintVec(1200); }
  else { let vis=false; watch(cv,v=>vis=v); const loop=t=>{ if(vis) paintVec(t); requestAnimationFrame(loop); }; paintVec(1200); requestAnimationFrame(loop); }
  /* build sequence when first seen */
  if(!RM) onView(dr, async()=>{ ins.forEach(x=>x.classList.remove('on')); parts.forEach(x=>x.classList.remove('on')); dr.classList.remove('live'); score.textContent='confidence –';
    await sleep(300); for(const x of ins){ x.classList.add('on'); await sleep(200); }
    dr.classList.add('live'); await sleep(600);
    for(const x of parts){ x.classList.add('on'); await sleep(260); }
    for(let n=0;n<=54;n+=3){ score.textContent='confidence '+n; await sleep(18); } score.textContent='confidence 54'; }, .3);
})();

/* 06 THE DECISION: five gates */
(()=>{
  const gt=$('#gt'); if(!gt) return;
  const sws=$$('.sw',gt), rg=$('#gConf'), ro=$('#gConfO'), hint=$('#gConfH'), wrap=$('#gPosts'), posts=$$('.gp',gt), tk=$('#gTok'), out=$('#gOut'), pre=$$('.presets button',gt);
  const PR={this:{draft:1,mail:1,assign:0,conf:54,dup:0},go:{draft:1,mail:1,assign:1,conf:86,dup:0},low:{draft:1,mail:1,assign:1,conf:38,dup:0},dup:{draft:1,mail:1,assign:1,conf:86,dup:1}};
  const OK=['draft ok','in scope','approved responder','above 60','no prior reply'], NO=['generation failed','outside scope','not assigned','60 or below','already sent'];
  let s={...PR.this};
  function render(anim){
    sws.forEach(w=>w.setAttribute('aria-checked',String(!!s[w.dataset.g])));
    rg.value=s.conf; ro.textContent=s.conf; hint.textContent=s.conf>60?'Above 60, so this gate passes':'Must be more than 60';
    const pass=[!!s.draft,!!s.mail,!!s.assign,s.conf>60,!s.dup]; let cls;
    if(!pass[0]) cls=['no','na','na','na','na'];
    else { cls=['ok',pass[1]?'ok':'no',pass[2]?'ok':'no',pass[3]?'ok':'no']; cls.push(cls.slice(1).every(c=>c==='ok')?(pass[4]?'ok':'no'):'na'); }
    posts.forEach((p,i)=>{ p.className='gp '+cls[i]; $('em',p).textContent=cls[i]==='ok'?OK[i]:cls[i]==='no'?NO[i]:'not reached'; });
    const stop=cls.indexOf('no'), b=wrap.getBoundingClientRect();
    let x; if(stop<0){ const r=posts[4].getBoundingClientRect(); x=r.left+r.width/2-b.left+40; } else { const r=$('.post',posts[stop]).getBoundingClientRect(); x=r.left-b.left-14; }
    x=Math.min(x,b.width-8);
    tk.style.background=stop<0?'var(--green)':'var(--cyan)';
    if(anim&&!RM){ tk.style.transition='none'; tk.style.left='0px'; void tk.offsetWidth; tk.style.transition=''; }
    tk.style.left=x+'px';
    let o;
    if(!pass[0]) o=['warn','No reply, failure logged','The draft failed or timed out. The failure is saved for the team and nothing goes public.',[]];
    else if(cls.slice(1,4).includes('no')){ const why=[]; if(!pass[1]) why.push('The ticket is outside the support mailbox scope'); if(!pass[2]) why.push('The ticket is not assigned to the approved AI responder'); if(!pass[3]) why.push(`Confidence ${s.conf} is not above 60`); o=['','Private note for human review','The draft and a review link are posted as a private Freshdesk note. A support engineer takes it from here.',why]; }
    else if(!pass[4]) o=['warn','Duplicate blocked','A reply already went out for this ticket context, so nothing is sent twice.',[]];
    else o=['green','Direct public reply','The reply is posted to the customer, the ticket is set to Waiting on Customer and the send is logged.',[]];
    out.className='gout '+o[0]; out.innerHTML=`<small>Where the ticket goes</small><h3>${o[1]}</h3><p>${o[2]}</p>`+(o[3].length?`<ul>${o[3].map(w=>`<li>${w}</li>`).join('')}</ul>`:'');
  }
  const unpreset=()=>pre.forEach(b=>b.setAttribute('aria-pressed','false'));
  pre.forEach(b=>b.addEventListener('click',()=>{ s={...PR[b.dataset.p]}; pre.forEach(x=>x.setAttribute('aria-pressed',String(x===b))); render(true); }));
  sws.forEach(w=>w.addEventListener('click',()=>{ s[w.dataset.g]=s[w.dataset.g]?0:1; unpreset(); render(true); }));
  rg.addEventListener('input',()=>{ s.conf=+rg.value; unpreset(); render(false); });
  rg.addEventListener('change',()=>render(true));
  render(false); addEventListener('resize',()=>render(false));
  if(!RM) onView(gt,()=>render(true),.4);
})();

/* 07 HUMAN REVIEW: a working review screen */
(()=>{
  const ui=$('#rui'); if(!ui) return;
  const L=$('#rLog'), D=$('#rDraft'), E=$('#rEdit'), A=$('#rAI'), Cx=$('#rAdd'), O=$('#rOk'), done=$('#rDone'), ctx=$('#rCtx'), pill=$('#rPill'), steps=$$('#rSteps li');
  const ORIGINAL=D.textContent;
  const SHORT="Hi Sam,\n\nThanks for letting us know. Please check that the configuration change was also applied to the second package. If the error continues, send us its deployment log and we'll confirm the next step.";
  const log=(api,what)=>{ const d=document.createElement('div'); d.innerHTML=`<b>${api}</b><em>${what}</em>`; L.appendChild(d); L.scrollTop=L.scrollHeight; };
  const step=n=>steps.forEach((li,i)=>{ li.className=i<n?'done':(i===n?'on':''); });
  let editing=false;
  const setEdit=on=>{ editing=on; D.contentEditable=on?'true':'false'; $('span',E).textContent=on?'Save edit':'Edit by hand'; };
  function start(){ L.innerHTML=''; log('Review Interface','opened from the private note'); log('Load Ticket API','ticket, conversation and saved draft loaded'); step(1); }
  E.addEventListener('click',()=>{ if(!editing){ setEdit(true); D.focus(); log('Editing','typing directly in the draft'); step(2); } else { setEdit(false); log('Manual Edit API','edited draft saved, approval enabled'); } });
  A.addEventListener('click',async()=>{ if(editing) setEdit(false); A.disabled=true; D.classList.add('flash'); log('Draft and Edit API','instruction sent: make it shorter'); step(2); await sleep(RM?0:800); D.textContent=SHORT; log('Draft and Edit API','revised draft returned'); D.classList.remove('flash'); A.disabled=false; });
  Cx.addEventListener('click',()=>{ ctx.innerHTML='<span class="kicker">Context added</span><div class="ctx"><svg class="ico"><use href="#i-person"/></svg>Engineer note: second package uses a separate environment</div><div class="ctx"><svg class="ico"><use href="#i-clip"/></svg>deployment-log.txt</div>'; Cx.disabled=true; log('External Context API','note and file saved for the next draft'); step(2); });
  O.addEventListener('click',()=>{ if(editing){ setEdit(false); log('Manual Edit API','edited draft saved'); }
    [E,A,Cx,O].forEach(b=>b.disabled=true); log('Approval API','Markdown converted to HTML, approval marker added'); log('Freshdesk','approved response posted as a private note');
    pill.textContent='approved'; pill.classList.add('ok'); step(4);
    done.innerHTML='<div class="ok-banner"><svg class="ico"><use href="#i-tick"/></svg><span>Approved and posted to Freshdesk as a private note.</span><button type="button" class="btn" id="rReset" style="margin-left:auto;padding:6px 10px;font-size:.76rem;border-color:#16603f;color:#16603f">Start over</button></div>';
    $('#rReset').addEventListener('click',()=>{ D.textContent=ORIGINAL; ctx.innerHTML=''; pill.textContent='confidence 54 · needs review'; pill.classList.remove('ok'); done.innerHTML=''; [E,A,Cx,O].forEach(b=>b.disabled=false); setEdit(false); start(); }); });
  start();
})();

/* 08 DIFFERENCE: highlight a column */
(()=>{ const c=$('#cmp'), b=$$('#cmpSeg button'); if(!c) return; b.forEach(x=>x.addEventListener('click',()=>{ c.dataset.v=x.dataset.v; b.forEach(y=>y.setAttribute('aria-pressed',String(y===x))); })); })();

/* 09 RESULT: cards arrive in sequence */
(()=>{ const r=$('#res'); if(!r) return; $$('.rc',r).forEach((c,i)=>c.style.transitionDelay=(i*.07)+'s'); if(RM){ r.classList.remove('pend'); return; } onView(r,()=>r.classList.remove('pend'),.2); })();
