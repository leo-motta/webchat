import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import chatService from '../features/chat/chatService'

const Chat = () => {
    const { chats } = useSelector((state) => state.chat)

    return (
        <div className="flex flex-col basis-3/4">
            <div className="bg-slate-500 text-white h-24 min-h-24 max-h-24 flex flex-row rounded-tr-lg">
                <img className="h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                <p className="ml-6 text-xl my-8">Someone</p>
            </div>

            <div className="bg-slate-200 h-[34em] min-h-[34em] max-h-[34em] overflow-y-scroll">
                <div className='flex flex-row'>
                    <div className='max-w-xl rounded bg-slate-700 text-white m-2 pl-4 pr-2 pt-4 pb-1 drop-shadow-sm'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p className='timestamp text-right'>00:00</p>
                    </div>
                </div>

                <div className='flex flex-row-reverse'>
                    <div className='max-w-xl rounded bg-slate-700 text-white m-2 pl-4 pr-2 pt-4 pb-1 drop-shadow-sm'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est
                        </p>
                        <p className='timestamp text-right'>00:00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
