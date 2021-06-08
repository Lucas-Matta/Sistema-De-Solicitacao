import './customers.scss';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiUser } from 'react-icons/fi';
import { useState } from 'react'; 

export default function Customers(){
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');

    async function handleAdd(e){
        e.preventDefault();
        
        await firebase.firestore().collection('customers')
        .add({
            nomeFantasia: nomeFantasia,
            cnpj: cnpj,
            endereco: endereco,
            telefone: telefone
        })
        .then(() => {
            setNomeFantasia('');
            setCnpj('');
            setEndereco('');
            setTelefone('');
            toast.info('Empresa Cadastrada com sucesso!');
        })
        .catch((error) => {
            console.log(error)
            toast.error('[ERRO] Cadastro Invalido!')
        })
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title nome="Clientes">
                    <FiUser size={25} />
                </Title>

                <div className="container2">
                    <form className="form-profile customers" onSubmit={handleAdd}>
                        <label>Nome Fantasia</label>
                        <input type="text"
                               placeholder="Nome da Empresa"
                               required
                               value={nomeFantasia}
                               onChange={(e) => setNomeFantasia(e.target.value)} />

                        <label>CNPJ</label>
                        <input type="text"
                               placeholder="Seu CNPJ"
                               required
                               value={cnpj} 
                               onChange={(e) => setCnpj(e.target.value)} />

                        <label>Telefone</label>
                        <input type="text" 
                               placeholder="Telefone para contato"
                               required
                               value={telefone}
                               onChange={(e) => setTelefone(e.target.value)} /> 
                              
                        <label>Endereço</label>
                        <input type="text"
                               placeholder="Endereço da empresa"
                               required
                               value={endereco} 
                               onChange={(e) => setEndereco(e.target.value)} />

                        <button type="submit" >Cadastrar</button>
                    </form>
                </div>

            </div>
        </div>
    );
}