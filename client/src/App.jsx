import { useState } from 'react'
import Coupons from './pages/Coupons'
import Cart from './pages/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Coupons /> */}
      <Cart />
    </>
  )
}

export default App
