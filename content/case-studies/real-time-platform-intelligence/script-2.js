__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
const onView=(el,fn,th=.3)=>{ if(!el) return; const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const press=(btns,on)=>btns.forEach(b=>b.setAttribute('aria-pressed',b===on));
const CAT={mkt:['Marketing','c-mkt'],ux:['UX','c-ux'],sup:['Supply','c-sup'],sys:['System','c-sys'],cx:['Support risk','c-cx']};
const catHTML=k=>`<span class="bk-cat on ${CAT[k][1]}">${CAT[k][0]}</span>`;

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.08});
  els.forEach(e=>io.observe(e)); })();

/* HERO: live map + event stream + diagnosis (illustration) */
(()=>{ const NS='http://www.w3.org/2000/svg', zg=$('#hxZones'), dg=$('#hxDots'), feed=$('#hxFeed'), diag=$('#hxDiag'), cat=$('#hxCat'), txt=$('#hxTxt'), own=$('#hxOwn');
  if(!zg||!feed) return;
  const Z=[]; for(let r=0;r<2;r++) for(let c=0;c<3;c++){ const g=document.createElementNS(NS,'g'); g.innerHTML=`<rect class="zn" x="${c*106.6+2}" y="${r*120+2}" width="102.6" height="116"></rect><text class="zl" x="${c*106.6+8}" y="${r*120+14}">ZONE ${r*3+c+1}</text>`; zg.appendChild(g); Z.push(g.querySelector('rect')); }
  const D=[]; for(let i=0;i<13;i++){ const g=document.createElementNS(NS,'g'); g.setAttribute('class','dv'); const cust=i>9;
    g.innerHTML=cust?`<circle r="5" fill="#8e5cf7" stroke="#fff" stroke-width="2"></circle>`:`<circle r="6" fill="#00a82d" stroke="#fff" stroke-width="2"></circle><circle r="2" fill="#ffd400"></circle>`;
    dg.appendChild(g); D.push(g); }
  const move=()=>D.forEach(g=>{ g.style.transform=`translate(${(20+Math.random()*280).toFixed(1)}px,${(20+Math.random()*200).toFixed(1)}px)`; });
  move();
  const POOL=['app_open','fare_estimate','ride_request · Z2','driver_assigned · 0:38','ride_started','ride_completed','landing_page_view · A','parcel_request · Z5','driver_assigned · 0:52','rating · 5'];
  const BRK=[
    {k:'sup',z:5,ev:['ride_request · Z6','no driver_assigned · 2:00'],t:'<b>No driver within two minutes</b> in Zone 6: supply imbalance.',o:'Owner: Operations · incentive or move riders'},
    {k:'mkt',z:-1,ev:['landing_page_view · B','no fare_estimate · no request'],t:'<b>Campaign users land and leave:</b> low-intent traffic.',o:'Owner: Marketing · check targeting'},
    {k:'sys',z:3,ev:['ride_started · Z4','next event missing'],t:'<b>Expected event never arrived:</b> possible backend or app failure.',o:'Owner: Engineering · incident alert'},
    {k:'ux',z:-1,ev:['fare_view → payment_view','fare_view → payment_view'],t:'<b>Customers loop between two screens</b> without progressing.',o:'Owner: Product · fix the screen'},
    {k:'cx',z:1,ev:['driver_cancelled · Z2','driver_cancelled · again'],t:'<b>Journey matches a complaint pattern:</b> high support risk.',o:'Owner: Customer support · reach out now'}];
  const add=(h,miss)=>{ const li=document.createElement('li'); if(miss) li.className='miss'; const d=new Date(); li.innerHTML=`<span>${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}</span><b>${h}</b>`; feed.appendChild(li); while(feed.children.length>9) feed.firstChild.remove(); };
  const setDiag=b=>{ Z.forEach((z,i)=>z.classList.toggle('hot',i===b.z)); cat.className='bk-cat on '+CAT[b.k][1]; cat.textContent=CAT[b.k][0]; txt.innerHTML=b.t; own.textContent=b.o; diag.classList.remove('on'); void diag.offsetWidth; diag.classList.add('on'); };
  if(RM){ for(let i=0;i<5;i++) add(POOL[i]); BRK[0].ev.forEach((e,i)=>add(e,i===1)); setDiag(BRK[0]); return; }
  for(let i=0;i<4;i++) add(POOL[i]);
  let vis=false, n=0, started=false;
  new IntersectionObserver(es=>{ vis=es[0].isIntersecting; if(vis&&!started){ started=true; loop(); } },{threshold:.1}).observe($('#hx'));
  async function loop(){ while(true){ if(!vis){ await sleep(500); continue; }
      for(let i=0;i<3;i++){ add(POOL[Math.floor(Math.random()*POOL.length)]); if(i===1) move(); await sleep(650); }
      const b=BRK[n++%BRK.length]; add(b.ev[0]); await sleep(700); add(b.ev[1],true); await sleep(350); setDiag(b); move(); await sleep(2600); } }
})();

