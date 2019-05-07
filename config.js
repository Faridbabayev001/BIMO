const environment = process.env.NODE_ENV;
let config = {
    development: {
        port: process.env.PORT || 3000,
        saltingRounds: 10,
        connection_url: process.env.MONGO_LOCAL_CONN_URL ||  "mongodb://127.0.0.1:27017/express-api",
        jwt_secret_token: process.env.JWT_SECRET ||  "addjsonwebtokensecretherelikeQuiscustodietipsoscustodes1",
        issuer: process.env.ISSUER ||  "your issuer url",
        expiresIn: "2d"
    },
    production: {
        port: process.env.PORT || 3000,
        saltingRounds: 10,
        connection_url: process.env.MONGO_LOCAL_CONN_URL ||  "mongodb://127.0.0.1:27017/express-api",
        jwt_secret_token: process.env.JWT_SECRET ||  "addjsonwebtokensecretherelikeQuiscustodietipsoscustodes1",
        issuer: process.env.ISSUER ||  "your issuer url",
        expiresIn: "2d"
    },

}
module.exports = config[environment]