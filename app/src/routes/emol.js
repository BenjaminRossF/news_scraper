const Router = require('koa-router');
const emolController = require('../controllers/emol');

const router = new Router();

// GET /emol/
router.get('emol.get', '/', emolController.getEmolNews);

// Example additional endpoint: GET /api/scrape/info
router.get('/info', async (ctx) => {
  ctx.body = { description: 'This is the scrape API' };
});
