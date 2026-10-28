# learning_order.txt

The file the Study Plan wrote, as it is on your disk. It's read again each time you open the tab.

| Column | What it shows |
|---|---|
| **Order** | Its place in the file: the order you'll learn the words. |
| **Norm**, **Base**, **Reading**, **POS**, **Sub-POS** | The word. |
| **Rank** | Its rank in the master list. |
| **Count in Title**, **Title** | How many times it appears in its title, and which title. |

Right-click **Title** to show only some titles.

- **Reload**: reads the file again.
- **Open file**: opens it in your text editor.

## What it changes

At Recalc, a card with a word of `learning_order.txt` gets the `mm_frequency` tag, and comes earlier in your new cards.

With **Prioritize frequency morphs** on (Settings > Review), these cards come first, even with more than one unknown word.

## priority.db

The same idea, as a word database. Put it in your `dbs` folder. Cards with one of its words get the `mm_priority` tag and come earlier.

Make one with the [Database Manager](../usage/database-manager.md), or with **Extract Morphemes** in the Browser.
