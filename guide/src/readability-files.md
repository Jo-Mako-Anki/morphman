# Readability Files

MorphMan comes with a `Readability Files` folder, in the add-on folder. To open it: **Tools > Add-ons**, select MorphMan, then **View Files**.

| Folder | What's in it |
|---|---|
| `Corpus` | The premade corpora, one per category: Anime, Game, Manga, Movie, TV, VN. |
| `Master frequency lists` | `Master_All.txt`, the default Master Frequency List. |
| `Database` | Known databases of courses and textbooks. |
| `Google Sheet` | The title sheet: a deck link for each title. |
| `Analyze` | An example to try Custom Folders: the subtitles of Sousou no Frieren, episodes 1 to 28. |

## Corpus

Each category is one `.corpusdb` file: the titles, already analyzed. That's why Compare Media is fast. MorphMan doesn't read the texts again.

These are the checkboxes of **Compare Media**. Their folders are set in **Settings > Files > Corpus folders**.

## Your own files

What MorphMan can read with **Custom Folders** and **Custom Files**:

- subtitles: `.srt`, `.ass`
- text: `.txt` (a game script, a book, cells copied from Excel…)
- `.js` files
- corpus files: `.corpusdb`

Need Japanese subtitles? [Jimaku](https://jimaku.cc) has them for most anime.

### Keep a folder per title

MorphMan groups by folder. A good layout:

```
My Anime/
  Sousou no Frieren/
    Season 1/
      episode 01.srt
      episode 02.srt
```

With **Group Input by: Title**, you get one row for the show. With **Folder**, one row per season. With **File**, one row per episode.

### Make your own corpus

After an analysis, **Save as Corpus File** saves it as a `.corpusdb`. Next time, the analysis is instant.

Put it in a folder of **Settings > Files > Corpus folders** to see it in Compare Media.

## Anki Deck links

The **Anki Deck** column of Results gives a link to a ready-made deck for a title. They come from the title sheet, or from a `deck.url` file in the title's folder.

To add a link yourself, drag it from your web browser into the title's folder (Windows makes a `.url` file).
