const router = require('express').Router();
const userRoutes = require('./user-routes');
const artRoutes = require('./art-routes');

router.use('/users', userRoutes);
router.use('/art', artRoutes)
module.exports = router;
