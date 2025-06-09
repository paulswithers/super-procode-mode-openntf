# CSS Flexbox

(can't be embedded)

<a class="r-fit-text" src="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">https://css-tricks.com/snippets/css/a-guide-to-flexbox/</a>

---

## MDN article

(can't be embedded)

<a class="r-fit-text" src="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox">
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox
</a>

---

```html
<h1>Here shall be Flex-ible Dragons-in-a-box</h1>
<div class="basic">
  <div style="flex-grow: 6;">flex-6</div>
  <div style="flex-grow: 3;">flex-3</div>
  <div style="flex-grow: 3;">flex-3</div>
</div>
<br />
<div class="resp">
  <div style="flex-grow: 6;">responsive flex-6</div>
  <div style="flex-grow: 3;">responsive flex-3</div>
  <div style="flex-grow: 3;">responsive flex-3</div>
</div>
```

---

```css
.basic {
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
}

.basic > div {
  border-collapse: collapse;
  border: #000088 1px solid;
  padding: 2px;
}

.resp {
  display: flex;
  flex-direction: row;
}

.resp > div {
  border-collapse: collapse;
  border: #008800 1px solid;
  padding: 2px;
}

@media (max-width: 800px) {
  .resp {
    flex-direction: column;
  }
}
```

---

## Form Layout

```html
<div class="form">
  <div class="col" style="flex-grow: 6">
    <h2>Personal Information</h2>
    <input
      type="text"
      class="form-control"
      placeholder="Name"
      aria-label="Name"
    />
    <input
      type="number"
      class="form-control"
      placeholder="Age"
      aria-label="Age"
    />
    <input
      type="text"
      class="form-control"
      placeholder="Email"
      aria-label="Email"
    />
  </div>
  <div class="col" style="flex-grow: 6">
    <h2>Address</h2>
    <input
      type="text"
      class="form-control"
      placeholder="Address"
      aria-label="Address"
    />
    <input
      type="text"
      class="form-control"
      placeholder="City"
      aria-label="City"
    />
    <input
      type="text"
      class="form-control"
      placeholder="Zip"
      aria-label="Zip"
    />
  </div>
</div>
```

---

```css
.form {
  display: flex;
  flex-flow: row wrap;
  border-collapse: collapse;
  border: #880088 1px solid;
  padding: 5px;
}

.col {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  background-color: #f1f1f1;
}

div.col input {
  margin: 5px;
  font-size: 18px;
}
```

---

![flexbox](slides/layout/flexbox.png)

---

![bootstrap is flexbox](slides/layout/bootstrap-flexbox.png)
