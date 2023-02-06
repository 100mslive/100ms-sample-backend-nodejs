require('dotenv').config();

const { ApiService } = require('./apiService');
const { TokenService } = require('./tokenService');

let express = require('express');
let app = express();
app.use(express.json()); // for parsing request body as JSON
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Token server started on ${port}!`);
});

const tokenService = new TokenService();
const apiService = new ApiService({ tokenGenerator: tokenService });

app.post('/app-token', (req, res) => {
    try {
        const token = tokenService.getAppToken({ room_id: req.body['room_id'], user_id: req.body['user_id'], role: req.body['role'] });
        res.json({
            token: token,
            msg: "Token generated successfully!",
            success: true,
        });
    } catch (error) {
        res.json({
            msg: "Some error occured!",
            success: false,
        });
    }
});

app.post('/create-room', async (req, res) => {
    let payload;
    if (!req.body['random-room']) {
        payload = {
            "name": req.body['name'],
            "description": req.body['description'],
            "template_id": req.body['template_id'],
            "region": req.body['region']
        };
    }
    try {
        const actualRes = await apiService.post("/rooms", payload);
        res.json(actualRes.data);
    } catch (err) {
        console.log(err.data);
        res.status(500).send("Internal Server Error");
    }

});

app.get('/session-attendance', async (req, res) => {
    try {
        const actualResponse = await apiService.get('/sessions/' + req.params['session_id'])
        var parsedData = actualResponse.data;

        // Calculate individual participants' duration
        const peers = Object.values(parsedData.peers);
        const durationByUser = peers.reduce((acc, peer) => {
            const duration = moment
                .duration(moment(peer.left_at).diff(moment(peer.joined_at)))
                .asMinutes();
            const roundedDuration = Math.round(duration * 100) / 100;
            acc[peer.user_id] = (acc[peer.user_id] || 0) + roundedDuration;
            return acc;
        }, {});
        const result = Object.entries(durationByUser).map(([user_id, duration]) => ({
            user_id,
            duration
        }));
        console.log(result);

        // Calculate aggregated participants' duration
        const totalDuration = Object.values(durationByUser)
            .reduce((a, b) => a + b)
            .toFixed(2);
        console.log(`Total duration for all peers: ${totalDuration} minutes`);

        // Calculate total session duration
        const sessionDuration = moment
            .duration(moment(parsedData.updated_at).diff(moment(parsedData.created_at)))
            .asMinutes()
            .toFixed(2);
        console.log(`Session duration is: ${sessionDuration} minutes`);

        res.json({
            "user_duration_list": result,
            "session_duration": sessionDuration,
            "total_peer_duration": totalDuration
        });
    } catch (err) {
        console.log(err.data);
        res.status(500).send("Internal Server Error");
    }
});