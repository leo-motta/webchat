import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import chatService from '../features/chat/chatService'

const SidebarContent = (props) => {
    const { currentUser, userList } = useSelector((state) => state.user)
    const { chatList } = useSelector((state) => state.chat)

    const dispatch = useDispatch()

    const createChat = (anotherUser) => {
        if (currentUser) {
            dispatch(chatService.create({ this_userid: currentUser._id, another_userid: anotherUser._id }))
            props.changeIsSearching(false)
        }
    }

    return (
        (props.isSearching && userList) ?
            userList
                .filter((user) => user.name !== currentUser.name)
                .map((user) => (
                    <div className=" w-full flex flex-row cursor-pointer" key={user._id} onClick={() => { createChat(user) }}>
                        <img className="h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src={user.imageURL} />
                        <div className="flex flex-col my-4">
                            <p className="ml-6 text-xl truncate w-36 mb-1">{user.name}</p>
                            <p className="ml-6 truncate w-36 mb-1">online</p>
                        </div>
                    </div>
                )
                )
            :
            (chatList) ?
                chatList.map((chat) => {
                    const user = (chat.firstUser.uid === currentUser._id) ? chat.secondUser : chat.firstUser;
                    return (
                        <div className=" w-full flex flex-row cursor-pointer" key={user.uid} onClick={() => { dispatch(chatService.get(chat._id)) }}>
                            <img className="h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src={user.imageURL} />
                            <div className="flex flex-col my-4 max-w-2">
                                <p className="ml-6 text-xl truncate w-36 mb-1">{user.name}</p>
                                <p className="ml-6 truncate w-36 mb-1">{chat.lastMessage}</p>
                            </div>
                        </div>
                    );
                })
                :
                (<p></p>)
    )
}

export default SidebarContent
