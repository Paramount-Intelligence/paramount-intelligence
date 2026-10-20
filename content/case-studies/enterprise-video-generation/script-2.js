__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,RM?0:ms));
const onView=(el,fn,th=.3)=>{ if(!el) return; const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const press=(btns,on)=>btns.forEach(b=>b.setAttribute('aria-pressed',b===on));

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.08});
  els.forEach(e=>io.observe(e)); })();

/* HERO: brief -> finished ad (illustration) */
(()=>{ const brief=$('#hxBrief'), rows=$$('#hxStages li'), scr=$('#hxScreen'), vid=scr.querySelector('video'), clock=$('#hxClock'), go=$('#hxGo');
  const TXT='Spring launch · new product · three markets';
  let tok=0;
  const reset=()=>{ rows.forEach(r=>{ r.className=''; r.querySelector('.bar i').style.width='0'; r.querySelector('.s').textContent='queued'; }); scr.classList.remove('on'); try{vid.pause();}catch(e){} };
  async function run(){ const my=++tok; reset(); go.disabled=true; brief.textContent=''; clock.innerHTML='Weeks <em>→ under 5 min</em>';
    for(let i=1;i<=TXT.length;i++){ if(my!==tok) return; brief.textContent=TXT.slice(0,i); await sleep(26); }
    for(const r of rows){ if(my!==tok) return; r.className='run'; r.querySelector('.s').textContent='working';
      const bar=r.querySelector('.bar i'); for(let p=0;p<=100;p+=10){ if(my!==tok) return; bar.style.width=p+'%'; await sleep(55); }
      r.className='ok'; r.querySelector('.s').textContent='done'; }
    if(my!==tok) return;
    scr.classList.add('on'); clock.innerHTML='Ad ready <em>· under 5 min</em>';
    if(!RM){ try{ vid.preload='auto'; await vid.play(); }catch(e){} }
    go.disabled=false; }
  go.addEventListener('click',run);
  if(RM){ brief.textContent=TXT; rows.forEach(r=>{ r.className='ok'; r.querySelector('.bar i').style.width='100%'; r.querySelector('.s').textContent='done'; }); scr.classList.add('on'); clock.innerHTML='Ad ready <em>· under 5 min</em>'; }
  else onView($('#hx'),run,.2);
})();

/* 01 PROBLEM: agency vs platform, and variations */
(()=>{ const B=$$('#race [data-r]'), A=$$('#laneA span'), P=$$('#laneP span'), big=$('#raceBig'), cap=$('#raceCap'), grid=$('#varGrid'), vcap=$('#varCap');
  grid.innerHTML=Array.from({length:36},()=>'<i></i>').join('');
  const cells=$$('#varGrid i'); let tok=0;
  async function show(mode){ const my=++tok; [...A,...P].forEach(s=>s.classList.remove('on'));
    const lane=mode==='agency'?A:P;
    big.textContent=mode==='agency'?'Weeks':'< 5 min'; big.classList.toggle('fast',mode!=='agency');
    cap.textContent=mode==='agency'?'of agency collaboration for every new launch or campaign':'from business inputs to a platform-ready ad';
    cells.forEach(c=>c.className='');
    for(const s of lane){ if(my!==tok) return; s.classList.add('on'); await sleep(mode==='agency'?420:140); }
    if(mode==='agency'){ [0,7].forEach(i=>cells[i].className='on'); vcap.textContent='With agency costs per ad, teams could test only a handful of variations.'; }
    else { for(let i=0;i<cells.length;i++){ if(my!==tok) return; cells[i].className='on'+(i%7===0?' l':''); await sleep(18); } vcap.textContent='Each version takes minutes, so a campaign can test variations across products, audiences and markets.'; }
  }
  B.forEach(b=>b.addEventListener('click',()=>{ press(B,b); show(b.dataset.r); }));
  show('agency');
  onView($('#race'),async()=>{ await sleep(2600); if(tok>1) return; press(B,B[1]); show('platform'); },.4);
})();

/* 02 CONSTRAINTS: locks */
(()=>{ const L=$$('#locks button'), txt=$('#lockTxt'), fill=$('#lockFill');
  const upd=()=>{ const n=L.filter(b=>b.classList.contains('on')).length; txt.textContent=n+' / 5 held'+(n===5?' · all five at once':''); fill.style.width=(n*20)+'%'; };
  L.forEach(b=>b.addEventListener('click',()=>{ const on=!b.classList.contains('on'); b.classList.toggle('on',on); b.setAttribute('aria-pressed',on); b.querySelector('.lk').textContent=on?'held':'open'; upd(); }));
  upd();
})();

