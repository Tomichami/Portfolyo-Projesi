(()=>{
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;
const root=document.documentElement;

// 1) Kutular kaydırdıkça adım adım belirir
if(!rm&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll('.win').forEach(w=>{if(w.getBoundingClientRect().top>innerHeight*.9){w.classList.add('pre');io.observe(w)}});
}

// 2) Unvan daktilo gibi yazılır
const t=document.querySelector('[data-type]');
if(t&&!rm){const s=t.textContent;t.textContent='';let i=0;setTimeout(function k(){t.textContent=s.slice(0,++i);if(i<s.length)setTimeout(k,55)},400)}

// 3) Piksel yağmur
const rc=document.getElementById('rain');
if(rc&&!rm){
  const x=rc.getContext('2d');let w,h,d=[];
  const rs=()=>{w=rc.width=innerWidth;h=rc.height=innerHeight;d=Array.from({length:Math.round(w/14)},()=>({x:Math.random()*w,y:Math.random()*h,l:10+Math.random()*16,v:5+Math.random()*5}))};
  rs();addEventListener('resize',rs);
  (function f(){x.clearRect(0,0,w,h);x.fillStyle='rgba(190,215,255,.26)';
    for(const p of d){x.fillRect(Math.round(p.x),Math.round(p.y),2,p.l);p.y+=p.v;p.x-=p.v*.12;if(p.y>h){p.y=-p.l;p.x=Math.random()*w}}
    requestAnimationFrame(f)})();
}

// 4) Fare: piksel parıltı izi, arka plan paralaksı, kutularda ışık
const sc=document.getElementById('spark');
if(fine&&!rm){
  let ps=[];const x=sc&&sc.getContext('2d');const cols=['#9fe6ea','#ffc978','#ffffff'];
  const rs=()=>{if(sc){sc.width=innerWidth;sc.height=innerHeight}};rs();addEventListener('resize',rs);
  addEventListener('mousemove',e=>{
    root.style.setProperty('--px',(.5-e.clientX/innerWidth)*24+'px');
    root.style.setProperty('--py',(.5-e.clientY/innerHeight)*16+'px');
    const w=e.target.closest&&e.target.closest('.win');
    if(w){const r=w.getBoundingClientRect();w.style.setProperty('--mx',e.clientX-r.left+'px');w.style.setProperty('--my',e.clientY-r.top+'px')}
    for(let i=0;i<2;i++)ps.push({x:e.clientX+(Math.random()-.5)*8,y:e.clientY+(Math.random()-.5)*8,vx:(Math.random()-.5)*1.2,vy:Math.random()*1.2+.3,s:Math.random()<.3?6:4,a:1,c:cols[Math.random()*3|0]});
    if(ps.length>120)ps.splice(0,ps.length-120);
  });
  if(x)(function f(){x.clearRect(0,0,sc.width,sc.height);ps=ps.filter(p=>p.a>0);
    for(const p of ps){x.globalAlpha=p.a;x.fillStyle=p.c;x.fillRect(Math.round(p.x/2)*2,Math.round(p.y/2)*2,p.s,p.s);p.x+=p.vx;p.y+=p.vy;p.a-=.035}
    x.globalAlpha=1;requestAnimationFrame(f)})();
}
})();
