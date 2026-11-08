var r=document.documentElement,b=document.getElementById('mode'),saved=null;
try{saved=localStorage.getItem('theme')}catch(e){}
function dark(){return r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches}
function sync(){b.textContent=dark()?'☀':'☾'}
if(saved)r.dataset.theme=saved;sync();
b.onclick=function(){var t=dark()?'light':'dark';r.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}sync()};
document.querySelectorAll('[data-m]').forEach(function(x){x.onclick=function(){x.closest('.win').classList.toggle('min')}});
function t(){document.getElementById('clock').textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}t();setInterval(t,30000);

var md=document.getElementById('modal'),s1=document.getElementById('s1'),s2=document.getElementById('s2'),last=null;
function openM(){last=document.activeElement;s1.hidden=false;s2.hidden=true;md.classList.add('open');document.getElementById('yes').focus()}
function closeM(){md.classList.remove('open');if(last)last.focus()}
function rain(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;for(var i=0;i<28;i++){var h=document.createElement('span');h.className='rain';h.textContent=['♥','✦','♡'][i%3];h.style.left=Math.random()*100+'vw';h.style.animationDelay=Math.random()*.8+'s';document.body.appendChild(h);setTimeout(function(e){e.remove()},3500,h)}}
document.getElementById('logout').onclick=openM;
document.getElementById('yes').onclick=function(){s1.hidden=true;s2.hidden=false;document.getElementById('ok').focus()};
document.getElementById('ok').onclick=function(){closeM();rain()};
md.querySelectorAll('[data-x]').forEach(function(x){x.onclick=closeM});
md.addEventListener('click',function(e){if(e.target===md)closeM()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&md.classList.contains('open'))closeM()});

(function(){
var el=document.getElementById('vn-text');if(!el)return;
var full=el.textContent,timer=null,rm=matchMedia('(prefers-reduced-motion: reduce)').matches,t=document.getElementById('toast');
el.style.display='block';el.style.minHeight=el.offsetHeight+'px';
function toast(m){t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove('on')},1800)}
function skip(){clearInterval(timer);el.textContent=full}
window.vnSay=function(s){full=s;el.style.minHeight='';type()};
function type(){if(rm){skip();return}clearInterval(timer);var i=0;el.textContent='';timer=setInterval(function(){i++;el.textContent=full.slice(0,i);if(i>=full.length)clearInterval(timer)},34)}
if('IntersectionObserver' in window&&!rm){el.textContent='';var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){type();io.disconnect()}},{threshold:.5});io.observe(el)}
document.querySelectorAll('.vn .bar button').forEach(function(b){b.onclick=function(){var a=b.dataset.a;if(a==='skip')skip();else if(a==='auto')type();else if(a==='theme')document.getElementById('mode').click();else toast(b.dataset.m)}});
})();