/* 01 PROBLEM: blame loop -> journey view */
(()=>{ const T=[['Marketing','mkt'],['Product','ux'],['Operations','sup'],['Engineering','sys']];
  const S=[
    {q:['“Traffic is up. The campaigns are working.”','“No release this week. The app hasn’t changed.”','“Driver numbers look normal for the day.”','“Uptime is fine. No alerts.”'],
     j:['landing_page_view','fare_estimate','ride_request','no driver_assigned in 2 min','request abandoned'],br:3,own:2,k:'sup',v:'Requests waited too long for a driver in a few zones at the evening peak. The daily total looked normal; the zones did not. <b>Operations</b> owns it.'},
    {q:['“Bookings are still coming in.”','“The cancellation flow is unchanged.”','“Drivers are accepting rides.”','“Servers are up.”'],
     j:['ride_request','driver_assigned','driver location updates stop','map freezes','customer cancels'],br:2,own:3,k:'sys',v:'After assignment, the next expected events stopped arriving, so customers saw a frozen map and cancelled. <b>Engineering</b> owns it.'},
    {q:['“Campaign volume is normal.”','“Feature usage looks healthy overall.”','“Fulfilment is on target.”','“No crash reports.”'],
     j:['fare_estimate','payment_select','fare_estimate','payment_select again','contacts support'],br:3,own:1,k:'ux',v:'Customers kept switching between the fare and payment screens without progressing, then contacted support. <b>Product</b> owns it.'}];
  const box=$('#teams'), strip=$('#jstrip'), V=$('#loopV'), go=$('#loopGo'), B=$$('#symp button');
  const spark=()=>{ let d='M0 15'; for(let x=10;x<=120;x+=10) d+=` L${x} ${(12+Math.random()*6).toFixed(1)}`; return `<svg class="spark" viewBox="0 0 120 30" preserveAspectRatio="none" aria-hidden="true"><path d="${d}"/></svg>`; };
  let cur=0, tok=0, user=false;
  function silo(i){ ++tok; cur=i; const s=S[i];
    box.innerHTML=T.map((t,j)=>`<div class="bk-team"><span class="bk-cat ${CAT[t[1]][1]}">${t[0]}</span>${spark()}<q>${s.q[j].replace(/[“”]/g,'')}</q></div>`).join('');
    strip.innerHTML=s.j.map(e=>`<span>${e}</span>`).join('');
    V.className='bk-verdict'; V.innerHTML='<span class="ic">?</span><span>Four dashboards, four answers of “not us”. <b>Cause unknown</b>, so the investigation goes manual, team by team.</span>';
    go.disabled=false; }
  async function reveal(){ const my=++tok, s=S[cur]; go.disabled=true; const sp=$$('#jstrip span');
    for(let i=0;i<sp.length;i++){ if(my!==tok) return; sp[i].classList.add('on'); if(i===s.br) sp[i].classList.add('br'); await sleep(260); }
    if(my!==tok) return;
    $$('#teams .bk-team').forEach((t,j)=>{ t.classList.toggle('owner',j===s.own); t.classList.toggle('dim',j!==s.own); });
    V.className='bk-verdict found'; V.innerHTML=`<span class="ic">✓</span><span>${catHTML(s.k)} ${s.v}</span>`; }
  B.forEach((b,i)=>b.addEventListener('click',()=>{ user=true; press(B,b); silo(i); }));
  go.addEventListener('click',()=>{ user=true; reveal(); });
  silo(0);
  onView($('#loop'),async()=>{ await sleep(2400); if(!user) reveal(); },.4);
})();

