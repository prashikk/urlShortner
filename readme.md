# URL Shortener

A simple URL Shortener service built with Node.js, Express, MongoDB, Passport, and Postman.

## Getting Started

These instructions will help you set up and run the URL Shortener on your local machine.

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account for database (optional)
- Postman for testing APIs

### Installing

1. Install dependencies  -  npm install

2. Set up environment variables -
Create .env file in the root directory and add the following:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.your-mongodb.net/
Replace <username>, <password>, <dbname>, with your MongoDB credentials.

## Running
npm start
The server will run on http://localhost:4000 by default.

## Testing
POSTMAN DOC - https://documenter.getpostman.com/view/29494510/2s9YkraziC 

OR

Use Postman to test the following endpoints:

POST /api/shorten: Shorten a URL
GET /api/shorten/:shortUrl: Redirect to the original URL
POST /api/register: Register a new user
POST /api/login: Log in a user
GET /api/logout: Log out the current user

## Built With
Node.js
Express
MongoDB
Passport
ShortId
Postman
Nodemon