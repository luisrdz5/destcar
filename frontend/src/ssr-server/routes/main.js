import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from '../../frontend/routes/serverRoutes';
import Layout from '../../frontend/components/Layout';
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
      let movieList = await axios({
        url: `${process.env.API_URL}/api/movies`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });
      let userMovies = await axios({
        url: `${process.env.API_URL}/api/user-movies/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });
      movieList = movieList.data.data;
      userMovies = userMovies.data.data;
      let arrayUser;
      const dataUser = userMovies.map((info) => {
        arrayUser = movieList.filter((movie) => movie.id === info.movieId)
        return (arrayUser[0]);
      });
      initialState = {
        user,
        playing: {},
        myList: dataUser,
        //myList: movieList.filter(movie => movie.contentRating === 'PG' && movie.id),
        trends: movieList.filter((movie) => movie.contentRating === 'PG' && movie.id),
        originals: movieList.filter((movie) => movie.contentRating === 'G' && movie.id),
      };

    } catch (err) {
      initialState = {
        user: {},
        playing: {},
        myList: [],
        trends: {},
        originals: {},
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
          <Layout>
            {renderRoutes(Routes(isLogged))}
          </Layout>
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
