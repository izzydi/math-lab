# Math Lab

**[▶ Open Math Lab](https://izzydi.github.io/math-lab/)**

Interactive maths lessons for Greek lower-secondary (Gymnasium) students. Each lesson is a single web page that runs in any browser, with no installation or account. It starts from a topic in the school textbook and brings it to life on a live figure: a construction, an experiment or a paradox. Students try the key step themselves, see why it works, then check themselves with a true/false quiz and a challenge that has a worked solution.

| # | Lesson | Class · thematic field | What students do |
|---|---|---|---|
| 1 | [The perpendicular bisector](https://izzydi.github.io/math-lab/perpendicular-bisector/) · [source](perpendicular-bisector) | Α΄ Γυμνασίου · Γεωμετρία (Β.3 Γεωμετρία του επιπέδου, §3.2) | Do the ruler-and-compass construction step by step: open the compass, sweep the two circles, find Γ and Δ, draw the line; discover that every point on it is equidistant from A and B; place a bridge on a river |
| 2 | [Constructing √2](https://izzydi.github.io/math-lab/sqrt2/) · [source](sqrt2) | Β΄ Γυμνασίου · Αριθμός και Άλγεβρα (Α.2 Άρρητοι – Πραγματικοί αριθμοί) | Build the right triangle with legs 1 and 1, use the Pythagorean theorem, turn the compass to place √2 and −√2 on the number line, then construct √5 |
| 3 | [Achilles and the tortoise](https://izzydi.github.io/math-lab/zeno/) · [source](zeno) | Γ΄ Γυμνασίου · Αριθμός και Άλγεβρα (Α.1 Πραγματικοί αριθμοί) | Step through Zeno's paradox on a zooming track, add 0.9 + 0.09 + … = 0.999… = 1, solve 10t = 9 + t, then race the two in real time |
| 4 | [The birthday paradox](https://izzydi.github.io/math-lab/birthday-paradox/) · [source](birthday-paradox) | Γ΄ Γυμνασίου · Στοχαστικά Μαθηματικά (Γ.2 Πειράματα τύχης και πιθανότητες) | Guess first, deal random birthdays to 100 classes, compare the relative frequency with the probability curve, and see why 23 students make 253 pairs |

Lessons are grouped by class and by the thematic fields of the new Greek textbooks: Αριθμός και Άλγεβρα, Γεωμετρία, Στοχαστικά Μαθηματικά.

## Adding a lesson

1. Copy one of the lesson folders to a new folder with a short English name, e.g. `thales/`.
2. Edit the text in the HTML. The sections are numbered blocks (`<section class="block …">`), so you can keep, remove or reorder them.
3. Add a card for it on `index.html`, between `<!-- LESSONS:START -->` and `<!-- LESSONS:END -->`, under the right class heading.
4. Add a row to the table above.

All pages share [`assets/style.css`](assets/style.css) and [`assets/lesson.js`](assets/lesson.js) (the true/false quiz and small helpers), so a change there updates every lesson. Published with GitHub Pages from the `main` branch.

## Στα ελληνικά

Διαδραστικά μαθήματα Μαθηματικών για το Γυμνάσιο. Κάθε μάθημα ξεκινά από ένα θέμα του σχολικού βιβλίου και το ζωντανεύει πάνω σε ένα σχήμα (κατασκευές, πειράματα, παράδοξα), στον browser, χωρίς εγκατάσταση και χωρίς λογαριασμό. Τα μαθήματα είναι οργανωμένα ανά τάξη και θεματικό πεδίο.
