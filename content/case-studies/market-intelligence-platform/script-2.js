__root.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const onView=(el,fn,th=.35)=>{ const o=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ o.disconnect(); fn(); } },{threshold:th}); o.observe(el); };
const visible=(el,cb)=>{ new IntersectionObserver(es=>cb(es[0].isIntersecting),{threshold:.15}).observe(el); };
const IMG={"ov": "/images/case-studies/dn-01-operations-overview.webp", "pipe": "/images/case-studies/dn-02-data-pipeline.webp", "meta": "/images/case-studies/dn-03-project-metadata.webp", "runs": "/images/case-studies/dn-04-runs-sessions.webp", "sched": "/images/case-studies/dn-05-schedules.webp", "ing": "/images/case-studies/dn-06-ingestion.webp", "cat": "/images/case-studies/dn-07-product-catalog.webp", "auto": "/images/case-studies/dn-08-automation.webp", "health": "/images/case-studies/dn-09-platform-health.webp"};
const hhmm=()=>new Date().toTimeString().slice(0,5);
let DL=null; try{ if(window.claude&&typeof window.claude.use==='function') window.claude.use('downloads').then(d=>{ DL=d; }).catch(()=>{}); }catch(e){}
async function saveFile(name,text,type){ if(DL){ try{ await DL.save({filename:name,data:text}); }catch(e){} return; }
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([text],{type})); a.download=name; document.body.appendChild(a); a.click(); a.remove(); }
const tok=()=>'t'+Math.random().toString(36).slice(2,5)+'…'+Math.random().toString(36).slice(2,5);

/* reveal */
(()=>{ const els=$$('.rv'); els.forEach(e=>{ if(e.getBoundingClientRect().top>innerHeight*.92) e.classList.add('pending'); });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove('pending'); io.unobserve(e.target);} }),{threshold:.12});
  els.forEach(e=>io.observe(e));
  addEventListener('scroll',()=>{ $$('.rv.pending').forEach(e=>{ if(e.getBoundingClientRect().top<innerHeight) e.classList.remove('pending'); }); },{passive:true}); })();

/* lightbox */
const LB=(()=>{ const lb=$('#lb'),li=$('#lbimg'),lc=$('#lbcap'); let last=null;
  const close=()=>{ lb.hidden=true; last&&last.focus(); }; $('#lbx').onclick=close; lb.addEventListener('click',e=>{ if(e.target===lb) close(); }); addEventListener('keydown',e=>{ if(e.key==='Escape'&&!lb.hidden) close(); });
  return (k,cap,from)=>{ last=from||document.activeElement; li.src=IMG[k]; li.alt=cap; lc.textContent=cap+' · sample values'; lb.hidden=false; $('#lbx').focus(); }; })();

/* HERO: web page to record */
(()=>{ const R=[{u:'distributor.example/filters?page=31',l:['Client P550041 Fuel Filter  Ref: P550041/BF7633','CLIENT BRAND','€ 1.234,56 excl. VAT'],
      f:[['product_name','Client P550041 Fuel Filter'],['part_number','P550041'],['equivalent_refs','BF7633'],['brand','Client brand'],['price','1234.56','€ 1.234,56'],['currency','EUR'],['country','Netherlands'],['source_url','distributor.example/p550041',0,1],['page_number','31',0,1],['extracted_at','2026-10-12 14:20:07',0,1]]},
    {u:'catalog.example/hengst?page=8',l:['Hengst E400KPD142 Fuel Filter Insert','HENGST','€ [PRICE] incl. VAT'],
      f:[['product_name','Hengst E400KPD142 Fuel Filter Insert'],['part_number','E400KPD142'],['equivalent_refs','—'],['brand','Hengst'],['price','[PRICE]'],['currency','EUR'],['country','Germany'],['source_url','catalog.example/e400kpd142',0,1],['page_number','8',0,1],['extracted_at','2026-10-12 14:21:44',0,1]]},
    {u:'precios.example/racor?pagina=3',l:['Parker Racor P50-2142 Filtro de combustible','PARKER RACOR','$ [PRICE] MXN'],
      f:[['product_name','Parker Racor P50-2142 Fuel Filter'],['part_number','P50-2142'],['equivalent_refs','—'],['brand','Parker Racor'],['price','[PRICE]'],['currency','MXN'],['country','Mexico'],['source_url','precios.example/p50-2142',0,1],['page_number','3',0,1],['extracted_at','2026-10-12 14:23:10',0,1]]}];
  const url=$('#hurl'),list=$('#hlist'),rec=$('#hrec'),pg=$('#hx .dn-page');
  function page(r){ url.textContent=r.u; list.innerHTML=[0,1,2].map(i=>i===1?`<div class="hit"><i></i><div><b>${r.l[0]}</b><span>${r.l[1]}</span><em>${r.l[2]}</em></div></div>`:`<div><i></i><div><b class="ph"></b><span class="ph s"></span><em class="ph s"></em></div></div>`).join(''); }
  function full(r){ rec.innerHTML=`<div class="hd"><b>product_data</b><span class="ok">Passed</span></div>`+r.f.map(f=>`<div class="r${f[3]?' prov':''}"><span>${f[0]}</span><b>${f[1]}</b>${f[2]?`<em>${f[2]} →</em>`:''}</div>`).join('')+`<div class="ft">Provenance on every row</div>`; }
  if(RM){ page(R[0]); full(R[0]); return; }
  let vis=true; visible($('#hx'),v=>vis=v);
  (async()=>{ let k=0; while(true){ while(!vis) await sleep(400); const r=R[k++%R.length];
    page(r); rec.innerHTML='<div class="hd"><b>product_data</b><span class="wait">Extracting…</span></div>'; pg.classList.remove('go'); void pg.offsetWidth; pg.classList.add('go'); await sleep(1300);
    rec.innerHTML=`<div class="hd"><b>product_data</b><span class="wait">Normalizing…</span></div>`;
    for(let i=0;i<r.f.length;i++){ const f=r.f[i]; rec.insertAdjacentHTML('beforeend',`<div class="r${f[3]?' prov':''} in"><span>${f[0]}</span><b>${f[1]}</b>${f[2]?`<em>${f[2]} →</em>`:''}</div>`); await sleep(170); }
    rec.querySelector('.hd span').outerHTML='<span class="ok">Passed</span>'; rec.insertAdjacentHTML('beforeend','<div class="ft">Provenance on every row</div>'); await sleep(4200); } })();
})();

