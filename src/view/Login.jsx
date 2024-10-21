import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { messageContext } from '../context/MessageContext'

function Login() {
    const { sendToRoom } = useContext(messageContext)
    const { handleSubmit, register, formState: {errors} } = useForm()
    const navigateTo = useNavigate()

    const join_room = (values) => {
        sendToRoom(values)
        navigateTo(`/chat?username=${values.username}&room=${values.room}`)
    }

    return (
        <main className="login-container">
            <form method="post" className="form-login" onSubmit={handleSubmit((values) => join_room(values))}>
                <h1 className="form-title">Login to chat Worldwide!</h1>
                <section className="form-inputs">
                    <article className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" {...register('username', {required: true})} className="input-field" placeholder="i.e carlo_@" />
                        {errors.username && <span className='input-error'>Username must not be empty</span>}
                    </article>
                    <article className="input-group">
                        <label htmlFor="room">Enter a custom room</label>
                        <input type="text" id="room" {...register('room', {required: true})} className="input-field" placeholder="i.e food" />
                        {errors.room && <span className='input-error'>A room is required to create the session</span>}
                    </article>
                    <button className="btn-join">Join a Chat Room</button>
                </section>
            </form>
        </main>
    );
}

export default Login;