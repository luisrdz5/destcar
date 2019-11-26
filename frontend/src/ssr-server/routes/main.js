import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Routes from '../../frontend/routes/serverRoutes';
import reducer from '../../frontend/reducers/index';
import render from '../render/index';
import polyfill from '@babel/polyfill'; // eslint-disable-line

require('dotenv').config();

/*

          { 'lat': 19.4255964, 'lng': -99.17187729999999 },
          { 'lat': 19.4265357, 'lng': -99.16958269999999 },
          { 'lat': 19.4254854, 'lng': -99.1717721 },
          { 'lat': 19.4255964, 'lng': -99.17187729999999 },
          { 'lat': 19.4251133, 'lng': -99.17138829999999 },
          { 'lat': 19.4254854, 'lng': -99.1717721 },
          { 'lat': 19.4222107, 'lng': -99.1701959 },
          { 'lat': 19.4251133, 'lng': -99.17138829999999 },
          { 'lat': 19.4257718, 'lng': -99.1532533 },
          { 'lat': 19.4222107, 'lng': -99.1701959 },
          { 'lat': 19.4241749, 'lng': -99.13713659999999 },
          { 'lat': 19.4257718, 'lng': -99.1532533 },
          { 'lat': 19.4240908, 'lng': -99.1347076 },
          { 'lat': 19.4241749, 'lng': -99.13713659999999 },
          { 'lat': 19.4319716, 'lng': -99.1334254 },
          { 'lat': 19.4240908, 'lng': -99.1347076 },
          { 'lat': 19.4319574, 'lng': -99.13330669999999 },
          { 'lat': 19.4319716, 'lng': -99.1334254 }
*/
const main = async (req, res, next) => {
  try {
    let initialState;
    try {
      const { token, email, name, id } = req.cookies;
      let user = {};
      if (email || name || id) {
        user = {
          id,
          email,
          name,
        };
      }
      initialState = {
        user,
        defaultLocation: { lat: 19.42672619, lng: -99.1718706 },
        zoom: 14,
        from: {},
        to: {},
        distance: 0,
        time: 0,
        money: 0.00,
        country: 'mexico',
        route: [
          { lat: 19.42672619, lng: -99.1718706 },
          { lat: 19.4428928, lng: -99.1718706 },
        ],
        routeVisible: true,
      };

    } catch (err) {
      initialState = {
        defaultLocation: { lat: 19.42672619, lng: -99.1718706 },
        zoom: 14,
        from: { lat: 19.42672619, lng: -99.1718706 },
        to: { lat: 19.4428928, lng: -99.1718706 },
        distance: 0,
        time: 0,
        money: 0.00,
        country: 'mexico',
        route: [],
      };
      console.log(err);
    }
    const isLogged = (initialState.user.id);
    const store = createStore(reducer, initialState);
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={{}}
        >
          {renderRoutes(Routes(isLogged))}
        </StaticRouter>
      </Provider>,
    );
    const preloadedState = store.getState();
    res.send(render(html, preloadedState));
  } catch (err) {
    next(err);
  }
};
export default main;
