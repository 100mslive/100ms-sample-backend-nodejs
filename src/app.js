require('dotenv').config();

const { APIService } = require('./services/APIService');
const { TokenService } = require('./services/TokenService');

let express = require('express');
let app = express();
app.use(express.json()); // for parsing request body as JSON
let port = process.env.PORT || 3000;

const moment = require('moment');

const tokenService = new TokenService();
const apiService = new APIService(tokenService);

// Generate an auth token for a peer to join a room
app.post('/app-token', (req, res) => {
    try {
        const token = tokenService.getAppToken({ room_id: req.body.room_id, user_id: req.body.user_id, role: req.body.role });
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

// Create a new room, either randomly or with the requested configuration
app.post('/create-room', async (req, res) => {
    let payload;
    // If `random_room` is not true, look for room configuration
    if (!req.body.random_room) {
        payload = {
            "name": req.body.name,
            "description": req.body.description,
            "template_id": req.body.template_id,
            "region": req.body.region
        };
    }
    try {
        const resData = await apiService.post("/rooms", payload);
        res.json(resData);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }

});

// Get Session Analytics for a specific session (like attendance)
app.get('/session-analytics', async (req, res) => {
    try {
        const parsedData = await apiService.get(`/sessions/${req.query.session_id}`);
        console.log(parsedData);

        // Calculate individual participants' duration
        const peers = Object.values(parsedData.peers);
        const detailsByUser = peers.reduce((acc, peer) => {
            const duration = moment
                .duration(moment(peer.left_at).diff(moment(peer.joined_at)))
                .asMinutes();
            const roundedDuration = Math.round(duration * 100) / 100;
            acc[peer.user_id] = {
                "name": peer.name,
                "user_id": peer.user_id,
                "duration": (acc[peer.user_id] || 0) + roundedDuration
            };
            return acc;
        }, {});
        const result = Object.values(detailsByUser);
        console.log(result);

        // Calculate aggregated participants' duration
        const totalDuration = result
            .reduce((a, b) => a + b.duration, 0)
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
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Token server started on ${port}!`);
});