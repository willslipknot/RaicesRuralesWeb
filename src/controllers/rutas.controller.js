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
    const { nombre, direccion, descripcion, tipo, imagen } = req.body
    const newActividad = await Actividad.create({

        nombre,
        direccion,
        tipo,
        descripcion,
        imagen

    });

    console.log("Actividad creada correctamente");
    res.json({ message: "Actividad creada correctamente" });


}

export const deleteAct = async (req, res) => {
    const actividadFound = await Actividad.findByPkAndDelete(req.params.id)
    if (!actividadFound) return res.status(404).json(["No existe la actividad entonces no se elimino nada"])
    res.json(actividadFound)

}

export const putAct = async (req, res) => {
    const actividadFound = await Actividad.findByPkAndUpdate(req.params.id, req.body, { new: true })
    if (!actividadFound) return res.status(404).json(["No se actualizo nada"])
    res.json(actividadFound)
}