/* 02 PRINCIPLE: one journey, every team */
(()=>{ const TM=[['Marketing','mkt','#8e5cf7'],['Product · UX','ux','#ffd400'],['Operations · supply','sup','#00a82d'],['Engineering · system','sys','#e5322d'],['Customer support','cx','#252a4a']];
  const ST=[['Arrives from a campaign','landing_page_view',['mkt']],['Opens the app','app_open',['ux','sys']],['Checks the fare','fare_estimate',['mkt','ux']],['Requests a ride','ride_request',['mkt','sup','sys']],
    ['Driver assigned','driver_assigned',['sup','sys']],['Ride starts','ride_started',['sup','sys']],['Ride completed','ride_completed',['sup','sys','cx']],['Rates the ride or contacts support','rating · support_contact',['ux','cx']]];
  const sel=$('#tsel'), list=$('#steps');
  sel.innerHTML=TM.map(t=>`<button type="button" aria-pressed="false" data-k="${t[1]}"><i style="background:${t[2]}"></i>${t[0]}</button>`).join('');
  list.innerHTML=ST.map((s,i)=>`<li data-t="${s[2].join(' ')}"><span class="n">${String(i+1).padStart(2,'0')}</span><span class="t"><b>${s[0]}</b><code>${s[1]}</code></span><span class="tm">${TM.map(t=>`<i style="background:${t[2]}" class="${s[2].includes(t[1])?'on':''}" title="${t[0]}"></i>`).join('')}</span></li>`).join('');
  const B=$$('#tsel button'), L=$$('#steps li'); let on=null, tok=0;
  B.forEach(b=>b.addEventListener('click',()=>{ const k=b.dataset.k; on=(on===k)?null:k; B.forEach(x=>x.setAttribute('aria-pressed',x.dataset.k===on)); list.classList.toggle('f',!!on); L.forEach(l=>l.classList.toggle('w',!!on&&l.dataset.t.split(' ').includes(on))); }));
  async function play(){ const my=++tok; for(let i=0;i<L.length;i++){ if(my!==tok) return; L.forEach((l,j)=>l.classList.toggle('here',j<=i)); await sleep(420); } }
  $('#jPlay').addEventListener('click',play);
  onView($('#jour'),()=>{ if(tok===0) play(); },.4);
})();

