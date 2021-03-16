class PhotoPagination {
  constructor(selector, totalPages) {
    this.element = document.querySelector(selector);
    this.currentPage = 1;
    this.totalPages = totalPages;
  }

  loadMore() {
    if (this.currentPage === this.totalPages) {
      return;
    }
    this.currentPage += 1;
  }
}

export default PhotoPagination;
