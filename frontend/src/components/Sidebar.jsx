import { useContext } from 'react';
import room from '../assets/house-solid.svg'
import userIcon from '../assets/user-regular.svg'
import { messageContext } from '../context/MessageContext';

// eslint-disable-next-line react/prop-types
function Sidebar({ roomName }) {
    const {users} = useContext(messageContext)

    return (
        <aside className="sidebar">
            <article className="room-info">
                <div className="room-title">
                    <img src={room} alt="room" />
                    <h3 className="title">Room</h3>
                </div>
                <span className="roomname">{roomName}</span>
            </article>
            <article className="users-connected">
                <h3 className="title">Users</h3>
                <div className="users-container">
                    {users.map(user => (
                        <div className="user" key={user.id}>
                            <img src={userIcon} alt="user" />
                            <span className="username">{user.username}</span>
                        </div>
                    ))}
                </div>
            </article>
        </aside>
    );
}

export default Sidebar;