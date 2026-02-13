import axios from "axios"
import { useState } from "react"
import useUserStore from "../stores/userStore"
import { useNavigate } from "react-router"
import { slugify } from "zod"

function Login() {
    const [formLogin, setFormLogin] = useState({
        username: "",
        password: "",
    })

    const setUser = useUserStore((state) => state.setUser)
    const setToken = useUserStore((state) => state.setToken)
    const navigate = useNavigate()

    const hdlChange = (e) => {
        const { name, value } = e.target
        setFormLogin((prv) => ({ ...prv, [name]: value }))
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("https://drive-accessible-pictures-send.trycloudflare.com/auth/login", formLogin)
            const { userId, username, token } = res.data.user
            // console.log('token', token)
            // console.log('username', username)
            // console.log('userId', userId)
            setUser({ userId, username,})
            setToken(token)
            // console.log(res.data)
            navigate('/to-do-list')
            console.log(res.data)
        } catch (error) {
            
        }
    }

    return (
        <div className='bg-gray-900 flex justify-center items-center flex-col'>
            <p className="text-white mt-10 text-5xl">Login Page</p>
            <form
                onSubmit={hdlSubmit}
                className='bg-gray-800 mt-20 mb-20 p-20 text-white flex flex-col gap-7 rounded-2xl'>

                <h1 className='text-[30px]'>Welcome</h1>

                <input
                    type='text'
                    name='username'
                    placeholder='   username'
                    className='bg-gray-700 h-15 rounded-2xl'
                    onChange={hdlChange}
                    value={formLogin.username}
                ></input>

                <input
                    type='password'
                    name='password'
                    placeholder='   password'
                    className='bg-gray-700 h-15 rounded-2xl'
                    onChange={hdlChange}
                    value={formLogin.password}
                ></input>

                <button className='bg-gray-700 h-15 w-80 rounded-2xl hover:text-red-600 hover:bg-white text-[15px] font-bold'>
                    LOG IN
                </button>

            </form>
        </div>
    )
}

export default Login
