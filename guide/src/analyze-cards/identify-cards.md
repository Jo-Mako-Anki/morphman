# Identify Cards

One line per kind of card.

| Column | What it does |
|---|---|
| **Note type** | The note type of your cards. Or **All note types**. |
| **Fields** | The field MorphMan reads. See [Which field?](#which-field) |
| **Tags** | Only the notes with these tags. Separate them with commas. Empty = any note. |
| **Morphemizer** | How the sentence is cut into words. Keep MeCab for Japanese. |
| **Count Words** / **Modify** / **Reorder** | What MorphMan does with these cards. Pick one. |

- **Count Words**: MorphMan counts the words you know. Nothing is changed in the notes.
  A word counts as known once you have reviewed its card, or if the note has the `mm_AK` tag.
- **Modify**: same, and MorphMan also writes its fields and tags into the notes. The cards stay where they are.
- **Reorder**: same as Modify, and MorphMan also sorts your new cards. The k+1 cards (one unknown word) come first.

Which one to use:

- Your old decks, or decks you don't want touched: **Count Words**.
- A sentence bank: **Modify**. Its cards keep their place, and Recalc doesn't spend time moving them.
- The deck you learn from: **Reorder**.

## Which field?

**Every word of the field counts.** When you review the card, all of them become known, not just the word you're learning.

- Best: a field with a **full sentence**. The context helps MeCab find the right words.
- No sentence on your cards? Use the field with the **word the card teaches**.

Buttons under the table:

- **Add Row**: a new line.
- **Delete**: removes the selected line. The last one can't be deleted.
- **Up** / **Down**: moves the selected line.

If a note matches several lines, only the first one counts. So order matters.

> **Don't forget the field.** If a line has a note type but no field, Recalc stops and tells you.
