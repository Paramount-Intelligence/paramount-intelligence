const IMG={
 "phone": "/images/case-studies/01-sign-in.webp",
 "otp": "/images/case-studies/02-otp.webp",
 "home": "/images/case-studies/03-simosa-home.webp",
 "explore": "/images/case-studies/04-find-sia.webp",
 "welcome": "/images/case-studies/05-sia-welcome.webp",
 "bundles": "/images/case-studies/06-bundles.webp",
 "balance": "/images/case-studies/07-balance.webp",
 "usage": "/images/case-studies/08-usage.webp",
 "recharge": "/images/case-studies/09-recharge-history.webp",
 "sim": "/images/case-studies/10-sim-details.webp",
 "coverage": "/images/case-studies/11-coverage.webp",
 "complaint": "/images/case-studies/12-complaint.webp"
};
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

/* nav */
(()=>{ const ls=$$('.nav nav a'), ss=ls.map(a=>$(a.getAttribute('href')));
  addEventListener('scroll',()=>{ let k=-1; ss.forEach((s,i)=>{ if(s.getBoundingClientRect().top<innerHeight*.4) k=i; }); ls.forEach((a,i)=>a.classList.toggle('on',i===k)); },{passive:true}); })();

/* HERO matrix */
(()=>{ const m=$('#matrix'); m.innerHTML='<i></i>'.repeat(80); const d=[...m.children];
  const cap={subs:'80M+ Jazz subscribers',app:'40M use the Simosa app',sia:'3–4M already use SIA'};
  const btns=$$('.mx-legend button'); let cur='subs',auto=!RM,timer;
  function set(k){ cur=k; btns.forEach(b=>b.classList.toggle('on',b.dataset.m===k)); $('#mxcap').textContent=cap[k];
    d.forEach((e,i)=>{ const dl=RM?0:(i%10+Math.floor(i/10))*28; setTimeout(()=>{ e.className=''; if(k!=='subs'&&i<40) e.className='app'; if(k==='sia'){ if(i<3) e.className='sia'; else if(i===3) e.className='sia half'; } },dl); }); }
  btns.forEach(b=>{ b.addEventListener('click',()=>{ auto=false; set(b.dataset.m); }); b.addEventListener('mouseenter',()=>{ auto=false; set(b.dataset.m); }); });
  set('sia');
  const order=['subs','app','sia']; let i=2;
  if(auto) timer=setInterval(()=>{ if(!auto) return clearInterval(timer); i=(i+1)%3; set(order[i]); },2600);
})();

/* PROBLEM scene */
(()=>{ const sc=$('#scene'),svg=$('#scenesvg'),w=$('#walker'),pb=$('#pBefore'),pa=$('#pAfter'),ex=$('#exits'),n=$('#exitn'),p=$('#exitp');
  const btn=$$('#scene .seg button'); let mode='before',run=0,user=false;
  const L=pb.getTotalLength(),La=pa.getTotalLength();
  const marks=[.24,.44,.72];
  function setMode(m){ mode=m; svg.classList.toggle('mode-after',m==='after'); btn.forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===m)); ex.classList.toggle('zero',m==='after');
    p.textContent=m==='after'?'Same app, same session. The answer comes to them.':'Helpline, hold queue, web portal. Every question breaks the experience.'; }
  async function play(m){ const id=++run; setMode(m); n.textContent='0';
    if(RM){ n.textContent=m==='after'?'0':'3'; return; }
    const path=m==='after'?pa:pb, len=m==='after'?La:L, dur=m==='after'?2200:5200, t0=performance.now();
    await new Promise(res=>{ (function f(t){ if(id!==run) return res(); const k=Math.min(1,(t-t0)/dur); const pt=path.getPointAtLength(len*k); w.setAttribute('cx',pt.x); w.setAttribute('cy',pt.y);
      if(m==='before') n.textContent=marks.filter(x=>k>=x).length; if(k<1) requestAnimationFrame(f); else res(); })(t0); });
    if(id!==run) return;
    if(!user){ await sleep(1400); if(id===run) play(m==='before'?'after':'before'); }
  }
  btn.forEach(b=>b.addEventListener('click',()=>{ user=true; play(b.dataset.v); }));
  n.textContent='3'; onView(sc,()=>play('before'),.5);
})();

