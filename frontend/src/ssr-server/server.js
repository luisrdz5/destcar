import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import main from './routes/main';

const passport = require('passport');
const session = require('express-session');
const boom = require('@hapi/boom');
const cookieParser = require('cookie-parser');
const axios = require('axios');

dotenv.config();
const { config } = require('./config/index');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

// Agregamos las variables de timpo en segundos
const THIRTY_DAYS_IN_SEC = 2592000000;
const TWO_HOURS_IN_SEC = 7200000;

const app = express();
// body parser
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

//Basic Strategy
require('./utils/auth/strategies/basic');
//OAuth strategy
require('./utils/auth/strategies/oauth');
//Auth Google strategy
require('./utils/auth/strategies/google');
//Auth Twitter strategy
require('./utils/auth/strategies/twitter');
//Auth Facebook strategy
require('./utils/auth/strategies/facebook');
//Auth Linkedin strategy
require('./utils/auth/strategies/linkedin');

app.use(express.static(`${__dirname}/public`));

if (ENV === 'development') {
  console.log('Loading dev config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    contentBase: `https://localhost${PORT}`,
    port: PORT,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFullback: true,
    stats: { colors: true },
  };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log(`Loading ${ENV} config`);
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

app.post('/auth/sign-in', async (req, res, next) => {
  passport.authenticate('basic', (error, data) => {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      req.login(data, { session: false }, async (error) => {
        if (error) {
          next(error);
        }
        const { token, ...user } = data;
        res.cookie('token', token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });
        res.status(200).json(user.user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post('/auth/sign-up', async (req, res, next) => {
  const { body: user } = req;
  const userData = {...user, apiKeyToken: config.apiKeyToken }
  try {
    const dataResponse = await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: 'post',
      data: userData,
    });
    res.status(201).json(dataResponse.data);

  } catch (error) {
    next(error);
  }
});

app.get('/movies', async (req, res, next) => {});

app.post('/user-movies', async (req, res, next) => {
  try {
    const { body: userMovie } = req;
    const { token } = req.cookies;

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'post',
      data: userMovie,
    });

    if (status !== 201) {
      return next(boom.badImplementation());
    }

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

app.delete('/user-movies/:userMovieId', async (req, res, next) => {
  try {
    const { userMovieId } = req.params;
    const { token } = req.cookies;
    console.log(`${config.apiUrl}/api/user-movies/${userMovieId}`);
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'delete',
    });
    if (status !== 200) {
      return next(boom.badImplementation());
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
app.get(
  '/auth/google-oauth',
  passport.authenticate('google-oauth', {
    scope: ['email', 'profile', 'openid'],
  }),
);

app.get(
  '/auth/google-oauth/callback',
  passport.authenticate('google-oauth', { session: false }),
  (req, res, next) => {

    if (!req.user) {
      next(boom.unauthorized());
    }
    const { token, ...user } = req.user;
    console.log(`aqui viene la respuesta:  ${token}`);
    res.cookie('token', token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });
    res.status(200).json(user);
  },
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile', 'openid'],
  }),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;
    res.cookie('email', user.user.email, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });
    res.cookie('id', user.user.id, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });
    res.cookie('name', user.user.name, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });

    res.cookie('token', token, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });
    res.redirect('/');
  },
);

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }
    const { token, ...user } = req.user;
    res.cookie('email', user.user.email, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });
    res.cookie('id', user.user.id, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });
    res.cookie('name', user.user.name, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });

    res.cookie('token', token, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });
    res.redirect('/');
  },
);

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;
    res.cookie('email', user.user.email, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });
    res.cookie('id', user.user.id, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });
    res.cookie('name', user.user.name, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });

    res.cookie('token', token, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });
    res.redirect('/');

  },
);

app.get('/auth/linkedin', passport.authenticate('linkedin'));

app.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', { session: false }),
  (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie('token', token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  },
);

app.get('*', main);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
