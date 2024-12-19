import { useParams } from "react-router"
import React, { useState } from 'react';

function BlogCreate()
{

    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const { blogId } = useParams();
    let blogIndex = -1;
    const blog = blogs.find((blog,index) => {if(blog.id == blogId){blogIndex = index; return true }}) || { title: '', content: '', category: '', imageUrl: ''};
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [category, setCategory] = useState(blog.category); 
    const [imageUrl, setImageUrl] = useState(blog.imageUrl); 

    const handleTitleChange = (event) => {
        setTitle(event.target.value); // Update state when the input changes
    };

    const handleContentChange = (event) => {
        setContent(event.target.value); // Update state when the input changes
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value); // Update state when the input changes
    };


    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value); // Update state when the input changes
    };


    const validateText = (text, textLength) => {
        return text.trim() < textLength
    }

    //valida si es un link valido
    const validateUrl = (url) => {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocolo
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // dominio
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // IP (v4) dirección 
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // puerto y ruta 
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // cadena de consulta 
            '(\\#[-a-z\\d_]*)?$','i'); // fragmento
            return pattern.test(url);
    }

    const editBlog = (blogBody) => {
        let allBlogs = JSON.parse(localStorage.getItem('blogs'))
        allBlogs.splice(blogIndex, 1, blogBody);

        localStorage.setItem('blogs',JSON.stringify(allBlogs))
    }

    const createBlog = async (event) => {
        event.preventDefault();

        const form = document.getElementById('newBlogForm')
        if(!form.checkValidity()){
            alert("Algunos campos estan vacios")
            return;
        }

        if(validateText(title,10)){
            alert("titulo debe de tener al menos 10 caracters")
            return;
        }

        if(validateText(content,20)){
            alert("contenido del blog debe de tener al menos 20 caracters")
            return;
        }

        if(validateText(category,5)){
            alert("categoria del blog debe de tener al menos 5 caracters")
            return;
        }

        if(validateText(imageUrl, 1) || !validateUrl(imageUrl)){
            alert("el campo del Url de la imagen esta vacio o es invalido")
            return;
        }


        let blogBody = {
            // id nos servira como identificador y fecha
            id: Date.now(),
            title,
            content,
            category,
            imageUrl
        }

        // condicinoal para saber cuando editar
        if(blogIndex > -1){
            editBlog(blogBody)
            return
        }

        // en caso de que se el primer blog
        let allBlogs = localStorage.getItem('blogs')
        if(!allBlogs){
            localStorage.setItem('blogs', JSON.stringify(
                [blogBody]
            ))
            return;
        }

        // de string a objeto javascript para cambiar 'allBlogs'
        allBlogs = JSON.parse(allBlogs)
        allBlogs = [...allBlogs, blogBody]

        // de objeto javascript a string para guardar en localStorage
        localStorage.setItem("blogs", JSON.stringify(allBlogs))
    }

    return(
        <section className="flex flex-col w-4/5 m-auto">
            <h1 className="text-xl mb-3 font-semibold">{blogId ? 'Edita' : 'Crea'} tu blog</h1>
            <form className="flex flex-col gap-y-5" id="newBlogForm">
                <section className="flex flex-row gap-x-2 items-center"> 
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input type="text" id="title" className="border border-solid border-black rounded-md" 
                    value={title} onChange={handleTitleChange}/>
                </section>

                <section className="flex flex-row gap-x-2 items-center"> 
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria:</label>
                    <input type="text" id="category" className="border border-solid border-black rounded-md"
                    value={category} onChange={handleCategoryChange} placeholder="Ingrese una categoria"/>
                </section>


                <section className="flex flex-row gap-x-2 items-center"> 
                    <label htmlFor="urlInput" className="block text-sm font-medium text-gray-700">Url de Imagen:</label>
                    <input type="text" id="imageUrlInput" className="border border-solid border-black rounded-md" 
                    value={imageUrl} onChange={handleImageUrlChange} placeholder="Ingrese la url de alguna imagen"/>
                </section>

                <section>
                    <label htmlFor="text-area" className="block text-sm font-medium text-gray-700 mb-1">Contenido:</label>
                    <textarea id="text-area" className="border border-solid border-black rounded-md w-4/5 h-[40dvh]" 
                    placeholder="Inserta texto" value={content} onChange={handleContentChange} ></textarea>
                </section>

                <input className="cursor-pointer p-1.5 bg-slate-400 rounded-sm w-24" 
                onClick={createBlog} value={`${blogId ? 'Edita' : 'Crea'} blog`} type="submit"/>
            </form>
        </section>
    )
}

export default BlogCreate