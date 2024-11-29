import { useState } from 'react';

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function nextPage() {
    setCurrentPage((current) => Math.min(current + 1, maxPage));
  }

  function prevPage() {
    setCurrentPage((current) => Math.max(current - 1, 1));
  }

  function goToPage(page: number) {
    const pageNumber = Math.max(1, Math.min(page, maxPage));
    setCurrentPage(pageNumber);
  }

  return {
    currentPage,
    maxPage,
    currentItems,
    nextPage,
    prevPage,
    goToPage,
  };
}