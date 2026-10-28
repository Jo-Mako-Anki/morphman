# Results

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

To Learn and Reachable % stay empty unless the **Study Plan** is on. See [learning_order.txt and the Master list](../readability/study-plan.md).

## Done and Exclude

Right-click a row of **Results** (Readability tab). You can select several rows first.

- **Mark as Done**: the titles you've finished. They show in the **Done** column.
- **Mark as Not done**: the opposite.
- **Exclude**: leaves the files out. They are no longer counted anywhere: their row, the totals of their title, Words to learn, the reports. The row disappears.

To include them again: **Excluded (N)…**, under the table.

Done and Exclude are kept in `done_files.json`, in your `dbs` folder. They stay from one analysis to the next.

A folder or a title is Done when every file in it is.

To see the words of a title, select it, then **Words to learn…** (or double-click the row). See [Words to learn](../words/index.md).
