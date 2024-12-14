import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import '../assets/css/BlogList.css';

function BlogList()
{
    // cabiam cuando se borrar un blog
    let localStorageBlogsStart = JSON.parse(localStorage.getItem('blogs'))
    const [originalBlogs, setOriginalBlogs] = useState(localStorageBlogsStart)
    
    // cambia con busqueda o seleccion de catetoria
    const [blogs, setBlogs] = useState(localStorageBlogsStart)
    const [currentCategory, setCurrentCategory] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [categories, setCategories] = useState(localStorageBlogsStart ? localStorageBlogsStart.map(blog => blog.category) : '')
    // transforma un timestamp como este:1734152964994
    // a una como esta: 14 de diciembre de 2024
    const formatIdToDate = (dateInSeconds) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' }; 
        const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(new Date(dateInSeconds))
        return formattedDate
    }

    useEffect(() => {
        // no continuar si no hay categoria ni search value
        if(currentCategory === '' && !searchValue.trim()){
            setBlogs(originalBlogs)
            return;
        }

        let changedBlogs = originalBlogs.filter( (blog) => {
            // si no hay una catetoria seleccionada
            if(currentCategory === ''){
                return blog.title.includes(searchValue) || blog.content.includes(searchValue)
            }
            return currentCategory === blog.category && (blog.title.includes(searchValue) || blog.content.includes(searchValue))
        })

        setBlogs(changedBlogs);
    }, [searchValue])


    useEffect(() => {
        // no continuar si no hay categoria ni search value
        if(currentCategory === '' && !searchValue.trim()){
            setBlogs(originalBlogs)
            return;
        }

        let changedBlogs = originalBlogs.filter( (blog) => {
            // si no hay un valor busquado
            if(!searchValue.trim()){
                return currentCategory === blog.category
                
            }
            return currentCategory === blog.category && (blog.title.includes(searchValue) || blog.content.includes(searchValue))
        })

        setBlogs(changedBlogs);
    }, [currentCategory])

    const handleCategoryChange = (event) => {
        setCurrentCategory(event.target.value);
    };

    const handleSearchChange = () => {
        const searchBarValue = document.getElementById('searchBar').value
        setSearchValue(searchBarValue);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const searchBarValue = document.getElementById('searchBar').value
            setSearchValue(searchBarValue);
        }
    }

    const handleDelete = (index) => {
        let localStorageBlogs = JSON.parse(localStorage.getItem('blogs'))

        localStorageBlogs.splice(index,1)
        localStorage.setItem('blogs', JSON.stringify(localStorageBlogs))
        
        setOriginalBlogs(localStorageBlogs)
        setBlogs(localStorageBlogs)
        setCategories(localStorageBlogsStart ? localStorageBlogsStart.map(blog => blog.category) : '')
    }

    const navigate = useNavigate()
    return(
        <>
            {
                !blogs &&
                <section>
                    <p>No se ha creado un blog todavia</p>
                </section>
            }
            {  blogs &&
                <div>
                    <div className='ml-2 font-semibold'>
                        <h1>Bienvenidos a Bloggeros</h1>
                        <h2>Tu sitio confiable para informarte</h2>
                    </div>
                    <div className='flex flex-row w-full justify-between px-2 mt-3'>
                        <select id="categorySelect"
                            className='border border-black'
                            value={currentCategory}
                            onChange={handleCategoryChange}>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                            <option value="">TODOS</option>
                        </select>

                        <section className="flex flex-row flex-nowrap gap-x-1 items-center">
                            <input className='border border-solid border-black' type="text" id="searchBar" onKeyDown={handleKeyDown}/>
                            <button onClick={handleSearchChange}>
                                <img className='w-6 h-6' src="../../public/search.svg" />
                            </button>
                            
                        </section>
                    </div>
                    <section className="post-list">
                        
                        <div className="content">
                            {blogs.map((blog,index) => (
                                <article className="post" key={index}>
                                    <div className="post-header">
                                        <div className="post-img" style = {{backgroundImage: `url(${blog.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                                    </div>
                                    <div className="post-body">
                                        <span>{formatIdToDate(blog.id)} | <em className="border underline">{blog.category}</em></span>
                                        <h2>{blog.title}</h2>
                                        <p className="descripcion">{blog.content}</p>
                                        <div className='w-full flex flex-row flex-wrap gap-2 items-center justify-center'>
                                            <button className="post-link-orange" onClick={() => navigate(`/blogedit/${blog.id}`)}>
                                                Editar 
                                            </button>
                                            <button className="post-link-red" onClick={() => {handleDelete(index)}}>
                                                Eliminar
                                            </button>
                                            <button className="post-link" onClick={() => navigate(`/blog/${blog.id}`)}> Leer mas... </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                            
                        </div>
                    </section>
                </div>
            }
        </>
    )
}

export default BlogList