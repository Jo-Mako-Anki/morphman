# Add Cards

In **Words to learn**, select the words you want, then click **Add to deck**.

No selection? Every word shown is added.

The cards come in the order of the table. Sorted by **Order**, they follow the text.

## The first time

MorphMan asks where the cards go and what they are.

Check **Remember**, and next time it's one click. To change the settings, click **▾** next to **Add to deck**.

**Save** keeps the settings without adding cards.

## Where

- **Add to a deck I have**: always the same deck.
- **A new deck for each title**: a prefix, then the name of the title. By default: `Vocab::` + the title.

## Cards

You have 2 choices.

### A sentence of my collection (default)

MorphMan looks for a card in your collection where the word is the only unknown one: a k+1 card. It copies that note, with its sound and picture, into the deck.

So you learn the word from a real sentence of an anime or a game.

No sentence for a word? It gets a vocab card instead.

MorphMan only looks in the cards counted in [Analyze Cards](../analyze-cards/identify-cards.md).

### Vocab cards only

A simple card for each word: word, reading, meaning and an example.

They use the **MorphMan Vocab** note type. MorphMan makes it the first time.

## Card choice

When several sentences have the word, which one is copied?

The criteria, in order. The first one decides, the next ones break the ties:

- **Same title as the list**: a sentence from the same title.
- **With audio**
- **With a picture**
- **Preferred source**: off by default. Text to find in the deck, the tags or a field of the card. For example `A_` for your anime cards, `G_` for your games.
- **Mature cards first**
- **Length**

Uncheck a criterion to turn it off. Move it with **↑** and **↓**.

Options:

- **k+1 only**: on by default. Off: a sentence with 2 unknown words when there is no k+1 one.
- **At least … words**: shorter sentences are never taken. 7 by default.
- **Length**: **The shortest**, or **The closest to** a number of words.

## Tags

- **The title**: tags the cards with the name of the title, in lower case, with `_` for spaces.
- **More tags**: optional, separated by spaces.

## Already there

MorphMan never adds the same card twice. A sentence copied before is left out, even if you add the words again. So is a word that already has its vocab card.

The original card stays where it is. Only a copy goes into the new deck.

MorphMan tells you how many cards were added, and how many were already there.