/* PROBLEM: the broken catalog */
(()=>{ const T=3413,box=$('#cat'),fill=$('#cfill'),marks=$('#cmarks'),num=$('#cnum'),st=$('#cstat'),B=$$('#cat .seg button');
  const P=[['Engineer-dependent','Every start, check and download needs a technical operator'],['Inconsistent output','Formats change by site and by run'],['Partial catalogs','A stopped run leaves a gap and no way to continue'],['Untraceable rows','Records can’t be traced back to their source']];
  $('#pains').innerHTML=P.map(p=>`<div><b>${p[0]}</b><span>${p[1]}</span></div>`).join('');
  let mode='before',tk=0,user=false;
  const set=(n)=>{ fill.style.width=(n/T*100)+'%'; num.textContent=n.toLocaleString('en-US'); };
  async function play(){ const my=++tk; marks.innerHTML=''; set(0); box.classList.remove('stopped','full');
    if(mode==='before'){ st.textContent='Scraping…'; st.className='dn-cstat run';
      for(let n=0;n<=1269;n+=47){ if(my!==tk) return; set(n); await sleep(RM?0:28); } set(1269); box.classList.add('stopped');
      marks.innerHTML=`<span class="stop" style="left:${1269/T*100}%"><em>Run stopped at 1,269</em></span>`; st.textContent='✕ Run and pagination limits hit · restart from page 1?'; st.className='dn-cstat bad'; return; }
    const segs=[[0,1269],[1269,2350],[2350,T]]; st.className='dn-cstat run';
    for(let s=0;s<segs.length;s++){ st.textContent=s===0?'Run 1 · session CS-0142':`Resume · run ${s+1} continues from the stored next page`;
      for(let n=segs[s][0];n<=segs[s][1];n+=47){ if(my!==tk) return; set(Math.min(n,segs[s][1])); await sleep(RM?0:22); } set(segs[s][1]);
      if(s<segs.length-1){ marks.insertAdjacentHTML('beforeend',`<span class="res" style="left:${segs[s][1]/T*100}%"><em>Resume</em></span>`); await sleep(RM?0:500); } }
    box.classList.add('full'); st.textContent='✓ One cumulative session · 3 runs · full catalog'; st.className='dn-cstat ok'; }
  function setMode(m){ mode=m; B.forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===m)); box.classList.toggle('after',m==='after'); play(); }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; setMode(b.dataset.m); })); $('#cplay').onclick=()=>{ user=true; play(); };
  onView(box,async()=>{ setMode('before'); if(RM) return; await sleep(5200); if(!user) setMode('after'); },.4);
})();

/* APPROACH: five decisions */
(()=>{ const D=[['Run and Resume stay separate','A fresh scrape and a continued scrape could be confused, corrupting pagination.','Run always opens a new cumulative session; Resume only continues an active one.','run'],
   ['A server-side gateway','Backend keys in the browser, and uploads and downloads handled client-side.','Next.js server routes hold credentials, inject the API key and stream files.','gate'],
   ['One store: Snowflake','Operational state in one place and product data in another, with no link between them.','Projects, runs, sessions, schedules, audit events and products in one warehouse.','store'],
   ['Automation is optional and gated','Background jobs firing runs the operations team never asked for.','Every automation sits behind a configuration flag; automatic page continuation is off by default.','gate2'],
   ['Every record is stamped','Rows that can’t be traced back to the page they came from.','Source URL, page number and extraction time on every stored record.','stamp']];
  const L=$('#declist'),body=$('#decbody'); L.innerHTML=D.map((d,i)=>`<button type="button" role="tab" data-i="${i}"><em>${i+1}</em>${d[0]}</button>`).join(''); const B=$$('#declist button');
  const ICON={run:'<span class="ic run"><i>Run</i><i class="r">Resume</i></span>',gate:'<span class="ic gate"><i>Browser</i><b>Gateway</b><i>API</i></span>',store:'<span class="ic store"><i></i><i></i><i></i><i></i></span>',gate2:'<span class="ic sw"><i class="on"></i><i class="on"></i><i></i></span>',stamp:'<span class="ic stamp">source · page · time</span>'};
  let cur=0,user=false;
  function show(i){ cur=i; B.forEach((b,k)=>{ b.classList.toggle('on',k===i); b.setAttribute('aria-selected',k===i); }); const d=D[i];
    body.innerHTML=`<span class="n">Decision ${i+1} of 5</span><h3>${d[0]}</h3>${ICON[d[3]]}<div class="pv"><div class="p"><small>Prevents</small>${d[1]}</div><div class="d"><small>So the platform</small>${d[2]}</div></div>`; }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; show(+b.dataset.i); })); show(0);
  onView(L,()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); show((cur+1)%D.length); },3400); },.4);
})();

