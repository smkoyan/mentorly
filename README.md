# Mentorly - API

> Backend API implementation of mentorly application

## Available Endpoints

### Authenthication
- POST /api/singnup
- POST /api/signin

### Users
- GET  /api/users
- GET  /api/users/:id
- PUT  /api/users

### Fields
- POST /api/fields
- GET /api/fields

## Usage

### Prerequisites
- Node.js (npm)
- MongoDB Server (tested on 3.6 version)

## Steps
1. clone project `git clone https://github.com/smkoyan/mentorly.git`
2. go to the project folder `cd mentorly`
3. install npm packages `npm i`
4. copy .env.example to .env `cp .env.example .env`
5. fill in the environment variables
6. run field seeding script (to be able signup) `node scripts/seedFields.js`
7. run application `npm start` or `node server.js`


## Steps with Docker
1. clone project `git clone https://github.com/smkoyan/mentorly.git`
2. go to the project folder `cd mentorly`
3. build docker image `docker build . -t <username>/<app-name>`
4. run docker image passing environment variables `docker run -p <public-port>:<private-port> -d --env-file <env-file-name> <username>/<app-name>`

