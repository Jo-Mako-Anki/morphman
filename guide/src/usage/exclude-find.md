# Excluding words and files, Show in text

## Done and Exclude

Right-click a row of **Results** (Readability tab). You can select several rows first.

- **Mark as Done**: the titles you've finished. They show in the **Done** column.
- **Mark as Not done**: the opposite.
- **Exclude**: leaves the files out. They are no longer counted anywhere: their row, the totals of their title, Words to learn, the reports. The row disappears.

To include them again: **Excluded (N)…**, under the table.

Done and Exclude are kept in `done_files.json`, in your `dbs` folder. They stay from one analysis to the next.

A folder or a title is Done when every file in it is.

## Results by episode

Right-click a row of a show, then **Results by episode**. You get one row per file, in the **Episodes** tab.

## Show in text

In **Words to learn**, right-click a word, then **Show in text…**

You get every sentence of the title with this word. Conjugated forms too: 吐いた for 吐く.

MorphMan needs the text files themselves. So it's not available for a title read from a corpus file (`.corpusdb`), like the premade corpora. It works on your own files, with **Custom Folders** or **Custom Files**.

## Excluding words

To make a word count as known, add the `mm_AK` tag to a note with it (or press **K** while you study), then Recalc.

To change how words are cut, use your lists in **Settings > Parsing**: `expressions.txt`, `word_types.txt`, `proper_nouns.txt`. See [Setup](../setup.md#parsing).
