require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8000,
  apiUrl: process.env.API_URL,
  apiKeyToken: process.env.API_KEY_TOKEN,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  twitterConsumerKey:process.env.TWITTER_CONSUMER_KEY,
  TwitterConsumerSecret:process.env.TWITTER_CONSUMER_SECRET,
  sessionSecret:process.env.SESSION_SECRET,
  facebookClientId:process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret:process.env.FACEBOOK_CLIENT_SECRET,
  linkedinClientId:process.env.LINKEDIN_CLIENT_ID,
  linkedinClientSecret:process.env.LINKEDIN_CLIENT_SECRET
};

module.exports = { config }
