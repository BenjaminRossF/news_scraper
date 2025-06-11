const Router = require('koa-router');
const puppeteer = require('puppeteer');
const emolDirector = require('../scrappers/emolDirector');

const router = new Router();

// GET /emol/
router.get('/', async (ctx) => {
  console.log('Received request for /emol/');
  const firstLink = 'https://www.emol.com';
  try {
    const newsInformation = await getPageInfo(firstLink);
    ctx.body = newsInformation;
  } catch (error) {
    console.error('Error scraping page:', error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to scrape the page' };
  }
});

// Example additional endpoint: GET /api/scrape/info
router.get('/info', async (ctx) => {
  ctx.body = { description: 'This is the scrape API' };
});

async function getPageInfo(link, amount = 10) {
  const browser = await createBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(link);
    const newsLinks = await getNewsLinks(page, amount);
    printArray(newsLinks);
    newsInformation = await getPageInfoByLinkArray(page, newsLinks);
    console.log("Information scrapped successfully");
    return newsInformation;

  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }
}

function printArray(array) {
    array.forEach((item, index) => {
        console.log(`${index + 1}: ${item}`);
    });
}

async function getNewsLinks(page, amount) {
  const relevantNews = await page.$('.cont_378_e_2015') 
  let newsLinks = await relevantNews.$$eval('a[href*="noticias/"]', (links) =>
    links.map((link) => link.href)
  );
  newsLinks = filterLinks(newsLinks);
  newsLinks.splice(amount);
  return newsLinks;
}

function createBrowser() {
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

async function getPageInfoByLinkArray(page, linkArray) {
  let pagesInfo = [];
  for (const link of linkArray) {
    await page.goto(link);
    const pageInfo = await createPageInfo(page);
    pagesInfo.push(pageInfo);
  }
  return pagesInfo;
}

async function createPageInfo(page) {
  const director = new emolDirector(page);
  const newsInfo = await director.buildPageInfo();
  return newsInfo;
}

function filterLinks(links) {
  const deduped = [...new Set(links)];
  return deduped.filter((link) => !link.includes('#comentarios'));
}

module.exports = { router, getPageInfo };
