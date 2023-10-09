import Conductor from "../models/cond.models.js"


export const getConds = async (req, res) => {
    const conductores = await Conductor.findAll()
    res.json(conductores)
}

export const getCond = async (req, res) => {
    const conductorFound = await Conductor.findByPk(req.params.id)
    if (!conductorFound) return res.status(404).json(["No existe el conductor"])
    res.json(conductorFound)
}

export const createCond = async (req, res) => {
    const { nombre, apellido, placas, licencia, tipoVehiculo } = req.body
    const newConductor = await Conductor.create({

        nombre,
        apellido,
        placas,
        tipoVehiculo,
        licencia,
      
    });

    console.log("Conductor creado correctamente");
    res.json({ message: "Conductor creado correctamente" });


}

export const deleteCond = async (req, res) => {
    try {
        const conductorFound = await Conductor.findByPk(req.params.id);
        if (!conductorFound) {
            return res.status(405).json(["No existe el conductor, por lo que no se eliminó nada"]);
        }

        await conductorFound.destroy();
        res.json({ message: "Conductor eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};

export const putCond = async (req, res) => {
    try {
        const conductorFound = await Conductor.findByPk(req.params.id);
        if (!conductorFound) {
            return res.status(404).json(["No se encontro el conductor, por lo que no se actualizó nada"]);
        }

        await conductorFound.update(req.body);
        const updatedConductor = await Conductor.findByPk(req.params.id); 
        res.json(updatedConductor);
    } catch (error) {
        console.error(error);
        res.status(500).json(["Error interno del servidor"]);
    }
};