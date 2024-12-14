function BlogCreate()
{
    return(
        <section className="flex flex-col w-11/12 m-auto">
            <h1 className="text-lg mb-3 font-semibold">Crea tu blog</h1>
            <form className="flex flex-col gap-y-5">
                <section className="flex flex-row gap-x-2 items-center"> 
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input type="text" id="title" className="border border-solid border-black rounded-md"/>
                </section>

                <section className="flex flex-row gap-x-2 items-center">
                    <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">Imagen:</label>
                    <input type="file" id="image-upload" accept="image/*" 
                    className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                </section>

                <section>
                    <label htmlFor="text-area" className="block text-sm font-medium text-gray-700">Contenido:</label>
                    <textarea id="text-area" className="border border-solid border-black rounded-md w-4/5 h-[40dvh]" placeholder="Inserta texto"></textarea>
                </section>
            </form>
        </section>
    )
}

export default BlogCreate