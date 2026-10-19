__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
const onView=(el,fn,th=.3)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const segBind=(root,attr,cb)=>{ const B=[...root.querySelectorAll('button['+attr+']')]; B.forEach(b=>b.addEventListener('click',()=>{ B.forEach(x=>x.setAttribute('aria-pressed',x===b)); cb(b.getAttribute(attr),true); })); return v=>{ B.forEach(x=>x.setAttribute('aria-pressed',x.getAttribute(attr)===v)); }; };
const fmt=n=>Math.round(n).toLocaleString('en-US');
const PN=['OpenAI','Anthropic','Vertex AI'];
const visible=el=>{ const r=el.getBoundingClientRect(); return r.bottom>0&&r.top<innerHeight; };

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.08});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* HERO: requests flow channel → queue → router → provider */
(()=>{ const hx=$('#hx'),cv=$('#hcv'),ctx=cv.getContext('2d'),k=$('#hk'); let W,H,A=null,parts=[],busy=-1,n=0,rr=0,last=0;
  const C=$$('#hx [data-c]'),P=$$('#hx [data-p]'),Q=$('#hx .tl-hmid');
  const anchor=()=>{ const o=hx.getBoundingClientRect(); W=cv.width=o.width; H=cv.height=o.height; const q=Q.getBoundingClientRect();
    A={c:C.map(e=>{ const r=e.getBoundingClientRect(); return [r.right-o.left,r.top-o.top+r.height/2]; }),p:P.map(e=>{ const r=e.getBoundingClientRect(); return [r.left-o.left,r.top-o.top+r.height/2]; }),q:[q.left-o.left,q.top-o.top+q.height/2],r:[q.right-o.left,q.top-o.top+q.height/2]}; };
  const kp=()=>{ k.innerHTML=`<span><b>${fmt(n)}</b> requests answered</span><span><b>0</b> 429s reaching users</span><span><b>${fmt(rr)}</b> re-routed</span>`; };
  anchor(); addEventListener('resize',anchor); kp();
  const pick=()=>{ let p; do{ p=Math.floor(Math.random()*3); }while(p===busy); return p; };
  const spawn=()=>{ const c=Math.floor(Math.random()*3); parts.push({c,p:Math.floor(Math.random()*3),t:0,s:.008+Math.random()*.006}); };
  const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
  const pos=x=>{ const t=x.t; if(t<1) return lerp(A.c[x.c],A.q,t); if(t<2) return lerp(A.q,A.r,t-1); return lerp(A.r,A.p[x.p],Math.min(1,t-2)); };
  function frame(ts){ ctx.clearRect(0,0,W,H);
    ctx.strokeStyle='rgba(255,210,0,.12)'; ctx.lineWidth=1; for(const c of A.c){ ctx.beginPath(); ctx.moveTo(...c); ctx.lineTo(...A.q); ctx.stroke(); } A.p.forEach((p,i)=>{ ctx.strokeStyle=i===busy?'rgba(193,21,34,.35)':'rgba(255,210,0,.12)'; ctx.beginPath(); ctx.moveTo(...A.r); ctx.lineTo(...p); ctx.stroke(); });
    if(ts-last>70){ last=ts; spawn(); if(Math.random()<.5) spawn(); }
    for(const x of parts){ x.t+=x.s*(x.t>1&&x.t<2?2.4:1)*3; if(x.t>=2&&!x.d){ x.d=1; if(x.p===busy){ x.p=pick(); rr++; } } const [px,py]=pos(x); ctx.fillStyle=x.t<1?'rgba(255,255,255,.75)':'#ffd200'; ctx.fillRect(px-1.5,py-1.5,3,3); }
    const before=parts.length; parts=parts.filter(x=>x.t<3); n+=before-parts.length; kp();
    requestAnimationFrame(frame); }
  if(RM){ n=1284; rr=37; kp(); return; }
  requestAnimationFrame(frame);
  (async()=>{ for(;;){ await sleep(3500); busy=Math.floor(Math.random()*3); P.forEach((e,i)=>e.classList.toggle('busy',i===busy)); await sleep(2600); busy=-1; P.forEach(e=>e.classList.remove('busy')); } })();
  setInterval(anchor,2500);
})();

