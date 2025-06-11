const GetNewsTemplate = require("./getNewsTemplate");
const emolDirector = require("../scrappers/emolDirector");

class GetEmolNews extends GetNewsTemplate {
    constructor(url) {
        super(url);
    }
    async _getNewsLinks(page, amount) {
        const relevantNews = await page.$('.cont_378_e_2015') 
        let newsLinks = await relevantNews.$$eval('a[href*="noticias/"]', (links) =>
            links.map((link) => link.href)
        );
        newsLinks = this._filterLinks(newsLinks);
        newsLinks.splice(amount);
        return newsLinks;
    }

    async _getPageInfoByLinkArray(page, linkArray) {
        let pagesInfo = [];
        for (const link of linkArray) {
            await page.goto(link);
            const pageInfo = await this._createPageInfo(page);
            pagesInfo.push(pageInfo);
        }
        return pagesInfo;
    }
    
    _filterLinks(links) {
        const deduped = [...new Set(links)];
        return deduped.filter((link) => !link.includes('#comentarios'));
    }

    async _createPageInfo(page) {
        const director = new emolDirector(page);
        const newsInfo = await director.buildPageInfo();
        return newsInfo;
    }
}

module.exports = GetEmolNews;