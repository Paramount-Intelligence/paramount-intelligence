(function(){
  var views = Array.prototype.slice.call(document.querySelectorAll('.g-view'));
  var pages = views.map(function(v){ return v.dataset.view; });
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 'main';
  function show(){
    var h = location.hash.slice(1);
    var view = (h && h !== 'main' && pages.indexOf(h) > -1) ? h : 'main';
    var changed = view !== current; current = view;
    views.forEach(function(v){ v.hidden = v.dataset.view !== view; });
    if(view !== 'main'){ window.scrollTo(0, 0); var t = document.getElementById(view + '-t1'); if(changed && t) t.click(); return; }
    var target = h ? document.getElementById(h) : null;
    if(target){ target.scrollIntoView({behavior: (changed || reduce) ? 'auto' : 'smooth'}); }
    else if(changed){ window.scrollTo(0, 0); }
  }
  window.addEventListener('hashchange', show);
  show();
  document.querySelectorAll('.menu a[href="#top"]').forEach(function(a){ a.classList.add('on'); });

  var qs = document.querySelectorAll('.g-q button');
  qs.forEach(function(b){ b.addEventListener('click', function(){
    var open = b.getAttribute('aria-expanded') !== 'true';
    qs.forEach(function(x){ x.setAttribute('aria-expanded', 'false'); document.getElementById(x.getAttribute('aria-controls')).hidden = true; });
    b.setAttribute('aria-expanded', open); document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
  }); });

  document.querySelectorAll('[data-apply]').forEach(function(b){ b.addEventListener('click', function(){
    var t = document.getElementById(b.dataset.apply); t.click(); t.focus();
    window.scrollTo({top: 0, behavior: reduce ? 'auto' : 'smooth'});
  }); });

  document.querySelectorAll('[data-jform]').forEach(function(f){
    var ok = f.nextElementSibling, file = f.querySelector('input[type=file]'), drop = f.querySelector('.j-drop'), fname = f.querySelector('.j-fname');
    file.addEventListener('change', function(){
      var x = file.files[0];
      fname.textContent = !x ? '' : x.size > 4 * 1024 * 1024 ? 'This file is larger than 4 MB. Please choose a smaller PDF or DOCX file.' : 'Selected: ' + x.name;
    });
    ['dragenter','dragover'].forEach(function(e){ drop.addEventListener(e, function(ev){ ev.preventDefault(); drop.classList.add('over'); }); });
    ['dragleave','drop'].forEach(function(e){ drop.addEventListener(e, function(ev){ ev.preventDefault(); drop.classList.remove('over'); }); });
    drop.addEventListener('drop', function(ev){ if(ev.dataTransfer && ev.dataTransfer.files.length){ try{ file.files = ev.dataTransfer.files; }catch(e){} file.dispatchEvent(new Event('change')); } });
    f.addEventListener('submit', function(e){
      e.preventDefault(); var first = null;
      f.querySelectorAll('[data-req]').forEach(function(el){
        var fld = el.closest('.j-f'), err = fld.querySelector('.err');
        var bad = el.type === 'checkbox' ? !el.checked : el.type === 'email' ? !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()) : !el.value.trim();
        fld.classList.toggle('bad', bad); err.textContent = bad ? el.dataset.req : '';
        if(bad && !first) first = el;
      });
      if(first){ first.focus(); return; }
      f.hidden = true; ok.hidden = false; ok.focus();
    });
    ok.querySelector('[data-again]').addEventListener('click', function(){ f.reset(); fname.textContent = ''; f.querySelectorAll('.j-f').forEach(function(x){ x.classList.remove('bad'); }); f.hidden = false; ok.hidden = true; });
  });

  if(!reduce && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('g-in'); io.unobserve(en.target); } }); }, {rootMargin: '0px 0px -8% 0px'});
    document.querySelectorAll('.g-card, .g-step, .g-role, .g-q').forEach(function(el){ io.observe(el); });
  }
})();
