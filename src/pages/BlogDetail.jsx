import { useParams } from "react-router"
import { useNavigate } from "react-router";
function BlogDetail()
{
    const navigate = useNavigate()
    const blogs = JSON.parse(localStorage.getItem('blogs'))
    const blogId = useParams().blogId
    const blog = blogs.find((blog) => blog.id == blogId)

    const formatIdToDate = (dateInSeconds) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' }; 
        const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(new Date(dateInSeconds))
        return formattedDate
    }

    return(
        <section className="flex flex-col w-4/5 mx-auto">
            <h1 className="text-xl font-semibold">{blog.title}</h1>

            <span className="my-4">{formatIdToDate(blog.id)} | <em className="border underline">{blog.category}</em></span>

            <p>{blog.content}</p>
        </section>
    )
}

export default BlogDetail