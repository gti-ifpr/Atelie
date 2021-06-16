import Modal from 'react-modal'
import { FiX } from 'react-icons/fi';
import { api } from '../../../services/api';
import { useEffect, useState, FormEvent } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.scss'
import React from 'react';

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
}

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewScheduleModal({ isOpen, onRequestClose }: NewScheduleModalProps) {
    const [clients, setClients] = useState([]);
    const [horarioInicio, setHorarioInicio] = useState('');
    const [horarioTermino, setHorarioTermino] = useState('');
    const [dataAgendada, setDataAgendada] = useState('');
    const [selectedClient, setClient] = useState(clients[0]);

    useEffect(() => {
        api.get('/clients')
            .then(response => setClients(response.data))
    }, [])

    async function handleCreateNewSchedule(event: FormEvent) {
        event.preventDefault();

        const data = {
            cliente_selecionado: selectedClient.id,
            horario_inicio: horarioInicio,
            horario_termino: horarioTermino,
            data_agendada: dataAgendada,
        };

        await api.post('/schedule', data);

        onRequestClose();
        //window.location.reload();

        setHorarioInicio('');
        setHorarioTermino('');
        setDataAgendada('');
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

