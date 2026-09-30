// result: { detections: [{ label, confidence, box: {x, y, width, height} }], imageWidth, imageHeight }
// box toạ độ tính theo pixel gốc của (imageWidth x imageHeight) do backend trả về,
// component tự quy đổi (%) để vẽ overlay đúng theo kích thước hiển thị thực tế.
export default function DetectionResult({ imageUrl, result }) {
  if (!result) return null

  const { detections, imageWidth, imageHeight } = result

  return (
    <div className="result">
      <div className="result-canvas">
        <img src={imageUrl} alt="Detection input" />
        <div className="result-boxes">
          {detections.map((det, i) => (
            <div
              key={i}
              className="result-box"
              style={{
                left: `${(det.box.x / imageWidth) * 100}%`,
                top: `${(det.box.y / imageHeight) * 100}%`,
                width: `${(det.box.width / imageWidth) * 100}%`,
                height: `${(det.box.height / imageHeight) * 100}%`,
              }}
            >
              <span className="result-box-label">
                {det.label} · {(det.confidence * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="result-heading">Detection Confidence</h2>

      <div className="result-grid">
        {detections.map((det, i) => (
          <div key={i} className="result-card">
            <span className="result-card-percent">
              {(det.confidence * 100).toFixed(1)}%
            </span>
            <span className="result-card-label">{det.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
