# Installation

## 1. Install MorphMan

Two ways:

- **From [AnkiWeb](https://ankiweb.net/shared/info/73983788)**: in Anki, **Tools > Add-ons > Get Add-ons…**, then enter the code `73983788`.
- **From GitHub**: download the latest `.ankiaddon` file from the [releases](https://github.com/Jo-Mako-Anki/morphman/releases). Double-click it, or use **Tools > Add-ons > Install from file…**

Restart Anki.

MorphMan works with Anki 2.1.50 and later.

## 2. Install the dictionary (MecabUnidic)

MorphMan cuts Japanese into words with MeCab and the UniDic 3.1.0 dictionary. UniDic is about 500 MB: too big for AnkiWeb. So it's an add-on of its own: **MecabUnidic**.

When you start Anki, MorphMan asks to download and install it for you. Click **Yes**.

A window shows the progress, with MorphMan in a few slides. You can keep using Anki. Closing the window doesn't stop the download.

![Download window](img/install_download.png)

When it's done, restart Anki.

### If you said no

MorphMan asks again at each start, until you check **Don't ask again**.

You can also do it later: **Tools > MorphMan > Settings > Parsing > Download and install**.

### By hand

If the download fails:

1. Download `MecabUnidic3.1.0.ankiaddon` from [its GitHub page](https://github.com/ianki/MecabUnidic/releases/tag/v3.1.0).
2. Double-click the file, or **Tools > Add-ons > Install from file…**
3. Restart Anki.

**Settings > Parsing** tells you if MecabUnidic is installed.

## Coming from the old MorphMan?

Turn the old MorphMan off in **Tools > Add-ons**. The two can't run together.

Your databases (known words, `priority.db`, `external.db`…) are in your profile's `dbs` folder. The new version reads them as they are.

## Next

Tell MorphMan which cards to read: [Analyze Cards](usage/analyze-cards.md).