/* QUERY HUB */
(()=>{ const Q=[['Balance','account'],['Data usage','account'],['Bundles','account'],['Recharge history','account'],['Call history','account'],['SIM details','account'],['SIM expiry','account'],['Package details','account'],['Network coverage','knowledge'],['Network policies','knowledge'],['SOP guidance','knowledge'],['Subscribe to a bundle','action'],['Raise a complaint','action'],['Usage alert','action']];
  const hub=$('#hub'),svg=$('#hubsvg'),NS='http://www.w3.org/2000/svg',col={account:'#204ecf',knowledge:'#09b6f9',action:'#3dbe8b'};
  const chips=Q.map(([t,k])=>{ const c=document.createElement('span'); c.className='qchip k-'+k; c.dataset.k=k; c.innerHTML=`<i></i><span>${t}</span>`; hub.appendChild(c); return c; });
  function layout(){ svg.innerHTML=''; if(innerWidth<=820){ chips.forEach(c=>{c.style.left='';c.style.top='';}); return; }
    const W=hub.clientWidth,H=hub.clientHeight,cx=W/2,cy=H/2,rx=Math.min(W*.42,470),ry=H*.4;
    chips.forEach((c,i)=>{ const a=-Math.PI/2+i*2*Math.PI/chips.length; const x=cx+rx*Math.cos(a),y=cy+ry*Math.sin(a); c.style.left=x+'px'; c.style.top=y+'px';
      const id='hl'+i; const ln=document.createElementNS(NS,'path'); ln.setAttribute('d',`M${x} ${y} L${cx} ${cy}`); ln.setAttribute('id',id); ln.setAttribute('stroke','#c8d0e2'); ln.setAttribute('stroke-width','1.2'); ln.setAttribute('fill','none'); ln.setAttribute('stroke-dasharray','3 5'); ln.dataset.k=c.dataset.k; svg.appendChild(ln);
      if(!RM){ const d=document.createElementNS(NS,'circle'); d.setAttribute('r','4'); d.setAttribute('fill',col[c.dataset.k]); d.dataset.k=c.dataset.k;
        const am=document.createElementNS(NS,'animateMotion'); am.setAttribute('dur',(2.4+Math.random()*1.6).toFixed(2)+'s'); am.setAttribute('repeatCount','indefinite'); am.setAttribute('begin',(-Math.random()*3).toFixed(2)+'s'); am.setAttribute('path',`M${x} ${y} L${cx} ${cy}`); d.appendChild(am); svg.appendChild(d); } });
    filt(curK); }
  let curK=null; const lg=$$('#hublegend button');
  function filt(k){ curK=k; lg.forEach(b=>b.classList.toggle('on',b.dataset.k===k)); chips.forEach(c=>{ c.classList.toggle('dim',!!k&&c.dataset.k!==k); c.classList.toggle('hot',!!k&&c.dataset.k===k); });
    [...svg.children].forEach(e=>e.style.opacity=(!k||e.dataset.k===k)?1:.08); }
  lg.forEach(b=>b.addEventListener('click',()=>{ auto=false; filt(curK===b.dataset.k?null:b.dataset.k); }));
  layout(); addEventListener('resize',layout);
  let auto=!RM; const seq=['account','knowledge','action',null]; let si=0;
  onView(hub,()=>{ const t=setInterval(()=>{ if(!auto) return clearInterval(t); filt(seq[si++%4]); },2200); },.4);
})();

/* LOCKS */
(()=>{ const L=$$('.lock'),arcs=$$('#ring .arc'),ring=$('#ring');
  function upd(){ const on=L.map(l=>l.classList.contains('on')); arcs.forEach((a,i)=>a.classList.toggle('on',on[i])); const n=on.filter(Boolean).length; $('#ringn').textContent=n===4?'4/4':n+'/4'; $('#ringt').textContent=n===4?'All held':'Held'; ring.classList.toggle('all',n===4); }
  L.forEach(l=>l.addEventListener('click',()=>{ l.classList.toggle('on'); upd(); }));
  onView(ring,()=>L.forEach((l,i)=>setTimeout(()=>{ l.classList.add('on'); upd(); },RM?0:400+i*650)),.5);
})();

/* TAP-THROUGH */
(()=>{ const ph=$('#tapphone'),im=$$('#tapphone img'),dot=$('#tapdot'),li=$$('#path4 li');
  const taps=[[.68,.935],[.155,.487],[.5,.915],null];
  let i=0,vis=false; visible(ph,v=>vis=v);
  function show(k){ im.forEach((m,j)=>m.classList.toggle('on',j===k)); li.forEach((l,j)=>{ l.classList.toggle('on',j===k); l.classList.toggle('done',j<k); }); }
  async function loop(){ while(true){ if(!vis||RM){ await sleep(600); continue; } show(i); await sleep(1500); const t=taps[i];
      if(t){ dot.style.left=t[0]*100+'%'; dot.style.top=t[1]*100+'%'; dot.classList.remove('go'); void dot.offsetWidth; dot.classList.add('go'); await sleep(650); } else await sleep(1400);
      i=(i+1)%4; } }
  loop();
})();

/* FILMSTRIP */
(()=>{ const S=[['01','Sign in','phone'],['02','Verify with OTP','otp'],['03','Simosa home','home'],['04','Find SIA','explore'],['05','Welcome','welcome'],['06','Bundles + subscribe','bundles'],['07','Live balance','balance'],['08','Usage & reset date','usage'],['09','Recharge & calls','recharge'],['10','SIM details','sim'],['11','Coverage (Kendra)','coverage'],['12','Complaint + reference','complaint']];
  $('#striprow').innerHTML=S.map(s=>`<figure class="shot" style="margin:0"><div class="phone"><div class="scr"><img src="${IMG[s[2]]}" alt="${s[1]} screen in the live app" loading="lazy" draggable="false"></div></div><span>${s[0]}</span><b>${s[1]}</b></figure>`).join('');
  const st=$('#strip'); let down=false,sx=0,sl=0,touched=false;
  st.addEventListener('pointerdown',e=>{ if(e.pointerType!=='mouse') {touched=true;return;} down=true; touched=true; sx=e.clientX; sl=st.scrollLeft; st.classList.add('drag'); });
  addEventListener('pointerup',()=>{ down=false; st.classList.remove('drag'); });
  addEventListener('pointermove',e=>{ if(down) st.scrollLeft=sl-(e.clientX-sx); });
  st.addEventListener('touchstart',()=>touched=true,{passive:true});
  $('#sl').onclick=()=>{ touched=true; st.scrollBy({left:-424,behavior:'smooth'}); }; $('#sr').onclick=()=>{ touched=true; st.scrollBy({left:424,behavior:'smooth'}); };
  let vis=false; visible(st,v=>vis=v);
  if(!RM){ let acc=0; (function f(){ requestAnimationFrame(f); if(touched||!vis) return; acc+=.35; if(acc>=1){ const s=Math.floor(acc); acc-=s; st.scrollLeft+=s; if(st.scrollLeft+st.clientWidth>=st.scrollWidth-2) st.scrollLeft=0; } })(); }
})();

