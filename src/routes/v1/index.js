const express = require('express');

const { InfoController } = require('../../controllers');

const airplaneRoutes = require('./airplane-route');
const cityRoutes = require('./city-route');

const router = express.Router();

router.use('/airplanes', airplaneRoutes);
router.use('/cities', cityRoutes);


router.get('/info', InfoController.info);

module.exports = router;