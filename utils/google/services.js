const google = require("googleapis").google;
const { OAuth2Client } = require("./OAuth");

const profile = google.oauth2({ auth: OAuth2Client, version: "v2" });

module.exports = { profile };
