import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaBars } from "react-icons/fa"
import userService from '../features/user/userService'

const Chat = () => {
  const [nameSearch, setNameSearch] = useState('')
  const dispatch = useDispatch()
  const { user , userSearch } = useSelector((state) => state.user)

  const onKeyDown = (e) => {
    e.code === "Enter" && dispatch(userService.search(nameSearch));
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-indigo-100">

        <div className="w-[80em] h-[40em] rounded shadow-lg flex flex-col">

          <div className="flex flex-row">

            <div className="bg-white basis-1/4 h-24 min-h-24 max-h-24 flex flex-row rounded-tl-lg">
                <FaBars className="h-10 p-2 my-8 mx-2 bg-gray-50 rounded-lg border-2 border-gray-200" size={40}/>
                <input  
                  className="w-64 h-10  my-8 p-4 rounded-lg border-2 border-gray-200 text-gray-500 outline-none focus:border-gray-400 transition-colors" 
                  placeholder="search for users"
                  onChange={(e) => setNameSearch(e.target.value)}
                  onKeyDown={onKeyDown}
                />
            </div>

            <div className="bg-slate-500 text-white basis-3/4 h-24 min-h-24 max-h-24 flex flex-row rounded-tr-lg">
              <img className="h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
              <p className="ml-6 text-xl my-8">Someone</p>
            </div>

          </div>

          <div className="flex flex-row">
            <div className="bg-white basis-1/4 h-[34em] min-h-[34em] max-h-[34em] overflow-y-scroll">

            {  (userSearch && userSearch.length !== 0) ? 
                userSearch.map((user) => (
                  <div className=" w-full flex flex-row" key={user._id}>
                    <img className="h-16 w-16 ml-4 my-4 align-center rounded-full" alt="profile" src={user.imageURL} />
                    <div className="flex flex-col my-4">
                      <p className="ml-6 text-xl mb-1">{user.name}</p>
                      <p className="ml-6 text-xl mb-1">online</p>
                    </div>
                  </div>
                )) 
                : <p></p>
            }
            </div>

            <div className="bg-slate-200 basis-3/4 h-[34em] min-h-[34em] max-h-[34em] overflow-y-scroll">
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
        </div>
    </div>
  )
}

export default Chat