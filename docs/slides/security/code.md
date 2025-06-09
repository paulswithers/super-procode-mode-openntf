## avoid `unsafe-inline`

```
default-src 'self';
connect-src https://apiserver1 https://apiserver2;
font-src https://font-cdn;
img-src ... ;
script-src 'self' https://trustedcdn;
style-src ...;
```

---
## For the connoisseur

- form-action
- frame-ancestors
- [report-to / report-uri](https://report-uri.com/home/generate)
- trusted types
