# Add Tags

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