/* PIPELINE: one record, six stages */
(()=>{ const S=[['Sources','Distributor catalogs, supplier portals, market pricing sites'],['Collection','ParseHub projects and six custom scrapers'],['Orchestration','Flask API: runs, resumes, sessions, locks, retries'],['Ingestion','Extract, normalize, validate, merge once per run'],['Snowflake','Projects, runs, sessions, products, audit events'],['Delivery','Console review, CSV and JSON export']];
  const V=[
   `<div class="dn-web"><div class="bar"><i></i><i></i><i></i><span>distributor.example/filters?page=31</span></div><div class="li"><b>Client P550041 Fuel Filter&nbsp; Ref: P550041/BF7633</b><span>CLIENT BRAND</span><em>€ 1.234,56 excl. VAT</em></div></div>`,
   `<pre class="dn-code"><span class="c">// run tZ1p…7hD, page 31, item 7</span>
{
  "title": "Client P550041 Fuel Filter  Ref: P550041/BF7633",
  "brand_text": "CLIENT BRAND",
  "price_text": "<mark>€ 1.234,56</mark> excl. VAT",
  "url": "https://distributor.example/p550041",
  "page": "31"
}</pre>`,
   `<div class="dn-orch"><div><small>Project</small><b>DON-UK-014</b></div><div><small>Cumulative session</small><b>CS-0142</b></div><div><small>Run</small><b>3 of 4 · pages 26 to 38</b></div><div><small>Run token</small><b class="mono">tZ1p…7hD</b></div><div><small>Lock</small><b>project:DON-UK-014:run · held</b></div><div><small>Rate limit</small><b>bounded concurrency, retry with backoff</b></div></div>`,
   `<div class="dn-norm">${[['product_name','Client P550041 Fuel Filter','reference suffix removed'],['part_number','P550041','first primary match'],['equivalent_refs','BF7633','kept out of primary field'],['price','1234.56','1.234,56 parsed'],['currency','EUR','€ mapped to ISO'],['source_url','distributor.example/p550041','provenance'],['page_number','31','provenance'],['extracted_at','2026-10-12 14:20:07','provenance']].map(r=>`<div><span>${r[0]}</span><b>${r[1]}</b><em>${r[2]}</em></div>`).join('')}<div class="chk">✓ Part number present · ✓ Price numeric · ✓ Currency recognized · ✓ Valid source URL</div></div>`,
   `<div class="dn-tbl"><div class="cap"><b>product_data</b><span>clustered by project and run</span></div><table><thead><tr><th>project</th><th>run</th><th>part_number</th><th>brand</th><th>price</th><th>page</th></tr></thead><tbody><tr><td>DON-UK-014</td><td>tZ1p…7hD</td><td>P550041</td><td>Client brand</td><td>1234.56</td><td>31</td></tr><tr class="dim"><td>DON-UK-014</td><td>tZ1p…7hD</td><td>[PART NO.]</td><td>Client brand</td><td>[PRICE]</td><td>31</td></tr><tr class="dim"><td>FLG-UK-007</td><td>tA9e…1mX</td><td>[PART NO.]</td><td>Fleetguard</td><td>[PRICE]</td><td>24</td></tr></tbody></table><div class="cap"><span>Also stored: runs, cumulative sessions, run ingestions, schedules, automation locks, audit events</span></div></div>`,
   `<div class="dn-exp"><div class="tabs"><span class="on">CSV</span><span>JSON</span><em>Scope: cumulative session CS-0142</em></div><pre class="dn-code light">product_name,part_number,brand,price,currency,country,source_url,page_number,extracted_at
"Client P550041 Fuel Filter",P550041,Client brand,1234.56,EUR,Netherlands,distributor.example/p550041,31,2026-10-12 14:20:07</pre><span class="demo-note">An export can hold fewer rows than expected: a latest-only filter, a session filter, incomplete pagination or a pending ingestion. A completed run is not proof of a complete catalog.</span></div>`];
  const N=['Each source becomes a collection project; project sync pulls the ParseHub list into the console.','The collection engine returns raw output: titles mixing part numbers with cross-references, prices in local formats.','The Flask API owns the run: a short lock, a conflict check, the run token and its cumulative session.','Six transformation rules and four validation checks turn raw output into one standard record.','One warehouse for operational state and product data, so any record traces back to its run, session and project.','Operators review stored products and export the latest run or a whole cumulative session.'];
  const st=$('#pstages'),view=$('#pview'),note=$('#pnote'); st.innerHTML=S.map((s,i)=>`<button type="button" role="tab" data-i="${i}"><em>${i+1}</em><b>${s[0]}</b><span>${s[1]}</span></button>`).join(''); const B=$$('#pstages button');
  let cur=0,user=false;
  function show(i){ cur=i; B.forEach((b,k)=>{ b.classList.toggle('on',k===i); b.classList.toggle('done',k<i); b.setAttribute('aria-selected',k===i); }); view.innerHTML=`<small class="lb">The record at stage ${i+1} · ${S[i][0]}</small>`+V[i]; note.innerHTML=`<b>${S[i][0]}</b>${N[i]}`; }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; show(+b.dataset.i); })); show(0);
  onView($('#pipe'),()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); show((cur+1)%S.length); },3600); },.35);
})();

