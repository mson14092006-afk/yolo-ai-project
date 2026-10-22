import Navbar from './components/Navbar'
import Detection from './pages/Detection'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <Detection />
      </main>
    </>
  )
}
