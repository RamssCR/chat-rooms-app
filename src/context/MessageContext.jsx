import { createContext, useState, useEffect, useRef } from 'react'
import { socket } from '../socket'

// eslint-disable-next-line react-refresh/only-export-components
export const messageContext = createContext()

// eslint-disable-next-line react/prop-types
export function MessageContext({children}) {
    const [messages, setMessages] = useState([])
    const [dialogMessages, setDialogMessages] = useState([])
    const [user, setUser] = useState({
        username: undefined,
        room: undefined
    })

    const [users, setUsers] = useState([])

    const scrollDown = useRef(null)
    const changeScroll = () => scrollDown.current && scrollDown.current.scrollIntoView({ behavior: 'smooth'})

    useEffect(() => {
        socket.on('dialog message', message => setDialogMessages([...dialogMessages, message]))
    }, [dialogMessages])

    useEffect(() => {socket.on('users', joinedUser => setUsers(joinedUser))}, [users])

    useEffect(() => {
        socket.on('received message', ({ body, username, time }) => {
            const newMessage = {
                body,
                username, 
                time
            }

            setMessages([...messages, newMessage])
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages])

    const sendToRoom = (userConfig) => socket.emit('join', userConfig)
    const sendMessage = (messageConfig) => socket.emit('sent message', messageConfig)
    const logout = () => socket.emit('leave')

    const removeDialogMessage = (message) => setDialogMessages(dialogMessages.filter(dialogMessage => dialogMessage !== message))
    const removeMessages = () => setMessages([])

    return (
        <messageContext.Provider value={{
            dialogMessages, 
            user, 
            setUser,
            users,
            sendToRoom, 
            sendMessage, 
            messages, 
            setMessages,
            scrollDown,
            removeDialogMessage,
            removeMessages,
            changeScroll,
            logout
            }}>
            {children}
        </messageContext.Provider>
    )
}