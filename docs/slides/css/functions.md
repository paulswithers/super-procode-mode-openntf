## CSS Functions

- You know `rgb()`, `hsl()`
- Extend with `from <color>`
- `calc()`, `repeat()`, `minmax()`
- Combine for supreme power

```css
grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
border-color: hsl(from var(--div-info) h s calc(l - 20))
```