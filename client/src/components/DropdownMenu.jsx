import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBars } from "react-icons/fa"
import { BsBoxArrowRight, BsGearFill, BsFillChatFill } from "react-icons/bs";
import { IconContext } from "react-icons";

const DropdownMenu = (props) => {
    const [open, setOpen] = useState(false)
    const [profileText, setProfileText] = useState('Profile')

    const navigate = useNavigate()

    useEffect(() => {
        setOpen(false)
        if (props.openOptions) {
            setProfileText('Chat')
        } else {
            setProfileText('Profile')
        }
    }, [props.openOptions])

    const onLogout = () => {
        //dispatch(userService.logout())
        navigate('/')
    }

    return (
        <div>
            <button onClick={() => setOpen(!open)}>
                <FaBars className="h-10 p-2 mx-2 mt-8 bg-gray-50 rounded-lg border-2 border-gray-200" size={40} />
            </button>
            {open && (
                <ul className="absolute ml-1 text-[1em] bg-white border-2 border-gray-100 rounded text-sm text-gray-700 dark:text-gray-200">
                    <li>
                        <a
                            href="#/"
                            className="flex flex-row  px-4 py-2 pb-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => { props.changeOptions(!props.openOptions) }}>
                            <IconContext.Provider value={{ size: "1.5em", className: " pr-2" }}>
                                {(props.openOptions) ? <BsFillChatFill /> : <BsGearFill />}
                            </IconContext.Provider> {profileText}
                        </a>
                    </li>
                    <li>
                        <a href="#/" onClick={onLogout} className="flex flex-row px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <IconContext.Provider value={{ size: "1.5em", className: " pr-2" }}>
                                <BsBoxArrowRight />
                            </IconContext.Provider>Sign out
                        </a>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default DropdownMenu
