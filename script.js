var r=document.documentElement,b=document.getElementById('mode'),saved=null;
try{saved=localStorage.getItem('theme')}catch(e){}
function dark(){return r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches}
function sync(){b.textContent=dark()?'☀':'☾'}
if(saved)r.dataset.theme=saved;sync();
b.onclick=function(){var t=dark()?'light':'dark';r.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}sync()};
document.querySelectorAll('[data-m]').forEach(function(x){x.onclick=function(){x.closest('.win').classList.toggle('min')}});
function t(){document.getElementById('clock').textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}t();setInterval(t,30000);

var md=document.getElementById('modal');
if(md){
var s1=document.getElementById('s1'),s2=document.getElementById('s2'),last=null;
function openM(){last=document.activeElement;s1.hidden=false;s2.hidden=true;md.classList.add('open');document.getElementById('yes').focus()}
function closeM(){md.classList.remove('open');if(last)last.focus()}
function rain(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;for(var i=0;i<28;i++){var h=document.createElement('span');h.className='rain';h.textContent=['♥','✦','♡'][i%3];h.style.left=Math.random()*100+'vw';h.style.animationDelay=Math.random()*.8+'s';document.body.appendChild(h);setTimeout(function(e){e.remove()},3500,h)}}
document.getElementById('logout').onclick=openM;
document.getElementById('yes').onclick=function(){s1.hidden=true;s2.hidden=false;document.getElementById('ok').focus()};
document.getElementById('ok').onclick=function(){closeM();rain()};
md.querySelectorAll('[data-x]').forEach(function(x){x.onclick=closeM});
md.addEventListener('click',function(e){if(e.target===md)closeM()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&md.classList.contains('open'))closeM()});
}

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
 sec.querySelector('.lk').textContent=u?'🔓':'🔒';
 cnt.textContent=u?'11/11 read — secret unlocked':n()+'/11 read'}
function toast(m){if(!toastEl)return;toastEl.textContent=m;toastEl.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(function(){toastEl.classList.remove('on')},2000)}
btns.forEach(function(b){b.onclick=function(){
 var isSec=b===sec;
 if(isSec&&!unlocked()){window.vnSay&&window.vnSay('Not yet. Read everything first.');b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');btns.forEach(function(x){x.classList.remove('sel')});b.classList.add('sel');return}
 var was=unlocked();
 btns.forEach(function(x){x.classList.remove('sel')});b.classList.add('sel');
 read[b.dataset.id]=1;save();paint();
 var lnTxt=b.querySelector('.ln').textContent;if(window.vnSay)window.vnSay(lnTxt);var sr=document.getElementById('vn-sr');if(sr)sr.textContent=b.querySelector('.back b').textContent.replace(/[.!?]+$/,'')+'. '+lnTxt;
 if(!was&&unlocked()){sec.classList.add('unlocked');toast('secret unlocked ♡')}
}});
paint();
})();

