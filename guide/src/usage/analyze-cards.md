# Analyze Cards

**Tools > MorphMan > Analyze Cards.**

This is where you tell MorphMan which cards to read, and what to do with them.

The tab has 3 sections: **Identify Cards**, **Modify Cards** and **Recalc**.

![Analyze Cards tab](../img/analyze_cards.png)

## Identify Cards

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

### Which field?

**Every word of the field counts.** When you review the card, all of them become known, not just the word you're learning.

- Best: a field with a **full sentence**. The context helps MeCab find the right words.
- No sentence on your cards? Use the field with the **word the card teaches**.

Buttons under the table:

- **Add Row**: a new line.
- **Delete**: removes the selected line. The last one can't be deleted.
- **Up** / **Down**: moves the selected line.

If a note matches several lines, only the first one counts. So order matters.

> **Don't forget the field.** If a line has a note type but no field, Recalc stops and tells you.

## Modify Cards

Only shows up when a line is on **Modify** or **Reorder**, with a note type. You don't need it just to count your words.

It has two parts: **Populate Fields** and **Add Tags**.

![Modify Cards](../img/analyze_cards_modify.png)

### Populate Fields

The fields MorphMan writes to your notes at each Recalc.

Each dropdown lists the fields of the note types on Modify or Reorder. Pick a field, or leave it on **None**.

Add the fields to your note type first, in Anki (**Tools > Manage Note Types > Fields**).

**Focus Morph**

| Field | What MorphMan writes |
|---|---|
| **Focus Reading** | The word to learn, with furigana: 食べる[たべる]. Use `{{furigana:FieldName}}` in your card template. **The only one I recommend.** |
| **Focus Morph** | The word to learn, without furigana: 食べる |
| **Part of speech** | The word to learn with its part of speech: 食べる (動詞 / 一般) |
| **Definition** | The meaning of the word, from Jitendex (comes with MorphMan) or your own Yomitan dictionaries. |

**Morphs**

| Field | What MorphMan writes |
|---|---|
| **All morphs** | Every word of the note, known or not, with its part of speech. |
| **Morph count** | How many words are on the note. |
| **Unknowns** | The unknown words. |
| **Unknown count** | How many unknown words. |
| **Unknown frequency** | How often the unknown words appear in your collection, on average. |

**Card Score**

| Field | What MorphMan writes |
|---|---|
| **Index** | The card's place in the queue. Lower = shown sooner. |

### Add Tags

The tags MorphMan adds at each Recalc. You can rename them.

**Card Type**

| Default tag | Meaning |
|---|---|
| `mm_AK` | **Already known.** You add this one yourself. Every word of the note then counts as mature. |
| `mm_0M` | No unknown word, and every word is mature. |
| `mm_1M` | No unknown word, but at least one isn't mature yet. |
| `mm_1K` | Exactly 1 unknown word: a k+1 card. |
| `mm_2K` | Exactly 2 unknown words. |
| `mm_3K` | 3 unknown words or more. |

**Priority & Length**

| Default tag | Meaning |
|---|---|
| `mm_priority` | An unknown word of the note is in `priority.db`. |
| `mm_frequency` | An unknown word of the note is in `learning_order.txt`. |
| `mm_tooShort` | The sentence is too short (fewer than 2 words by default). |
| `mm_tooLong` | The sentence is too long (more than 30 words by default). |

These tags are handy in the Browser. For example, search `tag:mm_1K` to see all your k+1 cards.

## Recalc

Click **Recalc**, or press **Ctrl+M** anywhere in Anki.

MorphMan counts your words, then writes the fields and tags, and sorts the cards, as set above.

The first one takes a while. After that, it only goes over what changed. See [Recalc and Full Recalc](recalc.md).

## Browser tools

In the Anki Browser, select some notes, then open the **Edit** menu. The MorphMan tools start with "MorphMan:".

They work on the notes set in Identify Cards, with their fields.

| Tool | What it does | Shortcut |
|---|---|---|
| **View Morphemes** | Shows the words MorphMan finds in the selected notes. Handy to check how a sentence is cut. | Ctrl+Alt+V |
| **Extract Morphemes** | Saves the words of the selected notes as a database (`.db`). For example, to make a `priority.db`. | Ctrl+Alt+E |
| **Mass Tagger** | Asks for tags and a database, then tags every selected note with a word from that database. | Ctrl+Alt+T |
| **Already Known Tagger** | Adds the `mm_AK` tag: every word of these notes counts as mature at the next Recalc. | K |
| **Browse Morphs** | Searches every note with the same focus morph as the selected ones. | L |
| **Learn Now** | Closes the Browser and shows the selected new cards right away. | Ctrl+Alt+N |
| **Bold Unknown Morphemes** | Puts the unknown words of the fields in bold. | Ctrl+Alt+B |
| **Batch Play** | Plays the sound of every selected note, one after the other. | Ctrl+Alt+P |
