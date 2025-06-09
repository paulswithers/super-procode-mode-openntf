# CSP Gallore

This is a Node.js application using Express.js to render static files and dynamically add Content-Security-Policy headers based on the `?policy` query parameter.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. Place your static files in the `public` directory.

4. Add your Content-Security-Policy files in the `policy` directory with `.txt` extension.

5. Access the application at `http://localhost:3000` and use the `?policy=<policy_name>` query parameter to apply a specific CSP header.