/* 03 DIAGNOSE: phone simulator */
(()=>{ const S=[
  {k:'mkt',t:'Campaign traffic stalls',d:'Users land from a campaign, then go nowhere.',h:'Campaign visitor',
   ev:[['0:00','ad_click','Campaign B'],['0:03','landing_page_view','Promo page']],exp:['fare_estimate · ride_request','Expected next step'],miss:['0:40','session ends','No pricing view, no ride request'],clock:[3,40],
   rule:'landing_page_view, then no pricing view or ride request',why:'Low-intent traffic or misaligned campaign targeting, not a product failure',team:'Marketing',act:'Review the campaign’s targeting while it is still running.'},
  {k:'ux',t:'Customers loop between screens',d:'Back and forth, never moving forward.',h:'Customer journey',
   ev:[['0:00','app_open','Home'],['0:04','fare_estimate_view','Fare screen'],['0:09','payment_select_view','Payment screen'],['0:12','fare_estimate_view','Back to fare','rep'],['0:16','payment_select_view','Payment again','rep'],['0:19','fare_estimate_view','Back again','rep']],exp:null,miss:['0:31','journey stalled','No ride request'],clock:[19,31],
   rule:'Repeated navigation between the same screens without progressing',why:'UI / UX friction on the fare and payment screens',team:'Product',act:'Product sees the exact screens where journeys stall.'},
  {k:'sup',t:'No driver within two minutes',d:'The request is made. No one is assigned.',h:'Ride request · Zone 7',
   ev:[['0:00','app_open','Home'],['0:05','fare_estimate','Zone 7'],['0:11','ride_request','Zone 7']],exp:['driver_assigned','Expected within 2:00'],miss:['2:11','no driver_assigned','Two-minute window passed'],clock:[0,120],lbl:'Waiting for a driver',
   rule:'ride_request with no driver_assigned inside the two-minute window',why:'Supply imbalance in Zone 7',team:'Operations',act:'Driver incentives in Zone 7, or move riders in from nearby zones.'},
  {k:'sys',t:'The next event never arrives',d:'A step fires; the one after it doesn’t.',h:'Trip in progress',
   ev:[['0:00','ride_request',''],['0:38','driver_assigned',''],['4:12','ride_started','Trip begins']],exp:['trip_progress','Expected next event'],miss:['5:10','trip_progress missing','Event sequence broken'],clock:[0,58],lbl:'Since last event',
   rule:'ride_started fired; the next expected event did not',why:'Possible backend failure, API issue or mobile app crash',team:'Engineering',act:'An incident alert, kept separate from operational problems.'},
  {k:'cx',t:'Journey heading for a complaint',d:'Two cancellations. The customer is still waiting.',h:'Ride request',
   ev:[['0:00','ride_request',''],['0:40','driver_assigned',''],['2:10','driver_cancelled','','rep'],['2:30','ride_request','Again'],['3:05','driver_assigned',''],['5:20','driver_cancelled','Second time','rep']],exp:null,miss:['5:21','complaint pattern','Customer still in the app'],clock:[320,321],
   rule:'A journey breakpoint that usually ends in a complaint',why:'High support risk: this customer is likely to contact support',team:'Customer support',act:'CX steps in while the customer is still active, before a ticket.'}];
  const box=$('#scn'), list=$('#phList'), dx=$('#dx'), tm=$('#phTimer'), lbl=$('#phLbl'), title=$('#phT'), cats=$$('#cats .bk-cat');
  box.innerHTML=S.map((s,i)=>`<button type="button" aria-pressed="false" data-i="${i}"><b>${s.t}</b><span class="bk-cat ${CAT[s.k][1]}">${CAT[s.k][0]}</span><span class="d">${s.d}</span></button>`).join('');
  const B=$$('#scn button'); let tok=0, cur=2;
  const fmt=t=>Math.floor(t/60)+':'+String(t%60).padStart(2,'0');
  const li=(e,cls)=>`<li class="${cls||e[3]||''}"><span class="tm">${e[0]}</span><span class="dt"></span><span class="ev"><code>${e[1]}</code>${e[2]?`<span>${e[2]}</span>`:''}</span></li>`;
  async function run(i){ const my=++tok, s=S[i]; cur=i; press(B,B[i]); title.textContent=s.h; list.innerHTML=''; dx.innerHTML='<span class="wait">Watching the journey…</span>'; tm.className='timer'; tm.textContent='0:00'; lbl.textContent='Live'; cats.forEach(c=>c.classList.remove('on'));
    for(const e of s.ev){ if(my!==tok) return; list.insertAdjacentHTML('beforeend',li(e)); tm.textContent=e[0]; await sleep(520); }
    if(s.exp){ list.insertAdjacentHTML('beforeend',li(['…',s.exp[0],s.exp[1]],'exp')); lbl.textContent=s.lbl||'Waiting'; }
    const [a,b]=s.clock; const steps=24; for(let k=0;k<=steps;k++){ if(my!==tok) return; const t=Math.round(a+(b-a)*k/steps); tm.textContent=fmt(t); await sleep(55); }
    if(my!==tok) return;
    const ex=list.querySelector('li.exp'); if(ex) ex.remove();
    list.insertAdjacentHTML('beforeend',li(s.miss,'miss')); tm.className='timer late'; lbl.textContent='Break detected';
    await sleep(300); if(my!==tok) return;
    cats.forEach(c=>c.classList.toggle('on',c.classList.contains(CAT[s.k][1])));
    const rows=[['Break detected',s.rule],['Classified as',`${catHTML(s.k)} <span style="display:block;margin-top:5px">${s.why}</span>`],['Owner',`<b>${s.team}</b>`],['Next step',s.act]];
    dx.innerHTML='';
    for(const r of rows){ if(my!==tok) return; dx.insertAdjacentHTML('beforeend',`<div><small>${r[0]}</small><span>${r[1]}</span></div>`); await sleep(260); } }
  B.forEach((b,i)=>b.addEventListener('click',()=>run(i)));
  $('#simAgain').addEventListener('click',()=>run(cur));
  press(B,B[2]);
  if(RM) run(2); else onView($('#sim'),()=>{ if(tok===0) run(2); },.35);
})();

