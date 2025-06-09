## @Property

- Create custom properties
- <span class="small">`<integer>`, `<color>`, `<length>`, etc.</span>
- Set initial value and inheritance behaviour
    ```css
    @property --standard-radius {
        syntax: "<length>";
        inherits: false;
        initial-value: 5px;
    }
    ```
- Apply to CSS properties using `var`
- Inheritance may be overridden by standard element styles