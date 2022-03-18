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
api_key: '452114644377464',
api_secret: 'po4HaQTQjYRvFxhygVYOaQHH3g0'
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
