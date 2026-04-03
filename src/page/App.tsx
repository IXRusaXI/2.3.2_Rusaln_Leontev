import { useState } from 'react'
import Header from '../widgets/Header/Header'
import Catalog from '../widgets/Catalog/Catalog'
import Modal from '../widgets/Modal/Modal'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (<div className='app'>
        <Header />
        <Catalog />
    </div>
  )
}

export default App
