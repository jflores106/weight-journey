const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
  const options = {
    'title': 'Weight-Journey',
    'tabName': 'Weight-Journey App',
    'styles': ['/stylesheets/style.css', '/stylesheets/style2.css'],
    'isHomeActive': 'active'
  }
  res.render('index', options);
});

module.exports = router;