/* 04 SUPPLY: zones */
(()=>{ const TOD=['Morning','Midday','Evening peak','Late night'];
  const M=[['o','t','o','s','o','g','t','o','s','o','o','o'],['o','o','s','o','o','o','t','o','o','s','o','o'],['t','g','o','s','g','t','o','o','s','o','g','o'],['s','o','s','o','o','s','o','g','o','s','o','s']];
  const CL={o:'ok',s:'sur',t:'tight',g:'gap'}, TX={o:'Balanced',s:'Spare drivers',t:'Demand rising',g:'No driver in 2 min'};
  const grid=$('#zgrid'), panel=$('#zpanel'), cnt=$('#zCount'), TB=$$('#tod button');
  let st=[], t=2, sel=-1, logTxt='';
  const near=i=>{ const r=Math.floor(i/4), c=i%4; let best=-1, bd=99; st.forEach((v,j)=>{ if(v!=='s') return; const d=Math.abs(Math.floor(j/4)-r)+Math.abs(j%4-c); if(d<bd){ bd=d; best=j; } }); return best; };
  function draw(){ grid.innerHTML=st.map((v,i)=>`<button type="button" class="${CL[v]}" aria-pressed="${i===sel}" data-i="${i}"><b>ZONE ${i+1}</b><span>${TX[v]}</span></button>`).join('');
    $$('#zgrid button').forEach(b=>b.addEventListener('click',()=>{ sel=+b.dataset.i; logTxt=''; draw(); }));
    const g=st.filter(v=>v==='g').length, ti=st.filter(v=>v==='t').length; cnt.textContent=g+ti?`${g} flagged · ${ti} rising`:'All zones within the window';
    info(); }
  function info(){ if(sel<0){ panel.innerHTML='<small>Select a zone</small>'; return; } const v=st[sel], s=near(sel);
    const body={g:'Ride requests are waiting more than two minutes for a driver. The system flags a supply imbalance.',t:'Demand is rising faster than drivers are freeing up. A spike that may need an incentive.',s:'More drivers than requests right now. A source for redistribution.',o:'Requests are being assigned within the window.'}[v];
    let acts=''; if(v==='g'||v==='t') acts+=`<button type="button" class="bk-btn y" data-a="inc">Send driver incentive</button>`; if(v==='g'&&s>=0) acts+=`<button type="button" class="bk-btn" data-a="mv">Move riders from Zone ${s+1}</button>`;
    panel.innerHTML=`<small>${TOD[t]}</small><h3>Zone ${sel+1} · ${TX[v]}</h3><p>${body}</p>${acts?`<div class="acts">${acts}</div>`:''}<div class="log">${logTxt||'Operations view · sample city'}</div>`;
    $$('#zpanel [data-a]').forEach(b=>b.addEventListener('click',()=>act(b.dataset.a))); }
  async function act(a){ const i=sel; if(a==='inc'){ st[i]=st[i]==='g'?'t':'o'; logTxt=`<b>✓</b> Incentive live in Zone ${i+1} · ${st[i]==='o'?'zone balanced':'requests assigned faster, still rising'}`; }
    else { const s=near(i); if(s<0) return; st[s]='o'; st[i]='o'; logTxt=`<b>✓</b> Riders moved from Zone ${s+1} to Zone ${i+1} · both zones balanced`; }
    draw(); }
  function setT(k){ t=k; press(TB,TB[k]); st=M[k].slice(); sel=st.indexOf('g'); if(sel<0) sel=st.indexOf('t'); logTxt=''; draw(); }
  TB.forEach((b,k)=>b.addEventListener('click',()=>setT(k)));
  setT(2);
})();

