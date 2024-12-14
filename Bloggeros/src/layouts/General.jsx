import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router"
import NotFound from "../pages/NotFound"
import BlogList from "../pages/BlogList"
import BlogDetail from "../pages/BlogDetail"
import BlogCreate from "../pages/BlogCreate"
import About from "../pages/About"
import Navigation from "../components/Navigation"


const router = createBrowserRouter([
    {
        path: '/',
        element: <BlogList />,
        errorElement: <NotFound /> 
    },
    {
        path: '/blog/:blogId',
        element: <BlogDetail />,
        errorElement: <NotFound /> 
    },
    {
        path: '/createblog',
        element: <BlogCreate/>,
        errorElement: <NotFound /> 
    },
    {
        path: '/about',
        element: <About />,
        errorElement: <NotFound /> 
    },
])

function GeneralLayout(){
    return(
        <div className="box-border m-0 p-0">
            <Navigation />
            <main>
                <RouterProvider router={router} />
            </main>
        </div>
    )
}

export default GeneralLayout