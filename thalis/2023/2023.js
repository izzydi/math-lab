/* Thalis 2023 lessons: reveal one solution step at a time and light up the figure. */
(() => {
  'use strict';
  const isB = location.pathname.endsWith('/b.html');
  const fmt = (x, d = 2) => String(Math.round(x * 10 ** d) / 10 ** d).replace('.', ',');
  document.querySelectorAll('.thalis-steps').forEach(panel => {
    const cards = [...panel.querySelectorAll('.step-card')];
    const next = panel.querySelector('.reveal'), reset = panel.querySelector('.reset');
    const progress = panel.querySelector('.thalis-progress');
    const section = panel.closest('section');
    let shown = 0;
    const geometry = section.querySelector('.thalis-geometry');
    const draw = () => {
      if (!geometry) return;
      const value = Number(geometry.querySelector('input').value);
      let pts, scale, origin, labels, offsets;
      if (isB) {
        // Tall rectangle as in the official figure: Α, Β at the bottom, Γ, Δ at the top.
        const W = 0.75, H = 1, t = value / 100;
        pts = {Α: [0, H], Β: [W, H], Γ: [W, 0], Δ: [0, 0], Ε: [W, H - t * H], Ζ: [0, t * H], Ο: [W / 2, H / 2]};
        scale = 300; origin = [320 - W * scale / 2, 40];
        offsets = {Α: [-28, 24], Β: [10, 24], Γ: [10, -8], Δ: [-28, -8], Ε: [12, 7], Ζ: [-30, 7], Ο: [10, -10]};
        labels = [
          'ΑΒΓΔ ορθογώνιο, ΑΕ ∥ ΓΖ και Ο το μέσο του ΕΖ. Σύρε τον δρομέα για να μετακινήσεις το Ε.',
          'ΑΖ ∥ ΕΓ (πορτοκαλί) και ΑΕ ∥ ΓΖ (μπλε): το ΑΕΓΖ είναι παραλληλόγραμμο.',
          'Απέναντι πλευρές του παραλληλογράμμου: ΑΕ = ΓΖ και ΑΖ = ΕΓ.',
          'Πράσινο: ΒΕ = ΒΓ − ΕΓ και ΔΖ = ΑΔ − ΑΖ. Αφαιρέσαμε ίσα κομμάτια από ίσες πλευρές.',
          'Οι διαγώνιοι ΑΓ και ΕΖ του ΑΕΓΖ διχοτομούνται στο Ο.',
          'Η διαγώνιος ΒΔ περνά από το μέσο Ο της ΑΓ και το Ο είναι μέσο της. Μετακίνησε το Ε: το Ο δεν κουνιέται!'];
      } else {
        // Official orientation: Α top left, Β bottom left, Γ bottom right, Δ top right, in units of α.
        const a = value;
        geometry.querySelector('.k-value').textContent = String(a);
        pts = {Α: [0, 0], Β: [0, 1], Γ: [2, 1], Δ: [2, 0], Ε: [0.75, 1], Ζ: [1.25, 0], Ο: [1, 0.5]};
        scale = 180 + 8 * a; origin = [320 - scale, 175 - scale / 2];
        offsets = {Α: [-26, -10], Β: [-26, 24], Γ: [10, 24], Δ: [10, -10], Ε: [-6, 27], Ζ: [-6, -12], Ο: [12, 7]};
        labels = [
          `ΑΒ = α, ΒΓ = 2α, ΒΕ = 3α/4 και ΑΕ ∥ ΓΖ. Άλλαξε το α: εδώ α = ${a}.`,
          'ΑΖ ∥ ΕΓ (πορτοκαλί) και ΑΕ ∥ ΓΖ (μπλε): το ΑΕΓΖ είναι παραλληλόγραμμο.',
          `ΕΓ = 2α − 3α/4 = 5α/4. Για α = ${a}: ΕΓ = ${fmt(5 * a / 4)}.`,
          `Στο ορθογώνιο τρίγωνο ΑΒΕ: ΑΕ = 5α/4 = ${fmt(5 * a / 4)}, όσο και το ΕΓ.`,
          'Δύο διαδοχικές πλευρές ίσες: το ΑΕΓΖ είναι ρόμβος με όλες τις πλευρές ίσες.',
          'Η ΑΓ είναι διαγώνιος και του ρόμβου και του ορθογωνίου. Η ΖΕ και η ΒΔ περνούν από το μέσο της, το Ο.',
          `Στο ΑΒΓ: ΑΓ = α√5. Για α = ${a}: ΑΓ ≈ ${fmt(a * Math.sqrt(5))}.`,
          `Εμβαδόν ρόμβου = βάση ΕΓ × ύψος ΑΒ = 5α²/4 = ${fmt(5 * a * a / 4)}.`,
          `ΕΖ = α√5/2 ≈ ${fmt(a * Math.sqrt(5) / 2)} και ΑΓ ≈ ${fmt(a * Math.sqrt(5))}: η ΑΓ είναι διπλάσια της ΕΖ.`];
      }
      pts = Object.fromEntries(Object.entries(pts).map(([n, p]) => [n, [origin[0] + p[0] * scale, origin[1] + p[1] * scale]]));
      const line = (a, b, color = '#1f2a5c', width = 3, dash = '') => `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}" stroke="${color}" stroke-width="${width}" stroke-dasharray="${dash}" stroke-linecap="round"/>`;
      const poly = (names, fill, stroke = '#1f2a5c') => `<polygon points="${names.map(n => pts[n].join(',')).join(' ')}" fill="${fill}" fill-opacity=".45" stroke="${stroke}" stroke-width="2.5"/>`;
      const text = (x, y, s, color = '#1f2a5c', anchor = 'start') => `<text x="${x}" y="${y}" fill="${color}" text-anchor="${anchor}" stroke="white" stroke-width="4" paint-order="stroke">${s}</text>`;
      const mid = (a, b) => [(pts[a][0] + pts[b][0]) / 2, (pts[a][1] + pts[b][1]) / 2];
      const tick = (a, b, n = 1) => {
        const [x, y] = mid(a, b), dx = pts[b][0] - pts[a][0], dy = pts[b][1] - pts[a][1], l = Math.hypot(dx, dy);
        const ux = dx / l, uy = dy / l; let p = '';
        for (let i = 0; i < n; i++) {
          const o = (i - (n - 1) / 2) * 7, cx = x + ux * o, cy = y + uy * o;
          p += `<path d="M${cx - 7 * uy} ${cy + 7 * ux}L${cx + 7 * uy} ${cy - 7 * ux}" stroke="#1f2a5c" stroke-width="2.5"/>`;
        }
        return p;
      };
      const right = (o, a, b) => {
        const q = pts[o], va = pts[a].map((x, i) => x - q[i]), vb = pts[b].map((x, i) => x - q[i]);
        const la = Math.hypot(...va), lb = Math.hypot(...vb), u = va.map(x => 12 * x / la), v = vb.map(x => 12 * x / lb);
        return `<path d="M${q[0] + u[0]} ${q[1] + u[1]}l${v[0]} ${v[1]}l${-u[0]} ${-u[1]}" fill="none" stroke="#e0313b" stroke-width="2"/>`;
      };
      let s = poly(isB ? ['Α', 'Β', 'Γ', 'Δ'] : ['Α', 'Β', 'Γ', 'Δ'], '#fff3a6');
      if (isB) {
        if (shown === 1) s += poly(['Α', 'Ε', 'Γ', 'Ζ'], '#e8dcff');
        s += line('Α', 'Ε', '#8a5cf0', 2.5) + line('Γ', 'Ζ', '#8a5cf0', 2.5) + line('Ε', 'Ζ', '#1f2a5c', 2, '7 5');
        if (shown === 1) s += line('Α', 'Ζ', '#f08a1c', 4) + line('Ε', 'Γ', '#f08a1c', 4) + line('Α', 'Ε', '#2c6fd6', 4) + line('Γ', 'Ζ', '#2c6fd6', 4);
        if (shown === 2) s += line('Α', 'Ε', '#2f8a4e', 4) + line('Γ', 'Ζ', '#2f8a4e', 4) + tick('Α', 'Ε') + tick('Γ', 'Ζ') + line('Α', 'Ζ', '#f08a1c', 4) + line('Ε', 'Γ', '#f08a1c', 4) + tick('Α', 'Ζ', 2) + tick('Ε', 'Γ', 2);
        if (shown === 3) s += line('Α', 'Ζ', '#f08a1c', 3) + line('Ε', 'Γ', '#f08a1c', 3) + tick('Α', 'Ζ', 2) + tick('Ε', 'Γ', 2) + line('Β', 'Ε', '#2f8a4e', 5) + line('Δ', 'Ζ', '#2f8a4e', 5) + tick('Β', 'Ε') + tick('Δ', 'Ζ');
        if (shown >= 4) s += line('Α', 'Γ', '#e0313b', 3) + line('Ε', 'Ζ', '#1f2a5c', 3) + tick('Α', 'Ο') + tick('Ο', 'Γ') + tick('Ε', 'Ο', 2) + tick('Ο', 'Ζ', 2);
        if (shown >= 5) s += line('Β', 'Δ', '#2f8a4e', 4) + tick('Β', 'Ο', 3) + tick('Ο', 'Δ', 3);
      } else {
        const a = value;
        s += line('Α', 'Γ', '#1f2a5c', 2, '7 5') + line('Ζ', 'Ε', '#1f2a5c', 2, '3 5');
        if (shown === 1 || shown === 7) s += poly(['Α', 'Ε', 'Γ', 'Ζ'], '#e8dcff');
        if (shown === 3) s += poly(['Α', 'Β', 'Ε'], '#c9f4c0') + right('Β', 'Α', 'Ε');
        if (shown === 6) s += poly(['Α', 'Β', 'Γ'], '#c9f4c0') + right('Β', 'Α', 'Γ');
        s += line('Α', 'Ε', '#2c6fd6', 2.5) + line('Γ', 'Ζ', '#2c6fd6', 2.5);
        if (shown === 1) s += line('Α', 'Ζ', '#f08a1c', 4) + line('Ε', 'Γ', '#f08a1c', 4) + line('Α', 'Ε', '#2c6fd6', 4) + line('Γ', 'Ζ', '#2c6fd6', 4);
        if (shown === 2) { const [x, y] = mid('Ε', 'Γ'); s += line('Ε', 'Γ', '#2f8a4e', 5) + text(x, y + 30, `ΕΓ = ${fmt(5 * a / 4)}`, '#24683a', 'middle'); }
        if (shown === 3) { const [x, y] = mid('Α', 'Ε'); s += line('Α', 'Ε', '#2f8a4e', 5) + text(x + 14, y - 4, `ΑΕ = ${fmt(5 * a / 4)}`, '#24683a'); }
        if (shown === 4) s += ['Α', 'Ε', 'Γ', 'Ζ'].map((p, i, arr) => line(p, arr[(i + 1) % 4], '#2f8a4e', 4) + tick(p, arr[(i + 1) % 4])).join('');
        if (shown === 5) s += line('Α', 'Γ', '#e0313b', 3) + line('Ζ', 'Ε', '#8a5cf0', 3) + line('Β', 'Δ', '#2f8a4e', 4) + tick('Α', 'Ο') + tick('Ο', 'Γ');
        if (shown === 6) { const [x, y] = mid('Α', 'Γ'); s += line('Α', 'Γ', '#e0313b', 5) + text(x + 70, y - 12, `ΑΓ ≈ ${fmt(a * Math.sqrt(5))}`, '#a8213a'); }
        if (shown === 7) s += line('Α', 'Β', '#f08a1c', 5) + line('Ε', 'Γ', '#2f8a4e', 5) + line('Α', 'Γ', '#e0313b', 3) + line('Ζ', 'Ε', '#8a5cf0', 3);
        if (shown >= 8) { const [x, y] = mid('Ο', 'Ε'); s += line('Α', 'Γ', '#e0313b', 4) + line('Ζ', 'Ε', '#2f8a4e', 5) + text(x + 14, y + 8, `ΕΖ ≈ ${fmt(a * Math.sqrt(5) / 2)}`, '#24683a'); }
        const [bx, by] = mid('Α', 'Β'), [ex] = mid('Β', 'Ε');
        s += text(bx - 14, by + 7, `α = ${a}`, '#1f2a5c', 'end') + text(ex, pts['Β'][1] + 52, `ΒΕ = ${fmt(3 * a / 4)}`, '#1f2a5c', 'middle');
      }
      for (const [name, [x, y]] of Object.entries(pts)) {
        const [dx, dy] = offsets[name];
        s += `<circle cx="${x}" cy="${y}" r="${name === 'Ο' ? 5 : 4}" fill="${name === 'Ο' ? '#e0313b' : '#1f2a5c'}"/>` + text(x + dx, y + dy, name);
      }
      geometry.querySelector('svg').innerHTML = s;
      geometry.querySelector('.geo-status').textContent = labels[shown];
    };
    const update = () => {
      cards.forEach((c, i) => c.hidden = i >= shown);
      next.disabled = shown === cards.length;
      next.textContent = shown === 0 ? 'Δείξε το πρώτο βήμα' : shown === cards.length ? 'Η λύση ολοκληρώθηκε' : 'Επόμενο βήμα';
      reset.disabled = shown === 0;
      progress.textContent = `${shown} από ${cards.length} βήματα`;
      draw();
    };
    next.addEventListener('click', () => { if (shown < cards.length) shown++; update(); });
    reset.addEventListener('click', () => { shown = 0; update(); });
    if (geometry) geometry.querySelector('input').addEventListener('input', draw);
    update();
  });
  document.querySelectorAll('.thalis-check').forEach(q => {
    q.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const ok = b.dataset.choice === q.dataset.correct;
      q.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      const result = q.querySelector('[role=status]');
      result.textContent = (ok ? '✓ Σωστά! ' : 'Δοκίμασε ξανά. ') + result.dataset.feedback;
      result.style.color = ok ? '#24683a' : '#a62530';
    }));
  });
})();
