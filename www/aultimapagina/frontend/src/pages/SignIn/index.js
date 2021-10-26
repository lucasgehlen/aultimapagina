import React, { useState, useEffect }  from 'react';
import { useHistory } from 'react-router-dom';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

import api from '../../services/api';
import Header from '../../components/Header';
import logo_inverted from "../../assets/logo-inverted.svg";

import './styles.css';

export default function SignUp (){
    const eye = <EyeIcon className="h-5 w-5 text-gray-500"/>;
    const eyeOff = <EyeOffIcon className="h-5 w-5 text-gray-500"/>;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem('id')
        if (id && id !== 'undefined') {
            history.push('/')
        }
    })

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    const history = useHistory()

    async function handleSignUp(e) {
        e.preventDefault();
        history.push('/signup');
    }

    async function handleLogin(e) {
        e.preventDefault();

        const data = { email, password }

        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);

        if (!email || !password) {
            alert("Um ou mais campos não foram preenchidos! Verifique e tente novamente")
            return;
        }

        try {
            console.log(data.email)
            const response = await api.post('session', data);
            localStorage.setItem('id', response.data.id)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('name', response.data.name)
            history.push('/');
        }
        catch {
            alert("Não foi possível logar com esse usuário e senha. Tente novamente.");
        }
    }

    return (
        <div name="SignIn">
            <Header />
            <div id="body-container" className="grid grid-cols-5 gap-4 px-8 py-8">
                <div id="signin-container" className="grid grid-cols-2 gap-10 px-10 py-10">
                    <div>
                        <img className="object-contain h-16" src={logo_inverted} alt="Logo"/>
                        <p className="mt-4 text-gray-700 font-semibold text-2xl font-medium">
                            Login
                        </p>
                        <p className="mt-4 text-gray-500 font-medium">
                            Faça seu login para publicar seus textos e receber informativos de promoções
                            e concursos.
                        </p>
                        <p className="mt-4 text-gray-500 font-medium">
                            Não é cadastrado ainda?
                            <p className="underline cursor-pointer text-blue-500" onClick={handleSignUp}> Crie sua conta totalmente gratis! </p>
                        </p>
                    </div>
                    <div className="flex items-center">
                        <form className="px-2 mt-2 w-full" onSubmit={handleLogin}>
                            <input
                                className={`py-3 px-3 mt-2 ${emailError && "border-red-500"}`}
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={e => {setEmail(e.target.value); setEmailError(false)}}
                            />
                            <div className="relative flex items-center w-full">
                                <input
                                    className={`py-3 px-3 mt-2 ${passwordError && "border-red-500"}`}
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
                            <button className="button w-full py-2 mt-4 mb-4 rounded-md text-white font-bold bg-blue-500" type="submit">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
