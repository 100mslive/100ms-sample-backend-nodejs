let jwt = require('jsonwebtoken');
let uuid4 = require('uuid4');

// A service class for Token generation and management
class TokenService {
    static #app_access_key = process.env.APP_ACCESS_KEY;
    static #app_secret = process.env.APP_SECRET;
    #managementToken;
    constructor() {
        this.#managementToken = this.getManagementToken(true);
    }

    // A private method that uses JWT to sign the payload with APP_SECRET
    #signPayloadToToken(payload) {
        let token = jwt.sign(
            payload,
            TokenService.#app_secret,
            {
                algorithm: 'HS256',
                expiresIn: '24h',
                jwtid: uuid4()
            }
        );
        return token;
    }

    // A private method to check if a JWT token has expired or going to expire soon
    #isTokenExpired(token) {
        try {
            const { exp } = jwt.decode(token);
            const buffer = 30; // generate new if it's going to expire soon
            const currTimeSeconds = Math.floor(Date.now() / 1000);
            return !exp || exp + buffer < currTimeSeconds;
        } catch (err) {
            console.log("error in decoding token", err);
            return true;
        }
    }

    // Generate new Management token, if expired or forced
    getManagementToken(forceNew) {
        if (forceNew || this.#isTokenExpired(this.#managementToken)) {
            let payload = {
                access_key: TokenService.#app_access_key,
                type: 'management',
                version: 2,
                iat: Math.floor(Date.now() / 1000),
                nbf: Math.floor(Date.now() / 1000)
            };
            this.#managementToken = this.#signPayloadToToken(payload);
        }
        return this.#managementToken;
    }

    // Generate new App/Auth token for a peer
    getAppToken({ room_id, user_id, role }) {
        let payload = {
            access_key: TokenService.#app_access_key,
            room_id: room_id,
            user_id: user_id,
            role: role,
            type: 'app',
            version: 2,
            iat: Math.floor(Date.now() / 1000),
            nbf: Math.floor(Date.now() / 1000)
        };
        return this.#signPayloadToToken(payload);
    }
}

module.exports = { TokenService };