const Koa = require('koa');
const router = require('./routes/scraperRouter');
require('dotenv').config(); // Load environment variables from .env file

const app = new Koa();

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});