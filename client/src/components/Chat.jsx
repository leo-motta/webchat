import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../features/user/userService'
import chatService from '../features/chat/chatService'
import { FaRegPaperPlane } from "react-icons/fa"
import { IconContext } from "react-icons"

const Chat = () => {
    const { currentChat } = useSelector((state) => state.chat)
    const { currentUser } = useSelector((state) => state.user)

    const [chatUser, setChatUser] = useState({})
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser && currentChat) {
            (currentUser._id === currentChat.users[0].uid) ?
                dispatch(userService.get(currentChat.users[1].uid)).then((data) => {setChatUser(data.payload)})
                :
                dispatch(userService.get(currentChat.users[0].uid)).then((data) => {setChatUser(data.payload)})
        }
        // eslint-disable-next-line
    }, [currentChat])

    const sendMessage = () => {
        dispatch(chatService.addMessage({
            userid: currentUser._id,
            chatid: currentChat.chatId,
            message: message
        }))
        dispatch(chatService.search(currentUser._id))
        setMessage('')
    }


    return (
        <div className="flex flex-col basis-3/4">
            <div className="bg-slate-500 text-white h-24 min-h-24 max-h-24 flex flex-row rounded-tr-lg">

                {(currentChat && chatUser) ?
                    (
                        <>
                            <img className="object-cover bg-white h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src={chatUser.imageURL} />
                            <p className="ml-6 text-xl my-8">{chatUser.name}</p>
                        </>
                    )
                    :
                    (
                        <>
                        </>
                    )}
            </div>

            <div className="bg-white h-[35em] min-h-[35em] max-h-[35em] overflow-y-scroll relative">
                {
                    (currentChat && currentChat.messages && currentChat.messages.length > 1) &&
                    currentChat.messages
                        .filter((message) => message.text !== '')
                        .map((message) => {
                            const classVar = (message.senderId === currentUser._id) ? 'flex flex-row-reverse' : 'flex flex-row'
                            const date = new Date(message.date).toLocaleTimeString().substring(0, 5)
                            return (
                                <div className={classVar} key={message._id}>
                                    <div className='min-w-[6em] max-w-[26em] rounded bg-sky-600 text-white  m-2 px-2 pt-4 pb-1 drop-shadow-sm'>
                                        <p className='px-1 text-lg break-words'>{message.text}</p>
                                        <p className='timestamp mt-2 text-right text-sm text-gray-300'>{date}</p>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            <div>
                <input
                    className="absolute w-[40em] h-[2.7em] pl-6 pr-20 border-t-2 border-gray-300 text-2xl leading-4 text-gray-500 outline-none rounded-br"
                    placeholder="Write a message"
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => { (e.code === "Enter") && sendMessage() }}
                    value={message}
                />
                <button
                    className="absolute  ml-[56em] h-[4em] w-10 ml-6"
                    onClick={sendMessage}
                >
                    <IconContext.Provider value={{ size: "2em", className: "text-slate-500" }}>
                        <FaRegPaperPlane />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}

export default Chat
