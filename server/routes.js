/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/config', require('./api/config'));

  app.route('/MP_verify_:mpId.txt').get(function(req, res){
    res.send(req.params.mpId);
  })
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  app.route('/page').get(function(req,res){
    res.sendfile(app.get('appPath') + '/page.html');
  });
  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
