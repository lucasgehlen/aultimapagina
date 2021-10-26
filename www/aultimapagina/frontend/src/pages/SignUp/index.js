import React, { useState }  from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import api from '../../services/api';
import Header from '../../components/Header';
import logo_inverted from "../../assets/logo-inverted.png";

import './styles.css';

export default function SignUp (){
    const eye = <FontAwesomeIcon icon={faEye} />;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [password, setPassword] = useState('');

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            cellphone,
            password
        }

        try {
            const response = await api.post('users', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        }
        catch {
            alert("Erro no cadastro, tente novamente.");
        }
    }

    return (
        <div name="SignUp">
            <Header title="A Última Página"/>
            <div id="body-container" className="grid grid-cols-5 gap-4 px-8 py-8">
                <div id="signup-container" className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="px-10 py-10">
                        <img className="object-contain h-16" src={logo_inverted} alt="Logo"/>
                        <p className="mt-4 text-gray-700 font-semibold text-2xl font-medium">
                            Cadastro
                        </p>
                        <p className="mt-4 text-gray-500 font-medium">
                            Faça seu cadastro para publicar seus textos e receber informativos de promoções e concursos
                        </p>
                        </div>
                    </div>
                    <div>
                        <form className="px-2 mt-2" onSubmit={handleRegister}>
                            <input
                                className="py-2 px-3 mt-2"
                                placeholder="Nome"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <input
                                className="py-2 px-3 mt-2"
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                className="py-2 px-3 mt-2"
                                placeholder="Telefone"
                                value={cellphone}
                                onChange={e => setCellphone(e.target.value)}
                            />
                            <div className="relative flex items-center">
                                <input
                                    className="py-2 px-3 mt-2"
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="Senha"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <i onClick={togglePasswordVisiblity} className="absolute flex justify-end w-full px-3 mt-2">
                                    {eye}
                                </i>
                            </div>
                            <button className="button w-full py-2 mt-4 mb-4 rounded-md text-white font-bold bg-green-500" type="submit">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
