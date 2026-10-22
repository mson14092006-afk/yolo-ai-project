// Mọi giao tiếp với backend đi qua file này.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// Gửi ảnh tới FastAPI, đổi response từ snake_case sang camelCase cho UI.
export async function detectObjects(imageFile) {
  if (!imageFile) {
    throw new Error('No image provided')
  }

  const formData = new FormData()
  formData.append('file', imageFile)

  let response
  try {
    response = await fetch(`${API_BASE_URL}/api/v1/detection`, {
      method: 'POST',
      body: formData,
    })
  } catch {
    throw new Error('Không kết nối được backend')
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.detail || `Detection failed (${response.status})`)
  }

  const data = await response.json()
  return {
    detections: data.detections,
    imageWidth: data.image_width,
    imageHeight: data.image_height,
  }
}

export { API_BASE_URL }