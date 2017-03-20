---
layout: post
date: 2017-03-20T16:14:43-07:00
title: R Closures and Currency Decimalization
---

Among other things, R is known for being a [functional](https://en.wikipedia.org/wiki/Functional_programming) language.

A delightful feature of functional languages are [closures](https://en.wikipedia.org/wiki/Closure_(computer_programming)): functions produced by functions. A great primer on closures in R, specifically, can be found in Hadley Wickham's [*Advanced R*](http://adv-r.had.co.nz/Functional-programming.html#closures). This post just tries to showcase a simple, real-world use case for closures: decimalizing currencies.

Currency woes
-------------

As part of the [Getty Provenance Index Remodel Project](http://www.getty.edu/provenance_remodel), I am working on decimalizing over 600,000 nominal monetary amounts from historical auctions.[^1]

    ## # A tibble: 3 × 1
    ##   amount
    ##    <chr>
    ## 1   1.15
    ## 2    1.2
    ## 3   1.30

If these were all sales in U.S. dollars, then the job would already be finished by just casting all those strings as numeric values:

    ## # A tibble: 3 × 2
    ##   amount decimalized
    ##    <chr>       <dbl>
    ## 1   1.15        1.15
    ## 2    1.2        1.20
    ## 3   1.30        1.30

But lo, the data we've *actually* got to deal with are in pounds sterling, reichsthalers, gulden, groshecn, écus, louis d'or, livres, Imperial ducats, and guineas - only some of which comprise subsidiary denominations of hundredths.

    ## # A tibble: 3 × 4
    ##   amount currency unit1 unit2
    ##    <chr>    <chr> <dbl> <dbl>
    ## 1   1.15  dollars     1    15
    ## 2    1.2   pounds     1     2
    ## 3   1.30   gulden     1    30

For example, pounds comprise 20 shillings, which in turn comprise 12 pence. To properly decimalize pounds to make them computationally tractable, I can't just call `as.numeric()`. I actually have to do some additional math:

``` r
# Wrong
as.numeric("1.15")
```

    ## [1] 1.15

``` r
# Right
1 + 15 / 20
```

    ## [1] 1.75

An if-then problem
------------------

At first glance, it's an if-then problem: if _this_ currency, then _that_ calculation to decimalize it.

``` r
primary <- 1
secondary <- 2
tertiary <- 0

currency <- "pounds"

if (currency == "dollars") {
  primary + secondary / 100
} else if (currency == "pounds") {
  primary + secondary / 20 + tertiary / (20 * 12)
} else if (currency == "gulden") {
  primary + secondary / 60
}
```

    ## [1] 1.1

This works, but there's a lot of repeated infrastructure: constantly repeating the similar pattern of primary + secondary + tertiary, with different combinations of divisors depending on the currency.

This is what closures were born for.

Above, I described closures as functions produced by functions. Another way to describe them is as functions that store bits of data. In our case, we want to implement the same function pattern with different subunit divisors - different data - for different currencies. To do this, we can write a function that takes those divisors as its arguments. Rather than returning a value, it will return another function - a *closure* - that incorporates those divisors, taking different parts of the monetary amount as its own arguments.

``` r
decimal_function <- function(divisor_2 = 1, divisor_3 = 1) {
  function(primary, secondary, tertiary) {
    primary + secondary / divisor_2 + tertiary / (divisor_2 * divisor_3)
  }
}
```

From this closure, we can produce currency-specific functions just by passing in those sub-unit divisors.[^2]

``` r
decimalize_dollars <- decimal_function(divisor_2 = 100)
decimalize_pounds <- decimal_function(divisor_2 = 20, divisor_3 = 12)
decimalize_gulden <- decimal_function(divisor_2 = 60)
```

Having created these new functions via the closure, we can now pass in the same values and see how different results come out:

``` r
decimalize_dollars(1, 15, 0)
```

    ## [1] 1.15

``` r
decimalize_pounds(1, 15, 0)
```

    ## [1] 1.75

``` r
decimalize_gulden(1, 15, 0)
```

    ## [1] 1.25

Let's finish the job by writing an overarching function that takes these monetary amount pieces and a currency name, and applies the appropriate decimalization function on the fly:

``` r
decimalize <- Vectorize(function(primary, secondary, tertiary, currency) {
  # switch() will assign a different function based on the identity of 'currency'
  decimalizer <- switch(currency,
                        "dollars" = decimalize_dollars,
                        "pounds" = decimalize_pounds,
                        "gulden" = decimalize_gulden)
  
  decimalizer(primary, secondary, tertiary)
})

mutate(curr, decimal = decimalize(primary = unit1, secondary = unit2, tertiary = 0, currency = currency))
```

    ## # A tibble: 3 × 5
    ##   amount currency unit1 unit2 decimal
    ##    <chr>    <chr> <dbl> <dbl>   <dbl>
    ## 1   1.15  dollars     1    15    1.15
    ## 2    1.2   pounds     1     2    1.10
    ## 3   1.30   gulden     1    30    1.50

While this looks like a bit much to go through for dealing with just three currencies, isolating this kind of logic lets us expend more attention on control flow considerations (e.g., florins in the eighteenth-century Netherlands have a different number of sub-units than florins in the Holy Roman Empire) while keeping the code relatively parsimonious.

[^1]: In this post, I'll only be talking about decimalizing the *face value* of these amounts. This is only a prerequisite to do doing the currency conversion and deflation needed in order to do comparison of *real value* across time and place.

[^2]: Note that I supplied the default value of `1` to each divisor argument in `decimal_function`, so we aren't forced to explicitly set every divisor where it may not make sense, e.g. there is no tertiary subunit - at least in the context of these data - for dollars.
