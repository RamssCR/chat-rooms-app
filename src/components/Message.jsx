import { useContext } from "react"
import { messageContext } from "../context/MessageContext"

/* eslint-disable react/prop-types */
function Message({username, body, time, reference}) {
    const {user} = useContext(messageContext)
    return (
        <article ref={reference} className={`message-card ${username === user.username ? 'sender' : 'receiver'}`}>
            <span className="username">{username}</span>
            <span className="description">{body}</span>
            <span className="time">{time}</span>
        </article>
    );
}

export default Message;