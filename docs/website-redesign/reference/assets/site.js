(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  if(reduce){ $$('svg').forEach(function(s){ if(s.pauseAnimations) try{ s.pauseAnimations(); }catch(e){} }); }

  /* --- toast for pages designed separately --- */
  var toast = $('#toast'), tt;
  function say(msg){ if(!toast) return; toast.textContent = msg; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(function(){ toast.classList.remove('on'); }, 2800); }
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[data-page]');
    if(!a) return;
    e.preventDefault();
    closeMenus();
    say(a.getAttribute('data-page'));
  });

  /* --- desktop dropdowns --- */
  var items = $$('.menu > li.has');
  function closeMenus(except){ items.forEach(function(li){ if(li !== except){ li.classList.remove('open'); li.querySelector('button').setAttribute('aria-expanded','false'); } }); }
  items.forEach(function(li){
    var b = li.querySelector('button');
    b.addEventListener('click', function(e){ e.stopPropagation(); var o = !li.classList.contains('open'); closeMenus(li); li.classList.toggle('open', o); b.setAttribute('aria-expanded', o); });
    li.addEventListener('mouseenter', function(){ if(window.matchMedia('(hover:hover)').matches){ closeMenus(li); li.classList.add('open'); b.setAttribute('aria-expanded','true'); } });
    li.addEventListener('mouseleave', function(){ if(window.matchMedia('(hover:hover)').matches){ li.classList.remove('open'); b.setAttribute('aria-expanded','false'); } });
  });
  document.addEventListener('click', function(e){ if(!e.target.closest('.menu')) closeMenus(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenus(); });

  /* --- mobile menu --- */
  var burger = $('#burger'), mob = $('#mob');
  if(burger && mob){ burger.addEventListener('click', function(){ var o = mob.hidden; mob.hidden = !o; burger.setAttribute('aria-expanded', o); }); }

  /* --- lifecycle + accordion (homepage) --- */
  var acc = $('#acc');
  if(acc){
    var notes = [
      'New capability: from a business objective to the first useful release, connected to your systems.',
      'Recovery & readiness: from a prototype that stalls to a production release with an operating owner.',
      'Specialist support: alongside your team across the lifecycle, on a defined workstream.'
    ];
    var lanes = $$('.lane'), accItems = $$('.acc-item', acc), note = $('#lcNote');
    var setAcc = function(i){
      accItems.forEach(function(it,k){ var on = k === i; it.classList.toggle('open', on); it.querySelector('button').setAttribute('aria-expanded', on); it.querySelector('.acc-body').hidden = !on; });
      lanes.forEach(function(l,k){ l.classList.toggle('on', k === i); l.setAttribute('aria-pressed', k === i); });
      if(note) note.textContent = notes[i];
    };
    accItems.forEach(function(it,k){ it.querySelector('button').addEventListener('click', function(){ setAcc(k); }); });
    lanes.forEach(function(l,k){ l.addEventListener('click', function(){ setAcc(k); }); });
    setAcc(0);
  }

  /* --- stepped stages (any number of instances) --- */
  $$('.stages').forEach(function(wrap){
    var st = $$('.st', wrap), run = $('.run', wrap), si = 0, hold = false;
    if(!st.length) return;
    var setStage = function(i){
      si = i;
      st.forEach(function(s,k){ s.classList.toggle('on', k === i); s.classList.toggle('done', k < i); s.setAttribute('aria-pressed', k === i); });
      if(run){ var cur = st[i].getBoundingClientRect(), box = wrap.getBoundingClientRect(); run.style.width = Math.max(0, (cur.left - box.left) + 28) + 'px'; }
    };
    st.forEach(function(s,k){
      s.addEventListener('click', function(){ hold = true; setStage(k); });
      s.addEventListener('mouseenter', function(){ hold = true; setStage(k); });
      s.addEventListener('mouseleave', function(){ hold = false; });
    });
    setStage(0);
    if(!reduce){ setInterval(function(){ if(!hold) setStage((si + 1) % st.length); }, 2600); }
    window.addEventListener('resize', function(){ setStage(si); });
  });

  /* --- tabs (horizontal and vertical) --- */
  $$('[role="tablist"]').forEach(function(list){
    var tabs = $$('[role="tab"]', list);
    var vertical = list.getAttribute('aria-orientation') === 'vertical';
    var sel = function(t){
      tabs.forEach(function(x){ var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; var p = document.getElementById(x.getAttribute('aria-controls')); if(p) p.hidden = !on; });
    };
    tabs.forEach(function(t,i){
      t.addEventListener('click', function(){ sel(t); });
      t.addEventListener('keydown', function(e){
        var next = vertical ? 'ArrowDown' : 'ArrowRight', prev = vertical ? 'ArrowUp' : 'ArrowLeft';
        if(e.key === next || e.key === prev){ e.preventDefault(); var n = tabs[(i + (e.key === next ? 1 : -1) + tabs.length) % tabs.length]; sel(n); n.focus(); }
      });
    });
  });

  /* --- copy buttons --- */
  $$('[data-copy]').forEach(function(b){
    b.addEventListener('click', function(){
      var el = document.getElementById(b.getAttribute('data-copy')); if(!el) return;
      var txt = el.textContent.trim(), label = b.textContent;
      var sel = function(){ var r = document.createRange(); r.selectNodeContents(el); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); };
      try{ navigator.clipboard.writeText(txt).then(function(){ b.textContent = 'Copied'; setTimeout(function(){ b.textContent = label; }, 1800); }, sel); }catch(e){ sel(); }
    });
  });

  /* --- case study archive: search + pagination --- */
  var grid = $('#caseGrid');
  if(grid){
    var cards = $$('.ccard', grid), q = $('#caseSearch'), count = $('#caseCount'), pager = $('#pager'), empty = $('#caseEmpty');
    var per = 12, page = 1, list = cards;
    var norm = function(s){ return (s || '').toLowerCase(); };
    var render = function(){
      var total = list.length, pages = Math.max(1, Math.ceil(total / per));
      if(page > pages) page = pages;
      cards.forEach(function(c){ c.hidden = true; });
      list.slice((page - 1) * per, page * per).forEach(function(c){ c.hidden = false; });
      var visible = Math.min(per, total - (page - 1) * per);
      count.textContent = 'Showing ' + (total ? visible : 0) + ' of ' + total + ' case studies';
      empty.hidden = total !== 0;
      pager.innerHTML = '';
      if(pages > 1){
        var mk = function(label, p, dis, cur){ var b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.disabled = !!dis; if(cur){ b.setAttribute('aria-current','page'); } b.addEventListener('click', function(){ page = p; render(); grid.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'start'}); }); pager.appendChild(b); };
        mk('Previous', page - 1, page === 1);
        for(var i = 1; i <= pages; i++){ mk(String(i), i, false, i === page); }
        mk('Next', page + 1, page === pages);
      }
    };
    var filter = function(){
      var v = norm(q.value).trim().split(/\s+/).filter(Boolean);
      list = cards.filter(function(c){ var h = norm(c.getAttribute('data-search')); return v.every(function(w){ return h.indexOf(w) > -1; }); });
      page = 1; render();
    };
    q.addEventListener('input', filter);
    render();
  }

  /* --- filter chips (careers) --- */
  $$('[data-chips]').forEach(function(group){
    var chips = $$('button', group);
    chips.forEach(function(c){ c.addEventListener('click', function(){ chips.forEach(function(x){ x.setAttribute('aria-pressed', x === c); }); var lbl = $('#chipLabel'); if(lbl) lbl.textContent = c.textContent; }); });
  });

  /* --- forms (preview only: nothing is sent) --- */
  $$('form[data-form]').forEach(function(f){
    var ok = f.parentNode.querySelector('.form-ok');
    f.addEventListener('submit', function(e){
      e.preventDefault();
      var bad = null;
      $$('[data-err]', f).forEach(function(el){
        var field = el.closest('.field'), msg = field && field.querySelector('.err');
        var valid = el.type === 'checkbox' ? el.checked : (el.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()) : el.value.trim() !== '');
        if(field) field.classList.toggle('bad', !valid);
        if(msg) msg.textContent = valid ? '' : el.getAttribute('data-err');
        if(!valid && !bad) bad = el;
      });
      if(bad){ bad.focus(); return; }
      f.hidden = true; if(ok){ ok.hidden = false; ok.focus(); }
    });
    var reset = ok && ok.querySelector('[data-reset]');
    if(reset){ reset.addEventListener('click', function(){ f.reset(); ok.hidden = true; f.hidden = false; }); }
  });

  /* --- consulting funnel --- */
  var fz = $('#funnel');
  if(fz){
    var NS = 'http://www.w3.org/2000/svg', g = $('#fzDots', fz), card = $('#fzCard rect', fz);
    var gates = [{x:158,a:66,b:174},{x:248,a:86,b:154},{x:338,a:104,b:136}];
    var N = 16, seed = 11, rnd = function(){ seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var fate = [3,0,1,0,2,0,1,0,0,2,1,0,1,0,2,0];
    var slots = [0,0,0], dots = [], mk = function(r, fill, op){ var c = document.createElementNS(NS, 'circle'); c.setAttribute('r', r); c.setAttribute('fill', fill); c.setAttribute('opacity', op); g.appendChild(c); return c; };
    var tick = document.createElementNS(NS, 'path'); tick.setAttribute('d', 'M390 143l6 6 12-12'); tick.setAttribute('fill', 'none'); tick.setAttribute('stroke', '#3dbe8b'); tick.setAttribute('stroke-width', '3'); tick.setAttribute('opacity', '0'); g.appendChild(tick);
    for(var i = 0; i < N; i++){
      var x0 = 26 + (i % 4) * 22 + rnd()*6, y0 = 56 + Math.floor(i / 4) * 40 + rnd()*10;
      mk(4.5, '#ffffff', .18).setAttribute('cx', x0); g.lastChild.setAttribute('cy', y0);
      var d = {x0:x0, y0:y0, pass:fate[i], jit:rnd(), el:mk(4.5, '#ffffff', 1)};
      if(d.pass < 3){ d.slot = slots[d.pass]++; }
      dots.push(d);
    }
    var T = [0.6, 1.9, 3.2, 4.5, 5.6], CYCLE = 8.2;
    var lerp = function(a, b, t){ return a + (b - a) * t; };
    var ease = function(t){ t = Math.max(0, Math.min(1, t)); return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; };
    var laneY = function(d, k){ var gt = gates[k]; return lerp(gt.a + 9, gt.b - 9, d.jit); };
    var pos = function(d, t){
      if(t < T[0]) return [d.x0, d.y0, '#ffffff', ease(t / T[0])];
      var px = d.x0, py = d.y0;
      for(var k = 0; k < 3; k++){
        var t0 = T[k], t1 = T[k+1], gx = gates[k].x, gy = laneY(d, k);
        if(t < t1){ var e = ease((t - t0) / (t1 - t0)); return [lerp(px, gx - 9, e), lerp(py, gy, e), k === 0 ? '#ffffff' : '#09b6f9', 1]; }
        if(d.pass === k){ var e2 = ease((t - t1) / 0.8); return [lerp(gx - 9, gx - (slots[k] - 1) * 5 + d.slot * 10, e2), lerp(gy, 224, e2), 'rgba(160,185,240,.55)', 1]; }
        px = gx - 9; py = gy;
      }
      var e3 = ease((t - T[3]) / (T[4] - T[3])); return [lerp(px, 400, e3), lerp(py, 120, e3), '#3dbe8b', e3 > .95 ? Math.max(0, 1 - (t - T[4]) * 3) : 1];
    };
    var draw = function(t){
      dots.forEach(function(d){ var p = pos(d, t); d.el.setAttribute('cx', p[0].toFixed(1)); d.el.setAttribute('cy', p[1].toFixed(1)); d.el.setAttribute('fill', p[2]); d.el.setAttribute('opacity', p[3]); });
      var done = t > T[4];
      card.setAttribute('fill', done ? 'rgba(61,190,139,.42)' : 'rgba(61,190,139,.14)');
      tick.setAttribute('opacity', done ? 1 : 0);
    };
    if(reduce){ draw(CYCLE - .2); }
    else {
      var st0 = null;
      var loop = function(ts){ if(st0 === null) st0 = ts; var t = ((ts - st0) / 1000 + 4.0) % CYCLE; draw(Math.min(t, CYCLE - .4)); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
  }

  /* --- software isometric layers --- */
  var iso = $('#iso');
  if(iso){
    var pls = $$('.pl', iso), lis = $$('.iso-labels li', iso), li = 0, isoHold = false;
    var hot = function(k){ pls.forEach(function(p){ p.classList.toggle('hot', +p.getAttribute('data-l') === k); }); lis.forEach(function(l){ l.classList.toggle('hot', +l.getAttribute('data-l') === k); }); };
    lis.forEach(function(l){ l.addEventListener('mouseenter', function(){ isoHold = true; hot(+l.getAttribute('data-l')); }); l.addEventListener('mouseleave', function(){ isoHold = false; }); });
    hot(0);
    if(!reduce){ setInterval(function(){ if(isoHold) return; li = (li + 1) % 3; hot(li); }, 2200); }
  }

  /* --- careers role filter --- */
  var roleWrap = $('#roles');
  if(roleWrap){
    var roles = $$('.job', roleWrap), eoi = $('#eoi');
    $$('[data-chips] button').forEach(function(c){
      c.addEventListener('click', function(){
        var cat = c.getAttribute('data-cat'), shown = 0;
        roles.forEach(function(r){ var on = cat === 'all' || r.getAttribute('data-cat') === cat; r.hidden = !on; if(on) shown++; });
        roleWrap.hidden = shown === 0;
        if(eoi) eoi.hidden = shown !== 0;
      });
    });
  }

  /* --- cloud release pipeline --- */
  var rel = $('#rel');
  if(rel){
    var nodes = $$('.rl-node', rel), envs = $$('.rl-env', rel), pkg = $('.rl-pkg', rel), fill = $('.rl-fill', rel);
    var sp = $('.rl-spark .ln', rel), sa = $('.rl-spark .area', rel), pts = [];
    for(var q = 0; q < 31; q++) pts.push(30 + Math.sin(q / 3) * 6 + Math.random() * 6);
    var drawSpark = function(){ var d = pts.map(function(y, k){ return (k ? 'L' : 'M') + (k * 10) + ' ' + y.toFixed(1); }).join(' '); sp.setAttribute('d', d); sa.setAttribute('d', d + ' L300 56 L0 56 Z'); };
    var steps = [
      {n:0, done:-1, env:[]},
      {n:1, done:0, env:[]},
      {n:2, done:1, env:['dep']},
      {n:2, done:1, env:['live','dep']},
      {n:2, done:1, env:['live','live','dep']},
      {n:3, done:2, env:['live','live','live']},
      {n:-1, done:3, env:['live','live','live']}
    ];
    var setStep = function(s){
      nodes.forEach(function(nd, k){ nd.classList.toggle('act', k === s.n); nd.classList.toggle('done', k <= s.done); });
      envs.forEach(function(e, k){ e.classList.remove('dep', 'live'); if(s.env[k]) e.classList.add(s.env[k]); });
      var at = s.n >= 0 ? s.n : 3;
      pkg.style.left = (12.5 + at * 25) + '%';
      fill.style.width = (Math.max(0, Math.min(3, s.done + (s.n > s.done ? .5 : 0))) / 3 * 100) + '%';
    };
    drawSpark();
    if(reduce){ setStep(steps[6]); }
    else {
      var si2 = 0; setStep(steps[0]);
      setInterval(function(){ si2 = (si2 + 1) % (steps.length + 1); setStep(steps[Math.min(si2, steps.length - 1)]); }, 1100);
      setInterval(function(){ pts.shift(); var last = pts[pts.length - 1]; pts.push(Math.max(12, Math.min(48, last + (Math.random() - .5) * 9))); drawSpark(); }, 160);
    }
  }
})();
(function(){
  /* Logos turn to brand colour on hover; on touch screens a tap does the same. */
  var tiles = document.querySelectorAll('.lw, .xlogos img');
  if (!tiles.length) return;
  function clear(){ for (var i = 0; i < tiles.length; i++) tiles[i].classList.remove('on'); }
  for (var i = 0; i < tiles.length; i++) tiles[i].addEventListener('touchstart', function(){ var was = this.classList.contains('on'); clear(); if (!was) this.classList.add('on'); }, {passive:true});
  document.addEventListener('touchstart', function(e){ if (!e.target.closest || !e.target.closest('.lw, .xlogos img')) clear(); }, {passive:true});
})();

/* One visit = from the first tab of the site until the last one closes. The homepage crane shows once per visit:
   every page answers the other tabs on a BroadcastChannel; a new tab that hears no "seen" starts a new visit. */
function piVisitSeen(v){try{if(v)sessionStorage.setItem('pi-crane-seen','1');return sessionStorage.getItem('pi-crane-seen')==='1'}catch(e){return false}}
(function(){
  if (typeof BroadcastChannel === 'undefined') return;
  var ch = new BroadcastChannel('pi-visit');
  ch.onmessage = function(e){ var d = e.data || {}; if (d.type === 'ask') ch.postMessage({type:'here', seen: piVisitSeen()}); else if (d.type === 'seen') piVisitSeen(true); };
})();
function piVisitClaimCrane(done){
  if (piVisitSeen()) return done(false);
  var seen = false, ch = typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel('pi-visit');
  if (ch) { ch.onmessage = function(e){ if (e.data && e.data.type === 'here' && e.data.seen) seen = true; }; ch.postMessage({type:'ask'}); }
  setTimeout(function(){ piVisitSeen(true); if (ch) { if (!seen) ch.postMessage({type:'seen'}); ch.close(); } done(!seen); }, ch ? 300 : 0);
}
