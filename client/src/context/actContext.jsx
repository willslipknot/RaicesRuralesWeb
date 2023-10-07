import { createContext, useContext, useState } from "react"
import { createActRequest, deleteActRequest, getActRequest, getActsRequest, updateActRequest } from '../api/acts'


const ActContext = createContext();

export const useActs = () => {
    const context = useContext(ActContext);

    if (!context) {
        throw new Error("useActs must be used whitin a TaskProvider")
    }
    return context;
}

export function ActProvider({ children }) {

    const [acts, setActs] = useState([]);

    const getActs = async () => {
        try {
            const res = await getActsRequest();
            setActs(res.data)
            console.log(res)

        } catch (error) {
            console.error(error)
        }

    }

    const createActs = async (act) => {
        const res = await createActRequest(act)
        console.log(res)
    }

    const deleteAct = async (id) => {
        try {
            const res = await deleteActRequest(id)
            if (res.status == 200) setActs(acts.filter(act => act.id !== id))
            console.log(res)
        } catch (error) {
            console.error(error)
        }

    }

    const getAct = async (id) => {
        const res = await getActRequest(id)
        return res.data
    }

    const updateAct = async(id, act) =>{
       const res = await updateActRequest(id, act)
    }

    return (
        <ActContext.Provider value={{
            acts,
            createActs,
            getActs,
            deleteAct,
            getAct,
            updateAct,

        }}>
            {children}
        </ActContext.Provider>
    );
}