/* PROBLEM: traffic vs provider limit */
(()=>{ const r=$('#srange'),svg=$('#schart'); let mode='before',user=false,started=false,ok=0,fail=0,t=0; const D=[];
  const LIM=1000,MAXY=3400;
  const demand=()=>{ const m=+r.value/10; return Math.max(0,800*m*(1+.18*Math.sin(t/3))+(Math.random()-.5)*160*m+(Math.random()<.08?400*m:0)); };
  function step(){ t++; const d=demand(); let a,f; if(mode==='before'){ a=Math.min(d,LIM); f=Math.max(0,d-LIM); } else { a=d; f=0; } D.push([a,f]); if(D.length>30) D.shift(); ok+=a; fail+=f; draw(); }
  function draw(){ const y=v=>120-v/MAXY*116, x=i=>i*300/29;
    const top=D.map(([a,f],i)=>`${x(i)},${y(a+f)}`).join(' '), mid=D.map(([a],i)=>`${x(i)},${y(a)}`).join(' ');
    const L=mode==='before'?LIM:3*LIM;
    svg.innerHTML=D.length<2?'':`<polygon points="0,120 ${mid} ${x(D.length-1)},120" fill="var(--cp)" opacity=".85"/><polygon points="${mid.split(' ').reverse().join(' ')} ${top}" fill="var(--cr)"/><line x1="0" x2="300" y1="${y(L)}" y2="${y(L)}" stroke="#24262c" stroke-dasharray="4 3" stroke-width="1.2" vector-effect="non-scaling-stroke"/><text x="4" y="${y(L)-4}" font-size="8" fill="#24262c">${mode==='before'?'provider limit':'combined capacity, queue-smoothed'}</text>`;
    $('#sok').textContent=fmt(ok); $('#sfail').textContent=fmt(fail); $('#srate').textContent=(ok+fail?fail/(ok+fail)*100:0).toFixed(1)+'%'; }
  const label=()=>{ $('#snum').textContent=(+r.value/10).toFixed(1)+'×'; $('#snote').textContent=mode==='before'?'Illustrative traffic and limits. One provider, one region, no queue: anything over the limit fails.':'Illustrative. Queue plus routing across three providers: spikes wait briefly, then get answered.'; };
  const reset=()=>{ ok=0; fail=0; D.length=0; };
  const setM=segBind($('#sim'),'data-m',(v,u)=>{ if(u) user=true; mode=v; reset(); label(); });
  r.addEventListener('input',()=>{ user=true; label(); });
  label();
  onView($('#sim'),async()=>{ started=true; setInterval(()=>{ if(visible(svg)||D.length<30) step(); },RM?800:400); await sleep(3000); if(user) return; r.value=19; label(); await sleep(5500); if(user) return; mode='after'; setM('after'); reset(); label(); },.3);
})();

/* QUEUE */
(()=>{ const L=[['Priority','Live voice conversations','v'],['Standard','Chat messages','c'],['Deferred','Image analysis and background tasks','i']];
  $('#qlanes').innerHTML=L.map((l,i)=>`<div class="tl-lane" data-l="${i}"><div class="lh"><b>${l[0]}</b><span>${l[1]}</span></div><div class="lq"></div></div>`).join('');
  const Qs=[[],[],[]],LQ=$$('#qlanes .lq'),log=$('#qlog'); let done=0,id=48210,spike=0,user=false;
  const lg=s=>{ const t=new Date(); log.insertAdjacentHTML('afterbegin',`<span><em>${t.toTimeString().slice(0,8)}</em> ${s}</span>`); while(log.children.length>6) log.lastChild.remove(); };
  const add=(n)=>{ for(let k=0;k<n;k++){ const r=Math.random(), l=r<.25?0:r<.8?1:2; Qs[l].push({id:id++,retry:Math.random()<.025}); } };
  function render(){ LQ.forEach((q,i)=>{ const a=Qs[i]; q.innerHTML=a.slice(0,24).map(x=>`<i class="${x.retry===2?'rt':''}"></i>`).join('')+(a.length>24?`<em>+${a.length-24}</em>`:''); });
    const d=Qs.reduce((s,a)=>s+a.length,0); $('#qdepth').textContent=d; $('#qdone').textContent=fmt(done); $('#qstat').textContent=spike>0?'Traffic spike: queue absorbing it':d>12?'Draining the backlog':'Steady traffic'; $('#qstat').classList.toggle('hot',spike>0); }
  function tick(){ if(spike>0){ add(9); spike--; } else if(Math.random()<.7) add(1+Math.floor(Math.random()*2));
    let cap=4; for(let l=0;l<3&&cap>0;l++){ while(Qs[l].length&&cap>0){ const x=Qs[l][0]; if(x.retry===true){ x.retry=2; lg(`req ${x.id}: provider returned a temporary error, retrying`); cap--; break; } Qs[l].shift(); cap--; done++; if(x.retry===2) lg(`req ${x.id}: retry succeeded on another provider`); } }
    render(); }
  render(); lg('Queue online across regions');
  $('#qspike').onclick=()=>{ user=true; spike=6; lg('Spike: '+(6*9)+' requests in under 2 seconds'); lg('Voice requests moved to the front of the queue'); };
  onView($('#qx'),async()=>{ setInterval(()=>{ if(visible($('#qx'))) tick(); },RM?600:300); await sleep(2500); if(user) return; spike=6; lg('Spike: 54 requests in under 2 seconds'); lg('Voice requests moved to the front of the queue'); },.3);
})();

