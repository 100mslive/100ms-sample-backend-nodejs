<a href="https://100ms.live/">
  <img src="https://user-images.githubusercontent.com/93931528/205858417-8c0a0d1b-2d46-4710-9316-7418092fd3d6.svg" width="200" />
</a>

[![Documentation](https://img.shields.io/badge/Read-Documentation-blue)](https://www.100ms.live/docs/server-side/v2/introduction/basics)
[![Discord](https://img.shields.io/discord/843749923060711464?label=Join%20on%20Discord)](https://100ms.live/discord)
![MIT License](https://img.shields.io/badge/license-MIT-blue)
[![Register](https://img.shields.io/badge/Contact-Know%20More-blue)](https://dashboard.100ms.live/register)

# Sample backend app for Node.js

This is a sample backend app built on [Node.js](https://nodejs.org/en/) with [Express.js](https://expressjs.com/) middleware and the [100ms REST APIs](https://www.100ms.live/docs/server-side/v2/introduction/request-and-response). Exposed endpoints

- Create room
- Get auth token to join the room
- Get usage analytics

## Get started

Deploy directly to Render using this button. But don't forget to add the environment variables specified in `.env.example` to Render or the build will fail!

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/100mslive/100ms-sample-backend-nodejs)

## Installation

1. Clone the repo

   ```
   git clone https://github.com/100mslive/100ms-sample-backend-nodejs.git
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

   Run with Docker Compose

   ```
   docker compose up --build
   ```

## Usage

This sample exposes the following endpoints

| Endpoint                     | Method | Parameters                                                                                                                                                                  | Description                                                                                                                               |
| ---------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `/create-room`               | POST   | JSON body <pre>{<br>&nbsp;&nbsp;"name": "new-room-1",<br>&nbsp;&nbsp;"description": "Sample description",<br>&nbsp;&nbsp;"template_id": "6318xxxxxxxxxxxxxxxc60"<br>}</pre> | Create a new room with room params ([docs](https://www.100ms.live/docs/server-side/v2/api-reference/Rooms/create-via-api))                |
| `/auth-token`                | POST   | JSON body <br><pre>{<br>&nbsp;&nbsp;"room_id": "632ecxxxxxxxxxxxxxxxx764",<br>&nbsp;&nbsp;"role": "host",<br>&nbsp;&nbsp;"user_id":"test_user"<br>}</pre>                   | Generate an auth token for a peer to join a room ([docs](https://www.100ms.live/docs/concepts/v2/concepts/security-and-tokens))           |
| `/session-analytics-by-room` | GET    | Query params <pre>?room_id=633dxxxxxxxxxxxxxxx7d1d2</pre>                                                                                                                   | Usage analytics for a specific session ([docs](https://www.100ms.live/docs/server-side/v2/how--to-guides/build-attendance))               |
| `/session-list-by-room`      | GET    | Query params <pre>?room_id=633dxxxxxxxxxxxxxxx7d1d2</pre>                                                                                                                   | Get list of all sessions associated with a room ([docs](https://www.100ms.live/docs/server-side/v2/api-reference/Sessions/list-sessions)) |

## Docs

Refer to the 100ms [server-side docs](https://www.100ms.live/docs/server-side/v2/introduction/basics) to get started on your custom backend.
