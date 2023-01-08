import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaBars } from "react-icons/fa"
import userService from '../features/user/userService'
import chatService from '../features/chat/chatService'

const Sidebar = () => {
    const [nameSearch, setNameSearch] = useState('')
    const [searchState, setSearchState] = useState(false)

    const { currentUser , userSearch } = useSelector((state) => state.user)
    const { chats } = useSelector((state) => state.chat)

    const dispatch = useDispatch()

    useEffect(() => {
        if(currentUser) {
            dispatch(chatService.search(currentUser._id))
        }
      // eslint-disable-next-line
    },[searchState, chatService, currentUser])
  
    const onKeyDown = (e) => {
      if (e.code === "Enter") {
        dispatch(userService.search(nameSearch));
        setSearchState(true)
      }
      if(e.code === "Escape") {
        setSearchState(false)
      }
    }
  
    const createChat = (anotherUser) => {
      if(currentUser) {
        dispatch(chatService.create({this_userid:currentUser._id, another_userid:anotherUser._id}))
        setSearchState(false)
      }
    }

    return (
        <div className="flex flex-col basis-1/4 border-r-2 border-gray-300">

            <div className="bg-white h-24 min-h-24 max-h-24 flex flex-row rounded-tl-lg">
                <FaBars className="h-10 p-2 my-8 mx-2 bg-gray-50 rounded-lg border-2 border-gray-200" size={40} />
                <input
                    className="w-64 h-10  my-8 p-4 rounded-lg border-2 border-gray-200 text-gray-500 outline-none focus:border-gray-400 transition-colors"
                    placeholder="search for users"
                    onChange={(e) => setNameSearch(e.target.value)}
                    onKeyDown={onKeyDown}
                />
            </div>

            <div className="bg-white h-[39em] min-h-[39em] max-h-[39em] overflow-y-scroll">
                {(searchState && userSearch) ?
                    userSearch
                        .filter((user) => user.name !== currentUser.name)
                        .map((user) => (
                            <div className=" w-full flex flex-row cursor-pointer" key={user._id} onClick={() => { createChat(user) }}>
                                <img className="h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src={user.imageURL} />
                                <div className="flex flex-col my-4">
                                    <p className="ml-6 text-xl truncate w-48 mb-1">{user.name}</p>
                                    <p className="ml-6 truncate w-48 mb-1">online</p>
                                </div>
                            </div>
                        )
                        )
                    :
                    (chats) ?
                        chats.map((chat) => {
                            const user = (chat.firstUser.uid === currentUser._id) ? chat.secondUser : chat.firstUser;
                            return (
                                <div className=" w-full flex flex-row cursor-pointer" key={user.uid} onClick={() => { dispatch(chatService.get(chat._id)) }}>
                                    <img className="h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src={user.imageURL} />
                                    <div className="flex flex-col my-4 max-w-2">
                                        <p className="ml-6 text-xl truncate w-48 mb-1">{user.name}</p>
                                        <p className="ml-6 truncate w-48 mb-1">{chat.lastMessage}</p>
                                    </div>
                                </div>
                            );
                        })
                        :
                        (<p></p>)
                }
            </div>
        </div>
    )
}

export default Sidebar