/* SESSIONS: run / resume simulator */
(()=>{ const TOT=52,PER=13; const pg=$('#spages'); pg.innerHTML=Array.from({length:TOT},(_,i)=>`<i data-p="${i+1}"></i>`).join(''); const PG=[...pg.children];
  const runs=$('#sruns'),rd=$('#sready'),lg=$('#slog'),done=$('#sdone'),sst=$('#sstat'),sid=$('#sid'),bRun=$('#bRun'),bRes=$('#bRes'),bInt=$('#bInt');
  let S={sess:141,page:0,runs:[],active:null,blocked:false},user=false,timer=null;
  const C=['#204ecf','#09b6f9','#3dbe8b','#0f256e','#7aa2ff'];
  function log(t,c){ lg.insertAdjacentHTML('afterbegin',`<li class="${c||''}"><span>${hhmm()}</span>${t}</li>`); [...lg.children].slice(6).forEach(x=>x.remove()); }
  function ready(){ const R=[['Active cumulative session',S.runs.length>0],['Pages remaining',S.page<TOT],['Next page resolved',S.runs.length>0&&S.page<TOT],['Checkpoint advancing',!S.blocked],['No run in progress',!S.active]]; return R; }
  function draw(){ PG.forEach((p,i)=>{ const r=S.runs.find(r=>i+1>=r.from&&i+1<=r.to); p.style.background=r?C[(r.n-1)%C.length]:''; p.className=S.active&&i+1===S.page+1?'cur':''; });
    done.textContent=S.page; sid.textContent=`DON-UK-014 · Session CS-0${S.sess}`;
    runs.innerHTML=S.runs.map(r=>`<li><em style="background:${C[(r.n-1)%C.length]}">Run ${r.n}</em><span>Pages ${r.from} to ${r.to===r.from-1?r.from:r.to}</span><b class="${r.st.toLowerCase().replace(/ /g,'')}">${r.st}</b></li>`).join('')||'<li class="none">No runs yet · press Run new session</li>';
    const R=ready(),ok=R.every(x=>x[1]); rd.innerHTML=R.map(x=>`<li class="${x[1]?'y':'n'}"><i>${x[1]?'✓':'✕'}</i>${x[0]}</li>`).join('');
    bRes.disabled=!ok; bInt.disabled=!S.active;
    sst.textContent=S.active?'Running':S.page>=TOT?'Complete':S.blocked?'Blocked':S.runs.length?'Ready to resume':'Idle'; sst.className='dn-st '+(S.active?'run':S.page>=TOT?'ok':S.blocked?'bad':S.runs.length?'warn':''); }
  function start(fresh){ if(S.active){ log('409 Conflict: a run is already active for DON-UK-014. Lock held.','bad'); flash(); return; }
    if(fresh){ S={sess:S.sess+1,page:0,runs:[],active:null,blocked:false}; log(`Run: new cumulative session CS-0${S.sess} opened`,'b'); }
    const r={n:S.runs.length+1,from:S.page+1,to:S.page,st:'Running',tk:tok()}; S.runs.push(r); S.active=r; if(!fresh) log(`Resume: run ${r.n} continues from page ${r.from}`,'b');
    draw(); clearInterval(timer); timer=setInterval(()=>{ if(S.page>=TOT||r.to-r.from+1>=PER){ finish(r); return; } S.page++; r.to=S.page; draw(); },RM?0:150); }
  function finish(r,int){ clearInterval(timer); r.st=int?'Cancelled':'Completed'; S.active=null; log(int?`Run ${r.n} interrupted at page ${S.page}. Progress kept in the session.`:`Run ${r.n} completed · output ingested`, int?'warn':'g'); draw(); }
  function flash(){ bRun.classList.remove('shake'); void bRun.offsetWidth; bRun.classList.add('shake'); }
  bRun.onclick=()=>{ user=true; start(true); }; bRes.onclick=()=>{ user=true; start(false); }; bInt.onclick=()=>{ user=true; if(S.active) finish(S.active,true); };
  draw();
  onView($('#sess'),async()=>{ if(RM){ S.runs=[{n:1,from:1,to:13,st:'Completed'},{n:2,from:14,to:26,st:'Completed'},{n:3,from:27,to:38,st:'Completed'}]; S.page=38; draw(); return; }
    start(true); await sleep(900); if(user) return; start(true); await sleep(1700); if(user) return; start(false); await sleep(1100); if(user) return; if(S.active) finish(S.active,true); await sleep(1500); if(user) return; start(false); },.35);
})();

/* SCRAPERS */
(()=>{ const K=[['Class8TruckParts','Selenium','Reads product grids with an automatic ChromeDriver installer, falling back to the URL and image text to recover SKUs.','US','USD'],
   ['EXD Supply','Selenium','A modified Chrome setup handles dynamic scrolling and pagination, with field maps for the Mexican and US catalogs.','Mexico','MXN'],
   ['Hofmien','Playwright','Playwright and BeautifulSoup4 read paginated multi-brand tables that include the client\'s brand, Fleetguard and Hengst.','EMENA','EUR'],
   ['Hydradyn','DrissionPage','Drives a supplier portal, including dialogs, cookies and session handling.','US','USD'],
   ['pc-comp-sany','Playwright','Playwright Chromium across multiple URLs, with mappings for Chinese-language brand and series names.','China','CNY'],
   ['KC Filters','Playwright','A Mexican Spanish locale collects Mexican market pricing, blocking non-essential resources to keep pages light.','Mexico','MXN']];
  const E=['All','Selenium','Playwright','DrissionPage'],eng=$('#eng'),cards=$('#scards'),shape=$('#sshape');
  eng.innerHTML=E.map((e,i)=>`<button type="button" aria-pressed="${i===0}">${e}${i?` <em>${K.filter(k=>k[1]===e).length}</em>`:''}</button>`).join(''); const EB=$$('#eng button');
  cards.innerHTML=K.map((k,i)=>`<button type="button" class="dn-sc" data-i="${i}" data-e="${k[1]}"><span class="t ${k[1].toLowerCase()}">${k[1]}</span><b>${k[0]}</b><span class="d">${k[2]}</span></button>`).join(''); const CB=$$('#scards .dn-sc');
  let cur=0,user=false;
  function pick(i){ cur=i; CB.forEach((c,k)=>c.classList.toggle('on',k===i)); const k=K[i];
    shape.innerHTML=`<div class="h"><b>Standard output shape</b><span>${k[0]} → same record as every ParseHub run</span></div><div class="f">${[['product_name','[PRODUCT]'],['part_number','[PART NO.]'],['brand_or_series',k[0]==='pc-comp-sany'?'mapped from Chinese name':'[BRAND]'],['prices','[PRICE]'],['currency',k[4]],['country',k[3]],['source_url','[URL]'],['extraction_date','2026-10-12']].map(f=>`<div><span>${f[0]}</span><b>${f[1]}</b></div>`).join('')}</div>`; }
  function filt(e){ EB.forEach(b=>b.setAttribute('aria-pressed',b.textContent.split(' ')[0]===e)); CB.forEach(c=>c.classList.toggle('dim',e!=='All'&&c.dataset.e!==e)); }
  EB.forEach(b=>b.addEventListener('click',()=>{ user=true; filt(b.textContent.split(' ')[0]); })); CB.forEach(c=>c.addEventListener('click',()=>{ user=true; pick(+c.dataset.i); }));
  pick(0); onView(cards,()=>{ if(RM) return; const t=setInterval(()=>{ if(user) return clearInterval(t); pick((cur+1)%K.length); },2600); },.4);
})();

