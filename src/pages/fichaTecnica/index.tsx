import Head from "next/head";
import { TechnicalFileHeader } from '../../components/TechnicalFile/TechnicalFileHeader/technicalFileHeader'

export default function fichaTecnica() {
    return (
        <>
            <Head>
                <title>Clientes | Artha</title>
            </Head>
            <main>
                <TechnicalFileHeader />
            </main>
        </>
    )
}