var hbs = require("hbs");

hbs.registerHelper({
  pagination: (pageCount, currentPage, pageRange, path) => {
    let res = "";
    if (currentPage > pageCount) return;

    let PreviousPage = 0,
      NextPage = 0;

    if (pageRange > pageCount) {
      PreviousPage = currentPage - 1;
      NextPage = pageCount - currentPage;
    } else {
      PreviousPage = Math.ceil((pageRange - 1) / 2.0);
      NextPage = Math.floor((pageRange - 1) / 2.0);

      let tmpPrev = 0,
        tmpNext = 0;

      if (PreviousPage > currentPage - 1) {
        tmpPrev = PreviousPage - (currentPage - 1);
        PreviousPage = currentPage - 1;
      }

      if (NextPage > pageCount - currentPage) {
        tmpNext = NextPage - (pageCount - currentPage);
        NextPage = pageCount - currentPage;
      }

      PreviousPage += tmpNext;
      NextPage += tmpPrev;
    }

    if (path.indexOf("?") == -1) {
      path += "?";
    } else {
      path += "&";
    }

    // PreviousPage button
    if (PreviousPage > 0) {
      res += `<li class="paginationjs-prev"><a href="${path}page=${currentPage -
        1}">❮</a></li>`;
    } else {
      res += `<li class="paginationjs-prev disabled"><a>❮</a></li>`;
    }

    // PreviousPage pages
    for (let i = 0; i < PreviousPage; i++) {
      let page = currentPage - PreviousPage + i;

      res += `<li class="paginationjs-page J-paginationjs-page"><a href="${path}page=${page}">${page}</a></li>`;
    }

    // Current page
    res += `<li class="paginationjs-page J-paginationjs-page active"><a>${currentPage}</a></li>`;

    // Next pages
    for (let i = 0; i < NextPage; i++) {
      let page = currentPage + 1 + i;
      res += `<li class="paginationjs-page J-paginationjs-page"><a href="${path}page=${page}">${page}</a></li>`;
    }

    // Next button
    if (NextPage > 0) {
      res += `<li class="paginationjs-next"><a href="${path}page=${currentPage +
        1}">❯</a></li>`;
    } else {
      res += `<li class="paginationjs-next disabled"><a>❯</a></li>`;
    }
    return res;
  }
});