/* CONSOLE: working replica */
(()=>{ const PR=[['DON-UK-014','Client filters, UK distributor','Client brand','EMENA',38,52,'Running'],['FLG-UK-007','Fleetguard catalog, UK distributor','Fleetguard','EMENA',24,24,'Completed'],['MNF-EU-021','Mann-Filter pricing, EU','Mann-Filter','EMENA',11,30,'Ready to resume'],['HNG-EU-003','Hengst product range','Hengst','EMENA',0,18,'Queued'],['BLD-US-011','Baldwin price list, US','Baldwin','US / Canada',16,16,'Completed'],['PRK-MX-005','Parker Racor, Mexico','Parker Racor','LATAM',6,40,'Blocked'],['KCF-MX-009','Market pricing, Mexico','Fleetguard','LATAM',12,12,'Completed'],['SNY-CN-002','Parts catalog, China','Client brand','APAC',9,22,'Ready to resume'],['DON-AU-004','Client filters, AU distributor','Client brand','APAC',0,26,'Queued']].map(p=>({id:p[0],n:p[1],b:p[2],r:p[3],d:p[4],t:p[5],s:p[6]}));
  const REC=[['P550041','Client brand','United Kingdom','GBP','Distributor catalog','CS-0142','DON-UK-014',31],['[PART NO.]','Client brand','United Kingdom','GBP','Distributor catalog','CS-0142','DON-UK-014',31],['E400KPD142','Hengst','Germany','EUR','Distributor catalog','CS-0127','HNG-EU-003',8],['P50-2142','Parker Racor','Mexico','MXN','Market pricing site','CS-0131','PRK-MX-005',3],['[PART NO.]','Fleetguard','United Kingdom','GBP','Distributor catalog','CS-0139','FLG-UK-007',24],['[PART NO.]','Mann-Filter','Netherlands','EUR','Distributor catalog','CS-0137','MNF-EU-021',11],['[PART NO.]','Baldwin','United States','USD','Supplier portal','CS-0134','BLD-US-011',16],['[PART NO.]','Client brand','Mexico','MXN','Market pricing site','CS-0129','KCF-MX-009',12]];
  const nav=$('#anav'),main=$('#amain'),PAGES=[['ov','Overview'],['cat','Product catalog'],['meta','Metadata import'],['auto','Automation']];
  nav.innerHTML=PAGES.map((p,i)=>`<button type="button" role="tab" data-p="${p[0]}">${p[1]}</button>`).join(''); const NB=$$('#anav button');
  const AUD=[['g','Run ingested','DON-UK-014 page batch written to product store','14:22'],['r','Resume blocked','PRK-MX-005 made no forward progress; checkpoint held','13:05'],['b','Schedule dispatched','Weekly Fleetguard refresh started','09:00']];
  let region='All',page='ov',user=false,tick=null,sel=0,brand='All',scope='session',fix=false,flags={auto:true,sched:true,resume:false,schema:false};
  const audit=(c,t,d)=>{ AUD.unshift([c,t,d,hhmm()]); AUD.length=Math.min(AUD.length,6); if(page==='ov') drawAud(); };
  function drawAud(){ const a=$('#caud'); if(a) a.innerHTML=AUD.map(x=>`<li class="${x[0]}"><b>${x[1]}</b><span>${x[2]}</span><em>${x[3]}</em></li>`).join(''); }
  const stc=s=>({Running:'run',Completed:'ok','Ready to resume':'warn',Queued:'q',Blocked:'bad'}[s]);
  const act=s=>({Running:'View run',Completed:'Export',['Ready to resume']:'Resume',Queued:'Run',Blocked:'Review'}[s]);
  function csv(rows,name){ const H='product_name,part_number,brand,price,currency,country,source,session,project,page_number\n';
    saveFile(name,H+rows.map(r=>[`"${r[1]} ${r[0]}"`,r[0],r[1],'[PRICE]',r[3],r[2],r[4],r[5],r[6],r[7]].join(',')).join('\n'),'text/csv'); }
  function ov(){ const L=PR.filter(p=>region==='All'||p.r===region);
    const K=[['Monitored projects',42,'Across collection sources'],['Completed runs',9,'Ingested to Snowflake'],['Stored product records','13,694','Available for review and export'],['Active sessions',PR.filter(p=>p.s==='Running').length,'Paginated collections in progress']];
    main.innerHTML=`<div class="dn-mh"><div><small>Operations overview</small><h4>Collection status across all monitored sources</h4></div><div class="dn-chips" id="creg">${['All','APAC','EMENA','LATAM','US / Canada'].map(r=>`<button type="button" aria-pressed="${r===region}">${r==='All'?'All regions':r}</button>`).join('')}</div></div>
      <div class="dn-kpi">${K.map(k=>`<div><span>${k[0]}</span><b>${k[1]}</b><small>${k[2]}</small></div>`).join('')}</div>
      <div class="dn-ovg"><div class="dn-card"><div class="ch"><b>Collection projects</b><span>${L.length} shown</span></div><div class="dn-tw"><table class="dn-pt"><thead><tr><th>Project</th><th>Brand</th><th>Region</th><th>Session progress</th><th>Status</th><th></th></tr></thead><tbody>${L.map(p=>`<tr data-id="${p.id}"><td><b>${p.n}</b><small>${p.id}</small></td><td>${p.b}</td><td>${p.r}</td><td><div class="pb ${stc(p.s)}"><i style="width:${p.d/p.t*100}%"></i></div><small>${p.d} of ${p.t} pages</small></td><td><span class="dn-st ${stc(p.s)}">${p.s}</span></td><td><button type="button" class="se-btn sm" data-a="${p.id}">${act(p.s)}</button></td></tr>`).join('')}</tbody></table></div></div>
      <div class="dn-card"><div class="ch"><b>Audit trail</b><span>live</span></div><ol class="dn-aud" id="caud"></ol></div></div>`;
    $$('#creg button').forEach(b=>b.onclick=()=>{ user=true; region=b.textContent==='All regions'?'All':b.textContent; ov(); });
    $$('.dn-pt [data-a]').forEach(b=>b.onclick=()=>{ user=true; doAct(PR.find(p=>p.id===b.dataset.a)); });
    drawAud(); }
  function doAct(p){ if(p.s==='Completed'){ csv(REC.filter(r=>r[6]===p.id).concat(REC.filter(r=>r[6]===p.id).length?[]:[REC[0]]),`${p.id}-cumulative-session.csv`); audit('b','Export generated',`${p.id} cumulative session, CSV`); return; }
    if(p.s==='Running'){ audit('b','Run inspected',`${p.id} page ${p.d+1} in progress`); return; }
    if(p.s==='Blocked'){ p.s='Ready to resume'; audit('g','Checkpoint reviewed',`${p.id} unblocked by operator after review`); ov(); return; }
    if(p.s==='Queued'){ p.s='Running'; audit('b','Run started',`${p.id} new cumulative session opened`); ov(); return; }
    if(p.s==='Ready to resume'){ p.s='Running'; audit('b','Resume started',`${p.id} continues at page ${p.d+1}`); ov(); } }
  function cat(){ const L=REC.filter(r=>brand==='All'||r[1]===brand),s=L[Math.min(sel,L.length-1)]||REC[0];
    main.innerHTML=`<div class="dn-mh"><div><small>Product catalog</small><h4>Normalized records with provenance</h4></div><div class="dn-ex"><div class="seg sm" role="group" aria-label="Export scope"><button type="button" data-s="latest" aria-pressed="${scope==='latest'}">Latest run</button><button type="button" data-s="session" aria-pressed="${scope==='session'}">Cumulative session</button></div><button type="button" class="se-btn" id="xcsv">Export CSV</button><button type="button" class="se-btn pri" id="xjson">Export JSON</button></div></div>
      <div class="dn-chips" id="cbr">${['All','Client brand','Fleetguard','Hengst','Mann-Filter','Parker Racor','Baldwin'].map(b=>`<button type="button" aria-pressed="${b===brand}">${b==='All'?'All brands':b}</button>`).join('')}</div>
      <div class="dn-catg"><div class="dn-card"><div class="dn-tw"><table class="dn-rt"><thead><tr><th>Part number</th><th>Brand</th><th>Market</th><th>Price</th><th>Session</th></tr></thead><tbody>${L.map((r,i)=>`<tr data-i="${i}" class="${r===s?'on':''}" tabindex="0"><td class="mono">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td class="mono">[PRICE] ${r[3]}</td><td class="mono">${r[5]}</td></tr>`).join('')}</tbody></table></div></div>
      <div class="dn-card dn-det"><small>Record detail</small><b>${s[1]} ${s[0]}</b><div class="kv"><span>Market</span><b>${s[2]}</b><span>Price</span><b class="mono">[PRICE] ${s[3]}</b></div><small class="pv">Provenance</small><div class="kv mono"><span>Source</span><b>${s[4]}</b><span>Page</span><b>${s[7]}</b><span>Project</span><b>${s[6]}</b><span>Session</span><b>${s[5]}</b><span>Extracted</span><b>2026-10-12 14:20</b></div></div></div>`;
    $$('#cbr button').forEach(b=>b.onclick=()=>{ user=true; brand=b.textContent==='All brands'?'All':b.textContent; sel=0; cat(); });
    $$('.dn-rt tbody tr').forEach(t=>{ const f=()=>{ user=true; sel=+t.dataset.i; cat(); }; t.onclick=f; t.onkeydown=e=>{ if(e.key==='Enter') f(); }; });
    $$('.dn-ex .seg button').forEach(b=>b.onclick=()=>{ user=true; scope=b.dataset.s; cat(); });
    $('#xcsv').onclick=()=>{ user=true; csv(L,`product-catalog-${scope}.csv`); audit('b','Export generated',`Catalog, ${scope==='session'?'cumulative session':'latest run'}, CSV`); };
    $('#xjson').onclick=()=>{ user=true; saveFile(`product-catalog-${scope}.json`,JSON.stringify(L.map(r=>({product_name:`${r[1]} ${r[0]}`,part_number:r[0],brand:r[1],price:'[PRICE]',currency:r[3],country:r[2],source:r[4],session:r[5],project:r[6],page_number:r[7]})),null,2),'application/json'); audit('b','Export generated',`Catalog, ${scope==='session'?'cumulative session':'latest run'}, JSON`); }; }
  function meta(){ const R=[['DON-UK-014','Client filters, UK distributor','https://distributor.example/client-brand','52'],['MNF-EU-021','Mann-Filter pricing, EU','https://catalog.example/mann','30'],[fix?'HNG-EU-003':'','Hengst product range','https://catalog.example/hengst','18'],['BLD-US-011','Baldwin price list, US',fix?'https://prices.example/baldwin':'ftp://prices.example/baldwin','16'],['PRK-MX-005','Parker Racor, Mexico','https://precios.example/racor',fix?'40':'-4']];
    const chk=r=>!r[0]?'Personal project ID is required':!/^https?:\/\//.test(r[2])?'Website URL must be an HTTP or HTTPS link':!/^\d+$/.test(r[3])?'Total pages must be a non-negative whole number':'';
    main.innerHTML=`<div class="dn-mh"><div><small>Project metadata</small><h4>Bulk import, validated row by row</h4></div><div class="dn-ex"><button type="button" class="se-btn" id="mfix">${fix?'Restore errors':'Fix the 3 rows'}</button><button type="button" class="se-btn pri" id="mval">Validate and import</button></div></div>
      <div class="dn-card"><div class="dn-tw"><table class="dn-mt"><thead><tr><th>#</th><th>Project ID</th><th>Project name</th><th>Website URL</th><th>Total pages</th><th>Result</th></tr></thead><tbody>${R.map((r,i)=>`<tr data-e="${chk(r)}"><td>${i+1}</td><td class="mono">${r[0]||'<em class=miss>(blank)</em>'}</td><td>${r[1]}</td><td class="mono">${r[2]}</td><td class="mono">${r[3]}</td><td class="res">·</td></tr>`).join('')}</tbody></table></div></div>
      <div class="dn-msum" id="msum">template.xlsx · 5 rows ready to validate</div>`;
    $('#mfix').onclick=()=>{ user=true; fix=!fix; meta(); };
    $('#mval').onclick=async()=>{ user=true; const T=$$('.dn-mt tbody tr'); let ok=0,bad=0; for(const t of T){ const e=t.dataset.e,c=t.querySelector('.res'); t.classList.add('chk'); await sleep(RM?0:260); if(e){ bad++; t.classList.add('bad'); c.innerHTML=`<span class="dn-st bad">Rejected</span><small>${e}</small>`; } else { ok++; t.classList.add('ok'); c.innerHTML='<span class="dn-st ok">Accepted</span>'; } }
      $('#msum').innerHTML=`<b>${ok} accepted · ${bad} rejected</b> · reasons reported back · import logged to history`; audit(bad?'r':'g','Metadata imported',`Bulk template: ${ok} rows accepted, ${bad} rejected`); }; }
  function auto(){ const F=[['auto','Automation','Master switch for backend jobs'],['sched','In-process scheduler','Dispatches due schedules and reconciliation'],['resume','Auto-resume','Starts follow-on page runs automatically'],['schema','Schema bootstrap','Creates missing tables at startup']];
    main.innerHTML=`<div class="dn-mh"><div><small>Automation and safeguards</small><h4>Optional, gated, and audited</h4></div><button type="button" class="se-btn pri" id="rcyc">Run a reconciliation cycle</button></div>
      <div class="dn-flags">${F.map(f=>`<label class="${flags[f[0]]?'on':''}"><input type="checkbox" data-f="${f[0]}" ${flags[f[0]]?'checked':''}><span class="sw"></span><b>${f[1]}</b><small>${f[2]}</small><em>${flags[f[0]]?'Active':'Paused'}</em></label>`).join('')}</div>
      <div class="dn-cyc" id="cyc">${['Find active runs','Read upstream status','Ingest on success','Evaluate next page','Record decision'].map((s,i)=>`<div><em>${i+1}</em><b>${s}</b></div>`).join('')}</div>
      <div class="dn-dec2" id="cdec">Press the button to run one cycle against session CS-0142 (page 38 of 52).</div>`;
    $$('.dn-flags input').forEach(c=>c.onchange=()=>{ user=true; flags[c.dataset.f]=c.checked; health(); auto(); });
    $('#rcyc').onclick=async()=>{ user=true; const D=$$('#cyc div'),out=$('#cdec'); D.forEach(d=>d.className='');
      if(!flags.auto){ out.innerHTML='<b class="w">Nothing ran.</b> The master switch is off, so the platform stays fully manual. The console never makes automatic calls of its own.'; return; }
      for(const d of D){ d.className='on'; await sleep(RM?0:420); d.className='done'; }
      if(flags.resume){ out.innerHTML='<b class="g">Dispatched.</b> Run 3 output ingested; next page available and the auto-resume gate is open, so run 4 started at page 39 in CS-0142.'; audit('b','Auto-resume dispatched','DON-UK-014 run 4 started at page 39'); }
      else { out.innerHTML='<b class="w">Held.</b> Run 3 output ingested; next page available, but the auto-resume gate is off, so the cycle waits for an operator. Audit event written.'; audit('a','Held for operator','DON-UK-014 next page available; auto-resume gate is off'); } }; }
  function health(){ $('#hauto').className=flags.resume?'g':'a'; $('#hautot').textContent=flags.resume?'Auto-resume on':'Auto-resume gated off'; }
  function go(p){ page=p; NB.forEach(b=>{ b.classList.toggle('on',b.dataset.p===p); b.setAttribute('aria-selected',b.dataset.p===p); }); ({ov,cat,meta,auto})[p](); }
  NB.forEach(b=>b.addEventListener('click',()=>{ user=true; go(b.dataset.p); }));
  go('ov'); health();
  setInterval(()=>{ let ch=false; PR.forEach(p=>{ if(p.s==='Running'){ p.d=Math.min(p.t,p.d+1); ch=true; if(p.d>=p.t){ p.s='Completed'; audit('g','Run ingested',`${p.id} final page written; session complete`); } } }); if(ch&&page==='ov'&&!RM){ $$('.dn-pt tbody tr').forEach(tr=>{ const p=PR.find(x=>x.id===tr.dataset.id); if(!p) return; tr.querySelector('.pb').className='pb '+stc(p.s); tr.querySelector('.pb i').style.width=(p.d/p.t*100)+'%'; tr.querySelector('td:nth-child(4) small').textContent=`${p.d} of ${p.t} pages`; const s=tr.querySelector('.dn-st'); s.className='dn-st '+stc(p.s); s.textContent=p.s; const b=tr.querySelector('[data-a]'); b.textContent=act(p.s); }); } },4200);
  onView($('#app'),async()=>{ if(RM) return; await sleep(3500); if(user) return; region='EMENA'; ov(); await sleep(2600); if(user) return; region='All'; ov(); },.3);
})();

