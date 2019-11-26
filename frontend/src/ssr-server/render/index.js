import getManifest from '../getManifest';

const files = getManifest();

const render = (html, preloadedState) => {
  return `
    <!DOCTYPE html>
        <html lang="es">
            <head>
                <title>DestCar</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6goRNCL-UFkReqn_Ll9_lgpZtq5D9Rdw&libraries=places&language=es"></script>
                <link rel="stylesheet" href="${files ? files['main.css'] : 'assets/app.css'}" type="text/css"></link>
            </head>
            <body>
                <div id="app"> ${html} </div>
                <script>
                // WARNING: See the following for security issues around embedding JSON in HTML:
                // http://redux.js.org/recipes/ServerRendering.html#security-considerations
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
              </script>
              <script src="${files ? files['main.js'] : 'assets/app.js'}" type="text/javascript"></script>
              <script src="${files ? files['vendors.js'] : 'assets/vendor.js'}" type="text/javascript"></script>
            </body>
        </html>
    `;
};

export default render;
