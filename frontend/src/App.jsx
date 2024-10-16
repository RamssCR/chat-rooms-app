import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './view/Login'
import Chat from './view/Chat'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </Router>
  )
}

export default App
