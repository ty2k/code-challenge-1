# Code Challenge: Our Places

## Overview

The provided codebase is a simple [MERN stack](https://www.mongodb.com/mern-stack) application called "Our Places". A user can sign up to create a profile in the app. Once the profile is created, the user can log in and create a "Place" record under their own profile. A Place record includes a place title, a description, a picture and an address. Note that the address verification takes places via the call to the Google Maps API. The record owner can also edit their records (some fields) and delete their own records. Users can only see their own records and not the records created by other users.

## Environment Setup

### Google API Key

You will need to get a Google API key from the [Google Cloud Platform console](https://developers.google.com/maps/documentation/embed/get-api-key). There are two places that reference the Google Maps API Key in the application, and they do _not_ need to be set to the same key value:

- `./backend/util/location.js` (accessed from the `GOOGLE_API_KEY` environment variable)
- `./frontend/public/index.html` (in cleartext in the React static `index.html` file in the front-end)

The Google Maps API allows verifying the address that user enters on the "Create a Place" form via the Google Maps verification service. It also allows the front-end to find and display the location on the map based on geographic information stored in the database.

For security reasons, you should [secure your API key](https://cloud.google.com/docs/authentication/api-keys?hl=en_US#securing_an_api_key) by restricting it to the particular IP addresses or HTTP referrers you need to access the API from. Because we are using the API key directly from our React front-end in this application (where it has to be passed in cleartext), it is particularly important to restrict that API key's usage.

#### Google Maps API key troubleshooting

You must enable the [Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) for use with your API key. If this hasn't been enabled, the Google Maps API may return an error like the following:

```json
{
  "error_message": "This API project is not authorized to use this API.",
  "results": [],
  "status": "REQUEST_DENIED"
}
```

You must enable billing for your project before your API key will work. If billing is not set up, the Google Maps API may return an error like the following:

```json
{
  "error_message": "You must enable Billing on the Google Cloud Project at https://console.cloud.google.com/project/_/billing/enable Learn more at https://developers.google.com/maps/gmp-get-started",
  "results": [],
  "status": "REQUEST_DENIED"
}
```

If you receive an `InvalidKeyMapError` console error, your API key is missing/malformed in `./frontend/public/index.html`:

```
Google Maps JavaScript API error: InvalidKeyMapError
https://developers.google.com/maps/documentation/javascript/error-messages#invalid-key-map-error
```

If you receive a `ApiNotActivatedMapError` console error, your API key needs the [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) enabled:

```
Google Maps JavaScript API error: ApiNotActivatedMapError
https://developers.google.com/maps/documentation/javascript/error-messages#api-not-activated-map-error
```

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
- Run Express API in development mode with Nodemon logging: `npm run start:dev`

### React front-end

- Go to the front-end folder: `cd frontend`
- Install the dependencies: `npm install`
- Run test suite: `npm run test`
- Run React: `npm run start`

### Access the application

With the back-end API server and React front-end server both running locally, visit http://localhost:3000 in your browser to see the app in action.

## Run in Production

Environment variables should be specified according to best practices in the cloud environment where you are deploying you app. On Heroku, [config vars](https://devcenter.heroku.com/articles/config-vars) can be set through the command line or through the Heroku Dashboard web GUI.

Use `MONGODB_URI` to point to your hosted MongoDB instance, and `GOOGLE_API_KEY` to access the Google Maps API.

### Create a production build

#### React production build

This project's root folder contains a `package.json` file with a `build` script that runs the script in `./build.sh`. This Bash script will use the included [Create React App](https://create-react-app.dev/) `build` script in the `./frontend` folder to create a production-optimized build of the React app. This is then copied to a static folder `./backend/frontend-build` which is served via the Express backend.

This script will work out of the box on Heroku, but maybe require fine-tuning for other deployment environments. It assumes `bash` is available to run `./build.sh`.

#### Run in production

Once a production build of the React front-end has been created and is available in `./backend/frontend-build`, run the back-end Express server with `npm start` from the root folder. The included `./package.json` file works automatically with Heroku's Node.js buildpack.
