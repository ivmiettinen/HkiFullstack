import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.message)

    //*/state.notif*/

    // console.log('notification[0].type:', notification[0].type)
    // console.log('notification[0].content', notification[0].content)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    }

    if (notification[0].type === 'NEW_ANECDOTE1') {
        return (
            <div style={style}>
                {notification.map((notif, index) => (
                    <div key={index}>
                        <div>You voted '{notif.content}'</div>
                    </div>
                ))}
            </div>
        )
    }
    if (
        notification[0].type === undefined &&
        notification[0].content === undefined
    ) {
        return (
            <div style={style}>
                {notification.map((notif, index) => (
                    <div key={index}>
                        <div>{notif.content}</div>
                    </div>
                ))}
            </div>
        )
    } else if (
        notification[0].type === undefined &&
        notification[0].content !== ''
    ) {
        return (
            <div style={style}>
                {notification.map((notif, index) => (
                    <div key={index}>
                        <div>You created anecdote: '{notif.content}'</div>
                    </div>
                ))}
            </div>
        )
    }else{
        return(<></>)
    }
}

export default Notification