/* ARCHITECTURE */
(()=>{ const V={req:[['Browser','Operator console','The user clicks Run, Resume or Export. The browser never calls the API directly.'],['Next.js server route','Gateway','Injects the backend API key on the server, normalizes errors, and handles uploads and downloads.'],['Flask API','Application control plane','Bearer key on standard routes, a separate internal key for automation, and its own secret for the ParseHub webhook.'],['ParseHub API','Collection','Starts, reads, cancels and retrieves runs, behind rate limiting, bounded concurrency and retry with backoff.'],['Snowflake','Warehouse','Operational state and product data in one store, reached over outbound HTTPS.']],
    rel:[['Push to main','Trigger','Every push to the main branch starts the release pipeline.'],['Sign in','Azure and registry','The pipeline signs in to Azure and the Azure Container Registry.'],['Build and push','Two images','Console and API images are built and tagged with the commit.'],['Apply','Secrets and overlay','Cluster credentials fetched; secrets and the Azure overlay applied.'],['Pin and roll out','AKS','Exact image tags are pinned and the rollout is awaited. Routine releases update the cluster, never recreate it.']]};
  const fl=$('#aflow'),det=$('#adet'),lab=$('#alab'),B=$$('#archx .seg button'); let tk=0,user=false;
  async function run(v){ const my=++tk; B.forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v)); const S=V[v];
    fl.innerHTML=S.map((s,i)=>`<button type="button" class="dn-fn" data-i="${i}"><em>${v==='rel'?'Step '+(i+1):s[1]}</em><b>${s[0]}</b></button>${i<S.length-1?'<i class="dn-fa"></i>':''}`).join('');
    const N=$$('#aflow .dn-fn'),A=$$('#aflow .dn-fa'); N.forEach(n=>n.onclick=()=>{ user=true; tk++; N.forEach(x=>x.classList.remove('on')); n.classList.add('on'); det.innerHTML=`<b>${S[+n.dataset.i][0]}.</b> ${S[+n.dataset.i][2]}`; });
    for(let i=0;i<S.length;i++){ if(my!==tk) return; N.forEach((n,k)=>{ n.classList.toggle('on',k===i); n.classList.toggle('seen',k<i); }); if(i>0) A[i-1].classList.add('go'); det.innerHTML=`<b>${S[i][0]}.</b> ${S[i][2]}`; lab.textContent=`${i+1} of ${S.length}`; await sleep(RM?0:1500); }
    if(RM) return; await sleep(1800); if(my===tk&&!user) run(v==='req'?'rel':'req'); }
  B.forEach(b=>b.addEventListener('click',()=>{ user=true; run(b.dataset.v); }));
  run('req'); tk++; onView($('#archx'),()=>{ if(!user) run('req'); },.35);
})();

