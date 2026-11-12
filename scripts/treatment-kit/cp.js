(function(){
var d=document;
// Tabs: all panels are in the HTML (good for SEO); JS shows one at a time.
d.querySelectorAll('[data-tabs]').forEach(function(w){
 var tabs=[].slice.call(w.querySelectorAll('[role=tab]')),panels=[].slice.call(w.querySelectorAll('[data-panel]'));
 function show(i,focus){tabs.forEach(function(t,k){t.setAttribute('aria-selected',k===i);t.tabIndex=k===i?0:-1;panels[k].hidden=k!==i});if(focus){tabs[i].focus();}tabs[i].scrollIntoView({block:'nearest',inline:'nearest'})}
 tabs.forEach(function(t,i){t.addEventListener('click',function(){show(i)});t.addEventListener('keydown',function(e){var n=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:null;if(n===null)return;e.preventDefault();show((n+tabs.length)%tabs.length,true)})});
 panels.forEach(function(p,k){p.hidden=k!==0});tabs.forEach(function(t,k){t.tabIndex=k===0?0:-1});
});
// Peel menu: filter + "show all"
var grid=d.querySelector('[data-peels]');
if(grid){
 var cards=[].slice.call(grid.querySelectorAll('.cp-peel')),bar=d.querySelector('.cp-filter'),more=d.querySelector('[data-showmore]'),f='all',open=false,LIMIT=6;
 function apply(){var n=0;cards.forEach(function(c){var m=f==='all'||(' '+c.getAttribute('data-c')+' ').indexOf(' '+f+' ')>=0;if(m)n++;c.hidden=!m||(f==='all'&&!open&&n>LIMIT)});more.hidden=f!=='all';var noun=more.getAttribute('data-noun')||'peels';more.textContent=open?'Show fewer '+noun:'Show all '+cards.length+' '+noun;more.setAttribute('aria-expanded',open)}
 bar.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;f=b.getAttribute('data-f');bar.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});apply()});
 more.addEventListener('click',function(){open=!open;apply();if(!open)grid.scrollIntoView({block:'start',behavior:'smooth'})});
 apply();
}
// FAQ: show first 6, reveal the rest on demand
var fm=d.querySelector('[data-faqmore]');
if(fm){var ex=[].slice.call(d.querySelectorAll('[data-faq] .cp-extra')),fo=false;
 function fa(){ex.forEach(function(x){x.hidden=!fo});fm.textContent=fo?'Show fewer questions':'Show '+ex.length+' more questions';fm.setAttribute('aria-expanded',fo)}
 fm.addEventListener('click',function(){fo=!fo;fa()});fa();}
// Plan finder
d.querySelectorAll('[data-finder]').forEach(function(w){
 w.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
  var c=b.getAttribute('data-c'),dd=b.getAttribute('data-d'),grp=b.parentNode;
  grp.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
  if(c){w.querySelectorAll('[data-r]').forEach(function(r){r.hidden=r.getAttribute('data-r')!==c})}
  if(dd){w.setAttribute('data-dt',dd);w.querySelectorAll('[data-m]').forEach(function(x){x.hidden=x.getAttribute('data-m')!==dd})}
 });
});
})();
