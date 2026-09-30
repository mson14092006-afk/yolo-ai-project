export default function Loading({ label = 'Đang xử lý...' }) {
  return (
    <div className="loading">
      <span className="loading-spinner" />
      <span>{label}</span>
    </div>
  )
}
