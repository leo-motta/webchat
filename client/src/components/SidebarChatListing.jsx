import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userService from '../features/user/userService'
import chatService from '../features/chat/chatService'

const SidebarChatListing = (props) => {
    const [chatUserList, setChatUserList] = useState([])

    const { currentUser, userList } = useSelector((state) => state.user)
    const { chatList, currentChat } = useSelector((state) => state.chat)

    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser && chatList) {
            setChatUserList([])
            chatList.forEach((chat) => {
                const userid = (chat.users[0].uid === currentUser._id) ? chat.users[1].uid : chat.users[0].uid

                dispatch(userService.get(userid))
                    .then((data) => {
                        const newUser = data.payload
                        newUser.chatId = chat.chatId
                        newUser.lastMessage = chat.lastMessage
                        setChatUserList((state) => ([...state, newUser]))
                    })
            })
        }
        // eslint-disable-next-line
    }, [chatList, currentUser])

    const createChat = (anotherUser) => {
        if (currentUser) {
            dispatch(chatService.create({ this_userid: currentUser._id, another_userid: anotherUser._id }))
            props.changeIsSearching(false)
        }
    }

    return (
        (props.isSearching && userList && userList.length > 0) ?
            userList
                .filter((user) => user.name !== currentUser.name)
                .map((user) => (
                    <div className=" w-full flex flex-row cursor-pointer" key={user._id} onClick={() => { createChat(user) }}>
                        <img className="object-cover bg-white h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src={user.imageURL} />
                        <div className="flex flex-col my-4">
                            <p className="ml-6 text-xl truncate w-36 mb-1">{user.name}</p>
                            <p className="ml-6 truncate w-36 mb-1">online</p>
                        </div>
                    </div>
                ))
            :
            (chatUserList) ?
                chatUserList
                    .sort((a, b) => { return new Date(b.lastMessage.date) - new Date(a.lastMessage.date) })
                    .map((chatUser) => {
                        const chatListingClassName = (chatUser.chatId === currentChat.chatId ) ? "border-l-4 border-sky-400 w-full flex flex-row cursor-pointer" : "w-full flex flex-row cursor-pointer"
                        return (
                            <div className={chatListingClassName} key={chatUser._id} onClick={() => { dispatch(chatService.get(chatUser.chatId)) }}>
                                <img className="object-cover bg-white h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src={chatUser.imageURL} />
                                <div className="flex flex-col my-4 max-w-2">
                                    <p className="ml-6 text-xl truncate w-36 mb-1">{chatUser.name}</p>
                                    <p className="ml-6 truncate w-36 mb-1">{chatUser.lastMessage.text}</p>
                                </div>
                            </div>
                        )
                    })
                :
                (<p></p>)
    )
}

export default SidebarChatListing