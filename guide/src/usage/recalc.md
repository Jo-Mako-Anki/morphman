# Recalc and Full Recalc

## Recalc

**Ctrl+M**, or **Tools > MorphMan > Recalc**, or the **Recalc** button of [Analyze Cards](analyze-cards.md).

MorphMan:

1. Reads the cards set in Analyze Cards.
2. Works out which words you know, from your reviews.
3. Writes the fields and tags of the cards on **Modify** or **Reorder**.
4. Sorts the new cards on **Reorder**: the k+1 cards first.

"Finished Recalc" shows at the end.

Run it after you study, or before you start. Your new cards are then in the right order.

## Why it's fast

A Recalc only goes over:

- the notes that changed since the last one,
- the notes with a word you learned since.

## Full Recalc

**Ctrl+Shift+M**, or **Tools > MorphMan > Full Recalc**.

Goes over every note. You rarely need it. Recalc does a full one by itself:

- the first time,
- when you change a setting that changes what Recalc writes (Parsing, Review, Analyze Cards…),
- when `learning_order.txt`, `priority.db` or `external.db` changes,
- once a week. How often each word appears in your collection counts in the order, and it changes a little with each new note.

## Recalc stops with a warning

"No field to analyze is selected in Identify Cards": a line of Analyze Cards has a note type but no field. Pick a field, or the line would be skipped.

See also [FAQ and Troubleshooting](../faq.md).
