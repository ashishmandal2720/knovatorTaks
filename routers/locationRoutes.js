const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');


const {
    dashboard,
    retrievePost
} = require('../controller/locationController');


router.get('/dashboard/post-count', requireAuth, dashboard)
router.post('/blog/nearby', requireAuth, retrievePost)



module.exports = router;