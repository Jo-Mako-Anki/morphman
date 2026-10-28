# FAQ and Troubleshooting

## MorphMan says MecabUnidic is missing

MorphMan needs the MecabUnidic add-on to cut Japanese into words. Go to **Settings > Parsing > Download and install**, then restart Anki.

If the download fails, install it by hand. See [Installation](installation.md#by-hand).

## Recalc says "No field to analyze is selected"

A line of **Analyze Cards > Identify Cards** has a note type but no field. Pick the field with the sentence, then Recalc again.

## My new cards are not sorted

- Is the line of your deck on **Reorder**? **Count Words** and **Modify** don't move the cards.
- Did you Recalc (Ctrl+M) since?

## A word I know counts as unknown

- Is the card with this word read by Recalc? Check its note type and field in [Analyze Cards](analyze-cards/identify-cards.md).
- Have you reviewed the card at least once?
- Spelling: with **Match the spelling** on, 言う and いう are two words. See [Setup > Parsing](setup.md#parsing).

You know it from somewhere else? Press **K** on its card while you study, or add the `mm_AK` tag.

## The Example column is empty

None of your cards has this word in a sentence long enough (Settings > Words to learn > Examples). Or Recalc was never run.

## "Show in text" is greyed out

The title was read from a corpus file (`.corpusdb`): its texts aren't on your computer. It works on your own files.

## "Create vocabulary lists" or "Save as Corpus File" is greyed out

MorphMan let go of the last analysis to free memory (the window was closed, or a new analysis started). Analyze again.

## A shortcut doesn't work

Another add-on may use the same keys. Change MorphMan's in **Settings > Keyboard Shortcuts**.

## I have the old MorphMan

Turn it off in **Tools > Add-ons**. The new one reads your old databases. See [Installation](installation.md#coming-from-the-old-morphman).

## Still stuck?

Ask on [Discord](https://discord.gg/J9Sw8jdkPY), or open an issue on [GitHub](https://github.com/Jo-Mako-Anki/morphman/issues).
