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
