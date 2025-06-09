# CSS Samples Notes

## Variables

- Typically on `:root` pseudo-class
- Better reusability, easier support
- Referenced with `var()`

## Properties

- Like variables, but with type-checking and specifying inheritance
- Inheritance may be overridden by default browser styles
- `<integer>`, `<color>`, `<length>` etc
    - See Mozilla docs for all options
- Browser will highlight invalid properties in developer tools
- Can't be used (it seems) for part of a CSS property, e.g. % applied to "from color"
- Can't use functions against other variables
- Map to CSS property using `var()`
- Override variable default value on child using `--varName: newValue`

## light-dark

- Define colour for light mode and colour for dark mode
- Can't be used for images, only colours
- Picks up OS setting, set style on root, or manipulate in browser dev tools
    - Rendering tab, Enable automatic dark mode

## Functions

- `from color` to manipulate colours
    - No more hard-coded colours throughout
    - Great power when combined with variables
- We've seen `repeat()` and `minmax()`

## Nested CSS

- & selector: append or prepend to parent setting
- `has()` matches parent element with specific sibling or descendant
    - Used to apply style on div if it includes an invalid input
- `not()` to reverse it
- `:valid` / `:invalid` to apply styles as soon as the page loads
- `:user-valid` / `user-invalid` only after user interaction
    - this is why the outer div only changes colour after interaction
    - requires change to input value

## Bonus

- `display: contents` to ignore input-group div
    - ensures labels all line up nicely
- this works here because we're only using one column
- could you use @container query on the other example ;-)