import { ReactNode } from "react";

export type TechnicalFile = {
    id: number;
    nome: string;
    cliente: number;
    orcamento: number;
    desenho: string;
    tipoTecido: string;
    quantidadeTecido: number;
};

export type TechnicalFileInput = Omit<TechnicalFile, 'id'>

export type TechnicalFileProviderProps = {
    children: ReactNode;
}

export type TechnicalFileContextData = {
    technicalFiles: TechnicalFile[];
    createTechnicalFile: (tecnicalFile: TechnicalFileInput) => Promise<void>;
}