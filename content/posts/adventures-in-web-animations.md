---
title: Adventures in Web Animations
date: '2017-09-07T00:10:03.284Z'
description: Web animations course CodeSchool
tags: ['CSS']
seo: ['web', 'css', 'animations']
lang: 'en'
---
# What is

These are my annotations and insights from the course 'Adventures in Web Animations' by CodeSchool.

<hr>

## Content

- [Transitions](#transitions)
  - [Transitioning Color](#transitioning-color)
  - [Transitioning Postion](#transitioning-position)
  - [Transitioning Visibility](#transitioning-visibility)
- [Transforms](#transforms)
  - [Transforming Rotate](#transforming-rotate)
  - [Transforming Scale Translate](#transforming-scale-translate)
- [Keyframes](#keyframes)
  - [Creating and reusing](#creating-reusing)
  - [Multi steps keyframes](#multistep-keyframes)
  - [More Advanced Keyframe Animations](#more-advanced-keyframes)
- [SVG](#svg)
  - [Animating SVGs With CSS](#animating-svg)



<a name="transitions"></a>

# Transitions

<a name="transitioning-color"></a>

## Transitioning Color

Transitions cause changes to a property and take place over a period of time.

Transition recipe:

```
transition: |property| |duration|;
```

> The fastest transition easily seen by the human eye is `.256s`

The transition is added to the starting state.

```css
.btn {
  background-color: #00a0d6;
  transition: background-color 0.4s;
}
.btn:hover {
  background-color: #007da7;
  color: #e3e3e3;
}
```

You can transition multiple comma-separated properties

```css
transition: background-color 0.4s, color 0.4s;
```

Use the all keyword to transition every changing property.

```css
transition: all 0.4s;
/*Be careful, though, because any property
that can animate will animate.*/
```

Order is irrelevant as long as you have your duration number speciﬁed before the delay number.

```css
.btn {
  transition: <property> <duration> <timing-function> <delay>;
  /*
  property -> Defaults All
  timing-function -> Defaults ease
  delay -> Default to 0
  */
}

transition: all 0.4s ease 0;
/* Leave defaults out unless you need to change them */
transition: 0.4s;
```

All the our examples are without vendor preﬁxes, but you might need to include them.
Use a site like <a href='caniuse.com' target='_blank'>caniuse.com</a> to check browser support for preﬁxes.

```css
.btn {
  -webkit-transition: background-color 0.4s;
  -moz-transition: background-color 0.4s;
  -ms-transition: background-color 0.4s;
  -o-transition: background-color 0.4s;
  transition: background-color 0.4s;
}
```

<a name="transitioning-position"></a>

## Transitioning Position

Moving hidden content onto the screen is another common use for
transitions. This also adds personality and provides more info to
the user on hover.

exemple: Button with extra hidden content

> steps
>
> > 1. Create 2 inner spans to hold the current and additional information to be shown on button hover
> > 2. Style the initial and hover states of the button
> > 3. Create a transition between initial and hover states

```html
<section>
  <a href="#" class="btn buy-button">
    <span class="top content">Buy Now!</span>
    <span class="bottom content"> On Sale $59 </span>
  </a>
</section>
```

```css
/* Absolute” means “position me relative to my nearest positioned parent or document.” */
.btn {
  position: relative;
}
.content {
  position: absolute;
}
.top {
  top: 0;
}
.bottom {
  top: 100px;
}
```

Setting a New Position on Hover

<img src="https://res.cloudinary.com/duntsh1qv/image/upload/v1686883217/Blog/button_move_uc9czp.png" alt="Button text moviment" style="width:50%;"/>

```css
top {
  top: 0px;
}
.btn:hover .top {
  top: -100px;
}
/*
Move each span 100 pixels up
when button is hovered.
*/
.bottom {
  top: 100px;
}
.btn:hover .bottom {
  top: 0px;
}
```

Now we will transition both top and bottom position properties to
slide both content divs up.

Position is not on the list of animatable properties, so we transition top, bottom,
right, left, or all.

```css
.content {
  position: relative;
  transition: top 0.3s;
  /*Hiding Content Overﬂowing the Button*/
  overflow: hidden;
}
```

<a name="transitioning-visibility"></a>

## Transitioning Visibility

Setting the Initial and Active Modal Styles

```css
/*Initial Modal State: Hidden*/
.modal,
.modal-overlay {
  visibility: hidden;
  opacity: 0;
}
/*Active Modal State: Visible*/
.modal.active,
.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}
/*.active class is added when
the button is clicked*/
```

Not All Properties Can Be Transitioned

```css
/* when transitioning, use these instead of display */
opacity: 0; /* Hides element still takes up same width/height. */
visibility: hidden; /* Makes element transparent to click events */

/* X */
display: none; /*Removes element from DOM — does not transition.*/
```

On button click, the form and overlay don’t simply appear, but
transition in nicely!

But why is it disappearing right
away? What happened to the
fade out?

```css
.modal,
.modal-overlay {
  visibility: hidden;
  opacity: 0;
  transition: opacity .5s;
}.
```

Visibility Is Not Transitioning Out

```css
.modal,
.modal-overlay {
  visibility: hidden;
  opacity: 0;
  transition: all .5s;
}.
```

<table>
  <tr>
    <th></th>
    <th>Start state |</th>
    <th>transitioning |</th>
    <th>end state</th>
  </tr>
  <tr>
    <td><b>Opacity</b></td>
    <td>0</td>
    <td>0.5</td>
    <td>1</td>
  <tr>
  <tr>
    <td><b>Display</b></td>
    <td>None</td>
    <td>??</td>
    <td>Block</td>
  <tr>
<table>

list of properties that can be transitioned: <a href='https://www.w3.org/TR/css-transitions-1/#properties-from-css' target='_blank'>W3.org</a>

<hr />

<a name="transforms"></a>

# Transforms

<a name="transforming-rotate"></a>

## Transforming Rotate

CSS transforms let you modify elements in their coordinate space.
They can be rotated, translated, scaled, and skewed.

<img src="https://res.cloudinary.com/duntsh1qv/image/upload/v1686962188/Blog/css-transform_l5dtsu.png" alt="Button text moviment" style="width:70%;"/>

The transformation is jumping from the start
state immediately to the end state.

```css
.modal-close {
  font-size: 200%;
  right: 15px;
  top: 0;
  position: absolute;
  /*
  Adding transition: transform will allow us
  to see the icon changing state over time:
  */
  transition: transform 4s;
}

.modal-close:hover {
  transform: rotate(360deg);
}

/*Rotate takes any number value with “deg” or “turn” unit suﬃx.*/
transform: rotate(1turn);
```

```
transition: transform 4s ease-out;
```

Default timing function is ease.

Timing Functions

> ease
> linear
> ease-in
> ease-out
> initial
> inherit
> ease-in-out
> cubic-bezier

<a name="transforming-scale-translate"></a>

## Transforming Scale and Translate

Creating Interactivity With Inputs
Form inputs are an excellent use of animations on the web.

We want the initial state of our label to
provide information as a text placeholder.

On input:focus, we want the label to
slide up and scale down, becoming
your average label for an input.

```css
.form-input + .form-label {
  position: relative;
  padding: 0 1em;
  color: #6a7989;
  transition: color 0.3s;
}
/*
+ -> Only select the ﬁrst
label after each input
*/
.form-input:focus + .form-label {
  color: #333333;
}
```

<b>Scale</b>.: to stretch an element based on the value multiplier

> If only 1 value is provided, it will scale the element in both directions by that value.

<img src="https://res.cloudinary.com/duntsh1qv/image/upload/v1686964922/Blog/css-scale_u4pakz.png" alt="Button text moviment" style="width:70%;"/>

```css
/*You can also specify the X and the Y separately:*/
transform: scaleX(value);
transform: scaleY(value);

transform: scale(0.8); /*caling down to 80% of its original size   */
```

When you scale something down, it still maintains its original box
model size.

```css
transform-origin: center center;
y origin and x origin
```

<b>What Is Translation?</b>
Translate simply means to move something.

Moving the Label Up With TranslateY
On input:focus, the label of the input should move up out of the way.

```css
transform: scale(0.8) translateY(-40px);
```

The result of this section:

<iframe height="300" style="width: 100%;" scrolling="no" title="CSS Transition" src="https://codepen.io/GianW/embed/vYQLMXY?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GianW/pen/vYQLMXY">
  CSS Transition</a> by Gian (<a href="https://codepen.io/GianW">@GianW</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<hr />

<a name="keyframes"></a>

# Keyframes

<a name="creating-reusing"></a>

## Creating and Reusing Keyframes

A list of what should happen over the course of the animation —
which properties should change, how, and when.

<img src="https://res.cloudinary.com/duntsh1qv/image/upload/v1686967485/Blog/key-frame_epo608.png" alt="Button text moviment" style="width:70%;"/>

There are 2 parts to keyframe animations:

<b>1.</b> Create the Animation<br>
<b>2.</b> Assign the Animation

```css
@keyframes swing {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}

/*keyframe recipe*/

@keyframes <name-animation> {
  <step 1 > {
    <property>: <value>;
  }
  <step 2 > {
    <property>: <value>;
  }
}
/*Deﬁne steps of the animation*/
```

<b>from</b> is a shortcut for writing <b>0%</b>
<b>to</b> is a shortcut for writing <b>100%</b>

```css
.left-donut {
  animation: swing 2s 0s infinite ease;
  /*
  in order:
  swing -> Keyframe name
  duration
  delay
  iteration (how many times will run)
  timing function
  */
}
```

<a name="multistep-keyframes"></a>

## Multi-step Keyframes

Let’s add more than 2 steps to make the donut look more natural.

```css
@keyframes swing {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
```

If you have any duplicate
animation code you can condense the
duplicates to one
comma-separated line.

```css
@keyframes swing {
  0%,
  50%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}
```

<iframe height="300" style="width: 100%;" scrolling="no" title="CSS KeyFrames" src="https://codepen.io/GianW/embed/NWENXXj?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GianW/pen/NWENXXj">
  CSS KeyFrames</a> by Gian (<a href="https://codepen.io/GianW">@GianW</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<a name="more-advanced-keyframes"></a>

## More Advanced Keyframe Animations

Fading in the modal-overlay

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    visibility: hidden; /*start hidden*/
  }
  to {
    opacity: 1;
    visibility: visible; /*end visible*/
  }
}

.modal-overlay.active {
  animation: fadeIn .25s forwards;
}}

/*Fill-mode forwards is used to set the
animation’s ﬁnal state to the last speciﬁed step.*/

```

slideUp Keyframe for Entire Modal

```css
@keyframes slideUp {
  from {
    /* start low on the page */
    transform: translateY(400px);
  }
  to {
    /* end higher on the page */
    transform: translateY(-300px);
  }
}

.modal.active {
  animation: slideUp 0.65s 0.5s forwards;
}
```

When animating a single property, simply specify start/end state
and use a timing function to create the desired timing.

```css
/*custom cubic-bezier timing function*/
modal.active {
  animation: slideUp 0.65s 0.5s cubic-bezier(0.17, 0.89, 0.32, 1.28) forwards;
  /*cubic causes overshoot effec*/
}
```

<img src="https://res.cloudinary.com/duntsh1qv/image/upload/v1687097112/Blog/css-cubis-bezier_mwel2s.png" alt="Button text moviment" style="width:70%;"/>

<img src="https://res.cloudinary.com/duntsh1qv/image/upload/v1687097248/Blog/css-all-bezier_ji3efb.png" alt="Button text moviment" style="width:70%;"/>

Assign the fadeIn animation to our .active modal as well.

```css
.modal.active {
  animation: slideUp 0.65s 0.5s cubic-bezier(…) forwards, fadeIn 0.65s 0.5s
      forwards;
}
```

Finishing Form By Animating the Stuﬀ Inside

```css
@keyframes slideUpSmall {
  from {
    transform: translateY(80px);
  }
  to {
    transform: translateY(0);
  }
}

.modal-header h3 {
  animation: slideUpSmall 0.25s 0.75s forwards, fadeIn 0.25s 0.75s forwards;
}
.modal.active .form-field {
  animation: slideUpSmall 0.25s 0.8s forwards, fadeIn 0.25s 0.8s forwards;
}
```

<iframe height="300" style="width: 100%;" scrolling="no" title="CSS Transition and Transform" src="https://codepen.io/GianW/embed/vYQLMXY?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GianW/pen/vYQLMXY">
  CSS Transition and Transform</a> by Gian (<a href="https://codepen.io/GianW">@GianW</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<hr />

<a name="svg"></a>

# SVG

<a name="animating-svg"></a>

## Animating SVGs With CSS

SVG is a ﬁle format that contains vector-based images.

SVG can be dropped in your HTML ﬁle wherever you’re normally
loading PNG (or other) images.

We can access specific SVG tags with CSS selectors

```css
/* SVG uses fill instead of
background-color */
#icing-fill {
  fill: #dd3d93;
}
```

And also we can animate it now

```css
@keyframes darken {
  0% {
    fill: #fca9b7;
  }
  100% {
    fill: #dd3d93;
  }
}
#icing-fill {
  animation: darken 3s infinite;
}
```

SVG has some unique CSS properties that can be animated.

<table>
  <tr><td>
    enable-background
  </td></tr>
  <tr>
    <td>fill</td>
  </tr>
<tr><td>
fill-opacity
</td></tr>
<tr><td>
filter
</td></tr>
<tr><td>
mask
</td></tr>
<tr><td>
stroke
</td></tr>
<tr><td>
stroke-dasharray
</td></tr>
<tr><td>
stroke-dashoffset
</td></tr>
<tr><td>
viewport-fill
</td></tr>
<tr><td>
viewport-fill-opacity
</td></tr>
</table>

Check out MDN for the full list of SVG properties.
<a href='https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute#presentation_attributes'>MDN Docs</a>

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/GianW/embed/YzRqowY?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GianW/pen/YzRqowY">
  Untitled</a> by Gian (<a href="https://codepen.io/GianW">@GianW</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
