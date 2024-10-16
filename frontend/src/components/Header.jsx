import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { messageContext } from '../context/MessageContext';

function Header() {
    const navigateTo = useNavigate()
    const { logout } = useContext(messageContext)
    
    return (
        <header className="chat-header">
            <h2 className="chat-name">ChatMong!</h2>
            <button className="btn-exit" onClick={() => {
                navigateTo('/')
                logout()
            }}>Exit Chat</button>
        </header>
    );
}

export default Header;