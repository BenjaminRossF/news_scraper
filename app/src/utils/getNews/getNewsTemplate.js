const puppeteer = require('puppeteer');

class GetNewsTemplate {
    constructor(link) {
        this.link = link;
    }

    async getPageInfo(amount = 10) {
        const browser = await this._createBrowser();
        const page = await browser.newPage();
        let newsInformation;

        try {
            await page.goto(this.link);
            const newsLinks = await this._getNewsLinks(page, amount);
            newsInformation = await this._getPageInfoByLinkArray(page, newsLinks);
            return newsInformation;

        } catch (error) {
            throw error;
        } finally {
            await browser.close();
        }
    }

    async _createBrowser() {
      return puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    async _getNewsLinks(page, amount) {
        throw new Error("Protected method '_getNewsLinks' must be implemented");
    }

    async _getPageInfoByLinkArray(page, linkArray) {
        throw new Error("Protected method '_getPageInfoByLinkArray' must be implemented");
    }
}

module.exports = GetNewsTemplate;