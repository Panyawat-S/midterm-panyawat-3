import { useEffect, useState } from "react"
import useUserStore from "../stores/userStore"
import axios from "axios"

function Todolist() {
  const user = useUserStore((state) => state.user)
  const token = useUserStore((state) => state.token)
  const [todo, SetTodo] = useState([])
  const [task, setTask] = useState()

  useEffect(() => {
    getUser()
  }, [getUser])

  async function getUser() {
    try {
      const res = await axios.get("https://drive-accessible-pictures-send.trycloudflare.com/todosv2", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      SetTodo(res.data)
      // console.log(res.data)
    } catch (error) {
      // console.log(error)
    }
  }

  function hdlChange(e) {
    // console.log(e.target.value)
    setTask(e.target.value)
  }

  async function hdlAdd() {
    try {
      const res = await axios.post("https://drive-accessible-pictures-send.trycloudflare.com/todosv2", { content: task }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      SetTodo([...todo], res.data)
      setTask("")
      // console.log(res.data)
    } catch (error) {
      // console.log(error)
    }
  }

  async function hdlDel(id) {
    // console.log('id', id)
    try {
      const res = await axios.delete(`https://drive-accessible-pictures-send.trycloudflare.com/todosv2/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      getUser()
    } catch (error) {
      // console.log(error)
    }
  }

  return (
    <div className='bg-gray-900 h-dvh pb-20 pt-15 flex items-center flex-col'>
      <p className="text-white mt-10 text-5xl">To Do List Page</p>
      <div className='bg-gray-800 mt-20 mb-20 p-20 text-white flex flex-col gap-7 rounded-2xl'>

        <h1 className='text-[30px]'>My Todo</h1>

        <div className="flex justify-between">
          <input onChange={hdlChange} placeholder='new task' value={task}></input>
          <button onClick={hdlAdd} className="bg-blue-600 w-12 rounded-2xl">Add</button>
        </div>

        <hr className="text-gray-500 w-80" />

        <ul className="flex flex-col gap-5">
          {todo.map((el) => (
            <div key={el.id} className="flex justify-between gap-30">
              <div className="flex gap-3">
                <input type="checkbox"></input>
                <p className="text-white">{el.content}</p>
              </div>

              <div className="flex gap-3">
                <button className="bg-gray-500 w-12 rounded-2xl">Edit</button>
                <button onClick={() => hdlDel(el.id)} className="text-white">x</button>
              </div>
            </div>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Todolist