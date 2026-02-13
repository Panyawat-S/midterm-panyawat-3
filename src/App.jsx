import React from 'react'
import { RouterProvider } from 'react-router'
import router from './router/router'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <ToastContainer position='bottom-right' />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
