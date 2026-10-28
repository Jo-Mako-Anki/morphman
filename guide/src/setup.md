# Setup

**Tools > MorphMan > Settings** (Ctrl+O).

The defaults are fine to start. Come here when you want to change something.

![Settings tab](img/settings.png)

The tab has 6 sections. Click a section to open or close it.

## Files

Where MorphMan finds and writes its files.

- **Known Morphs DB**: your known words, `known.db`. Made by Recalc.
- **Output Directory**: where reports and `learning_order.txt` are written.
- **Title sheet**: a spreadsheet with a deck link for each title. It fills the **Anki Deck** column of Results. MorphMan comes with one. Read from your disk at each Analyze, no connection needed.
- **Corpus folders**: one folder per category (Anime, Game, Manga, Movie, TV, VN). These are the checkboxes of Compare Media. By default, the corpora that come with MorphMan. See [Readability Files](readability-files.md).

## Parsing

How sentences are cut into words, and which words count.

- **Morphemizer**: MeCab for Japanese. Below it, whether MecabUnidic is installed, with **Download and install**.
- **Proper nouns are known**: names count as known. Japanese only.
- **Ignore grammar position**: a word counts once, whether it's used as a noun, a verb, etc.
- **Match the sub-type**: が as a case particle and が as a conjunctive particle are two words. Off: one makes the other known.
- **Match the spelling**: 言う and いう are two words. Off: knowing 言う makes いう known too.
- **Cut like Yomitan**: pieces that make a word of the dictionary count as one word: お願い, それにしても, いつの間にか.
- **Ignore [ ] brackets**, **( )**, **（ ）**: ignores what's inside. Handy for furigana readings, pitch accent, or character names in scripts.

Your own lists, next to `known.db`. Click one to open it:

- `expressions.txt`: one expression per line. Its pieces count as one word. `-word`: never one word.
- `word_types.txt`: the type of a word, if MeCab gets it wrong. `word<Tab>type`, for example `ぞ	Particle / Sentence-ending`.
- `proper_nouns.txt`: one name per line.


## Review

Which cards are skipped or shown first when you study.

- **Skip comprehension cards**: skips cards where every word is mature (`mm_0M`).
- **Skip fresh vocabulary**: skips cards with no unknown word, but some still being learned (`mm_1M`).
- **Skip focus morph seen today**: skips a card if its focus morph was already shown today.
- **Prioritize frequency morphs**: cards with a word from `learning_order.txt` or `priority.db` come first, even beyond k+1.
- **Ignore suspended leeches**: ignores cards that are suspended and tagged leech.
- **Max unknown morphs**: Recalc ignores cards with more unknown words than this. 0 = no limit.

In Parsing and Review, an option changed from its default is shown in blue. **Reset to defaults** puts it back.

Changing a Parsing or Review option makes the next Recalc go over every note.

## Words to learn

For the **Words to learn** window. See [Readability](usage/readability.md).

- **Examples**: the Example column shows a sentence from your own cards, for each word. The one where it's the only unknown word, from a mature card if possible, then the shortest. Set the minimum length here.
- **Part of Speech Names**: how the types of words are called. **Edit names…** to change them, **Suggested names** for English ones.
- **Browser Search**: what a double-click on a word searches in the Browser, and what Shift + double-click searches.

## Difficulty Score

How hard a title is, from 1 to 10. It's the **Difficulty Score** column of Results.

It's made from 4 criteria: **Benchmark Top 2000**, **Sentence Length**, **Speed** and **Benchmark 90%**. For each, set the easy and hard bounds, and its weight.

## Keyboard Shortcuts

Open a tab from anywhere in Anki:

| Tab | Default |
|---|---|
| Analyze Cards | Ctrl+A |
| Readability | Ctrl+R |
| Settings | Ctrl+O |

## Thresholds (advanced)

When a word counts as known or mature is set in `morph/config.py`, in the add-on folder:

- `threshold_mature`: 21 days, like Anki.
- `threshold_known`: 10 seconds. One correct answer is enough.

Change them only if you know what you're doing. An update of MorphMan puts them back.
