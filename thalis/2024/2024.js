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
      const value=Number(geometry.querySelector('input').value);
      let pts, scale, origin, labels;
      if(isB){
        const a=Math.PI/10, A=[0,0], B=[-Math.sin(a),Math.cos(a)], C=[Math.sin(a),Math.cos(a)];
        const t=(Math.sqrt(5)-1)/2,D=C.map(v=>v*t), v=D.map((x,i)=>x-B[i]);
        const u=-(B[0]*v[0]+B[1]*v[1])/(v[0]*v[0]+v[1]*v[1]);
        const E=B.map((x,i)=>x+u*v[i]),Z=E.map(x=>x*C[1]/E[1]);
        pts={Α:A,Β:B,Γ:C,Δ:D,Ε:E,Ζ:Z};scale=260*value/100;origin=[270,40];
        labels=['ΑΒ = ΑΓ, ΒΔ = ΒΓ και ΑΖ κάθετη στη ΒΔ. Το σχήμα αλλάζει μέγεθος, όχι γωνίες.',
        'Μπλε: οι ίσες πλευρές ΑΒ και ΑΓ. Οι γωνίες της βάσης είναι ίσες.',
        'Πορτοκαλί: ΒΔ = ΒΓ. Στο ΒΔΓ οι γωνίες στα Δ και Γ είναι ίσες.',
        'Η γωνία στο Β χωρίζεται από τη ΒΔ σε δύο κομμάτια.',
        'Βρήκαμε 36° στην κορυφή Α και 72° σε κάθε γωνία της βάσης.',
        'Η ΑΕ είναι κάθετη στη ΔΕ. Στο ΑΔΕ βρίσκουμε τη γωνία ΔΑΕ ίση με 18°.',
        '36° = 2 × 18°: η γωνία ΒΑΓ είναι διπλάσια της ΔΑΕ.',
        'Στο ΑΒΖ οι γωνίες στα Α και Ζ είναι και οι δύο 54°.',
        'Πράσινο: ΑΒ = ΑΓ = ΒΖ.'];
      }else{
        const r=Math.SQRT2;pts={Α:[0,0],Β:[-r,r],Γ:[0,2],Δ:[0,1],Η:[-1,1],Ζ:[-1-r,1],Ε:[1+r,1]};
        scale=90*(.75+.06*value);origin=[320,70];
        geometry.querySelector('.k-value').textContent=String(value).replace('.',',');
        labels=['Η ΖΕ είναι μεσοκάθετος της ΑΓ και ΑΕ ∥ ΒΓ. Άλλαξε το κ για να δεις πώς αλλάζει το εμβαδόν.',
        'ΑΒ = ΑΓ. Η γωνία στο Α είναι 45° και οι γωνίες της βάσης είναι 67,5°.',
        'Το Ζ ανήκει στη μεσοκάθετο, άρα ΖΑ = ΖΓ.',
        'Η γωνία ΖΑΒ είναι 67,5° − 45° = 22,5°.',
        'Στο ΑΗΔ, ΑΔ = ΗΔ = κ και η γωνία στο Δ είναι ορθή.',
        'Πυθαγόρειο: ΑΗ = κ√2.',
        'Στο ΑΗΖ, οι γωνίες στα Α και Ζ είναι 22,5°, άρα ΗΖ = ΑΗ.',
        'Το ύψος ΖΔ αποτελείται από ΖΗ = κ√2 και ΗΔ = κ.',
        'Τα ορθογώνια τρίγωνα ΑΔΕ και ΓΔΖ είναι ίσα. Άρα ΕΔ = ΖΔ.',
        `Για κ = ${String(value).replace('.',',')}: εμβαδόν = ${2*value*value}(1 + √2) ≈ ${(2*value*value*(1+r)).toFixed(2).replace('.',',')} τετραγωνικές μονάδες.`];
      }
      const model=pts;
      pts=Object.fromEntries(Object.entries(pts).map(([n,p])=>[n,[origin[0]+p[0]*scale,origin[1]+p[1]*scale]]));
      const line=(a,b,color='#1f2a5c',width=3,dash='')=>`<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}" stroke="${color}" stroke-width="${width}" stroke-dasharray="${dash}"/>`;
      const poly=(names,fill,stroke='#1f2a5c')=>`<polygon points="${names.map(n=>pts[n].join(',')).join(' ')}" fill="${fill}" fill-opacity=".45" stroke="${stroke}" stroke-width="2.5"/>`;
      const text=(x,y,s,color='#1f2a5c')=>`<text x="${x}" y="${y}" fill="${color}" stroke="white" stroke-width="4" paint-order="stroke">${s}</text>`;
      const label=(name,dx,dy,s)=>text(pts[name][0]+dx,pts[name][1]+dy,s);
      const tick=(a,b)=>{const x=(pts[a][0]+pts[b][0])/2,y=(pts[a][1]+pts[b][1])/2,dx=pts[b][0]-pts[a][0],dy=pts[b][1]-pts[a][1],l=Math.hypot(dx,dy);return `<path d="M${x-6*dy/l} ${y+6*dx/l}L${x+6*dy/l} ${y-6*dx/l}" stroke="#1f2a5c" stroke-width="2.5"/>`;};
      const right=(o,a,b)=>{const q=pts[o],va=pts[a].map((x,i)=>x-q[i]),vb=pts[b].map((x,i)=>x-q[i]),la=Math.hypot(...va),lb=Math.hypot(...vb),u=va.map(x=>10*x/la),v=vb.map(x=>10*x/lb);return `<path d="M${q[0]+u[0]} ${q[1]+u[1]}l${v[0]} ${v[1]}l${-u[0]} ${-u[1]}" fill="none" stroke="#e0313b" stroke-width="2"/>`;};
      let s=poly(['Α','Β','Γ'],'#fff3a6');
      if(isB){
        s+=line('Β','Ε','#8a5cf0',2)+line('Α','Ζ','#2c6fd6',2)+line('Γ','Ζ','#1f2a5c',2,'6 4')+right('Ε','Α','Δ');
        if(shown===1||shown>=8)s+=line('Α','Β',shown>=8?'#2f8a4e':'#2c6fd6',4)+line('Α','Γ',shown>=8?'#2f8a4e':'#2c6fd6',4)+tick('Α','Β')+tick('Α','Γ');
        if(shown===2||shown===3)s+=line('Β','Δ','#f08a1c',4)+line('Β','Γ','#f08a1c',4)+tick('Β','Δ')+tick('Β','Γ');
        if(shown>=4&&shown<7)s+=label('Α',-18,57,'36°')+label('Β',23,-10,'72°')+label('Γ',-50,-10,'72°');
        if(shown===5||shown===6)s+=poly(['Α','Δ','Ε'],'#c9f4c0')+label('Α',17,85,'18°');
        if(shown>=7)s+=line('Β','Ζ','#2f8a4e',4)+label('Α',-7,68,'54°')+label('Ζ',-57,-12,'54°');
        if(shown>=8)s+=tick('Β','Ζ');
      }else{
        s+=line('Ζ','Ε','#8a5cf0',2,'7 5')+line('Ζ','Β','#1f2a5c',2,'6 4')+line('Α','Ε','#2c6fd6',2)+line('Α','Ζ','#2c6fd6',2)+line('Γ','Ε','#8a5cf0',2)+right('Δ','Α','Η');
        if(shown===1)s+=line('Α','Β','#2c6fd6',4)+line('Α','Γ','#2c6fd6',4)+tick('Α','Β')+tick('Α','Γ')+label('Α',-43,52,'45°')+label('Γ',-72,-12,'67,5°');
        if(shown===2||shown===3)s+=poly(['Α','Ζ','Γ'],'#e8dcff')+tick('Α','Ζ')+tick('Ζ','Γ');
        if(shown===3)s+=label('Α',-97,48,'22,5°');
        if(shown>=4&&shown<=5)s+=poly(['Α','Η','Δ'],'#c9f4c0')+label('Δ',9,-35,'κ')+label('Η',30,24,'κ');
        if(shown===5||shown===6)s+=line('Α','Η','#2f8a4e',4)+label('Η',5,-35,'κ√2');
        if(shown===6)s+=poly(['Α','Η','Ζ'],'#e8dcff')+line('Η','Ζ','#2f8a4e',4)+tick('Α','Η')+tick('Η','Ζ');
        if(shown===7)s+=line('Ζ','Δ','#f08a1c',4)+text(140,330,'ΖΔ = κ√2 + κ');
        if(shown===8)s+=poly(['Α','Δ','Ε'],'#c9f4c0')+poly(['Γ','Δ','Ζ'],'#c9f4c0')+tick('Ζ','Δ')+tick('Δ','Ε');
        if(shown===9)s+=poly(['Α','Ζ','Γ'],'#c9f4c0')+poly(['Α','Ε','Γ'],'#e8dcff')+line('Α','Γ','#e0313b',3)+text(190,330,'Ε = 2κ²(1 + √2)');
      }
      const offsets=isB?{Α:[-12,-12],Β:[-25,20],Γ:[-5,25],Δ:[-25,8],Ε:[12,-2],Ζ:[12,12]}:{Α:[-5,-12],Β:[-22,20],Γ:[-6,25],Δ:[10,22],Η:[-7,24],Ζ:[-26,5],Ε:[12,5]};
      for(const [name,[x,y]] of Object.entries(pts)){const [dx,dy]=offsets[name];s+=`<circle cx="${x}" cy="${y}" r="4" fill="#1f2a5c"/>`+text(x+dx,y+dy,name);}
      geometry.querySelector('svg').innerHTML=s;
      geometry.querySelector('.geo-status').textContent=labels[shown];
    };
    const update=()=>{
      cards.forEach((c,i)=>c.hidden=i>=shown);
      next.disabled=shown===cards.length;
      next.textContent=shown===0?'Δείξε το πρώτο βήμα':shown===cards.length?'Η λύση ολοκληρώθηκε':'Επόμενο βήμα';
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

