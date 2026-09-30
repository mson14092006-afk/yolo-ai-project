// Mọi giao tiếp với backend đi qua file này.
// Sau này chỉ cần sửa hàm detectObjects() để gọi FastAPI thật,
// UI và hooks không cần thay đổi.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const MOCK_RESULTS = [
  { label: 'person', confidence: 0.952, box: { x: 120, y: 60, width: 180, height: 340 } },
  { label: 'car', confidence: 0.871, box: { x: 20, y: 220, width: 220, height: 140 } },
  { label: 'dog', confidence: 0.914, box: { x: 340, y: 260, width: 140, height: 120 } },
]

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Mock detection - giả lập network + inference latency.
// Khi có FastAPI, thay toàn bộ thân hàm này bằng:
//
// export async function detectObjects(imageFile) {
//   const formData = new FormData()
//   formData.append('file', imageFile)
//   const response = await fetch(`${API_BASE_URL}/api/v1/detection`, {
//     method: 'POST',
//     body: formData,
//   })
//   if (!response.ok) throw new Error('Detection request failed')
//   return response.json()
// }
export async function detectObjects(imageFile) {
  await delay(1500)

  if (!imageFile) {
    throw new Error('No image provided')
  }

  return {
    detections: MOCK_RESULTS,
    imageWidth: 640,
    imageHeight: 480,
  }
}

export { API_BASE_URL }
