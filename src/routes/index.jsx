import { createBrowserRouter } from "react-router-dom"
import Error500 from '../components/errors/Error500';
import ListTodoPage from "../pages/todo/ListTodoPage";
import MainLayout from "../components/layouts/MainLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error500 />,
        children: [
            {
                path: "/todo",
                element: <ListTodoPage />,
            },
        ]
    }
])

export default router;
