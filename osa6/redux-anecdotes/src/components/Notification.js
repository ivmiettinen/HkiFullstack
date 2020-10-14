import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.message)

    //*/state.notif*/

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    }
    return (
        <div style={style}>
            {notification.map((notif, index) => (
                <div key={index}>
                    <div>{notif.content}</div>
                </div>
            ))}
        </div>
    )
}

export default Notification