/* 05 MARKETING: clicks vs journeys */
(()=>{ const ST=['landing_page_view','fare_estimate','ride_request','ride_completed'], V={a:[46,36,29,25],b:[100,20,7,4]};
  const A=$('#fun .a'), Bx=$('#fun .b'), MB=$$('#mode button'), flag=$('#mflag'), ta=$('#tagA'), tb=$('#tagB');
  [['a',A],['b',Bx]].forEach(([k,el])=>el.insertAdjacentHTML('beforeend',ST.map((s,i)=>`<div class="bk-bar" data-i="${i}"><span>${s}</span><div><i data-w="${V[k][i]}"></i></div></div>`).join('')));
  let user=false;
  function set(m){ press(MB,MB[m]);
    $$('#fun .bk-bar').forEach(b=>{ const i=+b.dataset.i, show=m===1||i===0; b.classList.toggle('hid',!show); b.querySelector('i').style.width=show?b.querySelector('i').dataset.w+'%':'0'; });
    Bx.classList.toggle('flag',m===1);
    if(m===0){ ta.className='bk-cat c-sup'; ta.textContent='Looks smaller'; tb.className='bk-cat c-mkt'; tb.textContent='Looks bigger'; flag.innerHTML='Counting clicks, Campaign B looks like the clear winner.'; }
    else { ta.className='bk-cat on c-sup'; ta.textContent='Quality demand'; tb.className='bk-cat on c-mkt'; tb.textContent='Low intent'; flag.innerHTML='<b>Flagged:</b> Campaign B’s users land, but few reach pricing or a ride request. That is low-intent traffic or misaligned targeting, not a product failure, so marketing can adjust it while it runs.'; } }
  MB.forEach((b,m)=>b.addEventListener('click',()=>{ user=true; set(m); }));
  requestAnimationFrame(()=>set(0));
  onView($('#mkt'),async()=>{ await sleep(2200); if(!user) set(1); },.4);
})();

/* 06 SUPPORT: reactive vs preventive */
(()=>{ const T=[
    {cap:'Support learns about the problem from the customer.',s:[['JOURNEY FAILS','Driver cancels twice','The customer gives up','bad'],['SILENCE','No one knows yet','The failure sits in tomorrow’s report',''],['LATER','Customer contacts support','A ticket is opened',''],['INVESTIGATION','Agent checks with other teams','Manual work across tools',''],['OUTCOME','Resolved after the fact','The bad experience already happened','bad']]},
    {cap:'Support learns about the problem from the journey.',s:[['JOURNEY FAILS','Driver cancels twice','The customer is still in the app','bad'],['FLAGGED','Breakpoint detected','Matches a known complaint pattern',''],['CX STEPS IN','Proactive outreach','While the customer is active','good'],['RESOLVED','Issue handled early','No ticket needed','good'],['OUTCOME','Fewer tickets','Support prevents instead of reacts','good']]}];
  const tr=$('#track'), cap=$('#tlCap'), B=$$('#tlMode button'); let tok=0, user=false;
  async function show(v){ const my=++tok; press(B,B[v]); cap.innerHTML='<b>'+T[v].cap+'</b>'; tr.innerHTML=T[v].s.map(x=>`<div class="${x[3]}"><em>${x[0]}</em><b>${x[1]}</b><span>${x[2]}</span></div>`).join('');
    const D=$$('#track div'); for(const d of D){ if(my!==tok) return; await sleep(RM?0:330); d.classList.add('on'); } }
  B.forEach((b,v)=>b.addEventListener('click',()=>{ user=true; show(v); }));
  show(0);
  onView($('#tl'),async()=>{ await sleep(2800); if(!user) show(1); },.4);
})();

