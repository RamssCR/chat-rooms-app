import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './view/Login'
import Chat from './view/Chat'
import { useContext } from 'react'
import { messageContext } from './context/MessageContext'

function App() {
  const {dialogMessages, removeDialogMessage} = useContext(messageContext)

  return (<>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </Router>
    <div className="dialog">
      {dialogMessages.map((dialogMessage, index) => {
        setTimeout(() => {
            removeDialogMessage(dialogMessage)
        }, 2500);

        return <span className="message-dialog" key={index}>{dialogMessage}</span>
      })}       
    </div>
  </>)
}

export default App
