import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ToDoList from "../pages/Todolist";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "to-do-list",
                element: <ToDoList />
            },
        ]
    }
])

export default router