import { api } from '../../services/api';
import { GetServerSideProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import styles from './technicalFile.module.scss';

type TechnicalFile = {
    id: number;
    cliente: number;
    orcamento: number;
    desenho: string;
    tipoTecido: string;
    quantidadeTecido: number;
};

type TechnicalFileProps = {
    technicalFile: TechnicalFile;
}

export default function TechnicalFile({ technicalFile }: TechnicalFileProps) {
    return (
        <>
            <Head>
                <title>{technicalFile.cliente} | Artha</title>
            </Head>

            <main className={styles.technicalFileContainer}>
                <h1>{technicalFile.desenho}</h1>
                <div className={styles.contentContainer}>
                    <div>
                        <span>Tipo de tecido:</span>
                        <h2>{technicalFile.tipoTecido}</h2>
                    </div>
                    <div>
                        <span>Quantidade de tecido:</span>
                        <h2>{technicalFile.quantidadeTecido}</h2>
                    </div>
                </div>
                <div className={styles.contentContainer}>

                    <div>
                        <span>Orçamento: </span>
                        <h2>{technicalFile.orcamento}</h2>
                    </div>
                    <div>
                        <span>Cliente: </span>
                        <h2>{technicalFile.cliente}</h2>
                    </div>
                </div>


            </main>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { slug } = ctx.params

    const { data } = await api.get(`/ficha_tecnica/${slug}`)

    const technicalFile = {
        id: data.id,
        cliente: data.cliente,
        orcamento: data.orcamento,
        desenho: data.desenho,
        tipoTecido: data.tipoTecido,
        quantidadeTecido: data.quantidadeTecido,
    };

    return {
        props: {
            technicalFile,
        }
    }
}