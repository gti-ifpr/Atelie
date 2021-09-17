import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';
import { addOneDay } from '../utils/addOneDay';

import { ProductionFromBd, ProductionReturn, ProductionInput, ProductionProviderProps, ProductionContextData } from '../types/production'

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
            horarioInicio: compromisso.horarioInicio,
            horarioTermino: compromisso.horarioTermino,
            dataInicioString: compromisso.dataInicio,
            dataInicioPtBr: new Date(addOneDay(compromisso.dataInicio)).toLocaleDateString('pt-BR'),
            dataTerminoPtBr: new Date(addOneDay(compromisso.dataTermino)).toLocaleDateString('pt-BR'),
            dataInicioDayOfTheWeek: new Date(addOneDay(compromisso.dataInicio)).getDay(),
            dataTerminoDayOfTheWeek: new Date(addOneDay(compromisso.dataTermino)).getDay(),
            dataInicioCurrentDate: new Date(addOneDay(compromisso.dataInicio)).getTime(),
            dataTerminoCurrentDate: new Date(addOneDay(compromisso.dataTermino)).getTime(),
            selectedClient: compromisso.clienteSelecionado,
            tipo: compromisso.tipoCompromisso,
            status: compromisso.compromissoStatus,
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