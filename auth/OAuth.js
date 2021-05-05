const google = require("googleapis").google;
const config = require("./config");

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  config.oauth2Credentials.client_id,
  config.oauth2Credentials.client_secret,
  config.oauth2Credentials.redirect_uris[0]
);

const loginLink = OAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: config.oauth2Credentials.scopes,
});

module.exports = {
  OAuth2Client,
  loginLink,
};
