# Quick Start

The short version. Each step has its own page if you want more.

## 1. Install MorphMan

Install MorphMan (JoMako) from AnkiWeb, then restart Anki. See [Installation](installation.md).

## 2. Download the dictionary

The first time you start Anki, MorphMan asks to download MecabUnidic, the Japanese dictionary (about 500 MB).

Click yes. A small window shows a few slides while it downloads. You can keep using Anki.

When it's done, restart Anki.

![Download window](img/quickstart_download.png)

If you said no, MorphMan asks again at the next start. You can also go to **Settings > Parsing** and click **Download and install**.

## 3. Tell MorphMan which cards to read

Open the **Analyze Cards** tab.

In **Identify Cards**, add a line for your Japanese note type and pick the field with the Japanese sentence.

Choose what MorphMan does with these cards:

- **Count Words**: it only learns which words you know.
- **Modify**: it also fills the MorphMan fields and adds tags.
- **Reorder**: same as Modify, and it also sorts your new cards.

Use **Count Words** for decks you don't want touched. Use **Reorder** for the deck you're learning from.

With Modify or Reorder, the **Modify Cards** section appears. Pick the fields to fill in **Populate Fields**, and the tags in **Add Tags**.

![Analyze Cards tab](img/quickstart_analyze_cards.png)

## 4. Run Recalc

Click **Recalc**, or press **Ctrl+M**.

The first one takes a while. After that, it's fast.

Your new cards are now sorted: the k+1 cards (one unknown word) come first.

## 5. Find media at your level

Open the **Readability** tab.

Check a media (subtitles, a game script, a book…), then click **Analyze**.

You get:

- **Results**: how much of it you already know.
- **Coverage**: how many words you need to reach your goal.
- **Words to learn**: those words, the most useful first.

![Readability results](img/quickstart_readability.png)

## 6. Learn the missing words

In **Words to learn**, select words and click **Add to deck**.

MorphMan makes new cards with real sentences from the media.

## What's next

- New to MorphMan? Read the [Glossary](glossary.md) first.
- Want to change the thresholds or the fields? See [Setup](setup.md).
- Something doesn't work? See [FAQ and Troubleshooting](faq.md), or ask on [Discord](https://discord.gg/J9Sw8jdkPY).
