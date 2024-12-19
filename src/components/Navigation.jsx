function Navigation()
{
    return(
        <nav className="flex px-1.5 w-full justify-between bg-gray-800 items-center">
            <a href="/" className="text-white p-2"><img src="../../public/assets/logo.jpeg" className="w-4 h-4 md:w-8 md:h-8 lg:w-11 lg:h-11 rounded-3xl"/></a>
            <section className="flex flex-row flex-nowrap gap-x-6">
                <a href="/" className="text-white">Blogs</a>
                <a href="/createblog" className="text-white">Crear Blog</a>
            </section>
        </nav>
    )
}

export default Navigation