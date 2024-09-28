---
title: Calculating inproviments
date: '2020-10-15T00:10:03.284Z'
description: Measuring and demonstrating improvements
tags: ['Web']
seo: ['web', 'performance']
lang: 'en'
---

A short reminder to myself about how to measure and demonstrate improvements in API performance, especially for non-technical people.

<hr>

There are many aspects of measuring performance improvements. While response time may not be the most precise metric, it’s easier to demonstrate.

* Collect the times before and after changes;
* Convert all times to milliseconds;
* Apply: percent = ((old_time - new_time) / old_time) * 100

Exemple: 
```
percent = ((2400 - 103) / 2400) * 100 
--> 95.70%
```
If you want to condense multiple results into a single percentage, you can calculate a simple average.
```
percent1 + percent2 + percent3 / 3
```
For a better result, you can use the weighted average.
```
percent X old_time = r
percent2 X old_time_2 = r

r + r = rr
old_time + old_time_2 = old_times

average = (rr / old_times) * 100
```





