import { useState, useCallback } from 'react'
import { detectObjects } from '../services/api'

// Quản lý toàn bộ state của flow: chọn ảnh -> preview -> detect -> result.
export function useDetection() {
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const selectImage = useCallback((file) => {
    if (!file) return

    setImageFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setStatus('idle')
    setResult(null)
    setError(null)
  }, [])

  const runDetection = useCallback(async () => {
    if (!imageFile) return

    setStatus('loading')
    setError(null)

    try {
      const data = await detectObjects(imageFile)
      setResult(data)
      setStatus('success')
    } catch (err) {
      setError(err.message || 'Detection failed')
      setStatus('error')
    }
  }, [imageFile])

  const reset = useCallback(() => {
    setImageFile(null)
    setPreviewUrl(null)
    setStatus('idle')
    setResult(null)
    setError(null)
  }, [])

  return {
    imageFile,
    previewUrl,
    status,
    result,
    error,
    selectImage,
    runDetection,
    reset,
  }
}
