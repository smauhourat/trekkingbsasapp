# TrekkingBuenosAires - App Eventos Turisticos

## Configuration steps

### Stack MERN

1. run **npm install**, to install server dependencies
2. run **npm install --prefix client**, to install client dependencies
3. set **JWT_SECRET** environment variable with strong secret phrase


### MongoDB

1. create a MongoDb Database and set **MONGO_URI** environment variable with the url

### Cloudinary

1. create an account in https://cloudinary.com/
2. set **CLOUD_NAME** and **API_KEY** environment variable from Cloudinary values

### SMTP Server

1. set **CONTACT_USER
CONTACT_PWD
CONTACT_HOST
CONTACT_PORT** with a valid stmp account
2. set **CONTACT_TO** environment variable with receipt mail account

### Intial user creation

2. set **TOKEN_API** to create initial user admin with PostMan


## Run App

1. run **npm run dev**, the frontend app will listen on http://localhost:3000, and the backend api will listen on http://localhost:5000
2. create initial user admin with PostMan

         `post to "http://localhost:5000/api/users"`
         `set header`
         `"x-auth-token": <TOKEN_API>`
         `set body`
         `{ "name": "<name_of_user", "email": "<valid_email_user>", "password": "<strong_password>"}`


## Deploy to Vercel

1. run **npm run build-client**
2. run **git push origin master**

// TODO



### Miscellaneous - Update Mongo Schema

db.collection.updateMany({<filter>}, {$set:{<new_field>: <defautl_value>}}, {})
