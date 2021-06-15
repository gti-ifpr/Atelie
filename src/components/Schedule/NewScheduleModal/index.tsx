import Modal from 'react-modal'
import { FiX } from 'react-icons/fi';
import { api } from '../../../services/api';
import { useEffect, useState, FormEvent } from 'react';

import styles from './styles.module.scss'

type Client = {
    id: string;
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

type ClientTableProps = {
    clients: Client[];
}

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewScheduleModal({ isOpen, onRequestClose }: NewScheduleModalProps) {
    const [clients, setClients] = useState([])
    const [horarioInicio, setHorarioInicio] = useState('')
    const [horarioTermino, setHorarioTermino] = useState('')
    const [dataAgendada, setDataAgendada] = useState('')

    useEffect(() => {
        api.get('/clients')
            .then(response => setClients(response.data))
    }, [])

    async function handleCreateNewSchedule(event: FormEvent) {
        event.preventDefault();

        const data = {
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
                    <select name="clients" id="clients">
                        {clients.map(client => (
                            <option key={client.id}>{client.nome} {client.sobrenome}</option>
                        ))}
                    </select>
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
                        placeholder="Nome"
                        value={dataAgendada}
                        onChange={event => setDataAgendada(event.target.value)}
                    />
                    <button type="submit">
                        Cadastrar Cliente
                    </button>
                </form>
            </div>
        </Modal>
    )
}

