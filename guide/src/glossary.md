# Glossary

The words you'll see everywhere in MorphMan and in this guide.

## Morph

A word, more or less.

MorphMan cuts each sentence into morphs with a dictionary (MeCab). Conjugated forms count as the same morph: 食べた and 食べます are both 食べる.

## Known, mature, seen

How well you know a morph, from the cards it is on:

- **Seen**: on a card you have reviewed at least once.
- **Known**: on a card you have answered correctly at least once, even if it is still in learning (an interval of a few seconds is enough).
- **Mature**: on a card with an interval of at least 21 days, like in Anki.

You can change these thresholds. See [Setup](setup.md).

## k+1

A sentence with exactly **one** word you don't know.

You can read everything else, so you learn the new word from context. MorphMan puts these cards first.

The *k* stands for **known**: everything you know, plus one new word. The idea comes from linguist Stephen Krashen's *i+1*: input just one step above your current level (*i*). You may have seen other letters (i+1, n+1…). It's the same principle.

## Focus morph

The new word of a k+1 card. MorphMan writes it in a field of the card, so you can see it, or look it up.

## Recalc

The scan that reads your collection, finds what you know, fills the MorphMan fields and tags, and sorts your new cards (Ctrl+M).

To be quick, Recalc only goes over the notes that changed since the last one, and the notes with a word you learned since.

**Full Recalc** (Ctrl+Shift+M) goes over every note. You rarely need it: Recalc does a full one by itself the first time, when you change a setting or `learning_order.txt`, and once a week. See [Recalc and Full Recalc](analyze-cards/recalc.md).

## Title

A show, a game, a manga, a movie… in Readability.

A title is a folder with one or more files: `.srt` and `.ass` subtitles, `.txt` text, game scripts.

## Corpus

A corpus file (`.corpusdb`) holds the words of a medium (Anime, Game, Manga, Movie, TV, VN), already counted from the original files.

When you analyze, MorphMan reads the corpus instead of going through every subtitle or text file again. It saves a lot of time.

## Known Instances %

How much of a title you understand now: the share of all the words in it, counting each time a word appears, that you know.

At 90 % you meet about one word you don't know per sentence. At 98 %, almost none.

## Coverage

How many new words you need to reach a given Known Instances % (80, 85, 90, 95 or 98 %), the most frequent first.

## To Learn and Reachable %

In the Readability results:

- **To Learn**: how many words you still need to reach your target on a title.
- **Reachable %**: what you'd understand once you know them.

## Difficulty Score

How hard a title is, from 1 (easy) to 10 (hard). It is the same for everyone, whatever you know.

## Master frequency list

One big list of Japanese words, the most common first. It is used to rank words, and to choose the most useful ones to learn.

## learning_order.txt

Your own list of words to learn, in order. MorphMan uses it to sort your new cards. See [learning_order.txt and the Master list](usage/learning-order.md).

## Known database (known.db)

The list of words MorphMan thinks you know.

You can load a ready-made one (Genki, Tango, WaniKani level…) to start with the words you already studied elsewhere. See [Database Manager](usage/database-manager.md).

## Done and Excluded

In Readability, you can mark a file:

- **Done**: you watched, played or read it.
- **Excluded**: left out of the analysis completely.

## Jitendex

The Japanese–English dictionary that comes with the add-on. It gives the meaning of the words in Words to learn and on the cards you add.
