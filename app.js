require('dotenv').config();

let express = require('express');
let app = express();
app.use(express.json()); // for parsing request body as JSON
let port = process.env.PORT || 3000;

let jwt = require('jsonwebtoken');
let uuid4 = require('uuid4');

let app_access_key = process.env.APP_ACCESS_KEY;
let app_secret = process.env.APP_SECRET;

app.post('/app-token', (req, res) => {
    let payload = {
        access_key: app_access_key,
        room_id: req.body['room_id'],
        user_id: req.body['user_id'],
        role: req.body['role'],
        type: 'app',
        version: 2,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000)
    };

    jwt.sign(
        payload,
        app_secret,
        {
            algorithm: 'HS256',
            expiresIn: '24h',
            jwtid: uuid4()
        }, function (err, token) {
            if (err)
                res.json({
                    msg: "Some error occured!",
                    success: false,
                });
            else
                res.json({
                    token: token,
                    msg: "Token generated successfully!",
                    success: true,
                });
        }
    );
});

app.post('/mgmt-token', (req, res) => {
    jwt.sign(
        {
            access_key: app_access_key,
            type: 'management',
            version: 2,
            iat: Math.floor(Date.now() / 1000),
            nbf: Math.floor(Date.now() / 1000)
        },
        app_secret,
        {
            algorithm: 'HS256',
            expiresIn: '24h',
            jwtid: uuid4()
        }, function (err, token) {
            if (err)
                res.json({
                    msg: "Some error occured!",
                    success: false,
                });
            else
                res.json({
                    token: token,
                    msg: "Token generated successfully!",
                    success: true,
                });
        }
    );
});

app.listen(port, () => {
    console.log(`Token server started on ${port}!`);
});