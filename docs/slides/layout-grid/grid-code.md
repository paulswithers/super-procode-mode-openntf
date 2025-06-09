```html
<div id="container" class="container">
    <header>Application Layout</header>
    <nav>
        <a href="#">Link 1</a><br/>
        <a href="#">Link 2</a><br/>
        <a id="switchClass" href="#">Switch Class</a><br/>
        <a href="/form.html">Form</a>
    </nav>
    <main>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</main>
    <aside>Right menu</aside>
    <footer>&copy; Paul Withers 2025</footer>
</div>
```

---

```css
.container-areas {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    gap: 5px;
    padding: 5px;
    height: 95vh;
    grid-template-rows: auto 1fr auto;

    header {
        text-align: center;
        grid-column-start: 1;
        grid-column-end: 4;
    }

    footer {
        /* Start at first column, end at last */
        grid-column: 1 / -1;
        justify-self: center; /* Note how this works differently to text-align */
        font-size: 0.7em;
    }

    ...
```

---

```css
.container-areas {
    display: grid;
    /* Name the areas and how the display. Strings for each row */
    grid-template-areas: 
        "header header header"
        "left content right"
        "footer footer footer";
    grid-template-columns: 1fr 5fr 1fr;
    gap: 5px;
    padding: 5px;
    height: 95vh;
    grid-template-rows: auto 1fr auto;

    /* Now we just map grid areas */
    header {
        text-align: center;
        grid-area: header;  /* variable, not string */
    }

    ...
```