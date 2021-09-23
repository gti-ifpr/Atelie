import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { useState, FormEvent } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, FormControl, InputLabel, MenuItem, Select, makeStyles, } from "@material-ui/core";

import styles from "./styles.module.scss";
import React from "react";
import { isDayAndHourLessThenToday } from "../../../utils/isDayAndHourLessThenToday";

import { TechnicalFile } from '../../../types/technicalFile'

import { useProduction } from "../../../hooks/useProduction";
import { useTechnicalFile } from "../../../hooks/useTechnicalFile";

enum ProducaoType {
    Estamparia = "Estamparia",
    Modelagem = "Modelagem",
    Corte = "Corte",
    Montagem = "Montagem",
    Ajuste = "Ajuste",
    AjusteFinal = "AjusteFinal",
    AjusteFinal1 = "AjusteFinal1",
    ComposiçãoRenda = "ComposiçãoRenda",
    RendaTerceiros = "RendaTerceiros",
    ComposiçãoBordado = "ComposiçãoBordado",
    BordadoTerceiros = "BordadoTerceiros",
    Acessório = "Acessório",
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
    const [selectedTechnicalFile, setSelectedTechnicalFile] = useState(null);

    const { createProduction } = useProduction();
    const { technicalFiles } = useTechnicalFile();

    const materialUiStyles = useStyles();


    async function handleCreateNewProducao(event: FormEvent) {
        event.preventDefault();

        if (isDayAndHourLessThenToday(dataInicio, horarioInicio)) {
            alert("Erro: Data inválida")
        } else {
            await createProduction({
                compromissoStatus: producaoStatus,
                tipoCompromisso: producaoType,
                clienteSelecionado: selectedTechnicalFile.cliente,
                fichaTecnicaSelecionada: selectedTechnicalFile.id,
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
        setSelectedTechnicalFile(null);
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
                        value={selectedTechnicalFile}
                        onChange={(_, technicalFile: TechnicalFile) => {
                            setSelectedTechnicalFile(technicalFile);
                        }}
                        id="combo-box-demo"
                        options={technicalFiles as TechnicalFile[]}
                        getOptionLabel={(technicalFile) => `${technicalFile.cliente} (${technicalFile.nome})`}
                        renderOption={(technicalFile) => `${technicalFile.cliente} (${technicalFile.nome})`}
                        style={{ width: "100%" }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Ficha Técnica"
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
                            <MenuItem value={ProducaoType.Estamparia}>Estamparia</MenuItem>
                            <MenuItem value={ProducaoType.Modelagem}>Modelagem</MenuItem>
                            <MenuItem value={ProducaoType.Corte}>Corte</MenuItem>
                            <MenuItem value={ProducaoType.Montagem}>Montagem</MenuItem>
                            <MenuItem value={ProducaoType.Ajuste}>Ajuste</MenuItem>
                            <MenuItem value={ProducaoType.AjusteFinal}>Ajuste Final</MenuItem>
                            <MenuItem value={ProducaoType.AjusteFinal1}>Ajuste Final*</MenuItem>
                            <MenuItem value={ProducaoType.ComposiçãoRenda}>Composição Renda</MenuItem>
                            <MenuItem value={ProducaoType.RendaTerceiros}>Renda Terceiros</MenuItem>
                            <MenuItem value={ProducaoType.ComposiçãoBordado}>Composição Bordado</MenuItem>
                            <MenuItem value={ProducaoType.BordadoTerceiros}>Bordado Terceiros</MenuItem>
                            <MenuItem value={ProducaoType.Acessório}>Acessório</MenuItem>
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
