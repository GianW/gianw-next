---
title: Breaking The Ice With RegeX
date: '2017-09-23T00:10:03.284Z'
description: Regular Expressions course from CodeSchool
tags: ['RegeX']
seo: ['Regex']
lang: 'en'
---

## Content

- [Simple validation](#simple-validation)
- [The String check](#string-check)
- [Crew emails](#crew-emails)
- [Confirmative](#confirmative)
- [Multi Line String](#multi-line-string)
- [Capture Groups](#capture-groups)
- [Glossary](#glossary)

# What is

This is my anotations and insigts during the course "Breaking The Ice With Regular Expressions" from CodeSchool

<a name="simple-validation"></a>

# Simple validation

During this course we will use this format:

```
chars.match( /regular expression/ )

/* chars id the Subject String */

```

Imagine we run a website that asks people to enter their Orlando-area
phone number to receive local restaurant oﬀers.

```
/*First 3 numbers have to be either 407 or 321 (Orlando area code)*/

407-555-1212

/*Next, there could be a dash, but it’s optional*/
```

```
  chars.match(/407/)
  /* Literally matches the character 407 */

  /* Pipe operator is like a OR */
  chars.match(/407|321/)

  /*Validations test first the left sentence*/

```

Common uses include: Validations and Searching

<a name="string-check"></a>

## The String Check

Problem: We Need to Repeat the “R”

Regular Expression: /ar/

ar -> This works <br>
arr -> This is a partial match <br>
arrrr -> This is a partial match <br>

Regular expressions look for matches anywhere in their subject

Matches "r" 1 or more times until no longer matched
Regular Expression: `/ar+/`

<b>`+`</b> -> quantifier, This means, “Look for the previous character 1 or more times.”

Matching on Multiple Versions of Names

Regular Expression

```
/smitty|james|ar+/

Matches with: james AND jameson

```

Regex look for matches anywhere in theis subject and take the left-most watch first

<p>Matching All Characters in the Alphabet Using Ranges</p>

```ruby
Start and end range
[a-z]

A range only works in a character set
This character set represents 1 character

```

```regex

Check 6 characters from a to z
/[a-z][a-z][a-z][a-z][a-z][a-z]/

/[a-z]+/

Check the Regex for only letters word

/[a-zA-Z]+/
From a to z considering captal letters too


/[a-z]+/i -> Letters after final slash are called "modifiers"

The i modifier means "case insensitive"

```

Subject "Captain hook"

Problem: not matching white space

```regex
/Captain\shook/

/*  \s -> a whitespace character */
```

Whitespace can include:

Spaces, Tabs and New lines

```javascript
The order dosen't matter here
[\sa-z]+
is the same of this
[a-z\s]+/i
```

From a to z, 0 to 9 whitespace for 1 or more times

```css
/[a-z0-9\s]+/i
```

Refactoring With the Word Metacharacter

<b>\w</b> is the same as <b>[a-zA-Z0-9]</b>

> /[a-z0-9\s]+/i

These have the same result,
but the shortcut is easier to read.

> /[\w\s]+/

<hr />

<a name="crew-emails"></a>

## Crew Emails

Subject

> sara@example.com

Regular Expression

> /\w@\w/

Remember: <b>\w</b> only searchs for 1-word-like character.

Regular Expression

> /\w+@\w+/

<b>+</b> Solve the char repetition but still don't match because the "."
is not a word.

Regular Expression

> /\w+@\w+.\w+/

But still there's a problem, an exclamation point will match here

Subject

> sara@example!com

The "." is a wildcard that matches any character except new line

Escape the "." with a backslash to match a literal period

> \.

using backslash we can scape special characteres

Regular Expression

> /\w+@\w+\.\w+/

Example:

<table>
  <tr>
    <td>+</td>
    <td>Matches a character 1 or more times</td>
  </tr>
  <tr>
    <td>\+</td>
    <td>Matches literal “+” character</td>
  </tr>
  <tr>
    <td>.</td>
    <td>Matches any character except newline</td>
  </tr>
  <tr>
    <td>\.</td>
    <td>Matches literal “.” character</td>
  </tr>
<table>

Regular Expression

```javascript
/\w+@\w+\.(com|net|org|edu)/i

^ -> Start looking at the beginning of the subject

$ -> Stop looking at the end of the subject

/^learnbydoing$/

learnbydoing
```

Adding Anchors to Our Pattern

```javascript
;/^\w+@\w+\.(com|net|org|edu)$/i
```

<a name="conﬁrmative"></a>

## Conﬁrmative

Finding a list of accepted aswers keywords

<table style="border: 1px solid gray;">
  <tr>
    <td>ok</td>
  </tr>
  <tr>
    <td>Okay</td>
  </tr>
  <tr>
    <td>sure</td>
  </tr>
  <tr>
    <td>yes</td>
  </tr>
  <tr>
    <td>y</td>
  </tr>
<table>

Regular Expression
/ok/

Problem
Will get words like Okie

```
\b - Boudary character

Regular Expression
/\b\w+\b/g
- Will get separeted words

Regular Expression
/\bok\b/
- Will match only OK word
```

Now to match the word "Okay"

```
Regular Expression
/\bok\b|\bokay\b/
  - Wiil match ok OR okay

But if we have many diferent words?
```

If we had a way to make “ay” optional,
we could match with a single pattern.

? - Makes a character optional

```
Example:

Regular Expression
/pirate\s(ship)?/

Will match
  - pirate ship
  - pirate boat


Regular Expression
/\bok(ay)?\b/i

i - Cover upper and lowercase

Will match
  - ok
  - okay
```

To match the word "sure", "y" and "yes"

```
Regular Expression
  /\b(ok(ay)?|sure|y(es)?)\b/i
```

Second study case is to match there patterns goals <br />
does not contain numbers <br />
40 characters or less <br />
20 characters or more <br />

Text to test

> Work like a captain, play like a pirate. Keep calm and say Arr. Shiver me timbers matey. Why are pirates pirates? cuz they arr.

```
Regular Expression
/[a-z\s,]+/i
```

Will match this subject

> Work like a captain,

Same Regex can be written this way

```
/[^\d]+/i

^ - Means not, when placed within a character set
\d - Means any number

The pattern means: Anything that is not a number
```

```
Regular Expression
/^[^\d]+$/

^- First one used to anchor the beggning of subject
```

Even Shorter With Negated Shorthand Characters

<table style="border: 1px solid gray;">
  <tr >
    <td><b>[^\d]</b></td>
    <td>Is the same as</td>
    <td><b>\D</b></td>
    <td>match every character except numbers</td>
  </tr>
  <tr>
    <td><b>[^\s]</b></td>
    <td>Is the same as</td>
    <td><b>\S</b></td>
    <td>match every character except whitespace</td>
  </tr>
  <tr>
    <td><b>[^\w]</b></td>
    <td>Is the same as</td>
    <td><b>\W</b></td>
    <td>match every character except words</td>
  </tr>
<table>

```
Regular Expression
/^\D+$/

Will match all text, but we still want a character number limitation
```

Matching a Speciﬁc Number of Times With Interval Expressions

```
RegeX
  /[a-z]{2}/

Matches any char from A-Z exactly 2 times

RegeX
  /[a-z]{1,3}/

1 - Matches at least this amount
3 - Matches at most this amount
```

Returnig to our goal

```
Regular Expression
  /^\D{20,40}$/
```

<hr />

<a name="multi-line-string"></a>

# Multi-line Strings

Finding More Than Just 1 Match, We want to find all the birds

> King penguin
> Emperor penguin
> Wandering albatross
> Arctic Tern
> Rockhopper Penguin
> Weddell seal
> Narwhal

Multiline strings are delimited by
the newline character

```
\n

WARNING!
 Different OS might use other newline chat
```

Observations:
Has multiple lines separated by newline characters <br />
Each animal name is 1-2 words <br />
All animal names have mixed casing <br />

```
Regular Expression
  /penguin/ig

Will match all time with global modidentifier


Regular Expression
    /\w+\spenguin/ig
    - Matching the Full Name of Just Penguin Animals

Regular Expression
    /^\w+\spenguin$/mig

^ - Anchor to beggining of line not entire subject
$ - Anchors to end of line not entire subject
m - multiline identifier


RegeX
    /^\w+\s(penguin|albatross|tern)$/mig
```

<a name="capture-groups"></a>

<hr />

# Capture Groups

Subject

> 1 Reindeer Lane, North Pole, AK 99705
> 120 East 4th Street, Juneau, AK 99705

```
Regular Expression
  \d+\s[\w\s]+\w{4,6},\s

Get This
  1 Reindeer Lane,

- Some numbers and 2 words followed by a comma and space


Regular Expression
  [\w\s]+,\s

Get this
  North Pole,

- City name and any number of chars followed by a comma and space

Regular Expression
  \w{2}\s

Get this
  AK

- 2 letter state followed by a space

Regular Expression
  \d{5}

Get this
  99705

- Zip code is completely matched
```

```
Regular Expression
  /^\d+\s[\w\s]+\w{4,6},\s[\w\s]+,\s\w{2}\s\d{5}$/ig

^ - Anchor to beginning the subject
$ - Anchor to end of subject

Possible Subjects
  1 Reindeer Lane, North Pole, AK 99705
```

Final solution usingo groups `()`of validations

```
Regular Expression
  /^(\d+\s[\w\s]+(?:street|lane)),\s([\w\s]+),\s(\w{2})\s(\d{5})$/i

Possible Subjects
  1 Reindeer Lane, North Pole, AK 99705
```

Match Groups

1. 1 Reindeer Lane
2. North Pole
3. AK
4. 99705

Code generated during this class

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/GianW/embed/bGQeobR?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GianW/pen/bGQeobR">
  Untitled</a> by Gian (<a href="https://codepen.io/GianW">@GianW</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<a name="glossary"></a>

<hr />

# Glossary

<table className='markdown content'>
  <tr>
    <td><b>^</b></td>
    <td>-></td>
    <td>Start looking at the beggining of the subject</td>
  </tr>
  <tr>
    <td><b>$</b></td>
    <td>-></td>
    <td>Stop looking at the end of the subject</td>
  </tr>
  <tr>
    <td><b>\b</b></td>
    <td>-></td>
    <td>Whole words only</td>
  </tr>
  <tr>
    <td><b>\d</b></td>
    <td>-></td>
    <td>Any number</td>
  </tr>
    <tr>
    <td><b>\D</b></td>
    <td>-></td>
    <td>Uppercase means the opposite</td>
  </tr>
  <tr>
    <td><b>\s</b></td>
    <td>-></td>
    <td>White space</td>
  </tr>
  <tr>
    <td><b>\w</b></td>
    <td>-></td>
    <td>Only char</td>
  </tr>
  <tr>
    <td><b>\w+</b></td>
    <td>-></td>
    <td>Char repetition</td>
  </tr>
  <tr>
    <td><b>.</b></td>
    <td>-></td>
    <td>Accepts any char, exceptnew line</td>
  </tr>
  <tr>
    <td><b>\.</b></td>
    <td>-></td>
    <td>Char dot (escaped)</td>
  </tr>
  <tr>
    <td><b>+</b></td>
    <td>-></td>
    <td>Matches 1 or more times</td>
  </tr>
  <tr>
    <td><b>\+</b></td>
    <td>-></td>
    <td>Plus simble</td>
  </tr>
  <tr>
    <td><b>?</b></td>
    <td>-></td>
    <td>Make proceding pattern optional</td>
  </tr>
</table>
