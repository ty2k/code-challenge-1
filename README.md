# Code Challenge: Our Places

## Overview

The provided codebase is a simple [MERN stack](https://www.mongodb.com/mern-stack) application called "Our Places". A user can sign up to create a profile in the app. Once the profile is created, the user can log in and create a "Place" record under their own profile. A Place record includes a place title, a description, a picture and an address. Note that the address verification takes places via the call to the Google Maps API. The record owner can also edit their records (some fields) and delete their own records. Users can only see their own records and not the records created by other users.

## Environment Setup

### Google API Token

You will need to get a Google API token (accessed from a `GOOGLE_API_KEY` environment variable) from the [Google Cloud Platform console](https://developers.google.com/maps/documentation/embed/get-api-key). This value is referenced in two places in the application:

- `./backend/util/location.js`
- `./frontend/public/index.html`

This API key allows verifying the address that user enters on the "Create a Place" form via the Google Maps verification service. It also allows the front-end to find and display the location on the map based on geographic information stored in the database.

### MongoDB environment variables

The Mongoose connection string specified in `./backend/app.js` is built from environment variables.

**You will need to include the mongodb address and the credential in the call to the API.**

## Run Locally

Environment variables should be saved locally in a `.env` file. Follow the example in `./backend/.env.example` to create this file.

### Database

- This application requires MongoDB. You can find the schema in `./backend/models`.
- Before invoking the API, you will need:
  1. A running MongoDB instance
  2. Credentials for the MongoDB instance set in environment variables and used in `./backend/app.js` at the `mongoose.connect()` function call
- You can find information about setting up MongoDB in [DockerHub](https://hub.docker.com/_/mongo) and on the [MondoDB website](https://docs.cloudmanager.mongodb.com/tutorial/nav/manage-hosts/).

#### Create a database

Enter the MongoDB shell:

```sh
mongosh
```

Switch to a new empty database:

```js
use <DB_NAME>
```

Insert a bogus record to initialize the empty database:

```js
db.user.insert({ name: "Ada Lovelace", age: 205 });
```

Add a user

```js
db.createUser({
  user: "<DB_USER>",
  pwd: "<DB_PASSWORD>",
  roles: ["readWrite"],
});
```

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
