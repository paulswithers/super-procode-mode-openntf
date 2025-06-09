const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to add Content-Security-Policy header
app.use((req, res, next) => {
  const policyName = req.query.policy;

  if (policyName) {
    const policyPath = path.join(__dirname, 'policy', `${policyName}.txt`);
    if (fs.existsSync(policyPath)) {
      const policy = fs.readFileSync(policyPath, 'utf-8');
      res.setHeader('Content-Security-Policy', policy);
    } else {
      console.warn(`Policy file not found: ${policyPath}`);
    }
  }

  next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