/* 03 PIPELINE */
(()=>{ const B=$$('#pipeSteps button'), stage=$('#pipeStage');
  const LANG={EN:'Big ideas deserve the big screen. Find yours today.',ES:'Las grandes ideas merecen la gran pantalla. Encuentra la tuya hoy.',DE:'Große Ideen gehören auf den großen Bildschirm. Finde deine noch heute.'};
  const S=[
    {t:'Research',d:'Large language models analyse the product information and business inputs before a word of script is written.',o:()=>`<div class="vg-out"><small>Inputs</small><div class="vg-chips"><span>Product information</span><span>Business inputs</span><span>Campaign goal</span><span>Target markets</span></div><small>What the research returns</small><div class="ln"><em>Audience</em><span>Who the product is for and what they care about</span></div><div class="ln"><em>Message</em><span>The one benefit the ad should land</span></div><div class="ln"><em>Proof</em><span>Product details worth showing on screen</span></div></div>`},
    {t:'Script',d:'The same models write the script and campaign messaging, scene by scene, ready for visuals and voice.',o:()=>`<div class="vg-out"><small>Sample script</small>${[['Scene 1','Night skyline. The city wakes up to something new.'],['Scene 2','At home, the screen lights up the room.'],['Scene 3','Close on the product. Colour, texture, detail.'],['Close','Big ideas deserve the big screen.']].map((l,i)=>`<div class="ln" style="animation-delay:${i*.12}s"><em>${l[0]}</em><span>${l[1]}</span></div>`).join('')}</div>`},
    {t:'Visuals',d:'Specialised video and image models produce the scenes and product imagery; the model is chosen by the kind of shot needed.',o:()=>`<div class="vg-out"><small>Generated scenes</small><div class="vg-scenes">${[['/images/case-studies/vg-ad-01-city-night.webp','Scene 1 · city at night'],['/images/case-studies/vg-ad-02-living-room.webp','Scene 2 · at home'],['/images/case-studies/vg-ad-03-retail.webp','Scene 3 · product']].map((s,i)=>`<figure style="animation-delay:${i*.12}s"><img src="${s[0]}" alt="${s[1]}" loading="lazy"><figcaption>${s[1]}</figcaption></figure>`).join('')}</div></div>`},
    {t:'Voice',d:'Voice synthesis creates a natural voiceover, and a localised one for each region. Switch the language.',o:()=>`<div class="vg-out"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><small>Voiceover</small><div class="vg-tabs" role="group" aria-label="Voiceover language">${Object.keys(LANG).map((k,i)=>`<button type="button" data-lg="${k}" aria-pressed="${i===0}">${k}</button>`).join('')}</div></div><div class="vg-wave" aria-hidden="true">${Array.from({length:40},(_, i)=>`<i style="animation-delay:${(i%10)*.09}s"></i>`).join('')}</div><p id="voLine" style="font-size:.9rem;color:#fff">${LANG.EN}</p></div>`},
    {t:'Render',d:'Server-side rendering pipelines assemble visuals, voiceover and text overlays into the finished, platform-ready ad.',o:()=>`<div class="vg-out"><div class="vg-tracks" id="tracks"><div class="tr"><span>Visuals</span><div><i style="left:0;width:34%"></i><i style="left:34%;width:33%;transition-delay:.15s"></i><i style="left:67%;width:33%;transition-delay:.3s"></i></div></div><div class="tr a"><span>Voiceover</span><div><i style="left:4%;width:92%;transition-delay:.45s"></i></div></div><div class="tr t"><span>Text overlays</span><div><i style="left:8%;width:20%;transition-delay:.6s"></i><i style="left:70%;width:26%;transition-delay:.75s"></i></div></div></div><div class="vg-final"><div class="vg-screen" id="rsScreen"><video muted loop playsinline preload="none" poster="/images/case-studies/vg-ad-03-retail.webp"><source src="/images/case-studies/vg-ad-03-retail.mp4" type="video/mp4"></video><span class="badge">Platform-ready</span><div class="ph">Rendering…</div></div></div></div>`}
  ];
  let cur=0,tok=0;
  function show(i){ cur=i; press(B,B[i]); B.forEach((b,j)=>b.classList.toggle('done',j<i));
    const s=S[i]; stage.innerHTML=`<small>Stage ${String(i+1).padStart(2,'0')} of 05</small><h3>${s.t}</h3><p>${s.d}</p>${s.o()}<div class="ctl"><button type="button" class="vb-btn" id="pipePlay">▶ Play all stages</button>${i<4?'<button type="button" class="vb-btn ghost" id="pipeNext">Next stage →</button>':''}</div>`;
    $('#pipePlay').addEventListener('click',()=>playAll());
    const nx=$('#pipeNext'); if(nx) nx.addEventListener('click',()=>{ ++tok; show(cur+1); });
    $$('#pipeStage [data-lg]').forEach(b=>b.addEventListener('click',()=>{ press($$('#pipeStage [data-lg]'),b); const l=$('#voLine'); if(l){ l.style.animation='none'; l.offsetHeight; l.style.animation=''; l.textContent=LANG[b.dataset.lg]; } }));
    if(i===4){ const tr=$('#tracks'); requestAnimationFrame(()=>requestAnimationFrame(()=>tr&&tr.classList.add('go')));
      const rs=$('#rsScreen'); setTimeout(()=>{ if(!rs||!document.body.contains(rs)) return; rs.classList.add('on'); const v=rs.querySelector('video'); if(!RM&&v){ v.preload='auto'; v.play().catch(()=>{}); } }, RM?0:1300); }
  }
  async function playAll(){ const my=++tok; for(let i=0;i<5;i++){ if(my!==tok) return; show(i); await sleep(i===4?0:2300); } }
  B.forEach((b,i)=>b.addEventListener('click',()=>{ ++tok; show(i); }));
  show(0);
  onView($('#pipe'),()=>{ if(tok===0) playAll(); },.35);
})();

