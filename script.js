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
function type(){if(rm){skip();return}clearInterval(timer);var i=0;el.textContent='';timer=setInterval(function(){i++;el.textContent=full.slice(0,i);if(i>=full.length)clearInterval(timer)},34)}
if('IntersectionObserver' in window&&!rm){el.textContent='';var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){type();io.disconnect()}},{threshold:.5});io.observe(el)}
document.querySelectorAll('.vn .bar button').forEach(function(b){b.onclick=function(){var a=b.dataset.a;if(a==='skip')skip();else if(a==='auto')type();else if(a==='theme')document.getElementById('mode').click();else toast(b.dataset.m)}});
})();
