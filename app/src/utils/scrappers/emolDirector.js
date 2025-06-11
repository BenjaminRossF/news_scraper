const pageInfoBuilder = require('./pageInfoBuilder');

class emolDirector {
  constructor(page) {
    this._builder = new pageInfoBuilder();
    this._page = page;
  }

  async buildPageInfo() {
    await this.#setTitle();
    await this.#setChapters();
    await this.#setSource();
    return this._builder.getResult();
  }

  async #setTitle() {
    await this._page.waitForSelector('.cont_new_detalle_noti');
    const titleElement = await this._page.$('.cont_new_detalle_noti');
    const title = await titleElement.$eval('h1', (el) => el.textContent.trim());
    const epigraphElement = await titleElement.$eval('h2', (el) => el.textContent.trim());
    const epigraph = epigraphElement ? epigraphElement : '';
    this._builder.setTitle(title, epigraph);
  }

  async #setChapters() {
    await this._page.waitForSelector('#cuDetalle_cuTexto_textoNoticia');
    const chapterElements = await this._page.$$(
      '#cuDetalle_cuTexto_textoNoticia div:not([id]):not([class])'
    );
    let currentChapter = {
      title: 'Cuerpo de la noticia:',
      paragraphs: [],
    };
    for (const chapterElement of chapterElements) {
      if (chapterElement === null) {
        continue;
      }
      await this.#manageChapterElement(currentChapter, chapterElement);
    }
    this._builder.addChapter(currentChapter.title, currentChapter.paragraphs);
  }
  async #setSource() {
    const source = await this._page.url();
    this._builder.setSource(source);
  }

  async #manageChapterElement(currentChapter, chapterElement) {
    const isElementAnotherNews = await chapterElement.$('div');
    if (isElementAnotherNews) {
      return;
    }
    const isElementTitle = await chapterElement.$('h2');
    if (isElementTitle) {
      this._builder.addChapter(currentChapter.title, currentChapter.paragraphs);
      currentChapter.title = await chapterElement.$eval('h2', (el) => el.textContent.trim());
      currentChapter.paragraphs = [];
    } else {
      const paragraph = await chapterElement.evaluate((el) => el.textContent.trim());
      currentChapter.paragraphs.push(paragraph);
    }
  }
}

module.exports = emolDirector;
