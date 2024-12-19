import { Typography, Card, CardBody } from "@material-tailwind/react";
import '../assets/css/ContentCard.css'
import { useNavigate } from "react-router";
  
export default function ContentCard({ id, img, title, desc, category, index, onTriggerDelete}) {

    
    const formatIdToDate = (dateInSeconds) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' }; 
        const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(new Date(dateInSeconds))
        return formattedDate
    }

    const navigate = useNavigate()
    return (
        <Card
        className="relative grid min-h-[30rem] items-end overflow-hidden rounded-xl"
        color="transparent"
        >
        <img
            src={img}
            alt="bg"
            className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
        <CardBody className="relative flex flex-col justify-end">
            <Typography variant="h4" color="white">{formatIdToDate(id)} | <em className="underline">{category}</em></Typography>
            <Typography variant="h4" color="white">
            {title}
            </Typography>
            <Typography
            variant="paragraph"
            color="white"
            className="my-2 font-normal verticalText3Rows"
            >
            {desc}
            </Typography>

            <div className='w-full flex flex-row flex-wrap gap-2 items-center justify-center'>
            <button className="post-link-orange" onClick={() => navigate(`/blogedit/${id}`)}>
                Editar 
            </button>
            <button className="post-link-red" onClick={() => {onTriggerDelete(index)}}>
                Eliminar
            </button>
            <button className="post-link" onClick={() => navigate(`/blog/${id}`)}> Leer mas... </button>
        </div>
        </CardBody>

        </Card>
    );
}
  