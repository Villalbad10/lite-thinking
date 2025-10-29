const Paginator = ({
  currentPage = 0,
  pageSize = 10,
  totalPages = 1,
  totalElements = 0,
  onPageChange,
  onPageSizeChange,
  disabled = false,
}) => {
  const canPrev = currentPage > 0;
  const canNext = currentPage + 1 < totalPages;

  const handlePrev = () => {
    if (canPrev && onPageChange) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (canNext && onPageChange) onPageChange(currentPage + 1);
  };

  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <div className="text-sm text-gray-600">
        Página <span className="font-medium">{currentPage + 1}</span> de{' '}
        <span className="font-medium">{Math.max(totalPages, 1)}</span>
        {typeof totalElements === 'number' ? (
          <span className="ml-2">(Total: {totalElements})</span>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Tamaño:</label>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          disabled={disabled}
        >
          {[5, 10, 20, 50].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="flex items-center gap-2 ml-2">
          <button
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            onClick={handlePrev}
            disabled={!canPrev || disabled}
          >
            Anterior
          </button>
          <button
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            onClick={handleNext}
            disabled={!canNext || disabled}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paginator;


