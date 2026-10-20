(function(){ function init(){
  var nav=document.getElementById('pi-prog'); if(!nav) return;
  var items=nav.getAttribute('data-sections').split(',').map(function(s){var p=s.split(':');return {id:p[0].trim(),label:p.slice(1).join(':').trim()};});
  var list=document.getElementById('pp-list'),count=document.getElementById('pp-count'),fill=document.getElementById('pp-fill');
  var head=__header;
  items=items.filter(function(it){return document.getElementById(it.id);});
  list.innerHTML=items.map(function(it,i){return '<li style="display:contents"><a href="#'+it.id+'" data-i="'+i+'"><span class="n">'+String(i+1).padStart(2,'0')+'</span><span class="t">'+it.label+'</span></a></li>';}).join('');
  var links=[].slice.call(list.querySelectorAll('a')),secs=items.map(function(it){return document.getElementById(it.id);});
  function offs(){nav.style.setProperty('--pp-h',(head?head.querySelector('.wrap').offsetHeight:72)+'px'); return (head?head.querySelector('.wrap').offsetHeight:72)+nav.offsetHeight;}
  function setPad(){document.documentElement.style.scrollPaddingTop=(offs()+8)+'px';}
  var last=-1;
  function upd(){var o=offs(),line=o+window.innerHeight*0.25,cur=0;
    secs.forEach(function(s,i){if(s.getBoundingClientRect().top<=line) cur=i;});
    var end=document.documentElement.scrollHeight-window.innerHeight; if(window.scrollY>=end-4) cur=secs.length-1;
    links.forEach(function(a,i){a.classList.toggle('on',i===cur);a.classList.toggle('done',i<cur);if(i===cur)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    count.innerHTML='Section <b>'+(cur+1)+'</b> / '+secs.length;
    var start=secs[0].getBoundingClientRect().top+window.scrollY, stop=Math.max(start+1,end);
    fill.style.width=Math.min(100,Math.max(0,(window.scrollY-start)/(stop-start)*100))+'%';
    if(cur!==last){last=cur;var a=links[cur];if(a){var l=a.offsetLeft-list.offsetLeft,w=a.offsetWidth;if(l<list.scrollLeft||l+w>list.scrollLeft+list.clientWidth)list.scrollLeft=l-list.clientWidth/3;}}
  }
  links.forEach(function(a,i){a.addEventListener('click',function(e){e.preventDefault();var y=secs[i].getBoundingClientRect().top+window.scrollY-offs()+1;window.scrollTo({top:i===0?0:y,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});history.replaceState(null,'','#'+items[i].id);});});
  window.addEventListener('scroll',upd,{passive:true}); window.addEventListener('resize',function(){setPad();upd();});
  setPad(); upd();
 } if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
