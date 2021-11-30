const router = require('express').Router();

const home = require('./home-routes.js');
const api = require('./api/');
const dashboard = require('./dashboard-routes.js');

router.use('/', home);
router.use('/api', api);
router.use('/dashboard', dashboard);

module.exports = router;
