import { useState } from 'react'
import Coupons from './pages/Coupons'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Coupons/>
    </>
  )
}

export default App
