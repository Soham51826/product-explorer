function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Previous
      </button>

      <div className="page-indicator">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;