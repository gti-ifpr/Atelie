import Head from "next/head";
import { TechnicalFileHeader } from '../../components/TechnicalFile/TechnicalFileHeader/technicalFileHeader'
import { useTechnicalFile } from "../../hooks/useTechnicalFile";

import Link from 'next/link';

import styles from './styles.module.scss';

export default function fichaTecnica() {
    const { technicalFiles } = useTechnicalFile()

    return (
        <>
            <Head>
                <title>Clientes | Artha</title>
            </Head>

            <main className={styles.contentContainer}>
                <TechnicalFileHeader />

                {technicalFiles.map(technicalFile => {
                    return (
                        <div key={technicalFile.id} className={styles.card}>
                            <Link href={`/fichaTecnica/${technicalFile.id}`}>
                                <button className={styles.card}>
                                    <div className={styles.drawn}>
                                        <h2>{technicalFile.desenho}</h2>
                                    </div>

                                    <div className={styles.contents}>
                                        <span>Orçamento: </span>
                                        <p>R$ {technicalFile.orcamento}</p>

                                        <span className={styles.span}>Cliente: </span>
                                        <p>{technicalFile.cliente}</p>

                                        <span>Quantidade de Tecido: </span>
                                        <p>{technicalFile.quantidadeTecido}</p>

                                        <span className={styles.span}>Tipo Tecido: </span>
                                        <p>{technicalFile.tipoTecido}</p>
                                    </div>
                                </button>
                            </Link>
                        </div>

                    )
                })}
            </main>
        </>
    )
}