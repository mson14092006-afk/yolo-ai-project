import { useRef, useState } from 'react'

export default function ImageUploader({ onSelectImage, previewUrl }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleFiles(files) {
    const file = files?.[0]
    if (file && file.type.startsWith('image/')) {
      onSelectImage(file)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="uploader">
      <div
        className={`uploader-dropzone ${isDragging ? 'is-dragging' : ''} ${previewUrl ? 'has-preview' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="uploader-preview" />
        ) : (
          <div className="uploader-placeholder">
            <span className="uploader-icon">↑</span>
            <p className="uploader-text">Drag & drop your image</p>
            <p className="uploader-or">or</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => inputRef.current?.click()}
            >
              Choose Image
            </button>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
