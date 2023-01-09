import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-indigo-100">
        <div className="w-[80em] h-[45em] rounded shadow-lg flex flex-row">
          <Sidebar />
          <Chat />
        </div>
    </div>
  )
}

export default Home