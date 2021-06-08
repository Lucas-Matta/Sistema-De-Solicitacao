import './dashboard.scss';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';

import { useState, useEffect } from 'react';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Modal from '../../components/Modal';
import Header from '../../components/Header';
import Title from '../../components/Title';

import { toast } from 'react-toastify';

const listRef = firebase.firestore().collection('chamados').orderBy('created','desc');

export default function Dashboard(){
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    // Quando a aplicação carregar, faça isso;
    useEffect(() => {
        
        async function loadChamados(){
            await listRef.limit(5)
            .get()
            .then((snapshot) => {
                updateState(snapshot)
    
            })
            .catch((error) => {
                console.log('Erro ao Buscar Informações' + error)
                setLoadingMore(false);
            })
    
            setLoading(false);
        }

        loadChamados();

        return() => {

        }
    }, [])

    // Carregamento dos chamados no Dashboard


    // Função responsavel por montar a lista
    async function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0;
            
        // Se não estiver vazio  a Collection;
        if(!isCollectionEmpty){
            let lista = [];
            
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    complemento: doc.data().complemento,
                    created: doc.data().created,
                    status: doc.data().status,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                })
            })
            // Pegando o ultimo documento buscado pelo forEach
            const lastDoc = snapshot.docs[snapshot.docs.length -1];

            // Busca os chamados que ja estão aparecendo, e os novos adicionados
            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);

        } else {
            setIsEmpty(true);
            toast.info('Nenhum chamado encontrado!')
        }

        setLoadingMore(false);
    }

    // Função para pesquisar mais chamados.
    async function handleMore(){
        setLoadingMore(true);
        // Começa a puxar depois do lastDocs
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot);
        })
    }

    function togglePostModal(item){
        setShowPostModal(!showPostModal); // Vai fica trocando de true para false
        setDetail(item);
    }

    // Caso o Loading for True
    if(loading){
        return(
            <div>
                <Header/>
            
                <div className="content">
                    <Title nome="Atendimentos">
                        <FiMessageSquare size={25} />
                    </Title>  
                </div>

                <div className="container dashboard">
                    <span>Buscando chamados...</span>
                </div>
            </div>
        );
    }

    return(
        <div>
            <Header/>
            
            <div className="content">
                <Title nome="Atendimentos">
                    <FiMessageSquare size={25} />
                </Title>  

                {chamados.length === 0 ? (
                    <div className="container2 dashboard">
                        <span>Nenhum chamado registrado...</span>
                
                        <Link to="/new" className="new">
                            <FiPlus color="#FFF" size={23} />
                             Novo Chamado
                        </Link>
                    </div>  
                ) : (
                    <>
                        <Link to="/new" className="new2">
                            <FiPlus color="#FFF" size={23} />
                             Novo Chamado
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>

                            <tbody>
                                {chamados.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label="Cliente">{item.cliente}</td>
                                            <td data-label="Assunto">{item.assunto}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{backgroundColor: item.status === 'aberto' ? '#999' : '#5cb85c'}}>{item.status}</span>
                                            </td>
                                            <td data-label="Cadastrado">{item.createdFormated}</td>
                                            <td data-label="#">

                                                <button className="action" 
                                                        style={{backgroundColor: '#3583f6'}}
                                                        onClick={() => togglePostModal(item)}>
                                                    <FiSearch size={17} color="FFF" />
                                                </button>

                                                <Link className="action" to={`/new/${item.id}`}
                                                        style={{backgroundColor: '#F6a935'}} >
                                                    <FiEdit2 size={17} color="FFF" />
                                                </Link>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando dados...</h3>}
                        {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar Mais</button>}
                    </>
                )}

            </div>
            
            {showPostModal && (
                <Modal
                   conteudo={detail}
                   close={togglePostModal}
                />
            )}
         
        </div>
    )
}
// Caso o ShowPostModal acima, esteja True;