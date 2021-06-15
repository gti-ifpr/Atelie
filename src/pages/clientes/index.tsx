import { GetServerSideProps } from "next";
import Head from "next/head";
import { api } from "../../services/api";
import { ClientHeader } from '../../components/Client/ClientHeader'

import styles from './styles.module.scss';

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

export default function Clients({ clients }: ClientTableProps) {
    return (
        <>
            <Head>
                <title>Clientes | Artha</title>
            </Head>

            <main className={styles.contentContainer}>

                <ClientHeader />

                {clients.map(client => {
                    return (
                        <div key={client.id} className={styles.clientsContent}>

                            <div className={styles.card}>
                                <div className={styles.name}>
                                    <h2>{client.nome} {client.sobrenome}</h2>
                                </div>
                                <div className={styles.contats}>
                                    <div>
                                        <span>E-mail: </span>
                                        <p>{client.email}</p>
                                    </div>
                                    <div>
                                        <span className={styles.span}>Telefone: </span>
                                        <p>{client.telefone}</p>
                                    </div>
                                </div>
                                <span>Endereço: </span>
                                <p>{client.endereco.endereco}</p>
                                <div className={styles.address}>
                                    <div>
                                        <span>Cidade: </span>
                                        <p>{client.endereco.cidade}</p>
                                    </div>
                                    <div>
                                        <span className={styles.span}>CEP: </span>
                                        <p>{client.endereco.cep}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </main>
        </>
    );


}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await api.get('/clients', {
        params: {
            _limit: 5,
            _sort: 'data',
            _order: 'incr',
        }
    })

    return {
        props: {
            clients: data,
        }
    }
}