/* 04 MODELS: router */
(()=>{ const R=$$('#req button'), lanes=$$('#lanes .vg-lane'), route=$('#route'), nb=$('#newModel'), vs=$('#videoSlots');
  const MSG=['Script and messaging go to <b>text generation models</b>.','Product imagery goes to <b>image generation models</b>.','Scene video goes to <b>video generation models</b>.','Voiceover goes to <b>voice synthesis</b>, in each region’s language.','Final assembly goes to <b>programmatic rendering</b> and media pipelines.'];
  let added=false;
  const pick=i=>{ press(R,R[i]); lanes.forEach((l,j)=>l.classList.toggle('on',j===i)); route.innerHTML=MSG[i]; };
  R.forEach((b,i)=>b.addEventListener('click',()=>pick(i)));
  nb.addEventListener('click',()=>{ if(!added){ added=true; vs.insertAdjacentHTML('beforeend','<span class="new">New video model · added</span>'); nb.textContent='✓ New model in the pool'; nb.disabled=true; }
    pick(2); route.innerHTML='A new video model joins the pool. <b>The workflow, the other models and the marketers’ steps stay the same.</b>'; });
  pick(0);
})();

/* 05 LOCALISE */
(()=>{ const M=[
    ['North America','EN','English voiceover','Big ideas deserve the big screen.','Big ideas deserve the big screen. Find yours today.'],
    ['Latin America','ES','Spanish voiceover','Las grandes ideas merecen la gran pantalla.','Las grandes ideas merecen la gran pantalla. Encuentra la tuya hoy.'],
    ['Europe · DACH','DE','German voiceover','Große Ideen gehören auf den großen Bildschirm.','Große Ideen gehören auf den großen Bildschirm. Finde deine noch heute.'],
    ['Europe · France','FR','French voiceover','Les grandes idées méritent le grand écran.','Les grandes idées méritent le grand écran. Trouvez la vôtre dès aujourd’hui.']];
  const box=$('#markets'); box.innerHTML=M.map((m,i)=>`<button type="button" aria-pressed="${i===0}">${m[0]}<span>${m[1]}</span></button>`).join('');
  $('#locWave').innerHTML=Array.from({length:44},(_, i)=>`<i style="animation-delay:${(i%11)*.08}s"></i>`).join('');
  const B=$$('#markets button');
  const set=i=>{ const m=M[i]; press(B,B[i]); $('#locLang').textContent=m[1]; $('#locVoice').textContent=m[2];
    const h=$('#locHead'); h.style.animation='none'; h.offsetHeight; h.style.animation=''; h.textContent=m[3];
    const l=$('#locLine'); l.style.animation='none'; l.offsetHeight; l.style.animation=''; l.textContent='“'+m[4]+'”'; };
  B.forEach((b,i)=>b.addEventListener('click',()=>{ user=true; set(i); }));
  let user=false; set(0);
  onView($('#loc'),async()=>{ for(let i=1;i<M.length;i++){ await sleep(1800); if(user) return; set(i); } await sleep(1800); if(!user) set(0); },.4);
})();

