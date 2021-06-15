import { FormEvent, useState } from 'react';
import Modal from 'react-modal'
import { api } from '../../../services/api';
import styles from './styles.module.scss';


import { FiX } from 'react-icons/fi';

type NewClientModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewClientModal({ isOpen, onRequestClose }: NewClientModalProps) {
    const [name, setName] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [endereco, setEndereco] = useState('')
    const [cidade, setCidade] = useState('')
    const [cep, setCep] = useState('')

    async function handleCreateNewClient(event: FormEvent) {
        event.preventDefault();

        const data = {
            nome: name,
            sobrenome,
            email,
            telefone,
            endereco: {
                endereco,
                cidade,
                cep
            }
        };

        const response = await api.post('/clients', data);

        console.log(response.data);
        onRequestClose();
        window.location.reload();

        setName('');
        setSobrenome('');
        setEmail('');
        setTelefone('');
        setEndereco('');
        setCidade('');
        setCep('');
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <FiX color="#737380" size="2rem" className="react-modal-close" onClick={() => onRequestClose()} />

            <div className={styles.modal}>
                <h1>Cadastrar Novo Cliente</h1>

                <form onSubmit={handleCreateNewClient}>
                    <div className={styles.name}>
                        <input
                            placeholder="Nome"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <input
                            placeholder="Sobrenome"
                            value={sobrenome}
                            onChange={event => setSobrenome(event.target.value)}
                        />
                    </div>
                    <div className={styles.contats}>
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <input
                            placeholder="Telefone"
                            value={telefone}
                            onChange={event => setTelefone(event.target.value)}
                        />
                    </div>
                    <input
                        placeholder="Endereço"
                        value={endereco}
                        onChange={event => setEndereco(event.target.value)}
                    />
                    <div className={styles.address}>
                        <input
                            placeholder="Cidade"
                            value={cidade}
                            onChange={event => setCidade(event.target.value)}
                        />
                        <input
                            placeholder="CEP"
                            value={cep}
                            onChange={event => setCep(event.target.value)}
                        />
                    </div>
                    <button type="submit">
                        Cadastrar Cliente
                    </button>
                </form>
            </div>
        </Modal>
    )
}