/* PROOF */
(()=>{ const P=[['ov','Operations overview','Projects, session progress, audit trail and stored records.'],['pipe','Data pipeline','Six stages, the request path and the collection engines.'],['runs','Runs and sessions','One cumulative session across four runs, with resume readiness.'],['ing','Ingestion and normalization','A raw record beside its normalized form, with rules and checks.'],['cat','Product catalog','Filters, export scope and record provenance.'],['meta','Project metadata','Bulk import with row-level validation.'],['sched','Schedules','Recurring and one-time runs by market time zone.'],['auto','Automation and safeguards','Flags, reconciliation cycle, locks and audit events.'],['health','Platform health','Services, release pipeline and runtime path.']];
  const g=$('#proofg'); g.innerHTML=P.map((p,i)=>`<button type="button" data-i="${i}"><img src="${IMG[p[0]]}" alt="${p[1]}: ${p[2]}" loading="lazy"><span><b>${p[1]}</b>${p[2]}</span></button>`).join('');
  $$('#proofg button').forEach(b=>b.addEventListener('click',()=>{ const p=P[+b.dataset.i]; LB(p[0],p[1],b); }));
})();

/* RESULTS */
(()=>{ const C=[['Interrupted pagination','An early run captured 1,269 of 3,413 products.','Cumulative sessions, a resume path from the stored next page, and no-progress checkpoints.'],['Automation vs control','Operators wanted explicit buttons and no background activity.','A manual console, with automation in the backend behind independent switches, off by default.'],['Inconsistent product data','Mixed part numbers, empty rows, comma decimals, varied currency symbols.','One record shape, extraction rules for part numbers and prices, and provenance on every row.'],['Secrets and deployment','The API failed to start on a placeholder Snowflake secret.','Server-side credentials, cluster secrets, and a deployment guide for the likeliest failures.']];
  $('#chal').innerHTML='<span class="lbl">Four hard problems, four lasting features</span>'+C.map(c=>`<div><b>${c[0]}</b><p class="p"><small>Problem</small>${c[1]}</p><p class="f"><small>What it left behind</small>${c[2]}</p></div>`).join('');
  const ring=$('#rring'),n=$('#r80n'),L=2*Math.PI*52; ring.style.strokeDasharray=L; ring.style.strokeDashoffset=L;
  onView($('#r80'),async()=>{ for(let f=0;f<=40;f++){ const v=80*f/40; n.textContent=Math.round(v)+'%'; ring.style.strokeDashoffset=L*(1-v/100); await sleep(RM?0:24); } },.5);
  $$('.se-num b[data-to]').forEach(b=>{ const to=+b.dataset.to; if(RM) return; onView(b,async()=>{ for(let f=0;f<=36;f++){ b.textContent=Math.round(to*f/36).toLocaleString('en-US'); await sleep(24); } },.6); });
})();
