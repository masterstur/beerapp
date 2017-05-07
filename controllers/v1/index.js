'use strict';

const router = require('express').Router();
const routes = require('./routes');

router.use('/beer', routes.beer);

module.exports = router;