/* Independent lesson controls: reveal one proof step at a time. */
(() => {
  'use strict';
  const isB = location.pathname.endsWith('/b.html');
  document.querySelectorAll('.thalis-steps').forEach(panel => {
    const cards = [...panel.querySelectorAll('.step-card')];
    const next = panel.querySelector('.reveal'), reset = panel.querySelector('.reset');
    const progress = panel.querySelector('.thalis-progress');
    const section = panel.closest('section');
    let shown = 0;
    const geometry = section.querySelector('.thalis-geometry');
    const draw = () => {
      if (!geometry) return;
      const w = Number(geometry.querySelector('input').value), h = isB ? w : 160;
      const pts = {Α:[250,190-h/2],Β:[250+w,190-h/2],Γ:[250+w,190+h/2],Δ:[250,190+h/2],Ο:[250+w/2,190],Ε:[250-w/2,190]};
      const line = (a,b,color,width=3,dash='') => `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}" stroke="${color}" stroke-width="${width}" ${dash?'stroke-dasharray="'+dash+'"':''}/>`;
      let s = `<polygon points="${['Α','Β','Γ','Δ'].map(p=>pts[p].join(',')).join(' ')}" fill="#fff8d6" stroke="#1f2a5c" stroke-width="3"/>`;
      s += line('Α','Γ','#b2a0d9',2,'7 5')+line('Β','Δ','#b2a0d9',2,'7 5');
      s += `<polygon points="${['Α','Ο','Δ','Ε'].map(p=>pts[p].join(',')).join(' ')}" fill="${shown>=3?'#c9f4c0':'#e8dcff'}" fill-opacity=".65" stroke="#8a5cf0" stroke-width="3"/>`;
      if(shown>=1) s+=line('Α','Ο','#2c6fd6',4)+line('Δ','Ε','#2c6fd6',4)+line('Ο','Δ','#e2508c',4)+line('Ε','Α','#e2508c',4);
      if(shown>=2){
        for(const [a,b] of [['Α','Ο'],['Ο','Δ'],...(shown>=3?[['Δ','Ε'],['Ε','Α']]:[])]){
          const x=(pts[a][0]+pts[b][0])/2,y=(pts[a][1]+pts[b][1])/2;
          const dx=pts[b][0]-pts[a][0],dy=pts[b][1]-pts[a][1],len=Math.hypot(dx,dy);
          s+=`<line x1="${x-6*dy/len}" y1="${y+6*dx/len}" x2="${x+6*dy/len}" y2="${y-6*dx/len}" stroke="#1f2a5c" stroke-width="3"/>`;
        }
      }
      if(isB && shown>=4){const [x,y]=pts['Ο'],d=11;s+=`<path d="M${x-d},${y-d} l-${d},${d} l${d},${d}" fill="none" stroke="#e0313b" stroke-width="3"/><text x="${x+12}" y="${y+5}" fill="#e0313b">90°</text>`;}
      if(!isB && shown>=5){s+='<line x1="70" y1="190" x2="560" y2="190" stroke="#3f9d58" stroke-width="3" stroke-dasharray="8 5"/><text x="320" y="350" fill="#2f8a4e">ΕΟ: άξονας συμμετρίας</text>';}
      if(!isB && shown>=6)s+=line('Ε','Β','#f08a1c',3)+line('Ε','Γ','#f08a1c',3);
      const offset={Α:[-22,-14],Β:[10,-10],Γ:[10,24],Δ:[-22,25],Ο:[6,shown>=4?30:-15],Ε:[-27,5]};
      for(const [name,[x,y]] of Object.entries(pts)){s+=`<circle cx="${x}" cy="${y}" r="5" fill="#1f2a5c"/><text x="${x+offset[name][0]}" y="${y+offset[name][1]}" fill="#1f2a5c" stroke="white" stroke-width="4" paint-order="stroke">${name}</text>`;}
      geometry.querySelector('svg').innerHTML=s;
      const labels=['Οι διαγώνιοι συναντώνται στο Ο. Τα ΑΕ και ΔΕ είναι οι παράλληλες που ορίζουν το Ε.','Ίδιο χρώμα: παράλληλες απέναντι πλευρές.','Οι χαρακιές δείχνουν ΑΟ = ΟΔ.','Οι τέσσερις πλευρές έχουν τώρα την ίδια ένδειξη ισότητας.',isB?'Η γωνία ΑΟΔ είναι ορθή.':'Τέσσερις ίσες πλευρές: ρόμβος.',isB?'Ίσες πλευρές και ορθή γωνία: τετράγωνο.':'Η πράσινη γραμμή είναι η μεσοκάθετος της ΑΔ.','Τα πορτοκαλί τμήματα ΕΒ και ΕΓ είναι συμμετρικά και ίσα.'];
      geometry.querySelector('.geo-status').textContent=labels[shown];
    };
    const update=()=>{
      cards.forEach((c,i)=>c.hidden=i>=shown);
      next.disabled=shown===cards.length;
      next.textContent=shown===0?'Δείξε το πρώτο βήμα':shown===cards.length?'Η λύση ολοκληρώθηκε':'Επόμενο βήμα →';
      reset.disabled=shown===0;
      progress.textContent=`${shown} από ${cards.length} βήματα`;
      draw();
    };
    next.addEventListener('click',()=>{if(shown<cards.length)shown++;update();});
    reset.addEventListener('click',()=>{shown=0;update();});
    if(geometry)geometry.querySelector('input').addEventListener('input',draw);
    update();
  });
  document.querySelectorAll('.thalis-check').forEach(q=>{
    q.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
      const ok=b.dataset.choice===q.dataset.correct;
      q.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
      const result=q.querySelector('[role=status]');
      result.textContent=(ok?'✓ Σωστά! ':'Δοκίμασε ξανά. ')+result.dataset.feedback;
      result.style.color=ok?'#24683a':'#a62530';
    }));
  });
})();
