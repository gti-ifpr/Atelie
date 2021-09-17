import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { useState, FormEvent } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, FormControl, InputLabel, MenuItem, Select, makeStyles, } from "@material-ui/core";

import styles from "./styles.module.scss";
import React from "react";
import { isDayAndHourLessThenToday } from "../../../utils/isDayAndHourLessThenToday";

import { Client } from '../../../types/client'

import { useProduction } from "../../../hooks/useProduction";
import { useClient } from "../../../hooks/useClient";

enum ProducaoType {
    AJUSTE = "AJUSTE",
    MEDIDA = "MEDIDA",
    ORCAMENTO = "ORCAMENTO",
}
enum ProducaoStatus {
    CONFIRMADO = "CONFIRMADO",
    CANCELADO = "CANCELADO",
}


type NewProductionModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export function NewProductionModal({
    isOpen,
    onRequestClose,
}: NewProductionModalProps) {

    const [horarioInicio, setHorarioInicio] = useState("");
    const [producaoStatus, setProducaoStatus] = useState(
        ProducaoStatus.CONFIRMADO
    );
    const [producaoType, setProducaoType] = useState("");
    const [horarioTermino, setHorarioTermino] = useState("");
    const [dataInicio, setDataInicio] = useState('');
    const [dataTermino, setDataTermino] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);

    const { createProduction } = useProduction();
    const { clients } = useClient();

    const materialUiStyles = useStyles();


    async function handleCreateNewProducao(event: FormEvent) {
        event.preventDefault();

        if (isDayAndHourLessThenToday(dataInicio, horarioInicio)) {
            alert("Erro: Data inválida")
        } else {
            await createProduction({
                compromissoStatus: producaoStatus,
                tipoCompromisso: producaoType,
                clienteSelecionado: selectedClient.id,
                horarioInicio: horarioInicio,
                horarioTermino: horarioTermino,
                dataInicio: dataInicio,
                dataTermino: dataTermino == "" ? dataInicio : dataTermino,
            })

            onRequestClose();
        }

        setHorarioInicio('');
        setHorarioTermino('');
        setDataInicio('');
        setDataTermino('');
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
                <h1>Cadastrar Novo Produção</h1>

                <form autoComplete="off" onSubmit={handleCreateNewProducao}>
                    <Autocomplete
                        value={selectedClient}
                        onChange={(_, client: Client) => {
                            setSelectedClient(client);
                        }}
                        id="combo-box-demo"
                        options={clients as Client[]}
                        getOptionLabel={(client) => `${client.nome} ${client.sobrenome}`}
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
                            value={producaoStatus}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setProducaoStatus(event.target.value as ProducaoStatus);
                            }}
                        >
                            <MenuItem value={ProducaoStatus.CONFIRMADO}>
                                Confirmado
                            </MenuItem>
                            <MenuItem value={ProducaoStatus.CANCELADO}>Cancelado</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={materialUiStyles.formControl}>
                        <InputLabel id="labelTipo">Tipo</InputLabel>
                        <Select
                            required
                            labelId="labelTipo"
                            id="demo-simple-select"
                            value={producaoType}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setProducaoType(event.target.value as string);
                            }}
                        >
                            <MenuItem value={ProducaoType.AJUSTE}>Ajuste</MenuItem>
                            <MenuItem value={ProducaoType.MEDIDA}>Medida</MenuItem>
                            <MenuItem value={ProducaoType.ORCAMENTO}>Orçamento</MenuItem>
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
                    <div className={styles.time}>
                        <div>
                            <span>Data Início:</span>
                            <input
                                required
                                type="date"
                                placeholder="Data do Agendamento"
                                value={dataInicio}
                                onChange={(event) => {
                                    const newDate = Date.parse(event.target.value);
                                    if (!isNaN(newDate)) {
                                        setDataInicio(event.target.value);
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <span>Data Término:</span>
                            <input
                                type="date"
                                placeholder="Data do Agendamento"
                                value={dataTermino}
                                onChange={(event) => {
                                    const newDate = Date.parse(event.target.value);
                                    if (!isNaN(newDate)) {
                                        setDataTermino(event.target.value);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <button type="submit">Cadastrar Producao</button>
                </form>
            </div>
        </Modal>
    );
}
