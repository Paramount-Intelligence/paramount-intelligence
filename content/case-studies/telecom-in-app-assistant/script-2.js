(function(){
  var bar = document.getElementById('pi-prog'); if(!bar) return;
  var list = bar.querySelector('.pi-prog-list'), fill = bar.querySelector('.pi-prog-bar i'), cur = document.getElementById('pi-prog-cur');
  var short = {'what customers ask':'Questions','what makes it different':'Difference'};
  var label = function(t){
    var parts = t.split('·').map(function(s){ return s.trim(); }).filter(Boolean);
    if(parts.length && /^\d+$/.test(parts[0])) parts.shift();
    var s = parts.length > 1 ? parts[parts.length - 1] : (parts[0] || '');
    s = s.replace(/^the\s+/i, '');
    var k = s.toLowerCase(); if(short[k]) s = short[k];
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  var hero = document.querySelector('section.hero');
  var secs = [].slice.call(document.querySelectorAll('section.ch')).filter(function(s){ return s.querySelector('.eyebrow'); });
  var items = [];
  if(hero){ if(!hero.id) hero.id = 'top'; items.push({el:hero, name:'Overview'}); }
  secs.forEach(function(s, i){ if(!s.id) s.id = 'ch-' + (i + 1); items.push({el:s, name:label(s.querySelector('.eyebrow').textContent)}); });
  var total = items.length;
  items.forEach(function(it, i){
    it.el.style.scrollMarginTop = '130px';
    var li = document.createElement('li'), a = document.createElement('a');
    a.href = '#' + it.el.id; a.innerHTML = '<b>' + (i < 9 ? '0' : '') + (i + 1) + '</b>' + it.name;
    a.addEventListener('click', function(e){ e.preventDefault(); it.el.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'}); });
    li.appendChild(a); list.appendChild(li); it.a = a;
  });
  var close = document.getElementById('contact');
  var active = -1;
  var update = function(){
    var line = 140, idx = 0;
    items.forEach(function(it, i){ if(it.el.getBoundingClientRect().top <= line) idx = i; });
    if(idx !== active){
      active = idx;
      items.forEach(function(it, i){ it.a.classList.toggle('on', i === idx); it.a.classList.toggle('done', i < idx); if(i === idx) it.a.setAttribute('aria-current', 'step'); else it.a.removeAttribute('aria-current'); });
      cur.textContent = idx + 1;
      var a = items[idx].a; list.scrollLeft = a.offsetLeft - (list.clientWidth - a.offsetWidth) / 2;
    }
    var start = hero ? hero.offsetTop : 0, end = close ? close.offsetTop - innerHeight : document.documentElement.scrollHeight - innerHeight;
    var p = Math.max(0, Math.min(1, (scrollY - start) / Math.max(1, end - start)));
    fill.style.width = (p * 100).toFixed(1) + '%';
  };
  document.getElementById('pi-prog-tot').textContent = total;
  addEventListener('scroll', update, {passive:true}); addEventListener('resize', update); update();
})();
