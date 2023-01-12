import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userService from '../features/user/userService'
import chatService from '../features/chat/chatService'
import DropdownMenu from './DropdownMenu'
import SidebarProfileOptions from './SidebarProfileOptions'
import SidebarContent from './SidebarContent'

const Sidebar = () => {
    const [searchBox, setSearchBox] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)

    const { currentUser } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    //Updates chatList
    useEffect(() => {
        if (currentUser) {
            dispatch(chatService.search(currentUser._id))
        }
        // eslint-disable-next-line
    }, [isSearching, chatService, currentUser])


    const onKeyDown = (e) => {
        if (e.code === "Enter") {
            dispatch(userService.search(searchBox))
            setIsSearching(true)
        }
        if (e.code === "Escape") {
            setIsSearching(false)
        }
    }

    const changeOptions = (value) => {
        setOpenOptions(value)
    }

    const changeIsSearching = (value) => {
        setIsSearching(value)
    }

    return (
        <div className="flex flex-col basis-1/4 border-r-2 border-gray-300">
            <div className="bg-white h-24 min-h-24 max-h-24 flex flex-row rounded-tl-lg">
                <DropdownMenu openOptions={openOptions} changeOptions={changeOptions} />
                <input
                    className="w-64 h-10  my-8 p-4 rounded-lg border-2 border-gray-200 text-gray-500 outline-none focus:border-gray-400 transition-colors"
                    placeholder="search for users"
                    onChange={(e) => setSearchBox(e.target.value)}
                    onKeyDown={onKeyDown}
                    value={searchBox}
                />
            </div>

            <div className="bg-white h-[39em] min-h-[39em] max-h-[39em] overflow-y-scroll">
                {
                    (openOptions) ? 
                    <SidebarProfileOptions changeOptions={changeOptions}/> :
                    <SidebarContent isSearching={isSearching} changeIsSearching={changeIsSearching} />
                }
            </div>
        </div>
    )
}

export default Sidebar
