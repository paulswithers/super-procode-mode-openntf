# CSS Grid Notes

- Flexbox is 2D, just wraps horizontally / vertically.
- CSS Grid solves this problem and goes further:
    - Allows columns and rows.
    - Greater power over layout, because of this:
        - Span multiple columns
        - grid-template-areas
        - display:contents and display: subgrid.

## Application Layout

- Columns use `fr`, fractional sizing.
- We want footer at bottom. So:
    - height, 95% vertical height to fix to viewport
    - here we would want to add a scrollbar
    - min-height would allow it to grow, so footer is never higher than the bottom
    - might then want to make header / footer sticky
- CSS nesting, as we'll see later
- Header and footer span width in different ways:
    - grid-column-start / grid-column-end to end on 5th column
    - grid-column sets both together, uses -1 to mean last column
    - text-align spans full width, justify-self takes up just enough space
- grid-template-areas is another way to define layout
    - strings for each row on grid container
    - grid-area uses variable mapping to value in string

## Form

- grid - sectional grid - input group grid
- Uses repeat to make it responsive
    - auto-fit / auto-fill only noticeable if you have fewer columns than the width
    - auto-fill adds a blank column, auto-fit makes existing column take up remaining space
    - minmax to set a minimum size and size based on as many as can fit
- Use developer tools to show how justify / align works
    - outer-grid: align-items and justify-items
    - section grid: justify-content and justify-items
    - input-group: align-items **baseline ensures it aligns with first line of field
- textarea: field-sizing content means it expands
- input-group has fixed first column, so ensure they line up when responsive
    - uncomment out other lines
    - size is now auto, so same position within each section, but not between them

## Notes

- Flexbox also has row and column gap