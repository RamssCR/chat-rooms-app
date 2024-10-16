import { useContext, useState } from 'react'
import userIcon from '../assets/user-regular.svg'
import shareIcon from '../assets/share-solid.svg'
import { messageContext } from '../context/MessageContext'
import { formatTime } from '../getHour'

function Input() {
    const [message, setMessage] = useState('')
    const {sendMessage, user, setMessages, messages, changeScroll} = useContext(messageContext)
    const time = formatTime()

    const handleSubmit = () => {
        const messageConfig = {
            body: message,
            username: user.username,
            room: user.room,
            time
        }

        sendMessage(messageConfig)
        setMessages([...messages, {
            body: message,
            username: user.username,
            time
        }])

        changeScroll()
        setMessage('')
    }

    return (
        <article className="input-container">
            <div className="user-img-input">
                <img src={userIcon} alt="typing user" />
                <input 
                    type="text" 
                    className='input-message' 
                    value={message} 
                    placeholder='Send a message...' 
                    onInput={(e) => setMessage(e.target.value)}
                    onKeyUp={(e) => {e.key === 'Enter' && handleSubmit()}}
                />
            </div>
            <button className='btn-send' onClick={handleSubmit}><img src={shareIcon} alt="send" /></button>
        </article>
    );
}

export default Input;