/* ARCHITECTURE (two layouts) */
const ARCH=(()=>{ const svg=$('#arch'),NS='http://www.w3.org/2000/svg';
  const G={phone:'M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3zM11 18h2',
    api:'M7 17a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 8a4.5 4.5 0 0 1 .5 9z',
    otp:'M12 3 5 6v5.5c0 4.2 3 7.8 7 9 4-1.2 7-4.8 7-9V6zM9.5 11.5h5v4h-5zM10.5 11.5v-1.5a1.5 1.5 0 0 1 3 0v1.5',
    sia:'M12 3.5l1.8 4.7 4.7 1.8-4.7 1.8L12 16.5l-1.8-4.7L5.5 10l4.7-1.8zM18 15l.8 2.2 2.2.8-2.2.8L18 21l-.8-2.2-2.2-.8 2.2-.8z',
    gw:'M12 3l7.5 4.3v9.4L12 21l-7.5-4.3V7.3zM10 10l-2 2 2 2M14 10l2 2-2 2',
    s3:'M5 6c0-1.4 3.1-2.5 7-2.5s7 1.1 7 2.5-3.1 2.5-7 2.5S5 7.4 5 6zm0 0 1.6 12.5c.2 1.2 2.7 2 5.4 2s5.2-.8 5.4-2L19 6',
    kendra:'M7 3.5h7l4 4V12M7 3.5A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h4M9 9h5M9 12h3M16 20.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2.2-.8 2.3 2.3',
    bedrock:'M8 8h8v8H8zM5 11h3M16 11h3M11 5v3M11 16v3M5 14h3M16 14h3M14 5v3M14 16v3',
    lb:'M4 12h5M9 12l6-5M9 12l6 5M9 12h6',
    as:'M12 3v18M3 12h18M12 3l-2.5 2.5M12 3l2.5 2.5M12 21l-2.5-2.5M12 21l2.5-2.5M3 12l2.5-2.5M3 12l2.5 2.5M21 12l-2.5-2.5M21 12l-2.5 2.5',
    chip:'M7.5 7.5h9v9h-9zM10 10h4v4h-4zM9.5 4.5v3M14.5 4.5v3M9.5 16.5v3M14.5 16.5v3M4.5 9.5h3M4.5 14.5h3M16.5 9.5h3M16.5 14.5h3',
    db:'M5.5 6c0-1.4 2.9-2.5 6.5-2.5s6.5 1.1 6.5 2.5-2.9 2.5-6.5 2.5S5.5 7.4 5.5 6zm0 0v12c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V6M5.5 12c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5',
    safe:'M12 3 5 6v5.5c0 4.2 3 7.8 7 9 4-1.2 7-4.8 7-9V6zM9 12l2.2 2.2L15.5 10'};
  const META={app:['Mobile app','phone',"Simosa, Jazz's self-care app. The customer never leaves it."],api:['API layer','api','Receives the in-app request and routes it to the assistant.'],otp:['OTP auth','otp','Phone number plus one-time code. Nothing on the account is touched until this passes.'],sia:['SIA','sia','The assistant. It decides which path can answer the question.'],gw:['API gateway','gw','Controlled entry into the two processing paths.'],
    s3:['S3 bucket','s3',"Jazz's approved SOPs, policies and internal documents."],kendra:['Amazon Kendra','kendra','Retrieves the right passages from approved documents (RAG), so answers are grounded.'],br1:['AWS Bedrock','bedrock','Reasoning layer. Writes the reply from what Kendra found.'],
    lb:['Load balancer','lb','Spreads production traffic across instances.'],as:['Auto scaling','as','Adds capacity as traffic grows. Built for 40M users.'],llama:['Llama on EC2','chip','Locally hosted model in a sandbox. Subscriber data stays in a controlled environment.'],br2:['AWS Bedrock','bedrock','Reasoning layer for account-specific answers.'],dyn:['DynamoDB','db','Session and memory, so follow-up questions keep their context.'],td:['Teradata','db',"The customer's account data, read only for the verified customer."],safe:['Safe answer','safe','One grounded, verified reply, back in the chat.']};
  const D={vb:[620,770],ns:52,fs:14,
    n:{app:[62,64,'b'],api:[186,64,'b'],otp:[310,64,'b'],sia:[434,64,'b'],gw:[558,64,'b'],s3:[110,250,'r'],kendra:[110,350,'r'],br1:[110,450,'r'],lb:[360,250,'r'],as:[360,345,'r'],llama:[360,440,'r'],br2:[360,535,'r'],dyn:[548,345,'b'],td:[548,440,'b'],safe:[310,690,'b']},
    g:[[12,10,596,124,'ENTRY & CONTROL','#0f256e'],[40,198,250,312,'APPROVED KNOWLEDGE','#09b6f9'],[310,198,298,392,'PRIVATE INFERENCE · SANDBOXED','#204ecf'],[248,640,124,124,'OUTPUT','#3dbe8b']],
    w:[['app','api'],['api','otp'],['otp','sia'],['sia','gw'],[[584,64],[606,64],[606,168],[110,168],[110,224],'k'],[[360,168],[360,224],'a'],['s3','kendra','k'],['kendra','br1','k'],['lb','as','a'],['as','llama','a'],['llama','br2','a'],[[386,329],[522,329],'a'],[[386,424],[522,424],'a'],[[110,476],[110,690],[284,690],'k'],[[360,561],[360,690],[336,690],'a']],
    p:{account:['app','api','otp','sia','gw',[606,64],[606,168],[360,168],'lb','as','llama','br2',[360,690],'safe'],knowledge:['app','api','otp','sia','gw',[606,64],[606,168],[110,168],'s3','kendra','br1',[110,690],'safe'],login:['app','api','otp']}};
  const M={vb:[360,870],ns:44,fs:12,
    n:{app:[60,44,'b'],api:[180,44,'b'],otp:[300,44,'b'],sia:[300,150,'b'],gw:[180,150,'l'],s3:[50,290,'r'],kendra:[50,380,'r'],br1:[50,470,'r'],lb:[212,290,'r'],as:[212,380,'r'],llama:[212,470,'r'],br2:[212,560,'r'],dyn:[230,660,'b'],td:[314,660,'b'],safe:[180,800,'b']},
    g:[[6,8,348,196,'ENTRY & CONTROL','#0f256e'],[6,236,168,284,'KNOWLEDGE','#09b6f9'],[184,236,170,476,'PRIVATE · SANDBOXED','#204ecf'],[120,756,120,108,'OUTPUT','#3dbe8b']],
    w:[['app','api'],['api','otp'],[[322,44],[344,44],[344,150],[322,150]],['sia','gw'],[[180,172],[180,228],[50,228],[50,268],'k'],[[180,228],[212,228],[212,268],'a'],['s3','kendra','k'],['kendra','br1','k'],['lb','as','a'],['as','llama','a'],['llama','br2','a'],[[50,492],[50,800],[158,800],'k'],[[212,582],[212,800],[202,800],'a']],
    p:{account:['app','api','otp',[344,44],[344,150],'sia','gw',[180,228],[212,228],'lb','as','llama','br2',[212,800],'safe'],knowledge:['app','api','otp',[344,44],[344,150],'sia','gw',[180,228],[50,228],'s3','kendra','br1',[50,800],'safe'],login:['app','api','otp']}};
  let L,ng={},pk,pkh,run=0,sel=null;
  const el=(t,a,p)=>{ const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); (p||svg).appendChild(e); return e; };
  function draw(){ L=innerWidth<=640?M:D; svg.innerHTML=''; ng={}; svg.setAttribute('viewBox',`0 0 ${L.vb[0]} ${L.vb[1]}`);
    const h=L.ns/2;
    L.g.forEach(([x,y,w,hh,t,c])=>{ el('rect',{x,y,width:w,height:hh,class:'gbox',stroke:c,fill:'none','stroke-dasharray':c==='#0f256e'?'':'0'}); const bg=el('rect',{x:x+12,y:y-8,width:10,height:16,fill:'#fff',class:'lblbg'}); const tx=el('text',{x:x+19,y:y+4,class:'glabel',fill:c}); tx.textContent=t; try{ bg.setAttribute('width',tx.getBBox().width+14); }catch(e){ bg.setAttribute('width',t.length*8.6+14); } });
    const wg=el('g',{});
    const P=k=>{ const n=L.n[k]; return [n[0],n[1]]; };
    L.w.forEach(w=>{ let pts,cls='';
      if(typeof w[0]==='string'){ const a=P(w[0]),b=P(w[1]); cls=w[2]||''; if(a[1]===b[1]){ const s=Math.sign(b[0]-a[0]); pts=[[a[0]+s*h,a[1]],[b[0]-s*h,b[1]]]; } else { const s=Math.sign(b[1]-a[1]); pts=[[a[0],a[1]+s*h],[b[0],b[1]-s*h]]; } }
      else { pts=w.filter(x=>Array.isArray(x)); cls=typeof w[w.length-1]==='string'?w[w.length-1]:''; }
      el('polyline',{points:pts.map(p=>p.join(',')).join(' '),class:'wire '+(cls==='k'?'wk':cls==='a'?'wa':'')},wg); });
    for(const k in L.n){ const [x,y,lp]=L.n[k],m=META[k];
      const g=el('g',{class:'anode',tabindex:0,role:'button','aria-label':m[0],transform:`translate(${x-h},${y-h})`});
      el('rect',{class:'bx',width:L.ns,height:L.ns},g);
      const sc=L.ns/52*1.15; el('path',{d:G[m[1]],class:'gl',transform:`translate(${h-12*sc},${h-12*sc}) scale(${sc})`},g);
      let tx,ty,anchor='middle'; if(lp==='b'){ tx=h; ty=L.ns+L.fs+4; } else if(lp==='r'){ tx=L.ns+10; ty=h+L.fs*.36; anchor='start'; } else { tx=-10; ty=h+L.fs*.36; anchor='end'; }
      const t=el('text',{x:tx,y:ty,'text-anchor':anchor,'font-size':L.fs},g); t.textContent=m[0];
      g.addEventListener('click',()=>info(k)); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); info(k);} });
      ng[k]=g; }
    pkh=el('circle',{r:L.ns*.32,fill:'#09b6f9',opacity:0}); pk=el('circle',{r:L.ns*.14,fill:'#09b6f9',stroke:'#fff','stroke-width':2,opacity:0});
    if(sel) info(sel,true);
  }
  function info(k,quiet){ sel=k; for(const j in ng) ng[j].classList.toggle('sel',j===k); const m=META[k]; $('#ninfo').innerHTML=`<span class="eyebrow">Component</span><h3>${m[0]}</h3><p>${m[2]}</p>`; }
  function reset(){ run++; for(const k in ng){ ng[k].classList.remove('lit','dim'); ng[k].style.removeProperty('--lc'); } if(pk){pk.setAttribute('opacity',0);pkh.setAttribute('opacity',0);} }
  function light(k,c){ if(!ng[k]) return; ng[k].classList.add('lit'); ng[k].classList.remove('dim'); ng[k].style.setProperty('--lc',c); }
  function travel(name,color,opts={}){ const id=++run; const seq=L.p[name]; const keys=new Set(seq.filter(s=>typeof s==='string'));
    for(const k in ng){ ng[k].classList.remove('lit'); if(!opts.keep) ng[k].classList.toggle('dim',!keys.has(k)&&!(opts.side||[]).includes(k)); }
    const pts=seq.map(s=>typeof s==='string'?{x:L.n[s][0],y:L.n[s][1],k:s}:{x:s[0],y:s[1]});
    const nodeColor=k=>k==='otp'||k==='safe'?'#3dbe8b':(['app','api','sia','gw'].includes(k)?'#0f256e':color);
    pk.setAttribute('fill',color); pkh.setAttribute('fill',color);
    if(RM){ pts.forEach(p=>p.k&&light(p.k,nodeColor(p.k))); (opts.side||[]).forEach(k=>light(k,color)); return Promise.resolve(); }
    const segs=[]; let T=0; for(let i=1;i<pts.length;i++){ const d=Math.hypot(pts[i].x-pts[i-1].x,pts[i].y-pts[i-1].y); segs.push({a:pts[i-1],b:pts[i],s:T,d}); T+=d; }
    const sp=(opts.speed||.42)*L.vb[0]/620, t0=performance.now(); let last=-1; light(pts[0].k,nodeColor(pts[0].k));
    return new Promise(res=>{ (function f(t){ if(id!==run) return res(false); const s=(t-t0)*sp;
      if(s>=T){ pk.setAttribute('opacity',0); pkh.setAttribute('opacity',0); const e=pts[pts.length-1]; if(e.k) light(e.k,nodeColor(e.k)); return res(true); }
      const i=segs.findIndex(g=>s<g.s+g.d),g=segs[i],k=(s-g.s)/g.d,x=g.a.x+(g.b.x-g.a.x)*k,y=g.a.y+(g.b.y-g.a.y)*k;
      pk.setAttribute('cx',x);pk.setAttribute('cy',y);pk.setAttribute('opacity',1);pkh.setAttribute('cx',x);pkh.setAttribute('cy',y);pkh.setAttribute('opacity',.22);
      if(i!==last){ last=i; if(g.a.k){ light(g.a.k,nodeColor(g.a.k)); if(opts.onNode) opts.onNode(g.a.k); if(g.a.k==='llama') (opts.side||[]).forEach(k=>light(k,color)); } }
      requestAnimationFrame(f); })(t0); });
  }
  draw(); document.fonts&&document.fonts.ready.then(()=>{ $$('#arch .lblbg').forEach(b=>{ const t=b.nextElementSibling; try{ b.setAttribute('width',t.getBBox().width+14);}catch(e){} }); }); let lastL=L; addEventListener('resize',()=>{ const nl=innerWidth<=640?M:D; if(nl!==lastL){ lastL=nl; draw(); } });
  return {travel,reset,light,info};
})();

