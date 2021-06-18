import Modal from 'react-modal'
import { FiX } from 'react-icons/fi';
import { api } from '../../../services/api';
import { useEffect, useState, FormEvent } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

import styles from './styles.module.scss'
import React from 'react';


enum CompromissoType {
    ajuste = "AJUSTE",
    medida = "MEDIDA",
    orcamento = "ORCAMENTO"
}
enum CompromissoStatus {
    confirmado = "CONFIRMADO",
    aconfirmar = "ACONFIRMAR",
    cancelado = "CANCELADO"
}

type Client = {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    endereco: {
        endereco: string;
        cidade: string;
        cep: string;
    }
}

type Compromisso = {
    id: number;
    horarioInicio: string;
    horarioTermino: string;
    dataAgendada: string;
    slectedClient: number;
    tipo: CompromissoType;
    status: CompromissoStatus;
}

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewScheduleModal({ isOpen, onRequestClose }: NewScheduleModalProps) {
    const [clients, setClients] = useState([]);
    const [horarioInicio, setHorarioInicio] = useState('');
    const [compromissoStatus, setCompromissoStatus] = useState('');
    const [compromissoType, setCompromissoType] = useState('');
    const [horarioTermino, setHorarioTermino] = useState('');
    const [dataAgendada, setDataAgendada] = useState('');
    const [selectedClient, setClient] = useState(null);

    useEffect(() => {
        api.get('/clients')
            .then(response => setClients(response.data))
    }, [])

    async function handleCreateNewSchedule(event: FormEvent) {
        event.preventDefault();

        const data = {
            compromisso_status: compromissoStatus,
            tipo_compromisso: compromissoType,
            cliente_selecionado: selectedClient.id,
            horario_inicio: horarioInicio,
            horario_termino: horarioTermino,
            data_agendada: dataAgendada,
        };

        await api.post('/schedule', data);

        onRequestClose();
        window.location.reload();

        setHorarioInicio('');
        setHorarioTermino('');
        setDataAgendada('');
        setCompromissoStatus('');
        setCompromissoType('');
        setClient(null);
    }



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <FiX color="#737380" size="2rem" className="react-modal-close" onClick={() => onRequestClose()} />
            <div className={styles.modal}>
                <h1>Cadastrar Novo Compromisso</h1>

                <form onSubmit={handleCreateNewSchedule}>

                    <Autocomplete
                        value={selectedClient}
                        onChange={(_, client: Client) => {
                            setClient(client);
                        }}

                        id="combo-box-demo"
                        options={clients as Client[]}
                        getOptionLabel={(client) => client.nome}
                        renderOption={(client) => `${client.nome} ${client.sobrenome}`}

                        style={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Cliente" variant="outlined" />}
                    />

                    <FormControl>
                        <InputLabel id="label">Status</InputLabel>
                        <Select
                            labelId="label"
                            id="demo-simple-select"
                            value={compromissoStatus}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setCompromissoStatus(event.target.value as string)
                            }}
                        >
                            <MenuItem value={CompromissoStatus.confirmado}>Confirmado</MenuItem>
                            <MenuItem value={CompromissoStatus.aconfirmar}>A confirmar</MenuItem>
                            <MenuItem value={CompromissoStatus.cancelado}>Cancelado</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="labelTipo">Tipo</InputLabel>
                        <Select
                            labelId="labelTipo"
                            id="demo-simple-select"
                            value={compromissoType}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setCompromissoType(event.target.value as string)
                            }}
                        >
                            <MenuItem value={CompromissoType.ajuste}>Ajuste</MenuItem>
                            <MenuItem value={CompromissoType.medida}>Medida</MenuItem>
                            <MenuItem value={CompromissoType.orcamento}>Orçamento</MenuItem>
                        </Select>
                    </FormControl>

                    <div className={styles.time}>
                        <div>
                            <span>Horário Ínicio:</span>
                            <input
                                type="time"
                                placeholder="Horário do Ínicio"
                                value={horarioInicio}
                                onChange={event => setHorarioInicio(event.target.value)}
                            />
                        </div>
                        <div>
                            <span>Horário Término:</span>
                            <input
                                type="time"
                                placeholder="Horário de Término"
                                value={horarioTermino}
                                onChange={event => setHorarioTermino(event.target.value)}
                            />
                        </div>
                    </div>
                    <span>Data do Agendamento: </span>
                    <input
                        type="date"
                        placeholder="Data do Agendamento"
                        value={dataAgendada}
                        onChange={event => setDataAgendada(event.target.value)}
                    />
                    <button type="submit">
                        Cadastrar Compromisso
                    </button>
                </form>
            </div>
        </Modal>
    )
}

