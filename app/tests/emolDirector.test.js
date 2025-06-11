jest.setTimeout(60000);

const emolDirector = require('../src/utils/scrappers/emolDirector');
const puppeteer = require('puppeteer');
const sampleData = require('./emolPageInfo.json');
const { describe, it, beforeAll, afterAll, expect } = require('@jest/globals');

describe('emolDirector Tests', () => {
  let browser;
  let page;
  let pageInfo;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
    await page.goto(
      'https://www.emol.com/noticias/Nacional/2025/06/10/1168945/senado-multas-por-no-votar.html'
    );
    const director = new emolDirector(page);
    pageInfo = await director.buildPageInfo();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  it('should build page info correctly', async () => {
    expect(pageInfo).toEqual(sampleData);
  });
});
