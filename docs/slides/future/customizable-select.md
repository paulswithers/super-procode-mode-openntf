## Customizable Select

- See [blog post](https://developer.chrome.com/blog/rfc-customizable-select) from Chrome for Developers
- In WHATWG stage 3
- `<select>` on steroids
- Gracefully degrades
- Supported in Chrome, Edge, Chrome & Opera for Android
- Not supported in Firefox, Safari, or iOS

---

Core HTML

```html
<select class="email-select" id="email-select">
    <button>
        <selectedcontent></selectedcontent>
    </button>
    ...
</select>
```

---

Style options and selectedContent as required

```css
option,
selectedcontent {
    display: grid;
    /* other styling */
}
```

---

Build up options as grid elements

```html
    <option value="" class="hidden">
        <img></img>
        <span>Select an email platform</span>
    </option>
    <option value="notes">
        <img src="/assets/DS_Logo_Notes_icon.png" />
        <span>Notes</span>
    </option>
```