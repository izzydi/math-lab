# Math Lab

**[▶ Open Math Lab](https://izzydi.github.io/math-lab/)**

Interactive maths lessons for Greek lower-secondary (Gymnasium) students. Each lesson is a single web page that runs in any browser, with no installation or account. It takes one exercise from the school textbook and solves it step by step on a live figure. Students try the key step themselves, see why it works, then check themselves with a true/false quiz and a challenge that has a worked solution.

| # | Lesson | Class · thematic field | What students do |
|---|---|---|---|
| 1 | [Constructing √2](https://izzydi.github.io/math-lab/sqrt2/) · [source](sqrt2) | Β΄ Γυμνασίου · Αριθμός και Άλγεβρα (Α.2 Άρρητοι – Πραγματικοί αριθμοί) | Build the right triangle with legs 1 and 1, use the Pythagorean theorem, turn the compass to place √2 and −√2 on the number line, then construct √5 |

Lessons are grouped by class and by the thematic fields of the new Greek textbooks: Αριθμός και Άλγεβρα, Γεωμετρία, Στοχαστικά Μαθηματικά.

## Adding a lesson

1. Copy the `sqrt2/` folder to a new folder with a short English name, e.g. `thales/`.
2. Edit the text in the HTML. The sections are numbered blocks (`<section class="block …">`), so you can keep, remove or reorder them.
3. Add a card for it on `index.html`, between `<!-- LESSONS:START -->` and `<!-- LESSONS:END -->`, under the right class heading.
4. Add a row to the table above.

All pages share [`assets/style.css`](assets/style.css), so a style change there updates every lesson. Published with GitHub Pages from the `main` branch.

## Στα ελληνικά

Διαδραστικά μαθήματα Μαθηματικών για το Γυμνάσιο. Κάθε μάθημα λύνει μία άσκηση του σχολικού βιβλίου βήμα-βήμα πάνω σε ζωντανό σχήμα, στον browser, χωρίς εγκατάσταση και χωρίς λογαριασμό. Τα μαθήματα είναι οργανωμένα ανά τάξη και θεματικό πεδίο.
