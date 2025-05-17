import React from 'react'

export const Pagination = (
    {onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }
) => {

    const siblingLeft = currentPage - 1;
    const siblingRight = currentPage + 1;

    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    const firstPage = 1;
    const lastPage = Math.ceil(totalCount / pageSize)
    const DOTS = '...';
    const totalPageNumbers = siblingCount + 3;
    const totalPageCount = Math.ceil(totalCount / pageSize)

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    }
    var pageRangeTemp = []
    if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 1 + 2 * siblingCount;
        let leftRange = range(1, leftItemCount);
        pageRangeTemp = [...[...leftRange, DOTS, totalPageCount]];

    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightItemCount = 1 + 2 * siblingCount;
        let rightRange = range(
            totalPageCount - rightItemCount + 1,
            totalPageCount
        );
        pageRangeTemp = [...[firstPage, DOTS, ...rightRange]];

    }

    if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        pageRangeTemp = [...[firstPage, DOTS, ...middleRange, DOTS, totalPageCount]];

    }

    if (!shouldShowLeftDots && !shouldShowRightDots) {
        let numberRange = range(firstPage, lastPage)
        pageRangeTemp = [...[...numberRange]]

    }

    const onNext = () => {
        onPageChange(currentPage + 1);
      };
    
      const onPrevious = () => {
        onPageChange(currentPage - 1);
      };

    return (
        <div className='pagination-layout'>
      <button className='btn btn-outline-secondary pagination-btn'
        onClick={() => onPageChange(firstPage)}
      >{'<<'}</button>
      <button className='btn btn-outline-secondary pagination-btn'
        onClick={onPrevious}
        disabled={currentPage < 2 ? true : false}
      >{'<'}</button>

      {pageRangeTemp.map(pageNumber => {

        return (
          <button className={`btn btn-outline-secondary pagination-btn ` + (currentPage === pageNumber ? 'highlight' : '')} 
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          >{pageNumber}</button>
        )
        
        
      })}



      <button className='btn btn-outline-secondary pagination-btn'
        onClick={onNext}
        disabled={currentPage === lastPage ? true : false}
      >{'>'}</button>
      <button className='btn btn-outline-secondary pagination-btn'
        onClick={() => onPageChange(lastPage)}
      >{'>>'}</button>
    </div>
    )
}
