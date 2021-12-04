import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

import api from '../../services/api';
import Header from '../../components/Header';
import LogoInverted from "../../assets/logo-inverted.svg";

import './styles.css';

export default function SignUp (){
    const eye = <EyeIcon/>;
    const eyeOff = <EyeOffIcon className="h-5 w-5 text-gray-500"/>;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [password, setPassword] = useState('');

    const [passwordShown, setPasswordShown] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [cellphoneError, setCellphoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem('id')
        if (id && id !== 'undefined') {
            history.push('/')
        }
    })

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault();

        const data = { name, email, cellphone, password}

        if (!name) setNameError(true);
        if (!email) setEmailError(true);
        if (!cellphone) setCellphoneError(true);
        if (!password) setPasswordError(true);

        if (!name || !email || !cellphone || !password) {
            alert("Um ou mais campos não foram preenchidos! Verifique e tente novamente")
            return;
        }

        try {
            const response = await api.post('users', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        }
        catch (error) {
            const status = error.response.status;
            if (status === 409) {
                setEmailError(true)
            }
            console.log(error.response.data)
            alert(error.response.data.error);
        }
    }

    async function handleSignIn(e) {
        e.preventDefault();
        history.push('/signin');
    }

    return (
        <div name="SignUp">
            <Header />
            <div id="body-container" className="grid grid-cols-5 gap-4 px-8 py-8">
                <div id="signup-container" className="grid grid-cols-2 gap-4 px-10 py-10">
                    <div>
                        <img className="object-contain h-16" src={LogoInverted} alt="Logo"/>
                        <p className="mt-4 text-gray-700 font-semibold text-2xl font-medium">
                            Cadastro
                        </p>
                        <p className="mt-4 text-gray-500 font-medium">
                            Faça seu cadastro para publicar seus textos e receber informativos de promoções e concursos! E o melhor: totalmente grátis
                        </p>
                        <p className="mt-4 text-gray-500 font-medium">
                            Já tem cadastro?
                            <p className="underline cursor-pointer text-blue-500" onClick={handleSignIn}> Crie aqui para fazer login! </p>
                        </p>
                    </div>
                    <div className="flex items-center">
                        <form className="px-2 mt-2 w-full" onSubmit={handleRegister}>
                            <input
                                className={`py-3 px-3 mt-2 focus:ring-2 focus:ring-blue-500 ${nameError && "ring-2 ring-red-500"}`}
                                placeholder="Nome"
                                value={name}
                                onChange={e => {setName(e.target.value); setNameError(false)}}
                            />
                            <input
                                className={`py-3 px-3 mt-2 focus:ring-2 focus:ring-blue-500 ${emailError && "ring-2 ring-red-500"}`}
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={e => {setEmail(e.target.value); setEmailError(false)}}
                            />
                            <input
                                className={`py-3 px-3 mt-2 focus:ring-2 focus:ring-blue-500 ${cellphoneError && "ring-2 ring-red-500"}`}
                                placeholder="Telefone"
                                value={cellphone}
                                onChange={e => {setCellphone(e.target.value); setCellphoneError(false)}}
                            />
                            <div className="relative flex items-center w-full">
                                <input
                                    className={`py-3 px-3 mt-2 focus:ring-2 focus:ring-blue-500 ${passwordError && "ring-2 ring-red-500"}`}
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="Senha"
                                    value={password}
                                    onChange={e => {setPassword(e.target.value); setPasswordError(false)}}
                                />
                                <i onClick={togglePasswordVisiblity}
                                   className="absolute right-4 bottom-3">
                                    {passwordShown ? eye : eyeOff}
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
