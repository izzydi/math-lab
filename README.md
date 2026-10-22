# Math Lab

**[▶ Open Math Lab](https://izzydi.github.io/math-lab/)**

Interactive maths lessons for Greek lower-secondary (Gymnasium) students. Each lesson is a single web page that runs in any browser, with no installation or account. It starts from a topic in the school textbook and brings it to life on a live figure: a construction, an experiment or a paradox. Students try the key step themselves, see why it works, then check themselves with a true/false quiz and a challenge that has a worked solution.

| # | Lesson | Class · thematic field | What students do |
|---|---|---|---|
| 1 | [The perpendicular bisector](https://izzydi.github.io/math-lab/perpendicular-bisector/) · [source](perpendicular-bisector) | Α΄ Γυμνασίου · Γεωμετρία (Β.3 Γεωμετρία του επιπέδου, §3.2) | Do the ruler-and-compass construction step by step: open the compass, sweep the two circles, find Γ and Δ, draw the line; discover that every point on it is equidistant from A and B; place a bridge on a river |
| 2 | [The angle bisector](https://izzydi.github.io/math-lab/angle-bisector/) · [source](angle-bisector) | Α΄ Γυμνασίου · Γεωμετρία (Β.3 Γεωμετρία του επιπέδου, §3.3) | Bisect an angle without a protractor, as exercise 7 asks: one arc from the vertex, two arcs from Β and Γ, the ray through Δ; cut a pizza slice in half, fold the paper, and find all points equidistant from two crossing roads |
| 3 | [Constructing a triangle](https://izzydi.github.io/math-lab/triangle/) · [source](triangle) | Α΄ Γυμνασίου · Γεωμετρία (Β.3 Γεωμετρία του επιπέδου, §3.12) | Build a triangle from its three sides: draw ΑΒ, sweep the circles (Α, ΑΓ) and (Β, ΒΓ), find Γ; see when the circles miss or just touch (6, 2, 3 and 5, 2, 3), discover the triangle inequality with straws, and find the buried treasure |
| 4 | [Constructing √2](https://izzydi.github.io/math-lab/sqrt2/) · [source](sqrt2) | Β΄ Γυμνασίου · Αριθμός και Άλγεβρα (Α.2 Άρρητοι – Πραγματικοί αριθμοί) | Build the right triangle with legs 1 and 1, use the Pythagorean theorem, turn the compass to place √2 and −√2 on the number line, then construct √5 |
| 5 | [The regular hexagon and octagon](https://izzydi.github.io/math-lab/regular-polygons/) · [source](regular-polygons) | Β΄ Γυμνασίου · Γεωμετρία (Β.1 Γεωμετρία του επιπέδου – Μέτρο γωνιών, §1.2) | Step the compass six times around the circle to get the hexagon, build the octagon from a square with perpendicular bisectors, explore ω = 360° : ν and ω + φ = 180°, tile around a point like a honeycomb, and double the sides to a 12-gon |
| 6 | [Achilles and the tortoise](https://izzydi.github.io/math-lab/zeno/) · [source](zeno) | Γ΄ Γυμνασίου · Αριθμός και Άλγεβρα (Α.1 Πραγματικοί αριθμοί) | Step through Zeno's paradox on a zooming track, add 0.9 + 0.09 + … = 0.999… = 1, solve 10t = 9 + t, then race the two in real time |
| 7 | [The birthday paradox](https://izzydi.github.io/math-lab/birthday-paradox/) · [source](birthday-paradox) | Γ΄ Γυμνασίου · Στοχαστικά Μαθηματικά (Γ.2 Πειράματα τύχης και πιθανότητες) | Guess first, deal random birthdays to 100 classes, compare the relative frequency with the probability curve, and see why 23 students make 253 pairs |

Lessons are grouped by class and by the thematic fields of the new Greek textbooks: Αριθμός και Άλγεβρα, Γεωμετρία, Στοχαστικά Μαθηματικά.

## Thalis competition practice

**[▶ Προετοιμασία για τον Θαλή](https://izzydi.github.io/math-lab/thalis/)**

The 2025, 2024 and 2023 competitions for Β΄ and Γ΄ Γυμνασίου. Three problems per class, with progressive hints, step-by-step solutions explained one step at a time, comprehension checks, and a geometry figure linked to the proof. Statements are condensed, and each lesson links the official EME PDFs.

| Year | Folder | Script |
|---|---|---|
| 2025 (7 Νοεμβρίου 2025) | [`thalis/2025/`](thalis/2025) (`b.html`, `g.html`) | [`thalis/thalis.js`](thalis/thalis.js) |
| 2024 (8 Νοεμβρίου 2024) | [`thalis/2024/`](thalis/2024) (`b.html`, `g.html`) | [`thalis/2024/2024.js`](thalis/2024/2024.js) |
| 2023 (4 Νοεμβρίου 2023) | [`thalis/2023/`](thalis/2023) (`b.html`, `g.html`) | [`thalis/2023/2023.js`](thalis/2023/2023.js) |

The pages use the Math Lab stylesheet, with scoped additions in [`thalis/thalis.css`](thalis/thalis.css), and no other JavaScript dependencies.

## Adding a lesson

1. Copy one of the lesson folders to a new folder with a short English name, e.g. `pythagorean-theorem/`.
2. Edit the text in the HTML. The sections are numbered blocks (`<section class="block …">`), so you can keep, remove or reorder them.
3. Add a card for it on `index.html`, between `<!-- LESSONS:START -->` and `<!-- LESSONS:END -->`, under the right class heading, and renumber the badges.
4. Update the «Επόμενο» links in the `.lab-pager` at the bottom of each page, so they follow the order of the cards: the lesson before the new one points to it, and the new one points to the lesson after it.
5. Add a row to the lesson table above and renumber.

All lessons share [`assets/style.css`](assets/style.css) and [`assets/lesson.js`](assets/lesson.js) (the true/false quiz and small helpers), so a change there updates every lesson. Published with GitHub Pages from the `main` branch.

## Στα ελληνικά

Διαδραστικά μαθήματα Μαθηματικών για το Γυμνάσιο. Κάθε μάθημα ξεκινά από ένα θέμα του σχολικού βιβλίου και το ζωντανεύει πάνω σε ένα σχήμα (κατασκευές, πειράματα, παράδοξα), στον browser, χωρίς εγκατάσταση και χωρίς λογαριασμό. Τα μαθήματα είναι οργανωμένα ανά τάξη και θεματικό πεδίο.

Στην ενότητα [Προετοιμασία για τον Θαλή](https://izzydi.github.io/math-lab/thalis/) υπάρχουν τα θέματα του 2025, του 2024 και του 2023 για Β΄ και Γ΄ Γυμνασίου, με υποδείξεις και λύσεις βήμα-βήμα.
