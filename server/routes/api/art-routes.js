const router = require('express').Router();
const {
    getAllArtForUser,
    getAllArtForGallery
} = require('../../controllers/user-controller');

// const { authMiddleware } = require('../../utils/auth');

router.route('/user-art').get(getAllArtForUser);

router.route('/gallery-art').get(getAllArtForGallery);

module.exports = router;
