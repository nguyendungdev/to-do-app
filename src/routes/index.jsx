import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../components/layouts/MainLayout"
import Error500 from '../components/errors/Error500';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error500 />,
        children: [
            {
                path: "/todos/",
                element: <MainLayout />,
            },
        ]
    }
])

export default router;