/* SIMULATOR */
(()=>{ const chat=$('#chat'),qs=$('#qs'),sim=$('#sim'),trace=$('#trace'),route=$('#route'),login=$('#login');
  let token=0,auto=true,authed=false,busy=false;
  const tr=(txt,c)=>{ const d=document.createElement('div'); d.innerHTML=`<i style="background:${c||'#7f93c9'}"></i><span>${txt}</span>`; trace.appendChild(d); while(trace.children.length>8) trace.children[1].remove(); };
  const setRoute=(txt,c)=>{ route.querySelector('i').style.background=c||'var(--line)'; route.querySelector('span').textContent=txt; };
  const add=(html,cls)=>{ const d=document.createElement('div'); d.className='msg '+cls; d.innerHTML=html; chat.appendChild(d); chat.scrollTop=chat.scrollHeight; return d; };
  const typing=async(ms,t)=>{ const d=document.createElement('div'); d.className='typing'; d.innerHTML='<i></i><i></i><i></i>'; chat.appendChild(d); chat.scrollTop=chat.scrollHeight; await sleep(ms); d.remove(); return t===token; };
  const ACC='#204ecf',KNO='#09b6f9',OK='#3dbe8b',NAV='#0f256e';
  const ring=(pct)=>{ const r=20,c=2*Math.PI*r; return `<svg width="54" height="54" viewBox="0 0 54 54"><circle cx="27" cy="27" r="${r}" fill="none" stroke="#2b2856" stroke-width="5"/><circle cx="27" cy="27" r="${r}" fill="none" stroke="#3dd5ff" stroke-width="5" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct)}" transform="rotate(-90 27 27)"/><text x="27" y="31" text-anchor="middle" font-size="11" font-weight="700" fill="#fff" font-family="Montserrat,Arial,sans-serif">${Math.round(pct*100)}%</text></svg>`; };
  const Qs={
    balance:{l:"What's my balance?",path:'account',
      a:async t=>{ add(`<span class="k">Main balance</span><div class="big">420 <small>PKR</small></div>Valid until 28 July 2026. Want your data balance too?`,'b'); }},
    usage:{l:'How much data have I used?',path:'account',
      a:async t=>{ add(`<span class="k">Usage summary</span><div class="ring2">${ring(.62)}<div><b>12.4 GB</b> left of 20 GB<br><em style="font-style:normal;color:#b9b3e6;font-size:.68rem">7.6 GB used · top app: social media</em></div></div><div class="row"><em>Resets on</em><b>26 July 2026</b></div>`,'b w');
        await sleep(500); if(t!==token) return; add(`I can also set a usage alert at 80% if you'd like.`,'b'); }},
    bundles:{l:'Show me data bundles',path:'account',
      a:async t=>{ const m=add(`<span class="k">Available bundles</span>
        <div class="row"><span><b>Weekly Social</b><br><em>2 GB</em></span><span class="price">250 PKR</span></div>
        <div class="row"><span><b>Monthly Lite</b><br><em>6 GB</em></span><span class="price">600 PKR</span></div>
        <div class="row"><span><b>Monthly Max</b><br><em>20 GB</em></span><span class="price">1,500 PKR</span></div>
        <div class="btns"><button type="button" data-b="max">Subscribe to Monthly Max</button></div>`,'b w');
        const b=m.querySelector('button'); b.onclick=()=>{ b.disabled=true; stopAuto(); subscribe(++token); };
        if(auto){ await sleep(1600); if(t!==token) return; b.disabled=true; await subscribe(t); } }},
    sim:{l:'Show my SIM details',path:'account',
      a:async t=>{ add(`<span class="k">Your SIM</span><div class="row"><em>Number</em><b>+92 320 234 5678</b></div><div class="row"><em>Status</em><b class="ok">Active</b></div><div class="row"><em>Type</em><b>4G / LTE</b></div><div class="row"><em>Registered</em><b>12 March 2024</b></div>`,'b w'); }},
    recharge:{l:'Recent recharges',path:'account',
      a:async t=>{ add(`<span class="k">Recent recharges</span><div class="row"><em>1 July 2026</em><b>500 PKR</b></div><div class="row"><em>24 June 2026</em><b>1,000 PKR</b></div>`,'b w'); }},
    coverage:{l:'Is coverage good in my area?',path:'knowledge',
      a:async t=>{ add(`<span class="k">Network coverage</span><div class="ring2"><div class="bars"><i style="height:30%"></i><i style="height:50%"></i><i style="height:70%"></i><i style="height:90%"></i><i style="height:100%"></i></div><div><b style="font-size:1rem;color:#3dbe8b">Strong</b><br>4G/LTE coverage in your area</div></div><div style="margin-top:6px;color:#b9b3e6;font-size:.68rem">Slow speeds? Try toggling airplane mode or restarting your device.</div>`,'b w'); }},
    complaint:{l:'Raise a complaint',path:'account',esc:true,
      a:async t=>{ add(`I'll help you file a complaint. Is your signal full but internet slow?`,'b'); await sleep(1100); if(t!==token) return;
        add(`Yes, full signal but internet is too slow`,'u'); if(!await typing(900,t)) return;
        add(`<span class="k">Complaint registered</span><span class="ok">✓</span> Our technical team will review your area within 24 hours.<br><span class="ref">Ref #CMP-48213</span>`,'b'); }}
  };
  async function subscribe(t){ add(`Subscribe me to Monthly Max`,'u'); tr('Customer-impacting action → confirmation required',OK); if(!await typing(700,t)) return;
    const c=add(`<span class="k">Please confirm</span>Monthly Max · 20 GB · 30 days<br><b>1,500 PKR</b> will be deducted.<div class="btns"><button type="button">Confirm</button><button type="button" class="ghost">Cancel</button></div>`,'b');
    const [ok,no]=c.querySelectorAll('button');
    const done=async yes=>{ ok.disabled=no.disabled=true; add(yes?'Confirm':'Cancel','u'); if(!await typing(700,t)) return;
      if(yes){ tr('Confirmed by customer → subscription placed',OK); add(`<span class="ok">✓ Done.</span> You're subscribed to Monthly Max (20 GB). 1,500 PKR deducted. Valid for 30 days.`,'b'); }
      else { tr('Cancelled by customer → nothing changed',NAV); add(`No problem, nothing has changed on your account.`,'b'); } };
    ok.onclick=()=>{ stopAuto(); done(true); }; no.onclick=()=>{ stopAuto(); done(false); };
    if(auto){ await sleep(1500); if(t!==token||ok.disabled) return; await done(true); }
  }
  async function ask(key,t){ const q=Qs[key]; busy=true; $$('#qs button').forEach(b=>b.classList.toggle('on',b.dataset.q===key));
    add(q.l,'u');
    const col=q.path==='knowledge'?KNO:ACC;
    setRoute(q.path==='knowledge'?'Approved knowledge · Amazon Kendra':'Private inference · sandboxed Llama on EC2',col);
    tr(`<b style="color:#fff">“${q.l}”</b>`,'#fff');
    const lines=q.path==='knowledge'?{s3:'Search approved SOPs & policies (S3)',kendra:'Kendra retrieves matching passages',br1:'Bedrock writes a grounded answer'}:{lb:'Routed to private inference path',llama:'Sandboxed Llama on EC2 · account data for verified customer only',br2:'Bedrock composes the reply'};
    const ty=document.createElement('div'); ty.className='typing'; ty.innerHTML='<i></i><i></i><i></i>'; chat.appendChild(ty); chat.scrollTop=chat.scrollHeight;
    const ok=await ARCH.travel(q.path,col,{side:q.path==='account'?['td','dyn']:[],onNode:k=>{ if(lines[k]) tr(lines[k],col); }});
    ty.remove(); if(t!==token) return;
    tr('Safe answer returned in-app',OK);
    await q.a(t);
    if(q.esc&&t===token) tr('Escalated to Jazz support team · ref CMP-48213',NAV);
    busy=false;
  }
  async function signIn(t){ authed=false; sim.classList.remove('authed'); login.classList.remove('gone'); chat.innerHTML=''; trace.innerHTML='<div class="t-h">// live trace</div>';
    $('#otp').hidden=true; $('#lgf').hidden=false; $('#lgt').textContent='Begin your journey'; $('#lgl').textContent='Enter your mobile number'; $('#lgb').textContent='CONTINUE'; $('#num').textContent=''; $$('#otp span').forEach(s=>{s.textContent='';s.classList.remove('f');});
    $('#lgs').innerHTML='🔒 No account data touched yet'; setRoute('Waiting for sign-in',null); ARCH.reset();
    const num='3XX XXXXXXX'; for(const ch of num){ if(t!==token) return false; $('#num').textContent+=ch; await sleep(RM?0:70); }
    tr('App opened · request reaches API layer',NAV); ARCH.travel('login',NAV);
    await sleep(500); if(t!==token) return false;
    $('#lgf').hidden=true; $('#otp').hidden=false; $('#lgt').textContent='Verification code'; $('#lgl').textContent='Check your SMS'; $('#lgb').textContent='LOGIN';
    setRoute('OTP verification · no data touched yet',OK);
    const sp=$$('#otp span'); for(let i=0;i<4;i++){ await sleep(RM?0:260); if(t!==token) return false; sp[i].textContent='•'; sp[i].classList.add('f'); }
    await sleep(350); if(t!==token) return false;
    tr('OTP verified · session opened (DynamoDB)',OK); ARCH.light('otp','#3dbe8b');
    $('#lgs').innerHTML='✓ Verified'; await sleep(600); if(t!==token) return false;
    login.classList.add('gone'); sim.classList.add('authed'); authed=true;
    setRoute('Verified · ready',OK);
    add(`Welcome to <b>SIA</b>, Simosa's intelligent assistant. Ask about bundles, your balance, usage, SIM or anything else.`,'b');
    return true;
  }
  qs.innerHTML=Object.entries(Qs).map(([k,q])=>`<button type="button" data-q="${k}">${q.l}</button>`).join('');
  $$('#qs button').forEach(b=>b.addEventListener('click',async()=>{ stopAuto(); const t=++token; if(!authed){ login.classList.add('gone'); sim.classList.add('authed'); authed=true; chat.innerHTML=''; ARCH.light('otp','#3dbe8b'); }
    b.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'}); await ask(b.dataset.q,t); }));
  function stopAuto(){ if(auto){ auto=false; $('#mode').textContent='You are in control'; } }
  async function tour(){ const t=++token; auto=true; $('#mode').textContent='Auto tour'; if(!await signIn(t)) return;
    const order=['balance','usage','bundles','coverage','sim','complaint','recharge'];
    for(const k of order){ await sleep(1300); if(t!==token||!auto) return; await ask(k,t); if(t!==token||!auto) return; await sleep(1700); }
    await sleep(2500); if(t===token&&auto&&vis) tour(); else waiting=true;
  }
  let vis=false,started=false,waiting=false;
  visible(sim,v=>{ vis=v; if(v&&!started){ started=true; tour(); } else if(v&&waiting&&auto){ waiting=false; tour(); } });
  $('#replay').onclick=()=>{ tour(); };
  // resting state before it runs
  login.classList.add('gone'); sim.classList.add('authed'); add(`Welcome to <b>SIA</b>, Simosa's intelligent assistant. Ask about bundles, your balance, usage, SIM or anything else.`,'b');
})();

/* DUEL */
(()=>{ const Q=[
    {q:"What's my balance?",g:['For balance enquiries, please dial our helpline or visit our website.',1],s:'<b class="big">420 PKR</b><br>Valid until 28 July 2026. Want your data balance too?<small>✓ From your account</small>'},
    {q:'Can I get a bigger data bundle?',g:['Please visit our website to view all available packages.',1],s:'Monthly Max: <b>20 GB for 1,500 PKR</b>. Shall I subscribe you? I\'ll confirm before anything changes.<small>✓ Confirm before acting</small>'},
    {q:'My internet is slow',g:["Sorry, I didn't understand that. Please call customer support.",1],s:'Your area shows strong 4G/LTE. I\'ve registered a complaint for you.<br>Ref <b>#CMP-48213</b>, reviewed within 24 hours.<small>✓ Escalated cleanly</small>'},
    {q:'When does my data reset?',g:['Billing cycles vary by package. Please check your package terms on our website.',1],s:'Your data cycle resets on <b>26 July 2026</b>. You have <b>12.4 GB</b> left.<small>✓ Personal, after OTP</small>'}];
  const row=$('#askrow'),lg=$('#lgen'),ls=$('#lsia'),sg=$('#sgen'),ss=$('#ssia'); let gN=0,sN=0,busy=false,user=false;
  row.innerHTML=Q.map((x,i)=>`<button type="button" data-i="${i}">“${x.q}”</button>`).join('');
  const B=[...row.children];
  const put=(log,cls,html)=>{ const d=document.createElement('div'); d.className='m '+cls; d.innerHTML=html; log.appendChild(d); log.scrollTop=log.scrollHeight; return d; };
  const typ=log=>{ const d=document.createElement('div'); d.className='typing'; d.innerHTML='<i></i><i></i><i></i>'; log.appendChild(d); log.scrollTop=log.scrollHeight; return d; };
  async function ask(i){ if(busy) return; busy=true; B.forEach((b,k)=>{ b.classList.toggle('on',k===i); b.disabled=true; }); const x=Q[i];
    put(lg,'u',x.q); put(ls,'u',x.q); const a=typ(lg),b=typ(ls);
    await sleep(RM?0:900); b.remove(); put(ls,'b',x.s); ss.textContent=++sN;
    await sleep(RM?0:700); a.remove(); put(lg,'b bad',x.g[0]+'<small>↗ Leaves the app</small>'); sg.textContent=++gN;
    busy=false; B.forEach(b=>b.disabled=false); }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; ask(+b.dataset.i); }));
  onView($('#duel'),async()=>{ for(let i=0;i<Q.length;i++){ if(user) return; await ask(i); await sleep(RM?0:1500); } },.4);
})();

