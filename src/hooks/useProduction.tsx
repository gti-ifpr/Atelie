import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';
import { addOneDay } from '../utils/addOneDay';

import { ProductionFromBd, ProductionReturn } from '../types'


type ProductionInput = Omit<ProductionFromBd, 'id'>

type ProductionProviderProps = {
    children: ReactNode;
}

type ProductionContextData = {
    producoes: ProductionReturn[];
    createProduction: (compromisso: ProductionInput) => Promise<void>;
}

const ProductionContext = createContext<ProductionContextData>(
    {} as ProductionContextData
);

export function ProductionProvider({ children }: ProductionProviderProps) {
    const [producoesFromBD, setProducao] = useState<ProductionFromBd[]>([])

    useEffect(() => {
        api.get("/producoes").then((response) => setProducao(response.data))
    }, []);

    async function createProduction(productionInput: ProductionInput) {
        const { data } = await api.post("/producoes", productionInput);

        setProducao([
            data,
            ...producoesFromBD,
        ]);
    }

    const producoes: ProductionReturn[] = producoesFromBD.map((compromisso) => {
        return {
            id: compromisso.id,
            horarioInicio: compromisso.horario_inicio,
            horarioTermino: compromisso.horario_termino,
            dataAgendadaString: compromisso.data_agendada,
            dataAgendadaPtBr: new Date(addOneDay(compromisso.data_agendada)).toLocaleDateString('pt-BR'),
            dataAgendadaDayOfTheWeek: new Date(addOneDay(compromisso.data_agendada)).getDay(),
            dataAgendadaCurrentDate: new Date(addOneDay(compromisso.data_agendada)).getTime(),
            selectedClient: compromisso.cliente_selecionado,
            tipo: compromisso.tipo_compromisso,
            status: compromisso.compromisso_status,
        };
    });

    return (
        <ProductionContext.Provider value={{ producoes, createProduction }}>
            {children}
        </ProductionContext.Provider>
    )
}

export function useProduction() {
    const context = useContext(ProductionContext);

    return context;
}