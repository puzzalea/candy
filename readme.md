# [Candy](https://puzzalea.github.io/candy/)

v.1.1.0

[![Code Climate](https://codeclimate.com/github/puzzalea/candy/badges/gpa.svg)](https://codeclimate.com/github/puzzalea/candy)

## Introduction

Candy is a simple and sweet UI framework by [Puzzalea](https://github.com/puzzalea) (a.k.a. [Cara](https://github.com/caraheacock)).

Candy was first conceptualized as a framework for [Omaha Girls Who Code](https://github.com/OmahaGirlsWhoCode). We found that our students--generally between the ages of 12 to 18--were having trouble grasping more complex frameworks such as Bootstrap and Foundation, and as much as we love having them experiment and learning CSS on their own, we don't want them to get too distracted fussing with the frontend while we are also teaching them backend programming. Thus this framework was created as a starting point for them to add their own flair on top of it.

## Features

- Unlimited customizable colors with autogenerated utility classes for coloring backgrounds, text, etc.
- Very basic customization and styling for text
- _Very_ simple beginner's grid system for grasping the concepts of responsive design
- Styling for tables
- Reseting and styling for form elements -- inputs, buttons, selects, and textareas
- Utility classes for margin, padding, and borders
- Components such as buttons, menu, and accordions

## Setup

This library assumes that you know HTML and CSS. We'll delve into just a tiny bit of SASS. If you're struggling with the SASS parts, you can [check out their documentation here](http://sass-lang.com/guide).

1. Clone this repo.
1. Make sure you have SASS! This is a Ruby gem that is a preprocessor for CSS. Basically it lets you do fancier things than CSS alone, like use variables and functions. Install it through the command line:
    - `gem install sass`
1. Open `scss/candy.scss` in your text editor. You'll see instructions here for how to customize your fonts and colors. This lets you have classes like `.blue-background`, `.green-text`, `.pink-button`, etc. but based on whatever colors you list here.
1. To compile your SASS into regular CSS, change directories in command line to the `candy` directory and run the command below. This will `watch` the `scss` folder for changes to those files, and update the file in the `dist` folder (candy.css) with your updated CSS.
    - `sass --watch scss:dist --style expanded  --sourcemap=none`

If you want to add your own CSS beyond what Candy provides, you have a couple options:

- You can set your colors and fonts, and then include `dist/candy.css` in your project. Then create another CSS file where you write your custom code and include it _after_ the Candy file.
- If you're comfortable working in SASS, you can include Candy's SASS files with your own SASS files and compile them into one CSS sheet.

To make interactive elements work such as the navigation bar and accordions, you'll need `dist/candy.js` as well as some version of jQuery (Candy's JS is dependent on jQuery).

The code you include in the head of your webpage should look something like this:

```html
<!-- Candy CSS -->
<link rel="stylesheet" href="assets/dist/candy.css" type="text/css" media="all">

<!-- Optional custom CSS that you write -->
<link rel="stylesheet" href="assets/dist/my-custom-css-maybe.css" type="text/css" media="all">

<!-- jQuery -->
<script src="assets/lib/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>

<!-- Candy JS -->
<script src="assets/dist/candy.js" type="text/javascript" charset="utf-8"></script>
```

Make sure the paths above point to wherever you put these files in your project.

## How to Use

Candy has a wide variety of utility classes.

### Layout

To create the layout for a section of your page, first you need a `div` with the class `container`. Inside, you can put more `div`s with classes like `fourth`, `half`, and `three-fourths`, or `third` and `two-thirds`, which will determine how wide your content is. All these `div`s will stack on mobile/small screens, so these classes only affect the layout when your window is larger than 768px wide.

Here's an example of the HTML for a three column layout with one half-width column and two fourth-width columns.

```html
<div class="container">
  <div class="half">
  </div>
  <div class="fourth">
  </div>
  <div class="fourth">
  </div>
</div>
```

The full list of layout classes, which are hopefully self-explanatory:

- `half`
- `fourth`
- `three-fourths`
- `third`
- `two-thirds`
- `full-width`

### Margin/Padding

To add space between things, you have classes available that adjust the margin and padding:

- `margin` adds 30px of margin around your element
  - You can add `small-` or `large-` to the start of `margin` to change the amount of space to 15px (small) and 60px (large). For example, `small-margin` adds 15px of margin all around.
  - You can add a direction (`top`, `bottom`, `left`, or `right`) to put margin on just one side. For example, `left-margin` adds 30px of margin on the left. If you're combining this with a size, the size comes first in the class name. e.g. `large-bottom-margin` adds 60px of margin on bottom.
- `padding` works the same way except it adds padding around your element
  - examples: `large-padding` adds 60px of padding all around, `top-padding` adds 30px of padding on top, `small-right-padding` adds 15px of padding on the right

**Important note**: Do not add these classes directly on your layout columns (the `half`, `third`, etc. elements). Adding margin will make your sections not fit in their `container` because of the extra space inbetween. Adding padding works in most browsers but is buggy in Internet Explorer. If you don't care about IE, go for it! If you want to be safe, add another `div` inside your layout `div` for margin/padding.

Example:

```html
<div class="container">
  <div class="half">
    <div class="padding">
      <p>Hello there!</p>
    </div>
  </div>
</div>
```

### Colors

You can add colors to backgrounds of elements, text, borders, and buttons. This will be based on what you name your colors in `scss/candy.scss`, but we'll use the default colors as examples:

- `pink-background` will make the background of an element pink.
- `purple-text` will make any text inside the element purple.
- `blue-border` will add a 2px wide blue border on your element. If you just want to underline something, you can add the class `blue-underline` instead. If you don't specify a color and just add the class `border` or `underline`, the default color is black.
- `green-button` will make a button green. The `button` class alone will make a button whatever you set your `$main-color` as. You can add the button classes on these tags: `<a>` (anchors, a.k.a. links), `<button>`, `<input type="submit">`, and `<input type="button">`.

Aside from your custom colors, there are also built-in classes that make things white or black:

- `white-background`, `black-background`
- `light-text` (white), `dark-text` (black)
- `white-border`, `border` (black)
- `white-underline`, `underline` (black)

### Forms

Candy's form fields have basic styles applied for you. If you would like to show that a field has an error, add the `form-error` class to the field for a red border. For error messages, add a `div` with the class `error-message` beneath the field with an error.

Example:

```html
<label>Name *</label>
<input class="form-error" type="text" placeholder="Emily Doe">
<div class="error-message">
  <p>Name cannot be blank</p>
</div>
```

### Menus

Here's the basic HTML structure for a menu:

```html
<nav class="main-nav sticky-nav">
    <div class="menu">
        <img src="assets/my-logo.png" alt="My Logo">
        <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
            <li><a href="#">Link 4</a></li>
        </ul>
        <button class="open-menu">Menu</button>
        <button class="close-menu">Close</button>
    </div>
</nav>
```

You can copy and paste this markup and adjust it for your logo and links. If you'd like a deeper understanding of what's going on here, here's the breakdown:

- First we have a `nav` element with the class `main-nav`. This adds the background color to your menu. If you would like your nav to be sticky (stick to the top of the window when the user scrolls), add the optional class `sticky-nav`.
- Inside of that we have a `div` with the class `menu`. This keeps things like our logo and links in a max-width container so they line up with the rest of the elements on the page. Everything else goes inside this `div`.
- For the title of your site, you can add a logo or text (e.g. `<h3>My Site</h3>`), whatever you like, on the left.
- For the links, list them in an unordered list after your logo/title.
- Finally, we need two `button`s for the mobile menu to work. One has the class `open-menu` and will open your mobile menu when clicked. The other has the class `close-menu` and will let you close the menu once it's open. These will only be visible on small screens.

#### Advanced menu usage

If you'd like one of your links to have a dropdown, you would structure it like this:

```html
<li class="has-dropdown">
  <a href="#">My dropdown link</a>
  <ul>
    <li><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
    <li><a href="#">Link 3</a></li>
    <li><a href="#">Link 4</a></li>
  </ul>
</li>
```

- For the list item that you would like to have a dropdown, add the class `has-dropdown`.
- Inside that `li`, add another unordered list with your additional links.
- **Important note**: Once a list item is being used as a dropdown, you cannot use the immediate link inside to go to anything. When the user clicks on it, it will only open the dropdown menu. It won't lead to whatever you try to link it to.

### Accordions

You can use accordions to hide and reveal content. Here's what the HTML looks like for this:

```html
<div class="accordion">
    <div class="accordion-headline">
        <h4>My Accordion</h4>
    </div>
    <div class="accordion-content">
        <p>Some hidden content here</p>
    </div>
</div>
```

- First we have a `div` with the class `accordion`. These accordions don't have a background color by default, so you can make them whatever color you'd like by adding a background color class.
- Inside are two more `div`s: these have the classes `accordion-headline` and `accordion-content`. Whatever you put inside `accordion-headline` will be visible to start, and when the user clicks it, `accordion-content` will become visible.

### Other Stuff

Here are other classes you can put on elements:

- `round-corners` - adds rounded corners to your element
- `uppercase` - makes content all caps
- `light-weight`, `normal-weight`, `semibold-weight`, and `bold-weight` - changes the font weight of your content (as long as the font you're using has these weights)

### Demo

To see examples of how to use this library, [check out the demo site](https://puzzalea.github.io/candy/)!

## Questions? Comments?

Make an issue if you need anything. ✧･ﾟ:*╰(◕‿◕｡╰)
