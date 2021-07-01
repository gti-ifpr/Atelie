import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { useState, FormEvent, useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, FormControl, InputLabel, MenuItem, Select, makeStyles, } from "@material-ui/core";

import styles from "./styles.module.scss";
import React from "react";
import { isDayAndHourLessThenToday } from "../../../utils/isDayAndHourLessThenToday";

import { useCommitment } from "../../../hooks/useCommitment";
import { useClient } from "../../../hooks/useClient";

enum CompromissoType {
    AJUSTE = "AJUSTE",
    MEDIDA = "MEDIDA",
    ORCAMENTO = "ORCAMENTO",
}
enum CompromissoStatus {
    CONFIRMADO = "CONFIRMADO",
    CANCELADO = "CANCELADO",
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
    };
};

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export function NewScheduleModal({
    isOpen,
    onRequestClose,
}: NewScheduleModalProps) {

    const [horarioInicio, setHorarioInicio] = useState("");
    const [compromissoStatus, setCompromissoStatus] = useState(
        CompromissoStatus.CONFIRMADO
    );
    const [compromissoType, setCompromissoType] = useState("");
    const [horarioTermino, setHorarioTermino] = useState("");
    const [dataAgendada, setDataAgendada] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);

    const { createCommitment } = useCommitment();
    const { clients } = useClient();

    const materialUiStyles = useStyles();



    async function handleCreateNewSchedule(event: FormEvent) {
        event.preventDefault();

        if (isDayAndHourLessThenToday(dataAgendada, horarioInicio)) {
            alert("Erro: Data inválida")
        } else {
            await createCommitment({
                compromisso_status: compromissoStatus,
                tipo_compromisso: compromissoType,
                cliente_selecionado: selectedClient.id,
                horario_inicio: horarioInicio,
                horario_termino: horarioTermino,
                data_agendada: dataAgendada,
            })

            onRequestClose();
        }

        setHorarioInicio('');
        setHorarioTermino('');
        setDataAgendada('');
        setSelectedClient(null);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <FiX
                color="#737380"
                size="2rem"
                className="react-modal-close"
                onClick={() => onRequestClose()}
            />
            <div className={styles.modal}>
                <h1>Cadastrar Novo Compromisso</h1>

                <form autoComplete="off" onSubmit={handleCreateNewSchedule}>
                    <Autocomplete
                        value={selectedClient}
                        onChange={(_, client: Client) => {
                            setSelectedClient(client);
                        }}
                        id="combo-box-demo"
                        options={clients as Client[]}
                        getOptionLabel={(client) => client.nome}
                        renderOption={(client) => `${client.nome} ${client.sobrenome}`}
                        style={{ width: "100%" }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Cliente"
                                variant="outlined"
                                required
                            />
                        )}
                    />

                    <FormControl className={materialUiStyles.formControl}>
                        <InputLabel id="label">Status</InputLabel>
                        <Select
                            required
                            labelId="label"
                            id="demo-simple-select"
                            value={compromissoStatus}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setCompromissoStatus(event.target.value as CompromissoStatus);
                            }}
                        >
                            <MenuItem value={CompromissoStatus.CONFIRMADO}>
                                Confirmado
                            </MenuItem>
                            <MenuItem value={CompromissoStatus.CANCELADO}>Cancelado</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={materialUiStyles.formControl}>
                        <InputLabel id="labelTipo">Tipo</InputLabel>
                        <Select
                            required
                            labelId="labelTipo"
                            id="demo-simple-select"
                            value={compromissoType}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setCompromissoType(event.target.value as string);
                            }}
                        >
                            <MenuItem value={CompromissoType.AJUSTE}>Ajuste</MenuItem>
                            <MenuItem value={CompromissoType.MEDIDA}>Medida</MenuItem>
                            <MenuItem value={CompromissoType.ORCAMENTO}>Orçamento</MenuItem>
                        </Select>
                    </FormControl>

                    <div className={styles.time}>
                        <div>
                            <span>Horário Ínicio:</span>
                            <input
                                required
                                type="time"
                                placeholder="Horário do Ínicio"
                                value={horarioInicio}
                                onChange={(event) => setHorarioInicio(event.target.value)}
                            />
                        </div>
                        <div>
                            <span>Horário Término:</span>
                            <input
                                required
                                type="time"
                                placeholder="Horário de Término"
                                value={horarioTermino}
                                onChange={(event) => setHorarioTermino(event.target.value)}
                            />
                        </div>
                    </div>
                    <span>Data do Agendamento:</span>
                    <input
                        required
                        type="date"
                        placeholder="Data do Agendamento"
                        value={dataAgendada}
                        onChange={(event) => {
                            const newDate = Date.parse(event.target.value);
                            if (!isNaN(newDate)) {
                                setDataAgendada(event.target.value);
                            }
                        }}
                    />
                    <button type="submit">Cadastrar Compromisso</button>
                </form>
            </div>
        </Modal>
    );
}
