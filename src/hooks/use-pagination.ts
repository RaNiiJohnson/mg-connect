type UsePaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay: number;
};

type UsePaginationReturn = {
  pages: number[];
  showLeftEllipsis: boolean;
  showRightEllipsis: boolean;
};

export function usePagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay,
}: UsePaginationProps): UsePaginationReturn {
  const showLeftEllipsis = currentPage - 1 > paginationItemsToDisplay / 2;
  const showRightEllipsis =
    totalPages - currentPage + 1 > paginationItemsToDisplay / 2;

  const getPages = () => {
    if (totalPages <= paginationItemsToDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(paginationItemsToDisplay / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = paginationItemsToDisplay;
    }

    if (end > totalPages) {
      start = totalPages - paginationItemsToDisplay + 1;
      end = totalPages;
    }

    if (showLeftEllipsis) {
      start++;
    }

    if (showRightEllipsis) {
      end--;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getPages();

  return {
    pages,
    showLeftEllipsis,
    showRightEllipsis,
  };
}
