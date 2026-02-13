import axios from "axios"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router"
import { registerValidator } from "../validators/register.validator"
import { toast } from "react-toastify"

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    })

    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const hdlChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
        console.log(evt.target)
    }

    const hdlSubmit = async (evt) => {
        evt.preventDefault();
        setError({})
        console.log(formData.confirmPassword)
        console.log(formData.password)
        if (
            formData.confirmPassword !== formData.password
        ) {
            toast.error('รหัสผ่านไม่ตรงกัน')
            return;
        }
            const result = registerValidator.safeParse(formData)
        if (!result.success) {
            const { fieldErrors } = result.error.flatten()
            setError(fieldErrors);
            return;
        }
        try {
            const res = await axios.post(
                "https://drive-accessible-pictures-send.trycloudflare.com/auth/register",
                formData
            );
            toast.success('ลงทะเบียนสำเร็จ')
            navigate('/')
        } catch (error) {
            toast.error('ลงทะเบียนผิดพลาด')
        }
    }
    console.log(error)
    return (
        <div className='bg-gray-900 flex justify-center items-center flex-col'>
            <p className="text-white mt-10 text-5xl">Register Page</p>
            <form
                onSubmit={hdlSubmit}
                className='bg-gray-800 mt-20 mb-20 p-20 text-white flex flex-col gap-7 rounded-2xl'>
                <h1 className='text-[30px]'>Register</h1>

                <input
                    type='text'
                    name='username'
                    placeholder='   username'
                    className='bg-gray-700 h-15 rounded-2xl'
                    onChange={hdlChange}
                    value={formData.username}
                ></input>
                {error?.username && <p className="text-red-500">{error?.username[0]}</p>}

                <input
                    type='password'
                    name='password'
                    placeholder='   password'
                    className='bg-gray-700 h-15 rounded-2xl'
                    onChange={hdlChange}
                    value={formData.password}
                ></input>
                {error?.password && <p className="text-red-500">{error?.password[0]}</p>}

                <input
                    type='password'
                    name='confirmPassword'
                    placeholder='   confirm password'
                    className='bg-gray-700 h-15 rounded-2xl text-white'
                    onChange={hdlChange}
                    value={formData.confirmPassword}
                ></input>
                {error?.confirmPassword && <p className="text-red-500">{error?.confirmPassword[0]}</p>}

                <button className='bg-gray-700 h-15 w-80 rounded-2xl hover:text-red-600 hover:bg-white text-[15px] font-bold'>
                    SIGN UP
                </button>

                <p className='flex justify-center'>Already have an account?<button><NavLink to="/" className="text-blue-500 ml-2">Log in</NavLink></button></p>

            </form>
        </div>
    )
}

export default Register