(function(){
var root=document.getElementById('blog');if(!root)return;
var $=function(i){return document.getElementById(i)};
var STAR_SVG='<svg class="px" viewBox="0 0 9 8" shape-rendering="crispEdges" fill="currentColor"><path d="M4 0h1v1h-1zM4 1h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM5 2h1v1h-1zM0 3h1v1h-1zM1 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM5 3h1v1h-1zM6 3h1v1h-1zM7 3h1v1h-1zM8 3h1v1h-1zM1 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM5 4h1v1h-1zM6 4h1v1h-1zM7 4h1v1h-1zM2 5h1v1h-1zM3 5h1v1h-1zM4 5h1v1h-1zM5 5h1v1h-1zM6 5h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM1 7h1v1h-1zM2 7h1v1h-1zM6 7h1v1h-1zM7 7h1v1h-1z"/></svg>',P=[],view='list',folder='all',ST={},RD={};
function lg(k){try{var v=JSON.parse(localStorage.getItem(k)||'{}');return v&&typeof v==='object'?v:{}}catch(e){return{}}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
ST=lg('bl_star');RD=lg('bl_read');
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function ago(d){var n=Math.floor((Date.now()-new Date(d+'T00:00:00'))/864e5);if(!(n>=0))return'';if(n<1)return'today';if(n<30)return n+' day'+(n==1?'':'s')+' ago';var m=Math.floor(n/30);return m+' month'+(m==1?'':'s')+' ago'}
function unread(p){return!RD[p.id]}
function inFolder(p){return folder==='all'||(folder==='star'?!!ST[p.id]:(p.tags||[]).indexOf(folder)>-1)}
function side(){var tags=[];P.forEach(function(p){(p.tags||[]).forEach(function(t){if(tags.indexOf(t)<0)tags.push(t)})});
 function f(k,l,n){return'<button type="button" class="bl-f'+(folder===k?' on':'')+'" data-f="'+esc(k)+'">'+esc(l)+'<i>'+n+'</i></button>'}
 var h='<img class="bl-av" src="img/hoppr.webp?v=2" alt=""><div class="bl-hd">@bumyann</div>'+f('all','ALL MAIL',P.length)+f('star','STARRED',P.filter(function(p){return ST[p.id]}).length);
 tags.forEach(function(t){h+=f(t,t.toUpperCase(),P.filter(function(p){return(p.tags||[]).indexOf(t)>-1}).length)});
 $('bl-side').innerHTML=h;
 $('bl-side').querySelectorAll('.bl-f').forEach(function(b){b.onclick=function(){folder=b.dataset.f;view='list';draw()}})}
function draw(){
 var u=P.some(unread);$('bl-dot').hidden=!u;
 var showHero=P.length>0&&view==='list'&&folder==='all',L=P[0];$('bl-hero').hidden=!showHero;
 if(showHero){$('bl-hk').textContent='LATEST POST · '+ago(L.date).toUpperCase();$('bl-ht').textContent=L.title;$('bl-hp').textContent=L.snippet||'';$('bl-hnew').hidden=!unread(L);var im=$('bl-him');if(L.image){im.className='bl-im has';im.style.backgroundImage='url('+JSON.stringify(L.image)+')'}else{im.className='bl-im';im.style.backgroundImage=''}$('bl-hr').onclick=function(){openP(L.id)}}
 side();var v=P.filter(inFolder);$('bl-cnt').textContent=v.length+' POST'+(v.length==1?'':'S');
 $('bl-list').hidden=view!=='list';$('bl-read').hidden=view!=='read';
 var h='';v.forEach(function(p){h+='<div class="bl-row'+(unread(p)?' new':'')+'"><button type="button" class="bl-st'+(ST[p.id]?' on':'')+'" data-s="'+esc(p.id)+'" aria-pressed="'+(!!ST[p.id])+'" aria-label="star: '+esc(p.title)+'">'+STAR_SVG+'</button><button type="button" class="bl-open" data-id="'+esc(p.id)+'"><span class="bl-un" title="'+(unread(p)?'unread':'read')+'"></span><span class="bl-th"'+(p.image?' style="background-image:url('+esc(JSON.stringify(p.image))+')"':'')+'></span><span class="bl-tt"><b>'+esc(p.title)+'</b><span>'+esc(p.snippet||'')+'</span></span><span class="bl-ago">('+ago(p.date)+')</span></button></div>'});
 $('bl-list').innerHTML=h||'<div class="bl-empty">NO MESSAGES YET</div>';
 $('bl-list').querySelectorAll('.bl-st').forEach(function(b){b.onclick=function(){ST[b.dataset.s]=!ST[b.dataset.s];sv('bl_star',ST);draw()}});
 $('bl-list').querySelectorAll('.bl-open').forEach(function(b){b.onclick=function(){openP(b.dataset.id)}})}
function openP(id,quiet){var p=P.filter(function(x){return x.id===id})[0];if(!p)return;RD[id]=1;sv('bl_read',RD);view='read';
 $('bl-read').innerHTML='<div class="bl-msg"><button type="button" class="bl-back" id="bl-bk">◂ INBOX</button><h3>'+esc(p.title)+'</h3><div class="bl-meta">FROM @bumyann · '+esc(p.date)+((p.tags||[]).length?' · '+p.tags.map(function(t){return'#'+esc(t)}).join(' '):'')+'</div>'+(p.body||[]).map(function(x){return'<p>'+x+'</p>'}).join('')+'</div>';
 $('bl-bk').onclick=function(){view='list';draw();try{history.replaceState(null,'','#blog')}catch(e){}};
 draw();try{history.replaceState(null,'','#post='+encodeURIComponent(id))}catch(e){}
 if(!quiet){var r=root.getBoundingClientRect();if(r.top<0||r.top>innerHeight*.5)root.scrollIntoView({block:'start'})}}
function fromHash(){var m=/#post=([^&]+)/.exec(location.hash);if(m){var id=decodeURIComponent(m[1]);if(P.some(function(p){return p.id===id})){openP(id,true);root.scrollIntoView({block:'start'})}}}
draw();
fetch('posts/index.json?v=1').then(function(r){return r.ok?r.json():[]}).then(function(a){if(Array.isArray(a)){P=a.filter(function(p){return p&&p.id&&p.title&&p.date}).sort(function(x,y){return x.date<y.date?1:-1});draw();fromHash()}}).catch(function(){});
window.addEventListener('hashchange',fromHash);
})();

(function(){
var g=document.querySelector('.qs-g');if(!g)return;
var T=g.dataset.t,POOL='█▓▒░▌▐╳#@%&§¿?/\\|<>~^0123456789ΔΩΞ¤',rm=matchMedia('(prefers-reduced-motion: reduce)').matches,vis=true,tm=null;
function scr(){var o='';for(var i=0;i<T.length;i++){var ch=T[i];o+=(ch===' '||Math.random()>.5)?ch:POOL.charAt(Math.floor(Math.random()*POOL.length))}g.textContent=o}
scr();if(rm)return;
if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting}).observe(g);
tm=setInterval(function(){if(vis&&!document.hidden)scr()},110);
})();
