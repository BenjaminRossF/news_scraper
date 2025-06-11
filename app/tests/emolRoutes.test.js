jest.setTimeout(30000);

const emolDirector = require('../scrappers/emolDirector');
const puppeteer = require('puppeteer');
const sampleData = require('./emolPageInfo.json');
const { describe, it, beforeAll, afterAll, expect } = require('@jest/globals');

describe('getPageInfo function', () => {
    let browser;
    let page;
    
    beforeAll(async () => {
        browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        page = await browser.newPage();
    });
    
    afterAll(async () => {
        if (browser) {
        await browser.close();
        }
    });
    
    it('should scrape the page and return news information', async () => {
        const link = 'https://www.emol.com/noticias/Nacional/2025/06/10/1168945/senado-multas-por-no-votar.html';
        const director = new emolDirector(page);
        const newsInformation = await director.getPageInfo(link);
        
        expect(newsInformation).toEqual(sampleData);
    });
});