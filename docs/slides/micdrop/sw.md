## Caveat Coder

- Cannot scope higher than service worker's directory!
- Requires HTTPS
    - Easy setup with DRAPI static web application
- For local development
    - set up HTTPS
    - vite + vite-plugin-mkcert (see demo)
        - creates certs in your user directory
        - requires sudo access
    - ngrok