/* ROUTING */
(()=>{ const P=PN.map((n,i)=>({n,sp:.6+Math.random()*.3,ch:[.55,.5,.8][i],ld:0,st:'ok',c:0}));
  const WT={bal:{s:1,c:1,h:1.4},lat:{s:2.6,c:.3,h:1.2},cost:{s:.3,c:2.6,h:1.2}};
  let o='bal',user=false,n=0,hist=[],seq=91820,lastMsg=0;
  const LIM=22,log=$('#rlog');
  const ST={ok:['Healthy','ok'],lim:['At rate limit','warn'],off:['Offline','risk']};
  const lg=s=>{ log.insertAdjacentHTML('afterbegin',`<span>${s}</span>`); while(log.children.length>7) log.lastChild.remove(); };
  $('#rprov').innerHTML=P.map((p,i)=>`<div class="tl-pc" data-i="${i}"><div class="ph"><b>${p.n}</b><span class="iv-chip ok">Healthy</span></div>
    <div class="pm"><span>Speed now</span><div><i class="k-sp"></i></div></div><div class="pm"><span>Cost advantage</span><div><i class="k-ch"></i></div></div><div class="pm"><span>Headroom</span><div><i class="k-hd"></i></div></div>
    <div class="pb"><button type="button" class="se-btn" data-a="lim">Hit rate limit</button><button type="button" class="se-btn" data-a="off">Take offline</button></div></div>`).join('');
  const PC=$$('#rprov .tl-pc');
  function set(i,st,u){ const p=P[i]; const was=p.st; p.st=p.st===st?'ok':st; if(u) user=true;
    if(p.st!=='ok'){ const alt=P.filter(x=>x.st==='ok').map(x=>x.n); lg(`<b class="r">${p.n} ${p.st==='lim'?'reached its rate limit':'is unavailable'}</b> → routing to ${alt.length?alt.join(' and '):'the queue until a provider recovers'}`); }
    else if(was!=='ok') lg(`<b class="g">${p.n} recovered</b> → back in rotation`); if(p.st==='lim') p.ld=LIM; paint(); }
  PC.forEach((c,i)=>c.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>set(i,b.dataset.a,true))));
  $('#rreset').onclick=()=>{ user=true; P.forEach((p,i)=>{ if(p.st!=='ok') set(i,p.st,true); }); };
  segBind($('#rt'),'data-o',v=>{ user=true; o=v; lg(`Priority changed to <b>${{bal:'balanced',lat:'fastest',cost:'lowest cost'}[v]}</b>`); });
  function paint(){ PC.forEach((c,i)=>{ const p=P[i],h=p.st==='ok'?Math.max(0,1-p.ld/LIM):0; c.className='tl-pc s-'+p.st; c.querySelector('.iv-chip').className='iv-chip '+ST[p.st][1]; c.querySelector('.iv-chip').textContent=p.st==='ok'&&h<.25?'Near limit':ST[p.st][0];
      c.querySelector('.k-sp').style.width=(p.st==='off'?0:p.sp*100)+'%'; c.querySelector('.k-ch').style.width=p.ch*100+'%'; c.querySelector('.k-hd').style.width=h*100+'%';
      c.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',p.st===b.dataset.a)); });
    const cnt=[0,0,0]; hist.forEach(x=>cnt[x]++); const T=hist.length||1;
    $('#rshare').innerHTML=P.map((p,i)=>`<div class="tl-sh"><span>${p.n}</span><div><i style="width:${cnt[i]/T*100}%"></i></div><b>${Math.round(cnt[i]/T*100)}%</b></div>`).join('');
    $('#rok').textContent=fmt(n); }
  function tick(){ P.forEach(p=>{ p.sp=Math.min(.95,Math.max(.4,p.sp+(Math.random()-.5)*.08)); if(p.st!=='lim') p.ld*=.75; });
    const w=WT[o]; for(let k=0;k<6;k++){ const av=P.map((p,i)=>[p,i]).filter(([p])=>p.st==='ok'&&p.ld<LIM); if(!av.length) break;
      const sc=av.map(([p,i])=>[w.s*p.sp+w.c*p.ch+w.h*(1-p.ld/LIM)+Math.random()*.15,i]).sort((a,b)=>b[0]-a[0]); const i=sc[0][1];
      P[i].ld++; hist.push(i); if(hist.length>80) hist.shift(); n++; seq++;
      if(Date.now()-lastMsg>2600&&k===0){ lastMsg=Date.now(); const p=P[i],why=o==='cost'?'best cost with headroom':o==='lat'?'fastest right now':(1-p.ld/LIM)>.5?'best balance of speed, cost and headroom':'others closer to their limits'; lg(`req ${seq} → <b>${p.n}</b> · ${why}`); } }
    paint(); }
  paint(); lg('Router online · 3 providers healthy');
  onView($('#rt'),async()=>{ setInterval(()=>{ if(visible($('#rt'))) tick(); },RM?700:350); await sleep(3500); if(user) return; set(0,'lim'); await sleep(4500); if(user) return; set(1,'off'); await sleep(4500); if(user) return; set(0,'lim'); await sleep(3000); if(user) return; set(1,'off'); },.25);
})();

