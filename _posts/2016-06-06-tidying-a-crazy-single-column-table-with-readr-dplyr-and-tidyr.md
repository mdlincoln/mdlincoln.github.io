---
layout: "post"
title: "Tidying a crazy single-column table with readr, dplyr, and tidyr"
date: "2016-06-06 13:54"
comments: true
tags:
  - Data
  - R
aside: |
  These data powered a paper (co-authored with Abram Fox) on the [seasonal structure of the London art auction](/2016/11/28/temporal-dimensions.html), published with _British Art Studies_ in late 2016.
---

Subtitle: How Hadley Wickham saved me from an insane data dump.

{% include figure.html src="http://i.giphy.com/FamIJtZ8GDVRu.gif" caption="You never have to work alone when you work with R." %}

[tidyr]: https://github.com/hadley/tidyr
[dplyr]: https://github.com/hadley/dplyr
[readr]: https://github.com/hadley/readr

Working with old databases means working with truly odd data dumps.
One of the strangest I ever got was from [a database of more than one million historical art auctions dating back to the seventeenth century](http://www.getty.edu/research/tools/provenance/).
I was sent one text file of almost 10 million lines that looked like this:

```txt
--RECORD NUMBER--1
BBF Number       2983
Edit Status      Unedited
Lot Sale Date    1827/06/01
Sale Begin Date  1827/06/01
Auct.House Auth. Stanley (G.)
Lot Number       0068
Verbatim Artist  Paolo Veronese
Verbatim Artist  Carlo Veronese
Verbatim Artist  Gabriel Veronese
Verbatim Artist  Benito Veronese
Title            The Baptism of Christ by St. John.
Verbatim Seller  Count Altamira
Transaction      Sold
Price            52.10 |c £
Verbatim Buyer   Hume
--RECORD NUMBER--2
BBF Number       14756
...
```
{% include figure.html src="http://i.giphy.com/lXeFeHSbPeWUE.gif" caption="MFW such a file appears in my inbox." %}

What should be a table with more than a dozen columns (in fact, what should be several _relational_ tables) is instead one hulking, massive blob of text.

Quick, to the Hadleyverse!

{% include figure.html src="http://i.giphy.com/13rnR33QYk7sze.gif" caption="`R version 3.3.0 (2016-05-03) -- 'Supposedly Educational'`" %}

```r
library(readr)
library(dplyr)
library(tidyr)
```

1. [readr] - Reads obstreperously large files very fast.
2. [dplyr] - Insanely easy data table filtering, mutating, grouping, and summarizing.
3. [tidyr] - Got rows that should be columns? Columns that should be rows? [tidyr] can handle that.

## Get the file into R

Loading in this file is easy enough with readr's `read_lines`.
This reads the entire file as a character vector, with one line per slot in the vector.
I'll wrap this vector inside a dataframe to essentially create a one-column table that we can then manipulate with [dplyr] and [tidyr].

```r
dump <- read_lines("dump.txt")
one_col <- data_frame(text = dump)
```

## Turn it into a table... of sorts

With this file read in, we need to figure out a way to extract the part of each line that describes a variable _name_ from the text in the line that is the _value_ of that variable.
Luckily, the file has very consistent formatting: the first 17 characters of each line describe the variable name, while the remainder contain its value.

```txt
0000000001111111111222222...
1234567890123456789012345...
================><=======...
--RECORD NUMBER--1
BBF Number       2983
Edit Status      Unedited
...
```

[tidyr]'s function `separate` lets us split this single column into two columns, either by specifying a particular character value to use as a delimiter, or by use of a character _position_.
While we're at it, let's trim any extraneous whitespace from either column.

```r
sales <- one_col %>%
  # Split the single column of text into two cols: variable and value
  separate(text, into = c("variable", "value"), sep = 17) %>%
  # Trim any whitespace from either column
  mutate(variable = str_trim(variable), value = str_trim(value))
```

| variable          | value                              |
|-------------------|------------------------------------|
| --RECORD NUMBER-- | 1                                  |
| BBF Number        | 2983                               |
| Edit Status       | Unedited                           |
| Lot Sale Date     | 1827/06/01                         |
| Sale Begin Date   | 1827/06/01                         |
| Auct.House Auth.  | Stanley (G.)                       |
| Lot Number        | 0068                               |
| Verbatim Artist   | Paolo Veronese                     |
| Verbatim Artist   | Carlo Veronese                     |
| Verbatim Artist   | Gabriel Veronese                   |
| Verbatim Artist   | Benito Veronese                    |
| Title             | The Baptism of Christ by St. John. |
| Verbatim Seller   | Count Altamira                     |
| Transaction       | Sold                               |
| Price             | 52.10 \|c £                        |
| Verbatim Buyer    | Hume                               |
| --RECORD NUMBER-- | 2                                  |
| BBF Number        | 14756                              |
| ...    | ...               | ... |

OK, getting better.

## Group data about the same records together

But how can we associate the proper record number with each row when each record may have a different number of rows (e.g. only one `Verbatim Artist` entry instead of four)?
[dplyr]'s `cumsum`, or cumulative sum, function is useful here.

```r
base_sales <- one_col %>%
  # Split the single column of text into two cols: variable and value
  separate(text, into = c("variable", "value"), sep = 17) %>%
  # Trim any whitespace from either column
  mutate(variable = str_trim(variable), value = str_trim(value)) %>%
  # To group a set of rows with a particular object, create an id column that
  # increments +1 each time it hits a "--RECORD NUMBER--" row
  mutate(objnum = cumsum(variable == "--RECORD NUMBER--"))
```

Any time that the value in `variable` is `--RECORD NUMBER--`, (aka `variable == "--RECORD NUMBER--"`), `cumsum` will increment the value in its column by one, effectively assigning the proper number to each group of record entries.

| variable          | value                              | objnum |
|-------------------|------------------------------------|--------|
| --RECORD NUMBER-- | 1                                  | 1      |
| BBF Number        | 2983                               | 1      |
| Edit Status       | Unedited                           | 1      |
| Lot Sale Date     | 1827/06/01                         | 1      |
| Sale Begin Date   | 1827/06/01                         | 1      |
| Auct.House Auth.  | Stanley (G.)                       | 1      |
| Lot Number        | 0068                               | 1      |
| Verbatim Artist   | Paolo Veronese                     | 1      |
| Verbatim Artist   | Carlo Veronese                     | 1      |
| Verbatim Artist   | Gabriel Veronese                   | 1      |
| Verbatim Artist   | Benito Veronese                    | 1      |
| Title             | The Baptism of Christ by St. John. | 1      |
| Verbatim Seller   | Count Altamira                     | 1      |
| Transaction       | Sold                               | 1      |
| Price             | 52.10 \|c £                        | 1      |
| Verbatim Buyer    | Hume                               | 1      |
| --RECORD NUMBER-- | 2                                  | 2      |
| BBF Number        | 14756                              | 2      |
| ...    | ...               | ... |


Another wrinkle is dealing with the multiple entries for `Verbatim Artist` in this record.
I want to condense these multiple values into one field so that every object record can be described in just one row of the final table.
We'll use `group_by` and `summarize` to collect all the data in the `value` column for each unique pairing of `variable` and `objnum`.

```r
base_sales <- one_col %>%
  # Split the single column of text into two cols: variable and value
  separate(text, into = c("variable", "value"), sep = 17) %>%
  # Trim any whitespace from either column
  mutate(variable = str_trim(variable), value = str_trim(value)) %>%
  # To group a set of rows with a particular object, create an id column that
  # increments +1 each time it hits a "--RECORD NUMBER--" row
  mutate(objnum = cumsum(variable == "--RECORD NUMBER--")) %>%
  # If any fields occur multiple times in the same record, we will collapse them
  # in to one field, delimited with a semicolon
  group_by(objnum, variable) %>%
  summarize(value = paste(sort(unique(value)), collapse = "; "))
```

For most variables (like `BBF Number`), there will only be one value per `variable`/`objnum` combination.
However, for fields like `Verbatim Artist` we may have multiple values of `value`.
`summarize` takes these values and condenses them using `paste(sort(unique(value)), collapse = "; ")`.
This:

1. Keeps unique values
2. Sorts them alphabetically
3. And "collapses" them together, using a semicolon as a delimiter.

| objnum | variable          | value                                                             |
|--------|-------------------|-------------------------------------------------------------------|
| 1      | --RECORD NUMBER-- | 1                                                                 |
| 1      | Auct.House Auth.  | Stanley (G.)                                                      |
| 1      | BBF Number        | 2983                                                              |
| 1      | Edit Status       | Unedited                                                          |
| 1      | Lot Number        | 0068                                                              |
| 1      | Lot Sale Date     | 1827/06/01                                                        |
| 1      | Price             | 52.10 \|c £                                                       |
| 1      | Sale Begin Date   | 1827/06/01                                                        |
| 1      | Title             | The Baptism of Christ by St. John.                                |
| 1      | Transaction       | Sold                                                              |
| 1      | Verbatim Artist   | Benito Veronese; Carlo Veronese; Gabriel Veronese; Paolo Veronese |
| 1      | Verbatim Buyer    | Hume                                                              |
| 1      | Verbatim Seller   | Count Altamira                                                    |
| 2      | --RECORD NUMBER-- | 2                                                                 |
| 2      | BBF Number        | 14756                                                             |
| 2    | ...               | ... |

## One row per observation, one column per variable

Finally, we get to the best part: converting these rows into columns using [tidyr]'s `spread` command.

{% include figure.html src="http://i.giphy.com/KE8usNZpBCmc.gif" caption="My general feelings about `spread`" %}

This takes the name of a column that holds values to be turned into column names, and a column that holds the values those columns should hold.
For good measure, I use `select` at the end of this pipeline to rename the resulting columns into easier-to-type names:

```r
base_sales <- one_col %>%
  # Split the single column of text into two cols: variable and value
  separate(text, into = c("variable", "value"), sep = 17) %>%
  # Trim any whitespace from either column
  mutate(variable = str_trim(variable), value = str_trim(value)) %>%
  # To group a set of rows with a particular object, create an id column that
  # increments +1 each time it hits a "--RECORD NUMBER--" row
  mutate(objnum = cumsum(variable == "--RECORD NUMBER--")) %>%
  # If any fields occur multiple times in the same record, we will collapse them
  # in to one field, delimited with a semicolon
  group_by(objnum, variable) %>%
  summarize(value = paste(sort(unique(value)), collapse = "; ")) %>%
  # Now spread() the table into one column per variable, and one row per observation
  spread(variable, value) %>%
  # And rename column variables to be more standardized
  select(
    cat_no = `BBF Number`,
    lot_no = `Lot Number`,
    auction_house = `Auct.House Auth.`,
    is_edited = `Edit Status`,
    sale_date = `Lot Sale Date`,
    sale_begin = `Sale Begin Date`,
    sale_end = `Sale End Date`,
    transaction_type = Transaction,
    transaction = Price,
    artists = `Verbatim Artist`,
    title = `Title`,
    sellers = `Verbatim Seller`,
    buyers = `Verbatim Buyer`)
```

| objnum|cat_no |lot_no |auction_house |is_edited |sale_date  |sale_begin |transaction_type |transaction     |artists                                                           |title                              |sellers        |buyers |
|------:|:------|:------|:-------------|:---------|:----------|:----------|:----------------|:---------------|:-----------------------------------------------------------------|:----------------------------------|:--------------|:------|
|      1|2983   |0068   |Stanley (G.)  |Unedited  |1827/06/01 |1827/06/01 |Sold             |52.10 &#124;c £ |Benito Veronese; Carlo Veronese; Gabriel Veronese; Paolo Veronese |The Baptism of Christ by St. John. |Count Altamira |Hume   |
|      2|14756  |...    |...           |...       |...        |...        |...              |...             |...                                                               |...                                |...            |...    |

Now that we've actually created a real table out of this mess of data, we can move on to the real analytical fun: parsing dates and currencies!

{% include figure.html src="http://i.giphy.com/VxaH33bM2xXvW.gif" caption="I am so, so sorry for ending with this GIF." %}
