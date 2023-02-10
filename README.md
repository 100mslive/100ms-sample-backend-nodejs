[![100ms-svg](https://user-images.githubusercontent.com/93931528/205858417-8c0a0d1b-2d46-4710-9316-7418092fd3d6.svg)](https://100ms.live/)

[![Documentation](https://img.shields.io/badge/Read-Documentation-blue)](https://www.100ms.live/docs/server-side/v2/introduction/basics)
[![Discord](https://img.shields.io/discord/843749923060711464?label=Join%20on%20Discord)](https://100ms.live/discord)
![MIT License](https://img.shields.io/badge/license-MIT-blue)
[![Register](https://img.shields.io/badge/Contact-Know%20More-blue)](https://dashboard.100ms.live/register)

# 100ms Sample Backend - NodeJs

## About
This is a sample backend app built on [Node.js](https://nodejs.org/en/) with [Express.js](https://expressjs.com/) middleware using [100ms REST APIs](https://www.100ms.live/docs/server-side/v2/introduction/request-and-response) to showcase some basic functionalities.

## Getting Started
Deploy directly to Render using this button. But don't forget to add the environment variables specified in `.env.example` to Render or the build will fail!

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/coder-with-a-bushido/100ms-sample-backend-nodejs)

## Installation
1. Clone the repo

```
git clone https://github.com/coder-with-a-bushido/100ms-sample-backend-nodejs.git
```

2. Install the dependencies

```
npm i
```

3. Rename the `.env.example` to `.env` and add your credentials

```
APP_ACCESS_KEY=<YOUR_APP_ACCESS_KEY>
APP_SECRET=<YOUR_APP_SECRET>
```

4. Run the app

Running in dev mode (hot reload on file changes):

```
npm run start:dev
```

Running in production:

```
npm run start
```

Or

```
docker compose up --build
```

## Usage

This sample backend app exposes the following endpoints:

| Endpoint | Method | Request | Description |
|---|---|---|---|
| `/app-token` | POST |JSON Body Params:<pre>{<br>&nbsp;&nbsp;"room_id": "632ecxxxxxxxxxxxxxxxxxxxxxx764",<br>&nbsp;&nbsp;"role": "host",<br>&nbsp;&nbsp;"user_id":"test_user"<br>}</pre>| Generate an auth token for a peer to join a room.<br>Please refer to https://www.100ms.live/docs/server-side/v2/introduction/authentication-and-tokens |
| `/create-room` | POST | JSON Body Params:<pre>{<br>&nbsp;&nbsp;"random-room": true<br>}</pre>Or<pre>{<br>&nbsp;&nbsp;"random-room": false,<br>&nbsp;&nbsp;"name": "new-room-{{$timestamp}}",<br>&nbsp;&nbsp;"description": "This is a sample description for the room",<br>&nbsp;&nbsp;"template_id": "6318xxxxxxxxxxxxxxxxxc60",<br>&nbsp;&nbsp;"region": "in"<br>}</pre>| Create a new room, either randomly or with the requested configuration.<br>Please refer to https://www.100ms.live/docs/server-side/v2/Rooms/create-via-api |
| `/session-analytics` | GET | Query Params:<pre>{<br>&nbsp;&nbsp;"session_id": 633dxxxxxxxxxxxxxxx7d1d2<br>}</pre>| Get Session Analytics for a specific session (like attendance).<br>Please refer to https://www.100ms.live/docs/server-side/v2/Sessions/example-build-attendance |

## 100ms SDK Documentation
Refer the 100ms SDK [Server-Side guide](https://www.100ms.live/docs/server-side/v2/introduction/basics) to get started on building your custom backend with 100ms APIs.
