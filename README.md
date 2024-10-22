[![Deploy to Donweb Cloud Production](https://github.com/smauhourat/trekkingbsasapp/actions/workflows/pipeline_prod.yml/badge.svg)](https://github.com/smauhourat/trekkingbsasapp/actions/workflows/pipeline_prod.yml)


[![Deploy to Donweb Cloud Develop](https://github.com/smauhourat/trekkingbsasapp/actions/workflows/pipeline_dev.yml/badge.svg)](https://github.com/smauhourat/trekkingbsasapp/actions/workflows/pipeline_dev.yml)


# TrekkingBuenosAires - Travel Agency App
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

### Initial user creation

2. set **TOKEN_API** to create initial user admin with PostMan


## Run

### Run App in Develop

1. run **npm run dev**, the frontend app will listen on http://localhost:3000, and the backend api will listen on http://localhost:4000.
2. create initial user admin with PostMan

  ```
        post to "http://localhost:4000/api/users"
        set header
        "x-auth-token": <TOKEN_API>
        set body
        { "name": "<name_of_user", "email": "<valid_email_user>", "password": "<strong_password>"}
  ``` 


### Run App in Develop with NODE_ENV=development to test purpose

1. run **npm run development**, the frontend app will listen on http://localhost:3000, and the backend api will listen on http://localhost:4004
   if the frontend is compiled, it is served through the backend.



## Testing

### Testing with Cypress
1. run **npm run development**, the frontend app will listen on http://localhost:3000
2. run **cypress:open**, this run ui cypress test running integration test


## Deploy

### Deploy to Private Cloud Server
For serving this app we select "Donweb Cloud server", and how CI/CD we select GitHub Actions. We have two pipelines (dev and prod), thise connect via sshh, doing chekout to the indicated  branch, install client and server dependencies, build the client app, and run pm2 restarting the app.


-      git push origin develop (deploy to develop stage in CloudServer)
-      git push origin master (deploy to production stage in CloudServer)

> Here explain how install Private Cloud Server in "DonWeb" 
        - ➡️ "How install server"

### Deploy to Vercel

1.      npm run build-client
2.      git push origin master
3.      git push vercel master



## 



## Miscellaneous

### - Update Mongo Schema

`db.collection.updateMany({<filter>}, {$set:{<new_field>: <defautl_value>}}, {})`


add more recipes