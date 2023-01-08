import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import chatService from '../features/chat/chatService'
import { FaRegPaperPlane } from "react-icons/fa"
import { IconContext } from "react-icons";

const Chat = () => {
    const { chat } = useSelector((state) => state.chat)
    const { currentUser } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const [chatUser, setChatUser] = useState({})
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        if (currentUser && chat) {
            (currentUser._id === chat.firstUser.uid) ? setChatUser(chat.secondUser) : setChatUser(chat.firstUser)
        }
        // eslint-disable-next-line
    }, [chat])

    const sendMessage = () => {
        dispatch(chatService.addMessage({
            userid: currentUser._id,
            chatid: chat.chatId,
            message: message
        }))
        dispatch(chatService.search(''))
        setMessage('')
    }


    return (
        <div className="flex flex-col basis-3/4">
            <div className="bg-slate-500 text-white h-24 min-h-24 max-h-24 flex flex-row rounded-tr-lg">

                {(chat && chatUser) ?
                    (
                        <>
                            <img className="h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src={chatUser.imageURL} />
                            <p className="ml-6 text-xl my-8">{chatUser.name}</p>
                        </>
                    )
                    :
                    (
                        <>
                            <img className="h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                            <p className="ml-6 text-xl my-8">Someone</p>
                        </>
                    )}
            </div>

            <div className="bg-slate-200 h-[35em] min-h-[35em] max-h-[35em] overflow-y-scroll relative">
                {
                    (chat && chat.messages && chat.messages.length > 1) &&
                    chat.messages
                        .filter((message) => message.text !== '')
                        .map((message) => {
                            const classVar = (message.senderId === currentUser._id) ? 'flex flex-row-reverse' : 'flex flex-row'
                            const date = new Date(message.date).toLocaleTimeString().substring(0,5)
                            return (
                                <div className={classVar} key={message._id}>
                                    <div className='min-w-[6em] max-width-xl rounded bg-slate-700 text-white  m-2 px-2 pt-4 pb-1 drop-shadow-sm'>
                                        <p className='px-1 text-lg'>{message.text}</p>
                                        <p className='timestamp text-right text-sm text-gray-400'>{date}</p>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            <div>
                <input
                    className="absolute w-[40em] h-[2.7em] pl-6 pr-20 border-t-2 border-gray-300 text-2xl leading-4 text-gray-500 outline-none"
                    placeholder="Write a message"
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => { (e.code === "Enter") && sendMessage() }}
                    value={message}
                />
                <button
                    className="absolute  ml-[56em] bg-red h-[4em] w-10 ml-6"
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