/* 06 TRIGGER */
(()=>{ const C=$$('#chain div'), log=$('#tlog'), E={product:['New product','Product added to the catalog'],promo:['Promotion','Promotion scheduled'],event:['Seasonal event','Campaign calendar event']};
  let tok=0,first=true;
  const L=h=>{ log.insertAdjacentHTML('beforeend','<div>'+h+'</div>'); log.scrollTop=log.scrollHeight; };
  async function fire(k){ const my=++tok; if(first){ log.innerHTML=''; first=false; } C.forEach(c=>c.classList.remove('on'));
    const e=E[k]; const steps=[[0,`<em>marketing</em> event · ${e[0]} · ${e[1]}`],[1,'<em>workflow</em> trigger received · generation job created'],[2,'<em>platform</em> research → script → visuals → voice → render'],[3,`<b>ready</b> platform-ready ad for “${e[0]}” · under 5 min`]];
    for(const s of steps){ if(my!==tok) return; C[s[0]].classList.add('on'); L(s[1]); await sleep(650); } L('&nbsp;'); }
  $$('#trig [data-e]').forEach(b=>b.addEventListener('click',()=>fire(b.dataset.e)));
  onView($('#trig'),async()=>{ await sleep(500); if(tok===0) fire('product'); },.4);
})();

/* 07 ARCHITECTURE */
(()=>{ const B=$$('#layers button'), det=$('#adet');
  const D=[
    ['Marketing systems',['Connects with the client’s existing enterprise marketing platforms.','New products, promotions or events can trigger video generation automatically.','Workflow automation tools hand each job to the platform.']],
    ['Orchestration',['One automated workflow runs research, script, visuals, voice and render.','A coordinated network of AI models, not a single tool.','Models are selected dynamically for each stage.']],
    ['Generative AI services',['Text generation models for research, scripts and messaging.','Image and video generation models for scenes, product imagery and assets.','Voice synthesis, including Eleven Labs, for natural and localised voiceovers.','Designed so new models can be added as the technology evolves.']],
    ['Rendering & media',['Programmatic video rendering APIs assemble visuals, voiceover and text overlays.','Server-side media processing pipelines produce the final, platform-ready ads.','Scalable rendering, so many ads can be produced at once.']]];
  const show=i=>{ press(B,B[i]); det.innerHTML=`<small>Layer ${i+1} of 4 · on Oracle Cloud Infrastructure</small><h3>${D[i][0]}</h3><ul>${D[i][1].map((t,j)=>`<li style="animation-delay:${j*.08}s">${t}</li>`).join('')}</ul>`; };
  B.forEach((b,i)=>b.addEventListener('click',()=>show(i))); show(0);
})();

/* 08 SAMPLES: tap to play / pause; autoplay when visible unless reduced motion */
(()=>{ const clips=$$('#clips .vg-clip');
  const icon=(c,playing)=>{ c.querySelector('.pp').innerHTML=playing?'<svg viewBox="0 0 16 16"><path d="M4 3h3v10H4zM9 3h3v10H9z"/></svg>':'<svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg>'; };
  clips.forEach(c=>{ const v=c.querySelector('video');
    const tog=()=>{ if(v.paused){ v.play().then(()=>icon(c,true)).catch(()=>{}); } else { v.pause(); icon(c,false); } };
    c.addEventListener('click',tog); c.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); tog(); } }); });
  if(!RM){ const io=new IntersectionObserver(es=>es.forEach(e=>{ const v=e.target.querySelector('video'); if(e.isIntersecting){ v.play().then(()=>icon(e.target,true)).catch(()=>{}); } else { v.pause(); icon(e.target,false); } }),{threshold:.5});
    clips.forEach(c=>io.observe(c)); }
})();

/* RESULTS */
(()=>{ const ba=$('#ba'); if(RM) ba.classList.add('in'); else onView(ba,()=>ba.classList.add('in'),.2); })();
