import { useState } from 'react'
import DeletionDemo from './components/DeletionDemo'

function App() {
  const [showDemo, setShowDemo] = useState(true)

  return (
    <div>
      <h1>React DOM删除行为演示</h1>
      <div>
        {showDemo && <DeletionDemo onUnmount={() => setShowDemo(false)} />}
        {!showDemo && (
          <button onClick={() => setShowDemo(true)}>
            重新挂载组件
          </button>
        )}
      </div>
    </div>
  )
}

export default App
