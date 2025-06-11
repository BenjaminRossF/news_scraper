const Router = require('koa-router');
const scraperRouter = require('./emol'); 
const otherRouter = require('./otherRouter'); // You can add more

const router = new Router();

router.use('/emol', scraperRouter.routes());
router.use('/bbc', otherRouter.routes());

module.exports = router;