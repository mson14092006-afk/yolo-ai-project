import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="home">
      <h1>YOLO Object Detection</h1>
      <p>
        Upload một bức ảnh, hệ thống sẽ phát hiện các đối tượng trong ảnh
        và hiển thị nhãn cùng độ tin cậy tương ứng.
      </p>
      <Link to="/detection" className="btn btn-primary">
        Bắt đầu Detect
      </Link>
    </section>
  )
}
