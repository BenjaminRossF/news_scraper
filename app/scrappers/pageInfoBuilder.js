class pageInfoBuilder {
  constructor() {
    this._pageInfo = {
      title: '',
      epigraph: '',
      chapters: [],
      source: '',
    };
  }

  setTitle(title, epigraph) {
    this._pageInfo.title = title;
    if (epigraph) {
      this._pageInfo.epigraph = epigraph;
    }
  }

  addChapter(chapterTitle, paragraphs) {
    const chapters = {
      title: chapterTitle,
      paragraphs: paragraphs,
    };
    this._pageInfo.chapters.push(chapters);
  }

  setSource(source) {
    this._pageInfo.source = source;
  }

  getResult() {
    return this._pageInfo;
  }
}

module.exports = pageInfoBuilder;
