[![100ms-svg](https://user-images.githubusercontent.com/93931528/205858417-8c0a0d1b-2d46-4710-9316-7418092fd3d6.svg)](https://100ms.live/)

[![Documentation](https://img.shields.io/badge/Read-Documentation-blue)](https://www.100ms.live/docs/server-side/v2/introduction/basics)
[![Discord](https://img.shields.io/discord/843749923060711464?label=Join%20on%20Discord)](https://100ms.live/discord)
[![Register](https://img.shields.io/badge/Contact-Know%20More-blue)](https://dashboard.100ms.live/register)

# 100ms Sample Backend - NodeJs

## Getting Started
Deploy directly to Render using this button!

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/coder-with-a-bushido/100ms-sample-backend-nodejs)

## Installation
1. Clone the repo

`https://github.com/coder-with-a-bushido/100ms-sample-backend-nodejs`

2. Install the dependencies

`npm i`

3. Rename the `.env.example` to `.env` and add your credentials

```
APP_ACCESS_KEY=<YOUR_APP_ACCESS_KEY>
APP_SECRET=<YOUR_APP_SECRET>
```

4. Run the app

Running in dev mode (hot reload on file changes):

`npm run start:dev`

Running in production:

`npm run start`

Or

`docker compose up --build`