/* Math Lab: κοινός κώδικας για όλα τα μαθήματα.
   - Σωστό ή Λάθος: κάθε <li class="q-item" data-answer="Σ|Λ"> με κουμπιά data-v="Σ|Λ".
   - Βοηθητικά: MathLab.fmt (δεκαδικό κόμμα), MathLab.animate, MathLab.ease, MathLab.reduce. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const fmt = (x, d = 2) => x.toFixed(d).replace('.', ',');

  // Μία κίνηση τη φορά ανά «κανάλι»: μια νέα κίνηση στο ίδιο κανάλι ακυρώνει την προηγούμενη.
  const frames = {};
  function animate(fn, dur, done, channel = 'main') {
    cancelAnimationFrame(frames[channel]);
    if (reduce) { fn(1); if (done) done(); return; }
    const t0 = performance.now();
    const tick = now => {
      const t = Math.min(1, (now - t0) / dur);
      fn(t);
      if (t < 1) frames[channel] = requestAnimationFrame(tick); else if (done) done();
    };
    frames[channel] = requestAnimationFrame(tick);
  }
  const stop = (channel = 'main') => cancelAnimationFrame(frames[channel]);

  function quiz() {
    const items = [...document.querySelectorAll('.q-item')];
    const scoreEl = document.querySelector('#score');
    if (!items.length) return;
    const score = () => { if (scoreEl) scoreEl.textContent = items.filter(q => q.classList.contains('right')).length + ' / ' + items.length; };
    items.forEach(q => q.querySelectorAll('.opts button').forEach(b => b.addEventListener('click', () => {
      if (q.classList.contains('answered')) return;
      const ok = b.dataset.v === q.dataset.answer;
      q.classList.add('answered', ok ? 'right' : 'wrong');
      b.classList.add('picked');
      q.querySelectorAll('.opts button').forEach(x => { x.disabled = true; });
      q.querySelector('.fb b').textContent = ok ? '✓ Σωστά!' : '✗ Όχι ακριβώς.';
      score();
    })));
    const reset = document.querySelector('#quizReset');
    if (reset) reset.addEventListener('click', () => {
      items.forEach(q => {
        q.classList.remove('answered', 'right', 'wrong');
        q.querySelectorAll('.opts button').forEach(x => { x.disabled = false; x.classList.remove('picked'); });
      });
      score();
    });
    score();
  }

  window.MathLab = { reduce, ease, fmt, animate, stop };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', quiz); else quiz();
})();
