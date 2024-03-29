import Head from "next/head";
import { FunctionComponent, useEffect, useState } from "react";
import { ProductionHeader } from "../../components/Production/ProductionHeader/productionHeader";
import { Button } from "../../components/Button/button";

import Link from 'next/link';

import { addOneDay } from "../../utils/addOneDay";
import { getCurrentDateInString } from "../../utils/getCurrentDateInString";
import { getFirstDayOfTheWeek } from "../../utils/getFirstDayOfTheWeek";
import { isDayAndHourLessThenToday } from "../../utils/isDayAndHourLessThenToday";

import styles from './styles.module.scss'
import { useProduction } from "../../hooks/useProduction";
import { useClient } from "../../hooks/useClient";

import { ProductionReturn } from '../../types/production'
import { useFabric } from "../../hooks/useFabric";
import { useTechnicalFile } from "../../hooks/useTechnicalFile";
import { useAviamento } from "../../hooks/useAviamento";

type FilterType = "hoje" | "semana" | "semFiltro";

const ProducaoRow: FunctionComponent<{ producao: ProductionReturn }> = ({
    producao,
}) => {
    const { clients } = useClient();

    return (
        <>
            <tr
                className={isDayAndHourLessThenToday(producao.dataInicioString, producao.horarioInicio) ? styles.dayAndHourLessThenToday : ''}
            >
                <Link href={`/producao/${producao.id}`}>
                    <td>
                        {clients.map((client) => {
                            if (client.id === producao.selectedClient) {
                                return (
                                    <p
                                        key={client.id}
                                        className={styles.link}
                                    >
                                        {client.nome} {client.sobrenome}
                                    </p>
                                )
                            }
                        })}
                    </td>
                </Link>

                <td>
                    {producao.horarioInicio} - {producao.horarioTermino}
                </td>
                <td>{producao.tipo}</td>
                <td>{producao.status}</td>
                <td>{producao.dataInicioPtBr} {producao.dataTerminoPtBr == producao.dataInicioPtBr ? '' : `- ${producao.dataTerminoPtBr}`}</td>
                <td></td>
            </tr>
        </>
    );
};


function filterProducaoByType(
    filterType: FilterType,
    producoes: ProductionReturn[],
    selectedDayOfTheWeek: number,
) {
    switch (filterType) {
        case "hoje":
            return producoes.filter(
                (producao) => producao.dataInicioString === getCurrentDateInString(new Date()));

        case "semana":
            const { firstDayOfTheWeek, lastDayOfTheWeek } = getFirstDayOfTheWeek(new Date());

            return producoes.filter(
                (producao) =>
                ((producao.dataInicioCurrentDate >= new Date(addOneDay(firstDayOfTheWeek)).getTime() ||
                    producao.dataTerminoCurrentDate <= new Date(addOneDay(lastDayOfTheWeek)).getTime()) &&
                    (producao.dataInicioDayOfTheWeek === selectedDayOfTheWeek) || (producao.dataTerminoDayOfTheWeek === selectedDayOfTheWeek))
            );
        default:
            return producoes;
    }
}

export default function Production() {
    const [producaoFilter, setProducaoFilter] = useState<FilterType>("hoje");
    const [producoesFiltrados, setProducoesFiltrados] = useState<ProductionReturn[]>([])
    const [selectedDayOfTheWeek, setSelectedDayOfTheWeek] = useState<number>(0)

    const { producoes } = useProduction();

    const { addReserve, updateFabricInStock, fabricStocks } = useFabric();
    const { addAviamentoReserve, updateAviamentoInStock, aviamentosStock } = useAviamento();
    const { technicalFiles } = useTechnicalFile();


    const currentDateString = getCurrentDateInString(new Date());

    useEffect(() => {
        producoes.map((producao) => {
            if ((producao.dataInicioString === getCurrentDateInString(new Date())) && (producao.tipo == 'Corte')) {
                fabricStocks.map((fabricStock) => {
                    aviamentosStock.map((aviamentoStock) => {
                        technicalFiles.map((technicalFile) => {
                            if (technicalFile.id == producao.fichaTecnicaSelecionada) {
                                if (fabricStock.id == technicalFile.idTecido && aviamentoStock.id == technicalFile.idAviamento) {
                                    updateFabricInStock({ stockId: technicalFile.idTecido, amount: fabricStock.quantidade - technicalFile.quantidadeTecido })
                                    addReserve({ stockId: technicalFile.idTecido, amount: fabricStock.reserva - technicalFile.quantidadeTecido })

                                    updateAviamentoInStock({ stockId: technicalFile.idAviamento, amount: aviamentoStock.quantidade - technicalFile.quantidadeAviamento })
                                    addAviamentoReserve({ stockId: technicalFile.idAviamento, amount: aviamentoStock.reserva - technicalFile.quantidadeAviamento })
                                }
                            }
                        })
                    })
                })
            }
        })
    }, [currentDateString])



    useEffect(() => {
        setProducoesFiltrados(
            filterProducaoByType(producaoFilter, producoes, selectedDayOfTheWeek)
        )
    }, [producaoFilter, selectedDayOfTheWeek, producoes]);


    return (
        <>
            <Head>
                <title>Agenda | Artha</title>
            </Head>

            <main className={styles.contentContainer}>
                <ProductionHeader />

                <div className={styles.filterType}>
                    <Button isActive={producaoFilter === "hoje"} onClick={() => setProducaoFilter("hoje")}>Hoje</Button>
                    <Button isActive={producaoFilter === "semana"} onClick={() => setProducaoFilter("semana")}>Semana</Button>
                    <Button isActive={producaoFilter === "semFiltro"} onClick={() => setProducaoFilter("semFiltro")}>Todos</Button>
                </div>

                {(producaoFilter === "semana") &&
                    <div className={styles.weekFilterType}>
                        <Button isActive={selectedDayOfTheWeek === 0} onClick={() => setSelectedDayOfTheWeek(0)}>Domingo</Button>
                        <Button isActive={selectedDayOfTheWeek === 1} onClick={() => setSelectedDayOfTheWeek(1)}>Segunda</Button>
                        <Button isActive={selectedDayOfTheWeek === 2} onClick={() => setSelectedDayOfTheWeek(2)}>Terça</Button>
                        <Button isActive={selectedDayOfTheWeek === 3} onClick={() => setSelectedDayOfTheWeek(3)}>Quarta</Button>
                        <Button isActive={selectedDayOfTheWeek === 4} onClick={() => setSelectedDayOfTheWeek(4)}>Quinta</Button>
                        <Button isActive={selectedDayOfTheWeek === 5} onClick={() => setSelectedDayOfTheWeek(5)}>Sexta</Button>
                        <Button isActive={selectedDayOfTheWeek === 6} onClick={() => setSelectedDayOfTheWeek(6)}>Sábado</Button>
                    </div>
                }
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Ínicio-Término</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {producoesFiltrados.map((producao) => (
                            <ProducaoRow key={producao.id} producao={producao} />
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
}