(function(){
var tabs=[].slice.call(document.querySelectorAll('.tabs [role=tab]')),title=document.querySelector('#about .tb .t');
function sel(t){tabs.forEach(function(b){var on=b===t;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;var p=document.getElementById(b.getAttribute('aria-controls'));p.classList.toggle('off',!on);p.setAttribute('aria-hidden',!on)});if(title)title.textContent='♥ hoppr.exe — '+({'tab-about':'about_the_rabbit.txt','tab-burrow':'welcome_to_the_burrow.txt','tab-profile':'profile.txt'}[t.id]||'')}
tabs.forEach(function(b,i){b.onclick=function(){sel(b)};b.onkeydown=function(e){var n=null;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=tabs[(i+1)%tabs.length];if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=tabs[(i+tabs.length-1)%tabs.length];if(n){e.preventDefault();sel(n);n.focus()}}});
var fw=document.getElementById('fw'),op=document.getElementById('fwopen'),dni=document.getElementById('fw-dni'),rules=document.getElementById('fw-rules'),back=null;
var front=null,zc=5;
if(!fw||!op)return;
function top(){if(front&&!front.hidden)return front;return !dni.hidden?dni:(!rules.hidden?rules:null)}
function focusTop(){var t=top();if(t){var b=t.querySelector('.pri');if(b)b.focus()}}
function openFw(){back=document.activeElement;[dni,rules].forEach(function(w){w.hidden=false;w.style.left=w.style.top=w.style.transform=w.style.zIndex=''});front=dni;fw.classList.add('open');focusTop()}
function closeOne(w){w.hidden=true;if(front===w)front=null;if(!top()){fw.classList.remove('open');if(back)back.focus()}else focusTop()}
function raise(w){front=w;w.style.zIndex=++zc}
[dni,rules].forEach(function(w){
 w.addEventListener('pointerdown',function(){if(front!==w)raise(w)});
 var tb=w.querySelector('.tb'),sx,sy,ox,oy,on=false;
 tb.addEventListener('pointerdown',function(e){if(e.target.closest('button'))return;var r=w.getBoundingClientRect();w.style.transform='none';w.style.left=r.left+'px';w.style.top=r.top+'px';ox=r.left;oy=r.top;sx=e.clientX;sy=e.clientY;on=true;tb.setPointerCapture(e.pointerId)});
 tb.addEventListener('pointermove',function(e){if(!on)return;var r=w.getBoundingClientRect();w.style.left=Math.min(Math.max(80-r.width,ox+e.clientX-sx),innerWidth-80)+'px';w.style.top=Math.min(Math.max(0,oy+e.clientY-sy),innerHeight-44)+'px'});
 tb.addEventListener('pointerup',function(){on=false});tb.addEventListener('pointercancel',function(){on=false});
});
op.onclick=openFw;
fw.querySelectorAll('[data-fwx]').forEach(function(b){b.onclick=function(){closeOne(b.dataset.fwx==='dni'?dni:rules)}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&fw.classList.contains('open')){var t=top();if(t)closeOne(t)}});
})();

(function(){
var radios=document.querySelectorAll('.eq input'),t=document.getElementById('toast');
if(!radios.length)return;
radios.forEach(function(i){i.onchange=function(){
 document.getElementById('eqt').textContent=i.value;var eb=document.getElementById('eqb');if(eb)eb.textContent=i.value;
 document.querySelectorAll('.eq label').forEach(function(l){l.classList.remove('on');var g=l.querySelector('.tag');if(g)g.remove()});
 var l=i.closest('label');l.classList.add('on');
 if(t){t.textContent='title equipped: '+i.value;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('on')},1800)}
}});
})();

(function(){
var grid=document.getElementById('pgrid');if(!grid)return;
var btns=[].slice.call(grid.querySelectorAll('.pf')),sec=document.getElementById('pf-secret'),cnt=document.getElementById('pcount'),toastEl=document.getElementById('toast'),read={},KEY='hoppr_profile_read';
var others=btns.filter(function(b){return b!==sec});
try{var s=JSON.parse(localStorage.getItem(KEY)||'{}');if(s&&typeof s==='object')read=s}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(read))}catch(e){}}
function n(){return others.filter(function(b){return read[b.dataset.id]}).length}
function unlocked(){return n()===others.length}
function paint(){others.forEach(function(b){b.classList.toggle('read',!!read[b.dataset.id])});
 var u=unlocked();sec.classList.toggle('lock',!u);sec.setAttribute('aria-disabled',!u);sec.classList.toggle('read',!!read.secret&&u);
 sec.querySelector('b').textContent=u?sec.dataset.open:sec.dataset.closed;sec.querySelector('.lk').textContent=u?'🔓':'🔒';
 cnt.textContent=u?'11/11 read — secret unlocked':n()+'/11 read'}
function toast(m){if(!toastEl)return;toastEl.textContent=m;toastEl.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(function(){toastEl.classList.remove('on')},2000)}
btns.forEach(function(b){b.onclick=function(){
 var isSec=b===sec;
 if(isSec&&!unlocked()){window.vnSay&&window.vnSay('Not yet. Read everything first.');b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');btns.forEach(function(x){x.classList.remove('sel')});b.classList.add('sel');return}
 var was=unlocked();
 btns.forEach(function(x){x.classList.remove('sel')});b.classList.add('sel');
 read[b.dataset.id]=1;save();paint();
 if(window.vnSay)window.vnSay(b.querySelector('.ln').textContent);
 if(!was&&unlocked()){sec.classList.add('unlocked');toast('secret unlocked ♡')}
}});
paint();
})();
