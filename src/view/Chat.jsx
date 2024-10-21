import { useContext, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { messageContext } from '../context/MessageContext'
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Message from '../components/Message'
import Input from "../components/Input"

function Chat() {
    const { setUser, user, messages, scrollDown } = useContext(messageContext)
    const navigateTo = useNavigate()
    
    const useQuery = () => {
        const { search } = useLocation()
        return useMemo(() => new URLSearchParams(search), [search])
    }

    let query = useQuery()

    useEffect(() => {
        if (!query.get('user') && !query.get('room')) navigateTo('/')

        const userConfig = {
            username: query.get('username'),
            room: query.get('room')
        }
        setUser(userConfig)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<>
        <main className="chat-container">
            <Header />
            <section className="sidebar-messages">
                <Sidebar roomName={user.room}/>
                <section className="all-messages-container">
                    <section className="messages">
                        {messages.map((message, index) => (
                            <Message key={index} username={message.username} body={message.body} time={message.time} reference={scrollDown} />
                        ))}
                    </section>
                    <Input />
                </section>
            </section>
        </main>
    </>);
}

export default Chat;