import './new.scss';

import firebase from '../../services/firebaseConnection';

import { FiPlusCircle } from 'react-icons/fi';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext} from '../../contexts/user';


export default function New(){
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const { user } = useContext(AuthContext);

    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customersSelected, setCustomersSelected] = useState(0);

    const { id } = useParams();
    const history = useHistory();

    const [idCustomers, setIdCustomers] = useState(false);

    useEffect(() => {
        async function loadCustomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })
                // Verificação para caso não tiver cliente
                if(lista.length === 0){
                    console.log('Nenhuma empresa cadastrada!')
                    setCustomers([ { id: '1', nomeFantasia: '' } ])
                    setLoadCustomers(false);
                    return;
                }

                setCustomers(lista);
                setLoadCustomers(false);

                // Se tiver um ID na barra de pesquisa
                if(id){
                    loadId(lista);
                }
            })
            .catch((error) => {
                console.log('Deu Algum erro!' + error)
                setLoadCustomers(false);
                setCustomers([ { id: '1', nomeFantasia: '' } ])
            })
        }

        loadCustomers();

    }, [])

    // Função para procurar o chamado selecionado
    async function loadId(lista){
        await firebase.firestore().collection('chamados').doc(id)
        .get()
        .then((snapshot) => {
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId)

            setCustomersSelected(index);
            setIdCustomers(true);
        })
        .catch((error) => {
            console.log(error + 'Erro no ID Passado');
            setIdCustomers(false);
        })
    }

    // Função para registrar um chamado
    async function handleRegister(e){
        e.preventDefault();

        // Verificação para ver se o usuario esta editando
        if(idCustomers){
            await firebase.firestore().collection('chamados').doc(id)
            .update({
                cliente: customers[customersSelected].nomeFantasia,
                clienteId: customers[customersSelected].id,
                assunto: assunto,
                complemento: complemento,
                userId: user.uid
            })
            .then(() =>{
                toast.success('Chamado editado com sucesso!');
                setCustomersSelected(0)
                setComplemento('');
                history.push('/dashboard');
            })
            .catch((error) => {
                toast.error('Ops! deu alguma coisa errada!');
                console.log(error);
            })

            return;
        }

        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customers[customersSelected].nomeFantasia,
            clienteId: customers[customersSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })
        .then(() => {
            toast.success('Chamado registrado com Sucesso!')
            setComplemento('');
            setCustomersSelected(0);
        })
        .catch((error) => {
            toast.error('Errou ao Cadastrar chamado' + error);
            console.log(error);
        })
        
    }
    // Seleção do Assunto
    function handleChangeSelect(event){
        setAssunto(event.target.value);
    }

    // Seleção do Status do chamado
    function handleOptionChange(event){
        setStatus(event.target.value)
    }

    // Seleção do Cliente
    function handleChangeCustomers(event){
        setCustomersSelected(event.target.value)
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title nome="Novo Chamado">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container2">
                    <form className="form-profile" onSubmit={handleRegister}>

                        <label>Cliente</label>

                        {loadCustomers ? (
                            <input type="text" disabled={true} value="Carregando clientes..." />
                        ) : (
                            <select value={customersSelected} onChange={handleChangeCustomers}>
                            {customers.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.nomeFantasia}
                                    </option>
                                );
                            })}
                        </select>
                        )}

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect} >
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            
                            <input type="radio" 
                                   name="radio"
                                   value="Aberto"
                                   onChange={handleOptionChange}
                                   checked={ status === 'Aberto' }
                                   />
                            <span>Aberto</span>

                            <input type="radio"
                                   name="radio" 
                                   value="Progresso" 
                                   onChange={handleOptionChange} 
                                   checked={ status === 'Progresso' }
                                   />
                            <span>Progresso</span>

                            <input type="radio" 
                                   name="radio"
                                   value="Atendido" 
                                   required 
                                   onChange={handleOptionChange} 
                                   checked={ status === 'Atendido' }
                                   />
                            <span>Atendido</span>

                        </div>

                        <label>Complemento</label>
                        <textarea type="text" 
                                  placeholder="Descreva o problema (opcional)"
                                  value={complemento}
                                  onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button type="submit">Registrar</button>
                    </form>
                </div>

            </div>
        </div>
    );
}