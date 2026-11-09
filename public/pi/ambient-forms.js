/* Paramount Intelligence — section particle forms (P1–P5), moment.com-style.
   Every section owns its own 3D point-cloud form, anchored in the section (it scrolls away with the section;
   it does NOT follow the scroll or the cursor). Each form is always in motion (rippling, twisting, flowing) and
   every ~10 s morphs into another version of its shape family. The cursor only nudges the dots it touches:
   they scatter a little and drift back. Colours: white/light-blue on dark sections, royal/navy on light ones.
   Drawn on a canvas BEHIND each section's content. */
(function (global) {
  'use strict';
  var DEFAULTS = { n: 34000, alphaD: 0.4, alphaL: 0.23, size: 1.6, tilt: 0.38, family: [24, 1, 3, 26, 17, 5, 27] };
  var current = null;
  function mount(family, opts) {
  if (current) current();
  var V = {}; Object.keys(DEFAULTS).forEach(function (k) { V[k] = DEFAULTS[k]; });
  if (global.PI_CLOUD) Object.keys(global.PI_CLOUD).forEach(function (k) { V[k] = global.PI_CLOUD[k]; });
  if (opts) Object.keys(opts).forEach(function (k) { V[k] = opts[k]; });
  if (family && family.length) V.family = family;
  var dead = false, rafId = 0, offs = [], timers = [], ro = null;
  function on(t, ev, fn, o) { t.addEventListener(ev, fn, o); offs.push(function () { t.removeEventListener(ev, fn, o); }); }
  function noop() {}
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DPR = Math.min(window.devicePixelRatio || 1, 1.75);
  var VW = innerWidth, VH = innerHeight, T = 0;
  var gc = document.createElement('canvas');
  var GLOPT = { premultipliedAlpha: true, alpha: true, antialias: false, preserveDrawingBuffer: true, powerPreference: 'low-power' };
  var gl = gc.getContext('webgl', GLOPT) || gc.getContext('experimental-webgl', GLOPT);
  if (!gl) return noop;
  // cursor trail samples: two uniform arrays of NT entries, kept well inside the WebGL minimum of 128 vertex uniform vectors
  var NT = Math.max(8, Math.min(40, Math.floor(((gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS) || 128) - 32) / 2)));

  var VS = [
    'precision highp float;',
    'attribute vec4 a;',
    'uniform float uT,uMix,uShA,uShB,uScale,uStar,uAlpha,uSize,uDPR,uSeed,uSpin,uTilt,uDR;',
    'uniform vec2 uRes,uCenter;uniform vec4 uSec;uniform vec3 uTr[' + NT + '];uniform vec2 uTv[' + NT + '];',
    'uniform vec3 uColF,uColB;',
    'varying vec4 vC;',
    'const float PI=3.14159265,TAU=6.2831853;',
    'vec3 tk(float p,float q,float s){float r=cos(q*s)+2.2;return vec3(r*cos(p*s),r*sin(p*s),-sin(q*s))*0.3;}',
    'vec3 curve(float id,float s){',
    '  if(id<0.5) return vec3(sin(s)+2.0*sin(2.0*s),cos(s)-2.0*cos(2.0*s),-sin(3.0*s))*0.3;',
    '  if(id<1.5){float d=1.0+sin(s)*sin(s);return vec3(cos(s)/d*1.08,sin(s)*cos(s)/d*1.08,0.24*sin(s));}',
    '  if(id<2.5) return tk(2.0,5.0,s);',
    '  if(id<3.5) return tk(3.0,4.0,s);',
    '  if(id<4.5) return tk(2.0,3.0,s);',
    '  if(id<5.5) return vec3((2.0+cos(2.0*s))*cos(3.0*s),(2.0+cos(2.0*s))*sin(3.0*s),sin(4.0*s))*0.29;',
    '  return tk(3.0,5.0,s);}',
    'vec3 tube(float id,float u,float v,float rad,float flow){float s=fract(u+flow)*TAU;vec3 c=curve(id,s);',
    '  vec3 T=normalize(curve(id,s+0.01)-curve(id,s-0.01));vec3 up=abs(T.z)>0.9?vec3(1.0,0.0,0.0):vec3(0.0,0.0,1.0);',
    '  vec3 N=normalize(cross(T,up));vec3 B=cross(T,N);float an=v*TAU;',
    '  float rr=rad*(1.0+0.22*sin(s*3.0-uT*1.6));return c+rr*(cos(an)*N+sin(an)*B);}',
    'vec3 band(float id,float u,float v,float w,float tw){float s=u*TAU;vec3 c=curve(id,s);',
    '  vec3 T=normalize(curve(id,s+0.01)-curve(id,s-0.01));vec3 up=abs(T.z)>0.9?vec3(1.0,0.0,0.0):vec3(0.0,0.0,1.0);',
    '  vec3 N=normalize(cross(T,up));vec3 B=cross(T,N);float an=s*tw+uT*0.5;return c+(v-0.5)*w*(cos(an)*N+sin(an)*B);}',
    'vec3 sph(float u,float v,float rr){float th=u*TAU,ph=acos(2.0*v-1.0);return rr*vec3(sin(ph)*cos(th),cos(ph),sin(ph)*sin(th));}',
    'vec3 shape(float id,float u,float v,float r){',
    '  float U=u*TAU,W=v*TAU,t=uT;',
    '  if(id<0.5){float R=0.55+0.24*cos(2.0*U+0.3*sin(t*0.7)),q=0.27+0.08*sin(2.0*U-t*0.9);return vec3((R+q*cos(W))*cos(U),(R+q*cos(W))*sin(U)*0.9,q*sin(W));}',
    '  if(id<1.5) return tube(0.0,u,v,0.16,t*0.01);',
    '  if(id<2.5){float th=U,ph=acos(2.0*v-1.0);return sph(u,v,0.85*(1.0+0.13*sin(3.0*th+t*0.9)*sin(2.0*ph+t*0.6)));}',
    '  if(id<3.5) return tube(1.0,u,v,0.22,t*0.01);',
    '  if(id<4.5){float R=0.72,w=(v-0.5)*0.85,an=U*1.5+t*0.4;return vec3((R+w*cos(an))*cos(U),(R+w*cos(an))*sin(U),w*sin(an));}',
    '  if(id<5.5){float x=(u-0.5)*2.2,rad=0.3+0.17*cos(x*2.2+t*0.6),an=W+x*0.8;vec3 p=vec3(x,rad*cos(an)*(1.0+0.25*sin(t*0.5)),rad*sin(an));p.y+=0.22*sin(x*1.4+t*0.4);return p;}',
    '  if(id<6.5){float x=(u-0.5)*2.3,w=(v-0.5)*(0.25+0.6*abs(sin(3.1416*u*1.2+t*0.25))),an=x*1.5+t*0.3;return vec3(x,w*cos(an),w*sin(an)+0.2*sin(2.0*x+t*0.4));}',
    '  if(id<7.5){float R=0.42,q=0.56*(1.0+0.07*sin(2.0*U+t));return vec3((R+q*cos(W))*cos(U),q*sin(W),(R+q*cos(W))*sin(U));}',
    '  if(id<8.5){float th=U,ph=acos(2.0*v-1.0),sp=sin(ph);float rr=0.62+0.3*cos(2.0*th)*sp*sp+0.05*sin(t+3.0*th);return rr*vec3(sp*cos(th),cos(ph)*0.85,sp*sin(th));}',
    '  if(id<9.5){float R=0.74,w=(v-0.5)*0.95,an=U*0.5+t*0.3;return vec3((R+w*cos(an))*cos(U),(R+w*cos(an))*sin(U)*0.85,w*sin(an));}',
    '  if(id<10.5){float y=(u-0.5)*1.9,w=(v-0.5)*0.8,an=2.4*y+t*0.5;return vec3(0.4*sin(1.8*y+t*0.35)+w*cos(an),y,w*sin(an));}',
    '  if(id<11.5){float p=sqrt(v)*1.15,x=p*cos(U),z=p*sin(U);return vec3(x,0.42*(x*x-z*z)+0.07*sin(5.0*x+t),z);}',
    '  if(id<12.5){float q=u,x=(q-0.5)*2.2;vec3 c=vec3(x,0.35*sin(q*6.283+t*0.3),0.25*cos(q*4.7));float rad=0.08+0.16*sin(3.1416*q)*(1.0+0.2*sin(t+q*6.0));return c+rad*vec3(0.0,cos(W),sin(W));}',
    '  if(id<13.5){float q=u,an=q*15.7+t*0.3,y=(q-0.5)*1.7;vec3 c=vec3(0.5*cos(an),y,0.5*sin(an));vec3 n=vec3(cos(an),0.0,sin(an));return c+0.1*(cos(W)*n+sin(W)*vec3(0.0,1.0,0.0));}',
    '  if(id<14.5) return tube(2.0,u,v,0.11,t*0.02);',
    '  if(id<15.5) return tube(3.0,u,v,0.1,t*0.02);',
    '  if(id<16.5) return tube(5.0,u,v,0.11,t*0.02);',
    '  if(id<17.5){float R=0.66,an=2.0*U+t*0.5,ca=cos(W)*0.36,sb=sin(W)*0.13,cr=ca*cos(an)-sb*sin(an),cz=ca*sin(an)+sb*cos(an);return vec3((R+cr)*cos(U),(R+cr)*sin(U),cz);}',
    '  if(id<18.5){float q=u,x=q*1.9-0.95;float rad=0.07+0.5*q*q;vec3 c=vec3(x,0.38*sin(q*2.6+t*0.3)-0.15,0.0);return c+rad*vec3(0.25*sin(W),cos(W),sin(W));}',
    '  if(id<19.5){float th=U,ph=acos(2.0*v-1.0);return sph(u,v,0.85*(1.0+0.16*sin(4.0*th+t)*sin(3.0*ph-t*0.8)+0.05*sin(t*1.3)));}',
    '  if(id<20.5){float side=step(0.5,v)*2.0-1.0;vec3 p=sph(u,fract(v*2.0),0.55);return p+vec3(side*(0.36+0.12*sin(t*0.6)),0.0,0.0);}',
    '  if(id<21.5){if(r<0.72)return sph(u,v,0.6*(1.0+0.06*sin(5.0*U+t)));float k=(r-0.72)/0.28;float rr=0.3*(1.0-k)*(0.5+0.5*sin(U*3.0+k*8.0+t*1.5));return vec3(rr*cos(U),-0.45-k*1.3,rr*sin(U));}',
    '  if(id<22.5){if(r<0.42)return sph(u,v,0.36*(1.0+0.1*sin(t*1.4)));return sph(u,v,1.05+0.05*sin(6.0*U+t));}',
    '  if(id<23.5){float R=0.42,q=0.56*(1.0+0.08*sin(2.0*U+t));return vec3((R+q*cos(W))*cos(U),q*sin(W),(R+q*cos(W))*sin(U));}',
    '  if(id<24.5){float sd=step(0.5,v),vv=fract(v*2.0)*TAU,R=0.6,q=0.28+0.05*sin(U*2.0+t);vec3 p=vec3((R+q*cos(vv))*cos(U),(R+q*cos(vv))*sin(U),q*sin(vv));float a2=(sd*2.0-1.0)*0.75+0.15*sin(t*0.4);float c2=cos(a2),s2=sin(a2);return vec3(p.x,c2*p.y-s2*p.z,s2*p.y+c2*p.z)*1.1;}',
    '  if(id<25.5){float p=sqrt(v)*1.0,an=U;float y=0.38*sin(2.0*an+t*0.3)*p*p+0.05*sin(5.0*p-t);return vec3(p*cos(an),y,p*sin(an));}',
    '  if(id<26.5){float R=0.62,an=1.5*U+t*0.3,ca=cos(W)*0.4,sb=sin(W)*0.11,cr=ca*cos(an)-sb*sin(an),cz=ca*sin(an)+sb*cos(an);return vec3((R+cr)*cos(U),(R+cr)*sin(U),cz);}',
    '  if(id<27.5) return band(1.0,u,v,0.62,1.0);',
    '  if(id<28.5){float an=(u-0.5)*2.6;vec3 c=vec3(sin(an)*0.75,-cos(an)*0.55+0.25,0.18*sin(2.0*an+t*0.5));vec3 T=normalize(vec3(cos(an)*0.75,sin(an)*0.55,0.36*cos(2.0*an+t*0.5)));vec3 N=normalize(cross(T,vec3(0.0,0.0,1.0)));vec3 B=cross(T,N);float rr=0.3*(1.0+0.15*sin(3.0*an-t));return c+rr*(cos(W)*N+sin(W)*B);}',
    '  return vec3(0.0);}',
    'void main(){',
    '  float u=a.x,v=a.y,r=a.z;',
    '  if(uStar>0.5){vec2 p=uSec.xy+vec2(u,v)*uSec.zw;gl_Position=vec4(p/uRes*2.0-1.0,0.0,1.0);gl_Position.y=-gl_Position.y;',
    '    float tw=0.4+0.6*sin(uT*1.1+r*70.0);gl_PointSize=uDPR*(0.8+r);vC=vec4(uColF,uAlpha*0.35*tw);return;}',
    '  vec3 pA=shape(uShA,u,v,r),pB=shape(uShB,u,v,r);',
    '  float m=smoothstep(0.0,1.0,clamp(uMix*1.35-r*0.35,0.0,1.0));',
    '  vec3 p=mix(pA,pB,m);',
    /* living motion: slow breathing twist + per-dot shimmer */
    '  float tw=p.y*0.35*sin(uT*0.33+uSeed);float ct=cos(tw),stw=sin(tw);p=vec3(ct*p.x+stw*p.z,p.y,-stw*p.x+ct*p.z);',
    '  p+=0.014*vec3(sin(uT*1.1+r*91.0),cos(uT*0.9+r*57.0),sin(uT*1.3+r*23.0));',
    '  float ay=uT*uSpin+uSeed,ca=cos(ay),sa=sin(ay);p=vec3(ca*p.x+sa*p.z,p.y,-sa*p.x+ca*p.z);',
    '  float cx=cos(uTilt),sx=sin(uTilt);p=vec3(p.x,cx*p.y-sx*p.z,sx*p.y+cx*p.z);',
    '  float persp=3.4/(3.4-p.z);',
    '  vec2 s=uCenter+vec2(p.x,-p.y)*uScale*persp;',
    /* cursor: dots it touches get nudged and scatter a little, then drift back as the trail fades.
       uTv carries each trail point's swipe direction scaled by its speed: a fast swipe also sweeps the dots along with it (a wake). */
    '  float inf=0.0;vec2 pv=vec2(0.0);for(int i=0;i<' + NT + ';i++){vec3 q=uTr[i];if(q.z<=0.0)continue;float L=length(s-q.xy);if(L<uDR){float f=smoothstep(0.0,1.0,1.0-L/uDR)*q.z;inf+=f;pv+=f*uTv[i];}}',
    '  inf=min(inf,1.3);float pl=length(pv);if(pl>1.0)pv/=pl;',
    '  vec3 hh=vec3(sin(r*91.7+uT*1.9+u*13.0),cos(r*53.3+uT*1.6+v*11.0),sin(r*37.1-uT*2.1));',
    '  s+=hh.xy*inf*(4.0+17.0*fract(r*7.13))*(uScale/100.0)+pv*uDR*(0.2+0.4*fract(r*3.71));',
    '  gl_Position=vec4(s/uRes*2.0-1.0,0.0,1.0);gl_Position.y=-gl_Position.y;',
    '  float dep=clamp((p.z+1.3)/2.6,0.0,1.0);',
    '  gl_PointSize=uDPR*uSize*(0.7+0.7*dep)*(1.0+0.15*inf);',
    '  vC=vec4(mix(uColB,uColF,dep),uAlpha*(0.3+0.7*dep)*(1.0+0.25*inf));}'
  ].join('\n');
  var FS = 'precision mediump float;varying vec4 vC;void main(){vec2 c=gl_PointCoord-0.5;float d=dot(c,c);if(d>0.25)discard;float a=vC.a*(1.0-d*3.2);gl_FragColor=vec4(vC.rgb*a,a);}';
  function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s; }
  var prog, U, aLoc, pbuf, sbuf, lost = false;
  var N = Math.round((V.n || 22000) * (VW < 700 ? 0.55 : 1)), NS = 120;
  function buf(n) { var d = new Float32Array(n * 4); for (var i = 0; i < n * 4; i++) d[i] = Math.random(); var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, d, gl.STATIC_DRAW); return b; }
  function setup() {
    prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(prog)); return false; }
    gl.useProgram(prog);
    U = {}; ['uT', 'uMix', 'uShA', 'uShB', 'uScale', 'uStar', 'uAlpha', 'uSize', 'uDPR', 'uSeed', 'uSpin', 'uTilt', 'uDR', 'uRes', 'uCenter', 'uSec', 'uTr', 'uTv', 'uColF', 'uColB']
      .forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
    aLoc = gl.getAttribLocation(prog, 'a');
    pbuf = buf(N); sbuf = buf(NS);
    gl.enableVertexAttribArray(aLoc);
    return true;
  }
  if (!setup()) return noop;
  // if the browser drops the GPU context, keep the last frame on screen and rebuild as soon as it is restored
  on(gc, 'webglcontextlost', function (e) { e.preventDefault(); lost = true; }, false);
  on(gc, 'webglcontextrestored', function () { if (!dead) lost = !setup(); }, false);
  function hexv(h) { h = h.replace('#', ''); return [parseInt(h.substr(0, 2), 16) / 255, parseInt(h.substr(2, 2), 16) / 255, parseInt(h.substr(4, 2), 16) / 255]; }
  var COL = { d: [hexv('#ffffff'), hexv('#7da2ff')], l: [hexv('#204ecf'), hexv('#0f256e')] };

  /* cursor trail (viewport px). Points are laid along the cursor's path every STEP px whatever the speed, so a fast
     swipe disturbs the dots as much as a slow hover; faster movement also adds a push in the swipe direction. */
  var trail = [], live = 0, px = -9999, py = -9999, pon = false;
  var STEP = 30, ax = 0, ay = 0, aon = false, lx = 0, ly = 0, vx = 0, vy = 0;
  on(window, 'pointermove', function (e) { px = e.clientX; py = e.clientY; pon = true; }, { passive: true });
  on(document, 'mouseout', function (e) { if (!e.relatedTarget) pon = false; });
  on(window, 'blur', function () { pon = false; });

  /* layers: each section gets its own form */
  function lum(c) { var m = (c || '').match(/[\d.]+/g); if (!m || m.length < 3) return null; if (m.length > 3 && +m[3] < 0.5) return null; return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255; }
  function isDark(s) {
    if (/\b(hero|close|pi-char)\b/.test(s.className)) return true;
    var cs = getComputedStyle(s), l = lum(cs.backgroundColor);
    if (l == null) return /gradient/.test(cs.backgroundImage) && !/\bband\b/.test(s.className);
    return l < 0.45;
  }
  var st = document.createElement('style'); st.setAttribute('data-pi-ambient', '');
  st.textContent = 'canvas.pi-bg{position:absolute!important;left:0!important;top:0!important;right:auto!important;bottom:auto!important;width:100%!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;pointer-events:none!important;display:block!important;opacity:1!important;filter:none!important;z-index:-1}.pi-bg-off canvas.pi-bg{display:none!important}';
  document.head.appendChild(st);
  var layers = [], FAM = V.family, HOLD = 7.5, MORPH = 3.6;
  function isCover(k, s) { var cs = getComputedStyle(k); return cs.position === 'absolute' && k.offsetWidth >= s.offsetWidth * 0.95 && k.offsetHeight >= s.offsetHeight * 0.9; }
  var hosts = [].slice.call(document.querySelectorAll('section')).filter(function (s) {
    return !(s.parentElement && s.parentElement.closest('section,header,nav,footer,dialog,[hidden]')) && getComputedStyle(s).display !== 'none';
  });
  hosts = hosts.filter(function (h) { return !h.querySelector('form,textarea,select,input:not([type=hidden])'); });
  hosts.forEach(function (s) {
    var prevPos = s.style.position, prevIso = s.style.isolation;
    if (getComputedStyle(s).position === 'static') s.style.position = 'relative';
    s.style.isolation = 'isolate';
    var cv = document.createElement('canvas'); cv.className = 'pi-bg'; cv.setAttribute('aria-hidden', 'true');
    cv.width = 0; cv.height = 0; cv.style.setProperty('height', '0px', 'important');
    // sections with a full-cover background layer (image/video): sit just above it, below the positioned content
    var kids = [].slice.call(s.children), cover = null;
    kids.forEach(function (k) { if (isCover(k, s)) cover = k; });
    if (cover) {
      var cz = parseInt(getComputedStyle(cover).zIndex, 10) || 0;
      var ok = kids.every(function (k) { if (isCover(k, s)) return true; var cs = getComputedStyle(k); return cs.position !== 'static' && (parseInt(cs.zIndex, 10) || 0) > cz; });
      if (ok) { cover.parentNode.insertBefore(cv, cover.nextSibling); cv.style.setProperty('z-index', String(cz), 'important'); } else s.insertBefore(cv, s.firstChild);
    } else s.insertBefore(cv, s.firstChild);
    var k = layers.length;
    layers.push({ prevPos: prevPos, prevIso: prevIso, el: s, cv: cv, ctx: cv.getContext('2d'), dark: isDark(s), w: 0, h: 0, foot: s.tagName === 'FOOTER',
      si: (k * 2) % FAM.length, hold: Math.random() * HOLD * 0.8, mix: 0, seed: k * 1.7 + Math.random(), spin: (k % 2 ? -1 : 1) * (0.1 + Math.random() * 0.05) });
  });

  /* place each form in the emptiest part of its section (away from text, cards, panels) */
  var CSEL = 'h1,h2,h3,h4,h5,p,li,blockquote,img,svg,figure,table,form,button,a,label,input,[class*="card"],[class*="panel"],[class*="box"],[class*="tile"],[class*="chip"]';
  function baseScale() { return Math.max(150, Math.min(VW * 0.27, VH * 0.48, 400)); }
  function opaque(e) {
    if (/^(IMG|SVG|BUTTON|INPUT|TABLE|FIGURE|svg)$/.test(e.tagName)) return true;
    var m = (getComputedStyle(e).backgroundColor || '').match(/[\d.]+/g); return !!(m && (m.length < 4 || +m[3] > 0.5));
  }
  function place(L) {
    var r = L.el.getBoundingClientRect(); if (!r.height) return;
    var S0 = Math.min(baseScale(), r.height * 0.62), rects = [];
    L.el.querySelectorAll(CSEL).forEach(function (e) {
      if (e.closest('.pi-ctl')) return; var b = e.getBoundingClientRect(); if (!b.width || !b.height) return;
      if (b.width > r.width * 0.9 && b.height > r.height * 0.75) return;
      rects.push([b.left - r.left, b.top - r.top, b.right - r.left, b.bottom - r.top, opaque(e) ? 1 : 0.22]);
    });
    var best = null, bc = 1e9;
    var sizes = [1];
    for (var si = 0; si < sizes.length; si++) {
      var sc = S0 * sizes[si], R = sc * 1.2, ys = [];
      if (r.height <= 2 * R + 20) ys = [r.height / 2]; else { var stp = Math.max(24, (r.height - 2 * R) / 14); for (var y = R + 10; y <= r.height - R - 10 + 0.1; y += stp) ys.push(y); }
      for (var x = R + 8; x <= r.width - R - 8; x += Math.max(20, r.width / 48)) {
        for (var k = 0; k < ys.length; k++) {
          var y2 = ys[k], ov = 0;
          for (var n = 0; n < rects.length; n++) { var q = rects[n]; var ix = Math.min(x + R, q[2]) - Math.max(x - R, q[0]), iy = Math.min(y2 + R, q[3]) - Math.max(y2 - R, q[1]); if (ix > 0 && iy > 0) ov += ix * iy * q[4]; }
          var cost = ov / (4 * R * R) + Math.abs(x - r.width / 2) / r.width * 0.45 + Math.abs(y2 - r.height / 2) / r.height * 0.12;   // keep clear of cards, stay near the centre
          if (cost < bc) { bc = cost; best = [x, y2, sc]; }
        }
      }
      
    }
    if (!best) best = [r.width / 2, r.height / 2, S0];
    L.cx = best[0]; L.cy = best[1]; L.sc = best[2];
    var hit = 0, tot = 0;
    for (var gx = 0.05; gx < 1; gx += 0.1) for (var gy = 0.05; gy < 1; gy += 0.1) {
      var px2 = gx * r.width, py2 = gy * r.height; tot++;
      for (var m = 0; m < rects.length; m++) { var q2 = rects[m]; if (q2[4] === 1 && px2 >= q2[0] && px2 <= q2[2] && py2 >= q2[1] && py2 <= q2[3]) { hit++; break; } }
    }
    L.busy = hit / tot; L.cost = bc;
  }
  function placeAll() {
    layers.forEach(place);
    // keep forms only where they add something: the first section, then the most open sections, never two in a row
    layers.forEach(function (L, i) { var r = L.el.getBoundingClientRect(); L.skip = true; L.ok = i === 0 || (r.height >= 320 && L.busy <= 0.35 && L.cost <= 0.45); });
    var order = layers.map(function (L, i) { return i; }).filter(function (i) { return layers[i].ok; })
      .sort(function (a, b) { return (a === 0 ? -1 : b === 0 ? 1 : layers[a].cost - layers[b].cost); });
    order.forEach(function (i) {
      var L = layers[i], p = L.el.previousElementSibling, nx = L.el.nextElementSibling;
      var clash = layers.some(function (M) { return !M.skip && (M.el === p || M.el === nx); });
      if (!clash) L.skip = false;
    });
  }
  if (window.ResizeObserver) { ro = new ResizeObserver(function () { clearTimeout(ro.t); ro.t = setTimeout(function () { if (!dead) placeAll(); }, 200); }); layers.forEach(function (L) { ro.observe(L.el); }); }
  placeAll(); timers.push(setTimeout(function () { if (!dead) placeAll(); }, 400)); on(window, 'load', placeAll);
  var last = performance.now(), off = false;
  window.PI_BG = { L: layers, toggle: function () { off = !off; document.documentElement.classList.toggle('pi-bg-off', off); return !off; } };
  on(window, 'resize', function () { VW = innerWidth; VH = innerHeight; layers.forEach(function (L) { L.w = 0; L.dark = isDark(L.el); }); placeAll(); });
  var trArr = new Float32Array(NT * 3), tvArr = new Float32Array(NT * 2);
  function frame(now) {
    if (dead) return;
    rafId = requestAnimationFrame(frame);
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (document.hidden || off || lost || gl.isContextLost()) return;
    if (reduce) dt = 0; T += dt;
    // cursor: slot 0 is the live cursor (keeps the cloud stirred while you hover); the rest is a fading trail
    live += ((pon && !reduce ? 1 : 0) - live) * Math.min(1, dt * (pon ? 4 : 1.1));
    var sk = 0, sdx = 0, sdy = 0;   // smoothed cursor speed (0..1) and direction
    if (pon && !reduce && dt > 0) {
      if (!aon) { ax = lx = px; ay = ly = py; vx = vy = 0; aon = true; }   // (re)entering: start the path here
      var ivx = (px - lx) / dt, ivy = (py - ly) / dt, kk = Math.min(1, dt * 12); lx = px; ly = py;
      vx += (ivx - vx) * kk; vy += (ivy - vy) * kk;
      var sv = Math.hypot(vx, vy); sk = Math.max(0, Math.min(1, (sv - 250) / 2250));
      if (sv > 1) { sdx = vx / sv; sdy = vy / sv; }
      var dx = px - ax, dy = py - ay, d = Math.hypot(dx, dy);
      if (d > STEP * (NT - 1)) { ax = px - dx / d * STEP * (NT - 1); ay = py - dy / d * STEP * (NT - 1); dx = px - ax; dy = py - ay; d = Math.hypot(dx, dy); }
      while (d >= STEP) {
        ax += dx / d * STEP; ay += dy / d * STEP;
        trail.push({ x: ax, y: ay, s: 1, w: 1 + 0.5 * sk, vx: sdx * sk, vy: sdy * sk }); if (trail.length > NT - 1) trail.shift();
        dx = px - ax; dy = py - ay; d = Math.hypot(dx, dy);
      }
    } else if (!pon) aon = false;
    for (var i = 0; i < trail.length; i++) trail[i].s -= dt / 2.6;
    while (trail.length && trail[0].s <= 0) trail.shift();
    trArr[0] = px; trArr[1] = py; trArr[2] = live; tvArr[0] = sdx * sk; tvArr[1] = sdy * sk;
    for (i = 1; i < NT; i++) {
      var q = trail[i - 1];
      trArr[i * 3] = q ? q.x : -9999; trArr[i * 3 + 1] = q ? q.y : -9999; trArr[i * 3 + 2] = q ? Math.pow(Math.max(0, q.s), 1.5) * 0.9 * q.w : 0;
      tvArr[i * 2] = q ? q.vx : 0; tvArr[i * 2 + 1] = q ? q.vy : 0;
    }
    var W = Math.round(VW * DPR), H = Math.round(VH * DPR);
    if (gc.width !== W || gc.height !== H) { gc.width = W; gc.height = H; }
    gl.viewport(0, 0, W, H);
    gl.uniform1f(U.uT, T); gl.uniform1f(U.uDPR, DPR); gl.uniform2f(U.uRes, VW, VH); gl.uniform3fv(U.uTr, trArr); gl.uniform2fv(U.uTv, tvArr);
    gl.uniform1f(U.uSize, V.size || 1.7); gl.uniform1f(U.uTilt, V.tilt != null ? V.tilt : 0.32);
    gl.enable(gl.BLEND);
    for (var n = 0; n < layers.length; n++) {
      var L = layers[n];
      // each form keeps its own timeline, even off-screen
      L.hold += dt;
      if (L.hold > HOLD) { L.mix = Math.min(1, (L.hold - HOLD) / MORPH); if (L.mix >= 1) { L.si = (L.si + 1) % FAM.length; L.hold = 0; L.mix = 0; } }
      var r = L.el.getBoundingClientRect();
      if (L.skip || r.bottom <= 0 || r.top >= VH || r.height < 160) { if (L.w) { L.cv.width = 0; L.cv.height = 0; L.cv.style.setProperty('height', '0px', 'important'); L.w = 0; L.h = 0; } continue; }
      var w = Math.round(r.width), ch = Math.min(Math.ceil(r.height), VH);
      if (w !== L.w || ch !== L.h) { L.w = w; L.h = ch; L.cv.width = Math.round(w * DPR); L.cv.height = Math.round(ch * DPR); L.cv.style.setProperty('height', ch + 'px', 'important'); }
      var offY = Math.max(0, Math.min(-r.top, r.height - ch)); L.cv.style.transform = 'translateY(' + offY + 'px)';
      var vtop = r.top + offY;
      // render this section's form, anchored at the section's centre
      var C = L.dark ? COL.d : COL.l;
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      if (L.dark) gl.blendFunc(gl.ONE, gl.ONE); else gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.uniform3fv(U.uColF, C[0]); gl.uniform3fv(U.uColB, C[1]);
      gl.uniform1f(U.uAlpha, L.dark ? (V.alphaD || 0.4) : (V.alphaL || 0.24));
      gl.uniform4f(U.uSec, r.left, r.top, r.width, r.height);
      gl.uniform2f(U.uCenter, r.left + L.cx, r.top + L.cy);
      gl.uniform1f(U.uScale, L.sc); gl.uniform1f(U.uDR, L.sc * 0.3 + 22);
      gl.uniform1f(U.uShA, FAM[L.si]); gl.uniform1f(U.uShB, FAM[(L.si + 1) % FAM.length]); gl.uniform1f(U.uMix, L.mix);
      gl.uniform1f(U.uSeed, L.seed); gl.uniform1f(U.uSpin, L.spin);
      gl.uniform1f(U.uStar, 1); gl.bindBuffer(gl.ARRAY_BUFFER, sbuf); gl.vertexAttribPointer(aLoc, 4, gl.FLOAT, false, 0, 0); gl.drawArrays(gl.POINTS, 0, NS);
      gl.uniform1f(U.uStar, 0); gl.bindBuffer(gl.ARRAY_BUFFER, pbuf); gl.vertexAttribPointer(aLoc, 4, gl.FLOAT, false, 0, 0); gl.drawArrays(gl.POINTS, 0, N);
      var ctx = L.ctx;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, L.cv.width, L.cv.height);
      if (L.dark) ctx.globalCompositeOperation = 'lighter';
      var sx = Math.max(0, r.left * DPR), sy = Math.max(0, vtop * DPR), sh2 = Math.min(ch * DPR, H - sy), sw = Math.min(w * DPR, W - sx);
      if (sh2 > 0 && sw > 0) ctx.drawImage(gc, sx, sy, sw, sh2, 0, 0, sw, sh2);
    }
  }
  rafId = requestAnimationFrame(frame);
  function destroy() {
    if (dead) return; dead = true;
    cancelAnimationFrame(rafId); timers.forEach(clearTimeout); if (ro) { clearTimeout(ro.t); ro.disconnect(); }
    offs.forEach(function (f) { f(); });
    layers.forEach(function (L) { if (L.cv.parentNode) L.cv.parentNode.removeChild(L.cv); L.el.style.position = L.prevPos; L.el.style.isolation = L.prevIso; });
    if (st.parentNode) st.parentNode.removeChild(st);
    try { var ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); } catch (e) {}
    if (global.PI_BG && global.PI_BG.L === layers) delete global.PI_BG;
    if (current === destroy) current = null;
  }
  current = destroy;
  return destroy;
  }
  global.PIAmbient = { mount: mount, unmount: function () { if (current) current(); } };
  // static pages: <script src=".../ambient-forms.js" data-fam="24,1,3"> mounts itself
  var CSCR = document.currentScript, FAMATTR = CSCR && CSCR.getAttribute('data-fam');
  if (FAMATTR) {
    var go = function () { mount(FAMATTR.split(',').map(Number)); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  }
})(window);
