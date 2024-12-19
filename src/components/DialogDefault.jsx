import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router";
 
export default function DialogDefault({open, isCreating, toggleDialogFlag}) {
 
  const handleOpen = () => toggleDialogFlag();
  
  const navigate = useNavigate()
  return (
    <>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>¡Blog {isCreating ? 'creado' : 'editado'}!</DialogHeader>
        <DialogBody>
          Seleciona una de las opciones de abajo
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="green"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>{isCreating ? 'Crear otro blog' : 'Sigue editando el blog'}</span>
          </Button>
          <Button variant="gradient" color="red" onClick={() => {navigate('/')}}>
            <span>Ir a Blogs</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}