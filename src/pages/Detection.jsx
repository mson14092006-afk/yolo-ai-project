import ImageUploader from '../components/ImageUploader'
import DetectionResult from '../components/DetectionResult'
import Loading from '../components/Loading'
import { useDetection } from '../hooks/useDetection'

export default function Detection() {
  const { previewUrl, status, result, error, selectImage, runDetection, reset } =
    useDetection()

  return (
    <section className="detection">
      <h1 className="detection-title">Image Analysis</h1>
      <p className="detection-subtitle">Upload an image to analyze</p>

      <ImageUploader onSelectImage={selectImage} previewUrl={previewUrl} />

      {previewUrl && (
        <div className="detection-actions">
          <button
            className="btn btn-primary"
            onClick={runDetection}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Đang detect...' : 'Detect'}
          </button>
          <button className="btn btn-ghost" onClick={reset} disabled={status === 'loading'}>
            Reset
          </button>
        </div>
      )}

      {status === 'loading' && <Loading label="Đang chạy inference (mock)..." />}

      {status === 'error' && <p className="error-text">{error}</p>}

      {status === 'success' && <DetectionResult imageUrl={previewUrl} result={result} />}
    </section>
  )
}
