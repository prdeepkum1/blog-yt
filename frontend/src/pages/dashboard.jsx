import  Sidebar  from "../components/Sidebar"
import {Outlet} from 'react-router-dom'
import React from 'react'
// import Profile from './Profile'

const Dashboard = () => {
    return (
        <div className='flex min-h-screen'>
            {/* <Profile></Profile> */}
            <Sidebar/>
            {/* <Profile /> */}
            <div className="flex-1 p-5 bg-gray-100">
                <Outlet/>
            </div>

        </div>
    )
}

export default Dashboard;