/* RESULTS */
(()=>{ const cells=$('#cells'); cells.innerHTML='<i></i>'.repeat(40); const cs=[...cells.children];
  onView(cells,()=>{ cs.forEach((c,i)=>setTimeout(()=>{ if(i<3) c.className='f'; else if(i===3) c.className='h'; },RM?0:300+i*120)); },.5);
  const NS='http://www.w3.org/2000/svg';
  // triage
  const tg=$('#triage'); tg.innerHTML=`
    <rect x="128" y="45" width="64" height="60" fill="#0f256e"/><text x="160" y="80" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-weight="700" font-size="14" fill="#fff">SIA</text>
    <text x="4" y="20" font-family="Montserrat,Arial,sans-serif" font-size="10.5" font-weight="700" fill="#6b7385">QUESTIONS</text>
    <text x="316" y="20" text-anchor="end" font-family="Montserrat,Arial,sans-serif" font-size="10.5" font-weight="700" fill="#3dbe8b">RESOLVED IN-APP</text>
    <text x="316" y="146" text-anchor="end" font-family="Montserrat,Arial,sans-serif" font-size="10.5" font-weight="700" fill="#0f256e">TO A PERSON</text>
    <path d="M192 65 C 240 65, 250 40, 316 40" fill="none" stroke="#3dbe8b" stroke-width="1.4" stroke-dasharray="3 4"/>
    <path d="M192 90 C 240 90, 250 125, 316 125" fill="none" stroke="#0f256e" stroke-width="1.4" stroke-dasharray="3 4"/>
    <path d="M0 75 L128 75" stroke="#c8d0e2" stroke-width="1.4" stroke-dasharray="3 4"/>`;
  const parts=[]; let vis=false; visible(tg,v=>vis=v);
  if(!RM){ let last=0; (function f(t){ requestAnimationFrame(f); if(!vis) return;
      if(t-last>230){ last=t; const esc=Math.random()<.12; const c=document.createElementNS(NS,'circle'); c.setAttribute('r',3.6); c.setAttribute('fill','#204ecf'); tg.insertBefore(c,tg.firstChild); parts.push({c,x:0,y:50+Math.random()*50,esc,ph:0}); }
      for(let i=parts.length-1;i>=0;i--){ const p=parts[i]; if(p.ph===0){ p.x+=2.2; p.y+= (75-p.y)*.04; if(p.x>=150){ p.ph=1; p.t=0; p.c.setAttribute('fill',p.esc?'#0f256e':'#3dbe8b'); p.c.setAttribute('opacity',0);} }
        else { p.t+=.022; const k=p.t; p.c.setAttribute('opacity',1); if(p.esc){ p.x=192+124*k; p.y=90+35*k*k*(3-2*k); } else { p.x=192+124*k; p.y=65-25*k*k*(3-2*k); } if(k>=1){ p.c.remove(); parts.splice(i,1); continue; } }
        p.c.setAttribute('cx',p.x); p.c.setAttribute('cy',p.y); } })(0); }
  // autoscale
  const sg=$('#scale'); sg.innerHTML=`<text x="4" y="14" font-family="Montserrat,Arial,sans-serif" font-size="10.5" font-weight="700" fill="#6b7385">TRAFFIC</text><text x="316" y="14" text-anchor="end" font-family="Montserrat,Arial,sans-serif" font-size="10.5" font-weight="700" fill="#204ecf" id="instn">INSTANCES: 2</text><polyline id="load" fill="none" stroke="#09b6f9" stroke-width="2"/><g id="inst"></g><line x1="0" y1="96" x2="320" y2="96" stroke="#d9dbe0"/>`;
  const load=sg.querySelector('#load'),ig=sg.querySelector('#inst'),inn=sg.querySelector('#instn');
  for(let i=0;i<8;i++){ const r=document.createElementNS(NS,'rect'); r.setAttribute('x',8+i*39); r.setAttribute('y',108); r.setAttribute('width',32); r.setAttribute('height',32); r.setAttribute('fill','#fff'); r.setAttribute('stroke','#0f256e'); r.setAttribute('stroke-width','1.5'); r.style.transition='fill .4s,opacity .4s'; ig.appendChild(r); }
  const rs=[...ig.children]; let svis=false; visible(sg,v=>svis=v); let ph=0;
  function frame(){ const pts=[]; let cur=0; for(let x=0;x<=320;x+=8){ const v=.5+.32*Math.sin((x/320)*Math.PI*2+ph)+.14*Math.sin((x/320)*Math.PI*5+ph*1.7); pts.push(`${x},${92-v*68}`); if(x===320) cur=v; } load.setAttribute('points',pts.join(' '));
    const n=Math.max(2,Math.min(8,Math.round(cur*9))); rs.forEach((r,i)=>{ r.setAttribute('fill',i<n?'#204ecf':'#fff'); r.style.opacity=i<n?1:.35; }); inn.textContent='INSTANCES: '+n; }
  frame(); if(!RM){ (function f(){ requestAnimationFrame(f); if(!svis) return; ph+=.012; frame(); })(); }
})();
