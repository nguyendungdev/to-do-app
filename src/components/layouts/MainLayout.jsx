import { Suspense } from "react";
import MainHeader from "./MainHeader"
import { Outlet } from 'react-router-dom';
import ListTodoPage from "../../pages/todo/ListTodoPage";
import LayoutLoader from "../loading/LayoutLoader"
import { Page } from "@shopify/polaris";
const MainLayout = () => {
    return (<div>
        <MainHeader />
        <Suspense fallback={<LayoutLoader />}>
            {/* <Outlet /> */}
            <ListTodoPage />
        </Suspense>
    </div>)
}

export default MainLayout;
