# Study Plan

## The idea

You want to read a show, a game, a book. Which words should you learn first?

The ones you'll meet the most. MorphMan writes them, in order, in `learning_order.txt`. At the next Recalc, the cards that teach these words come first.

## Master Frequency List

A list of words, the most frequent first. MorphMan comes with one: `Master_All.txt`. See [Readability Files](../readability-files.md).

- **Select**: use another list. It must look like an `instance_freq_report.txt` file.
- **Open**: look at the ranks and counts.

## Rank limit

Only the words ranked at or below this number count in **To Learn**, and so in `learning_order.txt`. 0 = no limit.

For example, 5000: only the 5000 most common words. You skip the rare words of a title.

## Target readability

The % **To Learn** aims for, on each title. 95 % by default.

Two options, only with a rank limit:

- **Always reach the target**: adds words beyond the rank limit if needed. The words within the limit still come first.
- **Always include every word within the rank limit**: even when that goes past the target.

With the Study Plan on, Results shows **To Learn** and **Reachable %** for each title. See [Readability](../tables/results.md).

## Words Learning Order

The order of the words in `learning_order.txt`:

- **Master list**: all the words together, the most frequent in the master list first. Words not in it are left out.
- **Results order**: title by title, in the order of the Results table.
- **A → Z**: title by title, by name. Episode 2 comes before episode 10.

Title by title, the words of a title come the most frequent first. A word already given to an earlier title isn't repeated.

## Write learning_order.txt

Writes the To Learn words of the selected rows of Results. No selection: every row shown.

The file goes in your Output Directory. It takes effect at the next Recalc (Ctrl+M).
