# Code Challenge: Our Places

## Overview

The provided codebase is a simple [MERN stack](https://www.mongodb.com/mern-stack) application called "Our Places". A user can sign up to create a profile in the app. Once the profile is created, the user can log in and create a "Place" record under their own profile. A Place record includes a place title, a description, a picture and an address. Note that the address verification takes places via the call to the Google Maps API. The record owner can also edit their records (some fields) and delete their own records. Users can only see their own records and not the records created by other users.

## Environment Setup

### Google API Token

You will need to get a Google API token (accessed from a `GOOGLE_API_KEY` environment variable) from the [Google Cloud Platform console](https://developers.google.com/maps/documentation/embed/get-api-key). This value is referenced in two places in the application:

- `./backend/util/location.js`
- `./frontend/public/index.html`

This API key allows verifying the address that user enters on the "Create a Place" form via the Google Maps verification service. It also allows the front-end to find and display the location on the map based on geographic information stored in the database.

### MongoDB connection string

The MongoDB connection string used in `./backend/app.js` can be used to connect to different MongoDB instances, depending on your environment. An example of how this connection string should be formatted is included in `./backend/.env.example`.

**You will need to include the mongodb address and the credential in the call to the API.**

## Run Locally in Development

Environment variables should be saved locally in a `.env` file. Follow the example in `./backend/.env.example` to create this file.

### Database

This application requires MongoDB. You can find the schema in `./backend/models`. Before invoking the API, you will need:

1. A running MongoDB instance
2. Credentials for the MongoDB instance used in a `MONGODB_URI` environment variable that is used in `./backend/app.js` at the `mongoose.connect()` function call

You can create a local MongoDB database instance or use a hosted instance for local development.

#### Create a local development database

If MongoDB isn't already installed, follow the [MongoDB installation instructions](https://www.mongodb.com/docs/manual/installation/).

Enter the MongoDB shell:

```sh
mongosh
```

Switch to a new empty database:

```js
use <Your Database Name>
```

Insert a test record to initialize the empty database:

```js
db.log.insert({ name: 'Database initialized.' });
```

Add a user

```js
db.createUser({
  user: '<Your Database User>',
  pwd: '<Your Password>',
  roles: ['readWrite'],
});
```

Create your MongoDB connection string (`MONGODB_URI`) from the values you used above and the location of your MongoDB instance. A sample can be found in `./backend/.env.example`:

```
MONGODB_URI="mongodb+srv://<Your Database User>:<Your Password>@<Your Host and Port>/<Your Database Name>?retryWrites=true&w=majority"
```

Save this value in your `./backend/.env` file to make it accessible in `./backend/app.js`.

#### Create a hosted MongoDB instance

You can find information about setting up MongoDB in [DockerHub](https://hub.docker.com/_/mongo) and on the [MondoDB website](https://docs.cloudmanager.mongodb.com/tutorial/nav/manage-hosts/).

Alternatively, you can use [MongoDB Atlas](https://www.mongodb.com/atlas).

Either option will allow you to create a connection string (`MONGODB_URI`) to save in `./backend/.env`.

### Back-end API

- Go to the back-end folder: `cd backend`
- Install the dependencies: `npm install`
- Run Express API: `npm start`

### React front-end

- Go to the front-end folder: `cd frontend`
- Install the dependencies: `npm install`
- Run React `npm start`

## Run in Production

Environment variables should be specified according to best practices in the cloud environment where you are deploying you app.

### React front-end

- Go to the front-end folder: `cd frontend`
- Use included [Create React App](https://create-react-app.dev/) `build` script to create a production-optimized build: `npm build`
