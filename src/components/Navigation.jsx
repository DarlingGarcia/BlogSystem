function Navigation()
{
    return(
        <nav className="flex px-1 w-full justify-between bg-gray-800">
            <a href="/" className="text-white"><img src="../../public/assets/logo.jpeg" className="w-4 h-4"/></a>
            <section className="flex flex-row flex-nowrap gap-x-3">
                <a href="/" className="text-white">Blogs</a>
                <a href="/createblog" className="text-white">Crear Blog</a>
            </section>
        </nav>
    )
}

export default Navigation