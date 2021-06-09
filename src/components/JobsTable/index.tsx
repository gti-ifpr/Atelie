import styles from './styles.module.scss';

export function JobsTable() {
    return (
        <div className={styles.jobsContent}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p>André</p>
                    <span className={styles.active}>Prova Ativa</span>
                </div>
                <div className={styles.testColumn}>
                    <span>Prova</span>
                    <p>Molde</p>
                </div>
                <div className={styles.deadlineColumn}>
                    <span>Prazo</span>
                    <p>8 dias para entrega</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p>Vitor</p>
                    <span className={styles.active}>Prova Ativa</span>
                </div>
                <div className={styles.testColumn}>
                    <span>Prova</span>
                    <p>Prova 2</p>
                </div>
                <div className={styles.deadlineColumn}>
                    <span>Prazo</span>
                    <p>5 dias para entrega</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p>Madi</p>
                    <span className={styles.finished}>Prova Encerrada</span>
                </div>
                <div className={styles.testColumn}>
                    <span>Prova</span>
                    <p>Prova 3</p>
                </div>
                <div className={styles.deadlineColumn}>
                    <span>Prazo</span>
                    <p>Prazo encerrado</p>
                </div>
            </div>

        </div>
    )
}