/* 07 VIEWS: minute / hour / day */
(()=>{ const L=[['Marketing demand','#8e5cf7'],['Supply dynamics','#00a82d'],['Product UX','#e0b800'],['System health','#e5322d'],['Support risk','#252a4a']];
  const svg=$('#chart'), lyr=$('#lyr'), B=$$('#span button'); const W=720,H=240,P=16;
  let seed=7; const rnd=()=>{ seed=(seed*9301+49297)%233280; return seed/233280; };
  const on=L.map(()=>true); let view=0, timer=null, live=[];
  const minute=()=>L.map((l,k)=>Array.from({length:60},(_,i)=>[.62,.55,.32,.18,.26][k]+(rnd()-.5)*.12+(k===3&&i>44&&i<49?.35:0)));
  const hourly=()=>{ const pk=h=>Math.exp(-((h-8.5)**2)/3)*.55+Math.exp(-((h-19)**2)/4)*.75; return L.map((l,k)=>Array.from({length:25},(_,h)=>{ const p=pk(h); return [ .12+p, .2+p*.8+(h>17&&h<21?-.12:0), .28+(rnd()-.5)*.06, .14+(h===13?.3:0)+(rnd()-.5)*.04, .1+p*.5 ][k]; })); };
  const daily=()=>{ const wk=[.75,.7,.72,.74,.86,.95,.6]; return L.map((l,k)=>Array.from({length:14},(_,d)=>{ const w=wk[d%7]; return [w*.8,w*.75,.3+(d===9?-.08:0),.15+(d===4?.25:0),.12+w*.25][k]+(rnd()-.5)*.04; })); };
  const LBL=[['60 min ago','45','30','15','now'],['00:00','06:00','12:00','18:00','24:00'],['Week 1 · Mon','Thu','Week 2 · Mon','Thu','Sun']];
  function path(a){ const n=a.length; return a.map((v,i)=>`${i?'L':'M'}${(P+(W-2*P)*i/(n-1)).toFixed(1)} ${(H-P-(H-2*P)*Math.max(0,Math.min(1,v))).toFixed(1)}`).join(' '); }
  function draw(data){ let g=''; for(let i=1;i<5;i++){ const y=P+(H-2*P)*i/5; g+=`<line class="gl" x1="${P}" x2="${W-P}" y1="${y}" y2="${y}"/>`; }
    svg.innerHTML=g+data.map((a,k)=>`<path class="ln" d="${path(a)}" stroke="${L[k][1]}" style="opacity:${on[k]?1:0}"/>`).join(''); }
  const ax=document.createElement('div'); ax.style.cssText='display:flex;justify-content:space-between;padding:6px 16px 8px;font:500 .62rem var(--mono);color:var(--bk-mut)'; svg.parentNode.appendChild(ax);
  function set(v){ view=v; press(B,B[v]); clearInterval(timer); ax.innerHTML=LBL[v].map(x=>`<span>${x}</span>`).join('');
    if(v===0){ live=minute(); draw(live); if(!RM) timer=setInterval(()=>{ if(!document.body.contains(svg)) return clearInterval(timer); live=live.map((a,k)=>{ const b=a.slice(1); b.push([.62,.55,.32,.18,.26][k]+(rnd()-.5)*.12); return b; }); draw(live); },1000); }
    else draw(v===1?hourly():daily()); }
  lyr.innerHTML=L.map((l,k)=>`<button type="button" aria-pressed="true" data-k="${k}"><i style="background:${l[1]}"></i>${l[0]}</button>`).join('');
  $$('#lyr button').forEach(b=>b.addEventListener('click',()=>{ const k=+b.dataset.k; on[k]=!on[k]; b.setAttribute('aria-pressed',on[k]); $$('#chart .ln')[k].style.opacity=on[k]?1:0; }));
  B.forEach((b,v)=>b.addEventListener('click',()=>set(v)));
  set(0);
})();

