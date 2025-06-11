const GetNewsEmol = require('../utils/getNews/getNewsEmol');

function getHomePageInfo(ctx) {
  const url = 'https://www.emol.com';
  const emolNews = new GetNewsEmol(url);
  
  try {
    const pageInfo = emolNews.getPageInfo();
    ctx.body = pageInfo;
  } catch (error) {
    console.error('Error fetching home page info:', error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch home page info' };
  }
}

module.exports = { getHomePageInfo };