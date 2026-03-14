function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Có lỗi: {error.message}</p>
      <button onClick={resetErrorBoundary}>Thử lại</button>
    </div>
  );
}

export default ErrorFallback;