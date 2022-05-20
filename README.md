1. run **npm init** to create package.json for api.
2. run **npm install express express-validator bcryptjs config gravatar jsonwebtoken mongoose request**
3. run **npm install -D nodemon concurrently** (nodemon to monitoring api and concurrently for launch api and client on same time)

   `const express = require('express');`

   `const app = express();`

   `app.get('/', (req, res) => res.send('API running'));`

   `const PORT = process.env.PORT || 5000;`

   ` app.listen(PORT, () => console.log(``Server started on port ${PORT}``)); `

cloudinary.config({
cloud_name: 'adhentux',
api_key: 'API_KEY',
api_secret: 'API_SECRET'
});

////////////////////////////////////
Cloudinary

Resultado de una subida de imagen a traves
de: http://localhost:5000/api/image-upload
raw: {
"image": "images/showcase.jpg"
}

Result:  
{
"message": "success",
"result": {
"asset_id": "f9f250c9d9338b683ec8f402fc54d2b3",
"public_id": "kheejci1xph8a1lcanmf",
"version": 1647634004,
"version_id": "3c91b2edc6e53a4727dfd6fb0e3db740",
"signature": "4759017c2d4e5ae455e8402777e3e45c9fa08993",
"width": 1920,
"height": 1442,
"format": "jpg",
"resource_type": "image",
"created_at": "2022-03-18T20:06:44Z",
"tags": [],
"bytes": 1023829,
"type": "upload",
"etag": "60c9de96fddb8e9a7fc3e23cd7a1f584",
"placeholder": false,
"url": "http://res.cloudinary.com/adhentux/image/upload/v1647634004/kheejci1xph8a1lcanmf.jpg",
"secure_url": "https://res.cloudinary.com/adhentux/image/upload/v1647634004/kheejci1xph8a1lcanmf.jpg",
"original_filename": "showcase",
"api_key": "452114644377464"
}
}

4. run **npx create-react-app client** to create client react.
5. setup on root package.json script
   "client": "npm start --prefix client",
   "dev": "concurrently \"npm run server\" \"npm run client\""
6. cd client and install dependencies
   npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment
7. set proxy on root package.json
   "proxy": "http://localhost:5000"
8. clean up client react app
   delete: App.test.js index.css logo.svg
9. run with **npm run dev**
10. install uuid library in client to generate guid (used in alerts)

11. upload image cloudinary

### Deploy to Heroku

1. Install Heroku client ([heroku-cli])(https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli)
2. Add **config/default.json** to .gitignore file.
3. Add new file **config/production.json**
4. Add **"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"** to scripts section in package.json
5. Run `heroku create`, to create app into heroku cloud. At the end show the `<name_of_app_in_heroku>`
6. Add heroku as a remote repository `heroku git:remote -a <name_of_app_in_heroku>`
7. Push master to heroku `git push heroku master`
