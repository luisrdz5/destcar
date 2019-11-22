const passport = require('passport');
const axios =require('axios');
const boom = require('@hapi/boom');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const { config } = require('../../../config');

passport.use(new LinkedInStrategy({
    clientID: config.linkedinClientId,
    clientSecret: config.linkedinClientSecret,
    callbackURL: "/auth/linkedin/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const email =  profile.email
      ?  profile.email
      : `${profile.id}@linkedin.com`
        const { data, status } = await axios({
          url: `${config.apiUrl}/api/auth/sign-provider`,
          method: "post",
          data: {
              name: profile.displayName,
              email: email,
              password: profile.id,
              apiKeyToken: config.apiKeyToken
          }
        });
        if (!data || status !== 200) {
          return done(boom.unauthorized(), false);
        }
  
        return done(null, data);
  

    }catch(error){
      return done(error);
    }
  }
));