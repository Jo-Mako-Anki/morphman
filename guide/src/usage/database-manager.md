# Database Manager and known databases

## Your databases

MorphMan keeps your words in `.db` files, in your profile's `dbs` folder:

| File | What's in it |
|---|---|
| `all.db` | Every word of the cards read by Recalc. |
| `seen.db` | The words of the cards you've reviewed. |
| `known.db` | The words you know. |
| `mature.db` | The words you know well (21 days). |
| `priority.db` | Words you want to learn first. You make it. |
| `external.db` | Words you know from somewhere else. You make it. |
| `learning_order.txt` | The order to learn words. See [learning_order.txt](learning-order.md). |

Recalc makes the first four.

## Known databases

Already know words from a course or a textbook? MorphMan comes with known databases, in `Readability Files/Database`:

- Genki 1, Genki 1+2
- Tango 5, Tango 5+4
- WaniKani level 20, 40, 60
- Kaishi 1.5k
- Jo Mako Japanese Course

To use one, copy it into your `dbs` folder and rename it `external.db`. At each Recalc, MorphMan adds its words to the ones you know.

Want several? Merge them first with the Database Manager (**Union**), and save the result as `external.db`.

## Database Manager

**Tools > MorphMan > Database Manager** (Ctrl+D).

- **Browse for DB A**, **Browse for DB B**: open two databases.
- **A**: shows the words of A.
- **A-B**: the words of A that are not in B.
- **B-A**: the words of B that are not in A.
- **Symmetric Difference**: the words in only one of them.
- **Intersection**: the words in both.
- **Union**: the words of both, together.
- **Extract morphemes from file**: makes a database from a text file.
- **Save results to db**: saves what's shown as a new database.

For example, A = `known.db`, B = a known database of a course: **B-A** shows the words of the course you don't know yet.
