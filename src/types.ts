export type Budged = {
    id: number;
    cliente: number;
    orcamento: number;
}

export type Cloth = {
    id: number;
    nome: string;
    colecao: number;
    quantidade: number;
    tamanho: number;
}

export type Client = {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    endereco: {
        endereco: string;
        cidade: string;
        cep: string;
    };
};

export type Stock = {
    id: number;
    quantidade: number
}

export type ClothingCollection = {
    id: number;
    nome: string;
}

export type CommitmentFromBd = {
    id: number;
    compromisso_status: string,
    tipo_compromisso: string,
    cliente_selecionado: number,
    horario_inicio: string,
    horario_termino: string,
    data_agendada: string,
};

export type CommitmentReturn = {
    id: number;
    horarioInicio: string;
    horarioTermino: string;
    dataAgendadaPtBr: string;
    dataAgendadaString: string;
    dataAgendadaDayOfTheWeek: number;
    dataAgendadaCurrentDate: number;
    selectedClient: number;
    tipo: string;
    status: string;
};

export type Fabric = {
    id: number;
    nome: string;
    fabricante: string;
    referenciaDoFabricante: string;
    largura: number;
}

export type Sale = {
    id: number;
    produtos: Cloth[];
    cliente: number;
}

export type TechnicalFile = {
    id: number;
    cliente: number;
    orcamento: number;
    desenho: string;
    tipoTecido: string;
    quantidadeTecido: number;
};