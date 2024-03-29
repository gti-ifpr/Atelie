import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';

import { TechnicalFileInput, TechnicalFileProviderProps, TechnicalFileContextData } from '../types/technicalFile'



const TechnicalFileContext = createContext<TechnicalFileContextData>(
    {} as TechnicalFileContextData
);

export function TechnicalFileProvider({ children }: TechnicalFileProviderProps) {
    const [technicalFiles, setTechnicalFiles] = useState([]);

    useEffect(() => {
        api.get("/ficha_tecnica").then((response) => setTechnicalFiles(response.data));
    }, []);

    async function createTechnicalFile(technicalFile: TechnicalFileInput) {
        const { data } = await api.post("/ficha_tecnica", technicalFile);

        setTechnicalFiles([
            ...technicalFiles,
            data,
        ]);
    }

    return (
        <TechnicalFileContext.Provider value={{ technicalFiles, createTechnicalFile }}>
            {children}
        </TechnicalFileContext.Provider>
    )
}

export function useTechnicalFile() {
    const context = useContext(TechnicalFileContext);

    return context;
}