/* 08 ARCHITECTURE + ASK */
(()=>{ const D=['Every tap, screen view, request, assignment and status change in the app and backend becomes an event, for customers and drivers alike.',
    '<b>Real-time</b> application event tracking carries millions of events as they happen.',
    '<b>SQL-based transformations</b> turn raw events into journeys and signals: where each journey is, and what should come next.',
    'A <b>centralised analytics store</b> keeps the history, so the minute, hour and day views all come from one source.',
    '<b>Operational BI dashboards</b> for each team, and an <b>AI-assisted query interface</b> for exploring platform signals in plain language.'];
  const B=$$('#flow button'), det=$('#adet');
  const show=i=>{ press(B,B[i]); det.style.animation='none'; det.offsetHeight; det.style.animation=''; det.innerHTML=`<small>Layer ${i+1} of 5</small><div style="margin-top:4px">${D[i]}</div>`; };
  B.forEach((b,i)=>b.addEventListener('click',()=>show(i))); show(0);
  const Q=[
    ['Why did conversions dip in Zone 7 this evening?','Ride requests in Zone 7 rose at the evening peak, but driver assignment fell outside the two-minute window. App screens and system events were normal, so this is <b>supply</b>, not UX or a technical fault. Nearby Zone 4 has spare drivers.',['Supply signals','UX signals','System health']],
    ['Is the new campaign bringing real customers?','Campaign B drives many landing page views, but few of those journeys reach a fare check or a ride request. Treat it as <b>low-intent traffic</b>: the app and supply look healthy for its users.',['Marketing funnel','UX signals']],
    ['Which screen is confusing customers today?','Journeys stall where customers move back and forth between the fare and payment screens without requesting a ride. It is flagged as <b>UX friction</b> for Product.',['UX signals','Support risk']]];
  const qs=$('#qs'), chat=$('#chat'); qs.innerHTML=Q.map((q,i)=>`<button type="button" aria-pressed="false" data-i="${i}">${q[0]}</button>`).join('');
  const QB=$$('#qs button'); let tok=0;
  async function ask(i){ const my=++tok, q=Q[i]; press(QB,QB[i]); chat.innerHTML=`<div class="u">${q[0]}</div><div class="dots" aria-label="Thinking"><i></i><i></i><i></i></div>`; await sleep(800); if(my!==tok) return;
    chat.querySelector('.dots').remove(); chat.insertAdjacentHTML('beforeend',`<div class="a"><span>${q[1]}</span><div class="src">${q[2].map(s=>`<span>${s}</span>`).join('')}</div></div>`); }
  QB.forEach((b,i)=>b.addEventListener('click',()=>ask(i)));
  chat.innerHTML='<span class="bk-note">Pick a question.</span>';
  onView($('.bk-ask'),()=>{ if(tok===0) ask(0); },.4);
})();

/* RESULTS */
(()=>{ const ba=$('#ba'), f=$('#found'); if(RM){ ba.classList.add('in'); f.classList.add('in'); } else { onView(ba,()=>ba.classList.add('in'),.2); onView(f,()=>f.classList.add('in'),.3); } })();
