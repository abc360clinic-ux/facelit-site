(function(){
var bar=document.querySelector('[data-progress]'),art=document.querySelector('.ba-prose');
if(bar&&art){var tick=function(){var r=art.getBoundingClientRect(),h=r.height-window.innerHeight*.6,p=h>0?Math.min(1,Math.max(0,-r.top/h)):1;bar.style.width=(p*100)+'%'};window.addEventListener('scroll',function(){requestAnimationFrame(tick)},{passive:true});tick()}
var toc=document.querySelector('[data-toc]');
if(toc){var mq=window.matchMedia('(min-width:1024px)');var sync=function(){if(mq.matches)toc.open=true};sync();mq.addEventListener&&mq.addEventListener('change',sync);
 toc.querySelector('summary').addEventListener('click',function(e){if(mq.matches)e.preventDefault()});
 var links=[].slice.call(toc.querySelectorAll('a'));
 links.forEach(function(a){a.addEventListener('click',function(){if(!mq.matches)toc.open=false})});
 if('IntersectionObserver' in window){var map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.remove('on')});var a=map[e.target.id];if(a)a.classList.add('on')}})},{rootMargin:'-110px 0px -65% 0px'});
  Object.keys(map).forEach(function(id){var h=document.getElementById(id);if(h)io.observe(h)})}}
document.querySelectorAll('[data-totop]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})})});
var tools=document.querySelector('[data-bi]'),grid=document.querySelector('[data-bigrid]');
if(tools&&grid){var items=[].slice.call(grid.querySelectorAll('.bi-item')),input=tools.querySelector('[data-bisearch]'),empty=document.querySelector('[data-biempty]'),more=document.querySelector('[data-bimore]'),
 step=Number(grid.dataset.bipage||0),limit=step||1e9,topic='all';
 var apply=function(){var q=(input.value||'').trim().toLowerCase(),filtered=!!q||topic!=='all',shown=0,match=0;
  items.forEach(function(li){var ok=(topic==='all'||li.dataset.topic===topic)&&(!q||li.dataset.q.indexOf(q)>-1);if(ok)match++;var vis=ok&&(filtered||match<=limit);li.hidden=!vis;if(vis)shown++});
  grid.classList.toggle('is-filtered',filtered);if(empty)empty.hidden=match>0;if(more)more.hidden=filtered||match<=limit};
 input.addEventListener('input',apply);
 tools.querySelectorAll('[data-bitopic]').forEach(function(b){b.addEventListener('click',function(){topic=b.dataset.bitopic;tools.querySelectorAll('[data-bitopic]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});apply()})});
 if(more)more.addEventListener('click',function(){limit+=step;apply()});
 var reset=document.querySelector('[data-bireset]');if(reset)reset.addEventListener('click',function(){input.value='';topic='all';tools.querySelectorAll('[data-bitopic]').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.bitopic==='all')});apply()});
 apply()}
})();
