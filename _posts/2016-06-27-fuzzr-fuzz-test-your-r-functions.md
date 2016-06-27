---
layout: "post"
title: "fuzzr: Fuzz-Test your R Functions"
date: "2016-06-27 16:59"
comments: true
tags:
- R
- Code
---

[fuzzr]: https://github.com/mdlincoln/fuzzr

I've just released a new package on CRAN: [fuzzr]

R's dynamic typing can be both blessing and curse.
One drawback is that a function author must decide how to check which inputs should be accepted, and which should throw warnings or errors.
[fuzzr] helps you to check how cleanly and informatively your function responds to a range of unexpected inputs.

Say we build a function intended to a single string and a single integer, repeat the string that number of times, and paste it together using a given delimiter:

```r
my_function <- function(x, n, delim = " - ") {
  paste(rep(x, n), collapse = delim)
}

my_function("fuzz", 7)
```

```
## [1] "fuzz - fuzz - fuzz - fuzz - fuzz - fuzz - fuzz"
```

Simple enough.
However, this function quickly breaks if we pass in somewhat unexpected values:


```r
my_function("fuzz", "bar")
```

```
## Warning in paste(rep(x, n), collapse = delim): NAs introduced by coercion
```

```
## Error in rep(x, n): invalid 'times' argument
```

Let's test this with a full battery of fuzz tests:


```r
library(fuzzr)
# Note that, while we are specifically fuzz testing the 'n' argument, we still 
# need to provide an 'x' argument to pass along to my_function(). We do not have
# to supply a delimiter, as my_function() declares a default value for this
# argument.
my_fuzz_results <- fuzz_function(my_function, "n", x = 1:3, tests = test_all(), test_delim = ";")

# Produce a data frame summary of the results
fuzz_df <- as.data.frame(my_fuzz_results)
knitr::kable(fuzz_df)
```



|n             |x      |output |messages |warnings |errors                                       |result_classes | results_index|
|:-------------|:------|:------|:--------|:--------|:--------------------------------------------|:--------------|-------------:|
|dbl_empty     |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             1|
|dbl_single    |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             2|
|dbl_mutliple  |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             3|
|dbl_with_na   |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             4|
|date_single   |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             5|
|date_multiple |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             6|
|date_with_na  |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             7|

Almost all the unexpected values for `n` throw the fairly generic warning `invalid 'times' argument`, which really comes from the `rep` function within `my_function`.
Some types, like doubles, factors, and even dates (!) don't throw errors, but instead return a result.
We can check the value of that result with `fuzz_value()`, and the call originating it with `fuzz_call()`:


```r
dbl_single_index <- fuzz_df[fuzz_df$n == "dbl_single", ]$results_index

fuzz_call(my_fuzz_results, dbl_single_index)
```

```
## $fun
## [1] "my_function"
## 
## $args
## $args$n
## [1] 1.5
## 
## $args$x
## [1] 1 2 3
```

```r
fuzz_value(my_fuzz_results, dbl_single_index)
```

```
## [1] "1 - 2 - 3"
```

```r
date_single_index <- fuzz_df[fuzz_df$n == "date_single", ]$results_index

fuzz_call(my_fuzz_results, date_single_index)
```

```
## $fun
## [1] "my_function"
## 
## $args
## $args$n
## [1] "2001-01-01"
## 
## $args$x
## [1] 1 2 3
```

```r
# Hm, dates can be coerced into very large integers. Let's see how long this
# result is.
nchar(fuzz_value(my_fuzz_results, date_single_index))
```

```
## [1] 135873
```

```r
# Oh dear.
```

Perhaps we might chose to enforce this with a tailored type check (using [assertthat](https://cran.r-project.org/package=assertthat)) that catches unexpected values and produces a more informative error message. 


```r
my_function_2 <- function(x, n, delim = " - ") {
  assertthat::assert_that(assertthat::is.count(n))
  paste(rep(x, n), collapse = delim)
}

# We will abbreviate this check by only testing against double and date vectors
fuzz_df_2 <- as.data.frame(fuzz_function(my_function_2, "n", x = "fuzz", 
                                         tests = c(test_dbl(), test_date())))

knitr::kable(fuzz_df_2)
```



|n             |x      |output |messages |warnings |errors                                       |result_classes | results_index|
|:-------------|:------|:------|:--------|:--------|:--------------------------------------------|:--------------|-------------:|
|dbl_empty     |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             1|
|dbl_single    |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             2|
|dbl_mutliple  |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             3|
|dbl_with_na   |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             4|
|date_single   |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             5|
|date_multiple |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             6|
|date_with_na  |"fuzz" |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             7|

## Fuzzing multiple arguments

`fuzz_function` works by mapping several test inputs over one argument of a function while keeping the other arguments static.
`p_fuzz_function` lets you specify a battery of tests for each variable as a named list of named lists.
Every test combination is then run.
These tests can be specified using the provided functions like `test_char`, or with variable inputs you provide.
Remember that each test condition must, itself, be named.


```r
p_args <- list(
  x = list(
    simple_char = "test",
    numbers = 1:3
  ),
  n = test_all(),
  delim = test_all())

pr <- p_fuzz_function(my_function_2, p_args)
prdf <- as.data.frame(pr)

knitr::kable(head(prdf))
```

|x           |n                 |delim      |output |messages |warnings |errors                                       |result_classes | results_index|
|:-----------|:-----------------|:----------|:------|:--------|:--------|:--------------------------------------------|:--------------|-------------:|
|simple_char |char_empty        |char_empty |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             1|
|numbers     |char_empty        |char_empty |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             2|
|simple_char |char_single       |char_empty |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             3|
|numbers     |char_single       |char_empty |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             4|
|simple_char |char_single_blank |char_empty |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             5|
|numbers     |char_single_blank |char_empty |NA     |NA       |NA       |n is not a count (a single positive integer) |NA             |             6|

Specifying multiple arguments can quickly compound the number of total test combinations to run, so `p_fuzz_function` will prompt the user to confirm running more than 500,000 tests at once.

## Suggestions?

Right now I only include tests for a number of common vector types, as well as some simple types of data frames.
Are there some interesting cases that you would like to see included in the package?
[Please add an issue, or contribute with a pull request!][fuzzr]
