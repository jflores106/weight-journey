const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const options = {
    'title': 'Weight-Journey',
    'name': 'Weight-Journey App',
    'styles': ['/stylesheets/style.css', '/stylesheets/style2.css']
  }
  res.render('index', options);

});

module.exports = router;
