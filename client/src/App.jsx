import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <button  className=" bg-amber-400 text-white hover:bg-red-600 hover:text-black hover:p-3 " onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
       
    </>
  )
}

export default App
