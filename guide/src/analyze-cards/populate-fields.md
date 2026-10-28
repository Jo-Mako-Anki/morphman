# Populate Fields

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
