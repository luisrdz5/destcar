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
        zoom: 15,
        from: { lat: 19.42672619, lng: -99.1718706 },
        to:{ lat: 19.4428928, lng: -99.1718706 },
        distance: 0,
        time: 0,
        money: 0.00,
        country: "mexico",
        route: [
          {lat: 19.42672619, lng: -99.1718706},
          {lat: 19.4428928, lng: -99.1718706}
        ]
      };

    } catch (err) {
      initialState = {
        defaultLocation: { lat: 19.42672619, lng: -99.1718706 },
        zoom: 15,
        from: { lat: 19.42672619, lng: -99.1718706 },
        to:{ lat: 19.4428928, lng: -99.1718706 },
        distance: 0,
        time: 0,
        money: 0.00,
        country: "mexico",
        route: [
          {lat: 19.42672619, lng: -99.1718706},
          {lat: 19.4428928, lng: -99.1718706}
        ]
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
