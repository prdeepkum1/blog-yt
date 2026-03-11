import { SquareUser } from 'lucide-react';
import React from 'react'
// import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';





const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-5 mt-10 min-h-screen pt-15">
      {/* <h2 className="text-xl font-bold mb-5">Dashboard</h2> */}

      <ul className="space-y-3">

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `block p-3 rounded-xl font-semibold ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/your-blog"
          className={({ isActive }) =>
            `block p-3 rounded-xl font-semibold ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Your Blogs
        </NavLink>

        <NavLink
          to="/dashboard/comments"
          className={({ isActive }) =>
            `block p-3 rounded-xl font-semibold ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Comments
        </NavLink>

        <NavLink
          to="/dashboard/write-blog"
          className={({ isActive }) =>
            `block p-3 rounded-xl font-semibold ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Create Blog
        </NavLink>

      </ul>
    </div>
  );
};


export default Sidebar;



// flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2x1 w-full