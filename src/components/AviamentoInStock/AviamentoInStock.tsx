import { useAviamento } from "../../hooks/useAviamento";
import { AviamentoHeader } from "../Aviamento/AviamentoHeader/aviamentoHeader";
import { AviamentoRow } from '../Aviamento/AviamentoRow/aviamentoRow';

import styles from "./styles.module.scss"

export function AviamentosInStock() {
    const { aviamentos, aviamentosStock } = useAviamento()
    return (
        <main className={styles.contentContainer}>
            <AviamentoHeader />

            <div className={styles.cardContainer}></div>
            {aviamentos.map(aviamento => (
                <AviamentoRow key={aviamento.id} aviamento={aviamento} aviamentoStock={aviamentosStock} />
            ))}
        </ main>
    );
}