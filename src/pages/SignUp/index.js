import { useContext, useState } from 'react';
import { AiTwotoneMail } from 'react-icons/ai';
import { FaKey, FaUserAlt, FaUnlockAlt } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/user';

function SignUp(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);

    function handleSubmit(e){
        e.preventDefault();

        if(nome !== '' && email !== '' && password !== ''){
            signUp(email, password, nome)
        }
    }

    return(
        <section className="banner-principal">
            <div className="slayer"></div>
            <div className="containerFormulario">
                <form onSubmit={handleSubmit}>
                    <h2 style={{marginBottom: '20px'}}><FaUnlockAlt className="cadeado" />Cadastre-se</h2>
                    
                    <div className="input-wraper">
                        <span><FaUserAlt size={25}/></span>
                        <input type="text" 
                               placeholder="Nome"
                               required 
                               value={nome}
                               onChange={(e) => setNome(e.target.value)}
                               />
                    </div>

                    <div className="input-wraper">
                        <span><AiTwotoneMail/></span>
                        <input type="text" 
                               placeholder="Email"
                               required 
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               />
                    </div>

                    <div className="input-wraper">
                        <span><FaKey/></span>
                        <input type="password"
                               placeholder="Password"
                               required
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               />
                    </div>

                    <Link to="/">Já tem uma conta? <strong>Faça Login</strong></Link>
                    
                    <div className="input-wraper">
                        <button type="submit" >{loadingAuth ? 'Cadastrando...' : 'Cadastrar'}</button>
                    </div>
                </form>
            </div>

        </section>
    );
}

export default SignUp;