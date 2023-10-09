import path from 'path'
import Actividad from "../models/rutas.models.js"



export const getActs = async (req, res) => {
    const actividades = await Actividad.findAll()
    res.json(actividades)
}

export const getAct = async (req, res) => {
    const actividadFound = await Actividad.findByPk(req.params.id)
    if (!actividadFound) return res.status(404).json(["No existe la actividad"])
    res.json(actividadFound)
}

export const createAct = async (req, res) => {
    const { nombre, direccion, descripcion, tipo } = req.body;
    const { filename: imagen } = req.file;

    if (!imagen) {
        return res.status(400).json(["Debes subir una imagen"]);
    }

    try {
        
        const newActividad = await Actividad.create({
            nombre,
            direccion,
            tipo,
            descripcion,
            imagen
        });

        console.log("Actividad creada correctamente");
        res.json({ message: "Actividad creada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};



export const deleteAct = async (req, res) => {
    try {
        const actividadFound = await Actividad.findByPk(req.params.id);
        if (!actividadFound) {
            return res.status(405).json(["No existe la actividad, por lo que no se eliminó nada"]);
        }

        await actividadFound.destroy();
        res.json({ message: "Actividad eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};

export const putAct = async (req, res) => {
    try {
        const actividadFound = await Actividad.findByPk(req.params.id);
        if (!actividadFound) {
            return res.status(404).json(["No se encontró la actividad, por lo que no se actualizó nada"]);
        }

        await actividadFound.update(req.body);
        const updatedActividad = await Actividad.findByPk(req.params.id); 
        res.json(updatedActividad);
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};