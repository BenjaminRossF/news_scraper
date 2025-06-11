const Router = require('koa-router');
const { scrapeExample } = require('../scraper');

const router = new Router();

// GET /api/scrape/
router.get('/', async (ctx) => {
  const data = await scrapeExample();
  ctx.body = data;
});

// Example additional endpoint: GET /api/scrape/info
router.get('/info', async (ctx) => {
  ctx.body = { description: 'This is the scrape API' };
});

module.exports = router;