/* REGIONS */
(()=>{ const U=[['Americas users',95,150],['Europe users',300,62],['Middle East users',380,150],['South Asia users',480,120]];
  const R=[['Region A',300,120],['Region B',440,190],['Region C',120,210]];
  const NEAR=[[2,0,1],[0,1,2],[1,0,2],[1,0,2]];
  const LAT={multi:[[46,0],[38,0],[44,0],[41,0]]}, SINGLE=[210,128,52,63], FAIL=[[46],[38],[88],[96]];
  let mode='multi',down=false,user=false;
  function serve(u){ if(mode==='one') return [1,SINGLE[u]]; const nr=NEAR[u].filter(r=>!(down&&r===1)); const r=nr[0]; const lat=down&&NEAR[u][0]===1?FAIL[u][0]:LAT.multi[u][0]; return [r,lat]; }
  function draw(){ const S=U.map((_,i)=>serve(i)), active=mode==='one'?[1]:[0,1,2].filter(r=>!(down&&r===1));
    $('#rmap').innerHTML=`<svg viewBox="0 0 600 250" aria-hidden="true"><rect x="6" y="6" width="588" height="238" fill="url(#rgd)" /><defs><pattern id="rgd" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,.12)"/></pattern></defs>
      ${U.map((u,i)=>{ const r=R[S[i][0]]; const far=S[i][1]>100; return `<line x1="${u[1]}" y1="${u[2]}" x2="${r[1]}" y2="${r[2]}" stroke="${far?'#ff5a5a':'#ffd200'}" stroke-width="2.5" stroke-dasharray="6 5" class="fl"/>`; }).join('')}
      ${R.map((r,i)=>`<g class="${active.includes(i)?'':'dn'}"><rect x="${r[1]-44}" y="${r[2]-17}" width="88" height="34" fill="${active.includes(i)?'#7d083f':'#3a2a33'}" stroke="${active.includes(i)?'#ffd200':'#6b5862'}" stroke-width="2"/><text x="${r[1]}" y="${r[2]+6}" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">${r[0]}</text></g>`).join('')}
      ${U.map((u,i)=>`<circle cx="${u[1]}" cy="${u[2]}" r="9" fill="#fff"/><circle cx="${u[1]}" cy="${u[2]}" r="16" fill="none" stroke="#fff" stroke-opacity=".35" class="pl"/>`).join('')}
    </svg>`;
    $('#rlat').innerHTML=U.map((u,i)=>{ const [r,l]=S[i]; return `<div class="tl-lr ${l>100?'far':''}"><span>${u[0]}</span><b>${R[r][0]}</b><div><i style="width:${Math.min(100,l/220*100)}%"></i><s style="left:${100/220*100}%" title="100 ms"></s></div><em>${l} ms</em></div>`; }).join('')+`<p class="tl-lnote">${mode==='one'?'One region serves the world: users far from it wait more than twice as long.':down?'Region B is offline: its users fail over to the next nearest region and are still served.':'Every user is served by a nearby region, under 100 ms.'}</p>`;
    $('#rgfail').disabled=mode==='one'; $('#rgfail').textContent=down?'Bring Region B back':'Take Region B offline'; }
  const setD=segBind($('#reg'),'data-d',(v,u)=>{ if(u) user=true; mode=v; if(v==='one') down=false; draw(); });
  $('#rgfail').onclick=()=>{ user=true; down=!down; draw(); };
  setD('one'); mode='one'; draw();
  onView($('#reg'),async()=>{ await sleep(2200); if(user) return; mode='multi'; setD('multi'); draw(); await sleep(3800); if(user) return; down=true; draw(); await sleep(3800); if(user) return; down=false; draw(); },.3);
})();

/* TRACE */
(()=>{ const T={ok:{id:'trace 7c1e…a904',sum:'<b>Answered.</b> Gateway to provider in 16 ms of infrastructure time, then the model streams its answer back. Every span is logged and visible in monitoring.',rows:[['API gateway','edge · Region A',0,3,''],['Load balancer','auto scaling group',3,2,''],['Global queue','priority: standard',5,6,''],['Router','Vertex AI chosen · headroom 64%',11,3,'ag'],['Vertex AI','model response, streamed to the user',14,0,'pv']]},
  rec:{id:'trace 3f92…11bd',sum:'<b>Recovered.</b> OpenAI returned a 429 at 19 ms. The retry handler re-queued the request at the front and the router sent it to Anthropic. The user simply got an answer; the trace keeps the whole story.',rows:[['API gateway','edge · Region B',0,3,''],['Load balancer','auto scaling group',3,2,''],['Global queue','priority: voice',5,4,''],['Router','OpenAI chosen',9,2,'ag'],['OpenAI','HTTP 429 · rate limit reached',11,8,'er'],['Retry handler','re-queued at the front',19,3,''],['Router','re-routed · OpenAI excluded',22,2,'ag'],['Anthropic','model response, streamed to the user',24,0,'pv']]}};
  const SC=36; let cur='ok',tok=0,user=false;
  async function show(k){ const my=++tok,t=T[k]; $('#tid').textContent=t.id; $('#tsum').innerHTML=''; const wf=$('#twf');
    wf.innerHTML=`<div class="tl-ax"><span></span><div>${[0,10,20,30].map(v=>`<em style="left:${v/SC*100}%">${v} ms</em>`).join('')}</div></div>`;
    for(const r of t.rows){ wf.insertAdjacentHTML('beforeend',`<div class="tl-sp ${r[4]}"><span><b>${r[0]}</b><small>${r[1]}</small></span><div><i style="left:${r[2]/SC*100}%;width:${r[4]==='pv'?100-r[2]/SC*100:Math.max(1.5,r[3]/SC*100)}%"></i></div></div>`); await sleep(380); if(my!==tok) return; }
    $('#tsum').innerHTML=t.sum; }
  segBind($('#trx'),'data-t',v=>{ user=true; cur=v; show(v); });
  onView($('#trx'),async()=>{ await show('ok'); await sleep(4200); if(user) return; $$('#trx .seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t==='rec')); show('rec'); },.3);
  $('#tid').textContent=T.ok.id;
})();

/* ARCHITECTURE */
(()=>{ const N=[['Channels','Voice · chat · image','Millions of users talk to the chatbot by voice, text and images. Every interaction becomes an AI request.',''],['API gateway','Load balancers · auto scaling','API gateways and load balancers receive every request, and auto scaling adds capacity as traffic grows.',''],['Global queue','Pub/Sub · Cloud Tasks','A distributed queue regulates traffic, prioritises important requests and holds retries, so spikes never overload a provider.',''],['Routing service','Python · availability, latency, cost','Chooses the best provider for each request in real time and moves traffic away from any provider at its limit or down.','ag'],['Model providers','OpenAI · Claude · Vertex AI','Treated as interchangeable resources behind the router, across multiple cloud regions with failover between them.',''],['Observability','Monitoring · logging · tracing','Cloud Monitoring, Cloud Logging and distributed tracing show how every request moved across providers and regions.','']];
  $('#aflow').innerHTML=N.map((n,i)=>`<button type="button" class="iv-an ${n[3]}" data-i="${i}"><em>${String(i+1).padStart(2,'0')}</em><b>${n[0]}</b><span>${n[1]}</span></button>`).join('');
  const det=$('#adet'),B=$$('#aflow .iv-an'); let tok=0,user=false;
  const show=i=>{ B.forEach((b,k)=>b.classList.toggle('on',k===i)); det.innerHTML=`<b>${N[i][0]} · ${N[i][1]}.</b> ${N[i][2]}`; };
  det.innerHTML='<b>Deployed across multiple cloud regions.</b> Tap a component to see its job.';
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; ++tok; show(+b.dataset.i); }));
  async function trace(){ const my=++tok; for(let i=0;i<N.length;i++){ if(my!==tok) return; show(i); await sleep(1600); } if(my===tok){ B.forEach(b=>b.classList.remove('on')); det.innerHTML='<b>Done.</b> One request in from any channel, answered by the best available model in the nearest region, and fully traced.'; } }
  $('#atrace').onclick=()=>{ user=true; trace(); };
  onView($('#archx'),()=>{ if(!user) trace(); },.35);
})();

/* CONSTRAINTS */
(()=>{ const C=[['Tens of millions of users','Chatbot traffic from 80M+ users arrives in waves and spikes, never in a neat stream.','A queue that absorbs the surge','A distributed queue regulates incoming traffic and auto scaling adds capacity, so demand peaks wait briefly instead of failing.'],
  ['Every provider plays by different rules','OpenAI, Anthropic and Vertex AI each have their own rate limits and response behaviour.','Limit-aware routing','The router tracks each provider\'s availability and headroom and shifts traffic before a limit turns into a 429.'],
  ['Users everywhere expect instant answers','A single region meant slow responses for anyone far from it.','Multi-region by design','Requests are processed in the region closest to the user, with failover between regions if one has a problem.'],
  ['Outages and spikes will happen','Providers have temporary issues, and a dropped request is a customer left without an answer.','Retry, prioritise, recover','Retry handling, prioritisation and recovery keep requests moving, and tracing shows exactly what happened to each one.']];
  const f=$('#flip'); f.innerHTML=C.map((c,i)=>`<button type="button" class="sy-fc" aria-pressed="false" aria-label="${esc(c[0])}: flip to see the solution"><span class="in"><span class="fa"><small>Challenge ${i+1}</small><b>${c[0]}</b><span class="tx">${c[1]}</span><span class="go">See how we solved it ↻</span></span><span class="ba"><small>How we solved it</small><b>${c[2]}</b><span class="tx">${c[3]}</span><span class="go">↻ Back</span></span></span></button>`).join('');
  const cards=$$('#flip .sy-fc'); let user=false;
  cards.forEach(c=>c.addEventListener('click',()=>{ user=true; const on=!c.classList.contains('on'); c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }));
  $('#flipall').onclick=()=>{ user=true; const on=!cards.every(c=>c.classList.contains('on')); cards.forEach(c=>{ c.classList.toggle('on',on); c.setAttribute('aria-pressed',on); }); $('#flipall').textContent=on?'Show the challenges':'Flip all cards'; };
  onView(f,async()=>{ if(RM) return; await sleep(1000); for(const c of cards){ if(user) return; c.classList.add('on'); await sleep(1000); c.classList.remove('on'); await sleep(150); } },.4);
})();

/* RESULTS */
(()=>{ const BA=[['Requests failing with 429 errors','Zero 429s reaching users'],['Locked to one provider at a time','Routed across OpenAI, Claude and Vertex AI'],['One region for the whole world','Multi-region, close to every user'],['Traffic spikes destabilised the system','Spikes absorbed by the global queue'],['Failures hard to find','Every request traced end to end'],['Fixed cost per provider','Cost savings through intelligent routing']];
  $('#ba').innerHTML='<span class="lbl">Before and after</span>'+BA.map(b=>`<div><span class="b">${b[0]}</span><i>→</i><span class="a">${b[1]}</span></div>`).join('');
  onView($('#ba'),()=>$('#ba').classList.add('in'),.25);
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to,suf=b.dataset.suf||''; if(RM) return; onView(b,async()=>{ for(let i=0;i<=20;i++){ b.textContent=Math.round(to*i/20)+suf; await sleep(30); } },.5); });
})();
