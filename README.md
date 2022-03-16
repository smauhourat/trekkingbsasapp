1. run **npm init** to create package.json for api.
2. run **npm install express express-validator bcryptjs config gravatar jsonwebtoken mongoose request**
3. run **npm install -D nodemon concurrently** (nodemon to monitoring api and concurrently for launch api and client on same time)

   `const express = require('express');`

   `const app = express();`

   `app.get('/', (req, res) => res.send('API running'));`

   `const PORT = process.env.PORT || 5000;`

   ` app.listen(PORT, () => console.log(``Server started on port ${PORT}``)); `
