# Readability

**Tools > MorphMan > Readability.**

This tab shows how much of a media you can read with the words you already know.

## Pick what to analyze

### Compare Media

Tick one or more categories: Anime, Game, Manga, Movie, TV, VN.

These are premade corpora. They come with MorphMan, already analyzed, so there is nothing to download. See [Readability Files](../readability-files.md).

Their folders are set in **Settings > Corpus Paths**. See [Setup](../setup.md).

### Your own files

Want to analyze something that isn't in the corpus? For example, subtitles you downloaded for a show that isn't included.

- **Custom Folders**: pick one or more folders. Ctrl+click or Shift+click to pick several.
- **Custom Files**: pick one or more files, from any folder.

## Group Input by

One row per:

- **File**: each file.
- **Folder**: the folder of the file (a season, a game, a movie).
- **Title**: the first folder under the category (a show, a franchise, a movie).

You can change it after an analysis. The results are grouped again at once, without reading the files again.

## Analyze

Click **Analyze!**.

The first time, it takes a while. After that, MorphMan remembers the files it already read.

## Results

One row per title. It's sorted by **Known Instances %**: the share of the words of the title you already know.

Shown by default:

| Column | What it shows |
|---|---|
| **Category**, **Input** | The medium and the title. Right-click the Input header to search. |
| **Known Instances %** | How much of the title you know now. |
| **To Learn** | How many words you still need to reach the Study Plan target. The most frequent first. |
| **Reachable %** | How much you'll read once To Learn is learned. The target, or less if the rank limit leaves too few words. |
| **Difficulty Score** | How hard the title is, from 1 (easy) to 10 (hard). The same scale for every medium. Set it in **Settings > Difficulty Score**. |
| **Anki Deck** | A link to a ready-made deck for this title, when there is one. |
| **Done** | The titles you have finished. |
| **Rating**, **Release**, **Director**, **Game Text**, **Game Audio** | Information about the title. |
| **Total Instances** | How many words the title has. |
| **Speed** | Speech rate, in mora per second. Empty when the subtitles have no timecodes. |
| **Sentence Length** | Words per sentence, on average. |
| **Total Lines** | How many lines. |

**Benchmark** columns (hidden by default) show how hard a title is, the same for everyone:

- **Benchmark 90%**: how many words someone who knows none needs to read 90 % of the title.
- **Benchmark Top 2000**: how much of the title you read knowing only the 2000 most frequent words of the master list.

**Columns** lets you choose which ones to show. Drag a header to move a column.

To Learn and Reachable % stay empty unless the **Study Plan** is on. See [learning_order.txt and the Master list](learning-order.md).

Right-click a row to mark it as Done, exclude it, or see its results by episode. See [Excluding words and files, Show in text](exclude-find.md).

## Words to learn

Select a title, then click **Words to learn…** (or double-click the row).

You get the unknown words of the title, the most frequent first. Two tabs: **Words** and **Coverage**.

### Words

Filters, at the top:

- **Types**: only some types of words (nouns, verbs, particles…).
- **Max rank**: only the words up to this rank in the master list. 0 = no limit.
- **Episode**: only the words that first appear in these episodes: `1-3`, `2`, `<=4`… Shown when the title has episodes.
- **Show known words**: also lists the words you know, in green. Handy to check how the text is cut. They are never selected or added.
- **Columns**: choose which columns to show. Hiding **Example** makes the list open faster.

Some columns:

- **Count**: how many times the word appears in the title.
- **Order**: where the word first appears. Sort by it to learn the words in the order of the text.
- **Known %**: how much of the title you'd know after learning every word down to this row.
- **Meaning**: from Jitendex, or your Yomitan dictionaries. Hover a cell to see all the meanings.

Right-click a header to filter or search.

To select words, pick a mode, then click **Select**:

- **First rows**: the first N rows, in the order of the table.
- **Up to % known**: enough words to reach a %, for example 90 % known.
- **By Count**: the words that appear at least (≥) or at most (≤) N times.

Then, at the bottom:

- **Add to deck**: makes cards with these words, in the order of the table. ▾ sets where the cards go, what they are, and their tags. See [Adding words to a deck](add-to-deck.md).
- **Export .txt…**: saves the words as a text file, to import in Anki with **File > Import**.
- **Update learning_order.txt…**: at the next Recalc, the cards that teach these words come first. A manual Study Plan. See [learning_order.txt and the Master list](learning-order.md).

No selection? These buttons use every word shown.

Double-click a word to see its k+1 cards in the Browser. Shift + double-click: every new card with this word.

Select cells and press **Ctrl+C** to copy them.

### Coverage

How many words you need to reach 80, 85, 90, 95 or 98 %.

The curve starts at where you are now. Each point is a target, with the number of words to learn to reach it.

Click a target in the table, then **Select the … words for … %**. MorphMan selects them in the Words tab, ready for **Add to deck**.

The filters of the Words tab (master list, types…) apply here too.
