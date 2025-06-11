jest.setTimeout(60000);

const GetEmolNews = require('../src/utils/getNews/getNewsEmol');
const { describe, it, beforeAll, afterAll, expect } = require('@jest/globals');

describe('GetEmolNews', () => {
    it('should fetch 10 news by default', async () => {
        const url = 'https://www.emol.com';
        const emolNews = new GetEmolNews(url);
        const news = await emolNews.getPageInfo();
        
        expect(news).toBeDefined();
        expect(news.length).toBe(10);
    });

    it('should fetch 5 news when limit is set to 5', async () => {
        const url = 'https://www.emol.com';
        const emolNews = new GetEmolNews(url);
        const news = await emolNews.getPageInfo(5);
        
        expect(news).toBeDefined();
        expect(news.length).toBe(5);
    });

    it('should fetch news with correct structure', async () => {
        const url = 'https://www.emol.com';
        const emolNews = new GetEmolNews(url);
        const news = await emolNews.getPageInfo();
        
        expect(news[0]).toHaveProperty('title');
        expect(news[0]).toHaveProperty('epigraph');
        expect(news[0]).toHaveProperty('chapters');
        expect(news[0]).toHaveProperty('source');
    });

    it('should handle empty page gracefully', async () => {
        const url = 'https://www.pagdsfafae'; // Invalid URL to simulate error
        const emolNews = new GetEmolNews(url);
        await expect(emolNews.getPageInfo()).rejects.toThrow();
    });
});