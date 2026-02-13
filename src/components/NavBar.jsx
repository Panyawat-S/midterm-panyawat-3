import { NavLink } from 'react-router'

function NavBar() {
    return (
        <div className='bg-yellow-600 h-25 text-[25px] flex justify-center items-center'>
            <div className='flex justify-center items-center gap-15 font-semibold text-white'>
                <NavLink to="/" className="hover:text-red-600">Login</NavLink>
                <NavLink to="register" className="hover:text-red-600">Register</NavLink>
                <NavLink to="to-do-list" className="hover:text-red-600">To Do List</NavLink>
            </div>
        </div>
    )
}

export default NavBar